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

## 0.3.179 (2026-11-09)
- The mole now burrows. Once it sees you in the light, it digs down and tunnels toward you, a mound of earth moving a tile a turn. You can't hit the mound. Beside you it bursts up, and you get the first swing before it bites.
- Decisions: D-726.

## 0.3.178 (2026-11-09)
- In the rooms below the first depth, about 1 flask in 4 now has no rat waiting by it. Each flask in a hall rolls on its own. That rat is still somewhere else in the room's dark, and it may be any of the depth's creatures, so a room holds as many as before.
- Decisions: D-725. Questions closed: Q-075.

## 0.3.177 (2026-11-09)
- The prices of looks are settled, and nothing in the game changes: the 13 locked looks cost 3 Glints each, 39 in all, and finishing all six Feats (36 Glints) plus your free pick buys every one, with goal Glints a small spare. Looks added later cost 3 Glints each too, and each new set comes with a new Feat, so Glints keep up.
- Decisions: D-724. Questions closed: Q-055.
