import { readFileSync } from 'node:fs';
const SAVE = await import('/home/user/gloamdeep/src/core/save.js'), R = await import('/home/user/gloamdeep/src/core/room.js'), ST = await import('/home/user/gloamdeep/src/core/stairs.js'), MO = await import('/home/user/gloamdeep/src/core/mouth.js');
for (const f of process.argv.slice(2)) { const { text } = JSON.parse(readFileSync(f, 'utf8')); const s = SAVE.readJourney(text).state; const pr = R.peddlerRoom(s.seed);
  const there = ST.goToPlace(s, pr), home = ST.goToPlace(s, MO.stoneHome(s.seed));
  const p = there.people[0]; let rub = 0; if (p) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (R.tileAt(there.room, p.x + dx, p.y + dy).id === 'rubble') rub++;
  console.log(f.split('/').slice(-2).join('/'), '| his room', pr, 'people', JSON.stringify(there.people), 'rubble round', rub, '| stone home', JSON.stringify(home.people)); }
