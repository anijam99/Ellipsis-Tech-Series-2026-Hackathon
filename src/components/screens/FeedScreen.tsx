import React, { useState } from 'react';
import { FeedItem, SocialPlatform } from '../../types';
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
  MessageCircle,
  Volume2,
  CheckCircle2,
  ThumbsUp,
  X,
  Compass
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface FeedScreenProps {
  feedItems: FeedItem[];
  onToggleFollow: (id: string) => void;
}

export const FeedScreen: React.FC<FeedScreenProps> = ({
  feedItems,
  onToggleFollow,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['f1']));
  const [activeMediaModal, setActiveMediaModal] = useState<FeedItem | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set(['f1', 'f3']));

  const platformTabs = [
    { id: 'all', label: '🌟 All Feeds' },
    { id: 'tiktok', label: '🎵 TikTok' },
    { id: 'instagram', label: '📸 Instagram Reels' },
    { id: 'youtube', label: '▶️ YouTube Shorts' },
    { id: 'reddit', label: '💬 Reddit r/singaporefi' },
    { id: 'moneysense', label: '🇸🇬 MoneySense SG' },
  ];

  const filteredItems = feedItems.filter(item => {
    const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform;
    const matchesTopic = selectedTopic === 'All' || item.tag === selectedTopic;
    return matchesPlatform && matchesTopic;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound.pop();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound.pop();
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        confetti({
          particleCount: 30,
          spread: 45,
          colors: ['#E4657F', '#FDA4AF']
        });
      }
      return next;
    });
  };

  const getPlatformBadge = (platform: SocialPlatform) => {
    switch (platform) {
      case 'tiktok':
        return <span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1">🎵 TikTok</span>;
      case 'instagram':
        return <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">📸 Reels</span>;
      case 'youtube':
        return <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">▶️ Shorts</span>;
      case 'reddit':
        return <span className="bg-orange-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">💬 Reddit</span>;
      case 'moneysense':
        return <span className="bg-emerald-700 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">🇸🇬 Official</span>;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto [&>*]:shrink-0 px-5 py-4 pb-24 space-y-4 select-none">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Financial Feed
          </h1>
          <span className="text-xs font-bold text-pink-700 bg-pink-100/80 px-2.5 py-1 rounded-full border border-pink-200">
            Social Media Aggregator
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Curated short-form creator reels, Reddit discussions & GovTech guides
        </p>
      </div>

      {/* Platform Filter Scrollbar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {platformTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              playSound.pop();
              setSelectedPlatform(tab.id);
            }}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all text-xs ${
              selectedPlatform === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed Cards */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const isSaved = bookmarkedIds.has(item.id);
          const isLiked = likedIds.has(item.id);

          return (
            <div
              key={item.id}
              onClick={() => {
                playSound.pop();
                setActiveMediaModal(item);
              }}
              className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-3 hover:border-pink-200 hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Creator Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-amber-400 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {item.creator.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-xs font-bold text-slate-900">{item.creator}</h3>
                      {item.verified && (
                        <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">{item.handle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getPlatformBadge(item.platform)}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound.pop();
                      onToggleFollow(item.id);
                    }}
                    className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                      item.isFollowed
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-200'
                    }`}
                  >
                    {item.isFollowed ? (
                      <>
                        <UserCheck className="w-3 h-3 text-emerald-600" /> Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" /> Follow
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Tag */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                  {item.tag}
                </span>
                <h2 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h2>
              </div>

              {/* Video Preview / Card Mockup */}
              <div className={`w-full h-32 rounded-2xl bg-gradient-to-tr ${item.coverGradient || 'from-pink-500 to-rose-600'} text-white p-3.5 flex flex-col justify-between relative overflow-hidden shadow-inner group-hover:scale-[1.01] transition-transform`}>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-2xl">{item.mediaEmoji || '📱'}</span>
                  <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {item.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                    <span className="text-xs font-bold drop-shadow-md">Tap to play preview</span>
                  </div>
                  <div className="flex gap-0.5 items-center">
                    <span className="w-1 h-3 bg-white/80 rounded-full animate-pulse" />
                    <span className="w-1 h-5 bg-white rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-2 bg-white/70 rounded-full animate-pulse delay-150" />
                  </div>
                </div>

                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>

              {/* Key Takeaway Box */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Key Takeaway
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {item.keyTakeaway}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className={`flex items-center gap-1 font-bold ${
                      isLiked ? 'text-pink-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-pink-600 text-pink-600' : ''}`} />
                    <span>{item.likes}</span>
                  </button>

                  {item.commentsCount && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> {item.commentsCount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(item.id, e)}
                    className="p-1 hover:text-slate-800 transition-colors"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'text-pink-600 fill-pink-600' : ''}`} />
                  </button>
                  <button className="p-1 hover:text-slate-800 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Reel / Video Player Modal */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
          <div className="bg-slate-900 text-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]">
            {/* Top Modal Navigation */}
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center text-xs font-bold">
                  {activeMediaModal.creator.slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">{activeMediaModal.creator}</h4>
                  <span className="text-[10px] text-slate-400">{activeMediaModal.handle}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Canvas */}
            <div className={`relative h-64 bg-gradient-to-tr ${activeMediaModal.coverGradient || 'from-pink-600 to-amber-600'} flex flex-col justify-between p-4 overflow-hidden`}>
              {/* Sound / HD Pill */}
              <div className="flex items-center justify-between relative z-10">
                <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-pink-400" /> Audio Playing
                </span>
                {getPlatformBadge(activeMediaModal.platform)}
              </div>

              {/* Center Play Icon & Quote */}
              <div className="space-y-2 text-center relative z-10 my-auto">
                <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md mx-auto flex items-center justify-center text-white shadow-lg animate-pulse-soft">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
                <p className="text-xs italic font-medium px-4 text-white/95 drop-shadow-md">
                  "{activeMediaModal.quote}"
                </p>
              </div>

              {/* Progress Timeline Bar */}
              <div className="space-y-1 relative z-10">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full w-2/3 animate-pulse" />
                </div>
                <div className="flex justify-between text-[10px] text-white/80 font-bold">
                  <span>0:42</span>
                  <span>{activeMediaModal.duration}</span>
                </div>
              </div>
            </div>

            {/* Interactive Comment Feed & Takeaways */}
            <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-slate-900 text-xs">
              <div>
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">
                  Singapore Financial Takeaway
                </span>
                <p className="text-slate-200 mt-1 font-medium leading-relaxed">
                  {activeMediaModal.keyTakeaway}
                </p>
              </div>

              {/* Sample Comments */}
              {activeMediaModal.sampleComments && activeMediaModal.sampleComments.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Community Comments ({activeMediaModal.commentsCount || '10+'})
                  </span>
                  {activeMediaModal.sampleComments.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-800/60 p-2 rounded-xl">
                      <span className="text-sm">{c.avatar}</span>
                      <div className="flex-1">
                        <span className="font-bold text-pink-300 text-[11px] block">{c.user}</span>
                        <p className="text-[11px] text-slate-200">{c.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-0.5">
                        <ThumbsUp className="w-2.5 h-2.5" /> {c.likes}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  playSound.coin();
                  confetti({ particleCount: 40, spread: 50 });
                  setActiveMediaModal(null);
                }}
                className="flex-1 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Apply to my BTO Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
