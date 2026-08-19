export type Zone = {
  left: number;
  top: number;
  width: number;
  height: number;
};

// Non-uniform rects covering the lower ~72% of the frame (where furniture
// actually sits), split into a 3x3-ish grid of varied sizes so the reveal
// reads as pieces settling in rather than a uniform checkerboard wipe.
export const ROOM_ZONES: Zone[] = [
  { left: 0, top: 28, width: 34, height: 24 },
  { left: 34, top: 28, width: 33, height: 20 },
  { left: 67, top: 28, width: 33, height: 24 },
  { left: 0, top: 52, width: 30, height: 24 },
  { left: 30, top: 48, width: 40, height: 28 },
  { left: 70, top: 52, width: 30, height: 24 },
  { left: 0, top: 76, width: 45, height: 24 },
  { left: 45, top: 76, width: 55, height: 24 },
];

// Deterministic shuffle (mulberry32) so each scene gets a stable but
// different-looking random reveal order across renders.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const shuffledZoneOrder = (seed: number, count: number): number[] => {
  const rand = mulberry32(seed);
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};
