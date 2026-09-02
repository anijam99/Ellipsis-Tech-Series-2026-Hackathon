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
  Check,
  MessageCircle,
  Send,
  X,
  LoaderCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const CATEGORY_TINT: Record<string, string> = {
  training:        'bg-purple-50/50 border-purple-100/60',
  cost_of_living:  'bg-amber-50/60 border-amber-100/70',
  housing:         'bg-pink-50/50 border-pink-100/70',
  sustainability:  'bg-emerald-50/50 border-emerald-100/70',
  retirement:      'bg-orange-50/50 border-orange-100/60',
};

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
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi, I\'m Ice Kaching. Ask me anything about budgeting, saving, CPF, or the support schemes you may be eligible for.',
    },
  ]);

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
      colors: ['#C08A3C', '#E4657F', '#6E9670']
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto [&>*]:shrink-0 px-5 py-4 pb-24 space-y-4">
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

      {/* Financial Coach */}
      <button
        onClick={() => setShowChat(true)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-900 p-4 text-left text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold">Talk to Ice Kaching</span>
              <span className="block text-[11px] text-slate-300">Your personal financial coach</span>
            </span>
          </span>
          <ArrowRight className="h-4 w-4 text-pink-300" />
        </span>
      </button>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="flex h-[min(680px,85vh)] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
              <div>
                <h3 className="text-base font-bold">Ice Kaching Coach</h3>
                <p className="text-[11px] text-slate-300">Practical money guidance, whenever you need it</p>
              </div>
              <button aria-label="Close financial coach" onClick={() => setShowChat(false)} className="rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${message.role === 'user' ? 'rounded-br-md bg-pink-500 text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Ice Kaching is thinking...
                </div>
              )}
            </div>
            <form
              onSubmit={async event => {
                event.preventDefault();
                const content = input.trim();
                if (!content || isLoading) return;

                const userMessage: ChatMessage = { role: 'user', content };
                const conversation = [...messages, userMessage];
                setMessages(conversation);
                setInput('');
                setIsLoading(true);

                try {
                  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                      'Content-Type': 'application/json',
                      'HTTP-Referer': window.location.origin,
                      'X-Title': 'Ice Kaching',
                    },
                    body: JSON.stringify({
                      model: 'inclusionai/ling-3.0-flash-fin:free',
                      messages: [
                        {
                          role: 'system',
                          content: 'You are Ice Kaching, a warm and practical Singapore financial coach. Give clear, actionable guidance about budgeting, saving, CPF, and government support. Do not claim to be a licensed financial adviser, and encourage users to verify time-sensitive details with official sources.',
                        },
                        ...conversation,
                      ],
                      stream: true,
                    }),
                  });

                  if (!response.ok || !response.body) {
                    throw new Error(`OpenRouter request failed: ${response.status}`);
                  }

                  setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
                  const reader = response.body.getReader();
                  const decoder = new TextDecoder();
                  let buffer = '';

                  while (true) {
                    const { value, done } = await reader.read();
                    buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done });
                    const events = buffer.split('\n\n');
                    buffer = events.pop() ?? '';

                    for (const event of events) {
                      const data = event.split('\n').find(line => line.startsWith('data: '))?.slice(6);
                      if (!data || data === '[DONE]') continue;
                      const token = JSON.parse(data).choices?.[0]?.delta?.content;
                      if (token) {
                        setMessages(prev => {
                          const last = prev[prev.length - 1];
                          return last?.role === 'assistant'
                            ? [...prev.slice(0, -1), { ...last, content: last.content + token }]
                            : prev;
                        });
                      }
                    }

                    if (done) break;
                  }
                } catch (error) {
                  console.error('Financial coach error:', error);
                  setMessages(prev => [...prev, { role: 'assistant', content: 'I could not connect right now. Please try again in a moment.' }]);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="flex gap-2 border-t border-slate-100 bg-white p-4"
            >
              <input
                type="text"
                value={input}
                onChange={event => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                placeholder="Ask about your money..."
                aria-label="Message Ice Kaching"
                disabled={isLoading}
              />
              <button type="submit" aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500 text-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

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
            className={`rounded-2xl p-4 border transition-all cursor-pointer hover:shadow-soft ${
              scheme.claimed
                ? 'border-emerald-200/70 bg-emerald-50/50'
                : `${CATEGORY_TINT[scheme.category] ?? 'bg-white border-slate-100'} hover:border-pink-200`
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
              {/*
                Size the amount by what it is worth. Every grant was set at one size, so a
                S$30,000 housing grant and a S$500 voucher carried identical visual weight
                and the list had no shape. Claimed ones step back: their work is done.
              */}
              <div className="text-right shrink-0">
                <span
                  className={`tnum block font-extrabold leading-none tracking-tight ${
                    scheme.claimed
                      ? 'text-base text-slate-400'
                      : scheme.amount >= 10000
                        ? 'text-[26px] text-amber-600'
                        : scheme.amount >= 1000
                          ? 'text-xl text-amber-600'
                          : 'text-base text-amber-600'
                  }`}
                >
                  {scheme.amountDisplay}
                </span>
                {scheme.claimed && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <Check className="h-3 w-3 stroke-[3]" /> Claimed
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
                  className="w-full py-3 bg-pink-500 hover:bg-pink-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
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
