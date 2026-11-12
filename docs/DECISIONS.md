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

**D-826 · 2026-11-11 · The fourteenth audit** (the owner's picks, all
recommended, and the near-full docs split too) At 0.3.272, nothing
visible changed. A conversation's start reads 10.5 KB, not 10.8:
"Waiting on the owner" lists the later questions on one line. The
in-game history's 0.3.201 to 0.3.250 go to `src/core/history-0.3-4.js`
(39 KB to 13 and 27). The draughts and rare materials go to a new
`CONTENT-FINDS-2.md`, and the places' sounds, "Maybe" and "Later" to
`SOUNDS-2.md`. D-782 and D-783 move to `archive/DECISIONS-AUDITS.md`,
D-822 to D-825 to `archive/DECISIONS-SOUNDS.md`; the playbook's lines
since the last audit go to a new `WORKFLOW-4.md`; all word for word.
A bug hunt reads the code since 0.3.233; its findings come to the owner
as a list to pick from, each fix its own step. The next audit is at
0.3.312.

**D-827 · 2026-11-11 · The audit's bug fixes** (the owner's picks, all
five and the Tab tick, in one PR, each with a test checked against the
old code first) At 0.3.273: a herb's card draws the mortar's line
beside EAT; MAKE with a full bag says "Your bag is full." unless one is
carried; a creature that never bites and isn't chasing doesn't stop
sleeping out; a tool's hold is silent, its event marked `tool`; the
mortar's notes say it lists six; Tab on Settings ticks as a tap does.

**D-841 · 2026-11-11 · Music in the dungeon** (the owner's picks, all
recommended; part of Q-095) From a board of 8 calm, dark tracks from the
same bundle, measured again from all 138 (the darkest, sparsest and
stillest of the 43 over 45 s, the four tunes already playing left out;
the warrens' and the crypt's tunes beside them to compare; the dungeon's
stone steps with their echo playing along; a walk down from floor 7),
track 1, "Patreon Challenge 04" (1 min 44 s, the stillest, long held
sounds, minor) plays in the dungeon, every floor from 8 down until the
next region (offered too: VGMA Challenge 19, Ludum Dare 32 05, Patreon
Challenge 05 and four more; floors 8 to 10 only), non-stop with no break
(offered too: with a 30 s, 60 s or 2 min gap), carrying on from floor to
floor (offered too: starting again on each floor). It changes as the
others do: the old place's tune fades out over 2 s, the new one starts a
second later, fading in over a second. A line in Music's list after
Warrens, Dungeon. File and loudness in `SOUNDS-3.md`. D-836 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-842 · 2026-11-11 · Chopping a tree** (the owner's picks, all
recommended) Each bump on a tree that isn't its last, `chop`, plays the
RPG pack's axe chop, a little higher or lower each time (offered too: a
wooden knock; the chop and the knock together). The last bump, as it
falls, `treeFall`, plays a last chop, then a slow low creak (`creak2` at
0.6), then a heavy wooden crash as it lands (offered too: the chop and
the crash with no creak; one more chop). Trees only for now (offered
too: fallen branches; their own lines in Settings). No line of their
own: chopping is under Digging, a tree falling under Stone breaks, as
Finds' list is full on the smallest card. Files in `SOUNDS-2.md`. D-837
moves to `archive/DECISIONS-SOUNDS.md`, word for word.

**D-843 · 2026-11-12 · Chopping a fallen branch** (the owner's picks,
all recommended) A fallen branch chops as a tree does: its first bump
plays `chop` (offered too: the chop, then a short creak; a lighter chop).
The bump that snaps it, `branchSnap`, plays a last chop, then a light
wooden knock as it breaks (offered too: just the chop; a tree's fall,
creak and crash). Under Digging's and Stone breaks' lines, as a tree's
are. Each chopped tile names the sound of its last bump. Files in
`SOUNDS-2.md`. D-838 moves to `archive/DECISIONS-SOUNDS.md`, word for word.

**D-844 · 2026-11-12 · Sitting by a campfire** (the owner's picks, all
recommended but the effects, where all three were picked; Q-088's buff,
step 1) A burning campfire bumped says its first words and opens Sit by
the fire?, its second words under it, No picked (offered too: just
standing beside it; only when sleeping out beside it). Yes, a turn:
hearts back, blazing 2, embers 1, never above full (offered too: 1
either way; 2 either way), and stiff ends; the fire burns down a level,
blazing to embers, embers to cold ashes (offered too: once a day a fire;
both). Warmed, the lantern burning slower for a while, comes next, its
own step (offered too: all three at once; one at a time). Claude's
calls the owner may change: Yes grey with full hearts and not stiff;
"You sit by the fire and warm up."; no sound of its own yet. D-839
moves to `archive/DECISIONS-SOUNDS.md`, word for word.

**D-845 · 2026-11-12 · Warmed** (the owner's picks, all recommended;
Q-088's buff, step 2) Sitting by a burning campfire also leaves the hero
Warmed for the fire's turns, blazing 60, embers 30 (offered too: 60
either way; 30 either way). While Warmed, a lit turn burns 6/7 of its
oil, so a full tank lasts 70 turns, not 60, as Slowburn does and added
to it and the Heart Charm (offered too: 12/13, lasting 65; 3/4, lasting
80; like Slowburn but not added to it). Yes on Sit by the fire? works
whenever it helps: hurt, stiff, or Warmed would last longer; grey only
when nothing would change (offered too: always; only hurt or stiff, as
before). Sitting again sets the longer count, never a shorter one. Its
mark is a small flame in the campfire's orange with its turns left
(offered too: a tiny campfire; Slowburn's bottle in orange). Claude's
calls the owner may change: Draught rules for the rest (the turns run
with the lantern empty, a night uses them, a fall ends it); the mark
after stiff's; "The fire's warmth fades." as it ends; a tap on the mark
says "Warmed: oil lasts longer, {n} turns left."; no sound of its own.
D-840 moves to `archive/DECISIONS-SOUNDS.md`, word for word.
