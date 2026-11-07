# Faster making (D-621)

Moved word for word from `DECISIONS.md` at 0.3.85 (D-630), as that file
neared 12 KB, and D-622 at 0.3.86 (D-631), and D-623 at 0.3.87 (D-632), and D-624 and D-625 at 0.3.88 (D-633, D-634), and D-626 at 0.3.89 (D-635), and D-627 at 0.3.90 (D-636). In force.

---

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
