# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.2.js` (D-254).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.170 (2026-10-29)
- Fixed: on some screen sizes, such as a phone held sideways, the whole light went black in caves bigger than the screen, so the hero and lantern vanished. The view now always stops on a whole pixel, and a test checks it.
- Decisions: D-434.

## 0.2.169 (2026-10-29)
- Nothing in the game changes. Pictures drawn by the game compare today's light with two half-size lights, worked out on one pixel in four. The soft one is picked for a Half choice: it looks almost the same, with shadow edges a touch softer, and runs about 35 frames a second on a simulated slow phone instead of 26 to 30.
- Picked for later: an Automatic choice that switches the light to half after 3 seconds under 50 frames a second, until the game is opened again.
- Found: on some screen sizes the whole light goes black in rooms bigger than the screen, so the hero and lantern vanish. Its fix is the next step.
- Decisions: D-432, D-433, D-434 and D-435. Questions closed: Q-068.

## 0.2.168 (2026-10-29)
- The lighting is worked out about a fifth faster again, so play is smoother on slower phones: on a simulated slow phone, about 45 frames a second instead of 37. Every pixel looks exactly as before; this was checked on 3,456 pictures.
- A new tool, `tools/perf.js`, times play on a simulated slow phone, and `docs/TECH.md` now has a frame budget: 16.7 ms a frame in all, the light at most 8 ms. Changes to drawing are timed before and after.
- Decisions: D-429, D-430 and D-431.

## 0.2.167 (2026-10-29)
- Fixed: a creature standing where you arrive (on stairs, through a doorway) or wake after a fall now steps aside to the nearest free tile. Before, you and it shared one tile, both stuck: it couldn't bite and you couldn't hit it.
- The lighting is worked out about twice as fast, so play should run smoother on phones. Every pixel looks exactly as before; this was checked picture by picture.
- If your journey can't be saved, because the browser's storage is full or blocked, the text line now says "Your journey could not be saved." in amber, once. Before, saving failed silently.
- Decisions: D-426, D-427 and D-428. Questions opened: Q-068.
