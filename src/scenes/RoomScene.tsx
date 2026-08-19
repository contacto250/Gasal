import React from "react";
import { AbsoluteFill, Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useKenBurns } from "./useKenBurns";
import { ROOM_ZONES, shuffledZoneOrder } from "./zones";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  durationInFrames: number;
  direction?: "left-to-right" | "right-to-left";
  /** Frame (local to the scene) when the furniture reveal starts. */
  revealStartFrame: number;
  /** Frames between each zone's reveal start, in shuffled order. */
  staggerFrames?: number;
  seed?: number;
};

export const RoomScene: React.FC<Props> = ({
  beforeSrc,
  afterSrc,
  durationInFrames,
  direction = "left-to-right",
  revealStartFrame,
  staggerFrames = 5,
  seed = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panTransform = useKenBurns(durationInFrames, direction);
  const order = shuffledZoneOrder(seed, ROOM_ZONES.length);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: panTransform, transformOrigin: "center center" }}>
        <Img
          src={beforeSrc}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        {ROOM_ZONES.map((zone, i) => {
          const orderIndex = order.indexOf(i);
          const zoneStart = revealStartFrame + orderIndex * staggerFrames;
          const localFrame = frame - zoneStart;
          const revealed = localFrame >= 0;
          const s = spring({
            frame: Math.max(0, localFrame),
            fps,
            config: { damping: 12, mass: 0.5, stiffness: 170 },
          });
          const scale = 0.82 + s * 0.21; // settles at 1.0, gentle overshoot past it via spring itself
          const opacity = revealed ? Math.min(1, s * 1.3) : 0;

          // Expand the box beyond the logical zone so neighboring zones
          // overlap at their shared border, then feather each zone's edge
          // with a mask. The overlapping soft edges crossfade into each
          // other instead of meeting at a hard, visibly-seamed line (the
          // before/after AI renders differ very slightly in tone even in
          // "unchanged" areas like walls).
          const padX = zone.width * 0.12;
          const padY = zone.height * 0.12;
          const exLeft = zone.left - padX;
          const exTop = zone.top - padY;
          const exWidth = zone.width + padX * 2;
          const exHeight = zone.height + padY * 2;
          const padXPct = (padX / exWidth) * 100;
          const padYPct = (padY / exHeight) * 100;
          // Two gradients composited together feather all 4 edges while
          // leaving the zone's own interior fully opaque -- a radial mask
          // would starve the rectangle's corners instead.
          const maskH = `linear-gradient(to right, transparent 0%, black ${padXPct}%, black ${100 - padXPct}%, transparent 100%)`;
          const maskV = `linear-gradient(to bottom, transparent 0%, black ${padYPct}%, black ${100 - padYPct}%, transparent 100%)`;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${exLeft}%`,
                top: `${exTop}%`,
                width: `${exWidth}%`,
                height: `${exHeight}%`,
                overflow: "hidden",
                opacity,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                maskImage: `${maskH}, ${maskV}`,
                maskComposite: "intersect",
              }}
            >
              <Img
                src={afterSrc}
                style={{
                  position: "absolute",
                  left: `${-(exLeft / exWidth) * 100}%`,
                  top: `${-(exTop / exHeight) * 100}%`,
                  width: `${(100 / exWidth) * 100}%`,
                  height: `${(100 / exHeight) * 100}%`,
                  maxWidth: "none",
                }}
              />
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
