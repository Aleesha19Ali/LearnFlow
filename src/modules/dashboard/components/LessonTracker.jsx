import React, { useState } from 'react';

export default function LessonTracker({ completedLessons, pendingLessons, onStartLesson }) {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <section className="dashboard-section lesson-tracker-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Lesson Tracker</h2>
          <p className="section-subtitle">Manage upcoming assignments and review completed coursework</p>
        </div>
        <div className="tracker-tabs">
          <button
            className={`tracker-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Lessons ({pendingLessons.length})
          </button>
          <button
            className={`tracker-tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Lessons ({completedLessons.length})
          </button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'pending' && (
          <div className="lessons-list">
            {pendingLessons.length === 0 ? (
              <p className="empty-message">🎉 All caught up! No pending lessons.</p>
            ) : (
              pendingLessons.map((lesson) => (
                <div key={lesson.id} className="lesson-row pending-row">
                  <div className="lesson-status-icon pending-icon">⌛</div>
                  <div className="lesson-main-info">
                    <span className="lesson-course-tag">{lesson.courseTitle}</span>
                    <h4 className="lesson-title">{lesson.lessonTitle}</h4>
                    <div className="lesson-meta-pills">
                      <span className="meta-pill">{lesson.type}</span>
                      <span className="meta-pill">Duration: {lesson.estimatedDuration}</span>
                      <span className={`priority-pill priority-${lesson.priority.toLowerCase()}`}>
                        {lesson.priority} Priority
                      </span>
                    </div>
                  </div>
                  <div className="lesson-action-col">
                    <span className="due-date-text">Due: {lesson.dueDate}</span>
                    <button
                      className="action-btn primary-btn"
                      onClick={() => onStartLesson && onStartLesson(lesson.id)}
                    >
                      Start Lesson
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="lessons-list">
            {completedLessons.length === 0 ? (
              <p className="empty-message">No completed lessons yet.</p>
            ) : (
              completedLessons.map((lesson) => (
                <div key={lesson.id} className="lesson-row completed-row">
                  <div className="lesson-status-icon completed-icon">✅</div>
                  <div className="lesson-main-info">
                    <span className="lesson-course-tag">{lesson.courseTitle}</span>
                    <h4 className="lesson-title">{lesson.lessonTitle}</h4>
                    <div className="lesson-meta-pills">
                      <span className="meta-pill">{lesson.type}</span>
                      <span className="meta-pill score-pill">Score: {lesson.score}</span>
                    </div>
                  </div>
                  <div className="lesson-action-col">
                    <span className="completed-date-text">Completed on {lesson.completedAt}</span>
                    <button className="action-btn secondary-btn">Review</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
