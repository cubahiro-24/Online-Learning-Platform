import { create } from 'zustand';
import { Course } from '../types';

interface CourseState {
  enrolledCourses: Course[];
  enroll: (course: Course) => void;
  updateProgress: (courseId: string, progress: number) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  enrolledCourses: [],
  enroll: (course) =>
    set((state) => ({
      enrolledCourses: [...state.enrolledCourses, { ...course, progress: 0 }],
    })),
  updateProgress: (courseId, progress) =>
    set((state) => ({
      enrolledCourses: state.enrolledCourses.map((course) =>
        course.id === courseId ? { ...course, progress } : course
      ),
    })),
}));