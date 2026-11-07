# The share card, the 0.2.167 check (D-425 to D-428)

Moved unchanged from `docs/DECISIONS.md` at 0.2.168 (D-429), when it
neared 12 KB: the share card, and the check of the game that found a
creature sharing the hero's tile, made the light faster and warned of a
failed save. These are still in force unless marked superseded. Grep for
an ID or topic; never read this whole.

---

**D-425 · 2026-10-29 · The share card** (the owner's picks: A, the
first sentence, the script) A link to the game
shows a card: the title screen without its menu, the hero in the
lantern's light under the name, 1200 × 630, with "Gloamdeep" and the
line "Carry a lantern down through the gloam." `share.png` is the one
image file allowed (an exception to D-003's no image files): drawn by
`tools/sharecard.js` with the game's own code, never by hand, and drawn
again when the title art changes. Built in 0.2.166.

**D-426 · 2026-10-29 · A creature steps aside** (the owner's pick,
recommended; a bug found by the 0.2.167 check) A creature standing where
the hero arrives (stairs, a doorway, a dev jump) or wakes after a fall
steps to the nearest free tile, counted in steps: not solid, no item, no
other creature. With none free it stays. Before, the two shared a tile,
frozen. Built in 0.2.167.

**D-427 · 2026-10-29 · Faster light, the same look** (the owner's pick,
recommended; a step of D-294, D-295) The light is worked out in about
half the time, every pixel the same as before (checked picture by
picture): each light only over the square it can reach, remembered tiles
with nothing near their edge skip the blend, and f to the 1.25 is worked
as f × √√f. The room's canvas tells the browser it is read back every
frame. A simulated slow phone still runs under 60 frames a second; more
needs a look change or another way of drawing, the owner's call. Built in
0.2.167.

**D-428 · 2026-10-29 · A failed save says so** (the owner's pick,
recommended) When a journey can't be saved (storage full or blocked),
the text line says "Your journey could not be saved." in amber, once,
until a save works again. The words are Claude's, may change. Smaller
saves are left for later. Built in 0.2.167.

Moved unchanged from `docs/DECISIONS.md` at 0.3.92 (D-641), as it neared
12 KB: research kept, docs tidied, the light kept.

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

Moved unchanged from `docs/DECISIONS.md` at 0.3.93 (D-642), as it neared
12 KB: planning ahead.

**D-590 · 2026-11-05 · Planning ahead** (the owner's picks, recommended)
Research helpers work beside each build step and report to Claude, who
brings options; only one conversation builds Gloamdeep at a time. The
whole game's scope is shown as one visual map, then filled in piece by
piece. Selling on Google Play: a checklist now (`docs/STORE.md`), each
piece built when it is due, so nothing blocks it later. Better level
making, as data in named passes, is planned before it is built.

Moved unchanged from `docs/DECISIONS.md` at 0.3.94 (D-643), as it neared
12 KB: version 0.3.0.

**D-528 · 2026-10-31 · Version 0.3.0** (the owner's pick, recommended;
supersedes the version part of D-237) Stage 0.2's last steps are done,
so versions move to 0.3.x from 0.3.0, this version, for stage 0.3, the
world (D-168). New history goes in `history-0.3.js`. The next audit,
0.2.268 (D-518, D-519), keeps its distance: 0.3.32.

Moved unchanged from `docs/DECISIONS.md` at 0.3.95 (D-644), as it neared
12 KB: the rest of the build order.

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

Moved unchanged from `docs/DECISIONS.md` at 0.3.96 (D-645), as it neared
12 KB.

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

Moved unchanged from `docs/DECISIONS.md` at 0.3.97 (D-646), as it neared
12 KB.

**D-638 · 2026-11-07 · How weapons get better** (the owner's pick,
recommended; answers Q-085; builds D-457, D-636) Each biome's metal
adds 1 to every hit of each weapon kind, the shape the same. Beside the
made ones, rare weapons are found below, each with one small effect of
its own, as more to discover. Which, where and their effects are set at
each one's own step.

Moved unchanged from `docs/DECISIONS.md` at 0.3.97 (D-647), as it neared
12 KB.

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

Moved unchanged from `docs/DECISIONS.md` at 0.3.98 (D-648), as it neared
12 KB.

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

Moved unchanged from `docs/DECISIONS.md` at 0.3.101 (D-650), as it neared
12 KB.

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

Moved unchanged from `docs/DECISIONS.md` at 0.3.103 (D-652), as it neared
12 KB.

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
