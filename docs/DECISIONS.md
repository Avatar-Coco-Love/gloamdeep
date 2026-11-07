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

**D-633 · 2026-11-07 · The story** (the owner's picks; step 19; answers
Q-072; builds D-036, D-628, D-629) The story is set down in
`docs/LORE.md`: Underhearth, the city below, fell when the First Light's
oil ran low; the Lightkeepers' hearth in Hearthwood is its spark; the
dying First Light calls; the hero went down with their teacher, Old
Maren, whom the gloam took, and came back without their memories; the
goal is to relight the First Light. The guide is a spark of the First
Light; Maren is a boss with a history (Q-083), freed when beaten; the
crypt is the oldest of many ways down. Who the keeper is who leaves the
finds waits (Q-084). Tone: gloomy, with hope. D-624 moved to
`archive/DECISIONS-MAKING.md`, word for word.

**D-635 · 2026-11-07 · Biome depths and the content map** (the owner's
picks, recommended; answers Q-082; builds D-028, D-634) Each biome is 8
floors: woods and mountains, the surface and depths 1 to 8 (today's
crypt, caves and warrens, all of it); the old mines and caves 9 to 16;
the glowing fungal caverns 17 to 24; the sunken ruins, Underhearth, 25
to 32, the First Light at the bottom. Today's areas by depth (D-233) are
fitted to this when biome 2 is built. All the game's content is planned
on one map: Claude drafts every biome's creatures, items, plants, seeds,
ores, recipes, weapons and skills on one page, all marked draft, then
the owner goes through it a part at a time, recorded as it goes. First
part: skills and mechanics (the Growth tree, found abilities, weapons
and attack shapes, ranged and elemental), in a fresh conversation;
then items and crafting, plants and harvests, creatures and bosses,
which are planned knowing each other. D-626 moved to
`archive/DECISIONS-MAKING.md`, word for word.

**D-636 · 2026-11-07 · Skills and mechanics, first picks** (the owner's
picks, recommended; part 1 of the content map, D-635; builds D-457,
D-463, D-634) Five weapon kinds, each with its own shape: the knife (1
tile), the spear (2 in a line), the axe (a sweep of the tile ahead and
its two sides), the hammer (1 tile, knocks back a tile, cracks shells)
and the sling (the first creature in a line up to 4 tiles, a Stone a
shot). Three elements, each leaving one mark: Flame (burning), Venom
(poisoned) and Light (dazed, double on gloam kind). Four found
abilities, one from each biome's boss: Leap (biome 1), Heave (2), Flare
(3, a burst of light that costs oil) and Swim (4). Numbers, sources and
names are drafts on the map, set at each one's own step. D-627 moved to
`archive/DECISIONS-MAKING.md` and D-628 to D-632 to
`archive/DECISIONS-BESTIARY.md`, word for word.

**D-637 · 2026-11-07 · More to discover, a bigger tree** (the owner's
wish and picks; builds D-482, D-603, D-635) The game gets more variety:
more to discover, more to do, and many side quests on the way to the
end. The content map gains a part 5, places and quests, with all four:
each biome branching into different kinds of generated places as it
goes deeper; villages below, groups of people living underground with
their own quests; more secrets on old floors that open with later
abilities; and side quests through it all. The Growth tree grows
bigger, with more upgrades than embers buy, so each hero grows
differently; more loadout variety and more boons (D-603); and
challenges to match. How weapons get better by metal waits (Q-085).
*Changed in the open PR: Q-085 answered by D-638.*

**D-640 · 2026-11-07 · Places and quests, first picks** (the owner's
picks, all recommended; part 5 of the content map, D-637) Each biome's
middle and lower floors are each one of two kinds of place, the seed
picking. One village a biome, four in all. Secrets on old floors that a
later ability opens are marked on the map once the lantern has shown
them. Side quests are listed in a Quests tab in the Journal, given by
people or found as notes; some pay a new boon joining the pool, and
some rescued people move home (D-470). Names, people, quests and
rewards are drafts on the map, the specifics talked through at each
one's own step.

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
