# The corner HUD's steps (D-381 to D-384)

Moved unchanged from `docs/DECISIONS.md` at 0.2.139 (D-388), when it
passed 12 KB: the room filling the screen, the stats line as a switch, the
round map and the round lantern with its arc, steps 2 to 4 of D-380. These
are still in force unless marked superseded. Grep for an ID or topic;
never read this whole.

---

**D-381 · 2026-10-27 · The room fills the screen** (the owner's picks,
recommended; step 2 of D-380) The room fills the whole screen, zoomed so
about 11 tiles show from top to bottom; the width follows the screen. A
room narrower or shorter than the screen sits in the middle, the deepest
dark around it, and the camera follows the hero only along a side where
the room is bigger (D-195). The text line sits on the same glass, along
the bottom of the room. Until the round map and lantern come, pause, the
map and the bag stand in the top right corner, the wrench left of pause,
and the lantern in the bottom right. Built in 0.2.132. *"Sits in the
middle" changed by D-441 (2026-10-29) for a room narrower than the
screen: it zooms in to fill the width, with a margin of 1½ tiles.*

**D-382 · 2026-10-27 · The stats line is a switch** (the owner's idea and
picks, recommended; supersedes part of D-088) The dev stats line shows only
with a new Stats switch in View, off at first and remembered, with no key
(S walks). When on, it is half size, bottom left, just above the text
line. Built in 0.2.132.

**D-383 · 2026-10-27 · The round map** (the owner's picks, recommended,
[mock-up](https://claude.ai/artifact/4i4721ijRn29hbHL6EJgYC); step 3 of
D-380) A round map, 104 px across, stands in the room's top right corner
on the panel's glass. It shows the floor around the hero as the full map
draws it, about 17 tiles across, the hero in the middle. A tap opens the
full map (M still does); while it is open a small round cross there
closes it, and the square map button is gone. Pause stands left of it,
the wrench left of pause, the bag under pause until the lantern's arc;
all three are round on the glass. It fades like the panel (D-380).
Built in 0.2.133.

**D-384 · 2026-10-27 · The round lantern and its arc** (the owner's picks,
recommended; step 4 of D-380) The lantern is a round button 64 px across
in the room's bottom right corner, on the glass, its rim gold while lit.
Two round 44 px buttons sit on an arc around it: the quick slot to its
left and the bag up and left. The map stays only top right (D-383). The
quick slot always holds the flask: a tap pours the first flask in the
bag, one turn, like the bag's Pour; it shows how many are carried, dim
with none. Built in 0.2.134.
