import React, { useState, useRef, useEffect } from 'react';
import { FeedItem, SocialPlatform } from '../../types';
import {
  Sparkles,
  Share2,
  Heart,
  Bookmark,
  UserCheck,
  UserPlus,
  Play,
  MessageCircle,
  Volume2,
  CheckCircle2,
  ThumbsUp,
  X,
  ChevronUp,
  ChevronDown,
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
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['f1']));
  const [activeMediaModal, setActiveMediaModal] = useState<FeedItem | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set(['f1', 'f3']));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const platformTabs = [
    { id: 'all', label: '🌟 All' },
    { id: 'tiktok', label: '🎵 TikTok' },
    { id: 'instagram', label: '📸 Reels' },
    { id: 'youtube', label: '▶️ Shorts' },
    { id: 'reddit', label: '💬 Reddit' },
    { id: 'moneysense', label: '🇸🇬 Official' },
  ];

  const filteredItems = feedItems.filter(item => {
    return selectedPlatform === 'all' || item.platform === selectedPlatform;
  });

  // Reset scroll position when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [selectedPlatform]);

  // IntersectionObserver to track which card is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.findIndex(r => r === entry.target);
            if (idx !== -1) setCurrentIndex(idx);
          }
        });
      },
      { root: containerRef.current, threshold: 0.6 }
    );
    cardRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [filteredItems]);

  const scrollToIndex = (idx: number) => {
    const el = cardRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
          colors: ['#E4657F', '#FDA4AF'],
          origin: { x: (e.clientX / window.innerWidth), y: (e.clientY / window.innerHeight) }
        });
      }
      return next;
    });
  };

  const getPlatformBadge = (platform: SocialPlatform) => {
    switch (platform) {
      case 'tiktok':
        return <span className="bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1">🎵 TikTok</span>;
      case 'instagram':
        return <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">📸 Reels</span>;
      case 'youtube':
        return <span className="bg-red-600/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">▶️ Shorts</span>;
      case 'reddit':
        return <span className="bg-orange-600/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">💬 Reddit</span>;
      case 'moneysense':
        return <span className="bg-emerald-700/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">🇸🇬 Official</span>;
    }
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden bg-black select-none">
      {/* Floating Platform Filter */}
      <div className="absolute top-0 left-0 right-0 z-30 px-3 pt-2 pb-1 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Title pill */}
          <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5">
            <span className="text-white font-black text-sm">Financial Feed</span>
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => { playSound.pop(); setShowFilters(f => !f); }}
            className="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1"
          >
            {platformTabs.find(t => t.id === selectedPlatform)?.label ?? '🌟 All'}
            <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expandable filter row */}
        {showFilters && (
          <div className="mt-2 flex gap-1.5 overflow-x-auto scrollbar-none pointer-events-auto pb-1 animate-slide-up-fade">
            {platformTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { playSound.pop(); setSelectedPlatform(tab.id); setShowFilters(false); }}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap text-[11px] transition-all ${
                  selectedPlatform === tab.id
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'bg-black/60 backdrop-blur-md text-white/80 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reel scroll container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-none"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {filteredItems.length === 0 && (
          <div className="h-full flex items-center justify-center text-white/60 text-sm font-medium">
            No posts for this filter
          </div>
        )}

        {filteredItems.map((item, idx) => {
          const isSaved = bookmarkedIds.has(item.id);
          const isLiked = likedIds.has(item.id);

          return (
            <div
              key={item.id}
              ref={el => { cardRefs.current[idx] = el; }}
              className="relative h-full w-full snap-start snap-always shrink-0 overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
              onClick={() => {
                playSound.pop();
                setActiveMediaModal(item);
              }}
            >
              {/* Full-bleed background */}
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${item.coverGradient || 'from-pink-500 to-rose-900'}`}
                />
              )}
              {/* Dark vignette for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

              {/* Center content: emoji + play */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                {!item.imageUrl && <span className="text-7xl drop-shadow-xl">{item.mediaEmoji || '🎥'}</span>}
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
                  <Play className="w-7 h-7 fill-white text-white ml-1" />
                </div>
                <span className="text-white/90 text-xs font-semibold drop-shadow-md">Tap to play</span>
              </div>

              {/* Bottom-left: creator info + title */}
              <div className="absolute bottom-0 left-0 right-14 p-4 pb-6 space-y-2 pointer-events-none">
                {/* Platform badge */}
                <div>{getPlatformBadge(item.platform)}</div>

                {/* Creator */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-amber-400 text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                    {item.creator.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-white font-bold text-xs drop-shadow">{item.creator}</span>
                      {item.verified && (
                        <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400" />
                      )}
                    </div>
                    <span className="text-white/70 text-[10px]">{item.handle}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound.pop();
                      onToggleFollow(item.id);
                    }}
                    className={`ml-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all pointer-events-auto ${
                      item.isFollowed
                        ? 'bg-white/20 text-white/80'
                        : 'bg-white text-black'
                    }`}
                  >
                    {item.isFollowed ? <><UserCheck className="w-3 h-3 inline mr-0.5" />Following</> : <><UserPlus className="w-3 h-3 inline mr-0.5" />Follow</>}
                  </button>
                </div>

                {/* Title */}
                <h2 className="text-white font-extrabold text-sm leading-snug drop-shadow-md line-clamp-2">
                  {item.title}
                </h2>

                {/* Key takeaway */}
                <p className="text-white/75 text-[11px] leading-relaxed line-clamp-2">
                  {item.keyTakeaway}
                </p>

                {/* Tag chip */}
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-pink-300 bg-pink-500/25 backdrop-blur-sm px-2 py-0.5 rounded-md border border-pink-400/30">
                  {item.tag}
                </span>
              </div>

              {/* Right sidebar: action buttons */}
              <div
                className="absolute right-3 bottom-10 flex flex-col items-center gap-5"
                onClick={e => e.stopPropagation()}
              >
                {/* Like */}
                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-pink-500' : 'bg-black/40 backdrop-blur-md'}`}>
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
                  </div>
                  <span className="text-white text-[10px] font-bold drop-shadow">{item.likes}</span>
                </button>

                {/* Comments */}
                {item.commentsCount && (
                  <button className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-[10px] font-bold drop-shadow">{item.commentsCount}</span>
                  </button>
                )}

                {/* Bookmark */}
                <button
                  onClick={(e) => toggleBookmark(item.id, e)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${isSaved ? 'bg-amber-500' : 'bg-black/40 backdrop-blur-md'}`}>
                    <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white text-white' : 'text-white'}`} />
                  </div>
                  <span className="text-white text-[10px] font-bold drop-shadow">Save</span>
                </button>

                {/* Share */}
                <button className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-[10px] font-bold drop-shadow">Share</span>
                </button>
              </div>

              {/* Duration badge (top-right corner) */}
              <div className="absolute top-14 right-3 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white">
                {item.duration}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll position indicator (dots) */}
      {filteredItems.length > 1 && (
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-20 pointer-events-none">
          {filteredItems.slice(0, 10).map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'h-5 bg-pink-400' : 'h-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* Swipe hint on first load */}
      {currentIndex === 0 && filteredItems.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce pointer-events-none">
          <ChevronUp className="w-4 h-4 text-white/60" />
          <span className="text-white/60 text-[10px] font-bold">Swipe up</span>
        </div>
      )}

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
            <div className="relative h-64 flex flex-col justify-between p-4 overflow-hidden bg-slate-900">
              {activeMediaModal.imageUrl ? (
                <img src={activeMediaModal.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-tr ${activeMediaModal.coverGradient || 'from-pink-600 to-amber-600'}`} />
              )}
              {/* Vignette */}
              <div className="absolute inset-0 bg-black/40" />
              
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
