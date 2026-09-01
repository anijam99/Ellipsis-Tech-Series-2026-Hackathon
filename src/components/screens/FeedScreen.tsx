import React, { useState } from 'react';
import { FeedItem } from '../../types';
import { 
  Sparkles, 
  Share2, 
  Heart, 
  Bookmark, 
  TrendingUp, 
  ExternalLink, 
  UserCheck, 
  UserPlus,
  Play,
  Filter
} from 'lucide-react';

interface FeedScreenProps {
  feedItems: FeedItem[];
  onToggleFollow: (id: string) => void;
}

export const FeedScreen: React.FC<FeedScreenProps> = ({
  feedItems,
  onToggleFollow,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['f1']));

  const topics = ['All', 'BTO Grants', 'Spending Habits', 'CPF Hacks', 'Gov Grants'];

  const filteredItems = selectedTopic === 'All'
    ? feedItems
    : feedItems.filter(item => item.tag === selectedTopic);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-4 pb-24 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Financial Feed
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Vetted Singapore creators & MoneySense guides you asked for
        </p>
      </div>

      {/* Topics scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
              selectedTopic === topic
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Feed Cards */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const isSaved = bookmarkedIds.has(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3.5 hover:border-pink-200 transition-all"
            >
              {/* Creator Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-amber-400 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {item.creator.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{item.creator}</h3>
                    <p className="text-[11px] text-slate-400 font-medium">{item.handle} · {item.platform === 'tiktok' ? 'TikTok' : 'MoneySense'}</p>
                  </div>
                </div>

                {/* Follow Button */}
                <button
                  onClick={() => onToggleFollow(item.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    item.isFollowed
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-200'
                  }`}
                >
                  {item.isFollowed ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" /> Follow
                    </>
                  )}
                </button>
              </div>

              {/* Title & Tag */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                  {item.tag}
                </span>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h2>
              </div>

              {/* Bite-Sized Key Takeaway Box */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Key Takeaway
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {item.keyTakeaway}
                </p>
              </div>

              {/* Quote / Hook */}
              <p className="text-xs italic text-slate-500 border-l-2 border-pink-300 pl-2.5 py-0.5">
                "{item.quote}"
              </p>

              {/* Actions Footer */}
              <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> {item.likes}
                  </span>
                  <span>{item.duration} read/watch</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="p-1 hover:text-slate-700 transition-colors"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'text-pink-600 fill-pink-600' : ''}`} />
                  </button>
                  <button className="p-1 hover:text-slate-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
