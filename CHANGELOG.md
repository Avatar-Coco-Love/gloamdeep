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

## 0.3.275 (2026-11-11)
- Sounds on hand: MorphonautAudio's Elemental Forces, 134 sounds of fire, water, earth and wind, bought by the owner, kept whole for the next sound steps to pick from. Nothing in the game changes yet.
- Decisions: D-829.

## 0.3.274 (2026-11-11)
- New: home's sounds. Selling to the peddler jingles with coins, in place of the tick; a relic set on the shelf sounds like a book set down on wood.
- New: planting a seed sounds like two soft steps on earth, and feeding Bat Guano to a sprout like a dulled pat of cloth.
- New: on Settings' Sound tab, Finds' list has four more lines, each On or Off: Coins, Shelf, Planting and Feeding.
- Decisions: D-828.

## 0.3.273 (2026-11-11)
- Fixed: with a Healing herb chosen in the bag, once a mortar draught that uses it is known, the bag no longer stops drawing; the card shows EAT and, beside it, the draught it makes at the mortar.
- Fixed: MAKE with a full bag now says "Your bag is full.", not that you already carry what it makes (the Mortar and Pestle, a workbench).
- Fixed: a shy bunny near you at dusk no longer stops you sleeping out; only a creature that bites, or one chasing you, does.
- Fixed: holding a tool, the rod or a pick, no longer plays the knife being drawn.
- Fixed: the Tab key on Settings' tabs ticks, as a tap on a tab does.
- Docs: the Mortar and Pestle's notes now say it lists six draughts, each once all its parts have been held.
- Decisions: D-827.
