import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { Course } from '../types';

interface CourseState {
  enrolledCourses: Course[];
  enroll: (course: Course, userId: string) => Promise<void>;
  updateProgress: (courseId: string, userId: string, progress: number) => Promise<void>;
  fetchEnrolledCourses: (userId: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      enrolledCourses: [],
      enroll: async (course, userId) => {
        try {
          // Call backend API to enroll in course
          await axios.post(`http://localhost:8080/api/progress/start`, {}, {
            params: {
              userId: userId,
              courseId: course.id
            }
          });

          set((state) => ({
            enrolledCourses: [...state.enrolledCourses, { ...course, progress: 0 }],
          }));
        } catch (error) {
          console.error('Failed to enroll in course:', error);
          throw error;
        }
      },
      updateProgress: async (courseId, userId, progress) => {
        try {
          // Call backend API to update progress
          await axios.put(`http://localhost:8080/api/progress/update`, {}, {
            params: {
              userId: userId,
              courseId: courseId,
              progressPercentage: progress
            }
          });

          set((state) => ({
            enrolledCourses: state.enrolledCourses.map((course) =>
              course.id === courseId ? { ...course, progress } : course
            ),
          }));
        } catch (error) {
          console.error('Failed to update progress:', error);
          throw error;
        }
      },
      fetchEnrolledCourses: async (userId) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/courses`, {
            params: { userId }
          });
          set({ enrolledCourses: response.data });
        } catch (error) {
          console.error('Failed to fetch enrolled courses:', error);
          throw error;
        }
      },
    }),
    {
      name: 'course-storage',
    }
  )
);