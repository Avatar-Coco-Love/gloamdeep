// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; 0.3.201 to 0.3.250
// are in history-0.3-4.js (D-826), 0.3.151 to 0.3.200 in history-0.3-3.js (D-782), 0.3.76 to 0.3.150 in
// history-0.3-2.js (D-740) and 0.3.0 to 0.3.75 in history-0.3-1.js (D-699); stage 0.2's are in
// history-0.2.js and its split files.
export const HISTORY_03 = [
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
