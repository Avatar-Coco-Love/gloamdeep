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

**D-392 · 2026-10-28 · The third audit: history-0.2.js split** (the
owner's picks, all recommended) The audit at 0.2.143 splits
`history-0.2.js` by version: new versions stay at its top, 0.2.60 to
0.2.119 move to `history-0.2-2.js` and 0.2.0 to 0.2.59 to
`history-0.2-1.js`, word for word, the Version history unchanged.
D-378 to D-380 and D-385 to D-391, the corner HUD and the menu cards, all
built, moved unchanged to `archive/DECISIONS-CARDS.md`. `CHANGELOG.md`
keeps its newest 3 entries. `CLAUDE.md`'s pointers are tidied, its rules
word for word. `screens.js` and `main.js` follow at later audits; the next
is at 0.2.163.

**D-404 · 2026-10-28 · Easier steering** (the owner's picks) Taps step
the wrong way too often; swipes are accurate and stay. An on-screen arrow
pad and "tap a tile, walk there" are both wanted, each one a player can
turn on or off, working side by side. Mock-ups come first (Q-067).

**D-406 · 2026-10-28 · The arrow pad and tap to walk** (the owner's picks,
from pressable [mock-ups](https://claude.ai/artifact/29z7Ued7aTpeNtKaE7yhg1); builds D-404, answers part of Q-067)
The arrow pad (A) is one round glass disc 128 px across in the room's
bottom left corner, the twin of the round map: each quarter is one arrow,
a 9 × 9 pixel icon in the stone grey, gold while pressed. A press steps
once; held, it keeps walking at the held pace (D-044). Tap a tile and the
hero walks there at once (F), gold dots on each tile of the way and
corner marks on the tile (D). A tap while walking stops the hero, and
stopping costs no turn (the owner's addition). At first tap to walk is
on and the pad off; today's one-step tap goes.

**D-407 · 2026-10-28 · Steering's details** (the owner's picks,
recommended; answers part of Q-067) The walk to a tapped tile stops by
itself when a creature comes into view; the owner's idea: a Settings
choice to stop instead when a creature notices the hero. The switches are
named Arrow pad and Tap to walk. The version number shows only on the
title and the pause menu, not in play. Tap to walk is built first, then
the pad.

**D-408 · 2026-10-28 · How tap to walk fits** (the owner's picks, all
recommended but the third; builds D-406, D-407, answers part of Q-067)
A held finger on a tile does the same as a tap to walk, so there is one
way of walking (replaces D-219's held walk). Settings' Controls line
becomes three switches: Swipe, Tap to walk, Arrow pad. The walk stops
by itself when a creature or a find comes into view. A tap on unknown
dark walks as far as remembered ground goes, then stops. Built with tap
to walk: a Settings choice to stop when a creature notices the hero
instead of on sight, on sight at first. How to play gets a line saying
the arrow pad can be turned on in Settings.

**D-409 · 2026-10-28 · Tap to walk's words and pace** (the owner's picks,
both recommended; answers Q-067) The stop choice in Settings reads "Stop
walking", On sight at first or When noticed. A walk goes at the held pace,
4 steps a second, to be tried in the playtest. Built in 0.2.157, with the
build's own choices (not asked; the owner may change them): a tap on a
tile beside the hero steps there once, so it still bites, mines or opens;
a tap far off on a wall or creature walks to the nearest tile it can
reach; a key, a swipe or Space ends a walk and acts; a held finger while
walking walks anew; a card or menu ends a walk; the Arrow pad switch
comes with the pad.

**D-410 · 2026-10-28 · A bite stops the walk** (the owner's pick) A walk
to a tapped tile stops, with the "!", when a creature bites the hero,
whichever Stop walking choice is set. Built in 0.2.158.

**D-411 · 2026-10-28 · The arrow pad's details** (the owner's picks, all
recommended; builds D-406 to D-408) A held quarter steps at once, then 4
steps a second. How to play's Walk line ends "Arrow pad in Settings", or
"or the arrow pad" once it is on. The pad fades like the round map while
the hero or a creature is under it. Built in 0.2.159, with the build's own
choices (not asked; the owner may change them): a thumb slid onto another
quarter turns that way at once; the pad's middle presses nothing; a press
ends a walk to a tapped tile; Arrow pad sits under Tap to walk in
Settings; the version number shows on every title screen.
