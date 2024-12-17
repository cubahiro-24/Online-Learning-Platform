import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-12">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center text-center">
          <img
            className="w-20 h-20 rounded-full mb-4"
            src={testimonials[currentIndex].avatar}
            alt={testimonials[currentIndex].name}
          />
          <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-6">
            "{testimonials[currentIndex].content}"
          </p>
          <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
            {testimonials[currentIndex].name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}