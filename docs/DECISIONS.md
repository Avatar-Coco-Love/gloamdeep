# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`PR-CHECKLIST.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

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

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-363 · 2026-10-25 · A content index and an adding checklist** (the
owner's picks, both recommended) `docs/CONTENT.md` lists every creature,
find, tile, light and place with its numbers, where it turns up and its
decisions, so proposals build on what exists. `TECH.md`'s "Adding content"
lists the files each kind of content touches. A PR that adds or changes
content updates both.

**D-431 · 2026-10-29 · How we work: one step a conversation** (the owner's
pick, recommended) The owner keeps choosing every question. Each
conversation does one step, ends with its handoff, and the next step
starts in a fresh conversation, so less is read again each time.

**D-482 · 2026-10-30 · The rest of the build order** (the owner's picks,
all recommended; answers the Next up of 0.2.196) Lantern parts come
next: Copper Ore, mined since step 7, gets its first use, and the
lantern is the heart of the game. Claude proposes the rest of the
order and the owner approves it by merging: lantern parts, armour and
charms, home pieces and rest, the first rescue, vendor and coins,
garden, fishing, lore, relics, feats. The rescue comes before the
vendor, who is a rescued person (D-471); collectables come last, as
they reward everything before them. Each may take more than one small
step, with its names and numbers asked at its own step. The first
Light and Hands upgrades may join any of them. Half and Automatic
(Q-069) keep waiting. Also moved D-479 and D-480 to the archive, word
for word, as this file neared 12 KB.

**D-518 · 2026-10-31 · An audit every 40 versions** (the owner's pick,
recommended; supersedes D-337's 20) The owner asked if audits help. The
start-of-conversation read stays near 11.5 KB (17 KB before the first),
but the size test already makes normal steps trim, and code splits are
outgrown in an audit or two, while 20 versions is about a day. So an
audit comes every 40 versions; the size test still guards in between.

**D-528 · 2026-10-31 · Version 0.3.0** (the owner's pick, recommended;
supersedes the version part of D-237) Stage 0.2's last steps are done,
so versions move to 0.3.x from 0.3.0, this version, for stage 0.3, the
world (D-168). New history goes in `history-0.3.js`. The next audit,
0.2.268 (D-518, D-519), keeps its distance: 0.3.32.

**D-579 · 2026-11-02 · Waystones for fast travel** (the owner's picks,
recommended, from their wish list; the Core Keeper way in Gloamdeep's
own form) Waystones are found out in the world and woken by walking up
to one. One stands near the centre of the home room. The others stand
at the top of each band of floors, depths 2 (caves), 5 (warrens) and 8
(the dungeon), then every 4th depth (12, 16, 20…), and at the top of
any band added later. Standing on a woken waystone, the hero picks
another woken one on the map and goes there. A pocket waystone, to
travel from anywhere, comes later as a craft. How waking looks and
sounds, and the map's travel card, are asked at its step.

**D-581 · 2026-11-02 · A draft toward the stairs** (the owner's picks,
recommended; builds on D-174) Stairs still must be found, with a clue:
a few faint motes drift in the lantern light toward the stairs down.
If the motes don't work or aren't enough, the lantern's flame leans
toward the way down instead. The Depth Meter (the owner's idea) stays
a later find or craft that points the way.

**D-582 · 2026-11-02 · Getting around comes first** (the owner's
picks, recommended) Three steps come before the rest of the build
plan, in this order: smaller shallow floors (D-580), the waystones
(D-579), the drifting motes (D-581). Then the new creature kind
(Q-076), fishing, lore, relics and feats. Digging up stumps with the
right tool, so the home can be shaped freely, goes to the wish list.

**D-583 · 2026-11-02 · Boons at the home waystone** (the owner's idea
and picks; builds on D-579 and the shrine idea in `RESEARCH.md`) Each
time the hero sets out from the home waystone, it offers 3 boons drawn
at random from a pool, and the hero picks 1. A boon lasts until the
hero is home again or falls. The pool holds all four kinds: light and
oil, hearts and fighting, finding things, and getting around. The
exact boons and their numbers are shown to the owner as a list before
anything is built (Q-077). Boons are their own step, right after the
waystones.

**D-587 · 2026-11-03 · Landmarks made from data** (the owner's idea and
picks, recommended; builds on D-579) A waystone is 5 × 5 tiles: a cross
through the middle is walkable, the four 2 × 2 corners are not, and the
centre tile is the plate where it is used. Landmarks bigger than one
tile are registry entries: a small text plan, where they join tunnels,
where they stand and what they block. One shared stamper sets the plan
aside before a room is dug, digs around it, joins its tunnels, checks
everything is still reached, tries again if not, and uses its own seed
so rooms without one stay as they are. Tests build many rooms for every
landmark; dev mode can drop one in and show the set-aside patches. The
stamper comes with its first use, a waystone at depth 2, and only
places it. The rest is asked at each step (Q-080).

**D-588 · 2026-11-03 · Pictures drawn again after a wipe** (the owner's
fix, ahead of D-587's first step) On Android the hero and the tiles came
back blank after the app was in the background: the browser wipes kept
canvases. Every canvas drawn once and kept is now drawn again when the
browser hands it back (contextrestored), and checked when the page shows
again (visibilitychange). Nothing visible changed.

**D-590 · 2026-11-05 · Planning ahead** (the owner's picks, recommended)
Research helpers work beside each build step and report to Claude, who
brings options; only one conversation builds Gloamdeep at a time. The
whole game's scope is shown as one visual map, then filled in piece by
piece. Selling on Google Play: a checklist now (`docs/STORE.md`), each
piece built when it is due, so nothing blocks it later. Better level
making, as data in named passes, is planned before it is built.

**D-593 · 2026-11-05 · Travel between woken waystones** (the owner's
picks, all recommended; step 16's fourth part, builds on D-579, D-591 and
D-592; answers Q-080) Standing on a woken plate, a tap on the hero, Space
or Enter opens the travel card; walking over the plate never opens it.
The card is a short list on glass, "WAYSTONES": home first, then each
stone by depth, its name and a note under it ("Home", "The surface.";
"Depth 2", "The caves."). One not yet woken shows as ???, "Not yet
woken.", dim, so the player knows it is there; the one stood on is dim,
"You are here." Tapping or picking a woken one goes there at once, onto
its plate, with the stairs' fade: "The waystone carries you." Travel is
free: no turn passes and no oil burns, so the oil where the hero arrives
is the pressure, and the creatures there can't act before the hero's
first move. It is barred while a creature awake stands beside the hero,
corners too, or chases them: "Not with a creature so near." and no turn
passes. The lines are Claude's wording, to change at the playtest. To
keep this file small, D-589, D-591 and D-592 moved to
`archive/DECISIONS-WAYSTONES.md`.
