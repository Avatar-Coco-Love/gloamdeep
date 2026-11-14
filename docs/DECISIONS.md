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

**D-852 · 2026-11-12 · A bug list** (the owner's pick, recommended;
the owner's wish to say just "Next up") Bugs the owner notices go in
`docs/BUGS.md`, each with its own number, B-001 on, in the owner's
words, with their ideas (offered too: as questions in
`OPEN-QUESTIONS.md`; in `PROGRESS.md`). Next up and "Waiting on the
owner" name them, so a new conversation finds them. Fixed ones move to
`archive/BUGS-FIXED.md`. D-844 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-894 · 2026-11-13 · The health checks' decisions archived** (the
owner's picks, all recommended) Before L1 step 3, with `DECISIONS.md`
at 12,004 of its 12,288 bytes, D-860 to D-862, the two health checks
and their order, all 19 steps done (0.3.308 to 0.3.328), move to
`archive/DECISIONS-AUDITS.md` beside D-868, the audit they fed, word
for word (offered too: D-799, the finds plan, as well, to
`archive/DECISIONS-SURFACE.md`; to `archive/DECISIONS-SURFACE.md`
instead). Its own docs-only version, 0.3.339 (offered too: folded into
L1 step 3's PR). No game change.

**D-899 · 2026-11-14 · The hero may cut a room** (the owner's pick; not
the recommended: only while the stairs and doorways stay in reach;
offered too: as now) A thing set down may cut a room in two, and a tree
may grow back on its stump though it cuts the room; chopping (or
digging, Q-106) is the way through. Its own step; that step marks what
it changes in D-317 and D-322.

**D-900 · 2026-11-14 · Flyers over low things** (the owner's picks, all
four; the recommended was the first) Lampmoths, bats and the lure wisp
fly over what stands low: what the hero built, bushes and fallen
branches, rubble, plinths and braziers, not trees, rock or walls; and
they may go into a tree and vanish there, chopping it driving them out.
Two steps, flying over first; the trees' details proposed at theirs.

**D-901 · 2026-11-14 · Flyers over low things: the build** (the owner's
picks, all recommended; builds D-900) Only the tiles D-900 names are
low; deposits, copper veins, a wild campfire, the lamppost and the
miners' camp still stop a flyer (offered too: each of those). Walking
into a flyer over a low thing strikes it, as over water (offered too:
it can't be reached there). Each low tile, water too, is marked `low`
in the registry (offered too: a list in the creature code). Only the
in-game history tells of it (offered too: the Bestiary's words too).
Claude's call: a flyer knocked by the Warden's Fist into a low thing is
stopped as by a wall, as before.

**D-902 · 2026-11-14 · Numbers in the bag** (the owner's find and
picks, all recommended; they asked for mock-ups first, and for more than
a line of words) The bag card shows what an item does: rows under its
name, each an icon, what it does in grey and its number in gold, then a
small picture where one helps, a weapon's hits on the grid over the held
one's, hearts or oil now and after, a draught's turns (look C; offered
too: chips; rows only). Every item with a number has rows. Steps: the
rows, in the bag and its gear row; then, one a step, the Make tab and
workbench, the peddler's trade and the stash chest (changed after the
owner's answer: places Claude's call, not the pick-up line); then the
pictures, one kind a step. Claude's
calls: the words as on the mock-up page, from the registry
(`core/numbers.js`); on a short screen held sideways the description is
left out when it would reach the buttons.

**D-907 · 2026-11-14 · A weapon's hits on the grid** (the owner's picks,
all recommended) D-902's pictures start: on the bag card and the gear
row, under a weapon's rows, "This one" and "Held now", the hero and a rat
on each tile hit, its hit in red (look C). The weapon in hand: only "Held
now" (offered too: both; none). No weapon: the lantern's 1 (offered too:
left out). The weapon's own hits, no boon's (offered too: with it). The
other cards later. Claude's: one just like the held one counts as it.

**D-908 · 2026-11-14 · Hearts or oil, now and after** (the owner's
picks, all recommended, from a mock-up) D-902's second picture: on the
bag card, under the rows of a find that heals or fills the lantern,
"Now" over "After", the HUD's own hearts and oil bar, twice as big; what
it adds is pale (look A; offered too: B, now → after on one row; C,
"After" only; the HUD's size). What would pass the top is drawn faint
past the end (offered too: not shown; a word under). A boon counts, as
it really heals or pours (offered too: the item's own). Claude's calls:
a minnow's hearts and oil side by side, one under the other where they
don't fit, and left out where they'd reach the buttons, as the hits are;
at full health all of it shows faint; the bag card only for now.

**D-909 · 2026-11-14 · A draught's turns, now and after** (the owner's
picks, all recommended, from a mock-up) D-902's third picture: on the
bag card, under a draught's rows, "Now" over "After", its own HUD mark
twice as big, the rim lit for its time left as on the HUD (D-847); after
is full, as drinking again starts the count over (look A; offered too:
B, a bar of turns like the oil bar; C, its bar beside a full lantern's).
With none working, "Now" shows the mark with its rim dark (offered too:
"After" only). Turns only, no Mending hearts on it (offered too: small
hearts where they come). Claude's: left out where it would reach the
buttons, as the others are; the bag card only for now.

**D-910 · 2026-11-14 · The sixteenth audit** (the owner's picks, all
recommended) At 0.3.353, nothing visible changed. The finds' pictures,
from the flask to the ember, go from `pictures.js` to a new
`src/render/pictures-finds.js` (48 KB to 27 and 22). The in-game
history's 0.3.251 to 0.3.300 go to `src/core/history-0.3-5.js` (59 KB
to 30 and 30). D-897 and D-903 move to `archive/DECISIONS-SURFACE.md`;
the playbook's lines since the last audit, and the four that waited in
0.3.341's, 0.3.342's and 0.3.345's PRs, go to a new `WORKFLOW-6.md`; all
word for word. "Waiting on the owner" lists the any-time and later
questions on fewer lines. Step 19, Lore, stays open: its quests (D-629)
are still to come (offered: ticked, before that was found). A bug hunt
reads the code since 0.3.313: five findings, F-1 to F-5 in `BUGS.md`,
all picked as steps, in order, each fix its own step. The next audit
is at 0.3.393.

**D-918 · 2026-11-14 · The next prompts, in CLAUDE.md** (the owner's
request) `CLAUDE.md`'s PR section now says it too: after a merge, the
next prompts each go in their own fenced code block (D-792), as the
owner wants them every time. D-916 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-919 · 2026-11-14 · The pictures on the stash chest's card** (the
owner's picks, all recommended) D-916's pictures go on the stash chest's
card, as if used now, as on the bag card, for the chest's stacks and the
bag's alike (offered too: the chest's only). Where it is short (a phone
held sideways), the picture is left out where it or the "Tap to move"
line would reach STORE or DECONSTRUCT (offered too: that line gives way
first). Every card has its pictures now; the round map in the dark
(Q-108) is next (offered too: flyers into trees, D-900). D-917 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
