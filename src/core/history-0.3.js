// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; 0.3.0 to 0.3.75
// are in history-0.3-1.js (D-699); stage 0.2's are in history-0.2.js and its split files.
export const HISTORY_03 = [
  { v: '0.3.166', date: '2026-11-08', title: 'The sixth teaching goal', lines: [
    "The sixth teaching goal: at level 2, \"Spend your ember\" and \"Tap here, then Growth.\" show under the hearts panel, ahead of any other goal waiting. Buy a heart or Tough in the Journal's Growth tab and the goal turns gold with its reward once you close the Journal.",
    "If you have already spent an ember on this journey, the goal is ticked quietly and pays its reward.",
    "Fixed: 0.3.165 stopped the game from starting (a stray bracket); a new test now checks every code file for such typos.",
    "Decisions: D-713.",
  ] },
  { v: '0.3.165', date: '2026-11-08', title: 'The boons card', lines: [
    "The boons card: the first time you pick a boon, a glass card says what boons are, with Go to carry on. It shows only once.",
    "In the Journal's Quests tab, tap the done \"Take a boon\" (or press Enter there) to read the card again; Go goes back to the Journal.",
    "Decisions: D-712.",
  ] },
  { v: '0.3.164', date: '2026-11-08', title: 'The fifth teaching goal', lines: [
    "The fifth teaching goal: step off the woken waystone's plate without ever having held a boon, and \"Take a boon\" and \"Step back on the plate. Pick 1 of 3.\" show under the hearts panel. Pick a boon and the goal turns gold with its reward; closing the card with its cross leaves the goal waiting.",
    "If you have held a boon since this version, or hold one now, the goal is ticked quietly and pays its reward.",
    "Decisions: D-711.",
  ] },
  { v: '0.3.163', date: '2026-11-08', title: 'The fourth teaching goal', lines: [
    "The fourth teaching goal: once the waystone is found, \"Wake the waystone\" and \"Step on the plate in its middle.\" show under the hearts panel. Step on the plate to wake it and the goal turns gold with its reward.",
    "If you have already woken the waystone's plate, the goal is ticked quietly and pays its reward.",
    "Decisions: D-710.",
  ] },
  { v: '0.3.162', date: '2026-11-08', title: 'The third teaching goal', lines: [
    "The third teaching goal: on reaching the woods, \"Find the waystone\" and \"Old standing stones, near home.\" show under the hearts panel. Walk within 4 tiles of the stone and it turns gold with its reward.",
    "If you have already woken the waystone's plate, the goal is ticked quietly and pays its reward.",
    "Decisions: D-709.",
  ] },
  { v: '0.3.161', date: '2026-11-08', title: 'The second teaching goal', lines: [
    "The second teaching goal: once \"Beat a rat\" is done, \"Go home to the woods\" shows under the hearts panel. Deeper down it says \"Take the stairs up to the crypt.\", in the crypt \"Leave by the gap in the crypt wall.\" Reach the woods and it turns gold with its reward, rolled as the rat's is.",
    "If you have already been to the woods this journey, the goal is ticked quietly and pays its reward.",
    "Decisions: D-708.",
  ] },
  { v: '0.3.160', date: '2026-11-08', title: 'The first teaching goal', lines: [
    "The first teaching goal: once you see a rat, \"Beat a rat\" and \"Walk into it to strike.\" show under the hearts panel. Beat one and the line turns gold for 3 turns with what it paid, rolled from an oil flask, 2 healing herbs, 3 oilcaps, a Glint or a healing potion. A find that doesn't fit your bag is set at your feet.",
    "The Journal has a fifth tab, Quests, listing each goal, the done ones with their reward. Tapping the goal line opens it. A rat beaten before this version ticks the goal quietly and pays its reward.",
    "Decisions: D-707.",
  ] },
  { v: '0.3.159', date: '2026-11-08', title: 'Teaching goals worded', lines: [
    "Nothing in the game changed. The first six teaching goals now have their words, each a goal and one line saying how, such as \"Beat a rat\" and \"Walk into it to strike.\" Each appears at its own moment: going home once a rat is beaten, spending your ember as soon as you reach level 2.",
    "The goal will sit under the hearts panel and open the Journal when tapped. Done, it turns gold and says what it paid, rolled from an oil flask, herbs, oilcaps, a Glint or a potion. The first boon you pick will open a card saying what boons are.",
    "Decisions: D-706. Questions closed: Q-087.",
  ] },
  { v: '0.3.158', date: '2026-11-08', title: 'Teaching goals planned', lines: [
    "Nothing in the game changed. A teaching map lists every system, where you first meet it and what tells you how it works. Five are never explained: fighting, embers and Growth, going home to the woods, the waystone, and the Journal.",
    "Teaching goals are planned for those five, one at a time, each appearing when it helps, such as \"beat a rat\" once you see one. They will live in a Quests tab in the Journal, and each pays a reward rolled from a short list.",
    "Decisions: D-705. Questions opened: Q-087.",
  ] },
  { v: '0.3.157', date: '2026-11-08', title: 'More hats and hoods', lines: [
    "More hats and hoods: Horned (the hood with two curled horns, always bone white), Pointed (a tall pointed hat), Bobble (a knitted cap), Circlet (a thin band across the brow) and Scarf (a cloth tied round the head) join the HEAD tab, 3 Glints each.",
    "Brim, Ears and the Hood are now free from the start. Brim is all in your TRIM's colours now, not just its band. If you bought Brim or Ears, their Glints come back to you.",
    "Decisions: D-704.",
  ] },
  { v: '0.3.156', date: '2026-11-08', title: 'Hats and hoods', lines: [
    "Hats and hoods: the Look card has a sixth tab, HEAD. Three join the hood: Brim, a wanderer's wide hat; Ears, the hood with two pointed ears; and Helm, a round metal cap with a nose guard.",
    "Each costs 3 Glints, bought with BUY as a cloak pattern is. Brim and Ears take your CLOAK's colours, and Helm and Brim's band your TRIM's. The face, eyes, clothes and lamp stay as they are.",
    "The six tabs sit in one row where they fit, and in two rows of three on narrow screens.",
    "Decisions: D-703.",
  ] },
  { v: '0.3.155', date: '2026-11-08', title: 'Lantern looks', lines: [
    "Lantern looks: the Look card has a fifth tab, LAMP, for the lantern's shape. Three shapes join the lantern: Carriage, with a wide roof and foot; Dish, a bare flame on a dish; and Pierced, dark tin with light through its holes.",
    "Each new shape costs 3 Glints, bought with BUY as a cloak pattern is, and takes your TRIM's colours. The flame and its light stay the same, and so does the lantern button.",
    "Where the card is narrow, the five tabs sit in two rows. On the smallest screens, three rows of choices show at once and the rest scroll.",
    "Decisions: D-702.",
  ] },
  { v: '0.3.154', date: '2026-11-08', title: 'The Look card scrolls', lines: [
    "The Look card's choices can now scroll, ready for many more cloaks, eye colours, lantern looks and clothes. Up to four rows show at once; when a tab has more, a swipe up or down, or the mouse wheel, moves them a row, and the arrow keys bring the next row into view.",
    "A thin bar at the right of the boxes, with a gold part, shows where you are in a long tab. Today every tab still fits in four rows, so nothing looks different yet.",
    "Decisions: D-701.",
  ] },
  { v: '0.3.153', date: '2026-11-08', title: 'Three more cloak patterns', lines: [
    "Three more cloak patterns on the Look card: Tiger (rust with dark stripes), Stars (night indigo with specks) and Moth (sand with two eyespots), 3 Glints each. The six patterns now cost 18 Glints, what the three Feats pay.",
    "They are the Cloak tab's fourth row, so the Look card is a row taller on every tab. On the smallest upright screen the little boxes drop their names to fit; the name still shows under the big hero.",
    "Trying on a pattern, its price now shows in the line under the big hero (\"Tiger: 3 Glints. You have 4.\"), so it no longer covers the boxes.",
    "Decisions: D-700.",
  ] },
  { v: '0.3.152', date: '2026-11-08', title: 'The eleventh audit', lines: [
    "The eleventh audit. Nothing in the game changes. The Version history's newest file is split in two, word for word: 0.3.0 to 0.3.75 move to history-0.3-1.js.",
    "Docs: finished decisions moved to the archive; parts of OPEN-QUESTIONS.md, TECH.md and PROGRESS.md moved word for word to OPEN-QUESTIONS-2.md, TECH-2.md and RESEARCH-2.md, so a conversation starts by reading less. A bug hunt's findings are listed for the owner. The next audit is at 0.3.192.",
    "Decisions: D-699. D-660 and D-689 to D-694 moved to the archive, word for word.",
  ] },
  { v: '0.3.151', date: '2026-11-08', title: 'Flasks, the third Feat', lines: [
    "A third Feat, Flasks: pour 5, 25 and 100 flasks for 1, 2 and 3 Glints. Its row on the Feats tab shows \"2 of 5\" and its 3 marks; Records still says Flasks poured.",
    "Reaching a tier says so: \"Feat reached: Flasks 5. +1 Glint.\" Flasks poured before count too.",
    "All three Feats now pay 18 Glints. New looks to spend them on come in later steps.",
    "Decisions: D-698. D-688 moved to the archive, word for word.",
  ] },
  { v: '0.3.150', date: '2026-11-08', title: 'Deepest, the second Feat', lines: [
    "A second Feat, Deepest: reach depth 5, 10 and 20 for 1, 2 and 3 Glints. Its row on the Feats tab shows \"3 of 5\" and its 3 marks.",
    "Reaching a tier says so: \"Feat reached: Deepest 5. +1 Glint.\" Depths walked to before count too.",
    "Decisions: D-697. D-659 moved to the archive, word for word.",
  ] },
  { v: '0.3.149', date: '2026-11-08', title: 'Buying a pattern', lines: [
    "Cloak patterns can be bought. On the Look card, tap Zebra, Cow or Camo to try it on, and RANDOM becomes BUY 3. Press it to spend 3 Glints: the pattern is yours, worn at once.",
    "The note under the patterns says the price and your Glints: \"Zebra costs 3 Glints. You have 4.\" With too few it adds \"Earn more from Feats.\", and BUY is dim and does nothing.",
    "A bought pattern is that hero's for good. It loses its LOCK, and RANDOM can roll it.",
    "The Feats tab's gold number is now the Glints you have left to spend.",
    "Decisions: D-696. D-687 moved to the archive, word for word.",
  ] },
  { v: '0.3.148', date: '2026-11-08', title: 'Feats and Glints', lines: [
    "The Journal has a fourth tab, Feats, after the Bestiary. A Feat is one record's set of 3 tiers, and each tier you reach pays Glints, the money for looks.",
    "The first Feat is Beaten: 10, 50 and 200 creatures, paying 1, 2 and 3 Glints. The tab shows your Glints in gold at the top, then Beaten with your count toward the next tier, such as 12 of 50, and 3 small marks that turn gold as you reach them.",
    "Creatures beaten before now count too. Reaching a tier says so: \"Feat reached: Beaten 10. +1 Glint.\"",
    "On an upright phone the Journal's tabs sit in two rows, Records and Growth over Bestiary and Feats. Right from the Bestiary turns to Feats.",
    "Buying a cloak pattern with Glints, 3 each, comes at the next step.",
    "Decisions: D-695. D-686 moved to the archive, word for word.",
  ] },
  { v: '0.3.147', date: '2026-11-08', title: 'The locket keeps a stack', lines: [
    "The Lightkeeper's Locket works on the shelf. In Normal, with the locket on a shelf, a fall brings home one stack from your bag: the one the peddler would pay most for in all, his price times how many. 3 Venom Sacs beat 1 Mimic Heart.",
    "A tie goes to the stack first in your bag. With nothing in the bag he buys, nothing is kept. The rest stays in the bag where you fell, as before.",
    "You wake with it in your bag, and the line says so: \"The locket kept Venom Sac ×3.\"",
    "Decisions: D-694. D-685 moved to the archive, word for word.",
  ] },
  { v: '0.3.146', date: '2026-11-08', title: 'The locket on the shelf', lines: [
    "The Lightkeeper's Locket can go on the shelf. Bump the shelf with the locket in your bag and it asks \"Set the locket on the shelf?\" Yes sets it there in a turn: \"You set the locket on the shelf.\" It stays there for good.",
    "The shelf shows it: the locket small and open on its top shelf, in the relics' violet glow, with a glint now and then. At night the glow shows from across the surface.",
    "Bumped then, the shelf asks \"Deconstruct shelf?\" with \"The locket rests here.\" Yes puts the shelf and the locket back in your bag together; with no room for both, your bag is full and both stay.",
    "What the locket does there, on a fall, comes at the next step.",
    "Decisions: D-693. D-683 and D-684 moved to the archive, word for word.",
  ] },
  { v: '0.3.145', date: '2026-11-08', title: 'The locket\'s glow', lines: [
    "The Lightkeeper's Locket has its new look: open on its hinge, a gold case with a violet hollow and a tiny flame burning inside. The flame scratched on its lid is violet now.",
    "Relics have their own glow: a violet halo that slowly swells and fades, seen even in the dark, though it lights nothing. Now and then a glint slides along the locket's edge. With reduced motion the glow holds steady and there is no glint.",
    "Decisions: D-692.",
  ] },
  { v: '0.3.144', date: '2026-11-08', title: 'The warden', lines: [
    "A new creature guards the Lightkeeper's Locket in place of the rat: the warden, an old stone guard made by Underhearth's people to guard their things. Cracked and mossy, with a chipped gold band and an eye slit.",
    "It stands asleep as a statue, its eye dull, until you bump it. Then its eye lights violet and it chases you for 6 turns, and stands still again. It has 4 health and bites for 1 heart: four lantern swings or two knife blows.",
    "It is seen as it is, never in disguise, so the Bestiary meets it on sight. It turns up only beside the locket.",
    "Decisions: D-692. D-681 and D-682 moved to the archive, word for word.",
  ] },
  { v: '0.3.143', date: '2026-11-08', title: 'The Lightkeeper\'s Locket', lines: [
    "Biome 1's first relic, the Lightkeeper's Locket: a tarnished brass oval on a thin chain, a tiny flame scratched on its face. \"Kept close, whatever the dark took.\"",
    "One lies in each world, in a room at depth 4 (never the one with the stairs up), in the room's far corner with a rat beside it guarding it. It is left once and never comes back.",
    "Step on it to put it in your bag; you carry one. It can't be sold. Setting it on the shelf, and what it does there, come at the next steps.",
    "Decisions: D-691. D-679 and D-680 moved to the archive, word for word.",
  ] },
  { v: '0.3.142', date: '2026-11-08', title: 'The shelf', lines: [
    "Make a Shelf at the workbench, its last slot, from 4 Wood and 2 Stone: a tall wooden case with two empty shelves. You carry one at a time.",
    "Set it down on the surface as you do the bed. Relics will rest on it at later steps; for now it stands empty.",
    "Bump it and it asks \"Deconstruct shelf?\" with \"Nothing on it yet.\" Yes puts it back in your bag.",
    "Decisions: D-690. D-678 moved to the archive, word for word.",
  ] },
  { v: '0.3.141', date: '2026-11-08', title: 'Relics from the old city', lines: [
    "Relics are planned: rare things from the old city under the ground, found in hidden spots and guarded rooms, never made. Each one helps you set out or softens a fall, and every relic found works once it sits on a shelf at home. The shelf comes first, then the first relic, which keeps one find on a fall. Nothing in play changes yet.",
    "Decisions: D-689. D-676 and D-677 moved to the archive, word for word.",
  ] },
  { v: '0.3.140', date: '2026-11-08', title: 'The Spit grub', lines: [
    "A new creature, the spit grub: a plump pale glowworm with a glowing green tail, drawn side on. It turns up from depth 4, never moves, and its faint green glow shows even in the dark. It has 1 heart, so one blow of anything ends it.",
    "When it sees your lit lantern down a clear row or column, up to 5 tiles away, it spits a glowing glob. The glob flies 1 tile a turn, so you can step out of its way, and the grub then rests 2 turns: rush it then.",
    "A glob hits whatever it meets for 1, you or another creature, and breaks on walls and rubble. Standing right beside the grub, it hits you at once. With your lantern off, the grub can't see you.",
    "The grub's next move shows as a small glob mark, and every glob in flight shows where it goes next.",
    "A beaten spit grub leaves a Grub Skin about 1 time in 2, sold for 1, and now and then a rare Glow Gland, sold for 5.",
    "Decisions: D-688. D-675 moved to the archive, word for word.",
  ] },
  { v: '0.3.139', date: '2026-11-07', title: 'Still play draws less', lines: [
    "With reduced motion on, the room in play is drawn once and kept until something in it changes, as under a card, so a phone does much less work and saves battery. Play looks and feels the same.",
    "Decisions: D-687. D-674 moved to the archive, word for word.",
  ] },
  { v: '0.3.138', date: '2026-11-07', title: 'The room holds still under a card', lines: [
    "Under a card (the bag, pause, the map and the rest), the room behind it holds still instead of being drawn again 60 times a second, so a phone does much less work and saves battery. Its torches stop flickering until the card closes; the card itself moves as before.",
    "Decisions: D-686. D-673 moved to the archive, word for word.",
  ] },
  { v: '0.3.137', date: '2026-11-07', title: 'The rock painted faster', lines: [
    "A cave room's rock and earth are painted in about half the time, so the pause on reaching depth 2 is shorter. The picture is the same, pixel for pixel.",
    "Decisions: D-685. D-672 moved to the archive, word for word.",
  ] },
  { v: '0.3.136', date: '2026-11-07', title: 'He has wares at home', lines: [
    "At home, the peddler no longer says \"Let me unpack. I'll have wares soon.\" while his card shows his wares. His two other home lines take turns, as before.",
    "Decisions: D-684. D-671 moved to the archive, word for word.",
  ] },
  { v: '0.3.135', date: '2026-11-07', title: 'Space on the name pad', lines: [
    "On the name pad, Space does nothing, so a name is no longer cut short and made at the space: typing \"ANNA MAE\" made \"ANNA\". Enter still presses the lit key. Names stay A to Z.",
    "Decisions: D-683. D-670 moved to the archive, word for word.",
  ] },
  { v: '0.3.134', date: '2026-11-07', title: 'The wrench under pause', lines: [
    "On a phone 320 px wide, the dev wrench stands under the pause button, so the hearts and oil panel no longer runs into it from level 10. Wider screens are unchanged.",
    "Decisions: D-682. D-669 moved to the archive, word for word.",
  ] },
  { v: '0.3.133', date: '2026-11-07', title: 'A smaller card upright', lines: [
    "On a tablet held upright, a card open in play is drawn a size smaller, so the bag's words fit above Drop and Wear with a 9 or 12 slot bag. Before, they ran over the buttons. Phones are unchanged.",
    "Decisions: D-681. D-668 moved to the archive, word for word.",
  ] },
  { v: '0.3.132', date: '2026-11-07', title: 'A card\'s action at once', lines: [
    "A press of Eat, Pour, Craft or Hold in the bag, or Make at the bench, happens at once, even while the hero is still sliding or the stairs are fading. Before, it waited until the card closed.",
    "Decisions: D-680. D-667 moved to the archive, word for word.",
  ] },
  { v: '0.3.131', date: '2026-11-07', title: 'Drops clear of creatures', lines: [
    "A creature's drops, mined finds that don't fit in the bag and berries picked from the garden bed never land under a creature or a person: they go to the next open tile, or where they came from when none is left. Before, a rare drop could lie hidden under another creature.",
    "Decisions: D-679. D-665 and D-666 moved to the archive, word for word.",
  ] },
  { v: '0.3.130', date: '2026-11-07', title: 'Freed once', lines: [
    "Once the trapped peddler is free, digging another heap of rubble beside him is plain digging: the rubble's own lines, and he still leaves when he meant to. Before, he cheered the digging on and was freed a second time, thanking you again and waiting 5 more turns.",
    "Decisions: D-678. D-664 moved to the archive, word for word.",
  ] },
  { v: '0.3.129', date: '2026-11-07', title: 'Good for making things', lines: [
    "Nine materials with recipes, from Stone and Copper Ore to the Mimic Heart, now say \"good for making things\" when chosen in the bag, not \"for crafting later\". The eleven no recipe uses yet still say \"for crafting later\".",
    "Decisions: D-677. D-663 moved to the archive, word for word.",
  ] },
  { v: '0.3.128', date: '2026-11-07', title: 'The small notes caught up', lines: [
    "Three small notes are brought up to date: the code layout lists the maker and the map preview's page, the dev tools' Go to depth runs from 0, the crypt, and the Lure Wisp is listed as built. Nothing in the game changes.",
    "Decisions: D-676. D-662 moved to the archive, word for word.",
  ] },
  { v: '0.3.127', date: '2026-11-07', title: 'Built things, not "to come"', lines: [
    "The glossary is brought up to date: armour, charms, lantern parts, planting, the waystones on deeper floors, the Bestiary tab and Stone's crafts are described as they are in the game, not as to come. Nothing in the game changes.",
    "Decisions: D-675. D-661 moved to the archive, word for word.",
  ] },
  { v: '0.3.126', date: '2026-11-07', title: 'Each find\'s own price', lines: [
    "The notes on the peddler's prices are brought up to date: each find sells at its own price, 1 coin for most common materials, 2 for Wisp Glass and 5 for a rare one. Nothing in the game changes.",
    "Decisions: D-674.",
  ] },
  { v: '0.3.125', date: '2026-11-07', title: 'The world\'s notes caught up', lines: [
    "The world's notes are brought up to date: past every edge is plain dark, and floors under the crypt have 6 to 13 rooms made of cells, with halls and large rooms, going on below depth 8. Nothing in the game changes.",
    "Decisions: D-673. D-658 moved to the archive, word for word.",
  ] },
  { v: '0.3.124', date: '2026-11-07', title: 'Woken stones stay woken', lines: [
    "When an old save from before the bigger floors is brought up to date, a deep waystone you had woken stays woken, so you can still travel to it. Before, every deep waystone went back to sleep. Saves already brought up to date stay as they are.",
    "Decisions: D-672. D-657 moved to the archive, word for word.",
  ] },
  { v: '0.3.123', date: '2026-11-07', title: 'Cards drawn smaller to fit', lines: [
    "On a tablet held sideways or a near-square PC window, the cards in play (the bag, pause menu, Journal, workbench, stash chest and peddler) are now drawn a little smaller, so everything fits on the card as it does on a phone held sideways. Before, words and boxes ran past the card's edge. Play itself keeps its size, and phones look the same as before.",
    "Decisions: D-671. Questions closed: Q-064. D-656 moved to the archive, word for word.",
  ] },
  { v: '0.3.122', date: '2026-11-07', title: 'A card\'s words stay', lines: [
    "With a screen reader, opening the bag, the map or the pause menu while a message is showing now reads the card's own words. Before, a moment later the message took their place. A message said while the card is open is still read out.",
    "Decisions: D-670. D-655 moved to the archive, word for word.",
  ] },
  { v: '0.3.121', date: '2026-11-07', title: 'A held Space picks once', lines: [
    "Holding Space on the title, a menu or a card now picks only once, as Enter does. Before, it kept picking: from the title it ran straight into a new journey, and in Settings and the bag it kept flipping switches and pouring flasks. Holding Space in play still waits turn after turn.",
    "Decisions: D-669. D-654 moved to the archive, word for word.",
  ] },
  { v: '0.3.120', date: '2026-11-07', title: 'Walls are not cleared heaps', lines: [
    "The trapped peddler calls for help again the first time you dig at his rubble. Before, the cave walls round him counted as dug-out heaps, so in most journeys he went straight to \"Keep digging!\".",
    "Decisions: D-668.",
  ] },
  { v: '0.3.119', date: '2026-11-07', title: 'The fall reels the line in', lines: [
    "Falling with the fishing line out now reels it in. Before, the float stayed on the water and fish kept biting it after you woke, even from across the room.",
    "Decisions: D-667.",
  ] },
  { v: '0.3.118', date: '2026-11-07', title: 'One of a kind', lines: [
    "After you take the Stone Pick or the Wooden Rod off, Make no longer makes a second one: it says you already carry one, and nothing is used up.",
    "Wearing a charm or vest that is the same as one you already wear now says \"You already have …\" and changes nothing, so two Heart Charms can't stretch the oil. Two different charms are still worn together.",
    "Decisions: D-666.",
  ] },
  { v: '0.3.117', date: '2026-11-07', title: 'Only the stone\'s own sticks', lines: [
    "When an old save first gets its home waystone, only sticks on the stone itself are cleared away, as decided. A stick or anything you dropped on the tiles round the stone stays where it was.",
    "The version shown at the top of the progress notes is set by the release tool now, so it no longer falls behind.",
    "Decisions: D-664, D-665.",
  ] },
  { v: '0.3.116', date: '2026-11-07', title: 'The glance\'s own dice', lines: [
    "A bite glancing off your vest no longer makes the next kill from that tile always drop its part. The glance rolls dice of its own, so drops come about 1 time in 2, as decided. What each seed drops is unchanged; only which bites glance changes.",
    "Decisions: D-663.",
  ] },
  { v: '0.3.115', date: '2026-11-07', title: 'The mimic wakes silently', lines: [
    "A flask or herb mimic waking no longer rings the waystone's bells or starts its rune glowing. It wakes silently, as decided. The waystone still rings when it wakes.",
    "Decisions: D-662.",
  ] },
  { v: '0.3.114', date: '2026-11-07', title: 'A slow tap', lines: [
    "A slow tap works on every menu and card. Before, a press held a quarter of a second or longer did nothing off play, so a slow, careful tap on a phone was lost. In play, holding still walks as before.",
    "Decisions: D-661.",
  ] },
  { v: '0.3.113', date: '2026-11-07', title: 'The tenth audit, part 1', lines: [
    "The tenth audit, part 1. Nothing in play changes. New floors are worked out about 5 times faster, the same floors as before, and the tests run in 35 seconds, not 59.",
    "Behind the scenes: touch in play has its own file; two long pages and five decisions moved to their own files, word for word. Four bug hunts, a docs read-through and a phone speed check found 19 bugs, some stale doc lines and one freeze, for you to pick fixes from.",
    "Decisions: D-660. D-648 to D-651 and D-653 moved to the archive, word for word.",
  ] },
  { v: '0.3.112', date: '2026-11-07', title: 'The Spit grub', lines: [
    "Docs only: the first creature that attacks from range is chosen, the Spit grub. It never moves, and spits a glowing glob at your lit lantern that moves 1 tile a turn, so you can step aside; walls and rubble stop it, and with the lantern off it can't see you. Nothing in play changes yet.",
    "Decisions: D-659. D-647 moved to the archive, word for word.",
  ] },
  { v: '0.3.111', date: '2026-11-07', title: 'Ideas from the review', lines: [
    "Docs only: ideas from a review of the whole game are kept for later, among them shots you can see coming, sounds from the dark, torches that stay lit and a card when you fall. Nothing in play changes.",
    "Decisions: D-658.",
  ] },
  { v: '0.3.110', date: '2026-11-07', title: 'Tough built', lines: [
    "Tough is on the Growth tree: in the Journal's Growth tab, Body now holds two places in its first row, Heart and Tough above it. Tough costs 1 ember and is bought once.",
    "With Tough, a bite that hurts poisons you only about 1 time in 2, by the journey's dice. When it does, poison runs as before.",
    "Tough's place shows poisoned's drop, grey until bought and pale green after. On a small sideways screen the tree draws a little closer so it fits under the tabs.",
    "Decisions: D-657.",
  ] },
  { v: '0.3.109', date: '2026-11-07', title: 'Tough', lines: [
    "Nothing in the game changed yet. The Growth upgrade against poison is picked: Tough, on the Body branch, for 1 ember.",
    "With Tough, a bite that hurts poisons you only about 1 time in 2. The Centipede Charm still makes poison shorter, and the Antidote still ends it.",
    "It will sit in Body's first row, above Heart, so that row holds two places.",
    "Decisions: D-657. D-646 moved to the archive, word for word.",
  ] },
  { v: '0.3.108', date: '2026-11-07', title: 'The Centipede Charm', lines: [
    "A new charm, the Centipede Charm: a drop of pale green venom in a copper setting. Make it at the workbench, after the rod, from 3 Centipede Leg and 1 Copper Ore. You have one at a time.",
    "Choose it in the bag and press Wear; no turn passes. It goes in a charm slot beside the Wisp or Heart Charm.",
    "While you wear it, poisoned lasts 3 turns, not 6, and takes 1 heart, not 2. A bite still poisons you, so the Antidote still helps.",
    "Decisions: D-656. D-645 moved to the archive, word for word.",
  ] },
  { v: '0.3.107', date: '2026-11-07', title: 'The Antidote', lines: [
    "The Antidote: a tall green vial. Make it in the bag from 1 Snapcap Gill and 1 herb; the gill's slot shows MAKE when you carry both.",
    "Drink it while poisoned and the poison ends at once. It heals nothing. When you aren't poisoned its DRINK is dim, and it stays in the bag.",
    "Now that the Antidote is in, poison can take your last heart, and you fall. The centipede's Bestiary page says so.",
    "Decisions: D-655. D-644 moved to the archive, word for word.",
  ] },
  { v: '0.3.106', date: '2026-11-07', title: 'The centipede built', lines: [
    "A new creature, the centipede: rust red with pale legs and green fangs, drawn side on. It turns up from depth 3, chases you once it sees you in the light, and has 2 hearts, so a knife ends it in one blow.",
    "Its bite takes a heart and leaves you poisoned. Poisoned lasts 6 turns and takes a heart every 3 turns, 2 in all. Another bite starts it again; it never stacks. Until the Antidote is in, poison never takes your last heart.",
    "While you are poisoned, a green drop shows beside the boon's mark; tap it to see the turns left. Each heart poison takes flashes green on the panel, and a line says when it wears off.",
    "A beaten centipede leaves a Centipede Leg about 1 time in 2, sold for 1, and now and then a Venom Sac, as the scorpion does.",
    "Decisions: D-654.",
  ] },
  { v: '0.3.105', date: '2026-11-07', title: 'The centipede', lines: [
    "Nothing in the game changed yet. The first creature that poisons you is picked: the centipede, rust red with pale legs and green fangs. It chases you, and its bite leaves you poisoned. It turns up from depth 3.",
    "Poisoned lasts 6 turns and takes a heart every 3 turns, 2 in all. Another bite starts it again; it never stacks. Until the Antidote is in, poison never takes your last heart.",
    "It will show as a green drop beside the boon's mark, with a line as it starts and wears off, and each heart it takes flashes green.",
    "Decisions: D-654. D-643 moved to the archive, word for word.",
  ] },
  { v: '0.3.104', date: '2026-11-07', title: 'The motes follow the way', lines: [
    "The drifting motes now follow the way you can walk to the stairs down, through openings and round bends, instead of a straight line through the stone. Before, on about 1 floor in 4 they drifted back toward the stairs you had just come down.",
    "They all drift toward the farthest spot on that way you can see, so at a bend or a junction they swing round together.",
    "Decisions: D-653, superseding D-605's straight line.",
  ] },
  { v: '0.3.103', date: '2026-11-07', title: 'Poison first', lines: [
    "Nothing in the game changed. More content comes before the side rooms get fuller: next are creatures that leave a debuff on you, then creatures that attack from a distance, each with ways to defend.",
    "The first debuff will be poison, brought by a new creature, the cave's fifteenth kind. Against it: an Antidote made from a Snapcap Gill and a herb, a charm, and a Growth upgrade.",
    "Decisions: D-652. D-641 moved to the archive, word for word.",
  ] },
  { v: '0.3.102', date: '2026-11-07', title: 'Fuller halls', lines: [
    "Halls and large rooms are worth the walk: a hall now holds twice the finds and creatures of a small room, and a large room four times, spread evenly, a set in each part of the room.",
    "Each set is a flask with a rat guarding it, a herb, an oilcap, sometimes a heartcap, and the depth's usual mix of creatures. The knife and the spear stay one each.",
    "Rooms you have already been into stay as they were.",
    "Decisions: D-651. D-637 moved to the archive, word for word.",
  ] },
  { v: '0.3.101', date: '2026-11-07', title: 'The dead-end cache', lines: [
    "Side rooms start paying for the oil: the last room of each side branch, a dead end, now holds a cache of 2 or 3 extra finds (flasks, herbs, oilcaps or heartcaps), lying together in its far corner.",
    "A cache is there once: taken, it does not grow back. Rooms you have already been into stay as they were.",
    "Decisions: D-650.",
  ] },
  { v: '0.3.100', date: '2026-11-07', title: 'The Lure Wisp built', lines: [
    "The Lure Wisp is here, from depth 4: a small cold flame with pink eyes. Its faint glow shows even out in the dark, though it lights nothing around it.",
    "Come within 3 steps and it drifts a tile away, toward the nearest other creature in the room, or just away when there is none. Following it leads you into trouble.",
    "It never bites, and one hit puts it out. About 1 in 2 leave Wisp Glass, sold for 2.",
    "Decisions: D-649.",
  ] },
  { v: '0.3.99', date: '2026-11-07', title: 'The Lure Wisp', lines: [
    "Nothing in the game changed. The Lure Wisp is planned: a small cold flame with pink eyes, seen even out in the dark, though it lights nothing around it. Come within 3 tiles and it drifts a tile away, toward the nearest other creature, so following it leads you into trouble.",
    "It never bites, and one hit puts it out. It has 1 heart, turns up from depth 4, and may leave Wisp Glass, sold for 2. It is built next.",
    "Decisions: D-649.",
  ] },
  { v: '0.3.98', date: '2026-11-07', title: 'Halls and large rooms', lines: [
    "Halls and large rooms join the first cave's floors: a hall is two cells long, side by side or one above the other, and a large room two by two. Depths 2 to 4 have 1 or 2 halls, depths 5 to 7 1 or 2 halls and sometimes a large room, depth 8 and below 2 or 3 halls and a large room.",
    "They are always side rooms, so the walk to the stairs down stays as short as before, and each holds today's finds for now. Each stretch of a big room's wall can open into a different room, and on the map every room still lines up on the grid.",
    "Old saves have their cave floors made again once more, the hero on that floor's stairs up; home, the woods and the crypt stay.",
    "The map preview tints the halls and large rooms, counts them, and names a tapped room's shape.",
    "Decisions: D-648. D-640 moved to the archive, word for word.",
  ] },
  { v: '0.3.97', date: '2026-11-07', title: 'One-cell rooms', lines: [
    "The first cave's floors are bigger: 6 to 8 rooms on each floor at depths 2 to 4, 9 to 11 at depths 5 to 7 and 11 to 13 at depth 8 and below, the number changing from seed to seed. Each room is one cell of the floor's grid, 11 by 13 tiles, 13 by 15 from depth 8.",
    "The stairs down are 3 or 4 rooms from the stairs up; the other rooms branch off as side rooms and dead ends, each with today's finds, so exploring them is a choice the oil pays for. Depth 8 and below have two loops.",
    "Old saves have their cave floors made again once, the hero on that floor's stairs up; home, the woods and the crypt stay.",
    "A map preview page draws any seed's floors for the owner to flip through before merging, and every step that changes how things are made gets one.",
    "Decisions: D-646, D-647. D-638 and D-639 moved to the archive, word for word.",
  ] },
  { v: '0.3.96', date: '2026-11-07', title: 'Biome 1\'s floors', lines: [
    "Nothing in the game changed. The first cave's floors are planned bigger: 6 to 8 rooms on each floor at depths 2 to 4, 9 to 11 at depths 5 to 7 and 11 to 13 at depth 8, the number changing from seed to seed, about 69 rooms in all where there are about 33 now.",
    "Rooms will be made of square-cut cells so everything lines up, in play and on the map: a small room is one cell, a long hall two, a large room two by two. The stairs down stay about as near as today, 3 or 4 rooms away; the other rooms branch off the way and hold the rewards. Old saves will have their cave floors made again once; home, the woods and the crypt stay.",
    "Decisions: D-645. D-634 moved to the archive, word for word.",
  ] },
  { v: '0.3.95', date: '2026-11-07', title: 'Bigger biomes', lines: [
    "Nothing in the game changed. Each biome will grow to about 2 to 3 times its size to hold everything planned: more rooms on each floor, and rooms both smaller and bigger than today's, so no two seeds feel the same. The first cave grows first, before the next creature.",
    "The owner's idea is kept for later: a cleared room filling again over time, perhaps with different creatures.",
    "Decisions: D-644. Questions opened: Q-086. D-482 moved to the archive, word for word.",
  ] },
  { v: '0.3.94', date: '2026-11-07', title: 'Creatures and bosses', lines: [
    "Nothing in the game changed. Creatures and bosses are planned: the first cave ends with 14 kinds, adding the Lure Wisp, a small false light that drifts ahead in the dark, and the Grave Beetle, a shelled beetle the hammer cracks. Each deeper biome has about 10 kinds, some from above coming back a heart tougher.",
    "Each boss fights in its own room and changes how it fights at half its hearts; beaten once, it gives its found ability. The Lure Wisp is the next creature built.",
    "Decisions: D-643. D-528 moved to the archive, word for word.",
  ] },
  { v: '0.3.93', date: '2026-11-07', title: 'Plants and harvests', lines: [
    "Nothing in the game changed. Plants and harvests are planned: each deeper oil plant takes fewer to fill a flask (lampwort 2, a glowcap makes Bright Oil, an ember lily is poured straight), and every land plant gives a seed, made from 3 of it.",
    "Oil plants grow in the garden, but slowly, so the light still mostly comes from below. Each biome's ore, wood and fish are kept as drafted, each a step up from the one above.",
    "Decisions: D-642.",
  ] },
  { v: '0.3.92', date: '2026-11-07', title: 'Items and crafting', lines: [
    "Nothing in the game changed. Items and crafting are planned: each weapon kind keeps one part of its own in every metal (wood for the spear and axe, stone for the hammer, a bone for the knife, silk for the sling), and the axe in hand fells the deeper trees.",
    "The lantern gets about one new part for each slot in each biome: tanks and wicks simply get better, while each glass shows something different, a choice for the trip. One armour and about three charms come in each biome, every creature part gets a use, and each village teaches a knack of its own.",
    "Decisions: D-641.",
  ] },
  { v: '0.3.91', date: '2026-11-07', title: 'Growth and quests', lines: [
    "Nothing in the game changed. The Growth tree is planned bigger: about 50 places across Light, Body and Hands, more than a journey's embers can buy, so each hero grows differently. Knacks join it, small ways of fighting or finding worn two at a time, with twelve new boons (26 in all, some joining as you go deeper or after something happens) and solvable trials that pay an ember.",
    "Places and quests are planned too: each biome's deeper floors are one of two kinds of place, a village of people in each biome, secrets on old floors marked on the map once seen, and side quests in a Quests tab, some paying a new boon or bringing someone home.",
    "Decisions: D-639, D-640.",
  ] },
  { v: '0.3.90', date: '2026-11-07', title: 'Skills and mechanics', lines: [
    "Nothing in the game changed. The content map's first draft is up: every biome's weapons, skills, items, plants and creatures on one page. Picked from it: five weapon kinds (knife, spear, axe, hammer, sling), three elements (flame, venom, light) and four found abilities (Leap, Heave, Flare, Swim). Each new metal makes every weapon hit 1 harder, and rare weapons with small effects of their own will be found below.",
    "The game will hold more to discover: places that branch as each biome goes deeper, villages of people below, secrets on old floors and many side quests, with a bigger Growth tree, more boons and challenges to match.",
    "Decisions: D-636, D-637, D-638. Questions opened and closed: Q-085. D-627 to D-632 moved to the archive, word for word.",
  ] },
  { v: '0.3.89', date: '2026-11-07', title: 'Biome depths', lines: [
    "Nothing in the game changed. Each biome is 8 floors deep: the woods and mountains down to depth 8, the old mines to 16, the glowing fungal caverns to 24, and Underhearth to 32, where the First Light waits. All the game's content will be planned on one map, starting with skills and how fighting works.",
    "Decisions: D-635. Questions closed: Q-082. D-626 moved to the archive, word for word.",
  ] },
  { v: '0.3.88', date: '2026-11-07', title: 'The story', lines: [
    "Nothing in the game changed. The story is written down: Underhearth, the city below, fell when its great lamp, the First Light, ran low on oil. You went down with your teacher, Old Maren, the gloam took them, and you came home without your memories. The goal is to relight the First Light. The guide will be a spark of it.",
    "The aim is set too: about 12 to 20 hours to relight the First Light, built one biome at a time, with Old Maren fought near the end.",
    "Decisions: D-633, D-634. Questions closed: Q-072. Questions opened: Q-084. D-624 and D-625 moved to the archive, word for word.",
  ] },
  { v: '0.3.87', date: '2026-11-06', title: 'How to fight it', lines: [
    "A creature's Bestiary page now ends with how to fight it, under a gold heading, once you have beaten 3 of them. Before that it says in grey how many more to beat: \"Beat 2 more to learn how to fight it.\" Each creature has a tip or two of its own, such as waiting for it to step up to you so you strike first.",
    "Decisions: D-632. D-623 moved to the archive, word for word.",
  ] },
  { v: '0.3.86', date: '2026-11-06', title: 'How it acts', lines: [
    "Each creature in the Bestiary has its own page: tap its row, or pick it with Up or Down and press Enter. The page shows its drawing twice as big, its name and counts, and, once you have beaten one, a sentence or two on how it acts. Before that it says \"Beat one to learn how it acts.\" Esc, the round cross or Left goes back to the table.",
    "Decisions: D-631. D-622 moved to the archive, word for word.",
  ] },
  { v: '0.3.85', date: '2026-11-06', title: 'The Bestiary tab', lines: [
    "The Journal has a third tab, Bestiary, after Growth: a table of the creatures you have met, each with its drawing, its name, and how many you have met and beaten. A creature counts as met the first time your light reaches it; a mimic or a snapcap only once it shows itself, and one beaten in the dark counts too. The counts stay with your profile through falls and new journeys, starting from zero now.",
    "Decisions: D-630. D-621 moved to the archive, word for word.",
  ] },
  { v: '0.3.84', date: '2026-11-06', title: 'Special creatures', lines: [
    "Nothing in the game changed. The owner's idea is saved as a question: bosses, rare named creatures and unique wanderers with histories of their own, told in lore pages, on their Bestiary page and by the guide or people, each with a Feat for beating it.",
    "Questions opened: Q-083.",
  ] },
  { v: '0.3.83', date: '2026-11-06', title: 'The first words', lines: [
    "A new journey now opens with its first words, on a card in the middle of the dim crypt: \"You wake in the dark of the crypt. Your lantern still burns, but its oil will not last. Something waits below.\" Begin, or a tap anywhere, starts the journey.",
    "Decisions: D-628, D-629. D-620 moved to the archive, word for word.",
  ] },
  { v: '0.3.82', date: '2026-11-06', title: 'Test spots', lines: [
    "The dev panel has a new Spots section, its tab a bookmark, with three test spots kept on this device. Save puts the game as it is now into a slot; Load brings it back at once, no turn passed. Each slot's line says what it holds, like 1 · DEPTH 3 · TURN 120, or EMPTY. A loaded spot counts as a dev jump, so that journey's records stop counting.",
    "Decisions: D-627. D-608 moved to the archive, word for word.",
  ] },
  { v: '0.3.81', date: '2026-11-06', title: 'Endless oil', lines: [
    "The dev panel's Oil section has an Endless oil switch. While it is on, the lantern never runs down: turns burn no oil, and an oil tick still drinks, with its line, sip and flicker, but takes none. The oil stays where it was, so a dim lantern stays dim. It stays on in this game until you switch it off; a new game starts with it off.",
    "Decisions: D-626.",
  ] },
  { v: '0.3.80', date: '2026-11-06', title: 'God mode', lines: [
    "The dev panel's Hero section has a God mode switch. While it is on, creatures still bite, with their line, sound and red flash, but take no hearts, so you never fall. It stays on in this game until you switch it off; a new game starts with it off.",
    "Decisions: D-625.",
  ] },
  { v: '0.3.79', date: '2026-11-06', title: 'Spawn as pictures', lines: [
    "Spawn in the dev panel is a grid of pictures now, one for every creature, find, tile, torch and person, under its kind's heading; the picked one's name shows above them.",
    "A search box over the grid narrows it with each letter typed, so anything is a few taps away.",
    "Decisions: D-624. D-617 and D-618 moved to the archive, word for word.",
  ] },
  { v: '0.3.78', date: '2026-11-06', title: 'The dev bottom sheet', lines: [
    "The dev panel is a bottom sheet now: half the screen tall, along its foot, with a row of icon tabs across its top (an eye, a sparkle, a door, a drop, a heart, an arrow) and the open section's name above its tools.",
    "While it is up the room slides clear above it, so the hero stays in sight; tap the open tab again and the sheet folds to its tabs. On a sideways phone or a PC it sits at the bottom left and the room slides right instead.",
    "Decisions: D-623. D-615 and D-616 moved to the archive, word for word.",
  ] },
  { v: '0.3.77', date: '2026-11-06', title: 'The maker', lines: [
    "Behind the scenes: a new maker tool. One command writes every empty piece of a new creature, find, tile or person, with a grey \"?\" picture until it is drawn, and the checker then names each number, line and picture still to fill. New things reach the game faster.",
    "Nothing in the game changes.",
    "Decisions: D-622. D-613 and D-614 moved to the archive, word for word.",
  ] },
  { v: '0.3.76', date: '2026-11-06', title: 'The checker', lines: [
    "Behind the scenes: a new checker runs with the tests. For every creature, find, tile and person it names any missing piece (a line, a picture, a hit flash, a sound, where it lives, a test or its row in the docs) and the file to fix, so new things reach the game faster and with fewer bugs.",
    "It found the Snapcap Gill missing from the content list; it is listed now. Nothing in the game changes.",
    "Decisions: D-621. D-611 and D-612 moved to the archive, word for word.",
  ] },
];
