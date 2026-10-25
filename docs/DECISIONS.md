# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

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

**D-326 · 2026-10-25 · The stash chest made** (step CH1 of D-325, the
owner's picks, all recommended) The bench panel's top line is "Stash chest",
"3 Wood · 3 Stone" dim on its right, as in the D-324 mock-up, so the panel's
lines now sit at its left. Picking it takes the Wood and Stone and puts 1
stash chest in the bag, a turn, saying "You make a stash chest."; the panel
stays open. With too few the line is dim and says "You need 3 Wood and 3
Stone.", free; with one carried, "You already carry a stash chest.", free.
Choosing it in the bag says in turn "A stash chest, empty.", "Set it down on
the surface.", "It keeps what the bag can't."

**D-327 · 2026-10-25 · Built to grow's sixth decisions are archived** (as
D-318, by the 12 KB rule in `CLAUDE.md`) D-317 to D-323 moved unchanged to
`archive/DECISIONS-GROWING-6.md` as this file neared 12 KB. They stay in
force.

**D-328 · 2026-10-25 · Showing that Wood makes things** (the owner's find:
crafting with wood wasn't plain; the owner's picks) Wood's first look line
becomes "Three make a workbench.", the oilcap's way (D-297). How to play
gains a fourth page, Crafting, after Keyboard, the same for every way of
playing: Make, "Pick a stack in the bag" and "then press Make"; Oilcap, "3
make an oil flask"; Wood, "3 make a workbench"; Bench, "Bump it to make
more".

**D-329 · 2026-10-25 · Setting the chest down** (step CH2 of D-325, the
owner's picks, both recommended) The stash chest is set down the bench's way
(D-322): the same Set down, marked sides and rules, saying "You set down the
stash chest.", a turn. Set down, it is solid like a tree and light passes
over it; bumping it does nothing until CH3.

**D-330 · 2026-10-25 · Opening the chest** (step CH3 of D-325, the owner's
picks, all recommended; mock-up https://claude.ai/artifact/JFkncSwPNDzp91vrWEUqPU)
Bumping a set-down stash chest, or a click or tap on one beside the hero,
opens its panel, free, with no line: look B, the room dimmed behind the
pause veil and a box in the middle headed STASH CHEST in ember, its 12
slots in two rows of 6, BAG in ember with the bag's 6 slots under them,
then Close. Arrows or a tap move a gold frame over the chest's slots, the
bag's way; Down from the second row reaches Close, Up from Close the second
row's first slot. Close, Esc, P or a tap outside the box close it, the
bench's way (D-323). The bag's row only shows until CH4.

**D-331 · 2026-10-25 · Putting things in the chest and taking them out** *Its last sentence superseded by D-332 (2026-10-25).*
(step CH4 of D-325, the owner's picks, all recommended; builds D-330) On the
chest's panel, Down from its second row reaches the bag's row, then Close;
Up comes back the same way. Enter, Space, a click or a tap on a filled slot
moves its whole stack to the other side, free, with no line: onto a stack of
its kind when all of it fits there, else into the next empty slot, the slots
after it moving up, the bag's way. When it can't all go, "Your bag is full."
or "The chest is full.", free, and nothing moves. Each chest keeps its own
things in the save. A fall begins every room again, so a chest set down goes,
and what it held with it (as the bench already did); Q-058 asks about this.

**D-332 · 2026-10-25 · A fall leaves the world as it was** (the owner's
call, answers Q-058; supersedes the rooms beginning again in D-119 and D-136,
the new seed of D-148 and D-331's last sentence) Outside Hardcore (D-334), a
fall changes nothing in the world: the same seed, every room as left, with
what was set down, what chests keep, what was found and what grows back on
its own time. The hero still wakes at the first room's start with full
health and the starting oil.

**D-333 · 2026-10-25 · Bigger stacks, by kind** (the owner's picks, both
recommended; supersedes D-250 once built) Stacks hold 20 of small finds
(Wood, Stone, oilcaps, heartcaps), 5 of flasks and potions, and 1 workbench
or stash chest. In the bag and in a chest, a full stack goes on in the next
free slot, so a kind can fill several slots.

**D-334 · 2026-10-25 · Three ways to play** (the owner's picks, all
recommended) Gentle: a fall keeps the bag. Normal: the bag waits where you
fell, to fetch (D-020); picked already at New journey. Hardcore: one life; a
fall starts the world over, from the same seed unless the player changes it,
and the profile's Records stay. A journey's mode can change only toward
easier. Until modes are built, a fall plays as Gentle.

**D-335 · 2026-10-25 · What comes next** (the owner's pick, recommended)
First a fall keeping the world (D-332, 0.2.108), then bigger stacks
(D-333), then CH5, then the modes (D-334) as their own steps.

**D-336 · 2026-10-25 · The first regular audit** (the owner's picks, all
recommended) A conversation given to tidying, with nothing visible changed:
`CLAUDE.md` loses its list of archive files, now one index in
`archive/README.md`; `PROGRESS.md`'s ticked build steps move to the
progress archive; `CHANGELOG.md` keeps its newest entries, the rest in
`archive/CHANGELOG-STAGE-0.2-1.md`; and `tests/docs.test.js` fails when a
doc passes its cap (8 KB; `DECISIONS.md` 12 KB; `PROGRESS.md` 4 KB, as before) or
the archive index misses a file. The 0.2.1 setup script line is in place.

**D-337 · 2026-10-25 · An audit every 20 versions** (the owner's picks, both
recommended) `PROGRESS.md` names the next audit's version; when it comes,
the audit is Next up. Each audit also splits one big code file into
smaller ones, nothing visible changed (order may change: `history-0.2.js`,
`screens.js`, `turn.js`, `main.js`). The next audit is at 0.2.129.

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-339 · 2026-10-25 · Bigger stacks, the details** (the owner's picks, all
recommended; builds D-333) With every stack of a kind full and no slot free,
the lines stay as today: the kind's own line when the bag holds some, else
as before. Only 1 workbench or stash chest is still carried (D-320). On a
chest's panel a picked stack moves what fits, topping up its kind and then
taking free slots; the rest stays, with "Your bag is full." or "The chest
is full.". A slot's count stays in its corner, its dark box as wide as the
number.
