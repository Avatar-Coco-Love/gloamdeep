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

## 0.3.101 (2026-11-07)
- Side rooms start paying for the oil: the last room of each side branch, a dead end, now holds a cache of 2 or 3 extra finds (flasks, herbs, oilcaps or heartcaps), lying together in its far corner.
- A cache is there once: taken, it does not grow back. Rooms you have already been into stay as they were.
- Decisions: D-650.

## 0.3.100 (2026-11-07)
- The Lure Wisp is here, from depth 4: a small cold flame with pink eyes. Its faint glow shows even out in the dark, though it lights nothing around it.
- Come within 3 steps and it drifts a tile away, toward the nearest other creature in the room, or just away when there is none. Following it leads you into trouble.
- It never bites, and one hit puts it out. About 1 in 2 leave Wisp Glass, sold for 2.
- Decisions: D-649.

## 0.3.99 (2026-11-07)
- Nothing in the game changed. The Lure Wisp is planned: a small cold flame with pink eyes, seen even out in the dark, though it lights nothing around it. Come within 3 tiles and it drifts a tile away, toward the nearest other creature, so following it leads you into trouble.
- It never bites, and one hit puts it out. It has 1 heart, turns up from depth 4, and may leave Wisp Glass, sold for 2. It is built next.
- Decisions: D-649.
