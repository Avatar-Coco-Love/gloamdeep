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

**D-892 · 2026-11-13 · L1's build steps and the vault room** (the
owner's picks, all recommended; builds D-891) L1 is built in 4 steps:
the vault room, its braziers and its sealed door, standing still; then
lighting a brazier, a rune notch glowing; then the door opening, staying
open, an unsolved vault resetting; then the prize (offered too: 3 steps;
5, the reset its own). The vault is turned to face its one opening: the
vault above or below for an opening at the top or bottom, beside for one
at the left or right, the gap wherever the opening is (offered too: top
or bottom only). A floor with no one-cell dead end has no vault
(offered too: one set inside a dead-end hall). Nothing else is in it: no
creatures, finds or cache (offered too: creatures; everything as
usual). From depth 8 the same two layouts, the outer room bigger with
the cell (offered too: 11 x 13 in a ring of wall). Bumped, each says a
line, Claude's drafts the owner may change: "A cold stone brazier.",
"Old ash lies in its bowl."; "A sealed stone door.", "A flame rune is
cut into it." (offered too: nothing). Their names: Brazier, Sealed door
(offered too: Lightkeeper's brazier and door; Fire bowl, Rune door).
Claude's calls: never the peddler's, the locket's or a waystone's room;
the vault 3 tiles deep; the crypt's own bricks at every depth. Step 1
built at 0.3.337. D-889 moves to `archive/DECISIONS-SURFACE.md`, word
for word.

**D-893 · 2026-11-13 · The lit brazier** (the owner's picks, all
recommended; builds D-891, D-892) Lit, a brazier's violet band brightens,
its ash turns to coals and the torch's orange flame sways in its bowl in
3 frames, like a blazing campfire's (offered too: a violet flame; an
orange flame with a violet heart). It lights 2 tiles round it in the
torch's warm colour, as a campfire's embers do (offered too: 3 tiles;
violet, 2 tiles). Bumped cold with the lantern lit, it opens the ask
card: the text line says "A cold stone brazier.", the card "Light the
brazier?" over "Old ash lies in its bowl.", No picked, Yes grey with
less than 5 turns' oil; Yes says "The brazier catches." and passes a
turn. Lit and bumped, it says "A brazier, burning.", then "Its flame
burns steady.", free (offered too: "The old fire wakes."; nothing). With
the lantern out, a cold brazier says its old words, no card (offered
too: the card, Yes grey). Claude's calls: the door's left notch glows
first; the campfire's lighting sound. Mock-up: https://claude.ai/artifact/WU3SNjtFvV5VPVqq7qTc73 Step 2 built at 0.3.338. D-890
moves to `archive/DECISIONS-SURFACE.md`, word for word. Its notches moved
to the lintel above the door by D-895 (2026-11-13).

**D-894 · 2026-11-13 · The health checks' decisions archived** (the
owner's picks, all recommended) Before L1 step 3, with `DECISIONS.md`
at 12,004 of its 12,288 bytes, D-860 to D-862, the two health checks
and their order, all 19 steps done (0.3.308 to 0.3.328), move to
`archive/DECISIONS-AUDITS.md` beside D-868, the audit they fed, word
for word (offered too: D-799, the finds plan, as well, to
`archive/DECISIONS-SURFACE.md`; to `archive/DECISIONS-SURFACE.md`
instead). Its own docs-only version, 0.3.339 (offered too: folded into
L1 step 3's PR). No game change.

**D-895 · 2026-11-13 · The door opening** (the owner's picks, one the
owner's own; builds D-891 to D-893) The door's 2 notches move off the
slab to the lintel above it, in a dark socket in the wall's cap,
glowing violet one a lit brazier, the left first, sealed or open (the
owner's idea: lit parts outside the door, so it opens fully; offered
too: on the jambs; on the slab, its top left as a sill). Once both
braziers burn the slab is gone: the doorway fully open and dark, a worn
line at its foot, walked through, light passing; the Open door (offered
too: Vault door). Lit last, the brazier says "The stone door sinks
open." (offered too: "With a groan, the slab sinks into the floor.";
nothing more). Left with a brazier still cold, the vault room's lit
braziers go cold again as the hero steps out, the oil spent (offered
too: on leaving the floor). Mock-up:
https://claude.ai/artifact/CdnkJkW2gd98jGn8Wi5hpb Claude's calls: the
line said in "The brazier catches."'s place, as the strip holds one
line; no new sound for now. D-891 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
