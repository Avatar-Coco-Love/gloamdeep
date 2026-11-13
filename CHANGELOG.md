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

## 0.3.333 (2026-11-13)
- New: the Warden's Fist, a fist of old stone with a gold band and a violet stone. A beaten warden always leaves it where it fell.
- Held, it hits for 2 and knocks the creature a tile straight back. Knocked into a wall, a tree or a rock, it loses 1 more: "The rat slams into the rock!" Into another creature, both lose 1.
- Its hit sounds of stone, the warden's own knock, with its own line, Fist hit, in Settings. A journey that beat the warden already finds the Fist where the warden first stood.
- Decisions: D-888. D-886 moved to the archive, word for word.

## 0.3.332 (2026-11-13)
- The warden's slam hurts more now. Knocked back into a wall, a tree, a rock or a thing set down with tiles still to go, you lose a heart more: "You slam into the tree!"
- Knocked into a creature, you and it lose a heart each; one beaten so leaves no drop and no experience. Knocked into the peddler, only you are hurt.
- Water, a dug-in creature or a pile of bones just stops the slide. Knocked toward an open doorway, you slide right out into the next room.
- Decisions: D-887. D-884 moved to the archive, word for word.

## 0.3.331 (2026-11-13)
- The warden fights harder. Beside you, it raises its fists for a turn instead of biting: its own new picture, trembling, with the pink mark on your tile. Then it slams: it takes a heart and knocks you 3 tiles straight back in a fast slide. Step out of its way while its fists are up and it hits the floor; then it rests a turn, your chance to strike.
- For now a wall, a tree or a creature behind you just stops the slide short. The hurt they do is the next step.
- Its fists going up play its heavy stone sound. Its lines: "The warden raises its fists!", "The warden slams you back!", "The warden's fists hit the floor."
- Decisions: D-886. D-883 moved to the archive, word for word.
