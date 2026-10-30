# The room's edge and the camera (D-441 to D-448)

Moved unchanged from `docs/DECISIONS.md` at 0.2.180 (D-450), when it
neared 12 KB: the camera's margin and zoom, the corner fade, plain dark
past the edge, the first step in a room, the gliding zoom. These are
still in force unless marked superseded. Grep for an ID or topic; never
read this whole.

---

**D-441 · 2026-10-29 · The camera stays in the room, with a margin** (the
owner's idea, pick C, recommended, from
[pictures](https://claude.ai/artifact/UpDgkoK7nFTA9MrA5wHdzD); changes part
of D-381) A room narrower than the screen no longer sits in the middle
with the outside around it: the view zooms in until the room's width, and
a margin of 1½ tiles each side, fills the screen. It never shows more than
today's view, about 11 tiles top to bottom (D-381). The camera follows the
hero (D-195) and stops at most 1½ tiles past any edge, so the hero at a
wall keeps a little room from the screen's edge. The controls keep their
size. The margin may change at the playtest. Built in 0.2.175.

**D-442 · 2026-10-29 · Every corner piece fades** (the owner's pick,
recommended; extends D-380) Like the glass panel, every piece in the
screen's corners (the round map with pause and the wrench, the round
lantern and its arc, the arrow pad) fades almost away while the hero, or
a creature beside them, is under it. Its own step, after D-441. Built in 0.2.177.

**D-443 · 2026-10-29 · The outside stays where it shows** (the owner's
pick, recommended) The rock going on past a room's edge (D-403) and the
real woods past the doorway out (D-438 to D-440) stay, and show inside
D-441's margin. Rooms seen through the wall (Q-066) stay open. Built in
0.2.175.
*"And the real woods past the doorway out" superseded by D-445
(2026-10-29): past every edge, the room's own rock or trees.*

**D-444 · 2026-10-29 · The zoom's limit and the screen layer** (the
owner's picks, all recommended; builds D-441, found before merging) A
narrow room zooms in no further than 9 tiles tall, so what comes from
above and below still shows. The glass panel, plaques, text line and
cards sit on their own layer at the old zoom, so they keep their size and
fit. Easing the zoom between rooms is its own later step. Built in
0.2.175.

**D-445 · 2026-10-29 · Plain dark past the edge** (the owner's pick,
recommended, from pictures; answers Q-070, supersedes D-438 to D-440 and
part of D-443) Showing the woods past the crypt's doorway out looked
pasted on: a bright strip of trees beside black rock, and the woods
showed nothing back past the cave mouth, so a rat waiting by the door
stayed hidden. Past every edge the room's own rock or trees go on, as
before 0.2.173 (D-403), and the doorway out is a dark way on. The margin
(D-441) stays. Rooms seen through the wall (Q-066) stay open. Built in
0.2.176.

**D-446 · 2026-10-29 · The first step is yours** (the owner's pick,
recommended; a bug the owner found; supersedes part of D-132) Coming
into a room by a doorway, stairs or the cave mouth, the creatures there
skip that one turn, so the hero sees what waits before it can bite. The
next turn they act as before. Built in 0.2.176.

**D-447 · 2026-10-29 · Each corner fades as one piece** (the owner's pick,
recommended; builds D-442) The top right corner (the round map, pause and
the wrench) and the bottom right (the lantern, the bag and the quick slot)
each fade as a whole when the hero, or a creature beside it, is under any
button in it, so a corner never looks half faded. The arrow pad fades on
its own. Built in 0.2.177.

**D-448 · 2026-10-30 · The zoom glides between rooms** (the owner's
picks, all recommended; builds D-444) Into a room of another width, the
zoom glides from the old room's to the new one's while the new room fades
in (D-135), over 0.4 seconds, starting and landing gently. For that
moment the pixels may be a hair uneven, then crisp again. With reduced
motion it jumps in the dark as before. Built in 0.2.178.

