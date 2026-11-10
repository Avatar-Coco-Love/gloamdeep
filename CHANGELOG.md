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

## 0.3.216 (2026-11-10)
- A name can now hold digits and spaces as well as letters, up to 12 in all, so OLD TOM and COCO 2 both work.
- The name pad's bottom row is M, Del, then Z, Spc, 123 and OK. Press 123 to swap the letters for the digits 1 to 9 and 0, and ABC to swap back.
- A space never starts a name or follows another space, and one left at the end is dropped when you press OK. On a keyboard, Space now types a space and digits type too.
- The rat pack, the scorpion and the bone rat stay as they are; the details Claude filled in are now settled.
- Decisions: D-765, D-766. Questions closed: Q-054. D-757 moved to the archive, word for word.

## 0.3.215 (2026-11-09)
- The pale blue lines across doorways are about half as bright, so they no longer glare. They still pulse gently, and hold still with reduced motion. The map's doorway squares are unchanged.
- Decisions: D-764.

## 0.3.214 (2026-11-09)
- The first flower grows outside: the duskstar, five violet petals round a yellow heart. 2 grow in each woods room, home too, on the grass; the mountain rooms have none. Each faces its own way and has its own slight shade of violet.
- Walk onto a duskstar to put it in your bag, for crafts later. A day after you pick it, it grows again somewhere else in the same room.
- In a saved game, woods rooms you haven't seen yet get their duskstars too; rooms you have seen stay as they were.
- Decisions: D-763.
