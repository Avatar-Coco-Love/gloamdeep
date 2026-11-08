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

**D-699 · 2026-11-08 · The eleventh audit** (the owner's picks, all
recommended) At 0.3.152, nothing visible changed. A conversation's start
reads 9.7 KB, not 10.6. The in-game history's stage 0.3 file is split
word for word: 0.3.0 to 0.3.75 go to `src/core/history-0.3-1.js` (78 KB
to 40 and 39). D-689 to D-694 move to `archive/DECISIONS-RELICS.md` and
D-660 to `archive/DECISIONS-AUDITS.md`; Q-037 and Q-038 to
`OPEN-QUESTIONS-2.md`; TECH's "Adding content" to `TECH-2.md`;
PROGRESS's ideas for later to `RESEARCH-2.md`; ticked step 20 is
archived; all word for word. One bug hunt read the code since 0.3.113
(Relics, Feats, Glints); its findings are listed for the owner to pick
from (https://claude.ai/artifact/MqecMUebWQKqaiK9gPPMBH), each fix its own small step with a test. The next audit is at
0.3.192.

**D-700 · 2026-11-08 · Three more cloak patterns** (the owner's picks,
all recommended, from a mock-up,
https://claude.ai/artifact/H1tbjmS1PxQxBkWLX9fdCV; builds D-515, D-533,
D-695, D-698, narrows Q-055) Three of nine drafts join, each in its own
colours: Tiger (rust with dark stripes from both sides), Stars (night
indigo with bone and sky specks) and Moth (sand with two eyespots, a
pale middle in each). Each costs 3 Glints, so the six patterns cost 18,
what the three Feats pay. They are the CLOAK tab's fourth row, and every
tab keeps as many rows. On a view too short for four rows (the menus'
176 × 221 picture upright), the boxes drop their names. While a pattern
is tried on, the note takes the big hero's name line instead of
covering the boxes: "Tiger: 3 Glints. You have 4.", adding "Earn more
from Feats." with too few, wrapping up over the floor's foot.

**D-701 · 2026-11-08 · The Look card scrolls** (the owner's picks, all
recommended, from a mock-up of three ways; builds D-533, D-700) More of
every kind of look is coming (more cloaks, eye colours, lantern looks and
colours), so the Look card makes room now. Its boxes stay a window of at
most four rows; a tab with more scrolls them a row at a time: a swipe up
or down on the card, or one notch of the mouse wheel, moves them a row,
and the arrow keys move the window a row when the flame goes past its
edge. A thin bar at the boxes' right, its gold thumb showing where the
window is, shows only when a tab has more rows than fit. Opening a tab
starts at its top, then goes to its pick. No looks change in this step;
lantern looks are next, Claude showing a set and the owner choosing.

**D-702 · 2026-11-08 · Lantern looks** (the owner's picks, all
recommended, from a mock-up of eight drafts,
https://claude.ai/artifact/3DDWo2nmCzKLfeVsUjp9Y3; builds D-695, D-696,
D-698, D-701, narrows Q-055) A look's fifth part is its lamp, the
lantern's shape, chosen on a fifth tab, LAMP, after CLOTHES. Three shapes
join the study's lantern: Carriage (a wide roof and foot), Dish (a bare
flame on a dish) and Pierced (dark tin, light through its holes). Each
takes the TRIM's two colours, keeps the flame's, and the light stays where
it is. Each costs 3 Glints, bought as a pattern is; RANDOM rolls only
those bought. The lantern button and the app icon stay as they are. Where
one row is too narrow for five tabs, they go in two (three, then two), as
the Journal's do; where even then four rows of boxes would reach the
buttons (the 176 × 221 view upright), the window shows three and the rest
scroll (D-701). Claude's call the owner may change: the free one is named
Lantern.

**D-703 · 2026-11-08 · Hats and hoods** (the owner's picks, all
recommended, from a mock-up of eight drafts,
https://claude.ai/artifact/6AxqaXJqWfcCVeGARWg7oh; builds D-696, D-698,
D-702, narrows Q-055) A look's sixth part is its head, chosen on a sixth
tab, HEAD, after LAMP. Three join the study's hood: Brim (a wanderer's
wide hat, its band the trim's colours), Ears (the hood with two pointed
ears) and Helm (a round metal cap with a nose guard, in the trim's
colours). Cloth takes the cloak's shades, a pattern's marks too; the face
stays in shadow with the eyes, and the body and lamp stay as they are.
Each costs 3 Glints, bought as a pattern is; RANDOM rolls only those
bought. The six tabs sit in one row where they fit, else two rows of
three. Claude's call the owner may change: the free one is named Hood.

**D-704 · 2026-11-08 · More hats and hoods** (the owner's picks; builds
D-703, narrows Q-055) The five drafts left from D-703's mock-up join the
HEAD tab at 3 Glints each, with their draft names: Horned (the hood with
two curled horns, always bone white whatever the cloak and trim),
Pointed, Bobble, Circlet and Scarf. Pointed is one row shorter than its
draft so its brim clears the eyes. Brim is all in the trim's colours, its
band the trim's dark shade; the hoods keep the cloak's. Hood, Brim and
Ears are free from the start; Glints spent on Brim or Ears come back.
Next, its own step: Carriage and one cloak pattern free, and a free pick
of any one locked look for every new profile, shown clearly (owner's
wish, how it is shown to be drafted).

**D-705 · 2026-11-08 · Teaching goals, the plan** (the owner's picks,
recommended where marked; builds D-629's first kind of quest and D-640,
opens Q-087) The game should teach its many systems. A teaching map
(https://claude.ai/artifact/5bSXQiKobcF8yNcf3tTQor) lists 32 systems,
where each is first met and what tells the player today: 9 taught, 16
half, 5 not (fighting; levels, embers and Growth; going home to the
woods; the waystone; the Journal), 2 to check in a playtest (sleep, the
map). Teaching goals come first for those 5, one at a time
(recommended), each appearing when it becomes useful: "beat a rat" once
a rat is seen; going up to the woods any time; finding the waystone,
then stepping on its plate to wake it; if no boon was ever held,
stepping off the home plate asks the hero to come back for one; the
first boon picked opens a glass card, like the opening card, saying
what boons are, with a Journal entry too. The goal shows as a small
line until done, unless something else is chosen; later, with several
waiting, the player may choose which to follow. Goals live in the
Quests tab (recommended, D-640), side quests joining later. A goal's
reward is rolled from a short list, the seed picking (recommended):
Glints, useful finds and so on. Goals already done in an older save are
ticked on loading and pay their reward, never shown (recommended).
The half-taught lines, finds saying what they are but not what next,
are fixed later at their own step (recommended). Nothing is built yet.

**D-706 · 2026-11-08 · The first teaching goals' words** (the owner's
picks, all recommended but the order; builds D-705, answers Q-087) From
a mock-up (https://claude.ai/artifact/1KHuhUs8hCtGHxYhaxeHJa). Six goals,
each worded as a goal in amber and one grey line saying how: "Beat a
rat" / "Walk into it to strike.", once a rat is seen; "Go home to the
woods" / "Take the stairs up from the crypt.", once the rat goal is done;
"Find the waystone" / "Old standing stones, near home.", on reaching the
woods; "Wake the waystone" / "Step on the plate in its middle.", once it
is seen; "Take a boon" / "Step back on the plate. Pick 1 of 3.", on
stepping off the woken plate with no boon ever held; "Spend your ember" /
"Tap here, then Growth.", at level 2, going ahead of any goal waiting.
The owner's own answer on the order: each goal's moment is its own, no
one rule for all; with two waiting, the older shows (Claude's call). The
goal line sits under the hearts panel, below the boon's mark, fading
with it; tapping it opens the Journal at its Quests tab. Done turns it
gold for a few turns, and the text line says "Goal done: Beat a rat. +1
Oil flask." Each goal's reward is rolled from: Oil flask 30%, 2 Healing
herbs 25%, 3 Oilcaps 20%, 1 Glint 15%, Healing potion 10%; goal Glints
are kept on the profile beside the Records' (Claude's call), and a find
with the bag full is set at the hero's feet (Claude's call). The boons
card, once, after the first boon is picked: "That is a boon: a small
help for one trip down." / "It lasts until you come home, or you fall."
/ "Its mark sits under your hearts. Each time you set out, pick a new
one." and Go; picking the done "Take a boon" in the Quests tab shows it
again. D-695 to D-698 moved to `archive/DECISIONS-FEATS.md`, word for
word.
