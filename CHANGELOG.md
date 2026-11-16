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
- `0.4.0`: when the way to depth 9 opens, chapter 1 done (D-954).
- Later minor versions (`0.5`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.407 (2026-11-16)
- When the floor gives way round the stairs, you now see it go: cracks run across the seal stones, then they all fall together into the dark, shrinking and darkening as they drop. It takes about half a second, ending with the shake.
- With reduced motion the stones are simply gone, as before.
- Decisions: D-965.

## 0.3.406 (2026-11-16)
- The floor now waits. Beat the Lampeater and its door sinks open ("The door sinks open. You learn Leap."), but the seal stones round the stairs stay standing.
- Walk up to the tile before the door, or onto the door, and the floor gives way: the room shakes and the stones fall into the gap. "The floor gives way." Beat the Lampeater while already standing there and it all happens on the same blow, as before.
- Decisions: D-964. D-962 moved to the archive, word for word.

## 0.3.405 (2026-11-16)
- The escape begins. Beat the Lampeater and, as its door sinks open, the old seal stones round the stairs down fall away into a black gap, leaving the stairs standing alone. The last blow now says "The floor gives way. You learn Leap."
- You can't step into the gap ("Too wide to step across."), but from the open door you can leap over it, straight onto the stairs, and down you go.
- Decisions: D-963. D-961 moved to the archive, word for word.
