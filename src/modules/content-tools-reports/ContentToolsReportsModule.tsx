import React from 'react';
import { BarChart3, FileSpreadsheet, Wand2 } from 'lucide-react';

export const ContentToolsReportsModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Content Tools & Reports</h1>
        <p className="text-slate-600">
          Module reserved for <strong>Agent 5</strong>: Document summarization, study guide generation, exportable reports, and learning analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-sky-50 text-sky-600 rounded-full mb-4">
            <Wand2 className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Summarizer & Study Guides</h3>
          <p className="text-sm text-slate-500 mb-4">Transform lengthy course documents and notes into concise summaries and study guides.</p>
          <button className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            Summarize Document
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-cyan-50 text-cyan-600 rounded-full mb-4">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Analytics & Performance</h3>
          <p className="text-sm text-slate-500 mb-4">In-depth performance metrics, completion rates, and learning engagement charts.</p>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            View Analytics
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-full mb-4">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Report Exporter</h3>
          <p className="text-sm text-slate-500 mb-4">Export progress reports, gradebooks, and performance metrics in PDF/CSV formats.</p>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed">
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-700">Agent 5 Boundary Area</h3>
        <p className="text-slate-500 max-w-lg mx-auto mt-2">
          This area will be built by Agent 5 to provide content processing utilities, summary generators, analytical dashboards, and downloadable reports.
        </p>
      </div>
    </div>
  );
};

export default ContentToolsReportsModule;
