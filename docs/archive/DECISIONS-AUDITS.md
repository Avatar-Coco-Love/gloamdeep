# The audits (D-336, D-362, D-392, D-421, D-468, D-493, D-519, D-570 to D-578)

Moved unchanged from `docs/DECISIONS.md` at 0.2.228, the seventh audit
(D-519), as it neared 12 KB: the second to sixth audits, each done.
D-336, the first audit, followed at 0.2.233 (D-524), and D-519, the
seventh, at 0.3.32, the eighth (D-570). D-570 to D-578, the eighth
audit's parts, followed at 0.3.39, the audit done (D-578). D-661, the
tenth audit's first fixes (all built), followed at 0.3.127 (D-675).
These are still in force unless marked superseded. Grep for an ID or
topic; never read this whole.

---

**D-336 · 2026-10-25 · The first regular audit** (the owner's picks, all
recommended) A conversation given to tidying, with nothing visible changed:
`CLAUDE.md` loses its list of archive files, now one index in
`archive/README.md`; `PROGRESS.md`'s ticked build steps move to the
progress archive; `CHANGELOG.md` keeps its newest entries, the rest in
`archive/CHANGELOG-STAGE-0.2-1.md`; and `tests/docs.test.js` fails when a
doc passes its cap (8 KB; `DECISIONS.md` 12 KB; `PROGRESS.md` 4 KB, as before) or
the archive index misses a file. The 0.2.1 setup script line is in place.

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

**D-421 · 2026-10-28 · The fourth audit, tiny** (the owner's picks, both
recommended) The audit at 0.2.164 is kept small: the profile screens
(name pad, cloak, eyes, trim, clothes, Rename and Look) move word for word
from `screens.js` into `profilescreens.js`, nothing visible changed;
`CHANGELOG.md` keeps its newest 3 entries; `CLAUDE.md`'s file table is
tidied, its rules word for word. The rest of `screens.js` and `main.js`
follow at later audits; the next is at 0.2.184.

**D-468 · 2026-10-30 · The fifth audit: the world screens** (the
owner's picks, all recommended but the glossary split) The audit
at 0.2.186 moves the Seed Explorer, Settings' ways to play and the seed
pad word for word from `screens.js` into `explorerscreens.js`, nothing
visible changed. D-449 moves unchanged to `archive/DECISIONS-STEERING.md`
and D-461 to D-467 to `archive/DECISIONS-SCOPE-2.md`; `CHANGELOG.md`
keeps its newest 3 entries; `CLAUDE.md`'s pointers are tidied, its rules
word for word; `GLOSSARY.md`'s "In the code" moves word for word to
`GLOSSARY-CODE.md`. The rest of `screens.js` and `main.js` follow at
later audits; the next is at 0.2.206.

**D-493 · 2026-10-30 · The sixth audit: the newer Version history**
(the owner's picks, all recommended but CLAUDE.md's tidy) The audit at
0.2.207 moves the Version history's 0.2.121 to 0.2.186 word for word
from `history-0.2.js` into `history-0.2-3.js`, nothing visible
changed. D-491 and D-492 move unchanged to `archive/DECISIONS-DROPS.md`;
`CHANGELOG.md` keeps its newest 3 entries; the build plan's ticked steps
9 to 12 move to `archive/PROGRESS-LOG.md`. `CLAUDE.md` is left as it
is. `screens.js` and `main.js` follow at later audits; the next is at
0.2.227.

**D-519 · 2026-10-31 · The seventh audit: the hero slots** (the owner's
picks, all recommended) The audit at 0.2.228 moves `main.js`'s slots
(using, renaming, a new look and deleting a profile) into `slots.js`,
nothing visible changed; the hero creator (D-517) is built there next.
D-362, D-392, D-421, D-468 and D-493 move unchanged to
`archive/DECISIONS-AUDITS.md`; `CHANGELOG.md` keeps its newest 3
entries; the build plan's ticked steps 13 and Water move to
`archive/PROGRESS-LOG.md`. `screens.js` and the rest of `main.js`
follow at later audits; the next is at 0.2.268.

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

**D-576 · 2026-11-02 · The table of screens, part 6** (the owner's picks,
all recommended; part 6 of D-571, as D-573) All six menus move together:
the title, pause, Settings, the ways to play, the way to play asked first
and the journey's end each get a file in `src/input/cards/`, sharing
`cards/menu.js`, which holds the menu lines' long id chain, the arrows and
the settings changes, moved word for word. `menuOf` and `chip` stay in
`screens.js`; so does `menuTop`, as `render/title.js` needs a page. The
test learns each menu's way back (none on the title) and checks the
arrows. Next, part 7 the pages.

**D-577 · 2026-11-02 · The table of screens, part 7** (the owner's picks,
all recommended; as D-573) How to play, version history and the journal
each get a file in `src/input/cards/`, their helpers moved word for word.
Opening, closing and `journalPageWords` stay in `screens.js`, reached
through `c`; the history card's `page` takes `turnMap`'s Page Up and
Down. The test checks each page's way back and arrows. Next, part 8.

**D-578 · 2026-11-02 · The table of screens, part 8** (the owner's picks,
all recommended; as D-573) The profiles, the name pad, the look card, the
seed pad, the Seed Explorer and the map each get a file in
`src/input/cards/`, the map and the Explorer sharing `cards/map.js`, moved
word for word; `profilescreens.js` and `explorerscreens.js` stay as
helpers reached through `c`. A card may return `type(key)` for its typed
keys (the bag's C and X move there too) and `page(by)` for Page Up and
Down, which `turnMap` asks. The map's drags, pinches, wheel and floors
stay in `screens.js`, as `render/map.js` needs a page. The test checks
each card's way back, the pads' arrows and keys, and taps placed by each
card's own layout. D-168 and D-337 move to the superseded archive, the
eighth audit's decisions to `DECISIONS-AUDITS.md`. The audit is done;
next, Q-076.

**D-617 · 2026-11-06 · The ninth audit** (the owner's picks, all
recommended) At 0.3.72, nothing visible changed. A conversation's start
reads 10.1 KB (CLAUDE.md 6.2, PROGRESS.md 3.9), down from 11.5 KB.
`sprites.js`'s pixel pictures (48 KB, 667 lines) move word for word into
`src/render/pictures.js`; `sprites.js` keeps the making and drawing
(16 KB). Three docs at 98% of 8 KB split a whole topic each, word for
word: `GLOSSARY.md`'s finds to `GLOSSARY-FINDS.md`, `TECH.md`'s layout
to `TECH-2.md`, `RESEARCH.md`'s ideas kept for later to `RESEARCH-2.md`.
D-169 to D-176, the world's first decisions, move to
`archive/DECISIONS-WORLD.md`; ticked steps 15 to 17 and the oil tick are
archived. The next audit is at 0.3.112.

**D-661 · 2026-11-07 · The audit's first fixes** (the owner's picks, all
recommended; from D-660's findings) The fixes start with the four most
serious, one a step, each with a test. First, at 0.3.114, I1: a still
press becomes a hold only in play, so on the title, a menu or a card,
letting go is a tap however long it was held (D-408's hold in play is
unchanged). Picked for later steps: R2, the armour's glance gets dice of
its own, so drops stay as every seed gives them and only which bites
glance changes; W1, bringing an old save up to date removes only the
sticks on the waystone itself, as D-589 says, and what lies in the ring
round it stays. R1, the waystone's own event name, is the next step.

**D-662 · 2026-11-07 · The waystone's own event** (the owner's picks,
both recommended; R1 of D-660's findings, as D-661 set) A waystone's
plate waking sends `stoneWake`, after its line `stoneWakes`; only it
rings the bells and kindles the rune (D-591). A mimic bumped awake keeps
`wake`, with no sound (D-368). A rules test checks both mimics and the
plate; no check of main.js's text.

**D-663 · 2026-11-07 · The glance's own dice** (the owner's pick, as
D-661 set; R2 of D-660's findings) A bite's glance off armour (D-484)
rolls with its own salt, 12288, apart from the drop's (4096, D-474), the
flee's and Tough's. Before, both rolled the same number, so a kill on the
turn of a glance always dropped its part. Drops stay as every seed gave
them; only which bites glance changes. A rules test checks that kills on
a glance's turn drop about 1 in 2, as any kill.

**D-664 · 2026-11-07 · Only the stone's own sticks** (the owner's picks,
both recommended; W1 of D-660's findings, as D-661 set) As an old save
gets its home waystone (D-589), what lies on the stone's own 3 × 3
tiles is cleared, measured from its plan, and nothing in the ring round
it. Before, it cleared 2 tiles out, the old 5 × 5 stone's size, so a
stick or a dropped find in the ring went too. A rules test checks a
stick on the stone goes and a stick and a herb in the ring stay.

**D-665 · 2026-11-07 · The progress version kept in step** (the owner
left it to Claude) `docs/PROGRESS.md`'s **Version:** line had been set
by hand and fell 4 versions behind. `tools/release.js` (D-572) now sets
it to the changelog's newest version, and `--check` fails when it
differs; a release test checks it.

**D-666 · 2026-11-07 · One of a kind, and the fixes' order** (the
owner's picks, all recommended; R3 of D-660's findings) Every fix left
on D-660's list is picked, one a step, each with a test: the medium bugs
first (R3, R4, R5, I2, I3, D1, then W2, its way the owner's call), then
docs A and B, C, D and F to I, and E (its new lines the owner's pick),
then R6, R7, I4, D2, D3, I5 (with Q-054) and D4, then S1 and S3, then
the Spit grub (D-659). R3, at 0.3.118: Make counts a piece in the bag
before a tool goes into an empty Tool slot, so after Take off a second
pick or rod can't be made; and Wear on a piece the same as one worn says
its line, "You already have a heart charm.", free, and nothing changes.
A spare in a chest stays allowed (not the audit's chests in reach); two
different charms are worn together as before. A rules test checks both.

**D-667 · 2026-11-07 · The fall reels the line in** (the owner's pick,
recommended; R4 of D-660's findings, as D-666 set) A fall takes in a
line that is out, with no words of its own; only the fall's line,
"You fall, and wake again.", is shown. A strike waiting on the pull's
own turn goes too, so the strike meter never opens after waking.
Before, the float stayed, and fish bit it from across the room. A rules
test checks both.

**D-668 · 2026-11-07 · Walls are not cleared heaps** (the owner's pick,
recommended; R5 of D-660's findings, as D-666 set) Whether a heap beside
the trapped peddler is cleared (D-498) is asked of each tile round him:
it counts only if it can be walked on. Before, any tile that wasn't
rubble counted, so the walls in his ring did, and in 79 of 100 seeds his
first line on a dig was a `digging` one, not his call for help (D-496).
A rules test checks a walled ring and every test seed's own room.
D-652 moved to `archive/DECISIONS-BIOME-1.md`, word for word.

**D-669 · 2026-11-07 · A held Space picks once** (the owner's pick,
recommended; I2 of D-660's findings, as D-666 set) Off play, on the
title, a menu or a card, Space's key-repeat does nothing, so holding it
picks once, as Enter does; each fresh press still picks. In play,
holding Space keeps waiting turns (D-085). Before, a held Space ran from
the title into a new journey, flipped Settings switches and poured
flasks from the bag. A test checks both.
D-654 moved to `archive/DECISIONS-BIOME-1.md`, word for word.

**D-670 · 2026-11-07 · A card's words stay** (the owner's pick,
recommended; I3 of D-660's findings, as D-666 set) As a card or screen
opens, the line already showing counts as heard, so it isn't spoken over
the card's words a frame later. A line said while the card is open, such
as Wear's "You already have …" in the bag, is still spoken, and back in
play the line showing is spoken again. Before, on the bag, the map and
the pause menu, the line replaced the card's words and stayed. A test
checks all three. D-655 moved to `archive/DECISIONS-BIOME-1.md`, word
for word.

**D-671 · 2026-11-07 · Cards drawn smaller to fit** (the owner's picks,
both recommended; D1 of D-660's findings, as D-666 set; answers Q-064)
On a screen held sideways and squarer than a phone, a 4:3 tablet or a
near-square PC window, a card open in play is drawn at a smaller pixel
size, so the screen is at least 340 game pixels across, as on a phone
held sideways, and the card's wide layout fits, the stash chest's too.
Pixels stay whole: 3 screen pixels each at 1024 × 768, 2 at 900 × 820.
Only while a card is open; play's panel and buttons keep their size.
Phones, held either way, and upright tablets are unchanged (upright
tablets changed by D-681, 2026-11-07). Before, the
pause card's facts, the Growth tree's boxes and the bag's, workbench's
and peddler's words ran past the edge. The stacked upright layout was
tried there too, and is too short for those screens. A test checks the
sizes. D-656 moved to `archive/DECISIONS-BIOME-1.md`, word for word.

**D-672 · 2026-11-07 · Woken stones stay woken** (the owner's pick,
recommended; W2 of D-660's findings, as D-666 set; builds D-645) As an
old save's generated rooms are made again (D-580, D-645), a floor whose
remade rooms held a woken waystone has its stone room made anew with its
plate woken; every other stone stays asleep. A merged step is edited,
as at D-664, so only saves not yet brought up to date keep theirs; one
already updated stays as it is, with no guess at which were woken.
Before, every deep stone went back to sleep. A rules test checks it.
D-657 moved to `archive/DECISIONS-BIOME-1.md`, word for word.

**D-673 · 2026-11-07 · Docs A and B: the edge and the floors** (the
owner's picks, both recommended; A and B of D-660's findings, as D-666
set) `WORLD.md`'s light between rooms says D-445's rule, plain dark past
every edge, in place of D-440's place beyond showing itself. Today's
room counts, grids, cells, halls and large rooms (D-645, D-647, D-648)
replace the old ones in `WORLD.md`, Q-037 and Q-038, and the starting
region's sheet gives today's depths, biome 1 to depth 8 (D-635) and
floors below it made as depth 8 is (D-647), not depth 5 as the bottom;
the old numbers stay in one short "before" clause each. Docs only.
D-658 moved to `archive/DECISIONS-BIOME-1.md`, word for word.

**D-674 · 2026-11-07 · Doc C: each find's own price** (the owner's
pick, Claude's wording; C of D-660's findings, as D-666 set) The trade
coins entry in `GLOSSARY-2.md`, the peddler's row in `CONTENT-2.md`
and the note in `items.js` say each find sells at its own price: 1 coin
for most common creature materials (Wisp Glass 2, D-649), 5 for a rare
one, in place of 1 for every common one. The history's old lines stay,
true when written. Docs only.

**D-675 · 2026-11-07 · Doc D: built things, not "to come"** (the owner's
picks, both recommended; D of D-660's findings, as D-666 set) Five
glossary lines say what is in the game today, plainly, with no "before"
clause: armour, charms and lantern parts are gear worn or fitted, not
gear to come; the Gloamberry Seed is planted in a garden bed; waystones
sleep at the top of each band of floors, depths 2, 5 and 8, then every
4th depth (D-594), not only on depth 2; the Journal's tabs are Records,
Growth and Bestiary, quests, Lore and Feats later; and Stone goes into
the stash chest, the Stone Pick and the garden bed, not later crafts
(found while checking). Docs only. D-661 moved to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-676 · 2026-11-07 · Docs F to I: the small ones** (the owner's
picks, all recommended; F to I of D-660's findings, as D-666 set)
`TECH-2.md`'s layout lists the maker, `tools/make.js` (D-621, D-622),
and the map preview's page half, `tools/mappreview/page.js` (D-646,
found while checking). `DEV-TOOLS.md` says Go to depth runs 0 to 99,
starting on 1, depth 0 the crypt (D-212), not 1 to 99. Q-076 says the
lure wisp is built (D-649), not built next. Docs only. D-662 moved to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-677 · 2026-11-07 · Doc E: good for making things** (the owner's
picks, both recommended; E of D-660's findings, as D-666 set) The nine
materials a recipe uses, Stone, Copper Ore, Rat Tail, Moth Dust, Gloam
Wisp, Spider Silk, Mole Fur, Snapcap Gill and Mimic Heart, say "…, good
for making things." as the first line when chosen in the bag, not "for
crafting later"; their other two lines stay. The eleven no recipe uses
yet keep "for crafting later" until one does. A rules test checks each
line against the recipes. D-663 moved to `archive/DECISIONS-AUDITS.md`,
word for word.

**D-678 · 2026-11-07 · Freed once** (the owner's pick, recommended; R6
of D-660's findings, as D-666 set) Rubble beside a person already freed
digs as with no one there, its own lines ("You pull rocks off the
heap." …), their wait untouched. Before, bumps played his `digging`
lines and the last freed him again, thanks and 5 turns anew. A rules
test checks it. D-664 moved to `archive/DECISIONS-AUDITS.md`, word for
word.

**D-679 · 2026-11-07 · Drops clear of creatures** (the owner's picks,
both recommended; R7 of D-660's findings, as D-666 set) No spill lands
under a creature or a person: a beaten creature's drops, mined finds
that don't fit in the bag and the garden bed's picked berries each skip
a tile with one on it, as they skip items and the hero, sides before
corners. With every tile round taken, it lies where it came from, as
before. The beaten creature's own tile counts as free. Before, a rare
drop could lie under another creature. A rules test checks it. D-665 and
D-666 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-680 · 2026-11-07 · A card's action at once** (the owner's pick,
recommended; I4 of D-660's findings, as D-666 set) Only a turn taken in
play waits in line while the hero still slides or the stairs fade; a
card's own action (the bag's Eat, Pour, Craft or Hold, the bench's Make)
happens at once, and the slide goes on by itself. Before, it waited until
the card closed. A fall still takes nothing. An input test checks it.
D-667 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-681 · 2026-11-07 · A smaller card upright** (the owner's
pick, recommended; D2 of D-660's findings, as D-666 set; changes D-671's
line on upright tablets) Held upright, a card open in play is drawn at a
smaller pixel size when that leaves the screen under 300 game pixels
tall, as D-671 does sideways: 3 screen pixels each at 768 × 1024, so the
bag's words fit above DROP and WEAR with a 9 or 12 slot bag. Pixels stay
whole; phones are unchanged. Before, every item's words ran over the
buttons there. A test checks five tablet sizes and every item's words.
D-668 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-682 · 2026-11-07 · The wrench under pause** (the owner's picks,
both recommended; D3 of D-660's findings, as D-666 set; changes D-381's
spot on narrow screens) The dev wrench stands under pause, in the top
right corner's group, when the hearts and oil panel at its widest (a
row of hearts at level 99) would come within 8 px of it left of pause:
a 320 px wide phone. Every other screen keeps it left of pause. Before,
from level 10 the panel ran into it there. A test checks phones, phones
held sideways and tablets at three pixel ratios.
D-669 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-683 · 2026-11-07 · Space on the name pad** (the owner's pick,
recommended; I5 of D-660's findings, as D-666 set; Q-054 stays open)
On the name pad, Space does nothing; Enter still presses the lit key,
and letters and Backspace type as before (D-272). Every other card and
menu keeps Space picking, as Enter does. Before, a letter lit OK, so
Space after it made the profile: typing "ANNA MAE" made "ANNA". Names
stay A to Z. A test checks it.
D-670 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-684 · 2026-11-07 · He has wares at home** (the owner's pick,
recommended; D4 of D-660's findings, as D-666 set) The peddler's home
line "Let me unpack. I'll have wares soon." is dropped, since at home
he always sells his wares (D-495) and his card opens with them listed.
His two other home lines, "You dug me out. I won't forget it." and
"Home at last. My legs still shake.", take turns as before (D-492). A
saved line past a list's end shows the list's first. A test checks it.
D-671 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-685 · 2026-11-07 · The rock painted faster** (the owner's picks,
both recommended; S1 of D-660's findings, as D-666 set) The rock and
earth painter works out each tile's walls once, before the pixels: its
wall value, whether it is a wall, and whether it stays clear (a way on,
or an opening in the edge). Before, it looked them up about four times
for every pixel. Only `rock.js` changes, not the pool's water, and a
room is still painted once each time it is entered. The picture is the
same, pixel for pixel; painting a room takes about half the time (14 to
8 ms each over 24 rooms on a computer). A test checks the pictures of
12 rooms against fingerprints of the old painter's.
D-672 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-686 · 2026-11-07 · The room holds still under a card** (the
owner's picks, both recommended; S3 of D-660's findings, as D-666 set)
Under a card (the bag, pause, the map, trade and the rest), the room
behind the veil is drawn once and kept, not 60 times a second, so its
torches and flame stop flickering until the card closes. It is drawn
again when what it shows changes (a find eaten or dropped, the screen's
size, a dev switch, the motion setting), and keeps being drawn until a
moment running as the card opens has ended (a slide, a shake, a "+1", a
beam, a rune kindling). The card's own flame and needle move as before.
On a phone 4 times slower, a frame with the bag open takes about 1 ms,
not 8. Reduced motion skipping frames in play is its own next step.
D-673 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-687 · 2026-11-07 · Still play draws less** (the owner's pick,
recommended; S3's second half, after D-686) With reduced motion on, the
room in play is held the same way as under a card: drawn once and kept
until what it shows changes (a step, a creature's move, a walk's dots,
a framed creature, the workbench's marks) or while a moment runs (a
hit's red, a "!", a "+1", a beam). The hearts, oil, buttons, round map
and text line are still drawn every frame. Nothing in the room moves
with reduced motion, so play looks and feels the same. In the crypt,
standing, on a phone 4 times slower, a frame takes about 1 ms, not 9.
D-674 moved to `archive/DECISIONS-AUDITS.md`, word for word.
