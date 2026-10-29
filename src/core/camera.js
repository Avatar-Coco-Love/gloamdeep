// § camera: which part of the room the screen shows (D-172, D-195, D-381, D-441).
// Plain data, no drawing. The hero's tile sits in the middle of the screen,
// and the camera stops at most MARGIN past the room's edges, so the hero at a
// wall keeps a little room from the screen's edge (D-441). Along a side where
// the room and its margins fit the screen it never moves, and the room sits
// in the middle, its rock going on around it (D-381, D-403, D-443).
// Always on a whole pixel: a screen an odd number of pixels wide or tall would
// put it on half a pixel, and the light can't be worked there (D-434).
const TILE_SIZE = 16;
export const MARGIN = 24; // 1½ tiles (D-441)

// (hero's top-left in room pixels, room, screen width and height in pixels)
// → { x, y }, the room pixel at the screen's top-left corner (below 0 when
// the room is centred in a wider or taller screen, or the hero is near its edge)
export function cameraAt(hx, hy, room, w, h) {
  const along = (p, size, view) => (size + 2 * MARGIN <= view ? Math.floor((size - view) / 2)
    : Math.max(-MARGIN, Math.min(size + MARGIN - view, Math.floor(p + TILE_SIZE / 2 - view / 2))));
  return { x: along(hx, room.cols * TILE_SIZE, w), y: along(hy, room.rows * TILE_SIZE, h) };
}
