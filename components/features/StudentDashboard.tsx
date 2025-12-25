import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import { Student } from '../../types';
import { 
  User, Calendar, BookOpen, DollarSign, Edit2, Lock, 
  Save, AlertCircle, TrendingUp, Clock, CreditCard,
  ChevronLeft, ChevronRight, CheckCircle, Smartphone, Bell, Loader2,
  FileText, Download, LayoutList, KeyRound, Printer
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

// --- Sub Components ---

const ChangePasswordModal: React.FC = () => {
    const { changePassword } = useDashboard();
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (pass1.length < 4) {
            setError('Password must be at least 4 characters');
            return;
        }
        if (pass1 !== pass2) {
            setError('Passwords do not match');
            return;
        }
        changePassword(pass1);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    <KeyRound size={32} />
                </div>
                <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Security Alert</h3>
                <p className="text-center text-slate-500 mb-6 text-sm">
                    This is your first login. For security reasons, you <b>MUST</b> change your default password to continue.
                </p>

                <div className="space-y-4">
                    {error && <div className="p-2 bg-red-50 text-red-600 text-xs rounded border border-red-100">{error}</div>}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">New Password</label>
                        <input 
                            type="password" 
                            value={pass1} 
                            onChange={e => setPass1(e.target.value)} 
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>
                    <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Confirm Password</label>
                        <input 
                            type="password" 
                            value={pass2} 
                            onChange={e => setPass2(e.target.value)} 
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>
                    <Button onClick={handleSubmit} className="w-full mt-2">Update Password</Button>
                </div>
            </div>
        </div>
    );
};

const AdmitCardModal: React.FC<{ student: Student; onClose: () => void; systemSettings: any }> = ({ student, onClose, systemSettings }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Admit Card">
            <div className="flex flex-col items-center">
                <div id="admit-card-print" className="w-full max-w-md bg-white border-2 border-slate-800 p-6 relative overflow-hidden print:shadow-none mb-6">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <div className="text-6xl font-black -rotate-45">ORIGIN</div>
                    </div>

                    <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-xl">OA</div>
                            <div>
                                <h2 className="font-bold text-xl uppercase tracking-wider">{systemSettings.schoolName}</h2>
                                <p className="text-xs font-mono">Academic Session: {student.academic.session}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="bg-slate-800 text-white px-2 py-1 text-xs font-bold uppercase">Admit Card</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <div className="w-24 h-24 bg-slate-100 border border-slate-300">
                            <img src={student.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} className="w-full h-full object-cover" alt="Student" />
                        </div>
                        <div className="flex-1 space-y-1 text-sm">
                            <p><span className="font-bold w-20 inline-block">Name:</span> {student.name}</p>
                            <p><span className="font-bold w-20 inline-block">ID:</span> {student.id}</p>
                            <p><span className="font-bold w-20 inline-block">Class:</span> {student.academic.class}</p>
                            <p><span className="font-bold w-20 inline-block">Roll:</span> {student.academic.roll}</p>
                            <p><span className="font-bold w-20 inline-block">Batch:</span> {student.academic.batch}</p>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-slate-400 pt-4 mt-4">
                        <p className="text-center font-bold mb-2 uppercase text-sm underline">Exam Instructions</p>
                        <ul className="text-[10px] list-disc pl-4 space-y-1 text-slate-600">
                            <li>Bring this admit card to the examination hall.</li>
                            <li>Do not carry any electronic devices.</li>
                            <li>Report 15 minutes before exam time.</li>
                        </ul>
                    </div>

                    <div className="flex justify-between items-end mt-12 pt-4">
                        <div className="text-center">
                            <div className="w-24 h-0.5 bg-slate-800 mb-1"></div>
                            <p className="text-[10px] font-bold uppercase">Guardian Signature</p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-0.5 bg-slate-800 mb-1"></div>
                            <p className="text-[10px] font-bold uppercase">Authority Signature</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 w-full">
                    <Button onClick={() => window.print()} className="flex-1 flex items-center justify-center">
                        <Printer size={16} className="mr-2" /> Print
                    </Button>
                    <Button onClick={onClose} variant="secondary" className="flex-1">
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

const ProfileTab: React.FC<{ student: Student }> = ({ student }) => {
  const { updateStudent } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student.personal);
  const [photoUrl, setPhotoUrl] = useState(student.image || '');

  const handleSave = () => {
    updateStudent({ 
      ...student, 
      personal: formData,
      image: photoUrl || student.image
    });
    setIsEditing(false);
  };

  const InputField = ({ label, value, onChange, disabled = false, type = "text", readOnlyTag = false }: any) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex justify-between">
        {label}
        {readOnlyTag && <span className="text-[10px] bg-slate-100 text-slate-400 px-1 rounded">Read Only</span>}
      </label>
      <div className="relative">
        <input 
          type={type} 
          value={value || ''} 
          onChange={e => onChange && onChange(e.target.value)}
          disabled={disabled}
          className={`w-full p-3 rounded-xl border text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-indigo-100 ${disabled ? 'bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed' : 'bg-white border-slate-300 focus:border-indigo-500'}`}
        />
        {disabled && <Lock className="absolute right-3 top-3.5 text-slate-300" size={14} />}
      </div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
      {/* Identity & Personal Info */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-slate-800 flex items-center">
            <User className="mr-3 text-indigo-500" /> ব্যক্তিগত তথ্য
          </h3>
          <Button size="xs" variant={isEditing ? 'primary' : 'outline'} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? <><Save size={14} className="mr-2" /> সংরক্ষণ</> : <><Edit2 size={14} className="mr-2" /> এডিট</>}
          </Button>
        </div>
        
        {/* Photo Upload Simulation */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
           <div className="w-24 h-24 rounded-full bg-slate-50 overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-100">
             <img src={isEditing ? photoUrl || student.image || '' : student.image || ''} className="w-full h-full object-cover" alt="Student" />
           </div>
           {isEditing ? (
             <div className="flex-1">
               <label className="text-xs font-bold text-slate-500 block mb-1">Photo URL</label>
               <input 
                value={photoUrl} 
                onChange={(e) => setPhotoUrl(e.target.value)} 
                className="w-full p-3 border rounded-xl text-xs bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-indigo-100" 
                placeholder="Paste image URL..."
               />
             </div>
           ) : (
             <div>
                <p className="font-bold text-lg text-slate-800">{student.name}</p>
                <p className="text-sm text-slate-500">Student ID: <span className="font-mono text-indigo-600">{student.id}</span></p>
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 gap-y-1">
           <InputField label="পূর্ণ নাম (Official)" value={student.name} disabled={true} readOnlyTag />
           <InputField label="রোল নম্বর" value={student.academic.roll} disabled={true} readOnlyTag />
           
           <div className="grid grid-cols-2 gap-4">
             <InputField label="ধর্ম" value={student.personal.religion} disabled={true} readOnlyTag />
             <InputField label="লিঙ্গ" value={student.personal.gender} disabled={true} readOnlyTag />
           </div>

           <InputField label="জন্ম তারিখ" value={student.personal.dob} disabled={true} readOnlyTag />

           {/* Editable Fields */}
           <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-indigo-600 mb-4 uppercase tracking-wider">যোগাযোগ তথ্য</p>
              <InputField label="নিজস্ব মোবাইল" value={formData.mobile} disabled={!isEditing} onChange={(v: string) => setFormData({...formData, mobile: v})} />
              <InputField label="নিজস্ব ইমেইল" value={formData.email} disabled={!isEditing} onChange={(v: string) => setFormData({...formData, email: v})} />
              <InputField label="বর্তমান ঠিকানা" value={formData.address} disabled={!isEditing} onChange={(v: string) => setFormData({...formData, address: v})} />
           </div>
        </div>
      </div>

      {/* Family Info - Strictly Read Only */}
      <div className="space-y-6">
        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 h-fit relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-5">
            <Lock size={120} />
          </div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-xl font-bold text-slate-700 flex items-center">
              <Lock className="mr-2 text-slate-400" /> অভিভাবকের তথ্য
            </h3>
            <span className="text-[10px] text-orange-700 bg-orange-100 px-2 py-1 rounded font-bold border border-orange-200">RESTRICTED</span>
          </div>
          <div className="space-y-4 relative z-10">
              <div className="p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-2">পিতার তথ্য</p>
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-bold text-slate-800 text-lg">{student.guardian.fatherName}</span>
                 </div>
                 <div className="flex items-center text-slate-500 text-sm">
                   <Smartphone size={14} className="mr-2" /> {student.guardian.fatherMobile}
                 </div>
              </div>
              
              <div className="p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-2">মাতার তথ্য</p>
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-bold text-slate-800 text-lg">{student.guardian.motherName}</span>
                 </div>
                 <div className="flex items-center text-slate-500 text-sm">
                   <Smartphone size={14} className="mr-2" /> {student.guardian.motherMobile}
                 </div>
              </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">অ্যাকাডেমিক স্ট্যাটাস</h3>
            <div className="flex gap-4">
               <div className={`flex-1 p-4 rounded-xl border text-center ${student.academic.classStatus === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                  <p className="text-xs font-bold opacity-70 mb-1">ক্লাস স্ট্যাটাস</p>
                  <p className="font-black text-xl">{student.academic.classStatus}</p>
               </div>
               <div className={`flex-1 p-4 rounded-xl border text-center ${student.academic.accountStatus === 'Active' ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <p className="text-xs font-bold opacity-70 mb-1">অ্যাকাউন্ট</p>
                  <p className="font-black text-xl">{student.academic.accountStatus}</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const RoutineTab: React.FC = () => {
    const { classRoutine } = useDashboard();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    
    // Dynamic Highlighting Logic
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTimeVal = (currentHour * 100) + currentMin;

    return (
        <div className="animate-in fade-in space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                        <Calendar className="mr-3 text-indigo-600" /> ক্লাস রুটিন
                    </h3>
                    <p className="text-slate-500 mt-2">Today is <span className="font-bold text-indigo-600 border-b-2 border-indigo-200">{currentDay}</span></p>
                </div>
                <div className="mt-4 md:mt-0 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-bold text-sm">
                   Running Session: 2024-25
                </div>
            </div>

            <div className="space-y-6">
                {days.map(day => {
                    const classes = classRoutine.filter(c => c.day === day);
                    if(classes.length === 0) return null;

                    return (
                        <div key={day} className="bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className={`px-6 py-4 font-bold border-b border-slate-50 flex items-center justify-between ${day === currentDay ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'}`}>
                                <span>{day}</span>
                                {day === currentDay && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white">TODAY</span>}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                                        <tr>
                                            <th className="p-5 font-bold">Time</th>
                                            <th className="p-5 font-bold">Subject</th>
                                            <th className="p-5 font-bold">Teacher</th>
                                            <th className="p-5 font-bold">Room</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {classes.map(c => {
                                            // Check if class is NOW
                                            const isNow = day === currentDay && currentTimeVal >= c.startTime && currentTimeVal < c.endTime;
                                            
                                            return (
                                                <tr key={c.id} className={`${isNow ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'} transition-colors`}>
                                                    <td className="p-5 font-bold text-slate-700 whitespace-nowrap">
                                                        {c.time}
                                                        {isNow && <span className="ml-2 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full animate-pulse">LIVE</span>}
                                                    </td>
                                                    <td className="p-5 font-bold text-indigo-600">{c.subject}</td>
                                                    <td className="p-5 text-slate-500">{c.teacher}</td>
                                                    <td className="p-5 text-slate-500 font-mono text-xs">{c.room}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const AttendanceTab: React.FC<{ student: Student }> = ({ student }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Overall Stats
  const totalPresent = student.attendance.filter(a => a.status === 'Present').length;
  const totalClasses = student.attendance.length; 
  const overallPercentage = totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-6 mb-8">
        <div className="flex-1 bg-gradient-to-br from-white to-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
           <div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">উপস্থিতি হার</p>
              <h3 className="text-4xl font-black text-indigo-600 mt-2">{overallPercentage}<span className="text-lg text-slate-400">%</span></h3>
           </div>
           <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
             <TrendingUp size={28} />
           </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-white to-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
           <div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">মোট কর্মদিবস</p>
              <h3 className="text-4xl font-black text-slate-800 mt-2">{totalClasses}</h3>
           </div>
           <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
             <Calendar size={28} />
           </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50">
        <div className="flex items-center justify-between mb-8">
           <h3 className="font-bold text-slate-800 text-2xl capitalize flex items-center gap-2">
             <span className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><Calendar size={20} /></span>
             {monthName}
           </h3>
           <div className="flex gap-2">
              <button onClick={prevMonth} className="p-3 hover:bg-slate-50 rounded-full border border-slate-100 text-slate-500 hover:text-indigo-600 transition-colors"><ChevronLeft size={20}/></button>
              <button onClick={nextMonth} className="p-3 hover:bg-slate-50 rounded-full border border-slate-100 text-slate-500 hover:text-indigo-600 transition-colors"><ChevronRight size={20}/></button>
           </div>
        </div>

        <div className="grid grid-cols-7 gap-3 mb-4 overflow-x-auto min-w-[300px]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-bold text-slate-400 py-3 uppercase tracking-wider">{d}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const d = String(day).padStart(2, '0');
            const dateStr = `${year}-${month}-${d}`;
            
            const record = student.attendance.find(a => a.date === dateStr);
            
            let bgClass = 'bg-slate-50 text-slate-400 hover:bg-slate-100';
            let statusLabel = null;
            
            if (record) {
                if (record.status === 'Present') { 
                    bgClass = 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200 shadow-sm'; statusLabel = 'P'; 
                } else if (record.status === 'Absent') { 
                    bgClass = 'bg-rose-100 text-rose-700 ring-2 ring-rose-200 shadow-sm'; statusLabel = 'A'; 
                } else if (record.status === 'Leave') { 
                    bgClass = 'bg-amber-100 text-amber-700 ring-2 ring-amber-200 shadow-sm'; statusLabel = 'L'; 
                }
            }

            return (
              <div key={day} className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative group cursor-default ${bgClass}`}>
                <span className={`font-bold text-sm ${record ? 'scale-110' : 'scale-90 opacity-70'}`}>{day}</span>
                {statusLabel && <span className="text-[10px] font-black mt-0.5">{statusLabel}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FinanceTab: React.FC<{ student: Student }> = ({ student }) => {
  const { makePayment } = useDashboard();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const dueRecords = student.financials.filter(f => f.status === 'Due');
  const totalDue = dueRecords.reduce((sum, f) => sum + f.amount, 0);

  const handlePay = (feeId: number, method: 'bKash' | 'Nagad') => {
    setLoadingId(feeId);
    // Simulate Gateway Delay
    setTimeout(() => {
        makePayment(student.id, feeId, method);
        setLoadingId(null);
    }, 2000);
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
      {totalDue > 0 ? (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
           <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm">
               <AlertCircle size={32} />
             </div>
             <div>
               <h3 className="text-xl font-bold text-red-800">Payment Pending</h3>
               <p className="text-red-600 font-medium mt-1">
                 Due for: {dueRecords.map(f => f.month).join(', ')}
               </p>
             </div>
           </div>
           <div className="bg-white px-6 py-3 rounded-xl font-bold text-red-600 border border-red-100 shadow-sm text-lg">
             Total Due: ৳{totalDue}
           </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-[2rem] p-8 flex items-center gap-6 shadow-sm">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
             <CheckCircle size={32} />
           </div>
           <div>
             <h3 className="text-xl font-bold text-emerald-800">কোন বকেয়া নেই!</h3>
             <p className="text-emerald-600">ধন্যবাদ সময়মতো পেমেন্ট করার জন্য।</p>
           </div>
        </div>
      )}

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
           <span className="font-bold text-slate-800 text-lg">Transaction History</span>
           <span className="text-xs text-slate-400 font-bold uppercase bg-white px-3 py-1 rounded-full border border-slate-200">Real-time status</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-slate-50/30 border-b border-slate-100">
                <tr>
                <th className="px-8 py-4 font-bold">Month</th>
                <th className="px-8 py-4 font-bold">Amount</th>
                <th className="px-8 py-4 font-bold">Status</th>
                <th className="px-8 py-4 font-bold">Payment Info</th>
                <th className="px-8 py-4 font-bold text-right">Pay Now</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {student.financials.map((record) => (
                <tr key={record.id} className="bg-white hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-800">{record.month}</td>
                    <td className="px-8 py-5 text-slate-600">৳{record.amount}</td>
                    <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${record.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                        {record.status}
                    </span>
                    </td>
                    <td className="px-8 py-5 text-xs text-slate-500">
                    {record.status === 'Paid' ? (
                        <div>
                        <p className="font-bold text-slate-700">{record.method}</p>
                        <p>{record.paymentDate}</p>
                        <p className="text-[10px] font-mono mt-1 text-slate-400">{record.trxId}</p>
                        </div>
                    ) : '-'}
                    </td>
                    <td className="px-8 py-5 text-right">
                    {record.status === 'Due' && (
                        <div className="flex justify-end gap-2">
                            <Button 
                            size="xs" 
                            onClick={() => handlePay(record.id, 'bKash')} 
                            disabled={loadingId === record.id} 
                            className="bg-pink-600 hover:bg-pink-700 text-white border-none"
                            >
                            {loadingId === record.id ? <Loader2 className="animate-spin" size={12}/> : 'bKash'}
                            </Button>
                            <Button 
                            size="xs" 
                            onClick={() => handlePay(record.id, 'Nagad')} 
                            disabled={loadingId === record.id} 
                            className="bg-orange-600 hover:bg-orange-700 text-white border-none"
                            >
                            {loadingId === record.id ? <Loader2 className="animate-spin" size={12}/> : 'Nagad'}
                            </Button>
                        </div>
                    )}
                    {record.status === 'Paid' && <CheckCircle size={20} className="text-emerald-500 ml-auto" />}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

const ResultsTab: React.FC<{ student: Student }> = ({ student }) => {
    const { performance } = student;
    const { systemSettings } = useDashboard();
    const [downloading, setDownloading] = useState(false);
    const [showAdmitModal, setShowAdmitModal] = useState(false);

    // Admit Card Logic
    const hasDues = student.financials.some(f => f.status === 'Due');
    
    const handleDownloadAdmit = () => {
        if (hasDues) {
            alert('Access Denied: Please clear your dues for this month to download the admit card.');
            return;
        }
        setDownloading(true);
        setTimeout(() => {
            setDownloading(false);
            setShowAdmitModal(true);
        }, 800);
    };

    // Graph Logic
    const publishedResults = student.results
        .filter(r => r.isPublished)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-5);

    const chartHeight = 200;
    const chartWidth = 800;
    const paddingX = 60;
    const paddingY = 40;

    const graphData = publishedResults.map((res, index) => {
        const percentage = res.totalMarks > 0 ? (res.obtainedMarks / res.totalMarks) * 100 : 0;
        return {
            x: paddingX + (index * (chartWidth - 2 * paddingX)) / (Math.max(publishedResults.length - 1, 1)),
            y: chartHeight - paddingY - (percentage / 100) * (chartHeight - 2 * paddingY),
            val: percentage,
            label: res.examName,
            date: res.date
        };
    });

    const polylinePoints = graphData.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div className="animate-in fade-in space-y-8">
             {showAdmitModal && <AdmitCardModal student={student} onClose={() => setShowAdmitModal(false)} systemSettings={systemSettings} />}
             
             {/* Admit Card Section */}
             <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-[2rem] shadow-xl shadow-indigo-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                    <h3 className="font-bold text-xl flex items-center mb-1">
                        <FileText className="mr-3 text-indigo-300" /> Admit Card Available
                    </h3>
                    <p className="text-indigo-200 text-sm opacity-80">Download your admit card for upcoming exams. Ensure dues are cleared.</p>
                </div>
                <Button 
                    onClick={handleDownloadAdmit} 
                    className={`relative z-10 bg-white text-indigo-900 hover:bg-indigo-50 border-none ${hasDues ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {downloading ? (
                        <><Loader2 className="animate-spin mr-2" size={16} /> Generating...</>
                    ) : (
                        <><Download className="mr-2" size={16} /> {hasDues ? 'Clear Dues First' : 'Download Admit Card'}</>
                    )}
                </Button>
             </div>

            {/* Central Position Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-8 rounded-[2rem] shadow-lg shadow-indigo-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><TrendingUp size={80} /></div>
                    <div className="relative z-10">
                        <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-4">Last Exam Performance</p>
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-5xl font-black">{performance.lastExam.score}</h3>
                                <p className="text-sm text-indigo-200 mt-1">Score Obtained</p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-4xl font-bold text-amber-300">#{performance.lastExam.position > 0 ? performance.lastExam.position : '-'}</h3>
                                <p className="text-xs text-indigo-200 mt-1">Class Rank</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                     <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Monthly Aggregate</p>
                     <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-4xl font-black text-slate-800">{performance.monthly.score}</h3>
                            <p className="text-xs text-slate-400 mt-1">Avg Score</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-4xl font-bold text-indigo-600">#{performance.monthly.position > 0 ? performance.monthly.position : '-'}</h3>
                            <p className="text-xs text-slate-400 mt-1">Position</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                     <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Yearly Aggregate</p>
                     <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-4xl font-black text-slate-800">{performance.yearly.score}</h3>
                            <p className="text-xs text-slate-400 mt-1">Total Score</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-4xl font-bold text-emerald-600">#{performance.yearly.position > 0 ? performance.yearly.position : '-'}</h3>
                            <p className="text-xs text-slate-400 mt-1">Global Rank</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Graph */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-8 flex items-center">
                    <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3 text-indigo-600"><TrendingUp size={18} /></span>
                    Performance Trend (Last 5 Exams)
                </h3>
                {publishedResults.length < 2 ? (
                    <div className="h-48 flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        <TrendingUp className="text-slate-300 mb-2" size={32} />
                        <p className="text-slate-400 text-sm">Not enough data to display trend graph.</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto pb-4">
                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[600px] h-auto overflow-visible">
                            {/* Grid Lines */}
                            <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                            <text x={paddingX - 10} y={paddingY + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="bold">100%</text>
                            
                            <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                            <text x={paddingX - 10} y={chartHeight / 2 + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="bold">50%</text>

                            <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#cbd5e1" strokeWidth="1" />
                            <text x={paddingX - 10} y={chartHeight - paddingY + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="bold">0%</text>

                            {/* Trend Line with Gradient Stroke */}
                            <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                            <polyline points={polylinePoints} fill="none" stroke="url(#lineGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md" />

                            {/* Data Points */}
                            {graphData.map((p, i) => (
                                <g key={i} className="group">
                                    <circle cx={p.x} cy={p.y} r="6" fill="white" stroke="#6366f1" strokeWidth="3" className="cursor-pointer transition-all duration-300 group-hover:r-8 group-hover:stroke-pink-500" />
                                    
                                    {/* Tooltip / Value Label */}
                                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                        <rect x={p.x - 24} y={p.y - 45} width="48" height="24" rx="6" fill="#1e293b" />
                                        {/* Little triangle */}
                                        <path d={`M${p.x - 6},${p.y - 21} L${p.x},${p.y - 15} L${p.x + 6},${p.y - 21}`} fill="#1e293b" />
                                        <text x={p.x} y={p.y - 29} textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">{Math.round(p.val)}%</text>
                                    </g>
                                    
                                    {/* Exam Label */}
                                    <text x={p.x} y={chartHeight - 10} textAnchor="middle" fontSize="10" fill="#64748b" className="font-medium">
                                        {p.label.length > 15 ? p.label.substring(0, 12) + '...' : p.label}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                )}
            </div>

            {/* Legacy Result List */}
            <h3 className="font-bold text-slate-800 text-lg mt-8 mb-4">Exam History</h3>
            <div className="space-y-4">
                 {student.results.length === 0 ? (
                     <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                            <BookOpen size={24} />
                         </div>
                         <p className="text-slate-400 font-medium">No published exam history available yet.</p>
                     </div>
                 ) : (
                     student.results.map((res, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center hover:shadow-lg hover:shadow-slate-200/50 hover:border-indigo-100 transition-all cursor-default group">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{res.examName}</h4>
                                  {res.isPublished ? (
                                     <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold border border-emerald-100">Published</span>
                                  ) : (
                                     <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold border border-amber-100">Pending</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-400 font-medium">{res.date}</p>
                            </div>
                            <div className="text-right">
                                {res.isPublished ? (
                                    <>
                                        <p className="font-black text-indigo-600 text-2xl">{res.obtainedMarks}<span className="text-sm text-slate-400 font-medium">/{res.totalMarks}</span></p>
                                        <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${res.status === 'Passed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{res.status}</span>
                                    </>
                                ) : (
                                    <span className="text-sm font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg">Not Published Yet</span>
                                )}
                            </div>
                        </div>
                     ))
                 )}
            </div>
        </div>
    );
};

// --- Main Student Dashboard ---

export const StudentDashboard: React.FC = () => {
  const { currentUser, notices } = useDashboard();
  const [activeTab, setActiveTab] = useState<'profile' | 'routine' | 'attendance' | 'results' | 'finance'>('profile');
  
  if (!currentUser) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;
  const student = currentUser as Student;

  const NavItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap outline-none ${
        activeTab === id 
        ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
        : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
      }`}
    >
      <Icon size={18} className={`mr-2 transition-transform ${activeTab === id ? 'scale-110' : ''}`} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20">
      {/* Force Change Password Modal */}
      {student.isFirstLogin && <ChangePasswordModal />}

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-200">
                {student.name[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Welcome, <span className="text-indigo-600">{student.name.split(' ')[0]}</span>!</h1>
                <p className="text-slate-500 mt-1 font-medium text-sm flex items-center gap-2">
                    <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-xs">Class {student.academic.class}</span> 
                    ID: <span className="font-mono text-slate-700">{student.id}</span>
                </p>
              </div>
           </div>
           
           <div className="flex gap-4 w-full md:w-auto">
              <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 text-center flex-1 md:flex-none">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Class Rank</p>
                 <p className="text-2xl font-black text-indigo-600">#{student.performance.monthly.position > 0 ? student.performance.monthly.position : '-'}</p>
              </div>
              <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 text-center flex-1 md:flex-none">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Avg Score</p>
                 <p className="text-2xl font-black text-emerald-600">{student.performance.monthly.score}</p>
              </div>
           </div>
        </div>

        {/* Notice Board (Live) */}
        {notices.length > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-[1.5rem] p-6 mb-10 relative overflow-hidden shadow-sm">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-amber-500 shadow-sm border border-amber-100 shrink-0">
                   <Bell size={24} />
                </div>
                <div className="flex-1">
                   <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-3 flex items-center">
                     Notice Board <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                   </h3>
                   <div className="space-y-3">
                      {notices.map(notice => (
                         <div key={notice.id} className="bg-white p-4 rounded-xl border border-amber-100/50 shadow-sm hover:shadow-md transition-shadow">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-slate-800 text-sm">{notice.title}</h4>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${notice.priority === 'Urgent' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                   {notice.type}
                                </span>
                             </div>
                             <p className="text-xs text-slate-600 leading-relaxed">{notice.content}</p>
                             <p className="text-[10px] text-slate-400 mt-2 text-right font-medium">{notice.date}</p>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
             {/* Navigation */}
            <div className="border-b border-slate-100 flex overflow-x-auto no-scrollbar">
                <NavItem id="profile" label="প্রোফাইল" icon={User} />
                <NavItem id="routine" label="রুটিন" icon={LayoutList} />
                <NavItem id="attendance" label="উপস্থিতি" icon={Calendar} />
                <NavItem id="results" label="ফলাফল" icon={BookOpen} />
                <NavItem id="finance" label="পেমেন্ট" icon={DollarSign} />
            </div>

            {/* Content Area */}
            <div className="p-4 md:p-8 min-h-[600px] bg-slate-50/30">
                {activeTab === 'profile' && <ProfileTab student={student} />}
                {activeTab === 'routine' && <RoutineTab />}
                {activeTab === 'attendance' && <AttendanceTab student={student} />}
                {activeTab === 'finance' && <FinanceTab student={student} />}
                {activeTab === 'results' && <ResultsTab student={student} />}
            </div>
        </div>
      </div>
    </div>
  );
};