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

**D-580 · 2026-11-02 · Floors grow with depth** (the owner's pick,
recommended; answers the sizes part of Q-038) The owner found the
floors too big for the oil carried (a full lantern lasts 60 turns) and
the stairs hard to find. Rooms are 13 × 15 tiles at depths 2 to 4 (the
caves), 15 × 17 at depths 5 to 7 (the warrens) and 17 × 20, today's
size, from depth 8 (the dungeon). Room counts stay 3, 5 and 6.

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

**D-584 · 2026-11-02 · Smaller floors, built** (the owner's picks,
recommended; builds on D-580) Both shallow bands shrink in one step.
Inside, the counts shrink with the room's area, as in D-195: 3 to 6
chambers and at least 61 open tiles in a 13 × 15 cave, 89 to 104 tiles
dug in a 15 × 17 warren; creatures and finds stay as they are, and pools
fit less often (about 1 cave room in 3, not 4 in 9). The peddler's room
is made again until his ring of rubble fits, so every journey has him
(the owner's idea). A save from before is brought up to date once: every
generated room is made again from the same seed at its new size, the
dungeon's too, since its stairs hang from the floor above; a hero down
there stands on that floor's stairs up, a bag left there lies on them,
and a peddler already freed stays freed.

**D-585 · 2026-11-02 · No more stand-in rooms** (the owner's picks,
recommended; answers Q-078) A dungeon room fell back to the crypt's
second room when a doorway lay diagonally above its stairs up, beside
the wall above them, mostly in a corner: 62 rooms in seeds 1 to 2000 at
depths 8 to 20. When all of a room's 200 tries (600 for the peddler's)
fail, a second round of up to 400 more runs, in which the corridors keep
clear of the stairs up and that wall, and such a doorway first steps one
tile away from them. Only rooms that fell back reach it, so every other
room stays exactly as it was; no room falls back in seeds 1 to 6000 at
depths 8 to 20. A save holding a stand-in has just those rooms made
again, once, from their seeds; a hero in one goes to that floor's
stairs up.

**D-586 · 2026-11-02 · The peddler's spot, looser** (the owner's picks,
recommended; raised and answered as Q-079, before the waystones; changes
the spot rule of D-490 and D-580) Measured over 6000 depth-3 rooms,
seeds 1 to 2000: his spot fitted 84% of rooms on the first try, and what
ruled spots out was mostly a creature, find or the way in on or beside
the ring, not the walls. Now at least 4 of the 8 tiles around him are
open, each turned to rubble, and a wall stands on one straight side at
most (no more nooks); corners may be wall. A creature or find on or
around his ring moves to the nearest free floor; the way in, stairs,
openings, deposits and veins still keep him away. His spot fits 95% of
rooms on the first try, with 4 to 8 heaps to dig. A room already made in
a save stays as it was.
