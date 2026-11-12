// mountain rooms by day: walk in from the woods, stones, boulders, crab, map, edges
import { serve, open, shot, keys, line, readSave, inject, tap, readProfiles } from '../lib.mjs';
import { turn, stairs, go, st, brief, showMap, keyToward } from './h.mjs';
const kinds = process.argv[2] ? [process.argv[2]] : ['phone', 'pc'];
let s0 = stairs.goToPlace(turn.newJourney(4127, 'normal'), 'woods:2,1');
const s = await serve();
for (const kind of kinds) {
  let s1 = { ...s0, hero: { x: 10, y: 2 } };
  const { browser, page, errors } = await open(s.url, kind, await inject(s1));
  await keys(page, 'Enter Enter'); await page.waitForTimeout(800);
  await keys(page, 'ArrowUp ArrowUp'); await shot(page, `out/m1-${kind}-1-woods-top-edge.png`);
  await keys(page, 'ArrowUp'); await page.waitForTimeout(900);
  let c = await st(page);
  console.log(kind, 'entered:', brief(c), '|', await line(page));
  await shot(page, `out/m1-${kind}-2-mountain-in.png`);
  console.log(showMap(c)); console.log('enemies', JSON.stringify(c.enemies), 'items', JSON.stringify(c.items));
  // stones
  for (const it of c.items.filter((i) => i.id === 'stone')) {
    const crab0 = c.enemies.find((e) => e.id === 'skulkerCrab');
    c = await go(page, it.x, it.y, { opt: { avoid: crab0 ? [[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy]) => ({ x: crab0.x+dx, y: crab0.y+dy })) : [] } });
    console.log(kind, 'stone at', it.x, it.y, '→', brief(c), '|', await line(page));
  }
  await shot(page, `out/m1-${kind}-3-stone-taken.png`);
  // crab: from afar, then beside
  const crab = c.enemies.find((e) => e.id === 'skulkerCrab');
  console.log(kind, 'crab', JSON.stringify(crab));
  if (crab) {
    // go to 2 tiles away first
    c = await go(page, crab.x, crab.y, { beside: true, max: 0 });
    const p2 = [[2,0],[-2,0],[0,2],[0,-2]].map(([dx,dy]) => ({ x: crab.x+dx, y: crab.y+dy })).find((t) => c.room.map[t.y]?.[t.x] === '.' && c.room.map[(t.y+crab.y)/2][(t.x+crab.x)/2] === '.');
    if (p2) { c = await go(page, p2.x, p2.y, { opt: { avoid: [[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy]) => ({ x: crab.x+dx, y: crab.y+dy })) } }); await shot(page, `out/m1-${kind}-4-crab-2away.png`); console.log(kind, '2 away', brief(c), '|', await line(page)); }
    c = await go(page, crab.x, crab.y, { beside: true }); await page.waitForTimeout(400);
    console.log(kind, 'beside crab', brief(c), '|', await line(page), JSON.stringify(c.enemies));
    await shot(page, `out/m1-${kind}-5-crab-beside.png`);
    for (let i = 0; i < 4; i++) {
      c = await st(page); const cr = c.enemies.find((e) => e.id === 'skulkerCrab'); if (!cr) break;
      await keys(page, keyToward(c.hero, cr), 350); c = await st(page);
      console.log(kind, ' swing', i + 1, brief(c), '|', await line(page), JSON.stringify(c.enemies.filter((e) => e.id === 'skulkerCrab')), JSON.stringify(c.events?.map((e) => e.type)));
    }
    await shot(page, `out/m1-${kind}-6-crab-beaten.png`);
    console.log(kind, 'items after', JSON.stringify(c.items));
  }
  // boulder bump
  const O = []; c.room.map.forEach((l, y) => [...l].forEach((ch, x) => { if (ch === 'O') O.push({ x, y }); }));
  c = await go(page, O[0].x, O[0].y, { beside: true });
  await keys(page, keyToward(c.hero, O[0]), 350);
  console.log(kind, 'boulder bump:', await line(page), brief(await st(page)));
  await shot(page, `out/m1-${kind}-7-boulder.png`);
  // map
  if (kind === 'pc') await keys(page, 'm', 500); else { await page.tap('#map-button'); await page.waitForTimeout(500); }
  await shot(page, `out/m1-${kind}-8-map.png`);
  if (kind === 'pc') { await keys(page, 'm', 500); await shot(page, `out/m1-${kind}-9-map2.png`); await keys(page, 'Escape', 400); } else await tap(page, 357, 38);
  await shot(page, `out/m1-${kind}-10-after-map.png`);
  console.log(kind, 'bestiary', JSON.stringify((await readProfiles(page)).slots[0].bestiary), 'records', JSON.stringify((await readProfiles(page)).slots[0].records));
  console.log(kind, 'errors', errors);
  await browser.close();
}
s.close();
