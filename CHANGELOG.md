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

## 0.2.172 (2026-10-29)
- Nothing in the game changes yet. Pictures drawn by the game compared two ways to show the woods past the crypt's doorway that leads outside. Picked: the real woods room itself, as it is now, with its trees, rocks, sticks, fallen branch and anything changed in play, so what you see is where you walk. The owner's words: "It needs to be completely accurate."
- The woods past the doorway will keep the woods' own light: daylight by the time of day, dusk, and a moonlit night.
- A rule for every place to come: past an opening, the place on the other side shows itself, made by its own kind's rules, with its own light and atmosphere. No one look fits every place.
- Decisions: D-438, D-439 and D-440.

## 0.2.171 (2026-10-29)
- The lighting is worked out faster again, so play is smoother on slower phones: walking on a simulated slow phone runs about 31 frames a second instead of 22 to 25. Every pixel looks exactly as before; this was checked on 1,200 pictures.
- The Half choice was built and measured first, but it ran no faster, so it is not in the game; Half and Automatic wait until the light is measured again. When the Light line comes, it goes after Motion, and Automatic is where it starts.
- Decisions: D-436 and D-437. Questions opened: Q-069.

## 0.2.170 (2026-10-29)
- Fixed: on some screen sizes, such as a phone held sideways, the whole light went black in caves bigger than the screen, so the hero and lantern vanished. The view now always stops on a whole pixel, and a test checks it.
- Decisions: D-434.

## 0.2.169 (2026-10-29)
- Nothing in the game changes. Pictures drawn by the game compare today's light with two half-size lights, worked out on one pixel in four. The soft one is picked for a Half choice: it looks almost the same, with shadow edges a touch softer, and runs about 35 frames a second on a simulated slow phone instead of 26 to 30.
- Picked for later: an Automatic choice that switches the light to half after 3 seconds under 50 frames a second, until the game is opened again.
- Found: on some screen sizes the whole light goes black in rooms bigger than the screen, so the hero and lantern vanish. Its fix is the next step.
- Decisions: D-432, D-433, D-434 and D-435. Questions closed: Q-068.
