# Changelog: stage 0.2, part 1 (0.2.0 to 0.2.152)

Moved unchanged from `CHANGELOG.md` at 0.2.109, the first regular audit
(D-336), 0.2.104 to 0.2.106 at 0.2.115, 0.2.107 at 0.2.117, 0.2.108 at 0.2.119, 0.2.109 and 0.2.110 at 0.2.120, 0.2.111 at 0.2.121 (the 8 KB cap), 0.2.112 to 0.2.119 at 0.2.123, the second audit (D-362), 0.2.120 at 0.2.132 (the 8 KB cap), 0.2.121 at 0.2.134 (the 8 KB cap), 0.2.122 at 0.2.135 (the 8 KB cap), 0.2.123 at 0.2.136 (the 8 KB cap), 0.2.124 at 0.2.137 (the 8 KB cap), 0.2.125 at 0.2.138 (the 8 KB cap), 0.2.126 at 0.2.139 (the 8 KB cap), 0.2.127 at 0.2.140 (the 8 KB cap), 0.2.128 at 0.2.141 (the 8 KB cap), 0.2.129 at 0.2.142 (the 8 KB cap), 0.2.130 to 0.2.140 at 0.2.143, the third audit (D-392), 0.2.141 at 0.2.144, 0.2.142 at 0.2.145, 0.2.143 at 0.2.146, 0.2.144 at 0.2.156, 0.2.145 and 0.2.146 at 0.2.157, 0.2.147 and 0.2.148 at 0.2.159, 0.2.149 and 0.2.150 at 0.2.161, 0.2.151 at 0.2.162, and 0.2.152 at 0.2.163 (the 8 KB cap). Newest first.
Grep for a version; never read this whole.

## 0.2.152 (2026-10-28)
- The title screen is laid out like a phone game's. The hero stands in the lantern's light in the middle, with one big button under them: CONTINUE while a journey is saved, with New journey as a grey line under it, or NEW JOURNEY on its own.
- Journal, How to play and Settings are round buttons in the top right corner, each with a small icon (a book, a question mark, a gear) and its name under it. On a squarer screen they stand down the right side instead.
- The profile you are playing sits top left as a small glass box with your hero, name and deepest depth; tapping it opens Profiles, so the Profiles line is gone. The Seed Explorer is a round button with a wrench in the bottom left corner.
- The name Gloamdeep is bigger and lit from below, dim at the tops of the letters and gold at their feet, as if the hero's lantern shone up at it.
- Decisions: D-401.

## 0.2.151 (2026-10-28)
- Start over?, Delete …? and Play …? (the easier way to play) now open as a small glass card in the middle of the screen, the title's scene or the room dim around it. The question sits at its top left in ember, with the grey note under it.
- Yes and No are buttons along the card's bottom, YES and NO, with NO picked first as before; the arrows move between them. The round cross, Esc and a tap outside the card all mean No.
- Decisions: D-400. Questions opened: Q-065.

## 0.2.150 (2026-10-28)
- Choosing a profile's look now opens a glass card that fills the screen, on the title's scene, like the name card: CLOAK, then EYES, TRIM and CLOTHES at its top left.
- The choices keep their framed boxes, centred in the card, the picked one framed in gold; OK is a button in the bottom right corner.
- The round cross goes back a card, as Back did, and so does a tap outside the card, so the Back line is gone. Esc still works as before.
- Decisions: D-399.

## 0.2.149 (2026-10-28)
- Naming a new profile now opens a glass card that fills the screen, on the title's scene, like the seed pad. NAME sits at its top left, or RENAME when renaming a profile.
- The name typed sits in an ember box, and each letter is a small button on the same 7-column grid, with DEL and OK wider buttons on the last row; the chosen key is ember and gold, the rest dim.
- The round cross goes back to the profiles, as Esc and a tap outside do, so the Back key is gone.
- Decisions: D-398.

## 0.2.148 (2026-10-28)
- The profiles now open as a glass card that fills the screen, on the title's scene, like Settings. PROFILES sits at its top left; each profile keeps its framed box, with its hero, name, deepest depth and play time.
- Rename, Change look and Delete are buttons along the card's bottom: RENAME, LOOK and DELETE. While one is being done, the card's title asks which (RENAME WHICH?) and its button reads CANCEL. The arrows go down the boxes onto the buttons, then left and right along them.
- The round cross goes back to the title, as Esc and a tap outside do. When the game first opens there is no title to go back to yet, so the cross is not shown. The Delete question stays as it was for now.
- Decisions: D-397.

## 0.2.147 (2026-10-28)
- New journey's "Choose a way to play" now opens as a glass card that fills the screen, like Settings. WAY TO PLAY sits at its top left, and the round cross goes back, as Esc and a tap outside still do.
- Each way is a row with its note under it, so Gentle, Normal and Hardcore can be compared at once; the chosen one is gold with the flame. Tapping a way or its note picks it.
- Settings' Way to play line, in play, opens the same card on the room: the ways that can't be picked stay grey, with their own note.
- Decisions: D-396.

## 0.2.146 (2026-10-28)
- The map now opens as a glass card that fills the screen, like the bag. MAP sits at its top left, the floor's name and its arrows in the middle of the same row, and the round cross closes it, as M, Esc and a tap outside still do. The round map in the corner hides while it is open.
- The Seed Explorer is the same card, on the title's scene: Back, Type and Reseed are buttons along its bottom, the seed in gold between them. Dragging, zooming, the floor arrows and tapping stairs work as before.
- Fixed: the map's up arrow and Page Up now turn back up to the surface; before, they stopped at depth 1.
- Decisions: D-395.

## 0.2.145 (2026-10-28)
- The seed pad now opens as a glass card that fills the screen, like Settings, both from Settings and from the Seed Explorer. SEED sits at its top left, and the round cross goes back, as Esc and a tap outside still do.
- The digits typed sit in an ember box, with the keys under it as buttons on the same 4-column grid, both in the middle of the card. The chosen key glows ember; the rest are dim. Arrows, digits and Backspace work as before.
- Decisions: D-394.

## 0.2.144 (2026-10-28)
- Version history now opens as a glass card that fills the screen, like Settings, both from the pause card and from the title. VERSION HISTORY sits at its top left, and the round cross goes back to Settings, as Esc and a tap outside still do; the Back line is gone.
- The list is the same: each version's number and title, with + to open it and − while open. An open version's lines now use the card's whole width, and the list scrolls inside the card, with its thin bar at the right.
- Decisions: D-393.

## 0.2.143 (2026-10-28)
- Behind the scenes: the third tidy-up of the notes and code. Nothing in the game changes.
- The Version history's data is split into three smaller files by version, word for word, so it shows exactly as before.
- Older decisions and changelog entries moved, word for word, into the archive.
- Decisions: D-392.

## 0.2.142 (2026-10-28)
- The Journal now opens as a glass card that fills the screen, like How to play, both from the pause card and from the title. JOURNAL sits at its top left, and the round cross goes back, as Esc and a tap outside still do; the Back line is gone.
- Records and Growth are tabs under the heading. The open one is gold, with the flame, and underlined. A tap on a tab opens it; Left and Right still turn them, and Enter turns to Growth.
- Each tab's rows sit under the tabs, the name on the left and its value in a column on the right.
- On Growth, Add a heart is a button in the bottom right corner, with "1 ember each" beside it. It is dim while no ember can buy a heart. Enter presses it too.
- Decisions: D-391.

## 0.2.141 (2026-10-28)
- How to play now opens as a glass card that fills the screen, like Settings, both from the pause card and from the title. HOW TO PLAY sits at its top left, and the round cross goes back, as Esc and a tap outside still do; the Back line is gone.
- Its pages are tabs under the heading: Touch, Mouse, Keyboard and Crafting. The open one is gold, with the flame, and underlined. A tap on a tab opens it; Left and Right still turn the pages.
- Each page's rows sit under the tabs, the action on the left and how to do it on the right, as before.
- Decisions: D-390.

## 0.2.140 (2026-10-27)
- Settings now opens as a glass card that fills the screen, like the pause card, both from the pause card and from the title. SETTINGS sits at its top left, and the round cross goes back, as Esc and a tap outside still do; the Back line is gone.
- Each setting is a row: its name on the left, its value in a column on the right, so every value shows at once. A tap anywhere level with a row changes it.
- Version history is a button in the bottom left corner.
- Decisions: D-389.

## 0.2.139 (2026-10-27)
- The pause menu now opens as a glass card that fills the screen, like the bag. PAUSED sits at its top left, and the round cross resumes, as Esc, P and a tap outside still do.
- Its lines run down the left: Resume, Journal, Settings, How to play and Back to title. A tap anywhere level with a line picks it.
- On the right, This journey shows the world's seed, the way you play, the depth and your level.
- Decisions: D-388.

## 0.2.138 (2026-10-27)
- The stash chest now opens as a glass card that fills the screen, like the bag and the workbench. Its 12 slots sit in a 4 × 3 grid on the left; your bag's 6 sit in a 3 × 2 grid on the right.
- The chosen stack's name and count show under the bag's slots (Stone, 6 in the chest). A tap still moves it to the other side.
- Arrows move around both grids: Right from the chest's right column reaches the bag. Deconstruct is a button in the bottom left corner, and the round cross closes the card, as Esc and a tap outside still do; the Close line is gone.
- Decisions: D-387.

## 0.2.137 (2026-10-27)
- The workbench now opens as a glass card that fills the screen, like the bag. The things you can make there sit in slots on the left; the stash chest is the first.
- On the right, the card shows the chosen thing's name, each cost with how many you carry (3 / 5 Wood), and its look line. Make sits in the bottom right corner, dim with too few.
- Deconstruct is a button in the bottom left corner, away from Make. The round cross closes the card, as I, Esc and a tap outside still do; the Close line is gone.
- Decisions: D-387.

## 0.2.136 (2026-10-27)
- On the title and its pages, the dark crypt floor and the lantern's light now fill the whole screen, with no box around the name and the menu.
- With the bag open, a line the game says now shows over the card. Set down the workbench where it can't go, and you see "Only on the surface." or "There is no room there." instead of nothing.
- Decisions: D-386.

## 0.2.135 (2026-10-27)
- The bag now opens as a glass card that fills the screen, with bigger slots in a 3 by 2 grid on the left. The arrow keys move around the grid.
- On the right, the card shows the chosen item's name, how many you carry, and its look line. Its buttons sit in the bottom right corner, near your thumb.
- A small round cross at the card's top right closes it; I, Esc and a tap outside still do too. The corner buttons hide while the bag is open.
- Decisions: D-385.

## 0.2.134 (2026-10-27)
- The lantern is now a big round button in the room's bottom right corner, its rim gold while it is lit.
- A new quick slot stands left of the lantern: tap it to pour a flask from your bag, one turn, as the bag's Pour does. It shows how many flasks you carry, and goes dim when you have none.
- The bag now sits up and left of the lantern, the two round buttons curving around it.
- Decisions: D-384.

## 0.2.133 (2026-10-27)
- A round map now stands in the room's top right corner. It shows what you have found around you, about 17 tiles across, with you in the middle and the rooms next door once found.
- Tap the round map, or press M as before, to open the full map. While it is open, a small round cross in the corner closes it.
- Pause stands left of the round map, the bag under pause. Pause, the bag and the dev wrench are now round, on the same glass as the panel.
- Walk under the round map, or have a creature beside you there, and it fades almost away, like the panel.
- Decisions: D-383.

## 0.2.132 (2026-10-27)
- The room now fills the whole screen, with bigger tiles: about 11 tiles from top to bottom, and as many across as the screen is wide. The camera scrolls with you.
- A room narrower than the screen sits in the middle, with the deepest dark around it.
- The text line now sits on glass along the bottom of the room. The pause, map and bag buttons stand in the room's top right corner, and the lantern in its bottom right.
- Dev tools: the wrench stands left of the pause button. The stats line is now off at first: a new Stats switch in View shows it, small, at the bottom left.
- Decisions: D-381, D-382.

## 0.2.131 (2026-10-27)
- The hearts, level, oil and depth now sit on a see-through glass panel over the room's top left, and the column beside the room is gone.
- The creature list stands under the panel, down the room's left. Tapping a plaque still frames its creature.
- Walk under the panel, or have a creature beside you there, and the panel and the plaques fade almost away, so nothing is hidden.
- Decisions: D-380.

## 0.2.130 (2026-10-27)
- The game now plays sideways only, on every screen. The hearts, depth and oil always stand in a column at the room's left, and the buttons beside the room.
- A phone held upright pauses the game and shows a picture asking you to turn it sideways. Turn it back and the pause menu waits. A PC window is never asked, whatever its shape.
- On a phone that allows it (Android), Play, Continue or Resume also go full screen and lock the screen sideways. iPhone browsers can't lock, so the picture asks instead.
- Put on the home screen, the game now opens sideways by itself.
- Decisions: D-377.

## 0.2.129 (2026-10-27)
- Decided: the game will play sideways only, full screen, on every screen. A phone held upright will pause and ask you to turn it; on Android, Play also locks it sideways. Installing stays optional. This comes next.
- Decided, from the mock-ups: a Genshin Impact feel. The room fills the screen, the hearts and oil sit on a glass panel top left, a round map top right, and the lantern becomes a big round button with the bag, map and a quick slot around it. Menus become full-screen cards, the bag first.
- Kept for later, from the Brogue talk: a bot that hunts broken seeds, floors that line up with the ones above, a dimension rift with bizarre creatures, generated beginnings and backstories, and a much bigger world, the surface first.
- Nothing in the game changed.
- Decisions: D-377, D-378, D-379.

## 0.2.128 (2026-10-27)
- The research notes are split in two: the owner's wish list and kept ideas stay in `RESEARCH.md`, and the games, how they do bosses, and talks worth hearing move to a new `RESEARCH-GAMES.md`.
- Kept for later, from the Into the Breach talk: a combat sandbox and a seeded puzzle tester, to sit with the Seed Explorer under one tools line on the title menu.
- Nothing in the game changed.
- Decisions: D-376.

## 0.2.127 (2026-10-26)
- The game can now be put on a phone's home screen, and it opens full screen like an app. On Android, Chrome may offer it once by itself; if you say no, it stays quiet for a long time. On iPhone, use Share, then Add to Home Screen.
- Its icon is the lit lantern from the lantern switch, on its own, drawn by the game's code.
- It still needs a connection to start, and plays and saves just as before. On iPhone, the home-screen game keeps its own saves, apart from Safari's.
- Decisions: D-375.

## 0.2.126 (2026-10-26)
- A new creature, the scorpion, drawn from above: two big pincers, eight legs and its tail curled to one side. It has 1 heart, so one hit of anything kills it, but its sting takes 2 hearts.
- Each scorpion wears one of five colours, Sand, Rust, Coal, Olive or Bone, picked by the world's seed, so no two floors look quite alike.
- It chases you once it sees you in the light. On each floor of depths 3 and 4, one room holds a scorpion in place of its rat, never the lampmoth's room.
- Its sting has its own sound: two dry clicks of claws, then a sharp stab.
- Creatures now give more experience: their hearts and bite added together. A lampmoth gives 2, a rat, gloamling or scorpion 3, a flask mimic 4. A new room still gives 1.
- Decisions: D-370, D-371, D-372, D-373, D-374.

## 0.2.125 (2026-10-25)
- Fixed: hitting a flask mimic without killing it froze the game, and a saved game froze again when loaded.
- Hurt, the flask mimic now says "The flask mimic cracks." Its bite on the same turn still says more.
- A creature with no line for something now says nothing new instead of freezing, and a test checks every creature's lines are there.
- Decisions: D-369.

## 0.2.124 (2026-10-25)
- A new creature, the flask mimic. It looks just like an oil flask, and it doesn't show on the creature list.
- Bump it and it opens its eyes, with no harm done, and wakes. It does nothing that turn, so you have a step's start to run.
- Awake, it has pink eyes and a row of teeth, 3 hearts and a bite of 1, and it chases you. After 6 turns it settles back down as a flask where it stands.
- About 1 room in 4 on depths 3 to 5 holds one, as well as everything the room already had, so there is as much oil as before.
- Its bite clinks of glass, then snaps.
- Decisions: D-365, D-366, D-367, D-368. Questions closed: Q-062.

## 0.2.123 (2026-10-25)
- The second tidy-up, seven versions early. Nothing in the game changes.
- The turn rules' biggest file is split into six smaller ones (the creatures' turn, a fall, the bag's buttons, and more), so new creatures and finds are quicker to add.
- A new page in the docs lists every creature, find, tile, light and place with its numbers, and the tech notes list the files each new kind of content touches.
- Decisions: D-362, D-363, D-364.

## 0.2.122 (2026-10-25)
- How to play's Touch, Mouse and Keyboard pages have a new row, Frame: tap (or click) a creature's plaque, or press Tab.
- Decisions: D-361. Questions closed: Q-060.

## 0.2.121 (2026-10-25)
- Tap a creature's plaque in the row under the room to frame it: the plaque gets an amber edge, amber corners mark the creature on the field, a small tag above it shows its name and hearts, and an arrow shows its next step.
- The frame stays as you play. Tap the same plaque to let it go, or another to frame that one instead. It goes when the creature dies or leaves the light.
- On a keyboard, Tab frames the first plaque, then the next, then none.
- Framing takes no turn.
- Decisions: D-359, D-360.

## 0.2.120 (2026-10-25)
- A new row under the room lists the creatures that have noticed you and stand in light. Each has a small plaque with its face and what it does next if you wait: fangs for a bite, an arrow for a step. One that has noticed you but can't move shows just its face.
- A lampmoth flying at your lit lantern gets a plaque too.
- New plaques join at the end of the row, and one goes when its creature dies or leaves the light. If more than 7 are listed, the last spot says how many more ("+2").
- Held sideways, the plaques stack under the hearts, depth, oil and level.
- Decisions: D-358.

## 0.2.119 (2026-10-25)
- No change to play: how creatures will show their next move is decided, after three rounds of mock-ups.
- A row under the room will hold a small plaque for each creature that has noticed you and stands in light: its face, and an icon for what it does next if you wait (fangs for a bite, an arrow for a step). The row grows as more notice you and shrinks as they die. Nothing shows for a creature in the dark.
- Tapping a plaque will frame that creature on the field, with its name, its hearts and a small arrow for its next step. No other marks go on the field.
- Behind the scenes: the game can now work out what each creature you can see would do if you waited.
- Decisions: D-357.

## 0.2.118 (2026-10-25)
- A new creature, the lampmoth: a pale moth with cream wings and an amber spot like a flame. It is drawn to light. While your lantern is lit it flies at you from anywhere in the room and bites for 1; switch the lantern off and it heads for the nearest lit torch instead, and waits there. With no light at all it stays where it is.
- One hit of anything kills it.
- On each floor from depth 2 to depth 4, one room holds a lampmoth in place of its rat.
- Its bite is silent for now.
- Decisions: D-356.

## 0.2.117 (2026-10-25)
- No change to play: four of the owner's answers written down.
- Decided for the next step: the creature drawn to light walks toward the nearest light. While your lantern is lit, that is you, and it bites like a rat; with the lantern off it heads for a lit torch instead. Its look comes as a mock-up.
- Decided for later: a Bestiary page shows the creature's drawing, name and counts when you first meet it, how it acts once you beat one, and how to fight it once you beat three.
- Held sideways, the screen keeps showing the same room, only bigger when that fits, as it does now.
- The first cave keeps its warrens and dungeon below depth 5; where it ends, and its portal, wait for the portal step.
- Behind the scenes: the modes' decisions moved to their own archive file, and the Bestiary question is renamed Q-059, since Q-058 was already used.
- Decisions: D-351 to D-355. Questions closed: Q-046, Q-048, Q-059.

## 0.2.116 (2026-10-25)
- No change to play: a check-in on the project, and the owner's answers written down.
- In Normal, the knife in your hand stays with you through a fall, for now, so you can go after your bag armed.
- The starting region, the woods around home, is named Hearthwood.
- Decided for a later step: every creature you can see will show its next move, to try out; nothing shows for a creature hidden in the dark.
- Decided for later: the Journal's Bestiary gets a page for each creature you meet, with how many you met and beat and how to fight it, showing more the more you meet it.
- Decisions: D-347 to D-350. Questions closed: Q-045, Q-047, Q-049. Questions opened: Q-058.

## 0.2.115 (2026-10-25)
- Settings, opened from the pause menu, now has a line under the seed: "Way to play: Normal" (or Gentle, or Hardcore). From the title, where no journey is open, it isn't there.
- Picking it shows the three ways with the one you play picked. The harder ones are grey; landing on one says "Only an easier way can be picked."
- Picking an easier way asks first, "Play Gentle?" with "There is no going back.", No picked. Yes changes it and saves it with the journey; No goes back. Esc or P go back a page.
- From Normal to Gentle, bags already left where you fell stay there to fetch; only falls from then on keep the bag.
- Decisions: D-346.

## 0.2.114 (2026-10-25)
- In Normal, a fall now leaves your bag where you fell: a small leather pouch tied at the neck, lying on the floor with everything that was in it. You wake with an empty bag; the knife stays in your hand.
- Walk onto it to take everything back, with "You take back your bag." Stacks top up first. What doesn't fit stays in it, with "Your bag is full.", for later.
- Each fall leaves its own bag, so falling again before you fetch one loses nothing. The map shows each one as a small brown dot until you take it back.
- Gentle still keeps the bag through a fall, and Hardcore starts the world over.
- Decisions: D-345.

## 0.2.113 (2026-10-25)
- In Hardcore, a fall now ends the journey. The fall plays as before, then at its darkest a page says "Your journey ends." with Same world (picked) and New world.
- The world starts over as on day one: every room, the bag, the level, the map and the time of day. The profile's Records stay, and the fall counts in them. The new world is saved at once, so closing the game can't bring the old one back.
- Same world begins again from the same seed; New world from the seed typed in Settings, or a random one. The hero wakes with the line "The world begins again." Esc or P go to the title instead, where Continue goes on in the world begun again.
- Gentle and Normal falls play as before, for now (Normal comes next).
- Decisions: D-344.

## 0.2.112 (2026-10-25)
- New journey now asks how you want to play: Gentle, Normal or Hardcore, with Normal picked to begin with. It comes after "Start over?" Yes too, and Esc or P go back to the title with the saved journey kept.
- The picked way shows its note under the menu: "A fall keeps the bag.", "The bag waits where you fall." or "One life. A fall starts the world over."
- The way you pick is saved with the journey, but for now every fall still plays as Gentle; Hardcore and Normal come in the next steps. A journey saved before this plays as Gentle.
- Decisions: D-341, D-342; D-343 moved the stash chest's decisions to the archive.

## 0.2.111 (2026-10-25)
- On a stash chest's panel, a new line sits between the bag's row and Close: Deconstruct chest. Down from the bag's row reaches it, then Close.
- Picking it on an empty chest puts the chest back in your bag, whole, and the ground is clear again. A turn passes and the line says "You take down the stash chest."
- With anything still inside it says "Empty the chest first."; with a stash chest already in the bag "You already carry a stash chest."; and with every slot taken "Your bag is full." Then it stays, and no turn passes.
- Decisions: D-340; this ends the stash chest's steps (D-325).

## 0.2.110 (2026-10-25)
- Stacks are bigger: up to 20 Wood, Stone, oilcaps or heartcaps, and up to 5 flasks or potions. The workbench and stash chest are still 1 each, and you still carry only one of each.
- When a stack is full, the next one starts in a free slot, so one kind can fill several slots. Only when every stack of it is full and no slot is free does it stay behind, with the same lines as before.
- In a stash chest, picking a stack moves as much as fits: it tops up a stack of its kind, then takes free slots. What can't go stays where it was, with "Your bag is full." or "The chest is full."
- Decisions: D-339; this builds D-333.

## 0.2.109 (2026-10-25)
- Tidying, with nothing in the game changed: the notes Claude reads at the start of each conversation are shorter, and older changelog entries and finished build steps moved to the archive. This Version history still holds every version.
- A check now fails when a notes file grows past its size limit, and an audit like this one comes every 20 versions. The next is at 0.2.129.
- Decisions: D-336, D-337, D-338.

## 0.2.108 (2026-10-25)
- A fall now leaves the world as it was. You still wake at the first room's start with full hearts and the starting oil, but every room stays as you left it: the same seed and layouts, rats where they were, torches still lit, your set-down workbench and stash chest in place with what the chest holds, and the map of every room you found.
- Settled for later: stacks by kind (20 of Wood, Stone, oilcaps and heartcaps, 5 of flasks and potions), several stacks of a kind in the bag and in a chest, and three ways to play: Gentle keeps your bag after a fall, Normal leaves it where you fell, and Hardcore is one life. Until the modes come, a fall keeps your bag.
- Decisions: D-332 to D-335. Questions closed: Q-058.

## 0.2.107 (2026-10-25)
- On a stash chest's panel, the gold frame now reaches the bag's row too: Down from the chest's second row goes to the bag, and Down again to Close.
- Press Enter or Space, or click or tap, on a filled slot and its whole stack moves to the other side: from the bag into the chest, or out of the chest into the bag. It joins a stack of its kind when all of it fits there, or takes the next empty slot. It takes no turn and says nothing.
- When it can't all go, the line says "Your bag is full." or "The chest is full.", and nothing moves. Each chest keeps its own things, kept in your save. A fall loses a chest set down, and what it held, as its room begins again.
- Decisions: D-331. A question for the owner: Q-058.

## 0.2.106 (2026-10-25)
- Walk into a stash chest you set down, or click or tap it from beside it, to open it. The room dims behind a box headed STASH CHEST, with its 12 empty slots in two rows, the bag's 6 slots under them, and Close. Opening it takes no turn.
- Arrows or a tap move a gold frame over the chest's slots; Down past the second row reaches Close. Close, Esc, P or a tap outside the box closes it. The slots are empty for now: putting things in and taking them out comes next.
- Decisions: D-330.

## 0.2.105 (2026-10-25)
- Choose the stash chest in the bag and press Set down, and it goes down the workbench's way: the free sides beside you are marked, and an arrow, a swipe, or a click or tap on a mark sets it there. A turn passes and the line says "You set down the stash chest."
- It goes only on the surface, on empty ground away from the room's edge, and never where it would cut the room in two. Set down, you can't walk through it, but light passes over it. Walking into it does nothing yet; opening it comes next.
- Decisions: none new; this builds D-329.

## 0.2.104 (2026-10-25)
- Wood's first line in the bag now says "Three make a workbench.", so it is plain that 3 Wood make something, as oilcaps say they make a flask.
- How to play has a fourth page, Crafting, after Keyboard: choose a stack in the bag and press Make; 3 oilcaps make an oil flask, 3 Wood a workbench, and you walk into a workbench to make more there.
- Setting the stash chest down is settled for next time: the workbench's way. Older decisions move to an archive file.
- Decisions: D-327, D-328, D-329.

## 0.2.103 (2026-10-25)
- The workbench panel has a new top line: Stash chest, with its cost, 3 Wood · 3 Stone, on the right. Picking it uses them up and puts a stash chest in the bag. A turn passes, the line says "You make a stash chest.", and the panel stays open. The panel's lines now sit at its left.
- With too few, the line shows dim and says "You need 3 Wood and 3 Stone."; with a chest already in the bag, "You already carry a stash chest." Neither takes a turn. You carry only 1.
- Choosing the chest in the bag says one of its lines in turn, such as "A stash chest, empty." Its look is a rounded wooden lid, grey stone at its corners and a gold latch. Setting it down comes next.
- Decisions: D-326.

## 0.2.102 (2026-10-25)
- The stash chest is settled: it is made at the workbench for 3 Wood and 3 Stone, the first use for stone. It has a rounded wooden lid, grey stone at its corners and a gold latch.
- One chest holds 12 slots, two rows like the bag's, in stacks of 3. You can set down as many as you like, and each keeps its own things; you carry only 1.
- It comes in five steps: make it, set it down, open it, put things in and take them out, and take it down, only when it is empty. Nothing changes in the game yet.
- Decisions: D-324, D-325.

## 0.2.101 (2026-10-25)
- Walk into a workbench you set down, or click or tap it from beside it, to open its panel. The room dims behind a box headed WORKBENCH, with Deconstruct workbench and Close. Up and Down choose, Enter, Space or a tap picks; Close, Esc, P or a tap outside the box closes it. Opening it takes no turn.
- Deconstruct workbench puts it back in the bag, whole, and the ground is clear again. A turn passes and the line says "You take down the workbench." With a workbench already in the bag it says "You already carry a workbench.", and with every slot taken "Your bag is full."; then it stays, and no turn passes.
- Things made at the workbench, the stash chest first, will go in this panel, one line each, above Deconstruct.
- Decisions: D-323.

## 0.2.100 (2026-10-25)
- Choose the workbench in the bag and press Set down, or Enter or Space: the bag closes and the free tiles beside you are marked. Press an arrow, swipe, or click or tap a marked tile to set it there. A turn passes and the line says "You set down the workbench." Esc, or a tap anywhere else, keeps it in the bag.
- It goes only on the surface, on empty ground: never on the room's edge, a doorway, a cave mouth or stairs, never where something lies, and never where it would cut the room in two. Below ground, Set down says "Only on the surface."; toward a side it can't go on, "There is no room there." Neither takes a turn.
- Set down, it blocks the way like a tree, and light passes over it. The bag is free again, so you can make another. Bumping it does nothing yet: its panel comes next.
- Decisions: D-322.

## 0.2.99 (2026-10-24)
- Make now turns 3 Wood into a workbench: choose Wood in the bag and press Make, or Enter or Space. A turn passes, the line says "You make a workbench.", and the bag stays open on it. Its look is a plank table on four legs, with a grey vise on one corner and a shelf between the legs.
- You carry only 1 workbench. With one already in the bag, Make says "You already carry a workbench.", free, and the Wood stays. Choosing it says one of its lines in turn, such as "A workbench, folded small." Setting it down on the surface comes next.
- Walking into one of the trees around a woods room's edge now says "The forest will not yield." or "These trees are too old to fell.", in turn. No turn passes.
- Decisions: D-319, D-320, D-321.

## 0.2.98 (2026-10-24)
- Every tree inside a woods room can now be chopped; the ring of trees around its edge stays as its wall. Walk into one to bump it, a turn each: "You hack at the tree.", "Chips fly from the trunk.", "The tree groans."
- The fourth bump fells it and puts 3 Wood in the bag, with a line that changes each time, such as "The tree falls. You take wood." It leaves a stump in one of three looks: a clean cut with a pale ring, a splintered one, or a low mossy one with roots. You can walk over a stump, and your light passes over it.
- With room for fewer than 3 Wood, the tree still falls, and the rest lies as sticks on the stump and the tiles nearest it; those sticks never grow back. With 3 Wood carried, the fourth bump says "You can't carry more wood.", free, and the tree stands. A stump grows back into a tree after 3 days, 900 turns, out of sight, if nothing lies on it and the room stays joined.
- Decisions: D-317, D-318 (D-310 to D-316 archived).

## 0.2.97 (2026-10-24)
- Each woods room now has one fallen branch, in one of three looks: a bough with two twigs, a shorter one with leaves at its end, or a snapped bough with a pale ring and moss. It blocks your way like a tree, but your light passes over it, and the map outlines it.
- Walk into it to bump it, a turn each. The first bump says "The branch creaks."; the second breaks it, leaving grass, and puts 2 Wood in the bag in the branch's look, with a line that changes each time, such as "The branch snaps. You take wood."
- With room for only 1 Wood, it still breaks, and the other piece lies there as a stick to pick up later; that stick never grows back. With 3 Wood carried, the second bump says "You can't carry more wood.", free, and the branch holds. A broken branch grows back after 3 days, 900 turns, within 2 steps of where it lay, as a deposit does.
- Decisions: D-316.

## 0.2.96 (2026-10-24)
- Each woods room now has 3 sticks lying on the grass, each in one of three looks: a straight stick, a forked twig with a leaf, or a crooked branch. Walk onto one to put it in the bag as Wood, in stacks of 3, with a line that changes each time, such as "You pick up a stick." The bag shows the look of the last one you picked.
- Choosing Wood in the bag gives a line such as "Dry wood, for crafting later." With 3 carried, a stick stays where it lies. Picked sticks grow back after a day, like mushrooms.
- Decisions: D-314, D-315.

## 0.2.95 (2026-10-24)
- A broken deposit now grows back after 3 days, 900 turns, as picked mushrooms and flasks do, but not always on the same tile: it comes back within 2 steps of where it stood, or on its old tile again, so a room never looks quite the same. It only comes back out of your light, on free floor off the room's edge, never cutting the room in two; walk into a room after long enough away and it is already there.
- A boulder you have only chipped or cracked keeps its cracks until you break it. Boulders broken in a save from before this version stay gone.
- Decisions: D-313.

## 0.2.94 (2026-10-24)
- Walking into a deposit now mines it, a turn each bump. The first says "You chip at the boulder.", the second "The boulder cracks.", and the third breaks it, leaving floor where it stood, with a line that changes each time, such as "The boulder breaks. You take a stone."
- The stone, a small round grey pebble, goes into the bag in stacks of 3. Choosing it gives a line such as "A plain stone, for crafting later." It is for crafts that come later. With 3 stones carried, the third bump says "You can't carry more stones." and the boulder holds, costing no turn.
- Decisions: D-312.

## 0.2.93 (2026-10-24)
- Each room of the Cave area, depths 2 to 4, now holds 3 deposits: round boulders of grey rock, each with one seam. They block your way like a wall, but your light passes over them, and the map outlines them.
- Deposits never cut a room in two, and they stay off the room's edges and clear of anything lying or standing there. Bumping one does nothing yet; mining comes next.
- Decisions: D-310, D-311.

## 0.2.92 (2026-10-24)
- Ideas recorded: many enemies mixed from a few building blocks (how they move, attack and meet light), and bosses in phases that test what you already know, with notes on balancing them. Nothing in the game changes.
- Decisions: none.

## 0.2.91 (2026-10-24)
- Three heartcaps now make a Healing potion, a round red bottle with a cork. Choose heartcaps in the bag and press Make, beside Eat (or C on a keyboard): it takes a turn and says "You make a healing potion." Enter or Space still eats one.
- Choose the potion and press Drink (or Enter or Space) to heal 4 hearts, never above full, in one turn. The line changes each time, such as "You drink a healing potion." At full health Drink shows dim and says "You aren't hurt."
- Potions stack to 3, like flasks; with 3 carried, Make says "You can't carry more potions." and keeps the heartcaps.
- Decisions: D-309.

## 0.2.90 (2026-10-24)
- Heartcaps can now be eaten. Choose them in the bag and press Eat (or Enter or Space): one heals 1 heart and takes a turn, and the bag stays open so you can eat another. The line changes each time, such as "You eat a heartcap."
- At full health Eat shows dim; pressing it says "You aren't hurt.", keeps the heartcap and takes no turn.
- A healing potion made from heartcaps comes in a later step.
- Decisions: D-308.

## 0.2.89 (2026-10-24)
- Mushrooms, herbs and oil flasks you take now grow back where they lay, each on its own clock from the turn you took it: oilcaps, heartcaps and herbs after a day, 300 turns, and a flask after 3 days, 900 turns. The knife never does. A mushroom comes back with the tone it had.
- Nothing appears before your eyes: a thing comes back only on a tile out of your light, with nothing standing or lying on it. Walking into a room, whatever grew while you were away is already there.
- Things taken in an old save before this version stay gone.
- Decisions: D-306, D-307.

## 0.2.88 (2026-10-24)
- Every oilcap and heartcap now has its own slight tone: some caps a little more golden or brown, some heartcaps a little more orange or plum, a little lighter or darker. The same seed always gives the same mushrooms the same tones.
- Rooms an old save already reached keep their mushrooms' plain colour.
- Decisions: D-305, D-306.

## 0.2.87 (2026-10-24)
- Heartcaps now grow in about half the rooms from the first cave down: a bright red mushroom with pale spots, a round cap on a short stem. Walk onto one to put it in the bag, in stacks of 3, with a line that changes each time, such as "You pick a heartcap." Choosing it in the bag says a hint, such as "It might mend a wound."
- Eating a heartcap, and making a healing potion from several, come in later steps.
- Decisions: D-303, D-304.

## 0.2.86 (2026-10-24)
- A rat still fleeing when you leave a room has calmed down when you come back. It stays put until it notices you again, as it does after its 4 turns, instead of running again on your return.
- Decisions: D-302.

## 0.2.85 (2026-10-24)
- A hurt rat now tosses a coin: half the time it flees, as before, and half the time it stands its ground and keeps biting, with a line that changes each time, such as "The rat squeaks and bares its teeth."
- A fleeing rat runs for 4 turns, then stops. It comes back only once it sees you again, in the light with nothing in between, so it no longer hides in the far corner for good.
- Decisions: D-301.

## 0.2.84 (2026-10-24)
- Oilcaps can now be crafted: choose 3 oilcaps in the bag and press Make, or Enter or Space, to turn them into an oil flask, with the line "You make an oil flask." It takes a turn, like a pour, and the bag stays open on the new flask, ready to pour.
- With fewer than 3 oilcaps, Make shows dim and does nothing. With 3 flasks already carried, it says "You can't carry more flasks." and the oilcaps stay.
- Decisions: D-299, D-300 (D-279 to D-298 moved to an archive file).

## 0.2.83 (2026-10-24)
- Mushrooms called oilcaps now grow from the first cave down: one amber oilcap in every room, somewhere on the open floor. Walk onto one to put it in the bag, in stacks of 3, with a line that changes each time, such as "You grab the oilcap."
- Choosing oilcaps in the bag gives a hint, such as "Three make an oil flask.", without passing a turn. Crafting them into a flask comes in the next step. The open bag sits a little higher, so the line under the room stays in view.
- Decisions: D-295 to D-298.

## 0.2.82 (2026-10-24)
- On a slow phone the hero and creatures now slide as fast as on a quick one, so walking no longer slows down when the game draws fewer frames, such as with many things placed in a room.
- The dev line at the bottom starts with fps, the frames drawn each second: 60 is smooth, under 30 feels choppy.
- Decisions: D-294.

## 0.2.81 (2026-10-24)
- Levels now give something: each level past the first gives 1 ember, also for levels already reached. A new Journal tab, Growth, after Records, shows your embers and your hearts. Add a heart spends an ember on one more heart, up to 10 in all; it arrives full, and it can't be taken back. Past 5, hearts fill a second row.
- The owner's new ideas are in the wish list: resources and crafting, abilities, more varied places, waystones, a ship, NPCs, a cult to talk to, quests and companions.
- Decisions: D-293. Questions closed: Q-050.

## 0.2.80 (2026-10-24)
- A hurt rat now flees: after a lantern hit it says "The rat squeaks and flees." and steps one tile away from you each turn, the farther side first, else the other side. It only bites when it has nowhere to run, and it never turns back. A knife still kills it in one stab.
- Decisions: D-292.

## 0.2.79 (2026-10-23)
- The Journal's Records show an eighth line, Time played, under Torches lit: how long this profile has played, written as in its Profiles box, such as 1h 23m, or 23m under an hour.
- Decisions: D-291.

## 0.2.78 (2026-10-23)
- Each Profiles box shows how long that profile has played, at the right end of the Deepest line, in hours and minutes, such as 1h 23m, or only minutes under an hour, such as 23m. Only time in a journey counts: the menus, the Journal and a hidden page or locked phone do not. It counts from 0 from now on, also for profiles made before this.
- Decisions: D-290.

## 0.2.77 (2026-10-23)
- The name pad (Name your profile, and Rename profile) has a Back key on its own row under Del and OK, so a phone can leave it too. It goes back to Profiles with nothing made, or with the old name kept, as Esc does.
- On the Profiles screen, Look now reads Change look.
- Decisions: D-288, D-289.

## 0.2.76 (2026-10-23)
- Each Profiles box shows that profile's hero, in its cloak, eyes, trim and clothes, on a small lit patch of crypt floor at the box's left, with the name and Deepest beside it. Empty boxes stay as they were.
- Decisions: D-287.

## 0.2.75 (2026-10-23)
- The Journal's Records show a seventh line, Torches lit, under Flasks poured: every time you light a torch, on all your journeys. A torch lit again after a fall or "Reset room" counts again. It counts from 0 from now on, also for profiles made before this.
- Decisions: D-286.

## 0.2.74 (2026-10-23)
- The Journal's Records show a sixth line, Flasks poured, under Steps: every flask of oil poured into the lantern, by your hand or by itself, on all your journeys. It counts from 0 from now on, also for profiles made before this.
- Decisions: D-285.

## 0.2.73 (2026-10-23)
- The Journal's Records show a fifth line, Steps: every tile you have walked onto, on all your journeys. It counts from 0 from now on, also for profiles made before this.
- The idea of achievements is recorded: each thing Records counts can have its own achievements at higher and higher numbers, such as many tiers of steps, some with rewards. Nothing else in the game changes.
- Decisions: D-283, D-284.

## 0.2.72 (2026-10-23)
- Ideas recorded: looks and unique things earned in play with their own currency, never bought, such as zebra, cow-spot or camo cloaks; calm or intense play chosen by where you go; mining, fishing, farming and harvesting for later; co-op as a someday idea. Nothing in the game changes.
- Decisions: D-280, D-281, D-282.

## 0.2.71 (2026-10-23)
- Decisions D-270 to D-278 moved, unchanged, to an archive file. Nothing in the game changes.
- Decisions: D-279.

## 0.2.70 (2026-10-23)
- A new profile now chooses its clothes after its trim: Choose your clothes shows four heroes, two to a row, in the cloak, eyes and trim just picked: Cloak (as before), Belted, Short or Tattered. The belt and its buckle take the lantern's trim. OK makes the profile; Back returns to the trim.
- Look on the slot screen now opens the cloak, the eyes, the trim, then the clothes; OK on the clothes keeps all four, and Esc after the cloak keeps the old look. The cloak screen's heroes wear the clothes picked, and the red flash of a bite keeps their shape.
- Profiles made before this keep the long cloak, as before.
- Decisions: D-278.

## 0.2.69 (2026-10-23)
- A new profile now chooses its lantern's trim after its eyes: Choose a trim shows the lantern hand close up, with a brass, iron, copper, silver, verdigris or blackened cap and base. The flame and its light stay the same. OK makes the profile; Back returns to the eyes.
- Look on the slot screen now opens the cloak, then the eyes, then the trim; OK on the trim keeps all three, and Esc on the eyes or trim keeps the old look. The cloak screen's heroes carry the trim picked.
- Profiles made before this keep brass, as before.
- Decisions: D-277.

## 0.2.68 (2026-10-23)
- A new profile now chooses its eyes after its cloak: Choose your eyes shows the hero's head close up, in the cloak just picked, with bone, ice, moss, sky, silver or brown eyes. OK makes the profile; Back returns to the cloak.
- Look on the slot screen now opens the cloak, then the eyes; OK on the eyes keeps both, and Esc there keeps the old look. The cloak screen's heroes wear the eyes picked.
- Profiles made before this keep bone eyes, as before.
- Decisions: D-276.

## 0.2.67 (2026-10-23)
- A new profile now chooses its cloak after its name: six heroes on one screen, in teal, moss, heather, rust, indigo or sand. Pick one with a tap, the arrows or a click, then OK. Back returns to the name pad with the name kept.
- The slot screen has a Look line between Rename and Delete. Look, then a profile's box, opens the same screen on its cloak; OK keeps the new one, and Back or Esc keeps the old. The hero wears the cloak on the title and in play.
- Profiles made before this wear teal, as before.
- Decisions: D-275.

## 0.2.66 (2026-10-23)
- The slot screen has a Rename line above Delete. Rename, then a profile's box, opens the name pad on its name: Del trims it, letters add to it, and OK keeps the new name. OK with nothing typed makes it unnamed again, and Esc keeps the old name.
- While picking, the heading asks "Rename which?" and Rename reads Cancel. An Empty box can't be renamed.
- Decisions D-261 to D-269 moved, unchanged, to an archive file.
- Decisions: D-273, D-274.

## 0.2.65 (2026-10-23)
- Picking an Empty slot now asks for a name first: a pad of letters A to Z, with Del and OK, drawn like the seed pad. Tap or click the letters, walk them with the arrows, or type on a keyboard. A name has up to 12 letters, in capitals, and shows on the slot screen.
- OK with nothing typed makes the profile unnamed (Profile 2), and Esc goes back to the slots without making it.
- Plans: a profile's name and look may change later, from the slot screen. A new open question, whether names may hold a space or digits (Q-054).
- Decisions: D-272. Questions closed: Q-053. Questions opened: Q-054.

## 0.2.64 (2026-10-23)
- The game now opens on a Profiles screen with three slots. Each used slot shows its profile's name and deepest depth; an unnamed profile shows as Profile 1, 2 or 3. Pick one to play as that profile, with its own journey and Records. Picking an empty slot makes a new profile there.
- Delete, then a slot, asks "Delete …? Lost for good." with No picked; Yes removes the profile and its journey. A Profiles line on the title screen, after Settings, goes back to the slots.
- Plans: a new open question, whether a profile's name or look may change later (Q-053).
- Decisions: D-271. Questions closed: Q-051. Questions opened: Q-053.

## 0.2.63 (2026-10-23)
- A Journal now opens from the title screen, under New journey, and from the pause menu, under Resume. It has one tab for now, Records: your deepest depth, the creatures you have beaten, your falls and the rooms you have found, counted across all your journeys from now on.
- Your deepest depth carries over. The other counts start at 0. A journey where a dev tool jumped to a depth doesn't count, as for the deepest depth.
- Plans: a new open question about play data, kept on the device or sent (Q-052).
- Decisions: D-270. Questions opened: Q-052.

## 0.2.62 (2026-10-23)
- Behind the scenes, nothing changes in the game. How a creature acts is now written as named ways it can have: the rat chases, and the gloamling chases and shuns light. A new creature can mix these ways, and new ways can be added later.
- Decisions: D-269.

## 0.2.61 (2026-10-23)
- Behind the scenes, nothing changes on screen. The game can now keep up to three profiles on one device, so later each person can have their own name, look, Records and journey. For now everyone plays as the first profile, which keeps your current journey and your deepest depth.
- Planned next, one small step at a time: a screen to pick a profile, typing a name (up to 12 letters), then choices for the cloak's colour, the eyes, the lantern's trim and the clothing.
- Decisions: D-268.

## 0.2.60 (2026-10-23)
- Behind the scenes, nothing changes on screen or in sound. Each turn now writes a short list of what happened: a step, a hit, a bite, a fall, the lantern switched, a room entered or found, a level reached, an item taken, a herb eaten, a flask poured, a torch lit. The sounds now play from this list, and later Records, quests and feats will read it too.
- Decisions: D-267.

## 0.2.59 (2026-10-23)
- Behind the scenes, nothing changes on screen. A journey saved by an older version of the game is now brought up to date when you continue it, one small numbered step at a time, instead of being lost. Saves the game can't read are still dropped quietly.
- Decisions: D-266.

## 0.2.58 (2026-10-23)
- Plans only, nothing changes in the game. The game is now built to grow: Claude suggests ideas from other successful games along the way, and new parts are made so more can be added later.
- Stats, and later quests, a bestiary and achievements, will live in one Journal with tabs; the first tab is Records. Four behind-the-scenes steps come first: old saves upgraded instead of lost, a list of what happens each turn, a profile save, and creature behaviours as data.
- A new glossary page keeps the game's words consistent.
- Decisions: D-261 to D-265.

## 0.2.57 (2026-10-23)
- The title screen no longer shows your deepest depth under the menu. The game still remembers it on this device, ready for a stats page later.
- Decisions: D-260.

## 0.2.56 (2026-10-23)
- A rat's bite makes a sound: two low, dry snaps of teeth with a hint of breath. When you hit and get bitten in the same turn, the bite comes a moment after your hit, so you hear both. Each bite varies a little, like the hits. The gloamling's bite stays silent for now. Only with Sound: On.
- The sound board has A rat bites, and Knife hit, then a rat bites.
- Decisions: D-259.

## 0.2.55 (2026-10-23)
- Hitting a creature makes a sound: a soft, low "dmp". With the knife held, a small tick rides on top. Each hit varies a little in pitch and loudness, so a fight doesn't sound like a machine. Only with Sound: On.
- The sound board has Lantern hit, Knife hit and A fight, 3 knife hits.
- Decisions: D-258.

## 0.2.54 (2026-10-23)
- The lantern ticks as it goes on or off: a soft, low "tok", a little higher for on and lower for off, so you can tell which by ear. It ticks whether you switch it yourself or it switches by itself at the daylight's edge. Only with Sound: On.
- The sound board has Lantern on and Lantern off.
- Decisions: D-257.

## 0.2.53 (2026-10-23)
- Settings has a new line, "Sound: Off", above Version history. Sound starts off while the sounds get ready for players; pick it (or press Left or Right) to switch it On and back. This device remembers your choice.
- The game's first sound: a soft, light footstep each time the hero walks a tile. No two steps sound alike: each has its own pitch and loudness. It is made in code, with no sound files. A browser plays sound only after your first tap, click or key, so the game stays quiet until then.
- Sound board: a page with a button for each of the game's sounds, to hear them without playing (tools/soundboard.js, for the owner's PRs, not in the game).
- Decisions: D-255, D-256.

## 0.2.52 (2026-10-22)
- Settings has a new line, Version history, above Back. It lists every
  version from 0.0.1 to this one, newest first, each with a short title.
  Tap one, or press Enter or Right, to open it: its date and every change
  in it, the same lines as this changelog. Left or a second tap closes it.
  Swipes and Page Up and Page Down scroll a page.
- Under Settings on the title, the hero sits one more tile higher, clear
  of its heading now that Settings has seven lines.
- The pixel font gains the marks the changelog uses: quotes, ×, <, >, =,
  # and the three-dot ….
- A test checks every version and every line against this changelog,
  word for word, so the two can't drift apart.
- Decisions: D-254.

## 0.2.51 (2026-10-22)
- The knife stabs: hitting a creature with the knife held, the hero
  darts half a tile toward it and springs back, in a tenth of a second.
  The lantern's swing stays as it was. None with reduced motion.
- Decisions: D-253.

## 0.2.50 (2026-10-22)
- The first gear: a knife. It lies in the first cave, the room you reach
  down the crypt's stairs (depth 2), on a tile the seed picks at least 5
  steps from the stairs.
- Walk onto it and the hero holds it at once ("You take the knife."). It
  hits for 2 where the lantern hits for 1, so a rat falls in one hit.
- The bag shows it in its own "HELD" slot above the six slots. The bag
  panel is a little taller for it.
- It is kept through a fall, and no new knife lies in the cave while the
  hero holds one.
- Decisions: D-252.

## 0.2.49 (2026-10-22)
- A stack in the bag holds at most 3 flasks. Walk onto a 4th and it stays
  on the floor for later (it never starts a second stack), and the text
  line says "You can't carry more flasks."
- D-234 to D-246 moved to `docs/archive/DECISIONS-LAST-STEPS-1.md`.
- Decisions: D-250, D-251.

## 0.2.48 (2026-10-22)
- Settings has a new line, "Flasks: By hand". Pick it (or press Left or
  Right) to switch to "By itself". This device remembers your choice.
- By itself, a flask from the bag pours itself into the lantern once the
  oil is at 55% or lower, so none is wasted. It costs no turn, and the
  text line says "You pour a flask." (unless something else happened that
  turn, like a bite).
- On the title screen, the hero and their light sit one tile higher while
  Settings is open, so its heading no longer covers them.
- Decisions: D-249.

## 0.2.47 (2026-10-22)
- The bag: walking onto an oil flask now puts it in your bag instead of
  pouring it straight in. Flasks stack in one slot, with a count.
- A bag button sits left of the map button (under it, sideways); I opens
  it too. The bag opens as a panel over the bottom of the room, with six
  slots, so the hero and the hearts stay in view. If the hero stands
  where the panel would hide them, it opens over the top instead.
- Tap a flask, then Pour (or Enter or Space) to pour it into the lantern.
  Pouring takes one turn and closes the bag. The button (now a cross), I,
  Esc or a tap outside the panel close it without a turn passing.
- The bag is kept through a fall, and in the save. Older saves start
  with an empty bag.
- Decisions: D-247, D-248.

## 0.2.46 (2026-10-22)
- Levels: experience now adds up to levels. Level 2 takes 10, level 3
  takes 30, level 4 takes 60, each 10 more than the last.
- A small "LV 1" box sits after the hearts (under the oil bar, sideways).
- Reaching a level, the text line says "You feel stronger. Level 2."
  A level gives nothing else yet.
- Dev stats line: shows the experience total.
- Decisions: D-246.

## 0.2.45 (2026-10-22)
- Experience: beating a creature or stepping into a room you have never
  been in gives 1. A small amber "+1" rises over the hero when it does.
  Experience is kept through a fall and with the saved journey.
- A journey saved before this update gets 1 for each room already on its
  map (not the starting room), as soon as it is continued.
- Decisions: D-245.

## 0.2.44 (2026-10-22)
- Gloamlings now live on every floor from depth 5 down, the dungeon too,
  and there are three a floor instead of two.
- Fix: a gloamling backing out of your light no longer walks into a
  torch's light; with nowhere dark or lantern-only to go, it stays.
- Decisions: D-243 (supersedes part of D-241), D-244 (supersedes D-242).

## 0.2.43 (2026-10-22)
- A second creature, the gloamling: a small shadow with pink eyes that
  shuns light. It won't step into any light, backs away when light
  reaches it, and doesn't bite while lit, so it only gets you when the
  lantern is off or down to an ember.
- Two rooms on each warren floor (depths 5 to 7) hold one, in place of
  their second rat. It can be spawned in dev mode.
- Decisions: D-240, D-241, D-242.

## 0.2.42 (2026-10-22)
- Saving: the journey is kept on this device after every turn. Continue
  appears first on the title once a journey is saved, and picks it up
  where it was, even after closing the page.
- Back to title keeps the journey. New journey asks "Start over? The
  saved journey is lost." first, with No picked.
- Decisions: D-238, D-239 (supersedes the last part of D-187).

## 0.2.41 (2026-10-22)
- A proper fall: at 0 health the hero lies down where they fell, the
  light closes to the deepest dark, then opens where they wake. With
  reduced motion, only a moment of dark.
- `src/main.js` is split in three: the screens and the drawing each have
  their own file. The game plays the same.
- Decisions D-219 to D-233 moved to `archive/DECISIONS-DEEPER.md`, and
  the Stage label in `PROGRESS.md` now says stage 0.2's last steps.
- Decisions: D-234 to D-237.

## 0.2.40 (2026-10-21)
- The map and the Seed Explorer name each floor's area beside its depth:
  "DEPTH 9 · DUNGEON", with Crypt, Cave and Warren above it. The surface
  stays SURFACE.
- Walls on the map take their area's colour: crypt brick, cave grey,
  warren brown, dungeon blue, woods green. The area's name in the heading
  is in the same colour.
- Decisions: D-233.

## 0.2.39 (2026-10-21)
- The game remembers the deepest depth the hero has walked to, on this
  device, across journeys. The title screen shows it in grey under the
  menu ("Deepest: depth 7") once the hero has gone below the surface.
- A dev Go to depth jump stops the journey counting until a New journey.
- Decisions: D-232.

## 0.2.38 (2026-10-21)
- Deeper floors hold more rats: from depth 5 down every room has two, one
  guarding the flask and one anywhere in the dark. Depths 2 to 4 keep one
  a room. Everything else in a seed's rooms stays where it was.
- New `docs/RESEARCH.md`: the owner's wish list, and what Hoplite and
  similar games do well, with the ideas the owner wants kept for later.
- An inventory step is planned just before first gear (step 41).
- Decisions: D-230, D-231. Questions opened: Q-049.

## 0.2.37 (2026-10-21)
- The dungeon (depth 8 down) now has its own look: the crypt's bricks and
  slabs in deeper, colder, bluer colours, as in option B of the step 59b
  mock-up. The stairs keep their colours. The crypt at the top is unchanged.
- Decisions: D-229.

## 0.2.36 (2026-10-21)
- A new kind of place, the dungeon, from depth 8 down: six rooms in a
  3 × 3 grid, grown like the warren with one extra doorway, so one way
  round makes a loop. The stairs down are in the room farthest away.
- Each dungeon room is 3 or 4 straight-walled halls joined by one-tile
  corridors that turn once, in the crypt's bricks. Earth warrens now stop
  at depth 7.
- Decisions: D-228. Questions narrowed: Q-038.

## 0.2.35 (2026-10-21)
- From depth 5 down, each earth burrow floor is now a warren: five rooms
  in a 3 × 3 grid, grown as a winding chain with dead ends and one way
  through. The stairs down are in the room farthest from the stairs up.
  Depths 2 to 4 are unchanged, and every seed keeps its rooms there.
- Decisions: D-227 (supersedes part of D-203).

## 0.2.34 (2026-10-21)
- A rat in light now notices you only if it has a clear straight line to
  you, with no wall between. A torchlit rat behind a wall stays put.
  Distance still doesn't matter, and a bite or a hit still makes it notice.
- Decisions: D-226 (supersedes part of D-126).

## 0.2.33 (2026-10-21)
- In the game, a thin pale blue line marks each doorway, across its outer
  edge where you step through to the next room, the cave mouth too. It
  pulses gently, and holds still with reduced motion. It shows once the
  doorway's tile has been seen, so it stays in memory's dim light.
- Decisions: D-225 (built).

## 0.2.32 (2026-10-21)
- On the map screens, in the game and the Seed Explorer, rooms side by
  side are drawn one tile apart, with a dark seam between them, so each
  room shows as its own.
- A pale blue line bridges each doorway the hero has found, and the cave
  mouth between the woods and the crypt. Reveal map shows them all.
- Decisions: D-224, D-225.

## 0.2.31 (2026-10-21)
- Hold a finger or the mouse button on a tile you remember and the hero
  walks there around walls, about 4 steps a second. A small amber frame
  marks the tile; slide to move it, lift to stop.
- When a creature or an item comes into view, the hero stops and a "!"
  shows over them. Lift and hold again to go on. Taking stairs stops the
  walk too.
- Held on a dark tile, or one no remembered way leads to, the hero steps
  straight toward it, as before.
- The map joins the woods and the crypt at the cave mouth, as the Seed
  Explorer does, once you have been in both.
- Decisions: D-220, D-221 (the surface decisions move to the archive),
  D-222, D-223 (deeper floors as grids, next). Q-038 narrowed.

## 0.2.30 (2026-10-21)
- Daylight comes in through the cave mouth: in the crypt room the mouth
  leads to, the gap in the wall lets in a pale light that reaches about 3
  tiles, like a torch. Tiles it reaches are remembered, and a creature
  standing in it can see you.
- It follows the time of day: through dusk it shrinks and warms to
  orange, at night it is gone, and at dawn it comes back the same way.
- Decisions: D-218, D-219. Questions closed: Q-026. Q-040 narrowed.

## 0.2.29 (2026-10-21)
- Day and night pass outside with your turns: a day is 300 turns, 170 of
  full day, a 30-turn dusk, 70 of night and a 30-turn dawn. The clock
  keeps running below ground too.
- At night the woods are dark like a cave: you see what your lantern
  lights, and tiles already seen stay in a dim moonlit blue. Dusk and
  dawn fade the light slowly. No clock on screen, only the light.
- The lantern set to By itself lights as dusk falls and goes out as dawn
  comes.
- Dev: the Room tab gets TIME, +10 and +50, which move the clock only;
  the status line shows the turn of the day.
- Decisions: D-217.

## 0.2.28 (2026-10-21)
- Step E2, the whole surface in the Seed Explorer (D-214): its surface
  map shows the woods and the crypt together, joined where the cave
  mouth meets the gap in the crypt wall.
- The game's own map still shows only the part you're in (D-213).
- Decisions: D-216.

## 0.2.27 (2026-10-21)
- Step E1, the Seed Explorer (D-214): a new last line on the title menu
  opens the map of a seed, every floor in full, with no hero.
- A bar at the bottom of the map shows the seed, with Back, Type and
  Reseed; R, T and B do the same on a keyboard. Floors turn as on the map.
- It opens on the seed typed in Settings, else a random one, on the
  surface (the crypt rooms for now), and never changes Settings.
- Decisions: D-215.

## 0.2.26 (2026-10-21)
- Step 49b, depths move up one (D-212): the two crypt rooms are depth 0
  and the strip says SURFACE there, the second room is depth 1, the grey
  rock grids depths 2 to 4, and earth burrows start at depth 5.
- A seed keeps its rooms: each place keeps the numbers of its old depth.
- The surface map shows the part you're in: the woods, or the crypt.
- Dev: Go to depth goes from 0 (the crypt); Go outside still leads to the woods.
- D-201 to D-208 moved to `docs/archive/DECISIONS-REGION.md`.
- Planned next: a Seed Explorer on the title menu (D-214).
- Decisions: D-213, D-214.

## 0.2.25 (2026-10-20)
- The woods now has a cave mouth: a dark opening between two grey rocks
  on one edge, with worn earth in front. The seed picks the edge and the
  spot along it.
- Walk through it and you arrive on the crypt's facing side, through a
  new gap in its wall: going up, the bottom of the south room; going
  down, left or right, the first room. Walk back out and you are on the
  mouth again. A new journey still starts in the crypt.
- Decisions: D-211, D-212 (for step 49b).

## 0.2.24 (2026-10-20)
- Settings gains "Lantern: By hand" under Seed. Picked, or Left and Right,
  it flips to "By itself": the lantern then goes out as you step into
  daylight and lights again as you go back into the dark.
- It switches only at that moment, so switching it yourself in between
  holds. Like the switch, it costs no turn and no oil. By hand until picked.
- Decisions: D-210. Questions closed: Q-049.

## 0.2.23 (2026-10-20)
- The first outside room: woods, 17 × 20, made from the seed. Trees stand
  thick at the edges and thinner inside; they block the way and the view.
- One round tree a tile, each with its own crown, trunk and shadow.
- Plain daylight: the whole room is lit and remembered; the lantern isn't
  needed, but burns oil as before while lit. The strip says SURFACE.
- For now the dev drawer's Room section has Go outside; the cave mouth
  comes next (step 49). The map shows the woods as the surface.
- Decisions: D-209. Questions opened: Q-049.

## 0.2.22 (2026-10-20)
- The map turns between floors: arrows beside "DEPTH 3", < and >, or
  Page Up and Page Down show the floor above or below. The hero stays put.
- Floors never seen are skipped; an arrow greys out when nothing seen
  lies that way. Dev Reveal map turns through every floor from 1 to 99.
- Tapping stairs found on the map turns it to the floor they lead to,
  centred on the matching stairs. The hero's dot shows on their own floor only.
- D-194 to D-200 moved to `docs/archive/DECISIONS-GETTING-AROUND.md`.
- Decisions: D-207, D-208.

## 0.2.21 (2026-10-20)
- A map: the new map button (left of pause) or the M key shows the
  floor you are on, in a box over the darkened room. Each room is drawn
  small from the tiles your lantern has reached; rooms you haven't seen
  stay dark. Your spot blinks gold, stairs you've found are violet, and
  the depth is written at the top. Drag or use the arrows to scroll;
  pinch or the mouse wheel to zoom. The map button becomes a cross that
  closes it; M, Esc or a tap outside the box close it too. No turn passes.
- Dev tools: a Reveal map switch shows every room of the floor in full.
- Written down for the next step: the map will turn between floors.
- Decisions: D-205, D-206. Questions closed: Q-042.

## 0.2.20 (2026-10-20)
- The stairs line up between floors: the stairs up on a floor are at
  the same spot, in the same room of the grid, as the stairs down on the
  floor above. Each cave room is carved to fit.
- Depths 4 and 5 are now three rooms in an L too, like depth 3. On all
  three, the stairs down are in a different room from the stairs up, so
  you go through an opening to get deeper. The torch stays by the
  stairs up.
- Depth 6 and deeper are still one room each, lined up the same way.
- Written down for later: stairs line up by their place on the floor,
  so rooms of different sizes and shapes can still match.
- Decisions: D-203, D-204.

## 0.2.19 (2026-10-20)
- Depth 3 is now three cave rooms instead of one: a 2 × 2 grid with one
  corner left empty by the seed, so the rooms make an L. The corner room
  joins the other two through a one-tile gap in the shared edge; walk
  out through it and you come in at the same spot in the next room.
  The rock is drawn open right up to the edge there, so the gap shows.
- The seed picks which of the three holds the stairs up and down and the
  torch. The other two each hold a flask, a rat and a herb, in the dark.
- Depths 4 and 5 stay one room each, and every other depth is as before.
- Decisions: D-201, D-202.

## 0.2.18 (2026-10-20)
- The dev tools are now a drawer that slides out from the left edge,
  from under the wrench down to the stats line. The sections (View,
  Spawn, Room, Oil, Hero, Share) are stacked down its left side, and the
  open one's tools sit beside them. Tap the open section again and the
  drawer narrows to just its tabs.
- All dev words, the stats line too, are in the game's pixel font. The
  font gains +, % and a middle dot.
- Decisions: D-200.

## 0.2.17 (2026-10-20)
- A phone held sideways (or a wide PC window): the hearts, depth and oil
  stand in a column at the room's left, so the room can grow. The wrench
  sits at the top left, pause at the top right, and the lantern at the
  bottom right, under your thumb. Upright, nothing changes.
- Sideways, the dev panel and the stats line keep to the space left of
  the room and never cover it; the panel ends above the stats line and
  scrolls instead of running off the screen.
- Decisions: D-199. New question: Q-048 (the room filling the screen).

## 0.2.16 (2026-10-20)
- Side openings: the gap in the first room's bottom wall is now a
  doorway. Step out through it into a new crypt room to the south, and
  back the same way. The seed places its flask and rat.
- The hearts, depth and oil now sit in a strip just above the room, so
  they no longer cover it. Above them, one row holds the dev wrench on
  the left and pause and the lantern on the right. On a wide screen the
  buttons stand beside the picture when that makes it bigger.
- The main menu decisions, and the 0.1.26 and 0.1.27 changelog entries,
  moved to archive files.
- Decisions: D-196 to D-198.

## 0.2.15 (2026-10-20)
- The camera: the caves from depth 3 down are now about 1.5 screens
  (17 × 20 tiles), and the view glides along with the hero, keeping them
  in the middle and stopping at the cave's edges. The crypt rooms at the
  top stay one screen and don't move.
- Dev: the grid and pointed tile move with the camera.
- Decisions: D-195.

## 0.2.14 (2026-10-20)
- Stairs must be found: their violet glow stays hidden until your
  lantern has reached them once. Found, it glows half as bright as
  before, on the stairs and just beside them. A hidden glow wakes no rat.
- Decisions: D-194. Questions closed: Q-041.

## 0.2.13 (2026-10-20)
- How to play joins the title (under New journey) and the pause menu
  (after Settings): a page each for Touch, Mouse and Keyboard showing
  how to walk, wait, switch the lantern and pause. Left and Right flip
  the page; it opens on the way you last played.
- Decisions: D-193. Questions opened: Q-047.

## 0.2.12 (2026-10-20)
- The first two rooms now change with the seed: their shape stays, but
  the flask and the rat start in different places each world, and again
  after a fall. A new rule: every room takes something from the seed.
- Decisions: D-192.

## 0.2.11 (2026-10-20)
- Settings has a Seed line under Motion. Pick it to open a number pad
  drawn in the game's style (tap, arrows, or a keyboard's digits): type
  up to 5 digits and OK, or Random. A typed seed starts every New
  journey until set back to Random, so a world can be replayed. From
  the pause menu, Random shows this journey's seed.
- Decisions: D-191.

## 0.2.10 (2026-10-20)
- Settings has a Motion line under Controls: Full or Reduced. Pick it
  (or press Left or Right) to flip it. Until you pick, it follows the
  device's own reduce-motion setting; after that your choice is kept on
  this device. Reduced stills slides, shakes, flames and flicker.
- Decisions: D-190.

## 0.2.9 (2026-10-20)
- Settings: on the title and in the pause menu. Its first line is
  Controls: pick it (or press Left or Right) to go Tap and swipe, Tap
  only, Swipe only. Tap only stops swipes walking the hero; Swipe only
  stops taps and held fingers, though a tap on the hero still waits.
  Menus always take both. The choice is kept on this device.
- Decisions: D-189.

## 0.2.8 (2026-10-20)
- A pause menu: a new button with two bars, beside the lantern button,
  or Esc or P, opens it over the darkened room. Resume goes back to
  play (Esc or P again does too); Back to title ends the journey, and
  New journey then starts in a new world. No turn passes while paused.
- The decision log made room: D-159 to D-167 moved to the archive.
- Decisions: D-187, D-188.

## 0.2.7 (2026-10-20)
- The game opens on a title screen: pitch black, the hero on crypt floor
  in the lantern's light, the name Gloamdeep carved in warm gold above,
  and New journey below with a small flame beside it. Tap it, click it,
  or press Enter or Space to start. The wrench and the lantern button
  wait until the journey starts.
- Decisions: D-186.

## 0.2.6 (2026-10-20)
- Nothing new to play. The starting region is designed: a 3 × 3 grid,
  all rooms used, home in the centre, mountains along the north and
  woods elsewhere, and the first cave's entrance next to home. The first
  cave ends at 5 levels, with the endless depths behind a portal at the
  bottom. The region's name is still open. Rule sheet in
  `docs/regions/starting-region.md`.
- Decisions: D-182 to D-185. Questions closed: Q-036, Q-043. Questions
  opened: Q-045, Q-046.

## 0.2.5 (2026-10-20)
- Nothing new to play. The main menu is planned: a title screen with the
  menu on it, and a pause menu during play. Buttons appear only when
  their feature exists. Settings will hold a tap or swipe switch, a
  motion switch and a seed, plus a How to play page. Three looks for the
  title screen were shown in a mock-up; the owner picked the lantern in
  the dark, to be drawn with the game's own art.
- Decisions: D-177 to D-181. Questions closed: Q-025, Q-044.

## 0.2.4 (2026-10-19)
- Nothing new to play. The owner's world ideas are written down in a new
  `docs/WORLD.md`: regions as grids of rooms, each with its own rules;
  ways between rooms that line up; rooms of every size, with a camera
  that follows; light through openings; stairs that must be found; a
  world map. Stage 0.3, the world, is planned and comes next.
- Decisions: D-168 to D-176 (D-134 partly superseded). Questions opened:
  Q-036 to Q-044 (a main menu, the owner's wish for soon).

## 0.2.3 (2026-10-19)
- Nothing new to play. The owner's ideas from a woods sketch are written
  down as open questions: outside trees (their look, kinds, wind, and
  lantern shadows that follow a tree's shape), weather, and shadows from
  the sun and moon. Next conversation starts by hearing more ideas.
- Questions opened: Q-034, Q-035.

## 0.2.2 (2026-10-19)
- Stairs that match the place: in grey rock and earth, the steps are
  pale stone with violet edges, set in a square opening of the ground's
  own colour that darkens as it goes down, instead of a black square.
  The crypt rooms keep their stairs.
- Decisions: D-167.

## 0.2.1 (2026-10-19)
- Depths change kind: from depth 6 down, every depth is an earth
  burrow, twisty dug tunnels with loops and dead ends, drawn as brown
  earth with banded walls. Depths 3 to 5 stay grey rock chambers.
- Dev: Go to depth, in the Room section. Pick a depth with − and +,
  then Go; you land on its stairs up and no turn passes.
- Decisions: D-165, D-166.

## 0.2.0 (2026-10-19)
- Natural caves: every depth below the second room is now 2 to 4
  round, lumpy chambers joined by winding one-tile tunnels, smoothed
  like worn stone. No more boxes with nicks and straight gaps.
- Cave art: those depths are drawn as raw grey rock, not crypt bricks.
  Walls are piled rock chunks, the floor is rough stone with gravel and
  the odd puddle, and the rock's edges round off and wander instead of
  following the square tiles. The first two rooms stay crypt.
- Torch, flask, rat, herb and stairs are placed by the same rules as
  before. Walking is still tile by tile.
- Decisions: D-162 (supersedes D-152 and the shape in D-147), D-163,
  D-164.

Older entries: `docs/archive/CHANGELOG-FOUNDATION-3.md` (0.1.26 to
0.1.27), `CHANGELOG-FOUNDATION-2.md` (0.1.13 to 0.1.25),
`CHANGELOG-FOUNDATION-1.md` (0.1.0 to 0.1.12) and
`CHANGELOG-PREPRODUCTION.md` (0.0.x).
