# Content: finds, part 2

`CONTENT-FINDS.md` continued, under `CONTENT.md`'s rules: one row each,
with its numbers, where it turns up and the decisions behind it. The
draughts made at the mortar and the rare materials moved here from
`CONTENT-FINDS.md` word for word at 0.3.272, the fourteenth audit
(D-826), as that page neared 8 KB.

## Draughts made at the mortar (`src/core/items.js`)

| id | What it does | Stack | Grows back | Where, or how made | Decisions |
| --- | --- | --- | --- | --- | --- |
| `glowDraught` | Drink, in the bag, any time: the lantern's light reaches 1 tile farther for 60 turns, added to Wide Glow's; none while the lantern is empty | 5 | never | made at the mortar: 2 Duskstar, 1 Wisp Glass | D-786, D-791 |
| `slowburn` | Drink, in the bag, any time: a lit turn burns 6/7 of its oil for 60 turns, a full tank lasting 70, not 60, added to the Heart Charm's | 5 | never | made at the mortar: 2 Tick Shell, 1 Oilcap | D-792 |
| `mendingDraught` | Drink, in the bag, any time: a heart every 15 turns for 60 turns, 4 in all, never above full | 5 | never | made at the mortar: 2 Mimic Leaf, 1 Healing Herb | D-794 |
| `wardDraught` | Drink, in the bag, any time: ends poisoned, and for 60 turns a bite never poisons | 5 | never | made at the mortar: 2 Centipede Leg, 1 Healing Herb | D-795 |
| `spitproofDraught` | Drink, in the bag, any time: for 60 turns a spit grub's glob splashes off and hurts nothing | 5 | never | made at the mortar: 2 Grub Skin, 1 Healing Herb | D-802 |
| `shadeDraught` | Drink, in the bag, any time: for 60 turns a creature notices the hero only within 2 steps; one already after them keeps coming | 5 | never | made at the mortar: 2 Lurker Claw, 1 Duskstar | D-806 |

## Rare materials (`src/core/items.js`)

Moved from `CONTENT.md` word for word at 0.3.106, as that page passed 8 KB;
the Venom Sac's row since names the centipede too (D-654).

| id | What it does | Stack | Grows back | Where, or how made | Decisions |
| --- | --- | --- | --- | --- | --- |
| `venomSac` | for crafts later | 20 | never | a beaten scorpion or centipede, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `mimicHeart` | with 1 Copper Ore makes the Heart Charm | 20 | never | a beaten flask mimic, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `gloamEye` | for crafts later | 20 | never | a beaten gloamling, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `batFang` | 1 with 1 Copper Ore makes the Fang Charm (D-809) | 20 | never | a beaten bat, about 1 in 10 (1 in 5 with the charm), its own coin | D-537 |
| `moleClaw` | the Mole Claw Pick (D-810) | 20 | never | a beaten mole, about 1 in 10 (1 in 5 with the charm), its own coin | D-541 |
| `oilBladder` | for crafts later | 20 | never | a beaten oil tick, about 1 in 10 (1 in 5 with the charm), its own coin | D-606 |
| `glowGland` | with 1 Wood makes a Glow Lamp (D-808) | 20 | never | a beaten spit grub, about 1 in 10 (1 in 5 with the charm), its own coin | D-688 |
| `ember` | 1 more ember to spend in Growth, never in the bag; "An ember! Spend it in Growth." | 1 | never | on a vault's plinth, 1 vault in 4 (`vault.js`); a step takes one lying on a floor (the dev spawn) | D-896 |
