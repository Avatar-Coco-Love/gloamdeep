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

## 0.3.211 (2026-11-09)
- Oilcaps now grow outside: one in each woods room, home too, at the foot of a tree. The mountain rooms have none. Walk onto it to take it, as in the caves, and it grows back a day after you pick it.
- In a saved game, woods rooms you haven't seen yet get their oilcap too; rooms you have seen stay as they were.
- Decisions: D-760. Questions opened: Q-092.

## 0.3.210 (2026-11-09)
- Waking from sleeping out now leaves you stiff for 20 turns: "You wake on the cold ground, stiff." While stiff, 1 swing in 3 at a creature misses, "Your stiff arm swings wide.", and the turn still passes.
- Stiff shows as a pale blue Zz beside the poisoned drop under your hearts. Tap it to see the turns left. A fall ends it.
- Decisions: D-759.

## 0.3.209 (2026-11-09)
- Outside at night, with no creature after you, a moon button now shows above the lantern. Tap it and a card asks Sleep here until morning? Yes sleeps until the next morning, and the lantern burns no oil while you sleep.
- Sleeping on the ground isn't a bed: you wake with the hearts you lay down with, no healing and no gold heart.
- Decisions: D-758. Questions opened: Q-091.
