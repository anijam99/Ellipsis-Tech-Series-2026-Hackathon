import React, { useState } from 'react';
import { CompanionState } from '../types';
import { playSound } from '../utils/soundEffects';

interface CompanionAvatarProps {
  state: CompanionState;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showLabel?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const CompanionAvatar: React.FC<CompanionAvatarProps> = ({
  state = 'healthy',
  size = 'md',
  showLabel = false,
  interactive = false,
  onClick,
  className = '',
}) => {
  const [isSquishing, setIsSquishing] = useState(false);
  const [isReactingFace, setIsReactingFace] = useState(false);
  const [particles, setParticles] = useState<ClickParticle[]>([]);

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

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive && !onClick) return;
    playSound.pop();
    setIsSquishing(true);
    setIsReactingFace(true);
    setTimeout(() => setIsSquishing(false), 450);
    setTimeout(() => setIsReactingFace(false), 1400);

    // Spawn floating tap particles
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const emojis = state === 'healthy' ? ['✨', '🍧', '💖', '⭐', '🥰'] : state === 'melting' ? ['💧', '🥺', '🌧️'] : ['🥣', '💫', '👀'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const newParticle: ClickParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: randomEmoji,
    };

    setParticles(prev => [...prev.slice(-4), newParticle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1500);

    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-flex flex-col items-center justify-center select-none transition-all duration-300 relative ${
        interactive || onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${isSquishing ? 'animate-squish' : ''} ${className}`}
    >
      {/* Floating Click Particles */}
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute pointer-events-none text-base animate-float-particle z-50 select-none"
          style={{ left: `${p.x}px`, top: `${p.y}px` }}
        >
          {p.emoji}
        </span>
      ))}

      <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
        <svg
          viewBox="28 28 184 184"
          className={`w-full h-full drop-shadow-md select-none overflow-visible ${
            state === 'melting' ? 'animate-shiver' : ''
          }`}
        >
          <defs>
            {/* Gradients for Healthy State */}
            <linearGradient id="healthyPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E4657F" />
              <stop offset="100%" stopColor="#FA4A72" />
            </linearGradient>
            <linearGradient id="healthyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48BB78" />
              <stop offset="100%" stopColor="#38A169" />
            </linearGradient>
            <linearGradient id="healthyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6E05E" />
              <stop offset="100%" stopColor="#DAAC5C" />
            </linearGradient>
            <linearGradient id="healthyIce" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFCF6" />
              <stop offset="100%" stopColor="#F5EFE4" />
            </linearGradient>
            <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFCF6" />
              <stop offset="100%" stopColor="#E4D9C6" />
            </linearGradient>
            <linearGradient id="goldCoin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9C88C" />
              <stop offset="100%" stopColor="#AC7833" />
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
              <g className="animate-jelly">
                <path
                  d="M60 100 C75 60, 165 60, 180 100 C165 92, 140 108, 120 95 C100 108, 75 92, 60 100 Z"
                  fill="url(#healthyPink)"
                />
                <path
                  d="M52 108 C50 85, 80 65, 95 62 C85 85, 78 115, 52 108 Z"
                  fill="url(#healthyGreen)"
                />
                <path
                  d="M188 108 C190 85, 160 65, 145 62 C155 85, 162 115, 188 108 Z"
                  fill="url(#healthyYellow)"
                />
              </g>

              {/* Toppings on Ice */}
              <circle cx="120" cy="58" r="7" fill="#9B2C2C" className="animate-pulse-soft" />
              <circle cx="106" cy="62" r="5.5" fill="#742A2A" />
              <circle cx="134" cy="62" r="5.5" fill="#9B2C2C" />
              
              <ellipse cx="160" cy="85" rx="5" ry="4" fill="#AC7833" transform="rotate(15 160 85)" />
              <ellipse cx="168" cy="95" rx="4.5" ry="3.5" fill="#DAAC5C" transform="rotate(-10 168 95)" />
              <rect x="70" y="80" width="8" height="8" rx="2" fill="#3E3529" transform="rotate(20 74 84)" />
              <rect x="80" y="90" width="7" height="7" rx="1.5" fill="#1A202C" transform="rotate(-10 83 93)" />

              {/* DYNAMIC FACE: Standard vs Clicked Reaction */}
              {isReactingFace ? (
                /* Joyful Laughing / Excited Squint Face on Tap */
                <g className="animate-pulse-soft">
                  {/* Happy Arc Eyes ^ ^ */}
                  <path d="M92 118 Q98 108 104 118" stroke="#362E24" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M136 118 Q142 108 148 118" stroke="#362E24" strokeWidth="4" strokeLinecap="round" fill="none" />

                  {/* Bright Blushing Cheeks */}
                  <ellipse cx="86" cy="126" rx="9" ry="6" fill="#FA4A72" opacity="0.9" />
                  <ellipse cx="154" cy="126" rx="9" ry="6" fill="#FA4A72" opacity="0.9" />

                  {/* Wide Joyful Open Mouth :D */}
                  <path
                    d="M110 124 Q120 144 130 124 Z"
                    fill="#362E24"
                  />
                  <path
                    d="M114 132 Q120 142 126 132 Z"
                    fill="#FA4A72"
                  />
                </g>
              ) : (
                /* Idle Face with Natural Blinking Eyes */
                <g>
                  <g className="animate-blink">
                    <ellipse cx="98" cy="118" rx="5" ry="6" fill="#362E24" />
                    <circle cx="96" cy="116" r="1.5" fill="#FFFCF6" />
                    <ellipse cx="142" cy="118" rx="5" ry="6" fill="#362E24" />
                    <circle cx="140" cy="116" r="1.5" fill="#FFFCF6" />
                  </g>

                  {/* Rosy Cheeks */}
                  <ellipse cx="88" cy="126" rx="7" ry="4.5" fill="#FF8EA3" opacity="0.85" />
                  <ellipse cx="152" cy="126" rx="7" ry="4.5" fill="#FF8EA3" opacity="0.85" />

                  {/* Sweet Smiling Mouth */}
                  <path
                    d="M112 126 Q120 134 128 126"
                    stroke="#362E24"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              )}

              {/* Sparkle Star */}
              <path
                d="M175 52 L178 60 L186 63 L178 66 L175 74 L172 66 L164 63 L172 60 Z"
                fill="#DAAC5C"
                className="animate-pulse-soft"
              />
            </g>
          )}

          {/* ================= STATE 2: SLIPPING ================= */}
          {state === 'slipping' && (
            <g className="origin-bottom">
              <ellipse cx="120" cy="120" rx="70" ry="64" fill="url(#healthyIce)" />

              <g>
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
              </g>

              <circle cx="68" cy="138" r="3" fill="#FCA5A5" className="animate-syrup-drip" />
              <circle cx="120" cy="70" r="6" fill="#9B2C2C" opacity="0.9" />
              <circle cx="132" cy="74" r="5" fill="#742A2A" opacity="0.9" />

              {/* Face on Slipping: Surprised on tap */}
              {isReactingFace ? (
                <g>
                  {/* Surprised / Curious eyes */}
                  <ellipse cx="98" cy="120" rx="6" ry="7" fill="#453A2D" />
                  <circle cx="96" cy="118" r="2" fill="#FFFCF6" />
                  <ellipse cx="142" cy="120" rx="6" ry="7" fill="#453A2D" />
                  <circle cx="140" cy="118" r="2" fill="#FFFCF6" />

                  {/* Little 'o' mouth */}
                  <ellipse cx="120" cy="130" rx="4" ry="5" fill="#453A2D" />
                </g>
              ) : (
                <g>
                  <g className="animate-blink">
                    <ellipse cx="98" cy="122" rx="4.5" ry="5.5" fill="#453A2D" />
                    <circle cx="96" cy="120" r="1.2" fill="#FFFCF6" />
                    <ellipse cx="142" cy="122" rx="4.5" ry="5.5" fill="#453A2D" />
                    <circle cx="140" cy="120" r="1.2" fill="#FFFCF6" />
                  </g>
                  <ellipse cx="88" cy="128" rx="5" ry="3.5" fill="#FF8EA3" opacity="0.5" />
                  <ellipse cx="152" cy="128" rx="5" ry="3.5" fill="#FF8EA3" opacity="0.5" />
                  <path
                    d="M113 128 Q120 130 127 128"
                    stroke="#453A2D"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              )}
            </g>
          )}

          {/* ================= STATE 3: MELTING ================= */}
          {state === 'melting' && (
            <g className="origin-bottom">
              <ellipse cx="120" cy="132" rx="68" ry="52" fill="url(#healthyIce)" />

              <path
                d="M60 125 C75 92, 165 92, 180 125 C165 120, 150 136, 135 122 C120 134, 105 122, 90 132 C75 122, 65 126, 60 125 Z"
                fill="url(#meltPink)"
              />
              <path
                d="M74 125 Q76 150 78 158 Q80 162 82 155 Q83 140 85 128 Z"
                fill="#FB7185"
              />
              <path
                d="M156 125 Q158 148 160 156 Q162 160 164 152 Q166 138 168 128 Z"
                fill="#FB7185"
              />

              <ellipse cx="78" cy="166" rx="2.5" ry="3.5" fill="#FB7185" className="animate-syrup-drip" />
              <ellipse cx="160" cy="164" rx="2.5" ry="3.5" fill="#FB7185" className="animate-syrup-drip" />

              <circle cx="114" cy="94" r="5.5" fill="#9B2C2C" />
              <circle cx="126" cy="98" r="5" fill="#742A2A" />
              <rect x="85" y="112" width="7" height="7" rx="1.5" fill="#3E3529" transform="rotate(35 88 115)" />

              {/* Sad Melting Face */}
              <path d="M92 128 Q98 124 104 128" stroke="#453A2D" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M136 128 Q142 124 148 128" stroke="#453A2D" strokeWidth="3" strokeLinecap="round" fill="none" />

              <path
                d="M112 136 Q120 130 128 136"
                stroke="#453A2D"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M162 110 C162 110 168 118 168 122 C168 125 165 127 162 127 C159 127 156 125 156 122 C156 118 162 110 162 110 Z"
                fill="#60A5FA"
                className="animate-pulse-soft"
              />
            </g>
          )}

          {/* ================= BOWL (SHARED BY ALL STATES) ================= */}
          <path
            d="M48 140 C48 140, 52 188, 120 188 C188 188, 192 140, 192 140 Z"
            fill="url(#bowlGrad)"
            stroke="#CFC0A6"
            strokeWidth="3.5"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))"
          />

          {/* ================= STATE 4: MELTED ================= */}
          {state === 'melted' && (
            <g className="origin-bottom">
              <ellipse cx="120" cy="148" rx="66" ry="24" fill="#FECDD3" />
              <ellipse cx="120" cy="150" rx="58" ry="18" fill="#FDA4AF" />
              <ellipse cx="120" cy="152" rx="46" ry="12" fill="#FB7185" />

              <circle cx="85" cy="146" r="6" fill="#9B2C2C" />
              <circle cx="152" cy="148" r="5" fill="#742A2A" />
              <rect x="98" y="144" width="8" height="8" rx="2" fill="#362E24" transform="rotate(15 102 148)" />

              <circle cx="135" cy="145" r="9" fill="url(#goldCoin)" stroke="#B7791F" strokeWidth="1" className="animate-pulse-soft" />
              <text x="135" y="148" fontSize="9" fontWeight="bold" fill="#744210" textAnchor="middle">S$</text>

              <circle cx="106" cy="140" r="3" fill="#574A39" />
              <circle cx="130" cy="140" r="3" fill="#574A39" />
              <line x1="114" y1="144" x2="122" y2="144" stroke="#574A39" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* Bowl Foot Ring */}
          <path
            d="M95 188 L90 196 C90 198, 150 198, 150 196 L145 188 Z"
            fill="#E4D9C6"
            stroke="#CFC0A6"
            strokeWidth="2"
          />
          <path
            d="M58 152 Q120 162 182 152"
            stroke="#E4657F"
            strokeWidth="3"
            strokeDasharray="4 3"
            fill="none"
            opacity="0.7"
          />
        </svg>
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
