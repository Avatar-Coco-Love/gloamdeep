# Where things live

The full table of docs, moved word for word from `CLAUDE.md` at 0.3.422
(D-981), so the file every conversation loads stays small. `CLAUDE.md`
keeps a line per family; read this when its route isn't enough. Read the
smallest file that answers the question.

| File | What it holds | When to read it |
| --- | --- | --- |
| `docs/PROGRESS.md` | status, Next up, the last 3 logs | every conversation |
| `docs/PR-CHECKLIST.md` | what every PR updates, playtests, the handoff (D-570) | before making or updating a PR |
| `docs/DECISIONS.md` | the newest decisions | grep for an ID or topic |
| `docs/LORE.md` | the story: Underhearth, the First Light, Old Maren (D-633) | before any lore, quest or person's words |
| `docs/GLOSSARY.md` | the game's words (D-264); finds in `GLOSSARY-FINDS.md` and `-FINDS-2`; creatures in `-CREATURES`; the code's and menus' in `GLOSSARY-CODE.md` | before naming anything |
| `docs/CONTENT.md` | every creature, find, tile, place (D-363); creatures in `CONTENT-CREATURES.md`; finds in `CONTENT-FINDS*.md`, people in `-2`, tiles in `-3`, places in `-4`, newer tiles and places in `-5`, bosses in `-BOSSES`; the plan in `SCOPE*.md` (D-413) | before adding content |
| `docs/BUGS.md` | bugs the owner noticed (B-001…), their ideas with them (D-852) | when Next up names one |
| `docs/HEALTH-CHECK-3.md` | the third health check's findings (H-68…, D-975); how we work in `-3-WAYS`; the first two's, all done, in `archive/HEALTH-CHECK-DONE.md` | when Next up names one |
| `docs/OPEN-QUESTIONS.md` | undecided questions (Q-001…); outside places in `OPEN-QUESTIONS-2.md`; lore, special creatures and the health check's loose ends in `-3` | when a step touches one |
| `docs/PLANNING.md` | how the big planning run works: the frame, steps, eight areas (D-996) | the planning run and its review |
| `docs/planning/` | the run's files (0.3.435): `BRIEF.md`, the eight areas' ideas `1-…` to `8-…`, `CHECK-1`, `-2`, `SYNTHESIS.md`; formats in `PLANNING.md` | the board and the reviews; never read whole |
| `docs/RESEARCH.md` | the owner's wish list; ideas kept in `RESEARCH-2.md`; games and talks in `RESEARCH-GAMES.md`; travel and boons in `RESEARCH-TRAVEL.md`; research pages and their suggestions in `RESEARCH-PAGES.md`; the systems looking ahead in `RESEARCH-SYSTEMS.md` | when proposing a feature |
| `docs/PUZZLES.md` | every puzzle and pressure idea kept, by family (L, P, C, G, K, T, W; D-889); more in `-2` and `-3` | before proposing a puzzle |
| `docs/DESIGN.md`, `VISION.md` | the design brief; the pitch, inspirations, pillars | before proposing a feature |
| `docs/WORLD.md` | regions, ways between rooms (D-170); the map and the starting region in `-2` | world, region or map steps |
| `docs/regions/` | one rule sheet per region | only the region a step touches |
| `docs/ART-DIRECTION.md` | the visual rules from the style study; generated places' colours in `-2`; colours only the code had in `-3` | before any drawing code |
| `docs/TECH.md` | architecture, code rules; the layout and adding content in `TECH-2.md` | before writing code |
| `docs/SOUNDS.md` | every sound the game needs, and its file (D-773); the fight's, finds', menus' and maybes in `SOUNDS-2.md`; creatures' and places' in `SOUNDS-3.md`; music in `-4` | sound steps |
| `docs/DEV-TOOLS.md` | the dev mode plan and tools | dev mode steps |
| `docs/STORE.md` | the Google Play checklist (D-590) | store, offline or save-moving steps |
| `docs/WORKFLOW.md` | how we work together, why, what we learned (D-732); growth, tools, bugs and design habits in `-2` (D-741); the lines since the last audit in `WORKFLOW-SINCE.md`; each audit's lessons in `archive/WORKFLOW-3.md` to `-8` (D-782) | audits, or when the way of working changes |
| `CHANGELOG.md` | versions, newest first | the top entry only |
| `docs/archive/` | old decisions (in force), changelog, log | grep only; index in its `README.md` |
| `reference/style-study-1.html` | the approved look (545 lines, frozen) | art work only, by line range (`reference/README.md`) |
