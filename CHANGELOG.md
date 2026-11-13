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

## 0.3.335 (2026-11-13)
- Nothing in the game changed. The six puzzle rules are settled: puzzles never block the way down, show their state by light, are solved by thinking, reset when you leave, and pay in the game's own coin. The checker that proves a puzzle can be done comes when puzzles are first laid out by the seed.
- The first four puzzles, in order: the braziers and a sealed side vault, the dark door, the Fist and a plate, then the gloam tide. Biome 1's boss and found ability are planned after the first two.
- Decisions: D-890. D-887 moved to the archive, word for word.

## 0.3.334 (2026-11-13)
- A long look ahead, nothing in the game changed. Puzzles are planned first, and biome 1 gets finished first: its boss, its found ability, its first puzzles and the lantern's parts.
- Every puzzle and pressure idea from the talk is kept, in seven families: light and dark, push and knockback, creatures as pieces, gates you come back to, lore clues, time and pressure, and bigger shapes. Each biome's own puzzle ideas too.
- Decisions: D-889. Questions opened: Q-105. D-885 moved to the archive, word for word.

## 0.3.333 (2026-11-13)
- New: the Warden's Fist, a fist of old stone with a gold band and a violet stone. A beaten warden always leaves it where it fell.
- Held, it hits for 2 and knocks the creature a tile straight back. Knocked into a wall, a tree or a rock, it loses 1 more: "The rat slams into the rock!" Into another creature, both lose 1.
- Its hit sounds of stone, the warden's own knock, with its own line, Fist hit, in Settings. A journey that beat the warden already finds the Fist where the warden first stood.
- Decisions: D-888. D-886 moved to the archive, word for word.
