# The waystones' first steps (D-579, D-587 to D-589, D-591 to D-595)

Moved unchanged from `docs/DECISIONS.md` at 0.3.50 (D-593), when it neared
12 KB: the home waystone asleep, waking it, and the sleeping waystone at
depth 2 (step 16's first three parts). Still in force.

D-593 and D-594 moved unchanged at 0.3.52 (D-595): travel between woken
waystones and the waystones on the other depths, step 16's last parts.
D-595 moved unchanged at 0.3.56 (D-599): the travel card scrolls.
D-588 moved unchanged at 0.3.66 (D-611): pictures drawn again after a wipe.
D-579 and D-587 moved unchanged at 0.3.67 (D-612): waystones for fast
travel, and landmarks made from data.

**D-579 · 2026-11-02 · Waystones for fast travel** (the owner's picks,
recommended, from their wish list; the Core Keeper way in Gloamdeep's
own form) Waystones are found out in the world and woken by walking up
to one. One stands near the centre of the home room. The others stand
at the top of each band of floors, depths 2 (caves), 5 (warrens) and 8
(the dungeon), then every 4th depth (12, 16, 20…), and at the top of
any band added later. Standing on a woken waystone, the hero picks
another woken one on the map and goes there. A pocket waystone, to
travel from anywhere, comes later as a craft. How waking looks and
sounds, and the map's travel card, are asked at its step.

**D-587 · 2026-11-03 · Landmarks made from data** (the owner's idea and
picks, recommended; builds on D-579) A waystone is 5 × 5 tiles: a cross
through the middle is walkable, the four 2 × 2 corners are not, and the
centre tile is the plate where it is used. Landmarks bigger than one
tile are registry entries: a small text plan, where they join tunnels,
where they stand and what they block. One shared stamper sets the plan
aside before a room is dug, digs around it, joins its tunnels, checks
everything is still reached, tries again if not, and uses its own seed
so rooms without one stay as they are. Tests build many rooms for every
landmark; dev mode can drop one in and show the set-aside patches. The
stamper comes with its first use, a waystone at depth 2, and only
places it. The rest is asked at each step (Q-080).

**D-588 · 2026-11-03 · Pictures drawn again after a wipe** (the owner's
fix, ahead of D-587's first step) On Android the hero and the tiles came
back blank after the app was in the background: the browser wipes kept
canvases. Every canvas drawn once and kept is now drawn again when the
browser hands it back (contextrestored), and checked when the page shows
again (visibilitychange). Nothing visible changed.

**D-589 · 2026-11-05 · The home waystone, asleep** (the owner's picks,
all recommended; step 16's first part, builds on D-579 and D-587) The
home waystone stands in the woods with its plate 3 tiles north of the
room's middle, the trees one tile around it cleared, so the middle is at
the foot of its south arm. It looks like a small henge: a tall grey
standing stone on each 2 × 2 corner, worn flagstones on the cross and a
round carved plate in the middle, its rune cut but dark. The corner
stones block light and sight, like rock. A save that already has a home
gets it once, at the nearest spot to there where none of the hero's
built things, the pond, the cave mouth, a person or the hero stand; only
trees, stumps, branches and bushes there are cleared, and nothing of the
hero's moves. A new journey still begins in the crypt (Q-081).

**D-591 · 2026-11-05 · Waking the home waystone** (the owner's picks, all
recommended; step 16's second part, builds on D-579 and D-589; answers
part of Q-080) The home waystone wakes the first time the hero steps onto
its plate; the step is the turn, and waking costs nothing more. It wakes
to the stairs' violet: the plate's rune lights for good, with the stairs'
faint glow around it. As it wakes, the rune lights from the bottom up and
one soft violet ring spreads over the cross and fades (none with reduced
motion), three soft bell notes rise, and the line says "The waystone
wakes." It stays woken in its room's map, so a saved journey keeps it.
Mock-ups: https://claude.ai/artifact/GB96WARVCRASKzX81XUwJ4

**D-592 · 2026-11-05 · The sleeping waystone at depth 2** (the owner's
picks, all recommended; step 16's third part, builds on D-579, D-587 and
D-591; answers part of Q-080) On depth 2, one room the seed picks holds a
waystone asleep: never the room with the stairs up, and only a room where
it fits clear of the stairs down. It stands at the spot nearest the
room's middle, with one tile of open floor around it; no deposit or pool
goes there. The shared stamper (`stamper.js`) sets it aside as each try
of the room is dug and tries again if anything is cut off. It looks just
like the home stone for now; later, waystones get different art and ways
of building (the owner's wish). A saved journey that has seen that room
has it made again once, with the stone; a hero in it goes to the floor's
stairs up. Dev mode's tools for landmarks come at their own step.

**D-593 · 2026-11-05 · Travel between woken waystones** (the owner's
picks, all recommended; step 16's fourth part, builds on D-579, D-591 and
D-592; answers Q-080) Standing on a woken plate, a tap on the hero, Space
or Enter opens the travel card; walking over the plate never opens it.
The card is a short list on glass, "WAYSTONES": home first, then each
stone by depth, its name and a note under it ("Home", "The surface.";
"Depth 2", "The caves."). One not yet woken shows as ???, "Not yet
woken.", dim, so the player knows it is there; the one stood on is dim,
"You are here." Tapping or picking a woken one goes there at once, onto
its plate, with the stairs' fade: "The waystone carries you." Travel is
free: no turn passes and no oil burns, so the oil where the hero arrives
is the pressure, and the creatures there can't act before the hero's
first move. It is barred while a creature awake stands beside the hero,
corners too, or chases them: "Not with a creature so near." and no turn
passes. The lines are Claude's wording, to change at the playtest. To
keep this file small, D-589, D-591 and D-592 moved to
`archive/DECISIONS-WAYSTONES.md`.

**D-594 · 2026-11-05 · The waystones on the other depths** (the owner's
picks, all recommended; step 16's last part, builds on D-579, D-592 and
D-593) All at once: a sleeping waystone on depths 5, 8, then every 4th
(12, 16, 20…), and at the top of any band added later, each placed as
depth 2's. The travel card lists home, then every stone down to the next
one below the deepest floor the journey has reached, that one as ???. A
saved journey that has seen a room now holding a stone has it made again
once, as D-592's; every other room stays exactly as it was. Sideways the
card fits 5 rows, so from depth 12 its list scrolls inside the card, like
the version history (the owner's pick), built as its own next step.

**D-595 · 2026-11-05 · The travel card scrolls** (the owner's picks, all
recommended; builds on D-593 and D-594) When the waystones don't all fit,
the travel card's list scrolls inside the card as the version history's:
it opens on the first woken stone not stood on, scrolled into view; Up and
Down keep the chosen row whole in view; a swipe, Page Up or Page Down
turns a page, the flame moving to the top row shown if it scrolled away;
a thin bar at the card's right shows where the list is. Only whole rows
show while it scrolls, 5 sideways. D-593 and D-594 archived.
