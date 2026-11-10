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

## 0.3.232 (2026-11-10)
- The thirteenth audit. Nothing in the game changes. Three big code files are split, word for word: the Version history's newest file again (0.3.151 to 0.3.200 move to history-0.3-3.js), the creatures' pictures (to pictures-creatures.js) and the creatures' lines (to lines-creatures.js).
- Docs: finished decisions, ticked plan steps and three of the surface's questions moved to the archive or their own files, word for word, so a conversation starts by reading less. Four creatures' glossary lines, the sound packs in use and the ponds now match the game. A bug hunt found three bugs, fixed next. The playbook gains what this stretch taught, in a new WORKFLOW-3.md. The next audit is at 0.3.272.
- Decisions: D-782. D-740, D-742, D-743 and D-773 to D-777 moved to the archive, word for word.

## 0.3.231 (2026-11-10)
- Day creatures, first: the mole. Each day a mole comes out in each of the woods rooms round home, never at home, on the grass at least 4 steps from you. It digs down when it sees you, tunnels over as a mound and comes up beside you, and leaves its fur or a rare claw as it does below. Gone by nightfall, back the next day.
- Decisions: D-781. D-779 moved to the archive, word for word.

## 0.3.230 (2026-11-10)
- Night creatures, third: the rare gloamling. Each night one of the woods rooms round home, picked by your seed, has a gloamling too, beside its lampmoth and bat. It hunts you from the dark but will not step into your light, and leaves a Gloam Wisp or a rare Gloam Eye as it does below. Gone by morning like the others.
- Decisions: D-780. D-778 moved to the archive, word for word.
