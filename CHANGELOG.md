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

## 0.3.250 (2026-11-10)
- New: the Fur Bedroll has two buttons in your bag. SLEEP sleeps right where you stand, the moon's way; it is dim by day, below ground, or with a creature after you, and a tap says why. SET DOWN lays the bedroll out beside you on the surface.
- Laid out, bump the bedroll from dusk to sleep on it: 2 hearts back and not stiff. By day a bump asks "Roll up the bedroll?" to put it back in your bag. It is not your bed for a fall; home's bed still is.
- Decisions: D-804.

## 0.3.249 (2026-11-10)
- New: the Fur Bedroll, the Bunny Fur's first use. The workbench's BUILD tab makes it from 4 Bunny Fur and 1 Spider Silk. Keep it in your bag: when you sleep out under the sky, you wake with 2 hearts back and not stiff. It is never used up. The bed at home still heals you fully.
- With the bedroll in your bag, the moon's ask says "Your fur bedroll is warm." Bunny Fur now says "for a fur bedroll."
- Decisions: D-803.

## 0.3.248 (2026-11-10)
- New: the Spitproof Draught, a dusty rose bottle, the Grub Skin's first use. Once you have held Grub Skin and Herb, the mortar makes it from 2 Grub Skin and 1 Herb. Drink it from your bag and for 60 turns a spit grub's glob splashes off you and hurts nothing; the grubs still spit. A rose bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while you sleep, and a fall ends it.
- Grub Skin now says "Two make a Spitproof."
- Decisions: D-802.
