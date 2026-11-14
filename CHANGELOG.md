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

## 0.3.350 (2026-11-14)
- In the bag, a weapon now shows its hits on the grid under its rows: the hero, a rat on each tile it hits and what it takes in red, "This one" above and "Held now", the weapon in your hand, below. The spear hits two rats in a line; the Warden's Fist knocks its rat a tile back.
- With no weapon in hand, "Held now" shows the lantern's hit of 1. Tapping the weapon in the gear row shows only its "Held now" row.
- On a short screen held sideways the picture is left out when it would reach the buttons; the rows always show.
- Decisions: D-907.

## 0.3.349 (2026-11-14)
- At a stash chest, the chosen thing, in the chest or the bag, now shows what it does in rows under its name, as in the bag: a draught what it does and for how long, a weapon how hard it hits. "Tap to move" sits below them, left out when there's no room.
- Held sideways, the rows end left of STORE when they reach it, so they never run under the button.
- Written down for later: the round map fading in the dark, and its rim showing danger.
- Decisions: D-906.

## 0.3.348 (2026-11-14)
- At the peddler's, the chosen thing now shows what it does, in rows under how many you carry, on both Sell and Buy: an Oil flask how much of the lantern it fills, a torch how long it burns. What it sells for isn't a row there, as the peddler says it himself.
- Decisions: D-905.
