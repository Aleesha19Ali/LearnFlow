import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Video, FileText, HelpCircle, FileCode } from 'lucide-react';
import { CONTENT_TYPES } from '../mockData';

export function LessonEditorModal({ lesson, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    contentType: 'video',
    duration: '15 mins',
    contentUrl: '',
    textContent: '',
    isPreview: false,
    resources: ['']
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        id: lesson.id || '',
        title: lesson.title || '',
        contentType: lesson.contentType || 'video',
        duration: lesson.duration || '',
        contentUrl: lesson.contentUrl || '',
        textContent: lesson.textContent || '',
        isPreview: lesson.isPreview || false,
        resources: lesson.resources?.length ? [...lesson.resources] : ['']
      });
    } else {
      setFormData({
        id: '',
        title: '',
        contentType: 'video',
        duration: '15 mins',
        contentUrl: '',
        textContent: '',
        isPreview: false,
        resources: ['']
      });
    }
  }, [lesson, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleResourceChange = (index, value) => {
    const updated = [...formData.resources];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, resources: updated }));
  };

  const addResource = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, '']
    }));
  };

  const removeResource = (index) => {
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedResources = formData.resources.filter((res) => res.trim() !== '');
    onSave({
      ...formData,
      resources: cleanedResources
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-modal-title"
    >
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 id="lesson-modal-title" className="text-lg font-bold text-gray-900">
            {lesson ? 'Edit Lesson' : 'Add New Lesson'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Lesson Title */}
          <div>
            <label htmlFor="lesson-title" className="block text-sm font-semibold text-gray-700 mb-1">
              Lesson Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="lesson-title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Introduction to React Components"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Content Type */}
            <div>
              <label htmlFor="contentType" className="block text-sm font-semibold text-gray-700 mb-1">
                Content Type
              </label>
              <select
                id="contentType"
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {CONTENT_TYPES.map((ct) => (
                  <option key={ct.id} value={ct.id}>
                    {ct.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-1">
                Estimated Duration
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 15 mins"
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Conditional Media / Embed URL */}
          {(formData.contentType === 'video' || formData.contentType === 'quiz') && (
            <div>
              <label htmlFor="contentUrl" className="block text-sm font-semibold text-gray-700 mb-1">
                {formData.contentType === 'video' ? 'Video Embed URL / YouTube Link' : 'Quiz Embed Link'}
              </label>
              <input
                id="contentUrl"
                name="contentUrl"
                type="text"
                value={formData.contentUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}

          {/* Text / Summary / Instructions Content */}
          <div>
            <label htmlFor="textContent" className="block text-sm font-semibold text-gray-700 mb-1">
              Lesson Text / Notes / Instructions
            </label>
            <textarea
              id="textContent"
              name="textContent"
              rows="4"
              value={formData.textContent}
              onChange={handleChange}
              placeholder="Detailed lesson overview, reading notes, or submission guidance..."
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-y"
            ></textarea>
          </div>

          {/* Public Preview Toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="isPreview"
              name="isPreview"
              type="checkbox"
              checked={formData.isPreview}
              onChange={handleChange}
              className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
            />
            <label htmlFor="isPreview" className="text-sm font-medium text-gray-700 select-none">
              Allow Free Preview (accessible without enrolment)
            </label>
          </div>

          {/* Resource Downloads */}
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Downloadable Resources / Links
              </label>
              <button
                type="button"
                onClick={addResource}
                className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Resource
              </button>
            </div>

            <div className="space-y-2">
              {formData.resources.map((res, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={res}
                    onChange={(e) => handleResourceChange(idx, e.target.value)}
                    placeholder={`Resource Name / URL ${idx + 1}`}
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {formData.resources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResource(idx)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded transition-colors"
                      aria-label={`Remove resource ${idx + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <Save className="w-4 h-4" />
              <span>Save Lesson</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
