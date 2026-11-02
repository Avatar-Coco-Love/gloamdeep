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

## 0.3.30 (2026-11-02)
- Pick your garden's berries now: walk into a grown garden bed and its card shows PICK and DECONSTRUCT. Pick gives 3 Gloamberries, one more than a wild bush. It takes a turn.
- After picking, the bed holds a sprout again, and it grows new berries 300 turns later. Plant a seed once and pick again and again.
- With a full bag you keep nothing and the berries stay on the bush. With room for only some, the rest drop on the ground nearby, as at a wild bush.
- Decisions: D-568.

## 0.3.29 (2026-11-02)
- A planted sprout grows now: 300 turns after planting it becomes a small gloamberry bush with ripe berries. Every turn counts, on the surface and below.
- The grown bed's card says "Gloamberries grow here." Picking the berries comes at the next step.
- Deconstruct a grown bed and the bed and its seed come back, as with a sprout.
- Dev mode: the Room section has a new Grow button that grows every planted garden bed at once.
- Decisions: D-567.

## 0.3.28 (2026-11-02)
- Plant your Gloamberry Seeds now: walk into a garden bed and its card shows PLANT and DECONSTRUCT. Plant puts one seed in the bed. It takes a turn.
- A planted bed shows a sprout, two round leaves on a short stem, and its card says "A sprout grows here." Growing comes at the next step.
- Plant is grey when you carry no seed, or when the bed already holds one.
- Deconstruct takes the bed back straight away. If a seed was planted, it comes back to your bag too, when there is room.
- Decisions: D-566.

## 0.3.27 (2026-11-02)
- You can make a garden bed now: it is the last slot on the workbench's card, from 3 Wood and 2 Stone. It takes a turn.
- Set it down on the surface from the bag, as you do the bed. It is a low wooden box of dark soil, a place to plant your Gloamberry Seeds at the next step.
- Walk into it to take it back: a card asks "Deconstruct garden bed?" with "Nothing grows here yet." Yes puts it back in your bag.
- Decisions: D-565.

## 0.3.26 (2026-11-02)
- Gloamberries make a seed now: choose them in the bag and press Make (or C) to turn 3 Gloamberries into 1 Gloamberry Seed. It takes a turn, as making a potion does.
- The Gloamberry Seed is a small brown pip with a tiny green shoot. It stacks to 20. It does nothing yet: the garden bed to plant it in comes at the next step.
- Decisions: D-564.

## 0.3.25 (2026-11-02)
- Creatures no longer bob. Each one stands with its feet on its shadow: the cave spider, the snapcap and the mole no longer float, and an awake flask mimic or herb mimic sits on the floor.
- The bat and the lampmoth fly, so they hover a little above their shadow, held still.
- A sleeping mimic or a shut snapcap still bobs like the find it pretends to be.
- Decisions: D-563.

## 0.3.24 (2026-11-02)
- Nothing changes in the game. The garden comes next, before another new creature, in six small steps: a Gloamberry seed, made in the bag; a garden bed, made at the workbench and set down at home; planting; growing while you are below; picking; then guano and water.
- Decisions: D-561, D-562.

## 0.3.23 (2026-11-02)
- The workbench now uses what is in your stash chests too: on the surface, every chest within 6 tiles of you counts, as for the bag's Store button.
- Its card shows one total for each cost, what your bag and those chests hold together, as "3 / 5 Wood", and Make is dim only when they all hold too few.
- Make takes from your bag first, then from the nearest chest, then the next.
- Decisions: D-560.

## 0.3.22 (2026-11-02)
- A small Sort button sits in the bag's title strip, always: just left of Store, or beside the cross when Store is hidden. It lines your bag up in the game's own order (oil and healing first, things you made last) and joins half stacks, the full ones first, free.
- It says "You sort the bag.", or "The bag is in order." when nothing would change.
- On a keyboard, press Up from the gear row to reach Sort (Store when it shows, then Left for Sort), and Down to go back.
- Decisions: D-559.

## 0.3.21 (2026-11-02)
- A small Store button sits in the bag's title strip, just left of the cross, when you are on the surface with a stash chest within 6 tiles. It sends each stack in your bag to the chests nearby that already hold that kind, the nearest chest first, free.
- It says how many stacks moved, "Nothing to store." when none match, and "Chests full." after the count when some had to stay in your bag ("The chest is full." with only one chest nearby).
- On a keyboard, press Up from the gear row to reach Store, and Down to go back.
- Decisions: D-558.

## 0.3.20 (2026-11-02)
- Falling on a floor of several rooms, from depth 2 down, no longer freezes the game: the small round map broke while showing the fall, and stopped everything. Thanks to a friend's playtest.
- If anything else ever goes wrong while the screen is drawn, the game now carries on instead of freezing.
- Decisions: D-557.

## 0.3.19 (2026-11-02)
- A stash chest's card has a Store button in its bottom right corner: every stack in your bag of a kind the chest already holds goes onto it, free. It says how many stacks moved, "Nothing to store." when none match, and that the chest is full when some had to stay in your bag.
- On a keyboard, press Down from the bag's bottom row to reach Store.
- Decisions: D-556.

## 0.3.18 (2026-11-02)
- Storing what matches will come as two buttons: first Store on a chest's card, filling just that chest, then a small Store in the bag, sending your stacks to every stash chest within 6 tiles that already holds that kind. Both free. Docs only.
- Decisions: D-555.

## 0.3.17 (2026-11-01)
- Choose the Weapon or Tool slot in the bag's gear row and press Take off: the spear, knife or Stone Pick goes back into your bag, and no turn passes. With the bag full it stays put. Worn pieces show their words but can't come off.
- On a keyboard, press Up from the bag's top row to reach the gear row; Enter takes off.
- Decisions: D-554.

## 0.3.16 (2026-11-01)
- The bag shows a row of five gear slots across its top: Weapon, Tool, Armour and two Charms. Empty ones show faintly what goes there, and what you wear is now always in view.
- The Stone Pick has its own Tool slot. Choose it in the bag and press Hold to put it there (a turn); it breaks copper veins only from that slot. A pick you make goes straight into an empty Tool slot, and one already in your bag moves there by itself.
- Decisions: D-552, D-553.

## 0.3.15 (2026-11-01)
- A new creature, the bone rat, now turns up from depth 4 down: a rat with nothing left but bone. It chases you and never runs away.
- It has 3 hearts and bites for 1, with a dry clatter of bones and a snap of teeth.
- Beaten, it may leave a Rat Bone, which the peddler buys for 1 coin; its recipes come later.
- Decisions: D-551.

## 0.3.14 (2026-11-01)
- A new creature, the herb mimic, now turns up from depth 3 down. Asleep, it looks just like a herb; bump it, or step on it to heal, and it opens its eyes and chases you for 6 turns.
- It has 2 hearts and bites for 1, with a dry rustle of leaves and a snap. Stepping on it never heals you.
- Beaten, it may leave a Mimic Leaf, which the peddler buys for 1 coin; its recipes come later.
- Decisions: D-549, D-550.
