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

// Scene 4 — 155 frames (5.17s)
// Offer reveal: strikethrough price → new price with glow → CTA
export const Scene4Offer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === Badge ===
  const badgeOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const badgeY = interpolate(frame, [0, 22], [-28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // === Old price ===
  const oldPriceOpacity = interpolate(frame, [14, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Strikethrough sweeps left→right
  const strikeWidth = interpolate(frame, [36, 62], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // === New price — spring with overshoot ===
  const priceSpring = spring({
    fps,
    frame: frame - 56,
    from: 0.25,
    to: 1,
    // Slightly underdamped → satisfying bounce on reveal
    config: { damping: 10, stiffness: 120, mass: 0.85 },
  });
  const priceOpacity = interpolate(frame, [56, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Glow pulse once price is fully in
  const glowBase = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glowPulse = Math.sin(frame * 0.12) * 0.5 + 0.5;
  const glowIntensity = glowBase * (16 + glowPulse * 22);

  // === Benefit badge ===
  const benefitOpacity = interpolate(frame, [88, 108], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const benefitY = interpolate(frame, [88, 108], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // === CTA button ===
  const ctaOpacity = interpolate(frame, [104, 128], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const ctaSpring = spring({
    fps,
    frame: frame - 104,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 150, mass: 0.8 },
  });

  // CTA glow pulse
  const ctaGlowBase = interpolate(frame, [128, 148], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaGlowPulse = Math.sin(frame * 0.1) * 0.5 + 0.5;
  const ctaGlow = ctaGlowBase * (18 + ctaGlowPulse * 16);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0 64px',
        gap: 28,
      }}
    >
      {/* OFERTA ESPECIAL badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
          backgroundColor: 'rgba(239,68,68,0.12)',
          border: '1.5px solid rgba(239,68,68,0.5)',
          borderRadius: 100,
          padding: '10px 32px',
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 700,
            color: '#f87171',
            letterSpacing: '5px',
            textTransform: 'uppercase',
          }}
        >
          {CONTENT.oferta.badge}
        </span>
      </div>

      {/* Old price with animated strikethrough */}
      <div
        style={{
          opacity: oldPriceOpacity,
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 44,
            fontWeight: 400,
            color: '#6b7280',
            letterSpacing: '-1px',
          }}
        >
          DE {CONTENT.oferta.de}
        </span>
        {/* Strikethrough: absolutely positioned bar that sweeps left→right */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            height: 3,
            width: `${strikeWidth}%`,
            backgroundColor: '#ef4444',
            transform: 'translateY(-50%)',
            borderRadius: 2,
            boxShadow: '0 0 8px rgba(239,68,68,0.7)',
          }}
        />
      </div>

      {/* New price with spring scale + glow */}
      <div
        style={{
          opacity: priceOpacity,
          transform: `scale(${priceSpring})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 36,
            fontWeight: 600,
            color: '#9ca3af',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          Por apenas
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 116,
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-3px',
            textShadow: `
              0 0 ${glowIntensity}px rgba(0,112,243,0.9),
              0 0 ${glowIntensity * 2}px rgba(0,112,243,0.45),
              0 0 ${glowIntensity * 4}px rgba(0,112,243,0.2)
            `,
          }}
        >
          {CONTENT.oferta.por}
        </div>
      </div>

      {/* Benefit row */}
      <div
        style={{
          opacity: benefitOpacity,
          transform: `translateY(${benefitY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            padding: '14px 40px',
            borderRadius: 100,
            backgroundColor: 'rgba(0,112,243,0.1)',
            border: '1px solid rgba(0,112,243,0.38)',
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 26,
              fontWeight: 600,
              color: '#60a5fa',
            }}
          >
            {CONTENT.oferta.beneficio}
          </span>
        </div>
        <span
          style={{
            fontFamily,
            fontSize: 24,
            fontWeight: 400,
            color: '#6b7280',
            textAlign: 'center',
          }}
        >
          {CONTENT.oferta.foco}
        </span>
      </div>

      {/* CTA button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaSpring})`,
          marginTop: 12,
          padding: '30px 68px',
          borderRadius: 100,
          backgroundColor: '#0070f3',
          boxShadow: `
            0 0 ${ctaGlow + 24}px rgba(0,112,243,0.65),
            0 0 ${ctaGlow}px rgba(0,112,243,0.4),
            inset 0 1px 0 rgba(255,255,255,0.15)
          `,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 34,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.5px',
          }}
        >
          {CONTENT.cta} · {CONTENT.handle}
        </span>
      </div>
    </AbsoluteFill>
  );
};
