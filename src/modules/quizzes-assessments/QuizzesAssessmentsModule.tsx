import React, { useState } from 'react';
import { type Quiz, type QuizResult } from './types';
import { sampleQuizzes } from './mockData';
import { QuizList } from './components/QuizList';
import { QuizRunner } from './components/QuizRunner';
import { QuizResults } from './components/QuizResults';
import { FlashcardDeck } from './components/FlashcardDeck';

type ModuleView = 'LIST' | 'RUNNER' | 'RESULTS' | 'FLASHCARDS';

export const QuizzesAssessmentsModule: React.FC = () => {
  const [currentView, setCurrentView] = useState<ModuleView>('LIST');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeResult, setActiveResult] = useState<QuizResult | null>(null);
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);

  const handleSelectQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentView('RUNNER');
  };

  const handleSubmitResult = (result: QuizResult) => {
    setActiveResult(result);
    if (!completedQuizIds.includes(result.quizId)) {
      setCompletedQuizIds((prev) => [...prev, result.quizId]);
    }
    setCurrentView('RESULTS');
  };

  const handleRetakeQuiz = () => {
    if (activeQuiz) {
      setCurrentView('RUNNER');
    }
  };

  const handleBackToList = () => {
    setActiveQuiz(null);
    setActiveResult(null);
    setCurrentView('LIST');
  };

  return (
    <div className="space-y-6">
      {currentView === 'LIST' && (
        <QuizList
          quizzes={sampleQuizzes}
          onSelectQuiz={handleSelectQuiz}
          onOpenFlashcards={() => setCurrentView('FLASHCARDS')}
          completedQuizIds={completedQuizIds}
        />
      )}

      {currentView === 'RUNNER' && activeQuiz && (
        <QuizRunner
          quiz={activeQuiz}
          onBack={handleBackToList}
          onSubmitResult={handleSubmitResult}
        />
      )}

      {currentView === 'RESULTS' && activeResult && (
        <QuizResults
          result={activeResult}
          onRetake={handleRetakeQuiz}
          onBackToList={handleBackToList}
        />
      )}

      {currentView === 'FLASHCARDS' && (
        <FlashcardDeck onBack={handleBackToList} />
      )}
    </div>
  );
};

export default QuizzesAssessmentsModule;
