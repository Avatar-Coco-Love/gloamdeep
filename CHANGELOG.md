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

## 0.2.156 (2026-10-28)
- Steering mock-ups are picked: the arrow pad will be one round glass disc in the bottom left corner, each quarter an arrow, off at first. A press steps once; held, it keeps walking.
- Tapping a tile will walk the hero there at once, with gold dots along the way, and is on at first; today's one-step tap goes. A tap while walking stops, costing no turn, and the walk stops by itself when a creature comes into view.
- In play the version number will show only on the title and the pause menu. Tap to walk comes first. Planned, not built yet.
- Decisions: D-406, D-407.

## 0.2.155 (2026-10-28)
- Past a small room's edge, the rock, brick or trees now go on all around to the screen's edges instead of a flat dark colour, drawn so no seam shows where the room ends. Nothing past the edge can be walked on.
- It is lit like the room: as remembered as the edge tile next to it, pitch dark where you haven't been, and in full daylight outside. The lantern doesn't reach through the rock.
- Out from each doorway a passage runs on to the screen's edge, so a way out looks like one; the lantern lights it as you come near. Behind the woods' cave mouth the trees go on.
- Decisions: D-405.

## 0.2.154 (2026-10-28)
- Past a small room's edge, whatever stands there (rock in a cave, trees outside) will go on all around, lit like the room, so no flat colour or seam shows beside it. Planned, not built yet.
- Steering is to get easier: an on-screen arrow pad and tapping a tile to walk there, each one you can turn on or off, beside swiping. Mock-ups come first.
- Decisions: D-403, D-404. Questions opened: Q-066, Q-067.

## 0.2.153 (2026-10-28)
- The round buttons on the title have new icons, drawn at the game's own pixel size instead of doubled pixels: an open book with lines for Journal, a round question mark for How to play, a gear with a hole for Settings, and a wrench with an open jaw for the Seed Explorer.
- Decisions: D-402.

## 0.2.152 (2026-10-28)
- The title screen is laid out like a phone game's. The hero stands in the lantern's light in the middle, with one big button under them: CONTINUE while a journey is saved, with New journey as a grey line under it, or NEW JOURNEY on its own.
- Journal, How to play and Settings are round buttons in the top right corner, each with a small icon (a book, a question mark, a gear) and its name under it. On a squarer screen they stand down the right side instead.
- The profile you are playing sits top left as a small glass box with your hero, name and deepest depth; tapping it opens Profiles, so the Profiles line is gone. The Seed Explorer is a round button with a wrench in the bottom left corner.
- The name Gloamdeep is bigger and lit from below, dim at the tops of the letters and gold at their feet, as if the hero's lantern shone up at it.
- Decisions: D-401.

## 0.2.151 (2026-10-28)
- Start over?, Delete …? and Play …? (the easier way to play) now open as a small glass card in the middle of the screen, the title's scene or the room dim around it. The question sits at its top left in ember, with the grey note under it.
- Yes and No are buttons along the card's bottom, YES and NO, with NO picked first as before; the arrows move between them. The round cross, Esc and a tap outside the card all mean No.
- Decisions: D-400. Questions opened: Q-065.

## 0.2.150 (2026-10-28)
- Choosing a profile's look now opens a glass card that fills the screen, on the title's scene, like the name card: CLOAK, then EYES, TRIM and CLOTHES at its top left.
- The choices keep their framed boxes, centred in the card, the picked one framed in gold; OK is a button in the bottom right corner.
- The round cross goes back a card, as Back did, and so does a tap outside the card, so the Back line is gone. Esc still works as before.
- Decisions: D-399.

## 0.2.149 (2026-10-28)
- Naming a new profile now opens a glass card that fills the screen, on the title's scene, like the seed pad. NAME sits at its top left, or RENAME when renaming a profile.
- The name typed sits in an ember box, and each letter is a small button on the same 7-column grid, with DEL and OK wider buttons on the last row; the chosen key is ember and gold, the rest dim.
- The round cross goes back to the profiles, as Esc and a tap outside do, so the Back key is gone.
- Decisions: D-398.

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
