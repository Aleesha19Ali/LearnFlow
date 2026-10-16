import React, { useState } from 'react';

export default function EnrolledCourses({ courses, onContinueCourse }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="dashboard-section enrolled-courses-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">My Enrolled Courses</h2>
          <p className="section-subtitle">Track course progress and resume your active modules</p>
        </div>
        <div className="section-actions">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="course-search-input"
            aria-label="Search courses"
          />
        </div>
      </div>

      <div className="category-filter-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="courses-grid">
        {filteredCourses.length === 0 ? (
          <div className="no-courses-placeholder">
            <p>No courses found matching your criteria.</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-card-header">
                <span className="course-icon">{course.thumbnail}</span>
                <span className="course-category-badge">{course.category}</span>
              </div>

              <h3 className="course-title">{course.title}</h3>
              <p className="course-instructor">Instructor: {course.instructor}</p>

              <div className="course-progress-section">
                <div className="progress-labels">
                  <span className="progress-text">Progress</span>
                  <span className="progress-percent">{course.progress}%</span>
                </div>
                <div className="course-progress-bar-bg">
                  <div
                    className="course-progress-bar-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="lesson-stats">
                  <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                  <span>Est. {course.estimatedTimeLeft} left</span>
                </div>
              </div>

              <div className="next-lesson-box">
                <span className="next-lesson-label">Next Lesson:</span>
                <p className="next-lesson-title">{course.nextLesson}</p>
              </div>

              <button
                className="continue-learning-btn"
                onClick={() => onContinueCourse && onContinueCourse(course.id)}
              >
                Continue Learning →
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
