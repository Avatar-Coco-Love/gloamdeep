// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; 0.3.301 to 0.3.350
// are in history-0.3-6.js (D-951), 0.3.251 to 0.3.300 in history-0.3-5.js (D-910), 0.3.201 to 0.3.250 in
// history-0.3-4.js (D-826), 0.3.151 to 0.3.200 in history-0.3-3.js (D-782), 0.3.76 to 0.3.150 in
// history-0.3-2.js (D-740) and 0.3.0 to 0.3.75 in history-0.3-1.js (D-699); stage 0.2's are in
// history-0.2.js and its split files.
export const HISTORY_03 = [
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
  { v: '0.3.400', date: '2026-11-16', title: 'Points at merge time', lines: [
    "Docs only: a point raised once a PR is ready to merge is saved for a fresh conversation, not built in the same one.",
  ] },
  { v: '0.3.399', date: '2026-11-16', title: 'The Lampeater\'s cutscene', lines: [
    "The first time on a journey the Lampeater's way in seals behind you, a short cutscene of about 3 seconds: the camera zooms in on the door as it rises out of the floor, glides up to the Lampeater, whose eyes flare as it swells, then zooms back out to you.",
    "Black bars slide in at the top and bottom, and the panel, map, lantern and arrow pad fade out till it ends. Taps and keys do nothing while it plays, so it can't be skipped by accident.",
    "Every later time, the door just rises out of the floor. With reduced motion the shots cut instead of gliding.",
    "Dev: the boss bench now starts you in the arena's doorway, where walking in from the hallway puts you, so your first step up seals the door, and the cutscene plays every time you use it. The bot now wins 34% of fights as Lean (26% from one step further in) and 97% as Middling.",
    "Decisions: D-957, D-958. Questions: Q-112's cutscene answered; the boss's name and health bar is next. D-953 and D-954 moved to the archive, word for word.",
  ] },
  { v: '0.3.398', date: '2026-11-16', title: 'The way in sealed', lines: [
    "One step into the Lampeater's arena, past its way in, a sealed door rises behind you: \"The way behind you seals.\" Standing in the doorway, you can still turn back.",
    "Coming up the hallway while the Lampeater is unbeaten, a warning: \"The seal hall: once in, no way back.\"",
    "Beat it and both doors sink open; fall, and the way in is open again when you come back.",
    "Decisions: D-956. Questions: part of Q-112 answered. D-952 moved to the archive, word for word.",
  ] },
  { v: '0.3.397', date: '2026-11-16', title: 'The Lampeater\'s Feat', lines: [
    "Beating the Lampeater now reaches a Feat of its own, Lampeater, paying 3 Glints once. It says \"Feat reached: Lampeater. +3 Glints.\" on your next move after the door sinks.",
    "The Feats tab shows it on its own row below the others, with one mark that turns gold once it's beaten, and only once you have met the Lampeater. A Lampeater beaten before this counts too.",
    "Decisions: D-955. D-950 moved to the archive, word for word.",
  ] },
  { v: '0.3.396', date: '2026-11-16', title: 'Step 9\'s order', lines: [
    "Nothing in the game changed. The rest of the Lampeater's rewards are planned: its Feat next, then the way in sealing behind you, then its trophy, which waits until creatures leave materials.",
    "Version 0.4.0 is planned for when the way down to depth 9 opens. The surface and depths 1 to 8 are now called chapter 1.",
    "Decisions: D-954. Questions: part of Q-112 answered. D-949 moved to the archive, word for word.",
  ] },
  { v: '0.3.395', date: '2026-11-16', title: 'The Lampeater beaten', lines: [
    "Beating the Lampeater sinks its sealed door open at once, the way down behind it; lighting all 4 braziers no longer opens it, so the fight can't be skipped.",
    "As it goes, any gloamlings left crumble away.",
    "Fall in the fight, or walk out before it's beaten, and it is whole again when you come back: on its own tile, all its hearts, the braziers cold.",
    "Decisions: D-953. Questions: Q-112 raised, your ideas for sealing the way in. D-948 moved to the archive, word for word.",
  ] },
  { v: '0.3.394', date: '2026-11-16', title: 'Three bug fixes', lines: [
    "Three bug fixes from the audit. When the blow that takes the Lampeater to half lands on the same turn your light catches it, getting free from that catch now owes it a second snuff, as the rule says.",
    "The spear's reach and the Warden's Fist's knock no longer flash the Lampeater white, or sound a hit, when the blow sinks into it in the dark; the gloamling in front still flashes.",
    "After the playtest's #lampeater link, a New journey or a profile picked in the same tab is saved again.",
    "Decisions: D-952.",
  ] },
  { v: '0.3.393', date: '2026-11-16', title: 'The seventeenth audit', lines: [
    "The seventeenth audit. Nothing in the game changes. 0.3.301 to 0.3.350 of the Version history move to their own file, word for word.",
    "Docs: the playbook's newest lessons, the hero's words and the creature list move to their own pages, and two finished decisions to the archive, word for word; Waiting on the owner is shorter. A bug hunt over the code since the last audit found three bugs, listed in the docs for the owner to pick. The next audit is at 0.3.433.",
    "Decisions: D-951. D-946 and D-947 moved to the archive, word for word.",
  ] },
  { v: '0.3.392', date: '2026-11-16', title: 'Gloamlings from the braziers', lines: [
    "Gloamlings crawl out of the braziers the Lampeater snuffs: one from each, onto a dark tile beside the cold bowl, rising out of it through the smoke. With no dark tile there, it waits in the bowl. The first time, \"A gloamling crawls out of the ashes.\" follows \"The brazier gutters out.\"",
    "It is a plain gloamling, but the arena's own: it drops nothing, counts in no Records, Feat or Bestiary, never follows you out, and is gone when you leave the arena. The Lampeater's Bestiary line adds \"Gloamlings crawl from the braziers it snuffs.\"",
    "The bot now strikes a gloamling beside it. Its 200 fights a build: Lean wins 25% (was 32%), Middling 98% (was all), Strong all; still about 26 turns and one snuff, so about one gloamling a fight.",
    "Decisions: D-949.",
  ] },
  { v: '0.3.391', date: '2026-11-16', title: 'The Lampeater on 12 hearts', lines: [
    "The Lampeater is tougher: 12 hearts, not 8. It still bites for 2 and is hurt only while caught in light. It now snuffs a brazier about once a fight (at 6 hearts), where before it was almost always beaten first. The boss bench's At half starts it on 6 hearts.",
    "The bot's 200 fights a build: Lean now wins about 1 in 3 (was every one), Middling and Strong still every one, in about 26 turns (was 19). To be tuned again once there is more before the boss.",
    "Decisions: D-950. Questions: part of Q-111 answered. D-945 moved to the archive, word for word.",
  ] },
  { v: '0.3.390', date: '2026-11-16', title: 'The boss test bench', lines: [
    "A boss test bench, in the dev sheet's new Boss tab: each button starts the Lampeater's fight afresh, just inside its arena on depth 8, with a rough build (Lean, Middling or Strong), from the start or at half (4 hearts, 3 braziers lit). No turn passes, and you can start over any time.",
    "The playtest's #lampeater link opens straight into the fight with the Middling build, and that fight is never saved. A bot, tools/bossrun.js, plays the fight on many seeds and prints one line a fight. Nothing changes in a real game.",
    "Decisions: D-948, D-949. Questions raised: Q-111.",
  ] },
  { v: '0.3.389', date: '2026-11-15', title: 'The Lampeater snuffs', lines: [
    "The Lampeater snuffs your braziers now. Once it is down to 4 of its 8 hearts, it breathes from the dark on the lit brazier nearest it, and again each time it gets free from a catch after that.",
    "You get 2 turns' warning: the flame shudders, the tile is ringed red with a dot a turn left, and violet breath runs from its mouth. Catch it in light before then and the breath stops. Then the brazier goes cold with a curl of smoke; lighting it again costs 5 turns' oil, as ever.",
    "Decisions: D-947.",
  ] },
  { v: '0.3.388', date: '2026-11-15', title: 'The Lampeater drinks', lines: [
    "The Lampeater drinks from your light now. Waiting in the dark at the edge of your lantern's light, it drinks a turn's oil each turn, so your lantern burns twice as fast and its light pulls in, and it creeps in after it.",
    "A thread of light runs from the edge into its mouth, the oil bar flickers and you hear a sip; the first time, \"The Lampeater drinks your light.\" It never drinks a brazier's light, and not while caught or pinned.",
    "Decisions: D-946.",
  ] },
  { v: '0.3.387', date: '2026-11-15', title: 'The Lampeater pinned', lines: [
    "The Lampeater can be pinned now. Catch it with no dark tile beside it, say under a lit brazier with you blocking its way, and it can't slip away for 2 more turns: about 4 blows instead of 2.",
    "Then it bursts free across the light toward the nearest dark, and can be pinned again once it is back in the dark. It still backs out through your lantern's light, never a brazier's.",
    "Decisions: D-945.",
  ] },
  { v: '0.3.386', date: '2026-11-15', title: 'The Lampeater caught', lines: [
    "The Lampeater can be hurt now, but only in light. Light falling on it catches it: it can't move for a turn, burning in a ring of flame, then slips back into the dark. Switch your lantern on beside it for two blows.",
    "In the dark your blows still sink into it, and it bites for 2 hearts. It has 8 hearts, shown on its plate; beaten, for now it is simply gone.",
    "Decisions: D-944.",
  ] },
  { v: '0.3.385', date: '2026-11-15', title: 'The Lampeater moves', lines: [
    "The Lampeater moves now, only through the dark: it never steps onto a lit tile. Seeing you, it comes a tile a turn to the edge of your light, or right up beside you with your lantern off.",
    "Light falling on it, it slides back into the dark. It still doesn't bite and blows still sink into it; losing you, it drifts back to its place below the sealed door.",
    "Decisions: D-943.",
  ] },
  { v: '0.3.384', date: '2026-11-15', title: 'Finished decisions archived', lines: [
    "Docs only, nothing in the game changed: three finished decisions moved from the decisions file to the archive, word for word, so it has room again.",
    "Decisions: D-942. D-799, D-894 and D-910 moved to the archive, word for word.",
  ] },
  { v: '0.3.383', date: '2026-11-15', title: 'The Lampeater stands', lines: [
    "The Lampeater stands in its arena on depth 8: a low pool of deep violet gloam with a dripping edge, a dark mouth and pink eyes, waiting a tile below the tile before the sealed door. With the lantern off you still see its eyes glowing in the dark.",
    "For now it only waits there. It never moves or bites, and a blow sinks into it, hurting nothing: \"Your blow sinks into the gloam.\" The 4 braziers still sink the door until it can be beaten.",
    "It has a Bestiary page, met when your light reaches it. Like the Warden's, how to fight it opens after 1 is beaten.",
    "Saves from before: an arena already made gets the Lampeater.",
    "Decisions: D-941. D-938 moved to the archive, word for word.",
  ] },
  { v: '0.3.382', date: '2026-11-15', title: 'The Lampeater\'s arena', lines: [
    "Depth 8 has the Lampeater's arena, standing empty. The way to the stairs ends in a hallway, a road of seal stones between pillars with 2 cold braziers where it starts, and an open stone door into the arena above it. The arena has a cold brazier in each corner, 4 pillars round its middle, and at its top a sealed door with the stairs down behind it, in a ring of seal stones. For now, lighting all 4 braziers sinks the door; they go cold again if you leave first. Nothing else is in either room.",
    "Saves from before: every room from depth 8 down is made again; a hero there goes to that floor's stairs up.",
    "Decisions: D-940. D-929 and D-937 moved to the archive, word for word.",
  ] },
  { v: '0.3.381', date: '2026-11-15', title: 'Biome 1\'s boss planned', lines: [
    "Biome 1's boss is planned, nothing in the game yet: the Lampeater, a piece of the gloam that moves only through the dark and can be hurt only when caught in light, fought in its own sealed arena on depth 8 with braziers and gloamlings. Beaten, it gives Leap, and the floor gives way to a leap across to the way down.",
    "Decisions: D-939. Questions: part of Q-105 answered. D-927 moved to the archive, word for word.",
  ] },
  { v: '0.3.380', date: '2026-11-15', title: 'The Warden\'s look and sounds', lines: [
    "The Warden looks and sounds its new fight: a blow that rings off its stone shows a small grey spark instead of the white flash, and clinks, the light metal of Making played once and a quarter lower. As its fists sink into the floor it stoops, jolts and stone chips spring up, with a heavy thud of stone; it stays stooped while it is open.",
    "Decisions: D-938. D-936 moved to the archive, word for word.",
  ] },
  { v: '0.3.379', date: '2026-11-15', title: 'A harder Warden', lines: [
    "The Warden is harder: your blows ring off its stone (\"Your blow rings off the stone.\"), with no flash, until its slam misses and its fists sink into the floor. Then it is open until it next acts: step back beside it and strike. Each blow does 1 less, never below 1, so four openings beat it. Once cracked it never stands still again. Its Bestiary tip says how.",
    "Decisions: D-937. D-935 moved to the archive, word for word.",
  ] },
  { v: '0.3.378', date: '2026-11-15', title: 'Several kinds on one tile', lines: [
    "One tile can hold several kinds of find: Drop sets a stack down beside what lies there instead of swapping, and onto its own kind the stack grows. The tile shows each kind in turn, with its count, about a second each; with reduced motion, the newest with an ember \"+2\" for the others. A step onto it takes all that fits (B-011).",
    "Decisions: D-936. Questions closed: Q-110. D-934 moved to the archive, word for word.",
  ] },
  { v: '0.3.377', date: '2026-11-15', title: 'The chest\'s hint whole', lines: [
    "On a PC screen, the stash chest's \"Tap to move to the chest.\" no longer runs below the card's bottom edge: where it would break onto a line past the edge, it is left out, as it already was where there was no room (B-012).",
    "Decisions: D-935. D-933 moved to the archive, word for word.",
  ] },
  { v: '0.3.376', date: '2026-11-15', title: 'One stack on the ground', lines: [
    "A tree felled with a full bag leaves its 3 Wood as one stack on its stump, not on three tiles; the same for a branch's wood and a garden bed's berries. A stack on the ground shows its count in the corner, and stepping on it takes all that fits (B-011).",
    "Decisions: D-934. D-932 moved to the archive, word for word.",
  ] },
  { v: '0.3.375', date: '2026-11-15', title: 'Words clear of DROP', lines: [
    "On a PC screen, a find made at a station, such as the Healing Herb's \"Makes a Mending Draught at the mortar\", no longer runs over DROP in the bag: \"at the mortar\" goes on a second line when there isn't room (B-010).",
    "Decisions: D-933.",
  ] },
  { v: '0.3.374', date: '2026-11-15', title: 'A line\'s seconds', lines: [
    "A line along the bottom no longer stays while you stand still: it goes after 5 turns or 4 seconds, whichever comes first, 2 seconds more for each extra row on a long line (B-009).",
    "Decisions: D-932.",
  ] },
  { v: '0.3.373', date: '2026-11-15', title: 'The round map\'s dark circle', lines: [
    "With your lantern off in the dark, the round map no longer has a dark circle round you. The whole map fades evenly, faint as before, with your gold dot in the middle.",
    "Decisions: D-931. D-928 moved to the archive, word for word.",
  ] },
  { v: '0.3.372', date: '2026-11-15', title: 'The boon button', lines: [
    "Coming home by a waystone or a fall, the boon card no longer opens by itself. A round button with the waystone's violet rune shows up and left of the lantern instead. Tap it to choose a boon. Step off the plate and it goes; step back on and the card opens, as before.",
    "Checked: bats and lampmoths already fly over finds lying on the floor, so that note is closed. A test now makes sure it stays that way.",
    "Decisions: D-930. D-908 and D-909 moved to the archive, word for word.",
  ] },
  { v: '0.3.371', date: '2026-11-15', title: 'The rune wall opens', lines: [
    "Bump the rune wall with your lantern off and the runes flare: the stone sinks away for good, into a small nook. On a plinth inside lies a vault's prize, an ember or 2 of a rare material, taken with a bump.",
    "Bumped with the lantern lit, the rune wall now says so: \"Faint marks.\", then \"Too pale to see by lantern light.\"",
    "Decisions: D-929. D-907 moved to the archive, word for word.",
  ] },
  { v: '0.3.370', date: '2026-11-15', title: 'The rune wall', lines: [
    "From depth 1, one room on each floor now has a rune wall. Switch your lantern off and three faint violet runes glow on that wall's face, seen from across the room. With the lantern lit it looks like any other wall.",
    "Nothing opens it yet: bumping it in the dark comes next.",
    "Your six notes are on the bug list: flyers over things to pick up, the boon menu on coming home, the round map's dark circle, lines at the bottom staying too long, overlaps on a big PC screen, and a felled tree's wood landing in three spots.",
    "Decisions: D-928. D-902 moved to the archive, word for word.",
  ] },
  { v: '0.3.369', date: '2026-11-14', title: 'The dark door, settled', lines: [
    "Nothing in the game changed. The second puzzle is settled: from depth 1, one cave room on each floor hides a nook in its wall, marked by faint violet runes you can see only with the lantern off.",
    "Bump that wall in the dark and it opens for good, with a vault's prize behind it. Bumped with the lantern lit, it only says the marks are too pale to see.",
    "Decisions: D-927. D-925 and D-926 moved to the archive, word for word.",
  ] },
  { v: '0.3.368', date: '2026-11-14', title: 'The shovel', lines: [
    "New at the workbench: the Shovel, the BUILD tab's last slot. It costs 3 Wood and 2 Stone, and you carry one. Hold it in the Tool slot, as you hold the picks and the rod.",
    "With the shovel held, walk onto a stump to dig it out: a turn, and you stay where you are. Plain grass is left, and the tree never grows back there, so you can clear room for a base.",
    "Without the shovel held, you walk onto a stump as before. A standing tree is still chopped, not dug.",
    "Decisions: D-926.",
  ] },
  { v: '0.3.367', date: '2026-11-14', title: 'Creatures through doorways', lines: [
    "A creature chasing you now follows you out of a room, through a doorway, the cave mouth or down and up stairs, if it is within 3 steps of where you leave. Stairs are no longer a sure escape.",
    "It comes in as many turns after you as it was steps away, on the tile you came in by, still chasing. One right behind you comes in the turn after.",
    "Leave that room again before it comes, and it gives up: you may find it later in either room, somewhere new, no longer chasing.",
    "The rat, the gloamling, both mimics, the bone rat, the oil tick, the centipede and the rim lurker follow. The warden keeps to its vault, and bats and lampmoths stay behind.",
    "The round map's rim stays red while one is on its way.",
    "Decisions: D-925. Questions closed: Q-107.",
  ] },
  { v: '0.3.366', date: '2026-11-14', title: 'Cutting a room', lines: [
    "You can now cut a room in two with what you set down: a workbench, chest, bed, torch or anything else that sets down can block a narrow gap, even walling off part of the room. Deconstruct takes it back, and a torch burns out.",
    "A chopped tree now grows back on its stump even where it cuts the room in two (still out of sight, after 3 days). Chopping is the way through.",
    "With no room in the bag for the wood, the fourth chop fells the tree all the same: \"You can't carry more wood.\", and its 3 Wood lie on the stump and the open tiles next to it. Before, the tree stayed standing, which could have walled you in.",
    "Ore deposits that grow back still never cut a room in two.",
    "Decisions: D-924. D-899 moved to the archive, word for word.",
  ] },
  { v: '0.3.365', date: '2026-11-14', title: 'Flyers into trees', lines: [
    "New: bats and lampmoths hide in trees. A hurt one that flees, next to a tree in the woods, flutters into it and vanishes instead of flying off. At dawn, a night one next to a tree goes into it instead of leaving.",
    "A tree with a flyer in it gives a small shake now and then (with reduced motion, it leans a pixel). The first chop on it drives the flyer out beside the tree, and after you. Only the trees you can chop: never the ring of trees round the woods' edge. One flyer a tree.",
    "Docs: the next prompts to copy now come only once, after you say a PR is merged and Claude has checked it on GitHub; before that, the handoff asks you to say when it's merged. Three finished decisions move to the archive, word for word.",
    "Decisions: D-922, D-923. D-900, D-901 and D-921 moved to the archive, word for word.",
  ] },
  { v: '0.3.364', date: '2026-11-14', title: 'The round map\'s rim shows danger', lines: [
    "The round map's rim now warns you. While a creature in the room is chasing you, near or far, the rim turns red, thicker, and pulses slowly (steady with reduced motion).",
    "While a creature is close to noticing you, the rim shows a broken orange ring: one that would see you where it stands, or from one step nearer, by its own rules (light, lurking near, Soft Step, the Shade Draught). The two differ in shape as well as colour, so they read for colour-blind players too.",
    "Docs: one finished decision moves to the archive, word for word.",
    "Decisions: D-921. Questions closed: Q-109. D-920 moved to the archive, word for word.",
  ] },
  { v: '0.3.363', date: '2026-11-14', title: 'The round map in the dark', lines: [
    "The round map in the top right now fades in the dark, with the light on the hero's own tile: in daylight or by a full lantern it shows in full, and as the oil runs low it dims, down to faint at none. A torch, a brazier or a glow near you lifts it again, more the closer you stand.",
    "At an ember, or with the lantern off and no other light on you, the round map's middle hides too, a soft dark spot about 2 tiles round you. Your gold dot always shows, and every change eases in over half a second. The full map still opens clearly.",
    "Docs: two finished decisions move to the archive, word for word.",
    "Decisions: D-920. Questions closed: Q-108. D-918 and D-919 moved to the archive, word for word.",
  ] },
  { v: '0.3.362', date: '2026-11-14', title: 'The pictures on the chest\'s card', lines: [
    "On the stash chest's card, the thing you pick, in the chest or in the bag, now shows the bag card's picture under its rows: hearts or oil \"Now\" and \"After\", a draught's turns, or a weapon's hits beside the one you hold, as if you used it right away.",
    "Where the card is short, as on a phone held sideways, the picture is left out, so it and the \"Tap to move\" line never reach the buttons. A test checks the card fits with every thing picked, in the chest and in the bag.",
    "Docs: one finished decision moves to the archive, word for word.",
    "Decisions: D-919. D-917 moved to the archive, word for word.",
  ] },
  { v: '0.3.361', date: '2026-11-14', title: 'The next prompts, in CLAUDE.md', lines: [
    "Docs: CLAUDE.md now says that after a merge, the next prompts each go in their own code block, so each has its own copy button. Nothing in the game changes.",
    "Docs: one finished decision moves to the archive, word for word.",
    "Decisions: D-918. D-916 moved to the archive, word for word.",
  ] },
  { v: '0.3.360', date: '2026-11-14', title: 'The pictures on the peddler\'s card', lines: [
    "On the peddler's card, on both Sell and Buy, the thing you pick now shows the bag card's picture under its rows: hearts or oil \"Now\" and \"After\", a draught's turns, or a weapon's hits beside the one you hold, as if you used it right away.",
    "His price line always shows; the picture is left out where it and that line would reach the button. A test checks the card fits with every thing picked.",
    "Docs: one finished decision moves to the archive, word for word.",
    "Decisions: D-917. D-915 moved to the archive, word for word.",
  ] },
  { v: '0.3.359', date: '2026-11-14', title: 'The pictures on the Make card', lines: [
    "On the Make card (the bag's Make tab, the workbench and the mortar), a thing you can make now shows the bag card's picture under its rows: hearts or oil \"Now\" and \"After\", or a draught's turns, as if you made it and used it right away.",
    "Like on the bag card, the picture is left out where it would reach the buttons. A weapon made there would show its hits beside the one you hold; none is made there yet.",
    "Docs: two finished decisions move to the archive, word for word.",
    "Decisions: D-916. D-913 and D-914 moved to the archive, word for word.",
  ] },
  { v: '0.3.358', date: '2026-11-14', title: 'A goal with no reward, read aloud', lines: [
    "Fixed: with a screen reader, the Quests tab reads a goal done with no reward as \"done.\" instead of \"done, .\".",
    "Decisions: D-915.",
  ] },
  { v: '0.3.357', date: '2026-11-14', title: 'A broken save set aside once', lines: [
    "Fixed: a save the game can't read is now set aside once, not again on every load, so the copies can't fill the phone's storage. Nothing on screen changes.",
    "Decisions: D-914.",
  ] },
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
];
