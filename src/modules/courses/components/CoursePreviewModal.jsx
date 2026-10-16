import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle,
  PlayCircle,
  FileText,
  HelpCircle,
  FileCode,
  Download,
  Clock,
  Layers,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export function CoursePreviewModal({ course, isOpen, onClose }) {
  if (!isOpen || !course) return null;

  const [activeModuleId, setActiveModuleId] = useState(course.modules?.[0]?.id || null);
  const [activeLesson, setActiveLesson] = useState(course.modules?.[0]?.lessons?.[0] || null);

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="w-4 h-4 text-sky-600" />;
      case 'text':
        return <FileText className="w-4 h-4 text-emerald-600" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4 text-amber-600" />;
      case 'assignment':
        return <FileCode className="w-4 h-4 text-indigo-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-preview-title"
    >
      <div className="bg-white rounded-xl w-full max-w-6xl h-[92vh] shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
          <div className="flex items-center gap-3">
            <span className="bg-sky-500/20 text-sky-400 p-2 rounded-lg border border-sky-500/30">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-gray-800 text-sky-400">
                  Learner Preview Mode
                </span>
                <span className="text-xs text-gray-400">• {course.category}</span>
              </div>
              <h2 id="course-preview-title" className="text-lg font-bold text-white mt-0.5">
                {course.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Exit preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Split: Sidebar Navigator + Main Lesson View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar: Modules & Lessons Navigation */}
          <div className="w-full md:w-80 border-r border-gray-200 bg-gray-50 overflow-y-auto flex-shrink-0">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Course Syllabus
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {course.modules?.length || 0} Modules • {course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0} Lessons
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {course.modules?.map((module, mIdx) => {
                const isExpanded = activeModuleId === module.id;
                return (
                  <div key={module.id} className="bg-white">
                    <button
                      onClick={() => setActiveModuleId(isExpanded ? null : module.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="pr-2">
                        <span className="text-[11px] font-bold text-sky-600 block uppercase tracking-wide">
                          Module {mIdx + 1}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 block line-clamp-1">
                          {module.title}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {/* Lesson Items */}
                    {isExpanded && (
                      <div className="bg-gray-50/80 py-1 border-t border-gray-100">
                        {module.lessons?.map((les) => {
                          const isSelected = activeLesson?.id === les.id;
                          return (
                            <button
                              key={les.id}
                              onClick={() => setActiveLesson(les)}
                              className={`w-full px-6 py-2.5 text-left flex items-center gap-2 text-xs font-medium transition-colors ${
                                isSelected
                                  ? 'bg-sky-100 text-sky-900 font-semibold border-l-4 border-sky-600'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {getLessonIcon(les.contentType)}
                              <span className="flex-1 line-clamp-1">{les.title}</span>
                              {les.duration && (
                                <span className="text-[10px] text-gray-400">{les.duration}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Main Viewer Panel */}
          <div className="flex-1 bg-white p-6 overflow-y-auto flex flex-col justify-between">
            {activeLesson ? (
              <div className="space-y-6 max-w-3xl mx-auto w-full">
                {/* Lesson Header */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-sky-600 mb-1">
                    <span className="uppercase tracking-wider font-semibold">{activeLesson.contentType}</span>
                    {activeLesson.duration && <span>• {activeLesson.duration}</span>}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{activeLesson.title}</h1>
                </div>

                {/* Lesson Media Viewer */}
                {activeLesson.contentType === 'video' && activeLesson.contentUrl && (
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-md">
                    <iframe
                      src={activeLesson.contentUrl}
                      title={activeLesson.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {/* Lesson Body Text */}
                {activeLesson.textContent && (
                  <div className="prose prose-sky max-w-none text-gray-700 leading-relaxed text-sm bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <p>{activeLesson.textContent}</p>
                  </div>
                )}

                {/* Lesson Download Resources */}
                {activeLesson.resources?.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                      Lesson Resources
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeLesson.resources.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-center gap-2 p-2.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-sky-700 hover:bg-sky-50 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Download className="w-4 h-4 text-sky-600 flex-shrink-0" />
                          <span className="truncate">{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Overview when no lesson selected */
              <div className="space-y-6 max-w-3xl mx-auto w-full py-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {course.learningObjectives?.length > 0 && (
                  <div className="bg-sky-50/60 p-5 rounded-xl border border-sky-100 space-y-3">
                    <h3 className="text-sm font-bold text-gray-900">What You Will Learn</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                      {course.learningObjectives.map((obj, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-center py-6 text-xs text-gray-400">
                  Select a module lesson from the left syllabus menu to begin learning.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
