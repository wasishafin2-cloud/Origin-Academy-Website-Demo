
import React, { useState, useMemo } from 'react';
import { useDashboard } from './DashboardContext';
import { Student, Batch, GradeRule, Teacher } from '../../types';
import { 
  Users, Calendar, BarChart3, Settings, Search, Filter, 
  Edit, CheckCircle, XCircle, Plus, Trash2, DollarSign, 
  GraduationCap, Briefcase, FileText, CheckSquare, ShieldAlert,
  Bell, Activity, MessageSquare, Shield, UploadCloud, Download, AlertTriangle, Eye, Layers, UserPlus, CreditCard, Printer, Hash, Send, LogOut, LayoutDashboard
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const getLocalDateString = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper Component (Moved outside to prevent re-render focus loss)
const InputGroup = ({ label, value, onChange, type="text" }: any) => (
    <div className="mb-4">
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">{label}</label>
        <input 
          type={type}
          value={value} 
          onChange={e => onChange(e.target.value)} 
          className="w-full border border-white/10 bg-white/5 rounded-lg p-2.5 text-sm focus:border-indigo-500 outline-none transition-all text-white"
        />
    </div>
);

// --- Sub Components ---

const StudentManagement: React.FC = () => {
  const { students, batches, toggleStudentStatus, updateStudent, admitStudent, deleteStudent, role } = useDashboard();
  const [filterText, setFilterText] = useState('');
  const [filterBatch, setFilterBatch] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudentData, setNewStudentData] = useState({ name: '', phone: '', batchId: '' });

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(filterText.toLowerCase()) || s.id.toLowerCase().includes(filterText.toLowerCase());
    const matchesBatch = filterBatch === 'All' || s.academic.batchId === filterBatch;
    return matchesSearch && matchesBatch;
  });

  const handleUpdate = () => {
      if (editingStudent) {
          updateStudent(editingStudent);
          setEditingStudent(null);
      }
  };

  const handleManualAdd = () => {
      if(newStudentData.name && newStudentData.batchId) {
          admitStudent(newStudentData);
          setShowAddModal(false);
          setNewStudentData({ name: '', phone: '', batchId: '' });
          alert('Student added successfully!');
      }
  };

  const handleDelete = (id: string) => {
      if(window.confirm('Are you sure? This action CANNOT be undone.')) {
          deleteStudent(id);
      }
  };

  const isNewStudent = (dateStr: string) => {
      const join = new Date(dateStr);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - join.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays <= 30;
  };

  return (
    <div className="animate-in fade-in">
      {/* Advanced Filters */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full">
                <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wide">Search Students</label>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm focus:border-indigo-500 outline-none transition-all text-white placeholder-slate-500" 
                        placeholder="Search by Name, Roll or ID..." 
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full md:w-64">
                <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wide">Filter by Batch</label>
                <div className="relative">
                    <select value={filterBatch} onChange={e => setFilterBatch(e.target.value)} className="w-full border border-white/10 p-2.5 rounded-xl text-sm bg-slate-950 focus:bg-slate-900 text-slate-300 outline-none appearance-none">
                        <option value="All">All Batches</option>
                        {batches.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none text-slate-500 text-xs">▼</div>
                </div>
            </div>
            <div className="w-full md:w-auto">
                <Button onClick={() => setShowAddModal(true)} size="md" className="w-full md:w-auto shadow-indigo-500/20">
                    <Plus size={18} className="mr-2" /> Add Student
                </Button>
            </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl shadow-sm border border-white/10 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 border-b border-white/5">
                <tr>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase whitespace-nowrap tracking-wider">Student Profile</th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase whitespace-nowrap tracking-wider">Batch / Academic</th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase whitespace-nowrap tracking-wider">Guardian Info</th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase whitespace-nowrap tracking-wider">Status</th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase text-right whitespace-nowrap tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                                <img src={student.image || ''} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-200 flex items-center">
                                    {student.name}
                                    {isNewStudent(student.academic.joinDate) && <span className="ml-2 px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded font-bold">NEW</span>}
                                </p>
                                <p className="text-xs text-slate-500 font-mono">{student.id}</p>
                            </div>
                        </div>
                        </td>
                        <td className="p-5 text-sm text-slate-400">
                        <p className="font-bold text-indigo-400 text-xs bg-indigo-500/10 px-2 py-1 rounded inline-block mb-1 border border-indigo-500/20">{student.academic.batch}</p>
                        <p className="text-xs"><span className="font-bold text-slate-500">Roll:</span> {student.academic.roll}</p>
                        </td>
                        <td className="p-5 text-sm text-slate-400">
                        <p className="font-bold text-slate-300">{student.guardian.fatherName}</p>
                        <p className="text-xs text-slate-500">{student.guardian.fatherMobile}</p>
                        </td>
                        <td className="p-5">
                            <div className="flex flex-col gap-1 items-start">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleStudentStatus(student.id);
                                    }}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${student.academic.accountStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20'}`}
                                >
                                    {student.academic.accountStatus}
                                </button>
                            </div>
                        </td>
                        <td className="p-5 text-right">
                            <div className="flex gap-2 justify-end">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingStudent(student);
                                    }} 
                                    className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors"
                                >
                                    <Edit size={16} />
                                </button>
                                {role === 'admin' && (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(student.id);
                                        }} 
                                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
         </div>
      </div>
      
      {/* Edit Modal */}
      <Modal isOpen={!!editingStudent} onClose={() => setEditingStudent(null)} title="Edit Student Profile">
        {editingStudent && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
             <div className="space-y-4">
                 <h4 className="font-bold text-slate-300 border-b border-white/10 pb-2 text-sm uppercase tracking-wide">Academic & Batch</h4>
                 <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Assigned Batch</label>
                        <select 
                            value={editingStudent.academic.batchId}
                            onChange={(e) => setEditingStudent({...editingStudent, academic: {...editingStudent.academic, batchId: e.target.value}})}
                            className="w-full border border-white/10 rounded-lg p-2.5 text-sm bg-slate-900 font-bold text-indigo-400 appearance-none outline-none focus:ring-2 focus:ring-indigo-500/50"
                        >
                            {batches.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Roll No" value={editingStudent.academic.roll} onChange={(v: string) => setEditingStudent({...editingStudent, academic: {...editingStudent.academic, roll: v}})} />
                        <InputGroup label="Full Name" value={editingStudent.name} onChange={(v: string) => setEditingStudent({...editingStudent, name: v})} />
                    </div>
                 </div>
             </div>
             
             <div className="space-y-4">
                 <h4 className="font-bold text-slate-300 border-b border-white/10 pb-2 text-sm uppercase tracking-wide">Guardian Info</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Father's Name" value={editingStudent.guardian.fatherName} onChange={(v: string) => setEditingStudent({...editingStudent, guardian: {...editingStudent.guardian, fatherName: v}})} />
                    <InputGroup label="Father's Mobile" value={editingStudent.guardian.fatherMobile} onChange={(v: string) => setEditingStudent({...editingStudent, guardian: {...editingStudent.guardian, fatherMobile: v}})} />
                 </div>
             </div>

             <Button onClick={handleUpdate} className="w-full shadow-lg">Save Changes</Button>
          </div>
        )}
      </Modal>

      {/* Manual Add Student Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Manual Admission">
          <div className="space-y-4">
              <InputGroup label="Student Name" value={newStudentData.name} onChange={(v: string) => setNewStudentData({...newStudentData, name: v})} />
              <InputGroup label="Mobile Number" value={newStudentData.phone} onChange={(v: string) => setNewStudentData({...newStudentData, phone: v})} />
              <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Assign Batch</label>
                  <select 
                      value={newStudentData.batchId}
                      onChange={(e) => setNewStudentData({...newStudentData, batchId: e.target.value})}
                      className="w-full border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-500 bg-slate-900 text-white"
                  >
                      <option value="">Select Batch</option>
                      {batches.filter(b => b.status === 'Active').map(b => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                  </select>
              </div>
              <Button onClick={handleManualAdd} className="w-full mt-4">Complete Admission</Button>
          </div>
      </Modal>
    </div>
  );
};

const AccountsView: React.FC = () => {
    const { students, role, makePayment } = useDashboard();
    if (role === 'teacher') return <div className="flex flex-col items-center justify-center p-12 bg-slate-900 rounded-2xl border border-red-500/20 shadow-sm"><ShieldAlert size={48} className="text-red-500 mb-4" /><h3 className="text-lg font-bold text-red-400">Access Restricted</h3><p className="text-slate-500 text-center">Financial data is only accessible to Admin users.</p></div>;

    // Derived Financial Data
    const paidTransactions = students.flatMap(s => s.financials.filter(f => f.status === 'Paid').map(f => ({...f, studentName: s.name, studentId: s.id})));
    const pendingDues = students.flatMap(s => s.financials.filter(f => f.status === 'Due').map(f => ({...f, studentName: s.name, studentId: s.id})));
    
    const totalCollected = paidTransactions.reduce((acc, curr) => acc + curr.amount, 0);
    const totalDue = pendingDues.reduce((acc, curr) => acc + curr.amount, 0);
    
    return (
        <div className="space-y-8 animate-in fade-in">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-slate-500 text-sm font-bold uppercase mb-2">Total Cash Collected</p>
                        <h3 className="text-4xl font-black text-emerald-400">৳{totalCollected}</h3>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><DollarSign size={64} className="text-emerald-500" /></div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                         <p className="text-slate-500 text-sm font-bold uppercase mb-2">Total Due Amount</p>
                         <h3 className="text-4xl font-black text-rose-400">৳{totalDue}</h3>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><AlertTriangle size={64} className="text-rose-500" /></div>
                </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Pending Collection */}
                <div className="bg-slate-900 rounded-2xl shadow-sm border border-white/10 overflow-hidden flex flex-col h-[500px]">
                    <div className="p-4 bg-white/5 border-b border-white/5 font-bold text-rose-300 flex justify-between items-center">
                        <span>Pending Dues Collection</span>
                        <span className="text-xs bg-rose-500/20 px-2 py-1 rounded text-rose-400">{pendingDues.length} Pending</span>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/5 sticky top-0 backdrop-blur-md">
                                <tr>
                                    <th className="p-3 text-xs font-bold text-slate-400 uppercase">Student</th>
                                    <th className="p-3 text-xs font-bold text-slate-400 uppercase">Amount</th>
                                    <th className="p-3 text-xs font-bold text-slate-400 uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {pendingDues.map((due, idx) => (
                                    <tr key={`${due.studentId}-${due.id}`} className="hover:bg-white/5">
                                        <td className="p-3">
                                            <p className="font-bold text-slate-200 text-sm">{due.studentName}</p>
                                            <p className="text-[10px] text-slate-500">{due.month}</p>
                                        </td>
                                        <td className="p-3 font-bold text-rose-400 text-sm">৳{due.amount}</td>
                                        <td className="p-3 text-right">
                                            <Button 
                                                size="xs" 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    makePayment(due.studentId, due.id, 'Cash');
                                                }}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-sm text-[10px]"
                                            >
                                                Collect
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {pendingDues.length === 0 && (
                                    <tr><td colSpan={3} className="p-8 text-center text-slate-500 text-sm">No pending dues found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-slate-900 rounded-2xl shadow-sm border border-white/10 overflow-hidden flex flex-col h-[500px]">
                    <div className="p-4 bg-white/5 border-b border-white/5 font-bold text-emerald-300">Recent Transactions Log</div>
                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/5 sticky top-0 backdrop-blur-md">
                                <tr>
                                    <th className="p-3 text-xs font-bold text-slate-400 uppercase">Trx Info</th>
                                    <th className="p-3 text-xs font-bold text-slate-400 uppercase">Amount</th>
                                    <th className="p-3 text-xs font-bold text-slate-400 uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {paidTransactions.sort((a,b) => new Date(b.paymentDate!).getTime() - new Date(a.paymentDate!).getTime()).map((trx, idx) => (
                                    <tr key={`${trx.studentId}-${trx.id}`} className="hover:bg-white/5">
                                        <td className="p-3">
                                            <p className="font-bold text-slate-200 text-sm">{trx.studentName}</p>
                                            <p className="text-[10px] text-slate-500 font-mono">{trx.trxId}</p>
                                        </td>
                                        <td className="p-3 font-bold text-emerald-400 text-sm">৳{trx.amount}</td>
                                        <td className="p-3 text-xs text-slate-400">{trx.paymentDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ... Rest of the file (BatchManager, etc.) remains largely the same but included implicitly since full file content is not required unless changed significantly. 
// I am providing the FULL updated AdminDashboard.tsx to ensure all components are present and correct.

const BatchManager: React.FC = () => {
    const { batches, addBatch, updateBatch, deleteBatch, students } = useDashboard();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
    const [formData, setFormData] = useState({ name: '', class: '', session: '', maxCapacity: 50 });

    const getStudentCount = (batchId: string) => students.filter(s => s.academic.batchId === batchId).length;
    const handleSave = () => {
        if (editingBatch) {
            updateBatch({ ...editingBatch, ...formData } as Batch);
            setEditingBatch(null);
        } else {
            addBatch({ ...formData, status: 'Active' });
            setIsCreateOpen(false);
        }
        setFormData({ name: '', class: '', session: '', maxCapacity: 50 });
    };
    const openEdit = (b: Batch) => { setEditingBatch(b); setFormData({ name: b.name, class: b.class, session: b.session, maxCapacity: b.maxCapacity }); };
    
    const inputClass = "w-full border border-white/10 bg-white/5 rounded p-2 text-sm text-white focus:border-indigo-500 outline-none";

    return (
        <div className="animate-in fade-in space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Batch Configuration</h3>
                <Button onClick={() => setIsCreateOpen(true)} size="sm"><Plus size={16} className="mr-2"/> Create Batch</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {batches.map(batch => {
                    const count = getStudentCount(batch.id);
                    const isFull = count >= batch.maxCapacity;
                    return (
                        <div key={batch.id} className="bg-slate-900 p-5 rounded-xl border border-white/10 shadow-sm relative group">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-white text-lg">{batch.name}</h4>
                                    <p className="text-xs text-slate-400">{batch.session} • {batch.class}</p>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded font-bold ${batch.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {batch.status}
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                    <span>Occupancy</span>
                                    <span className={isFull ? 'text-red-400' : 'text-indigo-400'}>{count} / {batch.maxCapacity}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${isFull ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${Math.min((count/batch.maxCapacity)*100, 100)}%` }}></div>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button onClick={() => openEdit(batch)} className="text-xs font-bold text-indigo-400 hover:bg-white/5 px-3 py-1.5 rounded transition">Edit</button>
                                <button onClick={() => updateBatch({...batch, status: batch.status === 'Active' ? 'Closed' : 'Active'})} className="text-xs font-bold text-slate-400 hover:bg-white/5 px-3 py-1.5 rounded transition">
                                    {batch.status === 'Active' ? 'Close' : 'Open'}
                                </button>
                                <button onClick={() => deleteBatch(batch.id)} className="text-xs font-bold text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Modal isOpen={isCreateOpen || !!editingBatch} onClose={() => { setIsCreateOpen(false); setEditingBatch(null); }} title={editingBatch ? "Edit Batch" : "Create New Batch"}>
                <div className="space-y-4">
                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Batch Name</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClass} placeholder="e.g. HSC 2025 - Padma" /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Class/Group</label><input value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className={inputClass} placeholder="Class 10" /></div>
                        <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Session</label><input value={formData.session} onChange={e => setFormData({...formData, session: e.target.value})} className={inputClass} placeholder="2024-25" /></div>
                    </div>
                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Max Capacity</label><input type="number" value={formData.maxCapacity} onChange={e => setFormData({...formData, maxCapacity: parseInt(e.target.value)})} className={inputClass} /></div>
                    <Button onClick={handleSave} className="w-full mt-2">{editingBatch ? 'Update Batch' : 'Create Batch'}</Button>
                </div>
            </Modal>
        </div>
    );
};

const RecentAdmissionsWidget: React.FC = () => {
    const { students } = useDashboard();
    const recentStudents = students.filter(s => {
        const join = new Date(s.academic.joinDate);
        const now = new Date();
        const diff = Math.abs(now.getTime() - join.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days <= 7;
    }).sort((a, b) => new Date(b.academic.joinDate).getTime() - new Date(a.academic.joinDate).getTime()).slice(0, 5);

    return (
        <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-sm">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center">
                <UserPlus size={18} className="mr-2 text-indigo-500" /> Recent Admissions
            </h3>
            {recentStudents.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">No new admissions this week.</p>
            ) : (
                <div className="space-y-3">
                    {recentStudents.map(s => (
                        <div key={s.id} className="flex items-center justify-between pb-2 border-b border-white/5 last:border-0 hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">
                                    {s.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-300">{s.name}</p>
                                    <p className="text-[10px] text-slate-500">{s.academic.batch}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{s.academic.joinDate}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TeacherManagement: React.FC = () => {
    const { teachers, toggleTeacherStatus, addTeacher } = useDashboard();
    const [showAdd, setShowAdd] = useState(false);
    const [newData, setNewData] = useState({ name: '', subject: '' });

    const handleAdd = () => {
        if(newData.name && newData.subject) {
            addTeacher({ name: newData.name, subject: newData.subject, status: 'Active' });
            setShowAdd(false);
            setNewData({ name: '', subject: '' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900 p-6 rounded-2xl border border-white/10">
                <div>
                    <h3 className="font-bold text-white text-lg">Faculty Management</h3>
                    <p className="text-slate-400 text-sm">Total Faculty Members: <span className="text-indigo-400 font-bold">{teachers.length}</span></p>
                </div>
                <Button onClick={() => setShowAdd(true)} size="sm"><Plus size={16} className="mr-2"/> Add Teacher</Button>
            </div>
            <div className="bg-slate-900 rounded-xl shadow-sm border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="p-5 text-xs font-bold text-slate-400 uppercase">Teacher Name</th>
                                <th className="p-5 text-xs font-bold text-slate-400 uppercase">Subject</th>
                                <th className="p-5 text-xs font-bold text-slate-400 uppercase">Status</th>
                                <th className="p-5 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {teachers.map(t => (
                                <tr key={t.id} className="hover:bg-white/5">
                                    <td className="p-5 font-bold text-slate-200">{t.name}</td>
                                    <td className="p-5 text-sm text-slate-400">{t.subject}</td>
                                    <td className="p-5"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs border border-emerald-500/20">{t.status}</span></td>
                                    <td className="p-5 text-right"><Button size="xs" variant="outline" className="border-white/10 text-slate-300 hover:text-white" onClick={() => toggleTeacherStatus(t.id)}>Toggle</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Teacher">
                <div className="space-y-4">
                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Name</label><input value={newData.name} onChange={e => setNewData({...newData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-indigo-500" /></div>
                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Subject</label><input value={newData.subject} onChange={e => setNewData({...newData, subject: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-indigo-500" /></div>
                    <Button onClick={handleAdd} className="w-full mt-2">Add to Faculty</Button>
                </div>
            </Modal>
        </div>
    );
};

const AttendanceManager: React.FC = () => {
    const { students, markAttendance } = useDashboard();
    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);
    const [targetClass, setTargetClass] = useState('');
    const [targetSection, setTargetSection] = useState('');
    const [selectedDate, setSelectedDate] = useState(getLocalDateString());
    const [attendanceData, setAttendanceData] = useState<Record<string, 'Present' | 'Absent'>>({});
    const [isEditMode, setIsEditMode] = useState(false);

    const uniqueClasses = Array.from(new Set(students.map(s => s.academic.class)));
    const uniqueSections = Array.from(new Set(students.map(s => s.academic.section)));
    
    const targetStudents = useMemo(() => students.filter(s => s.academic.class === targetClass && s.academic.section === targetSection && s.academic.classStatus === 'Active'), [students, targetClass, targetSection]);

    const handleFetch = () => {
        if (!targetClass || !targetSection) return;
        setLoading(true);
        setTimeout(() => {
            const existingRecords: Record<string, 'Present' | 'Absent'> = {};
            let foundExisting = false;
            targetStudents.forEach(s => {
                const record = s.attendance.find(a => a.date === selectedDate);
                if (record) { existingRecords[s.id] = record.status as 'Present' | 'Absent'; foundExisting = true; } 
                else { existingRecords[s.id] = 'Present'; }
            });
            setAttendanceData(existingRecords); setIsEditMode(foundExisting); setStep(2); setLoading(false);
        }, 600);
    };

    const markAllPresent = () => { const reset: Record<string, 'Present'> = {}; targetStudents.forEach(s => reset[s.id] = 'Present'); setAttendanceData(prev => ({...prev, ...reset})); };

    const handleSubmit = () => {
        if (window.confirm(`Submit attendance for ${Object.keys(attendanceData).length} students?`)) {
            const records = Object.entries(attendanceData).map(([id, status]) => ({ studentId: id, status }));
            markAttendance(selectedDate, records);
            alert('Attendance Saved Successfully!');
            setStep(1); setTargetClass(''); setTargetSection('');
        }
    };

    const inputClass = "w-full p-4 bg-slate-800 border border-white/10 rounded-2xl focus:border-indigo-500 outline-none transition-colors text-white";

    if (step === 1) {
        return (
            <div className="max-w-xl mx-auto animate-in fade-in">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/10 shadow-xl text-center">
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-500 shadow-sm border border-indigo-500/20">
                        <Calendar size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Take Attendance</h2>
                    <p className="text-slate-400 mb-8">Select Class & Section to start marking.</p>
                    <div className="space-y-6 text-left">
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label><input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className={inputClass} /></div>
                        <div className="grid grid-cols-2 gap-6">
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Class</label><select value={targetClass} onChange={e => setTargetClass(e.target.value)} className={inputClass}><option value="">Select</option>{uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section</label><select value={targetSection} onChange={e => setTargetSection(e.target.value)} className={inputClass}><option value="">Select</option>{uniqueSections.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                        </div>
                        <Button onClick={handleFetch} disabled={!targetClass || !targetSection} className="w-full py-4 text-lg mt-6 shadow-xl shadow-indigo-500/20">{loading ? 'Fetching...' : 'Load Student List'}</Button>
                    </div>
                </div>
            </div>
        );
    }

    const presentCount = Object.values(attendanceData).filter(s => s === 'Present').length;
    const absentCount = Object.values(attendanceData).filter(s => s === 'Absent').length;

    return (
        <div className="animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl pb-4 pt-2">
                <div className="bg-slate-900 rounded-2xl border border-white/10 shadow-lg p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-white text-lg">Class {targetClass} - Section {targetSection}</h3>
                            {isEditMode && <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/20">EDIT MODE</span>}
                        </div>
                        <p className="text-xs text-slate-500 font-mono mt-1">{selectedDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 text-sm font-bold">
                            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-xl shadow-sm">Present: {presentCount}</span>
                            <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-xl shadow-sm">Absent: {absentCount}</span>
                        </div>
                        <Button onClick={markAllPresent} variant="outline" size="sm" className="border-white/10 text-slate-300 hover:text-white">Reset All</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mt-6 mb-24">
                {targetStudents.map(student => {
                    const status = attendanceData[student.id];
                    return (
                        <div key={student.id} className="bg-slate-900 p-4 rounded-xl border border-white/10 shadow-sm flex items-center justify-between hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-sm transition-colors duration-300 ${status === 'Present' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-rose-500/20 bg-rose-500/10 text-rose-400'}`}>
                                    {status === 'Present' ? 'P' : 'A'}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-200 text-base">{student.name}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Roll: {student.academic.roll} <span className="text-slate-600 mx-1">|</span> ID: {student.id}</p>
                                </div>
                            </div>
                            <div className="flex bg-slate-800 p-1.5 rounded-xl border border-white/5">
                                <button onClick={() => setAttendanceData({...attendanceData, [student.id]: 'Present'})} className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${status === 'Present' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Present</button>
                                <button onClick={() => setAttendanceData({...attendanceData, [student.id]: 'Absent'})} className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${status === 'Absent' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Absent</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="fixed bottom-6 left-0 right-0 p-4 md:left-64 flex justify-center z-40 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-12">
                <div className="flex gap-4 max-w-md w-full bg-slate-900 p-2.5 rounded-2xl shadow-2xl border border-white/10">
                    <Button onClick={() => setStep(1)} variant="ghost" className="flex-1 rounded-xl text-slate-300 hover:text-white">Cancel</Button>
                    <Button onClick={handleSubmit} className="flex-[2] rounded-xl shadow-lg"><Send size={18} className="mr-2" /> Submit</Button>
                </div>
            </div>
        </div>
    );
};

// ... (ResultManagement, NoticesManager, AuditLogViewer, SettingsTab, IDCardGenerator) ...
// The rest of the file remains unchanged, but to ensure completeness as requested by the format:

const ResultManagement: React.FC = () => {
    const { availableExams, students, updateExamMarks, publishResult } = useDashboard();
    const [selectedExamId, setSelectedExamId] = useState('');
    const [loading, setLoading] = useState(false);

    const selectedExam = availableExams.find(e => e.id === selectedExamId);
    
    // Filter students eligible for this exam (by class)
    const eligibleStudents = useMemo(() => {
        if (!selectedExam) return [];
        return students.filter(s => s.academic.class === selectedExam.class && s.academic.classStatus === 'Active');
    }, [students, selectedExam]);

    const handleMarkUpdate = (studentId: string, marks: string) => {
        if (!selectedExam) return;
        const numericMarks = parseFloat(marks) || 0;
        updateExamMarks(selectedExam.id, studentId, numericMarks, selectedExam.totalMarks, selectedExam.title, getLocalDateString());
    };

    const getStudentMark = (studentId: string) => {
        const result = students.find(s => s.id === studentId)?.results.find(r => r.examId === selectedExamId);
        return result ? result.obtainedMarks : '';
    };

    const isPublished = (studentId: string) => {
         const result = students.find(s => s.id === studentId)?.results.find(r => r.examId === selectedExamId);
         return result?.isPublished || false;
    };

    const handlePublish = () => {
        if (selectedExamId && window.confirm('Are you sure you want to publish results for this exam?')) {
            publishResult(selectedExamId);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in">
             <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="font-bold text-white text-lg">Result Processing</h3>
                    <p className="text-slate-400 text-sm">Enter marks and publish results.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <select 
                        value={selectedExamId} 
                        onChange={e => setSelectedExamId(e.target.value)} 
                        className="bg-slate-800 border border-white/10 text-white text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                    >
                        <option value="">Select Exam</option>
                        {availableExams.map(ex => <option key={ex.id} value={ex.id}>{ex.title} ({ex.class})</option>)}
                    </select>
                    {selectedExam && (
                        <Button onClick={handlePublish} className="whitespace-nowrap shadow-lg shadow-indigo-500/20">
                            <Send size={16} className="mr-2" /> Publish All
                        </Button>
                    )}
                </div>
             </div>

             {selectedExam ? (
                 <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden shadow-sm">
                    <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                        <span className="font-bold text-slate-200">{selectedExam.title} - Max Marks: {selectedExam.totalMarks}</span>
                        <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20">{eligibleStudents.length} Students</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/5">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Student</th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Obtained Marks</th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {eligibleStudents.map(student => (
                                    <tr key={student.id} className="hover:bg-white/5">
                                        <td className="p-4">
                                            <p className="font-bold text-slate-200 text-sm">{student.name}</p>
                                            <p className="text-[10px] text-slate-500">ID: {student.id}</p>
                                        </td>
                                        <td className="p-4">
                                            <input 
                                                type="number" 
                                                defaultValue={getStudentMark(student.id)}
                                                onBlur={(e) => handleMarkUpdate(student.id, e.target.value)}
                                                className="bg-slate-800 border border-white/10 text-white text-sm rounded p-2 w-24 focus:border-indigo-500 outline-none transition-colors"
                                                placeholder="0"
                                                max={selectedExam.totalMarks}
                                            />
                                        </td>
                                        <td className="p-4">
                                            {isPublished(student.id) ? (
                                                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">Published</span>
                                            ) : (
                                                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded border border-amber-500/20">Draft</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {eligibleStudents.length === 0 && (
                                    <tr><td colSpan={3} className="p-8 text-center text-slate-500">No students found for this exam class.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                 </div>
             ) : (
                 <div className="flex flex-col items-center justify-center p-12 bg-slate-900 rounded-2xl border border-white/10 border-dashed">
                     <FileText size={48} className="text-slate-600 mb-4" />
                     <p className="text-slate-500 font-medium">Select an exam to manage results.</p>
                 </div>
             )}
        </div>
    );
};

const NoticesManager: React.FC = () => {
    const { notices, postNotice } = useDashboard();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', type: 'Academic', priority: 'Normal' });

    const handleSubmit = () => {
        if(formData.title && formData.content) {
            postNotice(formData as any);
            setIsCreateOpen(false);
            setFormData({ title: '', content: '', type: 'Academic', priority: 'Normal' });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white text-lg">Notice Board</h3>
                <Button onClick={() => setIsCreateOpen(true)} size="sm"><Plus size={16} className="mr-2"/> New Notice</Button>
            </div>

            <div className="grid gap-4">
                {notices.map(notice => (
                    <div key={notice.id} className="bg-slate-900 p-5 rounded-xl border border-white/10 shadow-sm hover:border-indigo-500/30 transition-all">
                        <div className="flex justify-between items-start mb-2">
                             <div>
                                 <h4 className="font-bold text-white text-lg">{notice.title}</h4>
                                 <p className="text-xs text-slate-500 font-mono mt-1">{notice.date}</p>
                             </div>
                             <div className="flex gap-2">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${notice.type === 'Academic' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>{notice.type}</span>
                                {notice.priority === 'Urgent' && <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">Urgent</span>}
                             </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{notice.content}</p>
                    </div>
                ))}
            </div>

            <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Post New Notice">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Title</label>
                        <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white outline-none focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Type</label>
                            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white outline-none">
                                <option value="Academic">Academic</option>
                                <option value="Administrative">Administrative</option>
                                <option value="Event">Event</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Priority</label>
                            <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white outline-none">
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Content</label>
                        <textarea rows={4} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white outline-none focus:border-indigo-500" />
                    </div>
                    <Button onClick={handleSubmit} className="w-full mt-2">Post Notice</Button>
                </div>
            </Modal>
        </div>
    );
};

const AuditLogViewer: React.FC = () => {
    const { recentActivity } = useDashboard();
    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white text-lg">System Audit Log</h3>
                <p className="text-slate-400 text-sm">Track system activities and changes.</p>
            </div>
            <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Timestamp</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Type</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentActivity.length === 0 ? (
                                <tr><td colSpan={3} className="p-8 text-center text-slate-500">No activity logs found.</td></tr>
                            ) : (
                                recentActivity.map(log => (
                                    <tr key={log.id} className="hover:bg-white/5">
                                        <td className="p-4 text-xs text-slate-500 font-mono">{new Date(log.timestamp).toLocaleString()}</td>
                                        <td className="p-4"><span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-slate-300 border border-white/10">{log.type}</span></td>
                                        <td className="p-4 text-sm text-slate-300">{log.description}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const SettingsTab: React.FC = () => {
    const { systemSettings, updateSystemSettings } = useDashboard();
    const [settings, setSettings] = useState(systemSettings);

    const handleSave = () => {
        updateSystemSettings(settings);
        alert('System settings updated!');
    };

    const Input = ({ label, value, onChange }: any) => (
        <div className="mb-4">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">{label}</label>
            <input value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-indigo-500" />
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in">
            <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 shadow-lg">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                        <Settings size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">System Settings</h2>
                        <p className="text-slate-400">Configure global application parameters.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Input label="School Name" value={settings.schoolName} onChange={(v: string) => setSettings({...settings, schoolName: v})} />
                    <Input label="Address" value={settings.address} onChange={(v: string) => setSettings({...settings, address: v})} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Contact Number" value={settings.contact} onChange={(v: string) => setSettings({...settings, contact: v})} />
                        <Input label="Active Session" value={settings.activeSession} onChange={(v: string) => setSettings({...settings, activeSession: v})} />
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <Button onClick={handleSave} className="w-full shadow-lg">Save Configuration</Button>
                </div>
            </div>
        </div>
    );
};

const IDCardGenerator: React.FC = () => {
    const { students, batches, systemSettings } = useDashboard();
    const [selectedBatchId, setSelectedBatchId] = useState('All');

    const filteredStudents = selectedBatchId === 'All' ? students : students.filter(s => s.academic.batchId === selectedBatchId);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6 animate-in fade-in">
             <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-white/10 print:hidden">
                <div>
                    <h3 className="font-bold text-white text-lg">ID Card Generator</h3>
                    <p className="text-slate-400 text-sm">Generate printable ID cards.</p>
                </div>
                <div className="flex gap-4">
                    <select value={selectedBatchId} onChange={e => setSelectedBatchId(e.target.value)} className="bg-slate-800 border border-white/10 text-white text-sm rounded-lg p-2.5 outline-none">
                        <option value="All">All Batches</option>
                        {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                    <Button onClick={handlePrint} size="sm"><Printer size={16} className="mr-2"/> Print IDs</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4 print:bg-white print:p-4">
                {filteredStudents.map(student => (
                    <div key={student.id} className="relative bg-white text-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-sm print:break-inside-avoid print:border-slate-800 print:shadow-none h-[220px] w-full max-w-[350px] mx-auto flex flex-col">
                        {/* Header */}
                        <div className="bg-indigo-900 text-white p-3 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white text-indigo-900 rounded-full flex items-center justify-center font-bold text-xs">OA</div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase leading-tight">{systemSettings.schoolName}</h4>
                                    <p className="text-[8px] opacity-80">Student ID Card</p>
                                </div>
                             </div>
                             <div className="text-right">
                                 <p className="text-[10px] font-mono opacity-80">{systemSettings.activeSession}</p>
                             </div>
                        </div>
                        
                        {/* Body */}
                        <div className="flex-1 p-3 flex gap-3 items-center">
                            <div className="w-20 h-24 bg-slate-100 border border-slate-300 flex-shrink-0">
                                <img src={student.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} className="w-full h-full object-cover" alt="Student" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-sm text-indigo-900 leading-tight">{student.name}</h3>
                                <p className="text-[10px] text-slate-600"><span className="font-bold">ID:</span> {student.id}</p>
                                <p className="text-[10px] text-slate-600"><span className="font-bold">Class:</span> {student.academic.class}</p>
                                <p className="text-[10px] text-slate-600"><span className="font-bold">Roll:</span> {student.academic.roll}</p>
                                <p className="text-[10px] text-slate-600"><span className="font-bold">Mobile:</span> {student.personal.mobile}</p>
                            </div>
                        </div>

                         {/* Footer */}
                         <div className="bg-indigo-50 p-2 border-t border-indigo-100 flex justify-between items-end">
                            <div className="text-[8px] text-slate-500">
                                <p>Issue Date: {getLocalDateString()}</p>
                            </div>
                             <div className="text-center">
                                 <div className="w-16 h-px bg-slate-400 mb-1"></div>
                                 <p className="text-[8px] font-bold uppercase text-slate-400">Principal</p>
                             </div>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Admin Dashboard ---

export const AdminDashboard: React.FC = () => {
  const { role, logout, recentActivity, students, batches, teachers } = useDashboard();
  const [activeTab, setActiveTab] = useState<'students' | 'batches' | 'teachers' | 'attendance' | 'results' | 'accounts' | 'notices' | 'audit' | 'settings' | 'ids'>('students');

  if (role !== 'admin' && role !== 'teacher') {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
              <ShieldAlert size={64} className="text-red-500 mb-4" />
              <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
              <p className="text-slate-400 mb-8">You do not have permission to view this page.</p>
              <Button onClick={logout} variant="outline" className="border-white/10 text-white hover:bg-white/10">Return to Home</Button>
          </div>
      );
  }

  // --- DERIVED STATE CALCULATIONS (The Golden Rule) ---
  // Fix: activeStudentsCount now derived from accountStatus to match toggle button behavior
  const activeStudentsCount = students.filter(s => s.academic.accountStatus === 'Active').length;
  const totalStudentsCount = students.length;
  const totalFacultyCount = teachers.length;
  const totalBatchesCount = batches.length;
  
  // Finance Derived State (Calculated on the fly)
  const totalCollected = students.flatMap(s => s.financials.filter(f => f.status === 'Paid')).reduce((acc, curr) => acc + curr.amount, 0);
  const totalDue = students.flatMap(s => s.financials.filter(f => f.status === 'Due')).reduce((acc, curr) => acc + curr.amount, 0);


  const SidebarItem = ({ id, label, icon: Icon }: any) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center px-4 py-3.5 rounded-xl mb-1.5 transition-all duration-200 group ${activeTab === id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-indigo-400 font-medium'}`}
      >
          <Icon size={20} className={`mr-3 transition-transform ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="text-sm">{label}</span>
      </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-16 flex font-[Hind Siliguri]">
       {/* Sidebar */}
       <div className="w-72 bg-slate-900 border-r border-white/10 fixed h-full hidden md:flex flex-col z-10 print:hidden shadow-sm">
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
              <div className="mb-8 px-2">
                 <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{role === 'admin' ? 'Super Admin' : 'Teacher Panel'}</h2>
                 <p className="text-xl font-black text-white tracking-tight">Console</p>
              </div>
              <nav className="mb-8">
                  <SidebarItem id="students" label="Student Manager" icon={Users} />
                  {role === 'admin' && <SidebarItem id="batches" label="Batch Manager" icon={Layers} />}
                  {role === 'admin' && <SidebarItem id="ids" label="ID Card Generator" icon={CreditCard} />}
                  <SidebarItem id="teachers" label="Teachers" icon={Briefcase} />
                  <SidebarItem id="attendance" label="Take Attendance" icon={Calendar} />
                  <SidebarItem id="results" label="Result Processing" icon={GraduationCap} />
                  {role === 'admin' && <SidebarItem id="accounts" label="Accounts & Fees" icon={DollarSign} />}
                  <SidebarItem id="notices" label="Communication" icon={MessageSquare} />
                  {role === 'admin' && (
                      <div className="mt-6 pt-6 border-t border-white/5">
                         <p className="px-4 text-xs font-bold text-slate-500 uppercase mb-3">System</p>
                         <SidebarItem id="audit" label="Audit Trail" icon={Shield} />
                         <SidebarItem id="settings" label="System Settings" icon={Settings} />
                      </div>
                  )}
              </nav>

              <div className="mt-auto">
                 <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center px-2">
                    <Activity size={14} className="mr-1" /> Recent Updates
                 </h2>
                 <div className="space-y-3 px-2">
                     {recentActivity.slice(0, 3).map(log => (
                         <div key={log.id} className="text-xs bg-slate-950 p-3 rounded-lg border border-white/5">
                             <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-slate-300 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{log.type}</span>
                                <span className="text-[10px] text-slate-500">{log.timestamp.split('T')[1].split('.')[0]}</span>
                             </div>
                             <p className="text-slate-400 leading-relaxed line-clamp-2">{log.description}</p>
                         </div>
                     ))}
                 </div>
              </div>
          </div>
          <div className="p-4 border-t border-white/5">
              <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-400">System Online</span>
                 </div>
                 <button onClick={logout} className="text-emerald-400 hover:text-white"><LogOut size={14}/></button>
              </div>
          </div>
       </div>

       {/* Main Content Area */}
       <div className="flex-1 md:ml-72 p-8 overflow-y-auto h-[calc(100vh-64px)] print:ml-0 print:p-0 bg-slate-950">
           <header className="flex justify-between items-center mb-10 print:hidden">
               <div>
                   <h1 className="text-3xl font-bold text-white capitalize tracking-tight flex items-center">
                     <LayoutDashboard className="mr-3 text-indigo-500" size={28} />
                     {activeTab.replace('-', ' ')}
                   </h1>
               </div>
               <div className="flex items-center gap-4">
                   <div className="text-right hidden sm:block">
                       <p className="text-sm font-bold text-white">{role === 'admin' ? 'Super Admin' : 'Teacher'}</p>
                       <p className="text-xs text-slate-400 capitalize font-medium">{role}</p>
                   </div>
                   <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30 border-4 border-slate-800">
                       {role === 'admin' ? 'A' : 'T'}
                   </div>
               </div>
           </header>

           <div className="max-w-7xl mx-auto pb-20 print:max-w-none print:pb-0">
               {activeTab !== 'settings' && activeTab !== 'ids' && (
                   <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8 print:hidden">
                       <div className="xl:col-span-3">
                            {activeTab === 'students' && <StudentManagement />}
                            {activeTab === 'batches' && <BatchManager />}
                            {activeTab === 'teachers' && <TeacherManagement />}
                            {activeTab === 'attendance' && <AttendanceManager />}
                            {activeTab === 'results' && <ResultManagement />}
                            {activeTab === 'accounts' && <AccountsView />}
                            {activeTab === 'notices' && <NoticesManager />}
                            {activeTab === 'audit' && <AuditLogViewer />}
                       </div>
                       
                       <div className="space-y-6">
                           {/* LIVE Total Students Card */}
                           <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-2xl shadow-lg shadow-indigo-500/20 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                               <div className="relative z-10">
                                   <p className="text-indigo-200 text-xs font-bold uppercase tracking-wide mb-1">Total Students</p>
                                   <h3 className="text-4xl font-black">{totalStudentsCount}</h3>
                                   <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
                                       <div>
                                           <p className="text-indigo-200 text-[10px] uppercase">Active</p>
                                           <p className="font-bold">{activeStudentsCount}</p>
                                       </div>
                                       <div>
                                            <p className="text-indigo-200 text-[10px] uppercase">Batches</p>
                                           <p className="font-bold">{totalBatchesCount}</p>
                                       </div>
                                   </div>
                               </div>
                               <Users className="absolute -bottom-4 -right-4 text-white/10 w-32 h-32" />
                           </div>

                           {/* LIVE Faculty Count Card */}
                           <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                     <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Briefcase size={20} /></div>
                                     <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-slate-400">Total</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{totalFacultyCount}</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Faculty Members</p>
                           </div>

                           {/* LIVE Financial Overview (Tiny) */}
                           <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                     <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><DollarSign size={20} /></div>
                                     <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-slate-400">Cash In</span>
                                </div>
                                <h3 className="text-2xl font-bold text-emerald-400 mb-1">৳{totalCollected}</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Total Collected</p>
                                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">DUE</span>
                                    <span className="text-sm font-bold text-rose-400">৳{totalDue}</span>
                                </div>
                           </div>

                           <RecentAdmissionsWidget />
                       </div>
                   </div>
               )}
               {activeTab === 'settings' && <SettingsTab />}
               {activeTab === 'ids' && <IDCardGenerator />}
           </div>
       </div>
    </div>
  );
};
