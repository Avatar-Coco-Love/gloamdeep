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

**D-890 · 2026-11-13 · The puzzle rules and the first four** (the
owner's picks, all recommended; answers most of Q-105) The six puzzle
rules in `PUZZLES.md` hold for every puzzle. Rule 4's solver is built
only when the seed first lays a puzzle out; until then each puzzle is a
fixed layout, checked by hand (offered too: the solver first; settle it
at the first generated puzzle). The first four, in order: L1, the
braziers and a sealed side vault; L3, the dark door; P1, the Fist and
a plate; then T1, the gloam tide (offered too: L1 with P1 second; L3
first; pick after each). Biome 1's boss and found ability (G3, W4) are
planned after the first two are built (offered too: now; after all
four). Each one's tiles, names, numbers and rewards are its own step.
D-887 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-891 · 2026-11-13 · L1, the braziers and the sealed vault** (the
owner's picks, all recommended; builds D-889, D-890; answers part of
Q-105) A vault room holds 2 braziers, a tile pair (cold, lit), and a
sealed door, a pair (sealed, open), whose flame rune glows one violet
notch for each brazier lit; once both burn the slab sinks to a sill and
stays open, the braziers lit, for good; left unsolved, they go cold
again (rule 5) (offered too: 3 braziers; 2 to 4 by depth). The brazier
is a crypt-stone fire bowl on a foot with a violet band, solid, light
passing over it, like the campfire (offered too: an iron tripod; a wall
niche). Bumped with the lantern lit, lighting one costs 5 turns' oil,
grey with less (offered too: 1 turn's, as a campfire's ashes; 10).
One vault a floor from depth 2: the seed turns one dead-end room into a
vault, a fixed 11 x 13 layout checked by hand, drawn in the crypt's
bricks wherever it stands (offered too: about 1 floor in 2; only from
depth 8). The owner's addition: vaults will hold different puzzles
(L3, P1, T1 and more, as each is built) and different rewards. The
reward is one prize the seed draws per vault: a rare material or an
ember, "and maybe other things" (the owner's addition; offered too: the
cache behind the door; lore pages later). How the draw is weighted, the
lines and the room's layout are the build step's. Mock-up:
https://claude.ai/artifact/7Cy1QZoyguCTarQkPWkJQZ
D-888 moves to `archive/DECISIONS-SURFACE.md`, word for word.

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
