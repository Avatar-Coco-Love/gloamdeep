// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; stage 0.2's are
// in history-0.2.js and its split files.
export const HISTORY_03 = [
  { v: '0.3.6', date: '2026-11-01', title: 'Mixed creatures', lines: [
    "Rooms below the surface now hold more creatures, of mixed kinds: 2 in each room at depth 2, 3 at depths 3 and 4, and 4 from depth 5 down. Every room holds at least two kinds.",
    "Each depth has its own mix. Rats and lampmoths turn up from depth 2, scorpions from depth 3 and gloamlings from depth 5, and none of them stops turning up deeper. A rat still waits by each room's flask, and the flask mimic is as before.",
    "Decisions: D-534.",
  ] },
  { v: '0.3.5', date: '2026-10-31', title: 'Locked patterns shown', lines: [
    "On the Look card, the Cloak tab now shows the three cloak patterns, Zebra, Cow and Camo, in a third row. Each is dim, with LOCK at its corner.",
    "Tap a locked pattern to try it on the big hero. A note says it costs Glints, earned from Feats, and that its price isn't decided yet. OK keeps your own cloak, and RANDOM never rolls a locked one.",
    "Decisions: D-533.",
  ] },
  { v: '0.3.4', date: '2026-10-31', title: 'The bush on the ground', lines: [
    "The gloamberry bush no longer looks like it floats: it sits 1 pixel lower, resting on its shadow, and the shadow is now as wide as its base.",
    "Decisions: D-532.",
  ] },
  { v: '0.3.3', date: '2026-10-31', title: 'The gloamberry bush', lines: [
    "Gloamberry bushes now grow in the surface woods, one in each woods room: a low round bush with dark blue berries. Walk into one to pick 2 Gloamberries; the bush stands bare and fills again 300 turns later.",
    "Gloamberries stack to 20 in the bag. Eat one for 1 heart, as a heartcap. Their seed comes with the garden, and a recipe later.",
    "Decisions: D-531.",
  ] },
  { v: '0.3.2', date: '2026-10-31', title: 'Wild harvestables first', lines: [
    "Before the garden, a first wild plant comes to the surface woods, giving the garden its first seed; fruit bushes, flowers, cave plants grown at home and water plants follow, one at a time. Docs only.",
    "Decisions: D-530.",
  ] },
  { v: '0.3.1', date: '2026-10-31', title: 'Trim swatches', lines: [
    "The Look card's Trim tab now shows each lantern trim as a square of its two metal shades, the light cap over the dark base, with its name, instead of a tiny hero whose lantern was hard to see. Your hero above still carries the trim you pick.",
    "Decisions: D-529. Questions closed: Q-074.",
  ] },
  { v: '0.3.0', date: '2026-10-31', title: 'Eye swatches, and version 0.3', lines: [
    "The Look card's Eyes tab now shows each eye colour as a big square of colour with its name, instead of a tiny hero whose eyes were hard to see. Your hero above still shows the eyes you pick.",
    "The game moves to version 0.3: stage 0.2's last steps are all done, so the world stage now has its own numbers, starting here.",
    "Decisions: D-527, D-528.",
  ] },
];
