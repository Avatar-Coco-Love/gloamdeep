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

**D-341 · 2026-10-25 · The modes in four steps** (the owner's pick,
recommended; builds D-334) MO1: New journey asks the way to play, saved
with the journey; every fall still plays as Gentle. MO2: Hardcore, a fall
starts the world over. MO3: Normal, the bag waits where you fell, its look
mocked up first. MO4: changing the mode during a journey, only toward
easier.

**D-342 · 2026-10-25 · The way to play, picked** (step MO1 of D-341, the
owner's picks, all recommended) After New journey, and after "Start over?"
Yes, a page drawn like Start over asks "Choose a way to play": Gentle,
Normal, Hardcore, Normal picked to begin with. The picked line's note shows
grey under the menu: "A fall keeps the bag.", "The bag waits where you
fall.", "One life. A fall starts the world over." Picking one starts the
journey; Esc or P go back to the title, the saved journey kept. A journey
saved before the modes plays as Gentle, as it has so far.

**D-343 · 2026-10-25 · The stash chest's decisions are archived** (as
D-327, by the 12 KB rule in `CLAUDE.md`) D-324 to D-331 and D-340 moved
unchanged to `archive/DECISIONS-CHEST.md` as this file neared 12 KB. They
stay in force.

**D-344 · 2026-10-25 · Hardcore, a fall ends the journey** (step MO2 of
D-341, the owner's picks, all recommended; builds D-334) The fall plays as
D-234, then at the deepest dark a page drawn like Start over says "Your
journey ends.": Same world (picked) or New world. The whole journey starts
over as on day one (every room, the bag, the level, the map found, the time
of day); the profile's Records and look stay, the fall counted, and the mode
stays Hardcore. It is saved at once, from the same seed. New world takes
Settings' seed, or a random one. The hero wakes as the light opens, with
"The world begins again." Esc or P go to the title, Continue there.

**D-345 · 2026-10-25 · Normal, the bag where you fell** (step MO3 of D-341,
the owner's picks, all recommended; builds D-334, D-020) A Normal fall leaves
the bag where the hero fell: a pouch tied at the neck, leather browns and a
pale cord (look A of three); an empty bag leaves nothing, and the hand keeps
its weapon (Claude's call, to confirm). Walking onto it puts back what fits,
kinds topping up first: all back, "You take back your bag."; else the rest
stays in it, "Your bag is full." Each fall leaves its own bag. The map marks
each with a leather brown dot until it is taken back. The wake line stays.

**D-346 · 2026-10-25 · Changing the way to play** (step MO4 of D-341, the
owner's picks, all recommended; builds D-334) Settings opened from the pause
menu has "Way to play: Normal" under the seed; from the title it isn't
there. Picking it shows the three ways, the one played picked; the harder
ones are grey, their note "Only an easier way can be picked.", and can't be
picked. An easier one asks first, drawn like Start over: "Play Gentle?",
"There is no going back.", Yes or No, No picked. Yes changes it, saved with
the journey; No goes back to the ways (Claude's call). Bags left by Normal
falls stay to fetch after a change to Gentle.
