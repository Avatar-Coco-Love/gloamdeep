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

**D-764 · 2026-11-09 · Dimmer doorway lines** (the owner's picks, both
recommended, after a mock-up; changes D-225's brightness) The owner
found the pale blue doorway lines too bright. In the game they are now
about half as bright: they pulse from 30% to 50% strength, steady at
45% with reduced motion. The fainter inner line stays 40% of the bright
one. The map's doorway squares stay as they were.

**D-765 · 2026-11-10 · Names with spaces and digits** (the owner's
picks, all recommended; answers Q-054; changes D-272 and D-683) A name
may hold letters, digits and spaces, still up to 12. The name pad gets a
123 key, as on a phone: it swaps the letters for 1 to 8 across the top
row and 9 and 0 under them, ABC swaps back, and the bottom row stays: M,
Del, Z, Space, 123 or ABC, OK. Spaces are tidy: never first, never two
in a row, one at the end dropped on OK. Space on a keyboard types a
space, and digits type too. Claude's calls the owner may change: the
Space key reads SPC; on a narrow card a word too wide for its key is
drawn at half size; the pad opens on its letters. D-757 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-766 · 2026-11-10 · Three creatures' drafts kept, two additions**
(the owner's picks) Claude's drafts in D-728 (the rat pack), D-729 (the
scorpion) and D-731 (the bone rat) are kept as built. Two additions,
each its own step: a rat pack that notices the hero says a warning line,
varying between "The pack closes in!", "Rats squeak all around you!" and
"A pack of rats comes for you!" (lone rats stay silent); and the
scorpion's sting also hits a creature on its marked tiles, 2 hearts, as
it does the hero (changes D-729's "it strikes only the hero").

**D-767 · 2026-11-10 · The rat pack's warning** (the owner's picks, all
recommended; builds D-766's first addition) A pack that notices the hero
says its line on that turn, each time it notices anew, so a pack that
lost the hero and finds them again warns again. The three lines take
turns, as the rat's other lines do (D-297), and show in amber, as the
scorpion's raised tail does. A bite on that turn keeps its own line
(D-117). Claude's calls the owner may change: the last rat of a pack is
alone and stays silent; the warning replaces any other line that turn
but a bite's or a drink's. D-760 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-768 · 2026-11-10 · The sting hits creatures too** (the owner's
picks, all recommended; builds D-766's second addition) A creature on
the scorpion's marked tiles is hurt 2, as a glob hurts one (D-688):
beaten, it leaves no find and gives no experience. A creature in front
doesn't shield the hero behind: every marked tile is struck. Any
creature can be hit, other scorpions too; one under the earth or a pile
of bones is passed over, as the glob passes them. Hitting a creature but
not the hero, the line is "The sting strikes the rat." with its name;
the hero's own line wins when both are hit. Claude's calls the owner may
change: a scorpion stung while its tail is up strikes no more; a bone
rat stung to nothing falls to no pile, as with a glob; no sound but the
hero's sting, as a miss is silent; its Bestiary page says the sting
hurts any creature in its way. D-761 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-771 · 2026-11-10 · Alchemy, a station of its own** (the owner's
picks, recommended, with the owner's addition; changes D-415, D-455;
opens Q-093) The owner asked if there are enough materials for more
recipes and kinds of station, such as a mortar and pestle or an
alchemy lab. There are: 16 finds wait "for crafts later". Alchemy
becomes its own family and station at home, apart from the kitchen
fire, which keeps cooking; small things are still made in the bag.
Its form (a mortar and pestle, an alchemy lab, or both), its recipes
and the other stations' are open (Q-093). They come after night
creatures and then day creatures, the owner's order and addition.
D-769 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-772 · 2026-11-10 · A bow, after the alchemy station** (the owner's
wish; builds D-457, D-652; opens Q-094) The hero gets a bow for ranged
attacks, the first ranged weapon, where D-457's example named a sling.
It comes after the alchemy station and its recipes (D-771), the owner's
order. Its damage, range, how it aims on a phone, arrows, where it is
made or found and its look are open (Q-094), asked at its step.
D-770 moves to `archive/DECISIONS-SURFACE.md`, word for word.
