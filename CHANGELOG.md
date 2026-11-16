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

## 0.3.390 (2026-11-16)
- A boss test bench, in the dev sheet's new Boss tab: each button starts the Lampeater's fight afresh, just inside its arena on depth 8, with a rough build (Lean, Middling or Strong), from the start or at half (4 hearts, 3 braziers lit). No turn passes, and you can start over any time.
- The playtest's #lampeater link opens straight into the fight with the Middling build, and that fight is never saved. A bot, tools/bossrun.js, plays the fight on many seeds and prints one line a fight. Nothing changes in a real game.
- Decisions: D-948, D-949. Questions raised: Q-111.

## 0.3.389 (2026-11-15)
- The Lampeater snuffs your braziers now. Once it is down to 4 of its 8 hearts, it breathes from the dark on the lit brazier nearest it, and again each time it gets free from a catch after that.
- You get 2 turns' warning: the flame shudders, the tile is ringed red with a dot a turn left, and violet breath runs from its mouth. Catch it in light before then and the breath stops. Then the brazier goes cold with a curl of smoke; lighting it again costs 5 turns' oil, as ever.
- Decisions: D-947.

## 0.3.388 (2026-11-15)
- The Lampeater drinks from your light now. Waiting in the dark at the edge of your lantern's light, it drinks a turn's oil each turn, so your lantern burns twice as fast and its light pulls in, and it creeps in after it.
- A thread of light runs from the edge into its mouth, the oil bar flickers and you hear a sip; the first time, "The Lampeater drinks your light." It never drinks a brazier's light, and not while caught or pinned.
- Decisions: D-946.
