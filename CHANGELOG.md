# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.3.js` (D-254, D-528).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- `0.3.x`: stage 0.3, the world (D-168), from 0.3.0, once stage 0.2's
  last steps were done (D-528).
- `0.4.0`: when the way to depth 9 opens, chapter 1 done (D-954).
- Later minor versions (`0.5`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.423 (2026-11-18)
- No change in play. Each PR now costs less and is safer: a new test checks that every decision from D-001 on is kept, once, and that no archive file shrinks or goes, as one did at 0.3.414 and nothing noticed.
- `tools/release.js` now splits the in-game Version history by itself, 50 versions to a file (0.3.351 to 0.3.400 moved to `history-0.3-7.js` word for word), makes a new minor version's file, and refuses a `docs/PROGRESS.md` over 4 KB; a new `tools/audit.js` lists the docs near their caps and what a conversation reads at its start.
- The archive index's biggest row, hand-edited in most PRs, is a short line now (its old text kept word for word in its file); the PR checklist says how to redo the record-keeping files if two conversations ever overlap.
- Decisions: D-982.

## 0.3.422 (2026-11-18)
- No change in play. Each conversation now starts by reading about a fifth less: the big table of docs moved out of `CLAUDE.md` to `docs/INDEX.md`, nine old rules on how we work out of `docs/DECISIONS.md`, and done plan steps and repeated questions out of `docs/PROGRESS.md`, all word for word.
- The first two health checks' finished pages and five old audit-lesson pages moved to the archive; three near-full pages split (`SOUNDS-4.md`, `CONTENT-5.md`, `WORKFLOW-SINCE.md`); `npm test` prints a dot a test, about 2 KB instead of 436 KB.
- From now on the health check's steps run hands-off: Claude builds its own recommended fixes and lists every pick in the PR.
- Decisions: D-980, D-981.

## 0.3.421 (2026-11-18)
- No change in play. A third health check, run while the owner was away: helper agents looked at ten areas, from the Lampeater's fight to what each conversation reads, and a second agent tested every finding again before it was kept. Of 60 found, 40 are kept, from card buttons too small on a phone to a test run that prints 436 KB. The owner made every one a step, reading less first.
- Decisions: D-975, D-979. D-975 moved to the archive, word for word.
