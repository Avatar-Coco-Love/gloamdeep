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

## 0.3.194 (2026-11-09)
- Every bug the twelfth audit found is fixed. A berry bush or fallen branch no longer blocks a path between woods rooms.
- Journeys begun before the mountain rooms now get mountain rooms in the north row they haven't visited, and the dev Reset at home no longer brings back the old cave mouth.
- Goals done on the same turn each roll their own reward. On a South woods journey, an older profile's "Go home to the woods" is ticked quietly instead of showing crypt directions.
- A pool no longer hints that a room's flask is unguarded, and rat packs no longer tell where a flask mimic stands. A spit grub's glob flies over a pile of bones, and a scorpion lowers its tail when you come back into its room.
- Decisions: D-742.

## 0.3.193 (2026-11-09)
- The playbook of how we work is caught up with the whole project so far: how the game grew in stages, our tools, what bugs taught us and the design habits, in a new second page, WORKFLOW-2.md. Nothing in the game changes.
- From now on, a step that teaches something about working together adds a line to the playbook as it goes; each audit sorts the lines into place.
- Decisions: D-741.

## 0.3.192 (2026-11-09)
- The twelfth audit. Nothing in the game changes. The Version history's newest file is split again, word for word: 0.3.76 to 0.3.150 move to history-0.3-2.js.
- Docs: finished decisions and the ticked plan steps moved to the archive, word for word, so a conversation starts by reading less. The start-up check now names the copy it brought up to date. A bug hunt's findings are listed for the owner. The playbook of how we work gains what this stretch taught. The next audit is at 0.3.232.
- Decisions: D-740. D-699 and D-734 to D-737 moved to the archive, word for word.
