# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`PR-CHECKLIST.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. ~~Steps of stage 0.3 are versioned 0.3.x.~~ *That part
superseded by D-237 (2026-10-22): versions stay 0.2.x; 0.3.x from
0.3.0 by D-528 (2026-10-31).* The step list
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

**D-337 · 2026-10-25 · An audit every 20 versions** (the owner's picks, both
recommended) `PROGRESS.md` names the next audit's version; when it comes,
the audit is Next up. Each audit also splits one big code file into
smaller ones, nothing visible changed (order may change: `history-0.2.js`,
`screens.js`, `turn.js`, `main.js`). The next audit is at 0.2.129.
*Partly superseded by D-362 (2026-10-25): that audit came at 0.2.123, and
the next is at 0.2.143; and by D-518 (2026-10-31): every 40 versions.*

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-363 · 2026-10-25 · A content index and an adding checklist** (the
owner's picks, both recommended) `docs/CONTENT.md` lists every creature,
find, tile, light and place with its numbers, where it turns up and its
decisions, so proposals build on what exists. `TECH.md`'s "Adding content"
lists the files each kind of content touches. A PR that adds or changes
content updates both.

**D-431 · 2026-10-29 · How we work: one step a conversation** (the owner's
pick, recommended) The owner keeps choosing every question. Each
conversation does one step, ends with its handoff, and the next step
starts in a fresh conversation, so less is read again each time.

**D-482 · 2026-10-30 · The rest of the build order** (the owner's picks,
all recommended; answers the Next up of 0.2.196) Lantern parts come
next: Copper Ore, mined since step 7, gets its first use, and the
lantern is the heart of the game. Claude proposes the rest of the
order and the owner approves it by merging: lantern parts, armour and
charms, home pieces and rest, the first rescue, vendor and coins,
garden, fishing, lore, relics, feats. The rescue comes before the
vendor, who is a rescued person (D-471); collectables come last, as
they reward everything before them. Each may take more than one small
step, with its names and numbers asked at its own step. The first
Light and Hands upgrades may join any of them. Half and Automatic
(Q-069) keep waiting. Also moved D-479 and D-480 to the archive, word
for word, as this file neared 12 KB.

**D-518 · 2026-10-31 · An audit every 40 versions** (the owner's pick,
recommended; supersedes D-337's 20) The owner asked if audits help. The
start-of-conversation read stays near 11.5 KB (17 KB before the first),
but the size test already makes normal steps trim, and code splits are
outgrown in an audit or two, while 20 versions is about a day. So an
audit comes every 40 versions; the size test still guards in between.

**D-528 · 2026-10-31 · Version 0.3.0** (the owner's pick, recommended;
supersedes the version part of D-237) Stage 0.2's last steps are done,
so versions move to 0.3.x from 0.3.0, this version, for stage 0.3, the
world (D-168). New history goes in `history-0.3.js`. The next audit,
0.2.268 (D-518, D-519), keeps its distance: 0.3.32.

**D-570 · 2026-11-02 · The eighth audit, part 1** (the owner's picks,
all recommended) The audit at 0.3.32 spans several PRs, one a
conversation, nothing visible changed in any (D-571 has the rest). Here:
the bag, Drop, setting down, and the bench, chest, bed and trade cards
move word for word from `screens.js` into `cardscreens.js`; the cave test
makes its 2000 rooms once, not three times (that file 20 s to 7 s, the
whole run 22 s to 16 s); the unused map icon and `NAME_COLS` go;
`CLAUDE.md`'s "Keeping track" and "Git and PRs" move word for word to
`docs/PR-CHECKLIST.md` (8.0 KB to 5.9 KB); the outside-places questions
move to `OPEN-QUESTIONS-2.md`. A bug found is fixed with a test: since
0.2.219 the peddler's Sell side read every slot "Empty" to a screen
reader; it says the slot's name, count and price again. D-473, D-519
and the garden (D-562, D-566 to D-569) move to the archive word for word;
`CHANGELOG.md` keeps its newest 3; ticked steps 13b and 14 are archived.
The next audit is at 0.3.72.

**D-571 · 2026-11-02 · The eighth audit's next parts** (the owner's
picks, recommended; the last two left to Claude's judgment) Part 2,
`node tools/release.js`: one command sets `VERSION`, copies the top
changelog entry into the in-game history, moves what passes a cap to
the archive word for word, and keeps `PROGRESS.md`'s log at 3; `tools/`
is then for playtests and record-keeping. Part 3 on, a table of screens:
each card in its own small file, saying its own keys, taps and picks,
`screens.js` looking them up, a few cards a PR, so a new card touches one
file, not three. No decisions finder: one grep (`grep -rn "D-412 ·"
docs`) already finds any decision, and an index is one more file to keep.
Q-076 waits until they are done.

**D-573 · 2026-11-02 · The table of screens** (the owner's picks, all
recommended; part 3 of D-571) Each card's file in `src/input/cards/`
returns `{ pick, dir, tap, close }`: Enter or a picked slot, an arrow or
swipe, a tap, and Esc or P. `cards/table.js` lists them by screen name,
and `screens.js` asks it first in `choose`, `onDir`, `onPoint` and
`pause`; spoken words and drawing stay where they are for now. First the
workbench, chest and peddler cards, moved word for word. A test checks
every card in the table has all four and that a tap outside or Esc
closes it.

**D-572 · 2026-11-02 · The record-keeping tool** (the owner's picks, all
recommended; part 2 of D-571) The new top entries of `CHANGELOG.md` and
`PROGRESS.md`'s log are written by hand; `node tools/release.js` then sets
`VERSION` from the changelog heading, copies its lines into the in-game
history with the log entry's title (run again, it replaces them), keeps
the newest 3 changelog entries and log entries, moving older ones word
for word to the top of their archive files and updating the archive
index. Decisions it only suggests: past 11 KB it names the superseded
and oldest ones, and Claude proposes the move. `npm test` runs
`node tools/release.js --check`, which changes nothing and fails if
anything is out of step. `tools/` is for playtests and record-keeping.

**D-574 · 2026-11-02 · The table of screens, part 4** (the owner's picks,
all recommended; part 4 of D-571, as D-573) The bag's card and setting
down move word for word into `cards/bag.js` and `cards/place.js`; the
bag's C and X stay in `onType`, and spoken words stay in `show()` for
now. The test checks setting down by itself: Enter does nothing, an
arrow sets it, a tap goes to `tapSide`, Esc goes back to play. Next, the
bed, then the menus.

**D-575 · 2026-11-02 · The table of screens, part 5** (the owner's picks,
all recommended; part 5 of D-571, as D-573) All four asks move together:
the bed's, Start over?, Delete …? and Play …? each get a file in
`src/input/cards/` with its pick and close, sharing `cards/ask.js`, which
holds `ASKS`, the YES and NO arrows and the ask card's tap, moved word
for word; `askOf` and `menuOf` stay in `screens.js` (drawing and spoken
words use them) and reach the cards through `c`. The test learns each
card's way back (play; the title for Start over?; `closeDrop`,
`closeEasier`) and checks an ask's arrows and a tap on YES or NO. The
rest of the audit takes 3 parts: 6 the menus (title, pause, settings,
ways to play, mode, journey ends); 7 the pages (how to play, version
history, journal); 8 the profile and map screens (profiles, name, look,
seed pad, Explorer, map). Then Q-076.
