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

## 0.2.115 (2026-10-25)
- Settings, opened from the pause menu, now has a line under the seed: "Way to play: Normal" (or Gentle, or Hardcore). From the title, where no journey is open, it isn't there.
- Picking it shows the three ways with the one you play picked. The harder ones are grey; landing on one says "Only an easier way can be picked."
- Picking an easier way asks first, "Play Gentle?" with "There is no going back.", No picked. Yes changes it and saves it with the journey; No goes back. Esc or P go back a page.
- From Normal to Gentle, bags already left where you fell stay there to fetch; only falls from then on keep the bag.
- Decisions: D-346.

## 0.2.114 (2026-10-25)
- In Normal, a fall now leaves your bag where you fell: a small leather pouch tied at the neck, lying on the floor with everything that was in it. You wake with an empty bag; the knife stays in your hand.
- Walk onto it to take everything back, with "You take back your bag." Stacks top up first. What doesn't fit stays in it, with "Your bag is full.", for later.
- Each fall leaves its own bag, so falling again before you fetch one loses nothing. The map shows each one as a small brown dot until you take it back.
- Gentle still keeps the bag through a fall, and Hardcore starts the world over.
- Decisions: D-345.

## 0.2.113 (2026-10-25)
- In Hardcore, a fall now ends the journey. The fall plays as before, then at its darkest a page says "Your journey ends." with Same world (picked) and New world.
- The world starts over as on day one: every room, the bag, the level, the map and the time of day. The profile's Records stay, and the fall counts in them. The new world is saved at once, so closing the game can't bring the old one back.
- Same world begins again from the same seed; New world from the seed typed in Settings, or a random one. The hero wakes with the line "The world begins again." Esc or P go to the title instead, where Continue goes on in the world begun again.
- Gentle and Normal falls play as before, for now (Normal comes next).
- Decisions: D-344.

## 0.2.112 (2026-10-25)
- New journey now asks how you want to play: Gentle, Normal or Hardcore, with Normal picked to begin with. It comes after "Start over?" Yes too, and Esc or P go back to the title with the saved journey kept.
- The picked way shows its note under the menu: "A fall keeps the bag.", "The bag waits where you fall." or "One life. A fall starts the world over."
- The way you pick is saved with the journey, but for now every fall still plays as Gentle; Hardcore and Normal come in the next steps. A journey saved before this plays as Gentle.
- Decisions: D-341, D-342; D-343 moved the stash chest's decisions to the archive.

## 0.2.111 (2026-10-25)
- On a stash chest's panel, a new line sits between the bag's row and Close: Deconstruct chest. Down from the bag's row reaches it, then Close.
- Picking it on an empty chest puts the chest back in your bag, whole, and the ground is clear again. A turn passes and the line says "You take down the stash chest."
- With anything still inside it says "Empty the chest first."; with a stash chest already in the bag "You already carry a stash chest."; and with every slot taken "Your bag is full." Then it stays, and no turn passes.
- Decisions: D-340; this ends the stash chest's steps (D-325).

## 0.2.110 (2026-10-25)
- Stacks are bigger: up to 20 Wood, Stone, oilcaps or heartcaps, and up to 5 flasks or potions. The workbench and stash chest are still 1 each, and you still carry only one of each.
- When a stack is full, the next one starts in a free slot, so one kind can fill several slots. Only when every stack of it is full and no slot is free does it stay behind, with the same lines as before.
- In a stash chest, picking a stack moves as much as fits: it tops up a stack of its kind, then takes free slots. What can't go stays where it was, with "Your bag is full." or "The chest is full."
- Decisions: D-339; this builds D-333.

## 0.2.109 (2026-10-25)
- Tidying, with nothing in the game changed: the notes Claude reads at the start of each conversation are shorter, and older changelog entries and finished build steps moved to the archive. This Version history still holds every version.
- A check now fails when a notes file grows past its size limit, and an audit like this one comes every 20 versions. The next is at 0.2.129.
- Decisions: D-336, D-337, D-338.

## 0.2.108 (2026-10-25)
- A fall now leaves the world as it was. You still wake at the first room's start with full hearts and the starting oil, but every room stays as you left it: the same seed and layouts, rats where they were, torches still lit, your set-down workbench and stash chest in place with what the chest holds, and the map of every room you found.
- Settled for later: stacks by kind (20 of Wood, Stone, oilcaps and heartcaps, 5 of flasks and potions), several stacks of a kind in the bag and in a chest, and three ways to play: Gentle keeps your bag after a fall, Normal leaves it where you fell, and Hardcore is one life. Until the modes come, a fall keeps your bag.
- Decisions: D-332 to D-335. Questions closed: Q-058.

## 0.2.107 (2026-10-25)
- On a stash chest's panel, the gold frame now reaches the bag's row too: Down from the chest's second row goes to the bag, and Down again to Close.
- Press Enter or Space, or click or tap, on a filled slot and its whole stack moves to the other side: from the bag into the chest, or out of the chest into the bag. It joins a stack of its kind when all of it fits there, or takes the next empty slot. It takes no turn and says nothing.
- When it can't all go, the line says "Your bag is full." or "The chest is full.", and nothing moves. Each chest keeps its own things, kept in your save. A fall loses a chest set down, and what it held, as its room begins again.
- Decisions: D-331. A question for the owner: Q-058.
