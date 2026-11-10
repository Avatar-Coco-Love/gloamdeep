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

## 0.3.234 (2026-11-10)
- Day creatures, second: the bunny, the first creature that means no harm. Each day one comes out in the home room and one in each woods room round home, beside the mole. It never bites, and hops away once you come within 3 steps; corner it and one blow beats it, and it may leave Bunny Fur, for crafts later. Gone by nightfall, back the next day.
- Decisions: D-784.

## 0.3.233 (2026-11-10)
- The audit's bug fixes. Night and day creatures no longer pile up in a woods room left and come back to on a later night or day: the earlier ones go first.
- Waking from sleeping out, a night creature beside the hero has already gone with the dawn, and no longer bites.
- Night creatures come out at least 4 steps from the hero, as the mole does, so none appears right beside them with the lantern out.
- Decisions: D-783.

## 0.3.232 (2026-11-10)
- The thirteenth audit. Nothing in the game changes. Three big code files are split, word for word: the Version history's newest file again (0.3.151 to 0.3.200 move to history-0.3-3.js), the creatures' pictures (to pictures-creatures.js) and the creatures' lines (to lines-creatures.js).
- Docs: finished decisions, ticked plan steps and three of the surface's questions moved to the archive or their own files, word for word, so a conversation starts by reading less. Four creatures' glossary lines, the sound packs in use and the ponds now match the game. A bug hunt found three bugs, fixed next. The playbook gains what this stretch taught, in a new WORKFLOW-3.md. The next audit is at 0.3.272.
- Decisions: D-782. D-740, D-742, D-743 and D-773 to D-777 moved to the archive, word for word.
