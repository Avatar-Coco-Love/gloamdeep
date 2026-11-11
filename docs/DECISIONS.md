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

**D-814 · 2026-11-10 · Growth's second row** (the owner's picks, all
recommended, from the map's row 2 drafts, D-639; builds D-462, D-811)
Biome 2 is not built yet, so row 2 opens the first time the hero goes
deeper than depth 8, biome 1's last floor (offered too: shown but
locked until biome 2; more upgrades in row 1 instead). Each 1 ember,
bought once. Light: Quick Pour, pouring a flask takes no turn (offered
too: Long Torch, a set torch 200 turns; Last Drops, the last 5% of oil
lasting twice as long). Body: Guard, about 1 bite in 6 glances off and
does no harm, by the seeded dice (offered too: Second Wind, eating at 1
heart heals 2 more; Quick Swap, a weapon swapped with no turn). Hands:
Thrift, making something keeps its cheapest part about 1 time in 4
(offered too: Steady Line, a wider light on the strike card; Deep
Pockets, a bag slot). Built in four steps, one a PR: row 2 opening at
depth 9 with a dashed tile a limb; then Quick Pour; Guard; Thrift. Each
one's words, look and details are settled at its step. D-810 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-815 · 2026-11-11 · Row 2 opens** (the owner's picks; step 1 of
D-814) The journey keeps a mark of Growth's rows open, set the first
time the hero is deeper than depth 8 and never taken away; an older
save already past depth 8 has it when loaded (offered too: worked out
each time from the rooms kept; per profile, across journeys). A dev
jump to depth 9 or deeper opens it too (offered too: only walking
there). The owner's own pick: everything visible, with what it takes
to open it; the locked tiles stay, and picking one says "Reach depth 9
to open." (offered too: a depth tag on the row; dim upgrades shown
locked). Once open, row 2 has a dashed tile a limb, and row 3 shows
locked above it, "Opens deeper down." No line in the log yet: "Growth
has a new row." is added with Quick Pour (offered too: a line now;
never). D-811 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-816 · 2026-11-11 · Quick Pour** (the owner's picks, all
recommended; step 2 of D-814) Light's row 2 upgrade, 1 ember, once: a
flask poured by hand takes no turn, so no oil burns and no creature
moves, and "You pour a flask." is said (offered too: nothing said). Its
words "Pouring a flask takes no turn."; its tile a tipped flask, a drop
falling (offered too: an upright flask and a drop, "You pour a flask in
no time."; a lantern and a drop). A Pond Minnow's oil still takes its
turn, as it is not a flask (D-611; offered too: any oil by hand).
"Growth has a new row." is said the first time a row opens, walking
down or by a dev jump, in place of that turn's line (offered too: kept
in the log as well); an older save that loads already open says
nothing. D-812 moves to `archive/DECISIONS-SURFACE.md`, word for word.
