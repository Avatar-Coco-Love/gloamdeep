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

**D-688 · 2026-11-08 · The Spit grub's look, drop and two steps** (the
owner's picks, all recommended; mock-ups:
https://claude.ai/artifact/2VP35g4oZNwBYigfmoys1L; builds D-659) Look
A, a glowworm: side on and facing right, a plump grub of bone-white
rings, its tail glowing venom green, a pink eye and an open mouth; it
`glows`, drawn over the dark as the lure wisp is. Its drop is a Grub
Skin, about 1 in 2, sold for 1, and now and then a Glow Gland, about 1
in 10, sold for 5 as every rare one is. Beside the hero with the lantern
lit, it spits anyway: 1 heart at once. It is built in two steps: first
the grub itself, in the pool from depth 4, never moving and, with no
way, hurting whoever stands beside it, lit or not, as the snapcap does
(the owner's pick); then the spit and the glob, a new way, with a
playtest, where whether a glob hurts a creature in its path is asked.
Drafts the owner may change: the names and lines. D-675 moved to
`archive/DECISIONS-AUDITS.md`, word for word.
