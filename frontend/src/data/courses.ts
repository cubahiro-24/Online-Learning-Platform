import { Course } from '../types';

export const COURSE_DATA: Record<string, Course & { duration: string; lessons: number }> = {
  '1': {
    id: '1',
    title: 'Modern Web Development',
    instructor: 'John Doe',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    description: 'Learn modern web development with React, Node.js, and more.',
    duration: '12 weeks',
    lessons: 24,
  },
  '2': {
    id: '2',
    title: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    description: 'Master the basics of data science and analytics.',
    duration: '10 weeks',
    lessons: 20,
  },
  '3': {
    id: '3',
    title: 'UI/UX Design Principles',
    instructor: 'Alex Johnson',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    description: 'Learn the fundamentals of user interface and experience design.',
    duration: '8 weeks',
    lessons: 16,
  },
};