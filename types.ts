

export type ViewState = 'home' | 'courses' | 'exam' | 'mentors' | 'dashboard';

export type UserRole = 'student' | 'admin' | 'teacher' | 'guest';

// --- System Configuration ---

export interface SystemSettings {
  schoolName: string;
  address: string;
  contact: string;
  logo: string; // URL or Base64
  activeSession: string; // e.g. "2025"
}

export interface GradeRule {
  id: string;
  grade: string; // A+, A, F
  gpa: number;   // 5.00, 4.00
  minMark: number;
  maxMark: number;
}

// --- Core Models ---

export interface PersonalInfo {
  mobile: string;
  email: string;
  address: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  religion: string;
  maritalStatus: 'Single' | 'Married';
  bloodGroup?: string;
}

export interface GuardianInfo {
  fatherName: string;
  motherName: string;
  fatherMobile: string;
  motherMobile: string;
}

export interface AcademicInfo {
  roll: string;
  class: string;
  section: string;
  joinDate: string;
  session: string; // Added Session Year
  // Dual Status System
  accountStatus: 'Active' | 'Inactive'; // Login access
  classStatus: 'Active' | 'Dropped' | 'Graduated';    // Academic continuation
  batch?: string; // Legacy/Display Name
  batchId?: string; // Linked Batch ID
}

export interface FinancialRecord {
  id: number;
  month: string;
  amount: number;
  status: 'Paid' | 'Due';
  paymentDate?: string;
  method?: 'bKash' | 'Nagad' | 'Cash';
  trxId?: string;
}

export interface PerformanceMetric {
  score: number;
  position: number;
}

export interface PerformanceProfile {
  lastExam: PerformanceMetric;
  monthly: PerformanceMetric;
  yearly: PerformanceMetric;
}

export interface ExamResult {
  examId: string;
  examName: string;
  date: string;
  totalMarks: number;
  obtainedMarks: number;
  position: number;
  isPublished: boolean;
  status: 'Passed' | 'Failed' | 'Absent';
}

export interface AttendanceRecord {
  date: string; // ISO Date string YYYY-MM-DD
  status: 'Present' | 'Absent' | 'Leave';
}

// The Comprehensive Student Entity
export interface Student {
  id: string; // Unique ID (mapped from student_id)
  password?: string;
  isFirstLogin?: boolean; // Security Flag
  
  // Identity
  name: string;
  image: string | null;

  // Components
  personal: PersonalInfo;
  guardian: GuardianInfo;
  academic: AcademicInfo;
  
  // Metrics & Logs
  performance: PerformanceProfile;
  attendance: AttendanceRecord[];
  financials: FinancialRecord[];
  
  // Legacy/Detailed History
  results: ExamResult[];
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  status: 'Active' | 'On Leave';
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
  correctAnswer: number;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  questions: Question[];
  class: string;
  subjectCode?: string;
}

// --- Batches ---

export interface Batch {
  id: string;
  name: string; // e.g. "HSC 2025 - Padma"
  class: string; // e.g. "Class 10"
  session: string; // e.g. "2024-2025"
  maxCapacity: number;
  status: 'Active' | 'Closed';
}

// --- Communication, Routine & Logs ---

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'Academic' | 'Administrative' | 'Event';
  priority: 'Normal' | 'Urgent';
}

export interface ActivityLog {
  id: string;
  timestamp: string; // ISO String
  type: 'Payment' | 'Profile' | 'System' | 'Admission';
  description: string;
  studentId?: string;
  studentName?: string;
}

// Secure Audit Trail for Marks/Sensitive Data
export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  action: 'Mark Update' | 'Status Change' | 'Data Deletion';
  targetId: string; // Student ID
  details: {
    field: string;
    oldValue: string | number;
    newValue: string | number;
  };
}

export interface ClassRoutineItem {
  id: string;
  day: string; // Sunday, Monday etc
  subject: string;
  time: string; // e.g., "10:00 AM - 11:00 AM"
  teacher: string;
  room: string;
  startTime: number; // 24h format e.g. 1000 for 10:00 AM
  endTime: number;   // 24h format e.g. 1100 for 11:00 AM
}