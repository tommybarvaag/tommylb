# Plan 036: Add a downloadable single-page A4 CV PDF built with react-pdf

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat db84027..HEAD -- "app/(cv)/layout.tsx" components/icons/index.tsx next.config.ts package.json data/cv-key-points.ts utils/date-utils.ts`
> If any of these files changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED (new dependency, Next.js 16 preview with Cache Components)
- **Depends on**: none
- **Category**: direction (feature)
- **Planned at**: commit `db84027`, 2026-07-03

## Why this matters

The CV pages at `/cv/*` present work history, skills, and recommendations, but
recruiters and clients routinely ask for a PDF they can file or forward. This
plan adds a server-rendered, single-page A4 CV PDF generated with
`@react-pdf/renderer` from the same data that powers the CV pages
(`data/cv-key-points.ts`), served from a route handler and downloadable via a
button that sits above the existing "Contact me" button in the sticky right
column of the CV layout. Because the PDF is generated from the site's data
modules, it can never drift from the on-site CV content.

The structure follows Midday's invoice templating engine
(`.ref/midday/packages/invoice/src/templates/pdf/index.tsx` in this repo — a
reference checkout, read-only): a pure react-pdf `Document` template fed by a
flat, pre-formatted data object, with rendering isolated behind a small
server-only module.

## Current state

Relevant files and their roles:

- `app/(cv)/layout.tsx` — CV section layout; right sticky column with the
  profile card whose `CardFooter` holds the "Contact me" button. The download
  button goes directly above that button.
- `data/cv-key-points.ts` — canonical CV data: `cvWorkExperience` (4 entries,
  ordered oldest → newest), `cvEducation` (1 entry), `cvKeySkills` (6 skills),
  `cvRecommendations`. All exported with types.
- `utils/date-utils.ts` — date helpers to reuse:
  `getFormattedToAndFromCvDate(start, end)` → `"Jan 2014 - now • 12 years"`,
  `getActiveWorkYearsAsNumber()` → total career years as number.
- `components/icons/index.tsx` — lucide-based icon registry (`Icons` map).
  Needs a `Download` entry.
- `components/button.tsx` — exports `buttonVariants` (cva). Variants:
  `default` (primary), `subtle` (used by "Contact me").
- `components/card.tsx` — `CardFooter` base classes: `"flex items-center p-6 pt-0"`.
  `cn` (in `lib/utils.ts`) runs tailwind-merge, so passing `flex-col
  items-stretch gap-2` via `className` correctly overrides `items-center`.
- `app/api/og/route.tsx` — the repo's only route handler; the exemplar for
  error handling, cache-control style, and reading `assets/fonts/*.otf` from
  disk with `readFile(join(process.cwd(), ...))`.
- `assets/fonts/Geist-Regular.otf`, `assets/fonts/Geist-Bold.otf` — the only
  local font files (weights 400 and 700; there is no medium weight).
- `next.config.ts` — `cacheComponents: true`, Turbopack, MDX. No
  `outputFileTracingIncludes` yet.
- `vitest.config.ts` — two projects: `unit` (node env, glob
  `__tests__/**/*.test.ts`) and `browser`. Alias `@` → repo root.
- `tsconfig.json` — `moduleResolution: "bundler"`, path alias `@/*` → `./*`.
  Directory imports resolving to `index.tsx` are an established pattern
  (`@/components/icons`).

### Key excerpts as of `db84027`

`app/(cv)/layout.tsx:49-58` (the CardFooter to modify):

```tsx
      <CardFooter>
        <Link
          href="/connect"
          className={buttonVariants({ variant: "subtle" })}
          underline={false}
        >
          <Icons.At className="mr-2" />
          Contact me
        </Link>
      </CardFooter>
```

`data/cv-key-points.ts:4-14` (work experience shape):

```ts
type CvWorkExperience = {
  id: number;
  workPlace: CvWorkPlace;
  workPlaceTitle: CvWorkPlaceTitle;
  area: string;
  fromDate: string;
  // date string in format YYYY-MM-DD or now
  toDate: string | "now";
  description: string[];
  summary: string;
};
```

Note: no entry actually uses the literal `"now"`; entry 4's `toDate` is
`new Date().toISOString().split("T")[0]` (today at module load), and
`getFormattedToAndFromCvDate` renders today as `"now"`.

`components/icons/index.tsx:3` (import to extend):

```ts
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, LogIn, Send, X } from "lucide-react";
```

### Facts verified during planning (do not re-derive)

- `@react-pdf/renderer@4.5.1` is the latest release; its peer range includes
  React 19 (`^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`). Repo runs React 19.2.7.
- `@react-pdf/renderer` is on Next.js's built-in auto-externalized server
  package list (see
  `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/serverExternalPackages.md`),
  so **no** `serverExternalPackages` config is needed; Next loads it via native
  Node require in route handlers under both Turbopack and webpack.
- Because the package is externalized, `Font.register({ src: <absolute path> })`
  does a real `fs` read at request time. Vercel's output file tracing cannot
  see that read, so the font files must be added via `outputFileTracingIncludes`
  (documented in
  `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/output.md`,
  lines 80–124: keys are route globs like `/api/hello`, values are globs
  resolved from the project root).
- With Cache Components enabled, GET route handlers run at request time as
  soon as they hit async filesystem I/O (see
  `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`,
  "With Cache Components" section). Font loading is async fs I/O, so the PDF
  route is request-time; no route segment config needed.
- Canonical identity strings used across the site: name "Tommy Lunde Barvåg",
  title "Senior front-end specialist" (`app/(cv)/layout.tsx:45-46`), email
  `tommy@barvaag.com`, site `tommylb.com` (`app/sitemap.ts`), LinkedIn
  `linkedin.com/in/tommybarvaag` (`components/footer.tsx:43`), location
  "Bergen, Norway".
- Brand colors (from `app/api/og/route.tsx`): ink `#0c0c09`, paper `#fbfbf9`,
  muted `#5b5b4b`.
- **Empirically verified in a scratchpad dry run at planning time** (pnpm 11.9,
  Node 24, react 19.2.7, this machine): `pnpm add -E @react-pdf/renderer@4.5.1`
  installs with no blocked build scripts; `Font.register` with absolute paths
  to the repo's Geist **OTF** files embeds correctly; `renderToBuffer` works in
  plain Node with no DOM; a full CV-shaped document (4 experience entries,
  sidebar, header) renders to ONE A4 page (~16 KB) in ~0.25 s; the page-count
  regex in the test plan returns exactly 1.
- **react-pdf lineHeight trap (hit in the dry run — do not reintroduce)**: a
  unitless `lineHeight` on the `<Page>` style is resolved against the page's
  own `fontSize` and inherited as an absolute value, so a 20pt heading gets a
  ~13pt line box and overlaps the element below it. Never set `lineHeight` at
  the page level; set it per text style (see Step 4).

### Repo conventions (from AGENTS.md — apply to all new code)

- Kebab-case file names; PascalCase components; camelCase functions.
- ES modules, destructured imports, `type` over `interface`, no enums.
- `function` keyword for pure functions. Named exports for components.
- Blank line ("air") around `if` blocks and above `return` statements.
- No empty lines between sibling JSX elements; ternaries (`cond ? <X /> : null`)
  for conditional JSX, never `&&`.
- Comments: only non-obvious "why", weigh every word. **No emojis anywhere.**
- Run `pnpm format` on new files, then `pnpm verify` when done.

## Commands you will need

| Purpose        | Command                                             | Expected on success                |
|----------------|-----------------------------------------------------|------------------------------------|
| Install dep    | `pnpm add -E @react-pdf/renderer@4.5.1`             | exit 0, exact version in package.json |
| Typecheck      | `pnpm typecheck`                                    | exit 0, no errors                  |
| Lint           | `pnpm lint`                                         | exit 0, no warnings                |
| Format         | `pnpm format`                                       | exit 0                             |
| Single test    | `pnpm vitest run --project unit __tests__/lib/pdf`  | all pass                           |
| Full gate      | `pnpm verify`                                       | exit 0 (lint, typecheck, format check, unit tests) |
| Build          | `pnpm build`                                        | exit 0; `/api/cv/pdf` listed in route output |
| Dev server     | `pnpm dev`                                          | serves on http://localhost:3000    |

Note: this machine's npm cache is broken — always use pnpm, never npm.

## Suggested executor toolkit

- Read `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
  before writing the route handler (repo rule: read bundled Next docs before
  any Next.js work; training data is outdated for this preview version).
- Read `.ref/midday/packages/invoice/src/templates/pdf/index.tsx` once for the
  template style being mirrored (react-pdf `Document`/`Page`/`View`/`Text`
  composition, `Font.register`, style objects). Do not copy its Google-Fonts
  URLs — this repo uses local Geist files.

## Scope

**In scope** (the only files you may create or modify):

- `package.json`, `pnpm-lock.yaml` (dependency add only)
- `lib/pdf/templates/cv/index.tsx` (create)
- `lib/pdf/templates/cv/styles.ts` (create)
- `lib/pdf/templates/cv/data.ts` (create)
- `lib/pdf/server/fonts.ts` (create)
- `lib/pdf/server/render.tsx` (create)
- `app/api/cv/pdf/route.ts` (create)
- `app/(cv)/layout.tsx` (CardFooter block only)
- `components/icons/index.tsx` (add `Download` icon only)
- `next.config.ts` (add `outputFileTracingIncludes` only)
- `__tests__/lib/pdf/cv-data.test.ts` (create)
- `__tests__/lib/pdf/render-cv.test.ts` (create)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `data/cv-key-points.ts` and `data/project-experience-data.ts` — the PDF
  adapts to the data, not the other way around.
- `app/api/og/route.tsx` — exemplar only.
- `.ref/**` — read-only reference checkout, never modified.
- `components/button.tsx`, `components/card.tsx`, `components/link.tsx` — use
  them as-is; the CardFooter layout change happens via `className` overrides.
- The CV pages under `app/(cv)/cv/**` — no page content changes.
- No client-side PDF rendering (`PDFDownloadLink`, `usePDF`, dynamic imports of
  react-pdf in client components). The client ships zero new JS.

## Git workflow

- Work on the branch the operator has checked out (`feat/pdf` at review time,
  containing `db84027`). Do not create branches, do not switch branches.
- Leave ALL changes uncommitted in the working tree — the owner of this repo
  reviews executor work as an uncommitted diff before committing it himself.
  Never commit, never push, never open a PR.

## Target structure

Mirrors Midday's `templates/pdf` split, with a server/template domain boundary:

```
lib/pdf/
  templates/cv/
    index.tsx      — CvPdfTemplate: react-pdf <Document>/<Page> + subcomponents (pure; no Node APIs)
    styles.ts      — theme tokens + StyleSheet (pure)
    data.ts        — CvPdfData type + buildCvPdfData() (pure; imports data/ + utils/)
  server/
    fonts.ts       — registerCvPdfFonts(): Font.register with local Geist paths (Node-only)
    render.tsx     — renderCvPdf(): registers fonts, renderToBuffer(<CvPdfTemplate />) (Node-only)
app/api/cv/pdf/route.ts — GET handler: buffer → application/pdf attachment
```

Everything under `lib/pdf/templates/` must stay free of Node APIs so the
template remains portable (client preview, OG-style variants later). Only
`lib/pdf/server/` may import `node:fs`/`node:path` or touch `process.cwd()`.

## Steps

### Step 1: Install the dependency

```
pnpm add -E @react-pdf/renderer@4.5.1
```

pnpm 11 blocks dependency build scripts unless allowlisted;
`@react-pdf/renderer` and its transitive deps ship prebuilt and need none. If
pnpm prints a warning about ignored build scripts for this tree, that is a
STOP condition (see below) — do not approve build scripts yourself.

**Verify**: `grep '"@react-pdf/renderer"' package.json` → `"@react-pdf/renderer": "4.5.1"` (exact, no caret). `pnpm typecheck` → exit 0.

### Step 2: Create the data adapter `lib/pdf/templates/cv/data.ts`

A pure mapper from the site's data modules to a flat, render-ready object.
No react-pdf imports here. Shape:

```ts
import {
  cvEducation,
  cvKeySkills,
  cvWorkExperience
} from "@/data/cv-key-points";
import {
  getActiveWorkYearsAsNumber,
  getFormattedToAndFromCvDate
} from "@/utils/date-utils";

type CvPdfExperience = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

type CvPdfData = {
  name: string;
  title: string;
  contact: string[];
  summary: string;
  experience: CvPdfExperience[];
  education: { title: string; area: string; period: string }[];
  skills: string[];
  details: { label: string; value: string }[];
};

export function buildCvPdfData(): CvPdfData { ... }
export type { CvPdfData, CvPdfExperience };
```

Exact content requirements:

- `name`: `"Tommy Lunde Barvåg"`; `title`: `"Senior front-end specialist"`.
- `contact`: `["tommy@barvaag.com", "tommylb.com", "linkedin.com/in/tommybarvaag", "Bergen, Norway"]`.
- `summary`: use this exact string (an owner-approved condensation of the
  `app/(cv)/cv/about/page.tsx` copy — do not re-derive or edit it):
  `"Experienced and solution-oriented senior consultant with expertise in TypeScript and React. Systematic and analytical approach to developing custom solutions from concept to product. Broad experience as a tech lead, known for asking the right questions and digging deep to ensure the end product delivers the best possible results."`
- `experience`: map `cvWorkExperience` **newest first**
  (`[...cvWorkExperience].reverse()` — source is ordered oldest → newest; do
  not mutate the imported array). Per entry: `role` = `workPlaceTitle`,
  `company` = `workPlace`, `summary` = `summary`, `period` =
  `getFormattedToAndFromCvDate(new Date(exp.fromDate), new Date(exp.toDate))`.
- `education`: map the `cvEducation` array (currently 1 entry): `title`,
  `area`, `period` = `` `${new Date(edu.fromDate).getFullYear()} - ${new Date(edu.toDate).getFullYear()}` ``
  (yields `"2010 - 2013"`).
- `skills`: `cvKeySkills.skills.map(skill => skill.title)`.
- `details`: derived from the layout's Information card but deliberately
  condensed for print (combined languages line, explicit country). Use these
  exact literals:
  `[{ label: "Location", value: "Bergen, Norway" }, { label: "Experience", value: `${getActiveWorkYearsAsNumber()}+ years` }, { label: "Languages", value: "Norwegian (native), English" }, { label: "Relocation", value: "No" }, { label: "Work mode", value: "Hybrid preferred" }]`.

**Verify**: `pnpm typecheck` → exit 0.

### Step 3: Write the data-adapter test `__tests__/lib/pdf/cv-data.test.ts`

Model structure after `__tests__/content/content-contract.test.ts` (describe/it,
`@/` imports). Cases:

- experience has 4 entries, newest first (`experience[0].company` is
  `"Elmera Group ASA"`, last is `"Digitroll AS"`).
- every experience has non-empty `role`, `company`, `period`, `summary`.
- `experience[0].period` starts with `"Jan 2024 - "` (entry 4's `fromDate` is
  `2024-01-01`). Do NOT assert it contains `"now"` — entry 4's `toDate` is a
  UTC date string evaluated at module load, so around local midnight `isToday`
  can be false and the period renders a month instead; asserting `"now"` would
  make the test time-of-day-dependent.
- `skills` equals the 6 titles from `cvKeySkills` in order.
- `details` contains an `Experience` entry whose value matches `/^\d+\+ years$/`.
- `buildCvPdfData()` does not mutate its source: after calling it twice,
  `cvWorkExperience[0].workPlace` is still `"Digitroll AS"` (a bare
  `.reverse()` on the imported array would flip it).

**Verify**: `pnpm vitest run --project unit __tests__/lib/pdf/cv-data.test.ts` → all pass.

### Step 4: Create `lib/pdf/templates/cv/styles.ts` and `lib/pdf/templates/cv/index.tsx`

`styles.ts`: theme constants + `StyleSheet.create` from `@react-pdf/renderer`.
Design tokens (fixed — do not invent new colors):

```ts
export const theme = {
  ink: "#0c0c09",
  muted: "#5b5b4b",
  border: "#e4e4dc",
  paper: "#fbfbf9"
} as const;
```

`index.tsx`: named export `CvPdfTemplate` taking `{ data: CvPdfData }`.
Composition (mirror Midday's `PdfTemplate` structure — `Document` → `Page` →
`View` sections — but single-purpose and minimal):

- `<Document title={`${data.name} — CV`} author={data.name}>` with a single
  `<Page size="A4" style={styles.page}>`.
- Page style: `paddingVertical: 40`, `paddingHorizontal: 44`, `backgroundColor:
  theme.paper`, `color: theme.ink`, `fontFamily: "Geist"`, `fontSize: 9`.
  **No `lineHeight` on the page style** — it inherits as an absolute value
  computed from the page's 9pt font and collapses larger headings (verified
  failure mode; see "Current state"). Put `lineHeight: 1.45` on the body-text
  styles instead.
- Header: name (`fontSize: 20`, `fontWeight: 700`, `letterSpacing: -0.4`,
  `lineHeight: 1.2`, `marginBottom: 2`), title beneath (`fontSize: 10`,
  `color: theme.muted`), then one contact line
  (`data.contact.join("  ·  ")`, `fontSize: 8`, `color: theme.muted`,
  `marginTop: 6`). Divider below: `borderBottomWidth: 1`, `borderBottomColor:
  theme.border`, `marginVertical: 14`.
- Body: `flexDirection: "row"` with two columns —
  - Main column (`flex: 2`, `paddingRight: 18`): section "Profile" with
    `data.summary` (9pt, `lineHeight: 1.45`); section "Experience" listing
    each entry: `${role} — ${company}` on one bold 10pt line, period on an
    8pt muted line, summary as 9pt body text (`lineHeight: 1.45`),
    `marginBottom: 10` between entries.
  - Sidebar (`flex: 1`, `paddingLeft: 18`, `borderLeftWidth: 1`,
    `borderLeftColor: theme.border`): section "Details" (label muted 8pt,
    value 9pt, stacked); section "Key skills" (`data.skills.join(", ")` as
    9pt text — no badge chrome, this is the minimal look); section
    "Education" (title 9pt, area + period muted 8pt).
- Section headings: `textTransform: "uppercase"` (style it — do not uppercase
  the strings), `fontSize: 7.5`, `letterSpacing: 1.2`, `color: theme.muted`,
  `marginBottom: 6` (and `marginTop: 14` between sections).
- Small pure subcomponents in the same file (`function Section(...)`,
  `function ExperienceItem(...)`), using the `function` keyword. Keep them
  unexported file-local helpers; the file's only export is the named
  `CvPdfTemplate` (no default export). Do NOT create additional files — the
  Scope list is exhaustive, and a one-page template fits comfortably in one
  file.
- No Node APIs, no `Font.register` here, no emojis, no images (keep it type
  and rule based; the avatar photo is deliberately excluded from v1).

**Verify**: `pnpm typecheck` → exit 0. `pnpm lint` → exit 0.

### Step 5: Create `lib/pdf/server/fonts.ts` and `lib/pdf/server/render.tsx`

`fonts.ts`:

```ts
import { Font } from "@react-pdf/renderer";
import { join } from "node:path";

let hasRegistered = false;

export function registerCvPdfFonts() {
  if (hasRegistered) {
    return;
  }

  Font.register({
    family: "Geist",
    fonts: [
      { src: join(process.cwd(), "assets/fonts/Geist-Regular.otf"), fontWeight: 400 },
      { src: join(process.cwd(), "assets/fonts/Geist-Bold.otf"), fontWeight: 700 }
    ]
  });
  // A CV reads better ragged-right than hyphenated.
  Font.registerHyphenationCallback(word => [word]);

  hasRegistered = true;
}
```

Only weights 400 and 700 exist — the template must not request 500/600.

`render.tsx`:

```tsx
import { renderToBuffer } from "@react-pdf/renderer";
import { registerCvPdfFonts } from "@/lib/pdf/server/fonts";
import { buildCvPdfData } from "@/lib/pdf/templates/cv/data";
import { CvPdfTemplate } from "@/lib/pdf/templates/cv";

export async function renderCvPdf() {
  registerCvPdfFonts();

  return renderToBuffer(<CvPdfTemplate data={buildCvPdfData()} />);
}
```

**Verify**: `pnpm typecheck` → exit 0.

### Step 6: Write the render smoke test `__tests__/lib/pdf/render-cv.test.ts`

Runs in the `unit` (node) project; react-pdf renders without a DOM. Cases:

- `renderCvPdf()` resolves to a Buffer whose first 5 bytes are `%PDF-`.
- The document has **exactly one page**: PDF object dictionaries are
  uncompressed text, so count page objects on the raw buffer:

```ts
const pageCount = (buffer.toString("latin1").match(/\/Type\s*\/Page(?![a-zA-Z])/g) ?? []).length;

expect(pageCount).toBe(1);
```

- Buffer length is > 10_000 (fonts embedded; guards against an empty render).

Give the test file a generous timeout only if needed (font parsing + layout is
typically < 2s; vitest default 5s should hold).

**Verify**: `pnpm vitest run --project unit __tests__/lib/pdf/render-cv.test.ts` → all pass, page count assertion green. If the page count is 2, apply the one-page fallback order (below) once; if still 2, STOP.

One-page fallback order (apply at most in this sequence, re-running the test
after each): 1) reduce experience summary font to 8.5 and `lineHeight` to 1.4;
2) reduce page padding to 36/40; 3) drop the "Education" sidebar section.

### Step 7: Create the route handler `app/api/cv/pdf/route.ts`

Follow the error-handling shape of `app/api/og/route.tsx` (try/catch,
`console.error` with route prefix, plain-text 500):

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
          process.env.NODE_ENV === "development"
            ? "no-cache, no-store"
            : "public, max-age=3600"
      }
    });
  } catch (error) {
    console.error("/api/cv/pdf render failed", error);

    return new Response("Failed to generate CV PDF", { status: 500 });
  }
}
```

`new Uint8Array(buffer)` sidesteps the Buffer-vs-BodyInit typing mismatch
under strict DOM lib types. Max-age is one hour, not immutable: content
changes per deploy and Vercel's edge cache is purged on deploy anyway.

**Verify** (dev server): start `pnpm dev` in the background and wait for
ready. Next falls back to another port (3001, ...) if 3000 is taken — use the
port printed in the dev output in the commands below:

```
curl -sI http://localhost:3000/api/cv/pdf | grep -i -e "^HTTP" -e content-type -e content-disposition
```

→ `HTTP/1.1 200`, `content-type: application/pdf`,
`content-disposition: attachment; filename="tommy-lunde-barvag-cv.pdf"`.

```
curl -s http://localhost:3000/api/cv/pdf | head -c 5
```

→ `%PDF-`. Stop the dev server afterwards.

### Step 8: Add the Download icon and the layout button

`components/icons/index.tsx`: add `Download` to the lucide import (keep the
list alphabetical: `ArrowLeft, ArrowRight, ArrowUpRight, Check, Download,
LogIn, Send, X`) and add `Download,` to the exported `Icons` map.

`app/(cv)/layout.tsx`: replace the CardFooter block (excerpt in "Current
state") with:

```tsx
      <CardFooter className="flex-col items-stretch gap-2">
        <a href="/api/cv/pdf" className={buttonVariants({ variant: "default" })}>
          <Icons.Download className="mr-2 size-5" />
          Download CV
        </a>
        <Link
          href="/connect"
          className={buttonVariants({ variant: "subtle" })}
          underline={false}
        >
          <Icons.At className="mr-2" />
          Contact me
        </Link>
      </CardFooter>
```

`size-5` matches the At icon below it (the `At` component bakes in `size-5`;
lucide icons default to 24px without a size class). `buttonVariants` and
`Icons` are already imported in this file — no import changes beyond the
icons registry. Use a plain `<a>`, not `components/link.tsx`: the `Link`
component wraps `next/link`, which client-navigates internal hrefs — wrong
for a binary attachment response (the repo's oxlint config has
`nextjs/no-html-link-for-pages` off, and `/api/cv/pdf` is not a page, so no
lint suppression is needed). No `download` attribute needed;
`Content-Disposition` drives the download. The layout is a server component,
so this ships no client JS.

**Verify** (dev server): load `http://localhost:3000/cv/about` and confirm via
`curl -s http://localhost:3000/cv/about | grep -o 'href="/api/cv/pdf"'` →
`href="/api/cv/pdf"`. `pnpm lint` → exit 0.

### Step 9: Add font tracing for deployment in `next.config.ts`

Add to the config object (top level, alongside `cacheComponents`):

```ts
  // react-pdf is server-externalized; nft cannot trace its runtime fs font
  // reads, so include the Geist files in the route's trace explicitly.
  outputFileTracingIncludes: {
    "/api/cv/pdf": ["./assets/fonts/*"]
  },
```

**Verify**: `pnpm build` → exit 0 and the route list includes `/api/cv/pdf`.
Then confirm the trace picked up the fonts:
`grep -o "assets/fonts/Geist-Regular.otf" .next/server/app/api/cv/pdf/route.js.nft.json` → one match
(if the `.nft.json` file does not exist at that exact path, locate it with
`find .next -name "*.nft.json" -path "*cv*"`; if no nft file exists at all for
the route, report this in the completion notes as unverifiable-locally rather
than failing the plan).

### Step 10: Format, verify, finish

```
pnpm format
pnpm verify
```

**Verify**: both exit 0. `git status` shows changes only to in-scope files.
Update the `plans/README.md` status row for 036.

## Test plan

- `__tests__/lib/pdf/cv-data.test.ts` — data adapter contract (Step 3 cases:
  ordering, completeness, no source mutation, skills passthrough, details
  format). Pattern: `__tests__/content/content-contract.test.ts`.
- `__tests__/lib/pdf/render-cv.test.ts` — render smoke test (Step 6 cases:
  `%PDF-` magic bytes, exactly one page, non-trivial size). This is the
  machine-check for "single A4 page".
- Existing suites must stay green: `pnpm test:unit` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep '"@react-pdf/renderer": "4.5.1"' package.json` → match
- [ ] `pnpm verify` exits 0
- [ ] `pnpm vitest run --project unit __tests__/lib/pdf` → 2 files, all tests pass
- [ ] `pnpm build` exits 0 and lists `/api/cv/pdf`
- [ ] Dev-server curl checks from Steps 7 and 8 pass (200, application/pdf,
      attachment filename, `%PDF-` bytes, layout contains `href="/api/cv/pdf"`)
- [ ] `grep -rn "react-pdf" app/ components/ --include="*.tsx" | grep -v "app/api"` → no matches
      (react-pdf never reaches client-adjacent code; template/server live under `lib/pdf/`)
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The CardFooter excerpt in "Current state" no longer matches
  `app/(cv)/layout.tsx` (drift).
- `pnpm add` reports ignored/blocked build scripts for `@react-pdf/renderer`
  or its transitive deps, or fails peer resolution against React 19.2.7.
- `Font.register` or `renderToBuffer` throws a fontkit error (e.g. "Unknown
  font format") on the Geist OTF files — the owner must decide between
  converting to TTF or falling back to the built-in Helvetica; do not decide
  yourself.
- The route works via `pnpm dev` but `pnpm build` fails inside the
  `/api/cv/pdf` route with a module-resolution error mentioning
  `@react-pdf/renderer` or `yoga` — that would contradict the verified
  auto-externalization assumption.
- The one-page test still fails after the three-step fallback order in Step 6.
- Any fix appears to require touching an out-of-scope file.

## Maintenance notes

- **Content updates flow automatically**: the PDF pulls from
  `data/cv-key-points.ts` at render time. Adding a fifth work experience will
  lengthen the page — the one-page test will catch overflow at the next
  `pnpm verify`, at which point older entries' summaries should be shortened
  or the oldest entry collapsed to a single line.
- **Reviewer must eyeball the PDF once**: automated checks prove structure,
  not aesthetics. Open `http://localhost:3000/api/cv/pdf` in a browser and
  check typography, spacing, and that nothing clips. This is the one
  non-machine gate.
- **Deploy check**: after the first production deploy, download the PDF from
  the live site once — this is the only real verification of the
  `outputFileTracingIncludes` font tracing on Vercel.
- Deferred out of this plan: avatar photo in the PDF, a `?preview=1` inline
  mode (drop `Content-Disposition`), an HTML print template variant
  (Midday has one under `templates/html`), and localized (Norwegian) output.
