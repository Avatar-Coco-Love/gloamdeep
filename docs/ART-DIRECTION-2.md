# Art direction, part 2

`ART-DIRECTION.md` continued, under its rules: everything here is a
must-keep (D-009). The generated places' colours moved here from
`ART-DIRECTION.md` word for word at 0.3.74 (D-619), as that page neared
8 KB.

## Grey rock (generated depths, D-164)
Code: `src/render/rock.js`. Same view rules as above, but drawn per pixel
from a rock mask whose edges round off and wander in 3-pixel steps. A
floor tile's middle (pixels 4 to 11 both ways) and stairs stay clear.

| Role | Colour |
| --- | --- |
| Cap, grit, edge and face top line | `#1c1f28` `#252935` `#5a6478` |
| Face rock chunks, chunk tops, seams, foot | `#4b5468` `#555e73` `#434b5d`, `#6a7489` `#5f697e`, `#262a35`, `#14161d` |
| Floor, light, dark, pebble | `#363b48` `#404656` `#282c36` `#4a5163` |
| Puddle, shine | `#262d3d` `#3a4660` |

## Earth (burrows, depth 6 and down, D-165)
Same code and rules as grey rock, with its own colours. Wall faces are
uneven bands of rock with dark lines between; half the floor tiles have
a small stone.

| Role | Colour |
| --- | --- |
| Cap, grit, edge and face top line | `#1e1814` `#261e18` `#6e5a48` |
| Face bands, band lines, foot | `#5a4a3e` `#6a584a` `#4e4036`, `#3a2f26` `#2a221c`, `#16110d` |
| Floor, light, dark, pebble | `#3d3229` `#47392e` `#2e251e` `#544435` |
| Stone, its lit top | `#544435` `#6a5848` |

## Dungeon (depth 8 and down, D-228, D-229)
Code: `src/render/tiles.js` (`COLD`). The crypt's bricks and slabs, every
colour's red, green and blue times 0.72, 0.78 and 0.95: deeper and bluer.
The stairs keep the crypt's colours; the crypt's top rooms don't change.

## Stairs in grey rock and earth (D-167)
Code: `src/render/tiles.js` (drawSteps). The crypt's five steps and
violet lips, with pale stone steps (light to dark, floor side first;
reversed for stairs up), the opening around them the ground's floor
colour times 0.78, 0.66, 0.55, 0.45, 0.36 by step, inside a 1-pixel rim.

| Look | Steps | Rim |
| --- | --- | --- |
| Grey rock | `#9aa3b6` `#7a8396` `#5a6276` `#3b4152` `#23262f` | `#14161d` |
| Earth | `#b09a7e` `#8e7a62` `#6c5b48` `#4a3d30` `#2a221b` | `#16110d` |

## Rock on the surface (D-738, D-739)
Code: `src/render/outcrop.js`. The grey rock's mask and face (rock.js),
rounded the same way but fuller (cut at 0.32, wobble 0.6, smooth, lone
pixels cleaned off, D-747; the cave's 0.5 and 0.55, in 3-pixel steps), and lit by day: cap `#4a5266`, grit `#555e73`, edge
`#7a8499`; the face and its foot `#14161d` as the cave's. Trees stand in
front. Past a mountain room's edge it goes on.

## The cave mouth's looks (D-744)
Code: `src/render/mouth.js`. The seed picks one. The small arch: earth
going black, an arch on the top edge. The craggy cave: on the top edge a
wide rough opening, its lip `#7a8499` lit left, `#5f697e` right, black
`#0c0b12` with an overhang shadow `#07060a`, the earth floor going in
`#3a2f26` `#2a221c` `#16110d`, rock teeth `#4b5468` tipped `#6a7489`; on
another edge the rock roofs the outer part, the ground going black under it.
