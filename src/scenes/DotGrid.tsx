import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

// Persistent dot-grid background. Lives at composition root — useCurrentFrame()
// returns global frame 0-449, giving smooth drift across all 4 scenes.
export const DotGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const offsetX = interpolate(frame, [0, 450], [0, -80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const offsetY = interpolate(frame, [0, 450], [0, -55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0.18 }}
      >
        <defs>
          <pattern
            id="dotgrid"
            x={offsetX}
            y={offsetY}
            width="54"
            height="54"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.8" fill="#0070f3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* Top vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 280,
          background: 'linear-gradient(180deg, #0a0a0a 0%, rgba(10,10,10,0) 100%)',
        }}
      />
      {/* Bottom vignette */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 280,
          background: 'linear-gradient(0deg, #0a0a0a 0%, rgba(10,10,10,0) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
