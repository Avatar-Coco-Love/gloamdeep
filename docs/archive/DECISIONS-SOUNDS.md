# Sounds from files (D-773 to D-777)

Moved unchanged from `docs/DECISIONS.md` at 0.3.232, the thirteenth audit
(D-782): sounds from files and the first groups picked by ear, the grass
steps, the lantern's click, the steps below, the fight's hit and beaten,
all built. Sounds go on (Q-095); each new sound decision starts in
`docs/DECISIONS.md`. These are still in force unless marked superseded.
Grep for an ID or topic; never read this whole.

---

**D-773 · 2026-11-10 · Sounds from files, the old ones wiped** (the
owner's wish and picks, recommended but for wiping all at once;
changes D-003's "everything exists in code"; supersedes the sounds of
D-255, D-257, D-258, D-259 and each sound made in code since; opens
Q-095) None of the sounds made in code sounded good. The game's sounds
now come from sound files, a free pack, Kenney's first (no credit
needed; the credits will name the owner and Claude). Claude's sessions
can't reach the sound sites, so the owner downloads, and Claude
measures, trims and plugs them in. All 15 old sounds are wiped now, so
the game is silent until the new ones are in. The code that knows when
each plays, the Sound switch and the sound board (D-256) stay.
`docs/SOUNDS.md` lists every sound the game needs and grows with it.
The owner's first four Kenney packs are kept in `sounds/packs/`.
D-764 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-774 · 2026-11-10 · The first sound file: grass steps** (the owner's
picks, from a board of 6 steps and 9 clicks; builds D-773; answers part
of Q-095) The footstep is Kenney's grass step, its 5 files in turn,
never the same twice running, a little higher or lower each time (up to
6%), at a quarter of the file's loudness (changed after the playtest:
half sounded like banging into something). It plays on the surface only;
underground stays silent until a stone step is picked. Wood was too
quiet, snow and dirt far too loud. The same grass files muffled (the
bright crack filtered off) are kept as a wood step, for where wood
underfoot comes. The lantern gets RPG Audio's metal
click next, after the steps are heard in a playtest. The game plays
files straight from `sounds/packs/`, as `.ogg`. ObsydianX's Interface
SFX Pack 1 (CC0, 222 tones) is kept whole there, cut of its silence;
files never used may be deleted once the game is big enough to be
sure. D-765 moves to `archive/DECISIONS-PAD-EDGE.md`, word for word.

**D-775 · 2026-11-10 · The lantern's metal click** (the owner's picks,
both recommended, from a board of 3 pitches and 2 loudnesses; builds
D-774) The lantern clicks with RPG Audio's metal click whenever it goes
on or off, by hand or by itself: on plays 12% higher than the file,
off 11% lower (two steps of a scale apart, so on and off are easy to
tell and still sound like one lantern), at half the file's loudness,
which peaks as high as the grass steps. Unlike the steps, it is the
same each time, with no straying pitch. It plays above ground and
below. D-766 moves to `archive/DECISIONS-PACK.md`, word for word.

**D-776 · 2026-11-10 · Steps below: stone and packed earth** (the
owner's picks, all recommended, from a board of 4 stone and 4 earth
steps; builds D-774; answers part of Q-095) Underground, each step the
hero walks now sounds too, by the ground: in the burrows (floors 5 to
7) the grass steps muffled into packed earth (the bright crack
filtered off above 1400 Hz), at a quarter loudness like the grass;
everywhere else below (the crypt, rock caves, dungeon halls) Kenney's
concrete steps at a tenth loudness, as loud as the grass, with a faint
echo off the walls (a repeat after 0.09 s, fading). The steps both
vary as the grass does. Sounds now come in small related groups, one
board and one PR each, the owner's pick. D-767 moves to
`archive/DECISIONS-PACK.md`, word for word.

**D-777 · 2026-11-10 · The fight's sounds: hit and beaten** (the
owner's picks, all recommended, from a board of 4 lantern hits, 3 knife
hits, 4 beaten sounds and 3 loudnesses; builds D-774; answers part of
Q-095) A hit with the lantern is Kenney's medium punch, a muffled
thump; with a knife in hand, RPG Audio's two knife slices. When a
creature is beaten, Kenney's heavy soft thud plays 0.12 s after the
hit. All three at a quarter loudness, as loud as a step at its peak, a
little higher or lower each time, never the same file twice running.
The owner leaned towards the quieter, metal set (a clank, a scrape, a
sack dropped, at half) and may come back to it. Claude's calls the
owner may change: the spear sounds like the knife; bones scattered
underfoot make no thud, as their rattle is theirs; a miss stays silent
(D-759). D-768 moves to `archive/DECISIONS-CREATURES-2.md`, word for
word.
