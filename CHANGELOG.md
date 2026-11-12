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

## 0.3.319 (2026-11-12)
- Travelling by waystone no longer counts down poison, stiff or any draught: they keep their turns, so poison can't take a heart as you arrive.
- A night's sleep now uses up poison's turns, as it does a draught's. In bed you still wake healed. Sleeping out, you wake with the hearts it took, and if it takes your last one, you fall.
- A mole that notices you while it is already beside you never digs down, even if you step away: it chases on foot.
- The Warden's Bestiary page shows how to fight it once you have beaten one, since there is only one in a world. Other creatures still need 3.
- Decisions: D-874. Questions closed: Q-098, Q-100. D-871 moved to the archive, word for word.

## 0.3.318 (2026-11-12)
- In the Peddler's room, while he is still ringed in by rubble, you can now set down a Torch or a Glow Lamp. Before, "There is no room there." was said until you dug a heap.
- Deposits dug in his room grow back there now, and when his room is one picked for a flask mimic, it holds one, as any other room would.
- Decisions: D-873. D-870 moved to the archive, word for word.

## 0.3.317 (2026-11-12)
- A scorpion near a spit grub now rests its whole turn after a strike, as it does anywhere else.
- When an oil tick's drink takes your lantern's oil low, or dry, you now hear and read the warning: "The flame is getting low." or "The lantern gutters to an ember." It shows over the tick's own line.
- Decisions: D-872. D-869 moved to the archive, word for word.
