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

**D-797 · 2026-11-10 · The rim lurker, the mountain rooms' first night
creature** (the owner's picks; answers part of Q-076; mock-up:
https://claude.ai/artifact/MW9qmr5aUJTzq75sHE7LMv)
A brand-new creature, the rim lurker, from the Q-076 list. One comes
out each night in each of the 3 mountain rooms, with the night
creatures' rules (D-778); never by day, never underground. Look B of its
mock-up: a hunched shade of dusky violet, long arms, pale claws, pink
eyes. It waits where it came out until the hero comes within 3 steps,
lit or not; then it chases, the rat's way, and keeps coming. 3 hearts,
a bite of 2 (the owner's own pick); beaten, it may drop a Lurker Claw,
about 1 in 2, for crafts later. Others offered: the gloamberry mimic,
the dozing brute, the brood mother; the woods by night or day, or below;
looks A (a grey crag stalker) and C (a rim lizard); chasing from the
start, or shunning the lantern; 2 or 1 hearts with a bite of 1; no find.
Claude's calls the owner may change: the new way is named Lurks, and it
needs a clear line to the hero, as a chaser does; it comes out on grass
beside the room's rock when such a tile is free; its lines (it claws);
no sound of its own; the Lurker Claw holds 20 and sells for 1.
D-796 and D-788 move to `archive/DECISIONS-SURFACE.md`, word for word, and
`GLOSSARY-2.md`'s home words to a new `GLOSSARY-HOME.md`, word for word.

**D-798 · 2026-11-10 · Steady Wick, Light's first upgrade** (the
owner's picks, all recommended) The gaps are worked through one step a
time, quickest first: the Growth tree; uses for the finds kept for
crafts later; the herb mimic's and bone rat's rare drops; the lantern's
parts; weapons; the forge and cooking; then found abilities, bosses,
trophies and people. The Growth tree's Light branch gets its first
upgrade, Steady Wick: 1 ember, bought once, for good; a lit turn burns
9/10 of its oil, a full tank lasting about 66 turns, not 60, added to
the wick, the charm, the boon and Slowburn. Where its box is too narrow
for the name, it says "Steady". Others offered: drop uses or the lab
first; Fuller Pour (a flask 50%, not 45%); Brighter Glass (1 tile
farther); two lines in the box, or a shorter name. Claude's calls: its
words "The lantern burns a little slower, for good."; its button "Get
Steady Wick"; a small flame in the lantern's gold, dim until bought; it
is kept on a Normal fall, as Tough is. D-789 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

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

**D-800 · 2026-11-10 · The workbench's two tabs** (the owner's pick,
recommended, from a fourth row or pages) The workbench's card was full,
12 slots, so it gets two tabs where its title was, as the bag's: BUILD
(the chest, Stone Pick, bed, bag upgrades, garden bed, rod, shelf) and
GEAR (the wick, the vests, the charms), a 4 × 3 grid each. A tap on one
or Tab turns it. Claude's calls: the tab last open is kept while the
game runs; the mortar keeps its title, with no tabs.

**D-801 · 2026-11-10 · The Shell Vest** (the owner's picks, all
recommended; builds D-484, D-799) The second armour piece, on the GEAR
tab: 4 Crab Shell, 1 Wood. Worn in the armour slot, in the Rat Hide
Vest's place, it takes 1 off a bite of 2 or more, the scorpion's tail
strike too, so the rim lurker and the scorpion hurt 1, not 2. Its look:
overlapping stony grey plates with rust edges, the crab's colours.
Claude's calls the owner may change: never below 1; its lines ("You
put on the shell vest.", "A shell vest. Hard bites hurt less.");
the Crab Shell's look line names it. D-791, D-792 and D-794 move to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-802 · 2026-11-10 · The Spitproof Draught, the mortar's fifth
recipe** (the owner's picks, all recommended; builds D-799) Made at the
mortar from 2 Grub Skin and 1 Herb. Drunk from the bag, for 60 turns a
spit grub's glob that reaches the hero splashes off and hurts nothing;
grubs still spit. Its rules are the Ward Draught's (D-795): drunk
again, back to 60; any time; a night uses its turns and a fall ends it;
it holds 5; a small mark under the hearts with the turns left. Its
bottle and mark are dusty rose, from the grub's pink eye. Others
offered: 3 Grub Skin; 2 Grub Skin and 1 Oilcap; a glob hurting less,
never the last heart; grubs not seeing the hero; waxy bone-cream; slate
blue-grey. Claude's calls the owner may change: its lines ("The glob
splashes off you.", "Your skin feels dry again." as it ends); the glob
breaks on the hero, flying no farther; the mortar lists it last; the
Grub Skin's look line names it. D-795 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
