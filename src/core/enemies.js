// § enemies: every enemy kind, keyed by id (D-104). Enemies stand on floor
// tiles, one per tile, in `state.enemies`. registry.js gathers this table.
// An enemy in the state is { id, x, y }, plus `health` once it has been hit,
// `chasing` once it has noticed the hero (D-127, D-157), `flees`, the turns
// of fleeing it has left (D-301), `asleep` for one in disguise, `stirs` on the
// turn it wakes and `awake`, the turns it has left to chase (D-368), and `facing` ('left'
// or 'right', drawn facing right until it walks, D-158), and `colour`, the set it
// wears, for a kind with `colours` (D-373). `ways` names how it
// acts, from behaviours.js (D-269).
export const ENEMIES = {
  // Two lantern hits kill it (D-109, D-110); it bites for 1 when next to the hero (D-114)
  // and chases them once it notices them (D-126). Once hurt, it may flee (D-292, D-301).
  // Its bite sounds of teeth (D-259). Beaten, it `drops` a Rat Tail now and then (D-453, D-454).
  rat: { id: 'rat', kind: 'enemy', name: 'Rat', health: 2, bite: 1, drops: 'ratTail', ways: ['chases', 'fleesHurt'], hurt: 'ratHurt', stands: 'ratStands', die: 'ratDie', bites: 'ratBite', sound: 'teeth' },
  // It chases, and shuns light (D-240). Beaten, it may drop a Gloam Wisp (D-475),
  // and now and then its `rare` Gloam Eye (D-476).
  gloamling: { id: 'gloamling', kind: 'enemy', name: 'Gloamling', health: 2, bite: 1, drops: 'gloamWisp', rare: 'gloamEye', ways: ['chases', 'shunsLight'], hurt: 'gloamlingHurt', die: 'gloamlingDie', bites: 'gloamlingBite' },
  // It seeks light (D-351); one hit of anything kills it (D-356). It may drop Moth Dust (D-475).
  lampmoth: { id: 'lampmoth', kind: 'enemy', name: 'Lampmoth', health: 1, bite: 1, drops: 'mothDust', ways: ['seeksLight'], die: 'lampmothDie', bites: 'lampmothBite' },
  // An oil flask with eyes and teeth. It starts asleep, drawn as the flask it
  // `looksLike` and hidden from the creature list; a bump wakes it, with no
  // harm, and it chases for `awakeTurns` turns, then settles back down where
  // it stands (D-366, D-368). Its bite clinks of glass (D-367). Hurt, it cracks (D-369).
  // Beaten, it may drop Mimic Glass (D-475), and now and then a Mimic Heart (D-476).
  flaskMimic: { id: 'flaskMimic', kind: 'enemy', name: 'Flask mimic', health: 3, bite: 1, drops: 'mimicGlass', rare: 'mimicHeart', ways: ['chases'], looksLike: 'flask', awakeTurns: 6, hurt: 'flaskMimicHurt', wakes: 'flaskMimicWakes', settles: 'flaskMimicSettles', die: 'flaskMimicDie', bites: 'flaskMimicBite', sound: 'glass' },
  // It chases (D-370); one hit of anything kills it, and its sting takes 2 hearts.
  // Its sting clicks of claws (D-370). Each wears one of its `colours` sets (D-373).
  // Beaten, it may drop a Stinger, always in Sand (D-475), and now and then a Venom Sac (D-476).
  // It shuns light only, so it never comes for the hero: it waits in the dark, backs out of
  // light, and bites only from the dark (D-535). Its bite hisses and clicks (D-536).
  // Beaten, it may drop Spider Silk (D-535); a creature of depth 2, it has no rare one (D-453).
  caveSpider: { id: 'caveSpider', kind: 'enemy', name: 'Cave spider', health: 2, bite: 1, drops: 'spiderSilk', ways: ['shunsLight'], hurt: 'caveSpiderHurt', die: 'caveSpiderDie', bites: 'caveSpiderBite', sound: 'hiss' },
  scorpion: { id: 'scorpion', kind: 'enemy', name: 'Scorpion', health: 1, bite: 2, drops: 'stinger', rare: 'venomSac', ways: ['chases'], colours: 5, die: 'scorpionDie', bites: 'scorpionBite', sound: 'sting' },
};

// § drops: how often a beaten creature leaves its common material, and its rare one,
// each on a coin of its own (D-453, D-476)
export const DROP_CHANCE = 0.5;
export const RARE_CHANCE = 0.1;

// § lookups: the enemy on tile x, y, or undefined
export const enemyAt = (state, x, y) => state.enemies.find((e) => e.x === x && e.y === y);

// § hit: (enemies, foe, entry, damage) → the enemies after the hit. A foe
// whose health reaches 0 is gone (D-110). One that lives has noticed the
// hero, even in the dark (D-157).
export function hitEnemy(enemies, foe, entry, damage) {
  const health = (foe.health ?? entry.health) - damage;
  if (health <= 0) return enemies.filter((e) => e !== foe);
  return enemies.map((e) => (e === foe ? { ...foe, health, chasing: true } : e));
}

// § bites: (enemies, hero) → the enemies next to the hero, four ways (D-042),
// who bite on their turn. They stay put while they bite (D-114, D-128).
export const biters = (enemies, hero) => enemies.filter((e) => Math.abs(e.x - hero.x) + Math.abs(e.y - hero.y) === 1);

// § bite sound: (events) → the sound of this turn's bite, or undefined (D-259), read
// from the turn's `bite` events (events.js, D-267): the first creature's to bite,
// whose bite line shows, or after a fall, the first that has a sound.
// A creature without a `sound` bites silently, for now the gloamling and the lampmoth.
// The flask mimic's bite is of glass (D-367), the scorpion's a sting (D-370), the cave spider's a hiss (D-536).
export function biteSound(events) {
  const kinds = events.filter((e) => e.type === 'bite').map((e) => ENEMIES[e.id]);
  return (events.some((e) => e.type === 'fall') ? kinds.find((k) => k?.sound) : kinds[0])?.sound;
}
