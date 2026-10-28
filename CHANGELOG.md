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

## 0.2.159 (2026-10-28)
- The arrow pad: a round glass disc in the bottom left corner, one arrow in each quarter. Press a quarter and the hero steps that way at once; hold it and they keep walking, 4 steps a second. Slide your thumb onto another quarter to turn. The pressed arrow turns gold, and the pad fades while the hero or a creature is under it, as the round map does.
- Settings has a new Arrow pad switch, under Tap to walk, Off at first. How to play's Walk line says the pad can be turned on in Settings, or names it once it is on.
- The version number shows only on the title and the pause menu, no longer in play.
- Decisions: D-411.

## 0.2.158 (2026-10-28)
- A bite stops a walk to a tapped tile, with a "!", whichever Stop walking choice is set.
- Decisions: D-410.

## 0.2.157 (2026-10-28)
- Tap to walk: tap a tile and the hero walks there at once, around walls, 4 steps a second, with small gold dots on the way still to go and corners marking the tile. Tap again while walking to stop; stopping costs no turn. Holding a finger on a tile does the same as a tap.
- A tap on a tile beside the hero still steps there, so it bites, mines or opens as before. A tap on dark you haven't seen walks as far as the ground you remember goes. A key, a swipe or Space ends a walk.
- The walk stops by itself, with a "!", when a find or a creature comes into view. A new Settings line, Stop walking, can make it stop for a creature only once it has noticed you (When noticed) instead of on sight.
- Settings' Controls line is now two switches, Swipe and Tap to walk, both On at first; your old pick carries over. The Arrow pad switch comes with the pad. How to play says how walking works now.
- Decisions: D-409. Questions closed: Q-067.
- Docs: decisions D-401 to D-403 and D-405 moved to archive/DECISIONS-TITLE-EDGE.md.

## 0.2.156 (2026-10-28)
- Steering mock-ups are picked: the arrow pad will be one round glass disc in the bottom left corner, each quarter an arrow, off at first. A press steps once; held, it keeps walking.
- Tapping a tile will walk the hero there at once, with gold dots along the way, and is on at first; today's one-step tap goes. A tap while walking stops, costing no turn, and the walk stops by itself when a creature comes into view.
- In play the version number will show only on the title and the pause menu. Tap to walk comes first. Planned, not built yet.
- Tap to walk will fit in like this: holding a finger on a tile does the same as tapping it; Settings' Controls line becomes three switches, Swipe, Tap to walk and Arrow pad; a walk stops by itself when a creature or a find comes into view, or, by a Settings choice, when a creature notices you; a tap on unexplored dark walks as far as you remember. How to play will say the arrow pad can be turned on in Settings.
- Decisions: D-406, D-407, D-408.

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
