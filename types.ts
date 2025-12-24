export type ViewState = 'home' | 'courses' | 'exam' | 'mentors' | 'dashboard';

export interface User {
  id: string;
  name: string;
  role: 'student' | 'guest';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  tags: string[];
  gradient: string;
}

export interface Mentor {
  id: string;
  name: string;
  institution: string;
  subject: string;
  image: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  questions: Question[];
}

export interface ExamResult {
  examId: string;
  score: number;
  total: number;
  rank: number;
  date: string;
}
