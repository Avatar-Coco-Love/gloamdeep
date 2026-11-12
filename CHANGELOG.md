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

## 0.3.296 (2026-11-12)
- New: build a campfire. Once you have held Stone and Wood, the bag's Make tab shows the Campfire: 3 Stone and 2 Wood, a turn. You carry one at a time.
- Set it down beside you on the surface and it starts as cold ashes, a ring of stones; light it with one turn of your lantern's oil, then sit, warm up and add wood as with any campfire.
- In the bag it looks like the cold ashes and says: "Stones and wood for a campfire.", "Set it down on the surface.", "Light it with a little oil."
- Decisions: D-851.

## 0.3.295 (2026-11-12)
- Nothing changes in the game yet. Building a campfire is settled, to come next: made on the bag's Make tab from 3 Stone and 2 Wood, then set down beside you on the surface, where it starts as cold ashes to light with one turn of your lantern's oil.
- Fires below ground were talked through and kept for later, maybe as their own step: a fire that never burns out could make a safe base deep down.
- Decisions: D-850.

## 0.3.294 (2026-11-12)
- New: feed a campfire. A burning fire's card now shows Sit and Add wood. Add wood takes 1 Wood and a turn and brings embers back up to blazing, so you can sit by it again for the bigger gift.
- Change: the burning fire's card is now called Campfire, with Sit in place of Yes. Add wood is grey with no Wood, or when the fire is already blazing. Cold ashes are still lit with your lantern's oil.
- Decisions: D-849.
