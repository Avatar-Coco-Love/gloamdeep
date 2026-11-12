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
moves to `archive/DECISIONS-SOUNDS.md`, word for word. Its card's
heading, Yes and No superseded by D-849 (2026-11-12).

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
D-840 moves to `archive/DECISIONS-SOUNDS.md`, word for word. The turns
beside the mark superseded by D-847 (2026-11-12).

**D-847 · 2026-11-12 · The timer rim** (the owner's idea and picks, all
recommended; supersedes the turns beside D-845's, D-791's and the other
draughts' marks) A lasting effect's mark loses its number: its square's
edge, 52 dots from the top middle going round like a clock, lights in
the mark's colour for the share of time left (offered too: burning down
like a candle). Full is that effect's longest time, from the registry,
so embers' 30 turns start Warmed half lit (offered too: full at
whatever it started with). A tap on the mark still says the turns left
(offered too: nowhere). Claude's calls: any time left lights at least
one dot; poisoned's and stiff's marks keep no rim for now. That last
call superseded by D-848 (2026-11-12).

**D-848 · 2026-11-12 · Bad marks: a rim and red glass** (the owner's
idea and picks; supersedes D-847's no rim for poisoned and stiff)
Poisoned's and stiff's marks get the timer rim too, full at their
longest time, poisoned 6 turns and stiff 20, so a poison a worn find
shortens starts part lit (recommended; offered too: full at whatever it
started with). The bad marks, poisoned and stiff, sit on dark red glass
instead of the night glass; the good ones are unchanged (offered too:
a small red minus or green plus in a corner;
the bad ones first with a red line under them; no sign for now).

**D-849 · 2026-11-12 · Feeding a campfire** (the owner's picks, all
recommended; Q-088's feeding) A burning fire's card shows Sit and Add
wood (offered too: Put on the fire from the bag beside one; Add wood?
asked after sitting). Add wood takes 1 Wood and a turn and raises
embers a level, to blazing (offered too: 2 Wood a level; 1 Wood to
blazing from anything; free). Only embers take wood: blazing takes no
more and cold ashes are still lit with oil (offered too: wood lighting
ashes too; feeding blazing to bank more sits). Add wood is grey with no
Wood or on a blazing fire. Claude's calls the owner may change: the
card's heading is Campfire, over its words as before; no No, the cross
closes it; Sit picked, else Add wood; "You add wood. The fire burns
high."; no sound of its own yet. D-842 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-850 · 2026-11-12 · Building a campfire** (the owner's picks, all
recommended but where; Q-088's building) A campfire is made on the bag's
Make tab, then set down beside the hero with Set down, as the mortar and
torch are (offered too: built straight on the ground from the bag; at
the workbench). It costs 3 Stone and 2 Wood (offered too: 4 Stone, 3
Wood; 2 Stone, 2 Wood). It goes only on the surface, for now, by the
workbench's rules (offered too: below ground too, the torch's way, at
first with no limit, then once it burns to cold ashes there, gone; home
only). The owner asked what Claude truly thought of anywhere: a fire in
the dark fits the game best, but one that never burns out by itself
would make a safe base deep down, against the oil running low; the
caves may come later as their own step. Set down, it is cold ashes, lit
with one turn of oil as before (offered too: embers; blazing). The
find's name, look and words come at its step. D-843 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-851 · 2026-11-12 · The campfire in the bag** (the owner's picks, all
recommended; D-850's name, look and words) In the bag it is the
Campfire, "Makes a Campfire" on the Make tab (offered too: Fire Ring;
Firepit). Its look is the cold ashes' picture, as it is set down
(offered too: 3 stones piled on 2 logs; the ring round fresh logs).
Its words: "Stones and wood for a campfire.", "Set it down on the
surface.", "Light it with a little oil."; "You make a campfire."; set
down, "You lay the stones in a ring." (offered too: warmer words; the
mortar's way). One is carried at a time, "You already carry a
campfire." (offered too: up to 3; up to 5). The code: the campfire
holds its own recipe, `made`, so its button stays Set down (offered
too: Stone holding two recipes; a recipe-only entry). D-827 moves to
`archive/DECISIONS-AUDITS.md`, D-846 to `archive/DECISIONS-SOUNDS.md`,
word for word.
