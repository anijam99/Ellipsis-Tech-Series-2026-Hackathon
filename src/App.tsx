import React, { useState, useEffect } from 'react';
import { 
  CompanionState, 
  Milestone, 
  GovernmentScheme, 
  SpendingMoment, 
  FeedItem, 
  AppViewMode, 
  ShopProduct, 
  PushNotification 
} from './types';
import { 
  INITIAL_USER, 
  INITIAL_MILESTONES, 
  INITIAL_SCHEMES, 
  SPENDING_REFLECTION_WEEK, 
  LITERACY_FEED_ITEMS 
} from './data/mockData';
import { SHOPPING_PRODUCTS } from './data/shoppingData';

import { DeviceHomeScreen } from './components/os/DeviceHomeScreen';
import { ShoppingApp } from './components/shopping/ShoppingApp';
import { PushNotificationBanner } from './components/PushNotificationBanner';

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
  FileText,
  Volume2,
  VolumeX,
  Bell,
  Home as HomeIcon,
  ShoppingBag,
  Minimize2,
  Sliders
} from 'lucide-react';
import { playSound, toggleSound, isSoundEnabled } from './utils/soundEffects';

export function App() {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<AppViewMode>(() => {
    const v = new URLSearchParams(window.location.search).get('view');
    return v === 'os-home' || v === 'shopping' ? (v as AppViewMode) : 'ice-kaching';
  });

  const [activeTab, setActiveTab] = useState<string>(
    () => new URLSearchParams(window.location.search).get('tab') || 'home',
  );

  // Layout presentation mode: Frame vs Full Mobile Fit (fills browser window)
  const [isMobileFitMode, setIsMobileFitMode] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeNotification, setActiveNotification] = useState<PushNotification | null>(null);

  // Preloaded JITAI item for spending checker
  const [pendingJITAIItem, setPendingJITAIItem] = useState<{ name: string; price: number } | null>(null);

  // Sync URL params
  useEffect(() => {
    const url = new URL(window.location.href);
    if (viewMode === 'ice-kaching') url.searchParams.delete('view');
    else url.searchParams.set('view', viewMode);

    if (activeTab === 'home') url.searchParams.delete('tab');
    else url.searchParams.set('tab', activeTab);

    window.history.replaceState(null, '', url);
  }, [viewMode, activeTab]);

  // App Core State
  const [companionState, setCompanionState] = useState<CompanionState>(() => {
    const q = new URLSearchParams(window.location.search).get('state');
    return (['healthy', 'slipping', 'melting', 'melted'] as const).includes(q as CompanionState)
      ? (q as CompanionState)
      : 'healthy';
  });
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

  const handleToggleSound = () => {
    const res = toggleSound();
    setSoundOn(res);
    if (res) playSound.pop();
  };

  // Two-Stage Automated Notification Flow upon Purchase
  const handlePaymentCompleted = (product: ShopProduct) => {
    // 1st Notification: Apple Wallet / Bank Card Notification
    const walletNotif: PushNotification = {
      id: `wallet_${Date.now()}`,
      appName: 'Apple Wallet',
      title: '💳 DBS Visa Debit (•••• 4921)',
      message: `Payment of S$${product.price}.00 to ShopLah SG was approved.`,
      timeAgo: 'Just now',
    };
    setActiveNotification(walletNotif);

    // 2nd Notification (1.4s later): Ice Kaching JITAI Alert
    setTimeout(() => {
      const jitaiNotif: PushNotification = {
        id: `jitai_${Date.now()}`,
        appName: 'Ice Kaching',
        title: `⚡ JITAI Alert: ${product.name}`,
        message: `Wait Bryan! That S$${product.price} purchase delays your Tengah BTO downpayment by approx ${product.btoDelayDays} days! Tap for second opinion & 24h deferral.`,
        timeAgo: 'Just now',
        actionData: {
          itemName: product.name,
          itemPrice: product.price,
          daysDelayed: product.btoDelayDays,
        }
      };
      setActiveNotification(jitaiNotif);
      playSound.alert();
    }, 1400);
  };

  const handleTapNotification = (notif: PushNotification) => {
    if (notif.actionData) {
      setPendingJITAIItem({
        name: notif.actionData.itemName,
        price: notif.actionData.itemPrice,
      });
      setActiveNotification(null);
      setViewMode('ice-kaching');
      setActiveTab('spending');
    } else {
      setActiveNotification(null);
    }
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
    setViewMode('ice-kaching');
    setActiveTab('home');
    setActiveNotification(null);
    setPendingJITAIItem(null);
  };

  const claimedCount = schemes.filter(s => s.claimed).length;
  const btoMilestone = milestones.find(m => m.id === 'bto-tengah') || milestones[1];

  return (
    <div className={`min-h-screen bg-kachang-shell flex flex-col items-center justify-start text-slate-800 font-sans select-none ${
      isMobileFitMode ? 'p-0' : 'p-2 sm:p-6'
    }`}>
      {/* Top Demo Bar (Hidden in Full Mobile Browser Mode, with floating restore button) */}
      {!isMobileFitMode ? (
        <header className="w-full max-w-5xl mb-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2.5 text-white text-xs shadow-xl">
          <div className="flex items-center gap-2.5">
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
              <p className="text-[11px] text-slate-300 hidden sm:block">
                Singapore Financial Literacy & Support Maximiser Companion
              </p>
            </div>
          </div>

          {/* App Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => {
                playSound.pop();
                setViewMode('os-home');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                viewMode === 'os-home'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              📱 iPhone Home
            </button>
            <button
              onClick={() => {
                playSound.pop();
                setViewMode('ice-kaching');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                viewMode === 'ice-kaching'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🍧 Ice Kaching
            </button>
            <button
              onClick={() => {
                playSound.pop();
                setViewMode('shopping');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                viewMode === 'shopping'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🛍️ ShopLah
            </button>
          </div>

          {/* Companion State Interactive Switcher for Judges */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-300 font-bold px-1.5 uppercase tracking-wider hidden lg:inline">
              Companion:
            </span>
            {(['healthy', 'slipping', 'melting', 'melted'] as CompanionState[]).map(st => (
              <button
                key={st}
                onClick={() => {
                  playSound.pop();
                  setCompanionState(st);
                }}
                className={`px-2 py-1 rounded-lg font-bold text-[10px] capitalize transition-all ${
                  companionState === st
                    ? st === 'healthy'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : st === 'slipping'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : st === 'melting'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Fit Mobile Browser Mode Toggle & Reset */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMobileFitMode(true)}
              title="Fit Mobile Web Browser (Edge-to-Edge)"
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-1 transition-colors shadow-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" /> <span className="hidden md:inline">Fit Mobile Screen</span>
            </button>

            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Mute Audio Effects' : 'Enable Audio Effects'}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs transition-colors border border-slate-700"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 text-pink-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            </button>

            <button
              onClick={handleResetData}
              title="Reset Mock Data"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>
      ) : (
        /* Floating Restore Button when in Mobile Screen Fit Mode */
        <button
          onClick={() => setIsMobileFitMode(false)}
          className="fixed top-2 right-2 z-50 bg-slate-900/90 text-white p-2 rounded-full shadow-2xl border border-slate-700 flex items-center gap-1 text-[11px] font-bold"
          title="Exit Full Mobile Screen"
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Main Container / Mobile Device Wrapper */}
      <main
        className={`w-full transition-all duration-300 flex justify-center ${
          isMobileFitMode ? 'max-w-none h-screen w-full' : 'max-w-[412px]'
        }`}
      >
        <div
          className={`w-full bg-kachang-canvas overflow-hidden flex flex-col relative ${
            isMobileFitMode
              ? 'h-[100dvh] rounded-none border-0 shadow-none'
              : 'h-[852px] rounded-[50px] shadow-2xl border-[9px] border-slate-800 ring-1 ring-slate-700'
          }`}
          style={
            viewMode === 'os-home'
              ? {
                  backgroundImage: 'radial-gradient(circle at 50% 30%, #3b82f6 0%, #1e1b4b 70%, #0f172a 100%)',
                }
              : undefined
          }
        >
          {/* Mobile Status Bar (9:41, Dynamic Island, Battery) */}
          <div
            className={`shrink-0 h-11 px-7 flex items-center justify-between text-xs font-semibold select-none pt-2 z-50 backdrop-blur-xs ${
              viewMode === 'os-home' ? 'text-white bg-transparent' : 'text-slate-800 bg-kachang-canvas/90'
            }`}
          >
            <span>9:41</span>

            {/* Dynamic Island Pill */}
            {!isMobileFitMode && (
              <div 
                onClick={() => {
                  if (activeNotification) {
                    handleTapNotification(activeNotification);
                  }
                }}
                className={`h-5 rounded-full mx-auto flex items-center justify-between px-2 cursor-pointer transition-all duration-300 ${
                  activeNotification ? 'w-36 bg-slate-900 ring-2 ring-pink-500/50' : 'w-24 bg-black'
                }`}
              >
                {activeNotification ? (
                  <span className="text-[9px] text-pink-300 font-bold truncate">🍧 JITAI Alert</span>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 ml-auto" />
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Top Push Notification Banner */}
          <PushNotificationBanner
            notification={activeNotification}
            onDismiss={() => setActiveNotification(null)}
            onTap={handleTapNotification}
          />

          {/* View Mode Router */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            {/* VIEW 1: Phone OS Home Screen (with Widget Screen on Left Swipe) */}
            {viewMode === 'os-home' && (
              <DeviceHomeScreen
                companionState={companionState}
                streakWeeks={streakWeeks}
                onCheckin={handleCheckin}
                lastCheckin={lastCheckin}
                unclaimedGrantsCount={schemes.filter(s => !s.claimed).length}
                btoMilestone={btoMilestone}
                onLaunchApp={(app, initialTab) => {
                  if (app === 'ice-kaching') {
                    setViewMode('ice-kaching');
                    if (initialTab) setActiveTab(initialTab);
                  } else {
                    setViewMode('shopping');
                  }
                }}
              />
            )}

            {/* VIEW 2: ShopLah E-Commerce Shopping App */}
            {viewMode === 'shopping' && (
              <ShoppingApp
                onBackToHome={() => {
                  playSound.pop();
                  setViewMode('os-home');
                }}
                onPaymentCompleted={(product) => {
                  handlePaymentCompleted(product);
                }}
              />
            )}

            {/* VIEW 3: Ice Kaching App */}
            {viewMode === 'ice-kaching' && (
              <>
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
                      onOpenShoppingApp={() => setViewMode('shopping')}
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
                      initialItemName={pendingJITAIItem?.name}
                      initialItemPrice={pendingJITAIItem?.price}
                      onClosePurchaseChecker={() => setPendingJITAIItem(null)}
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
                  onTabChange={(tab) => {
                    playSound.pop();
                    setActiveTab(tab);
                  }}
                  unclaimedCount={schemes.filter(s => !s.claimed).length}
                />
              </>
            )}
          </div>

          {/* iPhone Home Indicator Bar (Tap to go home) */}
          <div
            onClick={() => {
              playSound.pop();
              setViewMode('os-home');
            }}
            title="Tap to return to Phone Home Screen"
            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900/40 hover:bg-pink-500 rounded-full cursor-pointer transition-colors z-50"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
