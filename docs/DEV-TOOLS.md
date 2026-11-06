# Dev tools

The game has built-in developer tools from the start (D-006). The owner
asked for the ability to spawn any item, enemy, NPC and so on, plus more
tools to be chosen together later.

## Principles
- **Tools edit the game state, then the screen redraws.** A tool never
  draws anything itself, so it can't fall out of step with the real game.
- **Tools read the content registry** (`TECH.md`). Anything added to the
  game appears in the spawn menu automatically.
- **On for everyone.** Every build and every player has the tools (D-086).
  Screen clutter is fine when it helps make the game better.
- **Reproducible.** Show the current seed, and allow loading a seed.
- Each new game feature arrives with its dev hook in the same PR (for
  example, oil arrived with "Refill oil" and "Empty oil").

## Decided
- Spawn any registry entry (item, enemy, NPC, tile) at a chosen tile (D-006).
- Always on; a wrench button opens the panel, switches all off at first
  (D-086, D-047). Code: `src/dev/dev.js` (button, keys, stats line).
- The panel has sections, View, Spawn, Room, Oil, Hero, Share, one open
  at a time, remembered (D-087). Colours: D-093. Code: `src/dev/panel.js`. **A new tool
  goes into a section there**, or a new section.
- It is a sheet along the screen's foot, half its height, the room
  sliding clear above it; icon tabs in a row across its top, the open
  section's name and tools under them; on wide screens at most 420 px
  wide, at the bottom left (D-623, was a drawer, D-200). All words are
  in the pixel font (D-200). Code: `src/dev/pixeltext.js`.
- The wrench stands left of the pause button, top right (D-381).
- Stats line, with the Stats switch in View on (off at first, D-382), small,
  bottom left above the text line: frames a second (fps, D-294), turn, oil %, lit or dark, hero tile, then the
  spawn pick and pointed tile (D-088). New state joins it as it arrives:
  health, depth, and the seed (D-150). Settings' Stats line switch shows a
  short one at full size, without oil, lit, health and depth (D-412).
- PC keys: ` the panel; G, C, R the View switches (D-090).
- Grid and coordinates overlay (D-046); both move with the camera (D-195). Drawing: `src/render/overlay.js`.
- Spawn: a grid of pictures under each kind's heading, 32 px, the
  pick's name in the section's name line, and a search box that narrows
  them by name (D-624, were chips, D-089); tap one, then tap tiles; tap it
  again to drop it (D-048 to D-050, D-079). Pictures: `src/render/thumbs.js`. Torches, lit or unlit (D-123), go only where
  they can sit (D-100, D-102). Stairs can be spawned; they lead only where
  the room's place has a room that way (D-130). Rules: `src/core/spawn.js`.
- Lighting off: a panel switch that shows the room unlit (D-057).
- Reveal room (a switch) and Forget (a button) for fog of war; Reset room
  forgets too (D-061, D-062), and resets only the room the hero is in
  (D-136). Rules: `src/core/fog.js`.
- Reveal map (a switch): the map screen shows every room of the floor
  in full, and turns to any floor from 1 to 99; the memory is kept
  (D-176, D-205, D-206). Rules: `src/core/map.js`.
- Refill, Empty and a slider for any amount, no turn passed (D-066,
  D-091).
  Rules: `src/core/oil.js`.
- Hero: Refill hearts, back to full health, no turn passed (D-154).
- Room: Go to depth, 1 to 99 with − and +, onto that depth's stairs up,
  no turn passed (D-166). Rules: `goToDepth` in `src/core/stairs.js`.
  Go outside goes to the woods, depth 0, the same way (D-209); the cave
  mouth there leads back into the crypt (D-211). TIME: +10 and +50
  move the clock only; the status line shows the turn of the day (D-217).
  GARDEN: Grow makes every planted garden bed's time up, one in this
  room growing at once; no turn passes (D-567). Code: `src/core/garden.js`.
- Copy room: the room and the hero's tile to the clipboard as one line,
  to hand to Claude (D-051, D-052). Code: `src/core/roomcode.js`.
- Seed Explorer, the title menu's last line: any seed's map, every floor
  in full, with Back, Type and Reseed; R, T, B (D-214, D-215). Code:
  `src/core/explorer.js`.

- Coming, in order (D-621): god mode, then saving and loading test spots.

## Candidates (the owner picks; record each pick as a decision)
- God mode (no damage); the owner wants it next (D-154), picked (D-621)
- Step enemies one turn at a time
- Collision overlay (the grid and coordinates part is built, D-046)
- Show light radius and line-of-sight overlay
- Save and load test situations, picked (D-621)
- Seed load (the display is built, D-150)
- Speed up or slow down animations
- A combat sandbox and a seeded puzzle tester, with the Seed Explorer
  under one title-menu tools line (the owner's idea, D-376)

## Next
Items, enemies and NPCs join the spawn grid as each arrives in the
registry (a new kind gets its own group by itself), each with its dev
hook in the same PR. Likely new sections: Enemies (step one turn), Seed,
Saves.
