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
