# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`PR-CHECKLIST.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-363 · 2026-10-25 · A content index and an adding checklist** (the
owner's picks, both recommended) `docs/CONTENT.md` lists every creature,
find, tile, light and place with its numbers, where it turns up and its
decisions, so proposals build on what exists. `TECH.md`'s "Adding content"
lists the files each kind of content touches. A PR that adds or changes
content updates both.

**D-431 · 2026-10-29 · How we work: one step a conversation** (the owner's
pick, recommended) The owner keeps choosing every question. Each
conversation does one step, ends with its handoff, and the next step
starts in a fresh conversation, so less is read again each time.

**D-518 · 2026-10-31 · An audit every 40 versions** (the owner's pick,
recommended; supersedes D-337's 20) The owner asked if audits help. The
start-of-conversation read stays near 11.5 KB (17 KB before the first),
but the size test already makes normal steps trim, and code splits are
outgrown in an audit or two, while 20 versions is about a day. So an
audit comes every 40 versions; the size test still guards in between.

**D-732 · 2026-11-09 · A playbook of how we work** (the owner's picks,
all recommended) The owner wants this project's way of working kept for
future projects. `docs/WORKFLOW.md` gathers it in one place: the steps
of a step, each habit and why, what changed along the way, and how to
start a new project. Each audit adds what that stretch taught us about
working together. Built now as its own step, nothing visible changed.

**D-741 · 2026-11-09 · The playbook caught up, and kept up** (the owner's
picks, all recommended; builds D-732) The owner asked that the playbook
hold everything done so far and grow as we go. Four parts are added:
how the game grew (stages, a playtest setting each plan, groundwork
first, only what works shows), our tools, lessons from bugs and design
habits. They go in a new `docs/WORKFLOW-2.md`, so `WORKFLOW.md` stays
under its cap. When a step teaches something about working together,
its PR adds one line to `WORKFLOW.md`'s "Since the last audit"
(`PR-CHECKLIST.md` reminds), and each audit moves the lines into place.
Nothing visible changed.

**D-782 · 2026-11-10 · The thirteenth audit** (the owner's picks: every
split, every archive and the playbook; ponds as recommended) At
0.3.232, nothing visible changed. A conversation's start reads 10.4 KB,
not 11.0. Three code files are split word for word: the in-game
history's 0.3.151 to 0.3.200 go to `src/core/history-0.3-3.js` (42 KB
to 16 and 26); the creatures' pictures, rat to mimic leaf, to
`src/render/pictures-creatures.js` (49 KB to 39 and 10); each
creature's lines and its finds' to `src/core/lines-creatures.js` (42 KB
to 31 and 13; `tools/make.js` still starts new ones in the old files).
D-740 and D-742 move to `archive/DECISIONS-AUDITS.md`, D-743 to
`archive/DECISIONS-CARDS-2.md`, and D-773 to D-777 to a new
`archive/DECISIONS-SOUNDS.md`; ticked steps 23, 24, 25 and 27 are
archived; Q-088, Q-091 and Q-092 move to `OPEN-QUESTIONS-2.md`; the
playbook's audit lessons go to a new `WORKFLOW-3.md`; all word for
word. Docs that drifted are fixed: the lampmoth, bat, gloamling and
mole's surface visits; the packs in use; most woods rooms have a pond,
not each (about 1 thick-woods room in 20 has none). The bug hunt found
three bugs, all to be fixed in the next PR (the owner's call): night
or day creatures piling up across nights (B1), a bite on waking from
sleeping out (B2), night creatures coming out beside the hero in the
dark (B3). The next audit is at 0.3.272.

**D-783 · 2026-11-10 · The audit's bug fixes** (the owner's call at
the audit, D-782; fixes D-778 to D-781) An earlier night's or day's
creatures still standing go before the new ones come out, so they never
pile up in a room left and come back to (B1). Night creatures leave by
day, and day creatures by night, before any creature acts, so none
bites the hero on waking from sleeping out (B2). Night creatures come
out at least 4 steps from the hero, as the mole, as well as out of
sight, so none appears beside them with the lantern out (B3). Each has
a test.

**D-790 · 2026-11-10 · Copyable next prompts** (the owner's request)
Each PR's handoff ends, before merging, with a few short prompts the
owner can copy to pick the next direction, one per choice, or a single
one when there is only one way on (`PR-CHECKLIST.md`). When they are
given changed by D-795 (2026-11-10): once, after the merge.

**D-799 · 2026-11-10 · The finds plan** (the owner's picks, all
recommended, from a plan page: https://claude.ai/artifact/GnPo6RnybF7g6ogTdiET6y;
narrows Q-061 and Q-093) Each find kept for crafts later gets one first
use, with more uses free to come later: Crab Shell, the Shell Vest
(D-801); Grub Skin, a Spitproof Draught; Bunny Fur, a Fur Bedroll for
sleeping out; Bat Wing, an Echo Charm showing creatures in the dark
near by; Lurker Claw, a Shade Draught, creatures noticing the hero only
near; Rat Bone, a Bone Hook for the rod; Glow Gland, a Glow Lamp, a
longer torch; Bat Fang, a Fang Charm, a heart back now and then from a
beaten creature; Mole Claw, the Mole Claw Pick. With later steps: Oil
Bladder, the lantern's first tank; Gloam Eye, its first glass, showing
creatures in disguise; Stinger, a Stinger Spear poisoning creatures;
Venom Sac, a Venom Oil for weapons. Kept for later too: Bunny Fur, a
warm lining; Bat Wing, arrows' fletching; Stinger, arrowheads; Rat Bone,
a Bone Club; claw weapons. They are built one a step, in that order,
each one's numbers settled at its step (the plan's are drafts). The
owner's wish for weapons (Q-094): a switch to show creatures' coming
attacks and one to show the hero's. Others offered: two or three a PR;
a waterskin, a Bat Wing torch, a Sting Salve, Bone Meal, a Tick Charm,
an Eye Charm, a Wayglow, a Mole Charm, a long Ward.

**D-819 · 2026-11-11 · The menus' sounds** (the owner's picks, all
recommended, from a board of 6 taps, 4 page turns and 4 tocks; builds
D-774; answers part of Q-095) Off play, a tap, Enter or Space that
changes something on the same card ticks: Interface Sounds' tick 2, at
half a step's peak (offered too: as loud as a step; click 2 or UI
Audio's click 3; ObsydianX's cursor tone). A card opening turns a page,
RPG Audio's flip 3, and closing turns one back, its flip 2, each as
loud as a step (offered too: the same, soft; the book opening and
shutting; Interface Sounds' open and close). A tap that opens or closes
a card turns only its page, with no tick (offered too: both). A dim
pick that can't be done tocks: Impact Sounds' light wood knock, a
quarter lower, as loud as a step (offered too: bong 1; error 4;
ObsydianX's error tone). None strays in pitch. Claude's calls the owner
may change: play, setting a tile down and the title have no card, so
reaching them closes; going back to a card still open under the rest
closes, anything else opens; the tock plays on the bag's dim Make, the
Make tab's dim recipe, the garden bed's and campfire's dim first line,
a dim waystone row and a Growth upgrade with too few embers; the
"You can't carry more" lines, the dim quick slot and the HUD buttons in
play stay silent; the run ending waits for later. D-815 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-820 · 2026-11-11 · The bag's sounds** (the owner's picks, all
recommended, from a board of 4 each; builds D-774; answers part of
Q-095) An item into the bag pats: RPG Audio's cloth 1 to 4, taking
turns, a little higher or lower each time (offered too: a small leather
pouch; leather dropped; a cloth belt). A weapon from the bag into the
hand is drawn: its knife draw 3 (offered too: draws 1 to 3; a belt
buckle; a metal latch). A tile set down knocks: Impact Sounds' medium
wood knocks (offered too: heavy; a plank; a book set down). Each as
loud as a step (offered too: half). A weapon picked up only pats.
Claude's calls the owner may change: every `take` pats, a fish's catch
keeps only its splash, the stash chest's moves keep the menus' tick.
Next, Settings gets tabs: Controls (Swipe, Tap, Arrow pad, Stop
walking), Game (Seed, Mode, Lantern, Flasks), Screen (Motion, Attack
marks, Stats line) and Sound (offered too: Play · Screen · Sound; Game ·
Sound); later the Sound tab holds an overall loudness, a loudness for
each kind, and On or Off for each sound (offered too: silent in the
background). D-816 moves to `archive/DECISIONS-SURFACE.md`, word for
word.

**D-821 · 2026-11-11 · Settings in tabs** (the owner's picks, all
recommended; builds D-820) The tabs CONTROLS, GAME, SCREEN and SOUND
sit in the card's title row where SETTINGS was, as the bag's (offered
too: under the title). Settings opens on the tab last open, Controls at
first, kept as it closes until the game is closed (offered too: Controls
every time). The Tab key turns to the next tab, as on the bag and the
workbench, and a tap on one opens it (offered too: Up from the top line
onto the tabs). VERSION HISTORY stays in the bottom corner on every tab
(offered too: only on Game). On a card too narrow for one row (upright
phones), the tabs take two, 2 and 2, the lines a row lower (offered too:
3 and 1). Claude's calls the owner may change: each tab opens on its
first line; Settings' spoken words name the open tab. D-817 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-822 · 2026-11-11 · Loudness** (the owner's picks, all recommended;
builds D-820; step 1 of 3) A line Loudness under Sound on the Sound tab,
0% to 100% in steps of 10% (offered too: steps of 25%; a drawn bar of
10 marks). Sound On or Off stays beside it as the quick switch, and
the loudness is kept apart (offered too: one line, 0% as Off). Next, a
loudness for each of four kinds: Steps, Fighting (the creatures too),
Finds (the bag and places too) and Menus (offered too: the seven of
`SOUNDS.md`; Play and Menus); then each sound On or Off, in a short
list opened from its kind's line (offered too: all on the Sound tab; a
fifth tab). Claude's calls the owner may change: 100% until picked; a
tap goes up a step, round from 100% to 0%; Left and Right go down and
up, stopping at the ends; the menu's tick plays at the new loudness;
the cave's echo is as loud as its step. D-818 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
