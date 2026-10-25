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
superseded by D-237 (2026-10-22): versions stay 0.2.x.* The step list
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

**D-332 · 2026-10-25 · A fall leaves the world as it was** (the owner's
call, answers Q-058; supersedes the rooms beginning again in D-119 and D-136,
the new seed of D-148 and D-331's last sentence) Outside Hardcore (D-334), a
fall changes nothing in the world: the same seed, every room as left, with
what was set down, what chests keep, what was found and what grows back on
its own time. The hero still wakes at the first room's start with full
health and the starting oil.

**D-333 · 2026-10-25 · Bigger stacks, by kind** (the owner's picks, both
recommended; supersedes D-250 once built) Stacks hold 20 of small finds
(Wood, Stone, oilcaps, heartcaps), 5 of flasks and potions, and 1 workbench
or stash chest. In the bag and in a chest, a full stack goes on in the next
free slot, so a kind can fill several slots.

**D-335 · 2026-10-25 · What comes next** (the owner's pick, recommended)
First a fall keeping the world (D-332, 0.2.108), then bigger stacks
(D-333), then CH5, then the modes (D-334) as their own steps.

**D-336 · 2026-10-25 · The first regular audit** (the owner's picks, all
recommended) A conversation given to tidying, with nothing visible changed:
`CLAUDE.md` loses its list of archive files, now one index in
`archive/README.md`; `PROGRESS.md`'s ticked build steps move to the
progress archive; `CHANGELOG.md` keeps its newest entries, the rest in
`archive/CHANGELOG-STAGE-0.2-1.md`; and `tests/docs.test.js` fails when a
doc passes its cap (8 KB; `DECISIONS.md` 12 KB; `PROGRESS.md` 4 KB, as before) or
the archive index misses a file. The 0.2.1 setup script line is in place.

**D-337 · 2026-10-25 · An audit every 20 versions** (the owner's picks, both
recommended) `PROGRESS.md` names the next audit's version; when it comes,
the audit is Next up. Each audit also splits one big code file into
smaller ones, nothing visible changed (order may change: `history-0.2.js`,
`screens.js`, `turn.js`, `main.js`). The next audit is at 0.2.129.

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-339 · 2026-10-25 · Bigger stacks, the details** (the owner's picks, all
recommended; builds D-333) With every stack of a kind full and no slot free,
the lines stay as today: the kind's own line when the bag holds some, else
as before. Only 1 workbench or stash chest is still carried (D-320). On a
chest's panel a picked stack moves what fits, topping up its kind and then
taking free slots; the rest stays, with "Your bag is full." or "The chest
is full.". A slot's count stays in its corner, its dark box as wide as the
number.

**D-343 · 2026-10-25 · The stash chest's decisions are archived** (as
D-327, by the 12 KB rule in `CLAUDE.md`) D-324 to D-331 and D-340 moved
unchanged to `archive/DECISIONS-CHEST.md` as this file neared 12 KB. They
stay in force.

**D-347 · 2026-10-25 · The knife stays in hand through a fall** (the owner's
call; confirms D-345's "the hand keeps its weapon") A Normal fall leaves the
bag but not the weapon in hand, for now: until the home base can make and
store weapons, the hero needs a way to suit up before going after the bag.

**D-348 · 2026-10-25 · Hearthwood** (the owner's pick, recommended; answers
Q-045) The starting region is called Hearthwood: the home's woods, warm
before the dark. "Gloamwood" stays free for a darker woods later.

**D-349 · 2026-10-25 · Creatures show every next move, to try** (the owner's
pick; answers Q-049) For now every creature the hero can see shows its next
move, always, as in Into the Breach; the owner wants to try it and may try
the other ways (only in light, only big wind-up moves) after a playtest. No
mark shows for a creature in the dark that the hero can't see: nothing gives
away that something moves there. A build step after the creature drawn to
light; its look is proposed then.

**D-350 · 2026-10-25 · The Bestiary** (the owner's picks; answers Q-047;
builds D-262) The Journal's Bestiary tab gets a page for a creature only
once it is met. A page counts how many were met and beaten, and says how
the creature acts and how to fight it, so How to play keeps the controls.
A page doesn't show everything at once: more of it shows the more the hero
has met and fought that creature. What shows when is Q-058.
*Q-058 here is Q-059 (2026-10-25, D-355): Q-058 was already used by
D-332's question, and IDs are never reused. Answered by D-352.*

**D-351 · 2026-10-25 · The creature drawn to light, how it acts** (the
owner's pick, recommended; builds D-026, D-311) It has one new way, Seeks
light: it walks toward the nearest light. While the lantern is lit that is
the hero, and it bites like a rat; with the lantern off it heads for the
nearest lit torch instead. Drinking oil was kept for a later step, so this
step adds no other mechanic. Its look, name and numbers are proposed, with
a mock-up, when it is built.

**D-352 · 2026-10-25 · What a Bestiary page shows, and when** (the owner's
pick, recommended; answers Q-059; builds D-350) On first meeting a creature:
its drawing, its name, and how many were met and beaten. After the first one
is beaten: how it acts. After 3 are beaten: how to fight it.

**D-353 · 2026-10-25 · Sideways keeps the same view** (the owner's pick,
recommended; answers Q-048) Held sideways, the screen shows the same room as
upright, only drawn bigger when that fits (D-199); the room doesn't fill the
screen, since past its walls is only dark. Asked again if wide outside
places come.

**D-354 · 2026-10-25 · The first cave goes on below depth 5** (the owner's
pick, recommended; answers Q-046; partly supersedes D-185) The earth warrens
(depths 5 to 7, D-227) and the dungeon (from depth 8, D-228) stay the first
cave's deeper floors, as built. Where the first cave ends, and its portal to
the endless depths, are decided at the portal step.

**D-355 · 2026-10-25 · The modes' decisions are archived, a question renamed**
(as D-343, by the 12 KB rule in `CLAUDE.md`) D-334, D-341, D-342 and D-344
to D-346 moved unchanged to `archive/DECISIONS-MODES.md` as this file neared
12 KB. They stay in force. The Bestiary question opened at 0.2.116 as Q-058
is Q-059, since Q-058 was already used (D-332).

**D-356 · 2026-10-25 · The lampmoth** (the owner's picks, all recommended;
builds D-351) The creature drawn to light is a pale moth, the Lampmoth: cream
wings with an amber spot like a flame, a dark body and the pink hostile eyes
(look A of the mock-up). Health 1, so any hit kills it; a bite of 1. Its way,
Seeks light, needs no noticing: it walks toward the hero while the lantern is
lit, from anywhere in the room, else toward the nearest lit torch, and stays
by it; with neither it stays. On each floor of depths 2 to 4 one room the
seed picks holds a lampmoth in place of its rat. It bites silently for now.
