import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { DotGrid } from './scenes/DotGrid';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2Authority } from './scenes/Scene2Authority';
import { Scene3Services } from './scenes/Scene3Services';
import { Scene4Offer } from './scenes/Scene4Offer';

// Total: 951 frames @ 30fps = 31.73s (sincronizado com áudio TTS do roteiro V4)
// Scene1(180) + fade(20) + Scene2(270) + fade(20) + Scene3(240) + fade(20) + Scene4(321) - 60 = 951
const FADE_FRAMES = 20;

export const ConsultoriaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#080c14' }}>
      <Audio src={staticFile('roteiro_v4.mp3')} />
      <DotGrid />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene1Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={270}>
          <Scene2Authority />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene3Services />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={321}>
          <Scene4Offer />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
