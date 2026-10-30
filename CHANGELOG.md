# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.2.js` (D-254).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.189 (2026-10-30)
- A beaten rat now leaves a Rat Tail where it fell, about 1 time in 2. Step on it to put it in your bag, in stacks of 20, with a line.
- A Rat Tail is curled into a loop, the rat's pink with a grey stub. Choosing it in the bag says a line about it; it is for crafting later.
- With every stack full it stays on the floor until you come back for it. It never grows back.
- Decisions: D-474.

## 0.2.188 (2026-10-30)
- The scope's build order is set: creature drops come first, so today's five creatures leave materials to take home.
- The first 8 steps: a rat's Rat Tail, the other common drops, the rare drops, a first recipe using one, torches to make and set down, a second weapon kind, a pick and the first ore, and the Growth tree.
- Nothing in the game changes yet.
- Decisions: D-473.

## 0.2.187 (2026-10-30)
- The scope's part 8, home and trade, is settled. Home grows by the pieces you build there, and sleeping at home gives a short boost for the next trip.
- Most people will be rescued below and move home; later some stay where you meet them, and wanderers such as a merchant visit.
- The first vendor will be a rescued person at home, buying creature materials and spare finds. Trade coins come only from selling, and are kept when you fall.
- Nothing in the game changes yet. The whole scope is now settled.
- Decisions: D-469 to D-472.

## 0.2.186 (2026-10-30)
- Nothing in the game changes. The fifth audit: the Seed Explorer, Settings' ways to play and the seed pad move word for word from screens.js into their own file, explorerscreens.js.
- Docs: CHANGELOG.md keeps its newest 3 entries, the rest moved to archive/CHANGELOG-STAGE-0.2-1.md; finished decisions moved to the archive; CLAUDE.md's pointers are tidied, its rules word for word; GLOSSARY.md's "In the code" moved word for word to GLOSSARY-CODE.md. The next audit is at 0.2.206.
- Decisions: D-468.

## 0.2.185 (2026-10-30)
- The scope's part 7, collectables, is settled. Lore pages found below fill a Lore tab in the Journal, in sets; finishing a set gives a small lasting boost.
- Relics, 1 or 2 a biome, are set on a shelf at home and each gives a small lasting boost while there.
- Each creature will have a trophy, made from its materials and hung at home, completing its Bestiary page.
- Achievements come in 3 tiers, each paying the look currency, in a Feats tab in the Journal.
- Nothing in the game changes yet.
- Decisions: D-464 to D-467.
