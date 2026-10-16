# Course Builder Module (LearnFlow)

## Overview
The Course Builder module (`src/modules/courses`) provides a self-contained course management interface allowing instructors and administrators to:
- Create, edit, duplicate, filter, search, and delete courses.
- Manage course metadata (title, description, category, difficulty level, thumbnail URL, publish status).
- Maintain dynamic learning objectives lists.
- Construct hierarchical course structures (Modules & Lessons).
- Reorder modules and lessons up/down.
- Configure lesson details (content types: video, text, quiz, assignment; duration; embed URLs; text notes; downloadable resources; free preview toggle).
- Interactive learner preview modal for syllabus and lesson contents.

## Component Architecture

```
src/modules/courses/
├── CourseBuilderApp.jsx         # Main module container & orchestrator
├── useCourseBuilder.js          # Custom state hook with local persistence
├── mockData.js                  # Realistic initial courses & metadata
├── README.md                    # Integration & architecture guide
├── __tests__/                   # Unit & integration tests
│   └── CourseBuilder.test.jsx
└── components/                  # Isolated subcomponents
    ├── CourseList.jsx           # Management card/grid view with filters
    ├── CourseDetailsForm.jsx    # Form for course metadata & objectives
    ├── ModuleStructureEditor.jsx# Hierarchical module & lesson outline editor
    ├── LessonEditorModal.jsx    # Dialog for editing individual lessons
    └── CoursePreviewModal.jsx   # Learner view preview modal
```

## How to Integrate into LearnFlow (`App.jsx` / Shared Routing)

To connect this module into the primary LearnFlow application without merge conflicts:

1. Import `CourseBuilderApp` from `src/modules/courses/CourseBuilderApp`.
2. Render `CourseBuilderApp` on the assigned admin/instructor route (e.g. `/instructor/courses` or `/admin/course-builder`).

### React Router Integration Example:
```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CourseBuilderApp } from './modules/courses/CourseBuilderApp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/courses/*" element={<CourseBuilderApp />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Data Schema & State Model

```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  status: 'Draft' | 'Published';
  thumbnail: string;
  learningObjectives: string[];
  modules: Module[];
  updatedAt: string;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  contentType: 'video' | 'text' | 'quiz' | 'assignment';
  duration: string;
  contentUrl?: string;
  textContent?: string;
  isPreview: boolean;
  resources: string[];
}
```

## Supabase Integration Plan

When integrating with Supabase backend later:

1. **Database Schema:**
   - Table `courses`: `id`, `title`, `description`, `category`, `level`, `status`, `thumbnail`, `learning_objectives` (JSONB / text array), `created_at`, `updated_at`.
   - Table `modules`: `id`, `course_id` (FK), `title`, `description`, `order_index`.
   - Table `lessons`: `id`, `module_id` (FK), `title`, `content_type`, `duration`, `content_url`, `text_content`, `is_preview`, `resources` (JSONB / text array), `order_index`.

2. **Hook Migration:**
   - Update `useCourseBuilder.js` to replace `localStorage` helpers with `@supabase/supabase-js` query calls (`supabase.from('courses').select(...)`).

## Testing & Quality Checks

Run tests with Vitest:
```bash
npm run test
```
Build verification:
```bash
npm run build
```
