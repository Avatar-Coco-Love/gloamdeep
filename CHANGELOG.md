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

## 0.3.316 (2026-11-12)
- A tap just beside one of the small squares under the hearts (the boon's, a draught's, poisoned's and the rest) now tells what it is instead of walking you there; a tap between two finds the nearer one. They look the same.
- With many of those squares at once on a phone, they no longer slide under the round map: the rest go on a second row, and the goal line and the creature list move down. On a wide screen they stay in one row.
- Decisions: D-871. D-867 moved to the archive, word for word.

## 0.3.315 (2026-11-12)
- Names of things you carry now capitalise every word: Oil Flask, Healing Herb, Healing Potion, Stash Chest, Glow Lamp. The mortar's lines say "Need 2 Mimic Leaf, 1 Healing Herb." and so on.
- A mole that comes up away from you says "The mole bursts up out of the earth!"; beside you it still bursts up beside you.
- Kind Herbs' card says what it does: "Herbs, potions and fish heal 1 heart more."
- How to play: the Pick row says "Hold it to break veins"; the Keyboard page names I for the bag and M for the map, and Touch and Mouse say the bag and map have their buttons.
- A mark's last turn says "1 turn left." instead of "1 turns left."
- The Bestiary: the lure wisp drifts toward another creature only if there is one, and the bone rat is "knocked down" into its bones, since only scattering them beats it.
- Settings' sound for the end of a journey is called "Journey ends", no longer "Run ends".
- Decisions: D-870.

## 0.3.314 (2026-11-12)
- A broken boulder or copper vein never grows back beside a waystone, on the tiles kept open round it.
- A find that doesn't fit in the bag, with every tile beside it taken, lies on the nearest open tile further out, never on water or a bush.
- Dev mode's Spawn no longer puts a thing, a creature or a wall on a person.
- Code: an old way of making things from a bag slot, unused since the Make tab, is taken out; its tests now use the Make tab's.
- Decisions: D-869. D-865 moved to the archive, word for word. Questions raised: Q-103.
