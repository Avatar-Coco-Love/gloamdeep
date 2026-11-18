# Health check 3: how we work

The third health check's findings (D-975) on what each conversation
reads, and what each PR costs, as the game grows. Nothing a player sees.
Worked as `HEALTH-CHECK-3.md` says; numbered on from it. Byte counts:
about 4 bytes a token.

Today a step reads CLAUDE.md, PROGRESS.md, PR-CHECKLIST.md and
DECISIONS.md, 29 KB, before its own docs (a boss step about 59 KB).
H-87 to H-89 bring the four to about 21 KB. Live docs grew 310 to
330 KB in 40 versions.

## 1. Read less at the start
- **H-87 PROGRESS.md is at 4,094 of 4,096 bytes;** about 2 KB is done
  build steps and "Waiting" lines that repeat OPEN-QUESTIONS. Suggests:
  move them word for word, keeping the two found nowhere else (the vault
  door's sound, the older iPhone).
- **H-88 CLAUDE.md's routing table is 3.4 KB of 8.1,** 86 bytes under
  its cap; a step needs 2 to 4 of its 23 rows. Suggests: the full table
  in a new `docs/INDEX.md`, a line per family in CLAUDE.md.
- **H-89 DECISIONS.md is 109 bytes from its cap;** 3.9 KB is nine old
  process rules (D-338 to D-923) CLAUDE.md restates, 7.8 KB the
  Lampeater's five. Suggests: archive the nine now, the Lampeater's when
  its fight ends.
- **H-90 Five audit-lesson files stay live,** WORKFLOW-3 to -7, 24 KB,
  one more each audit; only an audit reads them. Suggests: to
  `archive/`, word for word.
- **H-91 The first two checks' findings,** all done, still sit in
  `HEALTH-CHECK.md` and `-2` (10 KB). Suggests: to
  `archive/HEALTH-CHECK-DONE.md` with their versions.
- **H-92 Six docs are within 110 bytes of their caps** (PROGRESS,
  WORKFLOW, SOUNDS-3, CONTENT-4, CLAUDE.md, DECISIONS); OPEN-QUESTIONS-3
  nears its own by 0.3.428, before the 0.3.433 audit. Suggests: plan the
  splits as one step.
- **H-93 `npm test` prints 436 KB** into a conversation; only the last
  lines matter. Measured. Suggests: the dot reporter (about 2 KB).

## 2. Each PR costs less, and is safer
- **H-94 Nothing guards the decisions archive:** at 0.3.414 one commit
  cut DECISIONS-SURFACE.md from 2,566 lines to 14; the next put it back.
  Suggests: a test that every D-number stays, once, and no archive file
  shrinks.
- **H-95 The archive index's biggest row** (5.8 KB) is hand-edited in
  18 of 25 PRs, though grep finds every decision. Suggests: "D-209 on,
  grep" there.
- **H-96 The Version history's split is by hand** at each audit
  (396 KB in 15 files, D-254). Suggests: release.js starts a new file
  and its import by itself.
- **H-97 Bookkeeping is about half of each PR's lines;** 7 files change
  in every PR. Suggests: release.js refuses a PROGRESS.md over 4 KB;
  a `tools/audit.js` lists docs near their caps and bytes read at start.
- **H-98 If two conversations ever ran at once,** those 7 files would
  conflict every time. Suggests: a PR-CHECKLIST line on how to redo
  them.

## 3. Less code to read
- **H-99 No size limit on code files:** 29 over 20 KB; lines.js (50 KB)
  was edited by 16 of the last 40 PRs, main.js 11, frame.js 9.
  Suggests: split lines.js and frame.js by topic; a size test whose
  list only shrinks.
- **H-100 Fourteen save fix-up files** (re*.js, old*.js, 28 KB, one
  more per room thing) read like rules and copy one helper 8 times.
  Suggests: a `fixups/` folder, one shared helper.
- **H-101** Small tile helpers (`same`, `dist`, `key`) are copied into
  10 files; two `key`s return different things. Suggests: one
  `tile.js`.
- **H-102** The Lampeater's rules check its id in 5 files (TECH.md:
  registry data, not special cases). Suggests: a boss field, when a
  second boss is planned.

## 4. Tests
- **H-103 `npm test` takes 72 to 118 s,** against 35 s at D-660; three
  seed sweeps are the slowest. Suggests: a quick run, all 300 seeds
  before the handoff.
- **H-104 Two tests pin the exact save format** (`lampeater.test.js:150`,
  `freepick.test.js:43`); the next save change breaks them, as at
  0.3.383. Suggests: `>=`.
- **H-105** Test setups are copied (makeState, 7 arguments, in 162
  files). Suggests: a shared `tests/fixtures.js` for new tests.
- **H-106** `tests/beyond.test.js` tests something else; the place
  beyond's tests are in `leapgap.test.js`. Suggests: rename.
- **H-107** No way for a browser script to read the running game;
  every playtest helper guesses from pixels. Suggests: a dev-only
  getter and a shared `tools/drive.js`.
