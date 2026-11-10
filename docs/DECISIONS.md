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

**D-803 · 2026-11-10 · The Fur Bedroll** (the owner's picks, all
recommended; builds D-758, D-759, D-799) Bunny Fur's first use, made on
the workbench's BUILD tab from 4 Bunny Fur and 1 Spider Silk; one at
most, carried in the bag, taking a slot, never used up. Sleeping out
with it in the bag, the hero wakes with 2 hearts back, never above full,
and not stiff; the bed at home still heals to full. Its look: a roll of
fur in the Bunny Fur's colours, tied round the middle with a pale silk
cord. Others offered: healing to full; 3 Bunny Fur and 1 Spider Silk;
5 Bunny Fur alone; the GEAR tab; a folded blanket. Claude's calls the
owner may change: BUILD lists it last; its lines ("You make a fur
bedroll.", "You wake warm in your fur bedroll."); the moon's ask says
"Your fur bedroll is warm." while it is carried; only the bag counts,
not a chest; the Bunny Fur's look line names it. D-797 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-804 · 2026-11-10 · The Fur Bedroll laid out, and SLEEP** (the
owner's idea and picks, all recommended; builds D-758, D-803) In the
bag the bedroll has SET DOWN and, left of it, SLEEP. SET DOWN lays it
beside the hero, the bed's way, only under the sky. Bumped from dusk,
it asks Sleep here until morning?; Yes is the bedroll's night, 2 hearts
back and not stiff; by day it asks Roll up the bedroll?, Yes putting it
back in the bag. SLEEP asks the same where the hero stands, dim by day,
below ground or with a creature after the hero. It is no bed for a
fall: home's bed still is (D-737). The moon button stays. Others
offered: one card with Sleep and Roll up; USE or REST; a bedroll slept
on as the bed for a fall; the moon hidden while carried. Claude's calls
the owner may change: SLEEP or a bump that can't says why, free ("Only
under the sky.", "Not with a creature after you.", "You aren't
tired."); C in the bag is SLEEP; asleep beside a laid-out bedroll is
warm too, the moon's ask saying so; "You lay out the fur bedroll." and
"You roll up the fur bedroll."; laid out, it is drawn from above, its
head end still rolled. D-798 moves to `archive/DECISIONS-SURFACE.md`,
word for word.
