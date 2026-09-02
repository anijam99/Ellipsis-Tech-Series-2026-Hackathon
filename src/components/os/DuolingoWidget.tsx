import React, { useState } from 'react';
import { CompanionState, Milestone } from '../../types';
import { CompanionAvatar } from '../CompanionAvatar';
import { Flame, CheckCircle2, Building2, Sparkles, ChevronRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/soundEffects';

interface DuolingoWidgetProps {
  companionState: CompanionState;
  streakWeeks: number;
  onCheckin: () => void;
  lastCheckin: string;
  btoMilestone: Milestone;
  onOpenApp: (tab?: string) => void;
}

export const DuolingoWidget: React.FC<DuolingoWidgetProps> = ({
  companionState,
  streakWeeks,
  onCheckin,
  btoMilestone,
  onOpenApp,
}) => {
  const [checked, setChecked] = useState(false);

  const handleWidgetCheckin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (checked) return;
    setChecked(true);
    playSound.coin();
    onCheckin();
    confetti({
      particleCount: 50,
      spread: 55,
      origin: { y: 0.5 },
      colors: ['#E4657F', '#C08A3C', '#6E9670']
    });
  };

  const statusText = {
    healthy: 'Shaved ice is sweet & full! ✨',
    slipping: 'A little drift this week 🥣',
    melting: 'Syrup melting! Check cart 🥺',
    melted: 'Puddle alert! S$212 over 💔',
  }[companionState];

  return (
    <div
      onClick={() => onOpenApp('home')}
      className="w-full bg-gradient-to-br from-white via-white/95 to-pink-50/80 rounded-[28px] p-4 shadow-float border border-white/80 backdrop-blur-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group relative overflow-hidden select-none"
    >
      {/* Background Decorative Accent Ring */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-pink-100/50 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-amber-100/40 rounded-full blur-xl pointer-events-none" />

      {/* Top Header: App Name & Streak Pill */}
      <div className="flex items-center justify-between relative z-10 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-base">🍧</span>
          <span className="font-black text-xs tracking-tight text-slate-900">Ice Kaching</span>
          <span className="text-[10px] font-bold text-pink-700 bg-pink-100/80 px-1.5 py-0.2 rounded-md">LIVE</span>
        </div>

        {/* Streak Flame Pill (Duolingo Style) */}
        <div className="flex items-center gap-1 bg-amber-100/90 text-amber-800 border border-amber-300/70 px-2 py-0.5 rounded-full text-xs font-black shadow-xs">
          <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse-soft" />
          <span>{streakWeeks} WKS</span>
        </div>
      </div>

      {/* Main Content Grid: Animated Companion + Live Status */}
      <div className="grid grid-cols-12 gap-2 items-center relative z-10">
        {/* Companion Avatar */}
        <div className="col-span-4 flex items-center justify-center">
          <CompanionAvatar
            state={companionState}
            size="sm"
            interactive={true}
            className="scale-110 drop-shadow-sm"
          />
        </div>

        {/* Info & Speech */}
        <div className="col-span-8 space-y-1">
          <p className="text-xs font-extrabold text-slate-900 leading-tight">
            {statusText}
          </p>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <Building2 className="w-3 h-3 text-pink-600" />
            <span>Tengah BTO: <strong>14% saved</strong></span>
          </div>

          {/* Mini progress bar */}
          <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: '14%' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Strip: Quick Check-in Button */}
      <div className="mt-3 pt-2 border-t border-slate-100/80 flex items-center justify-between relative z-10">
        <button
          onClick={handleWidgetCheckin}
          disabled={checked}
          className={`px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 transition-all shadow-xs ${
            checked
              ? 'bg-emerald-500 text-white shadow-emerald-200'
              : 'bg-pink-500 hover:bg-pink-600 active:scale-95 text-white shadow-pink-200'
          }`}
        >
          {checked ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" /> Checked In!
            </>
          ) : (
            <>
              <Zap className="w-3 h-3 fill-white" /> Quick Check-in
            </>
          )}
        </button>

        <span className="text-[11px] font-bold text-slate-400 group-hover:text-pink-600 flex items-center transition-colors">
          Open App <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
