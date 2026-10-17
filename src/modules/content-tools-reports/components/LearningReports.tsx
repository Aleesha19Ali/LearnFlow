import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Users,
  CheckCircle,
  Award,
  Search,
  Filter,
  FileSpreadsheet,
  Printer,
  TrendingUp,
  Clock,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import {
  SAMPLE_COURSE_COMPLETION_STATS,
  SAMPLE_LEARNER_PROGRESS_RECORDS,
  SAMPLE_QUIZ_SCORE_DISTRIBUTION,
  SAMPLE_RECENT_ACTIVITIES
} from '../mockData';

export const LearningReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('All');
  const [exportNotification, setExportNotification] = useState<string | null>(null);

  // Filtered Learners List
  const filteredLearners = useMemo(() => {
    return SAMPLE_LEARNER_PROGRESS_RECORDS.filter((learner) => {
      const matchesSearch =
        learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || learner.status === statusFilter;

      const matchesCourse =
        selectedCourseFilter === 'All' || learner.courseTitle === selectedCourseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [searchTerm, statusFilter, selectedCourseFilter]);

  // Key KPI Aggregations
  const totalEnrolled = useMemo(() => {
    return SAMPLE_COURSE_COMPLETION_STATS.reduce((acc, c) => acc + c.enrolledStudents, 0);
  }, []);

  const avgCompletionRate = useMemo(() => {
    const total = SAMPLE_COURSE_COMPLETION_STATS.reduce((acc, c) => acc + c.completionRatePercentage, 0);
    return (total / SAMPLE_COURSE_COMPLETION_STATS.length).toFixed(1);
  }, []);

  const avgQuizScore = useMemo(() => {
    const total = SAMPLE_COURSE_COMPLETION_STATS.reduce((acc, c) => acc + c.averageScorePercentage, 0);
    return (total / SAMPLE_COURSE_COMPLETION_STATS.length).toFixed(1);
  }, []);

  const totalActiveLearners = useMemo(() => {
    return SAMPLE_COURSE_COMPLETION_STATS.reduce((acc, c) => acc + c.activeLearnersCount, 0);
  }, []);

  const exportLearnerReportCSV = () => {
    const headers = ['Learner Name', 'Email', 'Enrolled Course', 'Progress %', 'Quiz Avg %', 'Modules Completed', 'Status', 'Last Active'];
    const rows = filteredLearners.map(l => [
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.courseTitle}"`,
      `${l.progressPercentage}%`,
      `${l.quizScoreAvg}%`,
      `${l.completedModules}/${l.totalModules}`,
      `"${l.status}"`,
      `"${l.lastActiveDate}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `learnflow_learner_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    setExportNotification('Learner report exported as CSV successfully!');
    setTimeout(() => setExportNotification(null), 3000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Export Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-600" />
            Learning Analytics & Progress Reports
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time learner performance, course completion metrics, and downloadable grade reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportLearnerReportCSV}
            className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-sky-200 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-sky-600" />
            Export CSV
          </button>
          <button
            onClick={handlePrintReport}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Export Toast Notification */}
      {exportNotification && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between animate-fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            {exportNotification}
          </span>
          <button onClick={() => setExportNotification(null)} className="text-emerald-700 hover:text-emerald-950">Dismiss</button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Enrolled */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Enrolled Learners</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalEnrolled}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Across {SAMPLE_COURSE_COMPLETION_STATS.length} published courses</p>
        </div>

        {/* Avg Completion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Avg Completion Rate</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{avgCompletionRate}%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +4.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Average student progress</p>
        </div>

        {/* Avg Quiz Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Average Quiz Score</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{avgQuizScore}%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +2.8%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Passing score threshold: 80%</p>
        </div>

        {/* Active Learners */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Learners</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalActiveLearners}</span>
            <span className="text-xs font-semibold text-slate-500">this week</span>
          </div>
          <p className="text-[11px] text-slate-400">Logged in within last 7 days</p>
        </div>
      </div>

      {/* Course Completion Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              Course Performance Summary
            </h3>
            <p className="text-xs text-slate-500">Overview of student enrollment and mastery levels per course</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Enrolled</th>
                <th className="py-3 px-4">Completion Rate</th>
                <th className="py-3 px-4 text-center">Avg Quiz Score</th>
                <th className="py-3 px-4 text-center">Active Learners</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAMPLE_COURSE_COMPLETION_STATS.map((course) => (
                <tr key={course.courseId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{course.courseTitle}</td>
                  <td className="py-3.5 px-4 text-slate-500">{course.category}</td>
                  <td className="py-3.5 px-4 text-center font-medium">{course.enrolledStudents}</td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-700">
                        <span>{course.completionRatePercentage}%</span>
                      </div>
                      <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-600 rounded-full"
                          style={{ width: `${course.completionRatePercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-800">
                    {course.averageScorePercentage}%
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-600">{course.activeLearnersCount}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      course.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quiz Score Distribution Visual & Activity Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quiz Score Distribution Bars */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Quiz Score Distribution</h3>
            <p className="text-xs text-slate-500">Student performance spread across assessment ranges</p>
          </div>

          <div className="space-y-3 pt-2">
            {SAMPLE_QUIZ_SCORE_DISTRIBUTION.map((dist, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-700 font-medium">
                  <span>{dist.range}</span>
                  <span className="text-slate-500">{dist.count} learners ({dist.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx === 0 ? 'bg-emerald-500' : idx === 1 ? 'bg-sky-500' : idx === 2 ? 'bg-indigo-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Recent Activity & Submissions</h3>
              <p className="text-xs text-slate-500">Live feed of student quiz submissions and milestone completions</p>
            </div>
            <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">Live Updates</span>
          </div>

          <div className="space-y-3">
            {SAMPLE_RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0">
                    {act.learnerName.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{act.learnerName}</span>
                    <span className="text-slate-600">{act.action}</span>
                    <span className="text-slate-400 block text-[10px] mt-0.5">{act.courseTitle}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {act.score !== undefined && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] block mb-1">
                      Score: {act.score}%
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Learner Progress Report Table with Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" />
              Individual Learner Progress Breakdown
            </h3>
            <p className="text-xs text-slate-500">Searchable list of student progress and average assessment grades</p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, email..."
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 w-44"
              />
            </div>

            {/* Course Filter */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="bg-transparent text-slate-700 font-medium outline-none text-xs"
              >
                <option value="All">All Courses</option>
                {SAMPLE_COURSE_COMPLETION_STATS.map(c => (
                  <option key={c.courseId} value={c.courseTitle}>{c.courseTitle}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-slate-700 font-medium outline-none text-xs"
              >
                <option value="All">All Statuses</option>
                <option value="On Track">On Track</option>
                <option value="Completed">Completed</option>
                <option value="Needs Attention">Needs Attention</option>
              </select>
            </div>
          </div>
        </div>

        {/* Learner Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Learner Name</th>
                <th className="py-3 px-4">Course Enrolled</th>
                <th className="py-3 px-4">Modules Completed</th>
                <th className="py-3 px-4">Progress %</th>
                <th className="py-3 px-4 text-center">Quiz Avg %</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLearners.length > 0 ? (
                filteredLearners.map((learner) => (
                  <tr key={learner.learnerId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{learner.name}</div>
                      <div className="text-[11px] text-slate-400">{learner.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{learner.courseTitle}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {learner.completedModules} / {learner.totalModules}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              learner.progressPercentage === 100 ? 'bg-emerald-500' : 'bg-sky-600'
                            }`}
                            style={{ width: `${learner.progressPercentage}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-800">{learner.progressPercentage}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">{learner.quizScoreAvg}%</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        learner.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : learner.status === 'On Track'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {learner.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-500 text-[11px]">{learner.lastActiveDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No learner records found matching the applied search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="pt-2 flex justify-between items-center text-xs text-slate-400 border-t border-slate-100">
          <span>Showing {filteredLearners.length} of {SAMPLE_LEARNER_PROGRESS_RECORDS.length} learner records</span>
          <button
            onClick={exportLearnerReportCSV}
            className="text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1"
          >
            Download Filtered Report <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningReports;
