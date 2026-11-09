# Changelog: stage 0.3, part 1 (from 0.3.0)

Moved unchanged from `CHANGELOG.md`: 0.3.0 at 0.3.18, 0.3.1 at 0.3.19, 0.3.2 at 0.3.20, 0.3.3 and 0.3.4 at 0.3.21, 0.3.5 and 0.3.6 at 0.3.22, 0.3.7 at 0.3.23, 0.3.8 at 0.3.24, 0.3.9 at 0.3.26, 0.3.10 at 0.3.27, 0.3.11 at 0.3.28, 0.3.12 at 0.3.29, 0.3.13 at 0.3.30, 0.3.14 and 0.3.15 at 0.3.31 (the 8 KB cap), and 0.3.16 to 0.3.28 at 0.3.32, the eighth audit (D-570).
From 0.3.33 on, `tools/release.js` moves each version here once 3 newer ones are in `CHANGELOG.md` (D-572).
Newest first. Grep for a version; never read this whole.

## 0.3.212 (2026-11-09)
- Loose stones now lie in the mountain rooms: 2 in each, on the grass, looking like the stone in your bag. Walk onto one to take it, and it grows back a day after you pick it. The woods rooms have none.
- In a saved game, mountain rooms you haven't seen yet get their stones too; rooms you have seen stay as they were.
- Decisions: D-761.

## 0.3.211 (2026-11-09)
- Oilcaps now grow outside: one in each woods room, home too, at the foot of a tree. The mountain rooms have none. Walk onto it to take it, as in the caves, and it grows back a day after you pick it.
- In a saved game, woods rooms you haven't seen yet get their oilcap too; rooms you have seen stay as they were.
- Decisions: D-760. Questions opened: Q-092.

## 0.3.210 (2026-11-09)
- Waking from sleeping out now leaves you stiff for 20 turns: "You wake on the cold ground, stiff." While stiff, 1 swing in 3 at a creature misses, "Your stiff arm swings wide.", and the turn still passes.
- Stiff shows as a pale blue Zz beside the poisoned drop under your hearts. Tap it to see the turns left. A fall ends it.
- Decisions: D-759.

## 0.3.209 (2026-11-09)
- Outside at night, with no creature after you, a moon button now shows above the lantern. Tap it and a card asks Sleep here until morning? Yes sleeps until the next morning, and the lantern burns no oil while you sleep.
- Sleeping on the ground isn't a bed: you wake with the hearts you lay down with, no healing and no gold heart.
- Decisions: D-758. Questions opened: Q-091.

## 0.3.208 (2026-11-09)
- A campfire now stands in one of the 8 surface rooms round home, the seed picking the room and how lit it is: blazing, low embers or cold ashes. Bump it to read what it says, a sentence a bump.
- A burning campfire lights the dark round it at night, blazing as far as a torch, embers a little less.
- Bump cold ashes and a card asks Light the fire? Yes lights it into embers with one turn of your lantern's oil; with an empty lantern Yes is grey.
- Decisions: D-757. Questions closed: Q-090.

## 0.3.207 (2026-11-09)
- The woods round home now differ: each of the 5 rooms is thick woods, the woods as before, or an open glade, the seed picking, with at least one thick room and one glade every journey. Home stays as it was.
- In a saved game, a woods room you have already been to stays as it is; one you have never seen grows as its new kind.
- Decisions: D-756. Questions opened: Q-090.

## 0.3.206 (2026-11-09)
- Once you have found the way down, a few dust motes now stay in the lantern light, each wandering its own slow way: 3 in the crypt and earth, 2 in grey rock and the dungeon, none under the sky.
- Decisions: D-755.

## 0.3.205 (2026-11-09)
- With Waymark, when the nearest stairs down are too far to fit on the round map, a violet dot now sits on its rim, pointing toward them. It pulses as the map's marks do, and counts stairs you have already found too.
- Decisions: D-754.

## 0.3.204 (2026-11-09)
- The home waystone now stands in the room with the cave mouth, the crypt's door, 2 tiles north of the room's middle, as it stood in the middle room. Where it stood in the middle room is grass now.
- A boon now lasts until you are back in the waystone's room, however you come: up from the crypt, by waystone or through the woods. The middle room no longer ends it.
- Find the waystone shows on reaching its room, and in a journey begun in the south woods it says "Old standing stones, by the crypt's door."
- In a saved game the waystone moves there too, still awake if you woke it. Anything you set down where it stood stays.
- Decisions: D-753.

## 0.3.203 (2026-11-09)
- A new goal, Put out your lantern: "Tap the lantern, or press L, to save oil." It shows the first time daylight comes while your lantern is lit, stepping out of the dark or at dawn, and goes ahead of any other goal while the lantern burns in daylight. Putting it out does it and pays its reward. If the lantern was already out, as By itself does, it is ticked quietly. It never shows again.
- Decisions: D-752.

## 0.3.202 (2026-11-09)
- The trees outside vary now: bigger and smaller, a little out of line, in three greens (the old green, a deep blue-green and a warm olive), with neighbouring trees sharing a green so the woods shift colour in patches. Walking and cutting are unchanged.
- Docs only: your next four ideas are planned, one step each: a tip to put the lantern out in daylight, the home waystone beside the crypt's door, a Waymark dot on the round map's rim, and motes that stay once the way down is found.
- Decisions: D-750, D-751.

## 0.3.201 (2026-11-09)
- The grass outside is calmer: the same three greens in big soft patches, mostly the middle green, with fewer pale blades. No more camouflage look.
- Decisions: D-749.

## 0.3.200 (2026-11-09)
- Ponds outside are rounder and smooth-edged, halfway between their old shape and a round one: no more star shapes or dripping rims. The same tiles are water; cave pools are unchanged.
- Decisions: D-748.

## 0.3.199 (2026-11-09)
- The mountain rock outside has smooth, natural edges: no more torn outlines, loose pixels or spikes. Shapes, colours and walking are unchanged.
- Decisions: D-747.

## 0.3.198 (2026-11-09)
- A new goal, Find the crypt: once you take a boon, the Quests tab sends you through the broken door beside home, and walking in pays a reward.
- Decisions: D-746.

## 0.3.197 (2026-11-09)
- The way into the crypt is now a crypt's door: the broken seal, a bricked-up doorway with a hole broken through it and fallen bricks on the grass, on every edge.
- The small arch and the craggy cave are kept for later cave mouths; the overgrown mouth waits with them.
- Decisions: D-745.

## 0.3.196 (2026-11-09)
- A new look for the cave mouth: a craggy cave, wide and black, with teeth of rock hanging from its top. The seed picks it or the small arch, so worlds differ.
- On a side or bottom edge, the rock roofs over the craggy cave and the ground dives black beneath it. A few pebbles lie at the rocks' feet. Walking is unchanged.
- Decisions: D-744. New question: Q-089, falling down holes.

## 0.3.195 (2026-11-09)
- Words no longer run past the edge of a card. On a phone held upright, a quest's how wraps onto more lines, and a done goal's reward sits under it.
- A Journal list longer than its card scrolls, with a thin bar at its right: swipe, the mouse wheel, or Up and Down. Upright, the Bestiary is one table instead of two squeezed together.
- The goal line under the hearts wraps so the round map no longer covers its end. In the stash chest, a long name stays clear of STORE.
- A new test draws every card at upright and sideways phone sizes with everything in the game, so words that don't fit are caught before they reach a phone.
- Decisions: D-743.

## 0.3.194 (2026-11-09)
- Every bug the twelfth audit found is fixed. A berry bush or fallen branch no longer blocks a path between woods rooms.
- Journeys begun before the mountain rooms now get mountain rooms in the north row they haven't visited, and the dev Reset at home no longer brings back the old cave mouth.
- Goals done on the same turn each roll their own reward. On a South woods journey, an older profile's "Go home to the woods" is ticked quietly instead of showing crypt directions.
- A pool no longer hints that a room's flask is unguarded, and rat packs no longer tell where a flask mimic stands. A spit grub's glob flies over a pile of bones, and a scorpion lowers its tail when you come back into its room.
- Decisions: D-742.

## 0.3.193 (2026-11-09)
- The playbook of how we work is caught up with the whole project so far: how the game grew in stages, our tools, what bugs taught us and the design habits, in a new second page, WORKFLOW-2.md. Nothing in the game changes.
- From now on, a step that teaches something about working together adds a line to the playbook as it goes; each audit sorts the lines into place.
- Decisions: D-741.

## 0.3.192 (2026-11-09)
- The twelfth audit. Nothing in the game changes. The Version history's newest file is split again, word for word: 0.3.76 to 0.3.150 move to history-0.3-2.js.
- Docs: finished decisions and the ticked plan steps moved to the archive, word for word, so a conversation starts by reading less. The start-up check now names the copy it brought up to date. A bug hunt's findings are listed for the owner. The playbook of how we work gains what this stretch taught. The next audit is at 0.3.232.
- Decisions: D-740. D-699 and D-734 to D-737 moved to the archive, word for word.

## 0.3.191 (2026-11-09)
- The rock on the surface is rounded now, as the cave walls are, but lit by day: a sunlit grey top in place of the near-black squares. Rocks in the mountain rooms are fuller lumps, trees stand in front of them, and the two rocks beside the cave mouth are rounded too.
- Past a mountain room's edge the rock goes on, with a grass path leading out to each room beside it, where trees stood before.
- Decisions: D-739.

## 0.3.190 (2026-11-09)
- The three rooms along the north of Hearthwood are mountain rooms now: rocky slopes of grass, rock standing where the trees would be, with a few lone trees. Each has 3 grey boulders to break for stone, as in the caves, and its own sticks and fallen branch, but no pond or bush. On the map, rock on the surface shows grey. If you have already been to one of these rooms, it stays woods.
- Decisions: D-738.

## 0.3.189 (2026-11-09)
- Where you wake after a fall: beside the last bed you slept in, on the spot you lay down from (or the nearest free spot beside the bed). With no bed, on the home waystone once it is woken; no boon is offered until you step off and back on. Otherwise, where the journey began. Taking the bed down forgets it until you sleep in it again. Hardcore still begins the world again.
- Decisions: D-737.

## 0.3.188 (2026-11-09)
- A new goal, Light your lantern: "Tap the lantern, or press L." It shows when the dark comes, halfway through dusk in the woods or on stepping somewhere the sky doesn't reach, with the lantern off, and goes ahead of any other goal while it is dark. Lighting the lantern, by hand or By itself, does it and pays its reward. If your lantern was already lit, it is ticked quietly.
- Decisions: D-736.

## 0.3.187 (2026-11-09)
- A new journey begins in the woods now, not the crypt: in one of the rooms along the south of Hearthwood, never the one with the cave mouth, standing near the middle of the room. It is day, so your lantern starts off. The first words say so: "You wake among the trees of Hearthwood. Your lantern is cold; keep its oil for the dark. Something waits below." Your first goal is Find the waystone: "Home is in the middle of the woods." Go home to the woods is no longer asked. If you fall, you wake where the journey began, until beds and the waystone come in.
- Decisions: D-735. Questions closed: Q-087. Questions opened: Q-088. D-727 and D-728 moved to the archive, word for word.

## 0.3.186 (2026-11-09)
- The woods are bigger: nine rooms of woods in a 3 by 3 square, home in the middle. Each room has a path three tiles wide through the trees to every room beside it, so you can walk any way. Home keeps its trees and everything you set down. The cave mouth has moved out of home into the room beside it, on that room's far side, so the way into the crypt is one room further. Every woods room has its own sticks, branch, pond and gloamberry bush; only home has the waystone. The map shows the nine rooms as you find them.
- Decisions: D-734. Questions opened: Q-087. D-705 and D-706 moved to the archive, word for word.

## 0.3.185 (2026-11-09)
- Nothing in the game changed. The plan for a bigger surface: the woods grow to nine rooms, with mountains along the north, home in the middle and the cave in a room beside it. A new journey will begin in a woods room to the south, and you walk north to find home. After a fall you will wake in the last bed you slept in, or at the home waystone once woken, or else where the journey began. Some woods will be thick, some open glades. Five small steps, the nine rooms first.
- Decisions: D-733. Questions closed: Q-081. D-712 and D-713 moved to the archive, word for word.

## 0.3.184 (2026-11-09)
- Nothing in the game changed. A new page for the makers, How we work: the way the owner and Claude build Gloamdeep together, why each habit exists, what changed along the way, and how to start a new project from it. Each audit will add to it.
- Decisions: D-732.

## 0.3.183 (2026-11-09)
- The bone rat comes back. Beaten, it falls into a low pile of bones, its skull on top, and three turns later it stands up again, whole. Small pink dots over the pile count the turns down, 3, 2, 1, and on the last one "The bones stir." Step onto the pile before then to scatter the bones for good. Only then is it beaten: its Rat Bone, its Beaten count and its experience come from the scatter. The dots hide with Attack marks Off.
- Decisions: D-731.

## 0.3.182 (2026-11-09)
- The scorpion now strikes with its tail. It never bites beside you. Once you are in line with it, up to two tiles away, it stops and raises its tail for a turn, and both tiles ahead are marked. On its next turn it strikes them: two hearts if you are still there. Step out of its line and the sting hits bare floor, then it stands still a turn, open to your blow. One blow of anything still kills it.
- A new switch in Settings, Attack marks, after Flasks. It starts On. Turn it Off and no creature's next move shows: no arrows, fangs, glob arrows or strike marks, on the room or on the creature list. You read the creatures by watching them and their lines.
- Decisions: D-729, D-730.

## 0.3.181 (2026-11-09)
- Rats now hunt in packs. From depth 3, in about 1 room in 3, the rat by the flask has two packmates beside it. Once one of them sees you, all three come, and each heads for its own side of you to surround you. While two of a pack are left, a hurt rat stands its ground; the last one may still run. A rat on its own acts as before. The rat's Bestiary page says so.
- Decisions: D-727, D-728.

## 0.3.180 (2026-11-09)
- Creatures no longer walk around things lying on the floor. They step right over them, and the find stays where it lies. Beat a creature standing on a find, and what it drops lies on that same tile, so one step picks up both.
- Decisions: D-727.

## 0.3.179 (2026-11-09)
- The mole now burrows. Once it sees you in the light, it digs down and tunnels toward you, a mound of earth moving a tile a turn. You can't hit the mound. Beside you it bursts up, and you get the first swing before it bites.
- Decisions: D-726.

## 0.3.178 (2026-11-09)
- In the rooms below the first depth, about 1 flask in 4 now has no rat waiting by it. Each flask in a hall rolls on its own. That rat is still somewhere else in the room's dark, and it may be any of the depth's creatures, so a room holds as many as before.
- Decisions: D-725. Questions closed: Q-075.

## 0.3.177 (2026-11-09)
- The prices of looks are settled, and nothing in the game changes: the 13 locked looks cost 3 Glints each, 39 in all, and finishing all six Feats (36 Glints) plus your free pick buys every one, with goal Glints a small spare. Looks added later cost 3 Glints each too, and each new set comes with a new Feat, so Glints keep up.
- Decisions: D-724. Questions closed: Q-055.

## 0.3.176 (2026-11-09)
- The Journal's Feats tab has a sixth Feat, Torches: light 5, 25 and 100 torches, across all your journeys, for 1, 2 and 3 Glints. Torches lit before this count too. Reaching one says "Feat reached: Torches 5. +1 Glint."
- Decisions: D-723. Questions closed: Q-057.

## 0.3.175 (2026-11-09)
- The Journal's Feats tab has a fifth Feat, Steps: walk 1000, 5000 and 20000 steps, across all your journeys, for 1, 2 and 3 Glints. Steps taken before this count too. Reaching one says "Feat reached: Steps 1000. +1 Glint."
- On the Feats tab, a goal of a thousand or more is written short, "4321 of 5k", and the counts sit a little closer to the names, so Steps' row fits a phone held upright.
- Decisions: D-722.

## 0.3.174 (2026-11-09)
- The Journal's Feats tab has a fourth Feat, Rooms: find 10, 50 and 200 rooms, across all your journeys, for 1, 2 and 3 Glints. Rooms found before this count too. Reaching one says "Feat reached: Rooms 10. +1 Glint."
- Decisions: D-721.

## 0.3.173 (2026-11-09)
- Creatures and oil flasks made with the dev tools' Spawn no longer count toward your Records or Feats. Beating a spawned creature still gives experience and drops, and it is still met in the Bestiary, but its beaten count stays. Pouring a spawned flask adds nothing to Flasks poured.
- Decisions: D-720.

## 0.3.172 (2026-11-09)
- Fixed: reaching two Feats in one turn now shows both in one note, such as "Feat reached: Beaten 10, Flasks 5. +2 Glints."
- Fixed: a Feat note no longer hides that turn's own line, such as a level-up or "The locket kept…". That line shows first, and the Feat note follows on your next move.
- Decisions: D-719.

## 0.3.171 (2026-11-09)
- Bats, lampmoths and lure wisps now fly over water, cave pools and the pond alike. Walk into one hovering over water to strike it, with the rod held or not; anything it drops lands on the nearest dry ground.
- Decisions: D-718.

## 0.3.170 (2026-11-09)
- The Lightkeeper's Locket's violet glow is now centred on the locket, not pooled below it, and softer: smaller and dimmer, on the floor and on the shelf.
- Decisions: D-717.

## 0.3.169 (2026-11-09)
- Fixed: a journey saved before 0.3.143 could have no Lightkeeper's Locket if you had already been in the depth-4 room it belongs in. Load that journey now and the locket lies in that room, with its warden asleep beside it, as in a new game. If the locket is already yours, nothing changes.
- Behind the scenes: the record-keeping tool no longer writes the same note into the changelog archive every version.
- Decisions: D-716.

## 0.3.168 (2026-11-09)
- The free pick is shown once now, not on every look: locked looks keep LOCK, and "1 FREE PICK" shows in gold at the top of the Look card while yours waits. Try a locked look on to see its price, or that it can be your one free pick, and press FREE to take it.
- The Carriage lamp and the Zebra pattern are now free for everyone. If you bought one, its Glints come back; if you took one as your free pick, the pick waits for you again.
- Decisions: D-715.

## 0.3.167 (2026-11-08)
- The free pick: every profile may take one locked look free. On the Look card each locked look reads FREE in gold while the pick waits; try one on and press FREE to take it. The rest go back to LOCK.
- Not taken when you make a hero? It waits for Change Look. Profiles made before this version get one too.
- Decisions: D-714.

## 0.3.166 (2026-11-08)
- The sixth teaching goal: at level 2, "Spend your ember" and "Tap here, then Growth." show under the hearts panel, ahead of any other goal waiting. Buy a heart or Tough in the Journal's Growth tab and the goal turns gold with its reward once you close the Journal.
- If you have already spent an ember on this journey, the goal is ticked quietly and pays its reward.
- Fixed: 0.3.165 stopped the game from starting (a stray bracket); a new test now checks every code file for such typos.
- Decisions: D-713.

## 0.3.165 (2026-11-08)
- The boons card: the first time you pick a boon, a glass card says what boons are, with Go to carry on. It shows only once.
- In the Journal's Quests tab, tap the done "Take a boon" (or press Enter there) to read the card again; Go goes back to the Journal.
- Decisions: D-712.

## 0.3.164 (2026-11-08)
- The fifth teaching goal: step off the woken waystone's plate without ever having held a boon, and "Take a boon" and "Step back on the plate. Pick 1 of 3." show under the hearts panel. Pick a boon and the goal turns gold with its reward; closing the card with its cross leaves the goal waiting.
- If you have held a boon since this version, or hold one now, the goal is ticked quietly and pays its reward.
- Decisions: D-711.

## 0.3.163 (2026-11-08)
- The fourth teaching goal: once the waystone is found, "Wake the waystone" and "Step on the plate in its middle." show under the hearts panel. Step on the plate to wake it and the goal turns gold with its reward.
- If you have already woken the waystone's plate, the goal is ticked quietly and pays its reward.
- Decisions: D-710.

## 0.3.162 (2026-11-08)
- The third teaching goal: on reaching the woods, "Find the waystone" and "Old standing stones, near home." show under the hearts panel. Walk within 4 tiles of the stone and it turns gold with its reward.
- If you have already woken the waystone's plate, the goal is ticked quietly and pays its reward.
- Decisions: D-709.

## 0.3.161 (2026-11-08)
- The second teaching goal: once "Beat a rat" is done, "Go home to the woods" shows under the hearts panel. Deeper down it says "Take the stairs up to the crypt.", in the crypt "Leave by the gap in the crypt wall." Reach the woods and it turns gold with its reward, rolled as the rat's is.
- If you have already been to the woods this journey, the goal is ticked quietly and pays its reward.
- Decisions: D-708.

## 0.3.160 (2026-11-08)
- The first teaching goal: once you see a rat, "Beat a rat" and "Walk into it to strike." show under the hearts panel. Beat one and the line turns gold for 3 turns with what it paid, rolled from an oil flask, 2 healing herbs, 3 oilcaps, a Glint or a healing potion. A find that doesn't fit your bag is set at your feet.
- The Journal has a fifth tab, Quests, listing each goal, the done ones with their reward. Tapping the goal line opens it. A rat beaten before this version ticks the goal quietly and pays its reward.
- Decisions: D-707.

## 0.3.159 (2026-11-08)
- Nothing in the game changed. The first six teaching goals now have their words, each a goal and one line saying how, such as "Beat a rat" and "Walk into it to strike." Each appears at its own moment: going home once a rat is beaten, spending your ember as soon as you reach level 2.
- The goal will sit under the hearts panel and open the Journal when tapped. Done, it turns gold and says what it paid, rolled from an oil flask, herbs, oilcaps, a Glint or a potion. The first boon you pick will open a card saying what boons are.
- Decisions: D-706. Questions closed: Q-087.

## 0.3.158 (2026-11-08)
- Nothing in the game changed. A teaching map lists every system, where you first meet it and what tells you how it works. Five are never explained: fighting, embers and Growth, going home to the woods, the waystone, and the Journal.
- Teaching goals are planned for those five, one at a time, each appearing when it helps, such as "beat a rat" once you see one. They will live in a Quests tab in the Journal, and each pays a reward rolled from a short list.
- Decisions: D-705. Questions opened: Q-087.

## 0.3.157 (2026-11-08)
- More hats and hoods: Horned (the hood with two curled horns, always bone white), Pointed (a tall pointed hat), Bobble (a knitted cap), Circlet (a thin band across the brow) and Scarf (a cloth tied round the head) join the HEAD tab, 3 Glints each.
- Brim, Ears and the Hood are now free from the start. Brim is all in your TRIM's colours now, not just its band. If you bought Brim or Ears, their Glints come back to you.
- Decisions: D-704.

## 0.3.156 (2026-11-08)
- Hats and hoods: the Look card has a sixth tab, HEAD. Three join the hood: Brim, a wanderer's wide hat; Ears, the hood with two pointed ears; and Helm, a round metal cap with a nose guard.
- Each costs 3 Glints, bought with BUY as a cloak pattern is. Brim and Ears take your CLOAK's colours, and Helm and Brim's band your TRIM's. The face, eyes, clothes and lamp stay as they are.
- The six tabs sit in one row where they fit, and in two rows of three on narrow screens.
- Decisions: D-703.

## 0.3.155 (2026-11-08)
- Lantern looks: the Look card has a fifth tab, LAMP, for the lantern's shape. Three shapes join the lantern: Carriage, with a wide roof and foot; Dish, a bare flame on a dish; and Pierced, dark tin with light through its holes.
- Each new shape costs 3 Glints, bought with BUY as a cloak pattern is, and takes your TRIM's colours. The flame and its light stay the same, and so does the lantern button.
- Where the card is narrow, the five tabs sit in two rows. On the smallest screens, three rows of choices show at once and the rest scroll.
- Decisions: D-702.

## 0.3.154 (2026-11-08)
- The Look card's choices can now scroll, ready for many more cloaks, eye colours, lantern looks and clothes. Up to four rows show at once; when a tab has more, a swipe up or down, or the mouse wheel, moves them a row, and the arrow keys bring the next row into view.
- A thin bar at the right of the boxes, with a gold part, shows where you are in a long tab. Today every tab still fits in four rows, so nothing looks different yet.
- Decisions: D-701.

## 0.3.153 (2026-11-08)
- Three more cloak patterns on the Look card: Tiger (rust with dark stripes), Stars (night indigo with specks) and Moth (sand with two eyespots), 3 Glints each. The six patterns now cost 18 Glints, what the three Feats pay.
- They are the Cloak tab's fourth row, so the Look card is a row taller on every tab. On the smallest upright screen the little boxes drop their names to fit; the name still shows under the big hero.
- Trying on a pattern, its price now shows in the line under the big hero ("Tiger: 3 Glints. You have 4."), so it no longer covers the boxes.
- Decisions: D-700.

## 0.3.152 (2026-11-08)
- The eleventh audit. Nothing in the game changes. The Version history's newest file is split in two, word for word: 0.3.0 to 0.3.75 move to history-0.3-1.js.
- Docs: finished decisions moved to the archive; parts of OPEN-QUESTIONS.md, TECH.md and PROGRESS.md moved word for word to OPEN-QUESTIONS-2.md, TECH-2.md and RESEARCH-2.md, so a conversation starts by reading less. A bug hunt's findings are listed for the owner. The next audit is at 0.3.192.
- Decisions: D-699. D-660 and D-689 to D-694 moved to the archive, word for word.

## 0.3.151 (2026-11-08)
- A third Feat, Flasks: pour 5, 25 and 100 flasks for 1, 2 and 3 Glints. Its row on the Feats tab shows "2 of 5" and its 3 marks; Records still says Flasks poured.
- Reaching a tier says so: "Feat reached: Flasks 5. +1 Glint." Flasks poured before count too.
- All three Feats now pay 18 Glints. New looks to spend them on come in later steps.
- Decisions: D-698. D-688 moved to the archive, word for word.

## 0.3.150 (2026-11-08)
- A second Feat, Deepest: reach depth 5, 10 and 20 for 1, 2 and 3 Glints. Its row on the Feats tab shows "3 of 5" and its 3 marks.
- Reaching a tier says so: "Feat reached: Deepest 5. +1 Glint." Depths walked to before count too.
- Decisions: D-697. D-659 moved to the archive, word for word.

## 0.3.149 (2026-11-08)
- Cloak patterns can be bought. On the Look card, tap Zebra, Cow or Camo to try it on, and RANDOM becomes BUY 3. Press it to spend 3 Glints: the pattern is yours, worn at once.
- The note under the patterns says the price and your Glints: "Zebra costs 3 Glints. You have 4." With too few it adds "Earn more from Feats.", and BUY is dim and does nothing.
- A bought pattern is that hero's for good. It loses its LOCK, and RANDOM can roll it.
- The Feats tab's gold number is now the Glints you have left to spend.
- Decisions: D-696. D-687 moved to the archive, word for word.

## 0.3.148 (2026-11-08)
- The Journal has a fourth tab, Feats, after the Bestiary. A Feat is one record's set of 3 tiers, and each tier you reach pays Glints, the money for looks.
- The first Feat is Beaten: 10, 50 and 200 creatures, paying 1, 2 and 3 Glints. The tab shows your Glints in gold at the top, then Beaten with your count toward the next tier, such as 12 of 50, and 3 small marks that turn gold as you reach them.
- Creatures beaten before now count too. Reaching a tier says so: "Feat reached: Beaten 10. +1 Glint."
- On an upright phone the Journal's tabs sit in two rows, Records and Growth over Bestiary and Feats. Right from the Bestiary turns to Feats.
- Buying a cloak pattern with Glints, 3 each, comes at the next step.
- Decisions: D-695. D-686 moved to the archive, word for word.

## 0.3.147 (2026-11-08)
- The Lightkeeper's Locket works on the shelf. In Normal, with the locket on a shelf, a fall brings home one stack from your bag: the one the peddler would pay most for in all, his price times how many. 3 Venom Sacs beat 1 Mimic Heart.
- A tie goes to the stack first in your bag. With nothing in the bag he buys, nothing is kept. The rest stays in the bag where you fell, as before.
- You wake with it in your bag, and the line says so: "The locket kept Venom Sac ×3."
- Decisions: D-694. D-685 moved to the archive, word for word.

## 0.3.146 (2026-11-08)
- The Lightkeeper's Locket can go on the shelf. Bump the shelf with the locket in your bag and it asks "Set the locket on the shelf?" Yes sets it there in a turn: "You set the locket on the shelf." It stays there for good.
- The shelf shows it: the locket small and open on its top shelf, in the relics' violet glow, with a glint now and then. At night the glow shows from across the surface.
- Bumped then, the shelf asks "Deconstruct shelf?" with "The locket rests here." Yes puts the shelf and the locket back in your bag together; with no room for both, your bag is full and both stay.
- What the locket does there, on a fall, comes at the next step.
- Decisions: D-693. D-683 and D-684 moved to the archive, word for word.

## 0.3.145 (2026-11-08)
- The Lightkeeper's Locket has its new look: open on its hinge, a gold case with a violet hollow and a tiny flame burning inside. The flame scratched on its lid is violet now.
- Relics have their own glow: a violet halo that slowly swells and fades, seen even in the dark, though it lights nothing. Now and then a glint slides along the locket's edge. With reduced motion the glow holds steady and there is no glint.
- Decisions: D-692.

## 0.3.144 (2026-11-08)
- A new creature guards the Lightkeeper's Locket in place of the rat: the warden, an old stone guard made by Underhearth's people to guard their things. Cracked and mossy, with a chipped gold band and an eye slit.
- It stands asleep as a statue, its eye dull, until you bump it. Then its eye lights violet and it chases you for 6 turns, and stands still again. It has 4 health and bites for 1 heart: four lantern swings or two knife blows.
- It is seen as it is, never in disguise, so the Bestiary meets it on sight. It turns up only beside the locket.
- Decisions: D-692. D-681 and D-682 moved to the archive, word for word.

## 0.3.143 (2026-11-08)
- Biome 1's first relic, the Lightkeeper's Locket: a tarnished brass oval on a thin chain, a tiny flame scratched on its face. "Kept close, whatever the dark took."
- One lies in each world, in a room at depth 4 (never the one with the stairs up), in the room's far corner with a rat beside it guarding it. It is left once and never comes back.
- Step on it to put it in your bag; you carry one. It can't be sold. Setting it on the shelf, and what it does there, come at the next steps.
- Decisions: D-691. D-679 and D-680 moved to the archive, word for word.

## 0.3.142 (2026-11-08)
- Make a Shelf at the workbench, its last slot, from 4 Wood and 2 Stone: a tall wooden case with two empty shelves. You carry one at a time.
- Set it down on the surface as you do the bed. Relics will rest on it at later steps; for now it stands empty.
- Bump it and it asks "Deconstruct shelf?" with "Nothing on it yet." Yes puts it back in your bag.
- Decisions: D-690. D-678 moved to the archive, word for word.

## 0.3.141 (2026-11-08)
- Relics are planned: rare things from the old city under the ground, found in hidden spots and guarded rooms, never made. Each one helps you set out or softens a fall, and every relic found works once it sits on a shelf at home. The shelf comes first, then the first relic, which keeps one find on a fall. Nothing in play changes yet.
- Decisions: D-689. D-676 and D-677 moved to the archive, word for word.

## 0.3.140 (2026-11-08)
- A new creature, the spit grub: a plump pale glowworm with a glowing green tail, drawn side on. It turns up from depth 4, never moves, and its faint green glow shows even in the dark. It has 1 heart, so one blow of anything ends it.
- When it sees your lit lantern down a clear row or column, up to 5 tiles away, it spits a glowing glob. The glob flies 1 tile a turn, so you can step out of its way, and the grub then rests 2 turns: rush it then.
- A glob hits whatever it meets for 1, you or another creature, and breaks on walls and rubble. Standing right beside the grub, it hits you at once. With your lantern off, the grub can't see you.
- The grub's next move shows as a small glob mark, and every glob in flight shows where it goes next.
- A beaten spit grub leaves a Grub Skin about 1 time in 2, sold for 1, and now and then a rare Glow Gland, sold for 5.
- Decisions: D-688. D-675 moved to the archive, word for word.

## 0.3.139 (2026-11-07)
- With reduced motion on, the room in play is drawn once and kept until something in it changes, as under a card, so a phone does much less work and saves battery. Play looks and feels the same.
- Decisions: D-687. D-674 moved to the archive, word for word.

## 0.3.138 (2026-11-07)
- Under a card (the bag, pause, the map and the rest), the room behind it holds still instead of being drawn again 60 times a second, so a phone does much less work and saves battery. Its torches stop flickering until the card closes; the card itself moves as before.
- Decisions: D-686. D-673 moved to the archive, word for word.

## 0.3.137 (2026-11-07)
- A cave room's rock and earth are painted in about half the time, so the pause on reaching depth 2 is shorter. The picture is the same, pixel for pixel.
- Decisions: D-685. D-672 moved to the archive, word for word.

## 0.3.136 (2026-11-07)
- At home, the peddler no longer says "Let me unpack. I'll have wares soon." while his card shows his wares. His two other home lines take turns, as before.
- Decisions: D-684. D-671 moved to the archive, word for word.

## 0.3.135 (2026-11-07)
- On the name pad, Space does nothing, so a name is no longer cut short and made at the space: typing "ANNA MAE" made "ANNA". Enter still presses the lit key. Names stay A to Z.
- Decisions: D-683. D-670 moved to the archive, word for word.

## 0.3.134 (2026-11-07)
- On a phone 320 px wide, the dev wrench stands under the pause button, so the hearts and oil panel no longer runs into it from level 10. Wider screens are unchanged.
- Decisions: D-682. D-669 moved to the archive, word for word.

## 0.3.133 (2026-11-07)
- On a tablet held upright, a card open in play is drawn a size smaller, so the bag's words fit above Drop and Wear with a 9 or 12 slot bag. Before, they ran over the buttons. Phones are unchanged.
- Decisions: D-681. D-668 moved to the archive, word for word.

## 0.3.132 (2026-11-07)
- A press of Eat, Pour, Craft or Hold in the bag, or Make at the bench, happens at once, even while the hero is still sliding or the stairs are fading. Before, it waited until the card closed.
- Decisions: D-680. D-667 moved to the archive, word for word.

## 0.3.131 (2026-11-07)
- A creature's drops, mined finds that don't fit in the bag and berries picked from the garden bed never land under a creature or a person: they go to the next open tile, or where they came from when none is left. Before, a rare drop could lie hidden under another creature.
- Decisions: D-679. D-665 and D-666 moved to the archive, word for word.

## 0.3.130 (2026-11-07)
- Once the trapped peddler is free, digging another heap of rubble beside him is plain digging: the rubble's own lines, and he still leaves when he meant to. Before, he cheered the digging on and was freed a second time, thanking you again and waiting 5 more turns.
- Decisions: D-678. D-664 moved to the archive, word for word.

## 0.3.129 (2026-11-07)
- Nine materials with recipes, from Stone and Copper Ore to the Mimic Heart, now say "good for making things" when chosen in the bag, not "for crafting later". The eleven no recipe uses yet still say "for crafting later".
- Decisions: D-677. D-663 moved to the archive, word for word.

## 0.3.128 (2026-11-07)
- Three small notes are brought up to date: the code layout lists the maker and the map preview's page, the dev tools' Go to depth runs from 0, the crypt, and the Lure Wisp is listed as built. Nothing in the game changes.
- Decisions: D-676. D-662 moved to the archive, word for word.

## 0.3.127 (2026-11-07)
- The glossary is brought up to date: armour, charms, lantern parts, planting, the waystones on deeper floors, the Bestiary tab and Stone's crafts are described as they are in the game, not as to come. Nothing in the game changes.
- Decisions: D-675. D-661 moved to the archive, word for word.

## 0.3.126 (2026-11-07)
- The notes on the peddler's prices are brought up to date: each find sells at its own price, 1 coin for most common materials, 2 for Wisp Glass and 5 for a rare one. Nothing in the game changes.
- Decisions: D-674.

## 0.3.125 (2026-11-07)
- The world's notes are brought up to date: past every edge is plain dark, and floors under the crypt have 6 to 13 rooms made of cells, with halls and large rooms, going on below depth 8. Nothing in the game changes.
- Decisions: D-673. D-658 moved to the archive, word for word.

## 0.3.124 (2026-11-07)
- When an old save from before the bigger floors is brought up to date, a deep waystone you had woken stays woken, so you can still travel to it. Before, every deep waystone went back to sleep. Saves already brought up to date stay as they are.
- Decisions: D-672. D-657 moved to the archive, word for word.

## 0.3.123 (2026-11-07)
- On a tablet held sideways or a near-square PC window, the cards in play (the bag, pause menu, Journal, workbench, stash chest and peddler) are now drawn a little smaller, so everything fits on the card as it does on a phone held sideways. Before, words and boxes ran past the card's edge. Play itself keeps its size, and phones look the same as before.
- Decisions: D-671. Questions closed: Q-064. D-656 moved to the archive, word for word.

## 0.3.122 (2026-11-07)
- With a screen reader, opening the bag, the map or the pause menu while a message is showing now reads the card's own words. Before, a moment later the message took their place. A message said while the card is open is still read out.
- Decisions: D-670. D-655 moved to the archive, word for word.

## 0.3.121 (2026-11-07)
- Holding Space on the title, a menu or a card now picks only once, as Enter does. Before, it kept picking: from the title it ran straight into a new journey, and in Settings and the bag it kept flipping switches and pouring flasks. Holding Space in play still waits turn after turn.
- Decisions: D-669. D-654 moved to the archive, word for word.

## 0.3.120 (2026-11-07)
- The trapped peddler calls for help again the first time you dig at his rubble. Before, the cave walls round him counted as dug-out heaps, so in most journeys he went straight to "Keep digging!".
- Decisions: D-668.

## 0.3.119 (2026-11-07)
- Falling with the fishing line out now reels it in. Before, the float stayed on the water and fish kept biting it after you woke, even from across the room.
- Decisions: D-667.

## 0.3.118 (2026-11-07)
- After you take the Stone Pick or the Wooden Rod off, Make no longer makes a second one: it says you already carry one, and nothing is used up.
- Wearing a charm or vest that is the same as one you already wear now says "You already have …" and changes nothing, so two Heart Charms can't stretch the oil. Two different charms are still worn together.
- Decisions: D-666.

## 0.3.117 (2026-11-07)
- When an old save first gets its home waystone, only sticks on the stone itself are cleared away, as decided. A stick or anything you dropped on the tiles round the stone stays where it was.
- The version shown at the top of the progress notes is set by the release tool now, so it no longer falls behind.
- Decisions: D-664, D-665.

## 0.3.116 (2026-11-07)
- A bite glancing off your vest no longer makes the next kill from that tile always drop its part. The glance rolls dice of its own, so drops come about 1 time in 2, as decided. What each seed drops is unchanged; only which bites glance changes.
- Decisions: D-663.

## 0.3.115 (2026-11-07)
- A flask or herb mimic waking no longer rings the waystone's bells or starts its rune glowing. It wakes silently, as decided. The waystone still rings when it wakes.
- Decisions: D-662.

## 0.3.114 (2026-11-07)
- A slow tap works on every menu and card. Before, a press held a quarter of a second or longer did nothing off play, so a slow, careful tap on a phone was lost. In play, holding still walks as before.
- Decisions: D-661.

## 0.3.113 (2026-11-07)
- The tenth audit, part 1. Nothing in play changes. New floors are worked out about 5 times faster, the same floors as before, and the tests run in 35 seconds, not 59.
- Behind the scenes: touch in play has its own file; two long pages and five decisions moved to their own files, word for word. Four bug hunts, a docs read-through and a phone speed check found 19 bugs, some stale doc lines and one freeze, for you to pick fixes from.
- Decisions: D-660. D-648 to D-651 and D-653 moved to the archive, word for word.

## 0.3.112 (2026-11-07)
- Docs only: the first creature that attacks from range is chosen, the Spit grub. It never moves, and spits a glowing glob at your lit lantern that moves 1 tile a turn, so you can step aside; walls and rubble stop it, and with the lantern off it can't see you. Nothing in play changes yet.
- Decisions: D-659. D-647 moved to the archive, word for word.

## 0.3.111 (2026-11-07)
- Docs only: ideas from a review of the whole game are kept for later, among them shots you can see coming, sounds from the dark, torches that stay lit and a card when you fall. Nothing in play changes.
- Decisions: D-658.

## 0.3.110 (2026-11-07)
- Tough is on the Growth tree: in the Journal's Growth tab, Body now holds two places in its first row, Heart and Tough above it. Tough costs 1 ember and is bought once.
- With Tough, a bite that hurts poisons you only about 1 time in 2, by the journey's dice. When it does, poison runs as before.
- Tough's place shows poisoned's drop, grey until bought and pale green after. On a small sideways screen the tree draws a little closer so it fits under the tabs.
- Decisions: D-657.

## 0.3.109 (2026-11-07)
- Nothing in the game changed yet. The Growth upgrade against poison is picked: Tough, on the Body branch, for 1 ember.
- With Tough, a bite that hurts poisons you only about 1 time in 2. The Centipede Charm still makes poison shorter, and the Antidote still ends it.
- It will sit in Body's first row, above Heart, so that row holds two places.
- Decisions: D-657. D-646 moved to the archive, word for word.

## 0.3.108 (2026-11-07)
- A new charm, the Centipede Charm: a drop of pale green venom in a copper setting. Make it at the workbench, after the rod, from 3 Centipede Leg and 1 Copper Ore. You have one at a time.
- Choose it in the bag and press Wear; no turn passes. It goes in a charm slot beside the Wisp or Heart Charm.
- While you wear it, poisoned lasts 3 turns, not 6, and takes 1 heart, not 2. A bite still poisons you, so the Antidote still helps.
- Decisions: D-656. D-645 moved to the archive, word for word.

## 0.3.107 (2026-11-07)
- The Antidote: a tall green vial. Make it in the bag from 1 Snapcap Gill and 1 herb; the gill's slot shows MAKE when you carry both.
- Drink it while poisoned and the poison ends at once. It heals nothing. When you aren't poisoned its DRINK is dim, and it stays in the bag.
- Now that the Antidote is in, poison can take your last heart, and you fall. The centipede's Bestiary page says so.
- Decisions: D-655. D-644 moved to the archive, word for word.

## 0.3.106 (2026-11-07)
- A new creature, the centipede: rust red with pale legs and green fangs, drawn side on. It turns up from depth 3, chases you once it sees you in the light, and has 2 hearts, so a knife ends it in one blow.
- Its bite takes a heart and leaves you poisoned. Poisoned lasts 6 turns and takes a heart every 3 turns, 2 in all. Another bite starts it again; it never stacks. Until the Antidote is in, poison never takes your last heart.
- While you are poisoned, a green drop shows beside the boon's mark; tap it to see the turns left. Each heart poison takes flashes green on the panel, and a line says when it wears off.
- A beaten centipede leaves a Centipede Leg about 1 time in 2, sold for 1, and now and then a Venom Sac, as the scorpion does.
- Decisions: D-654.

## 0.3.105 (2026-11-07)
- Nothing in the game changed yet. The first creature that poisons you is picked: the centipede, rust red with pale legs and green fangs. It chases you, and its bite leaves you poisoned. It turns up from depth 3.
- Poisoned lasts 6 turns and takes a heart every 3 turns, 2 in all. Another bite starts it again; it never stacks. Until the Antidote is in, poison never takes your last heart.
- It will show as a green drop beside the boon's mark, with a line as it starts and wears off, and each heart it takes flashes green.
- Decisions: D-654. D-643 moved to the archive, word for word.

## 0.3.104 (2026-11-07)
- The drifting motes now follow the way you can walk to the stairs down, through openings and round bends, instead of a straight line through the stone. Before, on about 1 floor in 4 they drifted back toward the stairs you had just come down.
- They all drift toward the farthest spot on that way you can see, so at a bend or a junction they swing round together.
- Decisions: D-653, superseding D-605's straight line.

## 0.3.103 (2026-11-07)
- Nothing in the game changed. More content comes before the side rooms get fuller: next are creatures that leave a debuff on you, then creatures that attack from a distance, each with ways to defend.
- The first debuff will be poison, brought by a new creature, the cave's fifteenth kind. Against it: an Antidote made from a Snapcap Gill and a herb, a charm, and a Growth upgrade.
- Decisions: D-652. D-641 moved to the archive, word for word.

## 0.3.102 (2026-11-07)
- Halls and large rooms are worth the walk: a hall now holds twice the finds and creatures of a small room, and a large room four times, spread evenly, a set in each part of the room.
- Each set is a flask with a rat guarding it, a herb, an oilcap, sometimes a heartcap, and the depth's usual mix of creatures. The knife and the spear stay one each.
- Rooms you have already been into stay as they were.
- Decisions: D-651. D-637 moved to the archive, word for word.

## 0.3.101 (2026-11-07)
- Side rooms start paying for the oil: the last room of each side branch, a dead end, now holds a cache of 2 or 3 extra finds (flasks, herbs, oilcaps or heartcaps), lying together in its far corner.
- A cache is there once: taken, it does not grow back. Rooms you have already been into stay as they were.
- Decisions: D-650.

## 0.3.100 (2026-11-07)
- The Lure Wisp is here, from depth 4: a small cold flame with pink eyes. Its faint glow shows even out in the dark, though it lights nothing around it.
- Come within 3 steps and it drifts a tile away, toward the nearest other creature in the room, or just away when there is none. Following it leads you into trouble.
- It never bites, and one hit puts it out. About 1 in 2 leave Wisp Glass, sold for 2.
- Decisions: D-649.

## 0.3.99 (2026-11-07)
- Nothing in the game changed. The Lure Wisp is planned: a small cold flame with pink eyes, seen even out in the dark, though it lights nothing around it. Come within 3 tiles and it drifts a tile away, toward the nearest other creature, so following it leads you into trouble.
- It never bites, and one hit puts it out. It has 1 heart, turns up from depth 4, and may leave Wisp Glass, sold for 2. It is built next.
- Decisions: D-649.

## 0.3.98 (2026-11-07)
- Halls and large rooms join the first cave's floors: a hall is two cells long, side by side or one above the other, and a large room two by two. Depths 2 to 4 have 1 or 2 halls, depths 5 to 7 1 or 2 halls and sometimes a large room, depth 8 and below 2 or 3 halls and a large room.
- They are always side rooms, so the walk to the stairs down stays as short as before, and each holds today's finds for now. Each stretch of a big room's wall can open into a different room, and on the map every room still lines up on the grid.
- Old saves have their cave floors made again once more, the hero on that floor's stairs up; home, the woods and the crypt stay.
- The map preview tints the halls and large rooms, counts them, and names a tapped room's shape.
- Decisions: D-648. D-640 moved to the archive, word for word.

## 0.3.97 (2026-11-07)
- The first cave's floors are bigger: 6 to 8 rooms on each floor at depths 2 to 4, 9 to 11 at depths 5 to 7 and 11 to 13 at depth 8 and below, the number changing from seed to seed. Each room is one cell of the floor's grid, 11 by 13 tiles, 13 by 15 from depth 8.
- The stairs down are 3 or 4 rooms from the stairs up; the other rooms branch off as side rooms and dead ends, each with today's finds, so exploring them is a choice the oil pays for. Depth 8 and below have two loops.
- Old saves have their cave floors made again once, the hero on that floor's stairs up; home, the woods and the crypt stay.
- A map preview page draws any seed's floors for the owner to flip through before merging, and every step that changes how things are made gets one.
- Decisions: D-646, D-647. D-638 and D-639 moved to the archive, word for word.

## 0.3.96 (2026-11-07)
- Nothing in the game changed. The first cave's floors are planned bigger: 6 to 8 rooms on each floor at depths 2 to 4, 9 to 11 at depths 5 to 7 and 11 to 13 at depth 8, the number changing from seed to seed, about 69 rooms in all where there are about 33 now.
- Rooms will be made of square-cut cells so everything lines up, in play and on the map: a small room is one cell, a long hall two, a large room two by two. The stairs down stay about as near as today, 3 or 4 rooms away; the other rooms branch off the way and hold the rewards. Old saves will have their cave floors made again once; home, the woods and the crypt stay.
- Decisions: D-645. D-634 moved to the archive, word for word.

## 0.3.95 (2026-11-07)
- Nothing in the game changed. Each biome will grow to about 2 to 3 times its size to hold everything planned: more rooms on each floor, and rooms both smaller and bigger than today's, so no two seeds feel the same. The first cave grows first, before the next creature.
- The owner's idea is kept for later: a cleared room filling again over time, perhaps with different creatures.
- Decisions: D-644. Questions opened: Q-086. D-482 moved to the archive, word for word.

## 0.3.94 (2026-11-07)
- Nothing in the game changed. Creatures and bosses are planned: the first cave ends with 14 kinds, adding the Lure Wisp, a small false light that drifts ahead in the dark, and the Grave Beetle, a shelled beetle the hammer cracks. Each deeper biome has about 10 kinds, some from above coming back a heart tougher.
- Each boss fights in its own room and changes how it fights at half its hearts; beaten once, it gives its found ability. The Lure Wisp is the next creature built.
- Decisions: D-643. D-528 moved to the archive, word for word.

## 0.3.93 (2026-11-07)
- Nothing in the game changed. Plants and harvests are planned: each deeper oil plant takes fewer to fill a flask (lampwort 2, a glowcap makes Bright Oil, an ember lily is poured straight), and every land plant gives a seed, made from 3 of it.
- Oil plants grow in the garden, but slowly, so the light still mostly comes from below. Each biome's ore, wood and fish are kept as drafted, each a step up from the one above.
- Decisions: D-642.

## 0.3.92 (2026-11-07)
- Nothing in the game changed. Items and crafting are planned: each weapon kind keeps one part of its own in every metal (wood for the spear and axe, stone for the hammer, a bone for the knife, silk for the sling), and the axe in hand fells the deeper trees.
- The lantern gets about one new part for each slot in each biome: tanks and wicks simply get better, while each glass shows something different, a choice for the trip. One armour and about three charms come in each biome, every creature part gets a use, and each village teaches a knack of its own.
- Decisions: D-641.

## 0.3.91 (2026-11-07)
- Nothing in the game changed. The Growth tree is planned bigger: about 50 places across Light, Body and Hands, more than a journey's embers can buy, so each hero grows differently. Knacks join it, small ways of fighting or finding worn two at a time, with twelve new boons (26 in all, some joining as you go deeper or after something happens) and solvable trials that pay an ember.
- Places and quests are planned too: each biome's deeper floors are one of two kinds of place, a village of people in each biome, secrets on old floors marked on the map once seen, and side quests in a Quests tab, some paying a new boon or bringing someone home.
- Decisions: D-639, D-640.

## 0.3.90 (2026-11-07)
- Nothing in the game changed. The content map's first draft is up: every biome's weapons, skills, items, plants and creatures on one page. Picked from it: five weapon kinds (knife, spear, axe, hammer, sling), three elements (flame, venom, light) and four found abilities (Leap, Heave, Flare, Swim). Each new metal makes every weapon hit 1 harder, and rare weapons with small effects of their own will be found below.
- The game will hold more to discover: places that branch as each biome goes deeper, villages of people below, secrets on old floors and many side quests, with a bigger Growth tree, more boons and challenges to match.
- Decisions: D-636, D-637, D-638. Questions opened and closed: Q-085. D-627 to D-632 moved to the archive, word for word.

## 0.3.89 (2026-11-07)
- Nothing in the game changed. Each biome is 8 floors deep: the woods and mountains down to depth 8, the old mines to 16, the glowing fungal caverns to 24, and Underhearth to 32, where the First Light waits. All the game's content will be planned on one map, starting with skills and how fighting works.
- Decisions: D-635. Questions closed: Q-082. D-626 moved to the archive, word for word.

## 0.3.88 (2026-11-07)
- Nothing in the game changed. The story is written down: Underhearth, the city below, fell when its great lamp, the First Light, ran low on oil. You went down with your teacher, Old Maren, the gloam took them, and you came home without your memories. The goal is to relight the First Light. The guide will be a spark of it.
- The aim is set too: about 12 to 20 hours to relight the First Light, built one biome at a time, with Old Maren fought near the end.
- Decisions: D-633, D-634. Questions closed: Q-072. Questions opened: Q-084. D-624 and D-625 moved to the archive, word for word.

## 0.3.87 (2026-11-06)
- A creature's Bestiary page now ends with how to fight it, under a gold heading, once you have beaten 3 of them. Before that it says in grey how many more to beat: "Beat 2 more to learn how to fight it." Each creature has a tip or two of its own, such as waiting for it to step up to you so you strike first.
- Decisions: D-632. D-623 moved to the archive, word for word.

## 0.3.86 (2026-11-06)
- Each creature in the Bestiary has its own page: tap its row, or pick it with Up or Down and press Enter. The page shows its drawing twice as big, its name and counts, and, once you have beaten one, a sentence or two on how it acts. Before that it says "Beat one to learn how it acts." Esc, the round cross or Left goes back to the table.
- Decisions: D-631. D-622 moved to the archive, word for word.

## 0.3.85 (2026-11-06)
- The Journal has a third tab, Bestiary, after Growth: a table of the creatures you have met, each with its drawing, its name, and how many you have met and beaten. A creature counts as met the first time your light reaches it; a mimic or a snapcap only once it shows itself, and one beaten in the dark counts too. The counts stay with your profile through falls and new journeys, starting from zero now.
- Decisions: D-630. D-621 moved to the archive, word for word.

## 0.3.84 (2026-11-06)
- Nothing in the game changed. The owner's idea is saved as a question: bosses, rare named creatures and unique wanderers with histories of their own, told in lore pages, on their Bestiary page and by the guide or people, each with a Feat for beating it.
- Questions opened: Q-083.

## 0.3.83 (2026-11-06)
- A new journey now opens with its first words, on a card in the middle of the dim crypt: "You wake in the dark of the crypt. Your lantern still burns, but its oil will not last. Something waits below." Begin, or a tap anywhere, starts the journey.
- Decisions: D-628, D-629. D-620 moved to the archive, word for word.

## 0.3.82 (2026-11-06)
- The dev panel has a new Spots section, its tab a bookmark, with three test spots kept on this device. Save puts the game as it is now into a slot; Load brings it back at once, no turn passed. Each slot's line says what it holds, like 1 · DEPTH 3 · TURN 120, or EMPTY. A loaded spot counts as a dev jump, so that journey's records stop counting.
- Decisions: D-627. D-608 moved to the archive, word for word.

## 0.3.81 (2026-11-06)
- The dev panel's Oil section has an Endless oil switch. While it is on, the lantern never runs down: turns burn no oil, and an oil tick still drinks, with its line, sip and flicker, but takes none. The oil stays where it was, so a dim lantern stays dim. It stays on in this game until you switch it off; a new game starts with it off.
- Decisions: D-626.

## 0.3.80 (2026-11-06)
- The dev panel's Hero section has a God mode switch. While it is on, creatures still bite, with their line, sound and red flash, but take no hearts, so you never fall. It stays on in this game until you switch it off; a new game starts with it off.
- Decisions: D-625.

## 0.3.79 (2026-11-06)
- Spawn in the dev panel is a grid of pictures now, one for every creature, find, tile, torch and person, under its kind's heading; the picked one's name shows above them.
- A search box over the grid narrows it with each letter typed, so anything is a few taps away.
- Decisions: D-624. D-617 and D-618 moved to the archive, word for word.

## 0.3.78 (2026-11-06)
- The dev panel is a bottom sheet now: half the screen tall, along its foot, with a row of icon tabs across its top (an eye, a sparkle, a door, a drop, a heart, an arrow) and the open section's name above its tools.
- While it is up the room slides clear above it, so the hero stays in sight; tap the open tab again and the sheet folds to its tabs. On a sideways phone or a PC it sits at the bottom left and the room slides right instead.
- Decisions: D-623. D-615 and D-616 moved to the archive, word for word.

## 0.3.77 (2026-11-06)
- Behind the scenes: a new maker tool. One command writes every empty piece of a new creature, find, tile or person, with a grey "?" picture until it is drawn, and the checker then names each number, line and picture still to fill. New things reach the game faster.
- Nothing in the game changes.
- Decisions: D-622. D-613 and D-614 moved to the archive, word for word.

## 0.3.76 (2026-11-06)
- Behind the scenes: a new checker runs with the tests. For every creature, find, tile and person it names any missing piece (a line, a picture, a hit flash, a sound, where it lives, a test or its row in the docs) and the file to fix, so new things reach the game faster and with fewer bugs.
- It found the Snapcap Gill missing from the content list; it is listed now. Nothing in the game changes.
- Decisions: D-621. D-611 and D-612 moved to the archive, word for word.

## 0.3.75 (2026-11-06)
- Waystones are smaller, 3 × 3 instead of 5 × 5, and sit on the grid: each corner stone stands in its own tile.
- They look older too: each stone a little different, with a rough top, moss and a crack, grass at its foot in the woods, and flagstones with rounded corners set into the ground.
- The home waystone now stands 2 tiles north of the woods' middle, so the middle is still at the foot of its south arm. In a saved game every waystone is made 3 × 3 where it stands, asleep or woken as it was.
- Decisions: D-620. D-610 moved to the archive, word for word.

## 0.3.74 (2026-11-06)
- The light works out its shadows only when a light moves or the room changes, not every frame: standing still, it takes about 15% less time on a slow phone. The picture is exactly the same.
- Behind the scenes: the research pages are kept in the docs, two nearly full docs are split, and five docs that no longer matched the game are fixed.
- Decisions: D-619.

## 0.3.73 (2026-11-06)
- Cave pools can be fished now: with the Wooden Rod held, bump a cave pool's water to cast, wait for the nibble and the bite, and strike in the light, just as at the pond at home.
- A cave pool's fish is the Blind Cavefish: pale and eyeless, bone and cream with a faint pink gill. Poured it gives the lantern 20% of a tank, eaten it heals 1 heart, and the peddler pays 2 coins. Its strike zone is a fifth of the bar, a little smaller than the minnow's quarter.
- "Fishing comes soon." is gone. Finds caught in pools come at a later step.
- Decisions: D-618.

## 0.3.72 (2026-11-06)
- The ninth audit: tidying behind the scenes, nothing in the game changed. The pixel pictures moved into their own file, three nearly full notes were split, and older decisions and finished steps were archived.
- Decisions: D-617. D-169 to D-176 moved to the archive, word for word.

## 0.3.71 (2026-11-06)
- The peddler now buys Pond Minnows: 1 coin each, the same as a common material. Pick one on his Sell tab, then Sell, Enter or Space. No turn passes.
- Decisions: D-616. D-609 moved to the archive, word for word.

## 0.3.70 (2026-11-06)
- A Pond Minnow can now be eaten: in the bag, EAT sits beside POUR and heals 1 heart, taking a turn. It is dim when you aren't hurt. The E key eats; Enter still pours.
- Decisions: D-615. D-583 moved to the archive, word for word.

## 0.3.69 (2026-11-06)
- Pulling on a bite opens the strike meter: a needle sweeps back and forth across a bar, and you tap while it is in the amber zone to land the fish. The world waits while it is open.
- Miss, or let the needle pass 3 times, and the fish gets away with the line coming in.
- Decisions: D-614.

## 0.3.68 (2026-11-06)
- A fish nibbles before it bites: the float shakes and the line reads "A nibble...". The next turn it always bites, so wait for the "!" and then pull.
- Casting the line plays a soft plop, and a catch plays a splash with a few drops falling back.
- Decisions: D-613.

## 0.3.67 (2026-11-06)
- Fishing is easier to follow: with the line out, bump the water again to wait a turn. The float stays where it is, so keep bumping until something bites, then bump once more to pull.
- While a line is out, the flask button beside the lantern reads WAIT, and PULL in amber when a fish bites. A tap does the same as bumping the water. The flask comes back once the line is in.
- Planned next for fishing: a nibble turn before each bite, with a plop and a splash, then a short timed strike when a fish bites, played with the world paused.
- Decisions: D-612. D-579 and D-587 moved to the archive, word for word.

## 0.3.66 (2026-11-06)
- The Pond Minnow's first use: choose it in the bag and press POUR, like a flask. It takes a turn and gives the lantern 15% of a tank, never past full.
- Only by hand: the flask button and "Flasks: By itself" still pour only flasks, Deep Pour makes only flasks pour more, and Records' "Flasks poured" counts only flasks.
- Decisions: D-611. D-588 moved to the archive, word for word.

## 0.3.65 (2026-11-06)
- Fishing at the pond at home: with the Wooden Rod held, bump the water to cast, a turn. A small red-and-white float lands on that tile and bobs gently.
- Each turn the line waits, a fish bites about 1 time in 6: a "!" over the float, which dips, and "Something bites!". Bump the water again on your next turn to catch a Pond Minnow, a small silver fish, into the bag in stacks of 20. Too slow, and it gets away, the float still waiting.
- Walking off, or holding another tool, reels the line in. With the bag full, the minnow slips away. Cave pools still say "Fishing comes soon."
- Decisions: D-610. D-607 moved to the archive, word for word.

## 0.3.64 (2026-11-06)
- Fishing begins: make a Wooden Rod at the workbench from 2 Wood and 2 Spider Silk. It's a plain wooden pole with a silk line and a red-and-white float.
- The rod is a tool: Hold it in the bag to put it in the Tool slot, a turn, swapping it with the Stone Pick there. Made with the Tool slot empty, it goes straight in.
- Bump the pond, or a cave pool, with the rod held and the line says "The water is still. Fishing comes soon." No turn passes. Casting comes next.
- How fishing will play: cast, wait for a bite (about 1 turn in 6), then pull within a turn. The first fish is the Pond Minnow, from the pond at home; later every pool has its own fish and finds. A fish will give oil, hearts and coins, and go into recipes.
- Decisions: D-608, D-609.

## 0.3.63 (2026-11-05)
- A new creature, the oil tick, now turns up from depth 3 down: a round tick swollen with amber oil. It chases you, and beside you it drinks 5% of your lantern's oil instead of biting, about 3 turns of light, even with the lantern off. Once the lantern is empty, it bites for 1.
- As it drinks, the oil bar flickers pale, you hear a wet sip, and the line says "The oil tick drinks your oil."
- It has 2 hearts. Beaten, it may leave a Tick Shell, which the peddler buys for 1 coin, and now and then an Oil Bladder, for 5; their recipes come later.
- The plan for creatures: about 12 to 15 kinds for each biome; new ways for creatures next, light and oil ones first; then every creature's next move shown, the bestiary and trophies, packs, and creatures that vary.
- Decisions: D-606, D-607.

## 0.3.62 (2026-11-05)
- A few faint pale motes now drift slowly in your lantern light, straight toward the floor's stairs down, even through walls, like a draft. They only show where the light falls, and stop once you have seen the stairs. None with the lantern out, or with reduced motion on.
- Decisions: D-605.

## 0.3.61 (2026-11-05)
- The boon you hold is no longer named on the panel. Its card's picture, in its colour, now shows in a small square under the panel, and the creature list moves down under it. Tap it, or put the mouse over it, to see the boon's name and what it does. No turn passes.
- A line at the bottom too long for the screen now wraps onto two rows instead of running off the edge.
- Decisions: D-604.

## 0.3.60 (2026-11-05)
- The home waystone no longer offers a boon on the step that wakes it, so you see it wake. Step off the plate and back on for your boon.
- The boon card is now three cards side by side. Each shows its kind's picture and colour at its top (an amber flame for light and oil, a red heart for hearts and fighting, a bone-white gem for finding things, violet footsteps for getting around), then its name and its line. The chosen card lifts and turns gold. Left and Right choose too.
- Decisions: D-603.

## 0.3.59 (2026-11-05)
- The last boon can now be offered at the home waystone: Far Sight. While you hold it, the first time you enter a room, the third of its floor nearest you shows at once, with the walls beside it, as if your lantern had already been there. It stays remembered after the boon ends, and stairs in it count as found, so their glow lights up. Rooms you have already seen any of are left as they are.
- All 14 boons work now.
- Decisions: D-602.

## 0.3.58 (2026-11-05)
- A new boon can now be offered at the home waystone: Waymark. While you hold it, each floor's stairs down show on the map as soon as you arrive, even in a room you haven't entered yet: a violet mark that slowly pulses (steady with reduced motion), on the big map and on the round map when it is near. Once you have seen the stairs yourself they show as usual, and the marks go when the boon ends.
- Thirteen of the 14 boons work now; Far Sight is the last.
- Decisions: D-601.

## 0.3.57 (2026-11-05)
- A new boon can now be offered at the home waystone: Soft Step. The last tile of your lantern's light no longer wakes creatures, so a rat at the edge of your light stays put until it is 1 tile further in. Torches, the stairs' glow and daylight wake them as before, and the gloamling and the cave spider see you as before.
- Twelve of the 14 boons work now, and the card can offer getting around too: 3 boons, each from a different one of the 4 kinds.
- Decisions: D-600.

## 0.3.56 (2026-11-05)
- Three more boons can now be offered at the home waystone: Deep Pour (a flask pours 60% of a tank, not 45%; poured by itself, it waits until none would spill, at 40% or lower), Kind Herbs (anything eaten or drunk heals 1 heart more: herb, heartcap, gloamberry, potion) and Lucky Find (rare drops come 1 time in 4, and with the Wisp Charm 35 times in 100).
- Eleven of the 14 boons work now. Only getting around's 3 are left.
- Decisions: D-599.

## 0.3.55 (2026-11-05)
- Two more boons can now be offered at the home waystone: Hungry Flame (the lantern's light reaches 2 tiles farther while it has oil, but burns half again as fast) and Reckless (every hit you land does 1 more, the spear's second hit too, but you have 2 fewer hearts: full hearts drop to the new most as you take it, and the 2 come back empty when you are home).
- Eight of the 14 boons work now.
- Decisions: D-598.

## 0.3.54 (2026-11-05)
- Three more boons can now be offered at the home waystone: Wide Glow (the lantern's light reaches 1 tile farther while it has oil), Hard Blow (every hit you land does 1 more, the spear's second hit too) and Greedy Hands (creatures always drop their part, but the lantern burns a quarter faster).
- Six of the 14 boons work now. Getting around has none yet, so the card still shows 3, one from each of the other kinds.
- Decisions: D-597.

## 0.3.53 (2026-11-05)
- Boons: stepping onto the woken home waystone's plate, with no boon held, opens a card of 3 boons, each of a different kind. Pick 1, or close the card to go without. A soft two-bell chime plays, the text line says "The waystone grants you …", and the boon's name shows on the panel under the oil bar.
- A boon lasts until you are home in the woods again, by stairs or waystone, or fall.
- Three boons work so far: Slow Wick (the lantern burns a quarter slower, and with the Copper Wick a tank lasts 100 steps), Stout Heart (2 more hearts, full as you set out) and Keen Eye (creatures drop their part 3 times in 4). The other 11 are listed, with their numbers, and come a few at a time.
- Decisions: D-596. Questions closed: Q-077.

## 0.3.52 (2026-11-05)
- The travel card's list now scrolls inside the card when the waystones don't all fit, as the version history's does. Sideways it shows 5 whole rows.
- It opens on the first woken stone you aren't standing on. Up and Down keep the chosen stone in view; a swipe, Page Up or Page Down turns a page, and a thin bar at the card's right shows where you are in the list.
- Decisions: D-595.

## 0.3.51 (2026-11-05)
- Waystones now stand asleep deeper down too: on depth 5, the top of the warrens; depth 8, the top of the dungeon; then every 4th depth, 12, 16, 20 and on. Each is placed like depth 2's, in a room the seed picks, never the one with the stairs up, near its middle.
- Step onto one and it wakes, as the others do, and you can travel to it from any woken stone.
- The travel card lists home, then every stone down to the next one below the deepest floor you have reached, that one as ???. So it grows as you go deeper.
- A journey already saved gets them too: a room of yours that should hold one is made again once, with the stone. If you are standing in it, you start on that floor's stairs up. Every other room stays exactly as it was.
- Decisions: D-594.

## 0.3.50 (2026-11-05)
- You can now travel between waystones you have woken. Stand on a woken plate and tap the hero, or press Space or Enter, and the travel card opens. Walking over the plate never opens it.
- The card lists every waystone, home first, then by depth. One you haven't woken shows as ???, and the one you stand on is greyed out. Pick a woken one and you arrive on its plate.
- Travel is free: no turn passes and no oil burns, and creatures where you arrive can't move before you do. You can't travel with a creature awake beside you or chasing you.
- Decisions: D-593. Questions closed: Q-080.

## 0.3.49 (2026-11-05)
- A second waystone now stands asleep on depth 2, the top of the caves: in one of the two rooms away from the stairs up, the seed's pick, near the room's middle with open floor all around it.
- It looks like the home stone for now. Step onto its plate and it wakes, just as the home one does. Travelling between them comes next.
- A journey already saved gets it too: if you have been in its room, that room is made again once, with the stone. If you are standing in it, you start on that floor's stairs up.
- Decisions: D-592.

## 0.3.48 (2026-11-05)
- Step onto the home waystone's plate and it wakes: its rune lights violet from the bottom up, a soft ring of light spreads over the cross, and three soft bells ring. "The waystone wakes."
- Once woken it stays woken, its rune lit with a faint violet glow you can find at night, like the stairs. Waking costs nothing more than the step. Travelling between waystones comes later.
- Decisions: D-591.

## 0.3.47 (2026-11-05)
- The home waystone now stands in the woods, just north of the middle: four tall standing stones around a cross of flagstones, with a carved plate in the middle. It is asleep for now; waking it and travelling come in the next steps.
- The standing stones block your light and sight, like rock. You can walk the cross and stand on the plate.
- A journey already saved gets the stone once, at the nearest clear spot to there. Only trees, stumps, branches and bushes are cleared; nothing you built moves.
- Decisions: D-589, D-590. Questions raised: Q-081, Q-082.

## 0.3.46 (2026-11-03)
- Fixed: on Android, the hero and the tiles could come back blank after the game had been in the background. Every picture the game keeps is now drawn again when the phone wipes it.
- Decisions: D-588.

## 0.3.45 (2026-11-03)
- Planning only, nothing in the game changed: waystones will be 5 × 5, with a walkable cross and a plate in the middle, and big landmarks like them will be placed by one shared tool from simple plans.
- Decisions: D-587. Questions raised: Q-080.

## 0.3.44 (2026-11-02)
- The trapped peddler on depth 3 can now stand in more places: at least 4 heaps of rubble around him (not 5), and never in a nook with walls on two sides.
- A creature or find that stood on or beside his spot now moves to the nearest free floor instead of ruling the spot out, so his room comes out as the seed made it far more often.
- Decisions: D-586. Questions closed: Q-079.

## 0.3.43 (2026-11-02)
- Fixed: now and then a dungeon room deep down came out as a small crypt room instead, so its openings and stairs didn't line up. Those rooms are now made properly; every other room stays exactly as it was.
- A journey saved with one of those crypt rooms has just that room made again, once. If you were in it, you stand on that floor's stairs up.
- Decisions: D-585. Questions closed: Q-078.

## 0.3.42 (2026-11-02)
- Smaller shallow floors: the caves on depths 2 to 4 are now 13 × 15 tiles and the warrens on 5 to 7 are 15 × 17, so the stairs are closer and the oil goes further. The dungeon from depth 8 stays 17 × 20. Fewer chambers and tunnels fill the smaller rooms; what lies in them stays the same, and still pools turn up a little less often.
- The peddler on depth 3 is always there: his room is made again until his ring of rubble fits.
- A journey saved before this has its caves, warrens and dungeon made again at the new sizes, once, from the same seed. If you were down there, you stand on that floor's stairs up; a bag you left there waits on them; a peddler you freed stays freed.
- Decisions: D-584. Questions raised: Q-078.

## 0.3.41 (2026-11-02)
- Plans only, nothing you see has changed: boons. Each time you set out from the home waystone, you will pick 1 of 3 random boons, small helps for light and oil, hearts and fighting, finding things or getting around, kept until you are home again. They come right after the waystones, and the list of boons is shown first.
- Decisions: D-583.

## 0.3.40 (2026-11-02)
- Plans only, nothing you see has changed: getting around. Waystones to find and wake will let you travel between them on the map, with one near the middle of the home room and one at the top of each band of floors. Shallow floors will get smaller and grow with depth. Faint motes in the lantern light will drift toward the stairs down. These three come next, in that order.
- Decisions: D-579, D-580, D-581, D-582.

## 0.3.39 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 8, its last. The profiles, the name pad, the look card, the seed pad, the Seed Explorer and the map now have their own small files in the card table, so every screen goes through it.
- Decisions: D-578.

## 0.3.38 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 7. The pages (how to play, the version history and the journal) now have their own small files in the card table.
- Decisions: D-577.

## 0.3.37 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 6. The menus (the title, the pause menu, Settings, the ways to play, choosing a way to play and the journey's end) now have their own small files in the card table, sharing their lines and arrows.
- Decisions: D-576.

## 0.3.36 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 5. The bed's card and the three questions that ask Yes or No (Start over?, Delete…? and the easier way to play) now have their own small files in the card table, sharing their arrows and taps.
- Decisions: D-575.

## 0.3.35 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 4. The bag's card and setting something down now have their own small files too, in the same table as the workbench, chest and peddler.
- Decisions: D-574.

## 0.3.34 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 3. The workbench, chest and peddler cards each have their own small file for their keys, taps and picks, and the game looks them up in a table, so a new card is one file.
- Decisions: D-573.

## 0.3.33 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 2. A new tool keeps the game's records: one command sets the version number, copies these notes into the Version history, and moves older notes to the archive.
- Decisions: D-572.

## 0.3.32 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 1. The bag, Drop, setting down, and the workbench, chest, bed and peddler cards moved into their own file of the code.
- For screen readers: on the peddler's Sell side, each bag slot is read with its name, how many and its price again, not "Empty". It had been wrong since 0.2.219.
- Tests run faster (22 s to 16 s), two unused pieces of code are gone, and the notes for making changes are tidier.
- Decisions: D-570, D-571.

## 0.3.31 (2026-11-02)
- Feed your garden now: walk into a sprout and its card shows FEED and DECONSTRUCT. Feed puts 1 Bat Guano on the soil. It takes a turn.
- A fed sprout shows a few flecks of guano on its soil and grows in 150 turns from planting instead of 300. Fed after that, it grows at once.
- Once is enough: with no guano, or already fed, Feed is dim. After picking, the sprout needs feeding again. Taken down, the guano is spent.
- Water doesn't matter to the garden yet; it waits for a way to carry water.
- Decisions: D-569.

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

## 0.3.13 (2026-11-01)
- The workbench can make a Pouch, from 4 Rat Tail and 2 Spider Silk. Make it and your bag holds 9 things instead of 6, for good.
- Once you have the Pouch, the workbench offers the Big Bag, from 4 Mole Fur and 3 Spider Silk, and your bag holds 12.
- A bigger bag shows as a 3 × 3 grid, then 4 × 3, with slightly smaller slots so it fits a sideways screen, in the bag, the chest and the peddler's card.
- Decisions: D-547, D-548.

## 0.3.12 (2026-11-01)
- A new Drop button in the bag, for every item (or X on a keyboard), sets the chosen stack down at your feet, free, to make room. Walk back onto it to pick it all up again.
- Drop while standing on something your full bag couldn't take, and the two swap: your stack goes down and the find comes into the bag.
- Bigger bags come later: a Pouch for 9 slots, then a Big Bag for 12, made at the workbench.
- Decisions: D-545, D-546.

## 0.3.11 (2026-11-01)
- A new creature, the snapcap, now turns up from depth 2 down. It looks just like a heartcap until you stand beside it; then its eyes and teeth show.
- It never moves. It bites for 1 whoever stands beside it, light or dark, with a wet squelch and a snap, and it has 2 hearts.
- Beaten, it may leave a Snapcap Gill, which the peddler buys for 1 coin; its recipes come later.
- Decisions: D-543, D-544.

## 0.3.10 (2026-11-01)
- A new creature, the mole, now turns up from depth 5 down. It chases you once it sees you in the light, and it never flees.
- It has 4 hearts, the most of any creature so far, and bites for 1, with a low snuffle and a scrape of claws.
- Beaten, it may leave Mole Fur, which the peddler buys for 1 coin, and now and then a rare Mole Claw, which the peddler buys for 5; their recipes come later.
- Decisions: D-541, D-542.

## 0.3.9 (2026-11-01)
- Bat Guano now lies in the caves: as each room is made, every bat gets a pile on the floor beside it. Walk onto it to put it in your bag, in stacks of 20.
- It grows back a day after you take it, out of sight. The peddler buys it for 1 coin, and it is kept for the garden and for crafts later.
- Decisions: D-540.

## 0.3.8 (2026-11-01)
- A new creature, the bat, now turns up from depth 3 down. It flies toward your lit lantern, or the nearest lit torch, from anywhere in the room; with no light about, it stays where it is.
- It has 2 hearts and bites for 1, with a quick squeak and a flap of wings. Hurt, it may flee for a few turns, as a rat does.
- Beaten, it may leave a Bat Wing, which the peddler buys for 1 coin, and now and then a rare Bat Fang, which the peddler buys for 5; their recipes come later.
- Decisions: D-537, D-538, D-539.

## 0.3.7 (2026-11-01)
- A new creature, the cave spider, now turns up from depth 2 down. It shuns light: it waits in the dark, backs away from your lantern, and bites only when you stand beside it in the dark.
- It has 2 hearts and bites for 1, with a soft hiss and a click. Beaten, it may leave Spider Silk, which the peddler buys for 1 coin; its recipes come later.
- Decisions: D-535, D-536.

## 0.3.6 (2026-11-01)
- Rooms below the surface now hold more creatures, of mixed kinds: 2 in each room at depth 2, 3 at depths 3 and 4, and 4 from depth 5 down. Every room holds at least two kinds.
- Each depth has its own mix. Rats and lampmoths turn up from depth 2, scorpions from depth 3 and gloamlings from depth 5, and none of them stops turning up deeper. A rat still waits by each room's flask, and the flask mimic is as before.
- Decisions: D-534.

## 0.3.5 (2026-10-31)
- On the Look card, the Cloak tab now shows the three cloak patterns, Zebra, Cow and Camo, in a third row. Each is dim, with LOCK at its corner.
- Tap a locked pattern to try it on the big hero. A note says it costs Glints, earned from Feats, and that its price isn't decided yet. OK keeps your own cloak, and RANDOM never rolls a locked one.
- Decisions: D-533.

## 0.3.4 (2026-10-31)
- The gloamberry bush no longer looks like it floats: it sits 1 pixel lower, resting on its shadow, and the shadow is now as wide as its base.
- Decisions: D-532.

## 0.3.3 (2026-10-31)
- Gloamberry bushes now grow in the surface woods, one in each woods room: a low round bush with dark blue berries. Walk into one to pick 2 Gloamberries; the bush stands bare and fills again 300 turns later.
- Gloamberries stack to 20 in the bag. Eat one for 1 heart, as a heartcap. Their seed comes with the garden, and a recipe later.
- Decisions: D-531.

## 0.3.2 (2026-10-31)
- Before the garden, a first wild plant comes to the surface woods, giving the garden its first seed; fruit bushes, flowers, cave plants grown at home and water plants follow, one at a time. Docs only.
- Decisions: D-530.

## 0.3.1 (2026-10-31)
- The Look card's Trim tab now shows each lantern trim as a square of its two metal shades, the light cap over the dark base, with its name, instead of a tiny hero whose lantern was hard to see. Your hero above still carries the trim you pick.
- Decisions: D-529. Questions closed: Q-074.

## 0.3.0 (2026-10-31)
- The Look card's Eyes tab now shows each eye colour as a big square of colour with its name, instead of a tiny hero whose eyes were hard to see. Your hero above still shows the eyes you pick.
- The game moves to version 0.3: stage 0.2's last steps are all done, so the world stage now has its own numbers, starting here.
- Decisions: D-527, D-528.
