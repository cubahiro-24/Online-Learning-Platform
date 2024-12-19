import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen } from 'lucide-react';
import { useCourseStore } from '../store/useCourseStore';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import { Course } from '../types';

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { enrolledCourses, enroll } = useCourseStore();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        if (response.data) {
          setCourse(response.data);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const isEnrolled = enrolledCourses.some((c) => c.id === courseId);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!user?.id || !course) {
      setError('Unable to enroll at this time');
      return;
    }

    try {
      setEnrolling(true);
      setError(null);
      await enroll(user.id, course);
      navigate('/dashboard');
    } catch (error) {
      console.error('Enrollment failed:', error);
      setError('Failed to enroll in the course. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-24 flex items-center justify-center">Loading...</div>;
  }

  if (!course) {
    return <div className="min-h-screen pt-24 flex items-center justify-center">Course not found</div>;
  }

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

            {error && (
              <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleEnroll}
              disabled={isEnrolled || enrolling}
              className={`px-8 py-3 rounded-md text-lg font-medium ${
                isEnrolled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : enrolling
                  ? 'bg-indigo-400 cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isEnrolled 
                ? 'Already Enrolled' 
                : enrolling 
                ? 'Enrolling...' 
                : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
