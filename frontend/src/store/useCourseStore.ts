import { create } from 'zustand';
import axios from 'axios';
import { Course } from '../types';

interface CourseState {
  enrolledCourses: Course[];
  fetchEnrolledCourses: (userId: string) => Promise<void>;
  enroll: (userId: string, course: Course) => Promise<void>;
  updateProgress: (userId: string, courseId: string, progress: number) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
  enrolledCourses: [],
  
  fetchEnrolledCourses: async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/progress/user?userId=${userId}`);
      const progressData = response.data;
      
      // Fetch course details for each enrolled course
      const enrolledCoursesData = await Promise.all(
        progressData.map(async (progress: any) => {
          const courseResponse = await axios.get(`http://localhost:8080/api/courses/${progress.courseId}`);
          return {
            ...courseResponse.data,
            progress: progress.progressPercentage
          };
        })
      );
      
      set({ enrolledCourses: enrolledCoursesData });
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  },

  enroll: async (userId: string, course: Course) => {
    try {
      // Start course progress in backend
      await axios.post('http://localhost:8080/api/progress/start', null, {
        params: {
          userId: userId,
          courseId: course.id
        }
      });
      
      // Update local state
      set((state) => ({
        enrolledCourses: [...state.enrolledCourses, { ...course, progress: 0 }]
      }));
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  },

  updateProgress: async (userId: string, courseId: string, progress: number) => {
    try {
      // Update progress in backend
      await axios.put('http://localhost:8080/api/progress/update', null, {
        params: {
          userId: userId,
          courseId: courseId,
          progressPercentage: progress
        }
      });
      
      // Update local state
      set((state) => ({
        enrolledCourses: state.enrolledCourses.map((course) =>
          course.id === courseId ? { ...course, progress } : course
        )
      }));
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  }
}));