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

## 0.2.138 (2026-10-27)
- The stash chest now opens as a glass card that fills the screen, like the bag and the workbench. Its 12 slots sit in a 4 × 3 grid on the left; your bag's 6 sit in a 3 × 2 grid on the right.
- The chosen stack's name and count show under the bag's slots (Stone, 6 in the chest). A tap still moves it to the other side.
- Arrows move around both grids: Right from the chest's right column reaches the bag. Deconstruct is a button in the bottom left corner, and the round cross closes the card, as Esc and a tap outside still do; the Close line is gone.
- Decisions: D-387.

## 0.2.137 (2026-10-27)
- The workbench now opens as a glass card that fills the screen, like the bag. The things you can make there sit in slots on the left; the stash chest is the first.
- On the right, the card shows the chosen thing's name, each cost with how many you carry (3 / 5 Wood), and its look line. Make sits in the bottom right corner, dim with too few.
- Deconstruct is a button in the bottom left corner, away from Make. The round cross closes the card, as I, Esc and a tap outside still do; the Close line is gone.
- Decisions: D-387.

## 0.2.136 (2026-10-27)
- On the title and its pages, the dark crypt floor and the lantern's light now fill the whole screen, with no box around the name and the menu.
- With the bag open, a line the game says now shows over the card. Set down the workbench where it can't go, and you see "Only on the surface." or "There is no room there." instead of nothing.
- Decisions: D-386.

## 0.2.135 (2026-10-27)
- The bag now opens as a glass card that fills the screen, with bigger slots in a 3 by 2 grid on the left. The arrow keys move around the grid.
- On the right, the card shows the chosen item's name, how many you carry, and its look line. Its buttons sit in the bottom right corner, near your thumb.
- A small round cross at the card's top right closes it; I, Esc and a tap outside still do too. The corner buttons hide while the bag is open.
- Decisions: D-385.

## 0.2.134 (2026-10-27)
- The lantern is now a big round button in the room's bottom right corner, its rim gold while it is lit.
- A new quick slot stands left of the lantern: tap it to pour a flask from your bag, one turn, as the bag's Pour does. It shows how many flasks you carry, and goes dim when you have none.
- The bag now sits up and left of the lantern, the two round buttons curving around it.
- Decisions: D-384.

## 0.2.133 (2026-10-27)
- A round map now stands in the room's top right corner. It shows what you have found around you, about 17 tiles across, with you in the middle and the rooms next door once found.
- Tap the round map, or press M as before, to open the full map. While it is open, a small round cross in the corner closes it.
- Pause stands left of the round map, the bag under pause. Pause, the bag and the dev wrench are now round, on the same glass as the panel.
- Walk under the round map, or have a creature beside you there, and it fades almost away, like the panel.
- Decisions: D-383.

## 0.2.132 (2026-10-27)
- The room now fills the whole screen, with bigger tiles: about 11 tiles from top to bottom, and as many across as the screen is wide. The camera scrolls with you.
- A room narrower than the screen sits in the middle, with the deepest dark around it.
- The text line now sits on glass along the bottom of the room. The pause, map and bag buttons stand in the room's top right corner, and the lantern in its bottom right.
- Dev tools: the wrench stands left of the pause button. The stats line is now off at first: a new Stats switch in View shows it, small, at the bottom left.
- Decisions: D-381, D-382.

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
