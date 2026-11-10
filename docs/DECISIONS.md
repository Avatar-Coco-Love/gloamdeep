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
one when there is only one way on (`PR-CHECKLIST.md`). When they are
given changed by D-795 (2026-11-10): once, after the merge.

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

**D-792 · 2026-11-10 · Slowburn, the mortar's second recipe** (the
owner's picks, both recommended, from Slowburn, a Ward Draught against
poison and a Mending Draught offered; narrows Q-093) Slowburn is made at
the mortar from 2 Tick Shell and 1 Oilcap. Drunk from the bag, for 60
turns a lit turn burns 6/7 of its oil, so a full tank lasts 70 turns,
not 60, as the Heart Charm does and added to it. Its rules are the Glow
Draught's (D-791): drunk again, back to 60; any time, the turns running
on; a night uses them and a fall ends it; it holds 5; a small mark
under the hearts with the turns left. Claude's calls the owner may
change: the red potion's bottle dark as lamp oil, its mark in the oil
bar's deep amber; its lines ("The flame burns hungry again." as it
fades); the mortar lists it after the Glow Draught; a Tick Shell's card
then shows "Makes a Slowburn at the mortar". The Glow Draught's DRINK is
no longer drawn dim at full health, as it never was. The handoff's next
prompts are each in their own fenced code block, never an inline list
(the owner's correction, D-790). D-784 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-793 · 2026-11-10 · Day creatures, third: the rare herb mimic**
(the owner's picks, from the herb mimic, scorpion and centipede, as a
rare one, recommended; builds D-784) Each day the seed and the day pick
one of the 5 woods rooms round home, and a herb mimic comes out there
beside that room's mole and bunny, with the day creatures' rules
(D-781); never home. Day matches night: two that come each day, one
rare. It acts and leaves finds as it does below. Claude's calls the
owner may change: it comes out asleep, looking like a herb, on open
grass 4 steps or more from the hero; it may pick the same room two days
running; it never shares a tile with the others. The owner also wants
brand-new kinds of creature, not only ones from below (Q-076). D-785
moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-794 · 2026-11-10 · The Mending Draught, the mortar's third recipe**
(the owner's picks, all recommended, from a Mending Draught, a Ward
Draught against poison, or both in turn; narrows Q-093) The Mending
Draught is made at the mortar from 2 Mimic Leaf and 1 Herb. Drunk from
the bag, it gives a heart every 15 turns for 60 turns, 4 in all, never
above full. Its rules are the Glow Draught's (D-791): drunk again, back
to 60; any time, full health too, the turns running on; a night uses
them and a fall ends it; it holds 5; a small mark under the hearts with
the turns left. Claude's calls the owner may change: the red potion's
bottle in moss green, its mark too; a night's turns give no hearts; its
heart comes before poison's in a turn; its lines ("The warmth fades."
as it ends); the mortar lists it after Slowburn; a Mimic Leaf's card
then shows "Makes a Mending Draught at the mortar". D-786 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-795 · 2026-11-10 · The Ward Draught, the mortar's fourth recipe**
(the owner's picks, all recommended; narrows Q-093) The Ward Draught is
made at the mortar from 2 Centipede Leg and 1 Herb. Drunk from the bag,
it ends poisoned at once, and for 60 turns a bite that hurts never
leaves the hero poisoned. Its rules are the Glow Draught's (D-791):
drunk again, back to 60; any time, the turns running on; a night uses
them and a fall ends it; it holds 5; a small mark under the hearts with
the turns left. Its bottle and mark are a pale green-white, apart from
poison's sick green and the Mending Draught's moss. Others offered: a
ward only, no cure; poison milder, as the Centipede Charm; 1 Venom Sac
and 1 Herb; 2 Stinger and 1 Snapcap Gill; pale blue; bone white.
Claude's calls the owner may change: its lines ("The ward wears off."
as it ends); a bite on the turn it is drunk is cured with the rest; the
mortar lists it after the Mending Draught. The handoff's copyable next
prompts are given once, after the owner merges, not also before (the
owner's request; changes D-790). D-787 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
