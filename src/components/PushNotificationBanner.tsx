import React, { useEffect } from 'react';
import { PushNotification } from '../types';
import { Sparkles, ChevronRight, X, Clock, AlertTriangle } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface PushNotificationBannerProps {
  notification: PushNotification | null;
  onDismiss: () => void;
  onTap: (notification: PushNotification) => void;
}

export const PushNotificationBanner: React.FC<PushNotificationBannerProps> = ({
  notification,
  onDismiss,
  onTap,
}) => {
  useEffect(() => {
    if (notification) {
      playSound.alert();
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <div className="absolute top-12 left-3 right-3 z-50 animate-fade-in">
      <div
        onClick={() => onTap(notification)}
        className="w-full bg-slate-900/95 text-white backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl border border-slate-700/80 cursor-pointer hover:bg-slate-800 transition-all select-none group"
      >
        <div className="flex items-start justify-between gap-2.5">
          {/* App Icon + Tag */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-sm shadow-sm shrink-0">
              🍧
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs text-white tracking-tight">
                  {notification.appName}
                </span>
                <span className="bg-pink-500/20 text-pink-400 border border-pink-500/30 px-1.5 py-0.2 rounded text-[9px] font-bold">
                  JITAI ALERT
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {notification.timeAgo}
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Message Content */}
        <div className="mt-2 text-left">
          <h4 className="text-xs font-bold text-pink-300">
            {notification.title}
          </h4>
          <p className="text-xs text-slate-200 mt-0.5 leading-snug font-medium">
            {notification.message}
          </p>
        </div>

        {/* Bottom CTA hint */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-pink-400 font-bold">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" /> Tap to review second opinion & save
          </span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
