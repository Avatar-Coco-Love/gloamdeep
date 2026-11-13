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

**D-879 · 2026-11-12 · Falls** (the owner's picks, all recommended; step
15 of `HEALTH-CHECK-ORDER.md`, fixes H-16, H-17, H-56) A draught drunk,
or a fire sat by, on a turn that ends in a fall is lost to it: the
draught is used up and Warmed never starts, as a fall ends every
draught and Warmed (offered too: started earlier in the turn, one turn
longer, for the fall to clear). With something set down or lying on the
journey's first tile, a fall wakes the hero on the nearest open tile
beside it, as by a bed (D-737) (offered too: nothing can be set down on
that tile; both). D-876 moves to `archive/DECISIONS-SURFACE.md`, word
for word.

**D-880 · 2026-11-13 · Saves kept safe** (the owner's picks, all
recommended; step 16 of `HEALTH-CHECK-ORDER.md`, fixes H-57, H-21,
H-14) A new upgrade step (journey format 33 → 34) sends home a freed
Peddler an older upgrade lost: one in no room once his room is begun
stands in the waystone's room, not yet having greeted the hero (offered
too: greeted already; back in his room, waiting). A profile slot that
can't be read is made empty and the others kept, and a save that can't
be read, broken or made by a newer version (the profile list or a
journey), is copied word for word under a key of its own before it can
be saved over; nothing is shown (offered too: a line on the slot screen;
a newer save's slot left alone). Each part of a frame (moving, sound,
saving, play time, drawing) has its own safety net (offered too: and a
note on screen while an error repeats). The two old saves that showed
H-57 are kept as tests (`tests/saves/`). D-877 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-881 · 2026-11-13 · The art's loose ends** (the owner's picks, all
recommended, from a picture; step 17 of `HEALTH-CHECK-ORDER.md`, H-51
to H-54, H-60, H-61) The quick slot's picture and the round map are
enlarged exactly 2×, the map's outer pixel row under its ring as the
arrow pad's. The version number is drawn in the game's pixel font at
2×, grey. One dim grey, `#5c566a`, for a line that can't be picked, an
empty slot or an unlit mark; bone `#efe6cc` for bright text, `#fff5d6`
only in flames. Light and glows may stay soft; objects stay
hard-edged pixels (a line in `ART-DIRECTION.md`). The colours one shade
off match the one they meant (the plaque edge `#3a3448` as the art rules
name it), and the torch handles take the woods' browns (D-314). Every
colour only the code had is listed in `ART-DIRECTION-3.md`.

**D-882 · 2026-11-13 · The dev tools** (the owner's picks, all
recommended; step 18 of `HEALTH-CHECK-ORDER.md`, H-38, H-48 to H-50)
The wrench and the sheet's buttons let go of the keys after a click or
tap, so Space waits a turn again; one reached with Tab keeps them
(offered too: Space never presses one). Spawn's Peddler is
moved to the tapped free floor tile from wherever he is, as at home, a bump opening his trade (offered too: moved,
trapped; no Peddler in Spawn). A Torch or Glow Lamp light spawned on a
free floor tile stands on a torch's stone foot, as one set down, never
burning out. A name shared by more than one picture has the code's
word after it ("Campfire · ownEmbers"; offered too: written states).
Room's TIME row comes second, +10, +50 and Grow three across, so Grow
shows on every screen (Grow last on the TIME row, picked first, still
hid on phones). D-878 moves to `archive/DECISIONS-SURFACE.md`, word for
word.
