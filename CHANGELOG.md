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

## 0.3.110 (2026-11-07)
- Tough is on the Growth tree: in the Journal's Growth tab, Body now holds two places in its first row, Heart and Tough above it. Tough costs 1 ember and is bought once.
- With Tough, a bite that hurts poisons you only about 1 time in 2, by the journey's dice. When it does, poison runs as before.
- Tough's place shows poisoned's drop, grey until bought and pale green after. On a small sideways screen the tree draws a little closer so it fits under the tabs.
- Decisions: D-657.

## 0.3.109 (2026-11-07)
- Nothing in the game changed yet. The Growth upgrade against poison is picked: Tough, on the Body branch, for 1 ember.
- With Tough, a bite that hurts poisons you only about 1 time in 2. The Centipede Charm still makes poison shorter, and the Antidote still ends it.
- It will sit in Body's first row, above Heart, so that row holds two places.
- Decisions: D-657. D-646 moved to the archive, word for word.

## 0.3.108 (2026-11-07)
- A new charm, the Centipede Charm: a drop of pale green venom in a copper setting. Make it at the workbench, after the rod, from 3 Centipede Leg and 1 Copper Ore. You have one at a time.
- Choose it in the bag and press Wear; no turn passes. It goes in a charm slot beside the Wisp or Heart Charm.
- While you wear it, poisoned lasts 3 turns, not 6, and takes 1 heart, not 2. A bite still poisons you, so the Antidote still helps.
- Decisions: D-656. D-645 moved to the archive, word for word.
