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

## 0.3.240 (2026-11-10)
- New: Slowburn, a bottle dark as lamp oil. Once you have held Tick Shell and Oilcap, the mortar makes it from 2 Tick Shell and 1 Oilcap. Drink it from your bag and your lantern burns slower for 60 turns: a full tank lasts 70 turns, not 60, on top of the Heart Charm. An amber bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while your lantern is empty or you sleep, and a fall ends it.
- Tick Shell now says "good for making things", and its card shows "Makes a Slowburn at the mortar".
- Fixed: the Glow Draught's DRINK button looked dim at full health, though it could always be drunk.
- Decisions: D-792.

## 0.3.239 (2026-11-10)
- New: the Glow Draught, a gold bottle. Once you have held Duskstar and Wisp Glass, the mortar makes it from 2 Duskstar and 1 Wisp Glass. Drink it from your bag and your lantern's light reaches 1 tile farther for 60 turns, on top of Wide Glow. A gold bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while your lantern is empty or you sleep, and a fall ends it.
- Duskstar and Wisp Glass now say "good for making things", and their card shows "Makes a Glow Draught at the mortar".
- Decisions: D-791.

## 0.3.238 (2026-11-10)
- New: the Mortar and Pestle, a stone bowl on a stump. Make it on the bag's Make tab from 4 Stone and 1 Wood, then set it down outside like the bed. Bump it, day or night, to open its card; it has nothing to make yet, and the Glow Draught comes next. DECONSTRUCT puts it back in your bag.
- Decisions: D-789, D-790.
