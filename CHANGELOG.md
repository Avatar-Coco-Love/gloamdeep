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

## 0.3.386 (2026-11-15)
- The Lampeater can be hurt now, but only in light. Light falling on it catches it: it can't move for a turn, burning in a ring of flame, then slips back into the dark. Switch your lantern on beside it for two blows.
- In the dark your blows still sink into it, and it bites for 2 hearts. It has 8 hearts, shown on its plate; beaten, for now it is simply gone.
- Decisions: D-944.

## 0.3.385 (2026-11-15)
- The Lampeater moves now, only through the dark: it never steps onto a lit tile. Seeing you, it comes a tile a turn to the edge of your light, or right up beside you with your lantern off.
- Light falling on it, it slides back into the dark. It still doesn't bite and blows still sink into it; losing you, it drifts back to its place below the sealed door.
- Decisions: D-943.

## 0.3.384 (2026-11-15)
- Docs only, nothing in the game changed: three finished decisions moved from the decisions file to the archive, word for word, so it has room again.
- Decisions: D-942. D-799, D-894 and D-910 moved to the archive, word for word.
