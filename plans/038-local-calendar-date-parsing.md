# Plan 038: Parse CV date strings as local calendar dates (timezone-proof the CV)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 556e47c..HEAD -- utils/date-utils.ts components/cv-time.tsx lib/pdf/templates/cv/data.ts data/cv-key-points.ts __tests__/utils/date-utils.test.ts __tests__/lib/pdf/cv-data.test.ts`
> If any of these files changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW–MED (touches shared date utils' call sites; characterization
  tests exist)
- **Depends on**: none (independent of plan 037 — no file overlap)
- **Category**: correctness (latent)
- **Planned at**: commit `556e47c`, 2026-07-03

## Why this matters

CV dates are stored as date-only strings (`"2024-01-01"`) and parsed with
`new Date(string)`, which the ECMAScript spec anchors to **UTC midnight**.
Every downstream helper in `utils/date-utils.ts` then reads them with
**local-time** getters and formatters. In any west-of-UTC runtime, UTC
midnight of Jan 1 is still Dec 31 locally, so every month-start period
shifts back one month: the CV renders "Dec 2023" where the data says
`2024-01-01` — on the website (`components/cv-time.tsx`) and in the CV PDF
(`lib/pdf/templates/cv/data.ts`). Year extraction shifts too:
`new Date("2014-01-01").getFullYear()` is `2013` in New York.

**Verified at planning time**: `TZ=America/New_York pnpm vitest run --project
unit` fails exactly one test — `__tests__/lib/pdf/cv-data.test.ts` ("formats
the most recent period starting from Jan 2024" renders "Dec 2023") — and all
54 other tests pass. Production (Vercel, TZ=UTC) and the owner's machine
(Europe/Oslo, east of UTC) render correctly today, which is why this is
latent rather than live. The fix removes a whole class of silent
wrong-content bugs and makes the test suite pass in any timezone.

**The fix is boundary parsing, NOT UTC formatting.** The repo's existing
characterization tests construct dates from local components
(`new Date(2018, 8, 1)`), so switching formatters to UTC would break them in
east-of-UTC timezones. Instead, parse date-only strings into **local**
calendar dates at the two call sites that consume them; then every helper
(formatting, duration math, `isToday`) operates on locally-consistent dates
and is correct in every timezone. `utils/date-utils.ts` itself needs no
behavior change — only a new exported parser.

## Current state

Relevant files:

- `utils/date-utils.ts` — shared date helpers. Gets ONE addition
  (`parseCvDate`); nothing else in it changes.
- `components/cv-time.tsx` — the website's CV period renderer; parses with
  `new Date(string)` (line 15).
- `lib/pdf/templates/cv/data.ts` — the CV PDF data adapter; parses with
  `new Date(string)` (lines 43–46 and 52).
- `data/cv-key-points.ts` — CV data. Line 121 generates entry 4's "today"
  `toDate` via `new Date().toISOString().split("T")[0]` — a **UTC** date
  string, which mis-labels "today" near midnight for the same reason. Only
  that one line changes.
- `__tests__/utils/date-utils.test.ts` — characterization tests; the pattern
  to extend for `parseCvDate` cases.
- `__tests__/lib/pdf/cv-data.test.ts` — the test that fails under
  `TZ=America/New_York` today; passes automatically once parsing is local
  (its assertions do NOT change).

### Key excerpts as of `556e47c`

`components/cv-time.tsx:12-18`:

```tsx
const CvTime = forwardRef<HTMLTimeElement, CvTimeProps>(
  ({ className, fromDate, toDate, ...props }, ref) => (
    <time className={cn("text-sm text-muted-foreground", className)} {...props} ref={ref}>
      {getFormattedToAndFromCvDate(new Date(fromDate), new Date(toDate))}
    </time>
  )
);
```

`lib/pdf/templates/cv/data.ts:40-53`:

```ts
    experience: [...cvWorkExperience].reverse().map(experience => ({
      role: experience.workPlaceTitle,
      company: experience.workPlace,
      period: getFormattedToAndFromCvDate(
        new Date(experience.fromDate),
        new Date(experience.toDate)
      ),
      summary: experience.summary
    })),
    education: cvEducation.map(education => ({
      title: education.title,
      area: education.area,
      period: `${new Date(education.fromDate).getFullYear()} - ${new Date(education.toDate).getFullYear()}`
    })),
```

`data/cv-key-points.ts:121` (inside the Elmera Group entry):

```ts
    toDate: new Date().toISOString().split("T")[0],
```

`utils/date-utils.ts:80-81` (unchanged by this plan; shown so the executor
understands why local parsing fixes formatting):

```ts
export const getFormattedShortMonthAndYearDate = (date: Date) =>
  date.toLocaleString("en-US", { month: "short", year: "numeric" });
```

### Facts verified during planning (do not re-derive)

- Baseline: `TZ=America/New_York pnpm vitest run --project unit` → exactly
  1 failure (`cv-data.test.ts` period assertion, "Dec 2023"), 54 pass. After
  this plan, the whole unit suite must pass under UTC, Europe/Oslo, and
  America/New_York (Node honors the `TZ` env var).
- `components/cv-time.tsx:15` and `lib/pdf/templates/cv/data.ts:43-46,52`
  are the ONLY places in `app/`, `components/`, `lib/`, `utils/` that parse
  CV date strings via `new Date(string)` (grep-verified). The
  project-experience components do not `new Date(...)` their `"YYYY-MM"`
  strings at all.
- `isToday` (`utils/date-utils.ts:62-68`) compares local components. With
  entry 4's `toDate` generated from local components (Step 3) and parsed as
  a local date (Step 2), the "now" label resolves correctly in every
  timezone at every hour — the previous UTC-string generation had a
  mis-resolve window near midnight.
- The existing date-utils characterization tests all construct dates with
  local components and pass under `TZ=America/New_York` today — they must
  not be modified.

### Repo conventions (from AGENTS.md — apply to all new code)

- Kebab-case file names; camelCase functions; `function` keyword for pure
  functions; ES modules with destructured imports; `type` over `interface`.
- Blank line ("air") around `if` blocks and above `return` statements.
- Comments: only non-obvious "why", weigh every word. No emojis anywhere.
- Run `pnpm format` on edited files, then `pnpm verify` when done.

## Commands you will need

| Purpose       | Command                                                             | Expected on success |
|---------------|---------------------------------------------------------------------|---------------------|
| Typecheck     | `pnpm typecheck`                                                    | exit 0              |
| Lint          | `pnpm lint`                                                         | exit 0, no warnings |
| Format        | `pnpm format`                                                       | exit 0              |
| TZ matrix     | `TZ=UTC pnpm test:unit && TZ=Europe/Oslo pnpm test:unit && TZ=America/New_York pnpm test:unit` | all three exit 0 |
| Full gate     | `pnpm verify`                                                       | exit 0              |

Note: this machine's npm cache is broken — always use pnpm, never npm.

## Scope

**In scope** (the only files you may modify):

- `utils/date-utils.ts` (ADD `parseCvDate` only — no other line changes)
- `components/cv-time.tsx` (swap the two `new Date(...)` calls)
- `lib/pdf/templates/cv/data.ts` (swap the four `new Date(...)` calls)
- `data/cv-key-points.ts` (line 121 only)
- `__tests__/utils/date-utils.test.ts` (append `parseCvDate` cases only)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- Every existing function body in `utils/date-utils.ts` —
  `intervalToDuration`, `isToday`, the formatters, `NOW`,
  `ACTIVE_WORK_YEARS`. Local parsing at the boundary makes them correct;
  changing them risks the characterization suite.
- `__tests__/lib/pdf/cv-data.test.ts` — its assertions must pass UNCHANGED
  under the TZ matrix; editing it would defeat the point.
- `__tests__/utils/date-utils.test.ts` existing cases — append only.
- `data/project-experience-data.ts` and the project-experience components —
  their `"YYYY-MM"` strings are never parsed via `new Date`.
- `app/api/cv/pdf/route.ts` — plan 037's territory (no overlap).

## Git workflow

- Work on the branch the operator has checked out (`feat/pdf` at planning
  time, HEAD `556e47c`). Do not create or switch branches.
- Leave ALL changes uncommitted — the owner reviews executor work as an
  uncommitted diff. Never commit, never push, never open a PR.

## Steps

### Step 1: Add `parseCvDate` to `utils/date-utils.ts`

Append near the other exported helpers (after
`getFormattedShortMonthAndYearDate` is fine):

```ts
// new Date("YYYY-MM-DD") anchors to UTC midnight, which shifts a calendar
// day west of UTC. Parse date-only strings into local dates so every
// downstream helper (formatting, durations, isToday) stays TZ-consistent.
export const parseCvDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};
```

Keep the arrow-const style — this file uses `export const` arrows for all
helpers (match it; the AGENTS.md `function`-keyword rule yields to local
file convention here, mirroring how every sibling helper is written).

**Verify**: `pnpm typecheck` → exit 0.

### Step 2: Switch the two consumers to `parseCvDate`

`components/cv-time.tsx`: import `parseCvDate` alongside
`getFormattedToAndFromCvDate` and change line 15 to:

```tsx
      {getFormattedToAndFromCvDate(parseCvDate(fromDate), parseCvDate(toDate))}
```

`lib/pdf/templates/cv/data.ts`: import `parseCvDate` from
`@/utils/date-utils` and replace all four `new Date(...)` string-parses:
the two inside `period: getFormattedToAndFromCvDate(...)` and the two
`getFullYear()` calls in the education period.

**Verify**: `pnpm typecheck` → exit 0.
`grep -n "new Date(" components/cv-time.tsx lib/pdf/templates/cv/data.ts` →
no matches.

### Step 3: Generate entry 4's `toDate` from local components

`data/cv-key-points.ts:121` — replace:

```ts
    toDate: new Date().toISOString().split("T")[0],
```

with a local-date string (module-load capture stays deliberate — see the
comments in `utils/date-utils.ts:58-60` for why render-time `new Date()` is
avoided under Cache Components):

```ts
    // Local (not UTC) date string: parseCvDate + isToday compare local
    // calendar days, so the "now" label must be anchored the same way.
    toDate: new Date().toLocaleDateString("en-CA"),
```

`toLocaleDateString("en-CA")` yields `YYYY-MM-DD` in the local timezone —
the same shape every other `toDate` uses. Touch nothing else in this file.

**Verify**: `pnpm typecheck` → exit 0.

### Step 4: Append `parseCvDate` tests to `__tests__/utils/date-utils.test.ts`

New `describe("parseCvDate")` block at the end of the file, following the
existing describe/it style. Cases:

- `parseCvDate("2024-01-01")` has local components: `getFullYear()` → 2024,
  `getMonth()` → 0, `getDate()` → 1.
- Round-trips through the formatter:
  `getFormattedShortMonthAndYearDate(parseCvDate("2024-01-01"))` →
  `"Jan 2024"` (this is the assertion that fails with `new Date(...)` under
  `TZ=America/New_York` — it pins the fix).
- `getFormattedToAndFromCvDate(parseCvDate("2018-09-01"), parseCvDate("2019-06-01"))`
  → `"Sep 2018 - Jun 2019 • 9 months"` (string-parsed twin of the existing
  local-constructed case at lines 190-196).

**Verify**: `pnpm vitest run --project unit __tests__/utils/date-utils.test.ts` → all pass.

### Step 5: TZ matrix, format, verify

```
TZ=UTC pnpm test:unit && TZ=Europe/Oslo pnpm test:unit && TZ=America/New_York pnpm test:unit
pnpm format
pnpm verify
```

**Verify**: all commands exit 0 — in particular
`__tests__/lib/pdf/cv-data.test.ts` now passes under `TZ=America/New_York`
WITHOUT having been edited (that file must show no diff). Update the
`plans/README.md` status row for 038.

## Test plan

- `__tests__/utils/date-utils.test.ts` — appended `parseCvDate` block
  (Step 4 cases: component extraction, formatter round-trip, CV-range twin).
- The TZ matrix in Step 5 is the regression gate for the whole class:
  the unit suite green under UTC, Europe/Oslo, and America/New_York.
- Existing characterization tests and `cv-data.test.ts` pass unmodified.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm verify` exits 0
- [ ] `TZ=America/New_York pnpm test:unit` exits 0 (fails at `556e47c`)
- [ ] `TZ=UTC pnpm test:unit` and `TZ=Europe/Oslo pnpm test:unit` exit 0
- [ ] `grep -n "new Date(" components/cv-time.tsx lib/pdf/templates/cv/data.ts` → no matches
- [ ] `grep -c "toISOString" data/cv-key-points.ts` → 0
- [ ] `git diff --stat -- __tests__/lib/pdf/cv-data.test.ts` → empty (passes without edits)
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Any excerpt in "Current state" no longer matches HEAD (drift).
- Any EXISTING test in `__tests__/utils/date-utils.test.ts` fails after
  Step 1–3 — the boundary-parse approach is specifically chosen to leave
  them untouched; a failure means an assumption is wrong.
- The TZ matrix still fails under `TZ=America/New_York` after Step 3 —
  report which assertion, do not start editing `date-utils.ts` internals.
- The fix appears to require changing `intervalToDuration`, `isToday`, or
  any formatter body.

## Maintenance notes

- New code that consumes `fromDate`/`toDate` strings from `data/**` must use
  `parseCvDate`, never `new Date(string)`. Reviewers should watch for this
  in future CV/PDF changes; a grep for `new Date(` over `components/` +
  `lib/pdf/` is a cheap review check.
- If a date-only string ever needs UTC semantics (e.g. for `<time dateTime>`
  attributes or structured data), pass the raw string through — don't
  round-trip it via `parseCvDate`.
- Deliberately NOT fixed here: `getFormattedLongDate` and post dates (they
  format timestamps, a different semantic), and `intervalToDuration`'s
  local-component math (correct once inputs are local dates).
