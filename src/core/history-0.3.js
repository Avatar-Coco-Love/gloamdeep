// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; 0.3.201 to 0.3.250
// are in history-0.3-4.js (D-826), 0.3.151 to 0.3.200 in history-0.3-3.js (D-782), 0.3.76 to 0.3.150 in
// history-0.3-2.js (D-740) and 0.3.0 to 0.3.75 in history-0.3-1.js (D-699); stage 0.2's are in
// history-0.2.js and its split files.
export const HISTORY_03 = [
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
  { v: '0.3.300', date: '2026-11-12', title: 'The Peddler by the waystone', lines: [
    "Fixed: the Peddler is home by the waystone. Freed, he now waits in the home waystone's room, just below its middle, never on the stone itself. Before, he went to the middle room of the woods, a room away, so he seemed missing.",
    "In a journey saved before this, a Peddler already home moves there once, still knowing you.",
    "Decisions: D-855. Bugs fixed: B-001.",
  ] },
  { v: '0.3.299', date: '2026-11-12', title: 'Your own campfire', lines: [
    "New: your own campfire. A campfire you set down is yours: its card says \"You laid these stones.\" when cold, \"Your fire still glows.\" as embers and \"Your fire burns well.\" blazing. Fires you find keep their own words.",
    "New: your cold ashes' card shows Yes, Take up and No. Take up takes a turn and puts the Campfire back in your bag whole: \"You take up the stones.\" Carrying one already, it says \"You already carry a campfire.\" A burning fire has to burn down first.",
    "Decisions: D-854.",
  ] },
  { v: '0.3.298', date: '2026-11-12', title: 'Your own campfire, settled', lines: [
    "Nothing changes in the game yet. Your own campfire is settled: a fire you built gets its own words (\"You laid these stones.\", \"Your fire still glows.\", \"Your fire burns well.\"), and once cold it can be taken back into the bag. Building it is the next step.",
    "Decisions: D-853.",
  ] },
  { v: '0.3.297', date: '2026-11-12', title: 'A bug list', lines: [
    "Nothing changes in the game. A new bug list keeps track of what you notice in play, so a new conversation finds it: the Peddler missing at home, sleeping ending a fight, a burrowed mole trapping you, and unseen rooms showing on the map by day.",
    "Decisions: D-852.",
  ] },
  { v: '0.3.296', date: '2026-11-12', title: 'Build a campfire', lines: [
    "New: build a campfire. Once you have held Stone and Wood, the bag's Make tab shows the Campfire: 3 Stone and 2 Wood, a turn. You carry one at a time.",
    "Set it down beside you on the surface and it starts as cold ashes, a ring of stones; light it with one turn of your lantern's oil, then sit, warm up and add wood as with any campfire.",
    "In the bag it looks like the cold ashes and says: \"Stones and wood for a campfire.\", \"Set it down on the surface.\", \"Light it with a little oil.\"",
    "Decisions: D-851.",
  ] },
  { v: '0.3.295', date: '2026-11-12', title: 'Building a campfire, settled', lines: [
    "Nothing changes in the game yet. Building a campfire is settled, to come next: made on the bag's Make tab from 3 Stone and 2 Wood, then set down beside you on the surface, where it starts as cold ashes to light with one turn of your lantern's oil.",
    "Fires below ground were talked through and kept for later, maybe as their own step: a fire that never burns out could make a safe base deep down.",
    "Decisions: D-850.",
  ] },
  { v: '0.3.294', date: '2026-11-12', title: 'Add wood', lines: [
    "New: feed a campfire. A burning fire's card now shows Sit and Add wood. Add wood takes 1 Wood and a turn and brings embers back up to blazing, so you can sit by it again for the bigger gift.",
    "Change: the burning fire's card is now called Campfire, with Sit in place of Yes. Add wood is grey with no Wood, or when the fire is already blazing. Cold ashes are still lit with your lantern's oil.",
    "Decisions: D-849.",
  ] },
  { v: '0.3.293', date: '2026-11-12', title: 'Bad marks', lines: [
    "Change: the poisoned and stiff marks now show their time left on the square's edge too, as the draughts do. A full edge is 6 turns for poisoned and 20 for stiff.",
    "Change: bad marks, poisoned and stiff, now sit on a dark red square, so good and bad are easy to tell apart at a glance.",
    "Decisions: D-848.",
  ] },
  { v: '0.3.292', date: '2026-11-12', title: 'A thud and a timer rim', lines: [
    "Change: a tree no longer creaks as it falls. The last chop is followed by one heavy wooden thud half a second later, at its natural pitch.",
    "Change: the marks for Warmed and the draughts no longer show a number. Instead the square's edge lights up in the mark's colour and runs down like a clock from the top middle as the time goes. A full edge means that effect's longest time, so Warmed from embers starts half lit. Tap the mark to hear the exact turns left.",
    "Decisions: D-846, D-847. D-841 moved to the archive, word for word.",
  ] },
  { v: '0.3.291', date: '2026-11-12', title: 'Warmed', lines: [
    "New: Warmed. Sitting by a burning campfire now also warms you: a blazing fire for 60 turns, embers for 30. While you're warm your lantern burns slower, a full tank lasting 70 turns instead of 60, and with Slowburn longer still. A small orange flame under your hearts shows the turns left; tap it to hear them. The turns run even while your lantern is empty or you sleep, and a fall ends it.",
    "Change: Yes on \"Sit by the fire?\" now works at full hearts too, whenever the fire would warm you longer than you already are. It is grey only when sitting would change nothing.",
    "Decisions: D-845. D-840 moved to the archive, word for word.",
  ] },
  { v: '0.3.290', date: '2026-11-12', title: 'Sitting by a campfire', lines: [
    "New: sit by a campfire. Bumping a burning campfire now asks \"Sit by the fire?\". Yes takes a turn: a blazing fire gives 2 hearts back and embers 1, never above full, and stiffness from sleeping out goes away. The fire burns down a level as you sit, blazing to embers and embers to cold ashes, which your lantern's oil can light again.",
    "Notes: Yes is grey when you are at full hearts and not stiff, so a fire isn't used up for nothing.",
    "Decisions: D-844.",
  ] },
  { v: '0.3.289', date: '2026-11-12', title: 'Chopping a fallen branch', lines: [
    "New: fallen branches chop too. The first bump chops like a tree, and the bump that snaps it plays one more chop, then a light wooden knock as it breaks.",
    "New: Settings' Stone breaks line covers a branch snapping too.",
    "Decisions: D-843.",
  ] },
  { v: '0.3.288', date: '2026-11-11', title: 'Chopping a tree', lines: [
    "New: chopping sounds. Each bump on a tree chops like an axe biting into wood, and the last bump fells it: one more chop, a slow low creak, then a heavy crash as it lands.",
    "New: Settings' Digging line covers chopping too, and Stone breaks covers a tree falling.",
    "Decisions: D-842.",
  ] },
  { v: '0.3.287', date: '2026-11-11', title: 'Music in the dungeon', lines: [
    "New: music in the dungeon. On every floor from 8 down, the cold blue halls, a very still, dark tune of long held sounds plays non-stop, looping with no break and carrying on from floor to floor. Going down from the warrens fades the warrens' tune out over 2 seconds, and the dungeon's starts a second later, fading in.",
    "New: Music's list in Settings has a line for it, Dungeon, after Warrens.",
    "Notes: the tune is \"Patreon Challenge 04\" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. Every place below now has its music.",
    "Decisions: D-841.",
  ] },
  { v: '0.3.286', date: '2026-11-11', title: 'Music in the warrens', lines: [
    "New: music in the warrens. On floors 5 to 7, the earth burrows, a dark, slow, low tune plays non-stop, looping with no break and carrying on from floor to floor. Going down from the rock caves fades the caves' tune out over 2 seconds, and the warrens' starts a second later, fading in; going on down to the dungeon fades it out the same way.",
    "New: Music's list in Settings has a line for it, Warrens, after Rock caves.",
    "Notes: the tune is \"Patreon Challenge 11\" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. The dungeon is still quiet, its own step.",
    "Decisions: D-840.",
  ] },
  { v: '0.3.285', date: '2026-11-11', title: 'Music in the crypt', lines: [
    "New: music in the crypt. From the cave mouth on, in the crypt's two top rooms and on floor 1 below them, a quiet, dark, slow tune plays non-stop, looping with no break and carrying on down the crypt's stairs. Walking in from the woods fades the surface's tune out over 2 seconds, and the crypt's starts a second later, fading in; going down to floor 2 swaps it for the caves' tune the same way.",
    "New: Music's list in Settings has a line for it, Crypt, between Surface and Rock caves.",
    "Notes: the tune is \"Ludum Dare 30 05\" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. The warrens and the dungeon are still quiet, one step each.",
    "Decisions: D-839.",
  ] },
  { v: '0.3.284', date: '2026-11-11', title: 'Music in the rock caves', lines: [
    "New: music in the rock caves. On floors 2 to 4 a calm, dark, slow tune plays non-stop under the drips, looping with no break and carrying on from floor to floor. Going down from the surface fades the surface's tune out over 2 seconds, and the caves' starts a second later, fading in; going back up swaps them the same way.",
    "New: Music's list in Settings has a second line, Rock caves, to turn that tune On or Off.",
    "Notes: the tune is \"The Vile Grove\" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. Other places below are still quiet, one step each.",
    "Decisions: D-838.",
  ] },
  { v: '0.3.283', date: '2026-11-11', title: 'Music on the surface', lines: [
    "New: music. On the surface, by day and by night and at home too, a calm, slow tune plays non-stop, looping with no break. Going down the stairs fades it out over 2 seconds; coming back up starts it again a second later, fading in. Nothing plays on the title or below ground, for now.",
    "New: Settings' Sound tab has a fifth kind, Music, starting at 50%; its list has one line, Surface, to turn the tune On or Off.",
    "Notes: the tune is \"Ludum Dare 30 06\" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. Music for the places below comes next, one step each.",
    "Decisions: D-837.",
  ] },
  { v: '0.3.282', date: '2026-11-11', title: 'A cave\'s drips', lines: [
    "New: the rock caves (floors 2 to 4) drip. While you play there, a drop of water falls somewhere around you every 8 to 16 seconds, a little left or right, echoing off the walls like your steps. Leaving the caves, or opening a card or menu, stops them.",
    "New: Settings' Places line, under Finds, turns the drips On or Off with the rest of the places' sounds.",
    "Notes: more sounds all around come next (wind, birds, crickets), then music.",
    "Decisions: D-836.",
  ] },
  { v: '0.3.281', date: '2026-11-11', title: 'The heartbeat at the last heart', lines: [
    "New: as a bite, a glob or poison leaves you on your last heart, your heart beats: a soft lub-dub, twice, the second fainter, a moment after the blow or the poison's throb. It plays once, and again only after a heart has come back and gone again. A fall, which wakes you at full hearts, doesn't play it.",
    "New: Settings' Fighting list gains Last heart.",
    "Notes: sounds all around come next, drips in caves first, then music.",
    "Decisions: D-835.",
  ] },
  { v: '0.3.280', date: '2026-11-11', title: 'The oil\'s warning', lines: [
    "New: as the oil falls under 20% and \"The flame is getting low.\" is said, the lantern sputters twice, the second softer and lower: a short piece of the crackle it makes when the oil runs out. Like the line, it plays once, and again only after the oil has gone back above 20%, so with a flask in the bag it plays only when none is left.",
    "New: Settings' Steps list gains Oil runs low.",
    "Notes: the other \"Maybe\" sounds come next, one step each: a heartbeat at the last heart, sounds all around, music. Weather comes after them: rain, fog, what they do to you, and creatures that come with them.",
    "Decisions: D-834.",
  ] },
  { v: '0.3.279', date: '2026-11-11', title: 'The rest of the sounds', lines: [
    "New: every sound the game needs now plays. The gloamling bites with a low breath and a snap, a lampmoth with a papery flutter, a warden with grinding stone.",
    "New: the creatures' own sounds: a rat pack's squeaks, a mimic's jolt as it wakes, a warden's stone shifting, a scorpion's tail rattling up, a mole's earth as it digs and comes up, a bone rat's bones falling and standing, a glob spat and its splat.",
    "New: a fall slides and thuds, and you wake with a breath; a new floor rumbles far off, a new room rings a small note; a waystone's bells, its hum as you travel, a boon's chime, the line's plop, a fish's splash, a long breath as you sleep.",
    "New: a herb or heartcap crunches, a potion gulps; a person leaving or arriving shimmers; making something clinks with tools; \"You can't carry more\" tocks; the run's end falls slowly.",
    "New: Settings' lists gain Falling and New rooms (Steps), Creatures (Fighting), Eating, Making and Places (Finds) and Run ends (Menus).",
    "Decisions: D-833. Claude's picks, by the owner's go-ahead; ask for any swap.",
  ] },
  { v: '0.3.278', date: '2026-11-11', title: 'The creatures\' bites\' sounds', lines: [
    "New: the creatures' bites have sounds, one for each kind: a rat's quick double nip, a flask mimic's clink and snap, a scorpion's clicks and stab, a cave spider's hiss, a bat's chirps and flap.",
    "New: a mole sniffs and scrapes, a snapcap squelches and snaps, a herb mimic rustles, a bone rat's bones clatter, and an oil tick slurps and gulps your oil.",
    "New: on Settings' Sound tab, Fighting's list has one more line, Bites, On or Off for them all.",
    "Decisions: D-832.",
  ] },
  { v: '0.3.277', date: '2026-11-11', title: 'The fight\'s rest\'s sounds', lines: [
    "New: the rest of the fight has sounds. A stiff swing that misses puffs through the air, and a bite or a glob that takes a heart lands as a dull blow.",
    "New: poison taking a heart throbs twice, deep and slow, and reaching a level rings three glass notes rising, just after the creature falls.",
    "New: on Settings' Sound tab, Fighting's list has four more lines, each On or Off: Stiff miss, Hurt, Poison and Level.",
    "Decisions: D-831.",
  ] },
  { v: '0.3.276', date: '2026-11-11', title: 'The lantern and the light\'s sounds', lines: [
    "New: the lantern and the light have sounds, the first from the elemental pack. A flask poured, by hand or by itself, glugs; as the oil runs out, a crackle slows and fades.",
    "New: lighting a torch whooshes, and lighting cold ashes into a campfire sounds of a fire catching and burning.",
    "New: on Settings' Sound tab, Steps' list has four more lines, each On or Off: Flask poured, Oil runs out, Torch lit and Campfire lit.",
    "Decisions: D-830.",
  ] },
  { v: '0.3.275', date: '2026-11-11', title: 'The elemental pack', lines: [
    "Sounds on hand: MorphonautAudio's Elemental Forces, 134 sounds of fire, water, earth and wind, bought by the owner, kept whole for the next sound steps to pick from. Nothing in the game changes yet.",
    "Decisions: D-829.",
  ] },
  { v: '0.3.274', date: '2026-11-11', title: 'Home\'s sounds', lines: [
    "New: home's sounds. Selling to the peddler jingles with coins, in place of the tick; a relic set on the shelf sounds like a book set down on wood.",
    "New: planting a seed sounds like two soft steps on earth, and feeding Bat Guano to a sprout like a dulled pat of cloth.",
    "New: on Settings' Sound tab, Finds' list has four more lines, each On or Off: Coins, Shelf, Planting and Feeding.",
    "Decisions: D-828.",
  ] },
  { v: '0.3.273', date: '2026-11-11', title: 'The audit\'s bug fixes', lines: [
    "Fixed: with a Healing herb chosen in the bag, once a mortar draught that uses it is known, the bag no longer stops drawing; the card shows EAT and, beside it, the draught it makes at the mortar.",
    "Fixed: MAKE with a full bag now says \"Your bag is full.\", not that you already carry what it makes (the Mortar and Pestle, a workbench).",
    "Fixed: a shy bunny near you at dusk no longer stops you sleeping out; only a creature that bites, or one chasing you, does.",
    "Fixed: holding a tool, the rod or a pick, no longer plays the knife being drawn.",
    "Fixed: the Tab key on Settings' tabs ticks, as a tap on a tab does.",
    "Docs: the Mortar and Pestle's notes now say it lists six draughts, each once all its parts have been held.",
    "Decisions: D-827.",
  ] },
  { v: '0.3.272', date: '2026-11-11', title: 'The fourteenth audit', lines: [
    "The fourteenth audit. Nothing in the game changes. The Version history's newest file is split again, word for word: 0.3.201 to 0.3.250 move to history-0.3-4.js.",
    "Docs: finished decisions and the playbook's newest lines moved to the archive or their own files, word for word; the finds' and sounds' lists, near their cap, split in two; the waiting list's later questions on one line, so a conversation starts by reading less. A bug hunt's findings come next. The next audit is at 0.3.312.",
    "Decisions: D-826. D-782, D-783 and D-822 to D-825 moved to the archive, word for word.",
  ] },
  { v: '0.3.271', date: '2026-11-11', title: 'Digging and chests\' sounds', lines: [
    "New: digging sounds. Each bump on a deposit, a copper vein or rubble clinks like a pick on stone, with the cave's echo, and the last bump crumbles: a deeper clink, then small stones tumbling.",
    "New: a stash chest creaks as it opens, before its page turns, and closes with a wooden knock just after its page.",
    "New: on Settings' Sound tab, Finds' list has three more lines, each On or Off: Digging, Stone breaks and Chest.",
    "Decisions: D-825. D-821 moved to the archive, word for word.",
  ] },
  { v: '0.3.270', date: '2026-11-11', title: 'Each sound On or Off', lines: [
    "New: on Settings' Sound tab, each kind's line (Steps, Fighting, Finds, Menus) shows > after its loudness, and a tap or Enter opens its list: the kind's loudness first, then each of its sounds On or Off. Steps: Grass, Stone, Earth and Lantern; Fighting: Lantern hit, Knife hit and Beaten; Finds: Into the bag, Weapon drawn and Tile set down; Menus: Tick, Page turn and Can't. Only the sounds the game plays so far are listed; each new one joins its list. A sound turned On plays itself so you hear it. The list's title, SOUND · STEPS, sits where the tabs were; the close button, Esc or a tap on the title goes back to the Sound tab. Left and Right on the Sound tab still change a kind's loudness.",
    "Decisions: D-824. D-820 moved to the archive, word for word.",
  ] },
  { v: '0.3.269', date: '2026-11-11', title: 'The four kinds\' loudness', lines: [
    "New: under Loudness on Settings' Sound tab, a loudness for each of four kinds: Steps (the lantern's click too), Fighting (the creatures too), Finds (the bag, waystones and fishing too) and Menus. Each starts at 100% and moves in steps of 10% as Loudness does. A kind plays at Loudness times its own share, so Loudness 50% and Steps 50% makes the steps play at 25%. Changing one plays its own sound at the new loudness: a step, a hit, a pat into the bag or the menu's tick.",
    "Decisions: D-823. D-819 moved to the archive, word for word.",
  ] },
  { v: '0.3.268', date: '2026-11-11', title: 'Loudness', lines: [
    "New: Loudness, on Settings' Sound tab under Sound, turns every sound up or down together, from 0% to 100% in steps of 10%. It starts at 100%, as loud as before. Tap it to go up a step (from 100% it goes round to 0%), or press Left and Right; the menu's tick plays at the new loudness so you hear it. Sound On or Off stays as the quick switch, and turning it back on keeps your loudness.",
    "Decisions: D-822. D-818 moved to the archive, word for word.",
  ] },
  { v: '0.3.267', date: '2026-11-11', title: 'Settings in tabs', lines: [
    "Changed: Settings is in four tabs, CONTROLS, GAME, SCREEN and SOUND, at the top of its card where SETTINGS was, with the same lines as before: Controls holds Swipe, Tap, Arrow pad and Stop walking; Game the seed, the way to play (on a journey), Lantern and Flasks; Screen Motion, Attack marks and Stats line; Sound the Sound switch. Tap a tab, or press Tab for the next. Settings opens on the tab you last had open. On a narrow phone held upright, the tabs take two rows. VERSION HISTORY stays in the corner on every tab.",
    "Decisions: D-821. D-817 moved to the archive, word for word.",
  ] },
  { v: '0.3.266', date: '2026-11-11', title: 'The bag\'s sounds', lines: [
    "New: the bag has sounds, with Sound on. An item going into the bag makes a soft pat of cloth, never the same twice running; a weapon going from the bag into the hand is drawn like a knife; setting the workbench down knocks on wood. A fish caught keeps just its splash.",
    "Decisions: D-820. D-816 moved to the archive, word for word. Questions: Q-095 narrowed. The creatures' sounds moved to docs/SOUNDS-2.md, word for word.",
  ] },
  { v: '0.3.265', date: '2026-11-11', title: 'Menu sounds', lines: [
    "New: the menus have sounds, with Sound on. Tapping a button on a card, or picking a line with Enter or Space, makes a soft tick when it changes something. A card opening turns a page, and closing it turns one back; a tap that opens or closes a card only turns the page. Picking something dim that can't be done makes a low wooden tock: the bag's Make or a recipe with too few parts, a dim line on the garden bed or campfire, a waystone not woken, and a Growth upgrade with too few embers.",
    "Decisions: D-819. D-815 moved to the archive, word for word. Questions: Q-095 narrowed.",
  ] },
  { v: '0.3.264', date: '2026-11-11', title: 'Thrift', lines: [
    "New: Thrift, the Growth tree's second-row upgrade on Hands, 1 ember, bought once, its tile a small pale log with an arrow curling back to it. With it, about 1 time in 4 that you make something, by the journey's dice, you keep 1 of the part its recipe uses most of, and the game says \"You keep 1 Stone.\" in place of the make line. You still need the whole cost to make it. It works for everything made: in the bag, at the workbench and the mortar, and the Pouch and Big Bag. Growth's second row is now full.",
    "Decisions: D-818.",
  ] },
  { v: '0.3.263', date: '2026-11-11', title: 'Guard', lines: [
    "New: Guard, the Growth tree's second-row upgrade on Body, 1 ember, bought once, its tile a small pale round shield. With it, about 1 bite in 6 glances off and hurts nothing, by the journey's dice, and the game says \"The bite glances off you.\" With the Rat Hide Vest worn, each rolls its own dice, so about 3 bites in 8 glance off, and a bite the vest turns keeps its own line. An oil drink, a glob and a sting are not turned.",
    "Decisions: D-817.",
  ] },
  { v: '0.3.262', date: '2026-11-11', title: 'Quick Pour', lines: [
    "New: Quick Pour, the first upgrade in the Growth tree's second row, on Light, 1 ember, bought once, its tile a tipped flask with a drop falling. With it, pouring a flask from the bag takes no turn: no oil burns, no creature moves, and the game says \"You pour a flask.\" A Pond Minnow's oil still takes a turn.",
    "The first time the second row opens, walking down past depth 8 or by a dev jump, the game says \"Growth has a new row.\"",
    "Decisions: D-816.",
  ] },
  { v: '0.3.261', date: '2026-11-11', title: 'Row 2 opens', lines: [
    "The Growth tree's second row opens the first time you go deeper than depth 8. Until then, picking one of its locked tiles says \"Reach depth 9 to open.\" Once open, each branch has a dashed tile to come, and the row above shows locked. A journey already past depth 8 finds it open.",
    "Decisions: D-815.",
  ] },
  { v: '0.3.260', date: '2026-11-10', title: 'Growth\'s second row, planned', lines: [
    "Planned: the Growth tree's second row. It will open the first time you go deeper than depth 8, and hold Quick Pour on Light (pouring a flask takes no turn), Guard on Body (about 1 bite in 6 glances off) and Thrift on Hands (making something keeps its cheapest part about 1 time in 4), each 1 ember. Nothing in the game changed yet.",
    "Decisions: D-814.",
  ] },
  { v: '0.3.259', date: '2026-11-10', title: 'Quick Hands', lines: [
    "New: Quick Hands, the first upgrade on the Growth tree's Hands limb, 1 ember, bought once, its tile a pale open hand. With it, gathering by hand takes 1 bump fewer: a tree falls in 3 bumps, a stone deposit in 2 and a fallen branch in 1. A berry bush still takes 1, and the picks keep their own counts for copper veins and rubble.",
    "Decisions: D-813.",
  ] },
  { v: '0.3.258', date: '2026-11-10', title: 'The Growth tree\'s twigs', lines: [
    "New look: the Growth tree's rows are twigs. Each row is a twig across Light, Body and Hands, its number at the left, and each upgrade a small picture tile on it, side by side: Tough now sits beside the heart, not above it. A bought tile glows, the heart shows how many you bought in its corner, and its name and words are on the right when picked, as before. The arrow keys read a row: Left and Right walk its tiles across the limbs, Up and Down change row. When there are more rows than fit, the tree scrolls by a swipe or the wheel.",
    "Decisions: D-812.",
  ] },
  { v: '0.3.257', date: '2026-11-10', title: 'The Growth tree, ready to grow', lines: [
    "Behind the scenes: the Growth tree is getting ready to grow. Its upgrades are now one list, each with its cost, how many times it can be bought and its look, and your save keeps one record of what you bought. Nothing you see changes: your hearts, Tough and Steady Wick stay yours. Next, the tree's new look, its rows as twigs with small picture tiles side by side; then the Hands upgrade.",
    "Decisions: D-811.",
  ] },
  { v: '0.3.256', date: '2026-11-10', title: 'The Mole Claw Pick', lines: [
    "New: the Mole Claw Pick, the Mole Claw's first use. The workbench's BUILD tab makes it from 1 Mole Claw, 2 Wood and 2 Stone: the Stone Pick's handle with a mole's pale claw as its head. Hold it in the Tool slot and it does all the Stone Pick does, faster: a copper vein breaks in 2 bumps, not 4, and rubble clears in 2, not 3. Your Stone Pick stays yours; swap them in the Tool slot as you would the rod.",
    "Mole Claw now says \"A mole claw, for a mole claw pick.\"",
    "Decisions: D-810.",
  ] },
  { v: '0.3.255', date: '2026-11-10', title: 'The Fang Charm', lines: [
    "New: the Fang Charm, the Bat Fang's first use. The workbench's GEAR tab makes it from 1 Bat Fang and 1 Copper Ore: a pale bat fang set in copper. Wear it, and each creature you beat gives you back 1 heart about 1 time in 4, never past your most. When it does, \"The fang drinks. You feel better.\" shows and a small red heart rises beside the \"+1\" over you. A pile of bones scattered counts as beaten too.",
    "Bat Fang now says \"A bat fang, for a fang charm.\"",
    "Decisions: D-809.",
  ] },
  { v: '0.3.254', date: '2026-11-10', title: 'The Glow Lamp', lines: [
    "New: the Glow Lamp, the Glow Gland's first use. Once you have held a Glow Gland and Wood, your bag's Make tab makes it from 1 Glow Gland and 1 Wood, as a torch is made. Set it down anywhere, as a torch: the gland sits in a small copper cup on the torch's stick and lights 3 tiles in a soft, steady green, for 300 turns, three times a torch. Then it goes dark, leaving bare floor. Lampmoths and bats fly to it as to any light.",
    "Glow Gland now says \"A glow gland. With wood, a glow lamp.\"",
    "Decisions: D-808.",
  ] },
  { v: '0.3.253', date: '2026-11-10', title: 'The Bone Hook', lines: [
    "New: the Bone Hook, the Rat Bone's first use. The workbench's BUILD tab makes it from 3 Rat Bone and 1 Spider Silk. In your bag, FIT ties it to your rod for good, so you need the rod with you; after that the rod shows a small pale bone hook under its float. With it, the amber zone on the strike meter is half again as wide, so fish are easier to land: 3/8 of the bar for a pond minnow, 3/10 for a blind cavefish. Waiting for a bite is the same.",
    "Rat Bone now says \"A rat bone, for a bone hook.\"",
    "Decisions: D-807.",
  ] },
  { v: '0.3.252', date: '2026-11-10', title: 'The Shade Draught', lines: [
    "New: the Shade Draught, a dusky violet bottle, the Lurker Claw's first use. Once you have held Lurker Claw and Duskstar, the mortar makes it from 2 Lurker Claw and 1 Duskstar. Drink it from your bag and for 60 turns creatures notice you only when you come within 2 steps, so you can slip past them in the light, and even the rim lurker waits until 2. One already after you keeps coming, lampmoths still fly to your lantern and spit grubs still spit. A violet bottle under your hearts shows the turns left; tap it to hear them. Drinking another sets it back to 60. The turns run even while you sleep, and a fall ends it.",
    "Lurker Claw now says \"Two make a Shade.\"",
    "Decisions: D-806.",
  ] },
  { v: '0.3.251', date: '2026-11-10', title: 'The Echo Charm', lines: [
    "New: the Echo Charm, the Bat Wing's first use. The workbench's GEAR tab makes it from 3 Bat Wing and 1 Copper Ore. Wear it, and each creature within 4 tiles that no light reaches shows as a pale outline of its shape, even behind a wall. A creature in disguise stays hidden.",
    "Bat Wing now says \"for an echo charm.\"",
    "Decisions: D-805.",
  ] },
];
