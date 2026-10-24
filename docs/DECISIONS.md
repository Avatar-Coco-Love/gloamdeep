# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force; grep there for an ID or
topic. **D-001 to D-038** (pre-production) are in
`archive/DECISIONS-PREPRODUCTION.md` (D-041). **D-039 to D-052**
(steps 7 to 11) and **D-070 to D-076** (the docs audit) are in
`archive/DECISIONS-FOUNDATION-1.md` (D-083). **D-053 to D-069** (steps 12
to 14) are in `archive/DECISIONS-FOUNDATION-2.md` (D-103). **D-077 to
D-093** (steps 15 to 17 and the 0.1.13 dev tools) are in
`archive/DECISIONS-FOUNDATION-3.md` (D-120). **D-094 to D-113** (steps 18
to 21) are in `archive/DECISIONS-FOUNDATION-4.md` (D-137). **D-114 to
D-129** (steps 22 to 24) are in `archive/DECISIONS-FOUNDATION-5.md` (D-151).
**D-130 to D-158** (steps 25 to 30) are in
`archive/DECISIONS-FOUNDATION-6.md` (D-161). **D-159 to D-167** (steps
31 to 33) are in `archive/DECISIONS-STAGE-0.2-1.md` (D-188). **D-177 to
D-193** (the main menu, steps 52 to 58) are in `archive/DECISIONS-MENU.md`
(D-196). **D-194 to D-200** (steps 43 to 45, UI steps U1 and U2) are in
`archive/DECISIONS-GETTING-AROUND.md` (D-208). **D-201 to D-208** (a
region and its map, steps 46 to 47b) are in `archive/DECISIONS-REGION.md`
(D-213). **D-209 to D-218** (the surface, steps 48 to 51, and the Seed
Explorer) are in `archive/DECISIONS-SURFACE.md` (D-221). **D-219 to
D-233** (the held walk, deeper floors, steps 51b to 59c, 34, 35 and M1)
are in `archive/DECISIONS-DEEPER.md` (D-236). **D-234 to D-246** (steps
36 to 40) are in `archive/DECISIONS-LAST-STEPS-1.md` (D-251). **D-247 to
D-260** (the bag, the knife, Version history, the first sounds) are in
`archive/DECISIONS-LAST-STEPS-2.md` (D-265). **D-261 to D-269** (built to
grow, steps G1 to G4) are in `archive/DECISIONS-GROWING-1.md` (D-274).
**D-270 to D-278** (the Journal, profiles and their looks, steps J1 and
P1 to P6) are in `archive/DECISIONS-GROWING-2.md` (D-279). **D-279 to
D-298** (play to earn, Records, profiles' boxes, embers, the oilcap) are
in `archive/DECISIONS-GROWING-3.md` (D-300). **D-299 to D-309** (the
first craft, the fleeing rat, the heartcap, growing back, the potion) are
in `archive/DECISIONS-GROWING-4.md` (D-310).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---


**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. ~~Steps of stage 0.3 are versioned 0.3.x.~~ *That part
superseded by D-237 (2026-10-22): versions stay 0.2.x.* The step list
is in `PROGRESS.md` and may change as we go.

**D-169 · 2026-10-19 · Regions are grids of rooms** (the owner's idea)
The world, surface and below, is split into regions joined to each
other. Each region is a grid of cells (a 3 × 3 marsh has 9), and not
every cell must be used. Each region has its own rule sheet for how it
generates, including promises that hold for every seed: a special room
with its own rules, a single secret entrance to it from a side that
changes with the seed, or a special item that must appear in a named
room or building. Each cave follows its own rules too. Generated once
per save, as D-019.

**D-170 · 2026-10-19 · Where the world is written down** (owner's pick)
`docs/WORLD.md` holds how the world works, under 8 KB. Each region gets
its own rule sheet in `docs/regions/`, one file per region, made when the
region is designed. Undecided details are open questions.

**D-171 · 2026-10-19 · Ways between rooms** (the owner's idea) Rooms
join by stairs up and down, by openings at their sides into the room
beside them, by water for a hero who can swim (Q-039), and by secret
entrances. Both sides of a way line up exactly, and each room is made to
fit the ways into it.

**D-172 · 2026-10-19 · Rooms of every shape and size** (the owner's idea
and pick) Rooms differ in shape and size by their kind: tunnels are
narrow, deserts are vast. A room bigger than the screen scrolls, with the
camera following the hero. The kinds and sizes are Q-038.

**D-173 · 2026-10-19 · Light comes through openings** (the owner's idea)
A doorway, cave mouth or stairs lets in the light of the place beyond.
Daylight shines in behind you by day, less in rain or snow, not at
night, following the time of day (D-025) and the weather (Q-035). An
open way into a lit room not yet found glows, so you can tell a lit
space lies ahead. Details are Q-040.

**D-174 · 2026-10-19 · Stairs must be found** (the owner's idea,
supersedes part of D-134) The stairs' glow is dimmer and shows only where
the fog of war has lifted, so stairs and doors must be found, unless
other light reveals them. Some underground places are brightly lit.
How dim is Q-041.

**D-175 · 2026-10-19 · Today's game becomes the first cave** (owner's
pick) The two crypt rooms and the generated depths below them become the
first cave under the starting region, reached from a cave entrance on
the surface. Q-043 asks whether it gets a bottom.

**D-176 · 2026-10-19 · A world map to uncover** (the owner's idea,
builds on D-021) Players uncover the map as they explore. Dev tools get
a switch that reveals the whole map, and a map mode, which may be the
same map players see. Details are Q-042.

**D-310 · 2026-10-24 · Built to grow's fourth decisions are archived** (as
D-300, by the 12 KB rule in `CLAUDE.md`) D-299 to D-309 moved unchanged to
`archive/DECISIONS-GROWING-4.md` as this file would have passed 12 KB.
They stay in force.

**D-311 · 2026-10-24 · The first ore deposit** (the owner's picks, all
recommended; builds D-282) Next come the first ore deposit, then the stash
chest, then a creature drawn to light. A deposit is a round boulder of grey
rock with one seam (look A of three; changed after the playtest: B, veined
rock, looked like it held iron → A). Each room of the Cave area,
depths 2 to 4, holds 3, off the edge and never cutting a room in two;
clusters may come later, when something needs much more stone. It is a
new kind of tile, solid, but light passes over it, and the map outlines it
as wall. Later steps: three bumps break it, a turn each, and it drops a
plain stone for later crafts (O2); a broken deposit grows back after 3
days, 900 turns (O3). Step O1 only places and draws them.

**D-312 · 2026-10-24 · Mining a deposit** (the owner's picks, all
recommended; step O2 of D-311) Walking into a deposit bumps it, a turn
each. Bump 1 says "You chip at the boulder.", bump 2 "The boulder cracks.";
bump 3 breaks it to floor and a Stone goes into the bag, saying in turn
"The boulder breaks. You take a stone.", "The rock splits. A stone comes
free.", "The rock crumbles. You keep a stone." (the second and third
shortened from set 1 to fit the strip). The stone is look A of three, a
small round pebble in the deposit's greys; it stacks to 3, and choosing it
says in turn "A plain stone, for crafting later.", "It is heavy and grey.",
"Cold and rough in your hand." With 3 carried, bump 3 says "You can't carry
more stones.", free, and the boulder holds. The lines are the same whatever
the hero holds for now; each tool, and each kind of thing to mine, will get
its own lines, decided as they come.

**D-313 · 2026-10-24 · A deposit grows back** (the owner's picks, all
recommended; step O3 of D-311, builds D-307) A broken deposit goes on its
room's taken list, as a tile, and comes back as a boulder after 3 days, 900
turns, by the same rules as things picked: only out of the hero's light,
with no hero, creature or item on it, and already there in a room just
walked into. It comes back on a floor tile within 2 steps of where it stood
(diagonals count), or its own again, picked by the seed, off the edge and
never cutting the room in two (changed before merging, the owner's wish:
its own tile → within 2). A chipped or cracked boulder keeps its bumps
until it breaks. Deposits broken in an old save stay gone.

**D-314 · 2026-10-24 · Wood before the stash chest** (the owner's wish and
picks; builds D-282, D-296) Before the stash chest comes wood. For now it is
one item, Wood, from three sources, each its own step: sticks lying in the
woods (W1, first), fallen branches to bump (W2), and trees to chop (W3).
A separate Stick, and Planks crafted for bigger builds, may come later.
Where things are made: small things you carry and use up (flasks, potions)
are made in the bag; big things you set down or build, such as the chest,
need a workbench, which is itself made in the bag and can be set down
anywhere on the surface. Wood comes first, then the chest, then the
light-seeking creature (D-311).

**D-315 · 2026-10-24 · Sticks in the woods** (step W1 of D-314, the
owner's picks, all recommended but the look) Each woods room holds 3
sticks on open tiles, picked after the trees so the rest of each seed's room
stays as it was. Each lies in one of three looks from the mock-up
(https://claude.ai/artifact/AofptSBiPXEbMUwgQPZjhc), picked by the seed: a
straight stick, a forked twig with a leaf, a crooked branch (the owner's
wish: all three, for variety). Walked onto, it goes into the bag as Wood, in
stacks of 3, the slot showing the look of the last one picked, saying in
turn "You pick up a stick.", "A dry branch. You keep it.", "You gather some
wood." Choosing it says in turn "Dry wood, for crafting later.", "It snaps
if you bend it.", "Good for building." Over a full stack it stays, with no
line. Sticks grow back after a day, 300 turns, as mushrooms do (D-306).

**D-316 · 2026-10-24 · Fallen branches** (step W2 of D-314, the owner's
picks, all recommended but the look) Each woods room holds 1 fallen branch,
a tile picked after the sticks so the rest of each seed's room stays as it
was, never on the start, the mouth's front or a stick, and never cutting the
room in two. It blocks the way like a tree, but light passes over it, as over
a deposit. It lies in one of three looks from the mock-up
(https://claude.ai/artifact/Jfyt3b3ZmcPoJqvPZ2QWzV), picked by its tile: a
bough with two twigs, a leafy end, a snapped bough (the owner's wish: all
three, for variety, as the sticks). Two bumps, a turn each: the first says
"The branch creaks."; the second breaks it to floor and puts 2 Wood in the
bag, in the branch's look, saying in turn "The branch snaps. You take
wood.", "It breaks apart. Wood for the bag.", "Crack. You gather the wood."
With room for only 1 it still breaks, and the other lies on its tile as a
stick in the same look, which never grows back. With 3 Wood carried, the
second bump says "You can't carry more wood.", free, and the branch holds.
A broken branch grows back after 3 days, 900 turns, within 2 steps, by the
deposit's rules (D-313).
