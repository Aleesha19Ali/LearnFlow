import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Brain, FileText, ArrowRight } from 'lucide-react';

export const HomeOverview: React.FC = () => {
  const modules = [
    {
      title: 'Student Dashboard',
      agent: 'Agent 2',
      description: 'Progress tracking, enrolled courses, upcoming deadlines, and study recommendations.',
      path: '/student-dashboard',
      icon: LayoutDashboard,
      color: 'bg-blue-500',
    },
    {
      title: 'Course Builder',
      agent: 'Agent 3',
      description: 'AI-assisted course syllabus creation, lesson editor, and curriculum manager.',
      path: '/course-builder',
      icon: BookOpen,
      color: 'bg-indigo-500',
    },
    {
      title: 'Quizzes & Assessments',
      agent: 'Agent 4',
      description: 'Automated quiz generator, interactive grading, flashcards, and feedback.',
      path: '/quizzes-assessments',
      icon: Brain,
      color: 'bg-purple-500',
    },
    {
      title: 'Content Tools & Reports',
      agent: 'Agent 5',
      description: 'Document summarization, study guide generation, analytics, and exports.',
      path: '/content-tools-reports',
      icon: FileText,
      color: 'bg-teal-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-200">
            LearnFlow Core Platform
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Welcome to LearnFlow AI LMS
          </h1>
          <p className="text-blue-100 text-base leading-relaxed">
            LearnFlow combines AI-powered tools to revolutionize digital learning, course creation, automated assessments, and intelligent reporting.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Platform Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div key={mod.path} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg text-white ${mod.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                      {mod.agent}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{mod.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{mod.description}</p>
                </div>

                <Link
                  to={mod.path}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group mt-2"
                >
                  Explore Module
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeOverview;
