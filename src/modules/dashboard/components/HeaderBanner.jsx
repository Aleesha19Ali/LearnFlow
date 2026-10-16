import React from 'react';

export default function HeaderBanner({ profile }) {
  const greetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-header-banner">
      <div className="header-left">
        <div className="avatar-wrapper">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="user-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=Student';
            }}
          />
          <span className="online-indicator" title="Active student session"></span>
        </div>
        <div className="header-welcome-text">
          <span className="greeting-label">{greetingTime()},</span>
          <h1 className="student-name">{profile.name} 👋</h1>
          <p className="student-role">{profile.currentRole} • {profile.email}</p>
        </div>
      </div>

      <div className="header-right">
        <div className="streak-badge" title="Consecutive daily learning streak">
          <span className="streak-fire-icon" role="img" aria-label="fire">🔥</span>
          <div className="streak-details">
            <span className="streak-count">{profile.learningStreakDays} Days</span>
            <span className="streak-label">Learning Streak</span>
          </div>
        </div>

        <div className="notification-pill" title="Unread learning notifications">
          <span className="bell-icon" role="img" aria-label="notifications">🔔</span>
          <span className="notification-badge">{profile.notificationsCount}</span>
        </div>
      </div>
    </div>
  );
}
