// lamppost by day and night; rim lurker by night: node m2.mjs <kind> [lit]
import { serve, open, shot, keys, line, inject, tap } from '../lib.mjs';
import { turn, stairs, st, brief, go, keyToward, showMap } from './h.mjs';
const [kind, lit = 'unlit'] = process.argv.slice(2), tag = `m2-${kind}-${lit}`;
const s = await serve();
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
// A: lamppost by day
{
  let j = stairs.goToPlace(turn.newJourney(4127, 'normal'), 'woods:1,0');
  j = { ...j, hero: { x: 11, y: 15 }, enemies: [], turn: 100 };
  const { browser, page, errors } = await open(s.url, kind, await inject(j));
  await keys(page, 'Enter Enter'); await page.waitForTimeout(700);
  for (let i = 0; i < 4; i++) { await keys(page, 'ArrowUp', 450); const c = await st(page); console.log(tag, 'lamppost bump', i + 1, '| turn', c.turn, '| line:', await line(page)); if (i < 2) await shot(page, `out/${tag}-lamp-day-${i + 1}.png`); }
  await keys(page, 'ArrowLeft ArrowUp'); await keys(page, 'ArrowRight', 450); console.log(tag, 'bump from the left: turn', (await st(page)).turn, await line(page), JSON.stringify((await st(page)).hero));
  console.log(tag, 'errors', JSON.stringify(errors).slice(0, 200));
  await browser.close();
}
// B: night, lamppost and lurker
{
  let j = stairs.goToPlace(turn.newJourney(4127, 'normal'), 'woods:1,0');
  j = { ...j, hero: { x: 11, y: 15 }, enemies: [], turn: 205, lit: lit === 'lit', held: null };
  const { browser, page, errors } = await open(s.url, kind, await inject(j));
  await keys(page, 'Enter Enter'); await page.waitForTimeout(700);
  await keys(page, 'ArrowUp', 450); console.log(tag, 'night lamppost bump | line:', await line(page));
  await shot(page, `out/${tag}-night-lamp.png`);
  await keys(page, 'Space', 400); let c = await st(page); console.log(tag, 'night enemies', JSON.stringify(c.enemies), brief(c));
  const L = c.enemies.find((e) => e.id === 'rimLurker');
  if (L) {
    console.log(showMap(c));
    // approach step by step, log when it starts to chase
    for (let i = 0; i < 40; i++) {
      c = await st(page); const l = c.enemies.find((e) => e.id === 'rimLurker'); if (!l) break;
      const d = dist(c.hero, l);
      if (l.chasing || d <= 1) { console.log(tag, ' turn', c.turn, 'dist', d, 'lurker', JSON.stringify(l), 'hp', c.health, '|', await line(page)); if (!globalThis.shotDone) { globalThis.shotDone = 1; await shot(page, `out/${tag}-lurker-notices.png`); } }
      if (d === 1) break;
      if (l.chasing) { await keys(page, 'Space', 300); continue; } // strike first: wait for it
      const before = c.turn; c = await go(page, l.x, l.y, { beside: true, max: 1 });
      const l2 = c.enemies.find((e) => e.id === 'rimLurker');
      console.log(tag, ' step: turn', c.turn, 'hero', c.hero.x + ',' + c.hero.y, 'dist', l2 ? dist(c.hero, l2) : '-', 'chasing', !!l2?.chasing);
    }
    await shot(page, `out/${tag}-lurker-beside.png`);
    for (let i = 0; i < 5; i++) {
      c = await st(page); const l = c.enemies.find((e) => e.id === 'rimLurker'); if (!l || c.fell) break;
      if (dist(c.hero, l) !== 1) { await keys(page, 'Space', 300); continue; }
      await keys(page, keyToward(c.hero, l), 400); c = await st(page);
      console.log(tag, ' swing', i + 1, 'hp', c.health, 'lurker', JSON.stringify(c.enemies.find((e) => e.id === 'rimLurker')), '|', await line(page), JSON.stringify(c.events?.map((e) => e.type + (e.hurt ?? ''))));
    }
    c = await st(page); console.log(tag, 'after fight', brief(c), 'items', JSON.stringify(c.items.filter((i) => i.id === 'lurkerClaw')), 'place', c.place);
    await shot(page, `out/${tag}-lurker-after.png`);
  }
  console.log(tag, 'errors', JSON.stringify(errors).slice(0, 200));
  await browser.close();
}
s.close();
