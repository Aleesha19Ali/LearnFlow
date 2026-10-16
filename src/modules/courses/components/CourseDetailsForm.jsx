import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Image, CheckCircle } from 'lucide-react';
import { CATEGORIES, DIFFICULTY_LEVELS } from '../mockData';

export function CourseDetailsForm({ course, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    level: DIFFICULTY_LEVELS[0],
    status: 'Draft',
    thumbnail: '',
    learningObjectives: ['']
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        category: course.category || CATEGORIES[0],
        level: course.level || DIFFICULTY_LEVELS[0],
        status: course.status || 'Draft',
        thumbnail: course.thumbnail || '',
        learningObjectives: course.learningObjectives?.length
          ? [...course.learningObjectives]
          : ['']
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleObjectiveChange = (index, value) => {
    const updated = [...formData.learningObjectives];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, learningObjectives: updated }));
  };

  const addObjective = () => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const removeObjective = (index) => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedObjectives = formData.learningObjectives.filter(
      (obj) => obj.trim() !== ''
    );
    onSave(course.id, {
      ...formData,
      learningObjectives: cleanedObjectives
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Course Details</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Basic information and goals for this course.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Details</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
            Course Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Modern Web Architecture & Microservices"
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
            Course Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a comprehensive summary of what students will gain from this course..."
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-y"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Level */}
        <div>
          <label htmlFor="level" className="block text-sm font-semibold text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            {DIFFICULTY_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-1">
            Publish Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-semibold text-gray-700 mb-1">
            Thumbnail Image URL
          </label>
          <div className="relative">
            <input
              id="thumbnail"
              name="thumbnail"
              type="text"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full pl-9 pr-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
            <Image className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Learning Objectives Section */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Learning Objectives</h3>
            <p className="text-xs text-gray-500">
              Key takeaways students will master by completing this course.
            </p>
          </div>
          <button
            type="button"
            onClick={addObjective}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg transition-colors border border-sky-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Objective</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.learningObjectives.map((objective, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <input
                type="text"
                value={objective}
                onChange={(e) => handleObjectiveChange(idx, e.target.value)}
                placeholder={`Objective ${idx + 1}`}
                className="flex-1 px-3.5 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {formData.learningObjectives.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeObjective(idx)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove objective"
                  aria-label={`Remove objective ${idx + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Details</span>
        </button>
      </div>
    </form>
  );
}
