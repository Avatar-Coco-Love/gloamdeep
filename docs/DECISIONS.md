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
*Partly superseded by D-362 (2026-10-25): that audit came at 0.2.123, and
the next is at 0.2.143.*

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-362 · 2026-10-25 · The second audit, early, turn.js split first** (the
owner's picks, recommended; supersedes D-337's 0.2.129) The audit comes now, at 0.2.123,
seven versions early, so things can go on being added cleanly and quickly;
the next is at 0.2.143. Its split is `turn.js`, before the other big files:
into `state.js`, `endturn.js`, `creatureturn.js`, `fall.js` and
`bagturn.js`, with `turn.js` passing their rules on, so the rest of the
game imports from it as before (the playtest packer learns that form).
`history-0.2.js`, `screens.js` and `main.js` follow at later audits. The
finished decisions D-332 to D-361 (but D-336 to D-338) moved unchanged to
`archive/DECISIONS-GROWING-7.md` and `archive/DECISIONS-CREATURES.md`.

**D-363 · 2026-10-25 · A content index and an adding checklist** (the
owner's picks, both recommended) `docs/CONTENT.md` lists every creature,
find, tile, light and place with its numbers, where it turns up and its
decisions, so proposals build on what exists. `TECH.md`'s "Adding content"
lists the files each kind of content touches. A PR that adds or changes
content updates both.

**D-392 · 2026-10-28 · The third audit: history-0.2.js split** (the
owner's picks, all recommended) The audit at 0.2.143 splits
`history-0.2.js` by version: new versions stay at its top, 0.2.60 to
0.2.119 move to `history-0.2-2.js` and 0.2.0 to 0.2.59 to
`history-0.2-1.js`, word for word, the Version history unchanged.
D-378 to D-380 and D-385 to D-391, the corner HUD and the menu cards, all
built, moved unchanged to `archive/DECISIONS-CARDS.md`. `CHANGELOG.md`
keeps its newest 3 entries. `CLAUDE.md`'s pointers are tidied, its rules
word for word. `screens.js` and `main.js` follow at later audits; the next
is at 0.2.163.

**D-421 · 2026-10-28 · The fourth audit, tiny** (the owner's picks, both
recommended) The audit at 0.2.164 is kept small: the profile screens
(name pad, cloak, eyes, trim, clothes, Rename and Look) move word for word
from `screens.js` into `profilescreens.js`, nothing visible changed;
`CHANGELOG.md` keeps its newest 3 entries; `CLAUDE.md`'s file table is
tidied, its rules word for word. The rest of `screens.js` and `main.js`
follow at later audits; the next is at 0.2.184.

**D-431 · 2026-10-29 · How we work: one step a conversation** (the owner's
pick, recommended) The owner keeps choosing every question. Each
conversation does one step, ends with its handoff, and the next step
starts in a fresh conversation, so less is read again each time.

**D-449 · 2026-10-30 · Tap: Off, Step or Walk** (the owner's choice;
details all recommended; supersedes D-406's "the one-step tap goes" and
D-422's "Off at first") Settings' Tap to walk line becomes Tap: Off, Step,
Walk; picking it or Right goes on, Left back. Step is D-042's tap, one step
toward the tap; a finger held 0.25 s keeps stepping toward it at the held
pace (D-044), sliding steers, lifting stops. Walk is D-406's walk. New
players start on Step; saved settings keep their pick, On as Walk. How to
play: "Tap toward a tile", then "or swipe" or "Hold to keep going".
Built in 0.2.179.

**D-461 · 2026-10-30 · The scope, part 6: levels and embers** (the
owner's pick, recommended; builds D-246, D-293, D-371) Levels keep
today's curve, each costing 10 more experience than the one before, and
each still gives 1 ember, with no cap. Deeper creatures give more
experience by themselves (hearts and bite), so the climb stays steady. Also moved D-455 and D-456 to the archive,
word for word, as this file passed 12 KB.

**D-462 · 2026-10-30 · The scope, part 6: the Growth tree** (the owner's
picks, all recommended; builds D-293, D-419) The Growth tree has three
branches: Light *(e.g. a slower burn, a bigger tank)*, Body (today's
hearts, and *e.g.* a stronger bite, a guard) and Hands *(e.g. more bag
slots, faster gathering, better drop odds)*. Gathering skills are Hands
upgrades bought with embers, not learned by doing. Each branch's next
row opens once the hero has reached the next biome, so going deeper
opens stronger upgrades; each upgrade costs 1 ember, as today. Each
upgrade and its numbers come at its own step.

**D-463 · 2026-10-30 · The scope, part 6: found abilities** (the owner's
pick, recommended; builds D-419) Each biome hides one big ability, at a
shrine or from a boss near its bottom. Each opens paths in places
already seen *(e.g. a leap over a 1-tile gap)*, so going back pays
(pillar 3). Which ability lies where comes at its own step.

**D-464 · 2026-10-30 · The scope, part 7: lore** (the owner's pick,
recommended; builds D-038, D-414) Lore pieces are notes, carvings and
murals found below. They fill a Lore tab in the Journal, each telling a
bit of the mystery. They come in sets *(e.g. 5 pages of one story)*;
finishing a set gives one small lasting boost. The sets, their stories
and boosts come at each one's own step. Also moved D-457 to D-460 to
the archive, word for word, as this file neared 12 KB.

**D-465 · 2026-10-30 · The scope, part 7: relics** (the owner's pick,
recommended; builds D-038, D-419) Relics are rare finds, about 1 or 2 a
biome besides its found ability (D-463). Each is set on a shelf at home
and gives one small lasting boost while it is there, so home grows with
what was found. Each relic and its boost come at its own step.

**D-466 · 2026-10-30 · The scope, part 7: trophies** (the owner's pick,
recommended; builds D-350, D-417) Each creature has one trophy, made at
the workbench from its materials and hung at home. It completes that
creature's Bestiary page. Trophies are for looks and pride and give no
strength. Each trophy's recipe and look come at its own step.

**D-467 · 2026-10-30 · The scope, part 7: achievements** (the owner's
pick, recommended; builds D-284, D-418, narrows Q-057) Each chosen
record has a set of 3 tiers, and each tier pays the look currency. They
show in a Feats tab in the Journal, with a note on reaching one. Which
records get a set, and each tier's number, come at the first one's step.
