// § arena today (F-10, D-1001): the save format stayed at 37 while the arena changed, so an arena
// kept in an older save may keep an old shape. Once, as the save is brought up to date (save.js):
// - the Lampeater still in it: its sealed door, if its lit braziers opened it (0.3.394), stands sealed
//   again, its braziers cold, and its 4 gloamlings (0.3.413) and 2 wisps (D-1002) are back, as on
//   leaving (wholeAgain).
//   With the hero inside, the Lampeater keeps its hearts and its tile, and a gloamling's tile with
//   the hero or a creature on it is skipped; the way in stays open, as before the seal.
// - the Lampeater beaten with no find left (0.3.395 to 0.3.403) and Leap not learnt: Leap's find lies on
//   the Lampeater's own tile (D-992's door then waits for it, as doorAfterLeap does).
// Never made, nothing changes. Plain data, no drawing.
import { arenaPlace, wholeAgain } from '../beaten.js';
import { LAMPEATER_AT, arenaOwn } from '../arena.js';
import { coolVault } from '../vault.js';
import { get } from '../registry.js';
import { tileAt, withTile } from '../room.js';

const DOOR = { x: LAMPEATER_AT.x, y: 4 }; // the sealed door's tile, the seal hall's (arena.js)

// The room with its door sealed again, if open, and its braziers cold
const sealed = (room) => coolVault(tileAt(room, DOOR.x, DOOR.y).id === 'openDoor' ? withTile(room, DOOR.x, DOOR.y, get('sealedDoor')) : room);

// The gloamlings and wisps the hero's arena lacks, a kind with none of the arena's own left, each on
// its own tile unless the hero or a creature is there
function brood(s) {
  const lacks = (b) => !s.enemies.some((e) => e.ash && e.id === b.id);
  const taken = (b) => (s.hero.x === b.x && s.hero.y === b.y) || s.enemies.some((e) => e.x === b.x && e.y === b.y);
  return [...s.enemies, ...arenaOwn().filter((b) => lacks(b) && !taken(b))];
}

export function withArenaToday(s) {
  const id = arenaPlace(s.seed), here = s.place === id, p = here ? s : s.elsewhere?.[id];
  if (!p?.room) return s;
  const enemies = p.enemies || [];
  let out;
  if (enemies.some((e) => e.id === 'lampeater')) {
    out = { ...p, room: sealed(p.room), enemies: here ? brood({ ...p, enemies }) : wholeAgain(id, s.seed, enemies) };
  } else {
    const items = p.items || [];
    if (s.leap || items.some((it) => it.id === 'leapFind')) return s;
    out = { ...p, items: [...items, { id: 'leapFind', ...LAMPEATER_AT }] };
  }
  return here ? { ...s, ...out } : { ...s, elsewhere: { ...s.elsewhere, [id]: out } };
}
