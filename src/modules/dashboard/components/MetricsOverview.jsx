import React from 'react';

export default function MetricsOverview({ metrics }) {
  const cards = [
    {
      id: 'enrolled',
      title: 'Enrolled Courses',
      value: metrics.enrolledCoursesCount,
      subtext: 'Active learning programs',
      icon: '📚',
      color: 'blue',
    },
    {
      id: 'progress',
      title: 'Overall Progress',
      value: `${metrics.overallProgressPercentage}%`,
      subtext: 'Average completion rate',
      icon: '📈',
      color: 'purple',
      hasProgressBar: true,
      percentage: metrics.overallProgressPercentage,
    },
    {
      id: 'completed',
      title: 'Completed Lessons',
      value: metrics.completedLessonsCount,
      subtext: `${metrics.totalHoursSpent} hrs invested`,
      icon: '✅',
      color: 'green',
    },
    {
      id: 'pending',
      title: 'Pending Lessons',
      value: metrics.pendingLessonsCount,
      subtext: 'Lessons & tasks due soon',
      icon: '⏳',
      color: 'amber',
    },
  ];

  return (
    <div className="metrics-grid">
      {cards.map((card) => (
        <div key={card.id} className={`metric-card metric-card-${card.color}`}>
          <div className="metric-header">
            <span className="metric-icon">{card.icon}</span>
            <span className="metric-title">{card.title}</span>
          </div>
          <div className="metric-body">
            <h2 className="metric-value">{card.value}</h2>
            {card.hasProgressBar && (
              <div className="metric-progress-bar-bg">
                <div
                  className="metric-progress-bar-fill"
                  style={{ width: `${card.percentage}%` }}
                  aria-label={`${card.percentage}% progress`}
                ></div>
              </div>
            )}
            <p className="metric-subtext">{card.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
