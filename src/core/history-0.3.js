// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; 0.3.76 to 0.3.150
// are in history-0.3-2.js (D-740) and 0.3.0 to 0.3.75 in history-0.3-1.js (D-699); stage 0.2's are in
// history-0.2.js and its split files.
export const HISTORY_03 = [
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
  { v: '0.3.200', date: '2026-11-09', title: 'Ponds halfway to round', lines: [
    "Ponds outside are rounder and smooth-edged, halfway between their old shape and a round one: no more star shapes or dripping rims. The same tiles are water; cave pools are unchanged.",
    "Decisions: D-748.",
  ] },
  { v: '0.3.199', date: '2026-11-09', title: 'Smooth rock edges', lines: [
    "The mountain rock outside has smooth, natural edges: no more torn outlines, loose pixels or spikes. Shapes, colours and walking are unchanged.",
    "Decisions: D-747.",
  ] },
  { v: '0.3.198', date: '2026-11-09', title: 'Find the crypt', lines: [
    "A new goal, Find the crypt: once you take a boon, the Quests tab sends you through the broken door beside home, and walking in pays a reward.",
    "Decisions: D-746.",
  ] },
  { v: '0.3.197', date: '2026-11-09', title: 'The broken seal', lines: [
    "The way into the crypt is now a crypt's door: the broken seal, a bricked-up doorway with a hole broken through it and fallen bricks on the grass, on every edge.",
    "The small arch and the craggy cave are kept for later cave mouths; the overgrown mouth waits with them.",
    "Decisions: D-745.",
  ] },
  { v: '0.3.196', date: '2026-11-09', title: 'A craggy cave mouth', lines: [
    "A new look for the cave mouth: a craggy cave, wide and black, with teeth of rock hanging from its top. The seed picks it or the small arch, so worlds differ.",
    "On a side or bottom edge, the rock roofs over the craggy cave and the ground dives black beneath it. A few pebbles lie at the rocks' feet. Walking is unchanged.",
    "Decisions: D-744. New question: Q-089, falling down holes.",
  ] },
  { v: '0.3.195', date: '2026-11-09', title: 'Words that fit', lines: [
    "Words no longer run past the edge of a card. On a phone held upright, a quest's how wraps onto more lines, and a done goal's reward sits under it.",
    "A Journal list longer than its card scrolls, with a thin bar at its right: swipe, the mouse wheel, or Up and Down. Upright, the Bestiary is one table instead of two squeezed together.",
    "The goal line under the hearts wraps so the round map no longer covers its end. In the stash chest, a long name stays clear of STORE.",
    "A new test draws every card at upright and sideways phone sizes with everything in the game, so words that don't fit are caught before they reach a phone.",
    "Decisions: D-743.",
  ] },
  { v: '0.3.194', date: '2026-11-09', title: 'The bug hunt\'s fixes', lines: [
    "Every bug the twelfth audit found is fixed. A berry bush or fallen branch no longer blocks a path between woods rooms.",
    "Journeys begun before the mountain rooms now get mountain rooms in the north row they haven't visited, and the dev Reset at home no longer brings back the old cave mouth.",
    "Goals done on the same turn each roll their own reward. On a South woods journey, an older profile's \"Go home to the woods\" is ticked quietly instead of showing crypt directions.",
    "A pool no longer hints that a room's flask is unguarded, and rat packs no longer tell where a flask mimic stands. A spit grub's glob flies over a pile of bones, and a scorpion lowers its tail when you come back into its room.",
    "Decisions: D-742.",
  ] },
  { v: '0.3.193', date: '2026-11-09', title: 'The playbook caught up', lines: [
    "The playbook of how we work is caught up with the whole project so far: how the game grew in stages, our tools, what bugs taught us and the design habits, in a new second page, WORKFLOW-2.md. Nothing in the game changes.",
    "From now on, a step that teaches something about working together adds a line to the playbook as it goes; each audit sorts the lines into place.",
    "Decisions: D-741.",
  ] },
  { v: '0.3.192', date: '2026-11-09', title: 'The twelfth audit', lines: [
    "The twelfth audit. Nothing in the game changes. The Version history's newest file is split again, word for word: 0.3.76 to 0.3.150 move to history-0.3-2.js.",
    "Docs: finished decisions and the ticked plan steps moved to the archive, word for word, so a conversation starts by reading less. The start-up check now names the copy it brought up to date. A bug hunt's findings are listed for the owner. The playbook of how we work gains what this stretch taught. The next audit is at 0.3.232.",
    "Decisions: D-740. D-699 and D-734 to D-737 moved to the archive, word for word.",
  ] },
  { v: '0.3.191', date: '2026-11-09', title: 'Rounded rock', lines: [
    "The rock on the surface is rounded now, as the cave walls are, but lit by day: a sunlit grey top in place of the near-black squares. Rocks in the mountain rooms are fuller lumps, trees stand in front of them, and the two rocks beside the cave mouth are rounded too.",
    "Past a mountain room's edge the rock goes on, with a grass path leading out to each room beside it, where trees stood before.",
    "Decisions: D-739.",
  ] },
  { v: '0.3.190', date: '2026-11-09', title: 'Mountain rooms', lines: [
    "The three rooms along the north of Hearthwood are mountain rooms now: rocky slopes of grass, rock standing where the trees would be, with a few lone trees. Each has 3 grey boulders to break for stone, as in the caves, and its own sticks and fallen branch, but no pond or bush. On the map, rock on the surface shows grey. If you have already been to one of these rooms, it stays woods.",
    "Decisions: D-738.",
  ] },
  { v: '0.3.189', date: '2026-11-09', title: 'Waking after a fall', lines: [
    "Where you wake after a fall: beside the last bed you slept in, on the spot you lay down from (or the nearest free spot beside the bed). With no bed, on the home waystone once it is woken; no boon is offered until you step off and back on. Otherwise, where the journey began. Taking the bed down forgets it until you sleep in it again. Hardcore still begins the world again.",
    "Decisions: D-737.",
  ] },
  { v: '0.3.188', date: '2026-11-09', title: 'Light your lantern', lines: [
    "A new goal, Light your lantern: \"Tap the lantern, or press L.\" It shows when the dark comes, halfway through dusk in the woods or on stepping somewhere the sky doesn't reach, with the lantern off, and goes ahead of any other goal while it is dark. Lighting the lantern, by hand or By itself, does it and pays its reward. If your lantern was already lit, it is ticked quietly.",
    "Decisions: D-736.",
  ] },
  { v: '0.3.187', date: '2026-11-09', title: 'The south start', lines: [
    "A new journey begins in the woods now, not the crypt: in one of the rooms along the south of Hearthwood, never the one with the cave mouth, standing near the middle of the room. It is day, so your lantern starts off. The first words say so: \"You wake among the trees of Hearthwood. Your lantern is cold; keep its oil for the dark. Something waits below.\" Your first goal is Find the waystone: \"Home is in the middle of the woods.\" Go home to the woods is no longer asked. If you fall, you wake where the journey began, until beds and the waystone come in.",
    "Decisions: D-735. Questions closed: Q-087. Questions opened: Q-088. D-727 and D-728 moved to the archive, word for word.",
  ] },
  { v: '0.3.186', date: '2026-11-09', title: 'Hearthwood\'s nine rooms', lines: [
    "The woods are bigger: nine rooms of woods in a 3 by 3 square, home in the middle. Each room has a path three tiles wide through the trees to every room beside it, so you can walk any way. Home keeps its trees and everything you set down. The cave mouth has moved out of home into the room beside it, on that room's far side, so the way into the crypt is one room further. Every woods room has its own sticks, branch, pond and gloamberry bush; only home has the waystone. The map shows the nine rooms as you find them.",
    "Decisions: D-734. Questions opened: Q-087. D-705 and D-706 moved to the archive, word for word.",
  ] },
  { v: '0.3.185', date: '2026-11-09', title: 'A bigger surface, the plan', lines: [
    "Nothing in the game changed. The plan for a bigger surface: the woods grow to nine rooms, with mountains along the north, home in the middle and the cave in a room beside it. A new journey will begin in a woods room to the south, and you walk north to find home. After a fall you will wake in the last bed you slept in, or at the home waystone once woken, or else where the journey began. Some woods will be thick, some open glades. Five small steps, the nine rooms first.",
    "Decisions: D-733. Questions closed: Q-081. D-712 and D-713 moved to the archive, word for word.",
  ] },
  { v: '0.3.184', date: '2026-11-09', title: 'A playbook of how we work', lines: [
    "Nothing in the game changed. A new page for the makers, How we work: the way the owner and Claude build Gloamdeep together, why each habit exists, what changed along the way, and how to start a new project from it. Each audit will add to it.",
    "Decisions: D-732.",
  ] },
  { v: '0.3.183', date: '2026-11-09', title: 'The bone rat comes back', lines: [
    "The bone rat comes back. Beaten, it falls into a low pile of bones, its skull on top, and three turns later it stands up again, whole. Small pink dots over the pile count the turns down, 3, 2, 1, and on the last one \"The bones stir.\" Step onto the pile before then to scatter the bones for good. Only then is it beaten: its Rat Bone, its Beaten count and its experience come from the scatter. The dots hide with Attack marks Off.",
    "Decisions: D-731.",
  ] },
  { v: '0.3.182', date: '2026-11-09', title: 'The tail strike and Attack marks', lines: [
    "The scorpion now strikes with its tail. It never bites beside you. Once you are in line with it, up to two tiles away, it stops and raises its tail for a turn, and both tiles ahead are marked. On its next turn it strikes them: two hearts if you are still there. Step out of its line and the sting hits bare floor, then it stands still a turn, open to your blow. One blow of anything still kills it.",
    "A new switch in Settings, Attack marks, after Flasks. It starts On. Turn it Off and no creature's next move shows: no arrows, fangs, glob arrows or strike marks, on the room or on the creature list. You read the creatures by watching them and their lines.",
    "Decisions: D-729, D-730.",
  ] },
  { v: '0.3.181', date: '2026-11-09', title: 'The rat pack', lines: [
    "Rats now hunt in packs. From depth 3, in about 1 room in 3, the rat by the flask has two packmates beside it. Once one of them sees you, all three come, and each heads for its own side of you to surround you. While two of a pack are left, a hurt rat stands its ground; the last one may still run. A rat on its own acts as before. The rat's Bestiary page says so.",
    "Decisions: D-727, D-728.",
  ] },
  { v: '0.3.180', date: '2026-11-09', title: 'Creatures walk over finds', lines: [
    "Creatures no longer walk around things lying on the floor. They step right over them, and the find stays where it lies. Beat a creature standing on a find, and what it drops lies on that same tile, so one step picks up both.",
    "Decisions: D-727.",
  ] },
  { v: '0.3.179', date: '2026-11-09', title: 'The mole burrows', lines: [
    "The mole now burrows. Once it sees you in the light, it digs down and tunnels toward you, a mound of earth moving a tile a turn. You can't hit the mound. Beside you it bursts up, and you get the first swing before it bites.",
    "Decisions: D-726.",
  ] },
  { v: '0.3.178', date: '2026-11-09', title: 'A flask left unguarded', lines: [
    "In the rooms below the first depth, about 1 flask in 4 now has no rat waiting by it. Each flask in a hall rolls on its own. That rat is still somewhere else in the room's dark, and it may be any of the depth's creatures, so a room holds as many as before.",
    "Decisions: D-725. Questions closed: Q-075.",
  ] },
  { v: '0.3.177', date: '2026-11-09', title: 'Glints and the prices of looks', lines: [
    "The prices of looks are settled, and nothing in the game changes: the 13 locked looks cost 3 Glints each, 39 in all, and finishing all six Feats (36 Glints) plus your free pick buys every one, with goal Glints a small spare. Looks added later cost 3 Glints each too, and each new set comes with a new Feat, so Glints keep up.",
    "Decisions: D-724. Questions closed: Q-055.",
  ] },
  { v: '0.3.176', date: '2026-11-09', title: 'Torches, the sixth Feat', lines: [
    "The Journal's Feats tab has a sixth Feat, Torches: light 5, 25 and 100 torches, across all your journeys, for 1, 2 and 3 Glints. Torches lit before this count too. Reaching one says \"Feat reached: Torches 5. +1 Glint.\"",
    "Decisions: D-723. Questions closed: Q-057.",
  ] },
  { v: '0.3.175', date: '2026-11-09', title: 'Steps, the fifth Feat', lines: [
    "The Journal's Feats tab has a fifth Feat, Steps: walk 1000, 5000 and 20000 steps, across all your journeys, for 1, 2 and 3 Glints. Steps taken before this count too. Reaching one says \"Feat reached: Steps 1000. +1 Glint.\"",
    "On the Feats tab, a goal of a thousand or more is written short, \"4321 of 5k\", and the counts sit a little closer to the names, so Steps' row fits a phone held upright.",
    "Decisions: D-722.",
  ] },
  { v: '0.3.174', date: '2026-11-09', title: 'Rooms, the fourth Feat', lines: [
    "The Journal's Feats tab has a fourth Feat, Rooms: find 10, 50 and 200 rooms, across all your journeys, for 1, 2 and 3 Glints. Rooms found before this count too. Reaching one says \"Feat reached: Rooms 10. +1 Glint.\"",
    "Decisions: D-721.",
  ] },
  { v: '0.3.173', date: '2026-11-09', title: 'Spawned ones don\'t count', lines: [
    "Creatures and oil flasks made with the dev tools' Spawn no longer count toward your Records or Feats. Beating a spawned creature still gives experience and drops, and it is still met in the Bestiary, but its beaten count stays. Pouring a spawned flask adds nothing to Flasks poured.",
    "Decisions: D-720.",
  ] },
  { v: '0.3.172', date: '2026-11-09', title: 'The Feat note after the turn\'s line', lines: [
    "Fixed: reaching two Feats in one turn now shows both in one note, such as \"Feat reached: Beaten 10, Flasks 5. +2 Glints.\"",
    "Fixed: a Feat note no longer hides that turn's own line, such as a level-up or \"The locket kept…\". That line shows first, and the Feat note follows on your next move.",
    "Decisions: D-719.",
  ] },
  { v: '0.3.171', date: '2026-11-09', title: 'Flyers over water', lines: [
    "Bats, lampmoths and lure wisps now fly over water, cave pools and the pond alike. Walk into one hovering over water to strike it, with the rod held or not; anything it drops lands on the nearest dry ground.",
    "Decisions: D-718.",
  ] },
  { v: '0.3.170', date: '2026-11-09', title: 'The relic\'s softer glow', lines: [
    "The Lightkeeper's Locket's violet glow is now centred on the locket, not pooled below it, and softer: smaller and dimmer, on the floor and on the shelf.",
    "Decisions: D-717.",
  ] },
  { v: '0.3.169', date: '2026-11-09', title: 'The old saves\' locket', lines: [
    "Fixed: a journey saved before 0.3.143 could have no Lightkeeper's Locket if you had already been in the depth-4 room it belongs in. Load that journey now and the locket lies in that room, with its warden asleep beside it, as in a new game. If the locket is already yours, nothing changes.",
    "Behind the scenes: the record-keeping tool no longer writes the same note into the changelog archive every version.",
    "Decisions: D-716.",
  ] },
  { v: '0.3.168', date: '2026-11-09', title: 'One free pick, shown once', lines: [
    "The free pick is shown once now, not on every look: locked looks keep LOCK, and \"1 FREE PICK\" shows in gold at the top of the Look card while yours waits. Try a locked look on to see its price, or that it can be your one free pick, and press FREE to take it.",
    "The Carriage lamp and the Zebra pattern are now free for everyone. If you bought one, its Glints come back; if you took one as your free pick, the pick waits for you again.",
    "Decisions: D-715.",
  ] },
  { v: '0.3.167', date: '2026-11-08', title: 'The free pick', lines: [
    "The free pick: every profile may take one locked look free. On the Look card each locked look reads FREE in gold while the pick waits; try one on and press FREE to take it. The rest go back to LOCK.",
    "Not taken when you make a hero? It waits for Change Look. Profiles made before this version get one too.",
    "Decisions: D-714.",
  ] },
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
];
