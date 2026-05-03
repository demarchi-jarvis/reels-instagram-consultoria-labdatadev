import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { fontFamily } from '../constants/fonts';
import { CONTENT } from '../constants/content';

// Scene 2 — 140 frames (4.67s) — PROBLEMA: o que NÃO é vs o que É
export const Scene2Authority: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  // X icon
  const xOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xScale = interpolate(frame, [5, 25], [0.4, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.34, 1.56, 0.64, 1) });

  // "NÃO é" line
  const negOpacity = interpolate(frame, [12, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const negX = interpolate(frame, [12, 32], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // Divider line sweep
  const divW = interpolate(frame, [40, 68], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // "É o especialista" — staggered lines
  const def1Opacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const def1Y = interpolate(frame, [50, 70], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const def2Opacity = interpolate(frame, [64, 84], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const def2Y = interpolate(frame, [64, 84], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const def3Opacity = interpolate(frame, [78, 98], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const def3Y = interpolate(frame, [78, 98], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const def4Opacity = interpolate(frame, [92, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const def4Y = interpolate(frame, [92, 112], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // Check icon
  const checkOpacity = interpolate(frame, [100, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkScale = interpolate(frame, [100, 118], [0.3, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.34, 1.56, 0.64, 1) });

  const exitOpacity = interpolate(frame, [118, 140], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', padding: '0 72px', opacity: Math.min(fadeIn, exitOpacity) }}>

      {/* NÃO É block */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28 }}>
        <div style={{
          opacity: xOpacity, transform: `scale(${xScale})`,
          width: 56, height: 56, borderRadius: 28,
          backgroundColor: 'rgba(239,68,68,0.15)',
          border: '2px solid rgba(239,68,68,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ opacity: negOpacity, transform: `translateX(${negX}px)` }}>
          <span style={{ fontFamily, fontSize: 42, fontWeight: 800, color: 'rgba(255,255,255,0.55)', letterSpacing: '-1px', textDecoration: 'line-through', textDecorationColor: '#ef4444' }}>
            {CONTENT.problema.negacao}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: `${divW}%`, height: 1, backgroundColor: 'rgba(0,102,255,0.3)', marginBottom: 36, boxShadow: '0 0 8px rgba(0,102,255,0.2)' }} />

      {/* É block */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
        <div style={{
          opacity: checkOpacity, transform: `scale(${checkScale})`,
          width: 56, height: 56, borderRadius: 28,
          backgroundColor: 'rgba(0,102,255,0.15)',
          border: '2px solid rgba(0,102,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 6,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#0066ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ opacity: def1Opacity, transform: `translateY(${def1Y}px)` }}>
            <span style={{ fontFamily, fontSize: 52, fontWeight: 700, color: '#ffffff', letterSpacing: '-1.5px', lineHeight: 1.15 }}>
              É o especialista que
            </span>
          </div>
          <div style={{ opacity: def2Opacity, transform: `translateY(${def2Y}px)` }}>
            <span style={{ fontFamily, fontSize: 52, fontWeight: 700, color: '#ffffff', letterSpacing: '-1.5px', lineHeight: 1.15 }}>
              {CONTENT.problema.definicao}
            </span>
          </div>
          <div style={{ opacity: def3Opacity, transform: `translateY(${def3Y}px)` }}>
            <span style={{ fontFamily, fontSize: 58, fontWeight: 900, color: '#0066ff', letterSpacing: '-1.5px', lineHeight: 1.15 }}>
              {CONTENT.problema.acao}
            </span>
          </div>
          <div style={{ opacity: def4Opacity, transform: `translateY(${def4Y}px)` }}>
            <span style={{ fontFamily, fontSize: 52, fontWeight: 700, color: '#ffffff', letterSpacing: '-1.5px', lineHeight: 1.15 }}>
              {CONTENT.problema.resultado}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
