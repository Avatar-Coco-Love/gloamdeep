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

## 0.2.184 (2026-10-30)
- The scope's part 6, growth, is settled. Levels keep today's climb, 1 ember each, with no top level.
- The Growth tree will have three branches: Light, Body and Hands. Gathering skills are Hands upgrades, bought with embers. Each branch's next row opens when you reach the next biome.
- Each biome will hide one big ability, at a shrine or from a boss near its bottom, opening new paths in places already seen.
- Nothing in the game changes yet.
- Decisions: D-461 to D-463.
