-- GoBeyond teacher verification registry.
-- Credential documents themselves belong in a private R2 bucket; only their keys
-- are stored here so no certificate file can become public through D1.

CREATE TABLE teachers (
  id TEXT PRIMARY KEY,
  verification_id TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  email_lookup_hash TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'verified', 'expired', 'revoked')),
  approved_subjects TEXT NOT NULL DEFAULT '[]',
  verified_at TEXT,
  valid_until TEXT,
  public_display_consent INTEGER NOT NULL DEFAULT 0
    CHECK (public_display_consent IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credentials (
  id TEXT PRIMARY KEY,
  teacher_id TEXT NOT NULL,
  credential_title TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  certificate_reference TEXT,
  issued_at TEXT,
  expires_at TEXT,
  document_key TEXT,
  reviewed_by TEXT,
  reviewed_at TEXT,
  is_verified INTEGER NOT NULL DEFAULT 0
    CHECK (is_verified IN (0, 1)),
  private_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE verification_events (
  id TEXT PRIMARY KEY,
  teacher_id TEXT NOT NULL,
  action TEXT NOT NULL
    CHECK (action IN ('created', 'verified', 'renewed', 'expired', 'revoked')),
  actor_email TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE INDEX idx_teachers_verification_id
  ON teachers(verification_id);

CREATE INDEX idx_teachers_email_lookup_hash
  ON teachers(email_lookup_hash);

CREATE INDEX idx_credentials_teacher_id
  ON credentials(teacher_id);

CREATE INDEX idx_verification_events_teacher_id
  ON verification_events(teacher_id);
