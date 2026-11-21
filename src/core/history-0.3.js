// § history 0.3: stage 0.3, the world (D-168), its own numbers from 0.3.0 (D-528). Newest first. Each
// line is the change's line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; older ones are in
// history-0.3-1.js (0.3.0 to 0.3.75, D-699), -2 (to 0.3.150, D-740), then 50 to a file, each file's
// range in its first line: by hand at the audits to -6 (D-782, D-826, D-910, D-951), and from -7 on by
// tools/release.js once a newer version is in (D-982); stage 0.2's are in history-0.2.js and its split
// files.
export const HISTORY_03 = [
  { v: '0.3.454', date: '2026-11-21', title: 'The Peddler\'s gifts now and then', lines: [
    "New: the Peddler's gifts now and then. Every 3 days after his last gift, he has another: an Oil Flask or a Torch. Bump him and his talk box opens with his gift line, and it goes into your bag, free.",
    "While he has a gift for you, a small ember parcel bobs over his head. It stays still with reduced motion.",
    "With no room in your bag, he says he has a gift and keeps it for later.",
    "Dev tools: Grow also brings his next gift due at once.",
    "Decisions: D-1018.",
  ] },
  { v: '0.3.453', date: '2026-11-21', title: 'The Peddler\'s talk box', lines: [
    "New: the Peddler's talk box. Home on the surface, bumping him opens a small card with his face and a line, and two buttons: SHOP opens his card, BYE goes back to play.",
    "His lines take turns by day; past depth 3, and once the Lampeater is beaten, a line about each joins them. By night he has his own line.",
    "Decisions: D-1017.",
  ] },
  { v: '0.3.452', date: '2026-11-21', title: 'The Peddler\'s gift', lines: [
    "New: the Peddler's gift. Home on the surface, the first time you bump him with room in your bag, he gives you a Homestone, free. His card stays shut that time; your next bump opens it.",
    "With a full bag, or 3 Homestones already carried, he says he has a gift and his card opens as ever. He keeps it for a later bump when you have room.",
    "Decisions: D-1016.",
  ] },
  { v: '0.3.451', date: '2026-11-21', title: 'The Homestone, a way home', lines: [
    "New: the Homestone, a way home. Once the home waystone is woken, the workbench's GEAR tab makes one from 5 Duskstar and 5 Stone. USE it in the bag and it carries you onto the home waystone's plate, as waystone travel does: free, and the creatures there can't move before you do. It goes one way only, and is used up. Not with a creature so near.",
    "You can carry at most 3 Homestones.",
    "Decisions: D-1015.",
  ] },
];
