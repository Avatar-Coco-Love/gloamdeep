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
