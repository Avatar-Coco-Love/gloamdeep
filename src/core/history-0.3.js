// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; 0.3.251 to 0.3.300
// are in history-0.3-5.js (D-910), 0.3.201 to 0.3.250 in history-0.3-4.js (D-826), 0.3.151 to 0.3.200 in
// history-0.3-3.js (D-782), 0.3.76 to 0.3.150 in
// history-0.3-2.js (D-740) and 0.3.0 to 0.3.75 in history-0.3-1.js (D-699); stage 0.2's are in
// history-0.2.js and its split files.
export const HISTORY_03 = [
  { v: '0.3.356', date: '2026-11-14', title: 'Kind Herbs\' words', lines: [
    "Fixed: Kind Herbs' card now says \"All you eat, and potions, heal 1 heart more.\" Heartcaps and gloamberries always had the extra heart; the old words left them out.",
    "Decisions: D-913.",
  ] },
  { v: '0.3.355', date: '2026-11-14', title: 'The oil\'s After', lines: [
    "Fixed: on the bag card, a flask's or minnow's \"After\" oil now counts the turn the pour takes, so it shows what the pour really gives.",
    "Decisions: D-912.",
  ] },
  { v: '0.3.354', date: '2026-11-14', title: 'Flyers over things', lines: [
    "Fixed: a bat, lampmoth or lure wisp over the bench, a chest, a garden bed, the bed, a brazier or a bedroll can now be struck by walking into it, instead of opening its card.",
    "Decisions: D-911.",
  ] },
  { v: '0.3.353', date: '2026-11-14', title: 'The sixteenth audit', lines: [
    "The sixteenth audit. Nothing in the game changes. The pictures of the finds you carry move out of the biggest picture file into their own, and 0.3.251 to 0.3.300 of the Version history into theirs, word for word.",
    "Docs: two finished decisions and the playbook's newest lessons move to the archive or their own page, word for word; Waiting on the owner is shorter. A bug hunt over the code since the last audit found five bugs, listed in the docs; their fixes come next, one step each. The next audit is at 0.3.393.",
    "Decisions: D-910. D-897 and D-903 moved to the archive, word for word.",
  ] },
  { v: '0.3.352', date: '2026-11-14', title: 'A draught\'s turns, now and after', lines: [
    "In the bag, a draught now shows its turns under its rows: its own mark from under the hearts, twice as big, \"Now\" over \"After\". The rim shows the time left, as it does at the top of the screen.",
    "\"After\" is always full, as drinking one again starts its 60 turns over. With none working, \"Now\" shows the mark with its rim dark.",
    "Like the other pictures, it's left out where it would reach the buttons.",
    "Decisions: D-909.",
  ] },
  { v: '0.3.351', date: '2026-11-14', title: 'Hearts or oil, now and after', lines: [
    "In the bag, a find that heals or fills the lantern now shows your hearts or oil \"Now\" and \"After\" under its rows, twice the size of the ones at the top of the screen. What it adds is pale.",
    "What would pass the top shows faint past the end, so a potion at nearly full hearts, or a flask in a nearly full lantern, shows what it would waste. At full hearts, all of an herb's hearts show faint.",
    "A boon counts: with Kind Herbs, \"After\" shows the extra heart. A minnow or cavefish shows hearts and oil side by side, one under the other where the card is narrow, and is left out where it would reach the buttons.",
    "Decisions: D-908.",
  ] },
  { v: '0.3.350', date: '2026-11-14', title: 'A weapon\'s hits on the grid', lines: [
    "In the bag, a weapon now shows its hits on the grid under its rows: the hero, a rat on each tile it hits and what it takes in red, \"This one\" above and \"Held now\", the weapon in your hand, below. The spear hits two rats in a line; the Warden's Fist knocks its rat a tile back.",
    "With no weapon in hand, \"Held now\" shows the lantern's hit of 1. Tapping the weapon in the gear row shows only its \"Held now\" row.",
    "On a short screen held sideways the picture is left out when it would reach the buttons; the rows always show.",
    "Decisions: D-907.",
  ] },
  { v: '0.3.349', date: '2026-11-14', title: 'Numbers on the stash chest', lines: [
    "At a stash chest, the chosen thing, in the chest or the bag, now shows what it does in rows under its name, as in the bag: a draught what it does and for how long, a weapon how hard it hits. \"Tap to move\" sits below them, left out when there's no room.",
    "Held sideways, the rows end left of STORE when they reach it, so they never run under the button.",
    "Written down for later: the round map fading in the dark, and its rim showing danger.",
    "Decisions: D-906.",
  ] },
  { v: '0.3.348', date: '2026-11-14', title: 'Numbers on the peddler\'s trade', lines: [
    "At the peddler's, the chosen thing now shows what it does, in rows under how many you carry, on both Sell and Buy: an Oil flask how much of the lantern it fills, a torch how long it burns. What it sells for isn't a row there, as the peddler says it himself.",
    "Decisions: D-905.",
  ] },
  { v: '0.3.347', date: '2026-11-14', title: 'Numbers on the Make tab', lines: [
    "On the bag's Make tab, the workbench and the mortar, the chosen recipe now shows what the made thing does, in rows under its costs: an Oil flask how much of the lantern it fills, a draught what it does and for how many turns, a vest or charm what it changes, a pouch how big the bag grows.",
    "On a short phone held sideways, the description is left out when it would run into MAKE, so the numbers always show.",
    "Decisions: D-904.",
  ] },
  { v: '0.3.346', date: '2026-11-14', title: 'The vault\'s decisions archived', lines: [
    "Nothing in the game changed. Older decisions moved to the archive to keep the decisions page small: the vault door opening and the vault's prize, both built.",
    "Decisions: D-903. D-895 and D-896 moved to the archive, word for word.",
  ] },
  { v: '0.3.345', date: '2026-11-14', title: 'Numbers in the bag', lines: [
    "In the bag, a chosen item now shows what it does, in rows under its name: an icon, what it does and its number in gold. A weapon shows how hard it hits, food and potions how many hearts they heal, oil how much of the lantern it fills, a draught what it does and for how many turns, armour and charms what they change, and a material what it sells for. A piece in the gear row shows its rows too.",
    "On a short phone held sideways, an item's description is left out when it would run into the buttons, so its numbers always show.",
    "Decisions: D-902.",
  ] },
  { v: '0.3.344', date: '2026-11-14', title: 'Flyers over low things', lines: [
    "Bats, lampmoths and lure wisps now fly over low things: what you built, bushes, fallen branches, rubble, plinths and braziers, as over water. Trees, rock and walls still stop them. Walk into one hovering over a low thing to strike it.",
    "Decisions: D-901.",
  ] },
  { v: '0.3.343', date: '2026-11-14', title: 'Built things on the map', lines: [
    "On the map and the round map, what you built (chests, workbenches, beds, bedrolls, garden beds, the shelf, the mortar, torches and your own campfires) now shows in a warm wood brown, so it no longer looks like a tree.",
    "Your next ideas are written down, in order: flyers over low things and into trees, then cutting a room as you like, creatures through doorways and a shovel.",
    "Decisions: D-898, D-899, D-900. Questions raised: Q-106, Q-107. D-893 moved to the archive, word for word.",
  ] },
  { v: '0.3.342', date: '2026-11-14', title: 'The lantern\'s words', lines: [
    "The lantern goals now say what you press, the way you last played: on a phone, \"Tap the lantern.\" and \"Tap the lantern, to save oil.\"; with a mouse, \"Click the lantern, or press L.\"; with keys, \"Press L.\" The words change when you switch.",
    "Decisions: D-897.",
  ] },
  { v: '0.3.341', date: '2026-11-13', title: 'The vault\'s prize', lines: [
    "Each vault now holds a prize on a small stone plinth behind its door: 1 vault in 4 an ember, which glows faintly, the rest 2 of a rare material.",
    "Bump the plinth to take it. An ember is 1 more to spend in Growth: \"An ember! Spend it in Growth.\" The plinth is left bare.",
    "Decisions: D-896. D-892 moved to the archive, word for word.",
  ] },
  { v: '0.3.340', date: '2026-11-13', title: 'The door opening', lines: [
    "The vault door opens: light the second brazier and the stone door sinks open for good, its two notches glowing on the stone above it, and the braziers burn on.",
    "Leave a vault with only one brazier lit and it goes cold again, so you can always try again (the oil spent stays spent).",
    "Decisions: D-895. D-891 moved to the archive, word for word.",
  ] },
  { v: '0.3.339', date: '2026-11-13', title: 'The decisions trimmed', lines: [
    "Nothing in the game changed. Older decisions moved to the archive to keep the decisions page small: the two health checks and their order, all done.",
    "Decisions: D-894. D-860 to D-862 moved to the archive, word for word.",
  ] },
  { v: '0.3.338', date: '2026-11-13', title: 'The lit brazier', lines: [
    "The braziers light: bump a cold brazier with your lantern lit and it asks \"Light the brazier?\". Yes spends 5 turns' oil and a turn, and a flame sways in its bowl, lighting the dark 2 tiles round it. With less oil, Yes is grey.",
    "Each lit brazier makes one notch glow violet under the sealed door's flame rune. The door opens in the next step.",
    "Decisions: D-893. D-890 moved to the archive, word for word.",
  ] },
  { v: '0.3.337', date: '2026-11-13', title: 'The first vault', lines: [
    "The first vault: from depth 2, one dead-end room on each floor is a vault, built in the crypt's bricks. Two cold stone braziers stand before a sealed stone door with a flame rune, and a small vault waits behind it, empty for now.",
    "Bump a brazier or the door to hear its words. Lighting the braziers and opening the door come in the next steps.",
    "Decisions: D-892. D-889 moved to the archive, word for word.",
  ] },
  { v: '0.3.336', date: '2026-11-13', title: 'The brazier vault', lines: [
    "Nothing in the game changed. The first puzzle is settled: a vault room on each floor from depth 2, with 2 stone braziers and a sealed door. Bump a brazier with the lantern lit to light it, for 5 turns' oil; once both burn, the door opens for good.",
    "Inside, one prize: a rare material or an ember, with more kinds later. Later vaults will hold other puzzles too.",
    "Decisions: D-891. D-888 moved to the archive, word for word.",
  ] },
  { v: '0.3.335', date: '2026-11-13', title: 'The puzzle rules', lines: [
    "Nothing in the game changed. The six puzzle rules are settled: puzzles never block the way down, show their state by light, are solved by thinking, reset when you leave, and pay in the game's own coin. The checker that proves a puzzle can be done comes when puzzles are first laid out by the seed.",
    "The first four puzzles, in order: the braziers and a sealed side vault, the dark door, the Fist and a plate, then the gloam tide. Biome 1's boss and found ability are planned after the first two.",
    "Decisions: D-890. D-887 moved to the archive, word for word.",
  ] },
  { v: '0.3.334', date: '2026-11-13', title: 'The puzzle plan', lines: [
    "A long look ahead, nothing in the game changed. Puzzles are planned first, and biome 1 gets finished first: its boss, its found ability, its first puzzles and the lantern's parts.",
    "Every puzzle and pressure idea from the talk is kept, in seven families: light and dark, push and knockback, creatures as pieces, gates you come back to, lore clues, time and pressure, and bigger shapes. Each biome's own puzzle ideas too.",
    "Decisions: D-889. Questions opened: Q-105. D-885 moved to the archive, word for word.",
  ] },
  { v: '0.3.333', date: '2026-11-13', title: 'The Warden\'s Fist', lines: [
    "New: the Warden's Fist, a fist of old stone with a gold band and a violet stone. A beaten warden always leaves it where it fell.",
    "Held, it hits for 2 and knocks the creature a tile straight back. Knocked into a wall, a tree or a rock, it loses 1 more: \"The rat slams into the rock!\" Into another creature, both lose 1.",
    "Its hit sounds of stone, the warden's own knock, with its own line, Fist hit, in Settings. A journey that beat the warden already finds the Fist where the warden first stood.",
    "Decisions: D-888. D-886 moved to the archive, word for word.",
  ] },
  { v: '0.3.332', date: '2026-11-13', title: 'The slam\'s hurt', lines: [
    "The warden's slam hurts more now. Knocked back into a wall, a tree, a rock or a thing set down with tiles still to go, you lose a heart more: \"You slam into the tree!\"",
    "Knocked into a creature, you and it lose a heart each; one beaten so leaves no drop and no experience. Knocked into the peddler, only you are hurt.",
    "Water, a dug-in creature or a pile of bones just stops the slide. Knocked toward an open doorway, you slide right out into the next room.",
    "Decisions: D-887. D-884 moved to the archive, word for word.",
  ] },
  { v: '0.3.331', date: '2026-11-13', title: 'The warden\'s slam', lines: [
    "The warden fights harder. Beside you, it raises its fists for a turn instead of biting: its own new picture, trembling, with the pink mark on your tile. Then it slams: it takes a heart and knocks you 3 tiles straight back in a fast slide. Step out of its way while its fists are up and it hits the floor; then it rests a turn, your chance to strike.",
    "For now a wall, a tree or a creature behind you just stops the slide short. The hurt they do is the next step.",
    "Its fists going up play its heavy stone sound. Its lines: \"The warden raises its fists!\", \"The warden slams you back!\", \"The warden's fists hit the floor.\"",
    "Decisions: D-886. D-883 moved to the archive, word for word.",
  ] },
  { v: '0.3.330', date: '2026-11-13', title: 'The warden\'s slam and its Fist', lines: [
    "Design: the warden gets a wind-up slam that knocks you 3 tiles back, a wall or a creature in the way hurts, and beaten it drops the Warden's Fist, a stone fist that knocks creatures back. Mock-ups only; built in three steps next. Nothing in the game changed yet.",
    "Decisions: D-885. Questions closed: Q-104. D-868 moved to the archive, word for word.",
  ] },
  { v: '0.3.329', date: '2026-11-13', title: 'Two glossary pages split', lines: [
    "Docs: the creatures' glossary words have their own page, GLOSSARY-CREATURES.md, and the finds' second half (stone to the Locket) moved to GLOSSARY-FINDS-2.md, word for word, so both pages have room again. Nothing in the game changed.",
    "Decisions: D-884. D-881 and D-882 moved to the archive, word for word.",
  ] },
  { v: '0.3.328', date: '2026-11-13', title: 'The docs', lines: [
    "The boon card now says a boon lasts until you are back at the waystone, or you fall, as the opening card does.",
    "The docs catch up with the game: the creatures' ways (the mole's burrowing, the scorpion's tail strike, the rat pack), Growth's second row, what each find makes, the deeper waystones, the ponds in every woods room, the Settings card, the marks' rims, the art's lights and the dev tool switches' names.",
    "Decisions: D-883.",
  ] },
  { v: '0.3.327', date: '2026-11-13', title: 'The dev tools', lines: [
    "Fixed (dev tools): on a PC, after clicking the wrench or a dev button, Space waits a turn again instead of pressing that button a second time.",
    "Dev Spawn's Peddler now works: tap a free floor tile and he moves there from wherever he was, ready to trade as he is at home.",
    "Dev Spawn's Torch and Glow Lamp lights can now go on a free floor tile, standing on a torch's stone foot as one set down. They never burn out.",
    "Dev Spawn's pictures that share a name now show their code word after it, such as \"Campfire · ownEmbers\", and the search finds them by it.",
    "Dev Room: TIME now comes second, with +10, +50 and Grow side by side, so Grow is never hidden under the sheet's edge.",
    "Decisions: D-882. D-878 moved to the archive, word for word.",
  ] },
  { v: '0.3.326', date: '2026-11-13', title: 'The art\'s loose ends', lines: [
    "The quick slot's picture and the round map are now enlarged by exactly 2, so every pixel in them is the same size. The quick slot's picture is a little bigger.",
    "The version number on the title screen is now in the game's own pixel font.",
    "Lines that can't be picked, empty profile slots and unlit marks now share one dim grey, a little easier to read. Bright words in the menus, profiles and history now use the same bone white as everywhere else.",
    "A few colours one shade apart now match, and torch handles use the same wood browns as the trees. You won't see a difference.",
    "The art rules now say glows and light may be soft, and list every colour the code uses.",
    "Decisions: D-881.",
  ] },
  { v: '0.3.325', date: '2026-11-13', title: 'Saves kept safe', lines: [
    "Fixed: in a very old save made while the freed Peddler was still waiting in his room, he no longer vanishes when the game updates. He is back at home by the waystone and greets you when you come near.",
    "Fixed: if one profile can't be read, the other profiles are kept instead of all three being wiped. The one that can't be read shows as Empty, and its old data is kept aside, never written over.",
    "A save that can't be read, or one made by a newer version of the game, is now kept aside before anything is saved over it.",
    "Fixed: an error that repeats every moment no longer stops the game from drawing and saving.",
    "Decisions: D-880. D-877 moved to the archive, word for word.",
  ] },
  { v: '0.3.324', date: '2026-11-12', title: 'Falls', lines: [
    "Fixed: a draught drunk on the turn you fall no longer keeps working after you wake. A fall ends every draught, and now that one too.",
    "Fixed: sitting by a fire on the turn you fall no longer leaves you Warmed after you wake.",
    "Fixed: with a workbench or anything else set down on the tile where your journey began, a fall no longer wakes you inside it; you wake on the nearest open tile beside it.",
    "Decisions: D-879. D-876 moved to the archive, word for word.",
  ] },
  { v: '0.3.323', date: '2026-11-12', title: 'The Peddler\'s fixes', lines: [
    "At the Peddler, pressing SELL on an empty slot, or on something he doesn't buy, no longer moves the frame, so a second press can't sell something else by mistake.",
    "When you sell the last of a stack, the frame stays put and the next stack slides in under it, as before.",
    "When the Peddler goes home, he never stands on your tile or on a creature's.",
    "Talking to the freed Peddler never makes him leave sooner: he still waits his 5 turns, or 3 more after a late bump.",
    "Decisions: D-878. Questions closed: Q-102. D-875 moved to the archive, word for word.",
  ] },
  { v: '0.3.322', date: '2026-11-12', title: 'Sounds only when On', lines: [
    "With Sound Off, the game no longer downloads its sounds. They download once you turn Sound On, which saves phone data.",
    "Each place's music downloads the first time you reach that place, not all five tunes at once.",
    "Decisions: D-877. D-874 moved to the archive, word for word.",
  ] },
  { v: '0.3.321', date: '2026-11-12', title: 'Growing back and pools', lines: [
    "After a night's sleep, in your bed or sleeping out, what was due to grow back by morning is there when you wake. Before, nothing grew back at home while you stayed, since daylight lights every tile.",
    "Still pools in the grey-rock caves are now in about 1 room in 2, as decided. Before, many tries cut the room in two and were given up, so only about 1 room in 4 had one.",
    "A pool never wraps round three sides of a floor tile any more, so a herb on one no longer seems to float.",
    "Decisions: D-876. Questions closed: Q-101. D-873 moved to the archive, word for word.",
  ] },
  { v: '0.3.320', date: '2026-11-12', title: 'Goals and endings told', lines: [
    "\"Put out your lantern\" and \"Find the crypt\" no longer pay a reward when they are ticked off quietly, because you had done them before they could show. Every other goal ticked quietly still pays.",
    "Two goals done on the same turn are now both named on one line, \"Goals done: …\", each with its reward; the last one turns gold. Before, only the first was said.",
    "Two effects running out on the same turn, such as poison and stiff, are now both said on one line. Before, only the last one was.",
    "Decisions: D-875. Questions closed: Q-099. D-872 moved to the archive, word for word.",
  ] },
  { v: '0.3.319', date: '2026-11-12', title: 'The owner\'s rulings', lines: [
    "Travelling by waystone no longer counts down poison, stiff or any draught: they keep their turns, so poison can't take a heart as you arrive.",
    "A night's sleep now uses up poison's turns, as it does a draught's. In bed you still wake healed. Sleeping out, you wake with the hearts it took, and if it takes your last one, you fall.",
    "A mole that notices you while it is already beside you never digs down, even if you step away: it chases on foot.",
    "The Warden's Bestiary page shows how to fight it once you have beaten one, since there is only one in a world. Other creatures still need 3.",
    "Taking the Lightkeeper's Locket now wakes its Warden, as a bump does, so you can't slip past it: it chases you for 6 turns. Its Bestiary page says so.",
    "Decisions: D-874. Questions closed: Q-098, Q-100. Questions opened: Q-104. D-871 moved to the archive, word for word.",
  ] },
  { v: '0.3.318', date: '2026-11-12', title: 'The Peddler\'s room', lines: [
    "In the Peddler's room, while he is still ringed in by rubble, you can now set down a Torch or a Glow Lamp. Before, \"There is no room there.\" was said until you dug a heap.",
    "Deposits dug in his room grow back there now, and when his room is one picked for a flask mimic, it holds one, as any other room would.",
    "Decisions: D-873. D-870 moved to the archive, word for word.",
  ] },
  { v: '0.3.317', date: '2026-11-12', title: 'Two clear bugs', lines: [
    "A scorpion near a spit grub now rests its whole turn after a strike, as it does anywhere else.",
    "When an oil tick's drink takes your lantern's oil low, or dry, you now hear and read the warning: \"The flame is getting low.\" or \"The lantern gutters to an ember.\" It shows over the tick's own line.",
    "Decisions: D-872. D-869 moved to the archive, word for word.",
  ] },
  { v: '0.3.316', date: '2026-11-12', title: 'The marks', lines: [
    "A tap just beside one of the small squares under the hearts (the boon's, a draught's, poisoned's and the rest) now tells what it is instead of walking you there; a tap between two finds the nearer one. They look the same.",
    "With many of those squares at once on a phone, they no longer slide under the round map: the rest go on a second row, and the goal line and the creature list move down. On a wide screen they stay in one row.",
    "Decisions: D-871. D-867 moved to the archive, word for word.",
  ] },
  { v: '0.3.315', date: '2026-11-12', title: 'One words page', lines: [
    "Names of things you carry now capitalise every word: Oil Flask, Healing Herb, Healing Potion, Stash Chest, Glow Lamp. The mortar's lines say \"Need 2 Mimic Leaf, 1 Healing Herb.\" and so on.",
    "A mole that comes up away from you says \"The mole bursts up out of the earth!\"; beside you it still bursts up beside you.",
    "Kind Herbs' card says what it does: \"Herbs, potions and fish heal 1 heart more.\"",
    "How to play: the Pick row says \"Hold it to break veins\"; the Keyboard page names I for the bag and M for the map, and Touch and Mouse say the bag and map have their buttons.",
    "A mark's last turn says \"1 turn left.\" instead of \"1 turns left.\"",
    "The Bestiary: the lure wisp drifts toward another creature only if there is one, and the bone rat is \"knocked down\" into its bones, since only scattering them beats it.",
    "Settings' sound for the end of a journey is called \"Journey ends\", no longer \"Run ends\".",
    "Decisions: D-870.",
  ] },
  { v: '0.3.314', date: '2026-11-12', title: 'Three small risks', lines: [
    "A broken boulder or copper vein never grows back beside a waystone, on the tiles kept open round it.",
    "A find that doesn't fit in the bag, with every tile beside it taken, lies on the nearest open tile further out, never on water or a bush.",
    "Dev mode's Spawn no longer puts a thing, a creature or a wall on a person.",
    "Code: an old way of making things from a bag slot, unused since the Make tab, is taken out; its tests now use the Make tab's.",
    "Decisions: D-869. D-865 moved to the archive, word for word. Questions raised: Q-103.",
  ] },
  { v: '0.3.313', date: '2026-11-12', title: 'The fifteenth audit', lines: [
    "The fifteenth audit. Nothing in the game changes. The game's sounds move out of its biggest code file into their own, word for word, and the Version history now loads only when it first opens, so the game starts with 12 files fewer.",
    "Docs: old code notes that no longer matched the game are fixed; done health check findings, finished decisions and the playbook's newest lines moved to the archive or their own files, word for word. Older iPhones and the sound files go on the store checklist, to test on a real one. Three small risks and an unused piece of code come next. The next audit is at 0.3.353.",
    "Decisions: D-868. D-826, D-863 and D-864 moved to the archive, word for word.",
  ] },
  { v: '0.3.312', date: '2026-11-12', title: 'The Look card\'s tabs and keys', lines: [
    "The Look card's tabs are taller, easy to tap on a phone. On phones like a 390 px one the big hero is a little smaller to make room; on the smallest screens the choices show 2 rows and scroll.",
    "With the keyboard, Up from RANDOM or OK now goes to the open tab, so a rolled look is kept; before, it picked each choice on the way.",
    "Decisions: D-867. D-859 moved to the archive, word for word.",
  ] },
  { v: '0.3.311', date: '2026-11-12', title: 'First words over the ask card', lines: [
    "Bumping a campfire or the miners' camp now shows its first words (\"A campfire, burning high.\", \"A miners' camp, long left.\") on the text line under its card, where before the card hid them.",
    "Decisions: D-866. D-858 moved to the archive, word for word.",
  ] },
  { v: '0.3.310', date: '2026-11-12', title: 'Boons at the home stone', lines: [
    "Arriving on the home waystone by travel, or waking there after a fall, now offers the boon card once you stand still, if you hold no boon.",
    "Skip the boon card and step off and back on, and it shows the same three boons until you leave the room; no more drawing again for free.",
    "A boon's words now say it lasts \"until you are back at the waystone\", where it really ends, not \"until you are home\".",
    "Putting a second workbench or other one-of-a-kind piece into a stash chest that holds one now says \"The chest already holds a workbench.\", not \"The chest is full.\" when it isn't.",
    "Decisions: D-865.",
  ] },
  { v: '0.3.309', date: '2026-11-12', title: 'A full bag says so', lines: [
    "Stepping on a find with no room in your bag now always says why: \"Your bag is full.\", or its own line when you carry some of it, like \"You can't carry more wood.\"",
    "A second workbench, chest or other one-of-a-kind piece from your lost bag, a stash chest or a stack you set down now says \"You already carry a workbench.\" (or its own line), not \"Your bag is full.\" when it isn't.",
    "Decisions: D-864.",
  ] },
  { v: '0.3.308', date: '2026-11-12', title: 'Hearts kept', lines: [
    "The gold heart from sleeping in your bed now stays when you take a boon, when a boon ends, when you sit by a campfire and when you wake warm in your fur bedroll. Only a bite or a fall takes it.",
    "The Growth tree's Heart tile counts only the hearts you have grown, never a boon's: no more \"Hearts 12 of 10\".",
    "Decisions: D-863.",
  ] },
  { v: '0.3.307', date: '2026-11-12', title: 'The health check\'s order', lines: [
    "No change in play. The dev tools' four findings became a step. Both health checks' steps now go in one order, 19 steps grouped by what they share, the things most players notice first, and no new content until they are done. Five things seen with no decision to measure against became open questions, each asked at its step.",
    "Decisions: D-862. Questions raised: Q-098 to Q-102.",
  ] },
  { v: '0.3.306', date: '2026-11-12', title: 'The second health check\'s steps', lines: [
    "No change in play. A second health check, of what the first didn't reach: fishing, the Peddler, waystones and boons, campfires, the mortar, the mountain rooms, the deep floors, falls, the look creator, the dev tools, the art, the game's words and old saves, played on a phone and a PC. It found 35 more things, from no boon after travelling home to a campfire's hidden first words. Those players can see are now steps, after the first list's.",
    "Decisions: D-861.",
  ] },
  { v: '0.3.305', date: '2026-11-12', title: 'The health check\'s steps', lines: [
    "No change in play. A full health check of the game: it was played in a browser on the surface, in the caves and at home, and all the code was read against the decisions and docs. It found 31 things, from the bed's gold heart vanishing to out-of-date docs. Nearly all are now a list of small fixes to come, one at a time, the gold heart first.",
    "Decisions: D-860.",
  ] },
  { v: '0.3.304', date: '2026-11-12', title: 'Daylight keeps the whole room', lines: [
    "No change in play. In daylight, the whole room you stand in is still remembered at once, the parts off the screen too, so a room you only stepped into shows in full on the map. That is likely what looked like unseen rooms showing; no room never entered was found on the map.",
    "Decisions: D-859. Questions raised: Q-097. Bugs closed: B-004.",
  ] },
  { v: '0.3.303', date: '2026-11-12', title: 'The mole\'s sight', lines: [
    "A mole now notices you only within 5 steps, by day or night. Before, in daylight, a mole saw you from anywhere in the woods room. Once it is after you it keeps coming from farther, and a bite or a hit still makes it notice. Its Bestiary page says \"within 5 steps\".",
    "Decisions: D-858. Questions raised: Q-096.",
  ] },
  { v: '0.3.302', date: '2026-11-12', title: 'The mole comes up when stuck', lines: [
    "Fixed: a burrowed mole can no longer trap you. A mole under the earth that can't come any closer, blocked by a tree, a rock or another creature, now comes up where it is, with its usual line, and chases on foot from then on, so you can hit it. Before, it could lie stuck under the earth in your way for good.",
    "Decisions: D-857. Bugs fixed: B-003.",
  ] },
  { v: '0.3.301', date: '2026-11-12', title: 'The bed won\'t sleep in a fight', lines: [
    "Fixed: you can no longer sleep a fight away. Bumping your bed at night with a creature after you now says \"Not with a creature after you.\" and takes no turn, as sleeping out under the sky already did. A shy creature nearby, like a bunny, still doesn't stop you.",
    "Decisions: D-856. Bugs fixed: B-002.",
  ] },
];
