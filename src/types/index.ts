export type CompanionState = 'healthy' | 'slipping' | 'melting' | 'melted';

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
  platform: 'tiktok' | 'instagram' | 'moneysense';
  tag: string;
  duration: string;
  keyTakeaway: string;
  likes: string;
  isFollowed: boolean;
  quote: string;
}
