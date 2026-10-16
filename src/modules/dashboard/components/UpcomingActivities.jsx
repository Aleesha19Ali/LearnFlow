import React from 'react';

export default function UpcomingActivities({ activities }) {
  const getActivityTypeBadge = (type) => {
    switch (type) {
      case 'Quiz':
        return { label: 'Quiz', icon: '📝', className: 'type-quiz' };
      case 'Live Session':
        return { label: 'Live Q&A', icon: '📹', className: 'type-live' };
      case 'Assignment':
        return { label: 'Assignment', icon: '📁', className: 'type-assignment' };
      case 'Workshop':
        return { label: 'Workshop', icon: '👥', className: 'type-workshop' };
      default:
        return { label: type, icon: '📌', className: 'type-default' };
    }
  };

  return (
    <section className="dashboard-section upcoming-activities-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Upcoming Learning Activities</h2>
          <p className="section-subtitle">Live events, quizzes, and upcoming assignment deadlines</p>
        </div>
      </div>

      <div className="activities-timeline">
        {activities.length === 0 ? (
          <p className="empty-message">No upcoming activities scheduled.</p>
        ) : (
          activities.map((activity) => {
            const badge = getActivityTypeBadge(activity.type);
            const isUrgent = activity.urgency === 'urgent';

            return (
              <div
                key={activity.id}
                className={`activity-card ${isUrgent ? 'urgent-border' : ''}`}
              >
                <div className="activity-icon-col">
                  <span className={`activity-type-icon ${badge.className}`}>
                    {badge.icon}
                  </span>
                </div>

                <div className="activity-content">
                  <div className="activity-top-line">
                    <span className={`activity-type-badge ${badge.className}`}>
                      {badge.label}
                    </span>
                    {isUrgent && <span className="urgent-badge">Urgent</span>}
                  </div>
                  <h4 className="activity-title">{activity.title}</h4>
                  <p className="activity-course">{activity.courseTitle}</p>
                </div>

                <div className="activity-timing">
                  <span className="timing-time">📅 {activity.dueDate}</span>
                  <span className="timing-duration">⏱️ {activity.duration}</span>
                  <button className="join-activity-btn">
                    {activity.type === 'Live Session' ? 'Join Live' : 'View Activity'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
