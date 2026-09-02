import React, { useState } from 'react';
import { ChatMessage } from '../../types';
import { CompanionAvatar } from '../CompanionAvatar';
import { 
  ShieldCheck, 
  Send, 
  Sparkles, 
  Check, 
  Lock, 
  Fingerprint, 
  CheckCircle2,
  ArrowRight,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileChatScreenProps {
  profileCompleteness: number;
  onUpdateCompleteness: (val: number) => void;
  onNavigate: (tab: string) => void;
}

export const ProfileChatScreen: React.FC<ProfileChatScreenProps> = ({
  profileCompleteness,
  onUpdateCompleteness,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'How many people live in your household right now, counting yourself?',
      timestamp: '9:41 AM',
      quickReplies: ['Four — my parents, my brother and me', 'Two — just my partner and me', 'Three — parents and me', 'Just me (Single)'],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState<number>(1);
  const [showSingpassModal, setShowSingpassModal] = useState(false);
  const [isSingpassConnecting, setIsSingpassConnecting] = useState(false);
  const [singpassVerified, setSingpassVerified] = useState(false);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: '9:42 AM',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Bot response sequence based on proposal dialogue (Screen 5)
    setTimeout(() => {
      if (step === 1) {
        const botReply1: ChatMessage = {
          id: `b_${Date.now()}`,
          sender: 'bot',
          text: 'Noted — household of 4. That unlocks the household income check for the Enhanced CPF Housing Grant, so your S$30,000 estimate is firmer now.',
          timestamp: '9:42 AM',
        };
        const botReply2: ChatMessage = {
          id: `b_${Date.now() + 1}`,
          sender: 'bot',
          text: 'Next: your CPF OA balance, from Singpass. Ready to link your verified records via SGFinDex?',
          timestamp: '9:42 AM',
          actionType: 'singpass',
        };
        setMessages(prev => [...prev, botReply1, botReply2]);
        onUpdateCompleteness(76);
        setStep(2);
      } else if (step === 2) {
        const botReply: ChatMessage = {
          id: `b_${Date.now()}`,
          sender: 'bot',
          text: 'Great! All 4 government support schemes have been recalculated with high confidence. You can check your maximized grants now!',
          timestamp: '9:43 AM',
        };
        setMessages(prev => [...prev, botReply]);
        onUpdateCompleteness(100);
        setStep(3);
      }
    }, 600);
  };

  const handleSimulateSingpass = () => {
    setIsSingpassConnecting(true);
    setTimeout(() => {
      setIsSingpassConnecting(false);
      setShowSingpassModal(false);
      setSingpassVerified(true);
      onUpdateCompleteness(100);

      const botReply: ChatMessage = {
        id: `b_${Date.now()}`,
        sender: 'bot',
        text: 'Singpass & SGFinDex linked successfully! Retrieved: CPF OA: S$14,200 · Monthly Income: S$3,600 · First-Timer Status: Verified. Your profile is now 100% complete!',
        timestamp: '9:43 AM',
      };
      setMessages(prev => [...prev, botReply]);
      
      confetti({
        particleCount: 90,
        spread: 80,
        colors: ['#E4657F', '#6E9670', '#C08A3C']
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden px-5 py-4 pb-20">
      {/* Header (Exact 1:1 with Screen 5) */}
      <div className="space-y-1 pb-3 border-b border-slate-100 shrink-0">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Finish your profile</h1>
        <p className="text-xs text-slate-500 font-medium">
          Two questions left, then we recheck your schemes
        </p>

        {/* Progress Bar */}
        <div className="pt-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
            <span>Profile completeness</span>
            <span className="text-pink-600 font-extrabold">{profileCompleteness}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-700"
              style={{ width: `${profileCompleteness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Bot Avatar */}
            {msg.sender === 'bot' && (
              <div className="w-7 h-7 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                <CompanionAvatar state="healthy" size="sm" className="w-5 h-5 scale-75" />
              </div>
            )}

            {/* Bubble */}
            <div className={`space-y-2 max-w-[82%]`}>
              <div
                className={`p-3.5 text-xs font-medium leading-relaxed rounded-2xl shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
              </div>

              {/* Quick Reply Chips (if available) */}
              {msg.quickReplies && (
                <div className="flex flex-col gap-1.5 pt-1">
                  {msg.quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(reply)}
                      className="text-left text-xs bg-slate-50 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200 border border-slate-200/80 px-3 py-2 rounded-xl text-slate-700 font-medium transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Singpass Action Buttons from PDF Screen 5 */}
              {msg.actionType === 'singpass' && !singpassVerified && (
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setShowSingpassModal(true)}
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Fingerprint className="w-3.5 h-3.5" /> Connect Singpass
                  </button>
                  <button
                    onClick={() => handleSendMessage("I'll enter my CPF details manually")}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Later
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {profileCompleteness === 100 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2 mt-4 animate-fade-in">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Profile Fully Verified!</h3>
            <p className="text-xs text-slate-600">
              All government housing grants and cost-of-living schemes matched.
            </p>
            <button
              onClick={() => onNavigate('support')}
              className="mt-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5"
            >
              View Updated Maximiser <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="shrink-0 pt-2 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
          placeholder="Ask a question or enter details..."
          className="flex-1 px-3.5 py-2.5 bg-slate-100 rounded-xl text-xs font-medium border border-transparent focus:bg-white focus:border-pink-500 focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage(inputText)}
          className="w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-xl flex items-center justify-center transition-colors shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Simulated Singpass Authentication Dialog */}
      {showSingpassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 space-y-4 text-center">
            {/* Singpass Red Logo */}
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-100">
              <Fingerprint className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase">
                GovTech Singapore
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Singpass & SGFinDex Consent
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Consent to retrieve MyInfo profile, CPF Ordinary Account balance, and seeded bank deposits for Bryan Tan.
              </p>
            </div>

            {/* Privacy note */}
            <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-slate-500 flex items-center gap-2 text-left border border-slate-100">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Consent is scoped for scheme eligibility inference only. No live funds accessed.</span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleSimulateSingpass}
                disabled={isSingpassConnecting}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {isSingpassConnecting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Retrieving from SGFinDex...
                  </span>
                ) : (
                  'Log in with Singpass App'
                )}
              </button>
              <button
                onClick={() => setShowSingpassModal(false)}
                className="w-full py-2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
