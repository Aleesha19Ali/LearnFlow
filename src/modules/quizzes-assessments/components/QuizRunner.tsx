import React, { useState, useEffect, useCallback } from 'react';
import { type Quiz, type QuizAnswersMap, type QuizResult, type QuestionResult } from '../types';
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuizRunnerProps {
  quiz: Quiz;
  onBack: () => void;
  onSubmitResult: (result: QuizResult) => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, onBack, onSubmitResult }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswersMap>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(quiz.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const handleFinalSubmit = useCallback(() => {
    let earnedPoints = 0;
    const questionResults: QuestionResult[] = quiz.questions.map((q) => {
      const selectedOptionId = answers[q.id];
      const isCorrect = selectedOptionId === q.correctOptionId;
      const pts = isCorrect ? q.points : 0;
      earnedPoints += pts;

      return {
        question: q,
        selectedOptionId,
        isCorrect,
        earnedPoints: pts,
      };
    });

    const percentage = Math.round((earnedPoints / quiz.totalPoints) * 100);
    const passed = percentage >= 70;
    const timeSpentSeconds = quiz.durationMinutes * 60 - timeLeftSeconds;

    const result: QuizResult = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      score: earnedPoints,
      totalPoints: quiz.totalPoints,
      percentage,
      passed,
      timeSpentSeconds,
      questionResults,
      completedAt: new Date().toISOString(),
    };

    onSubmitResult(result);
  }, [answers, onSubmitResult, quiz, timeLeftSeconds]);

  // Countdown Timer
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, handleFinalSubmit]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Time Remaining: {formatTime(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {/* Progress Bar & Question Counter */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span>
            {answeredCount} of {totalQuestions} Answered
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Current Question */}
        <div className="pt-2">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-6">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="flex-1 pr-4">{option.text}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 text-transparent'
                    }`}
                  >
                    ✓
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              Finish & Grade <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Submit Quiz?</h3>
            </div>

            <p className="text-xs text-slate-600">
              You have answered <strong className="text-slate-800">{answeredCount}</strong> out of{' '}
              <strong className="text-slate-800">{totalQuestions}</strong> questions.
              {answeredCount < totalQuestions && (
                <span className="text-amber-600 block mt-1">
                  Warning: You still have unanswered questions!
                </span>
              )}
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Continue Answering
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizRunner;
