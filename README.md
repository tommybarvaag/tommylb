# tommylb.com — personal site

Personal website and blog built with the Next.js App Router.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components + Partial Prefetching)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme`, `@tailwindcss/postcss`)
- [shadcn](https://ui.shadcn.com) on [Base UI](https://base-ui.com) primitives (style `base-vega`, see components.json)
- [next-themes](https://github.com/pacocoursey/next-themes) light/dark toggle (default dark)
- MDX via [`@next/mdx`](https://nextjs.org/docs/app/building-your-application/configuring/mdx) (pure `mdxRs`)
- Syntax highlighting with [Shiki](https://shiki.style) (light + dark variants)
- [Resend](https://resend.com) for the contact form
- [Zod v4](https://zod.dev) for form/OG validation
- [Vercel](https://vercel.com) hosting, `@vercel/og`, Analytics, Speed Insights

## Prerequisites

- **Node 24** (see `.node-version`; use `fnm use` / `nvm use`)
- **pnpm 11** (the repo pins `packageManager` as `pnpm@11.9.0`; enable via `corepack enable`)

## Getting started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and fill in the values before running.

## Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Start the dev server (Turbopack)           |
| `pnpm build`        | Production build (`next build`)            |
| `pnpm start`        | Serve the production build                 |
| `pnpm lint`         | Lint with oxlint (zero warnings)           |
| `pnpm typecheck`    | Type-check with tsc (no emit)              |
| `pnpm format`       | Format with oxfmt                          |
| `pnpm format:check` | Check formatting (CI)                      |
| `pnpm test`         | Run Vitest in watch mode                   |
| `pnpm test:ci`      | Run Vitest once (CI)                       |
| `pnpm test:unit`    | Run unit tests once                        |
| `pnpm test:browser` | Run browser tests once (headless Chromium) |
| `pnpm verify`       | Lint, typecheck, format check, unit tests  |
| `pnpm up`           | Interactive dependency updates (ncu)       |

Browser tests need a one-time `pnpm exec playwright install chromium`.

## Content

Blog posts live in `app/(main)/post/_posts/*.mdx` (a private `_posts` folder,
not routable). The slug is the filename minus `.mdx`. Each post exports
`export const metadata` (Next `Metadata`: title, description) and
`export const meta` (`date`, optional `shortDescription`, `authors: string[]`).
The `/post/[slug]` route dynamic-imports the module per slug.

## Environment variables

See `.env.example`. Required: Resend (contact form). `NEXT_PUBLIC_APP_URL`
sets the canonical base URL.
