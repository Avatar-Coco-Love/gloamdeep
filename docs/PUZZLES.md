# Puzzles: every idea, kept

The puzzle plan (D-889). Claude drew these ideas up on 2026-11-13 at the
owner's ask, and the owner kept every one. **Kept is not built:** each
idea is built only by its own decision, at its own step, and every name
and number here is a placeholder until then. The page they were shown
on: https://claude.ai/artifact/Mgq3BAacAAmqBje9NpwpBC

Read this before proposing a puzzle, a pressure moment or a puzzle tile.
The families are split over three pages, each under 8 KB:

| Page | Families |
| --- | --- |
| `PUZZLES.md` | the grammar, the rules, the first picks; **L** light and dark; **P** push, weight and knockback |
| `PUZZLES-2.md` | **C** creatures as puzzle pieces; **G** gates you come back to; **K** knowledge and lore |
| `PUZZLES-3.md` | **T** time and pressure; **W** bigger shapes; each biome's own puzzle mechanics |

The owner's picks (D-889): puzzles are planned first; all five families
are in, and more will come; puzzles live in sealed side vaults, small
ones everywhere, landmark set pieces and terminal mini-games, and more
places will come; biome 1 is finished first. New ideas, the owner's or
Claude's, are added here with the next free ID in their family.

## The puzzle grammar
Every puzzle is one of the hero's **verbs** used on one of the world's
**objects**. New objects make many puzzles at once, because they work
with every verb the hero already has.
- **Verbs today:** walk, bump, wait, switch the lantern on or off, pour
  oil, set down a torch, knock back (the Fist), cast the rod, break with
  the pick, make things.
- **Objects today:** torches, rubble, water, veins, standing stones, the
  lamppost, mimics, every creature's way (seeks light, shuns light,
  lures, spits, burrows, drinks oil).
- **Objects to add:** braziers, sealed doors, plates, blocks, lenses,
  crystals, webs, gates, valves, bells.
- **The clock:** oil, turns, day and night. Pressure comes from these,
  not from fast fingers.

## Rules every puzzle follows (D-890)
1. **Never blocks the way down.** Puzzles guard side rewards. Only a
   landmark room or a boss may stand in the way (pillar 2).
2. **Shown by light.** A puzzle's state is readable at a glance: a lit
   brazier glows, a charged crystal hums, a plate sinks. The lantern is
   how you read the room (pillar 1).
3. **Solved by thinking.** Turns wait for you, so the answer is always
   thought out, never a reflex. Terminal mini-games are the one place
   real time is allowed.
4. **Checked by the game.** A generated puzzle is only placed if a
   solver in the dev tools proves it can be done, from the seed (builds
   on the edge-case runner idea, D-379).
5. **Easy to reset.** Leave the room and come back, and an unsolved
   puzzle sets itself back, so you can never lock yourself out.
6. **Pays in the game's own coin.** Lore pages, relics, rare materials,
   embers, shortcuts, a recipe. Never coins, and never looks (D-418,
   D-472).

## The first four, in order (D-890)
1. **L1, the braziers and a sealed side vault.** One new tile pair, used
   with the lantern the hero already has; it sets up the vault as the
   home for later puzzles.
2. **L3, the dark door.** One tile, and it gives the lantern switch a
   reason to exist.
3. **P1, the Fist and the plate.** It gives the newest item a second use
   straight away.
4. Then **T1, the gloam tide**, as the first high-pressure vault, once two
   or three puzzles exist to pressure.

Each is one small visible step. Rule 4's solver waits for the first
puzzle the seed lays out; until then each is a fixed layout checked by
hand. Biome 1's boss and found ability (G3, W4) are planned once L1 and
L3 are built, so they can test these (D-890).

## L · Light and dark
The lantern is the key to everything; these use pillar 1 most directly.

**L1 · The Lightkeepers' braziers** A sealed Lightkeeper door with 2 to
4 cold braziers in the room. Bump each one with the lantern lit to light
it, which costs a little oil. When they all burn, the door opens.
Variants: lit in the order carved on the door; a brazier goes out if a
light-seeking creature reaches it first. *Uses* the lantern, oil,
torches, seeks-light creatures. *Needs* a brazier tile, a sealed door.
*Fits* biome 1, the crypt above all.

**L2 · Lenses and the crystal** The owner's mirrors idea, fitted to the
grid. The lit lantern sends a straight beam down a row or column (like
the spit grub's glob). Lenses standing on tiles turn the beam a quarter
turn. Push or turn them so the beam reaches a crystal, which wakes a
mechanism. Lenses could later be made with Lampcraft, so the hero
carries the puzzle's pieces. *Uses* the lantern, rows and columns,
pushing. *Needs* a beam, lens tiles, a crystal. *Fits* biome 1's
dungeon, and big in the sunken ruins.

**L3 · The door seen only in the dark** Some hidden things show up with
the lantern off (D-026). Faint runes glow on a wall only in the dark.
Find them, then bump that wall with the lantern still off and it opens.
You dare the dark to find the secret ("a reason to go dark",
`RESEARCH-2.md`). *Uses* the lantern switch, the fog of war. *Needs* a
hidden-door tile with a dark-only glow. *Fits* every biome.

**L4 · Floors made of light** Pale glass tiles over a pit are solid only
while lit. Cross with the lantern on and they hold. Some rooms flip it:
shadow-stone solid only in the dark, so the lantern must go off part way
across. Both in one room make a crossing planned step by step. *Uses*
the lantern's reach, which shrinks as oil runs low. *Needs* light-glass
and shadow-stone tiles, a pit or gap. *Fits* the dungeon, the fungal
caverns.

**L5 · Carrying light** A light crystal soaks up the lantern's flame when
bumped, then glows for a set number of turns. Pick it up and carry it to
a dark socket across the room before it fades. A light-shy creature in
the way backs off from its glow, so it can also clear a path. *Uses*
the bag, shuns-light creatures, turns. *Needs* a crystal find, a socket.
*Fits* the warrens, the fungal caverns.

**L6 · The sun's mark** On the surface, or under a hole in a cave roof, a
shaft of daylight moves across the floor as the turns pass. At one hour
it lands on a carved mark, and something opens. Come back at the right
time of day, or wait for it. *Uses* day and night, sleeping out,
waiting. *Needs* a moving daylight shaft, a mark tile. *Fits* the
surface, the mountain rooms.

## P · Push, weight and knockback
The Warden's Fist just gave the hero a push. These grow from it.

**P1 · Knocked into the water** The Fist knocks a creature a tile back.
Knock it into deep water and it is swept away, though it leaves no drop.
Knock it onto a plate and its weight holds a gate open while you go
through. Shown once as "pushing creatures into hazards", not picked then
(`RESEARCH.md`); with the Fist in hand, it fits now. *Uses* the Warden's
Fist, water, creatures. *Needs* a plate tile, a gate, a rule for water.
*Fits* biome 1, from depth 4 where the warden is.

**P2 · Old stone blocks** Walk into a block to push it one tile; onto a
plate, it stays. Kept tiny: 1 or 2 blocks, 3 to 6 moves, never a long
block-pushing slog. A block stuck in a corner resets when you leave the
room (rule 5). *Uses* bumping. *Needs* block and plate tiles. *Fits*
the crypt, the sunken ruins.

**P3 · The rolling boulder** A round stone, once pushed, rolls until it
hits something, with the warden's slam's fast slide. It smashes rubble,
squashes a creature, or plugs a hole that spits gas. You line up the
shot. *Uses* the slam's slide, rubble. *Needs* a boulder. *Fits* the
mines.

**P4 · Slick floors** On slime or wet stone you slide until you hit
something. The room becomes a little maze of stops, like ice in classic
puzzle games, with creatures as moving stops. *Uses* walking, the
slam's slide. *Needs* a slick tile. *Fits* the fungal caverns, flooded
ruins.
