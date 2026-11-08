# Open questions

Only questions that are still undecided. When the owner answers one, record
a decision in `DECISIONS.md` that cites it, then delete the entry here.
IDs are never reused. Questions are ordered by when the build plan needs them.
Those for outside places and swimming are in `OPEN-QUESTIONS-2.md` (D-570);
lore and special creatures in `OPEN-QUESTIONS-3.md`.

Ask as multiple choice (D-018): options with a recommendation, more than
one pick where options combine, and the owner may always answer something
else entirely.

---

**Q-037 · How regions are generated and joined** (stage 0.3)
Proposed in `WORLD.md`: two passes, the region's layout first, then each
room made to fit its ways in, each room with its own seed. Built for
depth 2 (depth 3 before D-212; D-201), and for every floor under the
crypt since D-645; the owner left the rest open until a second region. How do
regions join each other: grid edge to grid edge on the surface, and
stairs or cave mouths between the surface and the regions below?

**Q-038 · Kinds of room, shapes and sizes** (stage 0.3)
Which kinds (tunnel, clearing, house, marsh, desert…), how big each is,
and whether shapes come from hand-made templates, are generated, or both
(D-172). The owner mentioned "predefined tiles" for the shapes. Rooms
of other sizes line up their stairs by place on the floor (D-204). The
crypt rooms are 11 × 13 (D-195); generated rooms are made of 11 × 13
cells, 13 × 15 from depth 8: 1 cell, a hall of 2 or a large room of
2 × 2 (D-645, D-648).
Narrowed by D-223: each kind of place has its own rules, and deeper
floors become grids; which rules each kind has is still open. Burrow
floors are warrens (D-227), and from depth 8 dungeon halls (D-228).
Sizes by depth for the caves, warrens and dungeon before D-645: D-580,
built in D-584.

**Q-052 · Play data: kept on the device, or sent?** (near 1.0)
Telemetry sends how people play (falls, depths, journey length) to a
small service, with an opt-in switch in Settings and a privacy note.
Options: keep it on the device, with a dev button to save it as a file
for playtesters (Claude's pick for now); opt-in telemetry near release,
built on each turn's events (D-267); or never.

**Q-054 · May a name hold a space or digits?** (any time)
Names are A to Z only for now (D-272). A space would allow "OLD TOM",
digits "COCO2". The owner is unsure and wants it kept for later.
Meanwhile, Space does nothing on the name pad (D-683).

**Q-055 · The play-earned currency** (before the first unlock, D-280)
Narrowed by D-418: it is the look currency, earned only from deeds,
records and achievements, buying only looks; trade coins are separate.
Narrowed by D-516: it is Glints, paid by the Feats tiers and spent in
the Look card. Narrowed by D-695: Beaten is the first Feat, its tiers
paying 1, 2 and 3; a cloak pattern costs 3. Still open: the next Feats,
and the prices of looks to come.

**Q-056 · A region's name and difficulty on entering** (with a second
region, D-281) Whether the name shows on screen when you enter, with a
difficulty rating, and how the rating looks (stars, skulls, words).

**Q-057 · Achievements: tiers and rewards** (before the first
achievement, D-284) Narrowed by D-467: 3 tiers a set, each paying the
look currency (Q-055), shown in a Feats tab with a note on reaching one.
Narrowed by D-695: Beaten at 10, 50 and 200. Still open: which other
records get a set, and their numbers.

**Q-061 · Creature materials** (before the first, D-366, D-372)
The owner wants beaten creatures to leave materials of their own, each
with its own chance (D-372): a common one each, a rare one for some, for
gear, potions, lampcraft, trophies and trade (D-417). Names and chances
are settled (D-453, D-454), and where things are made (D-455, D-456).
Still open: each material's look (all eight are D-474 to D-476) and the
recipes it goes into (Mimic Glass's first is D-477, Rat Tail's D-484), at each one's own
step; a new mechanic, its own step. Also the herb mimic's and the bone
rat's rare ones, as creatures from depth 3 down (D-453, D-549, D-551).

**Q-063 · The start-up screens** (before 1.0, D-377)
The owner wants the game to load like other games: a maker's name, then
the menu. Still open: the maker's (studio) name, its look and sound, and
what shows between it and the menu. Skipped for now, the owner's call
(2026-10-27): the game opens on the menu as today.

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

**Q-071 · Water and the garden** (raised 2026-10-31, D-499)
The owner asks whether water matters to the garden. So far seeds just
grow over turns (D-452, D-567). It could: a pool at home, wet
ground, water plants. Waits for a way to carry water (D-569).

**Q-075 · A flask left unguarded?** (raised 2026-11-01, D-534)
Today a rat always waits by each room's flask. The owner would like a
chance that it isn't guarded. How likely, and from which depth?

**Q-076 · New creature kinds** (raised 2026-11-01, D-534)
The owner wants more kinds, and to talk them over first, then keeps
adding them one at a time, each fully in the game (D-535). The cave
spider is the first (D-535), the bat the second (D-537), the mole the third (D-541), the snapcap the fourth (D-543), the herb mimic the fifth (D-549), the bone
rat the sixth (D-551), the oil tick (the wicksucker) the seventh and the first new way (D-606); the plan ahead is D-607; each biome's kinds are drafted on the content map, and the lure wisp, the eighth, is built (D-649); biome 1 gets a 15th kind that poisons the hero, picked from 2 or 3 drafts (D-652): the centipede (D-654); the first that attacks from range is the Spit grub, the 16th (D-659), built (D-688). A list of 26 was shown in chat: from
today's ways, snapcap, mole, bat, herb mimic, oilcap mimic, shade
hound, bone rat; with a new way each, wicksucker, snuffer, glowworm,
wraith, burrower, centipede, mudcrawler, pebble thrower, slime, shell
beetle, pilferer, puffball, web spider, howler, tender, pool eel, night
prowler, rift creatures; then new ones: rim lurker, gloamberry mimic,
skulker crab; with a new way, false light, brood mother, still one, rat
pack, dozing brute. Which next, and in which pools?

**Q-086 · Rooms that fill again** (raised 2026-11-07, the owner's idea;
builds D-643, D-644) Today a room keeps the creatures it was made with,
and a beaten one stays beaten for the journey. The owner's idea: after a
while a cleared room fills again, a creature picked from the depth's
pool, so a different kind may take a beaten one's place. When, how
often, and how it fits the bigger biomes are talked through at its own
step, after biome 1 grows.
