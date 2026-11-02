// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; stage 0.2's are
// in history-0.2.js and its split files.
export const HISTORY_03 = [
  { v: '0.3.42', date: '2026-11-02', title: 'Smaller floors', lines: [
    "Smaller shallow floors: the caves on depths 2 to 4 are now 13 × 15 tiles and the warrens on 5 to 7 are 15 × 17, so the stairs are closer and the oil goes further. The dungeon from depth 8 stays 17 × 20. Fewer chambers and tunnels fill the smaller rooms; what lies in them stays the same, and still pools turn up a little less often.",
    "The peddler on depth 3 is always there: his room is made again until his ring of rubble fits.",
    "A journey saved before this has its caves, warrens and dungeon made again at the new sizes, once, from the same seed. If you were down there, you stand on that floor's stairs up; a bag you left there waits on them; a peddler you freed stays freed.",
    "Decisions: D-584. Questions raised: Q-078.",
  ] },
  { v: '0.3.41', date: '2026-11-02', title: 'Boons', lines: [
    "Plans only, nothing you see has changed: boons. Each time you set out from the home waystone, you will pick 1 of 3 random boons, small helps for light and oil, hearts and fighting, finding things or getting around, kept until you are home again. They come right after the waystones, and the list of boons is shown first.",
    "Decisions: D-583.",
  ] },
  { v: '0.3.40', date: '2026-11-02', title: 'Getting around', lines: [
    "Plans only, nothing you see has changed: getting around. Waystones to find and wake will let you travel between them on the map, with one near the middle of the home room and one at the top of each band of floors. Shallow floors will get smaller and grow with depth. Faint motes in the lantern light will drift toward the stairs down. These three come next, in that order.",
    "Decisions: D-579, D-580, D-581, D-582.",
  ] },
  { v: '0.3.39', date: '2026-11-02', title: 'The eighth audit, part 8', lines: [
    "Behind the scenes, nothing you see has changed: the eighth audit, part 8, its last. The profiles, the name pad, the look card, the seed pad, the Seed Explorer and the map now have their own small files in the card table, so every screen goes through it.",
    "Decisions: D-578.",
  ] },
  { v: '0.3.38', date: '2026-11-02', title: 'The eighth audit, part 7', lines: [
    "Behind the scenes, nothing you see has changed: the eighth audit, part 7. The pages (how to play, the version history and the journal) now have their own small files in the card table.",
    "Decisions: D-577.",
  ] },
  { v: '0.3.37', date: '2026-11-02', title: 'The eighth audit, part 6', lines: [
    "Behind the scenes, nothing you see has changed: the eighth audit, part 6. The menus (the title, the pause menu, Settings, the ways to play, choosing a way to play and the journey's end) now have their own small files in the card table, sharing their lines and arrows.",
    "Decisions: D-576.",
  ] },
  { v: '0.3.36', date: '2026-11-02', title: 'The eighth audit, part 5', lines: [
    "Behind the scenes, nothing you see has changed: the eighth audit, part 5. The bed's card and the three questions that ask Yes or No (Start over?, Delete…? and the easier way to play) now have their own small files in the card table, sharing their arrows and taps.",
    "Decisions: D-575.",
  ] },
  { v: '0.3.35', date: '2026-11-02', title: 'The eighth audit, part 4', lines: [
    "Behind the scenes, nothing you see has changed: the eighth audit, part 4. The bag's card and setting something down now have their own small files too, in the same table as the workbench, chest and peddler.",
    "Decisions: D-574.",
  ] },
  { v: '0.3.34', date: '2026-11-02', title: 'The eighth audit, part 3', lines: [
    "Behind the scenes, nothing you see has changed: the eighth audit, part 3. The workbench, chest and peddler cards each have their own small file for their keys, taps and picks, and the game looks them up in a table, so a new card is one file.",
    "Decisions: D-573.",
  ] },
  { v: '0.3.33', date: '2026-11-02', title: 'The eighth audit, part 2', lines: [
    "Behind the scenes, nothing you see has changed: the eighth audit, part 2. A new tool keeps the game's records: one command sets the version number, copies these notes into the Version history, and moves older notes to the archive.",
    "Decisions: D-572.",
  ] },
  { v: '0.3.32', date: '2026-11-02', title: 'The eighth audit, part 1', lines: [
    "Behind the scenes, nothing you see has changed: the eighth audit, part 1. The bag, Drop, setting down, and the workbench, chest, bed and peddler cards moved into their own file of the code.",
    "For screen readers: on the peddler's Sell side, each bag slot is read with its name, how many and its price again, not \"Empty\". It had been wrong since 0.2.219.",
    "Tests run faster (22 s to 16 s), two unused pieces of code are gone, and the notes for making changes are tidier.",
    "Decisions: D-570, D-571.",
  ] },
  { v: '0.3.31', date: '2026-11-02', title: 'Feeding', lines: [
    "Feed your garden now: walk into a sprout and its card shows FEED and DECONSTRUCT. Feed puts 1 Bat Guano on the soil. It takes a turn.",
    "A fed sprout shows a few flecks of guano on its soil and grows in 150 turns from planting instead of 300. Fed after that, it grows at once.",
    "Once is enough: with no guano, or already fed, Feed is dim. After picking, the sprout needs feeding again. Taken down, the guano is spent.",
    "Water doesn't matter to the garden yet; it waits for a way to carry water.",
    "Decisions: D-569.",
  ] },
  { v: '0.3.30', date: '2026-11-02', title: 'Picking', lines: [
    "Pick your garden's berries now: walk into a grown garden bed and its card shows PICK and DECONSTRUCT. Pick gives 3 Gloamberries, one more than a wild bush. It takes a turn.",
    "After picking, the bed holds a sprout again, and it grows new berries 300 turns later. Plant a seed once and pick again and again.",
    "With a full bag you keep nothing and the berries stay on the bush. With room for only some, the rest drop on the ground nearby, as at a wild bush.",
    "Decisions: D-568.",
  ] },
  { v: '0.3.29', date: '2026-11-02', title: 'Growing', lines: [
    "A planted sprout grows now: 300 turns after planting it becomes a small gloamberry bush with ripe berries. Every turn counts, on the surface and below.",
    "The grown bed's card says \"Gloamberries grow here.\" Picking the berries comes at the next step.",
    "Deconstruct a grown bed and the bed and its seed come back, as with a sprout.",
    "Dev mode: the Room section has a new Grow button that grows every planted garden bed at once.",
    "Decisions: D-567.",
  ] },
  { v: '0.3.28', date: '2026-11-02', title: 'Planting', lines: [
    "Plant your Gloamberry Seeds now: walk into a garden bed and its card shows PLANT and DECONSTRUCT. Plant puts one seed in the bed. It takes a turn.",
    "A planted bed shows a sprout, two round leaves on a short stem, and its card says \"A sprout grows here.\" Growing comes at the next step.",
    "Plant is grey when you carry no seed, or when the bed already holds one.",
    "Deconstruct takes the bed back straight away. If a seed was planted, it comes back to your bag too, when there is room.",
    "Decisions: D-566.",
  ] },
  { v: '0.3.27', date: '2026-11-02', title: 'The garden bed', lines: [
    "You can make a garden bed now: it is the last slot on the workbench's card, from 3 Wood and 2 Stone. It takes a turn.",
    "Set it down on the surface from the bag, as you do the bed. It is a low wooden box of dark soil, a place to plant your Gloamberry Seeds at the next step.",
    "Walk into it to take it back: a card asks \"Deconstruct garden bed?\" with \"Nothing grows here yet.\" Yes puts it back in your bag.",
    "Decisions: D-565.",
  ] },
  { v: '0.3.26', date: '2026-11-02', title: 'The Gloamberry Seed', lines: [
    "Gloamberries make a seed now: choose them in the bag and press Make (or C) to turn 3 Gloamberries into 1 Gloamberry Seed. It takes a turn, as making a potion does.",
    "The Gloamberry Seed is a small brown pip with a tiny green shoot. It stacks to 20. It does nothing yet: the garden bed to plant it in comes at the next step.",
    "Decisions: D-564.",
  ] },
  { v: '0.3.25', date: '2026-11-02', title: 'Creatures on the ground', lines: [
    "Creatures no longer bob. Each one stands with its feet on its shadow: the cave spider, the snapcap and the mole no longer float, and an awake flask mimic or herb mimic sits on the floor.",
    "The bat and the lampmoth fly, so they hover a little above their shadow, held still.",
    "A sleeping mimic or a shut snapcap still bobs like the find it pretends to be.",
    "Decisions: D-563.",
  ] },
  { v: '0.3.24', date: '2026-11-02', title: 'The garden next', lines: [
    "Nothing changes in the game. The garden comes next, before another new creature, in six small steps: a Gloamberry seed, made in the bag; a garden bed, made at the workbench and set down at home; planting; growing while you are below; picking; then guano and water.",
    "Decisions: D-561, D-562.",
  ] },
  { v: '0.3.23', date: '2026-11-02', title: 'Crafting from chests', lines: [
    "The workbench now uses what is in your stash chests too: on the surface, every chest within 6 tiles of you counts, as for the bag's Store button.",
    "Its card shows one total for each cost, what your bag and those chests hold together, as \"3 / 5 Wood\", and Make is dim only when they all hold too few.",
    "Make takes from your bag first, then from the nearest chest, then the next.",
    "Decisions: D-560.",
  ] },
  { v: '0.3.22', date: '2026-11-02', title: 'Sort in the bag', lines: [
    "A small Sort button sits in the bag's title strip, always: just left of Store, or beside the cross when Store is hidden. It lines your bag up in the game's own order (oil and healing first, things you made last) and joins half stacks, the full ones first, free.",
    "It says \"You sort the bag.\", or \"The bag is in order.\" when nothing would change.",
    "On a keyboard, press Up from the gear row to reach Sort (Store when it shows, then Left for Sort), and Down to go back.",
    "Decisions: D-559.",
  ] },
  { v: '0.3.21', date: '2026-11-02', title: 'Store from the bag', lines: [
    "A small Store button sits in the bag's title strip, just left of the cross, when you are on the surface with a stash chest within 6 tiles. It sends each stack in your bag to the chests nearby that already hold that kind, the nearest chest first, free.",
    "It says how many stacks moved, \"Nothing to store.\" when none match, and \"Chests full.\" after the count when some had to stay in your bag (\"The chest is full.\" with only one chest nearby).",
    "On a keyboard, press Up from the gear row to reach Store, and Down to go back.",
    "Decisions: D-558.",
  ] },
  { v: '0.3.20', date: '2026-11-02', title: 'No freeze at a fall', lines: [
    "Falling on a floor of several rooms, from depth 2 down, no longer freezes the game: the small round map broke while showing the fall, and stopped everything. Thanks to a friend's playtest.",
    "If anything else ever goes wrong while the screen is drawn, the game now carries on instead of freezing.",
    "Decisions: D-557.",
  ] },
  { v: '0.3.19', date: '2026-11-02', title: 'Store on the chest', lines: [
    "A stash chest's card has a Store button in its bottom right corner: every stack in your bag of a kind the chest already holds goes onto it, free. It says how many stacks moved, \"Nothing to store.\" when none match, and that the chest is full when some had to stay in your bag.",
    "On a keyboard, press Down from the bag's bottom row to reach Store.",
    "Decisions: D-556.",
  ] },
  { v: '0.3.18', date: '2026-11-02', title: 'Store from the bag, too', lines: [
    "Storing what matches will come as two buttons: first Store on a chest's card, filling just that chest, then a small Store in the bag, sending your stacks to every stash chest within 6 tiles that already holds that kind. Both free. Docs only.",
    "Decisions: D-555.",
  ] },
  { v: '0.3.17', date: '2026-11-01', title: 'Take off', lines: [
    "Choose the Weapon or Tool slot in the bag's gear row and press Take off: the spear, knife or Stone Pick goes back into your bag, and no turn passes. With the bag full it stays put. Worn pieces show their words but can't come off.",
    "On a keyboard, press Up from the bag's top row to reach the gear row; Enter takes off.",
    "Decisions: D-554.",
  ] },
  { v: '0.3.16', date: '2026-11-01', title: 'Gear slots', lines: [
    "The bag shows a row of five gear slots across its top: Weapon, Tool, Armour and two Charms. Empty ones show faintly what goes there, and what you wear is now always in view.",
    "The Stone Pick has its own Tool slot. Choose it in the bag and press Hold to put it there (a turn); it breaks copper veins only from that slot. A pick you make goes straight into an empty Tool slot, and one already in your bag moves there by itself.",
    "Decisions: D-552, D-553.",
  ] },
  { v: '0.3.15', date: '2026-11-01', title: 'The bone rat', lines: [
    "A new creature, the bone rat, now turns up from depth 4 down: a rat with nothing left but bone. It chases you and never runs away.",
    "It has 3 hearts and bites for 1, with a dry clatter of bones and a snap of teeth.",
    "Beaten, it may leave a Rat Bone, which the peddler buys for 1 coin; its recipes come later.",
    "Decisions: D-551.",
  ] },
  { v: '0.3.14', date: '2026-11-01', title: 'The herb mimic', lines: [
    "A new creature, the herb mimic, now turns up from depth 3 down. Asleep, it looks just like a herb; bump it, or step on it to heal, and it opens its eyes and chases you for 6 turns.",
    "It has 2 hearts and bites for 1, with a dry rustle of leaves and a snap. Stepping on it never heals you.",
    "Beaten, it may leave a Mimic Leaf, which the peddler buys for 1 coin; its recipes come later.",
    "Decisions: D-549, D-550.",
  ] },
  { v: '0.3.13', date: '2026-11-01', title: 'The Pouch and the Big Bag', lines: [
    "The workbench can make a Pouch, from 4 Rat Tail and 2 Spider Silk. Make it and your bag holds 9 things instead of 6, for good.",
    "Once you have the Pouch, the workbench offers the Big Bag, from 4 Mole Fur and 3 Spider Silk, and your bag holds 12.",
    "A bigger bag shows as a 3 × 3 grid, then 4 × 3, with slightly smaller slots so it fits a sideways screen, in the bag, the chest and the peddler's card.",
    "Decisions: D-547, D-548.",
  ] },
  { v: '0.3.12', date: '2026-11-01', title: 'Drop', lines: [
    "A new Drop button in the bag, for every item (or X on a keyboard), sets the chosen stack down at your feet, free, to make room. Walk back onto it to pick it all up again.",
    "Drop while standing on something your full bag couldn't take, and the two swap: your stack goes down and the find comes into the bag.",
    "Bigger bags come later: a Pouch for 9 slots, then a Big Bag for 12, made at the workbench.",
    "Decisions: D-545, D-546.",
  ] },
  { v: '0.3.11', date: '2026-11-01', title: 'The snapcap', lines: [
    "A new creature, the snapcap, now turns up from depth 2 down. It looks just like a heartcap until you stand beside it; then its eyes and teeth show.",
    "It never moves. It bites for 1 whoever stands beside it, light or dark, with a wet squelch and a snap, and it has 2 hearts.",
    "Beaten, it may leave a Snapcap Gill, which the peddler buys for 1 coin; its recipes come later.",
    "Decisions: D-543, D-544.",
  ] },
  { v: '0.3.10', date: '2026-11-01', title: 'The mole', lines: [
    "A new creature, the mole, now turns up from depth 5 down. It chases you once it sees you in the light, and it never flees.",
    "It has 4 hearts, the most of any creature so far, and bites for 1, with a low snuffle and a scrape of claws.",
    "Beaten, it may leave Mole Fur, which the peddler buys for 1 coin, and now and then a rare Mole Claw, which the peddler buys for 5; their recipes come later.",
    "Decisions: D-541, D-542.",
  ] },
  { v: '0.3.9', date: '2026-11-01', title: 'Bat guano', lines: [
    "Bat Guano now lies in the caves: as each room is made, every bat gets a pile on the floor beside it. Walk onto it to put it in your bag, in stacks of 20.",
    "It grows back a day after you take it, out of sight. The peddler buys it for 1 coin, and it is kept for the garden and for crafts later.",
    "Decisions: D-540.",
  ] },
  { v: '0.3.8', date: '2026-11-01', title: 'The bat', lines: [
    "A new creature, the bat, now turns up from depth 3 down. It flies toward your lit lantern, or the nearest lit torch, from anywhere in the room; with no light about, it stays where it is.",
    "It has 2 hearts and bites for 1, with a quick squeak and a flap of wings. Hurt, it may flee for a few turns, as a rat does.",
    "Beaten, it may leave a Bat Wing, which the peddler buys for 1 coin, and now and then a rare Bat Fang, which the peddler buys for 5; their recipes come later.",
    "Decisions: D-537, D-538, D-539.",
  ] },
  { v: '0.3.7', date: '2026-11-01', title: 'The cave spider', lines: [
    "A new creature, the cave spider, now turns up from depth 2 down. It shuns light: it waits in the dark, backs away from your lantern, and bites only when you stand beside it in the dark.",
    "It has 2 hearts and bites for 1, with a soft hiss and a click. Beaten, it may leave Spider Silk, which the peddler buys for 1 coin; its recipes come later.",
    "Decisions: D-535, D-536.",
  ] },
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
