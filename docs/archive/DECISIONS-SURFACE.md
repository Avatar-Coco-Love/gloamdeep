# The surface decisions (D-209 to D-218, D-733 to D-739, D-744 to D-752)

Moved unchanged from `docs/DECISIONS.md` at step 51b (D-221), when it
neared 12 KB: the surface steps 48 to 51 (the woods, the lantern that
switches itself, the cave mouth, depths moving up, day and night,
daylight through the mouth) and the Seed Explorer, steps E1 and E2.
These are still in force unless marked superseded. Grep for an ID or
topic; never read this whole. D-734 to D-737, Hearthwood's 9 rooms,
where a journey begins, Light your lantern and waking after a fall, all
built (D-733's steps 1 to 3), followed at 0.3.192, the twelfth audit
(D-740), word for word. D-738, mountain rooms, built (D-733's step 4),
followed at 0.3.198 (D-746), word for word. D-739, rounded rock, and
D-744, a craggy cave mouth (partly superseded by D-745), built, followed
at 0.3.199 (D-747), word for word, as `docs/DECISIONS.md` neared 12 KB.
D-745, the broken seal, and D-746, Find the crypt, both built, followed
at 0.3.202 (D-750), word for word, for the same reason.
D-747 to D-749, smooth rock edges, ponds and grass, all built, followed
at 0.3.204 (D-753), word for word, for the same reason.
D-733, a bigger surface's plan, all five steps built, followed at
0.3.207 (D-756), word for word.
D-771, alchemy, a station of its own, followed at 0.3.228 (D-778),
word for word, as `docs/DECISIONS.md` neared 12 KB.
D-780 and D-781, the rare gloamling and the mole, both built, followed
at 0.3.239 (D-791), word for word, for the same reason.
D-784, the bunny, built, followed at 0.3.240 (D-792), word for word,
for the same reason.
D-785, alchemy and cooking's shape, followed at 0.3.241 (D-793), word
for word, for the same reason.
D-786, the mortar and pestle and the Glow Draught, built, followed at
0.3.242 (D-794), word for word, for the same reason.
D-793, the rare herb mimic, built, followed at 0.3.244 (D-796), word
for word, for the same reason.
D-787, the bag's Make tab, built, followed at 0.3.243 (D-795), word for
word, for the same reason.
D-796, the skulker crab, built, and D-788, the Make tab's details,
built, followed at 0.3.245 (D-797), word for word, for the same reason.
D-789, the mortar's card, built, followed at 0.3.246 (D-798), word for
word, for the same reason.
D-795, the Ward Draught, built, followed at 0.3.248 (D-802), word for
word, for the same reason.

---

**D-209 · 2026-10-20 · The first woods room** (step 48, owner's picks
from a mock-up of three tree looks, https://claude.ai/artifact/7Hh8yfLvKzbSKYpbFziWya;
part of Q-034 and Q-038) Until the cave mouth (step 49), only a dev
drawer button, Go outside, leads to it; a new journey still starts in
the crypt. It is plain daylight: the whole room is lit and remembered,
no fog and no lantern needed; a lit lantern still burns oil as before.
One round tree a tile, each with its own crown, trunk and shadow. The
room is 17 × 20, like the caves, made from the seed: trees all round the
edge, thick near it and thinner inside, every open tile joined. It is
depth 0; the strip and the map say SURFACE until places have names.

**D-210 · 2026-10-20 · A lantern that switches itself** (before step 49,
owner's picks; answers Q-049) Settings gains "Lantern: By hand" under
Seed, above Back; picking it, Left or Right flip it to "Lantern: By
itself", kept on this device. It is By hand until picked. By itself, the
lantern goes out as the hero comes into daylight and lights again as they
leave it, only at that moment, so the player's own switch between holds.
For now it reacts to daylight only; night (step 50) will join it. No line
is said. Later, a choice of oil levels at which it goes out (an idea).

**D-211 · 2026-10-20 · The cave mouth** (step 49, owner's picks from a
mock-up of three looks, https://claude.ai/artifact/KsSQEcYgn71XLjaYAzVn8G;
builds on D-184) For now the mouth sits on an edge of the one woods room,
standing in for D-184's side cell until the region's 3 × 3 grid is
built: the seed picks the edge (north, east, south or west) and a spot
along it, kept from the corners. It is mock-up C: trees along the edge,
a mound of grey rock either side of a dark mouth, an arch on the north
edge, and the tile in front worn to earth. Walking through it, the hero
arrives on the crypt's facing side, at a gap in its wall (the owner's
rule: go in up, arrive at the bottom): going up, the south room's bottom,
then on up into the first room; going down, left or right, the first
room. Walking back out arrives on the mouth. A new journey still starts
in the crypt, and dev Go outside stays. Daylight through the mouth waits
for step 51.

**D-212 · 2026-10-20 · A doorway keeps the depth; stairs change it**
(the owner's idea; for step 49b) A way in through a doorway or mouth
stays on the same level, and only stairs go down. So the two crypt rooms
become depth 0, like the woods, and every depth below moves up one: the
second room is depth 1, the generated floors 2, 3 and 4, still 5 levels
in all (D-185), and the deeper kinds move up one with them. The strip
says SURFACE in the crypt, until places have names. Built in its own
step, 49b, after the mouth.

**D-213 · 2026-10-21 · How the depths move up** (step 49b, owner's
picks) *The map part superseded by D-222 (2026-10-21): the map joins the
surface once both parts are visited.* A seed keeps its rooms: each place below the surface keeps the
seed numbers of its old depth, so only the labels change. The map shows
the part of the surface the hero is in, the woods or the two crypt
rooms, both headed SURFACE; the second room's stairs up lead to the
crypt. Dev Go to depth goes from 0, the crypt, and Go outside still goes
to the woods. D-201 to D-208 moved unchanged to
`archive/DECISIONS-REGION.md`; they stay in force.

**D-214 · 2026-10-21 · A Seed Explorer** (the owner's idea, owner's
picks) A dev entry on the title menu that opens the map screen instead
of the game, with everything revealed and the seed it shows written on
it. Easy-to-reach buttons: Reseed (a random seed each tap), type a seed
(the seed pad), and back to the last seed; floors turn as on the map.
On the surface it shows the woods and the crypt together, in the
Explorer only; the game's map keeps D-213. Built next, before step 50:
first the Explorer, then the whole surface on it. Later, as their own
steps: a button that fits places far apart on one depth, painting
rooms, and saving them to a file for Claude to build into the game.

**D-215 · 2026-10-21 · How the Seed Explorer looks** (step E1, owner's
picks) "Seed Explorer" is the title menu's last line, like the others.
A bar along the map box's bottom shows "SEED 48213" with Back on its
left and Type and Reseed on its right; the cross where the map button
sits, Esc or a tap outside the box return to the title. It opens on the
seed typed in Settings, else a random one, on the surface, and never
changes Settings. Back steps through every seed shown this visit, newest
first, and is greyed out when none is left. Proposed with the build:
Reseed, Back and a typed seed keep the floor shown; the seed pad starts
empty there, OK with nothing typed keeps the seed, Random shows a random
one; R, T and B are the keys.

**D-216 · 2026-10-21 · The whole surface in the Explorer** (step E2,
owner's picks from a mock-up of three layouts,
https://claude.ai/artifact/Qtjc4ZR6V9EDrekCgEBQQU) On the Explorer's
surface map the crypt sits where walking through the cave mouth takes
you: the mouth's tile right beside the gap in the crypt's wall, so it
moves with the mouth's edge. The mouth stays plain floor on the map, with
no mark of its own. The game's map keeps D-213.

**D-217 · 2026-10-21 · Day and night outside** (step 50, owner's picks;
builds on D-025, D-209, D-210; part of Q-027) A day is 300 turns from
morning: 170 of full day, a 30-turn dusk, 70 of night, a 30-turn dawn
(day 200, night 100). A journey starts in the morning and the clock runs
below ground too; only rooms under the sky show it. Dusk and dawn fade
the light. At night the woods are like a cave: only lights show tiles,
never-seen ones are black, remembered ones a dim moonlit blue, the
study's cold blue (D-060). Daylight lights and remembers the whole room
until halfway through dusk and from halfway through dawn; the lantern set
to By itself lights and goes out at those moments. No clock on screen,
only the light. Dev: TIME, +10 and +50 in the Room tab move the clock
only, and the status line shows the turn of the day.

**D-218 · 2026-10-21 · Daylight through the cave mouth** (step 51,
owner's picks; builds on D-173, D-211, D-217; part of Q-040) The gap the
mouth leads to in the crypt is a light, like a torch: by day it reaches
3 tiles in a pale daylight, through dusk it shrinks with the daylight and
warms toward the torches' orange, at night it is gone, and dawn brings it
back the same way. It is real light: tiles it reaches are remembered,
lantern or not, and a creature standing in it sees the hero. Weather
waits for Q-035.

**D-733 · 2026-11-09 · A bigger surface, the plan** (the owner's picks,
all recommended but where a fall wakes; builds D-182 to D-184, answers
Q-081) The surface grows to Hearthwood's 3 × 3 rooms, mountains in the
north row, woods elsewhere, home in the centre (D-182, D-183). A new
journey no longer begins in the crypt nor at home or the cave: the seed
picks one of the south woods rooms, never the cave's, and the hero walks
north to find the waystone. A fall wakes the hero (the owner's own
answer): in the last bed slept in; with none, at the home waystone once
woken; otherwise in the room where the journey began. The rooms differ:
mountain rooms, and woods from thick to open glades, the seed picking.
The order, one step each: 1 the 9 rooms, all woods, walking off an edge
into the next; home stays today's woods room, so what was set down keeps
its place, and the cave mouth moves to a room beside home (D-184); 2 the
south start, its teaching goal's words with it; 3 waking after a fall
(supersedes D-119's crypt when built); 4 mountain rooms; 5 thick woods
and open glades. Nothing is built yet. D-712 and D-713 move to
`archive/DECISIONS-GOALS.md`, word for word.

**D-734 · 2026-11-09 · Hearthwood's 9 rooms built** (the owner's picks,
all recommended; builds D-733's step 1, opens Q-087) The surface is
Hearthwood's 3 × 3 woods rooms, home in the centre. Every room is joined
to every room beside it, 12 joins, each a path 3 tiles wide through the
edge trees, at the same spot on both sides, the seed picking where, kept
3 tiles from the corners; the fewest trees are cut from it to the room's
open ground. Claude's calls: home grows as before, so its trees stay,
and an older save's home keeps everything, only its mouth and rocks
made trees and its paths cut; the cave mouth stands in the room beside
home the way the seed picked (D-184), on that room's far edge, the same
spot along it, so the crypt is reached as before; only home has the
waystone; every woods room has its sticks, branch, pond and bush, each
pond holding the Pond Minnow. D-705 and D-706 move to
`archive/DECISIONS-GOALS.md`, word for word.

**D-735 · 2026-11-09 · Where a journey begins** (the owner's picks,
recommended but where noted; builds D-733's step 2, answers Q-087) A
start is one entry in the registry (`src/core/starts.js`): its rooms,
its tile, the lantern, the opening card's words and its goal rules, so
a later start is a new entry; its own aims beyond teaching are settled
at that start. The one start, South woods: one of the south row's rooms,
the seed picking, never the cave mouth's; the hero on the open tile
nearest its middle; by day, so the lantern starts off (the owner's own
answer). The card: "You wake among the trees of Hearthwood." / "Your
lantern is cold; keep its oil for the dark." / "Something waits below."
"Find the waystone" shows from the first turn, its how line "Home is in
the middle of the woods." (superseded by D-753, 2026-11-09); "Go home to the woods" never shows; every
other goal keeps its own moment. Until step 3, a fall wakes where the
journey began, a Hardcore one starting there again. Next, the owner's
own idea: a teaching goal "Light your lantern" / "Tap the lantern, or
press L.", shown at dusk or on stepping into the dark with it off, done
once lit. Claude's calls the owner may change: a start's skipped goal
is never paid; the tile is one the room's paths reach, with nothing on
it. Partly supersedes D-628's words and D-119's crypt. D-727 and D-728
move to `archive/DECISIONS-PACK.md`, word for word.

**D-736 · 2026-11-09 · Light your lantern** (the owner's picks, all
recommended; builds D-735's goal) "Light your lantern" / "Tap the
lantern, or press L." shows when daylight no longer lights the room:
halfway through dusk under the sky, or on stepping where the sky doesn't
reach. It is done once the lantern is lit, by hand or By itself, paid
and gold. A lantern lit before then, by day or from a crypt start, ticks
it quietly, so every journey has it. While the dark is here and the
lantern is off, it goes ahead of any goal waiting, as the ember's does.
Claude's call the owner may change: switching the lantern, which passes
no turn, checks the goals at once.

**D-737 · 2026-11-09 · Waking after a fall** (the owner's picks, all
recommended; builds D-733's step 3, supersedes D-119's crypt and D-735's
"until step 3") A Normal or Gentle fall wakes the hero in the last bed
slept in, on the tile they lay down from; with something there now, on
the nearest open tile beside the bed. With no bed, on the home
waystone's plate once it is woken, no boon offered until the hero steps
off and back on. Otherwise in the room where the journey began, on its
tile. Taking the bed down forgets it until it is slept in again. The
fall line stays "You fall, and wake again." Hardcore still begins the
world again. Claude's call the owner may change: the code is
`src/core/waking.js`.

**D-738 · 2026-11-09 · Mountain rooms** (the owner's picks, all
recommended but the rock's look; builds D-733's step 4) Hearthwood's
north row, every seed, is mountain rooms: rocky slopes, the woods' grass
with rock where the trees would stand and a few lone trees inside. Each
holds 3 grey boulders, as a Cave room does (D-282), and the woods' 3
sticks and fallen branch; no pond or bush. The three are made the same
way, only the seed differing. The next step, the owner's own picks:
outside rock drawn rounded, as cave walls are, and rock going on past a
mountain room's edges; till then it is drawn as the mouth's rocks.
Claude's calls the owner may change: a tree 2 or more tiles in from the
edge stays a tree 1 time in 4; a room grows as a woods room, its paths
cut, then its trees made rock, so the paths stay where they were; a
mountain room already visited in an older save stays woods; on the map,
rock and boulders on the surface show in the cave rock's grey.

**D-739 · 2026-11-09 · Rounded rock** (the owner's picks, all
recommended; builds D-738's next step, added to D-733's plan before its
step 5) The surface's rock,
in the mountain rooms and by the cave mouth, is drawn rounded, as the cave
walls are, but lit by day: a sunlit grey top, not the cave's near-black,
and fuller, so a lone rock stays a lump, not a chip. Trees stand in front
of the rock. Past a mountain room's edge the rock goes on, but for a
grass passage straight out from each way on. The cave mouth's rocks are
only rounded; the mouth's own look waits for its step. Next, the owner's
picks: after the audit, a new cave mouth, one of a few looks the seed
picks, shown first as mock-ups (rock arch in a mound, an overgrown mouth,
a hole in the ground, a fallen-stone doorway); the outside art polished
in steps of its own. Claude's calls the owner may change: a room's rock
goes on past its edge when its edge holds rock and no tree or stump, so
a mountain room an older save keeps as woods keeps its trees there; the
code is `src/render/outcrop.js`.

**D-744 · 2026-11-09 · A craggy cave mouth** (Partly superseded by D-745, 2026-11-09: the crypt's way in is the broken seal; the cave looks wait for later caves) (the owner's picks; builds
D-739's step 24; mock-ups at https://claude.ai/artifact/MdF3oCUuabfT9v4EBbv2HS)
Of round 1's four looks the owner turned down the hole in the ground
(unless falling down holes ever comes, Q-089) and the grassy mound, which
didn't look good and hardly read as a cave. Of round 2's five, darker and
plainer, the owner picked the craggy cave and the overgrown mouth. The
seed picks the mouth's look (mouthOf), today's small arch kept as a third.
One look a step, each with its side and bottom edge mock-up first. First
the craggy cave: on the top edge a wide, rough mouth in the rock, black
inside, rock teeth hanging from its top; on another edge the rock roofs
over the outer part of the tile, joining the rocks either side, and the
ground dives black under it. Walking is unchanged. Claude's calls the
owner may change: the looks are listed in the registry (`caveMouth`'s
`looks`) and picked from their own seed stream, so each world's mouth
stays where it was; a few pebbles lie at the rocks' feet, clear of the
tile in front; the craggy cave has no worn path in front, as mocked.

**D-745 · 2026-11-09 · The broken seal, the crypt's way in** (the owner's
idea and picks, all recommended; supersedes D-744's looks for this way in;
mock-ups at https://claude.ai/artifact/B8QBEGU6jtmhF9MEhoWn7q) The way in
from the woods leads into the crypt, so it is a crypt's door, not a cave
mouth. Of three looks (the Lightkeepers' door, the broken seal, the tomb
gate) the owner picked the broken seal: a doorway of the crypt's bricks
under a pale stone lintel with a carved flame, bricked up long ago, a hole
broken through, fallen bricks on the grass. On a side or bottom edge the
wall's top shows from above along the edge, pale posts at each end, broken
open between. The worn path in front stays. Every world has it. The small
arch and the craggy cave are kept for later cave mouths into caves (the
registry's `caveLooks`), and the overgrown mouth waits with them; its step
comes off the plan. Walking is unchanged. Claude's calls the owner may
change: the tile keeps its id and name in the code (`caveMouth`), so saves
stay as they were; the drawing is `src/render/seal.js`.

**D-746 · 2026-11-09 · Find the crypt** (the owner's idea and picks,
all recommended; builds D-745) Once the way in is the crypt's door, a
new teaching goal sends the hero there: "Find the crypt", its how line
"A broken door, beside home.". It shows once "Take a boon" is done and
is done on walking into the crypt through the broken seal, paying a
reward as every goal does (D-706). Only the crypt's own rooms count,
not other places below the surface, as more ways down will come (the
owner's pick; changed after review: any depth below no longer counts).
Claude's call the owner may change: it is ticked quietly, unpaid in the
line, when the crypt was reached already this journey, as in a journey
begun in the crypt.

**D-747 · 2026-11-09 · Smooth rock edges, and what to polish** (the
owner's picks; builds D-739's step 24; mock-ups at
https://claude.ai/artifact/DjvVKCpbeuDBnTBeTVmMcz) A look through all nine
surface rooms found four things that look unnatural: the mountain rock's
torn edges, star-shaped ponds with dripping rims, busy camouflage grass,
and one tree stamp in rigid rows. The owner picked the rock first, and its
look A: smooth edges, no loose pixels, nothing else changed. The edge's
wobble is smooth noise, not a new random value every 3 pixels, and a lone
pixel or spike is cleaned off. Caves keep their own rock as it was. For
the trees, later, look A: still one round tree a tile (D-209), varied in
size, place and three greens. For the ponds the owner likes both today's
and the round, smooth look, and asked for a variation of that, shown as
mock-ups at the ponds' step. Claude's calls the owner may change: the
order after the rock is ponds, grass, trees, one a step; the grass's look
is asked at its step; the code is `mask`'s `soft` in `src/render/rock.js`.

**D-748 · 2026-11-09 · Ponds halfway to round** (the owner's picks, both
recommended; builds D-747; mock-ups at
https://claude.ai/artifact/EQfp8wLasizEnWkwonaWPi) Of four pond outlines,
from today's to round, the owner picked B, halfway: half the tiles' blend,
half a soft round blob on each water tile, the edge wobbling smoothly, a
lone pixel cleaned off and a notch filled, so no star shapes and no
dripping rim. The same tiles are water, so walking, fishing and the map
are unchanged. Cave pools keep their own edge, as the caves' rock did.
Claude's calls the owner may change: the code is `inPond` in
`src/render/water.js`, chosen by the room's woods look; next is the grass.

**D-749 · 2026-11-09 · Calmer grass** (the owner's picks, both
recommended; builds D-747; mock-ups at
https://claude.ai/artifact/VwxY2xAns7qoVPpwLPftyC) Of four grass looks,
from today's camouflage to one flat green, the owner picked B: the same
three greens in patches about three times bigger with smooth round edges,
the middle green covering most of the ground, and the pale blades half as
often. It is used for all surface grass, in the room and past its edge,
so they match. Claude's calls the owner may change: the code is `grass`
in `src/render/woods.js`; next are the trees, look A (D-747).

**D-750 · 2026-11-09 · Trees in groves** (the owner's pick, recommended;
builds D-747; mock-ups at
https://claude.ai/artifact/MKPM5jTsPD8t5aPJy9NNnJ) Of four tree looks
(today's, A1 gentle, A2 lively, A3 groves), the owner picked A3. Still
one round tree a tile (D-209), each now 0.78 to 1.1 times the old size,
moved up to 2 pixels, in one of three greens: the old green, a deep
blue-green and a warm olive. Neighbouring trees share a green, so the
woods shift colour in patches. Walking and cutting are unchanged; this
ends step 24's polish. Claude's calls the owner may change: a crown may
reach a little past its tile and is cut at the room's edge; the code is
`paintTree` in `src/render/woods.js`.

**D-751 · 2026-11-09 · Four ideas, and their order** (the owner's ideas
and picks, all recommended) One small step each, in this order. 1. The
oil tip: the first time the hero steps from the dark into daylight with
the lantern lit, a goal like Light your lantern says "Put out your
lantern" with "Tap the lantern, or press L, to save oil."; it goes once
the lantern is out and never shows again. 2. The home waystone stands in
the room with the cave mouth (the crypt's door), not the middle room,
moved for old saves too, still awake if it was woken. 3. With Waymark,
stairs down too far for the round map show as a violet dot on its rim,
pulsing as the marks do, toward the nearest stairs down. 4. Once the
way down is found, the motes stay: about 2 or 3, drifting slowly with
no set direction, more or fewer by the place, most in the crypt and
earth, fewer in grey rock, none under the sky. Supersedes D-605's
"None once any of the floor's stairs down is remembered". Claude's
calls the owner may change: the words, where the waystone stands in its
new room and the motes' counts are shown at their steps.

**D-752 · 2026-11-09 · The oil tip's rules** (the owner's picks, all
recommended; step 25, 1, D-751) "Put out your lantern" shows when
daylight comes with the lantern lit, by stepping out of the dark or by
dawn. Already out as the daylight comes, as By itself does, it is ticked
quietly and paid nothing. It pays a reward like every goal and goes
ahead of any goal waiting while the lantern burns in daylight.

**D-753 · 2026-11-09 · The home waystone by the crypt's door** (the
owner's picks, recommended but where noted; step 25, 2, D-751) The home
waystone stands in the room with the cave mouth, near its middle, 2
tiles north of it, as it stood at home (the owner's pick of three, over
near the door and halfway). A boon ends on arriving in that room, by
any way, no longer in home. "Find the waystone" shows on reaching that
room, and the South woods start's line says "Old standing stones, by
the crypt's door." In an older save the stone moves there, woken if it
was; at home its 9 tiles become grass, things set down there staying.
Claude's calls the owner may change: a new game's home grows as it did
and its stone's 9 tiles are grass, so home looks as an older save's
does; boulders keep off the stone's ring in a mountain room; the travel
card's Home and a fall's waking follow the stone; "Go home to the
woods" is still done in home. Partly supersedes D-583's home, D-589's
room and D-735's words. D-747 to D-749 move to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-754 · 2026-11-09 · Waymark's dot on the rim** (the owner's picks,
all recommended; step 25, 3, D-751) While Waymark is held and the
nearest stairs down don't fit whole on the round map, a violet dot one
tile big, as the marks are, sits just inside its rim toward them,
pulsing as the marks do (steady with reduced motion). Nearest is in a
straight line, and any stairs down count, found or not. None on another
floor, or with the map revealed. Builds on D-601.

**D-755 · 2026-11-09 · The motes that stay** (the owner's picks, all
recommended; step 25, 4, D-751) Once any of the floor's stairs down is
remembered, 3 motes stay in the crypt and earth, 2 in grey rock, and 2
in the dungeon, as grey rock (Claude's question, as D-751 left it out);
none under the sky. Each wanders its own slow way, its heading bending
gently, slower than the draft, fading in and out, only where the light
falls, none with reduced motion or the lantern out. Builds on D-605.

**D-756 · 2026-11-09 · Thick woods and glades** (the owner's picks, all
recommended; builds D-733's step 5, its last) Each of the 5 woods rooms
round home is thick woods, the woods as before or an open glade, the
seed picking, with at least one thick and one glade each seed. Home
stays as before, so what was set down keeps its place. In an older
save a room already seen stays as it is; one never seen, with nothing
taken, grows as its kind. The owner asked next for the surface to be
filled: more to do, less empty (Q-090). Claude's calls the owner may
change: thick trees 75, 55, 40 in 100 by ring in from the edge, at
least 80 open tiles; glades 45, 12, then none; a room whose waystone
is woken is never made again; the map preview names each room's kind.
D-733 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-757 · 2026-11-09 · Filling the surface, campfires first** (the
owner's picks; answers Q-090, Q-088's first step) Four things fill the
surface: campfires, more to gather, landmarks and night creatures, about
one thing in each room. Campfires come first; the order of the rest is
picked later. One campfire a seed, in one of Hearthwood's 8 rooms
outside home: blazing, embers or cold ashes, each with its words
("A campfire, burning high. Someone was here not long ago." "The coals
still glow. Whoever sat here is gone." "Cold ashes. No one has sat here
for a long time."). Burning, it lights 3 tiles, embers 2; none burns
down yet. Bumped, cold ashes ask Light the fire?, No picked; Yes makes
them embers for one turn of oil. Claude's calls the owner may change:
each level and room as likely; 2 tiles in from the edge; a line too
long for the strip shows a sentence a bump, and cold ashes' first
sentence on the strip, the rest on the card; "The fire catches."

**D-760 · 2026-11-09 · Gathering, oilcaps first** (the owner's picks,
the recommended order and finds, and the owner's addition; builds
D-757, opens Q-092) The surface fills in this order: gathering, then
landmarks, then night creatures. Gathering starts with oilcaps, then
loose stones, then plants and flowers to harvest (Q-092). Oilcaps first:
one in each woods room, home too, none in the mountain rooms, on open
grass beside a tree; picked, it grows back after a day as in the caves.
In an older save only rooms never seen, with nothing taken, get theirs.
Claude's calls the owner may change: beside means a tree straight
beside, not a corner; never on the start, a stick, the mouth's front or
the waystone's ring; each its own tone, as underground. D-755 and D-756
move to `archive/DECISIONS-SURFACE.md`, word for word.

**D-761 · 2026-11-09 · Gathering, step 2: loose stones** (the owner's
picks, all recommended, the look after its mock-up; builds D-760) Loose
stones lie in the mountain rooms only, the woods rooms keeping their
sticks and oilcap: 2 in each, on open grass. Each is a plain Stone,
drawn as the bag's pebble (look A of three), taken by walking onto it.
Picked, it grows back after a day, 300 turns, as the oilcap outside.
In an older save only mountain rooms never seen, with nothing taken,
get theirs. Claude's calls the owner may change: never on the start, a
find, the mouth's front or the waystone's ring; any open grass tile,
not only beside rock; its lines "You pick up a loose stone.", "A stone
from the slope. You keep it." and "You lift a stone from the grass.";
a stone a boulder leaves when the bag is full still never grows back.

**D-762 · 2026-11-09 · Gathering, step 3: herbs outside** (the owner's
picks, all recommended, and the owner's words on flowers; builds D-760,
part of Q-092) The first of Q-092's plants is the cave herb, growing
outside too: one in each woods room, home too, none in the mountain
rooms, on open grass. It is the same herb in every way: hurt, walking
onto it eats it, 2 hearts; at full health into the bag; it makes the
Antidote. Picked, it grows back after a day, 300 turns. In an older save
only woods rooms never seen, with nothing taken, get theirs. Flowers come
at their own steps: more than one kind, each drawn differently, picked
for crafts later, potion making among them, each growing where it suits
its kind (Q-092). Claude's calls the owner may change: never on the
start, a find, the mouth's front or the waystone's ring; any open grass
tile, not only beside a tree.

**D-763 · 2026-11-09 · Gathering, step 4: the duskstar** (the owner's
picks, all recommended, the look after its mock-up:
https://claude.ai/artifact/G4ixYQbiLTsSrcNoAR4PKQ; builds D-762 and
D-530, the first of Q-092's flowers) The first flower is look B, the
**Duskstar**: five violet petals round a yellow heart. 2 grow in each
woods room, home too, none in the mountain rooms, on open grass. Each
faces left or right and has its own slight shade of violet, the seed
picking. Walking onto one puts it in the bag, for crafts later. Picked,
it comes back after a day, 300 turns, on another open grass tile of the
same room (D-530). In an older save only woods rooms never seen, with
nothing taken, get theirs. Claude's calls the owner may change: stacks
of 20; never on the start, a find, the mouth's front or the waystone's
ring when laid, any free grass tile out of sight when it comes back; its
lines ("You pick a duskstar." and two more); a new violet shade, `#6e58a8`.
D-758 and D-759 move to `archive/DECISIONS-SLEEPING-OUT.md`, word for word.

**D-769 · 2026-11-10 · The first landmark: a dead lamppost** (the
owner's picks, all recommended, the look after its mock-up; builds D-760,
whose landmarks come after gathering) The landmarks start with a dead
lamppost, then a miners' camp at its own step ("A miners' camp, long
left. The pick is rusted through."). The lamppost is an old Lightkeeper's
iron crook post, its cold lamp hanging from the arm (look B of three);
solid, light passing it, as the campfire. It only looks and speaks for
now: bumped, "An old lamppost. Its lamp went out long ago." One a seed,
in one of Hearthwood's 8 rooms outside home, never the campfire's, so
each room holds about one thing (D-757). Claude's calls the owner may
change: on open grass 2 tiles in from the edge, never cutting the room,
as the campfire; its words a sentence a bump, as they are too long for
the strip; in an older save, its room gets it if never seen, with
nothing taken. D-762 moves to `archive/DECISIONS-SURFACE.md`, word for
word.

**D-770 · 2026-11-10 · Landmarks, step 2: the miners' camp** (the
owner's picks, the look after its mock-up:
https://claude.ai/artifact/UFEKsFHF3XZBC8L5r51UcY; builds D-769) The
camp is look A of three: a slumped canvas tent, its flap open on the
dark, and an old crate with a pick leaning on it, 3 × 2 tiles, all
solid, light passing them. The pick is the game's own Stone Pick
picture (the owner's words), and it is gone from the camp once taken.
One a seed, in one of Hearthwood's 3 mountain rooms, never the
campfire's or the lamppost's. Bumped, "A miners' camp, long left." on
the text line and the card Take the pick?, "An old pick leans on the
crate.", No picked, as cold ashes ask; Yes puts a plain Stone Pick in
the bag, a turn, and the camp turns bare; bare, a bump says its first
words, free. This changes D-769's "The pick is rusted through.", as
the pick now works. Claude's calls the owner may change: "An old pick
leans on the crate." and "You take the old pick."; with a pick already
carried, held too, "You already carry a stone pick.", with the bag
full "Your bag is full.", free, the camp keeping its pick; on open
grass 2 tiles in from the edge, never cutting the room; in an older
save, its room gets it if never seen, with nothing taken. D-763 moves
to `archive/DECISIONS-SURFACE.md`, word for word.

**D-771 · 2026-11-10 · Alchemy, a station of its own** (the owner's
picks, recommended, with the owner's addition; changes D-415, D-455;
opens Q-093) The owner asked if there are enough materials for more
recipes and kinds of station, such as a mortar and pestle or an
alchemy lab. There are: 16 finds wait "for crafts later". Alchemy
becomes its own family and station at home, apart from the kitchen
fire, which keeps cooking; small things are still made in the bag.
Its form (a mortar and pestle, an alchemy lab, or both), its recipes
and the other stations' are open (Q-093). They come after night
creatures and then day creatures, the owner's order and addition.
D-769 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-764 · 2026-11-09 · Dimmer doorway lines** (the owner's picks, both
recommended, after a mock-up; changes D-225's brightness) The owner
found the pale blue doorway lines too bright. In the game they are now
about half as bright: they pulse from 30% to 50% strength, steady at
45% with reduced motion. The fainter inner line stays 40% of the bright
one. The map's doorway squares stay as they were.

**D-772 · 2026-11-10 · A bow, after the alchemy station** (the owner's
wish; builds D-457, D-652; opens Q-094) The hero gets a bow for ranged
attacks, the first ranged weapon, where D-457's example named a sling.
It comes after the alchemy station and its recipes (D-771), the owner's
order. Its damage, range, how it aims on a phone, arrows, where it is
made or found and its look are open (Q-094), asked at its step.
D-770 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-778 · 2026-11-10 · Night creatures, first: lampmoths** (the
owner's picks, all recommended; builds D-760, D-217) Night creatures
start with a creature the game has: the lampmoth, so no new way. One
comes out each night in each woods room round home, never home and
never a mountain room: once daylight stops lighting the room (halfway
through dusk), and any still standing are gone once it lights it again
(halfway through dawn). New night kinds come later, one a step.
Claude's calls the owner may change: on open grass off the edge, out
of the hero's sight, picked by the seed and the night; one beaten stays
beaten till the next night; they go by day without a word; they count
in Records like any other. D-771 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-779 · 2026-11-10 · Night creatures, second: the bat** (the owner's
picks, the recommended plan after the owner's own answer; builds D-778)
Of the three kinds shown (gloamling, bat, cave spider), the owner liked
the gloamling as a rare one and the bat too. The bat comes now: one each
night in each woods room round home, as the lampmoth, with the same
rules (D-778). Next, a rare gloamling: each night the seed picks one of
the woods rooms round home for it. Claude's calls the owner may change:
a night bat leaves no guano, which lies only by a bat a room is made
with; it never shares a tile with the lampmoth. D-772 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-780 · 2026-11-10 · Night creatures, third: the rare gloamling**
(the owner's picks, all recommended; builds D-779) Each night the seed
and the night pick one of the 5 woods rooms round home, and a gloamling
comes out there beside that room's lampmoth and bat, with the same
rules (D-778). It acts and leaves finds as it does below: a Gloam Wisp
about 1 in 2, a Gloam Eye about 1 in 10. Claude's calls the owner may
change: it may pick the same room two nights running; it never shares a
tile with the others. D-778 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-781 · 2026-11-10 · Day creatures, first: the mole** (the owner's
picks, from the herb mimic, scorpion, centipede and mole; builds D-778,
D-771's order) Day creatures are night creatures turned round, starting
with a creature the game has: the mole. One comes out each day in each
woods room round home, never home and never a mountain room, from
halfway through dawn, and any still standing are gone from halfway
through dusk. It acts and leaves finds as it does below. Claude's calls
the owner may change: as daylight shows every tile, it comes out on
open grass off the edge at least 4 steps from the hero, picked by the
seed and the day; one beaten stays beaten till the next day; the start
room is one of these rooms, so a mole may meet a new journey on its
first turn. D-779 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-784 · 2026-11-10 · Day creatures, second: the bunny** (the owner's
idea, from the herb mimic, scorpion and centipede offered; the rest of
its picks all recommended; builds D-781) A new creature, the first that
means no harm: a bunny, soft brown with a pale tail. It never bites.
Within 3 steps of the hero it hops a tile away, its way `shy`: the lure
wisp's way (D-649) but just away, never toward another creature. One
heart; beaten, it may drop Bunny Fur, about 1 in 2, for crafts later.
One comes out each day in each woods room round home, beside the mole,
and one in the home room too, the first creature there; never by night,
never underground. No rare day creature yet. Claude's calls the owner
may change: its look (a dark eye, not a creature's pink one); Bunny Fur
holds 20 and sells for 1, as the other furs; its lines; it has no sound
of its own. A bunny within 3 steps counts as a creature near
for sleeping out, as the lure wisp does. The people's glossary lines
move back to `GLOSSARY.md` word for word, so `GLOSSARY-2.md` stays
under 8 KB.

**D-785 · 2026-11-10 · Alchemy and cooking, the shape** (the owner's
picks, all recommended, with the owner's addition; narrows Q-093,
Q-088; changes D-456's "stations don't improve for now" for alchemy)
Alchemy starts at a mortar and pestle, a station built at home; an
alchemy lab comes later as the better station, with stronger recipes.
Recipes there are fixed, as Make is today: set finds always make the
same thing, shown once their parts have been held (D-418); a base
potion with add-ins was offered and not picked. Its first new potion
makes the lantern reach farther for a while; its finds, amounts and
turns are proposed at its step. Cooking comes after alchemy, at the
kitchen fire (D-771), and simple food can also be cooked at a lit
campfire in the world (the owner's addition). The mortar's cost and
look, the lab and each recipe come at their own steps. Nothing in the
game changes yet.

**D-786 · 2026-11-10 · The mortar and pestle and the Glow Draught**
(the owner's picks, all recommended, from a mock-up drawn with the
game's own code, https://claude.ai/artifact/DwTohmU1v4fTrkkLTxBWL4;
builds D-785, narrows Q-093) The Mortar and Pestle is a grey stone bowl
on a short wooden stump, its wooden pestle leaning out (look A of
three). It costs 4 Stone and 1 Wood. The workbench's 12 slots are all
taken, so it is made in the bag, on the Make tab (D-787), and set down
at home on the surface like the bed. Its first recipe is the Glow
Draught: 2 Duskstar and 1 Wisp Glass, made at the mortar. Drunk from the
bag, the lantern reaches 1 tile farther for 60 turns, as Wide Glow does
and added to it; an empty lantern gets nothing. Claude's calls the owner
kept: the names; the draught is the red potion's bottle in the
lantern's gold and holds 5; the mortar bumped opens a card listing what
it makes. Built in steps: the Make tab, then the mortar, then the
draught.

**D-787 · 2026-11-10 · The bag's Make tab** (the owner's idea, from the
mortar's step; the owner's picks, from a mock-up, same link as D-786)
The bag card gets two tabs, BAG and MAKE, in its title row. Make shows
the recipes made in the bag in a grid like the workbench card's: a
recipe shows once each of its parts has been held (D-418) and stays
after, its cost counted from the bag, MAKE dim when short. A find's MAKE
on the Bag tab stays, and opens the Make tab with its recipe chosen
(its first, if it is in several). Above that button a line shows what
it makes: the result's picture and "Makes a Flask" (look A of three).
This lets a find be in more than one recipe. The first step adds the tab
with today's bag recipes only.

**D-793 · 2026-11-10 · Day creatures, third: the rare herb mimic**
(the owner's picks, from the herb mimic, scorpion and centipede, as a
rare one, recommended; builds D-784) Each day the seed and the day pick
one of the 5 woods rooms round home, and a herb mimic comes out there
beside that room's mole and bunny, with the day creatures' rules
(D-781); never home. Day matches night: two that come each day, one
rare. It acts and leaves finds as it does below. Claude's calls the
owner may change: it comes out asleep, looking like a herb, on open
grass 4 steps or more from the hero; it may pick the same room two days
running; it never shares a tile with the others. The owner also wants
brand-new kinds of creature, not only ones from below (Q-076). D-785
moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-796 · 2026-11-10 · The skulker crab, the mountain rooms' first
creature** (the owner's picks, all recommended; answers part of Q-076; mock-up:
https://claude.ai/artifact/GVg8chN5wsic1iZR58aQ3n)
A brand-new creature, the skulker crab, from the Q-076 list. It never
moves and bites whoever stands beside it, the snapcap's way (D-543),
and looks like a loose stone until the hero is beside it. Look B of its
mock-up: a stony grey shell, rust legs and claws, pink eyes on stalks.
2 hearts, a bite of 1; beaten, it may drop a Crab Shell, about 1 in 2,
for crafts later. One comes out each day in each of the 3 mountain
rooms, with the day creatures' rules (D-781); nothing there by night,
never underground. Others offered: by night, in the woods or below; a
mountain goat, shy as the bunny; a rock lizard with the rat's ways; a
rare one; two a room; looks A (all grey) and C (eyes and teeth); 3 or 1
hearts; a Crab Claw. Claude's calls the owner may change: its lines (a
pinch, not a bite); it has no sound of its own; the Crab Shell holds
20 and sells for 1. D-793 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-788 · 2026-11-10 · The Make tab's details** (the owner's picks, all
recommended; builds D-787) The game remembers every find ever in the bag
(`known` in the save); an older save starts it from what is in its bag
and stash chests. The two recipes making an Oil flask (3 Oilcaps; Mimic
Glass with 2 Oilcaps) are two slots side by side. With nothing shown
yet, the tab says "Nothing to make yet. Recipes show once you have held
their finds." The bag always opens on BAG. Claude's calls: Tab, or a tap
on a tab, turns the tabs; a find's MAKE (and C) opens its own recipe, or
else the first it is in, and is dim only before that recipe shows; a
cost is counted from the whole bag, so 2 and 1 Oilcaps in two stacks
make a flask.

**D-789 · 2026-11-10 · The mortar's card** (the owner's picks, all
recommended; builds D-786) Bumped, day or night, the set-down Mortar and
Pestle opens the workbench's card titled MORTAR, its grid empty until
the Glow Draught's step, a grey line saying "Nothing to make here yet."
DECONSTRUCT takes it back into the bag with no ask, as the workbench's
does. Its lines: "You make a mortar and pestle.", "You set down the
mortar.", "You take down the mortar.", "You already carry a mortar."; its
look: "A stone bowl and a wooden pestle.", "Set it down on the
surface.", "Grind finds into draughts." It shows on the Make tab once
Stone and Wood have been held. Claude's call: the tile's letter `e`.

D-791, D-792 and D-794, the mortar's first three draughts' rules, moved from
`docs/DECISIONS.md` at 0.3.247 (D-801), word for word.

**D-791 · 2026-11-10 · The Glow Draught's details** (the owner's picks,
all recommended; builds D-786) Drunk again while it works, its time goes
back to 60 turns, never more. A small gold bottle mark under the hearts
panel shows it, with the turns left beside it, and a tap on it says
"Glow Draught: {n} turns left."; lines as it is drunk and as it fades
("The glow fades."). It can be drunk any time, the lantern empty too:
its turns count down every turn, a night's sleep uses them, and the
extra tile shows again once there is oil. The mortar lists it once
Duskstar and Wisp Glass have both been held. A Duskstar's and a Wisp
Glass's card then shows the draught's picture and "Makes a Glow Draught
at the mortar" where MAKE sits, with no button. Claude's calls: a fall
ends it, as it ends poisoned; its other lines ("You make a Glow
Draught.", "You need 2 Duskstar and 1 Wisp Glass.", "You can't carry
more Glow Draughts.", the three drink and look lines); the two finds'
first look line says "good for making things" (D-677). D-780 and D-781
move to `archive/DECISIONS-SURFACE.md`, word for word.

**D-792 · 2026-11-10 · Slowburn, the mortar's second recipe** (the
owner's picks, both recommended, from Slowburn, a Ward Draught against
poison and a Mending Draught offered; narrows Q-093) Slowburn is made at
the mortar from 2 Tick Shell and 1 Oilcap. Drunk from the bag, for 60
turns a lit turn burns 6/7 of its oil, so a full tank lasts 70 turns,
not 60, as the Heart Charm does and added to it. Its rules are the Glow
Draught's (D-791): drunk again, back to 60; any time, the turns running
on; a night uses them and a fall ends it; it holds 5; a small mark
under the hearts with the turns left. Claude's calls the owner may
change: the red potion's bottle dark as lamp oil, its mark in the oil
bar's deep amber; its lines ("The flame burns hungry again." as it
fades); the mortar lists it after the Glow Draught; a Tick Shell's card
then shows "Makes a Slowburn at the mortar". The Glow Draught's DRINK is
no longer drawn dim at full health, as it never was. The handoff's next
prompts are each in their own fenced code block, never an inline list
(the owner's correction, D-790). D-784 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-794 · 2026-11-10 · The Mending Draught, the mortar's third recipe**
(the owner's picks, all recommended, from a Mending Draught, a Ward
Draught against poison, or both in turn; narrows Q-093) The Mending
Draught is made at the mortar from 2 Mimic Leaf and 1 Herb. Drunk from
the bag, it gives a heart every 15 turns for 60 turns, 4 in all, never
above full. Its rules are the Glow Draught's (D-791): drunk again, back
to 60; any time, full health too, the turns running on; a night uses
them and a fall ends it; it holds 5; a small mark under the hearts with
the turns left. Claude's calls the owner may change: the red potion's
bottle in moss green, its mark too; a night's turns give no hearts; its
heart comes before poison's in a turn; its lines ("The warmth fades."
as it ends); the mortar lists it after Slowburn; a Mimic Leaf's card
then shows "Makes a Mending Draught at the mortar". D-786 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-795 · 2026-11-10 · The Ward Draught, the mortar's fourth recipe**
(the owner's picks, all recommended; narrows Q-093) The Ward Draught is
made at the mortar from 2 Centipede Leg and 1 Herb. Drunk from the bag,
it ends poisoned at once, and for 60 turns a bite that hurts never
leaves the hero poisoned. Its rules are the Glow Draught's (D-791):
drunk again, back to 60; any time, the turns running on; a night uses
them and a fall ends it; it holds 5; a small mark under the hearts with
the turns left. Its bottle and mark are a pale green-white, apart from
poison's sick green and the Mending Draught's moss. Others offered: a
ward only, no cure; poison milder, as the Centipede Charm; 1 Venom Sac
and 1 Herb; 2 Stinger and 1 Snapcap Gill; pale blue; bone white.
Claude's calls the owner may change: its lines ("The ward wears off."
as it ends); a bite on the turn it is drunk is cured with the rest; the
mortar lists it after the Mending Draught. The handoff's copyable next
prompts are given once, after the owner merges, not also before (the
owner's request; changes D-790). D-787 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-797 · 2026-11-10 · The rim lurker, the mountain rooms' first night
creature** (the owner's picks; answers part of Q-076; mock-up:
https://claude.ai/artifact/MW9qmr5aUJTzq75sHE7LMv)
A brand-new creature, the rim lurker, from the Q-076 list. One comes
out each night in each of the 3 mountain rooms, with the night
creatures' rules (D-778); never by day, never underground. Look B of its
mock-up: a hunched shade of dusky violet, long arms, pale claws, pink
eyes. It waits where it came out until the hero comes within 3 steps,
lit or not; then it chases, the rat's way, and keeps coming. 3 hearts,
a bite of 2 (the owner's own pick); beaten, it may drop a Lurker Claw,
about 1 in 2, for crafts later. Others offered: the gloamberry mimic,
the dozing brute, the brood mother; the woods by night or day, or below;
looks A (a grey crag stalker) and C (a rim lizard); chasing from the
start, or shunning the lantern; 2 or 1 hearts with a bite of 1; no find.
Claude's calls the owner may change: the new way is named Lurks, and it
needs a clear line to the hero, as a chaser does; it comes out on grass
beside the room's rock when such a tile is free; its lines (it claws);
no sound of its own; the Lurker Claw holds 20 and sells for 1.
D-796 and D-788 move to `archive/DECISIONS-SURFACE.md`, word for word, and
`GLOSSARY-2.md`'s home words to a new `GLOSSARY-HOME.md`, word for word.

**D-798 · 2026-11-10 · Steady Wick, Light's first upgrade** (the
owner's picks, all recommended) The gaps are worked through one step a
time, quickest first: the Growth tree; uses for the finds kept for
crafts later; the herb mimic's and bone rat's rare drops; the lantern's
parts; weapons; the forge and cooking; then found abilities, bosses,
trophies and people. The Growth tree's Light branch gets its first
upgrade, Steady Wick: 1 ember, bought once, for good; a lit turn burns
9/10 of its oil, a full tank lasting about 66 turns, not 60, added to
the wick, the charm, the boon and Slowburn. Where its box is too narrow
for the name, it says "Steady". Others offered: drop uses or the lab
first; Fuller Pour (a flask 50%, not 45%); Brighter Glass (1 tile
farther); two lines in the box, or a shorter name. Claude's calls: its
words "The lantern burns a little slower, for good."; its button "Get
Steady Wick"; a small flame in the lantern's gold, dim until bought; it
is kept on a Normal fall, as Tough is. D-789 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-800 · 2026-11-10 · The workbench's two tabs** (the owner's pick,
recommended, from a fourth row or pages) The workbench's card was full,
12 slots, so it gets two tabs where its title was, as the bag's: BUILD
(the chest, Stone Pick, bed, bag upgrades, garden bed, rod, shelf) and
GEAR (the wick, the vests, the charms), a 4 × 3 grid each. A tap on one
or Tab turns it. Claude's calls: the tab last open is kept while the
game runs; the mortar keeps its title, with no tabs.

**D-801 · 2026-11-10 · The Shell Vest** (the owner's picks, all
recommended; builds D-484, D-799) The second armour piece, on the GEAR
tab: 4 Crab Shell, 1 Wood. Worn in the armour slot, in the Rat Hide
Vest's place, it takes 1 off a bite of 2 or more, the scorpion's tail
strike too, so the rim lurker and the scorpion hurt 1, not 2. Its look:
overlapping stony grey plates with rust edges, the crab's colours.
Claude's calls the owner may change: never below 1; its lines ("You
put on the shell vest.", "A shell vest. Hard bites hurt less.");
the Crab Shell's look line names it. D-791, D-792 and D-794 move to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-802 · 2026-11-10 · The Spitproof Draught, the mortar's fifth
recipe** (the owner's picks, all recommended; builds D-799) Made at the
mortar from 2 Grub Skin and 1 Herb. Drunk from the bag, for 60 turns a
spit grub's glob that reaches the hero splashes off and hurts nothing;
grubs still spit. Its rules are the Ward Draught's (D-795): drunk
again, back to 60; any time; a night uses its turns and a fall ends it;
it holds 5; a small mark under the hearts with the turns left. Its
bottle and mark are dusty rose, from the grub's pink eye. Others
offered: 3 Grub Skin; 2 Grub Skin and 1 Oilcap; a glob hurting less,
never the last heart; grubs not seeing the hero; waxy bone-cream; slate
blue-grey. Claude's calls the owner may change: its lines ("The glob
splashes off you.", "Your skin feels dry again." as it ends); the glob
breaks on the hero, flying no farther; the mortar lists it last; the
Grub Skin's look line names it. D-795 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-803 · 2026-11-10 · The Fur Bedroll** (the owner's picks, all
recommended; builds D-758, D-759, D-799) Bunny Fur's first use, made on
the workbench's BUILD tab from 4 Bunny Fur and 1 Spider Silk; one at
most, carried in the bag, taking a slot, never used up. Sleeping out
with it in the bag, the hero wakes with 2 hearts back, never above full,
and not stiff; the bed at home still heals to full. Its look: a roll of
fur in the Bunny Fur's colours, tied round the middle with a pale silk
cord. Others offered: healing to full; 3 Bunny Fur and 1 Spider Silk;
5 Bunny Fur alone; the GEAR tab; a folded blanket. Claude's calls the
owner may change: BUILD lists it last; its lines ("You make a fur
bedroll.", "You wake warm in your fur bedroll."); the moon's ask says
"Your fur bedroll is warm." while it is carried; only the bag counts,
not a chest; the Bunny Fur's look line names it. D-797 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-804 · 2026-11-10 · The Fur Bedroll laid out, and SLEEP** (the
owner's idea and picks, all recommended; builds D-758, D-803) In the
bag the bedroll has SET DOWN and, left of it, SLEEP. SET DOWN lays it
beside the hero, the bed's way, only under the sky. Bumped from dusk,
it asks Sleep here until morning?; Yes is the bedroll's night, 2 hearts
back and not stiff; by day it asks Roll up the bedroll?, Yes putting it
back in the bag. SLEEP asks the same where the hero stands, dim by day,
below ground or with a creature after the hero. It is no bed for a
fall: home's bed still is (D-737). The moon button stays. Others
offered: one card with Sleep and Roll up; USE or REST; a bedroll slept
on as the bed for a fall; the moon hidden while carried. Claude's calls
the owner may change: SLEEP or a bump that can't says why, free ("Only
under the sky.", "Not with a creature after you.", "You aren't
tired."); C in the bag is SLEEP; asleep beside a laid-out bedroll is
warm too, the moon's ask saying so; "You lay out the fur bedroll." and
"You roll up the fur bedroll."; laid out, it is drawn from above, its
head end still rolled. D-798 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-805 · 2026-11-10 · The Echo Charm** (the owner's picks, all
recommended; builds D-799) Bat Wing's first use, made on the workbench's
GEAR tab from 3 Bat Wing and 1 Copper Ore, as the other charms are.
Worn, each creature within 4 tiles of the hero, walls between or not,
that no light shines on shows as a pale outline of its shape over the
dark, slowly pulsing (steady with reduced motion). Others offered: 3 Bat
Wing and 1 Spider Silk; 4 Bat Wing and 1 Copper Ore; a ripple ring only;
the creature itself, very dim; 3 or 5 tiles; only creatures in the
open. Claude's calls the owner may change: GEAR lists it last; tiles are
counted the king's way, a diagonal one step; one in disguise stays
hidden, that being the Gloam Eye's work (D-799), and one with its own
glow shows already; echoed is not met in the Bestiary; its look, a
folded bat wing in the charms' copper setting; its lines ("You make an
echo charm.", "You put on the echo charm.", "Near creatures show in
the dark."); the Bat Wing's look line names it. D-800 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-806 · 2026-11-10 · The Shade Draught, the mortar's sixth recipe**
(the owner's picks, all recommended; builds D-799) Lurker Claw's first
use, made at the mortar from 2 Lurker Claw and 1 Duskstar. Drunk from
the bag, for 60 turns a creature that has not noticed the hero notices
them only within 2 steps, by light, by line or lurking; one already
after the hero keeps coming, lampmoths still fly to the lantern and
spit grubs still spit. Its rules are the Spitproof Draught's (D-802):
drunk again, back to 60; any time; a night uses its turns and a fall
ends it; it holds 5; a small mark under the hearts with the turns left.
Its bottle and mark are dusky violet, the rim lurker's. Others offered:
2 Lurker Claw and 1 Herb; 3 Lurker Claw; within 1 or 3 steps; chasers
losing the hero too; grubs spitting only near; smoky grey; deep indigo.
Claude's calls the owner may change: steps counted the lurker's way, no
diagonals; its lines ("The dark folds round you.", "The shade lifts
from you." as it ends); the mortar lists it last; the Lurker Claw's
look line names it. D-801 moves to `archive/DECISIONS-SURFACE.md`, word
for word.

**D-807 · 2026-11-10 · The Bone Hook** (the owner's picks, all
recommended; builds D-799, D-614) Rat Bone's first use, made on the
workbench's BUILD tab from 3 Rat Bone and 1 Spider Silk; one at most.
FIT in the bag ties it to the rod for good, free, the Copper Wick's way;
it leaves the bag, and the rod is drawn with a small pale bone hook under
its float. Fitted, the strike meter's amber zone is half again as wide:
the minnow's 3/8 of the bar, not 1/4, the cavefish's 3/10, not 1/5;
waiting for a bite stays the same. Others offered: bites coming sooner,
1 turn in 4; a second try after a miss; a third wider; double; working
from the bag; the rod made over at the bench; 2 Rat Bone and 1 Spider
Silk; 4 Rat Bone. Claude's calls the owner may change: BUILD lists it
last; FIT only with the rod carried, in the bag or the Tool slot, else
"You have no rod to fit it to.", free; it stays on for good, there being
one rod; its look, a rat bone bent into a J; its lines ("You make a bone
hook.", "You tie the bone hook to your rod.", "A bone hook, for your
rod."); the Rat Bone's look line names it. D-802 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-808 · 2026-11-10 · The Glow Lamp** (the owner's picks, all
recommended; builds D-799, D-478) Glow Gland's first use, made in the
bag (Make on the Glow Gland) from 1 Glow Gland and 1 Wood, as a torch
is; 5 a stack. Set down the torch's way, anywhere, on the same stone
foot: it lights 3 tiles in the gland's soft green, steady, no flicker,
for 300 turns, then goes dark, leaving bare floor; it can't be picked
back up. Others offered: the bench's BUILD tab from 1 Glow Gland and 1
Copper Ore; 1 Glow Gland, 1 Moth Dust and 1 Wood; 200 turns; never
going out; the torch's orange; green, 4 tiles; picked back up by a bump.
Claude's calls the owner may change: its look, the gland in a small
copper cup on the torch's stick, in its ring of stones, drawn bright
with no embers; lampmoths and bats fly to it as to any light; it counts
in no Torches feat; its lines ("You make a glow lamp.", "You set down
the glow lamp.", "Your glow lamp goes dark."); the Glow Gland's look line
names it. D-803 and D-804 move to `archive/DECISIONS-SURFACE.md`, and
the lights' table to `CONTENT-2.md`, word for word.

**D-809 · 2026-11-10 · The Fang Charm** (the owner's picks, all
recommended; builds D-799) Bat Fang's first use, made on the
workbench's GEAR tab from 1 Bat Fang and 1 Copper Ore, as the other
charms are. Worn, each creature beaten gives back 1 heart about 1 time
in 4, never past the most. Healed, its line shows and a small red heart
rises beside the "+1" over the hero (steady with reduced motion).
Others offered: 2 Bat Fang and 1 Copper Ore; 1 Bat Fang and 1 Spider
Silk; 1 time in 3 or 5; a line only; nothing extra. Claude's calls the
owner may change: GEAR lists it last; a pile of bones scattered counts
as beaten, struck down into its pile does not; the spear's two beaten
are a coin each; at full hearts nothing happens, no line; the coin is
seeded as a drop's is; its line ("The fang drinks. You feel better.")
is said over the creature's own; its look, a pale bat fang pointing down
in the charms' copper setting; its other lines ("You make a fang
charm.", "You put on the fang charm.", "Beaten creatures may mend
you."); the Bat Fang's look line names it. D-805 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-810 · 2026-11-10 · The Mole Claw Pick** (the owner's picks, all
recommended; builds D-799, D-480) Mole Claw's first use, the last quick
one, made on the workbench's BUILD tab from 1 Mole Claw, 2 Wood and 2
Stone; one at most. A Tool of its own beside the Stone Pick, one in the
Tool slot at a time, swapped there as the rod is. Held, it does all the
Stone Pick does, and copper veins and rubble break in half the bumps,
rounded up: a vein in 2, not 4; rubble in 2, not 3. Other tiles, stone
heaps among them, take their own. Others offered: stone heaps too;
veins only; one bump fewer; 1 bump always; the Stone Pick made over
with the claw, used up; 1 Mole Claw, 1 Copper Ore and 2 Wood; replacing
the Stone Pick. Claude's calls the owner may change: BUILD lists it
after the Stone Pick; made with the Tool slot empty it goes straight
there, the Stone Pick's way; a vein's first bump says its first line,
the second breaks it; its look, the Stone Pick's handle with a mole's
pale claw lashed on as its head; its lines ("You make a mole claw
pick.", "You hold the mole claw pick.", "Veins and rubble go in 2
bumps."); the Mole Claw's look line names it. D-806 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-811 · 2026-11-10 · The Growth tree, ready to grow** (the owner's
picks, all recommended, from a page of three looks:
https://claude.ai/artifact/4Gif1nMAvjvi5ZztHwdz2y; builds D-462, D-481)
Before the Hands upgrade, the tree is made ready for many more. Its look
will be A, twigs: one drawn tree kept, each row a twig across the three
limbs, its upgrades small picture tiles side by side, up to 3 a branch
in a row, the name and words on the right when picked, and the tree
scrolling once there are more rows than fit. Offered too: branch pages,
one limb's tree a page; lists, like the Bestiary. In three steps: first,
nothing visible, one list of upgrades in the code, each with its cost,
the most times it can be bought and its look, and one record in the
save of what was bought, older saves keeping their hearts, Tough and
Steady Wick (offered too: each upgrade its own entry, as before); then
the twigs; then the Hands upgrade. D-807 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-812 · 2026-11-10 · The Growth tree's twigs** (the owner's picks, all
recommended, from a page of mock-ups:
https://claude.ai/artifact/9U2gRwJi4C88wFJKev2RWU; builds D-811) The
tree's look A: each row a twig across the three limbs, its number dim at
the left; a branch's upgrades small picture tiles side by side; a bought
tile's picture lit and its frame faintly gold; the heart a heart with
how many are bought in its corner; one lock tile a limb on the locked
row. A dashed "to come" tile only where a limb has nothing yet (offered
too: a spare on every limb; none). The arrows read a row: Left and Right
walk its tiles across the limbs, Up and Down change row on the same
limb; past a row's ends, Records and the Bestiary (offered too: limb by
limb). Claude's calls the owner may change: tiles 18 pixels, smaller on
a small screen; the tree scrolls by a swipe or the wheel and follows
the pick, a small arrow where rows are hidden. D-808 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-813 · 2026-11-10 · Quick Hands** (the owner's picks, all
recommended; the last step of D-811) Hands' first upgrade, in the
first row: a tree, a stone deposit or a fallen branch, gathered by
hand, takes 1 bump fewer (a tree 3, a deposit 2, a branch 1; a berry
bush stays 1). A tool's own count is kept: copper veins and rubble
are unchanged. 1 ember, bought once; its tile's picture a pale open
hand. Others offered: Full Hands, 1 more Wood or Stone from each;
Deep Pockets, 1 more bag slot; 2 embers; a small axe or a sack.
Claude's calls the owner may change: its name and words ("Trees,
stone and branches take 1 bump fewer."); rubble around a trapped
person is not gathering, so keeps its 3 bumps. D-809 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-814 · 2026-11-10 · Growth's second row** (the owner's picks, all
recommended, from the map's row 2 drafts, D-639; builds D-462, D-811)
Biome 2 is not built yet, so row 2 opens the first time the hero goes
deeper than depth 8, biome 1's last floor (offered too: shown but
locked until biome 2; more upgrades in row 1 instead). Each 1 ember,
bought once. Light: Quick Pour, pouring a flask takes no turn (offered
too: Long Torch, a set torch 200 turns; Last Drops, the last 5% of oil
lasting twice as long). Body: Guard, about 1 bite in 6 glances off and
does no harm, by the seeded dice (offered too: Second Wind, eating at 1
heart heals 2 more; Quick Swap, a weapon swapped with no turn). Hands:
Thrift, making something keeps its cheapest part about 1 time in 4
(offered too: Steady Line, a wider light on the strike card; Deep
Pockets, a bag slot). Built in four steps, one a PR: row 2 opening at
depth 9 with a dashed tile a limb; then Quick Pour; Guard; Thrift. Each
one's words, look and details are settled at its step. D-810 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-815 · 2026-11-11 · Row 2 opens** (the owner's picks; step 1 of
D-814) The journey keeps a mark of Growth's rows open, set the first
time the hero is deeper than depth 8 and never taken away; an older
save already past depth 8 has it when loaded (offered too: worked out
each time from the rooms kept; per profile, across journeys). A dev
jump to depth 9 or deeper opens it too (offered too: only walking
there). The owner's own pick: everything visible, with what it takes
to open it; the locked tiles stay, and picking one says "Reach depth 9
to open." (offered too: a depth tag on the row; dim upgrades shown
locked). Once open, row 2 has a dashed tile a limb, and row 3 shows
locked above it, "Opens deeper down." No line in the log yet: "Growth
has a new row." is added with Quick Pour (offered too: a line now;
never). D-811 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-816 · 2026-11-11 · Quick Pour** (the owner's picks, all
recommended; step 2 of D-814) Light's row 2 upgrade, 1 ember, once: a
flask poured by hand takes no turn, so no oil burns and no creature
moves, and "You pour a flask." is said (offered too: nothing said). Its
words "Pouring a flask takes no turn."; its tile a tipped flask, a drop
falling (offered too: an upright flask and a drop, "You pour a flask in
no time."; a lantern and a drop). A Pond Minnow's oil still takes its
turn, as it is not a flask (D-611; offered too: any oil by hand).
"Growth has a new row." is said the first time a row opens, walking
down or by a dev jump, in place of that turn's line (offered too: kept
in the log as well); an older save that loads already open says
nothing. D-812 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-817 · 2026-11-11 · Guard** (the owner's picks, all recommended;
step 3 of D-814) Body's row 2 upgrade, 1 ember, once: a bite the worn
vest did not turn rolls Guard's own dice, and about 1 in 6 glances off
and hurts nothing, so with the Rat Hide Vest about 3 bites in 8 glance
off (offered too: the chances added; only the bigger one). Guard's line
"The bite glances off you."; a bite the vest turned keeps "The bite
glances off your vest." (offered too: the vest's line always; nothing
said). Only bites: an oil drink, a glob and a sting are not turned
(offered too: bites and drinks; every blow). Its words "About 1 bite in
6 glances off."; its tile a small pale round shield, a boss in the
middle (offered too: a fang turned aside; a heart in a ring). D-813
moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-818 · 2026-11-11 · Thrift** (the owner's picks, all recommended;
step 4 of D-814, the last) Hands' row 2 upgrade, 1 ember, once: about
1 making in 4, by the seeded dice, keeps 1 of the part its recipe uses
most of, the first listed on a tie, so the Mortar keeps 1 Stone and
the Stash Chest 1 Wood (offered too: 1 of the part used least of; the
whole part). The full cost is still needed; 1 fewer is taken. Every
making: the bag's Make, the workbench, the mortar, the Pouch and the
Big Bag (offered too: all but the bag upgrades; only the bench and
mortar). "You keep 1 Stone." is said in place of the make line, naming
the part (offered too: the make line, then a second; nothing said).
Its words "Making something keeps 1 part about 1 time in 4."; its tile
a small pale log on its side, an arrow curling back down to it
(offered too: a tied pouch; a hand on a stone). D-814 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-819 · 2026-11-11 · The menus' sounds** (the owner's picks, all
recommended, from a board of 6 taps, 4 page turns and 4 tocks; builds
D-774; answers part of Q-095) Off play, a tap, Enter or Space that
changes something on the same card ticks: Interface Sounds' tick 2, at
half a step's peak (offered too: as loud as a step; click 2 or UI
Audio's click 3; ObsydianX's cursor tone). A card opening turns a page,
RPG Audio's flip 3, and closing turns one back, its flip 2, each as
loud as a step (offered too: the same, soft; the book opening and
shutting; Interface Sounds' open and close). A tap that opens or closes
a card turns only its page, with no tick (offered too: both). A dim
pick that can't be done tocks: Impact Sounds' light wood knock, a
quarter lower, as loud as a step (offered too: bong 1; error 4;
ObsydianX's error tone). None strays in pitch. Claude's calls the owner
may change: play, setting a tile down and the title have no card, so
reaching them closes; going back to a card still open under the rest
closes, anything else opens; the tock plays on the bag's dim Make, the
Make tab's dim recipe, the garden bed's and campfire's dim first line,
a dim waystone row and a Growth upgrade with too few embers; the
"You can't carry more" lines, the dim quick slot and the HUD buttons in
play stay silent; the run ending waits for later. D-815 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-820 · 2026-11-11 · The bag's sounds** (the owner's picks, all
recommended, from a board of 4 each; builds D-774; answers part of
Q-095) An item into the bag pats: RPG Audio's cloth 1 to 4, taking
turns, a little higher or lower each time (offered too: a small leather
pouch; leather dropped; a cloth belt). A weapon from the bag into the
hand is drawn: its knife draw 3 (offered too: draws 1 to 3; a belt
buckle; a metal latch). A tile set down knocks: Impact Sounds' medium
wood knocks (offered too: heavy; a plank; a book set down). Each as
loud as a step (offered too: half). A weapon picked up only pats.
Claude's calls the owner may change: every `take` pats, a fish's catch
keeps only its splash, the stash chest's moves keep the menus' tick.
Next, Settings gets tabs: Controls (Swipe, Tap, Arrow pad, Stop
walking), Game (Seed, Mode, Lantern, Flasks), Screen (Motion, Attack
marks, Stats line) and Sound (offered too: Play · Screen · Sound; Game ·
Sound); later the Sound tab holds an overall loudness, a loudness for
each kind, and On or Off for each sound (offered too: silent in the
background). D-816 moves to `archive/DECISIONS-SURFACE.md`, word for
word.

**D-821 · 2026-11-11 · Settings in tabs** (the owner's picks, all
recommended; builds D-820) The tabs CONTROLS, GAME, SCREEN and SOUND
sit in the card's title row where SETTINGS was, as the bag's (offered
too: under the title). Settings opens on the tab last open, Controls at
first, kept as it closes until the game is closed (offered too: Controls
every time). The Tab key turns to the next tab, as on the bag and the
workbench, and a tap on one opens it (offered too: Up from the top line
onto the tabs). VERSION HISTORY stays in the bottom corner on every tab
(offered too: only on Game). On a card too narrow for one row (upright
phones), the tabs take two, 2 and 2, the lines a row lower (offered too:
3 and 1). Claude's calls the owner may change: each tab opens on its
first line; Settings' spoken words name the open tab. D-817 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-828 · 2026-11-11 · Home's sounds** (the owner's picks, all
recommended, from a board of 4, 4, 4 and 3; answers part of Q-095) An
item sold to the peddler jingles: RPG Audio's handleCoins at a quarter
loudness, in place of the tick (offered too: the short clink; the two
taking turns; a pouch, then coins). A relic set on the shelf is a book
set on wood: RPG Audio's bookPlace 1 to 3 at a quarter (offered too: a
light wooden knock; a plank; the workbench's thunk, softer). A seed
planted is two quick burrow steps, 0.13 s apart, the second softer
(offered too: a soft thud; snow pressed; a leather bag set down). Bat
Guano fed is the bag's cloth pat, muffled like the burrows' earth
(offered too: a small soft thud; a carpet step). Each plays as its
page closes, follows Finds' loudness and has its own line under Finds:
Coins, Shelf, Planting, Feeding.

**D-829 · 2026-11-11 · The elemental pack** (the owner's purchase and
picks, all recommended; for Q-095) MorphonautAudio's Elemental Forces
Sound Pack, bought by the owner on itch.io, is kept whole in
`sounds/packs/morphonaut-elemental-forces/`: 134 sounds in four folders,
`Earth`, `Fire`, `Water` and `Wind`, under the pack's own names. Its
listing says CC0, so it may sit in the public repo; its `License.txt`
says where it came from. Saved from the pack's 24-bit WAVs (113 MB) as
`.ogg`, good quality, stereo (6 MB), nothing else changed; little
silence to cut. Nothing in the game plays from it yet: the next sound
steps pick from it, for fire, oil, water, wind and falls.

**D-844 · 2026-11-12 · Sitting by a campfire** (the owner's picks, all
recommended but the effects, where all three were picked; Q-088's buff,
step 1) A burning campfire bumped says its first words and opens Sit by
the fire?, its second words under it, No picked (offered too: just
standing beside it; only when sleeping out beside it). Yes, a turn:
hearts back, blazing 2, embers 1, never above full (offered too: 1
either way; 2 either way), and stiff ends; the fire burns down a level,
blazing to embers, embers to cold ashes (offered too: once a day a fire;
both). Warmed, the lantern burning slower for a while, comes next, its
own step (offered too: all three at once; one at a time). Claude's
calls the owner may change: Yes grey with full hearts and not stiff;
"You sit by the fire and warm up."; no sound of its own yet. D-839
moves to `archive/DECISIONS-SOUNDS.md`, word for word. Its card's
heading, Yes and No superseded by D-849 (2026-11-12).

**D-845 · 2026-11-12 · Warmed** (the owner's picks, all recommended;
Q-088's buff, step 2) Sitting by a burning campfire also leaves the hero
Warmed for the fire's turns, blazing 60, embers 30 (offered too: 60
either way; 30 either way). While Warmed, a lit turn burns 6/7 of its
oil, so a full tank lasts 70 turns, not 60, as Slowburn does and added
to it and the Heart Charm (offered too: 12/13, lasting 65; 3/4, lasting
80; like Slowburn but not added to it). Yes on Sit by the fire? works
whenever it helps: hurt, stiff, or Warmed would last longer; grey only
when nothing would change (offered too: always; only hurt or stiff, as
before). Sitting again sets the longer count, never a shorter one. Its
mark is a small flame in the campfire's orange with its turns left
(offered too: a tiny campfire; Slowburn's bottle in orange). Claude's
calls the owner may change: Draught rules for the rest (the turns run
with the lantern empty, a night uses them, a fall ends it); the mark
after stiff's; "The fire's warmth fades." as it ends; a tap on the mark
says "Warmed: oil lasts longer, {n} turns left."; no sound of its own.
D-840 moves to `archive/DECISIONS-SOUNDS.md`, word for word. The turns
beside the mark superseded by D-847 (2026-11-12).

**D-847 · 2026-11-12 · The timer rim** (the owner's idea and picks, all
recommended; supersedes the turns beside D-845's, D-791's and the other
draughts' marks) A lasting effect's mark loses its number: its square's
edge, 52 dots from the top middle going round like a clock, lights in
the mark's colour for the share of time left (offered too: burning down
like a candle). Full is that effect's longest time, from the registry,
so embers' 30 turns start Warmed half lit (offered too: full at
whatever it started with). A tap on the mark still says the turns left
(offered too: nowhere). Claude's calls: any time left lights at least
one dot; poisoned's and stiff's marks keep no rim for now. That last
call superseded by D-848 (2026-11-12).

**D-848 · 2026-11-12 · Bad marks: a rim and red glass** (the owner's
idea and picks; supersedes D-847's no rim for poisoned and stiff)
Poisoned's and stiff's marks get the timer rim too, full at their
longest time, poisoned 6 turns and stiff 20, so a poison a worn find
shortens starts part lit (recommended; offered too: full at whatever it
started with). The bad marks, poisoned and stiff, sit on dark red glass
instead of the night glass; the good ones are unchanged (offered too:
a small red minus or green plus in a corner;
the bad ones first with a red line under them; no sign for now).

**D-849 · 2026-11-12 · Feeding a campfire** (the owner's picks, all
recommended; Q-088's feeding) A burning fire's card shows Sit and Add
wood (offered too: Put on the fire from the bag beside one; Add wood?
asked after sitting). Add wood takes 1 Wood and a turn and raises
embers a level, to blazing (offered too: 2 Wood a level; 1 Wood to
blazing from anything; free). Only embers take wood: blazing takes no
more and cold ashes are still lit with oil (offered too: wood lighting
ashes too; feeding blazing to bank more sits). Add wood is grey with no
Wood or on a blazing fire. Claude's calls the owner may change: the
card's heading is Campfire, over its words as before; no No, the cross
closes it; Sit picked, else Add wood; "You add wood. The fire burns
high."; no sound of its own yet. D-842 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-850 · 2026-11-12 · Building a campfire** (the owner's picks, all
recommended but where; Q-088's building) A campfire is made on the bag's
Make tab, then set down beside the hero with Set down, as the mortar and
torch are (offered too: built straight on the ground from the bag; at
the workbench). It costs 3 Stone and 2 Wood (offered too: 4 Stone, 3
Wood; 2 Stone, 2 Wood). It goes only on the surface, for now, by the
workbench's rules (offered too: below ground too, the torch's way, at
first with no limit, then once it burns to cold ashes there, gone; home
only). The owner asked what Claude truly thought of anywhere: a fire in
the dark fits the game best, but one that never burns out by itself
would make a safe base deep down, against the oil running low; the
caves may come later as their own step. Set down, it is cold ashes, lit
with one turn of oil as before (offered too: embers; blazing). The
find's name, look and words come at its step. D-843 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-851 · 2026-11-12 · The campfire in the bag** (the owner's picks, all
recommended; D-850's name, look and words) In the bag it is the
Campfire, "Makes a Campfire" on the Make tab (offered too: Fire Ring;
Firepit). Its look is the cold ashes' picture, as it is set down
(offered too: 3 stones piled on 2 logs; the ring round fresh logs).
Its words: "Stones and wood for a campfire.", "Set it down on the
surface.", "Light it with a little oil."; "You make a campfire."; set
down, "You lay the stones in a ring." (offered too: warmer words; the
mortar's way). One is carried at a time, "You already carry a
campfire." (offered too: up to 3; up to 5). The code: the campfire
holds its own recipe, `made`, so its button stays Set down (offered
too: Stone holding two recipes; a recipe-only entry). D-827 moves to
`archive/DECISIONS-AUDITS.md`, D-846 to `archive/DECISIONS-SOUNDS.md`,
word for word.

**D-853 · 2026-11-12 · Your own campfire** (the owner's picks, all
recommended; Q-088's built fire) A campfire the hero built has its own
words, found fires keeping theirs: cold ashes, "Light the fire?", "You
laid these stones."; embers, "Your fire still glows."; blazing, "Your
fire burns well." (offered too: no note at all; only the cold one
changes). It can be taken back down only when cold: its cold ashes
offer Take up the campfire?, which puts the Campfire back in the bag,
whole, as the shelf does; a burning one burns down first (offered too:
any time, put out; never). The code: three built twins of the fire's
levels in the registry, the same pictures and rules, their own words
(offered too: a mark on the tile, kept by the room). Claude's calls the
owner may change, shown at the build step: where Take up sits on the
card, and "You already carry a campfire." when one is carried. D-845
moves to `archive/DECISIONS-SURFACE.md`, word for word.
