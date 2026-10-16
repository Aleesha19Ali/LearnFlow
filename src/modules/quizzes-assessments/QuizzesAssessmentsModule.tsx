import React from 'react';
import { CheckCircle2, RotateCcw, BrainCircuit } from 'lucide-react';

export const QuizzesAssessmentsModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Quizzes & Assessments</h1>
        <p className="text-slate-600">
          Module reserved for <strong>Agent 4</strong>: Automated AI quiz generation, interactive tests, instant feedback, and flashcards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-violet-50 text-violet-600 rounded-full mb-4">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">AI Quiz Generator</h3>
          <p className="text-sm text-slate-500 mb-4">Generate practice quizzes and assessments automatically based on course material.</p>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            Generate Quiz
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Automated Grading</h3>
          <p className="text-sm text-slate-500 mb-4">Real-time evaluation of quiz answers with constructive AI feedback.</p>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            View Results
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-full mb-4">
            <RotateCcw className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Flashcards & Practice</h3>
          <p className="text-sm text-slate-500 mb-4">Interactive flashcards with spaced repetition algorithm for retention.</p>
          <button className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            Start Practice
          </button>
        </div>
      </div>

      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-700">Agent 4 Boundary Area</h3>
        <p className="text-slate-500 max-w-lg mx-auto mt-2">
          This area will be built by Agent 4 to deliver quizzes, instant grading, interactive flashcard decks, and knowledge evaluation tools.
        </p>
      </div>
    </div>
  );
};

export default QuizzesAssessmentsModule;
