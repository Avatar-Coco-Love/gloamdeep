# Open questions

Only questions that are still undecided. When the owner answers one, record
a decision in `DECISIONS.md` that cites it, then delete the entry here.
IDs are never reused. Questions are ordered by when the build plan needs them.

Ask as multiple choice (D-018): options with a recommendation, more than
one pick where options combine, and the owner may always answer something
else entirely.

---

**Q-027 · Darkness outside, and the moon** (when outside places exist)
Each place sets its own darkness (D-063). Outside at night, remembered
tiles use the study's cold blue as moonlight (D-217). Should moon phases
make some nights darker than others? The owner isn't sure the moon will
be in the game. Each biome's darkness is asked when it arrives.

**Q-034 · Trees outside** (when outside places exist)
The owner's notes on the woods sketch from 0.2.3
(https://claude.ai/artifact/NNdk6rD2Cgg1FkNguoaKg4): the trees need
more work. A lantern's shadow should follow the tree's shape, not
darken its whole tile. Later: several kinds of tree, more variety, and
maybe trees swaying in the wind. One round tree a tile came first
(D-209). How many kinds, and does wind come with them?

**Q-035 · Weather, and shadows from the sun and moon** (when outside places exist)
The owner's ideas: different kinds of weather, and outside shadows that
follow the time of day, cast from where the sun (or the moon, see Q-027)
is in the sky. Which weather, what does it change, and do shadows move
with the hour?

**Q-037 · How regions are generated and joined** (stage 0.3)
Proposed in `WORLD.md`: two passes, the region's layout first, then each
room made to fit its ways in, each room with its own seed. Built for
depth 3 (D-201); the owner left the rest open until a second region. How do
regions join each other: grid edge to grid edge on the surface, and
stairs or cave mouths between the surface and the regions below?

**Q-038 · Kinds of room, shapes and sizes** (stage 0.3)
Which kinds (tunnel, clearing, house, marsh, desert…), how big each is,
and whether shapes come from hand-made templates, are generated, or both
(D-172). The owner mentioned "predefined tiles" for the shapes. Rooms
of other sizes line up their stairs by place on the floor (D-204). So far
the generated caves are 17 × 20 and the crypt rooms 11 × 13 (D-195).
Narrowed by D-223: each kind of place has its own rules, and deeper
floors become grids; which rules each kind has is still open. Burrow
floors are warrens (D-227), and from depth 8 dungeon halls (D-228).

**Q-039 · Swimming** (later)
How the hero learns to swim, where they may jump into water, what water
does to the lantern and oil, and how rivers and underground streams
carry them into rooms reached no other way (D-171).

**Q-040 · Light through openings** (when outside places exist)
The cave mouth is settled (D-218). Still open: daylight down stairs from
outside, how weather dims it, and how strong the glow from an unfound
lit room is (D-173).

**Q-052 · Play data: kept on the device, or sent?** (near 1.0)
Telemetry sends how people play (falls, depths, journey length) to a
small service, with an opt-in switch in Settings and a privacy note.
Options: keep it on the device, with a dev button to save it as a file
for playtesters (Claude's pick for now); opt-in telemetry near release,
built on each turn's events (D-267); or never.

**Q-054 · May a name hold a space or digits?** (any time)
Names are A to Z only for now (D-272). A space would allow "OLD TOM",
digits "COCO2". The owner is unsure and wants it kept for later.

**Q-055 · The play-earned currency** (before the first unlock, D-280)
Narrowed by D-418: it is the look currency, earned only from deeds,
records and achievements, buying only looks; trade coins are separate.
Still open: its name, which deeds pay, what it buys first and where.

**Q-056 · A region's name and difficulty on entering** (with a second
region, D-281) Whether the name shows on screen when you enter, with a
difficulty rating, and how the rating looks (stars, skulls, words).

**Q-057 · Achievements: tiers and rewards** (before the first
achievement, D-284) Which records get a set, the numbers of each tier,
what a reward is (perhaps the play-earned currency, Q-055, or a look)
and where achievements show (a Journal tab, a note on reaching one).

**Q-061 · Creature materials** (before the first, D-366, D-372)
The owner wants beaten creatures to leave materials of their own, each
with its own chance (D-372): a common one each, a rare one for some, for
gear, potions, lampcraft, trophies and trade (D-417). Names and chances
are settled (D-453, D-454). Still open: each material's look and the
recipes (part 4 of the scope, `SCOPE.md`); a new mechanic, its own step.

**Q-063 · The start-up screens** (before 1.0, D-377)
The owner wants the game to load like other games: a maker's name, then
the menu. Still open: the maker's (studio) name, its look and sound, and
what shows between it and the menu. Skipped for now, the owner's call
(2026-10-27): the game opens on the menu as today.

**Q-064 · The chest card on squarer screens** (found building D-387)
The stash chest's card needs the room about 1.7 times as wide as tall
(a sideways phone is about 2). On a squarer screen, a sideways tablet or
a narrow PC window, the bag's grid runs past the card's right edge.
Still open: smaller slots there, the bag's grid under the chest's, or
leave it while the game is phone first.

**Q-065 · Playing upright too?** (raised 2026-10-28, D-377)
A player close to the owner doesn't like the game forced sideways, though
willing to try to get used to it. Still open: whether a phone held upright
could play too, which needs a second layout for the play screen and every
card. The owner's call (2026-10-28): look at it after the main menu revamp;
then tabled for now (2026-10-28), after the room's edge and steering.

**Q-066 · Rooms seen through the wall** (raised 2026-10-28, D-403)
The owner's idea: past a small room's edge, a room on the same depth
(reached another way) shows where it really lies, if the hero has been
there or something in it shines (a torch, a glow). Still open: how near
it must be, how it looks unvisited, and whether it shows on the surface.
Needs rooms placed beside each other outside the map; its own step.

**Q-069 · Half and Automatic, now?** (raised 2026-10-29, D-436)
Half as D-432 says barely sped the light up. With the last pass faster,
the lights' own work is a bigger share: measure again, then build Half
and Automatic as decided, make Half do more (softer shadows, pictures
first), or drop them. The code that was built is easy to redo.
