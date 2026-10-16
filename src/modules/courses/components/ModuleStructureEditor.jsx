import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit3,
  Video,
  FileText,
  HelpCircle,
  FileCode,
  GripVertical,
  Layers,
  BookOpen,
  Eye
} from 'lucide-react';

export function ModuleStructureEditor({
  course,
  onAddModule,
  onUpdateModule,
  onDeleteModule,
  onReorderModules,
  onEditLesson,
  onDeleteLesson,
  onReorderLessons
}) {
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');

  const handleCreateModule = (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    onAddModule(course.id, newModuleTitle.trim());
    setNewModuleTitle('');
  };

  const handleStartEditingModule = (mod) => {
    setEditingModuleId(mod.id);
    setEditModuleTitle(mod.title);
  };

  const handleSaveModuleTitle = (moduleId) => {
    if (editModuleTitle.trim()) {
      onUpdateModule(course.id, moduleId, { title: editModuleTitle.trim() });
    }
    setEditingModuleId(null);
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-sky-600" />;
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
    <div className="space-y-6 max-w-4xl">
      {/* Add Module Input Header */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Module & Lesson Builder</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Organize modules, add lessons, and structure your course syllabus.
          </p>
        </div>

        <form onSubmit={handleCreateModule} className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="e.g. Module 1: Introduction"
            className="px-3.5 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 min-w-[220px]"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Module</span>
          </button>
        </form>
      </div>

      {/* Modules List */}
      {(!course.modules || course.modules.length === 0) ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 p-8">
          <Layers className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No modules added yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Use the form above to create your first course module.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {course.modules.map((module, modIdx) => (
            <div
              key={module.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Module Header Bar */}
              <div className="bg-gray-50 px-5 py-3.5 border-b border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex flex-col text-gray-400">
                    <button
                      type="button"
                      disabled={modIdx === 0}
                      onClick={() => onReorderModules(course.id, 'up', modIdx)}
                      className="hover:text-gray-700 disabled:opacity-30 p-0.5"
                      title="Move module up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={modIdx === course.modules.length - 1}
                      onClick={() => onReorderModules(course.id, 'down', modIdx)}
                      className="hover:text-gray-700 disabled:opacity-30 p-0.5"
                      title="Move module down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {editingModuleId === module.id ? (
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <input
                        type="text"
                        value={editModuleTitle}
                        onChange={(e) => setEditModuleTitle(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveModuleTitle(module.id)}
                        className="bg-sky-600 text-white px-3 py-1 rounded text-xs font-medium"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-base">{module.title}</span>
                      <button
                        onClick={() => handleStartEditingModule(module)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="Edit module name"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Module Header Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditLesson(module.id, null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 px-3 py-1.5 rounded-lg transition-colors border border-sky-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Lesson</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete module "${module.title}" and its lessons?`)) {
                        onDeleteModule(course.id, module.id);
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Module"
                    aria-label={`Delete module ${module.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Module Lessons Container */}
              <div className="p-4 bg-white">
                {(!module.lessons || module.lessons.length === 0) ? (
                  <p className="text-xs text-gray-400 italic py-2 text-center">
                    No lessons in this module yet. Click "Add Lesson" above to add content.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lesIdx) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100/80 rounded-lg border border-gray-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {/* Lesson Order Reorder Buttons */}
                          <div className="flex flex-col text-gray-400">
                            <button
                              type="button"
                              disabled={lesIdx === 0}
                              onClick={() => onReorderLessons(course.id, module.id, 'up', lesIdx)}
                              className="hover:text-gray-700 disabled:opacity-30 p-0.5"
                              title="Move lesson up"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={lesIdx === module.lessons.length - 1}
                              onClick={() => onReorderLessons(course.id, module.id, 'down', lesIdx)}
                              className="hover:text-gray-700 disabled:opacity-30 p-0.5"
                              title="Move lesson down"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="p-2 bg-white rounded-md border border-gray-200 shadow-2xs">
                            {getLessonIcon(lesson.contentType)}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-800">
                                {lesson.title}
                              </span>
                              {lesson.isPreview && (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                                  <Eye className="w-2.5 h-2.5" />
                                  Preview
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <span className="capitalize">{lesson.contentType}</span>
                              {lesson.duration && <span>• {lesson.duration}</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onEditLesson(module.id, lesson)}
                            className="p-1.5 text-gray-600 hover:text-sky-600 hover:bg-white rounded-md transition-colors"
                            title="Edit Lesson"
                            aria-label={`Edit lesson ${lesson.title}`}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete lesson "${lesson.title}"?`)) {
                                onDeleteLesson(course.id, module.id, lesson.id);
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete Lesson"
                            aria-label={`Delete lesson ${lesson.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
