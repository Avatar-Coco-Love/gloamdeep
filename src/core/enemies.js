// § enemies: every enemy kind, keyed by id (D-104). Enemies stand on floor
// tiles, one per tile, in `state.enemies`. registry.js gathers this table.
// An enemy in the state is { id, x, y }, plus `health` once it has been hit,
// `chasing` once it has noticed the hero (D-127, D-157), `flees`, the turns
// of fleeing it has left (D-301), `asleep` for one in disguise or one that `sleeps` (D-692), `stirs` on the
// turn it wakes and `awake`, the turns it has left to chase (D-368), and `facing` ('left'
// or 'right', drawn facing right until it walks, D-158), and `colour`, the set it
// wears, for a kind with `colours` (D-373). `ways` names how it
// acts, from behaviours.js (D-269); `acts` says it in words, on its Bestiary page once one
// is beaten (D-352, D-631).
import { MUSHROOM_TONE } from './items.js';

export const ENEMIES = {
  // Two lantern hits kill it (D-109, D-110); it bites for 1 when next to the hero (D-114)
  // and chases them once it notices them (D-126). Once hurt, it may flee (D-292, D-301).
  // Its bite sounds of teeth (D-259). Beaten, it `drops` a Rat Tail now and then (D-453, D-454).
  // From depth 3 some come in packs of three (D-727, pack.js); alone it acts as before.
  rat: { id: 'rat', kind: 'enemy', name: 'Rat', acts: "Comes at you once it sees you in the light. Hurt, it often turns and runs. Deeper down, rats run in packs of three that surround you.", fights: "Wait for it to step beside you, and you strike first. A knife ends it in one blow. A pack stands its ground: keep a wall at your back.", health: 2, bite: 1, drops: 'ratTail', ways: ['chases', 'fleesHurt', 'pack'], hurt: 'ratHurt', stands: 'ratStands', packSay: 'ratPack', die: 'ratDie', bites: 'ratBite', sound: 'teeth' },
  // It chases, and shuns light (D-240). Beaten, it may drop a Gloam Wisp (D-475),
  // and now and then its `rare` Gloam Eye (D-476).
  gloamling: { id: 'gloamling', kind: 'enemy', name: 'Gloamling', acts: "Hunts you from the dark, but will not step into the light. When the light finds it, it backs away.", fights: "It can't bite you from the light, so keep your lantern full. Back it into a corner and strike while your flame holds it.", health: 2, bite: 1, drops: 'gloamWisp', rare: 'gloamEye', ways: ['chases', 'shunsLight'], hurt: 'gloamlingHurt', die: 'gloamlingDie', bites: 'gloamlingBite' , sound: 'gloam' },
  // It seeks light (D-351); one hit of anything kills it (D-356). It may drop Moth Dust (D-475).
  lampmoth: { id: 'lampmoth', kind: 'enemy', flies: true, name: 'Lampmoth', acts: "Flies straight for your lantern's flame, or the nearest lit torch when your lantern is out.", fights: "One blow of anything kills it. Let it fly to you and strike first.", health: 1, bite: 1, drops: 'mothDust', ways: ['seeksLight'], die: 'lampmothDie', bites: 'lampmothBite' , sound: 'flutter' },
  // An oil flask with eyes and teeth. It starts asleep, drawn as the flask it
  // `looksLike` and hidden from the creature list; a bump wakes it, with no
  // harm, and it chases for `awakeTurns` turns, then settles back down where
  // it stands (D-366, D-368). Its bite clinks of glass (D-367). Hurt, it cracks (D-369).
  // Beaten, it may drop Mimic Glass (D-475), and now and then a Mimic Heart (D-476).
  flaskMimic: { id: 'flaskMimic', kind: 'enemy', name: 'Flask mimic', acts: "Sleeps looking like a flask of oil. Bump it and it wakes and chases you, then settles down again.", fights: "The bump that wakes it gives you a free turn, so strike at once. Not ready? Walk off and it settles back to sleep.", health: 3, bite: 1, drops: 'mimicGlass', rare: 'mimicHeart', ways: ['chases'], looksLike: 'flask', awakeTurns: 6, hurt: 'flaskMimicHurt', wakes: 'flaskMimicWakes', settles: 'flaskMimicSettles', die: 'flaskMimicDie', bites: 'flaskMimicBite', sound: 'glass' },
  // It chases (D-370); one hit of anything kills it, and its sting takes 2 hearts.
  // Its sting clicks of claws (D-370). Each wears one of its `colours` sets (D-373).
  // Beaten, it may drop a Stinger, always in Sand (D-475), and now and then a Venom Sac (D-476).
  // It shuns light only, so it never comes for the hero: it waits in the dark, backs out of
  // light, and bites only from the dark (D-535). Its bite hisses and clicks (D-536).
  // Beaten, it may drop Spider Silk (D-535); a creature of depth 2, it has no rare one (D-453).
  caveSpider: { id: 'caveSpider', kind: 'enemy', name: 'Cave spider', acts: "Waits in the dark and never comes to you. It backs out of the light and bites only from the shadows.", fights: "It can't bite while your light is on it. Corner it against a wall and strike, before your oil runs low.", health: 2, bite: 1, drops: 'spiderSilk', ways: ['shunsLight'], hurt: 'caveSpiderHurt', die: 'caveSpiderDie', bites: 'caveSpiderBite', sound: 'hiss' },
  // It strikes (D-729): its tail goes up with its `raises` line, then stings the tiles ahead, its
  // `misses` line when the hero has stepped aside; a creature on those tiles is stung too (sting.js, D-768).
  scorpion: { id: 'scorpion', kind: 'enemy', name: 'Scorpion', acts: "Comes at you once it sees you in the light. In line with you, up to two tiles away, it raises its tail for a turn, then strikes both tiles ahead. Its sting takes two hearts, and hurts any creature in its way too. Its shell comes in many colours.", fights: "When its tail goes up, step out of its line, then strike while it rests. One blow of anything kills it.", health: 1, bite: 2, drops: 'stinger', rare: 'venomSac', ways: ['strikes'], colours: 5, die: 'scorpionDie', bites: 'scorpionBite', raises: 'scorpionRaises', misses: 'scorpionMisses', sound: 'sting' },
  // It seeks light, as the lampmoth does, and once hurt it may flee, as the rat does (D-365, D-537).
  // Its bite squeaks and flaps (D-538). Beaten, it may drop a Bat Wing, and now and then a Bat Fang (D-537).
  bat: { id: 'bat', kind: 'enemy', flies: true, name: 'Bat', acts: "Flies to the light, as a lampmoth does. Hurt, it often flutters away.", fights: "Let it fly to you, then strike first. A knife ends it in one blow, before it can flutter off.", health: 2, bite: 1, drops: 'batWing', rare: 'batFang', ways: ['seeksLight', 'fleesHurt'], hurt: 'batHurt', stands: 'batStands', die: 'batDie', bites: 'batBite', sound: 'squeak' },
  // It chases and never flees, a tough one for the deep floors, 4 hearts (D-365, D-541). Its
  // bite snuffles and scrapes (D-542). Beaten, it may drop Mole Fur, and now and then a Mole Claw (D-541).
  // It burrows (D-726): noticing the hero, it digs down with its `digs` line and comes under the
  // earth, `surfaces` beside them; a bump on its mound says its `underSay`, free. It notices them
  // only within its `sight`, 5 steps, by day or night (D-858).
  mole: { id: 'mole', kind: 'enemy', name: 'Mole', acts: "Tough, and it never runs. Once it sees you in the light, within 5 steps, it digs down and tunnels to you, a mound of earth, then comes up beside you.", fights: "You can't hit it under the earth. Watch the mound: when the mole comes up, strike first. Four lantern swings or two knife blows.", health: 4, bite: 1, sight: 5, drops: 'moleFur', rare: 'moleClaw', ways: ['burrows'], digs: 'moleDigs', surfaces: 'moleSurfaces', underSay: 'moleUnder', hurt: 'moleHurt', die: 'moleDie', bites: 'moleBite', sound: 'snuffle' },
  // A heartcap that bites (D-365, D-543): no ways, so it never moves or notices, and bites
  // whoever stands beside it. Drawn `shutAs` a heartcap, in a heartcap's `tone`, until the
  // hero stands beside it; then its eyes and teeth show. Its bite is a wet snap (D-544).
  // Beaten, it may drop a Snapcap Gill; a creature of depth 2, it has no rare one (D-453).
  snapcap: { id: 'snapcap', kind: 'enemy', name: 'Snapcap', acts: "Looks like a heartcap until you stand beside it. It never moves, but it bites anyone next to it.", fights: "Stepping beside it costs a bite, so come with a knife: it splits in one blow.", health: 2, bite: 1, drops: 'snapcapGill', ways: [], shutAs: 'heartcap', tone: MUSHROOM_TONE, hurt: 'snapcapHurt', die: 'snapcapDie', bites: 'snapcapBite', sound: 'snap' },
  // A herb with eyes and teeth (D-549): asleep it looks just like the herb it `looksLike`, as
  // the flask mimic does (D-368); a bump, or a step to heal, wakes it with no harm, and it chases
  // for `awakeTurns` turns. Its bite rustles, then snaps (D-550). Beaten, it may drop a Mimic Leaf;
  // its rare one waits on the owner (Q-077).
  herbMimic: { id: 'herbMimic', kind: 'enemy', name: 'Herb mimic', acts: "Sleeps looking like a herb. Bump it and it wakes and chases you, then settles down again.", fights: "The bump that wakes it gives you a free turn, so strike at once. A knife ends it in one blow.", health: 2, bite: 1, drops: 'mimicLeaf', ways: ['chases'], looksLike: 'herb', awakeTurns: 6, hurt: 'herbMimicHurt', wakes: 'herbMimicWakes', settles: 'herbMimicSettles', die: 'herbMimicDie', bites: 'herbMimicBite', sound: 'rustle' },
  // A rat with nothing left but bone (D-549, D-551): it chases and never flees, as the mole does,
  // a tougher rat for the middle depths. Its bite rattles, then snaps (D-551). Beaten, it falls into a
  // pile of bones that stands up whole `rises` turns later, unless the hero steps onto it to scatter
  // it; only then may it drop a Rat Bone (bones.js, D-731). Its rare one waits on the owner (Q-061).
  boneRat: { id: 'boneRat', kind: 'enemy', name: 'Bone rat', acts: "A rat with nothing left to fear. It chases you and never runs. Beaten, it falls into a pile of bones and stands up again three turns later.", fights: "Wait for it to step beside you; a knife needs two blows. Then step onto its bones to scatter them before it stands.", health: 3, bite: 1, drops: 'ratBone', ways: ['chases'], rises: 3, falls: 'boneRatFalls', stirsSay: 'boneRatStirs', scatters: 'boneRatScatters', hurt: 'boneRatHurt', die: 'boneRatDie', bites: 'boneRatBite', sound: 'rattle' },
  // A tick swollen with the oil it drank (D-606, the first light way, Q-076): it chases, and
  // beside the hero it `drinks` 5% of the lantern's oil instead of biting, with a wet sip; with
  // the lantern empty it bites for 1, of teeth. Beaten, it may drop a Tick Shell, and now and
  // then an Oil Bladder.
  oilTick: { id: 'oilTick', kind: 'enemy', name: 'Oil tick', acts: "Chases you in the light. Beside you it drinks your lantern's oil, and it bites once the lantern is dry.", fights: "Every turn beside you costs oil, so be quick: let it come, strike first, and a knife ends it in one blow.", health: 2, bite: 1, drinks: 0.05, drops: 'tickShell', rare: 'oilBladder', ways: ['chases'], hurt: 'oilTickHurt', die: 'oilTickDie', bites: 'oilTickBite', drinksSay: 'oilTickDrinks', sound: 'teeth', sips: 'sip' },
  // A small false light, a cold flame with pink eyes (D-649, the way that lures): when the hero
  // comes within 3 steps it drifts a tile away, toward the nearest other creature in the room,
  // or just away with none. It never bites (its way's `bites: false`). Its own faint glow `glows`:
  // it is drawn even out in the dark, though it lights no tiles. One hit puts it out. It drifts,
  // a flyer held above its shadow (D-563). Beaten, it may drop Wisp Glass; no rare one for now.
  lureWisp: { id: 'lureWisp', kind: 'enemy', flies: true, glows: true, name: 'Lure wisp', acts: "A cold light that drifts away as you come near, always toward another creature. It never bites.", fights: "Following it leads you into trouble. One blow of anything puts it out, so catch it against a wall.", health: 1, bite: 0, drops: 'wispGlass', ways: ['lures'], die: 'lureWispDie' },
  // A centipede, side on and facing right (D-654, the first debuff, D-652): rust red with pale
  // legs and green fangs. It chases, and its bite `poisons`: the hero is poisoned (poison.js).
  // Its bite is of teeth. Beaten, it may drop a Centipede Leg, and now and then a Venom Sac.
  centipede: { id: 'centipede', kind: 'enemy', name: 'Centipede', acts: "Chases you once it sees you in the light. Its bite leaves you poisoned, which takes a heart every few turns.", fights: "Strike first as it comes. A knife ends it in one blow; the lantern needs two. Poison can take your last heart: an Antidote ends it.", health: 2, bite: 1, poisons: true, drops: 'centipedeLeg', rare: 'venomSac', ways: ['chases'], hurt: 'centipedeHurt', die: 'centipedeDie', bites: 'centipedeBite', sound: 'teeth' },
  // A glowworm, side on and facing right (D-659, look A of D-688): a plump pale grub, its tail
  // glowing venom green, drawn over the dark as the lure wisp is (`glows`). It never moves or
  // bites; its way `spits` (spit.js): seeing the lit lantern down a clear row or column, up to 5
  // tiles, it spits a glob that flies a tile a turn and hits for its `bite`, then rests 2 turns.
  // Beaten, it may drop a Grub Skin, and now and then a Glow Gland.
  spitGrub: { id: 'spitGrub', kind: 'enemy', glows: true, name: 'Spit grub', acts: "Never moves. When it sees your lit lantern down a clear row or column, it spits a glowing glob that flies a tile a turn, then rests.", fights: "Step out of the glob's line, hide behind rock, or put your lantern out. Rush it while it rests: one blow ends it.", health: 1, bite: 1, drops: 'grubSkin', rare: 'glowGland', ways: ['spits'], die: 'spitGrubDie', spitsSay: 'spitGrubSpits', hitSay: 'spitGrubHit' },
  // An old stone guard made by Underhearth's people to guard their things (D-692), look A4.
  // It `sleeps` as itself, a statue, drawn with its eyes dull, not in disguise: a bump wakes it,
  // with no harm, and it chases for `awakeTurns` turns, then stands still again, the flask
  // mimic's way (D-368). Tough, as the mole is. It guards the locket (relic.js); no drop yet.
  warden: { id: 'warden', kind: 'enemy', name: 'Warden', acts: "Stands still as a statue beside a treasure of the old city. Bump it and it wakes and chases you, then stands still again.", fights: "The bump that wakes it gives you a free turn, so strike at once. Four lantern swings or two knife blows: start with your hearts full.", health: 4, bite: 1, ways: ['chases'], sleeps: true, awakeTurns: 6, hurt: 'wardenHurt', wakes: 'wardenWakes', settles: 'wardenSettles', die: 'wardenDie', bites: 'wardenBite' , sound: 'grind' },
  // A bunny, side on and facing right (D-784), soft brown with a pale tail: the first creature that
  // means no harm. It never bites (its way's `bites: false`); `shy`, it hops away once the hero is
  // within 3 steps. Out by day in the home room and each woods room round home (nightfall.js), never
  // underground. One hit beats it; it may drop Bunny Fur, and has no rare one.
  bunny: { id: 'bunny', kind: 'enemy', name: 'Bunny', acts: "A shy bunny of the woods, out by day. It never bites, and hops away once you come near.", fights: "It means no harm. Corner it against a wall or a tree and one blow of anything beats it.", health: 1, bite: 0, drops: 'bunnyFur', ways: ['shy'], die: 'bunnyDie' },
  // A skulker crab (D-796), the first brand-new creature of the mountain rooms: a crab under a
  // stony grey shell, rust legs and claws, pink eyes on stalks. The snapcap's way (D-543): no ways,
  // so it never moves and bites whoever stands beside it, drawn `shutAs` a loose stone until the hero
  // is beside it. Out by day, one in each mountain room (nightfall.js), never underground.
  skulkerCrab: { id: 'skulkerCrab', kind: 'enemy', name: 'Skulker crab', acts: "Looks like a loose stone in the mountain rooms until you stand beside it. It never moves, but it pinches anyone next to it.", fights: "Stepping beside it costs a pinch, so come with a knife: it cracks in one blow.", health: 2, bite: 1, drops: 'crabShell', ways: [], shutAs: 'stone', hurt: 'skulkerCrabHurt', die: 'skulkerCrabDie', bites: 'skulkerCrabBite' },
  // A rim lurker (D-797), the mountain rooms' first night creature: look B of its mock-up, a hunched
  // shade of dusky violet with long arms and pale claws, pink eyes. It lurks: it waits where it came out,
  // by the room's rock, till the hero comes within 3 steps, then chases and never runs. Out by night,
  // one in each mountain room (nightfall.js), never underground.
  rimLurker: { id: 'rimLurker', kind: 'enemy', name: 'Rim lurker', acts: "Waits in the dark by the mountain rocks. Come within three steps of it, lit or not, and it chases you and never runs.", fights: "Its claws take two hearts, so strike first: wait for it to step beside you. Three lantern swings, or two knife blows.", health: 3, bite: 2, drops: 'lurkerClaw', ways: ['lurks'], hurt: 'rimLurkerHurt', die: 'rimLurkerDie', bites: 'rimLurkerBite' },
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
// A creature without a `sound` bites silently. The gloamling's is a low breath and a snap, the lampmoth's a papery flutter, the warden's stone grinding (D-833).
// The flask mimic's bite is of glass (D-367), the scorpion's a sting (D-370), the cave spider's a hiss (D-536), the bat's a squeak (D-538), the mole's a snuffle (D-542), the snapcap's a snap (D-544), the herb mimic's a rustle (D-550), the bone rat's a rattle (D-551). The oil tick's drink is a sip (drinkSound, D-606).
export function biteSound(events) {
  const kinds = events.filter((e) => e.type === 'bite').map((e) => ENEMIES[e.id]);
  return (events.some((e) => e.type === 'fall') ? kinds.find((k) => k?.sound) : kinds[0])?.sound;
}
// § drink sound: (events) → the sound of this turn's drink, or undefined: the first drinker's `sips` (D-606)
export const drinkSound = (events) => ENEMIES[events.find((e) => e.type === 'drink')?.id]?.sips;
