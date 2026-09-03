# 🍧 Ice Kaching 🤑 | Singapore Financial Literacy & Support Maximiser

> **Ellipsis Tech Series 2026 Hackathon Proposal & Prototype**  
> **Team:** Soju (SMU School of Computing and Information Systems)  
> **Target Audience:** Singapore Gen Z & Young Adults (Aged 18–28)

---

## 📌 Executive Summary

**Ice Kaching** is a mobile-first financial companion app that transforms abstract financial prudence into a sweet, engaging, and daily habit for young Singaporeans. 

Instead of forcing users through boring textbook modules or commission-driven financial advisors, **Ice Kaching** bridges the gap by:
1. **Gamified Virtual Companion**: An interactive *Ice Kachang* dessert avatar that stays sweet and full when on track, and melts when spending drifts.
2. **Concrete Life Milestones Journey**: Mapping savings progress directly to tangible Singapore milestones (e.g., BTO Flat key collection, wedding, emergency fund) with automated CPF Ordinary Account (OA) and grant forecasting.
3. **The Support Maximiser**: Matching verified Singpass & SGFinDex profiles to eligible government grants and subsidies (e.g., Enhanced CPF Housing Grant, CDC Vouchers, SkillsFuture Credit), sorted by how little paperwork each takes.
4. **Just-In-Time Adaptive Interventions (JITAI)**: Translating impulse purchases into plain language at checkout (e.g., *"This S$389 pair of trail runners costs 11 days off your Tengah BTO flat deposit"*).
5. **Opt-in Literacy Feed**: Injecting vetted MoneySense content and financial creators directly into their social media habits.
6. **Live AI Financial Coach**: A chat inside the Support tab answers real questions about budgeting, CPF, and saving — this one calls a live LLM, not a script (see "What's Real vs. Simulated" below).

---

## 🎯 The Problem Addressed

Young Singaporeans aged 18 to 28 are unadvised, unprepared for large upcoming financial commitments (BTO flats, weddings, parenthood), and unwilling to be lectured:

- **Scattered Government Support**: Singapore offers extensive grants, vouchers, and subsidies (SupportGoWhere, CPF, HDB, IRAS, SkillsFuture), but information is fragmented across disparate portals. Non-take-up is primarily a **knowledge and friction gap**, not an eligibility gap.
- **Impulse Culture & Buy-Now-Pay-Later (BNPL)**: Frictionless digital checkout and social media shopping normalise unsustainable lifestyles before financial habits solidify.
- **Distrust & Low Engagement**: 22% of young Singaporean investors in their 20s rely solely on social media (TikTok/IG) for financial tips. They distrust commission-earning advisors and lack the patience for traditional financial courses.

---

## 💡 How Ice Kaching Stands Out

| Feature / Dimension | Traditional Finance Apps & Portals | Ice Kaching |
| :--- | :--- | :--- |
| **Outreach Philosophy** | Correcting people already mid-crisis | **Shaping a default early (18–28)** before commitments lock in |
| **Government Schemes** | Published statically across 10+ portals | **Matched to profile & sorted by lowest friction first** |
| **Spending Feedback** | Scolding with charts & *"You overspent"* | **Opportunity cost in plain language** (*"Costs 5 days of your BTO deposit"*) |
| **Habit Engagement** | Dry spreadsheets & boring notifications | **Ice Kachang Tamagotchi companion (4 visual states)** |
| **Actionable Timing** | Month-end backward-looking review | **Just-in-Time Purchase Check** with native share sheet |

---

## 🔍 What's Real vs. Simulated

A hackathon prototype earns more trust by naming its own limits than by hoping nobody asks. Here's exactly what's live and what's staged in this build:

| Piece | In this prototype | In production |
| :--- | :--- | :--- |
| **Financial coach chat** (Support tab) | **Genuinely live.** Streams real responses from an LLM via the OpenRouter API — see Tech Stack below. | Self-hosted, open-weights model on Singapore-based infrastructure, fenced to a cited scheme dataset. |
| Companion state (healthy/slipping/melting/melted) | Set by hand from the demo toolbar, or via the `?state=` URL parameter | Rules-based state machine driven by real check-ins and spending |
| Singpass / SGFinDex login | Simulated consent modal with seeded CPF, deposit, and profile data | Accredited Singpass/SGFinDex integration (requires accreditation we can't obtain in a hackathon window) |
| Purchase-check push notification | Scripted two-stage banner in the ShopLah demo app; the delay-calculation logic itself is real | Same logic, triggered by a real open-banking event or the native share sheet |
| Scheme amounts & milestone costs | Seeded from published HDB, CPF, MOM, and SkillsFuture Singapore figures | Same sources, kept in sync |

**The one thing actually talking to an external service right now is the chat.** Everything else on screen is local, in-memory mock data (`src/data/mockData.ts`) reset on every page reload — deliberately, since none of those interactions needed a backend to prove the point.

---

## 📱 Key Features in this Prototype

All features and UI designs are built faithfully based on the proposal mockups in `ProposalSubmission_Soju.pdf`:

### 1. 🍧 The Ice Kaching Companion (Home Screen)
- Interactive shaved-ice avatar reflecting financial status in real time.
- **4 Dynamic States:**
  - **Healthy (On Track):** Shaved ice bowl is full and colorful with rainbow syrups (rose pink, pandan green, sweet corn yellow), smiling eyes, and blush.
  - **Slipping:** Colors drain slightly, calm/focused expression indicating minor budget drift.
  - **Melting:** Shaved ice dome slumps, syrup drips down the side, sad downturned mouth.
  - **Melted:** Puddled syrup pool with floating coins and toppings, sad expression indicating repeated missed check-ins.
- Quick metrics: Check-in Streak (`7 wks`), Next Milestone (`31 mths`), Grants Claimed (`2/5`).
- One-tap check-in with celebratory confetti and streak tracking.

### 2. 🗺️ Financial Milestones Journey (`Your Journey`)
- Visual winding roadmap connecting milestones:
  - 🛡️ **Emergency buffer** (S$9,600 saved · DONE ✅)
  - 📍 **"You" indicator** sitting on the path
  - 🏠 **BTO flat · Tengah** (Target S$38,000 · S$5,450 saved / 14% · Mar 2029 key collection)
  - 💍 **Wedding** (S$32,000 · 2031)
  - 🚗 **Car** (S$25,000 · 2034)
- Journey Engine forecasting: Computes monthly savings needed (`S$1,050/mo`), factoring in CPF OA balance (`S$14,200`) and grant projections.
- Customizable parameters: Flat type picker (3-Room / 4-Room / 5-Room) and Couple Shared Journey toggle (sharing goals with partner Cheryl).

### 3. 💰 Support Maximiser (`Support you may be owed`)
- Matches government schemes sorted by **least friction / effort first**:
  1. **SkillsFuture Credit top-up** (`S$500` · 1 form, no documents, Singpass login)
  2. **CDC vouchers, household** (`S$500` · 1 form, no documents, RedeemSG)
  3. **Workfare Skills Support (WSS)** (`S$1,000` · Longer form + income statements)
  4. **Enhanced CPF Housing Grant (EHG)** (`S$30,000` · Paid to CPF OA)
  5. **Climate Friendly Households Voucher** (`S$300` · Instant coupon)
- Interactive scheme detail drawer with step-by-step claim instructions and simulated Singpass claim action.

### 4. 🤖 Talk to Ice Kaching — Live AI Financial Coach (`Support` tab)
- The one feature in this build that calls a real external service. Tap **"Talk to Ice Kaching"** at the top of the Support tab to open a chat modal that streams genuine responses from an LLM, not a canned script.
- Backed by the [OpenRouter](https://openrouter.ai/) chat completions API, calling `inclusionai/ling-3.0-flash-fin:free` with streamed (SSE) responses rendered token-by-token as they arrive.
- System-prompted as "a warm and practical Singapore financial coach" that answers on budgeting, saving, and CPF, while declining to claim it's a licensed adviser and pointing users to official sources for anything time-sensitive.
- Fails gracefully: if the request errors (no network, no key, rate limit), the chat shows *"I could not connect right now. Please try again in a moment."* instead of breaking.
- Requires a `VITE_OPENROUTER_API_KEY` environment variable to function — see "Setup and Running Instructions" below. Every other screen in this app works without it; this is the only one that doesn't.

### 5. 🛒 Spending Reflection & Just-In-Time Purchase Check (`Your Week`)
- Weekly reflection card: *"Could have been saved: S$212 — Six days of your BTO deposit. Nothing is broken — this is just the week you had."*
- Bar comparison of Spent (`S$542`) vs Planned (`S$330`).
- **"Three moments that moved the needle":**
  - 🟢 *Waited 24 hours on trail runners* (`+S$389` · Kept 11 days of BTO deposit)
  - 🟠 *Food delivery, 7 orders* (`S$158` · Pushed key collection back ~5 days)
  - 🟠 *Concert ticket, resale* (`S$168` · Pushed key collection back ~5 days)
- **Interactive Purchase Check Simulator (JITAI):** Type any item price or pick presets (e.g. *AirPods Max S$749*, *Omakase S$220*, *Shopee haul S$95*) to see immediate delay calculations and companion reactions before buying. Choose *“Wait 24 Hours”* to bank the delay and restore companion happiness!
- **The same check also runs live from the ShopLah demo app** (switch to it via the app switcher): completing a purchase there fires a real two-stage push notification — a wallet debit alert, then a JITAI alert 1.4 seconds later — and tapping the JITAI alert drops you straight into Purchase Check with that exact item preloaded.

### 6. 💬 Profile Completion Chat & Singpass SGFinDex Sync
- Conversational questionnaire asking minimal-friction questions (e.g., household size). This one is scripted (quick-reply buttons, not a model) — the live chat is Feature 4, above.
- Simulated Singpass & SGFinDex authentication modal for user persona **Bryan Tan (24, Junior Analyst)** that unlocks verified CPF OA balances and elevates profile completeness to 100%.

### 7. 📚 Opt-in Financial Literacy Feed
- Bite-sized takeaways from verified Singapore creators (*The Woke Salaryman, Sethisfy, GovTech, MoneySense*).
- Filterable by topic: *BTO Grants, Spending Habits, CPF Hacks, Gov Grants*.
- Interactive "Follow creator" buttons to simulate algorithm tuning.

---

## 🛠️ Tech Stack & Solution Architecture

- **Frontend / Client:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **AI / LLM (live in this build):** [OpenRouter](https://openrouter.ai/) chat completions API, model `inclusionai/ling-3.0-flash-fin:free`, called directly from the client and streamed via server-sent events. Powers the "Talk to Ice Kaching" coach only — see Feature 4 above. This is the single external network call this prototype makes.
- **Design Philosophy:** Clean, warm Singapore pastel aesthetic (`#FF6B8B` rose syrup, `#48BB78` pandan green, `#ECC94B` sweet corn yellow), responsive mobile container with toggleable iPhone 16 Pro mockup frame.
- **Backend Architecture (Production Design):**
  - **Auth:** Singpass / MyInfo authentication (Supabase Auth in demo).
  - **Financial Data:** SGFinDex public financial data exchange & Open Banking APIs (Finverse).
  - **Journey & Maximiser Engine:** Centralized calculations for milestone gap and scheme eligibility.
  - **LLM hosting:** A third-party hosted model is acceptable for demonstrating the profile-completion flow against seeded, non-real data. Before real user financial data passes through it, this moves to a self-hosted, open-weights model on Singapore-based infrastructure, still constrained to a cited scheme dataset so it can't hallucinate entitlements.

---

## 🚀 Setup and Running Instructions

### Prerequisites
- **Node.js**: Version 18.0.0 or later (Node v24+ recommended)
- **npm**: Version 9.0.0 or later

### Step 1: Clone and Enter the Repo
```bash
git clone https://github.com/Slyf0xXX/soju-ice-kaching.git
cd soju-ice-kaching
```
The app lives at the repo root — there's no subfolder to `cd` into.

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure the AI Coach (optional, but do it)
The rest of the app runs fine without this step — only the **"Talk to Ice Kaching"** chat (Feature 4) needs it.
```bash
cp .env.example .env
```
Open `.env` and set `VITE_OPENROUTER_API_KEY` to a key from [openrouter.ai](https://openrouter.ai/) (free tier works — the app calls a `:free` model). Skip this step and every other screen still works; the chat just shows its "could not connect" message instead of a real reply.

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: Open in Your Browser
Visit the local URL shown in your terminal (typically **[http://localhost:5173](http://localhost:5173)**).

---

## 🧪 Interactive Demo Guide for Judges & Evaluators

When exploring the app:
1. **Test the 4 Companion States:** Use the top toolbar state buttons (**Healthy**, **Slipping**, **Melting**, **Melted**) to immediately see how the Ice Kachang mascot dynamically shifts expressions, syrup drippings, and puddles across any screen.
2. **Perform a Check-in:** On the **Home** tab, tap the **"Check in"** button to witness the streak increment and confetti animation. Tap the Ice Kachang companion to hear his thoughts!
3. **Simulate a Purchase Check (JITAI):** Navigate to the **Spending** tab, switch to **Purchase Check**, and click on presets like *AirPods Max (S$749)* or *Omakase Dinner (S$220)*. Click **"Wait 24 Hours"** to see your companion turn Healthy!
4. **Complete the Profile via Singpass:** Navigate to the **Support** tab, click **"Finish Profile"**, send a chat message, and tap **"Connect Singpass"** to simulate the Singpass / SGFinDex login flow.
5. **Talk to the Live AI Coach:** Still on the **Support** tab, tap **"Talk to Ice Kaching"** near the top and ask it something like *"How much CPF do I need for a BTO downpayment?"* — this reply is a real, streamed LLM response, not a script. Requires `VITE_OPENROUTER_API_KEY` to be set (Step 3 above) and a working internet connection.
6. **Switch Viewports:** Click the **"Full View / Mobile Frame"** toggle in the top control bar to switch between the framed iPhone 16 Pro layout and full-width responsive mode.
