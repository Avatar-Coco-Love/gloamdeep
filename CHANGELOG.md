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

## 0.3.196 (2026-11-09)
- A new look for the cave mouth: a craggy cave, wide and black, with teeth of rock hanging from its top. The seed picks it or the small arch, so worlds differ.
- On a side or bottom edge, the rock roofs over the craggy cave and the ground dives black beneath it. A few pebbles lie at the rocks' feet. Walking is unchanged.
- Decisions: D-744. New question: Q-089, falling down holes.

## 0.3.195 (2026-11-09)
- Words no longer run past the edge of a card. On a phone held upright, a quest's how wraps onto more lines, and a done goal's reward sits under it.
- A Journal list longer than its card scrolls, with a thin bar at its right: swipe, the mouse wheel, or Up and Down. Upright, the Bestiary is one table instead of two squeezed together.
- The goal line under the hearts wraps so the round map no longer covers its end. In the stash chest, a long name stays clear of STORE.
- A new test draws every card at upright and sideways phone sizes with everything in the game, so words that don't fit are caught before they reach a phone.
- Decisions: D-743.

## 0.3.194 (2026-11-09)
- Every bug the twelfth audit found is fixed. A berry bush or fallen branch no longer blocks a path between woods rooms.
- Journeys begun before the mountain rooms now get mountain rooms in the north row they haven't visited, and the dev Reset at home no longer brings back the old cave mouth.
- Goals done on the same turn each roll their own reward. On a South woods journey, an older profile's "Go home to the woods" is ticked quietly instead of showing crypt directions.
- A pool no longer hints that a room's flask is unguarded, and rat packs no longer tell where a flask mimic stands. A spit grub's glob flies over a pile of bones, and a scorpion lowers its tail when you come back into its room.
- Decisions: D-742.
