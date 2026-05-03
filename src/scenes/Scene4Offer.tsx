import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fontFamily } from '../constants/fonts';
import { CONTENT } from '../constants/content';

// Scene 4 — 160 frames (5.33s) — OFERTA + CTA
export const Scene4Offer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  // Linha 1 spring
  const l1Spring = spring({ fps, frame: frame - 8, from: 0.5, to: 1, config: { damping: 11, stiffness: 110 } });
  const l1Opacity = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowPulse1 = Math.sin(frame * 0.13) * 0.5 + 0.5;
  const glow1 = interpolate(frame, [35, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * (20 + glowPulse1 * 16);

  // Linha 2
  const l2Spring = spring({ fps, frame: frame - 30, from: 0.5, to: 1, config: { damping: 11, stiffness: 110 } });
  const l2Opacity = interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Divider
  const divW = interpolate(frame, [50, 75], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // CTA pill
  const ctaSpring = spring({ fps, frame: frame - 72, from: 0.6, to: 1, config: { damping: 10, stiffness: 120, mass: 0.85 } });
  const ctaOpacity = interpolate(frame, [72, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const ctaGlowBase = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaGlowPulse = Math.sin(frame * 0.1) * 0.5 + 0.5;
  const ctaGlow = ctaGlowBase * (22 + ctaGlowPulse * 18);

  // Sub CTA
  const subOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const subY = interpolate(frame, [95, 115], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // Handle
  const handleSpring = spring({ fps, frame: frame - 118, from: 0.7, to: 1, config: { damping: 12, stiffness: 140 } });
  const handleOpacity = interpolate(frame, [118, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const handleGlowPulse = Math.sin(frame * 0.15) * 0.5 + 0.5;
  const handleGlow = interpolate(frame, [138, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * (14 + handleGlowPulse * 10);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 64px', gap: 32, opacity: fadeIn }}>

      {/* Linha 1 — "Uma diária minha." */}
      <div style={{ opacity: l1Opacity, transform: `scale(${l1Spring})`, textAlign: 'center' }}>
        <span style={{
          fontFamily, fontSize: 78, fontWeight: 900, color: '#ffffff',
          letterSpacing: '-2.5px', lineHeight: 1.05,
          textShadow: `0 0 ${glow1}px rgba(0,102,255,0.7), 0 0 ${glow1 * 2}px rgba(0,102,255,0.3)`,
        }}>
          {CONTENT.oferta.linha1}
        </span>
      </div>

      {/* Linha 2 — "Resultado de um time inteiro." */}
      <div style={{ opacity: l2Opacity, transform: `scale(${l2Spring})`, textAlign: 'center' }}>
        <span style={{ fontFamily, fontSize: 56, fontWeight: 700, color: 'rgba(255,255,255,0.82)', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
          {CONTENT.oferta.linha2}
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: `${divW}%`, height: 2, background: 'linear-gradient(90deg, transparent, #0066ff, transparent)', borderRadius: 2, boxShadow: '0 0 12px rgba(0,102,255,0.4)' }} />

      {/* CTA button */}
      <div style={{
        opacity: ctaOpacity, transform: `scale(${ctaSpring})`,
        padding: '34px 72px', borderRadius: 100,
        background: 'linear-gradient(135deg, #0066ff 0%, #0044cc 100%)',
        boxShadow: `0 0 ${ctaGlow + 20}px rgba(0,102,255,0.65), 0 0 ${ctaGlow}px rgba(0,102,255,0.4), inset 0 1px 0 rgba(255,255,255,0.15)`,
      }}>
        <span style={{ fontFamily, fontSize: 36, fontWeight: 700, color: '#ffffff', letterSpacing: '0.5px' }}>
          {CONTENT.oferta.cta}
        </span>
      </div>

      {/* Sub */}
      <div style={{ opacity: subOpacity, transform: `translateY(${subY}px)`, textAlign: 'center' }}>
        <span style={{ fontFamily, fontSize: 26, fontWeight: 400, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.3px' }}>
          {CONTENT.oferta.sub}
        </span>
      </div>

      {/* Handle */}
      <div style={{
        opacity: handleOpacity, transform: `scale(${handleSpring})`,
        padding: '16px 44px', borderRadius: 100,
        backgroundColor: 'rgba(0,102,255,0.08)',
        border: `1.5px solid rgba(0,102,255,${0.3 + handleGlow / 40})`,
        boxShadow: `0 0 ${handleGlow}px rgba(0,102,255,0.25)`,
      }}>
        <span style={{ fontFamily, fontSize: 32, fontWeight: 700, color: '#0066ff', letterSpacing: '1px' }}>
          {CONTENT.handle}
        </span>
      </div>
    </AbsoluteFill>
  );
};
