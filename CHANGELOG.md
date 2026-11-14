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

## 0.3.360 (2026-11-14)
- On the peddler's card, on both Sell and Buy, the thing you pick now shows the bag card's picture under its rows: hearts or oil "Now" and "After", a draught's turns, or a weapon's hits beside the one you hold, as if you used it right away.
- His price line always shows; the picture is left out where it and that line would reach the button. A test checks the card fits with every thing picked.
- Docs: one finished decision moves to the archive, word for word.
- Decisions: D-917. D-915 moved to the archive, word for word.

## 0.3.359 (2026-11-14)
- On the Make card (the bag's Make tab, the workbench and the mortar), a thing you can make now shows the bag card's picture under its rows: hearts or oil "Now" and "After", or a draught's turns, as if you made it and used it right away.
- Like on the bag card, the picture is left out where it would reach the buttons. A weapon made there would show its hits beside the one you hold; none is made there yet.
- Docs: two finished decisions move to the archive, word for word.
- Decisions: D-916. D-913 and D-914 moved to the archive, word for word.

## 0.3.358 (2026-11-14)
- Fixed: with a screen reader, the Quests tab reads a goal done with no reward as "done." instead of "done, .".
- Decisions: D-915.
