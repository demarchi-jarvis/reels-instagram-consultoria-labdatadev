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

type Company = { nome: string; setor: string };

const CompanyCard: React.FC<{ company: Company; delay: number }> = ({ company, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in from right with spring
  const slideSpring = spring({
    fps,
    frame: frame - delay,
    from: 140,
    to: 0,
    config: { damping: 200, stiffness: 160 },
  });

  const cardOpacity = interpolate(frame - delay, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        padding: '26px 36px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,112,243,0.22)',
        borderRadius: 22,
        opacity: cardOpacity,
        transform: `translateX(${slideSpring}px)`,
        width: '100%',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 5,
          height: 58,
          borderRadius: 3,
          backgroundColor: '#0070f3',
          flexShrink: 0,
          boxShadow: '0 0 10px rgba(0,112,243,0.6)',
        }}
      />

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily,
            fontSize: 46,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-1px',
          }}
        >
          {company.nome}
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 22,
            fontWeight: 400,
            color: '#6b7280',
            marginTop: 4,
            letterSpacing: '0.3px',
          }}
        >
          {company.setor}
        </div>
      </div>

      {/* Verified badge */}
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 23,
          backgroundColor: 'rgba(0,112,243,0.12)',
          border: '1.5px solid rgba(0,112,243,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="#0070f3"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

// Scene 2 — 120 frames (4s)
// Authority: staggered slide-in of client companies
export const Scene2Authority: React.FC = () => {
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
  const headerY = interpolate(frame, [0, 20], [-16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
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
        padding: '0 64px',
        gap: 28,
        opacity: exitOpacity,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          filter: `blur(${headerBlur}px)`,
          transform: `translateY(${headerY}px)`,
          textAlign: 'center',
          marginBottom: 8,
          width: '100%',
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
          Clientes que já confiaram
        </p>
        <p
          style={{
            fontFamily,
            fontSize: 52,
            fontWeight: 800,
            color: '#ffffff',
            margin: '10px 0 0',
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
          }}
        >
          Líderes de Mercado
        </p>
      </div>

      {/* Company cards — staggered by 20 frames each */}
      {CONTENT.autoridade.map((company, i) => (
        <CompanyCard key={company.nome} company={company} delay={12 + i * 20} />
      ))}
    </AbsoluteFill>
  );
};
