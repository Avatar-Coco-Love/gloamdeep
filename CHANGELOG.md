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

## 0.3.287 (2026-11-11)
- New: music in the dungeon. On every floor from 8 down, the cold blue halls, a very still, dark tune of long held sounds plays non-stop, looping with no break and carrying on from floor to floor. Going down from the warrens fades the warrens' tune out over 2 seconds, and the dungeon's starts a second later, fading in.
- New: Music's list in Settings has a line for it, Dungeon, after Warrens.
- Notes: the tune is "Patreon Challenge 04" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. Every place below now has its music.
- Decisions: D-841.

## 0.3.286 (2026-11-11)
- New: music in the warrens. On floors 5 to 7, the earth burrows, a dark, slow, low tune plays non-stop, looping with no break and carrying on from floor to floor. Going down from the rock caves fades the caves' tune out over 2 seconds, and the warrens' starts a second later, fading in; going on down to the dungeon fades it out the same way.
- New: Music's list in Settings has a line for it, Warrens, after Rock caves.
- Notes: the tune is "Patreon Challenge 11" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. The dungeon is still quiet, its own step.
- Decisions: D-840.

## 0.3.285 (2026-11-11)
- New: music in the crypt. From the cave mouth on, in the crypt's two top rooms and on floor 1 below them, a quiet, dark, slow tune plays non-stop, looping with no break and carrying on down the crypt's stairs. Walking in from the woods fades the surface's tune out over 2 seconds, and the crypt's starts a second later, fading in; going down to floor 2 swaps it for the caves' tune the same way.
- New: Music's list in Settings has a line for it, Crypt, between Surface and Rock caves.
- Notes: the tune is "Ludum Dare 30 05" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. The warrens and the dungeon are still quiet, one step each.
- Decisions: D-839.
