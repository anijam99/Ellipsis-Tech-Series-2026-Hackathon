export type CompanionState = 'healthy' | 'slipping' | 'melting' | 'melted';

export type AppViewMode = 'os-home' | 'ice-kaching' | 'shopping';

export type SocialPlatform = 'tiktok' | 'instagram' | 'youtube' | 'reddit' | 'moneysense';

export interface FeedComment {
  user: string;
  avatar: string;
  text: string;
  likes: string;
}

export interface Milestone {
  id: string;
  title: string;
  subtitle?: string;
  targetCost: number;
  savedAmount: number;
  targetYear: string;
  keyCollectionDate?: string;
  monthlyNeeded?: number;
  monthsLeft?: number;
  status: 'done' | 'in_progress' | 'upcoming';
  icon: string;
  color: string;
  category: 'housing' | 'lifestyle' | 'family' | 'buffer';
  cpfContribution?: number;
  cashContribution?: number;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  amount: number;
  amountDisplay: string;
  effortTags: string[];
  eligibilityNote: string;
  category: 'training' | 'cost_of_living' | 'housing' | 'sustainability' | 'retirement';
  matchConfidence: 'high' | 'verified' | 'unlocked';
  claimed: boolean;
  officialAgency: string;
  timeToApply: string;
  description: string;
  steps: string[];
  unlockRequirement?: string;
}

export interface SpendingMoment {
  id: string;
  title: string;
  amount: number;
  isPositive: boolean;
  btoImpact: string;
  note: string;
  date: string;
  category: 'impulse' | 'food' | 'entertainment' | 'savings';
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  impactNote?: string;
  quickReplies?: string[];
  actionType?: 'singpass' | 'input' | 'none';
}

export interface FeedItem {
  id: string;
  title: string;
  creator: string;
  handle: string;
  platform: SocialPlatform;
  tag: string;
  duration: string;
  keyTakeaway: string;
  likes: string;
  commentsCount?: string;
  sharesCount?: string;
  isFollowed: boolean;
  quote: string;
  coverGradient?: string;
  mediaEmoji?: string;
  imageUrl?: string;
  verified?: boolean;
  sampleComments?: FeedComment[];
}

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  soldCount: string;
  category: 'electronics' | 'fashion' | 'lifestyle' | 'gaming';
  image: string;
  emoji: string;
  tag?: string;
  description: string;
  btoDelayDays: number;
}

export interface PushNotification {
  id: string;
  appName: string;
  title: string;
  message: string;
  timeAgo: string;
  actionData?: {
    itemName: string;
    itemPrice: number;
    daysDelayed: number;
  };
}
