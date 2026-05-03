import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { DotGrid } from './scenes/DotGrid';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2Authority } from './scenes/Scene2Authority';
import { Scene3Services } from './scenes/Scene3Services';
import { Scene4Offer } from './scenes/Scene4Offer';

// Total duration: 450 frames @ 30fps = 15s
// Scene durations + transitions math:
//   Scene1(115) + Scene2(120) + Scene3(120) + Scene4(155) - 3 × fade(20) = 450
const FADE_FRAMES = 20;

export const ConsultoriaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* DotGrid lives at root — its useCurrentFrame() returns the global frame
          so the dot drift is continuous and smooth across all 4 scenes */}
      <DotGrid />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={115}>
          <Scene1Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene2Authority />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene3Services />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={155}>
          <Scene4Offer />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
