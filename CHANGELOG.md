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

## 0.3.148 (2026-11-08)
- The Journal has a fourth tab, Feats, after the Bestiary. A Feat is one record's set of 3 tiers, and each tier you reach pays Glints, the money for looks.
- The first Feat is Beaten: 10, 50 and 200 creatures, paying 1, 2 and 3 Glints. The tab shows your Glints in gold at the top, then Beaten with your count toward the next tier, such as 12 of 50, and 3 small marks that turn gold as you reach them.
- Creatures beaten before now count too. Reaching a tier says so: "Feat reached: Beaten 10. +1 Glint."
- On an upright phone the Journal's tabs sit in two rows, Records and Growth over Bestiary and Feats. Right from the Bestiary turns to Feats.
- Buying a cloak pattern with Glints, 3 each, comes at the next step.
- Decisions: D-695. D-686 moved to the archive, word for word.

## 0.3.147 (2026-11-08)
- The Lightkeeper's Locket works on the shelf. In Normal, with the locket on a shelf, a fall brings home one stack from your bag: the one the peddler would pay most for in all, his price times how many. 3 Venom Sacs beat 1 Mimic Heart.
- A tie goes to the stack first in your bag. With nothing in the bag he buys, nothing is kept. The rest stays in the bag where you fell, as before.
- You wake with it in your bag, and the line says so: "The locket kept Venom Sac ×3."
- Decisions: D-694. D-685 moved to the archive, word for word.

## 0.3.146 (2026-11-08)
- The Lightkeeper's Locket can go on the shelf. Bump the shelf with the locket in your bag and it asks "Set the locket on the shelf?" Yes sets it there in a turn: "You set the locket on the shelf." It stays there for good.
- The shelf shows it: the locket small and open on its top shelf, in the relics' violet glow, with a glint now and then. At night the glow shows from across the surface.
- Bumped then, the shelf asks "Deconstruct shelf?" with "The locket rests here." Yes puts the shelf and the locket back in your bag together; with no room for both, your bag is full and both stay.
- What the locket does there, on a fall, comes at the next step.
- Decisions: D-693. D-683 and D-684 moved to the archive, word for word.
