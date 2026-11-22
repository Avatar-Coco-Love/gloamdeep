# How we work: since the last audit

`WORKFLOW.md`'s last section, moved here word for word at 0.3.422
(D-981), so the playbook stays under 8 KB and a step reads only this
page to add its line.

When a step teaches something about working together, its PR adds one
line here (D-741). Each audit moves the lines into the right sections.


- Before a big multi-agent job, a short conversation settles its method
  first (frame, areas, models, how the owner reviews) and writes it down,
  so the run starts fresh with room to work (D-996).
- A strict one-line format for the agents' files let a grep prove every
  idea had its check, with no file read whole; the run cost Claude
  little context (0.3.435, D-996).
- The same format let a script build the board's 141 cards with no idea
  read; one probe write proved the saved picks before the handoff
  (0.3.436, D-996).
- Reading the board's 141 picks into files and joining them by script to
  the idea names and recommendations gave a one-line-a-card readback; a
  grep then checked every pick landed in the roadmap or research (0.3.437).
- Running the bench before and after a fight change, with the fresh
  numbers matching the recorded ones first, made the wisps' cost to the
  fight a fact to report, not a guess (0.3.438).
- Timing each half of a slow repaint before offering fixes (the border
  was three quarters of it) and comparing every patched tile to a full
  repaint, pixel by pixel, made a speed fix safe to call "the same
  picture" (0.3.439).
- Mock-ups made from the real game, with the code nudged as the page loads
  (Playwright's page.route), showed each placement on a phone both ways
  and on PC in minutes, without touching the branch (0.3.440).
- "Content before the Lampeater" could mean several steps; four choices
  from the roadmap, each a line, let the owner pick in one tap (0.3.442).
- A bug the owner only suspected ("if the surface flower floats") was checked
  first in a real screenshot, then shown beside its fix in the same mock-up
  as the new content, so one round of picks settled both (0.3.443).
- Listing the options not picked in a decision ("offered too: herbs rooted
  as well") let the owner come back for one later in a single line, with
  nothing left to ask (0.3.444).
- A roadmap step can be built already: 6.06 was done at 0.3.427, before
  the roadmap was written. Grep the decisions and play it before proposing;
  then the step is a tick, and the conversation takes the next (0.3.446).
- Measure what real phones give before fixing "the smallest view": the
  smallest phones were 176 × 264 and 312 × 176, not the 176 × 221 the bug
  named, and an offer made before checking the card's space was wrong
  once, so check before offering (0.3.446).
- Before building a fix for a small screen, open the game at real window
  sizes and read the view it gives: the bag's scroll was built for 176 ×
  264, which no window tried gives (all were 300 or more tall), so it
  shows nowhere yet; the owner kept it (0.3.447).
- When the owner wants examples before giving their own ideas, a page of
  looping sketches built only from decided pieces lets them pick fast;
  they chose one of four at once (0.3.450).
- Asked about a look, the owner wanted to see it first: a mock-up drawn by
  the game's own card code, three variants side by side, settled it in
  one pick. A new card screen joins `onTitle`'s list in `screens.js` too,
  or it draws as the title menu (0.3.453).
- The playbook became a guide for others: first for two friends, then a
  public one with tips by setup, not by person. Asked how long it really
  had to be, the honest answer (2 pages, a third if wanted) kept it short
  (0.3.455).
- A big wish (looks plus an effect) became two steps by asking the order
  first; the looks' mock-up was the real game with the draft drawing swapped
  in, and a first try that read as a chest was redrawn before the owner saw
  it, so every pick was the draft (0.3.457).
- An effect's mock-up drew with the game's own hero and stones and let the
  owner flip between styles; then a save built in code (both stones woken)
  let a script film the real trip, its skip and reduced motion (0.3.458).
- A line drafted for the strip was measured with the game's own font
  before it was offered, or the owner's pick has to be asked again (0.3.459).
- A line picked unmeasured, too long for a row, went in as two halves said
  on one line (lines.js's `also`), the owner's words kept (0.3.460).
- A playtest script that reads the room and plans one step at a time gets
  past creatures in the way; a planned path of keys does not (0.3.460).
- Mock-ups for a feel (the spark's voice, 0.3.461): showing 3 whole kits side by side, each with its growth, let the owner mix them, A now, B later, C as its own system (D-1025).
