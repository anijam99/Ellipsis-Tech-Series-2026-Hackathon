import React, { useState, useEffect } from 'react';
import { SPENDING_REFLECTION_WEEK } from '../../data/mockData';
import { SpendingMoment, CompanionState } from '../../types';
import { CompanionAvatar } from '../CompanionAvatar';
import {
  TrendingDown,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Calculator,
  RefreshCw,
  Zap,
  History,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/soundEffects';

interface SpendingScreenProps {
  moments: SpendingMoment[];
  onAddMoment: (moment: SpendingMoment) => void;
  companionState: CompanionState;
  onStateChange: (state: CompanionState) => void;
  showPurchaseCheckerModal?: boolean;
  onClosePurchaseChecker?: () => void;
  initialItemName?: string;
  initialItemPrice?: number;
}

interface PurchaseHistoryEntry {
  id: string;
  itemName: string;
  price: number;
  daysDelayed: number;
  decision: 'deferred' | 'purchased';
  timestamp: string;
}

export const SpendingScreen: React.FC<SpendingScreenProps> = ({
  moments,
  onAddMoment,
  companionState,
  onStateChange,
  showPurchaseCheckerModal = false,
  onClosePurchaseChecker,
  initialItemName,
  initialItemPrice,
}) => {
  const [activeTab, setActiveTab] = useState<'reflection' | 'checker'>(
    initialItemName || showPurchaseCheckerModal ? 'checker' : 'reflection'
  );

  // Purchase checker state
  const [itemName, setItemName] = useState(initialItemName || 'Sony WH-1000XM5 Headphones');
  const [itemPrice, setItemPrice] = useState<number>(initialItemPrice || 489);
  const [checkerResult, setCheckerResult] = useState<{
    daysDelayed: number;
    companionReaction: CompanionState;
    analysis: string;
  } | null>(null);

  // Purchase history
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (initialItemName) {
      setItemName(initialItemName);
    }
    if (initialItemPrice) {
      setItemPrice(initialItemPrice);
      calculatePurchaseImpact(initialItemPrice);
      setActiveTab('checker');
    } else {
      calculatePurchaseImpact(itemPrice);
    }
  }, [initialItemName, initialItemPrice]);

  const calculatePurchaseImpact = (price: number) => {
    // Bryan saves ~$1050/mo = ~$35/day
    const dailySaveRate = 35;
    const days = Math.max(1, Math.round(price / dailySaveRate));
    let reaction: CompanionState = 'slipping';
    if (price > 400) reaction = 'melting';
    if (price > 800) reaction = 'melted';

    setCheckerResult({
      daysDelayed: days,
      companionReaction: reaction,
      analysis: `Buying this delays your Tengah BTO downpayment by approx ${days} days (${Math.round((days / 30) * 10) / 10} months).`,
    });
  };

  const addToHistory = (decision: 'deferred' | 'purchased', days: number) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' });
    const entry: PurchaseHistoryEntry = {
      id: `h_${Date.now()}`,
      itemName: itemName || 'Unknown item',
      price: itemPrice,
      daysDelayed: days,
      decision,
      timestamp: `Today, ${timeStr}`,
    };
    setPurchaseHistory(prev => [entry, ...prev]);
    setShowHistory(true);
  };

  const handleWait24Hours = () => {
    if (!itemPrice) return;
    const days = Math.round(itemPrice / 35);
    const newMoment: SpendingMoment = {
      id: `m_${Date.now()}`,
      title: `Waited 24 hours on ${itemName || 'impulse item'}`,
      amount: itemPrice,
      isPositive: true,
      btoImpact: `Kept ${days} days of BTO deposit where they were.`,
      note: 'Decided to defer impulse purchase via JITAI check',
      date: 'Today',
      category: 'savings',
    };
    playSound.celebrate();
    onAddMoment(newMoment);
    onStateChange('healthy');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6E9670', '#E4657F', '#C08A3C'],
    });
    addToHistory('deferred', days);
    setCheckerResult(null);
    if (onClosePurchaseChecker) onClosePurchaseChecker();
  };

  const handleProceedBuy = () => {
    if (!itemPrice) return;
    const days = Math.round(itemPrice / 35);
    const newMoment: SpendingMoment = {
      id: `m_${Date.now()}`,
      title: itemName || 'Online purchase',
      amount: itemPrice,
      isPositive: false,
      btoImpact: `Pushed key collection back about ${days} days.`,
      note: 'Completed purchase after intentional reflection',
      date: 'Today',
      category: 'impulse',
    };
    playSound.melt();
    onAddMoment(newMoment);
    onStateChange('slipping');
    addToHistory('purchased', days);
    setCheckerResult(null);
    if (onClosePurchaseChecker) onClosePurchaseChecker();
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto [&>*]:shrink-0 px-5 py-4 pb-24 space-y-4 select-none">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your Week</h1>
        <p className="text-xs text-slate-500 font-medium">Mon 17 – Sun 23 Aug 2026</p>
      </div>

      {/* Segment Switcher */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => {
            playSound.pop();
            setActiveTab('reflection');
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'reflection'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Weekly Reflection
        </button>
        <button
          onClick={() => {
            playSound.pop();
            setActiveTab('checker');
            calculatePurchaseImpact(itemPrice);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'checker'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> JITAI Purchase Check
          {purchaseHistory.length > 0 && (
            <span className="bg-pink-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
              {purchaseHistory.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'reflection' ? (
        <>
          {/* Top Summary Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Could have been saved</span>
                <span className="text-3xl font-extrabold text-slate-900">S$212</span>
              </div>
              <div className="w-14 h-14 flex items-center justify-center">
                <CompanionAvatar state="slipping" size="sm" />
              </div>
            </div>

            {/* Reflection Quote */}
            <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              "{SPENDING_REFLECTION_WEEK.reflectionQuote}"
            </p>

            {/* Progress Bar */}
            <div className="pt-1">
              {(() => {
                const spent = SPENDING_REFLECTION_WEEK.spent;
                const planned = SPENDING_REFLECTION_WEEK.planned;
                const over = Math.max(0, spent - planned);
                const scale = Math.max(spent, planned);
                const plannedPct = (Math.min(planned, spent) / scale) * 100;
                const overPct = (over / scale) * 100;

                return (
                  <>
                    <div className="flex items-baseline justify-between text-xs font-bold">
                      <span className="text-slate-600">
                        Spent <span className="tnum text-slate-900">S${spent}</span>
                      </span>
                      <span className="tnum text-orange-600">S${over} over plan</span>
                    </div>

                    <div
                      className="mt-1.5 flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100"
                      role="img"
                    >
                      <div
                        className="h-full bg-emerald-400"
                        style={{ width: `${plannedPct}%` }}
                      />
                      <div
                        className="h-full bg-orange-400"
                        style={{ width: `${overPct}%` }}
                      />
                    </div>

                    <div className="mt-2 flex items-center gap-4 text-[11px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Planned <span className="tnum text-slate-700">S${planned}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-orange-400" />
                        Over
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Moments List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
              Three moments that moved the needle
            </h3>

            <div className="space-y-2.5">
              {moments.map((moment) => (
                <div
                  key={moment.id}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-start gap-3 hover:border-slate-200 transition-colors"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                      moment.isPositive ? 'bg-emerald-500' : 'bg-orange-400'
                    }`}
                  />

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">
                        {moment.title}
                      </h4>
                      <span
                        className={`text-xs font-extrabold ${
                          moment.isPositive ? 'text-emerald-600' : 'text-orange-500'
                        }`}
                      >
                        {moment.isPositive ? `+S$${moment.amount}` : `S$${moment.amount}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {moment.btoImpact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Just-In-Time Feature Promo */}
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-4 border border-pink-200/60 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <ShoppingBag className="w-4 h-4 text-pink-600" />
              <span>Share Sheet Integration (JITAI)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When shopping on ShopLah, Shopee or Lazada, share any product page to Ice Kaching. Our JITAI engine computes the opportunity cost in BTO days before you tap buy!
            </p>
            <button
              onClick={() => {
                playSound.pop();
                setActiveTab('checker');
                calculatePurchaseImpact(itemPrice);
              }}
              className="text-pink-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              Test purchase checker simulator <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </>
      ) : (
        /* ================= PURCHASE CHECKER SIMULATOR ================= */
        <>
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Second Opinion at Checkout
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Just-In-Time Purchase Check
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Pricing purchases in plain language: days off your BTO deposit.
              </p>
            </div>

            {/* Preset Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Try realistic items:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Sony XM5 Headphones', price: 489 },
                  { name: 'Labubu Secret Box', price: 188 },
                  { name: 'Apple iPad Air M2', price: 899 },
                  { name: 'Dyson Supersonic Nural', price: 649 },
                  { name: 'On Cloudmonster 2', price: 289 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playSound.pop();
                      setItemName(preset.name);
                      setItemPrice(preset.price);
                      calculatePurchaseImpact(preset.price);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      itemName === preset.name
                        ? 'bg-pink-500 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-pink-100 text-slate-700'
                    }`}
                  >
                    {preset.name} (S${preset.price})
                  </button>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Item or Cart Description</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Sony Headphones"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Price (S$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">S$</span>
                  <input
                    type="number"
                    value={itemPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setItemPrice(val);
                      calculatePurchaseImpact(val);
                    }}
                    placeholder="0"
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Live Impact Calculation Result */}
            {checkerResult && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                    <CompanionAvatar state={checkerResult.companionReaction} size="sm" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                      Opportunity Cost
                    </span>
                    <p className="text-sm font-extrabold text-slate-900">
                      Costs <span className="text-pink-600">{checkerResult.daysDelayed} days</span> off your BTO flat deposit
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed border-t border-amber-200/60 pt-2">
                  {checkerResult.analysis} You are never scolded — only given the second opinion a shopping app won't provide.
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleWait24Hours}
                    className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Clock className="w-3.5 h-3.5" /> Wait 24 Hours
                  </button>
                  <button
                    onClick={handleProceedBuy}
                    className="py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Buy It Anyway
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ================= PURCHASE HISTORY ================= */}
          <div className="space-y-2">
            <button
              onClick={() => { playSound.pop(); setShowHistory(h => !h); }}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider px-1 py-1"
            >
              <span className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-pink-500" />
                Previous Checks
                {purchaseHistory.length > 0 && (
                  <span className="bg-pink-100 text-pink-700 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {purchaseHistory.length}
                  </span>
                )}
              </span>
              {purchaseHistory.length > 0 && (
                showHistory
                  ? <ChevronUp className="w-4 h-4 text-slate-400" />
                  : <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {purchaseHistory.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center space-y-1">
                <span className="text-2xl">🧾</span>
                <p className="text-xs text-slate-400 font-medium">
                  No previous checks yet — try a purchase above!
                </p>
              </div>
            ) : showHistory ? (
              <div className="space-y-2 animate-fade-in">
                {purchaseHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center gap-3"
                  >
                    {/* Decision icon */}
                    <div
                      className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                        entry.decision === 'deferred'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      {entry.decision === 'deferred' ? (
                        <Clock className="w-4 h-4" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{entry.itemName}</h4>
                        <span
                          className={`shrink-0 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                            entry.decision === 'deferred'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-orange-100 text-orange-600'
                          }`}
                        >
                          {entry.decision === 'deferred' ? '✓ Deferred' : '× Purchased'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-extrabold text-orange-600">S${entry.price}</span>
                        <span className="text-[10px] text-slate-400">·</span>
                        <span className="text-[10px] text-slate-500">
                          <span className="font-bold text-pink-600">{entry.daysDelayed}d</span> BTO delay
                        </span>
                        <span className="text-[10px] text-slate-400">·</span>
                        <span className="text-[10px] text-slate-400">{entry.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <button
                onClick={() => setShowHistory(true)}
                className="w-full bg-slate-50 rounded-2xl p-3 border border-slate-100 text-xs text-slate-500 font-medium text-center hover:bg-slate-100 transition-colors"
              >
                Show {purchaseHistory.length} past check{purchaseHistory.length !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
