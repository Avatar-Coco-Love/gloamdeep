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

## 0.3.208 (2026-11-09)
- A campfire now stands in one of the 8 surface rooms round home, the seed picking the room and how lit it is: blazing, low embers or cold ashes. Bump it to read what it says, a sentence a bump.
- A burning campfire lights the dark round it at night, blazing as far as a torch, embers a little less.
- Bump cold ashes and a card asks Light the fire? Yes lights it into embers with one turn of your lantern's oil; with an empty lantern Yes is grey.
- Decisions: D-757. Questions closed: Q-090.

## 0.3.207 (2026-11-09)
- The woods round home now differ: each of the 5 rooms is thick woods, the woods as before, or an open glade, the seed picking, with at least one thick room and one glade every journey. Home stays as it was.
- In a saved game, a woods room you have already been to stays as it is; one you have never seen grows as its new kind.
- Decisions: D-756. Questions opened: Q-090.

## 0.3.206 (2026-11-09)
- Once you have found the way down, a few dust motes now stay in the lantern light, each wandering its own slow way: 3 in the crypt and earth, 2 in grey rock and the dungeon, none under the sky.
- Decisions: D-755.
