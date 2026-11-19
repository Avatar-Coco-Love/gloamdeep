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
