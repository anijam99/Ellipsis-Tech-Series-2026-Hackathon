import React, { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpendingScreenProps {
  moments: SpendingMoment[];
  onAddMoment: (moment: SpendingMoment) => void;
  companionState: CompanionState;
  onStateChange: (state: CompanionState) => void;
  showPurchaseCheckerModal?: boolean;
  onClosePurchaseChecker?: () => void;
}

export const SpendingScreen: React.FC<SpendingScreenProps> = ({
  moments,
  onAddMoment,
  companionState,
  onStateChange,
  showPurchaseCheckerModal = false,
  onClosePurchaseChecker,
}) => {
  const [activeTab, setActiveTab] = useState<'reflection' | 'checker'>('reflection');
  
  // Purchase checker state
  const [itemName, setItemName] = useState('Sony WH-1000XM5 Headphones');
  const [itemPrice, setItemPrice] = useState<number>(489);
  const [checkerResult, setCheckerResult] = useState<{
    daysDelayed: number;
    companionReaction: CompanionState;
    analysis: string;
  } | null>(null);

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
      analysis: `Buying this delays your Tengah BTO downpayment by approx ${days} days (${Math.round((days/30)*10)/10} months).`,
    });
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
    onAddMoment(newMoment);
    onStateChange('healthy');
    confetti({
      particleCount: 70,
      spread: 60,
      colors: ['#48BB78', '#FF6B8B', '#ECC94B']
    });
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
    onAddMoment(newMoment);
    onStateChange('slipping');
    setCheckerResult(null);
    if (onClosePurchaseChecker) onClosePurchaseChecker();
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-4 pb-24 space-y-4">
      {/* Header (Exact 1:1 Match with PDF Screen 4) */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your week</h1>
        <p className="text-xs text-slate-500 font-medium">Mon 17 – Sun 23 Aug 2026</p>
      </div>

      {/* Segment Switcher */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('reflection')}
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
            setActiveTab('checker');
            calculatePurchaseImpact(itemPrice);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'checker'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Purchase Check
        </button>
      </div>

      {activeTab === 'reflection' ? (
        <>
          {/* Top Summary Card (From PDF Screen 4) */}
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
              "Six days of your BTO deposit. Nothing is broken — this is just the week you had."
            </p>

            {/* Comparison Bars (Spent vs Planned) */}
            <div className="space-y-3 pt-1">
              {/* Spent Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">Spent</span>
                  <span className="text-orange-600">S$542</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Planned Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">Planned</span>
                  <span className="text-emerald-600">S$330</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '55%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Three moments that moved the needle (From PDF Screen 4) */}
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
                  {/* Dot Indicator */}
                  <span
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                      moment.isPositive ? 'bg-emerald-500' : 'bg-orange-400'
                    }`}
                  />

                  {/* Content */}
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
              When shopping on Shopee or Lazada, share any product page to Ice Kaching. Our JITAI engine computes the opportunity cost in BTO days before you tap buy!
            </p>
            <button
              onClick={() => {
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
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
              Second Opinion at Checkout
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
                { name: 'Trail Runners', price: 389 },
                { name: 'AirPods Max', price: 749 },
                { name: 'Omakase Dinner', price: 220 },
                { name: 'Shopee Sale Haul', price: 95 },
                { name: 'Labubu Blind Box', price: 35 },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setItemName(preset.name);
                    setItemPrice(preset.price);
                    calculatePurchaseImpact(preset.price);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-pink-100 hover:text-pink-700 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
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
      )}
    </div>
  );
};
