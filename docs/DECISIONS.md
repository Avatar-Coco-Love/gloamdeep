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

**D-852 · 2026-11-12 · A bug list** (the owner's pick, recommended;
the owner's wish to say just "Next up") Bugs the owner notices go in
`docs/BUGS.md`, each with its own number, B-001 on, in the owner's
words, with their ideas (offered too: as questions in
`OPEN-QUESTIONS.md`; in `PROGRESS.md`). Next up and "Waiting on the
owner" name them, so a new conversation finds them. Fixed ones move to
`archive/BUGS-FIXED.md`. D-844 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-853 · 2026-11-12 · Your own campfire** (the owner's picks, all
recommended; Q-088's built fire) A campfire the hero built has its own
words, found fires keeping theirs: cold ashes, "Light the fire?", "You
laid these stones."; embers, "Your fire still glows."; blazing, "Your
fire burns well." (offered too: no note at all; only the cold one
changes). It can be taken back down only when cold: its cold ashes
offer Take up the campfire?, which puts the Campfire back in the bag,
whole, as the shelf does; a burning one burns down first (offered too:
any time, put out; never). The code: three built twins of the fire's
levels in the registry, the same pictures and rules, their own words
(offered too: a mark on the tile, kept by the room). Claude's calls the
owner may change, shown at the build step: where Take up sits on the
card, and "You already carry a campfire." when one is carried. D-845
moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-854 · 2026-11-12 · Taking up your campfire** (the owner's picks, all
recommended, shown as a picture at the build step of D-853) Your own cold
ashes' card shows three buttons, Yes, Take up and No, No picked as
before (offered too: Take up in No's place, the cross meaning No; the
burning card's way, Campfire over Light and Take up). With a campfire
already carried, Take up says "You already carry a campfire.", free
(offered too: Take up grey). Taken up, it says "You take up the stones."
(offered too: "You pack up the campfire."; no line).

**D-855 · 2026-11-12 · The Peddler by the home waystone** (the owner's
picks, all recommended; fixes B-001, partly supersedes D-492's woods)
Freed, the Peddler goes home to the home waystone's room, as D-753 moved
the stone, no longer Hearthwood's middle room: on the open tile nearest
the room's middle, not the middle, as before (offered too: right beside
the stone; the middle room, with a hint). Claude's call the owner may
change: never on the stone's own 3 × 3, so the way onto it stays clear.
An older save's Peddler already at home in the middle room moves there
once, keeping his greeting, not beaming in (offered too: stays put).
D-847 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-856 · 2026-11-12 · The bed won't sleep in a fight** (the owner's
picks, all recommended; fixes B-002) Bumped at night with a creature
after the hero, the bed sleeps no more than the moon button does
(D-758, D-826): it says "Not with a creature after you.", free, the
same line (offered too: a bed-only line), so a fight can't be slept
away (offered too: the hero lies down and is woken by a bite; those
chasing are still there in the morning). D-848 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
