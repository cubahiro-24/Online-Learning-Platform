import { create } from 'zustand';
import axios from 'axios';
import { Course } from '../types';

interface CourseState {
  enrolledCourses: Course[];
  loading: boolean;
  error: string | null;
  fetchEnrolledCourses: (userId: string) => Promise<void>;
  enroll: (userId: string, course: Course) => Promise<void>;
  updateProgress: (userId: string, courseId: string, progress: number) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  enrolledCourses: [],
  loading: false,
  error: null,

  fetchEnrolledCourses: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`http://localhost:8080/api/courses/enrolled/${userId}`);
      set({ enrolledCourses: response.data });
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      set({ error: 'Failed to fetch enrolled courses' });
    } finally {
      set({ loading: false });
    }
  },

  enroll: async (userId: string, course: Course) => {
    try {
      set({ loading: true, error: null });
      
      // First, enroll the user in the course
      const enrollResponse = await axios.post(
        `http://localhost:8080/api/users/${userId}/enroll/${course.id}`
      );
      console.log('Enrollment response:', enrollResponse.data);
      
      // Then start course progress
      const progressResponse = await axios.post(
        'http://localhost:8080/api/progress/start',
        null,
        {
          params: {
            userId,
            courseId: course.id
          }
        }
      );
      console.log('Progress response:', progressResponse.data);
      
      // Update local state with the new course
      const updatedCourse = { ...course, progress: 0 };
      set((state) => ({
        enrolledCourses: [...state.enrolledCourses, updatedCourse],
        error: null
      }));
      
    } catch (error) {
      console.error('Error during enrollment:', error);
      if (axios.isAxiosError(error)) {
        set({ 
          error: error.response?.data?.message || 'Failed to enroll in the course' 
        });
      } else {
        set({ error: 'An unexpected error occurred' });
      }
      throw error; // Propagate error to component
    } finally {
      set({ loading: false });
    }
  },

  updateProgress: async (userId: string, courseId: string, progress: number) => {
    try {
      set({ loading: true, error: null });
      await axios.put(
        'http://localhost:8080/api/progress/update',
        null,
        {
          params: {
            userId,
            courseId,
            progressPercentage: progress
          }
        }
      );
      
      set((state) => ({
        enrolledCourses: state.enrolledCourses.map((course) =>
          course.id === courseId ? { ...course, progress } : course
        ),
        error: null
      }));
    } catch (error) {
      console.error('Error updating course progress:', error);
      set({ error: 'Failed to update course progress' });
    } finally {
      set({ loading: false });
    }
  }
}));