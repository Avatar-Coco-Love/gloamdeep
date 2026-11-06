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

## 0.3.66 (2026-11-06)
- The Pond Minnow's first use: choose it in the bag and press POUR, like a flask. It takes a turn and gives the lantern 15% of a tank, never past full.
- Only by hand: the flask button and "Flasks: By itself" still pour only flasks, Deep Pour makes only flasks pour more, and Records' "Flasks poured" counts only flasks.
- Decisions: D-611. D-588 moved to the archive, word for word.

## 0.3.65 (2026-11-06)
- Fishing at the pond at home: with the Wooden Rod held, bump the water to cast, a turn. A small red-and-white float lands on that tile and bobs gently.
- Each turn the line waits, a fish bites about 1 time in 6: a "!" over the float, which dips, and "Something bites!". Bump the water again on your next turn to catch a Pond Minnow, a small silver fish, into the bag in stacks of 20. Too slow, and it gets away, the float still waiting.
- Walking off, or holding another tool, reels the line in. With the bag full, the minnow slips away. Cave pools still say "Fishing comes soon."
- Decisions: D-610. D-607 moved to the archive, word for word.

## 0.3.64 (2026-11-06)
- Fishing begins: make a Wooden Rod at the workbench from 2 Wood and 2 Spider Silk. It's a plain wooden pole with a silk line and a red-and-white float.
- The rod is a tool: Hold it in the bag to put it in the Tool slot, a turn, swapping it with the Stone Pick there. Made with the Tool slot empty, it goes straight in.
- Bump the pond, or a cave pool, with the rod held and the line says "The water is still. Fishing comes soon." No turn passes. Casting comes next.
- How fishing will play: cast, wait for a bite (about 1 turn in 6), then pull within a turn. The first fish is the Pond Minnow, from the pond at home; later every pool has its own fish and finds. A fish will give oil, hearts and coins, and go into recipes.
- Decisions: D-608, D-609.
