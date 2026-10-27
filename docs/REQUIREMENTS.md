# Requirements: Login and User List

## Goal
A user logs in with email and password, then browses a paginated, searchable list of users.

## Persona
**Admin / staff user**: an internal user with a seeded account who needs to look up other users. Single role; no permission tiers.

## In scope
1. **Login**: email + password form (MUI). Invalid credentials show one generic error.
2. **Session**: JWT (15 min) in an httpOnly, SameSite cookie. No refresh token.
3. **Logout**: clears the cookie, returns to login.
4. **User list** (login required): MUI table with columns name, email, created date.
   - Server-side pagination (`page`, `limit`; 10/25/50 rows, default 10), response includes `total`.
   - Search by name or email (case-insensitive, substring, server-side, combined with pagination).
   - Stable default ordering by `created_at` desc, then `id`.
5. **Seed script**: creates one login user plus ~50 sample users, idempotent.
6. **Protected route**: unauthenticated visits to the list redirect to login; API returns 401.

## Out of scope (and why)
| Item | Reason |
|------|--------|
| Signup / registration | Accounts are seeded; signup adds email verification and abuse concerns for no assessment value |
| Forgot / reset password | Needs email infrastructure; out of the stated scope |
| Create / edit / delete users | Request is list only; CRUD is a separate feature |
| Roles and permissions | One persona; adds policy logic with nothing to guard yet |
| Refresh tokens / "remember me" | 15 min session is enough for a demo; adds token storage and rotation complexity |
| Column sorting | Not requested beyond default order; can add later via `sort` param |
| Cursor pagination | No page jumping; unnecessary at this data size |
| Multi-factor auth, OAuth/SSO | Disproportionate to scope |

## Assumptions
- Every seeded user can log in; there is a single role.
- User fields: `id`, `name`, `email` (unique, lowercased), `password_hash`, `created_at`, `updated_at`. The password hash is never returned by the API.
- Passwords hashed with bcrypt (or argon2).
- Dataset is small (hundreds to low thousands), so `ILIKE` search without a special index is acceptable.
- Desktop-first UI; responsive is nice-to-have, not tested.
- Rate limiting applies to login only.

## Open questions
1. Should every seeded user be able to log in, or only the one admin? (Assumed: all can, sample users get a known dev password via seed.)
2. Is a 15 min session acceptable, or should it be longer?
3. Any extra columns wanted on the list (e.g. status, role, last login)?
4. Is deployment (live URL) needed for this feature, or later?
