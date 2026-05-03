import "./index.css";
import { Composition } from "remotion";
import { ConsultoriaReel } from "./ConsultoriaReel";

// Instagram Reels: 1080×1920 portrait · 30fps · 951 frames = 31.73s (matches TTS audio)
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ConsultoriaReel"
      component={ConsultoriaReel}
      durationInFrames={951}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
