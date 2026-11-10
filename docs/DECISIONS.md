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

**D-782 · 2026-11-10 · The thirteenth audit** (the owner's picks: every
split, every archive and the playbook; ponds as recommended) At
0.3.232, nothing visible changed. A conversation's start reads 10.4 KB,
not 11.0. Three code files are split word for word: the in-game
history's 0.3.151 to 0.3.200 go to `src/core/history-0.3-3.js` (42 KB
to 16 and 26); the creatures' pictures, rat to mimic leaf, to
`src/render/pictures-creatures.js` (49 KB to 39 and 10); each
creature's lines and its finds' to `src/core/lines-creatures.js` (42 KB
to 31 and 13; `tools/make.js` still starts new ones in the old files).
D-740 and D-742 move to `archive/DECISIONS-AUDITS.md`, D-743 to
`archive/DECISIONS-CARDS-2.md`, and D-773 to D-777 to a new
`archive/DECISIONS-SOUNDS.md`; ticked steps 23, 24, 25 and 27 are
archived; Q-088, Q-091 and Q-092 move to `OPEN-QUESTIONS-2.md`; the
playbook's audit lessons go to a new `WORKFLOW-3.md`; all word for
word. Docs that drifted are fixed: the lampmoth, bat, gloamling and
mole's surface visits; the packs in use; most woods rooms have a pond,
not each (about 1 thick-woods room in 20 has none). The bug hunt found
three bugs, all to be fixed in the next PR (the owner's call): night
or day creatures piling up across nights (B1), a bite on waking from
sleeping out (B2), night creatures coming out beside the hero in the
dark (B3). The next audit is at 0.3.272.

**D-783 · 2026-11-10 · The audit's bug fixes** (the owner's call at
the audit, D-782; fixes D-778 to D-781) An earlier night's or day's
creatures still standing go before the new ones come out, so they never
pile up in a room left and come back to (B1). Night creatures leave by
day, and day creatures by night, before any creature acts, so none
bites the hero on waking from sleeping out (B2). Night creatures come
out at least 4 steps from the hero, as the mole, as well as out of
sight, so none appears beside them with the lantern out (B3). Each has
a test.

**D-784 · 2026-11-10 · Day creatures, second: the bunny** (the owner's
idea, from the herb mimic, scorpion and centipede offered; the rest of
its picks all recommended; builds D-781) A new creature, the first that
means no harm: a bunny, soft brown with a pale tail. It never bites.
Within 3 steps of the hero it hops a tile away, its way `shy`: the lure
wisp's way (D-649) but just away, never toward another creature. One
heart; beaten, it may drop Bunny Fur, about 1 in 2, for crafts later.
One comes out each day in each woods room round home, beside the mole,
and one in the home room too, the first creature there; never by night,
never underground. No rare day creature yet. Claude's calls the owner
may change: its look (a dark eye, not a creature's pink one); Bunny Fur
holds 20 and sells for 1, as the other furs; its lines; it has no sound
of its own. A bunny within 3 steps counts as a creature near
for sleeping out, as the lure wisp does. The people's glossary lines
move back to `GLOSSARY.md` word for word, so `GLOSSARY-2.md` stays
under 8 KB.

**D-785 · 2026-11-10 · Alchemy and cooking, the shape** (the owner's
picks, all recommended, with the owner's addition; narrows Q-093,
Q-088; changes D-456's "stations don't improve for now" for alchemy)
Alchemy starts at a mortar and pestle, a station built at home; an
alchemy lab comes later as the better station, with stronger recipes.
Recipes there are fixed, as Make is today: set finds always make the
same thing, shown once their parts have been held (D-418); a base
potion with add-ins was offered and not picked. Its first new potion
makes the lantern reach farther for a while; its finds, amounts and
turns are proposed at its step. Cooking comes after alchemy, at the
kitchen fire (D-771), and simple food can also be cooked at a lit
campfire in the world (the owner's addition). The mortar's cost and
look, the lab and each recipe come at their own steps. Nothing in the
game changes yet.

**D-786 · 2026-11-10 · The mortar and pestle and the Glow Draught**
(the owner's picks, all recommended, from a mock-up drawn with the
game's own code, https://claude.ai/artifact/DwTohmU1v4fTrkkLTxBWL4;
builds D-785, narrows Q-093) The Mortar and Pestle is a grey stone bowl
on a short wooden stump, its wooden pestle leaning out (look A of
three). It costs 4 Stone and 1 Wood. The workbench's 12 slots are all
taken, so it is made in the bag, on the Make tab (D-787), and set down
at home on the surface like the bed. Its first recipe is the Glow
Draught: 2 Duskstar and 1 Wisp Glass, made at the mortar. Drunk from the
bag, the lantern reaches 1 tile farther for 60 turns, as Wide Glow does
and added to it; an empty lantern gets nothing. Claude's calls the owner
kept: the names; the draught is the red potion's bottle in the
lantern's gold and holds 5; the mortar bumped opens a card listing what
it makes. Built in steps: the Make tab, then the mortar, then the
draught.

**D-787 · 2026-11-10 · The bag's Make tab** (the owner's idea, from the
mortar's step; the owner's picks, from a mock-up, same link as D-786)
The bag card gets two tabs, BAG and MAKE, in its title row. Make shows
the recipes made in the bag in a grid like the workbench card's: a
recipe shows once each of its parts has been held (D-418) and stays
after, its cost counted from the bag, MAKE dim when short. A find's MAKE
on the Bag tab stays, and opens the Make tab with its recipe chosen
(its first, if it is in several). Above that button a line shows what
it makes: the result's picture and "Makes a Flask" (look A of three).
This lets a find be in more than one recipe. The first step adds the tab
with today's bag recipes only.

**D-788 · 2026-11-10 · The Make tab's details** (the owner's picks, all
recommended; builds D-787) The game remembers every find ever in the bag
(`known` in the save); an older save starts it from what is in its bag
and stash chests. The two recipes making an Oil flask (3 Oilcaps; Mimic
Glass with 2 Oilcaps) are two slots side by side. With nothing shown
yet, the tab says "Nothing to make yet. Recipes show once you have held
their finds." The bag always opens on BAG. Claude's calls: Tab, or a tap
on a tab, turns the tabs; a find's MAKE (and C) opens its own recipe, or
else the first it is in, and is dim only before that recipe shows; a
cost is counted from the whole bag, so 2 and 1 Oilcaps in two stacks
make a flask.

**D-789 · 2026-11-10 · The mortar's card** (the owner's picks, all
recommended; builds D-786) Bumped, day or night, the set-down Mortar and
Pestle opens the workbench's card titled MORTAR, its grid empty until
the Glow Draught's step, a grey line saying "Nothing to make here yet."
DECONSTRUCT takes it back into the bag with no ask, as the workbench's
does. Its lines: "You make a mortar and pestle.", "You set down the
mortar.", "You take down the mortar.", "You already carry a mortar."; its
look: "A stone bowl and a wooden pestle.", "Set it down on the
surface.", "Grind finds into draughts." It shows on the Make tab once
Stone and Wood have been held. Claude's call: the tile's letter `e`.

**D-790 · 2026-11-10 · Copyable next prompts** (the owner's request)
Each PR's handoff ends, before merging, with a few short prompts the
owner can copy to pick the next direction, one per choice, or a single
one when there is only one way on (`PR-CHECKLIST.md`).

**D-791 · 2026-11-10 · The Glow Draught's details** (the owner's picks,
all recommended; builds D-786) Drunk again while it works, its time goes
back to 60 turns, never more. A small gold bottle mark under the hearts
panel shows it, with the turns left beside it, and a tap on it says
"Glow Draught: {n} turns left."; lines as it is drunk and as it fades
("The glow fades."). It can be drunk any time, the lantern empty too:
its turns count down every turn, a night's sleep uses them, and the
extra tile shows again once there is oil. The mortar lists it once
Duskstar and Wisp Glass have both been held. A Duskstar's and a Wisp
Glass's card then shows the draught's picture and "Makes a Glow Draught
at the mortar" where MAKE sits, with no button. Claude's calls: a fall
ends it, as it ends poisoned; its other lines ("You make a Glow
Draught.", "You need 2 Duskstar and 1 Wisp Glass.", "You can't carry
more Glow Draughts.", the three drink and look lines); the two finds'
first look line says "good for making things" (D-677). D-780 and D-781
move to `archive/DECISIONS-SURFACE.md`, word for word.
