import React, { useState } from 'react';
import { Sparkles, BarChart3 } from 'lucide-react';
import ContentTools from './components/ContentTools';
import LearningReports from './components/LearningReports';

export const ContentToolsReportsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content-tools' | 'learning-reports'>('content-tools');

  return (
    <div className="space-y-6">
      {/* Module Title & Tab Navigation Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800">Content Tools & Learning Reports</h1>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full border border-sky-200">
              Agent 5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Synthesize educational content into structured lesson outlines and quiz drafts, or inspect learner progress analytics and completion reports.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('content-tools')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'content-tools'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Content AI Synthesizer
          </button>
          <button
            onClick={() => setActiveTab('learning-reports')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'learning-reports'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
            Learning Reports & Analytics
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === 'content-tools' ? (
        <ContentTools />
      ) : (
        <LearningReports />
      )}
    </div>
  );
};

export default ContentToolsReportsModule;
