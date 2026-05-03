import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fontFamily } from '../constants/fonts';
import { CONTENT } from '../constants/content';

// Scene 1 — 130 frames (4.33s) — HOOK
export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const blurIn = interpolate(frame, [0, 22], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const labelY = interpolate(frame, [5, 30], [-20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const barW = interpolate(frame, [10, 45], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const preOpacity = interpolate(frame, [18, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const preY = interpolate(frame, [18, 42], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const headlineSpring = spring({ fps, frame: frame - 32, from: 0.55, to: 1, config: { damping: 12, stiffness: 110, mass: 0.9 } });
  const headlineOpacity = interpolate(frame, [32, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const glowPulse = Math.sin(frame * 0.12) * 0.5 + 0.5;
  const glowReady = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowIntensity = glowReady * (18 + glowPulse * 14);
  const subOpacity = interpolate(frame, [55, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const subY = interpolate(frame, [55, 78], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const exitOpacity = interpolate(frame, [108, 130], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });
  const exitBlur = interpolate(frame, [108, 130], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const masterOpacity = Math.min(fadeIn, exitOpacity);
  const masterBlur = Math.max(blurIn, exitBlur);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 72px', opacity: masterOpacity, filter: `blur(${masterBlur}px)` }}>
      <div style={{ opacity: labelOpacity, transform: `translateY(${labelY}px)`, marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#0066ff', boxShadow: '0 0 12px rgba(0,102,255,0.8)' }} />
        <span style={{ fontFamily, fontSize: 22, fontWeight: 600, color: '#0066ff', textTransform: 'uppercase', letterSpacing: '6px' }}>{CONTENT.empresa}</span>
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#0066ff', boxShadow: '0 0 12px rgba(0,102,255,0.8)' }} />
      </div>
      <div style={{ width: barW, height: 3, backgroundColor: '#0066ff', borderRadius: 2, boxShadow: '0 0 16px rgba(0,102,255,0.7)', marginBottom: 44 }} />
      <div style={{ opacity: preOpacity, transform: `translateY(${preY}px)`, marginBottom: 16, textAlign: 'center' }}>
        <span style={{ fontFamily, fontSize: 46, fontWeight: 400, color: 'rgba(255,255,255,0.68)', letterSpacing: '-0.5px' }}>{CONTENT.hook.pre}</span>
      </div>
      <div style={{ opacity: headlineOpacity, transform: `scale(${headlineSpring})`, textAlign: 'center', marginBottom: 50 }}>
        <h1 style={{ fontFamily, fontSize: 94, fontWeight: 900, color: '#ffffff', margin: 0, lineHeight: 1.02, letterSpacing: '-3px', textShadow: `0 0 ${glowIntensity}px rgba(0,102,255,0.8)` }}>
          {CONTENT.hook.destaque.split(' ').slice(0, 2).join(' ')}
        </h1>
        <h1 style={{ fontFamily, fontSize: 94, fontWeight: 900, color: '#0066ff', margin: 0, lineHeight: 1.02, letterSpacing: '-3px', textShadow: `0 0 ${glowIntensity * 1.4}px rgba(0,102,255,0.9)` }}>
          {CONTENT.hook.destaque.split(' ').slice(2).join(' ')}
        </h1>
      </div>
      <div style={{ opacity: subOpacity, transform: `translateY(${subY}px)`, padding: '18px 48px', borderRadius: 100, backgroundColor: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.28)' }}>
        <span style={{ fontFamily, fontSize: 28, fontWeight: 400, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3px' }}>{CONTENT.hook.sub}</span>
      </div>
    </AbsoluteFill>
  );
};
