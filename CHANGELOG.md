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

## 0.3.256 (2026-11-10)
- New: the Mole Claw Pick, the Mole Claw's first use. The workbench's BUILD tab makes it from 1 Mole Claw, 2 Wood and 2 Stone: the Stone Pick's handle with a mole's pale claw as its head. Hold it in the Tool slot and it does all the Stone Pick does, faster: a copper vein breaks in 2 bumps, not 4, and rubble clears in 2, not 3. Your Stone Pick stays yours; swap them in the Tool slot as you would the rod.
- Mole Claw now says "A mole claw, for a mole claw pick."
- Decisions: D-810.

## 0.3.255 (2026-11-10)
- New: the Fang Charm, the Bat Fang's first use. The workbench's GEAR tab makes it from 1 Bat Fang and 1 Copper Ore: a pale bat fang set in copper. Wear it, and each creature you beat gives you back 1 heart about 1 time in 4, never past your most. When it does, "The fang drinks. You feel better." shows and a small red heart rises beside the "+1" over you. A pile of bones scattered counts as beaten too.
- Bat Fang now says "A bat fang, for a fang charm."
- Decisions: D-809.

## 0.3.254 (2026-11-10)
- New: the Glow Lamp, the Glow Gland's first use. Once you have held a Glow Gland and Wood, your bag's Make tab makes it from 1 Glow Gland and 1 Wood, as a torch is made. Set it down anywhere, as a torch: the gland sits in a small copper cup on the torch's stick and lights 3 tiles in a soft, steady green, for 300 turns, three times a torch. Then it goes dark, leaving bare floor. Lampmoths and bats fly to it as to any light.
- Glow Gland now says "A glow gland. With wood, a glow lamp."
- Decisions: D-808.
