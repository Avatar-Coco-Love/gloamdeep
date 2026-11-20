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

## 0.3.439 (2026-11-20)
- A bug fixed (F-9): chopping a tree or digging out a stump on the surface
  no longer stalls the screen. Only the tiles that changed are painted
  again, not the whole woods and its border; the picture is the same. On
  a slow phone a chop's pause goes from almost a second to a blink.
- The Lampeater's phases stay as they are. Its polish waits while the
  owner playtests, for new ideas.
- Decisions: D-1003.

## 0.3.438 (2026-11-20)
- Two lure wisps now drift in the Lampeater's arena, either side of it at
  the start. As you come near, each drifts toward the Lampeater, showing
  where it lurks in the dark. They are the arena's own, as its gloamlings
  are: no Wisp Glass, and they fade when it is beaten.
- A bug fixed (F-10): a journey saved before today with the arena in an
  older shape is brought up to date as it loads: the door sealed again
  while the Lampeater lives, its gloamlings and wisps given, or, beaten
  long ago with Leap never learnt, Leap's find laid on its tile.
- Decisions: D-1001, D-1002.

## 0.3.437 (2026-11-20)
- Nothing in the game changed: the planning board's picks are read back
  and written up. The 97 kept ideas make the roadmap to 1.0,
  `docs/ROADMAP.md`, by Now, Next and Toward publishing, in build order.
- The 29 maybes and 15 drops go to `docs/RESEARCH-PLANNING.md`, each with
  why and when to look again; the owner's two new ideas to `RESEARCH-2.md`.
- Decisions: D-998, D-999, D-1000.
