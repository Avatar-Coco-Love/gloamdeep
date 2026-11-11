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

**D-834 · 2026-11-11 · The oil's warning** (the owner's picks; part of
Q-095) All the "Maybe" sounds are wanted: the heartbeat at the last heart,
sounds all around and music too, one step each, the oil warning first.
The owner keeps Claude's picks (D-833) for now. From a board of 4 (two
sputters, two small pops, a draught in the flame, the lantern rattling),
the recommended one: two short sputters cut from the empty lantern's own
crackle (`Fire-017`), the second softer and lower. It plays with "The
flame is getting low." as the oil falls under 20% (D-096), once on the
way down, and again only after the oil has gone back above it (offered
too: both at 25%; the sound at 25% and the line at 20%). With a flask in
the bag poured by itself at 55%, it plays only when none is left. One
Settings line under Steps, Oil runs low. File and loudness in `SOUNDS.md`.

**D-835 · 2026-11-11 · The heartbeat at the last heart** (the owner's
picks, both recommended; part of Q-095) From a board of 4, each beside
poison's double throb (a soft lub-dub twice; one slow heavy beat; a
racing heart, three quick beats; a wooden knock-knock): a soft lub-dub
twice, the second fainter. Impact Sounds' impactSoft_medium 001 then 002
at 0.8 and 0.74 pitch, muffled above 350 Hz, 0.17 s apart, at 0.36 and
0.25, then again 0.8 s later at 0.25 and 0.17: four quick soft knocks,
where poison has two slow punches. It plays once, as a turn leaves the
hero on one heart from more, 0.7 s after the bite's blow or poison's
throb; again only after a heart has come back and gone again; a fall,
waking at full hearts, does not (offered too: again every few steps;
beating on its own in time). One Settings line under Fighting, Last
heart. D-830 moves to `archive/DECISIONS-SOUNDS.md`, word for word.

**D-836 · 2026-11-11 · A cave's drips** (the owner's picks, all
recommended; part of Q-095) Sounds all around begin with drips in the
caves. From a board of 4 (a drop and its ripple; a single plip; a clear
plink; a far-off drip), the first: the elemental pack's Water-009 at 1.2
pitch, straying a tenth, at 0.1, through the cave's echo as the stone
steps. One drip every 8 to 16 seconds, the gap picked at random each time
(offered too: every 3 to 6; every 20 to 40), in real time while play
shows the rock caves, floors 2 to 4 (offered too: every stone floor
below; every floor below), each placed a little left or right (up to
0.6 of the way; offered too: always in the middle). Leaving, or a card
over play, stops them. They follow Finds' loudness and share Places'
line, as Finds' list is full on the smallest card (offered too: their
own line under Steps; Coins and Shelf joined). D-831 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-837 · 2026-11-11 · Music on the surface** (the owner's picks; part of
Q-095) The Tallbeard bundle's pre-2023 and Troubadeck zips (Abstraction,
CC0, checked in their licence) came through a temporary GitHub release;
Tom Feldmann's Wild Music Pack can follow. From a board of 8 calm tracks,
picked by measuring all 139 (each non-stop or with a 30 s, 60 s or 2 min
gap), track 6, "Ludum Dare 30 06" (2 min), plays on the surface by day and
by night, home too, non-stop with no break (offered too: with a 30 s,
60 s or 2 min gap). Leaving the surface fades it out over 2 seconds
(offered too: stopping at once; playing on everywhere); back on the
surface it starts from its beginning a second later, fading in over a
second. None plays on the title or below, for now. Music is a fifth kind
in Settings with its own loudness, 50% until picked (offered too: full;
a quarter; one On or Off switch; a line under Menus), and one line in its
list, Surface; a change of Music's loudness ticks. Each other place's
music is its own step. File and loudness in `SOUNDS-3.md`. D-832 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-838 · 2026-11-11 · Music in the rock caves** (the owner's picks, all
recommended; part of Q-095) From a board of 8 calm, dark tracks for
floors 2 to 4 from the same bundle, measured again from all 138 (darkest,
sparsest, slowest, mostly minor; the surface's tune beside them to
compare), track 1, "The Vile Grove" (2 min), plays in the rock caves,
floors 2 to 4, the same floors as the drips (offered too: every floor
below), non-stop with no break, the drips over it (offered too: with a
30 s, 60 s or 2 min gap; offered too: VGMA Challenge 19, Patreon
Challenge 05, Ludum Dare 30 05). It changes as the surface's does: the
old place's tune fades out over 2 s, the new one starts a second later,
fading in over a second; from floor to floor within the caves it carries
on (offered too: starting again on each floor; a crossfade). A second
line in Music's list, Rock caves. File and loudness in `SOUNDS-3.md`.
D-833 moves to `archive/DECISIONS-SOUNDS.md`, word for word.
