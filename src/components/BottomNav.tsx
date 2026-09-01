import React from 'react';
import { Home, Compass, Sparkles, BarChart2, BookOpen, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  unclaimedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  unclaimedCount,
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'journey', label: 'Journey', icon: Compass },
    { id: 'support', label: 'Support', icon: Sparkles, badge: unclaimedCount > 0 ? unclaimedCount : undefined },
    { id: 'spending', label: 'Spending', icon: BarChart2 },
    { id: 'feed', label: 'Feed', icon: BookOpen },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-3 py-2 z-40">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative ${
                isActive
                  ? 'text-pink-600 scale-105'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-pink-500 absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
