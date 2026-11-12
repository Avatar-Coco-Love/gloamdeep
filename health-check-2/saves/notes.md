# saves worker notes (appended as I go)

## Method so far
- Full clone in saves/full (1270 commits). For each journey format N=1..32: v/N = last commit before FORMAT was raised, v/Na = first commit with FORMAT=N.
- oldplay.mjs plays each old version's OWN rule modules (AUTHENTIC saves): new journey, walk, pick finds, set down bench/chest/bed/garden/shelf/torch where the version has them, stash things, hold/wear/tool, buy Growth, walk surface rooms, wake home stone, crypt, depths 1..9 (rooms by edges, stairs), wake stones d2/5/8, free Peddler (dig rubble), locket room, a real fall at depth 6, back home. Saves with that version's journeyText at ~11-25 checkpoints. Seeds 7, 12345, 4, 1 (v/N) and 7, 4 (v/Na). Map memory recorded each turn as old main.js did.
- check.mjs loads each with today's readJourney and checks soundness + plays 200 turns twice (kept alive / natural).
- Total about 3700 saves, formats 1..32, all AUTHENTIC.

## Per-format result (second full run, with map memory)
- Formats 2-8: all load, 0 problems (66-70 saves each).
- Format 1: all load; only "xp undefined -> N" (my check too strict: withXp pays for rooms found, D-245) - to confirm, not a bug.
- Formats 9-17: all load; the ONLY problem: Peddler freed and still waiting in his room when saved -> gone for good (33 saves).
- Formats 18-32: all load, 0 problems (130-148 saves each).

## CONFIRMED FINDING 1: a freed Peddler still waiting in his room is lost by the upgrade (formats 9-17)
- refloor (steps 10, 16, 17) sends a waiting person home with goHome -> today's goHome puts him in stoneHome(seed) (cave mouth's room), made fresh, unseen.
- Later regrove (step 22, unseen woods rooms made again) or renew (step 20, unseen north rooms made mountain rooms, when the mouth is north e.g. seed 4) remakes that room with fresh() and drops its people.
- After load: Peddler in no room; his own room is made without him (ped.mjs). Gone for the journey.
- Formats 13-17 with the home waystone WOKEN are spared when the mouth room is a woods room (regrove keeps a room whose stone is woken), but not when it is the north room (seed 4).
- Traces: node trace.mjs out/10-s7/05-peddler-room-freed-waiting.json (lost at step 22->23); out/16-s4/07-... (lost at step 20->21).
- Against refloor.js's own comment "a freed person still waiting there goes home" and D-496/D-855.
