# LearnFlow System Architecture & Developer Guide

## System Overview
LearnFlow is built as a single-page React application powered by Vite, TypeScript, and Tailwind CSS, integrated with Supabase for data persistence & authentication and Firebase Hosting for cloud distribution.

---

## Technical Stack
- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **Database & Auth**: Supabase JS SDK (`@supabase/supabase-js`)
- **Deployment**: Firebase Hosting (`firebase.json`, `.firebaserc`)

---

## Directory Structure
```
.
├── .env.example                     # Environment variable template
├── .firebaserc                      # Firebase project configuration
├── firebase.json                    # Firebase Hosting rewrite rules
├── package.json                     # Dependencies and scripts
├── src/
│   ├── main.tsx                     # React entry point
│   ├── App.tsx                      # App router configuration
│   ├── index.css                    # Global Tailwind styling
│   ├── components/                  # Shared UI components
│   │   └── layout/                  # Navbar, Sidebar, MainLayout
│   ├── lib/                         # Integration clients (e.g., supabase.ts)
│   └── modules/                     # Modular domain features
│       ├── home/                    # Overview landing page
│       ├── student-dashboard/       # Agent 2 Module
│       ├── course-builder/          # Agent 3 Module
│       ├── quizzes-assessments/     # Agent 4 Module
│       └── content-tools-reports/   # Agent 5 Module
└── vite.config.ts                   # Vite configuration
```

---

## Parallel Development File Ownership Matrix

To ensure clean isolation when five agents work concurrently:

### 1. Agent 1 (Foundation Agent)
- **Files Owned**: `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/components/layout/*`, `src/lib/supabase.ts`, `firebase.json`, `.firebaserc`, `.env.example`, `vite.config.ts`, `README.md`, `ARCHITECTURE.md`.
- **Responsibilities**: Shared layout, navigation header, sidebar, routing table, Supabase client initialization, deployment configuration.

### 2. Agent 2 (Student Dashboard Agent)
- **Files Owned**: `src/modules/student-dashboard/*`
- **Responsibilities**: Student overview, progress tracking, enrolled course cards, upcoming assessment deadlines, personalized study recommendations.

### 3. Agent 3 (Course Builder Agent)
- **Files Owned**: `src/modules/course-builder/*`
- **Responsibilities**: AI course outline generator, lesson editor, curriculum module hierarchy, course media attachment.

### 4. Agent 4 (Quizzes & Assessments Agent)
- **Files Owned**: `src/modules/quizzes-assessments/*`
- **Responsibilities**: AI-generated quizzes, instant feedback mechanism, automated grading system, spaced-repetition flashcards.

### 5. Agent 5 (Content Tools & Reports Agent)
- **Files Owned**: `src/modules/content-tools-reports/*`
- **Responsibilities**: Document summarizer, study guide creator, learning analytics graphs, exportable grade/progress reports (PDF/CSV).

---

## Supabase Integration Guidelines
- Place shared database models or service helpers in `src/lib/` or `src/services/`.
- Import the Supabase client safely from `src/lib/supabase`.
- Handle cases gracefully where `isSupabaseConfigured` is false (e.g. mock state when credentials are not yet set).
- Never commit real Supabase API keys or database secrets to git.

---

## Security & Secrets
- All environment variables exposed to Vite must begin with `VITE_`.
- Public anonymous keys (`VITE_SUPABASE_ANON_KEY`) may be placed in `.env` (which is git-ignored).
- Secret service role keys must **NEVER** be placed in client-side code.
