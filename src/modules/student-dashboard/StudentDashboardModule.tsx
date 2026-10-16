import React from 'react';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

export const StudentDashboardModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Student Dashboard</h1>
        <p className="text-slate-600">
          Module reserved for <strong>Agent 2</strong>: Course progress tracking, enrolled courses, upcoming deadlines, and personalized learning recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Enrolled Courses</div>
            <div className="text-2xl font-bold text-slate-800">4</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Overall Progress</div>
            <div className="text-2xl font-bold text-slate-800">68%</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Hours Spent</div>
            <div className="text-2xl font-bold text-slate-800">24.5 hrs</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Certificates Earned</div>
            <div className="text-2xl font-bold text-slate-800">2</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-700">Agent 2 Boundary Area</h3>
        <p className="text-slate-500 max-w-lg mx-auto mt-2">
          This area will be populated by Agent 2 with student progress widgets, upcoming quiz deadlines, active course cards, and AI-recommended study paths.
        </p>
      </div>
    </div>
  );
};

export default StudentDashboardModule;
