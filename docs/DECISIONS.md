# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. ~~Steps of stage 0.3 are versioned 0.3.x.~~ *That part
superseded by D-237 (2026-10-22): versions stay 0.2.x.* The step list
is in `PROGRESS.md` and may change as we go.

**D-169 · 2026-10-19 · Regions are grids of rooms** (the owner's idea)
The world, surface and below, is split into regions joined to each
other. Each region is a grid of cells (a 3 × 3 marsh has 9), and not
every cell must be used. Each region has its own rule sheet for how it
generates, including promises that hold for every seed: a special room
with its own rules, a single secret entrance to it from a side that
changes with the seed, or a special item that must appear in a named
room or building. Each cave follows its own rules too. Generated once
per save, as D-019.

**D-170 · 2026-10-19 · Where the world is written down** (owner's pick)
`docs/WORLD.md` holds how the world works, under 8 KB. Each region gets
its own rule sheet in `docs/regions/`, one file per region, made when the
region is designed. Undecided details are open questions.

**D-171 · 2026-10-19 · Ways between rooms** (the owner's idea) Rooms
join by stairs up and down, by openings at their sides into the room
beside them, by water for a hero who can swim (Q-039), and by secret
entrances. Both sides of a way line up exactly, and each room is made to
fit the ways into it.

**D-172 · 2026-10-19 · Rooms of every shape and size** (the owner's idea
and pick) Rooms differ in shape and size by their kind: tunnels are
narrow, deserts are vast. A room bigger than the screen scrolls, with the
camera following the hero. The kinds and sizes are Q-038.

**D-173 · 2026-10-19 · Light comes through openings** (the owner's idea)
A doorway, cave mouth or stairs lets in the light of the place beyond.
Daylight shines in behind you by day, less in rain or snow, not at
night, following the time of day (D-025) and the weather (Q-035). An
open way into a lit room not yet found glows, so you can tell a lit
space lies ahead. Details are Q-040.

**D-174 · 2026-10-19 · Stairs must be found** (the owner's idea,
supersedes part of D-134) The stairs' glow is dimmer and shows only where
the fog of war has lifted, so stairs and doors must be found, unless
other light reveals them. Some underground places are brightly lit.
How dim is Q-041.

**D-175 · 2026-10-19 · Today's game becomes the first cave** (owner's
pick) The two crypt rooms and the generated depths below them become the
first cave under the starting region, reached from a cave entrance on
the surface. Q-043 asks whether it gets a bottom.

**D-176 · 2026-10-19 · A world map to uncover** (the owner's idea,
builds on D-021) Players uncover the map as they explore. Dev tools get
a switch that reveals the whole map, and a map mode, which may be the
same map players see. Details are Q-042.

**D-336 · 2026-10-25 · The first regular audit** (the owner's picks, all
recommended) A conversation given to tidying, with nothing visible changed:
`CLAUDE.md` loses its list of archive files, now one index in
`archive/README.md`; `PROGRESS.md`'s ticked build steps move to the
progress archive; `CHANGELOG.md` keeps its newest entries, the rest in
`archive/CHANGELOG-STAGE-0.2-1.md`; and `tests/docs.test.js` fails when a
doc passes its cap (8 KB; `DECISIONS.md` 12 KB; `PROGRESS.md` 4 KB, as before) or
the archive index misses a file. The 0.2.1 setup script line is in place.

**D-337 · 2026-10-25 · An audit every 20 versions** (the owner's picks, both
recommended) `PROGRESS.md` names the next audit's version; when it comes,
the audit is Next up. Each audit also splits one big code file into
smaller ones, nothing visible changed (order may change: `history-0.2.js`,
`screens.js`, `turn.js`, `main.js`). The next audit is at 0.2.129.
*Partly superseded by D-362 (2026-10-25): that audit came at 0.2.123, and
the next is at 0.2.143.*

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-362 · 2026-10-25 · The second audit, early, turn.js split first** (the
owner's picks, recommended; supersedes D-337's 0.2.129) The audit comes now, at 0.2.123,
seven versions early, so things can go on being added cleanly and quickly;
the next is at 0.2.143. Its split is `turn.js`, before the other big files:
into `state.js`, `endturn.js`, `creatureturn.js`, `fall.js` and
`bagturn.js`, with `turn.js` passing their rules on, so the rest of the
game imports from it as before (the playtest packer learns that form).
`history-0.2.js`, `screens.js` and `main.js` follow at later audits. The
finished decisions D-332 to D-361 (but D-336 to D-338) moved unchanged to
`archive/DECISIONS-GROWING-7.md` and `archive/DECISIONS-CREATURES.md`.

**D-363 · 2026-10-25 · A content index and an adding checklist** (the
owner's picks, both recommended) `docs/CONTENT.md` lists every creature,
find, tile, light and place with its numbers, where it turns up and its
decisions, so proposals build on what exists. `TECH.md`'s "Adding content"
lists the files each kind of content touches. A PR that adds or changes
content updates both.

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
