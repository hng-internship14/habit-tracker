# Habit Tracker PWA - Stage 3 Implementation

Welcome to my submission for the Stage 3 Task. I have developed a mobile-first, ultra-modern Habit Tracker Progressive Web App (PWA) using Next.js, TypeScript, and Tailwind CSS. This project demonstrates my ability to interpret complex technical requirements, implement deterministic logic, and validate my work through a rigorous testing suite.

---

## 📋 The Task & Requirements

For this stage, I was tasked with building a functional Habit Tracker from a strict Technical Requirements Document (TRD). The core objectives included:

- **Technical Execution**: Building a robust application with local persistence and offline capabilities.
- **Contract Adherence**: Following exact naming conventions for utility functions and localStorage keys.
- **Modern UI/UX**: Implementing a "luxurious" and "ultra-modern" design system with glassmorphism and premium aesthetics.
- **Automated Validation**: Writing a full suite of Unit, Integration, and End-to-End (E2E) tests to ensure the implementation maps perfectly to the TRD.

### Key Features Requested:
- **PWA Support**: Offline access via Service Workers and an installable manifest.
- **Local Persistence**: Using `localStorage` for users, sessions, and habit data.
- **Dynamic Streaks**: A streak calculation algorithm that handles gaps, duplicates, and maintains progress if completed yesterday.
- **Premium Design**: A dark-mode first interface with glassmorphic cards, icons, and smooth transitions.

---

## 🧠 My Approach

I followed a systematic engineering workflow to ensure every requirement was met without compromise:

1.  **Architecture & Planning**: I started by defining the TypeScript interfaces for `User`, `Session`, and `Habit` to ensure type safety across the app. I chose Next.js for its excellent PWA support and performance.
2.  **Logic-First Development**: Before building the UI, I implemented the core utility functions (`getHabitSlug`, `calculateCurrentStreak`, etc.) and immediately wrote unit tests to verify their mathematical correctness.
3.  **Persistence Layer**: I created a robust storage utility that interfaces with `localStorage`. I strictly followed the required naming for keys (e.g., `habit-tracker-habits`) to ensure the data structure matches the contract.
4.  **UI/UX Overhaul**: I designed a custom glassmorphism system using Tailwind CSS. I integrated high-quality SVG icons into every input and button, and added a splash screen with a precisely timed duration (800ms) to meet the TRD speed requirements.
5.  **Offline-First Strategy**: I implemented a Service Worker to cache the app shell, ensuring that users can access their dashboard even without an internet connection.

---

## 🚀 Required Deliverables

I have provided all the necessary deliverables for this submission:

- **Live Deployed URL**: [https://habit-tracker-woad-five.vercel.app]
- **GitHub Repository**: [https://github.com/hng-internship14/habit-tracker](https://github.com/hng-internship14/habit-tracker)
- **Automated Tests**: Included in the `/tests` directory.
- **Coverage Report**: Generated using Vitest and available after running tests.
- **Demo Video**: [Insert link to your 2-minute demo video here]

---

## 🛠 Setup and Execution

### How to Run the App
I have made the setup process as simple as possible:

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/hng-internship14/habit-tracker.git
    cd habit-tracker
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Development**:
    ```bash
    npm run dev
    ```
4.  **Production Build**:
    ```bash
    npm run build
    npm run start
    ```

### How to Run the Tests
I have configured scripts to run each testing layer separately or as a whole:

- **Run All Tests**: `npm run test`
- **Unit Tests**: `npm run test:unit`
- **Integration Tests**: `npm run test:integration`
- **E2E Tests**: `npm run test:e2e`

### How to Generate Coverage
To see the coverage report, I use the Vitest coverage provider:
```bash
npm run test:unit
```
After the run, you can find the detailed HTML report in the `coverage/` folder.

---

## 🔍 TRD Mapping & Test Locations

I have ensured that every part of my implementation maps directly to the Technical Requirements Document.

### 1. Utility Naming & Logic
- **`src/lib/slug.ts`**: Contains `getHabitSlug`.
- **`src/lib/validators.ts`**: Contains `validateHabitName`.
- **`src/lib/streaks.ts`**: Contains my enhanced `calculateCurrentStreak` logic.
- **`src/lib/habits.ts`**: Contains `toggleHabitCompletion`.

### 2. Test Verification
I have organized my tests into logical folders to verify specific contracts:

| Test File Location | What I verified |
| :--- | :--- |
| `tests/unit/slug.test.ts` | Hyphenation, lowercase conversion, and trimming of habit names. |
| `tests/unit/validators.test.ts` | Validation rules for empty names and length constraints. |
| `tests/unit/streaks.test.ts` | Consecutive days, gap handling, and the **"streak-alive"** grace period. |
| `tests/unit/habits.test.ts` | Immutability of completion toggles and duplicate date prevention. |
| `tests/integration/auth-flow.test.tsx` | Signup with First/Last name, Login, and Session persistence. |
| `tests/integration/habit-form.test.tsx` | Habit creation, editing, and deletion triggers in the UI. |
| `tests/e2e/app.spec.ts` | Full user journey: Splash Screen -> Login -> Dashboard. |

---

## 💡 Assumptions & Trade-offs

- **Local Storage Security**: As per the TRD, I am storing user data and session info in `localStorage`. While sufficient for this task, I am aware that a production app would use server-side authentication and encrypted databases.
- **Streak Grace Period**: I made a conscious design decision to allow a "grace period." A user's streak will not reset until the end of the day *following* their last completion. This allows for more flexibility in when a user marks their habit as done.
- **Daily Only**: I focused on a robust "Daily" frequency implementation, though the system is structured to be easily extendable to Weekly or Monthly in the future.

---

### Developed with passion by [codespacecadet]
Thank you for reviewing my implementation!
