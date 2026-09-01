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
    title: 'How Enhanced CPF Housing Grant (EHG) actually computes your grant',
    creator: 'The Woke Salaryman',
    handle: '@thewokesalaryman',
    platform: 'tiktok',
    tag: 'BTO Grants',
    duration: '1:12',
    keyTakeaway: 'The lower your household income average over 12 months, the higher the grant (up to $80,000). Applying right after graduation can maximise entitlement.',
    likes: '42.8k',
    isFollowed: true,
    quote: 'Timing your BTO application before your first major pay raise can unlock an extra $15k to $30k in government grants.'
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
    isFollowed: true,
    quote: 'Translate every cart item into your goal currency: is this jacket worth working 3 extra weeks for your keys?'
  },
  {
    id: 'f3',
    title: 'CPF OA vs Cash for BTO Downpayment: The 2.5% maths breakdown',
    creator: 'Sethisfy',
    handle: '@sethisfy',
    platform: 'tiktok',
    tag: 'CPF Hacks',
    duration: '0:58',
    keyTakeaway: 'Leaving up to $20,000 in your CPF OA preserves compounding at guaranteed 2.5% - 3.5% p.a. while providing a safety buffer.',
    likes: '31.1k',
    isFollowed: false,
    quote: 'Do not wipe out your entire CPF OA down to $0 if you have stable cashflow.'
  },
  {
    id: 'f4',
    title: 'How to claim all your $500 CDC Vouchers before expiry',
    creator: 'GovTech Singapore',
    handle: '@govtechsg',
    platform: 'moneysense',
    tag: 'Gov Grants',
    duration: '1:05',
    keyTakeaway: 'One representative per household claims via RedeemSG; vouchers split $250 heartland merchants and $250 supermarkets.',
    likes: '58.2k',
    isFollowed: true,
    quote: 'Zero paperwork, instant SMS activation.'
  }
];
