import React from 'react';
import { type QuizResult } from '../types';
import { Award, CheckCircle, XCircle, RotateCcw, ArrowLeft, Clock, Lightbulb } from 'lucide-react';

interface QuizResultsProps {
  result: QuizResult;
  onRetake: () => void;
  onBackToList: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ result, onRetake, onBackToList }) => {
  const formatTimeSpent = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Action Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToList}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </button>

        <button
          onClick={onRetake}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Retake Quiz
        </button>
      </div>

      {/* Score Overview Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {/* Percentage Circle / Badge */}
          <div
            className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center shrink-0 shadow-inner ${
              result.passed
                ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700'
                : 'border-rose-500 bg-rose-50/50 text-rose-700'
            }`}
          >
            <span className="text-3xl font-extrabold">{result.percentage}%</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold">
              {result.passed ? 'PASSED' : 'NEEDS PRACTICE'}
            </span>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{result.quizTitle}</h2>
            <p className="text-xs text-slate-500 mb-3">
              {result.passed
                ? 'Excellent performance! You have demonstrated solid comprehension of this topic.'
                : 'Good effort! Review the detailed question explanations below to strengthen your understanding.'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-500" />
                Score: <strong>{result.score}</strong> / {result.totalPoints} pts
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-400" />
                Time Spent: <strong>{formatTimeSpent(result.timeSpentSeconds)}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Question Review & AI Feedback */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>Answer Breakdown & AI Feedback</span>
        </h3>

        {result.questionResults.map((item, index) => {
          const { question, selectedOptionId, isCorrect, earnedPoints } = item;

          return (
            <div
              key={question.id}
              className={`bg-white p-6 rounded-2xl border transition-all shadow-sm ${
                isCorrect ? 'border-emerald-200' : 'border-rose-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Question {index + 1}
                    </span>
                    <h4 className="text-base font-semibold text-slate-900 mt-0.5">{question.text}</h4>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  +{earnedPoints} / {question.points} pts
                </span>
              </div>

              {/* Options display */}
              <div className="space-y-2 mb-4 pl-9">
                {question.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrectOption = question.correctOptionId === opt.id;

                  let optionStyle = 'border-slate-100 bg-slate-50/50 text-slate-600';
                  if (isCorrectOption) {
                    optionStyle = 'border-emerald-300 bg-emerald-50/80 text-emerald-900 font-medium';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-300 bg-rose-50/80 text-rose-900 font-medium';
                  }

                  return (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{opt.text}</span>
                      {isCorrectOption && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-200 text-emerald-800 rounded">
                          Correct Answer
                        </span>
                      )}
                      {isSelected && !isCorrectOption && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-200 text-rose-800 rounded">
                          Your Choice
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* AI Explanation / Feedback */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 ml-9">
                <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-950">
                  <span className="font-bold block mb-0.5 text-indigo-900">AI Explanation & Key Insight:</span>
                  <p>{question.explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResults;
