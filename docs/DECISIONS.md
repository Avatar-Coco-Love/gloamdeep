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
