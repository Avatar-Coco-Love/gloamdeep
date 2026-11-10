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

**D-806 · 2026-11-10 · The Shade Draught, the mortar's sixth recipe**
(the owner's picks, all recommended; builds D-799) Lurker Claw's first
use, made at the mortar from 2 Lurker Claw and 1 Duskstar. Drunk from
the bag, for 60 turns a creature that has not noticed the hero notices
them only within 2 steps, by light, by line or lurking; one already
after the hero keeps coming, lampmoths still fly to the lantern and
spit grubs still spit. Its rules are the Spitproof Draught's (D-802):
drunk again, back to 60; any time; a night uses its turns and a fall
ends it; it holds 5; a small mark under the hearts with the turns left.
Its bottle and mark are dusky violet, the rim lurker's. Others offered:
2 Lurker Claw and 1 Herb; 3 Lurker Claw; within 1 or 3 steps; chasers
losing the hero too; grubs spitting only near; smoky grey; deep indigo.
Claude's calls the owner may change: steps counted the lurker's way, no
diagonals; its lines ("The dark folds round you.", "The shade lifts
from you." as it ends); the mortar lists it last; the Lurker Claw's
look line names it. D-801 moves to `archive/DECISIONS-SURFACE.md`, word
for word.

**D-807 · 2026-11-10 · The Bone Hook** (the owner's picks, all
recommended; builds D-799, D-614) Rat Bone's first use, made on the
workbench's BUILD tab from 3 Rat Bone and 1 Spider Silk; one at most.
FIT in the bag ties it to the rod for good, free, the Copper Wick's way;
it leaves the bag, and the rod is drawn with a small pale bone hook under
its float. Fitted, the strike meter's amber zone is half again as wide:
the minnow's 3/8 of the bar, not 1/4, the cavefish's 3/10, not 1/5;
waiting for a bite stays the same. Others offered: bites coming sooner,
1 turn in 4; a second try after a miss; a third wider; double; working
from the bag; the rod made over at the bench; 2 Rat Bone and 1 Spider
Silk; 4 Rat Bone. Claude's calls the owner may change: BUILD lists it
last; FIT only with the rod carried, in the bag or the Tool slot, else
"You have no rod to fit it to.", free; it stays on for good, there being
one rod; its look, a rat bone bent into a J; its lines ("You make a bone
hook.", "You tie the bone hook to your rod.", "A bone hook, for your
rod."); the Rat Bone's look line names it. D-802 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-808 · 2026-11-10 · The Glow Lamp** (the owner's picks, all
recommended; builds D-799, D-478) Glow Gland's first use, made in the
bag (Make on the Glow Gland) from 1 Glow Gland and 1 Wood, as a torch
is; 5 a stack. Set down the torch's way, anywhere, on the same stone
foot: it lights 3 tiles in the gland's soft green, steady, no flicker,
for 300 turns, then goes dark, leaving bare floor; it can't be picked
back up. Others offered: the bench's BUILD tab from 1 Glow Gland and 1
Copper Ore; 1 Glow Gland, 1 Moth Dust and 1 Wood; 200 turns; never
going out; the torch's orange; green, 4 tiles; picked back up by a bump.
Claude's calls the owner may change: its look, the gland in a small
copper cup on the torch's stick, in its ring of stones, drawn bright
with no embers; lampmoths and bats fly to it as to any light; it counts
in no Torches feat; its lines ("You make a glow lamp.", "You set down
the glow lamp.", "Your glow lamp goes dark."); the Glow Gland's look line
names it. D-803 and D-804 move to `archive/DECISIONS-SURFACE.md`, and
the lights' table to `CONTENT-2.md`, word for word.

**D-809 · 2026-11-10 · The Fang Charm** (the owner's picks, all
recommended; builds D-799) Bat Fang's first use, made on the
workbench's GEAR tab from 1 Bat Fang and 1 Copper Ore, as the other
charms are. Worn, each creature beaten gives back 1 heart about 1 time
in 4, never past the most. Healed, its line shows and a small red heart
rises beside the "+1" over the hero (steady with reduced motion).
Others offered: 2 Bat Fang and 1 Copper Ore; 1 Bat Fang and 1 Spider
Silk; 1 time in 3 or 5; a line only; nothing extra. Claude's calls the
owner may change: GEAR lists it last; a pile of bones scattered counts
as beaten, struck down into its pile does not; the spear's two beaten
are a coin each; at full hearts nothing happens, no line; the coin is
seeded as a drop's is; its line ("The fang drinks. You feel better.")
is said over the creature's own; its look, a pale bat fang pointing down
in the charms' copper setting; its other lines ("You make a fang
charm.", "You put on the fang charm.", "Beaten creatures may mend
you."); the Bat Fang's look line names it. D-805 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
