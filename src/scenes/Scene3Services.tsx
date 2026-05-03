import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fontFamily } from '../constants/fonts';
import { CONTENT } from '../constants/content';

// Scene 3 — 150 frames (5s) — SOLUÇÃO: comparação 6 meses vs 2 semanas + selos
export const Scene3Services: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  // Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const titleY = interpolate(frame, [0, 20], [-24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // Left card (6 meses — red/muted)
  const leftSpring = spring({ fps, frame: frame - 18, from: -120, to: 0, config: { damping: 18, stiffness: 130 } });
  const leftOpacity = interpolate(frame, [18, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // Strikethrough on "6 MESES"
  const strikeW = interpolate(frame, [45, 68], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // Right card (2 semanas — green/bright)
  const rightSpring = spring({ fps, frame: frame - 30, from: 120, to: 0, config: { damping: 18, stiffness: 130 } });
  const rightOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightGlow = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowPulse = Math.sin(frame * 0.14) * 0.5 + 0.5;

  // Argument line
  const argOpacity = interpolate(frame, [72, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const argY = interpolate(frame, [72, 92], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // Selos (staggered)
  const selo0 = spring({ fps, frame: frame - 95, from: 0.3, to: 1, config: { damping: 12, stiffness: 150 } });
  const selo1 = spring({ fps, frame: frame - 108, from: 0.3, to: 1, config: { damping: 12, stiffness: 150 } });
  const selo2 = spring({ fps, frame: frame - 121, from: 0.3, to: 1, config: { damping: 12, stiffness: 150 } });
  const seloOpacity0 = interpolate(frame, [95, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const seloOpacity1 = interpolate(frame, [108, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const seloOpacity2 = interpolate(frame, [121, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const exitOpacity = interpolate(frame, [128, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });

  const seloColors = ['#FFD700', '#FF6B35', '#0066ff'];
  const seloScales = [selo0, selo1, selo2];
  const seloOpacities = [seloOpacity0, seloOpacity1, seloOpacity2];

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 56px', gap: 36, opacity: Math.min(fadeIn, exitOpacity) }}>

      {/* Title */}
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
        <span style={{ fontFamily, fontSize: 28, fontWeight: 600, color: '#0066ff', textTransform: 'uppercase', letterSpacing: '6px' }}>
          {CONTENT.solucao.titulo}
        </span>
      </div>

      {/* VS Cards */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20, width: '100%' }}>
        {/* Left — 6 meses */}
        <div style={{
          flex: 1, opacity: leftOpacity,
          transform: `translateX(${leftSpring}px)`,
          padding: '32px 24px', borderRadius: 24,
          backgroundColor: 'rgba(239,68,68,0.06)',
          border: '1.5px solid rgba(239,68,68,0.25)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ fontFamily, fontSize: 68, fontWeight: 900, color: 'rgba(239,68,68,0.6)', letterSpacing: '-2px', lineHeight: 1 }}>
              {CONTENT.solucao.esquerda.label.split(' ')[0]}
            </span>
            <div style={{ position: 'absolute', top: '50%', left: 0, height: 4, width: `${strikeW}%`, backgroundColor: '#ef4444', transform: 'translateY(-50%)', borderRadius: 2, boxShadow: '0 0 10px rgba(239,68,68,0.8)' }} />
          </div>
          <span style={{ fontFamily, fontSize: 68, fontWeight: 900, color: 'rgba(239,68,68,0.6)', letterSpacing: '-2px', lineHeight: 1 }}>
            {CONTENT.solucao.esquerda.label.split(' ')[1]}
          </span>
          <span style={{ fontFamily, fontSize: 24, fontWeight: 400, color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.3 }}>
            {CONTENT.solucao.esquerda.descricao}
          </span>
        </div>

        {/* VS divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 52 }}>
          <span style={{ fontFamily, fontSize: 28, fontWeight: 900, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>VS</span>
        </div>

        {/* Right — 2 semanas */}
        <div style={{
          flex: 1, opacity: rightOpacity,
          transform: `translateX(${rightSpring}px)`,
          padding: '32px 24px', borderRadius: 24,
          backgroundColor: 'rgba(34,197,94,0.07)',
          border: `1.5px solid rgba(34,197,94,${0.3 + rightGlow * glowPulse * 0.4})`,
          boxShadow: `0 0 ${rightGlow * (16 + glowPulse * 12)}px rgba(34,197,94,0.2)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontFamily, fontSize: 68, fontWeight: 900, color: '#22c55e', letterSpacing: '-2px', lineHeight: 1, textShadow: `0 0 ${rightGlow * 20}px rgba(34,197,94,0.6)` }}>
            {CONTENT.solucao.direita.label.split(' ')[0]}
          </span>
          <span style={{ fontFamily, fontSize: 68, fontWeight: 900, color: '#22c55e', letterSpacing: '-2px', lineHeight: 1, textShadow: `0 0 ${rightGlow * 20}px rgba(34,197,94,0.6)` }}>
            {CONTENT.solucao.direita.label.split(' ')[1]}
          </span>
          <span style={{ fontFamily, fontSize: 24, fontWeight: 600, color: 'rgba(34,197,94,0.85)', textAlign: 'center', lineHeight: 1.3 }}>
            {CONTENT.solucao.direita.descricao}
          </span>
        </div>
      </div>

      {/* Argument */}
      <div style={{ opacity: argOpacity, transform: `translateY(${argY}px)`, textAlign: 'center', padding: '0 8px' }}>
        <span style={{ fontFamily, fontSize: 34, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.5px', lineHeight: 1.35 }}>
          {CONTENT.solucao.argumento}
        </span>
      </div>

      {/* Selos */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {CONTENT.solucao.selos.map((selo, i) => (
          <div key={selo} style={{
            opacity: seloOpacities[i], transform: `scale(${seloScales[i]})`,
            padding: '14px 36px', borderRadius: 100,
            backgroundColor: `${seloColors[i]}12`,
            border: `1.5px solid ${seloColors[i]}55`,
            boxShadow: `0 0 14px ${seloColors[i]}30`,
          }}>
            <span style={{ fontFamily, fontSize: 26, fontWeight: 700, color: seloColors[i], letterSpacing: '1px' }}>
              {selo}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
