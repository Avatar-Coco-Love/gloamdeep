# Open questions

Only questions that are still undecided. When the owner answers one, record
a decision in `DECISIONS.md` that cites it, then delete the entry here.
IDs are never reused. Questions are ordered by when the build plan needs them.
Those for outside places and swimming are in `OPEN-QUESTIONS-2.md` (D-570).

Ask as multiple choice (D-018): options with a recommendation, more than
one pick where options combine, and the owner may always answer something
else entirely.

---

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
Sizes by depth for the caves, warrens and dungeon: D-580, built in D-584.

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
Narrowed by D-516: it is Glints, paid by the Feats tiers and spent in
the Look card. Still open: which Feats pay, how many, and the prices.

**Q-056 · A region's name and difficulty on entering** (with a second
region, D-281) Whether the name shows on screen when you enter, with a
difficulty rating, and how the rating looks (stars, skulls, words).

**Q-057 · Achievements: tiers and rewards** (before the first
achievement, D-284) Narrowed by D-467: 3 tiers a set, each paying the
look currency (Q-055), shown in a Feats tab with a note on reaching one.
Still open: which records get a set, and the numbers of each tier.

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

**Q-064 · The chest card on squarer screens** (found building D-387)
The stash chest's card needs the room about 1.7 times as wide as tall
(a sideways phone is about 2). On a squarer screen, a sideways tablet or
a narrow PC window, the bag's grid runs past the card's right edge.
Still open: smaller slots there, the bag's grid under the chest's, or
leave it while the game is phone first.

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

**Q-072 · What the guide is** (raised 2026-10-31, D-508)
The owner wants a companion who guides, but not a faery: something
unique, not ordinary, not found in other games. What it is, how it
looks, how it joins and what it does are all open. Asked when the
owner wants the guide.

**Q-075 · A flask left unguarded?** (raised 2026-11-01, D-534)
Today a rat always waits by each room's flask. The owner would like a
chance that it isn't guarded. How likely, and from which depth?

**Q-076 · New creature kinds** (raised 2026-11-01, D-534)
The owner wants more kinds, and to talk them over first, then keeps
adding them one at a time, each fully in the game (D-535). The cave
spider is the first (D-535), the bat the second (D-537), the mole the third (D-541), the snapcap the fourth (D-543), the herb mimic the fifth (D-549), the bone
rat the sixth (D-551). A list of 26 was shown in chat: from
today's ways, snapcap, mole, bat, herb mimic, oilcap mimic, shade
hound, bone rat; with a new way each, wicksucker, snuffer, glowworm,
wraith, burrower, centipede, mudcrawler, pebble thrower, slime, shell
beetle, pilferer, puffball, web spider, howler, tender, pool eel, night
prowler, rift creatures; then new ones: rim lurker, gloamberry mimic,
skulker crab; with a new way, false light, brood mother, still one, rat
pack, dozing brute. Which next, and in which pools?

**Q-077 · The boon list** (raised 2026-11-02, D-583)
Which boons go in the home waystone's pool, with their numbers, across
light and oil, hearts and fighting, finding things and getting around?
How the choice looks and sounds is asked too. Shown as a list before
the boons step.

**Q-080 · The waystone's details** (raised 2026-11-03, D-579, D-587)
Asked at each step, with mock-ups at
https://claude.ai/artifact/CtMCJdnjtw6PL9yoKaQvAU : the travel card; whether travel costs
anything or is barred with a creature beside you; where the hero
arrives and how the card opens; which room on the floor holds it.
Claude's leanings are on the page. Where the home stone stands, its
look asleep and its light: D-589. Its colour and waking: D-591. Research
for the rest: `RESEARCH-TRAVEL.md`.

**Q-082 · Which depths belong to which biome?** (raised 2026-11-05, from
the scope map) The four biomes (D-028) and every per-biome rule (ore,
plants, woods, skills: D-450, D-451, D-456, D-462) need to know where
each biome starts. Today the whole underground is the first cave (D-175):
is it the mines-and-caves biome, and where do the fungal caverns and the
sunken ruins begin? Needed before the scope map is filled in. The map:
https://claude.ai/artifact/EsjRCxsuS8G2zgkyucqMYV
