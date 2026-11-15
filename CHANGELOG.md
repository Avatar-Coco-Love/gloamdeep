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

## 0.3.385 (2026-11-15)
- The Lampeater moves now, only through the dark: it never steps onto a lit tile. Seeing you, it comes a tile a turn to the edge of your light, or right up beside you with your lantern off.
- Light falling on it, it slides back into the dark. It still doesn't bite and blows still sink into it; losing you, it drifts back to its place below the sealed door.
- Decisions: D-943.

## 0.3.384 (2026-11-15)
- Docs only, nothing in the game changed: three finished decisions moved from the decisions file to the archive, word for word, so it has room again.
- Decisions: D-942. D-799, D-894 and D-910 moved to the archive, word for word.

## 0.3.383 (2026-11-15)
- The Lampeater stands in its arena on depth 8: a low pool of deep violet gloam with a dripping edge, a dark mouth and pink eyes, waiting a tile below the tile before the sealed door. With the lantern off you still see its eyes glowing in the dark.
- For now it only waits there. It never moves or bites, and a blow sinks into it, hurting nothing: "Your blow sinks into the gloam." The 4 braziers still sink the door until it can be beaten.
- It has a Bestiary page, met when your light reaches it. Like the Warden's, how to fight it opens after 1 is beaten.
- Saves from before: an arena already made gets the Lampeater.
- Decisions: D-941. D-938 moved to the archive, word for word.
