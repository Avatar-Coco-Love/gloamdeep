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

**D-740 · 2026-11-09 · The twelfth audit** (the owner's picks, all
recommended) At 0.3.192, nothing visible changed. A conversation's start
reads 10.2 KB, not 10.5. The in-game history's stage 0.3 file is split
again word for word: 0.3.76 to 0.3.150 go to `src/core/history-0.3-2.js`
(60 KB to 22 and 39). D-699 moves to `archive/DECISIONS-AUDITS.md`, and
D-734 to D-737, built, to `archive/DECISIONS-SURFACE.md`; ticked steps
21 and 22 are archived; all word for word. The start-up hook's message
names the commit checked out, not the old local `main` a shallow cloud
copy keeps. `WORKFLOW.md` gains what this stretch taught. One bug hunt
read the code since 0.3.152; its findings are listed for the owner to
pick from (https://claude.ai/artifact/NYbJtLXs97xmn7s1YBV4kK), each fix its own small step with a test.
The next audit is at 0.3.232.

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

**D-742 · 2026-11-09 · The bug hunt's fixes** (the owner's picks, all
recommended; the owner asked that every known bug be fixed, in one PR;
answers D-740's list) All nine findings are fixed, each with a test.
B1: cutting a path between Hearthwood rooms clears a fallen branch or
berry bush in its way, as a tree. B2, B3: one save upgrade (20 → 21)
makes each north room never seen, with nothing taken, today's mountain
room, cuts every Hearthwood room's paths again, and brings the copies a
fall and the dev Reset read up the same way, home's without the old
mouth. B6: a goal the journey's start skips, waiting in an older
profile, is ticked quietly, unpaid, and not listed. Claude's calls the
owner may change: B4, goals done on one turn each roll their reward
with the goal mixed in; B5 and T1, the unguarded flask and the rat
pack roll with salts of their own, so unvisited rooms may change; T2, a
spit grub's glob flies over a pile of bones; T3, a scorpion's tail
raised as the hero left is lowered when they come back (a fall that
wakes in the same room still keeps it).

**D-743 · 2026-11-09 · Words that fit** (the owner's picks, all
recommended; the owner asked that words running past a card's edge,
upright and elsewhere, be found and fixed, ready for what is added
later) Every card was drawn at upright and sideways phone sizes with
all content; six places failed. A quest's how wraps, and a done goal's
reward goes on its own grey line under it where it doesn't fit beside
the goal. A Journal list taller than its card (Records, the Bestiary,
a creature's page, Feats, Quests) scrolls a row at a time by a swipe,
the wheel or Up and Down, a page by Page Up and Down, with the thin bar
Version history has; upright the Bestiary is one table, sideways two
scroll together. The goal line's words wrap so it ends left of the
round map. A test draws every card at those sizes with every item,
creature, goal and boon, and fails when words leave a card or overlap.
Claude's calls the owner may change: in the stash chest, a long name
level with STORE wraps short of it, and the grey hint is left out where
it would pass the card's foot; Up and Down on the Bestiary's table
still pick a row, kept in view.

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

**D-780 · 2026-11-10 · Night creatures, third: the rare gloamling**
(the owner's picks, all recommended; builds D-779) Each night the seed
and the night pick one of the 5 woods rooms round home, and a gloamling
comes out there beside that room's lampmoth and bat, with the same
rules (D-778). It acts and leaves finds as it does below: a Gloam Wisp
about 1 in 2, a Gloam Eye about 1 in 10. Claude's calls the owner may
change: it may pick the same room two nights running; it never shares a
tile with the others. D-778 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-781 · 2026-11-10 · Day creatures, first: the mole** (the owner's
picks, from the herb mimic, scorpion, centipede and mole; builds D-778,
D-771's order) Day creatures are night creatures turned round, starting
with a creature the game has: the mole. One comes out each day in each
woods room round home, never home and never a mountain room, from
halfway through dawn, and any still standing are gone from halfway
through dusk. It acts and leaves finds as it does below. Claude's calls
the owner may change: as daylight shows every tile, it comes out on
open grass off the edge at least 4 steps from the hero, picked by the
seed and the day; one beaten stays beaten till the next day; the start
room is one of these rooms, so a mole may meet a new journey on its
first turn. D-779 moves to `archive/DECISIONS-SURFACE.md`, word for word.
