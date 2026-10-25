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

## 0.2.124 (2026-10-25)
- A new creature, the flask mimic: an oil flask with pink eyes and a row of teeth. It never moves, and bites whoever stands next to it.
- It has 3 hearts and bites for 1. About 1 room in 4 on depths 3 to 5 holds one, as well as everything the room already had, so there is as much oil as before.
- Its bite clinks of glass, then snaps.
- Decisions: D-365, D-366, D-367.

## 0.2.123 (2026-10-25)
- The second tidy-up, seven versions early. Nothing in the game changes.
- The turn rules' biggest file is split into six smaller ones (the creatures' turn, a fall, the bag's buttons, and more), so new creatures and finds are quicker to add.
- A new page in the docs lists every creature, find, tile, light and place with its numbers, and the tech notes list the files each new kind of content touches.
- Decisions: D-362, D-363, D-364.

## 0.2.122 (2026-10-25)
- How to play's Touch, Mouse and Keyboard pages have a new row, Frame: tap (or click) a creature's plaque, or press Tab.
- Decisions: D-361. Questions closed: Q-060.

## 0.2.121 (2026-10-25)
- Tap a creature's plaque in the row under the room to frame it: the plaque gets an amber edge, amber corners mark the creature on the field, a small tag above it shows its name and hearts, and an arrow shows its next step.
- The frame stays as you play. Tap the same plaque to let it go, or another to frame that one instead. It goes when the creature dies or leaves the light.
- On a keyboard, Tab frames the first plaque, then the next, then none.
- Framing takes no turn.
- Decisions: D-359, D-360.

## 0.2.120 (2026-10-25)
- A new row under the room lists the creatures that have noticed you and stand in light. Each has a small plaque with its face and what it does next if you wait: fangs for a bite, an arrow for a step. One that has noticed you but can't move shows just its face.
- A lampmoth flying at your lit lantern gets a plaque too.
- New plaques join at the end of the row, and one goes when its creature dies or leaves the light. If more than 7 are listed, the last spot says how many more ("+2").
- Held sideways, the plaques stack under the hearts, depth, oil and level.
- Decisions: D-358.
