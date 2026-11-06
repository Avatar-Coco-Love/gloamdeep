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

**D-620 · 2026-11-06 · The waystone 3 × 3** (the owner's idea and
picks, all recommended; mock-up:
https://claude.ai/artifact/D4Bum5CsmzF7mR86DyciML) A waystone is 3 × 3:
the walkable cross, a standing stone in each corner tile, the plate in the
middle (supersedes D-587's 5 × 5 and four 2 × 2 corners). Look B, old and
mossy: each stone fits its own tile, resting 2 pixels up on its shadow,
9 to 11 pixels wide with a rough rounded top, some leaning a pixel, moss
on its lit top left, a crack, and in the woods grass at its foot; the
flagstones' rounded corners show the ground; the plate is as before. The
home plate stands 2 tiles north of the woods' middle (supersedes D-589's
3), the middle still at the foot of its south arm. In a cave room the old
5 × 5 patch stays open floor (`pad`), so every depth's stone keeps its
room and spot, and each room comes out as before but for the stone. Old
saves have every waystone made 3 × 3 where it stands, once, asleep or
woken as it was. D-610 moved to `archive/DECISIONS-FISHING.md`, word for
word.

**D-621 · 2026-11-06 · Faster from idea to game** (the owner's picks,
all recommended) Other stories, each with its own world, role and
start, wait for later; first, story 1 grows much bigger. To make that
quicker, plug-in systems come before Lore. First a checker,
`tests/checker.test.js`, that names every piece a registry entry still
lacks (a line, a sprite, a hit flash, a sound, a way, where it lives, a
test, a content row) and the file to fix (this version). Then a maker, a
tool that writes a new creature's, find's, tile's or person's empty
pieces and its test. Then the dev panel as a bottom sheet with
pictures: half height, the room still seen above it, icon tabs, a
search box, Spawn a grid of sprites by kind. Then god mode, and saving
and loading test spots; more tools later. Claude's, the owner may
change it: plug-in slots for systems come with the next new system
(such as a light puzzle), shaped by a real use; one folder per thing
is weighed again at the audit, 0.3.112. The checker found the Snapcap
Gill with no content row; it has one now. D-611 and D-612 moved to
`archive/DECISIONS-FISHING.md`, word for word.

**D-622 · 2026-11-06 · The maker** (the owner's picks, all recommended;
step 18b, after the checker, D-621) `node tools/make.js <kind> <id> "<Name>"`,
everything on one line, kind one of creature, find, tile or person;
`--check` lists what it would write and writes nothing; an id or name
already taken is refused; undo with git. It writes every empty piece
(TECH.md, "Adding content"): the entry, its lines, its picture and
sprite, a creature's hit flash, a tile's drawing, where it lives, its
test and its content row. What needs the owner's numbers, words and
art is a marked blank (`/* blank */` or `// blank:`), which the game
still runs with: numbers 1, a line its own name in brackets, a creature
`from: Infinity` (only the dev tools), and a grey "?" picture; the
checker names each blank left and its file. It writes the content row
only, of `?`s; the glossary word and the decision stay by hand.
D-613 and D-614 moved to `archive/DECISIONS-FISHING.md`, word for word.

**D-623 · 2026-11-06 · The dev panel as a bottom sheet** (the owner's
picks, all recommended; step 18b, after the maker, D-621) Look A of the
mock-up: the panel is a sheet along the screen's foot, half its height,
a row of icon tabs across its top (an eye for View, a sparkle for
Spawn, a door for Room, a drop for Oil, a heart for Hero, an arrow for
Share; 8 × 8 pixels) and the open section's name above its tools. While
it is up the room slides clear, so the hero stays in the middle of what
is still seen. On a sideways phone or a PC it is at most 420 px wide,
at the bottom left, and on a short screen taller, up to two thirds; the
room then slides right instead, whichever leaves more of it seen. Two
steps: the sheet now, its tools as they were; next, Spawn a grid of
sprites by kind with the search box. Claude's, the owner may change
it: a folded sheet is only its tabs; its handle is a look only, and
does not drag; the stats line sits above it while it is up. D-615 and
D-616 moved to `archive/DECISIONS-FISHING.md`, word for word.

**D-624 · 2026-11-06 · Spawn as a grid of pictures** (the owner's
picks, all recommended; step 18b, after the bottom sheet, D-623) Spawn
is a grid of pictures, one per registry entry, each 16 × 16 drawn at
32 px with no words; the picked one's name shows in the section's name
line ("SPAWN · CAVE MOUTH"). The kinds keep their headings in one long
list. Above them a search box, typed with the device's own keyboard,
narrows the grid by name with each letter; a heading with nothing left
hides, and × clears it. A tile shows its real drawing, as the room
draws it. Claude's, the owner may change it: a tile is drawn on a
crypt floor; a torch on a wall's face; anything with no picture yet
shows a grey "?"; the box's letters are not the game's keys, and Esc
leaves it. D-617 moved to `archive/DECISIONS-AUDITS.md` and D-618 to
`archive/DECISIONS-FISHING.md`, word for word.

**D-625 · 2026-11-06 · God mode** (the owner's picks, all recommended;
step 18b, after Spawn's grid, D-621, D-154) A God mode switch in the dev
panel's Hero section, under Refill hearts. While it is on a creature
still bites, with its line, its sound and the hero's red flash, but
takes no heart, so the hero never falls from a bite. It is kept on the
state, so in the save, until switched off; a new game starts with it
off. It guards hearts only: the oil tick still drinks. The owner's idea:
the oil gets its own switch in the Oil section, Endless oil, the next
step: the lantern never runs down and the tick's sip takes nothing.
Claude's, the owner may change it: armour's glance still shows its own
line; records count as usual; nothing shows god mode but the switch.

**D-626 · 2026-11-06 · Endless oil** (the owner's picks, all recommended;
step 18b, after God mode, D-625) An Endless oil switch in the dev panel's
Oil section, on its own row under Refill and Empty. While it is on a lit
turn burns nothing, and an oil tick still drinks, with its line, its sip
and the oil bar's flicker, but takes no oil. Switching it on leaves the
oil where it is, so a dim lantern set with the slider stays dim; the
slider, Refill, Empty and flasks still change it. It is kept on the
state, so in the save, until switched off; a new game starts with it off.

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
