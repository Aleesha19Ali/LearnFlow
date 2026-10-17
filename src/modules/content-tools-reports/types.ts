export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ContentTone = 'Academic' | 'Conversational' | 'Concise' | 'Interactive';

export interface GenerationOptions {
  difficulty: DifficultyLevel;
  tone: ContentTone;
  numQuestions: number;
  includeExplanations: boolean;
  targetAudience: string;
}

export interface LessonTopic {
  id: string;
  title: string;
  durationMinutes: number;
  summary: string;
  keyTakeaways: string[];
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  topics: LessonTopic[];
}

export interface LessonOutline {
  title: string;
  overview: string;
  estimatedHours: number;
  targetAudience: string;
  prerequisites: string[];
  modules: LessonModule[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: DifficultyLevel;
}

export interface QuizDraft {
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  passingScorePercentage: number;
  questions: QuizQuestion[];
}

export interface ContentGenerationResult {
  outline: LessonOutline;
  quiz: QuizDraft;
}

export interface CourseCompletionStat {
  courseId: string;
  courseTitle: string;
  category: string;
  enrolledStudents: number;
  completionRatePercentage: number;
  averageScorePercentage: number;
  activeLearnersCount: number;
  status: 'Active' | 'Archived' | 'Draft';
}

export interface LearnerProgressRecord {
  learnerId: string;
  name: string;
  email: string;
  courseTitle: string;
  progressPercentage: number;
  lastActiveDate: string;
  quizScoreAvg: number;
  completedModules: number;
  totalModules: number;
  status: 'On Track' | 'Needs Attention' | 'Completed';
}

export interface QuizScoreDistribution {
  range: string; // e.g. "90-100%", "80-89%"
  count: number;
  percentage: number;
}

export interface ActivitySummary {
  id: string;
  learnerName: string;
  action: string;
  courseTitle: string;
  timestamp: string;
  score?: number;
}

export interface PresetSampleText {
  id: string;
  title: string;
  description: string;
  text: string;
}
