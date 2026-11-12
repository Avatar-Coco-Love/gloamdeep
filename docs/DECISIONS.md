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

**D-860 · 2026-11-12 · The health check's steps** (the owner's picks,
all recommended and more) A full health check at 0.3.304, no game code
changed: play in a browser, all of `src/` read against the decisions
and docs, 31 findings, H-01 to H-31, each with fixes offered. The owner
picked all but three to become steps, one at a time, each fix still the
owner's pick at its step: the gold heart and the full bag first, then
the clear bugs, the decision gaps, the balance pair, sounds only when
On, the small fixes, save safety, and one docs-only step (offered too:
only the top two; the docs folded into the audit). H-22 to H-24 and
H-31 wait for the 0.3.312 audit. The list: `HEALTH-CHECK.md`. D-851
moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-861 · 2026-11-12 · The second health check's steps** (the owner's
picks, all recommended) A second health check at 0.3.305, no game code
changed, of what the first (D-860) did not reach: fishing, the Peddler,
waystones and boons, campfires, the mortar, the mountain rooms, depths
4 to 12, falls, the look creator, the Seed Explorer, the dev panel,
`src/render/` against the art rules, the game's words, and old saves of
every format, played on a phone and a PC. 35 findings, H-32 to H-66.
The owner picked every one players can see to become steps (offered
too: only most and some players; only most players), the art ones as
one step where the owner picks from a picture (offered too: each its
own; all at the audit), and the docs into the first list's docs step,
the stale comments into its audit list. Not picked: the dev tools'
four, H-38 and H-48 to H-50, kept in the report. Claude's call the
owner may change: they come after the first list's steps. The list:
`HEALTH-CHECK-2.md`. D-853 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-862 · 2026-11-12 · The health check's order** (the owner's picks,
all recommended) The dev tools' four, H-38 and H-48 to H-50, become one
step (the owner's ask). Both lists' steps go in one order, grouped where
they share a cause or a card, the most noticed first: 19 steps in
`HEALTH-CHECK-ORDER.md` (offered too: the same groups in list order;
one finding a step). No new content until all are done. The five
things seen with no decision become Q-098 to Q-102 (offered too: steps;
left in the report). The audit stays at 0.3.312 (offered too: after
the steps). The branch `claude/gloamdeep-health-check-2-5uv4gm`, the
second check's scratch work, all its findings in the report, is kept
until H-57's step tests with its two old saves (offered too: its save
tester into `tools/`; deleted now). D-854 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-867 · 2026-11-12 · The Look card's tabs and keys** (the owner's
picks, all recommended; step 5 of `HEALTH-CHECK-ORDER.md`, fixes H-34,
H-37) The Look card's tabs are 20 game pixels tall: with the gap, a
44 px tap at 2× (D-513). The boxes stay 2× as the big hero drops to 5×
on a 390 px phone; the smallest view shows 2 rows of choices, scrolling
(offered too: 17 tall, about 38 px; drawn as now, taps reaching up).
Up from RANDOM or OK goes to the open tab, keeping a rolled look
(offered too: up to the picked choice). This step is 0.3.312; the audit
is next, at 0.3.313 (offered too: audit first; after all 19 steps).
D-859 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-868 · 2026-11-12 · The fifteenth audit** (the owner's picks, all
recommended) At 0.3.313, nothing visible changed. main.js's sounds,
`hear` and the menu sounds, go to a new `src/hearing.js` (48 KB to 43).
The Version history loads only when it first opens, from a new
`history-all.js`: a start fetches 12 files and 328 KB fewer (H-23); the
playtest's packer learns `import()`. The stale comments are fixed (H-31,
H-66), the events list gains its 7 missing kinds. Older iPhones and
`.ogg` go on `STORE.md`'s list, to test on a real one first (H-22).
H-24's three risks and the unused `craft()` are the next step, 0.3.314
(offered too: in this audit; just noted). The done health check findings
go to `archive/HEALTH-CHECK-DONE.md`, D-826 to `archive/DECISIONS-AUDITS.md`,
D-863 and D-864 to `archive/DECISIONS-SURFACE.md`, the playbook's lines
to a new `WORKFLOW-5.md`; all word for word. The next audit is at
0.3.353.

**D-869 · 2026-11-12 · H-24's three risks, and craft() out** (the
owner's picks, all recommended) A broken deposit or copper vein never
grows back on a waystone's ring, the tiles its room kept open as it was
made: 2 round a generated room's stone, 1 round the home one (offered
too: 1 everywhere; left as it was). A drop with no open tile on or among the
8 round it looks ring by ring further out, nearest first; only with
none in the room does it stay on its own tile (offered too: left on the
bush or bed; left as it was). Dev Spawn puts no item, creature or wall
on a person, as on the hero; floor still can (offered too: an item
may). The unused `craft()` and `canCraft()` go; their tests use the Make
tab's `makeFrom` (offered too: the craft-only tests deleted). D-865
moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-870 · 2026-11-12 · One words page** (the owner's picks, all
recommended; step 6 of `HEALTH-CHECK-ORDER.md`, fixes H-12, H-15, H-20,
H-39, H-40, H-41, H-43, H-45, H-47) A find's name capitalises every
word, in lines too: Oil Flask, Healing Herb, Healing Potion, Stash
Chest, Glow Lamp; a creature's, tile's or place's only its first (Cave
spider) (offered too: every name; one capital for all). The mortar's
too-few lines say "Need 2 Mimic Leaf, 1 Healing Herb.", short to fit, as
the charms' do. A stuck mole far off says "The mole bursts up out of
the earth!" (offered too: one line for both). Kind Herbs: "Herbs,
potions and fish heal 1 heart more." (offered too: the bed, fire,
bedroll and Mending Draught heal more; "Anything you eat"). How to
play: Pick, "Hold it to break veins"; Keyboard rows Bag: I and Map: M;
Touch and Mouse one row, "Bag, map: Their buttons", to fit 8 lines
(offered too: Keyboard only; a shorter Walk). A mark's last turn says
"1 turn left." The Bestiary: the lure wisp drifts "toward another
creature if there is one"; the bone rat, "Knocked down, it falls into
a pile of bones". Settings' "Run ends" is "Journey ends". D-866 moves
to `archive/DECISIONS-SURFACE.md`, word for word.
