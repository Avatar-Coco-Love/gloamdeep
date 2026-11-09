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

## 0.3.182 (2026-11-09)
- The scorpion now strikes with its tail. It never bites beside you. Once you are in line with it, up to two tiles away, it stops and raises its tail for a turn, and both tiles ahead are marked. On its next turn it strikes them: two hearts if you are still there. Step out of its line and the sting hits bare floor, then it stands still a turn, open to your blow. One blow of anything still kills it.
- A new switch in Settings, Attack marks, after Flasks. It starts On. Turn it Off and no creature's next move shows: no arrows, fangs, glob arrows or strike marks, on the room or on the creature list. You read the creatures by watching them and their lines.
- Decisions: D-729, D-730.

## 0.3.181 (2026-11-09)
- Rats now hunt in packs. From depth 3, in about 1 room in 3, the rat by the flask has two packmates beside it. Once one of them sees you, all three come, and each heads for its own side of you to surround you. While two of a pack are left, a hurt rat stands its ground; the last one may still run. A rat on its own acts as before. The rat's Bestiary page says so.
- Decisions: D-727, D-728.

## 0.3.180 (2026-11-09)
- Creatures no longer walk around things lying on the floor. They step right over them, and the find stays where it lies. Beat a creature standing on a find, and what it drops lies on that same tile, so one step picks up both.
- Decisions: D-727.
