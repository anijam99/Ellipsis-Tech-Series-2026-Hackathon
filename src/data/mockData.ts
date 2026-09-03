import { Milestone, GovernmentScheme, SpendingMoment, FeedItem } from '../types';

export const INITIAL_USER = {
  name: 'Bryan Tan',
  age: 24,
  occupation: 'Junior Analyst',
  monthlyIncome: 3600,
  cpfOABalance: 14200,
  totalSaved: 5450,
  streakWeeks: 7,
  streakStartDate: '5 Jul 2026',
  lastCheckinDate: 'Sunday, 23 Aug 2026',
  profileCompleteness: 76,
  partnerName: 'Cheryl',
  partnerIncome: 3400,
};

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'emergency-buffer',
    title: 'Emergency buffer',
    subtitle: 'S$9,600 saved · done',
    targetCost: 9600,
    savedAmount: 9600,
    targetYear: '2026',
    status: 'done',
    icon: 'shield-check',
    color: '#ECC94B',
    category: 'buffer',
  },
  {
    id: 'bto-tengah',
    title: 'BTO flat · Tengah',
    subtitle: '4-Room Plantation Edge · Key collection Mar 2029',
    targetCost: 38000,
    savedAmount: 5450,
    targetYear: '2029',
    keyCollectionDate: 'Mar 2029',
    monthlyNeeded: 1050,
    monthsLeft: 31,
    status: 'in_progress',
    icon: 'home',
    color: '#FF6B8B',
    category: 'housing',
    cpfContribution: 18000,
    cashContribution: 20000,
  },
  {
    id: 'wedding',
    title: 'Wedding',
    subtitle: 'S$32,000 · 2031',
    targetCost: 32000,
    savedAmount: 0,
    targetYear: '2031',
    status: 'upcoming',
    icon: 'heart-handshake',
    color: '#9F7AEA',
    category: 'family',
  },
  {
    id: 'car',
    title: 'Car',
    subtitle: 'S$25,000 · 2034',
    targetCost: 25000,
    savedAmount: 0,
    targetYear: '2034',
    status: 'upcoming',
    icon: 'car',
    color: '#48BB78',
    category: 'lifestyle',
  },
];

export const INITIAL_SCHEMES: GovernmentScheme[] = [
  {
    id: 'skillsfuture',
    title: 'SkillsFuture Credit top-up',
    amount: 500,
    amountDisplay: 'S$500',
    effortTags: ['1 form, no documents', 'Singpass login'],
    eligibilityNote: 'Likely eligible — verify on application',
    category: 'training',
    matchConfidence: 'verified',
    claimed: true,
    officialAgency: 'SkillsFuture Singapore (SSG)',
    timeToApply: '2 mins via Singpass',
    description: 'One-off SkillsFuture Credit top-up to offset course fees for career transition or upskilling programmes.',
    steps: [
      'Login with Singpass on MySkillsFuture portal',
      'Search for approved eligible courses',
      'Apply credit deduction directly at checkout'
    ]
  },
  {
    id: 'cdc-vouchers',
    title: 'CDC vouchers, household',
    amount: 500,
    amountDisplay: 'S$500',
    effortTags: ['1 form, no documents', 'One per household'],
    eligibilityNote: 'Likely eligible — verify on application',
    category: 'cost_of_living',
    matchConfidence: 'verified',
    claimed: true,
    officialAgency: 'Community Development Council & PA',
    timeToApply: '1 min via RedeemSG',
    description: 'Government vouchers distributed to every Singaporean household to help cushion daily living expenses at participating heartland merchants & supermarkets.',
    steps: [
      'Visit redeem.gov.sg with Singpass',
      'Receive SMS link with digital voucher link',
      'Share link with household members or spend directly'
    ]
  },
  {
    id: 'workfare-skills',
    title: 'Workfare Skills Support (WSS)',
    amount: 1000,
    amountDisplay: 'S$1,000',
    effortTags: ['Longer form + income statements'],
    eligibilityNote: 'Likely eligible — verify on application',
    category: 'training',
    matchConfidence: 'high',
    claimed: false,
    officialAgency: 'Ministry of Manpower (MOM) & WSG',
    timeToApply: '10 mins + payslip upload',
    description: 'Training Allowance and Training Commitment Award for Singaporean workers seeking structured skills upgrades.',
    steps: [
      'Enroll in a WSQ certified skill development course',
      'Complete at least 75% attendance and pass assessment',
      'Submit claims through WSS portal with past 3 months payslips'
    ]
  },
  {
    id: 'ehg-grant',
    title: 'Enhanced CPF Housing Grant (EHG)',
    amount: 30000,
    amountDisplay: 'S$30,000',
    effortTags: ['Longer form + income statements', 'Paid to CPF OA'],
    eligibilityNote: 'Based on S$4,200 household income tier',
    category: 'housing',
    matchConfidence: 'unlocked',
    claimed: false,
    officialAgency: 'Housing & Development Board (HDB)',
    timeToApply: 'Submitted alongside HDB Flat Application (HFE letter)',
    description: 'Means-tested housing grant up to S$80,000 for eligible first-timer families buying new BTO or resale flats. Credited straight to CPF Ordinary Account.',
    steps: [
      'Apply for HDB Flat Eligibility (HFE) letter via HDB Flat Portal',
      'Auto-retrieve household income via MyInfo Singpass',
      'Grant is disbursed automatically to offset downpayment upon booking'
    ]
  },
  {
    id: 'climate-vouchers',
    title: 'Climate Friendly Households Programme',
    amount: 300,
    amountDisplay: 'S$300',
    effortTags: ['1 form, instant coupon'],
    eligibilityNote: 'All 1-room to 5-room HDB flats',
    category: 'sustainability',
    matchConfidence: 'high',
    claimed: false,
    officialAgency: 'National Environment Agency (NEA)',
    timeToApply: '1 min via RedeemSG',
    description: 'Climate vouchers to purchase resource-efficient appliances (refrigerators, LED lights, water-saving fittings) to lower utility bills.',
    steps: [
      'Claim vouchers at climate-friendly.gov.sg via Singpass',
      'Present voucher QR code at participating electronics retail stores'
    ]
  }
];

export const SPENDING_REFLECTION_WEEK = {
  dateRange: 'Mon 17 – Sun 23 Aug 2026',
  couldHaveSaved: 212,
  spent: 542,
  planned: 330,
  btoDaysDelayed: 6,
  reflectionQuote: 'Six days of your BTO deposit. Nothing is broken — this is just the week you had.',
  moments: [
    {
      id: 'm1',
      title: 'Waited 24 hours on trail runners',
      amount: 389,
      isPositive: true,
      btoImpact: 'Kept 11 days of BTO deposit where they were.',
      note: 'Impulse check prevented an unneeded shoe purchase',
      date: 'Wed 19 Aug',
      category: 'savings',
    },
    {
      id: 'm2',
      title: 'Food delivery, 7 orders',
      amount: 158,
      isPositive: false,
      btoImpact: 'Pushed key collection back about 5 days.',
      note: 'Late night supper and bubble tea orders accumulated',
      date: 'Fri 21 Aug',
      category: 'food',
    },
    {
      id: 'm3',
      title: 'Concert ticket, resale',
      amount: 168,
      isPositive: false,
      btoImpact: 'Pushed key collection back about 5 days. Worth it? Only you know.',
      note: 'Live event with friends',
      date: 'Sat 22 Aug',
      category: 'entertainment',
    },
  ] as SpendingMoment[],
};

export const LITERACY_FEED_ITEMS: FeedItem[] = [
  {
    id: 'f1',
    title: 'How Enhanced CPF Housing Grant (EHG) computes your grant step-by-step',
    creator: 'The Woke Salaryman',
    handle: '@thewokesalaryman',
    platform: 'tiktok',
    tag: 'BTO Grants',
    duration: '1:12',
    keyTakeaway: 'The lower your household income average over 12 months, the higher the grant (up to $80,000). Applying right after graduation can maximise entitlement.',
    likes: '42.8k',
    commentsCount: '1.2k',
    sharesCount: '8.4k',
    isFollowed: true,
    quote: 'Timing your BTO application before your first major pay raise can unlock an extra $15k to $30k in government grants.',
    coverGradient: 'from-pink-500 to-rose-600',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    verified: true,
    sampleComments: [
      { user: 'kai_sg', avatar: '😎', text: 'This saved me and my partner $25k on our Tampines BTO!', likes: '342' },
      { user: 'cheryl_t', avatar: '🌸', text: 'Does this apply if one partner is still in uni?', likes: '189' },
    ]
  },
  {
    id: 'f2',
    title: 'Why Buy-Now-Pay-Later quietly melts your downpayment goal',
    creator: 'MoneySense SG',
    handle: '@moneysense_sg',
    platform: 'moneysense',
    tag: 'Spending Habits',
    duration: '2:45',
    keyTakeaway: 'S$40/month micro-instalments create mental accounting blind spots, making you 3x more likely to spend above monthly budget.',
    likes: '19.4k',
    commentsCount: '412',
    sharesCount: '2.1k',
    isFollowed: true,
    quote: 'Translate every cart item into your goal currency: is this jacket worth working 3 extra weeks for your keys?',
    coverGradient: 'from-emerald-500 to-teal-700',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    verified: true,
    sampleComments: [
      { user: 'darren_fin', avatar: '💡', text: 'JITAI concept in Ice Kaching is exactly the antidote to this.', likes: '94' }
    ]
  },
  {
    id: 'f3',
    title: 'CPF OA vs Cash for BTO Downpayment: The 2.5% vs 4% maths showdown',
    creator: 'Sethisfy',
    handle: '@sethisfy',
    platform: 'youtube',
    tag: 'CPF Hacks',
    duration: '6:18',
    keyTakeaway: 'Leaving up to $20,000 in your CPF OA preserves compounding at guaranteed 2.5% - 3.5% p.a. while providing an emergency mortgage buffer.',
    likes: '31.1k',
    commentsCount: '870',
    sharesCount: '4.5k',
    isFollowed: false,
    quote: 'Do not wipe out your entire CPF OA down to $0 if you have stable cashflow.',
    coverGradient: 'from-red-600 to-amber-600',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    verified: true,
    sampleComments: [
      { user: 'marcus_low', avatar: '📈', text: 'The OA 20k buffer rule saved me during job transition.', likes: '512' }
    ]
  },
  {
    id: 'f4',
    title: '5 Singaporeans share their actual BTO Renovation cost breakdowns (2026)',
    creator: 'Hevea Living / Qanvast',
    handle: '@hevealiving',
    platform: 'instagram',
    tag: 'BTO Grants',
    duration: '1:45',
    keyTakeaway: 'Average 4-room BTO renovation costs S$42,000 to S$55,000. Carpentry and wet works consume 60% of total outlay.',
    likes: '28.9k',
    commentsCount: '630',
    sharesCount: '11.2k',
    isFollowed: false,
    quote: 'Avoid hacking non-structural walls to save up to S$6,000 in contractor fees.',
    coverGradient: 'from-purple-600 to-pink-600',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    verified: true,
    sampleComments: [
      { user: 'valerie_w', avatar: '🏡', text: 'The Tengah estate group chat was talking about this yesterday!', likes: '204' }
    ]
  },
  {
    id: 'f5',
    title: 'r/singaporefi Discussion: "How are 24-year-olds budgeting for Tengah BTO in 2026?"',
    creator: 'u/singaporean_dreamer',
    handle: 'r/singaporefi',
    platform: 'reddit',
    tag: 'Spending Habits',
    duration: '4 min read',
    keyTakeaway: 'Top upvoted strategy: Stacking CPF OA contributions from first job with couple income grants rather than taking commercial personal loans.',
    likes: '1.8k upvotes',
    commentsCount: '348 comments',
    sharesCount: '580',
    isFollowed: true,
    quote: 'If you start saving S$1,000/month consistently alongside CPF, 4-room downpayment is 100% achievable in 30 months without touching your emergency buffer.',
    coverGradient: 'from-orange-500 to-amber-700',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    verified: false,
    sampleComments: [
      { user: 'cpf_enthusiast', avatar: '🤖', text: 'Spot on. EHG + CPF OA handles downpayment completely.', likes: '489' },
      { user: 'bryan_t', avatar: '🍧', text: 'Currently tracking this exact milestone on Ice Kaching!', likes: '172' }
    ]
  },
  {
    id: 'f6',
    title: 'How to claim all your $500 CDC Vouchers before year-end expiry',
    creator: 'GovTech Singapore',
    handle: '@govtechsg',
    platform: 'moneysense',
    tag: 'Gov Grants',
    duration: '1:05',
    keyTakeaway: 'One representative per household claims via RedeemSG; vouchers split $250 heartland merchants and $250 supermarkets with zero paperwork.',
    likes: '58.2k',
    commentsCount: '920',
    sharesCount: '34.1k',
    isFollowed: true,
    quote: 'Zero paperwork, instant SMS activation and family share link.',
    coverGradient: 'from-blue-600 to-indigo-700',
    imageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80',
    verified: true,
    sampleComments: [
      { user: 'aunty_may', avatar: '🛒', text: 'Already redeemed at Clementi market this morning!', likes: '310' }
    ]
  }
];
