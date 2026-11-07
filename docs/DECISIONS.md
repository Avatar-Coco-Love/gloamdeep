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

**D-652 · 2026-11-07 · More content first: poison and a 15th kind**
(the owner's picks, all recommended; builds D-604, D-607, D-636, D-641,
D-643; supersedes D-643's "biome 1 ends with 14 kinds") More content
comes before the side rooms are filled further (the owner's wish).
Creatures that leave a debuff on the hero come first, then creatures
that attack from range, each with ways for the hero to defend against
it. The first debuff is poisoned, from Venom (D-636): its numbers are
set at its step, and it shows as a mark beside the boon's (D-604). It
comes with a new kind, biome 1's 15th, as D-607 allows; Claude shows 2
or 3 drafts from the list (Q-076) with mock-ups first. The defences,
each its own step: the drafted Antidote (1 Snapcap Gill, 1 herb), a
charm against poison for biome 1, and Tough on the Growth tree. Raw
things below the caves wait (the owner's pick); copper is only the
first of many tiers. D-641 moved to `archive/DECISIONS-CHECKUP.md`,
word for word.

**D-654 · 2026-11-07 · The centipede and poisoned** (the owner's picks;
mock-ups: https://claude.ai/artifact/TC6h4vyTP2niDGBdLZCF6w; builds D-636,
D-652; answers part of Q-076) Biome 1's 15th kind is the centipede, look
A: side on and facing right, rust red with pale legs and green fangs. It
chases; 2 hearts, bite 1, and its bite leaves the hero poisoned; in the
pool from depth 3. Poisoned lasts 6 turns, 1 hurt every 3 turns, 2 in
all; a new bite starts the count again and never stacks. It stops at 1
heart, never taking the last, until the Antidote is in (the owner's
words). It shows as a green drop mark beside the boon's, a line as it
starts and as it wears off, and each heart it takes flashes green.
Drafts the owner may change: a Centipede Leg, about 1 in 2, sold for 1,
and a rare Venom Sac, about 1 in 10; the lines; venom's pale green.
Built next, in one step with a playtest. D-643 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-655 · 2026-11-07 · The Antidote** (the owner's picks, all
recommended; mock-ups: https://claude.ai/artifact/L562fL7GhmfZZWUXS9UwBM;
builds D-652, D-654) The Antidote is made in the bag: Make on a Snapcap
Gill takes 1 gill and 1 herb, a turn passing. Drink ends poisoned and
heals nothing; not poisoned, it stays, with a line, and no turn passes.
Its look is B, a tall thin green vial under a cork. With it in, poison
can take the last heart, and the hero falls. Drafts the owner may change:
5 a stack, never sold, its lines. D-644 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-656 · 2026-11-07 · The Centipede Charm** (the owner's picks, all
recommended; mock-ups: https://claude.ai/artifact/T4UJp8WKEEDY141YhkSscq;
builds D-458, D-652, D-654) The charm against poison is the Centipede
Charm, made at the workbench, its slot after the rod, from 3 Centipede
Leg and 1 Copper Ore (the leg's first use); one is carried or worn, and
Wear puts it on, free. Worn, poisoned lasts 3 turns, not 6, so it takes
1 heart, not 2; every bite still poisons, so the Antidote still matters.
Its look is A, a drop of venom's pale green in the other charms' copper
setting. Drafts the owner may change: its lines. D-645 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-657 · 2026-11-07 · Tough** (the owner's picks, all recommended;
mock-ups: https://claude.ai/artifact/2rj6CKmu1PHoRfd8cMrgsv; builds D-462,
D-639, D-652, D-654) Tough is Body's second upgrade, 1 ember, bought once.
With it, a bite that hurts poisons the hero only about 1 time in 2, by
the seeded dice; when it does, poison runs as before. So each defence
has its own job: Tough stops some poison, the Centipede Charm shortens
it, the Antidote ends it. It sits in Body's first row, above Heart: the
row now holds two places stacked, the first of D-639's 4 or 5 a branch,
and Body's locked row moves up one. Drafts the owner may change: its
words, its drawing. Built next, in one step with a playtest. D-646 moved
to `archive/DECISIONS-CHECKUP.md`, word for word.

**D-658 · 2026-11-07 · Ideas from the review** (the owner's pick,
recommended) The ideas from the project review are kept in
`RESEARCH-2.md`, "From the project review"; none is decided. Next comes
Next up: the ranged creature's drafts (D-652), using its ideas there.

**D-659 · 2026-11-07 · The Spit grub** (the owner's picks, all
recommended but its name; mock-ups:
https://claude.ai/artifact/1npk26Bc9jNc4G2gNYixB9; builds D-349, D-652,
D-658; answers part of Q-076) The first creature that attacks from range
is the Spit grub, draft A, biome 1's 16th kind, in the pool from depth
4. It never moves. When it sees the hero's lit lantern along a clear
row or column, up to 5 tiles away, it spits a glowing glob that moves
1 tile a turn down that line, so the hero can step out of the way; it
then rests 2 turns. Only the lit lantern: with it off the grub can't
see the hero, and the hero sees only the grub's and the glob's glows.
Walls and rubble, whatever blocks light, stop the glob. Its next move
shows as the others' do. Drafts the owner may change: 1 heart, spit 1,
the 5 tiles and 2 turns. Its look, drop and lines are shown with
mock-ups at its build step. D-647 moved to
`archive/DECISIONS-CHECKUP.md`, word for word.

**D-660 · 2026-11-07 · The tenth audit, part 1** (the owner's picks, all
recommended; the owner asked for a fuller audit) At 0.3.113, nothing
visible changed. A conversation's start reads 10.1 KB, as at the ninth.
Floor layouts are made about 5 times faster with the same floors (6,000
seed and depth pairs checked), and the slowest test is split in three
to run side by side: `npm test` 59 s to 35 s. Touch in play moves from
`main.js` (39 to 35 KB) to `src/input/touch.js`, word for word but for
`heldAt`. `CONTENT.md`'s finds move to `CONTENT-FINDS.md`, the second
half of `WORLD.md` to `WORLD-2.md`, word for word; D-648 to D-651 and
D-653 to `archive/DECISIONS-BIOME-1.md`; ticked steps 18 and 18b are
archived. Four bug hunts, a docs read-through and a phone speed check
read the code alongside: 19 bugs, about 30 stale doc lines and one
freeze on depth 2's first frame, listed for the owner to pick from
(https://claude.ai/artifact/FjFbsg9mGELYQB2aCap496); each fix is its
own small step with a test. The next audit is at 0.3.152.

**D-661 · 2026-11-07 · The audit's first fixes** (the owner's picks, all
recommended; from D-660's findings) The fixes start with the four most
serious, one a step, each with a test. First, at 0.3.114, I1: a still
press becomes a hold only in play, so on the title, a menu or a card,
letting go is a tap however long it was held (D-408's hold in play is
unchanged). Picked for later steps: R2, the armour's glance gets dice of
its own, so drops stay as every seed gives them and only which bites
glance changes; W1, bringing an old save up to date removes only the
sticks on the waystone itself, as D-589 says, and what lies in the ring
round it stays. R1, the waystone's own event name, is the next step.
