# Hearth — a more human property search

A personal property agent that helps London renters find homes that fit the
life inside them. Two-step flow: pick what matters (2 per category), see
ranked homes with the reasoning made visible.

## Quickstart

```bash
mise install        # node 24.18.0 + pnpm 10.30.3
pnpm install
just up             # start portless proxy (:4200) → https://hearth.lvh.me:4200
just dev            # or: pnpm dev
```

## Scripts

| Command              | What it does                              |
| -------------------- | ----------------------------------------- |
| `just up`            | Start portless proxy, print the local URL |
| `just dev` / `pnpm dev` | Dev server via portless → `next dev`   |
| `just check` / `pnpm typecheck` | Strict `tsc --noEmit`          |
| `just test` / `pnpm test` | Vitest unit tests (`lib/`)           |
| `pnpm lint`          | `oxlint` with `--fix`                     |
| `pnpm format`        | `oxfmt` with `--write`                    |
| `pnpm build`         | Production build (standalone output)      |
| `pnpm start`         | Serve the build on `${PORT:-3000}`        |

CI (`pnpm lint:check`, `format:check`, `typecheck`, `test`, `build`)
mirrors the studio pipeline in `.github/workflows/ci.yml`.

## Structure

```
app/                  Next.js routes (/ landing, /browse, loading, error, not-found)
components/           Shared UI (site-header, ui/* shadcn primitives)
data/                 Static content (categories, listings)
features/             landing/* (marketing page), browse/* (app), preferences/* (shared pills)
lib/                  Types + pure logic (preferences) + tests
public/               Static assets
Dockerfile            Multi-stage standalone build, non-root, healthcheck
railway.json          Dockerfile builder, / healthcheck, ON_FAILURE restarts
```

State lives in `features/browse/browse-page.tsx` (`selected` / `page` /
`active`). Selection, ranking and pagination helpers in `lib/preferences.ts`
are pure and unit-tested (`lib/preferences.test.ts`) — keep new logic there,
not in components.

## Conventions

- **Lint/format:** `oxlint` + `oxfmt` (configs at repo root, Tailwind-aware
  via `cn`/`clsx`). Run `pnpm lint` / `pnpm format` before pushing.
- **Types:** `strict` + `noUnusedLocals`/`noUnusedParameters`. No
  `ignoreBuildErrors` — the build must typecheck.
- **Images:** `next/image` with `remotePatterns` (see `next.config.mjs`).
- **Local URLs:** portless proxy on `:4200`, app at `https://hearth.lvh.me:4200`.
  `allowedDevOrigins` in `next.config.mjs` must list the proxy host, or Next
  dev 403s `/_next/*` chunk requests carrying an `Origin` header and the page
  never hydrates (clicks do nothing).

## Deploy

Docker image builds `next build` with `output: standalone` and serves
`server.js` as non-root `app` on `$PORT` with a `/` healthcheck. Railway uses
`railway.json` (Dockerfile builder). Required env: none — `PORT` is injected;
set `NEXT_PUBLIC_APP_URL` for correct metadata in production.
