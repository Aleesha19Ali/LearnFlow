# LearnFlow Module Boundaries

This directory contains dedicated module spaces assigned to parallel agents:

- `src/modules/student-dashboard/`: **Agent 2** (Student Dashboard: progress tracking, enrolled courses, upcoming deadlines, recommendations)
- `src/modules/course-builder/`: **Agent 3** (Course Builder: AI course outline generation, lesson editor, media management)
- `src/modules/quizzes-assessments/`: **Agent 4** (Quizzes & Assessments: quiz generator, automated grading, feedback, flashcards)
- `src/modules/content-tools-reports/`: **Agent 5** (Content Tools & Reports: summarization, study guide generation, analytics, reports)

## Shared Assets and Utils
- Shared components belong in `src/components/`.
- Shared utility functions and database services belong in `src/lib/` or `src/services/`.
- Routing configuration belongs in `src/App.tsx` or `src/routes/`.
