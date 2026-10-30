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
*Partly superseded by D-362 (2026-10-25): that audit came at 0.2.123, and
the next is at 0.2.143.*

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-362 · 2026-10-25 · The second audit, early, turn.js split first** (the
owner's picks, recommended; supersedes D-337's 0.2.129) The audit comes now, at 0.2.123,
seven versions early, so things can go on being added cleanly and quickly;
the next is at 0.2.143. Its split is `turn.js`, before the other big files:
into `state.js`, `endturn.js`, `creatureturn.js`, `fall.js` and
`bagturn.js`, with `turn.js` passing their rules on, so the rest of the
game imports from it as before (the playtest packer learns that form).
`history-0.2.js`, `screens.js` and `main.js` follow at later audits. The
finished decisions D-332 to D-361 (but D-336 to D-338) moved unchanged to
`archive/DECISIONS-GROWING-7.md` and `archive/DECISIONS-CREATURES.md`.

**D-363 · 2026-10-25 · A content index and an adding checklist** (the
owner's picks, both recommended) `docs/CONTENT.md` lists every creature,
find, tile, light and place with its numbers, where it turns up and its
decisions, so proposals build on what exists. `TECH.md`'s "Adding content"
lists the files each kind of content touches. A PR that adds or changes
content updates both.

**D-392 · 2026-10-28 · The third audit: history-0.2.js split** (the
owner's picks, all recommended) The audit at 0.2.143 splits
`history-0.2.js` by version: new versions stay at its top, 0.2.60 to
0.2.119 move to `history-0.2-2.js` and 0.2.0 to 0.2.59 to
`history-0.2-1.js`, word for word, the Version history unchanged.
D-378 to D-380 and D-385 to D-391, the corner HUD and the menu cards, all
built, moved unchanged to `archive/DECISIONS-CARDS.md`. `CHANGELOG.md`
keeps its newest 3 entries. `CLAUDE.md`'s pointers are tidied, its rules
word for word. `screens.js` and `main.js` follow at later audits; the next
is at 0.2.163.

**D-421 · 2026-10-28 · The fourth audit, tiny** (the owner's picks, both
recommended) The audit at 0.2.164 is kept small: the profile screens
(name pad, cloak, eyes, trim, clothes, Rename and Look) move word for word
from `screens.js` into `profilescreens.js`, nothing visible changed;
`CHANGELOG.md` keeps its newest 3 entries; `CLAUDE.md`'s file table is
tidied, its rules word for word. The rest of `screens.js` and `main.js`
follow at later audits; the next is at 0.2.184.

**D-431 · 2026-10-29 · How we work: one step a conversation** (the owner's
pick, recommended) The owner keeps choosing every question. Each
conversation does one step, ends with its handoff, and the next step
starts in a fresh conversation, so less is read again each time.

**D-449 · 2026-10-30 · Tap: Off, Step or Walk** (the owner's choice;
details all recommended; supersedes D-406's "the one-step tap goes" and
D-422's "Off at first") Settings' Tap to walk line becomes Tap: Off, Step,
Walk; picking it or Right goes on, Left back. Step is D-042's tap, one step
toward the tap; a finger held 0.25 s keeps stepping toward it at the held
pace (D-044), sliding steers, lifting stops. Walk is D-406's walk. New
players start on Step; saved settings keep their pick, On as Walk. How to
play: "Tap toward a tile", then "or swipe" or "Hold to keep going".
Built in 0.2.179.

**D-455 · 2026-10-30 · The scope, part 4: where things are made** (the
owner's picks, all recommended; builds D-296, D-415) Small things, such
as flasks, potions and torches, are made in the bag, anywhere. Building,
tools and leatherwork are made at the workbench. Later each bigger
family gets one station of its own, built at home: a forge for
smithing, a kitchen fire for cooking, a power bench for electronic, an
altar for arcane. Stations stand only on the surface, like the
workbench, so coming home to make things is part of the loop. Each
station's name, look and cost are settled at its own step.

**D-456 · 2026-10-30 · The scope, part 4: the ladder** (the owner's
picks, all recommended; builds D-414, D-418) Each biome has about 8 to
12 new things to make. Most rungs open by their materials: a recipe
shows once the hero has held its parts, so deeper materials, opened by
better tools (D-450), open deeper recipes. A few special recipes, about
1 or 2 a biome, the rarer or finer things, are found below instead, as
are the electronic and arcane stations themselves (D-415). Stations
don't improve for now; whether they can is asked with home upgrades in
part 8. The owner asked to weigh station upgrades and found recipes
before picking these.

**D-457 · 2026-10-30 · The scope, part 5: weapons** (the owner's picks,
all recommended; builds D-027, D-252, D-450) About 4 or 5 weapon kinds,
each with its own attack shape *(e.g. a knife hitting 1 tile, a spear 2
in a line, an axe a sweep of 3, a sling at range)*. Each biome's new
metal makes a better one of each kind: the shape stays, the hits grow.
The hero holds one weapon in hand, as today; others ride in the bag and
are swapped there, a swap taking a turn. Each kind's name, shape and
numbers come at its own step. Also moved D-450 to D-454 to the archive,
word for word, as this file neared 12 KB.

**D-458 · 2026-10-30 · The scope, part 5: armour and charms** (the
owner's picks, recommended; builds D-415) Besides the weapon in hand,
the hero wears one armour piece, made by leatherwork, and two charms,
each with one small effect *(e.g. better drop odds, a slower burn)*.
Each piece's effect and recipe come at its own step.

**D-459 · 2026-10-30 · The scope, part 5: the lantern's parts and
torches** (the owner's picks, all recommended; the owner's thought of
many lantern upgrades) The lantern has a few part slots *(e.g. tank,
wick, glass)*, with many parts for each; one fits per slot and can be
swapped *(e.g. a bigger tank holds more oil, a slow wick burns less, a
coloured glass shows hidden marks)*. Oil still alone sets how far the
light reaches (D-014). Parts are made at the workbench (answering part
4's open point) and fitted from the bag, anywhere. The other light in
the plan is torches, made in the bag and set down on a tile, burning
for a while (D-024, D-455). Flares, glowing gear and machine lights were
weighed and left out for now; any may come back by a new decision.

**D-460 · 2026-10-30 · The scope, part 5: the rod** (the owner's pick,
recommended; builds D-450, D-452) Fishing uses one rod, made better
with each biome's metal like picks and axes; a better rod catches
deeper fish. Bait may come later. How fishing plays is asked at its own
step.
