
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, Teacher, FinancialRecord, UserRole, ExamResult, Notice, ActivityLog, AuditLog, ClassRoutineItem, Exam, Batch, SystemSettings, GradeRule } from '../../types';

// --- CONFIG SEEDS ---
const DEFAULT_SETTINGS: SystemSettings = {
    schoolName: 'Origin Academy',
    address: 'Godagari, Rajshahi',
    contact: '01746-030069',
    logo: '',
    activeSession: '2025'
};

const DEFAULT_GRADING_RULES: GradeRule[] = [
    { id: 'g1', grade: 'A+', gpa: 5.00, minMark: 80, maxMark: 100 },
    { id: 'g2', grade: 'A', gpa: 4.00, minMark: 70, maxMark: 79 },
    { id: 'g3', grade: 'A-', gpa: 3.50, minMark: 60, maxMark: 69 },
    { id: 'g4', grade: 'B', gpa: 3.00, minMark: 50, maxMark: 59 },
    { id: 'g5', grade: 'C', gpa: 2.00, minMark: 40, maxMark: 49 },
    { id: 'g6', grade: 'D', gpa: 1.00, minMark: 33, maxMark: 39 },
    { id: 'g7', grade: 'F', gpa: 0.00, minMark: 0, maxMark: 32 },
];

const SEED_BATCHES: Batch[] = [
  { id: 'b-001', name: 'Class 10 - Padma (Morning)', class: 'Class 10', session: '2024', maxCapacity: 50, status: 'Active' },
  { id: 'b-002', name: 'Class 10 - Meghna (Day)', class: 'Class 10', session: '2024', maxCapacity: 50, status: 'Active' },
  { id: 'b-003', name: 'HSC 2025 - Engineering A', class: 'HSC', session: '2024-25', maxCapacity: 40, status: 'Active' },
  { id: 'b-004', name: 'HSC 2025 - Medical A', class: 'HSC', session: '2024-25', maxCapacity: 40, status: 'Active' },
];

const SEED_STUDENTS: Student[] = [
  {
    id: 'STD-101',
    password: '123',
    isFirstLogin: false,
    name: 'Tanvir Ahmed',
    image: 'https://i.pravatar.cc/300',
    personal: {
      dob: '2008-05-20',
      age: 16,
      gender: 'Male',
      maritalStatus: 'Single',
      religion: 'Islam',
      mobile: '01711556677',
      email: 'tanvir@example.com',
      address: 'Godagari, Rajshahi',
      bloodGroup: 'A+'
    },
    guardian: {
      fatherName: 'Rafiq Ahmed',
      motherName: 'Mrs. Ahmed',
      fatherMobile: '01711000000',
      motherMobile: '01711000001',
    },
    academic: {
      roll: '101',
      class: 'Class 10',
      section: 'Science',
      joinDate: '2024-01-01',
      session: '2025',
      accountStatus: 'Active',
      classStatus: 'Active',
      batch: 'Class 10 - Padma (Morning)',
      batchId: 'b-001'
    },
    performance: {
      lastExam: { score: 580, position: 1 },
      monthly: { score: 96, position: 1 },
      yearly: { score: 98, position: 1 }
    },
    attendance: [
       // Simulating recent dates
       { date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0], status: 'Present' },
       { date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0], status: 'Present' },
       { date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0], status: 'Present' },
       { date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0], status: 'Present' },
       { date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0], status: 'Present' },
       { date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0], status: 'Absent' }, // SMS Trigger Demo
       { date: new Date().toISOString().split('T')[0], status: 'Leave' }   // Today
    ],
    financials: [
      { id: 501, month: 'October 2024', amount: 1500, status: 'Paid', method: 'bKash', paymentDate: '2024-10-05', trxId: 'TRX-OLD-1' },
      { id: 502, month: 'November 2024', amount: 1500, status: 'Due' } // The Blocking one
    ],
    results: [
      {
        examId: 'ex-ct-1',
        examName: 'Class Test 1 (Physics)',
        date: '2024-02-10',
        totalMarks: 50,
        obtainedMarks: 45,
        position: 2,
        isPublished: true,
        status: 'Passed'
      },
      {
        examId: 'ex-ct-2',
        examName: 'Class Test 2 (Math)',
        date: '2024-03-15',
        totalMarks: 50,
        obtainedMarks: 48,
        position: 1,
        isPublished: true,
        status: 'Passed'
      },
      {
        examId: 'ex-monthly-april',
        examName: 'Monthly Exam (April)',
        date: '2024-04-20',
        totalMarks: 100,
        obtainedMarks: 85,
        position: 3,
        isPublished: true,
        status: 'Passed'
      },
      {
        examId: 'ex-pre-half',
        examName: 'Pre-Half Yearly',
        date: '2024-05-25',
        totalMarks: 100,
        obtainedMarks: 92,
        position: 1,
        isPublished: true,
        status: 'Passed'
      },
      {
        examId: 'ex-half-yearly',
        examName: 'Half Yearly Exam 2024',
        date: '2024-06-20',
        totalMarks: 600,
        obtainedMarks: 580,
        position: 1,
        isPublished: true,
        status: 'Passed'
      },
      {
        examId: 'ex-final-2024',
        examName: 'Final Exam 2024',
        date: '2024-12-10',
        totalMarks: 600,
        obtainedMarks: 0,
        position: 0,
        isPublished: false, // Pending
        status: 'Passed'
      }
    ]
  },
  {
    id: 'STD-001',
    password: '123',
    isFirstLogin: false,
    name: 'Aarav Rahman',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
    personal: {
      dob: '2008-01-15',
      age: 16,
      gender: 'Male',
      maritalStatus: 'Single',
      religion: 'Islam',
      mobile: '01711111111',
      email: 'aarav@example.com',
      address: 'Dhanmondi, Dhaka',
      bloodGroup: 'B+'
    },
    guardian: {
      fatherName: 'Mahfuzur Rahman',
      motherName: 'Salma Rahman',
      fatherMobile: '01811111111',
      motherMobile: '01811111112',
    },
    academic: {
      roll: '101',
      class: 'Class 10',
      section: 'A',
      joinDate: '2020-01-10',
      session: '2024',
      accountStatus: 'Active',
      classStatus: 'Active',
      batch: 'Class 10 - Padma (Morning)',
      batchId: 'b-001'
    },
    performance: {
      lastExam: { score: 98, position: 1 },
      monthly: { score: 96, position: 1 },
      yearly: { score: 97, position: 1 }
    },
    attendance: [
       { date: '2024-10-10', status: 'Present' }
    ],
    financials: [
      { id: 101, month: 'August 2023', amount: 5000, status: 'Paid', method: 'bKash', paymentDate: '2023-08-05' },
      { id: 102, month: 'September 2023', amount: 5000, status: 'Paid', method: 'Nagad', paymentDate: '2023-09-05' }
    ],
    results: [
      { 
        examId: 'ex-001', 
        examName: 'Physics Final', 
        date: '2023-10-10', 
        totalMarks: 100, 
        obtainedMarks: 98, 
        position: 1, 
        isPublished: true, 
        status: 'Passed' 
      }
    ]
  },
  {
    id: 'STD-005',
    password: '123',
    isFirstLogin: true, 
    name: 'Esha Khan',
    image: null, 
    personal: {
      dob: '2009-01-01',
      age: 14,
      gender: 'Female',
      maritalStatus: 'Single',
      religion: 'Islam',
      mobile: '01755555555',
      email: 'esha@example.com',
      address: 'Sylhet',
      bloodGroup: 'O+'
    },
    guardian: {
      fatherName: 'Mr. Khan',
      motherName: 'Mrs. Khan',
      fatherMobile: '01700000006',
      motherMobile: '01700000007'
    },
    academic: {
      roll: '105',
      class: 'Class 10',
      section: 'A',
      joinDate: '2024-01-01',
      session: '2024',
      accountStatus: 'Active',
      classStatus: 'Active',
      batch: 'Class 10 - Padma (Morning)',
      batchId: 'b-001'
    },
    performance: {
       lastExam: { score: 0, position: 0 },
       monthly: { score: 0, position: 0 },
       yearly: { score: 0, position: 0 }
    },
    attendance: [],
    financials: [],
    results: []
  }
];

const SEED_TEACHERS: Teacher[] = [
    { id: 't-001', name: 'Ashaduzzaman Shuvo', subject: 'Physics', status: 'Active' },
    { id: 't-002', name: 'Mazharul Islam', subject: 'Math', status: 'Active' },
];

const SEED_NOTICES: Notice[] = [
    { id: 'n1', title: 'Eid Vacation', content: 'School will remain closed for Eid.', date: '2023-06-20', type: 'Administrative', priority: 'Normal' },
    { id: 'n2', title: 'Physics Exam', content: 'Physics exam on Sunday.', date: '2023-10-12', type: 'Academic', priority: 'Urgent' },
];

const SEED_EXAMS: Exam[] = [
    { id: 'ex-001', title: 'Physics Final', subject: 'Physics', durationMinutes: 60, totalMarks: 100, questions: [], class: 'Class 10' },
    { id: 'ex-002', title: 'Math Midterm', subject: 'Math', durationMinutes: 60, totalMarks: 100, questions: [], class: 'Class 10' },
    { id: 'ex-final-2024', title: 'Final Exam 2024', subject: 'Combined', durationMinutes: 180, totalMarks: 600, questions: [], class: 'Class 10' },
];

const SEED_ROUTINE: ClassRoutineItem[] = [
    { id: 'r1', day: 'Sunday', subject: 'Physics', teacher: 'Ashaduzzaman Shuvo', room: '101', time: '10:00 AM - 11:00 AM', startTime: 1000, endTime: 1100 },
    { id: 'r2', day: 'Monday', subject: 'Math', teacher: 'Mazharul Islam', room: '102', time: '10:00 AM - 11:00 AM', startTime: 1000, endTime: 1100 },
];

// --- Context Definition ---

interface DashboardContextType {
  currentUser: Student | Teacher | { id: string; name: string; role: 'admin' } | null;
  role: UserRole;
  students: Student[];
  teachers: Teacher[];
  batches: Batch[];
  notices: Notice[];
  auditLogs: AuditLog[];
  recentActivity: ActivityLog[];
  classRoutine: ClassRoutineItem[];
  availableExams: Exam[];
  systemSettings: SystemSettings;
  gradingRules: GradeRule[];

  login: (id: string, pass: string) => boolean;
  logout: () => void;
  resetPassword: (id: string) => Promise<boolean>;
  changePassword: (newPass: string) => void;
  
  updateSystemSettings: (s: SystemSettings) => void;
  updateGradingRules: (r: GradeRule[]) => void;
  
  admitStudent: (data: any) => void;
  updateStudent: (s: Student) => void;
  deleteStudent: (id: string) => void;
  toggleStudentStatus: (id: string) => void;
  
  addBatch: (b: Omit<Batch, 'id'>) => void;
  updateBatch: (b: Batch) => void;
  deleteBatch: (id: string) => void; // Added
  
  addTeacher: (t: Omit<Teacher, 'id'>) => void; // Added
  toggleTeacherStatus: (id: string) => void;
  
  postNotice: (n: Omit<Notice, 'id' | 'date'>) => void;
  
  updateExamMarks: (examId: string, studentId: string, marks: number, total: number, examTitle: string, date: string) => void;
  publishResult: (examId: string) => void;
  getExamStats: (examId: string) => { totalStudents: number; marksEntered: number; missingStudents: Student[] };
  
  markAttendance: (date: string, records: { studentId: string; status: 'Present' | 'Absent' | 'Leave' }[]) => void;
  makePayment: (studentId: string, feeId: number, method: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [students, setStudents] = useState<Student[]>(SEED_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(SEED_TEACHERS);
  const [batches, setBatches] = useState<Batch[]>(SEED_BATCHES);
  const [notices, setNotices] = useState<Notice[]>(SEED_NOTICES);
  const [availableExams, setAvailableExams] = useState<Exam[]>(SEED_EXAMS);
  const [classRoutine] = useState<ClassRoutineItem[]>(SEED_ROUTINE);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);
  const [gradingRules, setGradingRules] = useState<GradeRule[]>(DEFAULT_GRADING_RULES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);

  // Auth
  const login = (id: string, pass: string): boolean => {
    if (id === 'admin' && pass === 'admin') {
      setCurrentUser({ id: 'admin', name: 'Super Admin', role: 'admin' });
      setRole('admin');
      return true;
    }
    const student = students.find(s => s.id === id && s.password === pass);
    if (student) {
      setCurrentUser(student);
      setRole('student');
      return true;
    }
    const teacher = teachers.find(t => t.id === id && pass === '123'); // Simple mock password for teachers
    if (teacher) {
      setCurrentUser(teacher);
      setRole('teacher');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setRole('guest');
  };

  const resetPassword = async (id: string) => {
      // Mock logic
      return students.some(s => s.id === id || s.personal.mobile === id);
  };

  const changePassword = (newPass: string) => {
      if (role === 'student' && currentUser) {
          const updated = { ...currentUser, password: newPass, isFirstLogin: false };
          setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
          setCurrentUser(updated);
      }
  };

  // Admin Actions
  const updateSystemSettings = (s: SystemSettings) => setSystemSettings(s);
  const updateGradingRules = (r: GradeRule[]) => setGradingRules(r);

  const admitStudent = (data: any) => {
     const newId = `STD-${String(students.length + 1).padStart(3, '0')}`;
     const newStudent: Student = {
         id: newId,
         password: '123',
         isFirstLogin: true,
         name: data.name,
         image: null,
         personal: {
             dob: '2000-01-01',
             age: 15,
             gender: 'Male',
             maritalStatus: 'Single',
             religion: 'Islam',
             mobile: data.phone,
             email: '',
             address: '',
         },
         guardian: {
             fatherName: '',
             motherName: '',
             fatherMobile: '',
             motherMobile: ''
         },
         academic: {
             roll: String(students.length + 100),
             class: 'Class 10', // Simplified
             section: 'A',
             joinDate: new Date().toISOString().split('T')[0],
             session: systemSettings.activeSession,
             accountStatus: 'Active',
             classStatus: 'Active',
             batchId: data.batchId,
             batch: batches.find(b => b.id === data.batchId)?.name || 'Unknown'
         },
         performance: { lastExam: { score: 0, position: 0 }, monthly: { score: 0, position: 0 }, yearly: { score: 0, position: 0 } },
         attendance: [],
         financials: [],
         results: []
     };
     setStudents([...students, newStudent]);
     logActivity('Admission', `New student admitted: ${newStudent.name}`);
  };

  const updateStudent = (updated: Student) => {
      setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
      if (currentUser?.id === updated.id) setCurrentUser(updated);
      logActivity('Profile', `Updated profile for ${updated.name}`);
  };

  const deleteStudent = (id: string) => {
      setStudents(prev => prev.filter(s => s.id !== id));
      logActivity('System', `Deleted student ID: ${id}`);
  };

  const logActivity = (type: any, description: string) => {
      setRecentActivity(prev => [{
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type,
          description
      }, ...prev]);
  };

  const toggleStudentStatus = (id: string) => {
      setStudents(prev => prev.map(s => {
          if (s.id === id) {
              const newStatus = s.academic.accountStatus === 'Active' ? 'Inactive' : 'Active';
              logActivity('System', `Status changed for ${s.name} to ${newStatus}`);
              return { ...s, academic: { ...s.academic, accountStatus: newStatus } };
          }
          return s;
      }));
  };

  const addBatch = (b: Omit<Batch, 'id'>) => {
      setBatches([...batches, { ...b, id: `b-${Date.now()}` }]);
  };

  const updateBatch = (b: Batch) => {
      setBatches(prev => prev.map(batch => batch.id === b.id ? b : batch));
  };
  
  const deleteBatch = (id: string) => {
      setBatches(prev => prev.filter(b => b.id !== id));
      logActivity('System', `Deleted Batch ID: ${id}`);
  };

  const addTeacher = (t: Omit<Teacher, 'id'>) => {
      setTeachers(prev => [...prev, { ...t, id: `t-${Date.now()}`, status: 'Active' }]);
      logActivity('System', `New teacher added: ${t.name}`);
  };

  const toggleTeacherStatus = (id: string) => {
      setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Active' ? 'On Leave' : 'Active' } : t));
  };

  const postNotice = (n: Omit<Notice, 'id' | 'date'>) => {
      const newNotice: Notice = {
          ...n,
          id: `n-${Date.now()}`,
          date: new Date().toISOString().split('T')[0]
      };
      setNotices([newNotice, ...notices]);
  };

  const updateExamMarks = (examId: string, studentId: string, marks: number, total: number, examTitle: string, date: string) => {
      setStudents(prev => prev.map(s => {
          if (s.id === studentId) {
              const existingResultIdx = s.results.findIndex(r => r.examId === examId);
              const newResult: ExamResult = {
                  examId,
                  examName: examTitle,
                  date,
                  totalMarks: total,
                  obtainedMarks: marks,
                  position: 0, // Recalculate later
                  isPublished: false,
                  status: marks >= 33 ? 'Passed' : 'Failed'
              };
              
              const newResults = [...s.results];
              if (existingResultIdx >= 0) {
                  newResults[existingResultIdx] = { ...newResults[existingResultIdx], ...newResult, isPublished: newResults[existingResultIdx].isPublished };
              } else {
                  newResults.push(newResult);
              }
              return { ...s, results: newResults };
          }
          return s;
      }));
  };

  const publishResult = (examId: string) => {
      setStudents(prev => prev.map(s => ({
          ...s,
          results: s.results.map(r => r.examId === examId ? { ...r, isPublished: true } : r)
      })));
      alert(`Results published for Exam ID: ${examId}`);
  };

  const getExamStats = (examId: string) => {
      const exam = availableExams.find(e => e.id === examId);
      if (!exam) return { totalStudents: 0, marksEntered: 0, missingStudents: [] };
      
      const targetStudents = students.filter(s => s.academic.class === exam.class && s.academic.accountStatus === 'Active');
      const totalStudents = targetStudents.length;
      const marksEntered = targetStudents.filter(s => s.results.some(r => r.examId === examId)).length;
      const missingStudents = targetStudents.filter(s => !s.results.some(r => r.examId === examId));
      
      return { totalStudents, marksEntered, missingStudents };
  };

  const markAttendance = (date: string, records: { studentId: string; status: 'Present' | 'Absent' | 'Leave' }[]) => {
      setStudents(prev => prev.map(s => {
          const record = records.find(r => r.studentId === s.id);
          if (record) {
              const existingIdx = s.attendance.findIndex(a => a.date === date);
              const newAtt = [...s.attendance];
              if (existingIdx >= 0) {
                  newAtt[existingIdx] = { date, status: record.status };
              } else {
                  newAtt.push({ date, status: record.status });
              }
              return { ...s, attendance: newAtt };
          }
          return s;
      }));
  };

  const makePayment = (studentId: string, feeId: number, method: string) => {
      setStudents(prev => prev.map(s => {
          if (s.id === studentId) {
              const newFinancials = s.financials.map(f => {
                  if (f.id === feeId) {
                      return { ...f, status: 'Paid', method: method as any, paymentDate: new Date().toISOString().split('T')[0], trxId: `TRX-${Date.now()}` };
                  }
                  return f;
              });
              logActivity('Payment', `Payment collected for ${s.name} (Amount: ${s.financials.find(f => f.id === feeId)?.amount})`);
              return { ...s, financials: newFinancials as FinancialRecord[] };
          }
          return s;
      }));
  };

  return (
    <DashboardContext.Provider value={{
      currentUser, role, students, teachers, batches, notices, auditLogs, recentActivity, classRoutine, availableExams, systemSettings, gradingRules,
      login, logout, resetPassword, changePassword, updateSystemSettings, updateGradingRules, admitStudent, updateStudent, deleteStudent, toggleStudentStatus,
      addBatch, updateBatch, deleteBatch, addTeacher, toggleTeacherStatus, postNotice, updateExamMarks, publishResult, getExamStats, markAttendance, makePayment
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
