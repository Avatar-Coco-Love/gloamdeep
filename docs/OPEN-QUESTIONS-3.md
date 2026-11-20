# Open questions, 3: lore and special creatures; puzzles; the health check's loose ends

Started at 0.3.84, as `OPEN-QUESTIONS.md` neared 8 KB: the questions
about lore, bosses and other special creatures. Its rules hold here too:
when the owner answers one, record a decision that cites it, then delete
the entry here.

---

**Q-083 · Special creatures with histories** (raised 2026-11-06, the
owner's idea; builds D-463 to D-467, D-629) Some creatures have a
history behind them and a feat for overcoming them, unlike the ordinary
creatures' universal Bestiary lines. The owner's picks so far, all of
each: three kinds, **bosses** (one near each biome's bottom, D-463),
**rare named creatures** (stronger, named versions of ordinary ones,
found by chance) and **unique wanderers** (one of a kind, roaming a
region). Their story told in **lore pages** (D-464), on **their
Bestiary page** and by **the guide or people**. Beating one gives a
**one-off Feat** (beside the tiered ones, D-467; the Lampeater's built, D-955), a boss **its found
ability** (D-463), and **a trophy or relic** (D-465, D-466).
Claude's proposal approved (D-993): the pages tell the past, the Bestiary
page what it is now, the guide and people rumours of where it is; bosses,
about 4, all three places and every reward; wanderers rumours, a Bestiary
page, a Feat and perhaps a relic; rare named ones a Bestiary page, a Feat
and a trophy. A boss's big rewards are never lost, whatever lands the last
blow (D-992). Still open: each one's story, looks and fight, the
numbers, and when each kind comes, each at its own step. Old Maren, the
hero's teacher, is one boss with a history, freed when beaten (D-633,
`LORE.md`), fought near the end after the 4 biome bosses; about 8
wanderers and rare named ones (D-634).

**Q-084 · Who the keeper is** (raised 2026-11-07, D-633) One lone
keeper leaves the oil flasks, herbs and other finds, never caught and
always a room ahead (`LORE.md`). Who the keeper is, and when the hero
learns it, wait; the owner chose to decide later.

**Q-096 · Deep moles** (raised 2026-11-12, the owner's idea with D-858)
A mole digging through stone makes no sense. On the stone floors, a
different mole that can dig through harder rock to burrow; stronger,
as it lives deeper; each mole kind leaving its own resources, with its
own count and page in the Journal. The mole now joins the pool at depth
5 and keeps turning up below it (D-541), so on the earth floors (5 to 7)
and the dungeon's stone halls (8 down). Open: its name, look, numbers,
drops and from which depth; whether the mole stops at depth 7. Its own
step, when the owner wants.


**Q-105 · Each first puzzle's details, and biome 1's capstone** (raised
2026-11-13, D-889; the order settled by D-890) Open: each of L1, L3, P1
and T1's tiles, names, numbers and rewards, at its own step (L1's by
D-891, its build steps by D-892, its prize by D-896, L3's by D-927; a vault's other prizes, "maybe other things", and which puzzle
each vault holds once there are more); biome 1's
boss and found ability (G3, W4) settled by D-939, the Lampeater and
Leap, each step's details at its own step; the lantern part slots after. New ideas join the plan any time.

---

**The second health check's loose ends** (D-862): seen at 0.3.305 with
no decision to measure against. Each is asked at the step named in
`HEALTH-CHECK-ORDER.md` (now in `archive/HEALTH-CHECK-DONE.md`).

**Q-106 · A shovel that digs up trees** (raised 2026-11-14, the owner's
idea) With a shovel held, a tree could be dug up for good, no stump
left, to clear room for a base, and give a seed or sapling to plant a
tree elsewhere. The shovel and digging out stumps are built (D-926).
Still open: the sapling, its make, where it grows and how long.

**Q-108 · Digging up buried things** (raised 2026-11-14, the owner's
idea, with D-926) Perhaps at some point the shovel could dig spots up to
find something buried. What is buried, where, and how a spot is told
apart? Its own step, any time.

**Q-111 · How hard the Lampeater should be** (raised 2026-11-16, by the
boss test bench's first runs, D-948; part answered by D-950: 12 hearts
for now) On 8 hearts the bot won all 200 fights with every build, in
about 19 turns, and its snuff (D-947) seldom came. On 12, Lean wins 32%,
Middling and Strong all, in about 26 turns, with about one snuff. Each
fight is nearly the same, as the arena is. To tune
again once the gloamlings (step 8) or more before the boss, and so a
stronger hero, are in: its hearts, its bite, or how long a catch holds.
With the gloamlings in (0.3.392): Lean 25%, Middling 98%, Strong all.
From 0.3.399 the bench starts in the way in, where walking in from the
hallway puts you (D-958): over 400 fights, Lean 34% (26% before),
Middling 97% (the same), Strong all. With its 4 gloamlings at the start
(0.3.413, D-971), over 100: Lean 52% (37% before), Middling all (95%). Its calls
(0.3.417, D-974): Lean 12%, Middling 79%, Strong 83%. Its guards (0.3.418,
D-976): Lean 12%, Middling 80%, Strong 83%. Wary (0.3.419, D-977): Lean 7%,
Middling 79%, Strong 85%. Its 2 lure wisps (0.3.438, D-1002): Lean 21% (35%
before), Middling 72% (84%), Strong 97% (94%).

**The owner's Lampeater polish** (raised 2026-11-16, at 0.3.405) Once its
steps are done, the owner has ideas for its phases, how the cutscenes
work, and gloamlings at the start of the fight, among others; to be asked
for then. Asked at 0.3.413 (D-971): the gloamlings at the start, its new
ways and Leap as a find, in 6 steps; 8 with the flanking and the guards (D-972); step 7, the find and card, is D-992; the cutscenes and the rest asked after step 8, the sound (D-992). Step 8, the sound, is D-994; the lure wisps are D-1002 (0.3.438); its phases and the cutscenes are the owner's picks to come next, their ideas asked then.

**Q-114 · Where falling ground goes** (raised 2026-11-17, D-967) The
boss fight has no falling ground; the owner saved it for another time.
Kept in the code, unused: the Gap tile ("Too wide to step. More lies beyond.", D-969),
`floorGives` in `beaten.js` with its line "The floor gives way.", the
crumble (`render/crumble.js`), the shake and the `giveWay` sound. Where
it is first used, and how a later trip gets back past it (the owner's
worry), is to be asked then; T4, the collapse, is one place.

**Q-115 · What lies across a Leap gap** (raised 2026-11-17, at 0.3.410's
merge, D-968) The owner's words: "These gaps that are specifically
related to Leap, should have a message when you try to cross them
without it. They also need to open up a whole new area on that depth,
for example, you jump over the gap, go through a door/exit to another
room, and you find yourself confronting new enemies and seeing new
things, perhaps even another biome within that biome, so that is more
than one biome per depth. There should not be just more of the same on
the other side of these gaps." Settled (D-969): the lines, a doorway
to a small place of 2 to 4 rooms at the same depth, the order of its
steps, and the gaps below depth 8 waiting. Where the doorway stands,
settled (D-970): an Archway to one empty room off the grid. Open: the
place's look, its creatures and finds, more rooms, how the map shows it,
and its name, each at its own step.
