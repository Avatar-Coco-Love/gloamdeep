// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; 0.3.151 to 0.3.200
// are in history-0.3-3.js (D-782), 0.3.76 to 0.3.150 in history-0.3-2.js (D-740) and 0.3.0 to
// 0.3.75 in history-0.3-1.js (D-699); stage 0.2's are in history-0.2.js and its split files.
export const HISTORY_03 = [
  { v: '0.3.242', date: '2026-11-10', title: 'The Mending Draught', lines: [
    "New: the Mending Draught, a moss green bottle. Once you have held Mimic Leaf and Herb, the mortar makes it from 2 Mimic Leaf and 1 Herb. Drink it from your bag and it heals you slowly: a heart every 15 turns for 60 turns, 4 in all, never above full. A green bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while you sleep, giving no hearts then, and a fall ends it.",
    "Mimic Leaf now says \"good for making things\", and its card shows \"Makes a Mending Draught at the mortar\".",
    "Decisions: D-794.",
  ] },
  { v: '0.3.241', date: '2026-11-10', title: 'The rare herb mimic', lines: [
    "Day creatures, third: the rare herb mimic. Each day one of the woods rooms round home, picked by your seed, has a herb mimic too, beside its mole and bunny. It sleeps on the grass looking just like a herb, wakes with a bump and chases you, and leaves a Mimic Leaf as it does below. Gone by nightfall like the others.",
    "Decisions: D-793.",
  ] },
  { v: '0.3.240', date: '2026-11-10', title: 'Slowburn', lines: [
    "New: Slowburn, a bottle dark as lamp oil. Once you have held Tick Shell and Oilcap, the mortar makes it from 2 Tick Shell and 1 Oilcap. Drink it from your bag and your lantern burns slower for 60 turns: a full tank lasts 70 turns, not 60, on top of the Heart Charm. An amber bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while your lantern is empty or you sleep, and a fall ends it.",
    "Tick Shell now says \"good for making things\", and its card shows \"Makes a Slowburn at the mortar\".",
    "Fixed: the Glow Draught's DRINK button looked dim at full health, though it could always be drunk.",
    "Decisions: D-792.",
  ] },
  { v: '0.3.239', date: '2026-11-10', title: 'The Glow Draught', lines: [
    "New: the Glow Draught, a gold bottle. Once you have held Duskstar and Wisp Glass, the mortar makes it from 2 Duskstar and 1 Wisp Glass. Drink it from your bag and your lantern's light reaches 1 tile farther for 60 turns, on top of Wide Glow. A gold bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while your lantern is empty or you sleep, and a fall ends it.",
    "Duskstar and Wisp Glass now say \"good for making things\", and their card shows \"Makes a Glow Draught at the mortar\".",
    "Decisions: D-791.",
  ] },
  { v: '0.3.238', date: '2026-11-10', title: 'The Mortar and Pestle', lines: [
    "New: the Mortar and Pestle, a stone bowl on a stump. Make it on the bag's Make tab from 4 Stone and 1 Wood, then set it down outside like the bed. Bump it, day or night, to open its card; it has nothing to make yet, and the Glow Draught comes next. DECONSTRUCT puts it back in your bag.",
    "Decisions: D-789, D-790.",
  ] },
  { v: '0.3.237', date: '2026-11-10', title: 'The bag\'s Make tab', lines: [
    "The bag has two tabs, BAG and MAKE. The Make tab lists everything you can make from your bag: pick one to see its cost from what you carry, then press MAKE. A recipe shows once you have held each of its finds, and stays after.",
    "On the Bag tab, a find's MAKE now opens the Make tab on its recipe, and a line above it shows what it makes (\"Makes an Oil flask\"). Tab switches the tabs.",
    "Decisions: D-788.",
  ] },
  { v: '0.3.236', date: '2026-11-10', title: 'Mortar and Make tab, the plan', lines: [
    "Nothing in the game changes. The plan for the first potion station is set. The Mortar and Pestle is a stone bowl on a stump, made from 4 Stone and 1 Wood. Its first recipe is the Glow Draught, made from 2 Duskstar and 1 Wisp Glass, which makes your lantern reach 1 tile farther for 60 turns. The workbench has no room left, so first the bag gets a Make tab listing everything you can make from your bag.",
    "Decisions: D-786, D-787. Questions: Q-093 narrowed.",
  ] },
  { v: '0.3.235', date: '2026-11-10', title: 'Alchemy and cooking, the plan', lines: [
    "Nothing in the game changes. Alchemy's plan is set: first a mortar and pestle built at home, later an alchemy lab with stronger potions. Its recipes are fixed, like Make today, and its first new potion will make your lantern reach farther for a while. Cooking comes after, at a kitchen fire at home, and simple food can also be cooked at a lit campfire.",
    "Decisions: D-785. Questions: Q-093 and Q-088 narrowed.",
  ] },
  { v: '0.3.234', date: '2026-11-10', title: 'Day creatures, second: the bunny', lines: [
    "Day creatures, second: the bunny, the first creature that means no harm. Each day one comes out in the home room and one in each woods room round home, beside the mole. It never bites, and hops away once you come within 3 steps; corner it and one blow beats it, and it may leave Bunny Fur, for crafts later. Gone by nightfall, back the next day.",
    "Decisions: D-784.",
  ] },
  { v: '0.3.233', date: '2026-11-10', title: 'The audit\'s bug fixes', lines: [
    "The audit's bug fixes. Night and day creatures no longer pile up in a woods room left and come back to on a later night or day: the earlier ones go first.",
    "Waking from sleeping out, a night creature beside the hero has already gone with the dawn, and no longer bites.",
    "Night creatures come out at least 4 steps from the hero, as the mole does, so none appears right beside them with the lantern out.",
    "Decisions: D-783.",
  ] },
  { v: '0.3.232', date: '2026-11-10', title: 'The thirteenth audit', lines: [
    "The thirteenth audit. Nothing in the game changes. Three big code files are split, word for word: the Version history's newest file again (0.3.151 to 0.3.200 move to history-0.3-3.js), the creatures' pictures (to pictures-creatures.js) and the creatures' lines (to lines-creatures.js).",
    "Docs: finished decisions, ticked plan steps and three of the surface's questions moved to the archive or their own files, word for word, so a conversation starts by reading less. Four creatures' glossary lines, the sound packs in use and the ponds now match the game. A bug hunt found three bugs, fixed next. The playbook gains what this stretch taught, in a new WORKFLOW-3.md. The next audit is at 0.3.272.",
    "Decisions: D-782. D-740, D-742, D-743 and D-773 to D-777 moved to the archive, word for word.",
  ] },
  { v: '0.3.231', date: '2026-11-10', title: 'Day creatures, first: the mole', lines: [
    "Day creatures, first: the mole. Each day a mole comes out in each of the woods rooms round home, never at home, on the grass at least 4 steps from you. It digs down when it sees you, tunnels over as a mound and comes up beside you, and leaves its fur or a rare claw as it does below. Gone by nightfall, back the next day.",
    "Decisions: D-781. D-779 moved to the archive, word for word.",
  ] },
  { v: '0.3.230', date: '2026-11-10', title: 'Night creatures, third: gloamling', lines: [
    "Night creatures, third: the rare gloamling. Each night one of the woods rooms round home, picked by your seed, has a gloamling too, beside its lampmoth and bat. It hunts you from the dark but will not step into your light, and leaves a Gloam Wisp or a rare Gloam Eye as it does below. Gone by morning like the others.",
    "Decisions: D-780. D-778 moved to the archive, word for word.",
  ] },
  { v: '0.3.229', date: '2026-11-10', title: 'Night creatures, second: the bat', lines: [
    "Night creatures, second: the bat. Once dusk darkens the woods, a bat comes out too in each woods room round home, never at home, and flies for your lantern, beside the lampmoth. One beaten stays beaten till the next night, and any still about are gone by morning.",
    "Decisions: D-779. D-772 moved to the archive, word for word.",
  ] },
  { v: '0.3.228', date: '2026-11-10', title: 'Night creatures, first: lampmoths', lines: [
    "Night creatures, first: lampmoths. Once dusk darkens the woods, a lampmoth comes out in each woods room round home, never at home, and flies for your lantern. One beaten stays beaten till the next night, and any still about are gone by morning.",
    "Decisions: D-778. D-771 moved to the archive, word for word.",
  ] },
  { v: '0.3.227', date: '2026-11-10', title: 'The fight\'s sounds', lines: [
    "The fight's sounds: a hit with the lantern now lands with a muffled thump, and a hit with the knife or spear with a quick slice. When a creature is beaten, a soft heavy thud follows a moment after the hit. All as loud as a step. With Sound: Off, nothing plays.",
    "Decisions: D-777. D-768 moved to the archive, word for word. Questions: Q-095 narrowed.",
  ] },
  { v: '0.3.226', date: '2026-11-10', title: 'Steps below', lines: [
    "Footsteps below ground: underground, each step the hero walks now sounds too, by the ground. Stone in the crypt, the rock caves and the dungeon halls, with a faint echo off the walls; soft packed earth in the burrows (floors 5 to 7). With Sound: Off, nothing plays.",
    "Decisions: D-776. D-767 moved to the archive, word for word. Questions: Q-095 narrowed.",
  ] },
  { v: '0.3.225', date: '2026-11-10', title: 'The lantern\'s metal click', lines: [
    "The lantern clicks: a small metal click each time it goes on or off, by hand or by itself, higher for on and lower for off, as loud as a footstep. It plays above ground and below. With Sound: Off, nothing plays.",
    "Decisions: D-775. D-766 moved to the archive, word for word. Questions: Q-095 narrowed.",
  ] },
  { v: '0.3.224', date: '2026-11-10', title: 'Grass steps, the first sound file', lines: [
    "The first sound from a file: on the surface, each step the hero walks sounds of soft grass, one of 5 recordings in turn, never the same twice running and a little higher or lower each time. Underground stays silent for now. With Sound: Off, nothing plays.",
    "A fifth free sound pack is saved in the game's files: ObsydianX's Interface SFX Pack 1 (222 menu tones, no credit needed), cut of its silence.",
    "Decisions: D-774. D-765 moved to the archive, word for word. Questions: Q-095 narrowed.",
  ] },
  { v: '0.3.223', date: '2026-11-10', title: 'Sounds from files', lines: [
    "The game is silent for now: every sound made in code is gone, since none sounded good. Sounds will come from sound files instead, from a free pack (Kenney's first, which needs no credit).",
    "Four free sound packs from Kenney (335 sounds, no credit needed) are saved in the game's files, ready to choose from; the game doesn't play them yet.",
    "A new list, docs/SOUNDS.md, names every sound the game needs, when each plays and how it should feel. It grows with the game.",
    "Decisions: D-773. D-764 moved to the archive, word for word. Questions: Q-095 opened.",
  ] },
  { v: '0.3.222', date: '2026-11-10', title: 'Alchemy, a station of its own', lines: [
    "Nothing in the game changes. Alchemy will get a station of its own at home, apart from the kitchen fire: a mortar and pestle, an alchemy lab, or both, still to choose. 16 finds already wait for recipes. It comes after the night creatures and then the day creatures. After that, the hero gets a bow for ranged attacks.",
    "Decisions: D-771, D-772. D-769 and D-770 moved to the archive, word for word. Questions: Q-093 and Q-094 opened.",
  ] },
  { v: '0.3.221', date: '2026-11-10', title: 'A miners\' camp', lines: [
    "The second landmark: a miners' camp now stands in one of the 3 mountain rooms, never the one with the campfire or the lamppost. It's a slumped canvas tent and an old crate, 3 tiles wide and 2 tall, with a stone pick leaning on the crate. Bump it and it says \"A miners' camp, long left.\" and asks \"Take the pick?\" Yes puts a Stone Pick in your bag and the pick is gone from the camp; after that, a bump only says its words. With a pick already carried, or a full bag, it tells you so and keeps its pick. In an older journey, its room gets it if you haven't been there yet.",
    "Decisions: D-770. D-763 moved to the archive, word for word.",
  ] },
  { v: '0.3.220', date: '2026-11-10', title: 'A dead lamppost', lines: [
    "The first landmark: a dead lamppost now stands in one of the 8 rooms around home, never the one with the campfire. It's an old Lightkeeper's iron post with its cold lamp hanging from the arm. You can't walk through it, and light passes it. Bump it and it says \"An old lamppost.\", then \"Its lamp went out long ago.\" In an older journey, its room gets it if you haven't been there yet.",
    "Decisions: D-769. D-762 moved to the archive, word for word. The rare materials' table moved from CONTENT-3.md to CONTENT-FINDS.md, word for word.",
  ] },
  { v: '0.3.219', date: '2026-11-10', title: 'A note for bosses', lines: [
    "Nothing in the game changes. A note is kept for when bosses are designed: a boss beaten by a scorpion's sting or a glob could lose its found ability, so its big rewards may need to come whatever lands the last blow.",
    "Decisions: none. Questions: a note added to Q-083.",
  ] },
  { v: '0.3.218', date: '2026-11-10', title: 'The sting hits creatures too', lines: [
    "The scorpion's sting now hits creatures too. A creature on its marked tiles takes 2 hearts, just as you would, and the line says \"The sting strikes the rat.\" with its name. One beaten this way leaves nothing and gives no experience. A creature in front of you doesn't shield you: every marked tile is struck. Other scorpions are hit too, and one stung with its tail up strikes no more. A mole under the earth and a pile of bones are passed over. The scorpion's Bestiary page says so.",
    "Decisions: D-768. D-761 moved to the archive, word for word.",
  ] },
  { v: '0.3.217', date: '2026-11-10', title: 'The rat pack\'s warning', lines: [
    "A rat pack now warns you. The turn a pack notices you, one of its three lines shows in amber: \"The pack closes in!\", \"Rats squeak all around you!\" or \"A pack of rats comes for you!\", taking turns. A pack that loses you and finds you again warns again. A rat alone, or the last of a pack, stays silent, and a bite that turn keeps its own line.",
    "Decisions: D-767. D-760 moved to the archive, word for word.",
  ] },
  { v: '0.3.216', date: '2026-11-10', title: 'Names with spaces and digits', lines: [
    "A name can now hold digits and spaces as well as letters, up to 12 in all, so OLD TOM and COCO 2 both work.",
    "The name pad's bottom row is M, Del, then Z, Spc, 123 and OK. Press 123 to swap the letters for the digits 1 to 9 and 0, and ABC to swap back.",
    "A space never starts a name or follows another space, and one left at the end is dropped when you press OK. On a keyboard, Space now types a space and digits type too.",
    "The rat pack, the scorpion and the bone rat stay as they are; the details Claude filled in are now settled.",
    "Decisions: D-765, D-766. Questions closed: Q-054. D-757 moved to the archive, word for word.",
  ] },
  { v: '0.3.215', date: '2026-11-09', title: 'Dimmer doorway lines', lines: [
    "The pale blue lines across doorways are about half as bright, so they no longer glare. They still pulse gently, and hold still with reduced motion. The map's doorway squares are unchanged.",
    "Decisions: D-764.",
  ] },
  { v: '0.3.214', date: '2026-11-09', title: 'The duskstar', lines: [
    "The first flower grows outside: the duskstar, five violet petals round a yellow heart. 2 grow in each woods room, home too, on the grass; the mountain rooms have none. Each faces its own way and has its own slight shade of violet.",
    "Walk onto a duskstar to put it in your bag, for crafts later. A day after you pick it, it grows again somewhere else in the same room.",
    "In a saved game, woods rooms you haven't seen yet get their duskstars too; rooms you have seen stay as they were.",
    "Decisions: D-763.",
  ] },
  { v: '0.3.213', date: '2026-11-09', title: 'Herbs outside', lines: [
    "Healing herbs now grow outside: one in each woods room, home too, on the grass. The mountain rooms have none. It is the same herb as in the caves: walk onto it hurt and you eat it, at full health it goes in your bag, and it grows back a day after you pick it.",
    "In a saved game, woods rooms you haven't seen yet get their herb too; rooms you have seen stay as they were.",
    "Decisions: D-762.",
  ] },
  { v: '0.3.212', date: '2026-11-09', title: 'Loose stones', lines: [
    "Loose stones now lie in the mountain rooms: 2 in each, on the grass, looking like the stone in your bag. Walk onto one to take it, and it grows back a day after you pick it. The woods rooms have none.",
    "In a saved game, mountain rooms you haven't seen yet get their stones too; rooms you have seen stay as they were.",
    "Decisions: D-761.",
  ] },
  { v: '0.3.211', date: '2026-11-09', title: 'Oilcaps outside', lines: [
    "Oilcaps now grow outside: one in each woods room, home too, at the foot of a tree. The mountain rooms have none. Walk onto it to take it, as in the caves, and it grows back a day after you pick it.",
    "In a saved game, woods rooms you haven't seen yet get their oilcap too; rooms you have seen stay as they were.",
    "Decisions: D-760. Questions opened: Q-092.",
  ] },
  { v: '0.3.210', date: '2026-11-09', title: 'Stiff', lines: [
    "Waking from sleeping out now leaves you stiff for 20 turns: \"You wake on the cold ground, stiff.\" While stiff, 1 swing in 3 at a creature misses, \"Your stiff arm swings wide.\", and the turn still passes.",
    "Stiff shows as a pale blue Zz beside the poisoned drop under your hearts. Tap it to see the turns left. A fall ends it.",
    "Decisions: D-759.",
  ] },
  { v: '0.3.209', date: '2026-11-09', title: 'Sleeping out', lines: [
    "Outside at night, with no creature after you, a moon button now shows above the lantern. Tap it and a card asks Sleep here until morning? Yes sleeps until the next morning, and the lantern burns no oil while you sleep.",
    "Sleeping on the ground isn't a bed: you wake with the hearts you lay down with, no healing and no gold heart.",
    "Decisions: D-758. Questions opened: Q-091.",
  ] },
  { v: '0.3.208', date: '2026-11-09', title: 'Campfires', lines: [
    "A campfire now stands in one of the 8 surface rooms round home, the seed picking the room and how lit it is: blazing, low embers or cold ashes. Bump it to read what it says, a sentence a bump.",
    "A burning campfire lights the dark round it at night, blazing as far as a torch, embers a little less.",
    "Bump cold ashes and a card asks Light the fire? Yes lights it into embers with one turn of your lantern's oil; with an empty lantern Yes is grey.",
    "Decisions: D-757. Questions closed: Q-090.",
  ] },
  { v: '0.3.207', date: '2026-11-09', title: 'Thick woods and glades', lines: [
    "The woods round home now differ: each of the 5 rooms is thick woods, the woods as before, or an open glade, the seed picking, with at least one thick room and one glade every journey. Home stays as it was.",
    "In a saved game, a woods room you have already been to stays as it is; one you have never seen grows as its new kind.",
    "Decisions: D-756. Questions opened: Q-090.",
  ] },
  { v: '0.3.206', date: '2026-11-09', title: 'The motes that stay', lines: [
    "Once you have found the way down, a few dust motes now stay in the lantern light, each wandering its own slow way: 3 in the crypt and earth, 2 in grey rock and the dungeon, none under the sky.",
    "Decisions: D-755.",
  ] },
  { v: '0.3.205', date: '2026-11-09', title: 'Waymark\'s dot on the rim', lines: [
    "With Waymark, when the nearest stairs down are too far to fit on the round map, a violet dot now sits on its rim, pointing toward them. It pulses as the map's marks do, and counts stairs you have already found too.",
    "Decisions: D-754.",
  ] },
  { v: '0.3.204', date: '2026-11-09', title: 'The waystone by the crypt\'s door', lines: [
    "The home waystone now stands in the room with the cave mouth, the crypt's door, 2 tiles north of the room's middle, as it stood in the middle room. Where it stood in the middle room is grass now.",
    "A boon now lasts until you are back in the waystone's room, however you come: up from the crypt, by waystone or through the woods. The middle room no longer ends it.",
    "Find the waystone shows on reaching its room, and in a journey begun in the south woods it says \"Old standing stones, by the crypt's door.\"",
    "In a saved game the waystone moves there too, still awake if you woke it. Anything you set down where it stood stays.",
    "Decisions: D-753.",
  ] },
  { v: '0.3.203', date: '2026-11-09', title: 'Put out your lantern', lines: [
    "A new goal, Put out your lantern: \"Tap the lantern, or press L, to save oil.\" It shows the first time daylight comes while your lantern is lit, stepping out of the dark or at dawn, and goes ahead of any other goal while the lantern burns in daylight. Putting it out does it and pays its reward. If the lantern was already out, as By itself does, it is ticked quietly. It never shows again.",
    "Decisions: D-752.",
  ] },
  { v: '0.3.202', date: '2026-11-09', title: 'Trees in groves', lines: [
    "The trees outside vary now: bigger and smaller, a little out of line, in three greens (the old green, a deep blue-green and a warm olive), with neighbouring trees sharing a green so the woods shift colour in patches. Walking and cutting are unchanged.",
    "Docs only: your next four ideas are planned, one step each: a tip to put the lantern out in daylight, the home waystone beside the crypt's door, a Waymark dot on the round map's rim, and motes that stay once the way down is found.",
    "Decisions: D-750, D-751.",
  ] },
  { v: '0.3.201', date: '2026-11-09', title: 'Calmer grass', lines: [
    "The grass outside is calmer: the same three greens in big soft patches, mostly the middle green, with fewer pale blades. No more camouflage look.",
    "Decisions: D-749.",
  ] },
];
