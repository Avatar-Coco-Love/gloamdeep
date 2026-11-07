# Floors and the peddler's spot (D-580, D-584 to D-586)

Moved unchanged from `docs/DECISIONS.md` at 0.3.47 (D-589), when it
neared 12 KB: floors that grow with depth, built; no more stand-in
rooms; the peddler's looser spot. These are still in force unless marked
superseded. Grep for an ID or topic; never read this whole.

**D-580 · 2026-11-02 · Floors grow with depth** (the owner's pick,
recommended; answers the sizes part of Q-038) The owner found the
floors too big for the oil carried (a full lantern lasts 60 turns) and
the stairs hard to find. Rooms are 13 × 15 tiles at depths 2 to 4 (the
caves), 15 × 17 at depths 5 to 7 (the warrens) and 17 × 20, today's
size, from depth 8 (the dungeon). Room counts stay 3, 5 and 6.
*Partly superseded by D-645 (2026-11-07): rooms made of 11 × 13 cells (13 × 15 at depth 8), and more of them.*

**D-584 · 2026-11-02 · Smaller floors, built** (the owner's picks,
recommended; builds on D-580) Both shallow bands shrink in one step.
Inside, the counts shrink with the room's area, as in D-195: 3 to 6
chambers and at least 61 open tiles in a 13 × 15 cave, 89 to 104 tiles
dug in a 15 × 17 warren; creatures and finds stay as they are, and pools
fit less often (about 1 cave room in 3, not 4 in 9). The peddler's room
is made again until his ring of rubble fits, so every journey has him
(the owner's idea). A save from before is brought up to date once: every
generated room is made again from the same seed at its new size, the
dungeon's too, since its stairs hang from the floor above; a hero down
there stands on that floor's stairs up, a bag left there lies on them,
and a peddler already freed stays freed.

**D-585 · 2026-11-02 · No more stand-in rooms** (the owner's picks,
recommended; answers Q-078) A dungeon room fell back to the crypt's
second room when a doorway lay diagonally above its stairs up, beside
the wall above them, mostly in a corner: 62 rooms in seeds 1 to 2000 at
depths 8 to 20. When all of a room's 200 tries (600 for the peddler's)
fail, a second round of up to 400 more runs, in which the corridors keep
clear of the stairs up and that wall, and such a doorway first steps one
tile away from them. Only rooms that fell back reach it, so every other
room stays exactly as it was; no room falls back in seeds 1 to 6000 at
depths 8 to 20. A save holding a stand-in has just those rooms made
again, once, from their seeds; a hero in one goes to that floor's
stairs up.

**D-586 · 2026-11-02 · The peddler's spot, looser** (the owner's picks,
recommended; raised and answered as Q-079, before the waystones; changes
the spot rule of D-490 and D-580) Measured over 6000 depth-3 rooms,
seeds 1 to 2000: his spot fitted 84% of rooms on the first try, and what
ruled spots out was mostly a creature, find or the way in on or beside
the ring, not the walls. Now at least 4 of the 8 tiles around him are
open, each turned to rubble, and a wall stands on one straight side at
most (no more nooks); corners may be wall. A creature or find on or
around his ring moves to the nearest free floor; the way in, stairs,
openings, deposits and veins still keep him away. His spot fits 95% of
rooms on the first try, with 4 to 8 heaps to dig. A room already made in
a save stays as it was.
