# Decisions

| # | Decision | Alternatives | Why | Trade-off |
|---|----------|--------------|-----|-----------|
| 1 | Express + `pg` + `node-pg-migrate`, no ORM | Prisma, TypeORM | Small scope; plain SQL keeps repositories simple and queries parameterised | Hand-written SQL and row mapping |
| 2 | Vite + React + MUI | CRA, Next.js | Fast, minimal; no SSR needed | No SSR/SEO |
| 3 | Separate `backend/` and `frontend/` packages | Monorepo tooling | No workspace tooling needed | Two `npm install`s |
