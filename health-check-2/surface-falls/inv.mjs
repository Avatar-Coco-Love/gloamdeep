// invariants of the mountain rooms, lamppost and camp over many seeds (rules only)
import { core } from '../lib.mjs';
const room = await core('room'), hw = await core('hearthwood'), lp = await core('lamppost'), camp = await core('camp'), cf = await core('campfire'), woods = await core('woods'), mouth = await core('mouth'), state = await core('state');
const N = +process.argv[2] || 1500, bad = {}, count = {};
const note = (k, seed, extra = '') => { (bad[k] ??= []).push(seed + (extra ? ':' + extra : '')); };
const tally = (k) => { count[k] = (count[k] || 0) + 1; };
for (let seed = 1; seed <= N; seed++) {
  const lampRoom = lp.lamppostRoom(seed), campRoom = camp.campRoom(seed), fire = cf.campfireOf(seed).room;
  if (lampRoom === fire || lampRoom === 'woods') note('lamp room wrong', seed);
  if (!hw.isMountain(campRoom) || campRoom === fire || campRoom === lampRoom) note('camp room wrong', seed);
  let lampSeen = 0, campSeen = 0;
  const startPlace = state.startRoom(seed);
  if (hw.isMountain(startPlace)) note('start in mountain', seed);
  for (const id of hw.ROOMS) {
    const p = room.beginPlace(id, seed), map = p.room.map, flat = map.join('');
    const n = (ch) => [...flat].filter((c) => c === ch).length;
    const lamps = n('b'), camps = n('c');
    lampSeen += lamps; campSeen += camps;
    if (lamps && id !== lampRoom) note('lamp in other room', seed, id);
    if (camps && id !== campRoom) note('camp in other room', seed, id);
    if (!hw.isMountain(id)) { if (p.items.some((i) => i.id === 'stone')) note('stone in woods', seed, id); continue; }
    if (n('O') !== 3) note('boulders != 3', seed, id + '=' + n('O'));
    const stones = p.items.filter((i) => i.id === 'stone'); if (stones.length !== 2) note('stones != 2', seed, id + '=' + stones.length);
    const wood = p.items.filter((i) => i.id === 'wood').length; if (wood !== 3) note('sticks != 3', seed, id + '=' + wood);
    if (n('F') !== 1) note('fallen branch != 1', seed, id + '=' + n('F'));
    if (n('~') || n('G') || n('H')) note('pond or bush in mountain', seed, id);
    if (p.items.some((i) => i.id === 'oilcap')) note('oilcap in mountain', seed, id);
    for (const it of p.items) { if (map[it.y][it.x] !== '.') note('item not on grass', seed, id + ' ' + it.id + ' on ' + map[it.y][it.x]); }
    for (const st of stones) if (p.items.filter((i) => i.x === st.x && i.y === st.y).length > 1) note('stone on a find', seed, id);
    // lone trees: 2 or more in from the edge
    map.forEach((l, y) => [...l].forEach((ch, x) => { if (ch === 'T' && woods.depthIn(x, y) < 2) note('tree near edge', seed, id); }));
    // edge: rock but for the ways
    // every open tile joined to start incl. path tiles
    const start = p.start || p.room.start;
    const g = map.map((l) => l.split(''));
    if (start && !woods.joinedFrom(g, start)) note('not joined', seed, id);
    if (camps) { if (camps !== 6) note('camp not 6 tiles', seed, id + '=' + camps); map.forEach((l, y) => [...l].forEach((ch, x) => { if (ch === 'c' && woods.depthIn(x, y) < 2) note('camp near edge', seed, id); })); }
    tally('trees in mountain: ' + Math.min(n('T'), 9));
  }
  for (const id of hw.ROOMS) { const map = room.beginPlace(id, seed).room.map; map.forEach((l, y) => [...l].forEach((ch, x) => { if (ch === 'b' && woods.depthIn(x, y) < 2) note('lamp near edge', seed, id); })); }
  if (lampSeen !== 1) note('lamp count != 1', seed, '' + lampSeen);
  if (campSeen !== 6) note('camp tiles != 6', seed, '' + campSeen);
  tally('lamp in ' + (hw.isMountain(lampRoom) ? 'mountain' : 'woods'));
}
for (const [k, v] of Object.entries(bad)) console.log('BAD', k, v.length, 'e.g.', v.slice(0, 6).join(' | '));
console.log('seeds', N, JSON.stringify(count));
