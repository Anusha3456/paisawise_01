# PaisaWise – AI Personal Financial Coach (Frontend)

> Android-first personal finance application designed for salaried employees in India.
>
> Powered by the **Salary Survival Engine** to answer:
>
> *"Based on my salary, expenses, and upcoming commitments, how much can I safely spend today until my next salary?"*

---

## 1. Project Overview

PaisaWise is built specifically for Indian salaried professionals facing the mid-month cash crunch. Rather than showing abstract graphs or overwhelming spreadsheets, PaisaWise acts as an AI Personal Financial Coach that protects fixed commitments (rent, EMIs, utility bills, savings) first, and provides a real-time, daily safe-to-spend allowance until next payday.

### Core Architecture & Privacy Principles

- **Salary Survival Engine:** Calculates daily allowance using the formula:

  \[
  \text{Daily Allowance} =
  \frac{
  \text{Monthly Salary} -
  \text{Fixed Commitments} -
  \text{Planned Savings} -
  \text{Flexible Spent}
  }{
  \text{Days Remaining in Cycle}
  }
  \]

- **Manual Alias Tracking:** All accounts (e.g., "Primary Salary A/C", "UPI Pocket") are nicknames tracked manually.

- **Privacy First:** PaisaWise never connects to net banking, never reads SMS OTPs, and never asks for bank passwords or UPI PINs.

- **Clarity & Transparency:** All calculated allowances are explicitly labeled as *calculated budget recommendations*, never confused with actual bank balances.

---

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| React Native | Mobile application framework |
| Expo SDK 58 | Development framework |
| TypeScript | Programming language (`strict: true`) |
| Expo Router | File-based navigation with typed routes |
| React Native StyleSheet | Styling and custom design system |
| TanStack Query v5 | Server state management |
| Zustand v5 | Global UI state management |
| React Hook Form | Form management |
| Zod | Schema validation |
| Lucide React Native | Icons |
| React Native SVG | Charts and visualizations |
| Expo SecureStore | Secure token storage |
| Axios | HTTP client with central interceptors |

### Design System

Custom design tokens:

- `constants/colors.ts`
- `constants/spacing.ts`
- `constants/typography.ts`

---

## 3. Project Structure

```text
paisawise/
│
├── app/                              # Expo Router file-based screens
│   ├── _layout.tsx                   # Root provider layout
│   ├── index.tsx                      # Entry router (Auth & onboarding checks)
│   │
│   ├── (auth)/                        # Authentication Flow
│   │   ├── _layout.tsx
│   │   ├── login.tsx                  # Sign In with demo fill & validation
│   │   ├── register.tsx               # Sign Up with Indian mobile format
│   │   └── forgot-password.tsx        # Password recovery
│   │
│   ├── (onboarding)/                  # 4-Step Salaried Onboarding Flow
│   │   ├── _layout.tsx
│   │   ├── profile.tsx                # Step 1: Name, occupation, city
│   │   ├── salary-setup.tsx           # Step 2: Take-home salary & payday selector
│   │   ├── accounts-setup.tsx         # Step 3: Manual account nicknames
│   │   └── commitments-setup.tsx     # Step 4: Rent, EMI & bill protection
│   │
│   ├── (tabs)/                        # Bottom Tab Navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx                  # Dashboard
│   │   ├── activity.tsx               # Transactions with search & filters
│   │   ├── insights.tsx               # Analytics and financial insights
│   │   └── profile.tsx                # Profile and salary preferences
│   │
│   ├── transactions/
│   │   ├── add.tsx                    # Add expense/income modal
│   │   └── [id].tsx                   # Transaction details & delete
│   │
│   ├── accounts/
│   │   ├── index.tsx                  # Manual account nicknames list
│   │   └── add.tsx                    # Create new manual account
│   │
│   ├── commitments/
│   │   ├── index.tsx                  # Fixed commitments list with Mark Paid
│   │   └── add.tsx                    # Add rent/EMI/bill commitment
│   │
│   ├── savings/
│   │   ├── index.tsx                  # Savings overview & emergency cushion
│   │   ├── goals.tsx                  # Target goals
│   │   └── recommendations.tsx        # Micro-savings recommendations
│   │
│   ├── salary-survival/
│   │   └── index.tsx                  # Mathematical burn rate breakdown
│   │
│   ├── ai-coach/
│   │   └── index.tsx                  # Conversational AI Money Coach
│   │
│   └── settings/
│       ├── index.tsx                  # Notification switches & formatting
│       └── privacy.tsx                # Privacy and security information
│
├── components/
│   ├── common/                        # AppButton, AppInput, AppHeader,
│   │                                  # AppCard, LoadingView, EmptyState
│   ├── dashboard/                     # Dashboard cards and summaries
│   ├── transactions/                  # TransactionItem, TransactionList,
│   │                                  # TransactionFilters, CategoryIcon
│   ├── charts/                        # ExpensePieChart, MonthlySpendingChart,
│   │                                  # CashFlowChart
│   ├── commitments/                   # CommitmentCard
│   └── savings/                       # SavingsGoalCard, SavingsSuggestionCard
│
├── constants/                         # Colors, spacing, typography, categories
├── hooks/                             # useAuth, useDashboard, useTransactions,
│                                      # useCommitments
├── mocks/                             # Realistic Indian salaried mock data
├── services/                          # API, auth, dashboard, transactions,
│                                      # accounts, salary, commitments,
│                                      # savings and AI services
├── store/                             # auth.store.ts, app.store.ts
├── types/                             # TypeScript interfaces and domain models
└── utils/                             # Currency, date and validation utilities
```

---

## 4. Setup & Running Instructions

### Prerequisites

- **Node.js:** v18+ (verified on Node.js v24.20.0)
- **npm:** v9+ (verified on npm v11.19.0)
- **Expo Go:** Installed on Android device, or Android Emulator / Web Browser

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

**Note:**

- Use `http://10.0.2.2:8000` for Android Emulator.
- Use your computer's LAN IP (e.g., `http://192.168.1.X:8000`) for physical Android devices.

### 3. Start the Project

Start the Expo development server:

```bash
npx expo start
```

Run on Android:

```bash
npx expo start --android
```

Run in a web browser:

```bash
npx expo start --web
```

---

## 5. Proposed Backend Integration Contract (FastAPI & PostgreSQL)

The frontend is currently powered by realistic mock services in `services/` that emulate actual API delays and error structures.

When the backend team has deployed FastAPI, toggle `USE_MOCKS = false` in the relevant service files.

### A. Authentication & User Profile

**POST `/auth/login`**

Request:

```json
{
  "email": "rajesh.sharma@example.com",
  "password": "..."
}
```

Response:

```json
{
  "user": "UserProfile",
  "tokens": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiresIn": 86400
  }
}
```

**POST `/auth/register`**

Request:

```json
{
  "fullName": "...",
  "email": "...",
  "phone": "9876543210",
  "password": "..."
}
```

Response:

```json
{
  "user": "UserProfile",
  "tokens": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiresIn": 86400
  }
}
```

**Other endpoints:**

- `GET /users/me` – Get the currently authenticated user profile.
- `PATCH /users/me` – Update name, occupation, city and preferences.

### B. Salary & Survival Engine

**GET `/salary/metrics`**

Example response:

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

**PUT `/salary/config`**

Request:

```json
{
  "monthlySalary": 45000,
  "payday": 1,
  "plannedSavings": 3000
}
```

### C. Transactions

- `GET /transactions?type=expense&categoryId=food` – Retrieve transactions.
- `POST /transactions` – Create a transaction.
- `DELETE /transactions/{id}` – Delete a transaction.

Example POST request:

```json
{
  "title": "Swiggy Dinner",
  "amount": 420,
  "type": "expense",
  "categoryId": "food",
  "accountId": "acc-3",
  "date": "...",
  "notes": "..."
}
```

### D. Commitments (Fixed Rent, EMI, Bills)

- `GET /commitments` – Retrieve financial commitments.
- `POST /commitments` – Create a commitment.
- `PATCH /commitments/{id}/pay` – Mark a commitment as paid in the current cycle.

### E. AI Coach

**POST `/ai-coach/chat`**

Request:

```json
{
  "prompt": "Why has my daily allowance decreased?"
}
```

Response:

```json
{
  "id": "msg-1",
  "sender": "coach",
  "text": "...",
  "timestamp": "..."
}
```

---

## 6. Privacy & Security

PaisaWise follows a privacy-first approach:

- No direct bank account integration.
- No SMS or OTP reading.
- No collection of banking passwords or UPI PINs.
- Manual account alias tracking.
- Financial recommendations are clearly distinguished from actual bank balances.

---

## 7. Project Status

**Current Status:** Frontend development with mock data and proposed backend integration.

---

## 8. Future Enhancements

- AI-powered personalized financial recommendations.
- Advanced spending analytics.
- Financial health score.
- Monthly financial reports.
- Improved financial forecasting.
- Backend integration with FastAPI and PostgreSQL.

---

**PaisaWise – Understand your money. Protect your commitments. Spend with confidence.**