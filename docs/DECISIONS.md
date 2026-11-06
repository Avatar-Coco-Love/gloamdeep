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

**D-608 · 2026-11-06 · How fishing plays** (the owner's picks, all
recommended but where; builds D-452, D-460; step 18) Cast, wait, pull:
bumping water with the rod held casts the line; each turn it waits, a
fish bites about 1 time in 6, a "!" over the float, and bumping again
within 1 turn lands it, else it gets away; walking off reels it in.
The home pond first, then every pool of water, each with its own fish
and even some finds. The first fish is the Pond Minnow. A fish is lantern
oil (15% of a tank), food (hearts), sold to the peddler and a recipe
material. In steps: the rod; the cast at the pond, catching the minnow;
its uses one a step (oil, eating, selling; the recipe when one needs it);
then the cave pools.

**D-611 · 2026-11-06 · The minnow's oil** (the owner's picks, all
recommended; fishing step 3 of D-608) In the bag, a Pond Minnow's
button reads POUR, the flask's way: a turn, 15% of a tank, never above
full. By hand only: the flask button and By itself pass minnows by.
Deep Pour is for flasks; a minnow always pours 15%. It plays the
flask's pour sound and is not counted in Flasks poured. Claude's, the
owner may change it: its look line. D-588 moved to
`archive/DECISIONS-WAYSTONES.md`, word for word.

**D-612 · 2026-11-06 · Fishing made clear** (the owner's picks, all
recommended; the owner found fishing hard to follow; mock-up:
https://claude.ai/artifact/VFR7NPEBVEV3dsMutucZuZ) Before fishing step 4,
three polish steps: clear turns; a nibble turn (the float twitches, "A
nibble...", then the bite) with a plop on the cast and a splash on the
catch; then a strike meter, a needle swept across a bar on its own card
with the world paused, tapped in the bright zone, smaller for bigger fish.
Real-time waiting is not used, as turns pass only when you act (D-016).
This step: with the line out and no bite, bumping the water waits a turn,
the float where it is (supersedes that part of D-610). While a line is
out, the quick slot (D-384) reads WAIT, or PULL in amber with a bite, and
a tap bumps the float's tile; the flask comes back with the line in.
D-579 and D-587 moved to `archive/DECISIONS-WAYSTONES.md`, word for word.

**D-613 · 2026-11-06 · The nibble, the plop and the splash** (the
owner's picks, all recommended; fishing polish 2 of D-612; mock-up:
https://claude.ai/artifact/WCdMEXxBYnY1MA5TofV7E5) Each waiting turn,
1 in 6 is a nibble, "A nibble...", and the next turn is always the bite
(supersedes D-610's bite 1 turn in 6). A bump on a nibble waits. The
float's twitch, look A: it stops bobbing and jerks a pixel left, right,
left, once each 1.2 seconds; with reduced motion it holds a pixel left.
The cast plays plop A, a round bloop rising; the catch plays splash A,
a burst of water and three drops. Claude's, the owner may change them:
no splash when the minnow slips back or gets away.

**D-614 · 2026-11-06 · The strike meter** (the owner's picks, all
recommended; fishing polish 3 of D-612; mock-up:
https://claude.ai/artifact/Dheoy99waUcNaBdgB5snwo) Pulling on a bite,
a turn, opens a card with the world paused: STRIKE! in ember, "Tap in
the light" in grey, a dark bar in a grey frame with an amber zone a
quarter wide, placed by the seed, and a cream needle with an ember tip.
The needle goes back and forth at a steady second a pass; a tap
anywhere, Space or Enter strikes, free. In the zone the minnow lands
with splash A; a miss, or 3 passes with no tap, "It got away." and the
line comes in (an unpulled bite still leaves the float out). No cross;
reduced motion keeps the needle moving. D-581 and D-582 moved to
`archive/DECISIONS-GETTING-AROUND.md`, word for word.

**D-615 · 2026-11-06 · Eating a minnow** (the owner's picks, all
recommended; fishing step 4 of D-608) In the bag, a Pond Minnow's Eat
sits left of its Pour, the way Make sits beside a heartcap's Eat: a
turn, 1 heart, never above full, dim at full health, where "You aren't
hurt." is said, free. Enter still pours; E eats. Kind Herbs adds its 1
heart, as for anything eaten (D-599). Claude's, the owner may change
it: its line, "You eat the minnow. Cold, but filling." D-583 moved to
`archive/DECISIONS-BOONS.md`, word for word.

**D-616 · 2026-11-06 · Selling a minnow** (the owner's picks, all
recommended; fishing step 5 of D-608) The peddler buys a Pond Minnow
for 1 coin, a common material's price, kept as its `sells`: 3 sold buy
a flask, as 3 poured make a flask's oil. Nothing else changes: it
sells the materials' way, no line, free, no turn. D-609 moved to
`archive/DECISIONS-FISHING.md`, word for word.

**D-617 · 2026-11-06 · The ninth audit** (the owner's picks, all
recommended) At 0.3.72, nothing visible changed. A conversation's start
reads 10.1 KB (CLAUDE.md 6.2, PROGRESS.md 3.9), down from 11.5 KB.
`sprites.js`'s pixel pictures (48 KB, 667 lines) move word for word into
`src/render/pictures.js`; `sprites.js` keeps the making and drawing
(16 KB). Three docs at 98% of 8 KB split a whole topic each, word for
word: `GLOSSARY.md`'s finds to `GLOSSARY-FINDS.md`, `TECH.md`'s layout
to `TECH-2.md`, `RESEARCH.md`'s ideas kept for later to `RESEARCH-2.md`.
D-169 to D-176, the world's first decisions, move to
`archive/DECISIONS-WORLD.md`; ticked steps 15 to 17 and the oil tick are
archived. The next audit is at 0.3.112.

**D-618 · 2026-11-06 · The cave pools' fish** (the owner's picks, all
recommended; fishing's last step of D-608; mock-up:
https://claude.ai/artifact/1K9B7uS68QmyNTFnuCVTaR) Every cave pool is
fished as the pond is, cast, nibble, bite and strike meter, and catches
its own fish, the Blind Cavefish: look A, the minnow's shape, pale and
eyeless, bone and cream with a faint pink gill. A little better than the
minnow: 20% oil, 1 heart, sold for 2 coins, its strike zone a fifth of
the bar; stacks of 20, poured by hand and eaten the minnow's way. Finds
in pools come at a later step. "Fishing comes soon." is gone (supersedes
that part of D-609 and D-610). Claude's, the owner may change them: the
lines. `CONTENT-2.md`'s tiles, lights and places moved to `CONTENT-3.md`,
word for word.

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

**D-620 · 2026-11-06 · The waystone 3 × 3** (the owner's idea and
picks, all recommended; mock-up:
https://claude.ai/artifact/D4Bum5CsmzF7mR86DyciML) A waystone is 3 × 3:
the walkable cross, a standing stone in each corner tile, the plate in the
middle (supersedes D-587's 5 × 5 and four 2 × 2 corners). Look B, old and
mossy: each stone fits its own tile, resting 2 pixels up on its shadow,
9 to 11 pixels wide with a rough rounded top, some leaning a pixel, moss
on its lit top left, a crack, and in the woods grass at its foot; the
flagstones' rounded corners show the ground; the plate is as before. The
home plate stands 2 tiles north of the woods' middle (supersedes D-589's
3), the middle still at the foot of its south arm. In a cave room the old
5 × 5 patch stays open floor (`pad`), so every depth's stone keeps its
room and spot, and each room comes out as before but for the stone. Old
saves have every waystone made 3 × 3 where it stands, once, asleep or
woken as it was. D-610 moved to `archive/DECISIONS-FISHING.md`, word for
word.
