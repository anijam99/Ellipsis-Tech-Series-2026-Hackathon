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
  ChevronDown,
  TrendingUp,
  Sparkles,
  Users,
  Building,
  Plus
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';
import { CompanionAvatar } from '../CompanionAvatar';

const MILESTONE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield-check': ShieldCheck,
  home: Home,
  'heart-handshake': Heart,
  car: Car,
};

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [localMilestones, setLocalMilestones] = useState(milestones);
  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestoneCost, setNewMilestoneCost] = useState('');
  const [newMilestoneYear, setNewMilestoneYear] = useState('2028');
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
    <div className="flex flex-col h-full overflow-y-auto [&>*]:shrink-0 px-5 py-4 pb-24 space-y-5">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your journey</h1>
      </div>

      {/* Winding Route Path Container */}
      <div className="relative shrink-0 rounded-3xl border border-slate-200 shadow-inner overflow-hidden bg-blue-50 h-[260px]">
        {/* Smooth gradient background */}
        <div 
          className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" 
          style={{ background: 'linear-gradient(180deg, #dbeafe 0%, #dcfce7 40%, #fef3c7 75%, #fee2e2 100%)' }}
        />

        {/* Scrollable Map Area */}
        <div className="relative w-full h-full flex flex-col py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {localMilestones.map((m, i) => {
            const Icon = MILESTONE_ICONS[m.icon] ?? Home;
            const isLast = i === localMilestones.length - 1;
            const done = m.status === 'done';
            const current = m.status === 'in_progress';
            const isLeft = i % 2 === 0;

            return (
              <div key={m.id} className="relative w-full h-[85px] flex items-center justify-center shrink-0 animate-fade-in">
                {/* Winding Track Connector */}
                {!isLast ? (
                  <div 
                    className={`absolute top-[50%] left-[15%] w-[70%] h-full border-[12px] ${done ? 'border-pink-400 drop-shadow-sm' : 'border-white/90 drop-shadow-sm'} ${
                      isLeft 
                        ? 'border-l-0 rounded-r-[45px]' 
                        : 'border-r-0 rounded-l-[45px]'
                    } z-0`}
                  />
                ) : (
                  <div 
                    className={`absolute top-[50%] ${isLeft ? 'left-[15%] -translate-x-1/2' : 'right-[15%] translate-x-1/2'} w-[12px] h-[80px] bg-gradient-to-b from-white/90 to-transparent z-0 rounded-full drop-shadow-sm`}
                  />
                )}

                <div className={`relative z-10 w-[90%] h-full flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center gap-3`}>
                  
                  {/* The Avatar or Icon */}
                  <div className="w-[20%] flex justify-center z-20">
                      {current ? (
                        <div className="relative flex items-center justify-center w-14 h-14">
                          {/* Pulsing hype ring */}
                          <div className="absolute inset-[-4px] bg-pink-400 rounded-full animate-ping opacity-60"></div>
                          <div className="relative w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-xl border-2 border-white backdrop-blur-sm z-10">
                            <div className="animate-bounce">
                              <CompanionAvatar state="healthy" size="sm" className="w-10 h-10 scale-[1.2]" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md ${done ? 'bg-pink-400 text-white' : 'bg-white text-slate-400'}`}>
                          {done ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
                        </div>
                      )}
                  </div>

                  {/* Milestone Card */}
                  <div className="w-[80%] z-20">
                    <button
                      type="button"
                      onClick={() => {
                        playSound.pop();
                        setSelectedMilestone(m);
                      }}
                      className={`w-full rounded-[14px] border-2 p-2.5 text-left transition-transform active:scale-95 shadow-sm bg-white/70 backdrop-blur-md ${
                        current
                          ? 'border-pink-400 shadow-pink-200'
                          : done
                            ? 'border-transparent shadow-slate-200/50'
                            : 'border-white shadow-slate-200/50 opacity-90'
                      }`}
                    >
                      <div className="flex flex-col gap-1 mb-0.5">
                        <div className="flex items-center justify-between">
                           <h3 className="text-[13px] font-bold text-slate-900 leading-tight truncate pr-1">{m.title}</h3>
                           {done && <Check className="w-3.5 h-3.5 text-pink-500 shrink-0" />}
                        </div>
                        {current && (
                          <>
                            <span className="self-start rounded-full bg-pink-500 px-1.5 py-[2px] text-[9px] font-extrabold uppercase tracking-wider text-white">
                              You are here
                            </span>
                            <div className="flex items-center justify-between gap-2 mt-1">
                              <div className="flex-1 h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                              </div>
                              <span className="text-[9px] font-bold text-pink-600">{progressPercent}%</span>
                            </div>
                          </>
                        )}
                      </div>
                      <p className="tnum text-[10px] font-bold text-slate-500 mt-1">
                        S${m.targetCost.toLocaleString()} · {m.targetYear}
                      </p>
                    </button>
                  </div>
                  
                </div>
              </div>
            );
          })}

          {/* Faded Future Track */}
          <div className="relative w-full h-[80px] flex flex-col items-center justify-start mt-4 shrink-0 pointer-events-none opacity-50">
             {/* Dashed line pointing down */}
             <div className="w-[4px] h-[40px] border-l-[4px] border-dashed border-white/80 mb-2" />
             <div className="flex items-center gap-1.5 text-slate-400">
               <Sparkles className="w-3.5 h-3.5" />
               <span className="font-bold text-[10px] uppercase tracking-widest">More to come</span>
             </div>
          </div>
        </div>
        
        {/* Scroll indicator overlay */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-blue-100/90 to-transparent pointer-events-none z-30 flex items-end justify-center pb-2">
           <div className="animate-bounce text-slate-400">
             <ChevronDown className="w-5 h-5 opacity-70" />
           </div>
        </div>
      </div>

      {/* Milestone Action Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={() => {
            playSound.pop();
            const currentM = localMilestones.find(m => m.status === 'in_progress' || m.id === 'bto-tengah');
            if (currentM) setSelectedMilestone(currentM);
          }}
          className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl shadow-sm transition-colors active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Sliders className="w-4 h-4" /> Edit milestone
        </button>
        <button 
          onClick={() => {
            playSound.pop();
            setShowAddModal(true);
          }}
          className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-sm transition-colors active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add custom
        </button>
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
              className="h-full bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 rounded-full transition-all duration-700 bg-[size:200%_100%] animate-[liquidFlow_2s_linear_infinite]" 
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
          onClick={() => {
            playSound.pop();
            setSelectedMilestone(milestones[1]);
          }}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" /> Customize Flat Type & Couples Split
        </button>
      </div>

      {/* Milestone Action Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={() => playSound.pop()}
          className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl shadow-sm transition-colors active:scale-95"
        >
          Edit milestone
        </button>
        <button 
          onClick={() => playSound.pop()}
          className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-sm transition-colors active:scale-95"
        >
          Add custom milestone
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
                      onClick={() => {
                        playSound.pop();
                        setFlatType(type);
                      }}
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
                    onChange={(e) => {
                      playSound.pop();
                      setIncludePartner(e.target.checked);
                    }}
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
              className="w-full py-3 bg-pink-500 hover:bg-pink-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
            >
              Save Milestone Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
