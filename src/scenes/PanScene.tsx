import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { useKenBurns } from "./useKenBurns";

type Props = {
  src: string;
  durationInFrames: number;
  direction?: "left-to-right" | "right-to-left";
  zoomStart?: number;
  zoomEnd?: number;
};

export const PanScene: React.FC<Props> = ({
  src,
  durationInFrames,
  direction = "left-to-right",
  zoomStart,
  zoomEnd,
}) => {
  const panTransform = useKenBurns(durationInFrames, direction, zoomStart, zoomEnd);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: panTransform, transformOrigin: "center center" }}>
        <Img
          src={src}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
