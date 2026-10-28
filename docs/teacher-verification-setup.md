# Teacher verification setup

The public verification page requires a Cloudflare D1 database binding named `TEACHER_DB` and an HMAC secret named `EMAIL_LOOKUP_SECRET`.

## 1. Create and bind D1

```bash
npx wrangler d1 create gobeyond-teacher-verification --location apac --binding TEACHER_DB --update-config
npx wrangler d1 execute gobeyond-teacher-verification --remote --file=./migrations/0001_teacher_verification.sql
npx wrangler types --env-interface CloudflareEnv
```

The `d1 create` command writes a `d1_databases` entry into `wrangler.jsonc`. Keep the generated database ID private.

## 2. Add the email lookup secret

```bash
npx wrangler secret put EMAIL_LOOKUP_SECRET
```

Enter a long random value when prompted. The same secret must remain in place because it is used to look up a keyed HMAC hash of each normalized teacher email.

## 3. Add teacher emails securely

The database intentionally does not retain plain teacher email addresses. The future protected admin page must save this value to `email_lookup_hash` instead:

1. lowercase and trim the email;
2. compute HMAC-SHA-256 using `EMAIL_LOOKUP_SECRET`;
3. save the lowercase hexadecimal HMAC result.

Until the admin page exists, use verification-ID lookup only. Do not manually insert unprotected email addresses into the database.

## 4. Certificate files

Create a private R2 bucket for source certificate files. Store only the R2 object key in `credentials.document_key`. The public `/verify` route deliberately returns credential titles and issuers, never the object key, certificate reference, private notes, or the original document.

## 5. Publish

```bash
npm run build:cloudflare
npm run deploy:cloudflare
```

Before publishing, protect the future `/admin/*` and `/api/admin/*` routes with Cloudflare Access. Add rate limiting and Turnstile to `/api/verify` before opening email lookup to a large audience.
