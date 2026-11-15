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

## 0.3.388 (2026-11-15)
- The Lampeater drinks from your light now. Waiting in the dark at the edge of your lantern's light, it drinks a turn's oil each turn, so your lantern burns twice as fast and its light pulls in, and it creeps in after it.
- A thread of light runs from the edge into its mouth, the oil bar flickers and you hear a sip; the first time, "The Lampeater drinks your light." It never drinks a brazier's light, and not while caught or pinned.
- Decisions: D-946.

## 0.3.387 (2026-11-15)
- The Lampeater can be pinned now. Catch it with no dark tile beside it, say under a lit brazier with you blocking its way, and it can't slip away for 2 more turns: about 4 blows instead of 2.
- Then it bursts free across the light toward the nearest dark, and can be pinned again once it is back in the dark. It still backs out through your lantern's light, never a brazier's.
- Decisions: D-945.

## 0.3.386 (2026-11-15)
- The Lampeater can be hurt now, but only in light. Light falling on it catches it: it can't move for a turn, burning in a ring of flame, then slips back into the dark. Switch your lantern on beside it for two blows.
- In the dark your blows still sink into it, and it bites for 2 hearts. It has 8 hearts, shown on its plate; beaten, for now it is simply gone.
- Decisions: D-944.
