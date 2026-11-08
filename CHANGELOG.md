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

## 0.3.150 (2026-11-08)
- A second Feat, Deepest: reach depth 5, 10 and 20 for 1, 2 and 3 Glints. Its row on the Feats tab shows "3 of 5" and its 3 marks.
- Reaching a tier says so: "Feat reached: Deepest 5. +1 Glint." Depths walked to before count too.
- Decisions: D-697. D-659 moved to the archive, word for word.

## 0.3.149 (2026-11-08)
- Cloak patterns can be bought. On the Look card, tap Zebra, Cow or Camo to try it on, and RANDOM becomes BUY 3. Press it to spend 3 Glints: the pattern is yours, worn at once.
- The note under the patterns says the price and your Glints: "Zebra costs 3 Glints. You have 4." With too few it adds "Earn more from Feats.", and BUY is dim and does nothing.
- A bought pattern is that hero's for good. It loses its LOCK, and RANDOM can roll it.
- The Feats tab's gold number is now the Glints you have left to spend.
- Decisions: D-696. D-687 moved to the archive, word for word.

## 0.3.148 (2026-11-08)
- The Journal has a fourth tab, Feats, after the Bestiary. A Feat is one record's set of 3 tiers, and each tier you reach pays Glints, the money for looks.
- The first Feat is Beaten: 10, 50 and 200 creatures, paying 1, 2 and 3 Glints. The tab shows your Glints in gold at the top, then Beaten with your count toward the next tier, such as 12 of 50, and 3 small marks that turn gold as you reach them.
- Creatures beaten before now count too. Reaching a tier says so: "Feat reached: Beaten 10. +1 Glint."
- On an upright phone the Journal's tabs sit in two rows, Records and Growth over Bestiary and Feats. Right from the Bestiary turns to Feats.
- Buying a cloak pattern with Glints, 3 each, comes at the next step.
- Decisions: D-695. D-686 moved to the archive, word for word.
