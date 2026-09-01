import React, { useState } from 'react';
import { GovernmentScheme } from '../../types';
import { 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Shield, 
  Clock, 
  FileText, 
  ArrowRight,
  Filter,
  Check,
  Building,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SupportScreenProps {
  schemes: GovernmentScheme[];
  onClaimScheme: (id: string) => void;
  profileCompleteness: number;
  onOpenProfileChat: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  schemes,
  onClaimScheme,
  profileCompleteness,
  onOpenProfileChat,
}) => {
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredSchemes = filterCategory === 'all' 
    ? schemes 
    : schemes.filter(s => s.category === filterCategory);

  const totalMatchedAmount = schemes.reduce((acc, s) => acc + s.amount, 0);

  const handleClaim = (scheme: GovernmentScheme) => {
    onClaimScheme(scheme.id);
    setSelectedScheme(null);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ECC94B', '#FF6B8B', '#48BB78']
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-4 pb-24 space-y-4">
      {/* Header (Exact 1:1 Match with PDF Screen 3) */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Support you may be owed
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Sorted by how little work it takes
        </p>
      </div>

      {/* Profile Completeness & Matched Banner */}
      <div className="bg-gradient-to-r from-pink-50 via-pink-100/40 to-amber-50 rounded-2xl p-3.5 border border-pink-100/80 flex items-center justify-between shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              Profile {profileCompleteness}% complete
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-pink-700">
              {schemes.length} schemes matched
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Total potential entitlement: <strong className="text-slate-900">S${totalMatchedAmount.toLocaleString()}</strong>
          </p>
        </div>
        {profileCompleteness < 100 && (
          <button
            onClick={onOpenProfileChat}
            className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
          >
            Finish <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'all', label: 'All Schemes' },
          { id: 'training', label: 'Skills & Training' },
          { id: 'cost_of_living', label: 'Cost of Living' },
          { id: 'housing', label: 'HDB Housing' },
          { id: 'sustainability', label: 'Green Living' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
              filterCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Scheme Cards (Sorted by effort - Low friction first) */}
      <div className="space-y-3">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            onClick={() => setSelectedScheme(scheme)}
            className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer hover:shadow-md ${
              scheme.claimed
                ? 'border-emerald-200/80 bg-emerald-50/20'
                : 'border-slate-100 hover:border-pink-200'
            }`}
          >
            {/* Top Row: Title & Amount */}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm text-slate-900 leading-tight">
                  {scheme.title}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  {scheme.officialAgency}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base font-extrabold text-amber-600">
                  {scheme.amountDisplay}
                </span>
                {scheme.claimed && (
                  <span className="block text-[10px] font-bold text-emerald-600">
                    Claimed ✓
                  </span>
                )}
              </div>
            </div>

            {/* Effort & Authentication Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {scheme.effortTags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    tag.includes('1 form') || tag.includes('Singpass')
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                      : tag.includes('CPF')
                      ? 'bg-purple-50 text-purple-800 border border-purple-200/60'
                      : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Subtext */}
            <div className="mt-2.5 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>{scheme.eligibilityNote}</span>
              <span className="text-pink-600 font-semibold flex items-center gap-0.5">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail & Claim Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block">
                  {selectedScheme.officialAgency}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedScheme.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedScheme(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl p-1"
              >
                ×
              </button>
            </div>

            {/* Amount Banner */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-800 font-semibold block">Grant Value</span>
                <span className="text-2xl font-black text-amber-700">{selectedScheme.amountDisplay}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-800 font-semibold block">Time required</span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> {selectedScheme.timeToApply}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">About This Scheme</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedScheme.description}
              </p>
            </div>

            {/* Steps to Claim */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">How to Claim</h4>
              <div className="space-y-2">
                {selectedScheme.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              {!selectedScheme.claimed ? (
                <button
                  onClick={() => handleClaim(selectedScheme)}
                  className="w-full py-3 bg-[#FF6B8B] hover:bg-[#fa5578] text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Simulate Claim with Singpass
                </button>
              ) : (
                <div className="w-full py-3 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Already Claimed & Added to Profile
                </div>
              )}

              <button
                onClick={() => setSelectedScheme(null)}
                className="w-full py-2 text-slate-500 hover:text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
