import React from 'react';
import {
  Plus,
  Search,
  Edit3,
  Copy,
  Trash2,
  BookOpen,
  Layers,
  Clock,
  Tag,
  MoreVertical
} from 'lucide-react';
import { CATEGORIES } from '../mockData';

export function CourseList({
  courses,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  onSelectCourse,
  onCreateCourse,
  onDuplicateCourse,
  onDeleteCourse
}) {
  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Course Builder</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage course content, modules, lessons, and learning objectives.
          </p>
        </div>
        <button
          onClick={onCreateCourse}
          className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          aria-label="Create New Course"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <label htmlFor="course-search" className="sr-only">Search Courses</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            id="course-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description..."
            className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-3">
          <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3">
          <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Course Cards / Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 p-8">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No courses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new course or clearing filters.
          </p>
          <div className="mt-6">
            <button
              onClick={onCreateCourse}
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Create New Course
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const totalModules = course.modules?.length || 0;
            const totalLessons = course.modules?.reduce(
              (acc, mod) => acc + (mod.lessons?.length || 0),
              0
            ) || 0;

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                {/* Thumbnail / Header area */}
                <div className="relative h-44 bg-gray-100 border-b border-gray-100 overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 text-sky-600 p-4 text-center">
                      <BookOpen className="w-10 h-10 mb-2 opacity-80" />
                      <span className="text-xs font-medium text-sky-800">No Thumbnail</span>
                    </div>
                  )}
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm ${
                      course.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1.5">
                      <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                        <Tag className="w-3 h-3 text-gray-400" />
                        {course.category}
                      </span>
                      <span>•</span>
                      <span className="text-gray-600">{course.level}</span>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-sky-600 transition-colors">
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">
                      {course.description || 'No description provided.'}
                    </p>
                  </div>

                  {/* Course stats */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-medium text-gray-700">
                        <Layers className="w-3.5 h-3.5 text-sky-600" />
                        {totalModules} {totalModules === 1 ? 'Module' : 'Modules'}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-gray-700">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        {totalLessons} {totalLessons === 1 ? 'Lesson' : 'Lessons'}
                      </span>
                    </div>
                    <span className="text-gray-400 text-[11px]">Updated {course.updatedAt}</span>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectCourse(course.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-medium px-3 py-2 rounded-lg text-sm transition-colors border border-sky-200"
                      aria-label={`Edit ${course.title}`}
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Course</span>
                    </button>

                    <button
                      onClick={() => onDuplicateCourse(course.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                      title="Duplicate Course"
                      aria-label={`Duplicate ${course.title}`}
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
                          onDeleteCourse(course.id);
                        }
                      }}
                      className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                      title="Delete Course"
                      aria-label={`Delete ${course.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
