import React, { useState, useEffect } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import axios from 'axios';
import { Course } from '../types';

export default function Home() {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/courses');
        // Set all courses instead of slicing
        setPopularCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = popularCourses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchQuery, popularCourses]);
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Future with Online Learning
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Access world-class education from anywhere in the world
            </p>
            <a
              href="/courses"
              className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors"
            >
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Available Courses Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Available Courses
          </h2>
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} variant="home" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            What Our Students Say
          </h2>
          <TestimonialCarousel />
        </div>
      </section>
    </div>
  );
}