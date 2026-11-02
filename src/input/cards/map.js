// § map card (D-205, D-206, D-395), the map in play and the Seed Explorer's (D-214): its arrows,
// tap, close, page and the Explorer's R, T and B, moved word for word from screens.js at the
// eighth audit (D-578). Enter does nothing on it. Opening it, its floors, its words and its drags,
// pinches and wheel stay in screens.js (toggleMap, mapFloor, panMap, zoomMap), as render/map.js
// needs a page. `c` holds panMap, turnFloor, tapStairs, win and mapCardAt, and pressBar and
// closeExplorer from explorerscreens.js.
import { view } from '../../render/screen.js';

const PAN = 8; // game pixels an arrow key scrolls the map

export function mapCard(app, ui, show, c) {
  const { panMap, turnFloor, tapStairs, win, mapCardAt, pressBar, closeExplorer } = c;
  const pick = () => {}; // Enter: nothing (main.js doesn't send it here)
  const dir = (dir, how) => { if (how !== 'swipe') panMap(...{ up: [0, -PAN], down: [0, PAN], left: [-PAN, 0], right: [PAN, 0] }[dir]); };
  function tap(px, py, held) {
    if (held || ui.mapMoves().dragged()) return;
    const at = mapCardAt(px, py, view.w, view.h, app.screen === 'explore');
    if (at === 'up' || at === 'down') turnFloor(at);
    else if (at === 'out' || at === 'close') close(); // closes the map, or the Explorer to the title
    else if (at) pressBar(at);
    else if (py < win().y + win().h) tapStairs(px, py); // not through the Explorer's row
  }
  // Esc or P: the map back to play, the Explorer to the title
  const close = () => { if (app.screen === 'explore') closeExplorer(); else show('play'); };
  const page = (by) => turnFloor(by < 0 ? 'up' : 'down'); // Page Up and Page Down, < and >
  // In the Explorer, R reseeds, T types a seed and B goes back (D-214)
  function type(key) {
    if (app.screen !== 'explore') return false;
    const id = { r: 'reseed', t: 'type', b: 'back' }[key];
    if (id) pressBar(id);
    return !!id;
  }
  return { pick, dir, tap, close, page, type };
}
