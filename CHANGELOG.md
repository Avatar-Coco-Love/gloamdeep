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

## 0.2.145 (2026-10-28)
- The seed pad now opens as a glass card that fills the screen, like Settings, both from Settings and from the Seed Explorer. SEED sits at its top left, and the round cross goes back, as Esc and a tap outside still do.
- The digits typed sit in an ember box, with the keys under it as buttons on the same 4-column grid, both in the middle of the card. The chosen key glows ember; the rest are dim. Arrows, digits and Backspace work as before.
- Decisions: D-394.

## 0.2.144 (2026-10-28)
- Version history now opens as a glass card that fills the screen, like Settings, both from the pause card and from the title. VERSION HISTORY sits at its top left, and the round cross goes back to Settings, as Esc and a tap outside still do; the Back line is gone.
- The list is the same: each version's number and title, with + to open it and − while open. An open version's lines now use the card's whole width, and the list scrolls inside the card, with its thin bar at the right.
- Decisions: D-393.

## 0.2.143 (2026-10-28)
- Behind the scenes: the third tidy-up of the notes and code. Nothing in the game changes.
- The Version history's data is split into three smaller files by version, word for word, so it shows exactly as before.
- Older decisions and changelog entries moved, word for word, into the archive.
- Decisions: D-392.
