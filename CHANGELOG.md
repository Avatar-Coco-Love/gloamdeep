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

## 0.3.254 (2026-11-10)
- New: the Glow Lamp, the Glow Gland's first use. Once you have held a Glow Gland and Wood, your bag's Make tab makes it from 1 Glow Gland and 1 Wood, as a torch is made. Set it down anywhere, as a torch: the gland sits in a small copper cup on the torch's stick and lights 3 tiles in a soft, steady green, for 300 turns, three times a torch. Then it goes dark, leaving bare floor. Lampmoths and bats fly to it as to any light.
- Glow Gland now says "A glow gland. With wood, a glow lamp."
- Decisions: D-808.

## 0.3.253 (2026-11-10)
- New: the Bone Hook, the Rat Bone's first use. The workbench's BUILD tab makes it from 3 Rat Bone and 1 Spider Silk. In your bag, FIT ties it to your rod for good, so you need the rod with you; after that the rod shows a small pale bone hook under its float. With it, the amber zone on the strike meter is half again as wide, so fish are easier to land: 3/8 of the bar for a pond minnow, 3/10 for a blind cavefish. Waiting for a bite is the same.
- Rat Bone now says "A rat bone, for a bone hook."
- Decisions: D-807.

## 0.3.252 (2026-11-10)
- New: the Shade Draught, a dusky violet bottle, the Lurker Claw's first use. Once you have held Lurker Claw and Duskstar, the mortar makes it from 2 Lurker Claw and 1 Duskstar. Drink it from your bag and for 60 turns creatures notice you only when you come within 2 steps, so you can slip past them in the light, and even the rim lurker waits until 2. One already after you keeps coming, lampmoths still fly to your lantern and spit grubs still spit. A violet bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while you sleep, and a fall ends it.
- Lurker Claw now says "Two make a Shade."
- Decisions: D-806.
