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

**D-634 · 2026-11-07 · How long to the end** (the owner's picks, all
recommended; builds D-028, D-414, D-463, D-633) Relighting the First
Light takes about 12 to 20 hours, and finding everything about 30.
Claude's targets, to tune as each biome is played: about 8 floors a
biome, 32 in all; about 9 ordinary creatures a biome and 8 to 12 from
the portals; 4 biome bosses, then Old Maren near the end, deep in
Underhearth, just before the First Light; about 8 wanderers and rare
named creatures; about 150 things; 6 to 8 weapon kinds, one better metal
a biome; 4 found abilities and 2 or 3 from relics; 30 to 40 of Maren's
pages. After the First Light is relit the journey goes on, the gloam
pushed back but not gone. It is built one biome at a time, each
finished with its creatures, boss, ability and pages, then played and
tuned before the next. D-625 moved to `archive/DECISIONS-MAKING.md`,
word for word.

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

**D-638 · 2026-11-07 · How weapons get better** (the owner's pick,
recommended; answers Q-085; builds D-457, D-636) Each biome's metal
adds 1 to every hit of each weapon kind, the shape the same. Beside the
made ones, rare weapons are found below, each with one small effect of
its own, as more to discover. Which, where and their effects are set at
each one's own step.

**D-639 · 2026-11-07 · The bigger Growth tree** (the owner's picks,
recommended, and the owner's ideas; builds D-462, D-596, D-637) The
Growth tree keeps its three branches and a row a biome, now with 4 or 5
places a branch a row: about 50 places and 64 embers' worth, more than
a journey's embers buy, so each hero grows differently. Knacks join it:
small ways of fighting or finding, each bought once with an ember, worn
2 at a time and swapped at home. Twelve new boons, three of each kind,
26 in all; some join the pool on reaching their biome, some after
something happens (the owner's idea). Challenges are trials: a room's
challenge that pays an ember once, and each must be solvable. Names and
numbers are drafts on the map, set at each one's own step. Map:
https://claude.ai/artifact/5ifRVF37GFS5faWkFerhbn

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
