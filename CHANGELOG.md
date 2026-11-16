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

## 0.3.395 (2026-11-16)
- Beating the Lampeater sinks its sealed door open at once, the way down behind it; lighting all 4 braziers no longer opens it, so the fight can't be skipped.
- As it goes, any gloamlings left crumble away.
- Fall in the fight, or walk out before it's beaten, and it is whole again when you come back: on its own tile, all its hearts, the braziers cold.
- Decisions: D-953. Questions: Q-112 raised, your ideas for sealing the way in. D-948 moved to the archive, word for word.

## 0.3.394 (2026-11-16)
- Three bug fixes from the audit. When the blow that takes the Lampeater to half lands on the same turn your light catches it, getting free from that catch now owes it a second snuff, as the rule says.
- The spear's reach and the Warden's Fist's knock no longer flash the Lampeater white, or sound a hit, when the blow sinks into it in the dark; the gloamling in front still flashes.
- After the playtest's #lampeater link, a New journey or a profile picked in the same tab is saved again.
- Decisions: D-952.

## 0.3.393 (2026-11-16)
- The seventeenth audit. Nothing in the game changes. 0.3.301 to 0.3.350 of the Version history move to their own file, word for word.
- Docs: the playbook's newest lessons, the hero's words and the creature list move to their own pages, and two finished decisions to the archive, word for word; Waiting on the owner is shorter. A bug hunt over the code since the last audit found three bugs, listed in the docs for the owner to pick. The next audit is at 0.3.433.
- Decisions: D-951. D-946 and D-947 moved to the archive, word for word.
