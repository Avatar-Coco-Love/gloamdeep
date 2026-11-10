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

**D-732 · 2026-11-09 · A playbook of how we work** (the owner's picks,
all recommended) The owner wants this project's way of working kept for
future projects. `docs/WORKFLOW.md` gathers it in one place: the steps
of a step, each habit and why, what changed along the way, and how to
start a new project. Each audit adds what that stretch taught us about
working together. Built now as its own step, nothing visible changed.

**D-741 · 2026-11-09 · The playbook caught up, and kept up** (the owner's
picks, all recommended; builds D-732) The owner asked that the playbook
hold everything done so far and grow as we go. Four parts are added:
how the game grew (stages, a playtest setting each plan, groundwork
first, only what works shows), our tools, lessons from bugs and design
habits. They go in a new `docs/WORKFLOW-2.md`, so `WORKFLOW.md` stays
under its cap. When a step teaches something about working together,
its PR adds one line to `WORKFLOW.md`'s "Since the last audit"
(`PR-CHECKLIST.md` reminds), and each audit moves the lines into place.
Nothing visible changed.

**D-782 · 2026-11-10 · The thirteenth audit** (the owner's picks: every
split, every archive and the playbook; ponds as recommended) At
0.3.232, nothing visible changed. A conversation's start reads 10.4 KB,
not 11.0. Three code files are split word for word: the in-game
history's 0.3.151 to 0.3.200 go to `src/core/history-0.3-3.js` (42 KB
to 16 and 26); the creatures' pictures, rat to mimic leaf, to
`src/render/pictures-creatures.js` (49 KB to 39 and 10); each
creature's lines and its finds' to `src/core/lines-creatures.js` (42 KB
to 31 and 13; `tools/make.js` still starts new ones in the old files).
D-740 and D-742 move to `archive/DECISIONS-AUDITS.md`, D-743 to
`archive/DECISIONS-CARDS-2.md`, and D-773 to D-777 to a new
`archive/DECISIONS-SOUNDS.md`; ticked steps 23, 24, 25 and 27 are
archived; Q-088, Q-091 and Q-092 move to `OPEN-QUESTIONS-2.md`; the
playbook's audit lessons go to a new `WORKFLOW-3.md`; all word for
word. Docs that drifted are fixed: the lampmoth, bat, gloamling and
mole's surface visits; the packs in use; most woods rooms have a pond,
not each (about 1 thick-woods room in 20 has none). The bug hunt found
three bugs, all to be fixed in the next PR (the owner's call): night
or day creatures piling up across nights (B1), a bite on waking from
sleeping out (B2), night creatures coming out beside the hero in the
dark (B3). The next audit is at 0.3.272.

**D-783 · 2026-11-10 · The audit's bug fixes** (the owner's call at
the audit, D-782; fixes D-778 to D-781) An earlier night's or day's
creatures still standing go before the new ones come out, so they never
pile up in a room left and come back to (B1). Night creatures leave by
day, and day creatures by night, before any creature acts, so none
bites the hero on waking from sleeping out (B2). Night creatures come
out at least 4 steps from the hero, as the mole, as well as out of
sight, so none appears beside them with the lantern out (B3). Each has
a test.

**D-790 · 2026-11-10 · Copyable next prompts** (the owner's request)
Each PR's handoff ends, before merging, with a few short prompts the
owner can copy to pick the next direction, one per choice, or a single
one when there is only one way on (`PR-CHECKLIST.md`). When they are
given changed by D-795 (2026-11-10): once, after the merge.

**D-799 · 2026-11-10 · The finds plan** (the owner's picks, all
recommended, from a plan page: https://claude.ai/artifact/GnPo6RnybF7g6ogTdiET6y;
narrows Q-061 and Q-093) Each find kept for crafts later gets one first
use, with more uses free to come later: Crab Shell, the Shell Vest
(D-801); Grub Skin, a Spitproof Draught; Bunny Fur, a Fur Bedroll for
sleeping out; Bat Wing, an Echo Charm showing creatures in the dark
near by; Lurker Claw, a Shade Draught, creatures noticing the hero only
near; Rat Bone, a Bone Hook for the rod; Glow Gland, a Glow Lamp, a
longer torch; Bat Fang, a Fang Charm, a heart back now and then from a
beaten creature; Mole Claw, the Mole Claw Pick. With later steps: Oil
Bladder, the lantern's first tank; Gloam Eye, its first glass, showing
creatures in disguise; Stinger, a Stinger Spear poisoning creatures;
Venom Sac, a Venom Oil for weapons. Kept for later too: Bunny Fur, a
warm lining; Bat Wing, arrows' fletching; Stinger, arrowheads; Rat Bone,
a Bone Club; claw weapons. They are built one a step, in that order,
each one's numbers settled at its step (the plan's are drafts). The
owner's wish for weapons (Q-094): a switch to show creatures' coming
attacks and one to show the hero's. Others offered: two or three a PR;
a waterskin, a Bat Wing torch, a Sting Salve, Bone Meal, a Tick Charm,
an Eye Charm, a Wayglow, a Mole Charm, a long Ward.

**D-810 · 2026-11-10 · The Mole Claw Pick** (the owner's picks, all
recommended; builds D-799, D-480) Mole Claw's first use, the last quick
one, made on the workbench's BUILD tab from 1 Mole Claw, 2 Wood and 2
Stone; one at most. A Tool of its own beside the Stone Pick, one in the
Tool slot at a time, swapped there as the rod is. Held, it does all the
Stone Pick does, and copper veins and rubble break in half the bumps,
rounded up: a vein in 2, not 4; rubble in 2, not 3. Other tiles, stone
heaps among them, take their own. Others offered: stone heaps too;
veins only; one bump fewer; 1 bump always; the Stone Pick made over
with the claw, used up; 1 Mole Claw, 1 Copper Ore and 2 Wood; replacing
the Stone Pick. Claude's calls the owner may change: BUILD lists it
after the Stone Pick; made with the Tool slot empty it goes straight
there, the Stone Pick's way; a vein's first bump says its first line,
the second breaks it; its look, the Stone Pick's handle with a mole's
pale claw lashed on as its head; its lines ("You make a mole claw
pick.", "You hold the mole claw pick.", "Veins and rubble go in 2
bumps."); the Mole Claw's look line names it. D-806 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-811 · 2026-11-10 · The Growth tree, ready to grow** (the owner's
picks, all recommended, from a page of three looks:
https://claude.ai/artifact/4Gif1nMAvjvi5ZztHwdz2y; builds D-462, D-481)
Before the Hands upgrade, the tree is made ready for many more. Its look
will be A, twigs: one drawn tree kept, each row a twig across the three
limbs, its upgrades small picture tiles side by side, up to 3 a branch
in a row, the name and words on the right when picked, and the tree
scrolling once there are more rows than fit. Offered too: branch pages,
one limb's tree a page; lists, like the Bestiary. In three steps: first,
nothing visible, one list of upgrades in the code, each with its cost,
the most times it can be bought and its look, and one record in the
save of what was bought, older saves keeping their hearts, Tough and
Steady Wick (offered too: each upgrade its own entry, as before); then
the twigs; then the Hands upgrade. D-807 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-812 · 2026-11-10 · The Growth tree's twigs** (the owner's picks, all
recommended, from a page of mock-ups:
https://claude.ai/artifact/9U2gRwJi4C88wFJKev2RWU; builds D-811) The
tree's look A: each row a twig across the three limbs, its number dim at
the left; a branch's upgrades small picture tiles side by side; a bought
tile's picture lit and its frame faintly gold; the heart a heart with
how many are bought in its corner; one lock tile a limb on the locked
row. A dashed "to come" tile only where a limb has nothing yet (offered
too: a spare on every limb; none). The arrows read a row: Left and Right
walk its tiles across the limbs, Up and Down change row on the same
limb; past a row's ends, Records and the Bestiary (offered too: limb by
limb). Claude's calls the owner may change: tiles 18 pixels, smaller on
a small screen; the tree scrolls by a swipe or the wheel and follows
the pick, a small arrow where rows are hidden. D-808 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-813 · 2026-11-10 · Quick Hands** (the owner's picks, all
recommended; the last step of D-811) Hands' first upgrade, in the
first row: a tree, a stone deposit or a fallen branch, gathered by
hand, takes 1 bump fewer (a tree 3, a deposit 2, a branch 1; a berry
bush stays 1). A tool's own count is kept: copper veins and rubble
are unchanged. 1 ember, bought once; its tile's picture a pale open
hand. Others offered: Full Hands, 1 more Wood or Stone from each;
Deep Pockets, 1 more bag slot; 2 embers; a small axe or a sack.
Claude's calls the owner may change: its name and words ("Trees,
stone and branches take 1 bump fewer."); rubble around a trapped
person is not gathering, so keeps its 3 bumps. D-809 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
