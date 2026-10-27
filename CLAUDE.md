# Working rules

Stack: Node.js + TypeScript (backend), PostgreSQL with migrations, React + MUI + TypeScript (frontend), Vitest + Supertest.

## Commits
- Small, conventional commits (feat, fix, test, refactor, docs, chore, ci). One logical change per commit. Push after each task.
- No co-author trailers in any commit.
- Never squash or rewrite history.

## Workflow
1. `docs/REQUIREMENTS.md`: goal, persona, in-scope, out-of-scope WITH reasoning, assumptions, open questions. Small scope over complexity. STOP for review.
2. `docs/ARCHITECTURE.md`: diagram, data model, API endpoints, folder structure, security / performance / reliability decisions with trade-offs.
3. `docs/PLAN.md`: numbered tasks, each 1-3 commits.
4. Build with TDD, one task at a time:
   1. Failing test(s) first, commit `test: ...`
   2. Minimum code to pass, commit `feat: ...`
   3. Refactor if needed, commit `refactor: ...`
   4. Run the full suite; never commit with failing tests
   5. Tick the task in PLAN.md, summarise briefly, discuss, wait for "next"

## Code quality
- Layers: routes/controllers -> services (business logic) -> repositories (DB). Services are unit-testable without HTTP or a real DB.
- Clear names, small functions, no dead code, consistent formatting via linter + formatter.
- Centralised error handling with one consistent error response shape.

## Tests
- Fast, deterministic, Arrange/Act/Assert. No real network; inject time and randomness.
- Focus on core logic (validation, auth, pagination rules). A few API integration tests against a test DB.

## Security
- Hashed passwords; httpOnly secure cookie or short-lived JWT. Protect all non-public endpoints.
- Validate all input server-side with a schema library. Parameterised queries only.
- Secrets only in env vars; keep `.env.example`, never commit `.env`.
- Rate-limit login, restrict CORS, security headers, no PII/secrets in logs.

## Reliability and debuggability
- DB migrations; transactions for multi-step writes; optimistic locking / `updated_at` checks on edits.
- Health endpoint, structured logs with request IDs, meaningful error messages.
- GitHub Actions CI runs lint + tests on every push.

## Docs (keep current)
- `docs/DECISIONS.md`: every meaningful decision (what, alternatives, why, trade-off).
- `README.md`: setup, run, seed, test, deploy, live URL, demo video, links to all docs.

## General
- If anything is unclear, ask instead of guessing.
- If you disagree with an instruction, raise it and explain why.
