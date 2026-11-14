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

## 0.3.368 (2026-11-14)
- New at the workbench: the Shovel, the BUILD tab's last slot. It costs 3 Wood and 2 Stone, and you carry one. Hold it in the Tool slot, as you hold the picks and the rod.
- With the shovel held, walk onto a stump to dig it out: a turn, and you stay where you are. Plain grass is left, and the tree never grows back there, so you can clear room for a base.
- Without the shovel held, you walk onto a stump as before. A standing tree is still chopped, not dug.
- Decisions: D-926.

## 0.3.367 (2026-11-14)
- A creature chasing you now follows you out of a room, through a doorway, the cave mouth or down and up stairs, if it is within 3 steps of where you leave. Stairs are no longer a sure escape.
- It comes in as many turns after you as it was steps away, on the tile you came in by, still chasing. One right behind you comes in the turn after.
- Leave that room again before it comes, and it gives up: you may find it later in either room, somewhere new, no longer chasing.
- The rat, the gloamling, both mimics, the bone rat, the oil tick, the centipede and the rim lurker follow. The warden keeps to its vault, and bats and lampmoths stay behind.
- The round map's rim stays red while one is on its way.
- Decisions: D-925. Questions closed: Q-107.

## 0.3.366 (2026-11-14)
- You can now cut a room in two with what you set down: a workbench, chest, bed, torch or anything else that sets down can block a narrow gap, even walling off part of the room. Deconstruct takes it back, and a torch burns out.
- A chopped tree now grows back on its stump even where it cuts the room in two (still out of sight, after 3 days). Chopping is the way through.
- With no room in the bag for the wood, the fourth chop fells the tree all the same: "You can't carry more wood.", and its 3 Wood lie on the stump and the open tiles next to it. Before, the tree stayed standing, which could have walled you in.
- Ore deposits that grow back still never cut a room in two.
- Decisions: D-924. D-899 moved to the archive, word for word.
