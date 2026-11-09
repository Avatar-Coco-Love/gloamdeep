# The surface decisions (D-209 to D-218, D-733 to D-739, D-744 to D-749)

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
