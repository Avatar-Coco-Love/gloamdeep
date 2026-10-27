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

## 0.2.132 (2026-10-27)
- The room now fills the whole screen, with bigger tiles: about 11 tiles from top to bottom, and as many across as the screen is wide. The camera scrolls with you.
- A room narrower than the screen sits in the middle, with the deepest dark around it.
- The text line now sits on glass along the bottom of the room. The pause, map and bag buttons stand in the room's top right corner, and the lantern in its bottom right.
- Dev tools: the wrench stands left of the pause button, and the stats line is at the top middle.
- Decisions: D-381.

## 0.2.131 (2026-10-27)
- The hearts, level, oil and depth now sit on a see-through glass panel over the room's top left, and the column beside the room is gone.
- The creature list stands under the panel, down the room's left. Tapping a plaque still frames its creature.
- Walk under the panel, or have a creature beside you there, and the panel and the plaques fade almost away, so nothing is hidden.
- Decisions: D-380.

## 0.2.130 (2026-10-27)
- The game now plays sideways only, on every screen. The hearts, depth and oil always stand in a column at the room's left, and the buttons beside the room.
- A phone held upright pauses the game and shows a picture asking you to turn it sideways. Turn it back and the pause menu waits. A PC window is never asked, whatever its shape.
- On a phone that allows it (Android), Play, Continue or Resume also go full screen and lock the screen sideways. iPhone browsers can't lock, so the picture asks instead.
- Put on the home screen, the game now opens sideways by itself.
- Decisions: D-377.

## 0.2.129 (2026-10-27)
- Decided: the game will play sideways only, full screen, on every screen. A phone held upright will pause and ask you to turn it; on Android, Play also locks it sideways. Installing stays optional. This comes next.
- Decided, from the mock-ups: a Genshin Impact feel. The room fills the screen, the hearts and oil sit on a glass panel top left, a round map top right, and the lantern becomes a big round button with the bag, map and a quick slot around it. Menus become full-screen cards, the bag first.
- Kept for later, from the Brogue talk: a bot that hunts broken seeds, floors that line up with the ones above, a dimension rift with bizarre creatures, generated beginnings and backstories, and a much bigger world, the surface first.
- Nothing in the game changed.
- Decisions: D-377, D-378, D-379.

## 0.2.128 (2026-10-27)
- The research notes are split in two: the owner's wish list and kept ideas stay in `RESEARCH.md`, and the games, how they do bosses, and talks worth hearing move to a new `RESEARCH-GAMES.md`.
- Kept for later, from the Into the Breach talk: a combat sandbox and a seeded puzzle tester, to sit with the Seed Explorer under one tools line on the title menu.
- Nothing in the game changed.
- Decisions: D-376.

## 0.2.127 (2026-10-26)
- The game can now be put on a phone's home screen, and it opens full screen like an app. On Android, Chrome may offer it once by itself; if you say no, it stays quiet for a long time. On iPhone, use Share, then Add to Home Screen.
- Its icon is the lit lantern from the lantern switch, on its own, drawn by the game's code.
- It still needs a connection to start, and plays and saves just as before. On iPhone, the home-screen game keeps its own saves, apart from Safari's.
- Decisions: D-375.

## 0.2.126 (2026-10-26)
- A new creature, the scorpion, drawn from above: two big pincers, eight legs and its tail curled to one side. It has 1 heart, so one hit of anything kills it, but its sting takes 2 hearts.
- Each scorpion wears one of five colours, Sand, Rust, Coal, Olive or Bone, picked by the world's seed, so no two floors look quite alike.
- It chases you once it sees you in the light. On each floor of depths 3 and 4, one room holds a scorpion in place of its rat, never the lampmoth's room.
- Its sting has its own sound: two dry clicks of claws, then a sharp stab.
- Creatures now give more experience: their hearts and bite added together. A lampmoth gives 2, a rat, gloamling or scorpion 3, a flask mimic 4. A new room still gives 1.
- Decisions: D-370, D-371, D-372, D-373, D-374.

## 0.2.125 (2026-10-25)
- Fixed: hitting a flask mimic without killing it froze the game, and a saved game froze again when loaded.
- Hurt, the flask mimic now says "The flask mimic cracks." Its bite on the same turn still says more.
- A creature with no line for something now says nothing new instead of freezing, and a test checks every creature's lines are there.
- Decisions: D-369.

## 0.2.124 (2026-10-25)
- A new creature, the flask mimic. It looks just like an oil flask, and it doesn't show on the creature list.
- Bump it and it opens its eyes, with no harm done, and wakes. It does nothing that turn, so you have a step's start to run.
- Awake, it has pink eyes and a row of teeth, 3 hearts and a bite of 1, and it chases you. After 6 turns it settles back down as a flask where it stands.
- About 1 room in 4 on depths 3 to 5 holds one, as well as everything the room already had, so there is as much oil as before.
- Its bite clinks of glass, then snaps.
- Decisions: D-365, D-366, D-367, D-368. Questions closed: Q-062.

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
