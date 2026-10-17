export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  questions: QuizQuestion[];
  totalPoints: number;
  tags: string[];
}

export type QuizAnswersMap = Record<string, string>; // questionId -> selectedOptionId

export interface QuestionResult {
  question: QuizQuestion;
  selectedOptionId?: string;
  isCorrect: boolean;
  earnedPoints: number;
}

export interface QuizResult {
  quizId: string;
  quizTitle: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  questionResults: QuestionResult[];
  completedAt: string;
}

export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  hint?: string;
  mastered?: boolean;
}
