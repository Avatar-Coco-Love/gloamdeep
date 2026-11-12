# Sounds from files (D-773 to D-777, D-822 to D-825)

Moved unchanged from `docs/DECISIONS.md` at 0.3.232, the thirteenth audit
(D-782): sounds from files and the first groups picked by ear, the grass
steps, the lantern's click, the steps below, the fight's hit and beaten,
all built. Sounds go on (Q-095); each new sound decision starts in
`docs/DECISIONS.md`. D-822 to D-825, Loudness, the four kinds'
loudness, each sound On or Off, and digging and chests' sounds, all
built, followed at 0.3.272, the fourteenth audit (D-826). These are
still in force unless marked superseded. Grep for an ID or topic; never
read this whole.

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

**D-822 · 2026-11-11 · Loudness** (the owner's picks, all recommended;
builds D-820; step 1 of 3) A line Loudness under Sound on the Sound tab,
0% to 100% in steps of 10% (offered too: steps of 25%; a drawn bar of
10 marks). Sound On or Off stays beside it as the quick switch, and
the loudness is kept apart (offered too: one line, 0% as Off). Next, a
loudness for each of four kinds: Steps, Fighting (the creatures too),
Finds (the bag and places too) and Menus (offered too: the seven of
`SOUNDS.md`; Play and Menus); then each sound On or Off, in a short
list opened from its kind's line (offered too: all on the Sound tab; a
fifth tab). Claude's calls the owner may change: 100% until picked; a
tap goes up a step, round from 100% to 0%; Left and Right go down and
up, stopping at the ends; the menu's tick plays at the new loudness;
the cave's echo is as loud as its step. D-818 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-823 · 2026-11-11 · The four kinds' loudness** (the owner's picks,
all recommended; builds D-822; step 2 of 3) After a fit test on an upright
phone (all six lines fit at 320 × 568 and sideways), Steps, Fighting,
Finds and Menus go under Loudness on the Sound tab as plain lines, like
every other setting (offered too: indented; a gap first). The lantern and
the light follow Steps (offered too: Finds; Fighting). A kind plays at
Loudness times its share, so 50% and 50% is 25% (offered too: each kind on
its own). Changing a kind plays its own sound at the new loudness: a step,
a hit, a pat into the bag, the tick (offered too: always the tick).
Claude's calls the owner may change: each 100% until picked, moving as
Loudness does; the step heard is the grass step wherever the hero is;
the creatures' sounds follow Fighting, waystones and fishing Finds, a
card's page Menus. Next, each sound On or Off, in a list opened from its
kind's line. D-819 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-824 · 2026-11-11 · Each sound On or Off** (the owner's picks, all
recommended; builds D-823; step 3 of 3) After a fit test (13 lines, the
longest list could hold, fit at 320 × 568 upright and sideways),
each kind's list holds only the sounds heard so far, a sound joining it
as its file goes in (offered too: every sound, the silent dimmed; the
heard, then a count). A kind's line on the Sound tab reads "Steps: 100%
>": a tap or Enter opens its list, whose first line is the kind's
loudness, then its sounds; Left and Right on the Sound tab still change
the loudness (offered too: a > mark of its own; one line "Each sound").
The list shows in the Sound tab, its title SOUND · STEPS in the tabs'
row; the cross, Esc or a tap on the title goes back to the Sound tab on
that kind's line (offered too: a small card on top). The lines say what
happens: Steps: Grass, Stone, Earth, Lantern; Fighting: Lantern hit,
Knife hit, Beaten; Finds: Into the bag, Weapon drawn, Tile set down;
Menus: Tick, Page turn, Can't; each On or Off (offered too: what it
sounds like; the code's names). Claude's calls the owner may change:
each On until picked; a tap, Enter, Left or Right turns one On or Off;
turned On, it plays itself, turned Off, the tick; the list opens on its
first line; the rows stay where the tabs leave them, upright a row
lower; Tab leaves the list for the next tab. D-820 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-825 · 2026-11-11 · Digging and chests' sounds** (the owner's picks,
all recommended, from a board of 4 each; answers part of Q-095) Each
bump on a deposit, a copper vein or rubble clinks: Impact Sounds'
mining 0 to 4, taking turns, at a quarter loudness, with the cave's
echo (offered too: the same, 15% lower; light metal taps; stone plate
taps). The last bump crumbles: the mining clink a quarter lower and
louder, then small stones tumbling, the concrete steps higher and soft
(offered too: a heavy stone plate; a deep heavy thud; the deep clink
alone). A stash chest opens with RPG Audio's creak 1 at half loudness,
its page turning as the creak ends (offered too: creak 2; a small door
opening; a latch, then a creak), and closes with Impact Sounds' heavy
wood knock just after its page (offered too: a small door shutting; a
book shut; only the page). On their own lines under Finds: Digging,
Stone breaks, Chest. D-821 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-830 · 2026-11-11 · The lantern and the light's sounds** (the owner's
picks, all recommended, from a board of 4, 4, 4 and 4; answers part of
Q-095) The first sounds from the elemental pack (D-829). A flask poured,
by hand or by itself, is seven quick glugs: Water-027 at 0.47 (offered
too: three glugs, higher; two big gloops; a steady bubbling pour); a
minnow poured stays silent. The oil running out, as "The lantern gutters
to an ember." shows, is a crackle that slows and fades: Fire-017's first
1.3 s, fading over its last second, its pitch sliding to 0.7, at 0.22
(offered too: a small puff; the crackle, then the puff; a soft falling
whoosh). A torch lit is a quick whoosh: Fire-030 from 0.1 s, 1.2 s of
it, fading over 0.5 s, at 0.24 (offered too: a deep whoomp; a fuller
burst; a softer rising whoosh). Cold ashes lit into a campfire catch and
burn: Fire-021 from 0.18 s, 2.4 s of it, fading over 0.9 s, at 0.27
(offered too: a sharper catch; the torch's whoosh, then a crackle; a
bright flare). Each follows Steps' loudness, with the lantern, and has
its own line under Steps: Flask poured, Oil runs out, Torch lit,
Campfire lit.

**D-831 · 2026-11-11 · The fight's rest's sounds** (the owner's picks
from a board of 4, 4, 4 and 4, then 4 new for poison; answers part of
Q-095) A stiff swing that misses (D-759) is a short puff of air: the
elemental pack's Wind-012 to 014 at 0.55 (offered too, and recommended:
a quick whoosh; an airier swish; a sleeve's cloth). The hero hurt by a
bite or a glob that takes a heart is a dull blow: Impact Sounds'
impactPunch_heavy, a tenth lower, muffled above 900 Hz, at 0.32, a
quarter second after the hero's swing, hit or missed (offered too: a
leather thump; the blow with a low wince; a low bong). No pack has a
voice, so it is not a gasp. Poison taking a heart is a deep throb,
twice: the same punch at 0.6 then 0.57 pitch, muffled above 400 Hz, at
0.36 then 0.26, 0.35 s apart (the first four, gloops, heartbeats and a
hum, didn't fit; offered too: a queasy swell, recommended; slow sick
bubbles; the blow, then a gloop). A level reached is three glass notes
rising: impactGlass_light 000 to 002 at 1, 1.26 and 1.5, 0.11 s apart,
at 0.2 falling to 0.16, 0.55 s after the turn's sounds, so after the
beaten thud (offered too: a smooth rising tone; a shorter one; an ember
flaring). Each follows Fighting's loudness and has its own line under
Fighting: Stiff miss, Hurt, Poison, Level.

**D-832 · 2026-11-11 · The creatures' bites** (the owner's picks, all
recommended, from a board of 3 for each of ten; answers part of Q-095)
Each kind's bite, a quarter second after the hero's swing as the hurt
blow is: a rat's (a centipede's and an oil tick's too) a quick double
nip; a flask mimic's a glass clink, then a snap; a scorpion's two dry
clicks, then a stab; a cave spider's a soft hiss, then a click; a bat's
two high chirps, then a flap; a mole's three quick sniffs, then a
scrape; a snapcap's a wet squelch, then a snap; a herb mimic's a rustle
of leaves, then teeth; a bone rat's a quick clatter of bones; an oil
tick drinking, a wet slurp, then a gulp. Files and loudness in
`SOUNDS-2.md`. All ten share one line under Fighting, Bites, so the list
fits the smallest card (offered too: two columns; a fifth kind,
Creatures). The gloamling, lampmoth and warden stay silent; their own
board comes later.

**D-833 · 2026-11-11 · The rest of the sounds** (the owner's go-ahead:
"the creative freedom and the go ahead to do the rest of the audio
implementation with your recommended choices"; answers the rest of
Q-095 but its "Maybe" and "Later") Claude picked each of the sounds still
without a file, by its measured shape, with no board first; the owner
hears them on the sound board and asks for swaps. Each pick and its
file is in `SOUNDS.md`, `SOUNDS-2.md` and `SOUNDS-3.md` (new: the
creatures' and places' tables, D-832's bites with them), marked D-833. The game's rules
stay as they are: the new sounds read the turn's events and what
changed (a creature under the earth, a pile of bones, a line said).
"You can't carry more" plays the Can't tock (D-819). Settings' lists
still fit the smallest card: the last three bites join Bites; the
creatures' own sounds share Creatures under Fighting; Steps gains
Falling (a fall, waking) and New rooms (a new floor, a room); Finds gains
Eating, Making and Places (the waystone's bells and hum, the boon's
chime, fishing, sleeping, people leaving and arriving); Menus gains Run
ends. D-828 and D-829 move to `archive/DECISIONS-SURFACE.md`, word for
word.

**D-834 · 2026-11-11 · The oil's warning** (the owner's picks; part of
Q-095) All the "Maybe" sounds are wanted: the heartbeat at the last heart,
sounds all around and music too, one step each, the oil warning first.
The owner keeps Claude's picks (D-833) for now. From a board of 4 (two
sputters, two small pops, a draught in the flame, the lantern rattling),
the recommended one: two short sputters cut from the empty lantern's own
crackle (`Fire-017`), the second softer and lower. It plays with "The
flame is getting low." as the oil falls under 20% (D-096), once on the
way down, and again only after the oil has gone back above it (offered
too: both at 25%; the sound at 25% and the line at 20%). With a flask in
the bag poured by itself at 55%, it plays only when none is left. One
Settings line under Steps, Oil runs low. File and loudness in `SOUNDS.md`.

**D-835 · 2026-11-11 · The heartbeat at the last heart** (the owner's
picks, both recommended; part of Q-095) From a board of 4, each beside
poison's double throb (a soft lub-dub twice; one slow heavy beat; a
racing heart, three quick beats; a wooden knock-knock): a soft lub-dub
twice, the second fainter. Impact Sounds' impactSoft_medium 001 then 002
at 0.8 and 0.74 pitch, muffled above 350 Hz, 0.17 s apart, at 0.36 and
0.25, then again 0.8 s later at 0.25 and 0.17: four quick soft knocks,
where poison has two slow punches. It plays once, as a turn leaves the
hero on one heart from more, 0.7 s after the bite's blow or poison's
throb; again only after a heart has come back and gone again; a fall,
waking at full hearts, does not (offered too: again every few steps;
beating on its own in time). One Settings line under Fighting, Last
heart. D-830 moves to `archive/DECISIONS-SOUNDS.md`, word for word.

**D-836 · 2026-11-11 · A cave's drips** (the owner's picks, all
recommended; part of Q-095) Sounds all around begin with drips in the
caves. From a board of 4 (a drop and its ripple; a single plip; a clear
plink; a far-off drip), the first: the elemental pack's Water-009 at 1.2
pitch, straying a tenth, at 0.1, through the cave's echo as the stone
steps. One drip every 8 to 16 seconds, the gap picked at random each time
(offered too: every 3 to 6; every 20 to 40), in real time while play
shows the rock caves, floors 2 to 4 (offered too: every stone floor
below; every floor below), each placed a little left or right (up to
0.6 of the way; offered too: always in the middle). Leaving, or a card
over play, stops them. They follow Finds' loudness and share Places'
line, as Finds' list is full on the smallest card (offered too: their
own line under Steps; Coins and Shelf joined). D-831 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-837 · 2026-11-11 · Music on the surface** (the owner's picks; part of
Q-095) The Tallbeard bundle's pre-2023 and Troubadeck zips (Abstraction,
CC0, checked in their licence) came through a temporary GitHub release;
Tom Feldmann's Wild Music Pack can follow. From a board of 8 calm tracks,
picked by measuring all 139 (each non-stop or with a 30 s, 60 s or 2 min
gap), track 6, "Ludum Dare 30 06" (2 min), plays on the surface by day and
by night, home too, non-stop with no break (offered too: with a 30 s,
60 s or 2 min gap). Leaving the surface fades it out over 2 seconds
(offered too: stopping at once; playing on everywhere); back on the
surface it starts from its beginning a second later, fading in over a
second. None plays on the title or below, for now. Music is a fifth kind
in Settings with its own loudness, 50% until picked (offered too: full;
a quarter; one On or Off switch; a line under Menus), and one line in its
list, Surface; a change of Music's loudness ticks. Each other place's
music is its own step. File and loudness in `SOUNDS-3.md`. D-832 moves to
`archive/DECISIONS-SOUNDS.md`, word for word.

**D-838 · 2026-11-11 · Music in the rock caves** (the owner's picks, all
recommended; part of Q-095) From a board of 8 calm, dark tracks for
floors 2 to 4 from the same bundle, measured again from all 138 (darkest,
sparsest, slowest, mostly minor; the surface's tune beside them to
compare), track 1, "The Vile Grove" (2 min), plays in the rock caves,
floors 2 to 4, the same floors as the drips (offered too: every floor
below), non-stop with no break, the drips over it (offered too: with a
30 s, 60 s or 2 min gap; offered too: VGMA Challenge 19, Patreon
Challenge 05, Ludum Dare 30 05). It changes as the surface's does: the
old place's tune fades out over 2 s, the new one starts a second later,
fading in over a second; from floor to floor within the caves it carries
on (offered too: starting again on each floor; a crossfade). A second
line in Music's list, Rock caves. File and loudness in `SOUNDS-3.md`.
D-833 moves to `archive/DECISIONS-SOUNDS.md`, word for word.

**D-839 · 2026-11-11 · Music in the crypt** (the owner's picks; part of
Q-095) From a board of 8 calm, dark tracks for the crypt from the same
bundle, measured again from all 138 (five from the caves' board, three of
them its runners-up; the surface's and the caves' tunes beside them to
compare; the crypt's stone steps playing along), track 5, "Ludum Dare 30
05" (2 min 35 s, the quietest and longest), plays in the whole crypt: its
two top rooms by the cave mouth (depth 0, below the sky) and floor 1
(offered too, recommended: "Patreon Challenge 11"; offered too: floor 1
only; floor 1 with the surface's tune carrying on in the top rooms). It
carries on down the crypt's stairs to floor 1, non-stop with no break
(offered too: with a 30 s, 60 s or 2 min gap), and changes as the others
do: the old place's tune fades out over 2 s, the new one starts a second
later, fading in over a second. A line in Music's list between Surface
and Rock caves, Crypt. File and loudness in `SOUNDS-3.md`. D-834 moves
to `archive/DECISIONS-SOUNDS.md`, word for word.

**D-840 · 2026-11-11 · Music in the warrens** (the owner's picks, all
recommended; part of Q-095) The warrens came before the dungeon. From a
board of 8 calm, dark tracks from the same bundle, measured again from
the 84 over 45 s, the three tunes already playing left out (three new to
a board, five from the crypt's; the rock caves' and the surface's tunes
beside them to compare; the warrens' muffled earth steps playing along),
track 1, "Patreon Challenge 11" (1 min 7 s, the darkest, with the most
low notes), plays in the warrens, floors 5 to 7 (offered too: Patreon
Challenge 09, Patreon Challenge 01, Ludum Dare 30 03, Patreon Challenge
04 and three more; floor 5 and every floor below), non-stop with no break
(offered too: with a 30 s, 60 s or 2 min gap), carrying on from floor to
floor (offered too: starting again on each floor). It changes as the
others do: the old place's tune fades out over 2 s, the new one starts a
second later, fading in over a second. The dungeon stays quiet, its own
step. A line in Music's list after Rock caves, Warrens. File and loudness
in `SOUNDS-3.md`. D-835 moves to `archive/DECISIONS-SOUNDS.md`, word for
word.
