import React from 'react';
import HeaderBanner from './HeaderBanner.jsx';
import MetricsOverview from './MetricsOverview.jsx';
import EnrolledCourses from './EnrolledCourses.jsx';
import LessonTracker from './LessonTracker.jsx';
import UpcomingActivities from './UpcomingActivities.jsx';
import {
  mockStudentProfile,
  mockDashboardMetrics,
  mockEnrolledCourses,
  mockCompletedLessons,
  mockPendingLessons,
  mockUpcomingActivities,
} from '../data/mockDashboardData.js';
import '../styles/dashboard.css';

export default function StudentDashboard({
  profile = mockStudentProfile,
  metrics = mockDashboardMetrics,
  courses = mockEnrolledCourses,
  completedLessons = mockCompletedLessons,
  pendingLessons = mockPendingLessons,
  activities = mockUpcomingActivities,
  onContinueCourse,
  onStartLesson,
}) {
  return (
    <div className="student-dashboard-wrapper" data-testid="student-dashboard">
      <HeaderBanner profile={profile} />
      <MetricsOverview metrics={metrics} />
      <EnrolledCourses courses={courses} onContinueCourse={onContinueCourse} />
      <LessonTracker
        completedLessons={completedLessons}
        pendingLessons={pendingLessons}
        onStartLesson={onStartLesson}
      />
      <UpcomingActivities activities={activities} />
    </div>
  );
}
