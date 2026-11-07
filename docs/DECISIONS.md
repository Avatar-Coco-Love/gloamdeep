# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`PR-CHECKLIST.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

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

**D-518 · 2026-10-31 · An audit every 40 versions** (the owner's pick,
recommended; supersedes D-337's 20) The owner asked if audits help. The
start-of-conversation read stays near 11.5 KB (17 KB before the first),
but the size test already makes normal steps trim, and code splits are
outgrown in an audit or two, while 20 versions is about a day. So an
audit comes every 40 versions; the size test still guards in between.

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

**D-660 · 2026-11-07 · The tenth audit, part 1** (the owner's picks, all
recommended; the owner asked for a fuller audit) At 0.3.113, nothing
visible changed. A conversation's start reads 10.1 KB, as at the ninth.
Floor layouts are made about 5 times faster with the same floors (6,000
seed and depth pairs checked), and the slowest test is split in three
to run side by side: `npm test` 59 s to 35 s. Touch in play moves from
`main.js` (39 to 35 KB) to `src/input/touch.js`, word for word but for
`heldAt`. `CONTENT.md`'s finds move to `CONTENT-FINDS.md`, the second
half of `WORLD.md` to `WORLD-2.md`, word for word; D-648 to D-651 and
D-653 to `archive/DECISIONS-BIOME-1.md`; ticked steps 18 and 18b are
archived. Four bug hunts, a docs read-through and a phone speed check
read the code alongside: 19 bugs, about 30 stale doc lines and one
freeze on depth 2's first frame, listed for the owner to pick from
(https://claude.ai/artifact/FjFbsg9mGELYQB2aCap496); each fix is its
own small step with a test. The next audit is at 0.3.152.

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
Phones, held either way, and upright tablets are unchanged. Before, the
pause card's facts, the Growth tree's boxes and the bag's, workbench's
and peddler's words ran past the edge. The stacked upright layout was
tried there too, and is too short for those screens. A test checks the
sizes. D-656 moved to `archive/DECISIONS-BIOME-1.md`, word for word.
