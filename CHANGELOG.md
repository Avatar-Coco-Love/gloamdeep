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

## 0.2.180 (2026-10-30)
- The scope's part 2, raw things, is settled. Each biome brings one new metal for now, 2 or 3 plants to gather (one of them an oil plant) and, below the surface, a wood of its own.
- Better picks open each new ore, better axes the deeper woods, and tools open new places too. Stone stays breakable by hand.
- Fishing will work in any water, on the surface and below, with the right tools. Farming will be a garden at home that grows while you are below.
- Nothing in the game changes yet: each thing gets its names and numbers at its own step.
- Decisions: D-450 to D-452.

## 0.2.179 (2026-10-30)
- Settings' Tap to walk line is now Tap, with three choices: Off, Step and Walk. Pick it, or press Right, to go on; Left goes back.
- Step brings back the first tap: each tap moves the hero one tile toward it, along the farther side. Hold a finger, or the mouse button, and the hero keeps stepping toward it, about 4 steps a second; slide to steer, lift to stop. Walk is the tap to walk from before.
- New players start on Step. If you already changed anything in Settings, your pick stays: On is now Walk, Off stays Off.
- How to play says how Step works: tap toward a tile, then or swipe, or hold to keep going.
- Decisions: D-449.

## 0.2.178 (2026-10-30)
- Taking a doorway or stairs into a room of another width, the zoom now glides from the old room's to the new one's while the new room fades in, over 0.4 seconds, starting and landing gently, instead of jumping in the dark. For that moment some pixel rows are a hair wider than others, then everything is crisp again. With reduced motion on, it jumps as before.
- Decisions: D-448.

## 0.2.177 (2026-10-29)
- Every corner piece now fades almost away while the hero, or a creature beside the hero, is under it, as the glass panel and the round map already did. Each corner fades as one piece: in the top right, the round map, pause and the wrench; in the bottom right, the lantern with the bag and the quick slot on its arc. When any button in a corner is covered, the whole corner fades, so it never looks half faded.
- Decisions: built as D-442 says; D-447.

## 0.2.176 (2026-10-29)
- Past the crypt's doorway that leads outside, the woods no longer show. Past every room's edge, its own rock or trees go on, as they did before 0.2.173, and the doorway out is a dark way on. The bright strip of trees over black rock looked pasted on, and the woods showed nothing back past the cave mouth, so a rat waiting by the door stayed hidden.
- Coming into a room by a doorway, stairs or the cave mouth, your first step there is your own: the creatures in that room skip that one turn, so you see what waits before it can bite. A rat left chasing by the door no longer bites the moment you step back in.
- Decisions: D-445 and D-446. Questions closed: Q-070.

## 0.2.175 (2026-10-29)
- A room narrower than the screen now zooms in until it fills the width, with a margin of one and a half tiles past each side, so the first room and others like it look bigger on a phone held sideways. It never shows more than before, about 11 tiles from top to bottom, and never fewer than 9, so what comes from above and below still shows.
- The camera now stops one and a half tiles past every edge of a room, big rooms too, so the hero at a wall keeps a little room from the screen's edge. The rock past the edge, and the woods past the doorway out, show in that margin.
- The controls, the glass panel, the creature plaques, the text line and every card (pause, bag, map and the rest) keep their size, on their own layer over the room, so the cards fit the screen however the room zooms.
- Decisions: built as D-441 and D-443 say; D-444.

## 0.2.174 (2026-10-29)
- Nothing in the game changes yet. Pictures drawn by the game, on a phone held sideways, compared today's camera with zooming in so a room fills the screen. Picked, the owner's idea: a room narrower than the screen zooms in until it fills the width, with a small margin of one and a half tiles past each edge, so almost nothing outside the room shows and the hero at a wall keeps a little room from the screen's edge. The controls keep their size.
- Every corner piece (the round map with pause and the wrench, the lantern and its arc, the arrow pad) will fade almost away while the hero is under it, as the glass panel already does.
- The rock past a room's edge and the real woods past the doorway out stay, showing inside the margin.
- Decisions: D-441, D-442 and D-443.

## 0.2.173 (2026-10-29)
- Past the crypt's doorway that leads outside, the real woods now show: the woods room itself, placed so its cave mouth lies just past the doorway, with its trees, the rocks beside the mouth, its grass, sticks and fallen branch, and anything changed in play there, such as a stump where a tree was felled or a chest set down. Past the woods' own edges, trees go on.
- The woods there keep their own light: full daylight by day, fading through dusk, and at night only the tiles remembered in the woods show, moonlit blue. The lantern's light spills out through the doorway onto the grass, with the trees casting shadows; the daylight that comes in through the cave mouth stays inside.
- Play away from that doorway looks exactly as before, checked on pictures of other rooms by day and night.
- Decisions: built as D-438, D-439 and D-440 say. Questions opened: Q-070.

## 0.2.172 (2026-10-29)
- Nothing in the game changes yet. Pictures drawn by the game compared two ways to show the woods past the crypt's doorway that leads outside. Picked: the real woods room itself, as it is now, with its trees, rocks, sticks, fallen branch and anything changed in play, so what you see is where you walk. The owner's words: "It needs to be completely accurate."
- The woods past the doorway will keep the woods' own light: daylight by the time of day, dusk, and a moonlit night.
- A rule for every place to come: past an opening, the place on the other side shows itself, made by its own kind's rules, with its own light and atmosphere. No one look fits every place.
- Decisions: D-438, D-439 and D-440.

## 0.2.171 (2026-10-29)
- The lighting is worked out faster again, so play is smoother on slower phones: walking on a simulated slow phone runs about 31 frames a second instead of 22 to 25. Every pixel looks exactly as before; this was checked on 1,200 pictures.
- The Half choice was built and measured first, but it ran no faster, so it is not in the game; Half and Automatic wait until the light is measured again. When the Light line comes, it goes after Motion, and Automatic is where it starts.
- Decisions: D-436 and D-437. Questions opened: Q-069.

## 0.2.170 (2026-10-29)
- Fixed: on some screen sizes, such as a phone held sideways, the whole light went black in caves bigger than the screen, so the hero and lantern vanished. The view now always stops on a whole pixel, and a test checks it.
- Decisions: D-434.
