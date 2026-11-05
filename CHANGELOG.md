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

## 0.3.50 (2026-11-05)
- You can now travel between waystones you have woken. Stand on a woken plate and tap the hero, or press Space or Enter, and the travel card opens. Walking over the plate never opens it.
- The card lists every waystone, home first, then by depth. One you haven't woken shows as ???, and the one you stand on is greyed out. Pick a woken one and you arrive on its plate.
- Travel is free: no turn passes and no oil burns, and creatures where you arrive can't move before you do. You can't travel with a creature awake beside you or chasing you.
- Decisions: D-593. Questions closed: Q-080.

## 0.3.49 (2026-11-05)
- A second waystone now stands asleep on depth 2, the top of the caves: in one of the two rooms away from the stairs up, the seed's pick, near the room's middle with open floor all around it.
- It looks like the home stone for now. Step onto its plate and it wakes, just as the home one does. Travelling between them comes next.
- A journey already saved gets it too: if you have been in its room, that room is made again once, with the stone. If you are standing in it, you start on that floor's stairs up.
- Decisions: D-592.

## 0.3.48 (2026-11-05)
- Step onto the home waystone's plate and it wakes: its rune lights violet from the bottom up, a soft ring of light spreads over the cross, and three soft bells ring. "The waystone wakes."
- Once woken it stays woken, its rune lit with a faint violet glow you can find at night, like the stairs. Waking costs nothing more than the step. Travelling between waystones comes later.
- Decisions: D-591.
