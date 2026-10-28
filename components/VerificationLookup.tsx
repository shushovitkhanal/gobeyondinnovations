"use client";

import { FormEvent, useState } from "react";

type Credential = {
  title: string;
  issuer: string;
  issuedAt: string | null;
  expiresAt: string | null;
};

type Teacher = {
  verificationId: string;
  name: string;
  approvedSubjects: string[];
  validUntil: string | null;
  credentials: Credential[];
};

type LookupResponse = { found: boolean; teacher: Teacher | null; error?: string };

function formatDate(value: string | null) {
  if (!value) return "No expiry recorded";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export function VerificationLookup() {
  const [query, setQuery] = useState("");
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setTeacher(null);

    if (!query.trim()) {
      setMessage("Enter a GoBeyond verification ID or the teacher’s email address.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const result = (await response.json()) as LookupResponse;

      if (!response.ok) {
        setMessage(result.error ?? "Verification is temporarily unavailable. Please try again later.");
        return;
      }

      if (!result.found || !result.teacher) {
        setMessage("No active verification was found. Check the details entered or contact GoBeyond Innovations.");
        return;
      }

      setTeacher(result.teacher);
    } catch {
      setMessage("Verification is temporarily unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return <div className="relative">
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-float sm:p-7">
      <label htmlFor="teacher-lookup" className="block text-sm font-medium tracking-normal text-ink">Verification ID or teacher email</label>
      <p className="mt-1 text-sm leading-6 text-slate">For example, <span className="font-mono font-medium text-ink">GBI-T-000001</span> or a teacher’s registered email.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input id="teacher-lookup" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="GBI-T-000001" autoComplete="off" className="min-h-14 flex-1 rounded-xl border border-ink/15 bg-mist px-4 font-mono text-sm text-ink outline-none transition placeholder:text-slate/55 focus:border-cobalt focus:bg-white focus:ring-4 focus:ring-cobalt/10" />
        <button type="submit" disabled={isLoading} className="min-h-14 rounded-xl bg-cobalt px-6 text-sm font-medium tracking-[.015em] text-white shadow-lg shadow-cobalt/20 transition hover:-translate-y-0.5 hover:bg-ink disabled:cursor-wait disabled:opacity-70">{isLoading ? "Checking…" : "Check verification"}</button>
      </div>
    </form>

    <div className="mt-5" aria-live="polite">
      {message && <div role="status" className="rounded-2xl border border-ink/10 bg-white px-5 py-4 text-sm leading-6 text-slate">{message}</div>}
      {teacher && <section aria-labelledby="verification-result" className="overflow-hidden rounded-[1.75rem] border border-emerald-700/20 bg-white shadow-float"><div className="bg-[linear-gradient(120deg,#073b4c_0%,#075b73_58%,#0e7490_100%)] px-6 py-6 text-white sm:px-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-cyan-100">VERIFICATION RESULT</p><h2 id="verification-result" className="mt-3 text-3xl font-bold tracking-[-.035em]">Active &amp; verified</h2></div><span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 font-mono text-xs font-semibold">{teacher.verificationId}</span></div><p className="mt-7 text-xl font-semibold tracking-[-.01em]">{teacher.name}</p></div><div className="p-6 sm:p-8"><dl className="grid gap-6 border-b border-ink/10 pb-7 sm:grid-cols-2"><div><dt className="eyebrow text-slate">APPROVED TO TEACH</dt><dd className="mt-2 text-sm font-semibold leading-6 text-ink">{teacher.approvedSubjects.length ? teacher.approvedSubjects.join(" · ") : "GoBeyond approved programme"}</dd></div><div><dt className="eyebrow text-slate">VERIFICATION VALID THROUGH</dt><dd className="mt-2 text-sm font-semibold leading-6 text-ink">{formatDate(teacher.validUntil)}</dd></div></dl><div className="mt-7"><div className="flex items-baseline justify-between gap-4"><h3 className="text-lg font-bold tracking-[-.02em] text-ink">Verified credentials</h3><span className="font-mono text-[10px] uppercase tracking-[.12em] text-slate">Official record</span></div>{teacher.credentials.length ? <ul className="mt-4 grid gap-3">{teacher.credentials.map((credential) => <li key={`${credential.title}-${credential.issuer}`} className="rounded-xl border border-ink/10 bg-mist px-4 py-4"><p className="font-semibold text-ink">{credential.title}</p><p className="mt-1 text-sm text-slate">{credential.issuer}{credential.issuedAt ? ` · Issued ${formatDate(credential.issuedAt)}` : ""}</p></li>)}</ul> : <p className="mt-3 text-sm leading-6 text-slate">The teacher’s training record has been verified by GoBeyond Innovations.</p>}</div></div></section>}
    </div>
  </div>;
}
