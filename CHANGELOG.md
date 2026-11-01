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

## 0.3.6 (2026-11-01)
- Rooms below the surface now hold more creatures, of mixed kinds: 2 in each room at depth 2, 3 at depths 3 and 4, and 4 from depth 5 down. Every room holds at least two kinds.
- Each depth has its own mix. Rats and lampmoths turn up from depth 2, scorpions from depth 3 and gloamlings from depth 5, and none of them stops turning up deeper. A rat still waits by each room's flask, and the flask mimic is as before.
- Decisions: D-534.

## 0.3.5 (2026-10-31)
- On the Look card, the Cloak tab now shows the three cloak patterns, Zebra, Cow and Camo, in a third row. Each is dim, with LOCK at its corner.
- Tap a locked pattern to try it on the big hero. A note says it costs Glints, earned from Feats, and that its price isn't decided yet. OK keeps your own cloak, and RANDOM never rolls a locked one.
- Decisions: D-533.

## 0.3.4 (2026-10-31)
- The gloamberry bush no longer looks like it floats: it sits 1 pixel lower, resting on its shadow, and the shadow is now as wide as its base.
- Decisions: D-532.

## 0.3.3 (2026-10-31)
- Gloamberry bushes now grow in the surface woods, one in each woods room: a low round bush with dark blue berries. Walk into one to pick 2 Gloamberries; the bush stands bare and fills again 300 turns later.
- Gloamberries stack to 20 in the bag. Eat one for 1 heart, as a heartcap. Their seed comes with the garden, and a recipe later.
- Decisions: D-531.

## 0.3.2 (2026-10-31)
- Before the garden, a first wild plant comes to the surface woods, giving the garden its first seed; fruit bushes, flowers, cave plants grown at home and water plants follow, one at a time. Docs only.
- Decisions: D-530.

## 0.3.1 (2026-10-31)
- The Look card's Trim tab now shows each lantern trim as a square of its two metal shades, the light cap over the dark base, with its name, instead of a tiny hero whose lantern was hard to see. Your hero above still carries the trim you pick.
- Decisions: D-529. Questions closed: Q-074.

## 0.3.0 (2026-10-31)
- The Look card's Eyes tab now shows each eye colour as a big square of colour with its name, instead of a tiny hero whose eyes were hard to see. Your hero above still shows the eyes you pick.
- The game moves to version 0.3: stage 0.2's last steps are all done, so the world stage now has its own numbers, starting here.
- Decisions: D-527, D-528.

## 0.2.235 (2026-10-31)
- On the Look card, the tabs and choices now stretch across the whole card, and the heroes in the choices are twice as big when there is room. On tall phones your hero grows bigger and its lit stone floor fills the space that used to be empty.
- Decisions: D-526.

## 0.2.234 (2026-10-31)
- The big hero on the name and Look cards now stands on the crypt's own stone floor, lit warm around it and fading into the card with no frame, and the light flickers like your lantern. With Motion set to Reduced, the light stays steady.
- Decisions: D-525.

## 0.2.233 (2026-10-31)
- When you make a new hero, the name card shows your hero big over the letters, with the name you type over it, and two dots in the top bar show it is the first of two steps; on the Look card both dots are lit. Rename shows your hero too. Going back from the Look card to the name keeps the look you picked.
- Decisions: D-524.

## 0.2.232 (2026-10-31)
- The Look card looks more like the first drawing of it: your hero is much bigger, the tabs sit between your hero and the choices, and RANDOM and OK are two big buttons side by side across the bottom.
- Decisions: D-523.

## 0.2.231 (2026-10-31)
- The Look card has a RANDOM button at the left of OK. Each press gives your hero a whole new look, its cloak, eyes, trim and clothes all at once, and with the arrows you can keep pressing it until you like what you see. It works when making a hero and in Change look.
- Decisions: D-522.

## 0.2.230 (2026-10-31)
- Your hero's look is now one LOOK card with four tabs across its top: Cloak, Eyes, Trim and Clothes. The big hero shows everything you pick, and every choice shows your whole hero wearing it, with its name. OK finishes from any tab. With the arrows, go up onto the tabs and left or right to switch.
- Decisions: D-521.

## 0.2.229 (2026-10-31)
- The first step of the new hero creator: the Cloak card shows your hero big on a lit floor, its name over it and the cloak's name under it. The six cloaks below are smaller, each hero at its real size with its name. On a wide screen the big hero stands at the left of them.
- Decisions: D-520.

## 0.2.228 (2026-10-31)
- Behind the scenes: the seventh tidy-up, nothing in the game changed. The code that picks, makes, renames and deletes a profile has its own file now, ready for the new hero creator.
- Behind the scenes: tidy-ups now come every 40 versions instead of 20, as the size checks already keep the notes small in between.
- Decisions: D-518, D-519.

## 0.2.227 (2026-10-31)
- Behind the scenes: the look currency is named Glints. Feats will pay them, and they will be spent in the Look card, where a locked look shows with a lock.
- Behind the scenes: making a hero gets one Look card after the name, the hero shown big with tabs for cloak, eyes, trim and clothes, each choice named, and a Random button. It will be built in small steps after the next tidy-up.
- Decisions: D-516, D-517.
