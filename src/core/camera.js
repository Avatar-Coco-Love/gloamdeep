// § camera: which part of the room the screen shows (D-172, D-195, D-381).
// Plain data, no drawing. The hero's tile sits in the middle of the screen,
// and the camera stops at the room's edges, so nothing beyond the room shows.
// Along a side where the room is no bigger than the screen it never moves,
// and the room sits in the middle, its rock going on around it (D-381, D-403).
const TILE_SIZE = 16;

// (hero's top-left in room pixels, room, screen width and height in pixels)
// → { x, y }, the room pixel at the screen's top-left corner (below 0 when
// the room is centred in a wider or taller screen)
export function cameraAt(hx, hy, room, w, h) {
  const along = (p, size, view) => (size <= view ? Math.floor((size - view) / 2)
    : Math.max(0, Math.min(size - view, p + TILE_SIZE / 2 - view / 2)));
  return { x: along(hx, room.cols * TILE_SIZE, w), y: along(hy, room.rows * TILE_SIZE, h) };
}
