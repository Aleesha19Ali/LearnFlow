import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Layers
} from 'lucide-react';
import { useCourseBuilder } from './useCourseBuilder';
import { CourseList } from './components/CourseList';
import { CourseDetailsForm } from './components/CourseDetailsForm';
import { ModuleStructureEditor } from './components/ModuleStructureEditor';
import { LessonEditorModal } from './components/LessonEditorModal';
import { CoursePreviewModal } from './components/CoursePreviewModal';

export function CourseBuilderApp() {
  const {
    courses,
    filteredCourses,
    activeCourse,
    activeCourseId,
    setActiveCourseId,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    notification,
    createNewCourse,
    updateCourseDetails,
    deleteCourse,
    duplicateCourse,
    addModule,
    updateModule,
    deleteModule,
    reorderModules,
    saveLesson,
    deleteLesson,
    reorderLessons
  } = useCourseBuilder();

  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'modules'
  const [editingLessonInfo, setEditingLessonInfo] = useState(null); // { moduleId, lesson }
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleEditLesson = (moduleId, lesson) => {
    setEditingLessonInfo({ moduleId, lesson });
    setIsLessonModalOpen(true);
  };

  const handleSaveLessonModal = (lessonData) => {
    if (editingLessonInfo && activeCourseId) {
      saveLesson(activeCourseId, editingLessonInfo.moduleId, lessonData);
    }
    setIsLessonModalOpen(false);
    setEditingLessonInfo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-200">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
              notification.type === 'success'
                ? 'bg-emerald-800 text-white border-emerald-700'
                : 'bg-gray-900 text-white border-gray-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-sky-400" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {!activeCourseId ? (
          /* List View */
          <CourseList
            courses={filteredCourses}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onSelectCourse={(id) => {
              setActiveCourseId(id);
              setActiveTab('details');
            }}
            onCreateCourse={createNewCourse}
            onDuplicateCourse={duplicateCourse}
            onDeleteCourse={deleteCourse}
          />
        ) : (
          /* Editor Workspace View */
          <div className="space-y-6">
            {/* Navigation Header */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveCourseId(null)}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                  aria-label="Back to course list"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span>Courses</span>
                    <span>/</span>
                    <span className="text-sky-600">{activeCourse?.category}</span>
                    <span
                      className={`ml-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        activeCourse?.status === 'Published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {activeCourse?.status}
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 mt-0.5 line-clamp-1">
                    {activeCourse?.title || 'Untitled Course'}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-gray-300"
                >
                  <Eye className="w-4 h-4 text-sky-600" />
                  <span>Learner Preview</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 flex items-center gap-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 px-1 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-sky-600 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>1. Course Details & Objectives</span>
              </button>

              <button
                onClick={() => setActiveTab('modules')}
                className={`pb-3 px-1 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'modules'
                    ? 'border-sky-600 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>2. Modules & Lessons ({activeCourse?.modules?.length || 0})</span>
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'details' && (
              <CourseDetailsForm
                course={activeCourse}
                onSave={updateCourseDetails}
              />
            )}

            {activeTab === 'modules' && (
              <ModuleStructureEditor
                course={activeCourse}
                onAddModule={addModule}
                onUpdateModule={updateModule}
                onDeleteModule={deleteModule}
                onReorderModules={reorderModules}
                onEditLesson={handleEditLesson}
                onDeleteLesson={deleteLesson}
                onReorderLessons={reorderLessons}
              />
            )}

            {/* Lesson Editor Modal */}
            <LessonEditorModal
              isOpen={isLessonModalOpen}
              lesson={editingLessonInfo?.lesson}
              onClose={() => {
                setIsLessonModalOpen(false);
                setEditingLessonInfo(null);
              }}
              onSave={handleSaveLessonModal}
            />

            {/* Course Preview Modal */}
            <CoursePreviewModal
              isOpen={isPreviewOpen}
              course={activeCourse}
              onClose={() => setIsPreviewOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseBuilderApp;
