# Biome 1's floors and the lure wisp (D-648 to D-654)

Moved word for word from `docs/DECISIONS.md` at 0.3.113, the tenth audit
(D-660), so it stays under 12 KB: halls and large rooms, the lure wisp,
the dead-end cache, more in halls and large rooms, and the motes
following the way, all built. Still in force. D-652, more content first
(poison and a 15th kind, all built), moved here at 0.3.120 (D-668).
D-654, the centipede and poisoned (built), moved here at 0.3.121 (D-669).

---

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

**D-652 · 2026-11-07 · More content first: poison and a 15th kind**
(the owner's picks, all recommended; builds D-604, D-607, D-636, D-641,
D-643; supersedes D-643's "biome 1 ends with 14 kinds") More content
comes before the side rooms are filled further (the owner's wish).
Creatures that leave a debuff on the hero come first, then creatures
that attack from range, each with ways for the hero to defend against
it. The first debuff is poisoned, from Venom (D-636): its numbers are
set at its step, and it shows as a mark beside the boon's (D-604). It
comes with a new kind, biome 1's 15th, as D-607 allows; Claude shows 2
or 3 drafts from the list (Q-076) with mock-ups first. The defences,
each its own step: the drafted Antidote (1 Snapcap Gill, 1 herb), a
charm against poison for biome 1, and Tough on the Growth tree. Raw
things below the caves wait (the owner's pick); copper is only the
first of many tiers. D-641 moved to `archive/DECISIONS-CHECKUP.md`,
word for word.

**D-653 · 2026-11-07 · The motes follow the way** (the owner's picks,
all recommended; supersedes D-605's straight line through walls) The
motes drift along the shortest way the hero can walk to the floor's
nearest stairs down, through its openings and round its bends, never
into a wall. They all aim at the farthest tile of that way the hero
can see from where they stand, so they turn together at a bend or
junction. Found when the motes on depth 2 drifted back toward the
stairs up; about 1 seed in 4 there did that. D-642 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-654 · 2026-11-07 · The centipede and poisoned** (the owner's picks;
mock-ups: https://claude.ai/artifact/TC6h4vyTP2niDGBdLZCF6w; builds D-636,
D-652; answers part of Q-076) Biome 1's 15th kind is the centipede, look
A: side on and facing right, rust red with pale legs and green fangs. It
chases; 2 hearts, bite 1, and its bite leaves the hero poisoned; in the
pool from depth 3. Poisoned lasts 6 turns, 1 hurt every 3 turns, 2 in
all; a new bite starts the count again and never stacks. It stops at 1
heart, never taking the last, until the Antidote is in (the owner's
words). It shows as a green drop mark beside the boon's, a line as it
starts and as it wears off, and each heart it takes flashes green.
Drafts the owner may change: a Centipede Leg, about 1 in 2, sold for 1,
and a rare Venom Sac, about 1 in 10; the lines; venom's pale green.
Built next, in one step with a playtest. D-643 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.
