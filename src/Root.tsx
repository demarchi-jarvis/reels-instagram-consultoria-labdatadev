import "./index.css";
import { Composition } from "remotion";
import { ConsultoriaReel } from "./ConsultoriaReel";

// Instagram Reels: 1080×1920 portrait · 30fps · 450 frames = 15 seconds
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ConsultoriaReel"
      component={ConsultoriaReel}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
