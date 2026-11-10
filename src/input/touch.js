// § touch: a tap or held finger in play, and the mouse over a mark (D-604, D-406, D-449).
// Split from main.js at the tenth audit, word for word but for `heldAt`, which sets
// main.js's lastHeldStep (the held pace's clock): `app` as there, and from main.js
// the frame, dev tools, the two layers' point helpers and tryStep.
import { TILE } from '../render/screen.js';
import { say } from '../core/lines.js';
import { BOONS } from '../core/registry.js';
import { tapsWalk, tapsStep } from '../core/settings.js';
import { toward, panelBeside } from '../core/turn.js';
import { wayTo, stopsWalk } from '../core/walk.js';
import { offEdge } from '../core/openings.js';
import { poisonLeft } from '../core/poison.js';
import { stiffLeft } from '../core/stiff.js';
import { glowLeft } from '../core/glow.js';
import { slowLeft } from '../core/slowburn.js';

export function createTouch(app, { frame, dev, toLayer, toRoom, tryStep, heldAt, ALERT_MS, openQuests }) {
  // § marks (D-604): a tap on a mark under the panel, or the mouse coming onto it, says the boon's
  // name and its card's line, or poisoned's turns left (D-654), or stiff's (D-759), or the Glow Draught's (D-791), or Slowburn's (D-792); no turn passes
  const tellMark = (picX, picY) => {
    const id = frame.markSpot(...toLayer([picX, picY])), b = BOONS[id];
    if (id === 'poisoned') app.state = say(app.state, 'poisonHeld', poisonLeft(app.state)); // its turns left (D-654)
    else if (id === 'stiff') app.state = say(app.state, 'stiffHeld', stiffLeft(app.state)); // its turns left (D-759)
    else if (id === 'glow') app.state = say(app.state, 'glowHeld', glowLeft(app.state)); // its turns left (D-791)
    else if (id === 'slowburn') app.state = say(app.state, 'slowHeld', slowLeft(app.state)); // its turns left (D-792)
    else if (b) app.state = say(app.state, 'boonHeld', `${b.name}: ${b.words}`);
  };
  let hovered = null; // the mark under the mouse, said once as it comes onto it
  const onHover = (picX, picY) => {
    const id = app.screen === 'play' ? frame.markSpot(...toLayer([picX, picY])) : null;
    if (id && id !== hovered) tellMark(picX, picY);
    hovered = id;
  };
  // § tap: a tap on the hero waits a turn (D-085); a tap on a tile beside them steps
  // there, which bites, mines or opens as a step does; one further off walks there
  // at once (D-406), or with Tap on Step steps once toward it, along the farther side (D-042, D-449).
  // A tap while walking only stops it, and no turn passes. With Tap off, only the tap on
  // the hero, a plaque or a bench beside works (D-408).
  // A tap past the room's edge, where nothing can be walked, does nothing (D-424).
  // held: the same from a finger held still, which walks anew instead of stopping (D-408),
  // or on Step keeps stepping toward the finger (holdStep below)
  // picX, picY: on the menus' picture, in its pixels
  const stepToward = (picX, picY, held = false) => {
    if (frame.goalSpot(...toLayer([picX, picY]))) { if (!held) openQuests(); return; } // the goal line opens the Journal at Quests (D-706)
    if (frame.markSpot(...toLayer([picX, picY]))) { if (!held) tellMark(picX, picY); return; } // a mark tells what it is; no turn passes (D-604)
    const spot = frame.plaqueSpot(...toLayer([picX, picY])); // a plaque frames its creature, or lets it go; no turn passes (CL2)
    if (spot) { if (!held) app.framed = app.framed === spot ? null : spot; return; }
    if (app.walk && !held) { app.walk = null; return; }
    const h = app.state.hero, [tx, ty] = tileAt(picX, picY);
    if (dev.place(tx, ty)) return; // a picked spawn takes the tap (D-049)
    if (held && tapsStep(app.settings)) { app.hold = [picX, picY]; heldAt(-Infinity); return; } // the first step at once
    if (offEdge(app.state.room, tx, ty)) return; // past the room's edge a tap does nothing (D-424)
    const dir = toward(h.x, h.y, tx, ty);
    if (!dir) { if (!held) tryStep('wait'); return; }
    // A click or tap on a bench or stash chest beside the hero opens its panel, whatever the switches (WB3, CH3)
    const bench = panelBeside(app.state, dir, true); // the bed too, which sleeps at night (D-488)
    if (bench && bench.x === tx && bench.y === ty) { if (!held) tryStep(dir); return; }
    if (tapsStep(app.settings)) { tryStep(dir); return; }
    if (!tapsWalk(app.settings)) return;
    if (Math.abs(tx - h.x) + Math.abs(ty - h.y) === 1) { app.walk = null; tryStep(dir); return; }
    app.walk = { tx, ty, way: wayTo(app.state, tx, ty) };
    heldAt(-Infinity); // the first step at once
  };
  // The room's tile under a point on the menus' picture
  function tileAt(picX, picY) {
    const [px, py] = toRoom([picX, picY]);
    return [Math.floor((px + app.cam.x) / TILE), Math.floor((py + app.cam.y) / TILE)];
  }
  // § hold to step (Tap: Step, D-449): a held finger steps the hero toward it at the held
  // pace (D-044), along the farther side; sliding steers, and on its tile, or past the
  // room's edge (D-424), the hero waits for it to move. Lifting stops at once.
  function holdStep() {
    const h = app.state.hero, [tx, ty] = tileAt(...app.hold), dir = toward(h.x, h.y, tx, ty);
    if (dir && !offEdge(app.state.room, tx, ty)) tryStep(dir);
  }
  // § walk on: one step on the way to the walk's tile, at the held pace (D-044). It ends
  // on the tile, at the end of remembered ground, or in another room; it stops by itself
  // for a bite, a find or a creature, with a "!" (D-407, D-408, D-410, the Stop walking switch).
  function walkOn() {
    const { walk } = app, before = app.state, [next] = walk.way = wayTo(before, walk.tx, walk.ty);
    if (!next) { app.walk = null; return; }
    tryStep(toward(before.hero.x, before.hero.y, next.x, next.y));
    const now = app.state;
    if (now === before || now.place !== before.place || (now.hero.x === walk.tx && now.hero.y === walk.ty)) app.walk = null;
    else if (stopsWalk(before, now, app.settings.stop)) { app.walk = null; app.alertUntil = performance.now() + ALERT_MS; }
    else walk.way = wayTo(now, walk.tx, walk.ty);
  }
  return { tellMark, onHover, stepToward, tileAt, holdStep, walkOn };
}
