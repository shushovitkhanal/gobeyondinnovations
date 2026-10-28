import { getCloudflareContext } from "@opennextjs/cloudflare";

type D1Result<T> = { results?: T[] };

interface PreparedStatement {
  bind(...values: string[]): { all<T>(): Promise<D1Result<T>> };
}

interface VerificationDatabase {
  prepare(query: string): PreparedStatement;
}

interface VerificationBindings {
  TEACHER_DB?: VerificationDatabase;
  EMAIL_LOOKUP_SECRET?: string;
}

export type PublicCredential = {
  title: string;
  issuer: string;
  issuedAt: string | null;
  expiresAt: string | null;
};

export type VerificationMatch = {
  verificationId: string;
  name: string;
  approvedSubjects: string[];
  validUntil: string | null;
  credentials: PublicCredential[];
};

type TeacherRow = {
  id: string;
  verification_id: string;
  display_name: string;
  approved_subjects: string;
  valid_until: string | null;
};

type CredentialRow = {
  credential_title: string;
  issuing_organization: string;
  issued_at: string | null;
  expires_at: string | null;
};

function getBindings(): VerificationBindings {
  return getCloudflareContext().env as unknown as VerificationBindings;
}

function parseSubjects(value: string): string[] {
  try {
    const subjects = JSON.parse(value);
    return Array.isArray(subjects) ? subjects.filter((subject): subject is string => typeof subject === "string") : [];
  } catch {
    return [];
  }
}

async function hmacHex(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function findVerifiedTeacher(input: string): Promise<VerificationMatch | null> {
  const lookup = input.trim();
  const bindings = getBindings();
  const database = bindings.TEACHER_DB;

  if (!database) {
    throw new Error("The TEACHER_DB Cloudflare binding has not been configured.");
  }

  const isVerificationId = /^GBI-T-\d{6,}$/i.test(lookup);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lookup);
  let teacherResult: D1Result<TeacherRow>;

  const activeTeacherClause = `
    status = 'verified'
    AND public_display_consent = 1
    AND (valid_until IS NULL OR valid_until >= DATE('now'))
  `;

  if (isVerificationId) {
    teacherResult = await database
      .prepare(`SELECT id, verification_id, display_name, approved_subjects, valid_until FROM teachers WHERE verification_id = ? AND ${activeTeacherClause} LIMIT 1`)
      .bind(lookup.toUpperCase())
      .all<TeacherRow>();
  } else if (isEmail && bindings.EMAIL_LOOKUP_SECRET) {
    const emailHash = await hmacHex(lookup.toLowerCase(), bindings.EMAIL_LOOKUP_SECRET);
    teacherResult = await database
      .prepare(`SELECT id, verification_id, display_name, approved_subjects, valid_until FROM teachers WHERE email_lookup_hash = ? AND ${activeTeacherClause} LIMIT 1`)
      .bind(emailHash)
      .all<TeacherRow>();
  } else {
    return null;
  }

  const teacher = teacherResult.results?.[0];
  if (!teacher) return null;

  const credentials = await database
    .prepare(`SELECT credential_title, issuing_organization, issued_at, expires_at FROM credentials WHERE teacher_id = ? AND is_verified = 1 AND (expires_at IS NULL OR expires_at >= DATE('now')) ORDER BY reviewed_at DESC LIMIT 6`)
    .bind(teacher.id)
    .all<CredentialRow>();

  return {
    verificationId: teacher.verification_id,
    name: teacher.display_name,
    approvedSubjects: parseSubjects(teacher.approved_subjects),
    validUntil: teacher.valid_until,
    credentials: (credentials.results ?? []).map((credential) => ({
      title: credential.credential_title,
      issuer: credential.issuing_organization,
      issuedAt: credential.issued_at,
      expiresAt: credential.expires_at,
    })),
  };
}
