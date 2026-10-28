# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.2.js` (D-254).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.144 (2026-10-28)
- Version history now opens as a glass card that fills the screen, like Settings, both from the pause card and from the title. VERSION HISTORY sits at its top left, and the round cross goes back to Settings, as Esc and a tap outside still do; the Back line is gone.
- The list is the same: each version's number and title, with + to open it and − while open. An open version's lines now use the card's whole width, and the list scrolls inside the card, with its thin bar at the right.
- Decisions: D-393.

## 0.2.143 (2026-10-28)
- Behind the scenes: the third tidy-up of the notes and code. Nothing in the game changes.
- The Version history's data is split into three smaller files by version, word for word, so it shows exactly as before.
- Older decisions and changelog entries moved, word for word, into the archive.
- Decisions: D-392.

## 0.2.142 (2026-10-28)
- The Journal now opens as a glass card that fills the screen, like How to play, both from the pause card and from the title. JOURNAL sits at its top left, and the round cross goes back, as Esc and a tap outside still do; the Back line is gone.
- Records and Growth are tabs under the heading. The open one is gold, with the flame, and underlined. A tap on a tab opens it; Left and Right still turn them, and Enter turns to Growth.
- Each tab's rows sit under the tabs, the name on the left and its value in a column on the right.
- On Growth, Add a heart is a button in the bottom right corner, with "1 ember each" beside it. It is dim while no ember can buy a heart. Enter presses it too.
- Decisions: D-391.
