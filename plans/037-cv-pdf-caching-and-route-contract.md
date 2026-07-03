# Plan 037: Cache the CV PDF response and pin the route contract with tests

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 556e47c..HEAD -- app/api/cv/pdf/route.ts lib/pdf/server/render.tsx __tests__/lib/pdf/render-cv.test.ts`
> If any of these files changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1 (do before merging `feat/pdf`)
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (036 is DONE and landed in `556e47c`)
- **Category**: perf + tests
- **Planned at**: commit `556e47c`, 2026-07-03

## Why this matters

The CV PDF route (`/api/cv/pdf`, added in commit `556e47c`) renders the PDF
from scratch on **every request** and its `Cache-Control: public,
max-age=3600` caches only in browsers — CDNs cache off `s-maxage` /
`stale-while-revalidate` (see the bundled Next doc
`node_modules/next/dist/docs/01-app/02-guides/cdn-caching.md`, lines 20–26),
so Vercel's edge never caches it. Every visitor, every crawler, and any
trivially cache-busted request stream (`?v=1,2,3…`) pays a full
react-pdf render (~0.25 s CPU) on the serverless function — an unauthenticated
cost amplifier.

The output is **byte-identical within a deploy**: all inputs are frozen at
module load (`utils/date-utils.ts:60` captures `NOW` once;
`data/cv-key-points.ts:121` captures entry 4's `toDate` once). So the fix is
two small pieces plus tests: memoize the rendered buffer per warm instance
(the sibling OG route already models this pattern), and add `s-maxage` +
`stale-while-revalidate` so the edge absorbs traffic (Vercel purges its edge
cache on deploy, so long CDN TTLs are safe). The route's response contract
(status, headers, error path) currently has no test — this plan pins it so
the header change (and future ones) can't regress silently.

## Current state

Relevant files:

- `app/api/cv/pdf/route.ts` — the GET handler to change (20 lines, excerpt
  below).
- `lib/pdf/server/render.tsx` — `renderCvPdf(): Promise<Buffer>`; stays
  UNCHANGED (it must keep rendering fresh per call — the render smoke test
  depends on that, and memoization belongs at the route layer).
- `app/api/og/route.tsx:54-60` — the repo's memoization exemplar:

```ts
let assetsPromise: ReturnType<typeof readAssets> | null = null;

function loadAssets() {
  assetsPromise ??= readAssets();

  return assetsPromise;
}
```

- `__tests__/lib/pdf/render-cv.test.ts` — render smoke test to extend
  (17 lines, full current content below).
- `__tests__/utils/date-utils.test.ts:147-159` — the module-state-reset test
  pattern (`vi.resetModules()` + dynamic `import(...)`) the new route test
  must use, because the route will hold module-level cache state:

```ts
describe("with a frozen module-load clock", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.resetModules();
  });

  async function importWithNow(now: Date) {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    vi.resetModules();

    return import("@/utils/date-utils");
  }
```

- `__tests__/lib/resend-actions.test.ts` — exemplar for mock-driven
  success/error-path testing style (describe/it, typed `vi.fn`).

### Key excerpts as of `556e47c`

`app/api/cv/pdf/route.ts` (entire file):

```ts
import { renderCvPdf } from "@/lib/pdf/server/render";

export async function GET() {
  try {
    const buffer = await renderCvPdf();

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="tommy-lunde-barvag-cv.pdf"',
        "Cache-Control":
          process.env.NODE_ENV === "development" ? "no-cache, no-store" : "public, max-age=3600"
      }
    });
  } catch (error) {
    console.error("/api/cv/pdf render failed", error);

    return new Response("Failed to generate CV PDF", { status: 500 });
  }
}
```

`__tests__/lib/pdf/render-cv.test.ts` (entire file):

```ts
import { describe, expect, it } from "vitest";

import { renderCvPdf } from "@/lib/pdf/server/render";

describe("renderCvPdf", () => {
  it("renders a single-page PDF buffer", async () => {
    const buffer = await renderCvPdf();

    expect(buffer.subarray(0, 5).toString("latin1")).toBe("%PDF-");

    const pageCount = (buffer.toString("latin1").match(/\/Type\s*\/Page(?![a-zA-Z])/g) ?? [])
      .length;

    expect(pageCount).toBe(1);
    expect(buffer.length).toBeGreaterThan(10_000);
  });
});
```

### Facts verified during planning (do not re-derive)

- CDN caching keys off `s-maxage`/`stale-while-revalidate`, not `max-age`:
  bundled doc `01-app/02-guides/cdn-caching.md:20-26`. Vercel purges its edge
  cache on each deploy, so a long `s-maxage` cannot serve a stale CV across
  deploys.
- Under vitest, `process.env.NODE_ENV` is `"test"`, so the route's
  non-development branch (memoized render, production cache header) is what
  tests exercise.
- The PDF's `/Title` is stored as a **UTF-16BE** string object — the ASCII
  bytes `Tommy` do NOT appear in the raw buffer. The following assertion was
  verified against a real rendered buffer at planning time and is the correct
  way to assert content reached the bytes:

```ts
function utf16be(text: string) {
  return Buffer.from(text, "utf16le").swap16();
}

expect(buffer.includes(utf16be("Tommy Lunde Barvåg"))).toBe(true);
```

- A blank render (template dropping all text) produces a ~1–2 KB PDF, so the
  existing `> 10_000` size assertion already guards grossly empty output; the
  title assertion adds a targeted content check on top.

### Repo conventions (from AGENTS.md — apply to all new code)

- Kebab-case file names; camelCase functions; `function` keyword for pure
  functions; ES modules with destructured imports; `type` over `interface`.
- Blank line ("air") around `if` blocks and above `return` statements.
- Comments: only non-obvious "why", weigh every word. No emojis anywhere.
- Run `pnpm format` on new/edited files, then `pnpm verify` when done.

## Commands you will need

| Purpose     | Command                                                        | Expected on success |
|-------------|----------------------------------------------------------------|---------------------|
| Typecheck   | `pnpm typecheck`                                               | exit 0              |
| Lint        | `pnpm lint`                                                    | exit 0, no warnings |
| Format      | `pnpm format`                                                  | exit 0              |
| PDF tests   | `pnpm vitest run --project unit __tests__/lib/pdf __tests__/app` | all pass          |
| Full gate   | `pnpm verify`                                                  | exit 0              |
| Dev server  | `pnpm dev`                                                     | ready on printed port (3000 or fallback) |

Note: this machine's npm cache is broken — always use pnpm, never npm.

## Scope

**In scope** (the only files you may create or modify):

- `app/api/cv/pdf/route.ts` (memoization + cache header)
- `__tests__/app/api/cv-pdf-route.test.ts` (create)
- `__tests__/lib/pdf/render-cv.test.ts` (add the title-bytes assertion only)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `lib/pdf/**` — `renderCvPdf` must keep rendering fresh per call; the
  render smoke test and the dev-mode route path rely on it. Memoization
  lives ONLY in the route module.
- `app/api/og/route.tsx` — exemplar only.
- `next.config.ts`, `app/(cv)/layout.tsx`, `data/**`, `utils/**`.
- No new dependencies.

## Git workflow

- Work on the branch the operator has checked out (`feat/pdf` at planning
  time, HEAD `556e47c`). Do not create or switch branches.
- Leave ALL changes uncommitted — the owner reviews executor work as an
  uncommitted diff. Never commit, never push, never open a PR.

## Steps

### Step 1: Rewrite `app/api/cv/pdf/route.ts` with memoization and CDN headers

Target content (complete file — match this shape exactly; the `isDevelopment`
constant is evaluated once at module load, which is correct because NODE_ENV
never changes within a process):

```ts
import { renderCvPdf } from "@/lib/pdf/server/render";

const isDevelopment = process.env.NODE_ENV === "development";

let pdfPromise: Promise<Buffer> | null = null;

function loadCvPdf() {
  // Reset on failure so one bad render cannot poison a warm instance.
  pdfPromise ??= renderCvPdf().catch((error: unknown) => {
    pdfPromise = null;

    throw error;
  });

  return pdfPromise;
}

export async function GET() {
  try {
    const buffer = isDevelopment ? await renderCvPdf() : await loadCvPdf();

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="tommy-lunde-barvag-cv.pdf"',
        "Cache-Control": isDevelopment
          ? "no-cache, no-store"
          : "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
      }
    });
  } catch (error) {
    console.error("/api/cv/pdf render failed", error);

    return new Response("Failed to generate CV PDF", { status: 500 });
  }
}
```

Rationale to preserve in review discussion (not as comments): development
bypasses the memo so template edits show up without a server restart;
production renders once per warm instance; browser TTL stays 1 h while the
edge holds 1 day and may serve stale for up to 7 days while revalidating —
all safe because Vercel purges the edge cache on deploy.

**Verify**: `pnpm typecheck` → exit 0. `pnpm lint` → exit 0.

### Step 2: Create `__tests__/app/api/cv-pdf-route.test.ts`

The route module now holds state (`pdfPromise`), so every test must get a
fresh module instance: use `vi.resetModules()` + dynamic import (pattern:
`__tests__/utils/date-utils.test.ts:147-159`), and mock the renderer so the
contract test is fast and error-injectable:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";

const renderCvPdfMock = vi.fn<() => Promise<Buffer>>();

vi.mock("@/lib/pdf/server/render", () => ({
  renderCvPdf: renderCvPdfMock
}));

async function importRoute() {
  vi.resetModules();

  return import("@/app/api/cv/pdf/route");
}
```

Cases (all under `describe("GET /api/cv/pdf")`, with
`afterEach(() => { renderCvPdfMock.mockReset(); })`):

1. **Success contract**: mock resolves `Buffer.from("%PDF-fake")`; `GET()`
   returns status 200, `Content-Type` = `application/pdf`,
   `Content-Disposition` = `attachment; filename="tommy-lunde-barvag-cv.pdf"`,
   `Cache-Control` containing `s-maxage=86400` (NODE_ENV is `"test"`, so the
   production branch runs), and the body's first 5 bytes are `%PDF-`
   (`Buffer.from(await response.arrayBuffer()).subarray(0, 5).toString()`).
2. **Memoization**: two `GET()` calls on the same imported module →
   `renderCvPdfMock` called exactly once.
3. **Error path and recovery**: mock `mockRejectedValueOnce(new Error("boom"))`
   then `mockResolvedValueOnce(Buffer.from("%PDF-fake"))`; first `GET()` →
   status 500 with body `"Failed to generate CV PDF"` (nothing else — no
   stack leak), second `GET()` on the SAME module instance → status 200
   (proves the reset-on-failure behavior; without the reset this second call
   would hang on the poisoned promise and return 500).

**Verify**: `pnpm vitest run --project unit __tests__/app/api/cv-pdf-route.test.ts` → all 3 pass.

### Step 3: Add the content assertion to `__tests__/lib/pdf/render-cv.test.ts`

Inside the existing test (after the size assertion), add the verified
UTF-16BE check — a file-local helper plus one expect:

```ts
function utf16be(text: string) {
  return Buffer.from(text, "utf16le").swap16();
}
```

```ts
    expect(buffer.includes(utf16be("Tommy Lunde Barvåg"))).toBe(true);
```

The helper goes above the `describe` block; keep the existing assertions
untouched. This pins that document metadata (and therefore the data
pipeline) reaches the rendered bytes — the name is stored as UTF-16BE, so a
plain ASCII search cannot work (verified; see "Facts verified").

**Verify**: `pnpm vitest run --project unit __tests__/lib/pdf/render-cv.test.ts` → passes.

### Step 4: Live check, format, verify

Start `pnpm dev` (use the port it prints), then:

```
curl -sI http://localhost:3000/api/cv/pdf | grep -i cache-control
```

→ contains `no-cache, no-store` (development branch — confirms the dev
bypass wiring). Stop the dev server. Then:

```
pnpm format
pnpm verify
```

**Verify**: both exit 0. `git status` shows changes only to in-scope files.
Update the `plans/README.md` status row for 037.

## Test plan

- `__tests__/app/api/cv-pdf-route.test.ts` (new) — response contract,
  memoization, error path + recovery (Step 2 cases). Patterns:
  `__tests__/utils/date-utils.test.ts` (module reset), 
  `__tests__/lib/resend-actions.test.ts` (mock-driven paths).
- `__tests__/lib/pdf/render-cv.test.ts` — one added content assertion
  (Step 3).
- Existing suites stay green: `pnpm test:unit` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm verify` exits 0
- [ ] `pnpm vitest run --project unit __tests__/app/api/cv-pdf-route.test.ts` → 3 tests pass
- [ ] `grep -c "s-maxage" app/api/cv/pdf/route.ts` → 1
- [ ] `grep -c "pdfPromise" app/api/cv/pdf/route.ts` → ≥ 3 (declaration, assignment, reset)
- [ ] `grep -rn "pdfPromise\|s-maxage" lib/pdf/` → no matches (memoization stayed in the route)
- [ ] Dev-server curl shows `cache-control: no-cache, no-store` (Step 4)
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `app/api/cv/pdf/route.ts` at HEAD does not match the excerpt in "Current
  state" (drift).
- The memoization test (Step 2, case 2) cannot pass because `vi.mock` does
  not intercept the route's import — report the actual module-resolution
  behavior rather than restructuring `lib/pdf/`.
- The title-bytes assertion fails against a real render — do NOT weaken it
  to a size-only check; report, since that means document metadata changed.
- Any fix appears to require touching an out-of-scope file.

## Maintenance notes

- The in-process memo means a warm instance serves one render per deploy —
  exactly right while the PDF is fully static. If the route ever takes
  query parameters (e.g. `?preview=1` from 036's deferred list), the memo
  key must incorporate them (or the memo must be dropped for parameterized
  requests).
- After the next production deploy, `curl -sI https://tommylb.com/api/cv/pdf`
  twice and check for a Vercel cache-hit header (`x-vercel-cache: HIT`) on
  the second request — that is the end-to-end proof of the CDN behavior this
  plan targets.
- Reviewer should scrutinize: the reset-on-failure branch in `loadCvPdf`
  (easy to get subtly wrong), and that `renderCvPdf` remains unmemoized.
