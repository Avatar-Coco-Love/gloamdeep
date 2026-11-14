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

## 0.3.347 (2026-11-14)
- On the bag's Make tab, the workbench and the mortar, the chosen recipe now shows what the made thing does, in rows under its costs: an Oil flask how much of the lantern it fills, a draught what it does and for how many turns, a vest or charm what it changes, a pouch how big the bag grows.
- On a short phone held sideways, the description is left out when it would run into MAKE, so the numbers always show.
- Decisions: D-904.

## 0.3.346 (2026-11-14)
- Nothing in the game changed. Older decisions moved to the archive to keep the decisions page small: the vault door opening and the vault's prize, both built.
- Decisions: D-903. D-895 and D-896 moved to the archive, word for word.

## 0.3.345 (2026-11-14)
- In the bag, a chosen item now shows what it does, in rows under its name: an icon, what it does and its number in gold. A weapon shows how hard it hits, food and potions how many hearts they heal, oil how much of the lantern it fills, a draught what it does and for how many turns, armour and charms what they change, and a material what it sells for. A piece in the gear row shows its rows too.
- On a short phone held sideways, an item's description is left out when it would run into the buttons, so its numbers always show.
- Decisions: D-902.
