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
in `archive/DECISIONS-GROWING-4.md` (D-310). **D-310 to D-316** (the
first ore deposit, wood before the chest, sticks, fallen branches) are in
`archive/DECISIONS-GROWING-5.md` (D-318).

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

**D-317 · 2026-10-24 · Trees to chop** (step W3 of D-314, the owner's
picks, all recommended but the look) Every tree but the room's edge ring,
which stays its wall, can be chopped. Four bumps, a turn each, saying "You
hack at the tree.", "Chips fly from the trunk.", "The tree groans."; the
fourth fells it and puts 3 Wood in the bag, saying in turn "The tree falls.
You take wood.", "It crashes down. Wood for the bag.", "Timber! You gather
the wood." It leaves a stump, walked over, light passing over it, in one of
three looks from the mock-up
(https://claude.ai/artifact/LHweehNQ5uWQSoHkv7ufEP), picked by its tile: a
clean cut, a splintered one, a mossy one with roots (the owner's wish: all
three, for variety); the Wood takes the stump's look. With room for fewer
than 3 it still falls, and the rest lies as sticks on the stump and the
nearest open tiles, never growing back. With 3 Wood carried, the fourth bump
says "You can't carry more wood.", free, and the tree stands. A stump grows
back into a tree on its own tile after 3 days, 900 turns, out of sight, with
nothing on it, and only if that leaves the room joined.

**D-318 · 2026-10-24 · Built to grow's fifth decisions are archived** (as
D-310, by the 12 KB rule in `CLAUDE.md`) D-310 to D-316 moved unchanged to
`archive/DECISIONS-GROWING-5.md` as this file passed 12 KB. They stay in
force.

**D-319 · 2026-10-24 · The workbench, in three steps** (the owner's picks;
builds D-314) The workbench costs 3 Wood, made with Make on the Wood stack
in the bag. It comes in three steps: WB1 makes it, WB2 sets it down, WB3
takes it down. Setting it down: the player picks the side, by a swipe on a
phone or an arrow key (other ways may come later as a setting, and how a
mouse does it is settled in WB2). Bumping a set-down bench opens a small
panel by it, where things are made at it later (the chest first); one of its
choices is "Deconstruct workbench", which puts the bench back in the bag,
whole.

**D-320 · 2026-10-24 · A workbench in the bag** (step WB1 of D-319, the
owner's picks, all recommended) Make on 3 Wood makes 1 Workbench, a turn,
saying "You make a workbench."; the bag stays open on it. Only 1 is carried:
with one in the bag, Make says "You already carry a workbench.", free, and
the Wood stays. Choosing it says in turn "A workbench, folded small.", "Set
it down on the surface.", "Bigger things are made at it." Its look is B of
the mock-up (https://claude.ai/artifact/9BYJDePdQfDhgtHuVV6fpR): planks on
four legs, a grey vise on a corner, a shelf between the legs.

**D-321 · 2026-10-24 · The forest will not yield** (the owner's wish)
Bumping a tree of a woods room's edge ring, which is never chopped (D-317),
says in turn "The forest will not yield." and "These trees are too old to
fell.", free.

**D-322 · 2026-10-25 · Setting the workbench down** (step WB2 of D-319, the
owner's picks, all recommended) Choosing the Workbench in the bag shows Set
down (Enter or Space too); the bag closes and the free sides beside the hero
are marked. An arrow, a swipe, or a click or tap on a marked tile sets it
there; Esc, P, I or a tap elsewhere keep it in the bag. It goes only on the
surface, on a plain floor tile off the room's edge (never a doorway, a cave
mouth or stairs), with nothing on it, and only if the room stays joined, as
for stumps (D-317). It says "You set down the workbench.", a turn; below
ground Set down says "Only on the surface.", and toward a side it can't go
on "There is no room there.", both free. Set down, it is solid like a tree
and light passes over it. Any number may stand: only 1 is carried (D-320),
so each set down frees the bag for the next.

**D-323 · 2026-10-25 · The workbench panel** (step WB3 of D-319, the
owner's picks; mock-up https://claude.ai/artifact/VfKuStt4ym66WaxdqohiKJ)
Bumping a set-down workbench, or a click or tap on one beside the hero,
opens its panel, free: look C, the room dimmed behind the pause veil and a
box in the middle headed WORKBENCH in ember, its lines in the menus' style
with the flame, Deconstruct workbench then Close. Up and Down choose; Enter,
Space or a tap picks; Close, Esc, P or a tap outside the box close it.
Deconstruct says "You take down the workbench.", a turn, puts it in the bag
whole and closes the panel; with one already carried it says "You already
carry a workbench.", and with every slot taken "Your bag is full.", both
free, the bench staying. Crafting lives in this panel too: each thing made
at the bench is one line above Deconstruct with its cost, dim with too few;
those lines come with the chest.

**D-324 · 2026-10-25 · The stash chest** (the owner's picks, all
recommended; builds D-021, D-248, D-314; mock-up https://claude.ai/artifact/7u2cu9yA79DCAzGawN9KuJ)
The stash chest is made at the workbench, its line on the bench panel above
Deconstruct, for 3 Wood and 3 Stone, stone's first use. Its look is B of the
mock-up: a rounded wooden lid, grey stone at its corners, a gold latch. One
chest holds 12 slots, two rows of the bag's 6, in stacks of 3 as in the bag.
Any number may stand, each keeping its own things; only 1 is carried, as for
the bench (D-320). Until a home base exists it goes on the surface, the
bench's way (D-322).

**D-325 · 2026-10-25 · The chest in five steps** (the owner's picks, both
recommended; builds D-324) CH1: the chest's line on the bench panel makes
one into the bag. CH2: set it down, the bench's way. CH3: bumping it opens
its panel, 12 empty slots. CH4: putting things in and taking them out. CH5:
taking it down, back into the bag, only when empty; with anything inside it
says so, free, and stays.
