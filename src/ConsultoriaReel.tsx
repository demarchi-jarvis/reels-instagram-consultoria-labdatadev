import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { DotGrid } from './scenes/DotGrid';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2Authority } from './scenes/Scene2Authority';
import { Scene3Services } from './scenes/Scene3Services';
import { Scene4Offer } from './scenes/Scene4Offer';

// Total: 600 frames @ 30fps = 20s
// Scene1(130) + fade(20) + Scene2(140) + fade(20) + Scene3(150) + fade(20) + Scene4(160) = 600
const FADE_FRAMES = 20;

export const ConsultoriaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#080c14' }}>
      <DotGrid />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={130}>
          <Scene1Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={140}>
          <Scene2Authority />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene3Services />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={160}>
          <Scene4Offer />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
