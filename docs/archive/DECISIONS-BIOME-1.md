# Biome 1's floors and the lure wisp (D-648 to D-656)

Moved word for word from `docs/DECISIONS.md` at 0.3.113, the tenth audit
(D-660), so it stays under 12 KB: halls and large rooms, the lure wisp,
the dead-end cache, more in halls and large rooms, and the motes
following the way, all built. Still in force. D-652, more content first
(poison and a 15th kind, all built), moved here at 0.3.120 (D-668).
D-654, the centipede and poisoned (built), moved here at 0.3.121 (D-669).
D-655, the Antidote (built), moved here at 0.3.122 (D-670).
D-656, the Centipede Charm (built), moved here at 0.3.123 (D-671).
D-658, ideas from the review (kept in `RESEARCH-2.md`), moved here at
0.3.125 (D-673).
D-659, the Spit grub (built, D-688), moved here at 0.3.150 (D-697).

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

**D-655 · 2026-11-07 · The Antidote** (the owner's picks, all
recommended; mock-ups: https://claude.ai/artifact/L562fL7GhmfZZWUXS9UwBM;
builds D-652, D-654) The Antidote is made in the bag: Make on a Snapcap
Gill takes 1 gill and 1 herb, a turn passing. Drink ends poisoned and
heals nothing; not poisoned, it stays, with a line, and no turn passes.
Its look is B, a tall thin green vial under a cork. With it in, poison
can take the last heart, and the hero falls. Drafts the owner may change:
5 a stack, never sold, its lines. D-644 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-656 · 2026-11-07 · The Centipede Charm** (the owner's picks, all
recommended; mock-ups: https://claude.ai/artifact/T4UJp8WKEEDY141YhkSscq;
builds D-458, D-652, D-654) The charm against poison is the Centipede
Charm, made at the workbench, its slot after the rod, from 3 Centipede
Leg and 1 Copper Ore (the leg's first use); one is carried or worn, and
Wear puts it on, free. Worn, poisoned lasts 3 turns, not 6, so it takes
1 heart, not 2; every bite still poisons, so the Antidote still matters.
Its look is A, a drop of venom's pale green in the other charms' copper
setting. Drafts the owner may change: its lines. D-645 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-657 · 2026-11-07 · Tough** (the owner's picks, all recommended;
mock-ups: https://claude.ai/artifact/2rj6CKmu1PHoRfd8cMrgsv; builds D-462,
D-639, D-652, D-654) Tough is Body's second upgrade, 1 ember, bought once.
With it, a bite that hurts poisons the hero only about 1 time in 2, by
the seeded dice; when it does, poison runs as before. So each defence
has its own job: Tough stops some poison, the Centipede Charm shortens
it, the Antidote ends it. It sits in Body's first row, above Heart: the
row now holds two places stacked, the first of D-639's 4 or 5 a branch,
and Body's locked row moves up one. Drafts the owner may change: its
words, its drawing. Built next, in one step with a playtest. D-646 moved
to `archive/DECISIONS-CHECKUP.md`, word for word.

**D-658 · 2026-11-07 · Ideas from the review** (the owner's pick,
recommended) The ideas from the project review are kept in
`RESEARCH-2.md`, "From the project review"; none is decided. Next comes
Next up: the ranged creature's drafts (D-652), using its ideas there.

**D-659 · 2026-11-07 · The Spit grub** (the owner's picks, all
recommended but its name; mock-ups:
https://claude.ai/artifact/1npk26Bc9jNc4G2gNYixB9; builds D-349, D-652,
D-658; answers part of Q-076) The first creature that attacks from range
is the Spit grub, draft A, biome 1's 16th kind, in the pool from depth
4. It never moves. When it sees the hero's lit lantern along a clear
row or column, up to 5 tiles away, it spits a glowing glob that moves
1 tile a turn down that line, so the hero can step out of the way; it
then rests 2 turns. Only the lit lantern: with it off the grub can't
see the hero, and the hero sees only the grub's and the glob's glows.
Walls and rubble, whatever blocks light, stop the glob. Its next move
shows as the others' do. Drafts the owner may change: 1 heart, spit 1,
the 5 tiles and 2 turns. Its look, drop and lines are shown with
mock-ups at its build step. D-647 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-688 · 2026-11-08 · The Spit grub built** (the owner's picks, all
recommended; mock-ups: https://claude.ai/artifact/2VP35g4oZNwBYigfmoys1L;
builds D-659) Look A, a glowworm side on, a plump grub of bone-white
rings, its tail glowing venom green; it `glows` with a green halo. A
Grub Skin, about 1 in 2, sold for 1; a rare Glow Gland, sold for 5 as
every rare one is. Its new way `spits` (`spit.js`): the glob starts on
the tile beside it, so beside the hero with the lantern lit it hits at
once; a glob hurts a creature in its path as a blow does. Built in one
step, not two (changed in the open PR at the owner's word: the grub
should play as designed from its first version). Claude's drafts the
owner may change: a creature a glob beats leaves no drop and no
experience; armour never turns a glob aside; a glob breaks on a person
unharmed and flies over water; the grub turns to face where it spits; a
tap-walk stops at a spit; the names and lines. D-675 moved to
`archive/DECISIONS-AUDITS.md`, word for word.
