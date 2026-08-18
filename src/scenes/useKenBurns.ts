import { interpolate, useCurrentFrame } from "remotion";

const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/**
 * Level horizontal pan + slow zoom (no vertical drift, no rotation), so it
 * reads as a stabilized gimbal move. Returns a transform string shared by
 * every layer in a scene so the before/after images stay pixel-aligned.
 */
export const useKenBurns = (
  durationInFrames: number,
  direction: "left-to-right" | "right-to-left" = "left-to-right",
  zoomStart = 1.1,
  zoomEnd = 1.2,
) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = easeInOutQuad(t);
  const scale = zoomStart + (zoomEnd - zoomStart) * eased;
  const maxShiftPct = 5.5;
  const shift =
    direction === "left-to-right"
      ? interpolate(eased, [0, 1], [-maxShiftPct, maxShiftPct])
      : interpolate(eased, [0, 1], [maxShiftPct, -maxShiftPct]);

  return `scale(${scale}) translateX(${shift}%)`;
};
