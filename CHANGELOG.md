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

## 0.2.119 (2026-10-25)
- No change to play: how creatures will show their next move is decided, after three rounds of mock-ups.
- A row under the room will hold a small plaque for each creature that has noticed you and stands in light: its face, and an icon for what it does next if you wait (fangs for a bite, an arrow for a step). The row grows as more notice you and shrinks as they die. Nothing shows for a creature in the dark.
- Tapping a plaque will frame that creature on the field, with its name, its hearts and a small arrow for its next step. No other marks go on the field.
- Behind the scenes: the game can now work out what each creature you can see would do if you waited.
- Decisions: D-357.

## 0.2.118 (2026-10-25)
- A new creature, the lampmoth: a pale moth with cream wings and an amber spot like a flame. It is drawn to light. While your lantern is lit it flies at you from anywhere in the room and bites for 1; switch the lantern off and it heads for the nearest lit torch instead, and waits there. With no light at all it stays where it is.
- One hit of anything kills it.
- On each floor from depth 2 to depth 4, one room holds a lampmoth in place of its rat.
- Its bite is silent for now.
- Decisions: D-356.

## 0.2.117 (2026-10-25)
- No change to play: four of the owner's answers written down.
- Decided for the next step: the creature drawn to light walks toward the nearest light. While your lantern is lit, that is you, and it bites like a rat; with the lantern off it heads for a lit torch instead. Its look comes as a mock-up.
- Decided for later: a Bestiary page shows the creature's drawing, name and counts when you first meet it, how it acts once you beat one, and how to fight it once you beat three.
- Held sideways, the screen keeps showing the same room, only bigger when that fits, as it does now.
- The first cave keeps its warrens and dungeon below depth 5; where it ends, and its portal, wait for the portal step.
- Behind the scenes: the modes' decisions moved to their own archive file, and the Bestiary question is renamed Q-059, since Q-058 was already used.
- Decisions: D-351 to D-355. Questions closed: Q-046, Q-048, Q-059.

## 0.2.116 (2026-10-25)
- No change to play: a check-in on the project, and the owner's answers written down.
- In Normal, the knife in your hand stays with you through a fall, for now, so you can go after your bag armed.
- The starting region, the woods around home, is named Hearthwood.
- Decided for a later step: every creature you can see will show its next move, to try out; nothing shows for a creature hidden in the dark.
- Decided for later: the Journal's Bestiary gets a page for each creature you meet, with how many you met and beat and how to fight it, showing more the more you meet it.
- Decisions: D-347 to D-350. Questions closed: Q-045, Q-047, Q-049. Questions opened: Q-058.

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
