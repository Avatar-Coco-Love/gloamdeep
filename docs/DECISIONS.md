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

**D-364 · 2026-10-25 · More creatures next** (the owner's pick,
recommended) After the audit, the next content is more creatures for the
region we have, built on the creatures' ways and the creature list. Each
is designed with the owner before it is built.

**D-365 · 2026-10-25 · Six creature ideas, the flask mimic picked** (the
owner's pick, with their girlfriend; not the recommended Snapcap) A
mock-up showed six creatures built only from the ways creatures have:
Snapcap, Mole, Bat, Scorpion, Cave spider and Flask mimic. The flask
mimic comes first; the other five are kept in `RESEARCH.md`.

**D-366 · 2026-10-25 · The flask mimic** (the owner's picks: the name
Flask mimic over the recommended Mimic, about 1 room in 4 over the
recommended 1 room a floor, and the recommended no reward) An oil flask
with pink eyes and teeth: 3 hearts and a bite of 1 (changed after the
owner's look: no ways, never moving → asleep in disguise, then chasing,
D-368). On depths 3 to 5,
each generated room has a 1 in 4 chance, from the seed, of one as well as
all the room holds. It stands where a flask could lie: at least 5 steps
from the way in, not beside the stairs or an opening, and never cutting
the room in two. Beating it gives the usual XP only; things left behind
are Q-061. Its lines: "The flask mimic cracks and falls still." and "The
flask mimic bites you."

**D-367 · 2026-10-25 · A bite of glass** (the owner's pick, not the
recommended silence) The flask mimic's bite is a bright ringing clink
with a faint high ping, then one dry snap of the rat's teeth. It is on
the sound board.

**D-368 · 2026-10-25 · The flask mimic sleeps in disguise** (the owner's
idea; fully hidden and the name Flask mimic recommended, giving up and a
silent wake not; answers Q-062) Asleep, it is drawn just like an oil flask,
is left off the creature list, the next-move arrows and framing, and does
nothing. A bump wakes it, with no harm, no flash and no sound, and passes a
turn in which it only stirs, so the hero can run. Awake, it shows its own
look and chases (the Chases way) for 6 turns, then settles back down asleep
where it stands; leaving the room settles it too. Its lines: "The flask
opens its eyes!" and "The flask mimic settles down."

**D-369 · 2026-10-25 · The flask mimic's hurt line, and no freeze
without one** (the owner's picks, both recommended but the line, which
was one of three) Hurt, the flask mimic says "The flask mimic cracks."
A line a creature doesn't have is never said, so the line already
showing stays, and a line that isn't there, as an old save may hold,
shows nothing. A test checks that every line a creature names exists.

**D-370 · 2026-10-26 · The scorpion** (the owner's picks, all recommended;
one of the five kept by D-365) Seen from above, as the lampmoth is: two
big pincers, eight legs, a striped body with the pink hostile eyes, and
the tail curled to one side with a pale sting (changed after the owner's
look: amber-brown and side on → from above, in its colour set, D-373;
[mock-up](https://claude.ai/artifact/5C8yz3Cu5SkVAvGjE8jkFr)).
1 heart and a bite of 2, the first creature to bite that hard; it chases
(the Chases way), so one hit of anything kills it. On each floor of
depths 3 and 4, one room the seed picks, never the lampmoth's, holds a
scorpion in place of its rat. Its lines: "The scorpion stings you." and
"The scorpion curls up and falls still." Its sting is its own sound, a
dry double click of claws, then a short sharp stab; it is on the sound
board.

**D-371 · 2026-10-26 · Experience from creatures: hearts and bite** (the
owner's pick, recommended; supersedes D-245 in part) A creature beaten
gives its hearts and its bite added together: a lampmoth 2, a rat 3, a
gloamling 3, a flask mimic 4, a scorpion 3. A new creature follows the
rule by itself. A new room still gives 1, and levels cost the same.

**D-372 · 2026-10-26 · Creature materials, later** (the owner's picks;
narrows Q-061) Beaten creatures will one day leave materials of their
own, to make new things with, each creature with its own chance from the
seed. Not built yet: the names, looks, chances and recipes are Q-061.

**D-373 · 2026-10-26 · A creature's colour sets** (the owner's idea and
picks, all recommended) One drawing, worn in one of a small set of colours
made for that creature. Each one a room lays out picks its set from the
seed and its tile, like a mushroom's tone (D-305), so the same world shows
the same colours. The scorpion's five: Sand, Rust, Coal, Olive and Bone,
never the oil's amber. One the dev tools place wears the first, Sand.

**D-374 · 2026-10-26 · Each creature varies its own way** (the owner's
answer) Whether a creature varies, and how, is decided creature by
creature: colours, or its shape itself. Ideas kept in `RESEARCH.md`.
