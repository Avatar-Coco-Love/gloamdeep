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

## 0.2.148 (2026-10-28)
- The profiles now open as a glass card that fills the screen, on the title's scene, like Settings. PROFILES sits at its top left; each profile keeps its framed box, with its hero, name, deepest depth and play time.
- Rename, Change look and Delete are buttons along the card's bottom: RENAME, LOOK and DELETE. While one is being done, the card's title asks which (RENAME WHICH?) and its button reads CANCEL. The arrows go down the boxes onto the buttons, then left and right along them.
- The round cross goes back to the title, as Esc and a tap outside do. When the game first opens there is no title to go back to yet, so the cross is not shown. The Delete question stays as it was for now.
- Decisions: D-397.

## 0.2.147 (2026-10-28)
- New journey's "Choose a way to play" now opens as a glass card that fills the screen, like Settings. WAY TO PLAY sits at its top left, and the round cross goes back, as Esc and a tap outside still do.
- Each way is a row with its note under it, so Gentle, Normal and Hardcore can be compared at once; the chosen one is gold with the flame. Tapping a way or its note picks it.
- Settings' Way to play line, in play, opens the same card on the room: the ways that can't be picked stay grey, with their own note.
- Decisions: D-396.

## 0.2.146 (2026-10-28)
- The map now opens as a glass card that fills the screen, like the bag. MAP sits at its top left, the floor's name and its arrows in the middle of the same row, and the round cross closes it, as M, Esc and a tap outside still do. The round map in the corner hides while it is open.
- The Seed Explorer is the same card, on the title's scene: Back, Type and Reseed are buttons along its bottom, the seed in gold between them. Dragging, zooming, the floor arrows and tapping stairs work as before.
- Fixed: the map's up arrow and Page Up now turn back up to the surface; before, they stopped at depth 1.
- Decisions: D-395.

## 0.2.145 (2026-10-28)
- The seed pad now opens as a glass card that fills the screen, like Settings, both from Settings and from the Seed Explorer. SEED sits at its top left, and the round cross goes back, as Esc and a tap outside still do.
- The digits typed sit in an ember box, with the keys under it as buttons on the same 4-column grid, both in the middle of the card. The chosen key glows ember; the rest are dim. Arrows, digits and Backspace work as before.
- Decisions: D-394.

## 0.2.144 (2026-10-28)
- Version history now opens as a glass card that fills the screen, like Settings, both from the pause card and from the title. VERSION HISTORY sits at its top left, and the round cross goes back to Settings, as Esc and a tap outside still do; the Back line is gone.
- The list is the same: each version's number and title, with + to open it and − while open. An open version's lines now use the card's whole width, and the list scrolls inside the card, with its thin bar at the right.
- Decisions: D-393.
