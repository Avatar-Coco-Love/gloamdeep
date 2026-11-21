// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; older ones are in
// history-0.3-1.js (0.3.0 to 0.3.75, D-699), -2 (to 0.3.150, D-740), then 50 to a file, each file's
// range in its first line: by hand at the audits to -6 (D-782, D-826, D-910, D-951), and from -7 on by
// tools/release.js once a newer version is in (D-982); stage 0.2's are in history-0.2.js and its split
// files.
export const HISTORY_03 = [
  { v: '0.3.451', date: '2026-11-21', title: 'The Homestone, a way home', lines: [
    "New: the Homestone, a way home. Once the home waystone is woken, the workbench's GEAR tab makes one from 5 Duskstar and 5 Stone. USE it in the bag and it carries you onto the home waystone's plate, as waystone travel does: free, and the creatures there can't move before you do. It goes one way only, and is used up. Not with a creature so near.",
    "You can carry at most 3 Homestones.",
    "Decisions: D-1015.",
  ] },
];
