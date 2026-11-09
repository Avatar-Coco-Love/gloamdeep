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

**D-733 · 2026-11-09 · A bigger surface, the plan** (the owner's picks,
all recommended but where a fall wakes; builds D-182 to D-184, answers
Q-081) The surface grows to Hearthwood's 3 × 3 rooms, mountains in the
north row, woods elsewhere, home in the centre (D-182, D-183). A new
journey no longer begins in the crypt nor at home or the cave: the seed
picks one of the south woods rooms, never the cave's, and the hero walks
north to find the waystone. A fall wakes the hero (the owner's own
answer): in the last bed slept in; with none, at the home waystone once
woken; otherwise in the room where the journey began. The rooms differ:
mountain rooms, and woods from thick to open glades, the seed picking.
The order, one step each: 1 the 9 rooms, all woods, walking off an edge
into the next; home stays today's woods room, so what was set down keeps
its place, and the cave mouth moves to a room beside home (D-184); 2 the
south start, its teaching goal's words with it; 3 waking after a fall
(supersedes D-119's crypt when built); 4 mountain rooms; 5 thick woods
and open glades. Nothing is built yet. D-712 and D-713 move to
`archive/DECISIONS-GOALS.md`, word for word.

**D-740 · 2026-11-09 · The twelfth audit** (the owner's picks, all
recommended) At 0.3.192, nothing visible changed. A conversation's start
reads 10.2 KB, not 10.5. The in-game history's stage 0.3 file is split
again word for word: 0.3.76 to 0.3.150 go to `src/core/history-0.3-2.js`
(60 KB to 22 and 39). D-699 moves to `archive/DECISIONS-AUDITS.md`, and
D-734 to D-737, built, to `archive/DECISIONS-SURFACE.md`; ticked steps
21 and 22 are archived; all word for word. The start-up hook's message
names the commit checked out, not the old local `main` a shallow cloud
copy keeps. `WORKFLOW.md` gains what this stretch taught. One bug hunt
read the code since 0.3.152; its findings are listed for the owner to
pick from (https://claude.ai/artifact/NYbJtLXs97xmn7s1YBV4kK), each fix its own small step with a test.
The next audit is at 0.3.232.

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

**D-742 · 2026-11-09 · The bug hunt's fixes** (the owner's picks, all
recommended; the owner asked that every known bug be fixed, in one PR;
answers D-740's list) All nine findings are fixed, each with a test.
B1: cutting a path between Hearthwood rooms clears a fallen branch or
berry bush in its way, as a tree. B2, B3: one save upgrade (20 → 21)
makes each north room never seen, with nothing taken, today's mountain
room, cuts every Hearthwood room's paths again, and brings the copies a
fall and the dev Reset read up the same way, home's without the old
mouth. B6: a goal the journey's start skips, waiting in an older
profile, is ticked quietly, unpaid, and not listed. Claude's calls the
owner may change: B4, goals done on one turn each roll their reward
with the goal mixed in; B5 and T1, the unguarded flask and the rat
pack roll with salts of their own, so unvisited rooms may change; T2, a
spit grub's glob flies over a pile of bones; T3, a scorpion's tail
raised as the hero left is lowered when they come back (a fall that
wakes in the same room still keeps it).

**D-743 · 2026-11-09 · Words that fit** (the owner's picks, all
recommended; the owner asked that words running past a card's edge,
upright and elsewhere, be found and fixed, ready for what is added
later) Every card was drawn at upright and sideways phone sizes with
all content; six places failed. A quest's how wraps, and a done goal's
reward goes on its own grey line under it where it doesn't fit beside
the goal. A Journal list taller than its card (Records, the Bestiary,
a creature's page, Feats, Quests) scrolls a row at a time by a swipe,
the wheel or Up and Down, a page by Page Up and Down, with the thin bar
Version history has; upright the Bestiary is one table, sideways two
scroll together. The goal line's words wrap so it ends left of the
round map. A test draws every card at those sizes with every item,
creature, goal and boon, and fails when words leave a card or overlap.
Claude's calls the owner may change: in the stash chest, a long name
level with STORE wraps short of it, and the grey hint is left out where
it would pass the card's foot; Up and Down on the Bestiary's table
still pick a row, kept in view.

**D-745 · 2026-11-09 · The broken seal, the crypt's way in** (the owner's
idea and picks, all recommended; supersedes D-744's looks for this way in;
mock-ups at https://claude.ai/artifact/B8QBEGU6jtmhF9MEhoWn7q) The way in
from the woods leads into the crypt, so it is a crypt's door, not a cave
mouth. Of three looks (the Lightkeepers' door, the broken seal, the tomb
gate) the owner picked the broken seal: a doorway of the crypt's bricks
under a pale stone lintel with a carved flame, bricked up long ago, a hole
broken through, fallen bricks on the grass. On a side or bottom edge the
wall's top shows from above along the edge, pale posts at each end, broken
open between. The worn path in front stays. Every world has it. The small
arch and the craggy cave are kept for later cave mouths into caves (the
registry's `caveLooks`), and the overgrown mouth waits with them; its step
comes off the plan. Walking is unchanged. Claude's calls the owner may
change: the tile keeps its id and name in the code (`caveMouth`), so saves
stay as they were; the drawing is `src/render/seal.js`.

**D-746 · 2026-11-09 · Find the crypt** (the owner's idea and picks,
all recommended; builds D-745) Once the way in is the crypt's door, a
new teaching goal sends the hero there: "Find the crypt", its how line
"A broken door, beside home.". It shows once "Take a boon" is done and
is done on walking into the crypt through the broken seal, paying a
reward as every goal does (D-706). Only the crypt's own rooms count,
not other places below the surface, as more ways down will come (the
owner's pick; changed after review: any depth below no longer counts).
Claude's call the owner may change: it is ticked quietly, unpaid in the
line, when the crypt was reached already this journey, as in a journey
begun in the crypt.

**D-747 · 2026-11-09 · Smooth rock edges, and what to polish** (the
owner's picks; builds D-739's step 24; mock-ups at
https://claude.ai/artifact/DjvVKCpbeuDBnTBeTVmMcz) A look through all nine
surface rooms found four things that look unnatural: the mountain rock's
torn edges, star-shaped ponds with dripping rims, busy camouflage grass,
and one tree stamp in rigid rows. The owner picked the rock first, and its
look A: smooth edges, no loose pixels, nothing else changed. The edge's
wobble is smooth noise, not a new random value every 3 pixels, and a lone
pixel or spike is cleaned off. Caves keep their own rock as it was. For
the trees, later, look A: still one round tree a tile (D-209), varied in
size, place and three greens. For the ponds the owner likes both today's
and the round, smooth look, and asked for a variation of that, shown as
mock-ups at the ponds' step. Claude's calls the owner may change: the
order after the rock is ponds, grass, trees, one a step; the grass's look
is asked at its step; the code is `mask`'s `soft` in `src/render/rock.js`.

**D-748 · 2026-11-09 · Ponds halfway to round** (the owner's picks, both
recommended; builds D-747; mock-ups at
https://claude.ai/artifact/EQfp8wLasizEnWkwonaWPi) Of four pond outlines,
from today's to round, the owner picked B, halfway: half the tiles' blend,
half a soft round blob on each water tile, the edge wobbling smoothly, a
lone pixel cleaned off and a notch filled, so no star shapes and no
dripping rim. The same tiles are water, so walking, fishing and the map
are unchanged. Cave pools keep their own edge, as the caves' rock did.
Claude's calls the owner may change: the code is `inPond` in
`src/render/water.js`, chosen by the room's woods look; next is the grass.
