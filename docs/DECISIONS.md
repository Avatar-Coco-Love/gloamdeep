# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`PR-CHECKLIST.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

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

**D-518 · 2026-10-31 · An audit every 40 versions** (the owner's pick,
recommended; supersedes D-337's 20) The owner asked if audits help. The
start-of-conversation read stays near 11.5 KB (17 KB before the first),
but the size test already makes normal steps trim, and code splits are
outgrown in an audit or two, while 20 versions is about a day. So an
audit comes every 40 versions; the size test still guards in between.

**D-641 · 2026-11-07 · Items and crafting, first picks** (the owner's
picks, all recommended; part 2 of the content map, D-635; builds D-455,
D-456, D-458, D-459, D-638, D-639, D-640) Each weapon kind keeps one
part of its own in every metal: ore with wood for the spear and axe,
stone for the hammer, a bone for the knife, silk and a hide for the
sling; the axe in hand also fells the deeper woods' trees. About one
new lantern part for each slot a biome: the tank and the wick climb,
each simply better, while each glass shows something different, a
choice for the trip. One armour and about three charms a biome, and
biome 1 gives every part now "for crafts later" a use, about 17 new
things there. Beside the tree's 14 knacks, each village teaches one,
free, as a quest's reward. Names, recipes and numbers are drafts on the
map, set at each one's own step. D-619 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-642 · 2026-11-07 · Plants and harvests, first picks** (the owner's
picks, all recommended; part 3 of the content map, D-635; builds D-450,
D-451, D-452, D-460, D-530, D-641) Each deeper oil plant takes fewer to
make a flask: lampwort 2, a glowcap with a flask makes Bright Oil, an
ember lily is poured straight. Every land plant's seed is made in the bag
from 3 of it, like the Gloamberry Seed, the Herb Seed too; water plants
wait for Q-071. Oil plants grow at home, but slowly, so the light still
mostly comes from below. The other plants, ores, woods and fish are kept
as drafted, each biome's pick and axe opening the next, each deeper fish
a step up. Names, uses and numbers are drafts on the map, set at each
one's own step. D-590 moved to `archive/DECISIONS-CHECKUP.md`, word for
word.

**D-643 · 2026-11-07 · Creatures and bosses, first picks** (the owner's
picks, all recommended; part 4 of the content map, D-635; builds D-453,
D-463, D-466, D-607, D-634, D-641, D-642; answers part of Q-076) Biome 1
ends with 14 kinds: the Lure Wisp, a small false light that drifts ahead
toward other creatures, and the Grave Beetle, shelled, waiting for the
hammer. Each deeper biome has about 10 kinds, some carried on from above
with the same look and ways and 1 more heart a biome deeper. Each boss
fights in its own room, changes how it fights at half its hearts, and is
beaten once for good, giving its ability, trophy and Feat. The next
creature built is the Lure Wisp. Names, numbers, ways and drops are
drafts on the map, set at each one's own step. D-528 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-644 · 2026-11-07 · Bigger, less even biomes** (the owner's picks;
builds D-635, D-643) The planned content needs each biome to hold about
2 to 3 times the walkable space it has now: about 70 rooms where biome 1
has about 31. Floors get more rooms, and rooms vary in size, some
smaller and some bigger than today's 17 by 20, so no two seeds feel the
same (the owner's idea). Biome 1 grows first, before the Lure Wisp. The
grids, sizes and counts are proposed at that step. D-482 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-645 · 2026-11-07 · Biome 1's floors, rooms made of cells** (the
owner's picks, mostly recommended; builds D-644; partly supersedes D-203,
D-227, D-228 and D-580) Under the crypt, the seed picks each floor's room
count: 6 to 8 at depths 2 to 4 on a 4 × 4 grid, 9 to 11 at depths 5 to 7
and 11 to 13 at depth 8 on 5 × 5, with 2 loops at depth 8; about 69
rooms with the crypt's. Rooms are made of cells so that everything lines
up in play and on the map (the owner's wish): a cell is 11 × 13 tiles,
13 × 15 at depth 8; a room is 1 cell (small), 2 side by side or one above
the other (a long hall) or 2 × 2 (large), edge to edge, so every opening
meets exactly. The stairs down are about 3 or 4 rooms from the stairs
up, as far as today; the other rooms branch off that way and hold the
rewards, so exploring is a choice the oil pays for (the owner's pick,
recommended, so more space adds choices, not walking; D-580). How many halls and large rooms a floor gets is Claude's
draft, tuned at the playtest. Old saves have their generated rooms made
again once, as at D-580; home, the surface and the crypt are kept. Built
in two steps: more one-cell rooms on the bigger grids, then halls and
large rooms. D-634 moved to `archive/DECISIONS-CHECKUP.md`, word for word.

**D-646 · 2026-11-07 · A map preview for generation steps** (the
owner's working rule) Whenever a step changes how something is generated
(floors, rooms, caves, woods, the scatter of creatures or finds), its PR
also gets a private map preview Artifact, made by a tool in `tools/` as
the playtest is (D-073). Like the Seed Explorer (D-214), it draws the
whole floor or region from the real generation code, shows the seed, has
a Reseed button for a new random seed and a way to pick the depth, so
the owner can flip through many seeds before merging. It is linked in
the PR body and the PROGRESS log, and republished after every push.
D-638 moved to `archive/DECISIONS-CHECKUP.md`, word for word.

**D-647 · 2026-11-07 · Biome 1, step 1: one-cell rooms** (the owner's
picks, recommended; builds D-645, D-646) Each floor's rooms grow freely:
the way first, 3 or 4 rooms from the stairs up to the stairs down, then
the side rooms off any room, so some branches are long and some short.
Every room keeps today's finds for now; the owner wants the side rooms
filled with much more content later, to keep exploring challenging and
exciting. Below depth 8 floors are made as depth 8 is until biome 2
(Claude's draft). The stairs down keep 3 tiles from a room's bottom edge
and clear of its doorways, and doorways keep clear of the tiles beside
the stairs up, so every room fits. The map preview shows the way, the
creatures and finds, a line of numbers and a tapped room's contents.
D-639 moved to `archive/DECISIONS-CHECKUP.md`, word for word.

**D-648 · 2026-11-07 · Biome 1, step 2: halls and large rooms** (the
owner's go-ahead; builds D-645, D-647; numbers Claude's draft, tuned at
the playtest) Halls and large rooms are side rooms, so the way to the
stairs keeps one-cell rooms and is as short to walk as today (D-580).
Depths 2 to 4 get 1 or 2 halls; 5 to 7 get 1 or 2 halls and up to 1
large room; depth 8 and below 2 or 3 halls and 1 large room; the seed
picks how many, which way a hall lies, and where. A room of more cells
also covers the seams between them, so a hall is 23 × 13 tiles (27 × 15
from depth 8) and a large room 23 × 27 (27 × 31), lining up on the map,
and each cell's stretch of its edge may open to a different room. A
dungeon room gets the halls inside it in step with its cells. Rooms keep
today's finds for now (D-647). Old saves have their generated rooms made
again once more. D-640 moved to `archive/DECISIONS-CHECKUP.md`, word for word.

**D-649 · 2026-11-07 · The Lure Wisp** (the owner's picks, all
recommended; mock-ups: https://claude.ai/artifact/LviCBTAjrcFAqSzqY1uCwx;
builds D-643; answers part of Q-076) The thirteenth kind and a new way,
lures, the false light of the list. When the hero comes within 3 tiles,
it drifts 1 tile away, toward the nearest other creature; with none on
the floor, it just drifts away. It never bites, and one hit puts it out.
Its own faint cold glow shows even out in the dark, but it lights no
tiles. 1 heart, in the pool from depth 4. Look A, a cold flame: a bone-white
core, blue edges in the gloamberry's blues, two pink eyes. Its drop is
Wisp Glass, about 1 in 2, sold for 2; no rare one for now, the Wisp Lamp
waits for its own step, and leading toward a pit waits for Leap. Built
next, in one step with a playtest. D-633 and D-635
moved to `archive/DECISIONS-CHECKUP.md`, word for word.

**D-650 · 2026-11-07 · Side rooms, step 1: the dead-end cache** (the
owner's picks, all recommended; builds D-645, D-647, D-648) The last
room of each side branch, a dead end (a side room with one opening),
holds a cache: 2 or 3 extra finds from today's list (flask, herb,
oilcap, heartcap), grouped together, with no new tile, in its far
corner, the open spot farthest to walk from the way in. A cache is
left once and never grows back (Claude's draft). Numbers Claude's
draft, tuned at the playtest. Next, halls and large rooms get about
twice and four times a one-cell room's finds and creatures (the
owner's pick, recommended), as its own step. D-636 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-651 · 2026-11-07 · Side rooms, step 2: more in halls and large
rooms** (the owner's picks, all recommended; builds D-648, D-650) A
hall holds twice a one-cell room's finds and creatures, a large room
four times: every find (flask, herb, oilcap, and a heartcap 1 time in
2 for each cell), the knife and spear still one each; and the depth's
creatures, 2, 3 or 4 a cell, mixed as in other rooms. Each cell gets a
set of its own by today's rules, so they spread evenly; the room's
first set stays where it lay, and a cell of rock and tunnel too small
for its set has it anywhere in the room (Claude's draft). D-637 moved
to `archive/DECISIONS-CHECKUP.md`, word for word.
