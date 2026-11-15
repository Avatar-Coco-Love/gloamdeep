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

## 0.3.378 (2026-11-15)
- One tile can hold several kinds of find: Drop sets a stack down beside what lies there instead of swapping, and onto its own kind the stack grows. The tile shows each kind in turn, with its count, about a second each; with reduced motion, the newest with an ember "+2" for the others. A step onto it takes all that fits (B-011).
- Decisions: D-936. Questions closed: Q-110. D-934 moved to the archive, word for word.

## 0.3.377 (2026-11-15)
- On a PC screen, the stash chest's "Tap to move to the chest." no longer runs below the card's bottom edge: where it would break onto a line past the edge, it is left out, as it already was where there was no room (B-012).
- Decisions: D-935. D-933 moved to the archive, word for word.

## 0.3.376 (2026-11-15)
- A tree felled with a full bag leaves its 3 Wood as one stack on its stump, not on three tiles; the same for a branch's wood and a garden bed's berries. A stack on the ground shows its count in the corner, and stepping on it takes all that fits (B-011).
- Decisions: D-934. D-932 moved to the archive, word for word.
