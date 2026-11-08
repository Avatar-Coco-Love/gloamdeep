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

## 0.3.153 (2026-11-08)
- Three more cloak patterns on the Look card: Tiger (rust with dark stripes), Stars (night indigo with specks) and Moth (sand with two eyespots), 3 Glints each. The six patterns now cost 18 Glints, what the three Feats pay.
- They are the Cloak tab's fourth row, so the Look card is a row taller on every tab. On the smallest upright screen the little boxes drop their names to fit; the name still shows under the big hero.
- Trying on a pattern, its price now shows in the line under the big hero ("Tiger: 3 Glints. You have 4."), so it no longer covers the boxes.
- Decisions: D-700.

## 0.3.152 (2026-11-08)
- The eleventh audit. Nothing in the game changes. The Version history's newest file is split in two, word for word: 0.3.0 to 0.3.75 move to history-0.3-1.js.
- Docs: finished decisions moved to the archive; parts of OPEN-QUESTIONS.md, TECH.md and PROGRESS.md moved word for word to OPEN-QUESTIONS-2.md, TECH-2.md and RESEARCH-2.md, so a conversation starts by reading less. A bug hunt's findings are listed for the owner. The next audit is at 0.3.192.
- Decisions: D-699. D-660 and D-689 to D-694 moved to the archive, word for word.

## 0.3.151 (2026-11-08)
- A third Feat, Flasks: pour 5, 25 and 100 flasks for 1, 2 and 3 Glints. Its row on the Feats tab shows "2 of 5" and its 3 marks; Records still says Flasks poured.
- Reaching a tier says so: "Feat reached: Flasks 5. +1 Glint." Flasks poured before count too.
- All three Feats now pay 18 Glints. New looks to spend them on come in later steps.
- Decisions: D-698. D-688 moved to the archive, word for word.
