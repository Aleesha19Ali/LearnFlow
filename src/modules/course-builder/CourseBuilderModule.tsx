import React from 'react';
import { Layers, Sparkles, FileText } from 'lucide-react';

export const CourseBuilderModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Course Builder & AI Assistant</h1>
        <p className="text-slate-600">
          Module reserved for <strong>Agent 3</strong>: Course creation, lesson outline generator, curriculum editor, and AI content assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">AI Outline Generator</h3>
          <p className="text-sm text-slate-500 mb-4">Generate structured course syllabi and lesson outlines automatically using AI prompts.</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            Create New Syllabus
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-teal-50 text-teal-600 rounded-full mb-4">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Curriculum Manager</h3>
          <p className="text-sm text-slate-500 mb-4">Organize modules, lessons, video content, and reading materials intuitively.</p>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            Manage Modules
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-full mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Lesson Editor</h3>
          <p className="text-sm text-slate-500 mb-4">Rich-text lesson content editor with integrated AI drafting and formatting features.</p>
          <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            Edit Lessons
          </button>
        </div>
      </div>

      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-700">Agent 3 Boundary Area</h3>
        <p className="text-slate-500 max-w-lg mx-auto mt-2">
          This area will be built by Agent 3 to enable educators and creators to build courses, structure modules, and generate lesson content with AI.
        </p>
      </div>
    </div>
  );
};

export default CourseBuilderModule;
