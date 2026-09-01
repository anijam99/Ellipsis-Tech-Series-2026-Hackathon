import React, { useState } from 'react';
import { CompanionState, Milestone } from '../../types';
import { CompanionAvatar } from '../CompanionAvatar';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Gift, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2,
  Coins,
  Building2,
  Calendar
} from 'lucide-react';

interface HomeScreenProps {
  companionState: CompanionState;
  onStateChange: (state: CompanionState) => void;
  streakWeeks: number;
  onCheckin: () => void;
  lastCheckin: string;
  claimedGrantsCount: number;
  btoMilestone: Milestone;
  onNavigate: (tab: string) => void;
  onOpenPurchaseCheck: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  companionState,
  onStateChange,
  streakWeeks,
  onCheckin,
  lastCheckin,
  claimedGrantsCount,
  btoMilestone,
  onNavigate,
  onOpenPurchaseCheck,
}) => {
  const [checkedToday, setCheckedToday] = useState(false);
  const [speechBubble, setSpeechBubble] = useState(
    "Good morning Bryan! You're on track for your Tengah 4-room BTO!"
  );

  const handleCompanionClick = () => {
    const quotes = {
      healthy: [
        "Your bowl is sweet and full! 🍧 S$1,050 saved this month!",
        "7-week streak! You're building durable financial muscle 💪",
        "Tip: Check if you qualify for the Enhanced CPF Housing Grant!"
      ],
      slipping: [
        "A little drift this week, but you've got this! Let's check in 🥣",
        "Keep your eye on that Mar 2029 Tengah key collection date!",
        "Check your spending reflection to keep your syrup bright ✨"
      ],
      melting: [
        "Oh no, the dome is slumping! Delivery supper melted 5 days 🥺",
        "Tap Purchase Check before buying that next Shopee cart item!",
        "Don't worry, one solid week will top this bowl right back up!"
      ],
      melted: [
        "Puddle alert! S$212 drifted over budget this month 💔",
        "Let's do a fast check-in and rebalance your savings route.",
        "Your coins and CPF are safe. Let's restart your streak today!"
      ]
    };
    const pool = quotes[companionState];
    const nextQuote = pool[Math.floor(Math.random() * pool.length)];
    setSpeechBubble(nextQuote);
  };

  const handleCheckinClick = () => {
    if (checkedToday) return;
    setCheckedToday(true);
    onCheckin();
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FF6B8B', '#48BB78', '#ECC94B', '#9F7AEA']
    });
    setSpeechBubble("🎉 Check-in logged! 7-week streak locked in! Your shaved ice stays sweet & full!");
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-4 pb-24 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {companionState === 'healthy' && "You're on track"}
            {companionState === 'slipping' && "Watch your pace"}
            {companionState === 'melting' && "Syrup running low"}
            {companionState === 'melted' && "Time to recharge"}
          </h1>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Bryan Tan
          </span>
        </div>
        <p className="text-sm text-slate-500 font-medium">
          {streakWeeks} weeks of check-ins, unbroken since 5 Jul
        </p>
      </div>

      {/* Hero Companion Area */}
      <div className="relative flex flex-col items-center justify-center py-2 bg-gradient-to-b from-pink-50/50 via-white to-slate-50/40 rounded-3xl border border-pink-100/70 shadow-sm p-4">
        {/* Interactive Speech Bubble */}
        <div className="relative mb-2 px-4 py-2 bg-white/95 rounded-2xl border border-pink-100 shadow-soft max-w-[280px] text-center animate-fade-in">
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            "{speechBubble}"
          </p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-pink-100 rotate-45"></div>
        </div>

        {/* The Animated Ice Kachang Companion */}
        <CompanionAvatar
          state={companionState}
          size="hero"
          interactive={true}
          onClick={handleCompanionClick}
        />

        {/* Quick state description pill */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${
            companionState === 'healthy' ? 'bg-emerald-500 animate-pulse' :
            companionState === 'slipping' ? 'bg-amber-500' :
            companionState === 'melting' ? 'bg-orange-500 animate-pulse' :
            'bg-rose-500'
          }`} />
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Companion Status: {companionState}
          </span>
        </div>
      </div>

      {/* 3 Metric Summary Cards (Exact 1:1 Match with PDF Screen 1) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Streak */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-pink-200 transition-colors">
          <span className="text-[11px] font-semibold text-slate-400 leading-tight">
            Check-in<br />streak
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">{streakWeeks}</span>
            <span className="text-xs font-semibold text-slate-500">wks</span>
          </div>
        </div>

        {/* Next Milestone */}
        <div 
          onClick={() => onNavigate('journey')}
          className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex flex-col justify-between cursor-pointer hover:border-pink-200 transition-colors group"
        >
          <span className="text-[11px] font-semibold text-slate-400 leading-tight">
            Next<br />milestone
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">31</span>
            <span className="text-xs font-semibold text-slate-500">mths</span>
          </div>
        </div>

        {/* Grants Claimed */}
        <div 
          onClick={() => onNavigate('support')}
          className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex flex-col justify-between cursor-pointer hover:border-pink-200 transition-colors group"
        >
          <span className="text-[11px] font-semibold text-slate-400 leading-tight">
            Grants<br />claimed
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-pink-600">{claimedGrantsCount}</span>
            <span className="text-xs font-semibold text-slate-500">/ 5</span>
          </div>
        </div>
      </div>

      {/* Main Check-In Button (From PDF Screen 1) */}
      <div className="space-y-1.5 text-center">
        <button
          onClick={handleCheckinClick}
          disabled={checkedToday}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-md ${
            checkedToday
              ? 'bg-emerald-500 text-white shadow-emerald-200 cursor-default'
              : 'bg-[#FF6B8B] hover:bg-[#fa5578] active:scale-[0.99] text-white shadow-pink-200 hover:shadow-lg'
          }`}
        >
          {checkedToday ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Checked In for Sunday!
            </span>
          ) : (
            'Check in'
          )}
        </button>
        <p className="text-xs text-slate-400 font-medium">
          {checkedToday ? 'Next check-in available tomorrow' : `Last check-in ${lastCheckin}`}
        </p>
      </div>

      {/* Target Milestone Quick Card */}
      <div 
        onClick={() => onNavigate('journey')}
        className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Tengah 4-Room BTO</h3>
              <p className="text-[11px] text-slate-400">Key Collection: Mar 2029</p>
            </div>
          </div>
          <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
            14% Saved
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-700" style={{ width: '14%' }} />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>S$5,450 saved</span>
          <span>S$38,000 target</span>
        </div>
      </div>

      {/* Quick Action: Just-In-Time Purchase Check */}
      <div 
        onClick={onOpenPurchaseCheck}
        className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50/60 rounded-2xl p-4 border border-amber-200/80 shadow-sm cursor-pointer hover:border-amber-300 transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-slate-900">Just-In-Time Purchase Check</h4>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">JITAI</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Deciding on a purchase? Check days delayed on BTO.
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
