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
- Later minor versions (`0.4`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.380 (2026-11-15)
- The Warden looks and sounds its new fight: a blow that rings off its stone shows a small grey spark instead of the white flash, and clinks, the light metal of Making played once and a quarter lower. As its fists sink into the floor it stoops, jolts and stone chips spring up, with a heavy thud of stone; it stays stooped while it is open.
- Decisions: D-938. D-936 moved to the archive, word for word.

## 0.3.379 (2026-11-15)
- The Warden is harder: your blows ring off its stone ("Your blow rings off the stone."), with no flash, until its slam misses and its fists sink into the floor. Then it is open until it next acts: step back beside it and strike. Each blow does 1 less, never below 1, so four openings beat it. Once cracked it never stands still again. Its Bestiary tip says how.
- Decisions: D-937. D-935 moved to the archive, word for word.

## 0.3.378 (2026-11-15)
- One tile can hold several kinds of find: Drop sets a stack down beside what lies there instead of swapping, and onto its own kind the stack grows. The tile shows each kind in turn, with its count, about a second each; with reduced motion, the newest with an ember "+2" for the others. A step onto it takes all that fits (B-011).
- Decisions: D-936. Questions closed: Q-110. D-934 moved to the archive, word for word.
