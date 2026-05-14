# AGENTS.md — chuyenminhke

A minimalist personal blog (Next.js 15, React 19, Tailwind CSS, Prisma/PostgreSQL, shadcn/ui). Vietnamese-language content.

## Package manager

Use **bun**, not npm/pnpm/yarn.

## Commands

| Command            | Action                                                   |
| ------------------ | -------------------------------------------------------- |
| `bun dev`          | Dev server with **Turbopack**                            |
| `bun build`        | Production build                                         |
| `bun lint`         | ESLint (flat config, ESLint 9)                           |
| `bun format`       | Prettier + ESLint fix                                    |
| `bun format:check` | Prettier + ESLint check-only                             |
| `bun prisma`       | `prisma generate` + `prisma migrate deploy`              |
| `bun og`           | Generate OG images (requires `bun dev` running on :3000) |

Run `bun i` (postinstall auto-runs `prisma generate`).

No test framework exists. No typecheck script (tsconfig has `strict: true`).

## Architecture

- **App Router**: Routes under `app/(main)/` (homepage, `[slug]` posts), API under `app/api/`.
- **Blog posts**: Markdown files in `blogs/` with gray-matter frontmatter. Key field: `is_published: boolean`.
- **SSG for posts**: `[slug]/page.tsx` uses `generateStaticParams` — reads all published posts at build time.
- **Prisma**: 2 models (`Like`, `Comment`). Custom client output at `prisma/generated/client/` — tsconfig alias `@prisma/generated/client`.
- **Database**: PostgreSQL via Prisma. Migrations are **gitignored** (not committed). Applied at deploy via `prisma migrate deploy`.
- **shadcn/ui**: New York style. Components under `components/ui/`.
- **OG images**: `app/api/og/route.tsx` renders dynamic PNGs at build time. Font files in `public/static/`.

## Conventions

- No CI config — Vercel auto-deploy uses `bun vercel-build`.
- ESLint 9 flat config in `eslint.config.mjs`.
- `.env` is gitignored — set env vars externally (Vercel dashboard, etc.).
- Tailwind: CSS variables for shadcn/ui tokens; `.dark` class variables exist.
