# LearnFlow - AI-Powered Learning Management System

LearnFlow is an AI-powered Learning Management System (LMS) inspired by modern e-learning platform services. It is designed with modular architecture to facilitate parallel development across five specialized development agents.

---

## 🚀 Quick Start & Setup Instructions

### Prerequisites
- **Node.js**: v18.x or higher (v22.x recommended)
- **npm**: v9.x or higher

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd learnflow

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Configuration
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Populate `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with your Supabase project credentials.

---

## 📁 Repository Organization & File Boundaries

To prevent merge conflicts during multi-agent parallel development, each agent is assigned an exclusive module boundary:

| Agent | Module Path | Domain Responsibility |
| :--- | :--- | :--- |
| **Agent 1** (Foundation) | Core layout, `src/lib/`, `src/components/layout/` | Foundational setup, routing, layout, Supabase client, Firebase hosting config |
| **Agent 2** | `src/modules/student-dashboard/` | Student dashboard, course progress, deadlines, recommendations |
| **Agent 3** | `src/modules/course-builder/` | AI course generator, curriculum management, lesson editor |
| **Agent 4** | `src/modules/quizzes-assessments/` | AI quiz generation, automated grading, interactive flashcards |
| **Agent 5** | `src/modules/content-tools-reports/` | Summarizer, study guide generator, analytics, exportable reports |

For comprehensive architecture details, refer to [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🛠 Available Scripts

- `npm run dev`: Launch Vite dev server
- `npm run build`: Type-check with `tsc` and build production distribution in `dist/`
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint checks

---

## ☁️ Deployment (Firebase Hosting)

LearnFlow is pre-configured for Firebase Hosting deployment using Single Page Application (SPA) rewrite rules.

```bash
# Build the application
npm run build

# Deploy using Firebase CLI
firebase deploy --only hosting
```
