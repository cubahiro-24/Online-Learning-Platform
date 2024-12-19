import React from 'react';
import { Course } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCourseStore } from '../store/useCourseStore';
import { useAuthStore } from '../store/useAuthStore';

interface CourseCardProps {
  course: Course;
  variant: 'home' | 'dashboard';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, variant }) => {
  const navigate = useNavigate();
  const { updateProgress } = useCourseStore();
  const { user } = useAuthStore();

  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
  };

  const handleMarkAsCompleted = async () => {
    if (user?.id) {
      await updateProgress(user.id, course.id, 100);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      {/* Image Section */}
      <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {course.description}
        </p>

        {variant === 'home' && (
          <button
            onClick={handleCourseClick}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            View Details
          </button>
        )}

        {variant === 'dashboard' && (
          <>
            <div className="mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${course.progress ?? 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Progress: {course.progress ?? 0}%
              </p>
            </div>

            {(course.progress ?? 0) < 100 && (
              <button
                onClick={handleMarkAsCompleted}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                Mark as Completed
              </button>
            )}

            {course.progress === 100 && (
              <div className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-lg text-center">
                Course Completed
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCard;