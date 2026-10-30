# PaisaWise – AI Personal Financial Coach (Frontend)

> Android-first personal finance application designed for salaried employees in India.  
> Powered by the **Salary Survival Engine** to answer:  
> *"Based on my salary, expenses, and upcoming commitments, how much can I safely spend today until my next salary?"*

---

## 1. Project Overview

PaisaWise is built specifically for Indian salaried professionals facing the mid-month cash crunch. Rather than showing abstract graphs or overwhelming spreadsheets, PaisaWise acts as an AI Personal Financial Coach that protects fixed commitments (rent, EMIs, utility bills, savings) first, and provides a real-time, daily safe-to-spend allowance until next payday.

### Core Architecture & Privacy Principles
- **Salary Survival Engine**: Calculates daily allowance using the formula:
  $$\text{Daily Allowance} = \frac{\text{Monthly Salary} - \text{Fixed Commitments} - \text{Planned Savings} - \text{Flexible Spent}}{\text{Days Remaining in Cycle}}$$
- **Manual Alias Tracking**: All accounts (e.g., "Primary Salary A/C", "UPI Pocket") are nicknames tracked manually. **PaisaWise never connects to net banking, never reads SMS OTPs, and never asks for bank passwords or UPI PINs.**
- **Clarity & Transparency**: All calculated allowances are explicitly labeled as *calculated budget recommendations*, never confused with actual bank balances.

---

## 2. Technology Stack

- **Framework**: React Native with **Expo SDK 58**
- **Language**: TypeScript (`strict: true`)
- **Navigation**: Expo Router (File-based routing with typed routes)
- **Styling**: React Native StyleSheet with custom Design System tokens (`constants/colors.ts`, `constants/spacing.ts`, `constants/typography.ts`)
- **Server State**: TanStack Query (`@tanstack/react-query` v5)
- **Global UI State**: Zustand (`zustand` v5)
- **Forms & Validation**: React Hook Form with Zod schemas (`@hookform/resolvers/zod`)
- **Icons**: Lucide React Native (`lucide-react-native`)
- **Visuals & Charts**: React Native SVG (`react-native-svg`)
- **Secure Token Storage**: Expo SecureStore (`expo-secure-store`)
- **HTTP Client**: Axios with central interceptors (`axios`)

---

## 3. Project Structure

```
paisawise/
├── app/                              # Expo Router file-based screens
│   ├── _layout.tsx                   # Root provider layout (QueryClient, SafeArea, StatusBar)
│   ├── index.tsx                     # Entry router (Auth & onboarding checks)
│   │
│   ├── (auth)/                       # Authentication Flow
│   │   ├── _layout.tsx
│   │   ├── login.tsx                 # Sign In with demo fill & validation
│   │   ├── register.tsx              # Sign Up with Indian mobile format
│   │   └── forgot-password.tsx       # Password recovery
│   │
│   ├── (onboarding)/                 # 4-Step Salaried Onboarding Flow
│   │   ├── _layout.tsx
│   │   ├── profile.tsx               # Step 1: Name, occupation, city
│   │   ├── salary-setup.tsx          # Step 2: Take-home salary & payday selector
│   │   ├── accounts-setup.tsx        # Step 3: Manual account nicknames
│   │   └── commitments-setup.tsx     # Step 4: Rent, EMI & bill protection
│   │
│   ├── (tabs)/                       # Bottom Tab Navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx                 # Dashboard (Hero Daily Allowance, Salary Allocations)
│   │   ├── activity.tsx              # Transactions list with search & category filters
│   │   ├── insights.tsx              # Analytics, SVG pie/trends/cashflow charts, behavioural tips
│   │   └── profile.tsx               # User profile, salary preferences & shortcuts
│   │
│   ├── transactions/
│   │   ├── add.tsx                   # Add expense/income modal
│   │   └── [id].tsx                  # Transaction detail & delete
│   │
│   ├── accounts/
│   │   ├── index.tsx                 # Manual account nicknames list
│   │   └── add.tsx                   # Create new manual account
│   │
│   ├── commitments/
│   │   ├── index.tsx                 # Fixed commitments list with "Mark Paid"
│   │   └── add.tsx                   # Add rent/EMI/bill commitment
│   │
│   ├── savings/
│   │   ├── index.tsx                 # Savings overview & emergency cushion
│   │   ├── goals.tsx                 # Target goals (Emergency, Trip, Gadget)
│   │   └── recommendations.tsx       # Micro-savings (₹5, ₹10, ₹20) with confirmation
│   │
│   ├── salary-survival/
│   │   └── index.tsx                 # Dedicated mathematical burn rate breakdown screen
│   │
│   ├── ai-coach/
│   │   └── index.tsx                 # Conversational AI Money Coach chat interface
│   │
│   └── settings/
│       ├── index.tsx                 # Notification switches & formatting
│       └── privacy.tsx               # Privacy commitments & security guarantees
│
├── components/
│   ├── common/                       # AppButton, AppInput, AppHeader, AppCard, LoadingView, EmptyState, ErrorState
│   ├── dashboard/                    # DailyAllowanceCard, SalarySummaryCard, SpendingOverview, UpcomingCommitments, RecentTransactions
│   ├── transactions/                 # TransactionItem, TransactionList, TransactionFilters, CategoryIcon
│   ├── charts/                       # ExpensePieChart (SVG), MonthlySpendingChart (SVG), CashFlowChart
│   ├── commitments/                  # CommitmentCard
│   └── savings/                      # SavingsGoalCard, SavingsSuggestionCard
│
├── constants/                        # colors.ts, spacing.ts, typography.ts, categories.ts
├── hooks/                            # useAuth, useDashboard, useTransactions, useCommitments
├── mocks/                            # Realistic Indian salaried mock data (₹45,000 baseline)
├── services/                         # api.ts (Axios), auth, dashboard, transaction, account, salary, commitment, savings, ai
├── store/                            # auth.store.ts, app.store.ts
├── types/                            # TypeScript interfaces for all domain models
└── utils/                            # currency.ts (Indian Rupee Lakhs/Crores), date.ts, validators.ts
```

---

## 4. Setup & Running Instructions

### Prerequisites
- **Node.js**: v18+ (verified on Node.js v24.20.0)
- **npm**: v9+ (verified on npm v11.19.0)
- **Expo Go App** (on Android device) or Android Emulator / Web Browser

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Default configuration:
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
```
*(Use `http://10.0.2.2:8000` for Android Emulator or your machine's LAN IP like `http://192.168.1.X:8000` for physical devices)*.

### 3. Start the Project
```bash
# Start Expo development server
npx expo start

# Run on Android device or emulator
npx expo start --android

# Run in Web browser
npx expo start --web
```

---

## 5. Proposed Backend Integration Contract (FastAPI & PostgreSQL)

The frontend is currently powered by realistic mock services in `services/*` that emulate actual API delay and error structures. When the backend team has deployed FastAPI, toggle `USE_MOCKS = false` in the service files.

### A. Authentication & User Profile
- `POST /auth/login`
  - **Request**: `{ "email": "rajesh.sharma@example.com", "password": "..." }`
  - **Response**: `{ "user": UserProfile, "tokens": { "accessToken": "...", "refreshToken": "...", "expiresIn": 86400 } }`
- `POST /auth/register`
  - **Request**: `{ "fullName": "...", "email": "...", "phone": "9876543210", "password": "..." }`
  - **Response**: `{ "user": UserProfile, "tokens": { ... } }`
- `GET /users/me` -> Current authenticated user profile
- `PATCH /users/me` -> Update name, occupation, city, preferences

### B. Salary & Survival Engine
- `GET /salary/metrics`
  - **Response**:
    ```json
    {
      "monthlySalary": 45000,
      "totalCommitments": 18000,
      "plannedSavings": 3000,
      "flexibleBudget": 24000,
      "recordedFlexibleSpending": 8000,
      "remainingFlexibleBudget": 16000,
      "daysRemainingInCycle": 16,
      "totalDaysInCycle": 31,
      "recommendedDailyAllowance": 1000,
      "burnRateStatus": "safe",
      "cycleStartDate": "2026-10-01T00:00:00.000Z",
      "cycleEndDate": "2026-10-31T23:59:59.000Z"
    }
    ```
- `PUT /salary/config`
  - **Request**: `{ "monthlySalary": 45000, "payday": 1, "plannedSavings": 3000 }`

### C. Transactions
- `GET /transactions?type=expense&categoryId=food` -> Array of transactions
- `POST /transactions`
  - **Request**: `{ "title": "Swiggy Dinner", "amount": 420, "type": "expense", "categoryId": "food", "accountId": "acc-3", "date": "...", "notes": "..." }`
- `DELETE /transactions/{id}`

### D. Commitments (Fixed Rent, EMI, Bills)
- `GET /commitments` -> Array of financial commitments
- `POST /commitments` -> Create commitment
- `PATCH /commitments/{id}/pay` -> Mark commitment as paid in current cycle

### E. AI Coach
- `POST /ai-coach/chat`
  - **Request**: `{ "prompt": "Why has my daily allowance decreased?" }`
  - **Response**: `{ "id": "msg-1", "sender": "coach", "text": "...", "timestamp": "..." }`

#   p a i s a w i s e  
 