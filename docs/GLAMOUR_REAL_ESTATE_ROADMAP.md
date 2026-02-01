# Glamour Real Estate Platform - Implementation Roadmap

> **Vision**: A disruptive real estate platform combining social commerce, commission-sharing referrals (Reglams), and AI-powered property discovery.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Core Concepts](#core-concepts)
3. [User Personas](#user-personas)
4. [Technical Architecture](#technical-architecture)
5. [Feature Roadmap](#feature-roadmap)
6. [Database Schema](#database-schema)
7. [Reglam Commission System](#reglam-commission-system)
8. [Innovative & Disruptive Features](#innovative--disruptive-features)
9. [Integrations](#integrations)
10. [Monetization Strategy](#monetization-strategy)
11. [Phase Timeline](#phase-timeline)

---

## Executive Summary

Glamour transforms real estate transactions by introducing **social commerce mechanics** to property sales. The platform enables property listings with a revolutionary **Reglam** system—a referral chain where commissions are distributed to all participants who contributed to a sale.

### Key Differentiators

| Feature             | Traditional Platforms   | Glamour                      |
| ------------------- | ----------------------- | ---------------------------- |
| Referral Model      | Single agent commission | Multi-level Reglam chain     |
| Social Proof        | Basic likes/views       | Configurable social metrics  |
| Discovery           | Search-based            | AI + Social + Location-aware |
| Commission Tracking | Manual                  | Blockchain-verified trails   |
| Listing Control     | Platform-defined        | Seller-configurable cards    |

---

## Core Concepts

### Property Types

```typescript
type PropertyType =
  | 'flat' // Apartments, condos
  | 'house' // Standalone houses
  | 'duplex' // Multi-family homes
  | 'office' // Commercial office space
  | 'building' // Entire buildings
  | 'land' // Raw land plots
  | 'farm' // Agricultural land
  | 'factory' // Industrial facilities
  | 'warehouse' // Storage facilities
  | 'retail' // Shops, malls
  | 'hotel'; // Hospitality

type ListingType = 'sale' | 'rent' | 'lease' | 'auction' | 'joint-venture';

type ListingStatus = 'draft' | 'pending-verification' | 'active' | 'under-offer' | 'sold' | 'rented' | 'expired' | 'withdrawn';
```

### Reglam System

**Reglam** = Re-glamorize = Social sharing with commission tracking

```
Original Listing → Reglam A → Reglam B → Reglam C → Sale
                      ↓           ↓           ↓
                   Commission  Commission  Commission
                     (2%)        (1.5%)      (1%)
```

---

## User Personas

### 1. Individual Seller

- Homeowners selling/renting personal property
- One-time or occasional listers
- Needs: Simple listing, verification, secure transactions

### 2. Real Estate Agent

- Licensed professionals
- Multiple listings, client management
- Needs: CRM tools, lead tracking, commission management

### 3. Agency/Company

- Real estate firms, developers
- Bulk listings, team management
- Needs: White-label options, analytics, API access

### 4. Buyer/Renter

- Property seekers
- Needs: Search, save, compare, schedule viewings

### 5. Reglammer (Influencer/Affiliate)

- Social media presence
- Shares properties for commission
- Needs: Easy sharing, earnings dashboard, analytics

---

## Technical Architecture

### Recommended Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────────────────────────────────────────────────┤
│  Next.js 15 (App Router) + React 19 + TypeScript            │
│  TailwindCSS + shadcn/ui + Framer Motion                    │
│  React Query + Apollo Client (GraphQL)                       │
│  PWA + React Native (Mobile)                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
├─────────────────────────────────────────────────────────────┤
│  GraphQL Federation (Apollo Router)                          │
│  REST endpoints for webhooks/integrations                    │
│  WebSocket for real-time (notifications, chat)               │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  Property     │   │  User         │   │  Transaction  │
│  Service      │   │  Service      │   │  Service      │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ - Listings    │   │ - Auth/IAM    │   │ - Payments    │
│ - Search      │   │ - Profiles    │   │ - Escrow      │
│ - Media       │   │ - KYC         │   │ - Commissions │
│ - Analytics   │   │ - Preferences │   │ - Reglam Chain│
└───────────────┘   └───────────────┘   └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL (Primary)    │  Redis (Cache/Sessions)          │
│  Elasticsearch (Search)  │  S3/Cloudflare R2 (Media)        │
│  TimescaleDB (Analytics) │  Blockchain (Commission Trails)  │
└─────────────────────────────────────────────────────────────┘
```

### Nx Monorepo Structure

```
apps/
  ├── web/                    # Main Next.js app
  ├── mobile/                 # React Native app
  ├── admin/                  # Admin dashboard
  ├── api/                    # NestJS API gateway
  └── api-e2e/

libs/
  ├── shared/
  │   ├── models/             # TypeScript interfaces
  │   ├── utils/              # Common utilities
  │   └── constants/          # Enums, config
  │
  ├── property/
  │   ├── data/               # Property API/state
  │   ├── feature-listing/    # Create/edit listings
  │   ├── feature-search/     # Search & filters
  │   ├── feature-detail/     # Property detail view
  │   └── ui/                 # Property components
  │
  ├── reglam/
  │   ├── data/               # Reglam state/API
  │   ├── feature-share/      # Share mechanics
  │   ├── feature-track/      # Commission tracking
  │   └── ui/                 # Reglam components
  │
  ├── user/
  │   ├── data/               # User state/API
  │   ├── feature-auth/       # Authentication
  │   ├── feature-profile/    # User profiles
  │   ├── feature-kyc/        # Verification
  │   └── ui/                 # User components
  │
  ├── transaction/
  │   ├── data/               # Transaction state
  │   ├── feature-payment/    # Payment processing
  │   ├── feature-escrow/     # Escrow management
  │   └── feature-commission/ # Commission distribution
  │
  └── ui/
      ├── shared-ui/          # Design system (existing)
      ├── property-card/      # Property card variants
      └── maps/               # Map components
```

---

## Feature Roadmap

### Phase 1: Foundation (MVP) - 8 weeks

#### Core Listings

- [ ] Property CRUD operations
- [ ] Multi-image/video upload with optimization
- [ ] Property verification workflow
- [ ] Basic search with filters
- [ ] Map integration (Google Maps/Mapbox)
- [ ] Property detail pages

#### User Management

- [ ] Authentication (Email, Phone, OAuth)
- [ ] User roles (Buyer, Seller, Agent, Admin)
- [ ] Basic profile management
- [ ] Email/SMS notifications

#### Basic Interactions

- [ ] Save/favorite properties
- [ ] Basic inquiries/contact seller
- [ ] Share via native share API

---

### Phase 2: Reglam System - 6 weeks

#### Reglam Core

- [ ] Reglam creation with unique tracking links
- [ ] Reglam chain data structure
- [ ] Commission calculation engine
- [ ] Reglam analytics dashboard

#### Premium Controls

- [ ] Seller toggle: Enable/disable reglams per listing
- [ ] Seller setting: Set commission percentages
- [ ] User subscription: Reglam access tiers
- [ ] Reglam expiry and limits

#### Commission Tracking

- [ ] Unique referral link generation
- [ ] Click and conversion tracking
- [ ] Commission chain visualization
- [ ] Payout request system

```typescript
interface ReglamChain {
  id: string;
  propertyId: string;
  originalListerId: string;
  chain: ReglamNode[];
  totalCommissionPool: number;
  status: 'active' | 'converted' | 'expired';
}

interface ReglamNode {
  userId: string;
  reglamId: string;
  depth: number; // Position in chain
  commissionPercentage: number; // Decreases with depth
  shareUrl: string;
  clicks: number;
  conversions: number;
  earnings: number;
  createdAt: Date;
  parentReglamId?: string;
}
```

---

### Phase 3: Social & Configurable Cards - 4 weeks

#### Configurable Property Cards

- [ ] Card display settings per listing
- [ ] Brand-level default settings
- [ ] Toggle visibility for each metric

```typescript
interface PropertyCardSettings {
  // Visibility toggles
  showPrice: boolean;
  showPricePerSqft: boolean;
  showLikes: boolean;
  showViews: boolean;
  showSaves: boolean;
  showReglams: boolean;
  showTimeOnMarket: boolean;
  showPriceHistory: boolean;
  showVerificationBadge: boolean;
  showAgentInfo: boolean;
  showVirtualTour: boolean;
  showSocialProof: boolean; // "X people viewing"
  showNegotiable: boolean;
  showUrgencyIndicator: boolean; // "Selling fast"

  // Display customization
  cardLayout: 'minimal' | 'standard' | 'detailed' | 'premium';
  primaryImage: 'first' | 'featured' | 'ai-selected';
  priceDisplay: 'exact' | 'range' | 'contact';

  // Social metrics
  socialMetrics: {
    likes: { show: boolean; threshold?: number }; // Show only if > threshold
    views: { show: boolean; format: 'exact' | 'rounded' };
    inquiries: { show: boolean; label: string };
  };
}
```

#### Social Features

- [ ] Like/reaction system
- [ ] Comments on listings
- [ ] Q&A section
- [ ] Share with preview cards (OG images)
- [ ] Activity feed

---

### Phase 4: Advanced Features - 6 weeks

#### AI-Powered Discovery

- [ ] AI property recommendations
- [ ] Natural language search ("3 bed near good schools under 500k")
- [ ] Image-based search (find similar properties)
- [ ] Price prediction/valuation
- [ ] Market trend analysis

#### Virtual Experience

- [ ] 360° virtual tours integration
- [ ] AR furniture placement
- [ ] Video walkthroughs
- [ ] Live video viewings
- [ ] AI-generated property descriptions

#### Smart Matching

- [ ] Buyer preference learning
- [ ] Agent-client matching
- [ ] Investment opportunity alerts
- [ ] Price drop notifications

---

### Phase 5: Transactions & Trust - 6 weeks

#### Escrow System

- [ ] In-app escrow for deposits
- [ ] Milestone-based payments
- [ ] Dispute resolution workflow
- [ ] Multi-currency support

#### Verification & Trust

- [ ] Property document verification
- [ ] Seller KYC/KYB
- [ ] Title search integration
- [ ] Agent license verification
- [ ] Review and rating system

#### Legal & Compliance

- [ ] Digital contract signing
- [ ] Automated document generation
- [ ] Regulatory compliance checks
- [ ] Transaction audit trail

---

### Phase 6: Enterprise & Scale - 8 weeks

#### Agency Tools

- [ ] Team management
- [ ] Lead distribution
- [ ] Performance analytics
- [ ] Branded microsites
- [ ] API access for integrations

#### Developer/Builder Portal

- [ ] Project listings (off-plan)
- [ ] Construction progress updates
- [ ] Bulk inventory management
- [ ] Payment plan management

#### Marketplace Expansion

- [ ] Property services marketplace (movers, lawyers, inspectors)
- [ ] Mortgage calculator & pre-approval
- [ ] Insurance quotes
- [ ] Renovation cost estimator

---

## Database Schema

### Core Entities

```sql
-- Properties
CREATE TABLE properties (
  id UUID PRIMARY KEY,
  owner_id UUID REFERENCES users(id),
  property_type property_type_enum,
  listing_type listing_type_enum,
  status listing_status_enum,

  -- Location
  address JSONB,
  coordinates GEOGRAPHY(POINT),
  neighborhood_id UUID,

  -- Details
  title VARCHAR(255),
  description TEXT,
  price DECIMAL(15,2),
  currency VARCHAR(3),
  price_negotiable BOOLEAN,

  -- Specifications
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  size_sqft DECIMAL(10,2),
  lot_size_sqft DECIMAL(10,2),
  year_built INTEGER,

  -- Features
  amenities TEXT[],
  features JSONB,

  -- Media
  images JSONB,
  videos JSONB,
  virtual_tour_url VARCHAR(500),
  floor_plans JSONB,

  -- Settings
  card_settings JSONB,          -- PropertyCardSettings
  reglam_enabled BOOLEAN,
  reglam_commission_rate DECIMAL(5,2),

  -- Metrics
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  reglams_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

-- Reglams
CREATE TABLE reglams (
  id UUID PRIMARY KEY,
  property_id UUID REFERENCES properties(id),
  user_id UUID REFERENCES users(id),
  parent_reglam_id UUID REFERENCES reglams(id),

  -- Chain info
  chain_depth INTEGER,
  share_url VARCHAR(500) UNIQUE,
  tracking_code VARCHAR(50) UNIQUE,

  -- Commission
  commission_rate DECIMAL(5,2),
  potential_earnings DECIMAL(15,2),
  actual_earnings DECIMAL(15,2) DEFAULT 0,

  -- Analytics
  clicks INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  inquiries_generated INTEGER DEFAULT 0,
  viewings_generated INTEGER DEFAULT 0,

  -- Status
  status reglam_status_enum,
  converted_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

-- Commission Payouts
CREATE TABLE commission_payouts (
  id UUID PRIMARY KEY,
  transaction_id UUID REFERENCES transactions(id),
  reglam_id UUID REFERENCES reglams(id),
  user_id UUID REFERENCES users(id),

  gross_amount DECIMAL(15,2),
  platform_fee DECIMAL(15,2),
  net_amount DECIMAL(15,2),

  status payout_status_enum,
  payout_method VARCHAR(50),
  payout_details JSONB,

  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
);

-- User Card Display Preferences (Brand-level)
CREATE TABLE brand_card_settings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  settings JSONB,              -- Default PropertyCardSettings for all listings
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

---

## Reglam Commission System

### Commission Distribution Algorithm

```typescript
interface CommissionConfig {
  baseCommission: number; // e.g., 5% of sale price
  platformFee: number; // e.g., 20% of commission
  maxChainDepth: number; // e.g., 5 levels
  depthDecayRate: number; // e.g., 0.7 (30% reduction per level)
  minimumPayout: number; // e.g., $10
}

function calculateCommissionDistribution(salePrice: number, chain: ReglamNode[], config: CommissionConfig): CommissionPayout[] {
  const totalCommission = salePrice * (config.baseCommission / 100);
  const platformCut = totalCommission * (config.platformFee / 100);
  const distributableCommission = totalCommission - platformCut;

  const payouts: CommissionPayout[] = [];
  let remainingCommission = distributableCommission;

  // Reverse chain: last reglammer (closest to sale) gets highest share
  const reversedChain = [...chain].reverse();

  reversedChain.forEach((node, index) => {
    const depthMultiplier = Math.pow(config.depthDecayRate, index);
    const share = distributableCommission * depthMultiplier * 0.4; // 40% base for first
    const actualShare = Math.min(share, remainingCommission);

    if (actualShare >= config.minimumPayout) {
      payouts.push({
        userId: node.userId,
        reglamId: node.reglamId,
        amount: actualShare,
        depth: index + 1,
      });
      remainingCommission -= actualShare;
    }
  });

  // Original lister gets remaining
  payouts.push({
    userId: chain[0].parentReglamId ? null : 'original_lister',
    amount: remainingCommission,
    depth: 0,
  });

  return payouts;
}
```

### Example Distribution

```
Sale Price: $500,000
Commission Rate: 3% = $15,000
Platform Fee: 20% = $3,000
Distributable: $12,000

Chain: Seller → Agent → Reglam1 → Reglam2 → Buyer

Distribution:
- Reglam2 (converted):  $4,800 (40%)
- Reglam1:              $3,360 (28% - 70% of 40%)
- Agent:                $2,352 (19.6%)
- Seller:               $1,488 (remaining)
```

---

## Innovative & Disruptive Features

### 1. 🏠 AI Property Concierge

```
"Hey Glamour, find me a 3-bedroom apartment near tech parks
 in Lagos with a gym, under ₦50M, that allows pets"
```

- Natural language property search
- Voice-activated browsing
- Personalized recommendations
- Negotiation assistance

### 2. 🔮 Predictive Analytics

- **Price Forecasting**: ML-based future value predictions
- **Investment Score**: ROI potential rating
- **Neighborhood Trajectory**: Area development predictions
- **Best Time to Buy/Sell**: Market timing recommendations

### 3. 🎮 Gamified Discovery

- **Property Swipe**: Tinder-like discovery
- **Achievement Badges**: First purchase, verified seller, top reglammer
- **Leaderboards**: Top agents, most reglammed properties
- **Streaks**: Daily app engagement rewards

### 4. 🌐 Web3 Integration

- **NFT Deeds**: Blockchain-verified ownership records
- **Fractional Ownership**: Tokenized property shares
- **Smart Contracts**: Automated escrow and transfers
- **Commission NFTs**: Tradeable reglam rights

### 5. 📊 Social Proof Engine

```typescript
interface SocialProofIndicators {
  viewingNow: number; // "12 people viewing"
  savedThisWeek: number; // "Saved 47 times this week"
  priceDropAlert: boolean; // "Price reduced 10%"
  fastSelling: boolean; // "Similar properties sold in 5 days"
  highDemandArea: boolean; // "High demand neighborhood"
  verifiedSeller: boolean;
  topRatedAgent: boolean;
  quickResponder: boolean; // "Usually responds in 2 hours"
}
```

### 6. 🏗️ Construction Progress Tracker

- Live updates from developers
- Drone footage integration
- Milestone notifications
- Payment schedule sync

### 7. 🤝 Co-buying Platform

- Find co-investors for properties
- Split ownership agreements
- Shared rental income distribution
- Exit strategy planning

### 8. 📱 AR/VR Features

- **AR Measurement**: Measure rooms through camera
- **Virtual Staging**: AI-furnished empty rooms
- **Neighborhood Preview**: AR overlay of local amenities
- **Time-lapse View**: See property at different times of day

### 9. 🔐 Trust & Verification Suite

- **Document Vault**: Secure storage for property documents
- **Blockchain Audit Trail**: Immutable transaction history
- **AI Fraud Detection**: Suspicious listing alerts
- **Background Checks**: Integrated tenant screening

### 10. 💬 Smart Communication

- **AI Chat Translator**: Real-time language translation
- **Sentiment Analysis**: Gauge buyer interest
- **Auto-scheduling**: Smart viewing calendar
- **Negotiation Bot**: AI-assisted price discussions

---

## Integrations

### Payment & Financial

| Provider             | Purpose                  |
| -------------------- | ------------------------ |
| Paystack/Flutterwave | Local payments (Nigeria) |
| Stripe               | International payments   |
| Wise                 | Multi-currency transfers |
| Mortgage APIs        | Pre-qualification        |

### Maps & Location

| Provider      | Purpose                  |
| ------------- | ------------------------ |
| Google Maps   | Primary mapping          |
| Mapbox        | Custom map styling       |
| What3Words    | Precise location sharing |
| OpenStreetMap | Offline maps             |

### Media & Documents

| Provider   | Purpose                  |
| ---------- | ------------------------ |
| Cloudinary | Image/video optimization |
| Matterport | 3D virtual tours         |
| DocuSign   | Digital signatures       |
| Veriff     | Identity verification    |

### Communication

| Provider | Purpose              |
| -------- | -------------------- |
| Twilio   | SMS, Voice, WhatsApp |
| SendGrid | Transactional email  |
| Stream   | In-app chat          |
| Daily.co | Video calls          |

### AI & ML

| Provider        | Purpose                               |
| --------------- | ------------------------------------- |
| OpenAI          | Natural language search, descriptions |
| Google Vision   | Image analysis, auto-tagging          |
| AWS Rekognition | Property photo validation             |
| Custom ML       | Price prediction, recommendations     |

### Legal & Compliance

| Provider           | Purpose                         |
| ------------------ | ------------------------------- |
| Land Registry APIs | Title verification              |
| CAC API            | Business verification (Nigeria) |
| Credit Bureaus     | Financial checks                |

---

## Monetization Strategy

### Revenue Streams

```
┌─────────────────────────────────────────────────────────────┐
│                    REVENUE MODEL                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Transaction Fees (Primary)                               │
│     └── 1-2% of successful transactions                      │
│                                                              │
│  2. Subscription Plans                                       │
│     ├── Individual: Free (limited listings)                  │
│     ├── Agent Pro: $29/mo (unlimited, analytics)            │
│     ├── Agency: $199/mo (team, API, white-label)            │
│     └── Enterprise: Custom pricing                           │
│                                                              │
│  3. Reglam Revenue                                          │
│     ├── Platform cut: 15-20% of reglam commissions          │
│     ├── Premium Reglam Package: $9.99/mo                    │
│     └── Seller Reglam Boost: Pay to increase commission     │
│                                                              │
│  4. Listing Enhancements                                     │
│     ├── Featured listings: $49-199                          │
│     ├── Spotlight ads: $29/day                              │
│     ├── Urgent badge: $19                                   │
│     └── Refresh listing: $9                                 │
│                                                              │
│  5. Lead Generation                                          │
│     ├── Verified buyer leads: $5-25/lead                    │
│     └── Intent data packages                                │
│                                                              │
│  6. Value-Added Services                                     │
│     ├── Professional photography: $99-299                   │
│     ├── Virtual tour creation: $199-499                     │
│     ├── Legal document review: $49-149                      │
│     └── Property valuation: $29-99                          │
│                                                              │
│  7. Data & Analytics                                         │
│     ├── Market reports: $99-499                             │
│     └── API access: Usage-based                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Subscription Tiers

| Feature          | Free      | Pro ($29/mo) | Agency ($199/mo)   |
| ---------------- | --------- | ------------ | ------------------ |
| Listings         | 3         | Unlimited    | Unlimited          |
| Photos/Listing   | 10        | 50           | 100                |
| Video Tours      | ❌        | ✅           | ✅                 |
| Reglam Access    | View only | Create       | Create + Analytics |
| Analytics        | Basic     | Advanced     | Enterprise         |
| Team Members     | 1         | 1            | 25                 |
| API Access       | ❌        | Limited      | Full               |
| White-label      | ❌        | ❌           | ✅                 |
| Priority Support | ❌        | ✅           | ✅ + Dedicated     |

---

## Phase Timeline

```
2026
├── Q1 (Jan-Mar): Phase 1 - Foundation MVP
│   ├── Week 1-4: Core infrastructure, auth, basic listings
│   ├── Week 5-6: Search, maps, property details
│   └── Week 7-8: Testing, soft launch
│
├── Q2 (Apr-Jun): Phase 2 - Reglam System
│   ├── Week 1-3: Reglam core mechanics
│   ├── Week 4-5: Commission tracking & analytics
│   └── Week 6: Premium features, testing
│
├── Q3 (Jul-Sep): Phase 3 & 4 - Social & AI
│   ├── Week 1-4: Configurable cards, social features
│   ├── Week 5-8: AI search, recommendations
│   └── Week 9-10: Virtual tours, AR features
│
└── Q4 (Oct-Dec): Phase 5 & 6 - Transactions & Scale
    ├── Week 1-6: Escrow, verification, legal
    ├── Week 7-10: Agency tools, marketplace
    └── Week 11-12: Enterprise features, API

2027
├── Q1: Mobile apps (iOS/Android)
├── Q2: International expansion
├── Q3: Web3 integration
└── Q4: Full marketplace launch
```

---

## Success Metrics

### North Star Metrics

- **GMV** (Gross Merchandise Value): Total value of properties transacted
- **Reglam Conversion Rate**: % of reglams leading to sales
- **MAU** (Monthly Active Users)

### KPIs by Phase

| Phase        | Primary KPIs                                         |
| ------------ | ---------------------------------------------------- |
| MVP          | Listings created, User signups, Time on site         |
| Reglam       | Reglams created, Chain depth, Commission distributed |
| Social       | Engagement rate, Shares, Card customization usage    |
| AI           | Search success rate, Recommendation CTR              |
| Transactions | Completed sales, Escrow volume, NPS                  |
| Scale        | Agency signups, API calls, Revenue                   |

---

## Next Steps

1. **Validate Reglam concept** with potential users
2. **Design database schema** in detail
3. **Create GraphQL schema** for API
4. **Build property listing module** first
5. **Implement basic reglam tracking** early
6. **Set up analytics infrastructure** from day 1

---

_Document Version: 1.0_  
_Last Updated: January 31, 2026_  
_Author: Glamour Engineering Team_
