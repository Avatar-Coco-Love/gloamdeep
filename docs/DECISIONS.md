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

**D-757 · 2026-11-09 · Filling the surface, campfires first** (the
owner's picks; answers Q-090, Q-088's first step) Four things fill the
surface: campfires, more to gather, landmarks and night creatures, about
one thing in each room. Campfires come first; the order of the rest is
picked later. One campfire a seed, in one of Hearthwood's 8 rooms
outside home: blazing, embers or cold ashes, each with its words
("A campfire, burning high. Someone was here not long ago." "The coals
still glow. Whoever sat here is gone." "Cold ashes. No one has sat here
for a long time."). Burning, it lights 3 tiles, embers 2; none burns
down yet. Bumped, cold ashes ask Light the fire?, No picked; Yes makes
them embers for one turn of oil. Claude's calls the owner may change:
each level and room as likely; 2 tiles in from the edge; a line too
long for the strip shows a sentence a bump, and cold ashes' first
sentence on the strip, the rest on the card; "The fire catches."

**D-758 · 2026-11-09 · Sleeping out, step 1** (the owner's idea and
picks, all recommended, and the owner's addition; opens Q-091) In the
owner's words: "I don't like running out of light in the middle of the
night with no oil." From dusk until morning, in a room under the sky,
with no creature after the hero, a moon button shows; it asks "Sleep
here until morning?", No picked, and Yes sleeps until the next morning
in one go as the bed does (D-488), the lantern burning nothing. With no
bed the hero wakes with the hearts they lay down with: no healing, no
gold heart. Step 2 adds Stiff, a mark beside Poisoned: for some turns
after waking, the hero's hits miss 1 time in 3 (its numbers set at its
step). The owner added that places may add their own cost, such as
chilled in snow; that and waking robbed wait in Q-091. Claude's calls
the owner may change: the moon's spot, straight above the lantern
clear of the bag, and its pale blue crescent; "The ground is hard and
cold." and "You wake on the cold ground."; a creature after the hero
is one chasing, or one in the light that has noticed them; the spot
isn't remembered as a bed for a fall (D-737). D-750 to D-752
move to `archive/DECISIONS-SURFACE.md`, word for word.

**D-759 · 2026-11-09 · Sleeping out, step 2: Stiff** (the owner's picks,
all recommended, the mark after its mock-up; D-758) Waking from sleeping
out leaves the hero stiff for 20 turns, counted down by each passed turn
as poisoned is. While stiff, a swing at a creature misses 1 time in 3 by
the seeded dice: the turn passes, nothing is hurt or flashes, and "Your
stiff arm swings wide." is said. Its mark beside poisoned's is a Zz in
the moon button's pale blue; a tap says "Stiff: 1 hit in 3 misses, N
turns left." Waking says "You wake on the cold ground, stiff.", and as
it wears off, "The stiffness wears off." A fall ends it. Claude's calls
the owner may change: a miss makes no sound; a spear's miss misses both;
a bump that wakes one asleep never misses; another night out starts the
count again. D-753 and D-754 move to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-760 · 2026-11-09 · Gathering, oilcaps first** (the owner's picks,
the recommended order and finds, and the owner's addition; builds
D-757, opens Q-092) The surface fills in this order: gathering, then
landmarks, then night creatures. Gathering starts with oilcaps, then
loose stones, then plants and flowers to harvest (Q-092). Oilcaps first:
one in each woods room, home too, none in the mountain rooms, on open
grass beside a tree; picked, it grows back after a day as in the caves.
In an older save only rooms never seen, with nothing taken, get theirs.
Claude's calls the owner may change: beside means a tree straight
beside, not a corner; never on the start, a stick, the mouth's front or
the waystone's ring; each its own tone, as underground. D-755 and D-756
move to `archive/DECISIONS-SURFACE.md`, word for word.

**D-761 · 2026-11-09 · Gathering, step 2: loose stones** (the owner's
picks, all recommended, the look after its mock-up; builds D-760) Loose
stones lie in the mountain rooms only, the woods rooms keeping their
sticks and oilcap: 2 in each, on open grass. Each is a plain Stone,
drawn as the bag's pebble (look A of three), taken by walking onto it.
Picked, it grows back after a day, 300 turns, as the oilcap outside.
In an older save only mountain rooms never seen, with nothing taken,
get theirs. Claude's calls the owner may change: never on the start, a
find, the mouth's front or the waystone's ring; any open grass tile,
not only beside rock; its lines "You pick up a loose stone.", "A stone
from the slope. You keep it." and "You lift a stone from the grass.";
a stone a boulder leaves when the bag is full still never grows back.

**D-762 · 2026-11-09 · Gathering, step 3: herbs outside** (the owner's
picks, all recommended, and the owner's words on flowers; builds D-760,
part of Q-092) The first of Q-092's plants is the cave herb, growing
outside too: one in each woods room, home too, none in the mountain
rooms, on open grass. It is the same herb in every way: hurt, walking
onto it eats it, 2 hearts; at full health into the bag; it makes the
Antidote. Picked, it grows back after a day, 300 turns. In an older save
only woods rooms never seen, with nothing taken, get theirs. Flowers come
at their own steps: more than one kind, each drawn differently, picked
for crafts later, potion making among them, each growing where it suits
its kind (Q-092). Claude's calls the owner may change: never on the
start, a find, the mouth's front or the waystone's ring; any open grass
tile, not only beside a tree.
