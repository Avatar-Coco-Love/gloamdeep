# The corner HUD and the menu cards (D-378 to D-380, D-385 to D-391)

Moved unchanged from `docs/DECISIONS.md` at 0.2.143, the third audit
(D-392), when it neared 12 KB: the Genshin feel, the Brogue talk's ideas
kept, the corner HUD's steps and the glass panel, and the bag, workbench,
stash chest, pause menu, Settings, How to play and Journal as cards. Steps
2 to 4 of D-380 are in `DECISIONS-CORNER-HUD.md`. These are still in force
unless marked superseded. Grep for an ID or topic; never read this whole.

---

**D-378 · 2026-10-27 · A Genshin feel: corner HUD, glass, cards** (the
owner's picks, recommended,
[mock-up](https://claude.ai/artifact/R76iHAXcaVistZemiEe8XA)) Layout A:
the room fills the screen; hearts, oil, depth and level on a glass panel
top left; a round map top right with pause and the wrench; the lantern a
big round button bottom right, with bag, map and one quick slot in an arc.
Moving stays tapping and swiping. Soft see-through panels, round buttons.
Menus become full-screen cards, the bag first. Built after D-377, in
small steps.

**D-379 · 2026-10-27 · Ideas from the Brogue talk, kept** (the owner's
answers) Kept in `RESEARCH.md`, each its own decision when built: an
edge-case runner, the world's floors lining up, a dimension rift with its
bizarre creatures, generated beginnings, and a much bigger world, the
surface first. D-364 to D-374 moved unchanged to
`archive/DECISIONS-CREATURES-2.md`.

**D-380 · 2026-10-27 · The corner HUD's steps, and the glass panel** (the
owner's picks, recommended) D-378 is built in this order: the glass panel
top left, the room filling the screen, the round map top right with pause
and the wrench, the big round lantern with its arc, then menus as cards.
The panel is drawn in game pixels: a see-through night fill, a soft light
edge and round corners. The creature list stands under it, down the room's
left. Both fade almost away while the hero, or a creature beside them, is
under them. Built in 0.2.131.

**D-385 · 2026-10-27 · The bag as a card** (the owner's picks,
[mock-up](https://claude.ai/artifact/84qChoSf6ZKkuMpdRDUXjQ); step 5 of
D-380) The bag opens as a glass card filling the screen but for a thin
edge, the room nearly dark (changed after building: middle card → full
screen, so the buttons sit near the thumbs). Six bigger slots in a 3 × 2
grid on the left, the held slot above; on the right the chosen item's
name, how many are carried and its Look line (D-297), its buttons in the
bottom right corner. The arrows move in the grid. A small round cross top
right closes it, as I, Esc and a tap outside still do; the corner buttons
hide while it is open. Built in 0.2.135.

**D-386 · 2026-10-27 · The title fills the screen; lines over the bag**
(the owner's picks, recommended) On the title and its pages the crypt
floor, the hero and the lantern's light fill the whole screen behind the
name and the lines, at the picture's own zoom, so no box shows around
them; a veiled page (the seed pad, How to play, the explorer's map) dims
it all alike. Pages with a dark page of their own stay as they are. The
text line is drawn over the bag's card (D-385), so a line said with the
bag open ("Only on the surface.", "There is no room there.") shows and
the bag stays open. D-375 to D-377 moved unchanged to
`archive/DECISIONS-SCREEN.md`. Built in 0.2.136.

**D-387 · 2026-10-27 · The workbench and stash chest as cards** (the
owner's picks, recommended,
[mock-up](https://claude.ai/artifact/NwENpGb5VXDLmd78DZMa3p); step 6 of
D-380) Both panels open as glass cards like the bag's (D-385), the round
cross closing them, Close gone. The workbench: the things made at it in
the bag's 3 × 2 slots on the left; on the right the chosen one's name,
each cost with how many are carried (3 / 5 Wood), its Look line and Make
bottom right, dim with too few. The chest: its 12 slots in a 4 × 3 grid
on the left, the bag's 6 in a 3 × 2 grid on the right, the chosen stack's
name and count under them; a tap moves it, as now. On both, Deconstruct
is a button bottom left. Two steps: the workbench built in 0.2.137, the
chest in 0.2.138.

**D-388 · 2026-10-27 · The pause menu as a card** (the owner's picks, both
recommended, [mock-up](https://claude.ai/artifact/Kmghde4csUSwoN5vZiJtMj);
step 7 of D-380) The pause menu opens as a glass card like the bag's
(D-385), PAUSED in ember top left, the round cross resuming as Esc, P and
a tap outside do. Its lines run down the left, the chosen one gold with the
flame; a tap level with a line picks it. On the right, THIS JOURNEY: its
seed, way to play, depth (Surface, else its number) and level, since the
panel is under the card. The pages it opens stay as they are. D-381 to
D-384 moved unchanged to `archive/DECISIONS-CORNER-HUD.md`. Built in 0.2.139.

**D-389 · 2026-10-27 · Settings as a card** (the owner's picks, all
recommended, [mock-up](https://claude.ai/artifact/EJLMun2QMa8nE7kSqhGjen))
Settings opens as a glass card like the pause card's (D-388), SETTINGS in
ember top left, from the pause card and from the title alike, on the
title's scene there. Each switch is a row, its name grey on the left and
its value in a column on the right, the chosen row gold with the flame; a
tap level with a row picks it. The round cross goes back, as Esc and a tap
outside do, so the Back line is gone; Version history is a button bottom
left, as Deconstruct is. The pages it opens stay as they are. Built in
0.2.140.

**D-390 · 2026-10-28 · How to play as a card** (the owner's picks, both
recommended, [mock-up](https://claude.ai/artifact/7iyPwFpKrFw8qKH6mkdVhP))
How to play opens as a glass card like the settings card (D-389), HOW TO
PLAY in ember top left, from the pause card and from the title alike, on
the title's scene there. Its pages are tabs under the heading, Touch,
Mouse, Keyboard and Crafting, the open one gold with the flame and
underlined; a tap on a tab opens it, and Left and Right still turn them.
The rows sit under the tabs as before. The round cross goes back, as Esc
and a tap outside do, so the Back line is gone. Built in 0.2.141.

**D-391 · 2026-10-28 · The Journal as a card** (the owner's picks, both
recommended, [mock-up](https://claude.ai/artifact/UB6fUbcFBoXu1wYh7iYakK))
The Journal opens as a glass card like the how to play card (D-390),
JOURNAL in ember top left, from the pause card and the title alike. Its
tabs, Records and Growth, sit under the heading the same way; each row's
name is grey on the left, its value in a column on the right. On Growth,
ADD A HEART is a button bottom right, "1 ember each" grey beside it, dim
while no ember can buy one. The round cross goes back. Built in 0.2.142.
