# The share card, the 0.2.167 check (D-425 to D-428)

Moved unchanged from `docs/DECISIONS.md` at 0.2.168 (D-429), when it
neared 12 KB: the share card, and the check of the game that found a
creature sharing the hero's tile, made the light faster and warned of a
failed save. These are still in force unless marked superseded. Grep for
an ID or topic; never read this whole.

---

**D-425 · 2026-10-29 · The share card** (the owner's picks: A, the
first sentence, the script) A link to the game
shows a card: the title screen without its menu, the hero in the
lantern's light under the name, 1200 × 630, with "Gloamdeep" and the
line "Carry a lantern down through the gloam." `share.png` is the one
image file allowed (an exception to D-003's no image files): drawn by
`tools/sharecard.js` with the game's own code, never by hand, and drawn
again when the title art changes. Built in 0.2.166.

**D-426 · 2026-10-29 · A creature steps aside** (the owner's pick,
recommended; a bug found by the 0.2.167 check) A creature standing where
the hero arrives (stairs, a doorway, a dev jump) or wakes after a fall
steps to the nearest free tile, counted in steps: not solid, no item, no
other creature. With none free it stays. Before, the two shared a tile,
frozen. Built in 0.2.167.

**D-427 · 2026-10-29 · Faster light, the same look** (the owner's pick,
recommended; a step of D-294, D-295) The light is worked out in about
half the time, every pixel the same as before (checked picture by
picture): each light only over the square it can reach, remembered tiles
with nothing near their edge skip the blend, and f to the 1.25 is worked
as f × √√f. The room's canvas tells the browser it is read back every
frame. A simulated slow phone still runs under 60 frames a second; more
needs a look change or another way of drawing, the owner's call. Built in
0.2.167.

**D-428 · 2026-10-29 · A failed save says so** (the owner's pick,
recommended) When a journey can't be saved (storage full or blocked),
the text line says "Your journey could not be saved." in amber, once,
until a save works again. The words are Claude's, may change. Smaller
saves are left for later. Built in 0.2.167.
