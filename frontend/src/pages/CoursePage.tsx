import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen } from 'lucide-react';
import { useCourseStore } from '../store/useCourseStore';
import { useAuthStore } from '../store/useAuthStore';
import { COURSE_DATA } from '../data/courses';

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { enrolledCourses, enroll } = useCourseStore();

  const course = COURSE_DATA[courseId as keyof typeof COURSE_DATA];
  const isEnrolled = enrolledCourses.some((c) => c.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    enroll(course);
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="h-64 w-full relative">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  by {course.instructor}
                </p>
              </div>
              
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="ml-2 text-lg font-semibold">
                  {course.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  {course.duration}
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  {course.lessons} lessons
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {course.description}
            </p>

            <button
              onClick={handleEnroll}
              disabled={isEnrolled}
              className={`px-8 py-3 rounded-md text-lg font-medium ${
                isEnrolled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}