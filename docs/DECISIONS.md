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

**D-528 · 2026-10-31 · Version 0.3.0** (the owner's pick, recommended;
supersedes the version part of D-237) Stage 0.2's last steps are done,
so versions move to 0.3.x from 0.3.0, this version, for stage 0.3, the
world (D-168). New history goes in `history-0.3.js`. The next audit,
0.2.268 (D-518, D-519), keeps its distance: 0.3.32.

**D-590 · 2026-11-05 · Planning ahead** (the owner's picks, recommended)
Research helpers work beside each build step and report to Claude, who
brings options; only one conversation builds Gloamdeep at a time. The
whole game's scope is shown as one visual map, then filled in piece by
piece. Selling on Google Play: a checklist now (`docs/STORE.md`), each
piece built when it is due, so nothing blocks it later. Better level
making, as data in named passes, is planned before it is built.

**D-619 · 2026-11-06 · Research kept, docs tidied, the light kept** (the
owner's picks, both recommended; nothing visible changes) One PR holds
all three. The three research pages (lore, room making, the 0.3.73
health check) and their open suggestions are kept in a new
`RESEARCH-PAGES.md`. `ART-DIRECTION.md`'s generated places' colours move
to `ART-DIRECTION-2.md`, and `SCOPE.md`'s parts 6 to 8 to `SCOPE-2.md`,
word for word; five docs that no longer matched the code are fixed. The
light keeps each light's shadow cast between frames, at a little more
than its reach, and casts again only when the light moves, the room
changes or the reach grows past it (`keptCells`, `src/core/light.js`):
the picture is the same pixel for pixel, the light about 15% quicker
standing still.

**D-627 · 2026-11-06 · Test spots** (the owner's picks, all recommended;
step 18b, after Endless oil, D-626; the last of D-621) Three slots kept
on this device, in a new Spots section of the dev panel, its tab a
bookmark. Each slot's line says what it holds (1 · DEPTH 3 · TURN 120,
or 1 · EMPTY); Save puts the game as it is now into it, Load makes it
this profile's journey, no turn passed, and counts as a dev jump, so
records stop counting (D-232). Claude's, the owner may change it: the
slots are the device's, shared by every profile; a spot is kept like a
journey, so one kept before a change of the state's shape still loads;
Save writes over a full slot without asking; Load is greyed while a
slot is empty. D-608 moved to `archive/DECISIONS-FISHING.md`, word for
word.

**D-628 · 2026-11-06 · The first words** (the owner's picks; step 19,
Lore, its first piece) A new journey opens on a glass card in the middle
of the room, the crypt dim around it, after the way to play is picked:
"You wake in the dark of the crypt. Your lantern still burns, but its oil
will not last. Something waits below." It shows once, and BEGIN, Enter,
Space, Esc or a tap anywhere begins play. Claude's, the owner may change
it: each sentence its own paragraph, bone white and centred; no cross,
as there is only one way on; not shown again after a Hardcore fall's
Same world or New world. D-620 moved to `archive/DECISIONS-WAYSTONES.md`,
word for word.

**D-629 · 2026-11-06 · Lore and quests, the plan** (the owner's picks,
recommended where marked) Lore starts with a line for each creature in
the Bestiary (recommended), written once the owner has shared their own
lore ideas, which come first. Quests come in three kinds, not all at once
*(order Claude's, the owner may change it)*: a list of goals made from
what is already in the game (recommended), then a main story line, then
people's requests, such as the peddler asking for things.

**D-630 · 2026-11-06 · The Bestiary tab** (the owner's picks, all
recommended; step 19's first piece; builds D-350, D-352) The Journal gets
a third tab, Bestiary, after Growth: a table of the creatures met, each
one's drawing and name, how many met and how many beaten. A creature is
met the first time a light reaches it, each one once; a mimic asleep or a
snapcap shut is not met until it shows itself, and one beaten in the dark
is met then too. The counts are kept in the profile, as Records are,
through falls and new journeys; play before this step isn't known, so all
start at zero. "How it acts" and "how to fight it" come at later steps,
Claude drafting them and the owner editing. Claude's, the owner may change
it: the headings Met and Beaten; "No creatures met yet." with none;
Right past Hands on Growth turns to it; sideways, two tables side by side.
D-621 moved to `archive/DECISIONS-MAKING.md`, word for word.

**D-631 · 2026-11-06 · How it acts** (the owner's picks, all recommended;
step 19; builds D-352, D-630) Each creature's Bestiary page says how it
acts, in Claude's words, which the owner took as drafted and may still
change: one or two sentences each, kept in the registry as `acts`, on
behaviour only, the fighting tips waiting for "how to fight it". A tap on
a row of the Bestiary's table, or Up or Down and Enter, opens that
creature's page: its drawing twice as big, its name and counts, then how
it acts. Before one is beaten the page says, in grey, "Beat one to learn
how it acts." Claude's, the owner may change it: the picked row's name
gold; Esc, the round cross or Left goes back to the table. The maker
leaves `acts` a blank, and the checker asks every creature for it.
D-622 moved to `archive/DECISIONS-MAKING.md`, word for word.

**D-632 · 2026-11-06 · How to fight it** (the owner's picks, all
recommended; step 19's last Bestiary piece; builds D-352, D-631) Each
creature's Bestiary page ends with how to fight it, in Claude's words,
which the owner took as drafted and may still change: one or two
sentences each, kept in the registry as `fights`, on tactics from the
rules as they are (one that steps beside the hero bites only next turn,
so waiting gives the first blow; a mimic's waking bump is a free turn).
It sits under "how it acts", below a gold heading, "How to fight it".
Until 3 are beaten it says in grey how many more: "Beat 2 more to learn
how to fight it." Claude's, the owner may change it: with none beaten,
"Beat 3 to learn how to fight it." The maker leaves `fights` a blank,
and the checker asks every creature for it. D-623 moved to
`archive/DECISIONS-MAKING.md`, word for word.

**D-633 · 2026-11-07 · The story** (the owner's picks; step 19; answers
Q-072; builds D-036, D-628, D-629) The story is set down in
`docs/LORE.md`: Underhearth, the city below, fell when the First Light's
oil ran low; the Lightkeepers' hearth in Hearthwood is its spark; the
dying First Light calls; the hero went down with their teacher, Old
Maren, whom the gloam took, and came back without their memories; the
goal is to relight the First Light. The guide is a spark of the First
Light; Maren is a boss with a history (Q-083), freed when beaten; the
crypt is the oldest of many ways down. Who the keeper is who leaves the
finds waits (Q-084). Tone: gloomy, with hope. D-624 moved to
`archive/DECISIONS-MAKING.md`, word for word.

**D-634 · 2026-11-07 · How long to the end** (the owner's picks, all
recommended; builds D-028, D-414, D-463, D-633) Relighting the First
Light takes about 12 to 20 hours, and finding everything about 30.
Claude's targets, to tune as each biome is played: about 8 floors a
biome, 32 in all; about 9 ordinary creatures a biome and 8 to 12 from
the portals; 4 biome bosses, then Old Maren near the end, deep in
Underhearth, just before the First Light; about 8 wanderers and rare
named creatures; about 150 things; 6 to 8 weapon kinds, one better metal
a biome; 4 found abilities and 2 or 3 from relics; 30 to 40 of Maren's
pages. After the First Light is relit the journey goes on, the gloam
pushed back but not gone. It is built one biome at a time, each
finished with its creatures, boss, ability and pages, then played and
tuned before the next. D-625 moved to `archive/DECISIONS-MAKING.md`,
word for word.

**D-635 · 2026-11-07 · Biome depths and the content map** (the owner's
picks, recommended; answers Q-082; builds D-028, D-634) Each biome is 8
floors: woods and mountains, the surface and depths 1 to 8 (today's
crypt, caves and warrens, all of it); the old mines and caves 9 to 16;
the glowing fungal caverns 17 to 24; the sunken ruins, Underhearth, 25
to 32, the First Light at the bottom. Today's areas by depth (D-233) are
fitted to this when biome 2 is built. All the game's content is planned
on one map: Claude drafts every biome's creatures, items, plants, seeds,
ores, recipes, weapons and skills on one page, all marked draft, then
the owner goes through it a part at a time, recorded as it goes. First
part: skills and mechanics (the Growth tree, found abilities, weapons
and attack shapes, ranged and elemental), in a fresh conversation;
then items and crafting, plants and harvests, creatures and bosses,
which are planned knowing each other. D-626 moved to
`archive/DECISIONS-MAKING.md`, word for word.
