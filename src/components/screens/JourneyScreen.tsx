import React, { useState } from 'react';
import { Milestone } from '../../types';
import { 
  Check, 
  Car, 
  Heart, 
  ShieldCheck, 
  Home, 
  MapPin, 
  Info, 
  Sliders, 
  ChevronRight,
  TrendingUp,
  Sparkles,
  Users,
  Building
} from 'lucide-react';

interface JourneyScreenProps {
  milestones: Milestone[];
  userSavings: number;
  cpfOA: number;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({
  milestones,
  userSavings,
  cpfOA,
}) => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [flatType, setFlatType] = useState<'3-room' | '4-room' | '5-room'>('4-room');
  const [town, setTown] = useState('Tengah (Plantation Edge)');
  const [includePartner, setIncludePartner] = useState(true);

  // Dynamic BTO calculation based on choices
  const flatPrices = {
    '3-room': { cost: 28000, downpayment: 28000, monthly: 750 },
    '4-room': { cost: 38000, downpayment: 38000, monthly: 1050 },
    '5-room': { cost: 52000, downpayment: 52000, monthly: 1450 },
  };

  const currentSelection = flatPrices[flatType];
  const totalTarget = currentSelection.downpayment;
  const currentSaved = userSavings;
  const progressPercent = Math.min(100, Math.round((currentSaved / totalTarget) * 100));

  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-4 pb-24 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your journey</h1>
        <p className="text-sm text-slate-500 font-medium">Four milestones, one route</p>
      </div>

      {/* Interactive Visual Roadmap (1:1 with Screen 2) */}
      <div className="relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-hidden">
        {/* Subtle decorative roadmap track */}
        <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-1.5 bg-slate-100 rounded-full" />
        
        {/* Curved connecting line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-pink-200" fill="none">
          <path
            d="M 170 60 C 230 110, 110 160, 170 210 C 230 260, 110 310, 170 360"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </svg>

        <div className="relative flex flex-col items-center space-y-8 z-10">
          {/* Milestone 4: Car (2034) */}
          <div 
            onClick={() => setSelectedMilestone(milestones[3])}
            className="flex items-center gap-4 w-full max-w-[280px] bg-slate-50/80 hover:bg-slate-100 p-3 rounded-2xl border border-slate-200/60 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Car</h3>
              <p className="text-xs text-slate-500 font-medium">S$25,000 · 2034</p>
            </div>
          </div>

          {/* Milestone 3: Wedding (2031) */}
          <div 
            onClick={() => setSelectedMilestone(milestones[2])}
            className="flex items-center gap-4 w-full max-w-[280px] bg-slate-50/80 hover:bg-slate-100 p-3 rounded-2xl border border-slate-200/60 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Wedding</h3>
              <p className="text-xs text-slate-500 font-medium">S$32,000 · 2031</p>
            </div>
          </div>

          {/* "YOU" Locator Indicator (Pulsing Pin on Path) */}
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-widest bg-pink-100 px-2 py-0.5 rounded-full mb-1 border border-pink-200 shadow-sm">
                You
              </span>
              <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-300 ring-4 ring-pink-100 animate-pulse">
                <Home className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Milestone 1: Emergency Buffer (DONE) */}
          <div 
            onClick={() => setSelectedMilestone(milestones[0])}
            className="flex items-center gap-4 w-full max-w-[280px] bg-amber-50/70 hover:bg-amber-100/70 p-3 rounded-2xl border border-amber-200/70 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900">Emergency buffer</h3>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-200/80 px-1.5 py-0.2 rounded">Done</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">S$9,600 saved · done</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Milestone Card (BTO Flat Tengah - Exact 1:1 Match with PDF Screen 2) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">BTO flat · Tengah</h2>
            <p className="text-xs text-slate-400 font-medium">Current milestone</p>
          </div>
          <span className="text-xs font-bold text-pink-700 bg-pink-100/80 px-2.5 py-1 rounded-full border border-pink-200">
            In progress
          </span>
        </div>

        {/* Target Cost & Key Collection Grid */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50/70 rounded-2xl p-3 border border-slate-100">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Target cost</span>
            <span className="text-base font-bold text-slate-900">S${totalTarget.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Key collection</span>
            <span className="text-base font-bold text-slate-900">Mar 2029</span>
          </div>
        </div>

        {/* Needed Monthly */}
        <div className="bg-pink-50/50 rounded-2xl p-3 border border-pink-100">
          <span className="text-[11px] font-semibold text-pink-700 block">Needed monthly from today</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-bold text-slate-900">S${currentSelection.monthly.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-medium">· 31 months left</span>
          </div>
        </div>

        {/* Progress Bar & Saved Amount */}
        <div className="space-y-1.5">
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-700" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>S${currentSaved.toLocaleString()} saved</span>
            <span>{progressPercent}%</span>
          </div>
        </div>

        {/* Forecast insight sentence from Proposal */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs text-slate-600 space-y-1 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <TrendingUp className="w-3.5 h-3.5 text-pink-600" />
            <span>Journey Engine Forecast</span>
          </div>
          <p>
            At your current save rate, plus CPF Ordinary Account (S$14,200), plus Enhanced CPF Housing Grant assumptions (S$30,000), you are <strong>14 months ahead</strong> of a 4-room first-timer downpayment budget in Tengah!
          </p>
        </div>

        {/* Milestone Configuration Trigger */}
        <button
          onClick={() => setSelectedMilestone(milestones[1])}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" /> Customize Flat Type & Couples Split
        </button>
      </div>

      {/* Milestone Details & Configuration Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedMilestone.title}</h3>
                  <p className="text-xs text-slate-400">Milestone parameters</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMilestone(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl p-1"
              >
                ×
              </button>
            </div>

            {/* Flat Type Selector */}
            {selectedMilestone.id === 'bto-tengah' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Flat Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['3-room', '4-room', '5-room'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFlatType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        flatType === type
                          ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Couple Split Switch */}
                <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-pink-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Couple Shared Journey</span>
                      <span className="text-[11px] text-slate-500">Share goal with Cheryl (S$3,400/mo)</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includePartner}
                    onChange={(e) => setIncludePartner(e.target.checked)}
                    className="w-4 h-4 accent-pink-600 rounded cursor-pointer"
                  />
                </div>

                {/* Breakdown Calculation */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Estimated Total Downpayment:</span>
                    <span className="font-bold text-slate-900">S${currentSelection.downpayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Your CPF OA Balance:</span>
                    <span className="font-bold text-emerald-600">-S$14,200</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Enhanced CPF Housing Grant (EHG):</span>
                    <span className="font-bold text-emerald-600">-S$30,000</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-pink-700 bg-pink-50 p-2.5 rounded-xl">
                    <span>Net Cash Required:</span>
                    <span>S$0 (Fully Covered by CPF & Grants!)</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedMilestone(null)}
              className="w-full py-3 bg-[#FF6B8B] hover:bg-[#fa5578] text-white font-bold text-sm rounded-xl transition-colors shadow-md"
            >
              Save Milestone Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
