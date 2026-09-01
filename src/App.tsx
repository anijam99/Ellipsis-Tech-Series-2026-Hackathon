import React, { useState } from 'react';
import { CompanionState, Milestone, GovernmentScheme, SpendingMoment, FeedItem } from './types';
import { 
  INITIAL_USER, 
  INITIAL_MILESTONES, 
  INITIAL_SCHEMES, 
  SPENDING_REFLECTION_WEEK, 
  LITERACY_FEED_ITEMS 
} from './data/mockData';

import { HomeScreen } from './components/screens/HomeScreen';
import { JourneyScreen } from './components/screens/JourneyScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { SpendingScreen } from './components/screens/SpendingScreen';
import { ProfileChatScreen } from './components/screens/ProfileChatScreen';
import { FeedScreen } from './components/screens/FeedScreen';
import { BottomNav } from './components/BottomNav';

import { 
  Smartphone, 
  Maximize2, 
  Sparkles, 
  RotateCcw, 
  Info, 
  Wifi, 
  Battery, 
  Signal, 
  MessageSquareHeart,
  FileText
} from 'lucide-react';

export function App() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [showPurchaseCheckerModal, setShowPurchaseCheckerModal] = useState<boolean>(false);

  // App Core State
  const [companionState, setCompanionState] = useState<CompanionState>('healthy');
  const [streakWeeks, setStreakWeeks] = useState<number>(INITIAL_USER.streakWeeks);
  const [lastCheckin, setLastCheckin] = useState<string>(INITIAL_USER.lastCheckinDate);
  const [profileCompleteness, setProfileCompleteness] = useState<number>(INITIAL_USER.profileCompleteness);
  const [userSavings, setUserSavings] = useState<number>(INITIAL_USER.totalSaved);
  const [cpfOA, setCpfOA] = useState<number>(INITIAL_USER.cpfOABalance);

  // Lists
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>(INITIAL_SCHEMES);
  const [spendingMoments, setSpendingMoments] = useState<SpendingMoment[]>(
    SPENDING_REFLECTION_WEEK.moments
  );
  const [feedItems, setFeedItems] = useState<FeedItem[]>(LITERACY_FEED_ITEMS);

  // Handlers
  const handleCheckin = () => {
    setStreakWeeks(prev => prev + 1);
    setLastCheckin('Just now');
    setCompanionState('healthy');
  };

  const handleClaimScheme = (id: string) => {
    setSchemes(prev =>
      prev.map(s => (s.id === id ? { ...s, claimed: true } : s))
    );
  };

  const handleAddSpendingMoment = (moment: SpendingMoment) => {
    setSpendingMoments(prev => [moment, ...prev]);
    if (moment.isPositive) {
      setUserSavings(prev => prev + moment.amount);
    }
  };

  const handleToggleFollow = (id: string) => {
    setFeedItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isFollowed: !item.isFollowed } : item
      )
    );
  };

  const handleResetData = () => {
    setCompanionState('healthy');
    setStreakWeeks(INITIAL_USER.streakWeeks);
    setLastCheckin(INITIAL_USER.lastCheckinDate);
    setProfileCompleteness(INITIAL_USER.profileCompleteness);
    setUserSavings(INITIAL_USER.totalSaved);
    setCpfOA(INITIAL_USER.cpfOABalance);
    setSchemes(INITIAL_SCHEMES);
    setSpendingMoments(SPENDING_REFLECTION_WEEK.moments);
    setActiveTab('home');
  };

  const claimedCount = schemes.filter(s => s.claimed).length;
  const btoMilestone = milestones.find(m => m.id === 'bto-tengah') || milestones[1];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start p-2 sm:p-6 text-slate-800 font-sans">
      {/* Top Hackathon Demo Control Bar */}
      <header className="w-full max-w-5xl mb-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-white text-xs shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center font-bold text-white shadow-md text-base">
            🍧
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm tracking-tight text-white">
                Ice Kaching
              </h1>
              <span className="bg-pink-500/20 text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                Team Soju · Ellipsis 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Singapore Financial Literacy & Support Maximiser Companion
            </p>
          </div>
        </div>

        {/* Companion State Interactive Switcher for Judges */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <span className="text-[10px] text-slate-400 font-bold px-2 uppercase tracking-wider hidden sm:inline">
            Companion State:
          </span>
          {(['healthy', 'slipping', 'melting', 'melted'] as CompanionState[]).map(st => (
            <button
              key={st}
              onClick={() => setCompanionState(st)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] capitalize transition-all ${
                companionState === st
                  ? st === 'healthy'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : st === 'slipping'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : st === 'melting'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* View Toggle & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {isMobileFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Mobile Frame</span>
              </>
            )}
          </button>
          <button
            onClick={handleResetData}
            title="Reset Mock Data"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container / Mobile Device Wrapper */}
      <main
        className={`w-full transition-all duration-300 flex justify-center ${
          isMobileFrame ? 'max-w-[412px]' : 'max-w-2xl'
        }`}
      >
        <div
          className={`w-full bg-[#FDFDFD] overflow-hidden flex flex-col relative ${
            isMobileFrame
              ? 'h-[852px] rounded-[50px] shadow-2xl border-[9px] border-slate-800 ring-1 ring-slate-700'
              : 'min-h-[820px] rounded-3xl shadow-xl border border-slate-200'
          }`}
        >
          {/* Mobile Status Bar (9:41, Dynamic Island, Battery) */}
          <div className="shrink-0 h-11 px-7 flex items-center justify-between text-slate-800 text-xs font-semibold select-none pt-2 z-50 bg-[#FDFDFD]/90 backdrop-blur-xs">
            <span>9:41</span>

            {/* Dynamic Island Pill */}
            {isMobileFrame && (
              <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end pr-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
              </div>
            )}

            <div className="flex items-center gap-1.5 text-slate-800">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Quick Sub-tab Header for Profile Chat (If open) */}
          {activeTab === 'profile-chat' && (
            <div className="px-5 py-2 bg-pink-50 border-b border-pink-100 flex items-center justify-between">
              <span className="text-xs font-bold text-pink-800 flex items-center gap-1">
                <MessageSquareHeart className="w-3.5 h-3.5" /> Profile Wizard Active
              </span>
              <button
                onClick={() => setActiveTab('support')}
                className="text-xs text-pink-600 font-bold hover:underline"
              >
                Back to Schemes
              </button>
            </div>
          )}

          {/* Screen Content Router */}
          <div className="flex-1 relative overflow-hidden">
            {activeTab === 'home' && (
              <HomeScreen
                companionState={companionState}
                onStateChange={setCompanionState}
                streakWeeks={streakWeeks}
                onCheckin={handleCheckin}
                lastCheckin={lastCheckin}
                claimedGrantsCount={claimedCount}
                btoMilestone={btoMilestone}
                onNavigate={(tab) => setActiveTab(tab)}
                onOpenPurchaseCheck={() => {
                  setActiveTab('spending');
                }}
              />
            )}

            {activeTab === 'journey' && (
              <JourneyScreen
                milestones={milestones}
                userSavings={userSavings}
                cpfOA={cpfOA}
              />
            )}

            {activeTab === 'support' && (
              <SupportScreen
                schemes={schemes}
                onClaimScheme={handleClaimScheme}
                profileCompleteness={profileCompleteness}
                onOpenProfileChat={() => setActiveTab('profile-chat')}
              />
            )}

            {activeTab === 'spending' && (
              <SpendingScreen
                moments={spendingMoments}
                onAddMoment={handleAddSpendingMoment}
                companionState={companionState}
                onStateChange={setCompanionState}
                showPurchaseCheckerModal={showPurchaseCheckerModal}
                onClosePurchaseChecker={() => setShowPurchaseCheckerModal(false)}
              />
            )}

            {activeTab === 'profile-chat' && (
              <ProfileChatScreen
                profileCompleteness={profileCompleteness}
                onUpdateCompleteness={setProfileCompleteness}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'feed' && (
              <FeedScreen
                feedItems={feedItems}
                onToggleFollow={handleToggleFollow}
              />
            )}
          </div>

          {/* Bottom Tab Navigation */}
          <BottomNav
            currentTab={activeTab === 'profile-chat' ? 'support' : activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            unclaimedCount={schemes.filter(s => !s.claimed).length}
          />

          {/* iPhone Home Indicator Bar */}
          {isMobileFrame && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/40 rounded-full pointer-events-none z-50" />
          )}
        </div>
      </main>

      {/* Footer info note */}
      <footer className="mt-4 text-center text-xs text-slate-500 space-y-1">
        <p>
          Ice Kaching · Designed for Singapore Gen Z & Young Adults (18–28) · Powered by React + Vite + Tailwind CSS
        </p>
        <p className="text-[11px] text-slate-400">
          Seeded for Bryan Tan (24, Junior Analyst) · Tengah BTO Mar 2029 Goal · Singpass & SGFinDex Schema Ready
        </p>
      </footer>
    </div>
  );
}

export default App;
