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

## 0.3.448 (2026-11-21)
- On the stash chest's card, the bag's slots scroll too when they don't
  all fit, the same way as on the bag card: drag or flick them, use the
  wheel or the arrows, or drag the thin bar beside them. They stop where
  the chosen find's name and count still fit below.
- Only a very short upright window needs it; on every phone tried the
  card looks as before.
- Decisions: D-1012. B-014 fixed.

## 0.3.447 (2026-11-21)
- The bag's slots can scroll now, when they don't all fit on the card: drag
  them, or flick them and they glide, slow and come to rest with whole rows
  showing. A thin bar beside them shows where you are, gold while they
  move, and can be dragged too. The mouse wheel moves them a row, and the
  arrow keys bring the chosen slot's row into view.
- On every screen tried so far a bag of 12 fits, so you won't see it yet:
  it switches on by itself only where the slots don't fit.
- Decisions: D-1011. B-014's bag card half fixed.

## 0.3.446 (2026-11-21)
- On a small phone held upright, the stash chest's DECONSTRUCT and STORE
  buttons now stand at the top of its card, beside the close button, in
  place of the words STASH CHEST, so the bag's slots no longer lie over
  them. On every other screen the card is as before.
- The chosen stack's name on that card no longer runs below its edge.
- Behind the scenes: every card's buttons are checked on the smallest
  phones' screens, and the text line's step (it never covers the hero)
  is ticked, built back at 0.3.427. The plan for talking with choices is
  set: a card low on the screen, in the game's own letters.
- Decisions: D-1010.
