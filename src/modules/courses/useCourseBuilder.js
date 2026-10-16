import { useState, useMemo } from 'react';
import { INITIAL_COURSES } from './mockData';

export function useCourseBuilder() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('learnflow_courses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved courses', e);
      }
    }
    return INITIAL_COURSES;
  });

  const [activeCourseId, setActiveCourseId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [notification, setNotification] = useState(null);

  // Helper to persist courses
  const saveCoursesState = (updatedCourses) => {
    setCourses(updatedCourses);
    try {
      localStorage.setItem('learnflow_courses', JSON.stringify(updatedCourses));
    } catch (e) {
      console.error('Failed to persist courses to localStorage', e);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Active course
  const activeCourse = useMemo(() => {
    return courses.find((c) => c.id === activeCourseId) || null;
  }, [courses, activeCourseId]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'All' || course.category === categoryFilter;
      const matchesStatus =
        statusFilter === 'All' || course.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [courses, searchQuery, categoryFilter, statusFilter]);

  // Actions
  const createNewCourse = () => {
    const newCourse = {
      id: `course-${Date.now()}`,
      title: 'Untitled Course',
      description: '',
      category: 'Software Engineering',
      level: 'Beginner',
      status: 'Draft',
      thumbnail: '',
      learningObjectives: [''],
      modules: [],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newCourse, ...courses];
    saveCoursesState(updated);
    setActiveCourseId(newCourse.id);
    showNotification('New course created', 'success');
    return newCourse;
  };

  const updateCourseDetails = (courseId, updatedDetails) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          ...updatedDetails,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    saveCoursesState(updated);
    showNotification('Course details updated', 'success');
  };

  const deleteCourse = (courseId) => {
    const updated = courses.filter((c) => c.id !== courseId);
    saveCoursesState(updated);
    if (activeCourseId === courseId) {
      setActiveCourseId(null);
    }
    showNotification('Course deleted', 'info');
  };

  const duplicateCourse = (courseId) => {
    const courseToDup = courses.find((c) => c.id === courseId);
    if (!courseToDup) return;

    const duplicated = {
      ...JSON.parse(JSON.stringify(courseToDup)),
      id: `course-${Date.now()}`,
      title: `${courseToDup.title} (Copy)`,
      status: 'Draft',
      updatedAt: new Date().toISOString().split('T')[0]
    };

    saveCoursesState([duplicated, ...courses]);
    showNotification('Course duplicated', 'success');
  };

  // Module Actions
  const addModule = (courseId, title, description = '') => {
    const newModule = {
      id: `mod-${Date.now()}`,
      title: title || 'New Module',
      description: description,
      lessons: []
    };

    const updated = courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          modules: [...c.modules, newModule],
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    saveCoursesState(updated);
    showNotification('Module added', 'success');
  };

  const updateModule = (courseId, moduleId, updatedModule) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          modules: c.modules.map((m) =>
            m.id === moduleId ? { ...m, ...updatedModule } : m
          ),
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    saveCoursesState(updated);
  };

  const deleteModule = (courseId, moduleId) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          modules: c.modules.filter((m) => m.id !== moduleId),
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    saveCoursesState(updated);
    showNotification('Module deleted', 'info');
  };

  const reorderModules = (courseId, direction, index) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const modules = [...course.modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= modules.length) return;

    const [moved] = modules.splice(index, 1);
    modules.splice(targetIndex, 0, moved);

    const updated = courses.map((c) =>
      c.id === courseId ? { ...c, modules, updatedAt: new Date().toISOString().split('T')[0] } : c
    );
    saveCoursesState(updated);
  };

  // Lesson Actions
  const saveLesson = (courseId, moduleId, lessonData) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          modules: c.modules.map((m) => {
            if (m.id === moduleId) {
              const existingIndex = m.lessons.findIndex((l) => l.id === lessonData.id);
              let updatedLessons;
              if (existingIndex >= 0) {
                updatedLessons = m.lessons.map((l, idx) =>
                  idx === existingIndex ? { ...l, ...lessonData } : l
                );
              } else {
                const newLesson = {
                  ...lessonData,
                  id: lessonData.id || `les-${Date.now()}`
                };
                updatedLessons = [...m.lessons, newLesson];
              }
              return { ...m, lessons: updatedLessons };
            }
            return m;
          }),
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    saveCoursesState(updated);
    showNotification('Lesson saved', 'success');
  };

  const deleteLesson = (courseId, moduleId, lessonId) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          modules: c.modules.map((m) => {
            if (m.id === moduleId) {
              return {
                ...m,
                lessons: m.lessons.filter((l) => l.id !== lessonId)
              };
            }
            return m;
          }),
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    saveCoursesState(updated);
    showNotification('Lesson deleted', 'info');
  };

  const reorderLessons = (courseId, moduleId, direction, lessonIndex) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const module = course.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const lessons = [...module.lessons];
    const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1;

    if (targetIndex < 0 || targetIndex >= lessons.length) return;

    const [moved] = lessons.splice(lessonIndex, 1);
    lessons.splice(targetIndex, 0, moved);

    const updated = courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          modules: c.modules.map((m) =>
            m.id === moduleId ? { ...m, lessons } : m
          ),
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    saveCoursesState(updated);
  };

  return {
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
  };
}
