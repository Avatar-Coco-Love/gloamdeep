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

## 0.3.314 (2026-11-12)
- A broken boulder or copper vein never grows back beside a waystone, on the tiles kept open round it.
- A find that doesn't fit in the bag, with every tile beside it taken, lies on the nearest open tile further out, never on water or a bush.
- Dev mode's Spawn no longer puts a thing, a creature or a wall on a person.
- Code: an old way of making things from a bag slot, unused since the Make tab, is taken out; its tests now use the Make tab's.
- Decisions: D-869. D-865 moved to the archive, word for word. Questions raised: Q-103.

## 0.3.313 (2026-11-12)
- The fifteenth audit. Nothing in the game changes. The game's sounds move out of its biggest code file into their own, word for word, and the Version history now loads only when it first opens, so the game starts with 12 files fewer.
- Docs: old code notes that no longer matched the game are fixed; done health check findings, finished decisions and the playbook's newest lines moved to the archive or their own files, word for word. Older iPhones and the sound files go on the store checklist, to test on a real one. Three small risks and an unused piece of code come next. The next audit is at 0.3.353.
- Decisions: D-868. D-826, D-863 and D-864 moved to the archive, word for word.

## 0.3.312 (2026-11-12)
- The Look card's tabs are taller, easy to tap on a phone. On phones like a 390 px one the big hero is a little smaller to make room; on the smallest screens the choices show 2 rows and scroll.
- With the keyboard, Up from RANDOM or OK now goes to the open tab, so a rolled look is kept; before, it picked each choice on the way.
- Decisions: D-867. D-859 moved to the archive, word for word.
