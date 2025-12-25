import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Award, Play, ChevronRight, Timer, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Exam, Question } from '../../types';

// Mock Data
const MOCK_EXAM: Exam = {
  id: 'ex1',
  title: 'HSC Physics - Vector Master Class',
  subject: 'Physics',
  durationMinutes: 10,
  totalMarks: 20,
  class: 'HSC',
  questions: [
    {
      id: 1,
      text: 'দুটি ভেক্টরের লব্ধি সর্বোচ্চ হয় যখন তাদের মধ্যবর্তী কোণ কত?',
      options: ['0°', '90°', '180°', '45°'],
      correctAnswer: 0
    },
    {
      id: 2,
      text: 'ভেক্টর গুণনের ক্ষেত্রে কোনটি সঠিক?',
      options: ['A x B = B x A', 'A x B = -(B x A)', 'A . B = -(B . A)', 'কোনটিই নয়'],
      correctAnswer: 1
    },
    {
      id: 3,
      text: 'ঘূর্ণন গতির ক্ষেত্রে বলের ভ্রামক বা টর্ক (Torque) কী রাশি?',
      options: ['স্কেলার', 'ভেক্টর', 'টেনসর', 'কাল্পনিক'],
      correctAnswer: 1
    }
  ]
};

// Sub-components defined externally to avoid re-renders
const ExamCard: React.FC<{ exam: Exam; onStart: () => void }> = ({ exam, onStart }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full font-bold border border-indigo-100">{exam.subject}</span>
        <h3 className="text-xl font-bold text-slate-900 mt-3 group-hover:text-indigo-600 transition-colors">{exam.title}</h3>
      </div>
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
         <Timer size={24} />
      </div>
    </div>
    
    <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
       <div className="flex items-center"><Clock size={16} className="mr-1.5" /> {exam.durationMinutes} মি.</div>
       <div className="flex items-center"><CheckCircle size={16} className="mr-1.5" /> {exam.totalMarks} মার্কস</div>
    </div>

    <Button onClick={onStart} className="w-full">
      <Play size={16} className="mr-2 fill-current" /> পরীক্ষা শুরু করুন
    </Button>
  </div>
);

const ResultView: React.FC<{ score: number; total: number; onBack: () => void }> = ({ score, total, onBack }) => {
  const percentage = (score / total) * 100;
  let grade = 'F';
  let color = 'text-red-600';
  if (percentage >= 80) { grade = 'A+'; color = 'text-emerald-600'; }
  else if (percentage >= 70) { grade = 'A'; color = 'text-green-600'; }
  else if (percentage >= 60) { grade = 'A-'; color = 'text-blue-600'; }
  else if (percentage >= 33) { grade = 'B'; color = 'text-yellow-600'; }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-slate-100">
      <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
        <div className="relative z-10">
          <div className="mx-auto w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(250,204,21,0.4)] animate-bounce-slow">
            <Award size={48} className="text-slate-900" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">অভিনন্দন!</h2>
          <p className="text-slate-400">আপনার পরীক্ষা সম্পন্ন হয়েছে</p>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-3 gap-4 text-center mb-8">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">প্রাপ্ত নম্বর</p>
            <p className="text-3xl font-bold text-slate-800">{score}<span className="text-lg text-slate-400">/{total}</span></p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">গ্রেড</p>
            <p className={`text-3xl font-bold ${color}`}>{grade}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">সময়</p>
            <p className="text-3xl font-bold text-slate-800">Done</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center"><Timer className="mr-2 text-indigo-500" /> লাইভ লিডারবোর্ড</h3>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr className="bg-indigo-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-900">#1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-900 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    You (Student)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-indigo-700">{score}</td>
                </tr>
                {/* Mock Ranks */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">#2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Rahim Ahmed</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-600">{Math.max(0, score - 2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Button onClick={onBack} variant="outline" className="w-full">
          তালিকায় ফিরে যান
        </Button>
      </div>
    </div>
  );
};

export const ExamPortal: React.FC = () => {
  const [view, setView] = useState<'list' | 'taking' | 'result'>('list');
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);

  // Restore exam state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('ACTIVE_EXAM_STATE');
    if (savedState) {
      try {
        const { examId, expiryTime, answers: savedAnswers } = JSON.parse(savedState);
        if (examId === MOCK_EXAM.id) {
          const now = Date.now();
          const remaining = Math.floor((expiryTime - now) / 1000);
          
          if (remaining > 0) {
            setAnswers(savedAnswers);
            setTimeLeft(remaining);
            setView('taking');
          } else {
            // Exam expired while away - calculate and show result
            let calculatedScore = 0;
            MOCK_EXAM.questions.forEach((q, idx) => {
              if (savedAnswers[idx] === q.correctAnswer) calculatedScore += 5;
            });
            setScore(calculatedScore);
            setView('result');
            localStorage.removeItem('ACTIVE_EXAM_STATE');
          }
        }
      } catch (e) {
        console.error("Failed to restore exam session", e);
        localStorage.removeItem('ACTIVE_EXAM_STATE');
      }
    }
  }, []);

  // Persist answers when changed
  useEffect(() => {
    if (view === 'taking' && answers.length > 0) {
      const saved = localStorage.getItem('ACTIVE_EXAM_STATE');
      if (saved) {
        const parsed = JSON.parse(saved);
        localStorage.setItem('ACTIVE_EXAM_STATE', JSON.stringify({
          ...parsed,
          answers
        }));
      }
    }
  }, [answers, view]);

  const startExam = () => {
    const durationSec = MOCK_EXAM.durationMinutes * 60;
    const initialAnswers = new Array(MOCK_EXAM.questions.length).fill(-1);
    const expiryTime = Date.now() + durationSec * 1000;

    setAnswers(initialAnswers);
    setTimeLeft(durationSec);
    setView('taking');
    
    // Initialize session storage
    localStorage.setItem('ACTIVE_EXAM_STATE', JSON.stringify({
      examId: MOCK_EXAM.id,
      expiryTime,
      answers: initialAnswers
    }));
  };

  const submitExam = () => {
    // Clear session storage
    localStorage.removeItem('ACTIVE_EXAM_STATE');

    let calculatedScore = 0;
    MOCK_EXAM.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        calculatedScore += 5; // Assuming 5 marks per question logic for 20 total roughly
      }
    });
    setScore(calculatedScore);
    setView('result');
  };

  const handleOptionSelect = (qIdx: number, oIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = oIdx;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    let timer: any;
    if (view === 'taking' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[600px]">
      <div className="container mx-auto px-4">
        {view === 'list' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">অনলাইন এক্সাম জোন</h2>
              <p className="text-slate-500">আপনার প্রস্তুতি যাচাই করতে নিয়মিত পরীক্ষা দিন</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ExamCard exam={MOCK_EXAM} onStart={startExam} />
              
              <div 
                className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer group"
                onClick={() => alert("New exams are uploaded every Friday!")}
              >
                <div className="w-16 h-16 rounded-full bg-white mb-4 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                   <AlertCircle className="text-slate-300 group-hover:text-indigo-400" />
                </div>
                <p className="font-medium">আরো এক্সাম আসছে...</p>
                <p className="text-xs mt-1 text-slate-300">Click for info</p>
              </div>
            </div>
          </div>
        )}

        {view === 'taking' && (
          <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            {/* Sticky Header with Glassmorphism */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center border border-white/50 ring-1 ring-black/5 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{MOCK_EXAM.subject}</span>
                <h3 className="font-bold text-slate-900 text-lg truncate max-w-[250px] sm:max-w-md">{MOCK_EXAM.title}</h3>
              </div>
              
              <div className={`flex items-center gap-2 px-6 py-2 rounded-full font-mono text-xl font-bold shadow-sm transition-all duration-500 ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse border border-red-200' : 'bg-white text-indigo-600 border border-indigo-100'}`}>
                <Clock className={timeLeft < 60 ? "animate-spin" : ""} size={20} />
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden shadow-inner">
               <div 
                 className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500 ease-out"
                 style={{ width: `${(answers.filter(a => a !== -1).length / MOCK_EXAM.questions.length) * 100}%` }}
               ></div>
            </div>

            {/* Questions List */}
            <div className="space-y-8 mb-12">
              {MOCK_EXAM.questions.map((q, qIdx) => (
                <div key={q.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-start leading-snug">
                    <span className="bg-indigo-50 text-indigo-600 text-sm font-bold px-3 py-1 rounded-lg mr-4 mt-1 flex-shrink-0 border border-indigo-100 shadow-sm">Q{qIdx + 1}</span>
                    {q.text}
                  </h4>
                  <div className="space-y-3">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = answers[qIdx] === oIdx;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleOptionSelect(qIdx, oIdx)}
                          className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 active:scale-[0.99] ${
                            isSelected
                              ? 'bg-indigo-50 border-indigo-600 shadow-md ring-1 ring-indigo-600/20'
                              : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                          }`}
                        >
                          {/* Custom Radio/Check Circle */}
                          <div className={`
                            w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300
                            ${isSelected ? 'border-indigo-600 bg-indigo-600 scale-110' : 'border-slate-300 bg-slate-50 group-hover:border-indigo-400'}
                          `}>
                            {isSelected && <Check size={14} className="text-white animate-in zoom-in duration-200" strokeWidth={3} />}
                          </div>
                          
                          <span className={`font-medium text-lg transition-colors ${isSelected ? 'text-indigo-900' : 'text-slate-600'}`}>
                            {opt}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={submitExam} size="lg" className="w-full shadow-xl shadow-indigo-500/20 py-4 text-lg rounded-2xl group">
              উত্তরপত্র জমা দিন <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {view === 'result' && (
          <ResultView 
            score={score} 
            total={MOCK_EXAM.questions.length * 5} 
            onBack={() => setView('list')} 
          />
        )}
      </div>
    </div>
  );
};