import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  /** Frame (local to the scene) when the empty room flips to furnished. */
  revealFrame: number;
};

export const RevealPop: React.FC<Props> = ({ beforeSrc, afterSrc, revealFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - revealFrame;

  const s = spring({
    frame: Math.max(0, local),
    fps,
    config: { damping: 11, mass: 0.5, stiffness: 200 },
  });
  const scale = 1.1 - s * 0.1; // settles at 1.0 with a light overshoot from spring
  const opacity = local >= 0 ? Math.min(1, s * 1.4) : 0;

  // Quick white flash right at the flip, gone within ~7 frames.
  const flash = interpolate(local, [-2, 0, 7], [0, 0.75, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Img src={beforeSrc} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <Img
        src={afterSrc}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      />
      <AbsoluteFill style={{ backgroundColor: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};
