import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { fontFamily } from '../constants/fonts';
import { CONTENT } from '../constants/content';

// Scene 1 — 115 frames (3.83s)
// Intro: logo-less brand reveal with spring-scaled headline
export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance blur + opacity
  const enterOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const enterBlur = interpolate(frame, [0, 18], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spring scale on the headline block
  const scaleSpring = spring({
    fps,
    frame,
    from: 0.62,
    to: 1,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });

  // Accent bar width
  const barWidth = interpolate(frame, [5, 38], [0, 88], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Subtitle stagger
  const subtitleOpacity = interpolate(frame, [22, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const subtitleY = interpolate(frame, [22, 48], [22, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Services tag
  const tagOpacity = interpolate(frame, [40, 66], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Handle pill
  const handleOpacity = interpolate(frame, [56, 76], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Exit
  const exitOpacity = interpolate(frame, [95, 115], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const exitBlur = interpolate(frame, [95, 115], [0, 8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const masterOpacity = Math.min(enterOpacity, exitOpacity);
  const masterBlur = Math.max(enterBlur, exitBlur);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0 72px',
        opacity: masterOpacity,
        filter: `blur(${masterBlur}px)`,
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          width: barWidth,
          height: 4,
          backgroundColor: '#0070f3',
          borderRadius: 2,
          marginBottom: 36,
          boxShadow: '0 0 12px rgba(0,112,243,0.7)',
        }}
      />

      {/* Headline with spring scale */}
      <div style={{ transform: `scale(${scaleSpring})`, textAlign: 'center' }}>
        <h1
          style={{
            fontFamily,
            fontSize: 92,
            fontWeight: 900,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-2.5px',
          }}
        >
          {CONTENT.headline}
        </h1>
        <h1
          style={{
            fontFamily,
            fontSize: 92,
            fontWeight: 900,
            color: '#0070f3',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-2.5px',
          }}
        >
          {CONTENT.headlineSub}
        </h1>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily,
          fontSize: 32,
          fontWeight: 300,
          color: '#9ca3af',
          margin: '28px 0 0',
          textAlign: 'center',
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          letterSpacing: '0.5px',
        }}
      >
        {CONTENT.claim}
      </p>

      {/* Services tag */}
      <div
        style={{
          marginTop: 48,
          opacity: tagOpacity,
          display: 'flex',
          flexDirection: 'row',
          gap: 14,
          alignItems: 'center',
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#0070f3' }} />
        <span
          style={{
            fontFamily,
            fontSize: 24,
            fontWeight: 600,
            color: '#e5e7eb',
            textTransform: 'uppercase',
            letterSpacing: '3px',
          }}
        >
          {CONTENT.servicos}
        </span>
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#0070f3' }} />
      </div>

      {/* Handle pill */}
      <div
        style={{
          marginTop: 60,
          opacity: handleOpacity,
          padding: '14px 36px',
          borderRadius: 100,
          border: '1.5px solid rgba(0,112,243,0.5)',
          backgroundColor: 'rgba(0,112,243,0.08)',
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 30,
            fontWeight: 600,
            color: '#60a5fa',
            letterSpacing: '1px',
          }}
        >
          {CONTENT.handle}
        </span>
      </div>
    </AbsoluteFill>
  );
};
