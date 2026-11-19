# The big planning run: how it works

The owner's idea of 2026-11-19 (D-996): plan the game's future, near and
far, with a team of agents, the way the third health check found its
faults, before building more. The method below is settled; the ideas it
finds are not. **Nothing the run proposes is decided** until the owner
picks it.

## The frame (the owner's picks, all recommended)
- **How far:** up to 1.0, in three horizons: **Now** (finishing stage
  0.3, biome 1), **Next** (biomes 2 to 4), **Toward publishing** (the
  polish and store work 1.0 needs). Ideas for after launch go in a short
  "someday" list (offered too: the next stage only; launch and beyond).
- **How bold:** grounded, plus a wild tier. Most ideas grow from what is
  decided (scope, pillars, the wish list); each area also gives a few
  clearly marked wild ideas that could change direction (offered too:
  strictly grounded; blue sky).
- **How the owner reviews:** an interactive planning board, a private
  Artifact page that works on a phone: each idea a card marked Keep,
  Maybe or Drop, the picks saved for Claude to read back (offered too:
  multiple-choice rounds in chat; a written roadmap).
- **Pace:** every area in one run, so ideas are checked against each
  other, then the review an area a sitting (offered too: an area at a
  time).

## The steps
1. **Groundwork** (Claude alone): one short brief of where the game
   stands, what is decided for later and what is still open, from
   `PROGRESS.md`, `SCOPE*.md`, `RESEARCH*.md`, `VISION.md`, `DESIGN.md`,
   `WORLD*.md`, `LORE.md`, `OPEN-QUESTIONS*.md`. Every agent starts from
   it, so none reads all the planning docs.
2. **Brainstorm**: the eight areas below at once, each with its brief.
3. **Cross-check**: a cheaper model checks every idea against
   `DECISIONS.md`, its archive and the glossary; marks contradictions,
   merges repeats, sizes each idea (small, medium, large).
4. **Synthesis** (Claude): a roadmap by the three horizons, and a menu of
   choices for each area.
5. **The owner's review** on the board, over one or more conversations.
   Kept ideas go into a new roadmap doc and decisions, in one docs-only
   PR; the rest go to `RESEARCH`, so nothing is lost.

## The eight areas
| # | Area | What it covers | Model |
| --- | --- | --- | --- |
| 1 | Core loop and progression | the lantern's part slots, levels, embers, how "deeper → find → craft → deeper" feels over a whole game | Opus |
| 2 | The world | biomes 2 to 4 (the mines, the fungal caverns, the sunken ruins): what makes each its own, their puzzles | Opus |
| 3 | Creatures and bosses | each biome's creatures, a boss a biome, what the Lampeater taught | Opus |
| 4 | Crafting and home | the 7 craft families across the biomes, new stations, building at home | Opus |
| 5 | Story and lore | Underhearth, the First Light, Old Maren: how the story unfolds as you go down, and its end | Opus |
| 6 | The first hour, on a phone | teaching a new player, controls, menus, how readable it all is | Sonnet |
| 7 | Toward publishing | the store checklist, saves, offline, speed, what 1.0 needs | Sonnet |
| 8 | Outside critics | a new player's eyes and a scope realist, reading the others' ideas | Opus |

About 10 agents with the cross-check and synthesis, near the health
check's size.

## Rules for every agent
- Tag each idea **"builds on D-xxx"** (or Q-xxx) or **"new: needs the
  owner's OK"**; wild ideas are marked wild.
- Never treat an idea as decided; names, numbers and story are drafts.
- Use the game's words (`GLOSSARY*.md`); keep to the pillars
  (`VISION.md`) and the hard rules (`CLAUDE.md`, `TECH.md`).
- Short: one or two lines an idea, the owner reads in plain words.

## Keeping each conversation small (the owner's ask)
Each conversation must stay well under 200k tokens (about 4 bytes a
token). The aim is 120k or less, which leaves room for surprises.
- **The run is split** into conversations, each its own PR, and each
  merged before the next one starts:
  1. **The run:** the groundwork brief, the eight areas, the cross-check
     and the synthesis. Their files go in `docs/planning/`.
  2. **The board:** built by a script from those files, then published.
  3. **The reviews:** one or two areas a sitting, reading only that
     area's picks from the board.
  4. **The roadmap:** the kept ideas go into the roadmap doc and the
     decisions.
- **Claude reads briefs, not sources.** An agent writes the groundwork
  brief (`docs/planning/BRIEF.md`). Claude reads only that brief, never
  the planning docs behind it.
- **Agents write to files and report back short.** Each area's ideas go
  in their own file in `docs/planning/`, under 8 KB (`npm test` checks
  this). An agent's reply to Claude is at most 150 words: what it wrote,
  how many ideas, anything odd. The cross-check and synthesis agents do
  the same.
- **Claude never reads an area file whole** during the run. It checks
  sizes, greps, and reads a line range only when something needs a look.
  It reads the synthesis draft once, and that draft is under 8 KB.
- **The board comes from data, not reading.** A script turns the area
  files into the board's cards, so building the board needs no reading
  of the ideas.
- **Tests stay quiet:** dots only, as `npm test` prints now.
- **If a conversation still runs long,** Claude stops at the next clean
  point, commits, and hands off. The next conversation picks up from
  `PROGRESS.md`'s Next up.

## The run's files (0.3.435)
In `docs/planning/`: `BRIEF.md` (the groundwork), `1-CORE-LOOP.md` to
`8-CRITICS.md` (141 ideas), `CHECK-1.md` and `CHECK-2.md` (the
cross-check), `SYNTHESIS.md` (roadmap, choices by area, flags). The
board's script reads these lines, nothing else:
- An idea: `- **N.NN Short name** · [wild · ]builds on D-xxx, Q-xxx · text`
  (or `new: needs the owner's OK` for the tag), under `## Now`,
  `## Next`, `## Toward publishing` or `## Someday`.
- A check: `- N.NN · S|M|L · ok` or its verdicts (`clash D-xxx: …`,
  `already D-xxx`, `bad ref D-xxx`, `word: …`, `repeat of N.NN`), joined
  by `; `. Lines after `Notes:` are the checkers' notes, not checks.

The brief found loose ends for a later step: "biome" in this file and
`VISION.md` where D-954 says "chapter"; creature counts that differ
(D-607, D-634, D-643); `DESIGN.md` still says sounds are made in code
(files since D-773); portals decided (D-019, D-032) with no step planned.

## The board (0.3.436)
A private Artifact: https://claude.ai/artifact/7UaaJUk8SSVVXVuFtjxBQw.
`node tools/board.js <scratchpad>/board.html` builds it from the lines
above and `RECS-1.md`, `RECS-2.md` (counts and problems, one line each;
`tests/board.test.js` checks every idea has its check and recommendation),
then republish to the same link. Each card shows Claude's recommendation,
`- N.NN · Keep|Maybe|Drop · reason` in `RECS-*.md`, one agent's pass, its
button marked with a dot (the owner's picks, 0.3.436), and an always-open
box for the owner's own answer beside the pick (the owner's pick). Claude's
picks, the owner's to change: tap a pick again to clear it; filters by area, To pick, Keep, Maybe, Drop, Wild and
Flagged (the check's verdicts); "repeat of" jumps to that card.
- **Reading picks back** (the reviews): `ArtifactData` `query` on that
  link, collection `picks`, `where` `area` `==` `"1"`. One document a
  picked card, id `c1-01` for idea 1.01: `{id, area, pick, note, at}` (`note`
  is the owner's own answer);
  `pick` is `keep`, `maybe`, `drop` or null (cleared). Unpicked cards
  have no document.
