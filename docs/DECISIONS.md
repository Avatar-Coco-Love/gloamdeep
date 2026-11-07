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

**D-590 · 2026-11-05 · Planning ahead** (the owner's picks, recommended)
Research helpers work beside each build step and report to Claude, who
brings options; only one conversation builds Gloamdeep at a time. The
whole game's scope is shown as one visual map, then filled in piece by
piece. Selling on Google Play: a checklist now (`docs/STORE.md`), each
piece built when it is due, so nothing blocks it later. Better level
making, as data in named passes, is planned before it is built.

**D-619 · 2026-11-06 · Research kept, docs tidied, the light kept** (the
owner's picks, both recommended; nothing visible changes) One PR holds
all three. The three research pages (lore, room making, the 0.3.73
health check) and their open suggestions are kept in a new
`RESEARCH-PAGES.md`. `ART-DIRECTION.md`'s generated places' colours move
to `ART-DIRECTION-2.md`, and `SCOPE.md`'s parts 6 to 8 to `SCOPE-2.md`,
word for word; five docs that no longer matched the code are fixed. The
light keeps each light's shadow cast between frames, at a little more
than its reach, and casts again only when the light moves, the room
changes or the reach grows past it (`keptCells`, `src/core/light.js`):
the picture is the same pixel for pixel, the light about 15% quicker
standing still.

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
