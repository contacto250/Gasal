import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PanScene } from "./scenes/PanScene";
import { RoomScene } from "./scenes/RoomScene";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

const TRANSITION = 15; // 0.5s fade between every scene, so there are no hard cuts

export const MyComposition = () => {
  return (
    <Composition
      id="TourInmobiliario"
      component={TourVideo}
      durationInFrames={885}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const TourVideo: React.FC<Props> = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <PanScene
          src={staticFile("frame/antes/fachada.jpg")}
          durationInFrames={90}
          direction="left-to-right"
          zoomStart={1.06}
          zoomEnd={1.14}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={75}>
        <PanScene
          src={staticFile("frame/antes/pasillo.jpg")}
          durationInFrames={75}
          direction="right-to-left"
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={75}>
        <PanScene
          src={staticFile("frame/antes/entrada.jpg")}
          durationInFrames={75}
          direction="left-to-right"
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={180}>
        <RoomScene
          beforeSrc={staticFile("frame/antes/living_chimenea.jpg")}
          afterSrc={staticFile("frame/amoblado/living_chimenea_amoblado.jpg")}
          durationInFrames={180}
          direction="right-to-left"
          revealStartFrame={55}
          seed={11}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={165}>
        <RoomScene
          beforeSrc={staticFile("frame/antes/dormitorio_corredera.jpg")}
          afterSrc={staticFile("frame/amoblado/dormitorio_corredera_amoblado.jpg")}
          durationInFrames={165}
          direction="left-to-right"
          revealStartFrame={50}
          seed={22}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={105}>
        <RoomScene
          beforeSrc={staticFile("frame/antes/bano2.jpg")}
          afterSrc={staticFile("frame/amoblado/bano_amoblado.jpg")}
          durationInFrames={105}
          direction="right-to-left"
          revealStartFrame={30}
          staggerFrames={4}
          seed={33}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={150}>
        <RoomScene
          beforeSrc={staticFile("frame/antes/patio_trasero.jpg")}
          afterSrc={staticFile("frame/amoblado/patio_trasero_amoblado.jpg")}
          durationInFrames={150}
          direction="left-to-right"
          revealStartFrame={45}
          seed={44}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={150}>
        <RoomScene
          beforeSrc={staticFile("frame/antes/quincho.jpg")}
          afterSrc={staticFile("frame/amoblado/quincho_amoblado.jpg")}
          durationInFrames={150}
          direction="right-to-left"
          revealStartFrame={45}
          seed={55}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
