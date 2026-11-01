// § input: keys, taps, swipes and holds, turned into "step this way" (D-042),
// the L key, which switches the lantern (D-080), Space, which waits a turn (D-085),
// Enter, which picks the chosen menu line (D-177), Esc or P, which open and close the pause menu (D-187), M, which opens and closes the map (D-205), I, which opens and closes the bag (D-247),
// < and > or Page Up and Page Down, which turn it a floor (D-206), and Tab, which frames the next creature's plaque (CL2).
// Thin layer: it only reports a direction, a tap point in game pixels, the switch or a wait.
const KEYS = {
  arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down',
  arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right',
};
const SWIPE_PX = 24; // a finger moving this far (CSS px) is a swipe, not a tap
const HOLD_MS = 250; // a still finger held this long walks to the tile under it, as a tap does (D-408)

// onDir(dir, how) for keys and swipes, how being 'swipe' for a swipe (the Swipe switch, D-189, D-408); onPoint(x, y, held) for taps, and
// once for a finger or button held still, held then true, in game pixels; onHold([x, y]) as a held
// finger slides, and onHold(null) when it lifts (Tap: Step keeps stepping toward it, D-449);
// onLantern() for the L key; onWait() for Space, which repeats while held, like the arrows;
// onChoose() for Enter; onPause() for Esc and P; onMap() for M; onBag() for I; onFloor(way) for < and > or Page Up and Page Down; onTab() for Tab, which returns true when it used the key; onType(key) for digits and Backspace (the seed pad, D-191), R, T and B (the Seed Explorer, D-214), C (the bag's Make, D-309), X (the bag's Drop, D-546) and letters (the name pad, D-272; P, M, I, L and WASD act as usual when it is shut),
// which returns true when it used the key.
// guarded(x, y), in CSS px, true where a tap or held finger reports nothing: round the arrow pad (D-422); a swipe from there still steps.
// kind() the way of playing last used: 'touch', 'mouse' or 'keyboard' (How to play opened on it, D-193, till Basics came first, D-507).
export function createInput(area, canvas, { onDir, onPoint, onHold = () => {}, onLantern, onWait, onChoose, onPause, onMap, onBag, onFloor, onType, onTab, guarded = () => false }) {
  let kind = 'touch'; // phone first, until something is pressed
  addEventListener('keydown', (ev) => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    kind = 'keyboard';
    const key = ev.key.toLowerCase(), dir = KEYS[key];
    if ((/^[0-9a-z]$/.test(key) || key === 'backspace') && !ev.target.closest('input')) {
      if (onType(key)) { ev.preventDefault(); return; }
      if (/^[0-9rtb]$/.test(key) || key === 'backspace') return;
    }
    if (key === 'l' && !ev.repeat) { ev.preventDefault(); onLantern(); return; }
    if ((key === 'escape' || key === 'p') && !ev.repeat) { ev.preventDefault(); onPause(); return; }
    if (key === 'm' && !ev.repeat && !ev.target.closest('input')) { ev.preventDefault(); onMap(); return; }
    if (key === 'i' && !ev.repeat && !ev.target.closest('input')) { ev.preventDefault(); onBag(); return; }
    if (key === 'tab' && !ev.shiftKey && !ev.target.closest('button, input') && onTab()) { ev.preventDefault(); return; }
    const way = { '<': 'up', pageup: 'up', '>': 'down', pagedown: 'down' }[key];
    if (way && !ev.target.closest('input')) { ev.preventDefault(); onFloor(way); return; }
    if (key === 'enter' && !ev.repeat && !ev.target.closest('button, input')) { ev.preventDefault(); onChoose(); return; }
    if (key === ' ' && !ev.target.closest('button')) { ev.preventDefault(); onWait(); return; } // Space on a focused button presses it
    if (!dir || (key.startsWith('arrow') && ev.target.type === 'range')) return; // arrows on the dev oil slider move it
    ev.preventDefault();
    onDir(dir);
  });

  let press = null; // { id, x0, y0, x, y, swiped, held, timer }
  const gamePoint = (p) => {
    const r = canvas.getBoundingClientRect();
    return [(p.x - r.left) / r.width * canvas.width, (p.y - r.top) / r.height * canvas.height];
  };
  const end = () => { if (press) { clearTimeout(press.timer); if (press.held) onHold(null); } press = null; };

  area.addEventListener('pointerdown', (ev) => {
    kind = ev.pointerType === 'mouse' ? 'mouse' : 'touch';
    if (press || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
    area.setPointerCapture(ev.pointerId);
    press = { id: ev.pointerId, x0: ev.clientX, y0: ev.clientY, x: ev.clientX, y: ev.clientY, swiped: false, held: false, guard: guarded(ev.clientX, ev.clientY) };
    press.timer = setTimeout(() => { if (press && !press.swiped && !press.guard) { press.held = true; onPoint(...gamePoint(press), true); } }, HOLD_MS);
  });
  area.addEventListener('pointermove', (ev) => {
    if (!press || ev.pointerId !== press.id) return;
    press.x = ev.clientX; press.y = ev.clientY;
    if (press.held) { onHold(gamePoint(press)); return; }
    const dx = press.x - press.x0, dy = press.y - press.y0;
    if (press.swiped || press.held || Math.hypot(dx, dy) < SWIPE_PX) return;
    press.swiped = true;
    onDir(Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'), 'swipe');
  });
  area.addEventListener('pointerup', (ev) => {
    if (!press || ev.pointerId !== press.id) return;
    if (!press.swiped && !press.held && !press.guard) { onPoint(...gamePoint(press)); ghost = ev.pointerType !== 'mouse'; }
    end();
  });
  // § ghost click: after a finger's tap a phone sends a click where it lifted, which would
  // press a button the tap just brought back there (the bag's cross over the round map,
  // D-385). That one click is dropped; the next finger down clears it.
  let ghost = false;
  addEventListener('pointerdown', () => { ghost = false; }, true);
  addEventListener('click', (ev) => {
    if (!ghost) return;
    ghost = false;
    if (!area.contains(ev.target)) { ev.preventDefault(); ev.stopPropagation(); }
  }, true);
  area.addEventListener('pointercancel', end);

  return { kind: () => kind };
}
