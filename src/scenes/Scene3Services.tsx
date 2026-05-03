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

const MAX_BAR_HEIGHT = 320;

// Individual metric bar with spring-driven progressive growth
const MetricBar: React.FC<{
  label: string;
  valor: number;
  cor: string;
  delay: number;
}> = ({ label, valor, cor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: frame - delay,
    from: 0,
    to: 1,
    config: { damping: 200, stiffness: 110 },
  });

  const barHeight = progress * MAX_BAR_HEIGHT * (valor / 100);
  // Animate the displayed % counter so it counts up as the bar grows
  const displayValue = Math.round(Math.min(progress, 1) * valor);

  const valueOpacity = interpolate(progress, [0.5, 0.9], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle glow pulse once bar reaches target
  const glowPulse = Math.sin(frame * 0.1 + delay * 0.05) * 0.5 + 0.5;
  const glowIntensity = interpolate(progress, [0.95, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }) * (8 + glowPulse * 10);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 168,
        gap: 10,
      }}
    >
      {/* Animated % counter */}
      <div
        style={{
          fontFamily,
          fontSize: 30,
          fontWeight: 800,
          color: '#ffffff',
          opacity: valueOpacity,
          height: 40,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {displayValue}%
      </div>

      {/* Track + fill */}
      <div
        style={{
          width: 68,
          height: MAX_BAR_HEIGHT,
          backgroundColor: 'rgba(255,255,255,0.04)',
          borderRadius: 10,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: barHeight,
            background: `linear-gradient(180deg, ${cor} 0%, rgba(0,40,120,0.6) 100%)`,
            borderRadius: 10,
            boxShadow: `0 0 ${glowIntensity}px ${cor}80`,
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily,
          fontSize: 20,
          fontWeight: 600,
          color: '#9ca3af',
          textAlign: 'center',
          letterSpacing: '0.3px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Scene 3 — 120 frames (4s)
// Services: card with growing bar chart showing SEO / Performance metrics
export const Scene3Services: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const headerBlur = interpolate(frame, [0, 20], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const cardY = interpolate(frame, [8, 28], [36, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const tagOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Exit
  const exitOpacity = interpolate(frame, [100, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0 56px',
        gap: 36,
        opacity: exitOpacity,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          filter: `blur(${headerBlur}px)`,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily,
            fontSize: 22,
            fontWeight: 600,
            color: '#0070f3',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            margin: 0,
          }}
        >
          Resultados comprovados
        </p>
        <p
          style={{
            fontFamily,
            fontSize: 50,
            fontWeight: 800,
            color: '#ffffff',
            margin: '10px 0 0',
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
          }}
        >
          SEO + Infra + Performance
        </p>
      </div>

      {/* Card with bar chart */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
          backgroundColor: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(0,112,243,0.2)',
          borderRadius: 28,
          padding: '40px 32px 36px',
          width: '100%',
        }}
      >
        {/* Bar chart: bars anchored at bottom with flex align-items flex-end */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
          }}
        >
          {CONTENT.metricas.map((m, i) => (
            <MetricBar
              key={m.label}
              label={m.label}
              valor={m.valor}
              cor={m.cor}
              delay={18 + i * 14}
            />
          ))}
        </div>
      </div>

      {/* Services tag */}
      <div
        style={{
          opacity: tagOpacity,
          padding: '16px 40px',
          borderRadius: 100,
          backgroundColor: 'rgba(0,112,243,0.1)',
          border: '1px solid rgba(0,112,243,0.35)',
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 26,
            fontWeight: 600,
            color: '#60a5fa',
            letterSpacing: '0.5px',
          }}
        >
          {CONTENT.servicos}
        </span>
      </div>
    </AbsoluteFill>
  );
};
