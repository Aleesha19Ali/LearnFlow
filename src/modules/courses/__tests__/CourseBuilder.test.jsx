import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CourseBuilderApp from '../CourseBuilderApp';
import { useCourseBuilder } from '../useCourseBuilder';
import { INITIAL_COURSES } from '../mockData';

describe('useCourseBuilder Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default mock courses', () => {
    const { result } = renderHook(() => useCourseBuilder());
    expect(result.current.courses.length).toBeGreaterThan(0);
    expect(result.current.courses[0].title).toBe('Full-Stack Web Development Bootcamp');
  });

  it('creates a new course', () => {
    const { result } = renderHook(() => useCourseBuilder());
    let newCourse;
    act(() => {
      newCourse = result.current.createNewCourse();
    });
    expect(result.current.courses.length).toBe(INITIAL_COURSES.length + 1);
    expect(result.current.activeCourseId).toBe(newCourse.id);
  });

  it('adds a module to an existing course', () => {
    const { result } = renderHook(() => useCourseBuilder());
    const courseId = INITIAL_COURSES[0].id;
    const initialModCount = INITIAL_COURSES[0].modules.length;

    act(() => {
      result.current.addModule(courseId, 'New Test Module');
    });

    const updatedCourse = result.current.courses.find((c) => c.id === courseId);
    expect(updatedCourse.modules.length).toBe(initialModCount + 1);
    expect(updatedCourse.modules[initialModCount].title).toBe('New Test Module');
  });

  it('saves a lesson into a module', () => {
    const { result } = renderHook(() => useCourseBuilder());
    const courseId = INITIAL_COURSES[0].id;
    const moduleId = INITIAL_COURSES[0].modules[0].id;

    act(() => {
      result.current.saveLesson(courseId, moduleId, {
        title: 'New Integration Lesson',
        contentType: 'video',
        duration: '10 mins'
      });
    });

    const updatedCourse = result.current.courses.find((c) => c.id === courseId);
    const updatedModule = updatedCourse.modules.find((m) => m.id === moduleId);
    const addedLesson = updatedModule.lessons.find((l) => l.title === 'New Integration Lesson');
    expect(addedLesson).toBeDefined();
    expect(addedLesson.duration).toBe('10 mins');
  });
});

describe('CourseBuilderApp Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Course Builder header and list of courses', () => {
    render(<CourseBuilderApp />);
    expect(screen.getByRole('heading', { level: 1, name: /course builder/i })).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Web Development Bootcamp')).toBeInTheDocument();
  });

  it('filters courses based on search query input', async () => {
    render(<CourseBuilderApp />);
    const searchInput = screen.getByPlaceholderText(/search by title or description/i);

    await userEvent.type(searchInput, 'Artificial Intelligence');

    expect(screen.getByText('Introduction to Artificial Intelligence & Machine Learning')).toBeInTheDocument();
    expect(screen.queryByText('Full-Stack Web Development Bootcamp')).not.toBeInTheDocument();
  });

  it('switches to course edit mode when clicking Edit Course', async () => {
    render(<CourseBuilderApp />);
    const editButtons = screen.getAllByRole('button', { name: /edit /i });
    await userEvent.click(editButtons[0]);

    expect(screen.getByRole('heading', { name: /course details/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Full-Stack Web Development Bootcamp')).toBeInTheDocument();
  });

  it('allows adding learning objectives in course details', async () => {
    render(<CourseBuilderApp />);
    const editButtons = screen.getAllByRole('button', { name: /edit /i });
    await userEvent.click(editButtons[0]);

    const addObjectiveButton = screen.getByRole('button', { name: /add objective/i });
    await userEvent.click(addObjectiveButton);

    const objectiveInputs = screen.getAllByPlaceholderText(/objective/i);
    expect(objectiveInputs.length).toBeGreaterThan(4);
  });
});
