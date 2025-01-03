export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  imageUrl: string;
  description: string;
  duration: string;
  lessons: number;
  progress?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  content: string;
  role: string;
}