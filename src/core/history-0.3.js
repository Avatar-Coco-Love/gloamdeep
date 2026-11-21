// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; older ones are in
// history-0.3-1.js (0.3.0 to 0.3.75, D-699), -2 (to 0.3.150, D-740), then 50 to a file, each file's
// range in its first line: by hand at the audits to -6 (D-782, D-826, D-910, D-951), and from -7 on by
// tools/release.js once a newer version is in (D-982); stage 0.2's are in history-0.2.js and its split
// files.
export const HISTORY_03 = [
  { v: '0.3.449', date: '2026-11-21', title: 'The peddler\'s grid scrolls', lines: [
    "On the peddler's card, his grid scrolls too when its slots don't all fit, the same way as the bag and the stash chest: drag or flick them, use the wheel or the arrows, or drag the thin bar beside them. Upright, they stop where the chosen thing's name, count and price still fit above SELL or BUY.",
    "Only a very short upright window needs it; on every phone tried the card looks as before.",
    "Decisions: D-1013.",
  ] },
  { v: '0.3.448', date: '2026-11-21', title: 'The chest card\'s bag slots scroll', lines: [
    "On the stash chest's card, the bag's slots scroll too when they don't all fit, the same way as on the bag card: drag or flick them, use the wheel or the arrows, or drag the thin bar beside them. They stop where the chosen find's name and count still fit below.",
    "Only a very short upright window needs it; on every phone tried the card looks as before.",
    "Decisions: D-1012. B-014 fixed.",
  ] },
  { v: '0.3.447', date: '2026-11-21', title: 'The bag\'s slots scroll', lines: [
    "The bag's slots can scroll now, when they don't all fit on the card: drag them, or flick them and they glide, slow and come to rest with whole rows showing. A thin bar beside them shows where you are, gold while they move, and can be dragged too. The mouse wheel moves them a row, and the arrow keys bring the chosen slot's row into view.",
    "On every screen tried so far a bag of 12 fits, so you won't see it yet: it switches on by itself only where the slots don't fit.",
    "Decisions: D-1011. B-014's bag card half fixed.",
  ] },
  { v: '0.3.446', date: '2026-11-21', title: 'Cards on the smallest phones', lines: [
    "On a small phone held upright, the stash chest's DECONSTRUCT and STORE buttons now stand at the top of its card, beside the close button, in place of the words STASH CHEST, so the bag's slots no longer lie over them. On every other screen the card is as before.",
    "The chosen stack's name on that card no longer runs below its edge.",
    "Behind the scenes: every card's buttons are checked on the smallest phones' screens, and the text line's step (it never covers the hero) is ticked, built back at 0.3.427. The plan for talking with choices is set: a card low on the screen, in the game's own letters.",
    "Decisions: D-1010.",
  ] },
  { v: '0.3.445', date: '2026-11-20', title: 'A gentler first mole', lines: [
    "A gentler first mole: every mole that comes out by day in the woods round home has 2 hearts now, not 4. Two lantern swings or one knife blow beat it, so a new hero who strikes as it comes up takes one bite, not three. From depth 5 down the mole is as tough as ever.",
    "The start room has its mole on a journey's first day again, the gentle one. Its name tag counts 2 hearts, and its Bestiary page says so.",
    "Decisions: D-1009 (supersedes D-986).",
  ] },
  { v: '0.3.444', date: '2026-11-20', title: 'Herbs and mushrooms rooted', lines: [
    "Herbs and mushrooms are rooted now, as the flowers are: the healing herb, the oilcap and the heartcap stand on their own tile, still, their foot in a tuft of earth, no longer lifted and bobbing over a shadow. A herb has a grass blade either side; a mushroom stands in earth alone.",
    "A herb mimic asleep and a snapcap shut stand rooted too, just like the finds they copy. Other finds still bob.",
    "Decisions: D-1008.",
  ] },
  { v: '0.3.443', date: '2026-11-20', title: 'The Glowcup, and rooted flowers', lines: [
    "New: the Glowcup, the second flower, a deep teal cup round a pale green heart on a stem with two long leaves. One grows in about half the rooms of every floor from depth 1 down, never in a vault, the arena or its hallway, and never behind a Gap. It only looks bright: it gives no light.",
    "Walk onto one to put it in the bag, in stacks of 20, for crafts later. Picked, it comes back a day later on another floor tile of the room, as the duskstar does. Each has its own slight shade and faces its own way.",
    "Flowers are rooted now: the duskstar and the glowcup stand on their own tile, still, their stem in a tuft of earth with a grass blade either side, no longer lifted and bobbing over a shadow. Other finds still bob.",
    "Decisions: D-1007.",
  ] },
  { v: '0.3.442', date: '2026-11-20', title: 'The lantern\'s slots, shown', lines: [
    "New: the lantern's three slots, Wick, Tank and Glass, show in the bag, a LANTERN row beside the gear row on a phone held sideways, under it on one held upright, the bag's slots a row lower there. A fitted part shows in its slot; an empty one shows its kind faintly, the glass a plain pane, as no glass is found yet.",
    "Tap a lantern slot, or reach it with the arrows, to see the part's name, its slot, its numbers and its Look line, as for a gear slot. A part still goes in with Fit, swapping the one there; nothing comes off.",
    "Decisions: D-1006.",
  ] },
  { v: '0.3.441', date: '2026-11-20', title: 'The Bladder Tank', lines: [
    "New: the Bladder Tank, the lantern's first tank. Make it at the workbench's GEAR tab, its last slot, from 2 Oil Bladder and 2 Copper Ore, then choose it in the bag and press Fit: it goes in the lantern, and no turn passes.",
    "With it fitted the lantern holds a quarter more oil: a full tank lasts 75 turns instead of 60, on top of the wick, charms and the rest. The oil past a plain tank's worth is kept in reserve: the light reaches no further.",
    "The oil bar runs on to 13 segments, each still a tenth of a plain tank, so a flask fills as many as before. Flasks poured by themselves pour a little sooner, once none would spill, and you wake from a fall with the bigger tank full.",
    "The Oil Bladder now says what it is for: \"An oil bladder. Two make a tank.\"",
    "Decisions: D-1005.",
  ] },
  { v: '0.3.440', date: '2026-11-20', title: 'The Lampeater\'s bar on top', lines: [
    "In the Lampeater's fight, its name and health bar sit top middle, away from the hero and the text line; on an upright phone, just below your hearts and pause.",
    "The round map steps aside while the arena is sealed, and the creature list leaves out the Lampeater, since the bar shows it. Its gloamlings are still listed. Both come back once the fight ends.",
    "The bar goes faint while the Lampeater or the hero is under it.",
    "Decisions: D-1004.",
  ] },
  { v: '0.3.439', date: '2026-11-20', title: 'A chop without a stall', lines: [
    "A bug fixed (F-9): chopping a tree or digging out a stump on the surface no longer stalls the screen. Only the tiles that changed are painted again, not the whole woods and its border; the picture is the same. On a slow phone a chop's pause goes from almost a second to a blink.",
    "The Lampeater's phases stay as they are. Its polish waits while the owner playtests, for new ideas.",
    "Decisions: D-1003.",
  ] },
  { v: '0.3.438', date: '2026-11-20', title: 'The lure wisps', lines: [
    "Two lure wisps now drift in the Lampeater's arena, either side of it at the start. As you come near, each drifts toward the Lampeater, showing where it lurks in the dark. They are the arena's own, as its gloamlings are: no Wisp Glass, and they fade when it is beaten.",
    "A bug fixed (F-10): a journey saved before today with the arena in an older shape is brought up to date as it loads: the door sealed again while the Lampeater lives, its gloamlings and wisps given, or, beaten long ago with Leap never learnt, Leap's find laid on its tile.",
    "Decisions: D-1001, D-1002.",
  ] },
  { v: '0.3.437', date: '2026-11-20', title: 'The roadmap', lines: [
    "Nothing in the game changed: the planning board's picks are read back and written up. The 97 kept ideas make the roadmap to 1.0, docs/ROADMAP.md, by Now, Next and Toward publishing, in build order.",
    "The 29 maybes and 15 drops go to docs/RESEARCH-PLANNING.md, each with why and when to look again; the owner's two new ideas to RESEARCH-2.md.",
    "Decisions: D-998, D-999, D-1000.",
  ] },
  { v: '0.3.436', date: '2026-11-19', title: 'The planning board', lines: [
    "The planning board. Nothing in the game changes. The big planning run's 141 ideas are now cards on a private page that works on a phone: each one marked Keep, Maybe or Drop, with an optional note, and the picks saved for Claude to read back an area or two a sitting. Each card also shows Claude's recommendation, its button marked with a dot, and a box for the owner's own answer stays open beside the pick. A script builds the cards from the planning files' idea, check and recommendation lines.",
    "Decisions: D-997.",
  ] },
  { v: '0.3.435', date: '2026-11-19', title: 'The big planning run', lines: [
    "The big planning run. Nothing in the game changes. A team of agents wrote a brief of where the game stands, then 141 ideas for its future up to 1.0 in eight areas, checked each against the decisions, and drew a proposed roadmap; nothing is decided until the owner picks it on the planning board, next.",
    "Decisions: none (the run follows D-996).",
  ] },
  { v: '0.3.434', date: '2026-11-19', title: 'Planning the planning', lines: [
    "Planning the planning. Nothing in the game changes. How the big planning run for the game's future will work, up to 1.0: a team of agents brainstorms eight areas, then the owner picks ideas on a planning board.",
    "Decisions: D-996.",
  ] },
  { v: '0.3.433', date: '2026-11-19', title: 'The eighteenth audit', lines: [
    "The eighteenth audit. Nothing in the game changes. The light was measured again: it is fast enough, so the Half and Automatic light choices are dropped, and Settings keeps no Light line.",
    "Docs and tools: the list of sound files moves to its own two files, word for word; five finished decisions and the playbook's newest lessons move to the archive; the speed check's walk on the surface keeps clear of trees. Two bugs found, listed in the docs for the owner to pick: a stall on each chop or dig on the surface, and older saves' boss arenas not brought up to date. The next audit is at 0.3.473.",
    "Decisions: D-995. Questions closed: Q-069. D-977, D-978 and D-988 to D-990 moved to the archive, word for word.",
  ] },
  { v: '0.3.432', date: '2026-11-19', title: 'Leap\'s card sound', lines: [
    "When the card for a new ability opens, the flame rises: a whoosh of fire and bells climbing over a low held bell, under Places in Settings.",
    "Decisions: D-994.",
  ] },
  { v: '0.3.431', date: '2026-11-18', title: 'Leap\'s find', lines: [
    "Beaten, the Lampeater now leaves Leap's find glowing where it fell, and the door stays shut. Step on it and a card shows your new ability, Leap; close the card and the stone door sinks open.",
    "A duskstar you pick near home no longer grows back on the waystone's ring.",
    "Decisions: D-992, D-993. Questions closed: Q-052, Q-103. D-971 and D-972 moved to the archive, word for word.",
  ] },
  { v: '0.3.430', date: '2026-11-18', title: 'The tank slot planned', lines: [
    "Nothing in the game changed: the lantern's tank slot is planned as the next new step, after the Lampeater's polish or more flowers.",
    "Decisions: D-991.",
  ] },
  { v: '0.3.429', date: '2026-11-18', title: 'The docs catch up', lines: [
    "Nothing in the game changed: the docs catch up with the Lampeater's fight, its 12 hearts, phases, calls, guards and wary, and the bench's half start on 6 hearts.",
    "The docs no longer describe the falling floor round the Lampeater's stairs, taken out before it shipped; the Boss tab, the newest content page and which sound files to ship are written down.",
    "Decisions: D-990. D-979, D-986 and D-987 moved to the archive, word for word.",
  ] },
  { v: '0.3.428', date: '2026-11-18', title: 'Corners and last hearts', lines: [
    "A Lampeater blow that reaches a phase and burns your last oil no longer has it hang back while it breathes on a brazier; it hangs back afterwards, as it should.",
    "A gloamling waiting in a snuffed brazier you light again now comes out, instead of waiting there for good and counting toward the six.",
    "A Warden's slam that takes your last heart by a doorway no longer slides you into the next room: you fall where you were struck.",
    "Behind a Leap gap there is now only the cache and the Archway: creatures and other finds that stood there move to the near side, or aren't made when there's no room.",
    "After a dev jump, the dev stats line says \"jumped: no goals or records\".",
    "Once you've learnt Leap, How to play shows it: the Leap button (or J), then a way.",
    "Decisions: D-989. D-984 and D-985 moved to the archive, word for word.",
  ] },
  { v: '0.3.427', date: '2026-11-18', title: 'The dark again', lines: [
    "Since 0.3.424 the dark below ground was not being drawn: rooms showed fully lit, and the little marks for poison, draughts and the rest went missing. Both are back, and a new test checks every code file for names it forgets to bring in.",
    "The Shovel no longer digs out a stump with Wood lying on it: you walk onto it instead, so the Wood isn't lost and the tree still grows back.",
    "A line along the bottom of the screen that would cover your hero now sits just above them instead.",
    "Turning Sound On uses much less memory: each sound file is loaded once, not once for every sound that shares it.",
    "tools/perf.js now also times a dark room and the Lampeater's arena: walking in the dark is over the frame budget, 17 ms a frame on a slow phone (H-73).",
    "Decisions: D-988.",
  ] },
  { v: '0.3.426', date: '2026-11-18', title: 'Taps, lines and the first mole', lines: [
    "Card buttons are easier to tap on a phone: MAKE, STORE, TAKE, SELL, DRINK, DROP and the rest now take a tap a little above or below them, 44 px tall as they should be. On a small card, DROP sits a touch higher.",
    "Choosing a draught (or a heartcap or oilcap) in the bag no longer hides its \"Now\" picture under its look line.",
    "\"Leap which way?\" goes away as soon as you leap or let the leap go.",
    "On a new journey's first day, no mole comes out in the room you start in; the bunny still does, and the mole comes the next day.",
    "Decisions: D-986, D-987. D-981 to D-983 moved to the archive, word for word.",
  ] },
  { v: '0.3.425', date: '2026-11-18', title: 'The tests', lines: [
    "No change in play. The tests: a quick run, npm run quick, checks a tenth of the biggest seed sweeps while Claude works, and npm test still checks every seed before each handoff; two tests that broke at every save change now don't.",
    "New tests can share their setups (tests/fixtures.js), and the place beyond's tests have their own file, named for what they test.",
    "Scripts can now read the running game (window.gloamdeep), so tools/perf.js really reaches play: before, it timed the opening screen. Walking on the surface now reads 57 ms a frame on a slow phone, for the frame-budget step (H-73).",
    "Decisions: D-985.",
  ] },
  { v: '0.3.424', date: '2026-11-18', title: 'Less code to read', lines: [
    "No change in play. Less code to read: the game's biggest file, its 530 text lines, is split by topic into four smaller files, and the title's screens and cards moved out of the frame-drawing file; a new test stops any other code file passing 20 KB.",
    "The 14 small files that bring an older save up to date now sit together in their own folder and share one helper instead of 8 copies; the little tile helpers copied into 12 files live once in tile.js.",
    "Where the Lampeater is named in the code is written down for when a second boss is planned. The playbook of how we work keeps growing, ready for your next game.",
    "Decisions: D-983, D-984.",
  ] },
  { v: '0.3.423', date: '2026-11-18', title: 'Each PR costs less', lines: [
    "No change in play. Each PR now costs less and is safer: a new test checks that every decision from D-001 on is kept, once, and that no archive file shrinks or goes, as one did at 0.3.414 and nothing noticed.",
    "tools/release.js now splits the in-game Version history by itself, 50 versions to a file (0.3.351 to 0.3.400 moved to history-0.3-7.js word for word), makes a new minor version's file, and refuses a docs/PROGRESS.md over 4 KB; a new tools/audit.js lists the docs near their caps and what a conversation reads at its start.",
    "The archive index's biggest row, hand-edited in most PRs, is a short line now (its old text kept word for word in its file); the PR checklist says how to redo the record-keeping files if two conversations ever overlap.",
    "Decisions: D-982.",
  ] },
  { v: '0.3.422', date: '2026-11-18', title: 'Reading less', lines: [
    "No change in play. Each conversation now starts by reading about a fifth less: the big table of docs moved out of CLAUDE.md to docs/INDEX.md, nine old rules on how we work out of docs/DECISIONS.md, and done plan steps and repeated questions out of docs/PROGRESS.md, all word for word.",
    "The first two health checks' finished pages and five old audit-lesson pages moved to the archive; three near-full pages split (SOUNDS-4.md, CONTENT-5.md, WORKFLOW-SINCE.md); npm test prints a dot a test, about 2 KB instead of 436 KB.",
    "From now on the health check's steps run hands-off: Claude builds its own recommended fixes and lists every pick in the PR.",
    "Decisions: D-980, D-981.",
  ] },
  { v: '0.3.421', date: '2026-11-18', title: 'The third health check', lines: [
    "No change in play. A third health check, run while the owner was away: helper agents looked at ten areas, from the Lampeater's fight to what each conversation reads, and a second agent tested every finding again before it was kept. Of 60 found, 40 are kept, from card buttons too small on a phone to a test run that prints 436 KB. The owner made every one a step, reading less first.",
    "Decisions: D-975, D-979. D-975 moved to the archive, word for word.",
  ] },
  { v: '0.3.420', date: '2026-11-18', title: 'The Lampeater\'s phases', lines: [
    "The Lampeater's phases: at 8 and 4 of its 12 hearts, once free of your light, it breathes out a lit brazier, and a gloamling crawls from the bowl; then it calls one more from another cold brazier. With no brazier lit, it only calls. Its snuff at half its hearts, and after each catch, are gone.",
    "A snuffed bowl brings out a gloamling only while fewer than 6 are out.",
    "The boss bench, from 5%, 79% and 83%: Lean wins 35%, Middling 84%, Strong 94%; its half start counts the first phase done.",
    "Decisions: D-978. D-976 moved to the archive, word for word.",
  ] },
  { v: '0.3.419', date: '2026-11-18', title: 'The Lampeater wary', lines: [
    "The Lampeater wary: struck, with no cold brazier to call from or 6 gloamlings out, it draws back for 3 turns to just past your lantern's reach, still drinking at its edge. With the lantern off it keeps the same distance, so lighting it no longer catches it. Its eyes dim while it is wary; then it comes for you again.",
    "The boss bench, from 12%, 80% and 83%: Lean wins 7%, Middling 79%, Strong 85%.",
    "Decisions: D-977.",
  ] },
  { v: '0.3.418', date: '2026-11-18', title: 'The Lampeater\'s guards', lines: [
    "The Lampeater's guards: once 6 gloamlings are alive, the 2 nearest it hold the tiles at its shoulders, leaving its way to you open. One beside you bites, then goes back to it; lit, they back off as ever.",
    "The boss bench, from 12%, 79% and 83%: Lean wins 12%, Middling 80%, Strong 83%. Six are rarely out at once yet.",
    "Decisions: D-976.",
  ] },
  { v: '0.3.417', date: '2026-11-18', title: 'The Lampeater calls', lines: [
    "The Lampeater calls: struck and free again, it goes through the dark to a cold brazier and calls a gloamling out over 2 turns, the ashes stirring violet with a countdown and its eyes on the bowl. Catch it in light to stop the call, or light that brazier to spoil it. Never more than 6 gloamlings.",
    "The boss bench, from 18%, 96% and 100%: Lean wins 12%, Middling 79%, Strong 83%.",
    "The plan for a hands-off health check once its fight is built.",
    "Decisions: D-974, D-975.",
  ] },
  { v: '0.3.416', date: '2026-11-18', title: 'Gloamlings flank you', lines: [
    "The Lampeater's gloamlings flank you: while it comes for you, they take the free tiles beside you in the dark, spreading out, and leave the side toward it open. One standing on that side bites, then steps out of its way.",
    "The boss bench, from 52% and 100%: Lean wins 18%, Middling 96%, Strong 100%.",
    "Decisions: D-973.",
  ] },
  { v: '0.3.415', date: '2026-11-18', title: 'Nothing goes missing', lines: [
    "Nothing changes in the game: a new test makes sure nothing kept in the notes goes missing. Every decision, every version's changelog entry and every log entry must still be found, in its page or that page's archive.",
    "It was added after 0.3.414's first try emptied the archive of surface decisions by a slip in a script, which every other test let through; the owner spotted it.",
  ] },
  { v: '0.3.414', date: '2026-11-17', title: 'The Lampeater\'s steps planned', lines: [
    "Nothing changes in the game yet: the Lampeater's next steps are planned, with the gloamlings working alongside it.",
    "While it comes for you, or stands calling at a brazier, its gloamlings will take the tiles beside you away from it, leaving its side open; it calls from cold braziers when it breaks free, up to 6 gloamlings at once; and its snuffs come at 2/3 and 1/3 of its hearts instead of at half.",
    "With 6 gloamlings out, 2 will guard the Lampeater, following it and holding the tiles beside it away from you, and biting you if you come close.",
    "Decisions: D-972. Questions closed: Q-116. D-967 moved to the archive, word for word.",
  ] },
  { v: '0.3.413', date: '2026-11-17', title: 'Gloamlings in the seal hall', lines: [
    "The Lampeater's fight is harder from the start: a gloamling now waits beside each of the arena's 4 braziers, on the side toward the wall, and hunts you through the dark as soon as you walk in.",
    "They are the arena's own, like the ones that crawl from a snuffed brazier: they drop nothing, count for nothing, crumble when the Lampeater is beaten, and are all back if you fall or leave before then.",
    "Decisions: D-971. D-968 moved to the archive, word for word.",
  ] },
  { v: '0.3.412', date: '2026-11-17', title: 'The archway beyond the gap', lines: [
    "Past each Leap gap, in the corner you leap into, a dark archway now stands in the wall. Step onto it (\"You go through the archway.\") and you come out in a room of its own beyond.",
    "For now that room is empty: plain walls and floor in the floor's own look. Step back onto its archway to return to the same spot. Its look, creatures and finds come in the next steps.",
    "On the map the room isn't drawn yet; while you are in it, the map shows you at the archway. Rooms you have already been in stay as they were. The map preview marks each archway in gold.",
    "Decisions: D-970. D-965 and D-966 moved to the archive, word for word.",
  ] },
  { v: '0.3.411', date: '2026-11-17', title: 'The Gap\'s two lines', lines: [
    "Walk into a Leap gap before you have learnt Leap and it says \"Too wide to step. More lies beyond.\" Once you have Leap, it says \"Too wide to step. Leap it.\"",
    "Decisions: D-969. D-963 moved to the archive, word for word.",
  ] },
  { v: '0.3.410', date: '2026-11-17', title: 'The first Leap gaps', lines: [
    "From depth 5 to 8, a dead end on a floor can hold its cache of finds behind a gap: a short line of black drop across the floor, \"Too wide to step across.\" You can see the finds over it, but not reach them yet.",
    "Once the Lampeater is beaten and you have learnt Leap, come back up and leap the gap to take them. Rooms you have already been in stay as they were.",
    "About 6 floors in 10 from depth 5 to 8 have one; the rest have none, where no straight line fits. The map preview marks each gap.",
    "Decisions: D-968. D-964 moved to the archive, word for word.",
  ] },
  { v: '0.3.409', date: '2026-11-17', title: 'No falling floor', lines: [
    "No more falling floor in the Lampeater's fight. Beat it and its door sinks open (\"The door sinks open. You learn Leap.\"), and the seal stones round the stairs stay standing, wherever you are.",
    "Walk through the door, over the stones and onto the stairs, or leap from the door straight onto them. The way back down on a later trip is never cut off.",
    "The gap, its crumble, its shake and its sound are kept for another place later.",
    "Decisions: D-967. D-951 moved to the archive, word for word.",
  ] },
  { v: '0.3.408', date: '2026-11-17', title: 'The crumble\'s sound', lines: [
    "The floor giving way now has a sound: a low crack of stone as the cracks run across the seal stones, then a heavy rumble as they fall into the dark, fading with the shake. Nothing is heard landing.",
    "It follows Steps' loudness, and has its own line in Steps' list in Settings, \"Floor gives way\", to turn it On or Off.",
    "Decisions: D-966. Questions closed: Q-113.",
  ] },
  { v: '0.3.407', date: '2026-11-16', title: 'The crumble', lines: [
    "When the floor gives way round the stairs, you now see it go: cracks run across the seal stones, then they all fall together into the dark, shrinking and darkening as they drop. It takes about half a second, ending with the shake.",
    "With reduced motion the stones are simply gone, as before.",
    "Decisions: D-965.",
  ] },
  { v: '0.3.406', date: '2026-11-16', title: 'The floor waits', lines: [
    "The floor now waits. Beat the Lampeater and its door sinks open (\"The door sinks open. You learn Leap.\"), but the seal stones round the stairs stay standing.",
    "Walk up to the tile before the door, or onto the door, and the floor gives way: the room shakes and the stones fall into the gap. \"The floor gives way.\" Beat the Lampeater while already standing there and it all happens on the same blow, as before.",
    "Decisions: D-964. D-962 moved to the archive, word for word.",
  ] },
  { v: '0.3.405', date: '2026-11-16', title: 'The floor gives way', lines: [
    "The escape begins. Beat the Lampeater and, as its door sinks open, the old seal stones round the stairs down fall away into a black gap, leaving the stairs standing alone. The last blow now says \"The floor gives way. You learn Leap.\"",
    "You can't step into the gap (\"Too wide to step across.\"), but from the open door you can leap over it, straight onto the stairs, and down you go.",
    "Decisions: D-963. D-961 moved to the archive, word for word.",
  ] },
  { v: '0.3.404', date: '2026-11-16', title: 'Leap', lines: [
    "Beat the Lampeater and you learn Leap: \"The door sinks open. You learn Leap.\" It is yours for the rest of that journey only. A new journey has to earn it again.",
    "A new round Leap button sits left of the flask button. Tap it (\"Leap which way?\") and pick a way: the hero jumps 2 tiles in a line, over open floor, a creature or a low thing like water or a brazier, and lands on the second. It takes one turn, like a step. On a keyboard, J does the same.",
    "Tap the button again, or tap the hero, to change your mind. A leap at a wall, or with nowhere to land, costs nothing and says why.",
    "The hero rises off the ground as they jump, their shadow left below. With reduced motion they simply land.",
    "The dev sheet's Hero section has a Leap switch, to try it without the fight.",
    "Decisions: D-962. D-959 and D-960 moved to the archive, word for word.",
  ] },
  { v: '0.3.403', date: '2026-11-16', title: 'The Lampeater\'s tune', lines: [
    "The Lampeater has its own boss tune. When its way in seals behind you, a busy, dark, pressing tune starts at once with the door, under the cutscene, and plays the whole fight. Beat it and the tune fades out, and the dungeon's theme comes back a second later.",
    "Music's list in Settings has a line for it, Lampeater, after Dungeon.",
    "Decisions: D-961. Questions: Q-112 closed, its last part, the boss tune, answered. D-958 moved to the archive, word for word.",
  ] },
  { v: '0.3.402', date: '2026-11-16', title: 'The hallway\'s quiet', lines: [
    "Coming up to the Lampeater, the music goes quiet: the dungeon's theme fades out as you step into the hallway, and the arena stays silent too. Beat it and the theme comes back; step back down out of the hallway and it comes back as well.",
    "Dev: the boss bench and the playtest's #lampeater link now start you in the room below the hallway, one tile under the way up, that room emptied, so you get the whole way up: the warning, the quiet, the seal and the cutscene. The boss bot still starts in the arena's doorway.",
    "Decisions: D-960. Questions: Q-112's hallway quiet answered; the boss tune is next. D-957 moved to the archive, word for word.",
  ] },
  { v: '0.3.401', date: '2026-11-16', title: 'The Lampeater\'s bar', lines: [
    "While the Lampeater's way in is sealed, its name and health show at the bottom middle, above the text line: \"Lampeater\" over a thin bar running from pink to violet, on the same dark glass as the text line. It appears as the cutscene ends.",
    "Hurt, the part it lost turns pale, waits a moment, then drains away. A blow that sinks into it in the dark flickers the bar grey and leaves it full.",
    "Beaten, the bar drains to empty and fades; leave or fall and it's gone at once. It goes faint while you stand under it, like the panel.",
    "Decisions: D-959. Questions: Q-112's name and health bar answered; the hallway's quiet is next. D-955 and D-956 moved to the archive, word for word.",
  ] },
];
