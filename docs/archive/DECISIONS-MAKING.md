# Faster making (D-621)

Moved word for word from `DECISIONS.md` at 0.3.85 (D-630), as that file
neared 12 KB. In force.

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
