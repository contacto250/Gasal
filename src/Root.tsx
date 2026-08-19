import "./index.css";
import { MyComposition } from "./Composition";
import { MyReelComposition } from "./reel/ReelComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <MyReelComposition />
    </>
  );
};
