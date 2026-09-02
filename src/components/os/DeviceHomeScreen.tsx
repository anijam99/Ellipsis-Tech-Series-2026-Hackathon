import React, { useState } from 'react';
import { CompanionState, Milestone } from '../../types';
import { DuolingoWidget } from './DuolingoWidget';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Settings, 
  Phone, 
  MessageCircle, 
  Compass, 
  Camera,
  Search,
  Sun,
  BatteryCharging,
  Activity,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Image,
  FileText,
  Clock,
  Music,
  CheckCircle2
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface DeviceHomeScreenProps {
  companionState: CompanionState;
  streakWeeks: number;
  onCheckin: () => void;
  lastCheckin: string;
  unclaimedGrantsCount: number;
  btoMilestone: Milestone;
  onLaunchApp: (app: 'ice-kaching' | 'shopping', initialTab?: string) => void;
}

export const DeviceHomeScreen: React.FC<DeviceHomeScreenProps> = ({
  companionState,
  streakWeeks,
  onCheckin,
  lastCheckin,
  unclaimedGrantsCount,
  btoMilestone,
  onLaunchApp,
}) => {
  // Page 0 = Today View (Widgets Screen), Page 1 = Main Home Screen
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentDate = new Date().toLocaleDateString('en-SG', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const handleAppTap = (app: 'ice-kaching' | 'shopping', tab?: string) => {
    playSound.pop();
    onLaunchApp(app, tab);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden select-none relative bg-gradient-to-b from-indigo-950/70 via-slate-900/60 to-black/80 text-white">
      {/* Top Search & Page Switcher Indicator */}
      <div className="pt-2 px-6 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={() => {
            playSound.pop();
            setCurrentPage(currentPage === 0 ? 1 : 0);
          }}
          className="text-[11px] font-bold text-white/80 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 hover:bg-white/25 transition-all shadow-xs"
        >
          {currentPage === 1 ? (
            <>
              <ChevronLeft className="w-3 h-3" /> Left: Widgets
            </>
          ) : (
            <>
              Home Apps <ChevronRight className="w-3 h-3" />
            </>
          )}
        </button>

        {/* Page Dots (iOS Style) */}
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full">
          <button
            onClick={() => {
              playSound.pop();
              setCurrentPage(0);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === 0 ? 'bg-white w-4' : 'bg-white/40'
            }`}
          />
          <button
            onClick={() => {
              playSound.pop();
              setCurrentPage(1);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === 1 ? 'bg-white w-4' : 'bg-white/40'
            }`}
          />
        </div>
      </div>

      {/* Pages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-2 pb-20">
        {/* ================= PAGE 0: TODAY VIEW (APPLE WIDGETS SCREEN) ================= */}
        {currentPage === 0 && (
          <div className="space-y-3.5 animate-fade-in pb-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                Today View
              </span>
              <h2 className="text-xl font-black text-white">{currentDate}</h2>
            </div>

            {/* Spotlight Search in Widget Screen */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-3.5 py-2 flex items-center gap-2 text-white/90 border border-white/15 shadow-xs">
              <Search className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/70">Search widgets & apps...</span>
            </div>

            {/* WIDGET 1: Duolingo-Style Ice Kaching Live Widget */}
            <DuolingoWidget
              companionState={companionState}
              streakWeeks={streakWeeks}
              onCheckin={onCheckin}
              lastCheckin={lastCheckin}
              btoMilestone={btoMilestone}
              onOpenApp={(tab) => handleAppTap('ice-kaching', tab)}
            />

            {/* WIDGET 2: Apple Weather Widget + Battery Widget (2-Column Grid) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Apple Weather Widget */}
              <div className="bg-gradient-to-br from-blue-500/90 to-blue-700/90 backdrop-blur-md rounded-[24px] p-3.5 shadow-float border border-white/20 flex flex-col justify-between h-36 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold block">Singapore</span>
                    <span className="text-3xl font-black">31°</span>
                  </div>
                  <Sun className="w-7 h-7 text-amber-300 fill-amber-300 animate-pulse-soft" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold block">Mostly Sunny</span>
                  <span className="text-[10px] text-blue-100 font-medium">H:33° · L:26° · Air: 32 (Good)</span>
                </div>
              </div>

              {/* Apple Battery Widget */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-[24px] p-3.5 shadow-float border border-white/15 flex flex-col justify-between h-36 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-white/80 uppercase">Batteries</span>
                  <BatteryCharging className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1 text-[11px] text-white/80">📱 iPhone</span>
                    <span className="text-emerald-400">94%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1 text-[11px] text-white/80">⌚ Apple Watch</span>
                    <span className="text-emerald-400">88%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1 text-[11px] text-white/80">🎧 AirPods</span>
                    <span className="text-emerald-400">100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WIDGET 3: Apple Fitness Activity Rings Widget */}
            <div className="bg-slate-900/85 backdrop-blur-md rounded-[24px] p-3.5 shadow-float border border-white/15 flex items-center justify-between text-white">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-white/80 uppercase flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-rose-500" /> Fitness Activity
                </span>
                <p className="text-xs font-bold text-slate-200">Move: <strong className="text-rose-400">480/600 kcal</strong></p>
                <p className="text-xs font-bold text-slate-200">Exercise: <strong className="text-emerald-400">32/30m</strong></p>
              </div>

              {/* Concentric Rings Mockup */}
              <div className="w-14 h-14 relative flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-4 border-rose-500/80 border-t-rose-400 absolute" />
                <div className="w-10 h-10 rounded-full border-4 border-emerald-500/80 border-r-emerald-400 absolute" />
                <div className="w-6 h-6 rounded-full border-4 border-cyan-500/80 absolute" />
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 1: MAIN IPHONE HOME SCREEN ================= */}
        {currentPage === 1 && (
          <div className="space-y-6 animate-fade-in my-auto pt-2">
            {/* Clock & Date Header */}
            <div className="space-y-0.5 text-center mt-2">
              <p className="text-xs font-semibold text-white/90 drop-shadow-md tracking-wide">
                {currentDate}
              </p>
              <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-lg">
                09:41
              </h1>
            </div>

            {/* App Grid (iOS 18 Authentic Icons Layout) */}
            <div className="grid grid-cols-4 gap-y-5 gap-x-3 px-1">
              {/* 1. Ice Kaching App */}
              <button
                onClick={() => handleAppTap('ice-kaching', 'home')}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-float group-hover:scale-105 active:scale-95 transition-all relative flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-[16px] flex items-center justify-center text-2xl shadow-inner">
                    🍧
                  </div>
                  {unclaimedGrantsCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                      {unclaimedGrantsCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md truncate max-w-[62px]">
                  Ice Kaching
                </span>
              </button>

              {/* 2. ShopLah E-Commerce App */}
              <button
                onClick={() => handleAppTap('shopping')}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shadow-float group-hover:scale-105 active:scale-95 transition-all relative flex items-center justify-center">
                  <div className="w-full h-full bg-orange-600 rounded-[16px] flex items-center justify-center text-white shadow-inner">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md truncate max-w-[62px]">
                  ShopLah
                </span>
              </button>

              {/* 3. Singpass App */}
              <button
                onClick={() => handleAppTap('ice-kaching', 'support')}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-tr from-red-600 to-rose-700 p-0.5 shadow-float group-hover:scale-105 active:scale-95 transition-all relative flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-[16px] flex items-center justify-center text-red-600 font-extrabold text-xs shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md truncate max-w-[62px]">
                  Singpass
                </span>
              </button>

              {/* 4. DBS digibank App */}
              <button
                onClick={() => handleAppTap('ice-kaching', 'journey')}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-tr from-red-700 to-slate-900 p-0.5 shadow-float group-hover:scale-105 active:scale-95 transition-all relative flex items-center justify-center">
                  <div className="w-full h-full bg-red-800 rounded-[16px] flex items-center justify-center text-white shadow-inner">
                    <CreditCard className="w-7 h-7" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md truncate max-w-[62px]">
                  digibank
                </span>
              </button>

              {/* 5. Apple Photos */}
              <div className="flex flex-col items-center gap-1.5 opacity-90">
                <div className="w-14 h-14 rounded-[18px] bg-white flex items-center justify-center text-2xl shadow-float">
                  <Image className="w-7 h-7 text-amber-500" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">Photos</span>
              </div>

              {/* 6. Apple Maps */}
              <div className="flex flex-col items-center gap-1.5 opacity-90">
                <div className="w-14 h-14 rounded-[18px] bg-emerald-500 flex items-center justify-center text-white shadow-float">
                  <MapPin className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">Maps</span>
              </div>

              {/* 7. Apple Calendar */}
              <div className="flex flex-col items-center gap-1.5 opacity-90">
                <div className="w-14 h-14 rounded-[18px] bg-white flex flex-col items-center justify-center text-red-600 shadow-float">
                  <span className="text-[9px] font-bold uppercase">SEP</span>
                  <span className="text-xl font-black text-slate-900 leading-none">2</span>
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">Calendar</span>
              </div>

              {/* 8. Apple Settings */}
              <div className="flex flex-col items-center gap-1.5 opacity-90">
                <div className="w-14 h-14 rounded-[18px] bg-slate-600 flex items-center justify-center text-white shadow-float">
                  <Settings className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">Settings</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* iOS Frosted Glass App Dock at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-xl rounded-[32px] p-3 border border-white/25 shadow-float flex items-center justify-around z-20">
        <button className="w-12 h-12 rounded-[16px] bg-emerald-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform">
          <Phone className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-[16px] bg-emerald-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </button>
        <button 
          onClick={() => handleAppTap('ice-kaching', 'feed')}
          className="w-12 h-12 rounded-[16px] bg-blue-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          <Compass className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-[16px] bg-slate-700 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform">
          <Camera className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
