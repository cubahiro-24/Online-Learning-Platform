import React from 'react';
import { useCourseStore } from '../store/useCourseStore';
import { Course } from '../types';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { updateProgress } = useCourseStore();
  const navigate = useNavigate();

  const handleMarkAsCompleted = () => {
    updateProgress(course.id, 100);
  };

  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={handleCourseClick}>
      {/* Image section */}
      <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {course.description}
        </p>
        
        {/* Progress display */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Progress: {course.progress}%
          </p>
        </div>

        {/* Mark as Completed Button */}
        {course.progress < 100 && (
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
      </div>
    </div>
  );
};

export default CourseCard;
