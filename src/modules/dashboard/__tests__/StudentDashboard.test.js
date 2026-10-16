import test from 'node:test';
import assert from 'node:assert/strict';

import {
  mockStudentProfile,
  mockDashboardMetrics,
  mockEnrolledCourses,
  mockCompletedLessons,
  mockPendingLessons,
  mockUpcomingActivities,
} from '../data/mockDashboardData.js';

test('mockDashboardData structure verification', () => {
  assert.equal(typeof mockStudentProfile.name, 'string');
  assert.equal(mockStudentProfile.id, 'std-101');
  assert.equal(mockDashboardMetrics.enrolledCoursesCount, 4);
  assert.equal(mockDashboardMetrics.overallProgressPercentage, 68);
  assert.equal(mockEnrolledCourses.length, 4);
  assert.equal(mockCompletedLessons.length, 4);
  assert.equal(mockPendingLessons.length, 4);
  assert.equal(mockUpcomingActivities.length, 4);
});

test('enrolled courses progress validation', () => {
  for (const course of mockEnrolledCourses) {
    assert.ok(course.progress >= 0 && course.progress <= 100);
    assert.ok(course.completedLessons <= course.totalLessons);
    assert.ok(typeof course.title === 'string');
    assert.ok(typeof course.instructor === 'string');
  }
});

test('pending and completed lessons validation', () => {
  for (const lesson of mockPendingLessons) {
    assert.ok(lesson.courseTitle);
    assert.ok(lesson.lessonTitle);
    assert.ok(lesson.dueDate);
  }

  for (const lesson of mockCompletedLessons) {
    assert.ok(lesson.courseTitle);
    assert.ok(lesson.lessonTitle);
    assert.ok(lesson.completedAt);
  }
});

test('upcoming activities structure validation', () => {
  for (const activity of mockUpcomingActivities) {
    assert.ok(activity.title);
    assert.ok(activity.courseTitle);
    assert.ok(activity.dueDate);
    assert.ok(activity.type);
  }
});
