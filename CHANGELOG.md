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

## 0.3.277 (2026-11-11)
- New: the rest of the fight has sounds. A stiff swing that misses puffs through the air, and a bite or a glob that takes a heart lands as a dull blow.
- New: poison taking a heart throbs twice, deep and slow, and reaching a level rings three glass notes rising, just after the creature falls.
- New: on Settings' Sound tab, Fighting's list has four more lines, each On or Off: Stiff miss, Hurt, Poison and Level.
- Decisions: D-831.

## 0.3.276 (2026-11-11)
- New: the lantern and the light have sounds, the first from the elemental pack. A flask poured, by hand or by itself, glugs; as the oil runs out, a crackle slows and fades.
- New: lighting a torch whooshes, and lighting cold ashes into a campfire sounds of a fire catching and burning.
- New: on Settings' Sound tab, Steps' list has four more lines, each On or Off: Flask poured, Oil runs out, Torch lit and Campfire lit.
- Decisions: D-830.

## 0.3.275 (2026-11-11)
- Sounds on hand: MorphonautAudio's Elemental Forces, 134 sounds of fire, water, earth and wind, bought by the owner, kept whole for the next sound steps to pick from. Nothing in the game changes yet.
- Decisions: D-829.
