// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; 0.3.201 to 0.3.250
// are in history-0.3-4.js (D-826), 0.3.151 to 0.3.200 in history-0.3-3.js (D-782), 0.3.76 to 0.3.150 in
// history-0.3-2.js (D-740) and 0.3.0 to 0.3.75 in history-0.3-1.js (D-699); stage 0.2's are in
// history-0.2.js and its split files.
export const HISTORY_03 = [
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
