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

## 0.3.243 (2026-11-10)
- New: the Ward Draught, a pale green-white bottle. Once you have held Centipede Leg and Herb, the mortar makes it from 2 Centipede Leg and 1 Herb. Drink it from your bag and any poison ends at once, and for 60 turns a centipede's bite still hurts but never poisons you. A pale bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while you sleep, and a fall ends it.
- Decisions: D-795.

## 0.3.242 (2026-11-10)
- New: the Mending Draught, a moss green bottle. Once you have held Mimic Leaf and Herb, the mortar makes it from 2 Mimic Leaf and 1 Herb. Drink it from your bag and it heals you slowly: a heart every 15 turns for 60 turns, 4 in all, never above full. A green bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while you sleep, giving no hearts then, and a fall ends it.
- Mimic Leaf now says "good for making things", and its card shows "Makes a Mending Draught at the mortar".
- Decisions: D-794.

## 0.3.241 (2026-11-10)
- Day creatures, third: the rare herb mimic. Each day one of the woods rooms round home, picked by your seed, has a herb mimic too, beside its mole and bunny. It sleeps on the grass looking just like a herb, wakes with a bump and chases you, and leaves a Mimic Leaf as it does below. Gone by nightfall like the others.
- Decisions: D-793.
