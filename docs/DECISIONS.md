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

**D-413 · 2026-10-28 · The full scope, drawn up in parts** (the owner's
request) Before more content is added one item at a time, the whole scope
of items, resources, collectables, harvestables, craftables, experience
and skills is drawn up in eight parts, each asked as multiple choice
first: the frame, raw things, creature drops, making, gear, growth,
collectables, home and trade. It lives in `docs/SCOPE.md`. D-404 and
D-406 to D-412 moved unchanged to `archive/DECISIONS-STEERING.md`.

**D-414 · 2026-10-28 · The scope's frame** (the owner's picks, all
recommended) About 100 to 150 things in all, each biome bringing about
25 to 35, built a biome at a time. No hunger: oil stays the only clock,
and food is a bonus that heals or boosts. Wood, stone and oil are found
everywhere, and each biome adds its own set, deeper ones making better
things. Gear and crafting lead the ways of getting stronger (D-038).

**D-415 · 2026-10-28 · Crafts and loot** (the owner's picks, all
recommended, with the owner's addition) Seven craft families: lampcraft,
cooking and alchemy, smithing and tools, building, leatherwork, and
(the owner's addition) electronic and arcane, both found below and then
rebuilt at home as their own stations. Items are fixed, with rare finer
versions from portal depths. Nothing wears out. Better tools open
tougher materials.

**D-417 · 2026-10-28 · What creatures drop** (the owner's picks,
recommended; narrows Q-061) Each creature leaves its own common material,
and some a rare one too, each at its own chance. They go into gear and
armour, potions and lampcraft, bestiary pages and trophies, and are sold
to vendors.

**D-418 · 2026-10-28 · Money, the bag and recipes** (the owner's picks,
all recommended; narrows Q-055) Two currencies: trade coins from selling,
for useful things, and the look currency only from deeds, records and
achievements, for looks only (D-280). The bag's slots grow by crafting
pouches and bags; no weight. A recipe shows once its parts have been
held; special ones are found as notes and lore; NPCs teach or sell some.

**D-419 · 2026-10-28 · Skills, two ways** (the owner's pick, Claude's two
recommended; supersedes D-416) Skills and abilities come two ways only:
embers buy a Growth tree of steady upgrades, and big abilities are found
deep down, each opening new paths. Learning by doing and skills taught by
NPCs are left out for now, to keep growth simple; either may come back by
a new decision. NPCs may still teach or sell recipes (D-418).

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

**D-441 · 2026-10-29 · The camera stays in the room, with a margin** (the
owner's idea, pick C, recommended, from
[pictures](https://claude.ai/artifact/UpDgkoK7nFTA9MrA5wHdzD); changes part
of D-381) A room narrower than the screen no longer sits in the middle
with the outside around it: the view zooms in until the room's width, and
a margin of 1½ tiles each side, fills the screen. It never shows more than
today's view, about 11 tiles top to bottom (D-381). The camera follows the
hero (D-195) and stops at most 1½ tiles past any edge, so the hero at a
wall keeps a little room from the screen's edge. The controls keep their
size. The margin may change at the playtest. Built in 0.2.175.

**D-442 · 2026-10-29 · Every corner piece fades** (the owner's pick,
recommended; extends D-380) Like the glass panel, every piece in the
screen's corners (the round map with pause and the wrench, the round
lantern and its arc, the arrow pad) fades almost away while the hero, or
a creature beside them, is under it. Its own step, after D-441.

**D-443 · 2026-10-29 · The outside stays where it shows** (the owner's
pick, recommended) The rock going on past a room's edge (D-403) and the
real woods past the doorway out (D-438 to D-440) stay, and show inside
D-441's margin. Rooms seen through the wall (Q-066) stay open. Built in
0.2.175.

**D-444 · 2026-10-29 · The zoom's limit and the screen layer** (the
owner's picks, all recommended; builds D-441, found before merging) A
narrow room zooms in no further than 9 tiles tall, so what comes from
above and below still shows. The glass panel, plaques, text line and
cards sit on their own layer at the old zoom, so they keep their size and
fit. Easing the zoom between rooms is its own later step. Built in
0.2.175.
