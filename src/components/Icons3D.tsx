import React from 'react';

interface Icon3DProps {
  className?: string;
}

/**
 * Bespoke multi-layered 3D SVG icons crafted for Splash Studio.
 * Each icon pairs soft electric-blue (#2F5BFF) extrusions, indigo depth (#1D3FD1),
 * crisp white glass/highlights, and subtle drop shadows.
 * Groups with `.icon3d-float` gently elevate on parent card hover.
 */

export function Icon3DDesign({ className = 'w-11 h-11' }: Icon3DProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="d-base" x1="10" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6B8AFF" />
          <stop offset="100%" stopColor="#2F5BFF" />
        </linearGradient>
        <linearGradient id="d-card" x1="14" y1="10" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E3EAFF" />
        </linearGradient>
        <linearGradient id="d-pen" x1="34" y1="12" x2="54" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      {/* Ambient base shadow */}
      <ellipse cx="32" cy="56" rx="19" ry="4" fill="#2F5BFF" fillOpacity="0.16" />
      {/* Extruded back plate */}
      <rect x="10" y="16" width="38" height="34" rx="9" fill="#1D3FD1" />
      <rect x="10" y="13" width="38" height="34" rx="9" fill="url(#d-base)" />
      {/* Floating front glass artboard */}
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-0.5">
        <rect x="15" y="10" width="34" height="30" rx="7" fill="url(#d-card)" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="24" cy="21" r="4.5" fill="#2F5BFF" />
        <rect x="32" y="18" width="12" height="3.5" rx="1.75" fill="#94A6FF" />
        <rect x="32" y="24" width="9" height="3" rx="1.5" fill="#C7D4FF" />
        <rect x="20" y="31" width="24" height="4" rx="2" fill="#DCE4FF" />
      </g>
      {/* Floating 3D stylus */}
      <g className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1.5">
        <path
          d="M49.5 11.5C51.4 9.6 54.5 9.6 56.4 11.5C58.3 13.4 58.3 16.5 56.4 18.4L39.8 35L31.5 36.8L33.3 28.5L49.5 11.5Z"
          fill="url(#d-pen)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M46.5 14.5L53.4 21.4" stroke="#6B8AFF" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Icon3DDashboard({ className = 'w-11 h-11' }: Icon3DProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="dash-slab" x1="8" y1="14" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E6ECFF" />
        </linearGradient>
        <linearGradient id="dash-bar-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B8AFF" />
          <stop offset="100%" stopColor="#2F5BFF" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="21" ry="4" fill="#2F5BFF" fillOpacity="0.16" />
      {/* 3D extruded tablet base */}
      <rect x="8" y="18" width="48" height="33" rx="9" fill="#1D3FD1" />
      <rect x="8" y="13" width="48" height="34" rx="9" fill="url(#dash-slab)" stroke="#C7D4FF" strokeWidth="1.5" />
      {/* Header dots */}
      <circle cx="16" cy="21" r="2" fill="#2F5BFF" />
      <circle cx="22" cy="21" r="2" fill="#94A6FF" />
      <rect x="38" y="19.5" width="11" height="3" rx="1.5" fill="#DCE4FF" />
      {/* Extruded 3D rising bars */}
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <rect x="15" y="33" width="7" height="9" rx="2.5" fill="#94A6FF" />
        <rect x="25" y="28" width="7" height="14" rx="2.5" fill="#5A7BFF" />
        <rect x="35" y="22" width="7" height="20" rx="2.5" fill="url(#dash-bar-hi)" />
        {/* Floating KPI badge */}
        <rect x="44" y="25" width="7" height="17" rx="2.5" fill="#0F172A" />
        <circle cx="47.5" cy="29.5" r="1.6" fill="#6B8AFF" />
      </g>
    </svg>
  );
}

export function Icon3DAIAutomation({ className = 'w-11 h-11' }: Icon3DProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="ai-top" x1="18" y1="10" x2="46" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8AA3FF" />
          <stop offset="100%" stopColor="#2F5BFF" />
        </linearGradient>
        <linearGradient id="ai-left" x1="14" y1="22" x2="32" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2F5BFF" />
          <stop offset="100%" stopColor="#1B39B8" />
        </linearGradient>
        <linearGradient id="ai-right" x1="32" y1="22" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="18" ry="4" fill="#2F5BFF" fillOpacity="0.18" />
      {/* Isometric 3D AI Cube */}
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <path d="M32 10L51 20.5V41.5L32 52L13 41.5V20.5L32 10Z" fill="#1D3FD1" />
        {/* Top face */}
        <path d="M32 10L51 20.5L32 31L13 20.5L32 10Z" fill="url(#ai-top)" />
        {/* Left face */}
        <path d="M13 20.5L32 31V52L13 41.5V20.5Z" fill="url(#ai-left)" />
        {/* Right face */}
        <path d="M51 20.5L32 31V52L51 41.5V20.5Z" fill="url(#ai-right)" />
        {/* Crisp edges */}
        <path d="M13 20.5L32 31L51 20.5M32 31V52" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      {/* Floating glowing neural nodes */}
      <g className="transition-transform duration-300 ease-out group-hover:scale-110 origin-center">
        <circle cx="32" cy="20.5" r="4" fill="#FFFFFF" stroke="#2F5BFF" strokeWidth="2" />
        <circle cx="22" cy="36" r="3" fill="#FFFFFF" />
        <circle cx="42" cy="36" r="3" fill="#6B8AFF" />
      </g>
    </svg>
  );
}

export function Icon3DWebDev({ className = 'w-11 h-11' }: Icon3DProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="web-win" x1="10" y1="12" x2="54" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E6ECFF" />
        </linearGradient>
        <linearGradient id="web-pill" x1="20" y1="22" x2="46" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5C7DFF" />
          <stop offset="100%" stopColor="#2F5BFF" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="20" ry="4" fill="#2F5BFF" fillOpacity="0.16" />
      {/* Extruded 3D browser window */}
      <rect x="8" y="17" width="48" height="34" rx="9" fill="#1D3FD1" />
      <rect x="8" y="13" width="48" height="34" rx="9" fill="url(#web-win)" stroke="#C7D4FF" strokeWidth="1.5" />
      {/* Window bar */}
      <path d="M8 22C8 17.0294 12.0294 13 17 13H47C51.9706 13 56 17.0294 56 22V23H8V22Z" fill="#0F172A" />
      <circle cx="15" cy="18" r="1.8" fill="#6B8AFF" />
      <circle cx="21" cy="18" r="1.8" fill="#94A6FF" />
      <circle cx="27" cy="18" r="1.8" fill="#FFFFFF" fillOpacity="0.5" />
      {/* Floating 3D code emblem */}
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <rect x="17" y="27" width="30" height="15" rx="5" fill="url(#web-pill)" />
        <path d="M26 31.5L22.5 34.5L26 37.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 31.5L41.5 34.5L38 37.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33.5 30.5L30.5 38.5" stroke="#C7D4FF" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Icon3DVideo({ className = 'w-11 h-11' }: Icon3DProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="vid-frame" x1="10" y1="14" x2="54" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="vid-play" x1="25" y1="22" x2="43" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C98FF" />
          <stop offset="100%" stopColor="#2F5BFF" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="20" ry="4" fill="#2F5BFF" fillOpacity="0.18" />
      {/* Back electric-blue extrusion */}
      <rect x="8" y="18" width="48" height="33" rx="9" fill="#2F5BFF" />
      {/* Front 3D cinema slate */}
      <rect x="8" y="13" width="48" height="34" rx="9" fill="url(#vid-frame)" stroke="#6B8AFF" strokeOpacity="0.45" strokeWidth="1.5" />
      {/* Timeline scrub dots */}
      <rect x="15" y="40" width="34" height="2.5" rx="1.25" fill="#334155" />
      <rect x="15" y="40" width="18" height="2.5" rx="1.25" fill="#2F5BFF" />
      {/* Floating 3D play prism */}
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 origin-center">
        <circle cx="32" cy="27" r="9.5" fill="url(#vid-play)" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M29.5 23.2L36.8 27L29.5 30.8V23.2Z" fill="#FFFFFF" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function Icon3DDiscover({ className = 'w-10 h-10' }: Icon3DProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="32" cy="56" rx="17" ry="3.5" fill="#2F5BFF" fillOpacity="0.15" />
      <rect x="11" y="14" width="34" height="36" rx="8" fill="#1D3FD1" />
      <rect x="11" y="11" width="34" height="36" rx="8" fill="#EEF2FF" stroke="#FFFFFF" strokeWidth="1.5" />
      <rect x="18" y="19" width="20" height="3.5" rx="1.75" fill="#94A6FF" />
      <rect x="18" y="26" width="14" height="3.5" rx="1.75" fill="#C7D4FF" />
      <g className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-1">
        <circle cx="39" cy="34" r="11" fill="#2F5BFF" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="39" cy="34" r="5.5" fill="#EEF2FF" />
        <path d="M47 42L53.5 48.5" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Icon3DBlueprint({ className = 'w-10 h-10' }: Icon3DProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="32" cy="56" rx="18" ry="3.5" fill="#2F5BFF" fillOpacity="0.15" />
      {/* Stacked isometric layers */}
      <path d="M32 34L54 43L32 52L10 43L32 34Z" fill="#1D3FD1" />
      <path d="M32 25L54 34L32 43L10 34L32 25Z" fill="#6B8AFF" stroke="#FFFFFF" strokeWidth="1.2" />
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
        <path d="M32 13L54 22L32 31L10 22L32 13Z" fill="#FFFFFF" stroke="#2F5BFF" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="32" cy="22" r="4" fill="#2F5BFF" />
      </g>
    </svg>
  );
}

export function Icon3DBuild({ className = 'w-10 h-10' }: Icon3DProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="32" cy="56" rx="18" ry="3.5" fill="#2F5BFF" fillOpacity="0.15" />
      <rect x="10" y="17" width="44" height="33" rx="8" fill="#1D3FD1" />
      <rect x="10" y="13" width="44" height="33" rx="8" fill="#0F172A" stroke="#6B8AFF" strokeOpacity="0.4" strokeWidth="1.5" />
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <path d="M21 24L28 30L21 36" stroke="#6B8AFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="31" y="34" width="12" height="3" rx="1.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export function Icon3DLaunch({ className = 'w-10 h-10' }: Icon3DProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="32" cy="56" rx="16" ry="3.5" fill="#2F5BFF" fillOpacity="0.18" />
      {/* Thrust plume */}
      <path d="M26 42L32 52L38 42H26Z" fill="#94A6FF" />
      {/* 3D Rocket capsule */}
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:translate-x-0.5">
        <path d="M18 35L25 32V42L18 39V35Z" fill="#1D3FD1" />
        <path d="M46 35L39 32V42L46 39V35Z" fill="#0F172A" />
        <path d="M32 10C39 17 42 27 40 41H24C22 27 25 17 32 10Z" fill="#2F5BFF" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="32" cy="26" r="4.5" fill="#FFFFFF" />
        <circle cx="32" cy="26" r="2.2" fill="#0F172A" />
      </g>
    </svg>
  );
}
