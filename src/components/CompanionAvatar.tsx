import React from 'react';
import { CompanionState } from '../types';

interface CompanionAvatarProps {
  state: CompanionState;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showLabel?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CompanionAvatar: React.FC<CompanionAvatarProps> = ({
  state = 'healthy',
  size = 'md',
  showLabel = false,
  interactive = false,
  onClick,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    hero: 'w-48 h-48 sm:w-56 sm:h-56',
  };

  const stateDetails = {
    healthy: {
      label: 'Healthy',
      sublabel: 'On track',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      description: 'Bowl full & colorful',
    },
    slipping: {
      label: 'Slipping',
      sublabel: 'Colour drains',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-300',
      description: 'Minor habit drift',
    },
    melting: {
      label: 'Melting',
      sublabel: 'Syrup runs, dome slumps',
      badgeColor: 'bg-orange-100 text-orange-700 border-orange-300',
      description: 'Budget exceeded',
    },
    melted: {
      label: 'Melted',
      sublabel: 'Coins & syrup stay',
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-300',
      description: 'Multiple missed check-ins',
    },
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center transition-all duration-300 ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${className}`}
    >
      <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-md select-none overflow-visible"
        >
          <defs>
            {/* Gradients for Healthy State */}
            <linearGradient id="healthyPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B8B" />
              <stop offset="100%" stopColor="#FA4A72" />
            </linearGradient>
            <linearGradient id="healthyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48BB78" />
              <stop offset="100%" stopColor="#38A169" />
            </linearGradient>
            <linearGradient id="healthyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6E05E" />
              <stop offset="100%" stopColor="#ECC94B" />
            </linearGradient>
            <linearGradient id="healthyIce" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0F4F8" />
            </linearGradient>
            <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="goldCoin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBD38D" />
              <stop offset="100%" stopColor="#D69E2E" />
            </linearGradient>

            {/* Gradients for Slipping */}
            <linearGradient id="slipPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCA5A5" />
              <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
            <linearGradient id="slipGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
            <linearGradient id="slipYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>

            {/* Gradients for Melting */}
            <linearGradient id="meltPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
          </defs>

          {/* BACKGROUND GLOW */}
          <circle
            cx="120"
            cy="120"
            r="90"
            className={`transition-all duration-500 ${
              state === 'healthy'
                ? 'fill-pink-100/60'
                : state === 'slipping'
                ? 'fill-amber-100/50'
                : state === 'melting'
                ? 'fill-orange-100/40'
                : 'fill-slate-100/30'
            }`}
          />

          {/* ================= STATE 1: HEALTHY ================= */}
          {state === 'healthy' && (
            <g className="animate-bounce-slow origin-bottom">
              {/* Full Shaved Ice Mound */}
              <ellipse cx="120" cy="115" rx="72" ry="68" fill="url(#healthyIce)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))" />

              {/* Colorful Syrups on Ice */}
              {/* Top Pink Rose Syrup */}
              <path
                d="M60 100 C75 60, 165 60, 180 100 C165 92, 140 108, 120 95 C100 108, 75 92, 60 100 Z"
                fill="url(#healthyPink)"
              />
              {/* Left Green Pandan Syrup Patch */}
              <path
                d="M52 108 C50 85, 80 65, 95 62 C85 85, 78 115, 52 108 Z"
                fill="url(#healthyGreen)"
              />
              {/* Right Sweet Corn Yellow Syrup */}
              <path
                d="M188 108 C190 85, 160 65, 145 62 C155 85, 162 115, 188 108 Z"
                fill="url(#healthyYellow)"
              />

              {/* Toppings on Ice: Red Beans & Attap Chee & Jelly */}
              <circle cx="120" cy="58" r="7" fill="#9B2C2C" /> {/* Red bean topper */}
              <circle cx="106" cy="62" r="5.5" fill="#742A2A" />
              <circle cx="134" cy="62" r="5.5" fill="#9B2C2C" />
              
              {/* Sweet Corn Kernels */}
              <ellipse cx="160" cy="85" rx="5" ry="4" fill="#D69E2E" transform="rotate(15 160 85)" />
              <ellipse cx="168" cy="95" rx="4.5" ry="3.5" fill="#ECC94B" transform="rotate(-10 168 95)" />

              {/* Grass Jelly Cubes */}
              <rect x="70" y="80" width="8" height="8" rx="2" fill="#2D3748" transform="rotate(20 74 84)" />
              <rect x="80" y="90" width="7" height="7" rx="1.5" fill="#1A202C" transform="rotate(-10 83 93)" />

              {/* Face on Ice Dome */}
              {/* Cheerful Eyes */}
              <ellipse cx="98" cy="118" rx="5" ry="6" fill="#1E293B" />
              <circle cx="96" cy="116" r="1.5" fill="#FFFFFF" />
              <ellipse cx="142" cy="118" rx="5" ry="6" fill="#1E293B" />
              <circle cx="140" cy="116" r="1.5" fill="#FFFFFF" />

              {/* Rosy Cheeks */}
              <ellipse cx="88" cy="126" rx="7" ry="4.5" fill="#FF8EA3" opacity="0.85" />
              <ellipse cx="152" cy="126" rx="7" ry="4.5" fill="#FF8EA3" opacity="0.85" />

              {/* Sweet Smiling Mouth */}
              <path
                d="M112 126 Q120 134 128 126"
                stroke="#1E293B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Sparkle Star */}
              <path
                d="M175 52 L178 60 L186 63 L178 66 L175 74 L172 66 L164 63 L172 60 Z"
                fill="#ECC94B"
                className="animate-pulse-soft"
              />
            </g>
          )}

          {/* ================= STATE 2: SLIPPING ================= */}
          {state === 'slipping' && (
            <g className="origin-bottom">
              {/* Shaved Ice Mound - Slightly Lower */}
              <ellipse cx="120" cy="120" rx="70" ry="64" fill="url(#healthyIce)" />

              {/* Drained / Faded Syrups */}
              <path
                d="M62 108 C75 72, 165 72, 178 108 C165 102, 140 114, 120 105 C100 114, 75 102, 62 108 Z"
                fill="url(#slipPink)"
                opacity="0.85"
              />
              <path
                d="M56 114 C54 95, 80 75, 95 72 C85 92, 78 120, 56 114 Z"
                fill="url(#slipGreen)"
                opacity="0.8"
              />
              <path
                d="M184 114 C186 95, 160 75, 145 72 C155 92, 162 120, 184 114 Z"
                fill="url(#slipYellow)"
                opacity="0.8"
              />

              {/* Toppings */}
              <circle cx="120" cy="70" r="6" fill="#9B2C2C" opacity="0.9" />
              <circle cx="132" cy="74" r="5" fill="#742A2A" opacity="0.9" />

              {/* Face - Neutral / Curious */}
              <ellipse cx="98" cy="122" rx="4.5" ry="5.5" fill="#334155" />
              <circle cx="96" cy="120" r="1.2" fill="#FFFFFF" />
              <ellipse cx="142" cy="122" rx="4.5" ry="5.5" fill="#334155" />
              <circle cx="140" cy="120" r="1.2" fill="#FFFFFF" />

              {/* Cheeks - Lighter */}
              <ellipse cx="88" cy="128" rx="5" ry="3.5" fill="#FF8EA3" opacity="0.5" />
              <ellipse cx="152" cy="128" rx="5" ry="3.5" fill="#FF8EA3" opacity="0.5" />

              {/* Straight / Focused Mouth */}
              <path
                d="M113 128 Q120 130 127 128"
                stroke="#334155"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* ================= STATE 3: MELTING ================= */}
          {state === 'melting' && (
            <g className="origin-bottom">
              {/* Slumping / Flattened Ice Mound */}
              <ellipse cx="120" cy="132" rx="68" ry="52" fill="url(#healthyIce)" />

              {/* Dripping / Slumping Syrup */}
              <path
                d="M60 125 C75 92, 165 92, 180 125 C165 120, 150 136, 135 122 C120 134, 105 122, 90 132 C75 122, 65 126, 60 125 Z"
                fill="url(#meltPink)"
              />
              {/* Dripping Syrup trails running over bowl rim */}
              <path
                d="M74 125 Q76 150 78 158 Q80 162 82 155 Q83 140 85 128 Z"
                fill="#FB7185"
              />
              <path
                d="M156 125 Q158 148 160 156 Q162 160 164 152 Q166 138 168 128 Z"
                fill="#FB7185"
              />

              {/* Toppings Slumping */}
              <circle cx="114" cy="94" r="5.5" fill="#9B2C2C" />
              <circle cx="126" cy="98" r="5" fill="#742A2A" />
              <rect x="85" y="112" width="7" height="7" rx="1.5" fill="#2D3748" transform="rotate(35 88 115)" />

              {/* Face - Sad / Melting */}
              {/* Droopy sad eyes */}
              <path d="M92 128 Q98 124 104 128" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M136 128 Q142 124 148 128" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />

              {/* Downturned Mouth */}
              <path
                d="M112 136 Q120 130 128 136"
                stroke="#334155"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Sweat Droplet */}
              <path
                d="M162 110 C162 110 168 118 168 122 C168 125 165 127 162 127 C159 127 156 125 156 122 C156 118 162 110 162 110 Z"
                fill="#60A5FA"
              />
            </g>
          )}

          {/* ================= STATE 4: MELTED ================= */}
          {state === 'melted' && (
            <g className="origin-bottom">
              {/* Flat liquid pool / puddle in bowl */}
              <ellipse cx="120" cy="148" rx="66" ry="24" fill="#FECDD3" />
              <ellipse cx="120" cy="150" rx="58" ry="18" fill="#FDA4AF" />
              <ellipse cx="120" cy="152" rx="46" ry="12" fill="#FB7185" />

              {/* Floating Toppings & Gold Coins */}
              <circle cx="85" cy="146" r="6" fill="#9B2C2C" />
              <circle cx="152" cy="148" r="5" fill="#742A2A" />
              <rect x="98" y="144" width="8" height="8" rx="2" fill="#1E293B" transform="rotate(15 102 148)" />

              {/* Golden Coins Resting in Liquid */}
              <circle cx="135" cy="145" r="9" fill="url(#goldCoin)" stroke="#B7791F" strokeWidth="1" />
              <text x="135" y="148" fontSize="9" fontWeight="bold" fill="#744210" textAnchor="middle">S$</text>

              {/* Flat Sad / Blank Face on Puddle */}
              <circle cx="106" cy="140" r="3" fill="#475569" />
              <circle cx="130" cy="140" r="3" fill="#475569" />
              <line x1="114" y1="144" x2="122" y2="144" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* ================= BOWL (SHARED BY ALL STATES) ================= */}
          {/* Bowl Rim & Body */}
          <path
            d="M48 140 C48 140, 52 188, 120 188 C188 188, 192 140, 192 140 Z"
            fill="url(#bowlGrad)"
            stroke="#CBD5E1"
            strokeWidth="3.5"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))"
          />
          {/* Bowl Foot Ring */}
          <path
            d="M95 188 L90 196 C90 198, 150 198, 150 196 L145 188 Z"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          {/* Decorative Bowl Stripe / Peranakan Motif Line */}
          <path
            d="M58 152 Q120 162 182 152"
            stroke="#FF6B8B"
            strokeWidth="3"
            strokeDasharray="4 3"
            fill="none"
            opacity="0.7"
          />
        </svg>

        {/* Interactive hint badge */}
        {interactive && (
          <span className="absolute -bottom-1 -right-1 bg-white/90 shadow-sm border border-slate-200 text-[10px] px-1.5 py-0.5 rounded-full text-slate-500 font-medium">
            tap me
          </span>
        )}
      </div>

      {/* Optional State Label */}
      {showLabel && (
        <div className="mt-2 flex flex-col items-center">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${stateDetails[state].badgeColor}`}>
            {stateDetails[state].label}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">
            {stateDetails[state].sublabel}
          </span>
        </div>
      )}
    </div>
  );
};
