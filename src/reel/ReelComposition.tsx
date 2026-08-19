import React from "react";
import { Composition, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { RevealPop } from "./RevealPop";

const SCENE_DURATION = 70; // ~2.33s per space at 30fps
const REVEAL_FRAME = 22; // empty room shown for ~0.73s before the flip
const TRANSITION = 8; // quick cut-ish crossfade between spaces

const SPACES = [
  { before: "living_chimenea", after: "living_chimenea_amoblado" },
  { before: "dormitorio_corredera", after: "dormitorio_corredera_amoblado" },
  { before: "bano2", after: "bano_amoblado" },
  { before: "patio_trasero", after: "patio_trasero_amoblado" },
];

const TOTAL_DURATION = SPACES.length * SCENE_DURATION - (SPACES.length - 1) * TRANSITION;

export const MyReelComposition = () => {
  return (
    <Composition
      id="ReelDiseno"
      component={ReelVideo}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

export const ReelVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {SPACES.map((space, i) => (
        <React.Fragment key={space.before}>
          {i > 0 && (
            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION })}
            />
          )}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
            <RevealPop
              beforeSrc={staticFile(`frame/antes/${space.before}.jpg`)}
              afterSrc={staticFile(`frame/amoblado/${space.after}.jpg`)}
              revealFrame={REVEAL_FRAME}
            />
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}
    </TransitionSeries>
  );
};
