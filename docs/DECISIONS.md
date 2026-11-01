# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. ~~Steps of stage 0.3 are versioned 0.3.x.~~ *That part
superseded by D-237 (2026-10-22): versions stay 0.2.x; 0.3.x from
0.3.0 by D-528 (2026-10-31).* The step list
is in `PROGRESS.md` and may change as we go.

**D-169 · 2026-10-19 · Regions are grids of rooms** (the owner's idea)
The world, surface and below, is split into regions joined to each
other. Each region is a grid of cells (a 3 × 3 marsh has 9), and not
every cell must be used. Each region has its own rule sheet for how it
generates, including promises that hold for every seed: a special room
with its own rules, a single secret entrance to it from a side that
changes with the seed, or a special item that must appear in a named
room or building. Each cave follows its own rules too. Generated once
per save, as D-019.

**D-170 · 2026-10-19 · Where the world is written down** (owner's pick)
`docs/WORLD.md` holds how the world works, under 8 KB. Each region gets
its own rule sheet in `docs/regions/`, one file per region, made when the
region is designed. Undecided details are open questions.

**D-171 · 2026-10-19 · Ways between rooms** (the owner's idea) Rooms
join by stairs up and down, by openings at their sides into the room
beside them, by water for a hero who can swim (Q-039), and by secret
entrances. Both sides of a way line up exactly, and each room is made to
fit the ways into it.

**D-172 · 2026-10-19 · Rooms of every shape and size** (the owner's idea
and pick) Rooms differ in shape and size by their kind: tunnels are
narrow, deserts are vast. A room bigger than the screen scrolls, with the
camera following the hero. The kinds and sizes are Q-038.

**D-173 · 2026-10-19 · Light comes through openings** (the owner's idea)
A doorway, cave mouth or stairs lets in the light of the place beyond.
Daylight shines in behind you by day, less in rain or snow, not at
night, following the time of day (D-025) and the weather (Q-035). An
open way into a lit room not yet found glows, so you can tell a lit
space lies ahead. Details are Q-040.

**D-174 · 2026-10-19 · Stairs must be found** (the owner's idea,
supersedes part of D-134) The stairs' glow is dimmer and shows only where
the fog of war has lifted, so stairs and doors must be found, unless
other light reveals them. Some underground places are brightly lit.
How dim is Q-041.

**D-175 · 2026-10-19 · Today's game becomes the first cave** (owner's
pick) The two crypt rooms and the generated depths below them become the
first cave under the starting region, reached from a cave entrance on
the surface. Q-043 asks whether it gets a bottom.

**D-176 · 2026-10-19 · A world map to uncover** (the owner's idea,
builds on D-021) Players uncover the map as they explore. Dev tools get
a switch that reveals the whole map, and a map mode, which may be the
same map players see. Details are Q-042.

**D-337 · 2026-10-25 · An audit every 20 versions** (the owner's picks, both
recommended) `PROGRESS.md` names the next audit's version; when it comes,
the audit is Next up. Each audit also splits one big code file into
smaller ones, nothing visible changed (order may change: `history-0.2.js`,
`screens.js`, `turn.js`, `main.js`). The next audit is at 0.2.129.
*Partly superseded by D-362 (2026-10-25): that audit came at 0.2.123, and
the next is at 0.2.143; and by D-518 (2026-10-31): every 40 versions.*

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

**D-473 · 2026-10-30 · The scope's build order** (the owner's picks,
all recommended; answers the Next up of 0.2.187) Drops come first, so
the five creatures of today reward the hero and the loop deeper → find
→ craft → deeper closes soonest. The first 8 steps, each one small
visible change, with names and numbers asked at each one's own step:
a beaten rat leaves a Rat Tail (D-453, D-454); the other four common
drops; the rare drops; a first recipe using a creature material;
torches made and set down (D-459); a second weapon kind and the swap
(D-457); a pick and the first ore (D-450); the Growth tree, today's
hearts in Body (D-462). The rest follows later, in an order asked
then. The plan lists only those 8 in `PROGRESS.md`. Half and Automatic
(Q-069) stay waiting, outside the order.

**D-482 · 2026-10-30 · The rest of the build order** (the owner's picks,
all recommended; answers the Next up of 0.2.196) Lantern parts come
next: Copper Ore, mined since step 7, gets its first use, and the
lantern is the heart of the game. Claude proposes the rest of the
order and the owner approves it by merging: lantern parts, armour and
charms, home pieces and rest, the first rescue, vendor and coins,
garden, fishing, lore, relics, feats. The rescue comes before the
vendor, who is a rescued person (D-471); collectables come last, as
they reward everything before them. Each may take more than one small
step, with its names and numbers asked at its own step. The first
Light and Hands upgrades may join any of them. Half and Automatic
(Q-069) keep waiting. Also moved D-479 and D-480 to the archive, word
for word, as this file neared 12 KB.

**D-518 · 2026-10-31 · An audit every 40 versions** (the owner's pick,
recommended; supersedes D-337's 20) The owner asked if audits help. The
start-of-conversation read stays near 11.5 KB (17 KB before the first),
but the size test already makes normal steps trim, and code splits are
outgrown in an audit or two, while 20 versions is about a day. So an
audit comes every 40 versions; the size test still guards in between.

**D-519 · 2026-10-31 · The seventh audit: the hero slots** (the owner's
picks, all recommended) The audit at 0.2.228 moves `main.js`'s slots
(using, renaming, a new look and deleting a profile) into `slots.js`,
nothing visible changed; the hero creator (D-517) is built there next.
D-362, D-392, D-421, D-468 and D-493 move unchanged to
`archive/DECISIONS-AUDITS.md`; `CHANGELOG.md` keeps its newest 3
entries; the build plan's ticked steps 13 and Water move to
`archive/PROGRESS-LOG.md`. `screens.js` and the rest of `main.js`
follow at later audits; the next is at 0.2.268.

**D-528 · 2026-10-31 · Version 0.3.0** (the owner's pick, recommended;
supersedes the version part of D-237) Stage 0.2's last steps are done,
so versions move to 0.3.x from 0.3.0, this version, for stage 0.3, the
world (D-168). New history goes in `history-0.3.js`. The next audit,
0.2.268 (D-518, D-519), keeps its distance: 0.3.32.

**D-541 · 2026-11-01 · The mole** (the owner's picks, all recommended;
answers part of Q-076; builds D-365; mock-up:
https://claude.ai/artifact/U3QqnHUik4qPJTNddiNjUX) The third new kind,
the last but the snapcap of D-365's five, picked from six built only
from today's ways: it chases and never flees. 4 hearts, a bite of 1, in
the pool from depth 5 and below (D-365's warrens, as pools now run,
D-534). Its drop is Mole Fur, about 1 in 2, sold for 1 coin, and as a
creature of depth 3 or deeper, a rare Mole Claw, about 1 in 10, sold
for 5 (D-453, D-494); both for crafts later. The mock-up's look, side
on as the rat is, in the wood's browns, with pale claws and the pink
eye and nose. The fur and the claw are Claude's drawings, the owner
may change them. Its lines (Claude's, the owner may change them): "The
mole grunts and digs in.", "The mole slumps and falls still." and "The
mole claws you." D-535 and D-536 moved to
`archive/DECISIONS-CREATURES-2.md`, word for word.

**D-542 · 2026-11-01 · The mole's snuffle** (the owner's pick,
recommended) Its bite is a short low snuffle, then one gritty scrape of
claws in dirt. It is on the sound board.

**D-543 · 2026-11-01 · The snapcap** (the owner's picks: the snapcap
from a list of today's ways and new ones, over the recommended rim
lurker; its eyes open up close over the recommended pink eyes always;
the rest recommended; answers part of Q-076; builds D-365; mock-up:
https://claude.ai/artifact/62BSTiPir5vyHCCaM3W9gb) The fourth new kind,
the last of D-365's five: a heartcap that bites. It has no ways, so it
never moves or notices, and bites whoever stands beside it, lit or not.
2 hearts, a bite of 1, in the pool from depth 2 and below (D-365's
depths 2 to 4, as pools now run, D-534). It is drawn just as a heartcap,
in a heartcap's tone (D-305), until the hero stands beside it, four
ways, where it can bite; then look B shows, two pale eyes with pink
pupils on its cap and a row of pale teeth under the rim, and it shuts
again when they step away. Its drop is a Snapcap Gill, look 1, a fan of
pale pink gills under a strip of red cap, about 1 in 2, sold for 1
coin, for crafts later; as a creature of depth 2, no rare one (D-453).
Its lines (Claude's, the owner may change them): "The snapcap squelches
and snaps.", "The snapcap splits and falls still." and "The snapcap
snaps at you." D-537 and D-538 moved to
`archive/DECISIONS-CREATURES-2.md`, word for word.

**D-544 · 2026-11-01 · The snapcap's snap** (the owner's pick,
recommended) Its bite is a soft wet squelch, then the quick snap of a
cap closing. It is on the sound board.

**D-545 · 2026-11-01 · Drop first, then bigger bags** (the owner's picks,
all recommended; narrows D-418) Dropping things comes first, as its own
step (D-546); bag upgrades are a later step. They come in two: a Pouch
takes the bag from 6 slots to 9, then a Big Bag to 12, both made at the
workbench from hides (*e.g.* Rat Tails, Mole Fur); recipes and looks are
shown at that step.

**D-546 · 2026-11-01 · Drop** (the owner's picks, all recommended) Every
item in the bag has a Drop button, at the bottom left of the item's side
(a row up when the card is too narrow), and X on a keyboard. It sets the
whole chosen stack down on the hero's tile, free (no turn passes), with
"You set it down." Stepping back onto it takes it all back, never eaten
or held, and it never grows back; what doesn't fit stays, "Your bag is
full." Dropped while standing on a find, the find comes into the bag in
its place: a swap. D-539 and D-540 moved to
`archive/DECISIONS-CREATURES-2.md`, word for word.
