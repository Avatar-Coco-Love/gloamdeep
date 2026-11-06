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

## 0.3.78 (2026-11-06)
- The dev panel is a bottom sheet now: half the screen tall, along its foot, with a row of icon tabs across its top (an eye, a sparkle, a door, a drop, a heart, an arrow) and the open section's name above its tools.
- While it is up the room slides clear above it, so the hero stays in sight; tap the open tab again and the sheet folds to its tabs. On a sideways phone or a PC it sits at the bottom left and the room slides right instead.
- Decisions: D-623. D-615 and D-616 moved to the archive, word for word.

## 0.3.77 (2026-11-06)
- Behind the scenes: a new maker tool. One command writes every empty piece of a new creature, find, tile or person, with a grey "?" picture until it is drawn, and the checker then names each number, line and picture still to fill. New things reach the game faster.
- Nothing in the game changes.
- Decisions: D-622. D-613 and D-614 moved to the archive, word for word.

## 0.3.76 (2026-11-06)
- Behind the scenes: a new checker runs with the tests. For every creature, find, tile and person it names any missing piece (a line, a picture, a hit flash, a sound, where it lives, a test or its row in the docs) and the file to fix, so new things reach the game faster and with fewer bugs.
- It found the Snapcap Gill missing from the content list; it is listed now. Nothing in the game changes.
- Decisions: D-621. D-611 and D-612 moved to the archive, word for word.
