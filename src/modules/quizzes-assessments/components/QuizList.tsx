import React, { useState } from 'react';
import { type Quiz } from '../types';
import { Search, Clock, Award, BookOpen, PlayCircle, BarChart2 } from 'lucide-react';

interface QuizListProps {
  quizzes: Quiz[];
  onSelectQuiz: (quiz: Quiz) => void;
  onOpenFlashcards: () => void;
  completedQuizIds: string[];
}

export const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  onSelectQuiz,
  onOpenFlashcards,
  completedQuizIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(quizzes.map((q) => q.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary Stats */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Interactive Assessment Hub
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">Test & Master Your Knowledge</h2>
          <p className="text-violet-100 text-sm md:text-base max-w-xl mt-1">
            Choose a quiz below to challenge yourself with AI-generated questions, or practice with interactive flashcards.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onOpenFlashcards}
            className="px-5 py-2.5 bg-white text-indigo-700 hover:bg-slate-100 transition-colors font-semibold rounded-xl text-sm flex items-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Practice Flashcards
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search quizzes by title, tag, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quiz Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-slate-500 text-sm font-medium">No quizzes match your filter criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => {
            const isCompleted = completedQuizIds.includes(quiz.id);
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getDifficultyColor(
                        quiz.difficulty
                      )}`}
                    >
                      {quiz.difficulty}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                        Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{quiz.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-3 flex-1">{quiz.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{quiz.durationMinutes} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      <span>{quiz.totalPoints} pts</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {quiz.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectQuiz(quiz)}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizList;
