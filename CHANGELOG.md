# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.3.js` (D-254, D-528).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- `0.3.x`: stage 0.3, the world (D-168), from 0.3.0, once stage 0.2's
  last steps were done (D-528).
- Later minor versions (`0.4`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.146 (2026-11-08)
- The Lightkeeper's Locket can go on the shelf. Bump the shelf with the locket in your bag and it asks "Set the locket on the shelf?" Yes sets it there in a turn: "You set the locket on the shelf." It stays there for good.
- The shelf shows it: the locket small and open on its top shelf, in the relics' violet glow, with a glint now and then. At night the glow shows from across the surface.
- Bumped then, the shelf asks "Deconstruct shelf?" with "The locket rests here." Yes puts the shelf and the locket back in your bag together; with no room for both, your bag is full and both stay.
- What the locket does there, on a fall, comes at the next step.
- Decisions: D-693. D-683 and D-684 moved to the archive, word for word.

## 0.3.145 (2026-11-08)
- The Lightkeeper's Locket has its new look: open on its hinge, a gold case with a violet hollow and a tiny flame burning inside. The flame scratched on its lid is violet now.
- Relics have their own glow: a violet halo that slowly swells and fades, seen even in the dark, though it lights nothing. Now and then a glint slides along the locket's edge. With reduced motion the glow holds steady and there is no glint.
- Decisions: D-692.

## 0.3.144 (2026-11-08)
- A new creature guards the Lightkeeper's Locket in place of the rat: the warden, an old stone guard made by Underhearth's people to guard their things. Cracked and mossy, with a chipped gold band and an eye slit.
- It stands asleep as a statue, its eye dull, until you bump it. Then its eye lights violet and it chases you for 6 turns, and stands still again. It has 4 health and bites for 1 heart: four lantern swings or two knife blows.
- It is seen as it is, never in disguise, so the Bestiary meets it on sight. It turns up only beside the locket.
- Decisions: D-692. D-681 and D-682 moved to the archive, word for word.
