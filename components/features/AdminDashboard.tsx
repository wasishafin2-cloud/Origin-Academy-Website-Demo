import React, { useState, useMemo } from 'react';
import { useDashboard } from './DashboardContext';
import { Student, Batch, GradeRule } from '../../types';
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

// --- Sub Components ---

const StudentManagement: React.FC = () => {
  const { students, batches, toggleStudentStatus, updateStudent, admitStudent, deleteStudent, role } = useDashboard();
  const [filterText, setFilterText] = useState('');
  const [filterBatch, setFilterBatch] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  // Manual Add Form State
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

  const InputGroup = ({ label, value, onChange, type="text" }: any) => (
      <div className="mb-4">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{label}</label>
          <input 
            type={type}
            value={value} 
            onChange={e => onChange(e.target.value)} 
            className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
      </div>
  );

  return (
    <div className="animate-in fade-in">
      {/* Advanced Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full">
                <label className="text-xs font-bold text-slate-500 mb-2 block uppercase tracking-wide">Search Students</label>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all" 
                        placeholder="Search by Name, Roll or ID..." 
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full md:w-64">
                <label className="text-xs font-bold text-slate-500 mb-2 block uppercase tracking-wide">Filter by Batch</label>
                <div className="relative">
                    <select value={filterBatch} onChange={e => setFilterBatch(e.target.value)} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm bg-slate-50 focus:bg-white text-slate-700 outline-none appearance-none">
                        <option value="All">All Batches</option>
                        {batches.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none text-slate-400 text-xs">▼</div>
                </div>
            </div>
            <div className="w-full md:w-auto">
                <Button onClick={() => setShowAddModal(true)} size="md" className="w-full md:w-auto shadow-indigo-200">
                    <Plus size={18} className="mr-2" /> Add Student
                </Button>
            </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase whitespace-nowrap tracking-wider">Student Profile</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase whitespace-nowrap tracking-wider">Batch / Academic</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase whitespace-nowrap tracking-wider">Guardian Info</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase whitespace-nowrap tracking-wider">Status</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase text-right whitespace-nowrap tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                <img src={student.image || ''} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 flex items-center">
                                    {student.name}
                                    {isNewStudent(student.academic.joinDate) && <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-bold">NEW</span>}
                                </p>
                                <p className="text-xs text-slate-500 font-mono">{student.id}</p>
                            </div>
                        </div>
                        </td>
                        <td className="p-5 text-sm text-slate-600">
                        <p className="font-bold text-indigo-600 text-xs bg-indigo-50 px-2 py-1 rounded inline-block mb-1 border border-indigo-100">{student.academic.batch}</p>
                        <p className="text-xs"><span className="font-bold text-slate-500">Roll:</span> {student.academic.roll}</p>
                        </td>
                        <td className="p-5 text-sm text-slate-600">
                        <p className="font-bold text-slate-800">{student.guardian.fatherName}</p>
                        <p className="text-xs text-slate-500">{student.guardian.fatherMobile}</p>
                        </td>
                        <td className="p-5">
                            <div className="flex flex-col gap-1 items-start">
                                <button 
                                    onClick={() => toggleStudentStatus(student.id)}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${student.academic.accountStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                                >
                                    {student.academic.accountStatus}
                                </button>
                            </div>
                        </td>
                        <td className="p-5 text-right">
                            <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingStudent(student)} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                                    <Edit size={16} />
                                </button>
                                {role === 'admin' && (
                                    <button onClick={() => handleDelete(student.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
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
      
      {/* Edit Modal with Batch Transfer */}
      <Modal isOpen={!!editingStudent} onClose={() => setEditingStudent(null)} title="Edit Student Profile">
        {editingStudent && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
             <div className="space-y-4">
                 <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 text-sm uppercase tracking-wide">Academic & Batch</h4>
                 <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Assigned Batch</label>
                        <div className="relative">
                            <select 
                                value={editingStudent.academic.batchId}
                                onChange={(e) => setEditingStudent({...editingStudent, academic: {...editingStudent.academic, batchId: e.target.value}})}
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-indigo-50/50 font-bold text-indigo-700 appearance-none outline-none focus:ring-2 focus:ring-indigo-100"
                            >
                                {batches.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-3 pointer-events-none text-indigo-400 text-xs">▼</div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 italic">Changing this moves the student to a different batch.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Roll No" value={editingStudent.academic.roll} onChange={(v: string) => setEditingStudent({...editingStudent, academic: {...editingStudent.academic, roll: v}})} />
                        <InputGroup label="Full Name" value={editingStudent.name} onChange={(v: string) => setEditingStudent({...editingStudent, name: v})} />
                    </div>
                 </div>
             </div>

             <div className="space-y-4">
                 <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 text-sm uppercase tracking-wide">Guardian Info</h4>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Assign Batch</label>
                  <select 
                      value={newStudentData.batchId}
                      onChange={(e) => setNewStudentData({...newStudentData, batchId: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-500 bg-white text-slate-700"
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

const SettingsTab: React.FC = () => {
    const { systemSettings, updateSystemSettings, gradingRules, updateGradingRules } = useDashboard();
    const [settings, setSettings] = useState(systemSettings);
    const [rules, setRules] = useState(gradingRules);

    const handleSettingsSave = () => {
        updateSystemSettings(settings);
        alert('Settings Updated!');
    };

    const handleRulesSave = () => {
        updateGradingRules(rules);
        alert('Grading Rules Updated!');
    };

    const updateRule = (idx: number, field: keyof GradeRule, val: any) => {
        const newRules = [...rules];
        newRules[idx] = { ...newRules[idx], [field]: val };
        setRules(newRules);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in">
            {/* General Settings */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                        <Settings className="mr-2 text-indigo-600" /> Global System Settings
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">School/Coaching Name</label>
                            <input value={settings.schoolName} onChange={e => setSettings({...settings, schoolName: e.target.value})} className="w-full border p-2 rounded text-sm"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Address</label>
                            <input value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full border p-2 rounded text-sm"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contact Number</label>
                            <input value={settings.contact} onChange={e => setSettings({...settings, contact: e.target.value})} className="w-full border p-2 rounded text-sm"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Active Academic Session</label>
                            <input value={settings.activeSession} onChange={e => setSettings({...settings, activeSession: e.target.value})} className="w-full border p-2 rounded text-sm font-mono"/>
                            <p className="text-[10px] text-slate-400 mt-1">New students will be auto-tagged to this year.</p>
                        </div>
                        <Button onClick={handleSettingsSave} className="w-full">Save Configuration</Button>
                    </div>
                </div>
            </div>

            {/* Grading Logic */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                        <Hash className="mr-2 text-indigo-600" /> Grading Logic (GPA)
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                                <tr>
                                    <th className="p-3">Grade</th>
                                    <th className="p-3">GPA</th>
                                    <th className="p-3">Min</th>
                                    <th className="p-3">Max</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rules.map((rule, idx) => (
                                    <tr key={rule.id}>
                                        <td className="p-2 font-bold text-indigo-700">{rule.grade}</td>
                                        <td className="p-2"><input type="number" value={rule.gpa} onChange={e => updateRule(idx, 'gpa', parseFloat(e.target.value))} className="w-16 border rounded p-1" /></td>
                                        <td className="p-2"><input type="number" value={rule.minMark} onChange={e => updateRule(idx, 'minMark', parseInt(e.target.value))} className="w-16 border rounded p-1" /></td>
                                        <td className="p-2"><input type="number" value={rule.maxMark} onChange={e => updateRule(idx, 'maxMark', parseInt(e.target.value))} className="w-16 border rounded p-1" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs rounded border border-red-100">
                        <span className="font-bold">Logic Rule:</span> Any subject with mark &lt; 33 (or 'F' range) will result in FAIL status regardless of total marks.
                    </div>
                    <Button onClick={handleRulesSave} variant="secondary" className="w-full mt-4">Update Grading Rules</Button>
                </div>
            </div>
        </div>
    );
};

const IDCardGenerator: React.FC = () => {
    const { students, batches, systemSettings } = useDashboard();
    const [selectedBatchId, setSelectedBatchId] = useState('');
    
    const targetStudents = students.filter(s => s.academic.batchId === selectedBatchId);

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between print:hidden">
                <div className="flex gap-4 items-center">
                    <CreditCard size={24} className="text-indigo-600" />
                    <div>
                        <h3 className="font-bold text-slate-800">ID Card Generator</h3>
                        <p className="text-xs text-slate-500">Select a batch to generate printable ID cards.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <select 
                        value={selectedBatchId} 
                        onChange={e => setSelectedBatchId(e.target.value)} 
                        className="border p-2 rounded-lg text-sm min-w-[200px] bg-white text-slate-700"
                    >
                        <option value="">Select Batch</option>
                        {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                    <Button onClick={() => window.print()} disabled={!selectedBatchId} className="flex items-center">
                        <Printer size={16} className="mr-2" /> Print IDs
                    </Button>
                </div>
            </div>

            {selectedBatchId && (
                <div className="print:block">
                    <div className="grid grid-cols-2 gap-4 print:grid-cols-2 print:gap-2 w-full max-w-[210mm] mx-auto">
                        {targetStudents.map(student => (
                            <div key={student.id} className="border border-slate-300 rounded-xl overflow-hidden flex flex-col w-full h-[54mm] bg-white relative print:break-inside-avoid">
                                {/* Header */}
                                <div className="bg-indigo-900 text-white p-2 flex items-center gap-2 h-[12mm]">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-indigo-900 shrink-0">OA</div>
                                    <div className="leading-tight">
                                        <p className="text-[10px] font-bold uppercase">{systemSettings.schoolName}</p>
                                        <p className="text-[8px] opacity-80">{systemSettings.address}</p>
                                    </div>
                                </div>
                                
                                {/* Body */}
                                <div className="flex p-2 gap-3 h-[30mm] items-center">
                                    <img 
                                        src={student.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} 
                                        className="w-[20mm] h-[20mm] object-cover rounded border border-slate-200" 
                                        alt=""
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{student.name}</h4>
                                        <div className="text-[10px] text-slate-600 space-y-0.5">
                                            <p><span className="font-bold">ID:</span> {student.id}</p>
                                            <p><span className="font-bold">Roll:</span> {student.academic.roll}</p>
                                            <p><span className="font-bold">Batch:</span> {student.academic.batch}</p>
                                            <p><span className="font-bold">Blood:</span> {student.personal.bloodGroup || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="w-[18mm] h-[18mm] bg-slate-100 flex items-center justify-center">
                                        {/* Mock QR */}
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${student.id}`} alt="QR" className="w-full h-full mix-blend-multiply opacity-80" />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-slate-100 p-1 flex justify-between items-center text-[8px] h-[10mm] px-3 mt-auto">
                                    <p>Session: {student.academic.session}</p>
                                    <p>Emergency: {systemSettings.contact}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const BatchManager: React.FC = () => {
    const { batches, addBatch, updateBatch, students } = useDashboard();
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

    const openEdit = (b: Batch) => {
        setEditingBatch(b);
        setFormData({ name: b.name, class: b.class, session: b.session, maxCapacity: b.maxCapacity });
    };

    return (
        <div className="animate-in fade-in space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">Batch Configuration</h3>
                <Button onClick={() => setIsCreateOpen(true)} size="sm"><Plus size={16} className="mr-2"/> Create Batch</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {batches.map(batch => {
                    const count = getStudentCount(batch.id);
                    const isFull = count >= batch.maxCapacity;
                    return (
                        <div key={batch.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">{batch.name}</h4>
                                    <p className="text-xs text-slate-500">{batch.session} • {batch.class}</p>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded font-bold ${batch.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                    {batch.status}
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                    <span>Occupancy</span>
                                    <span className={isFull ? 'text-red-500' : 'text-indigo-500'}>{count} / {batch.maxCapacity}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${isFull ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${Math.min((count/batch.maxCapacity)*100, 100)}%` }}></div>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <button onClick={() => openEdit(batch)} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded transition">Edit</button>
                                <button 
                                    onClick={() => updateBatch({...batch, status: batch.status === 'Active' ? 'Closed' : 'Active'})} 
                                    className="text-xs font-bold text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded transition"
                                >
                                    {batch.status === 'Active' ? 'Close Admissions' : 'Re-open'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Create/Edit Modal */}
            <Modal isOpen={isCreateOpen || !!editingBatch} onClose={() => { setIsCreateOpen(false); setEditingBatch(null); }} title={editingBatch ? "Edit Batch" : "Create New Batch"}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Batch Name</label>
                        <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded text-sm" placeholder="e.g. HSC 2025 - Padma" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Class/Group</label>
                            <input value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full border p-2 rounded text-sm" placeholder="Class 10" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Session</label>
                            <input value={formData.session} onChange={e => setFormData({...formData, session: e.target.value})} className="w-full border p-2 rounded text-sm" placeholder="2024-25" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Max Capacity</label>
                        <input type="number" value={formData.maxCapacity} onChange={e => setFormData({...formData, maxCapacity: parseInt(e.target.value)})} className="w-full border p-2 rounded text-sm" />
                    </div>
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <UserPlus size={18} className="mr-2 text-indigo-600" /> Recent Admissions
            </h3>
            {recentStudents.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-4">No new admissions this week.</p>
            ) : (
                <div className="space-y-3">
                    {recentStudents.map(s => (
                        <div key={s.id} className="flex items-center justify-between pb-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 p-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                    {s.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{s.name}</p>
                                    <p className="text-[10px] text-slate-500">{s.academic.batch}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{s.academic.joinDate}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TeacherManagement: React.FC = () => {
    const { teachers, toggleTeacherStatus } = useDashboard();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase">Teacher Name</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase">Subject</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase">Status</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {teachers.map(t => (
                            <tr key={t.id} className="hover:bg-slate-50">
                                <td className="p-5 font-bold text-slate-900">{t.name}</td>
                                <td className="p-5 text-sm">{t.subject}</td>
                                <td className="p-5"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs border border-emerald-200">{t.status}</span></td>
                                <td className="p-5 text-right"><Button size="xs" variant="outline" onClick={() => toggleTeacherStatus(t.id)}>Toggle</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AttendanceManager: React.FC = () => {
    const { students, markAttendance, batches } = useDashboard();
    
    // UI States
    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);
    
    // Selection State
    const [targetClass, setTargetClass] = useState('');
    const [targetSection, setTargetSection] = useState('');
    const [selectedDate, setSelectedDate] = useState(getLocalDateString());
    
    // Data State
    const [attendanceData, setAttendanceData] = useState<Record<string, 'Present' | 'Absent'>>({});
    const [isEditMode, setIsEditMode] = useState(false);

    // Derived Lists
    const uniqueClasses = Array.from(new Set(students.map(s => s.academic.class)));
    const uniqueSections = Array.from(new Set(students.map(s => s.academic.section)));
    
    const targetStudents = useMemo(() => {
        return students.filter(s => 
            s.academic.class === targetClass && 
            s.academic.section === targetSection && 
            s.academic.classStatus === 'Active'
        );
    }, [students, targetClass, targetSection]);

    // Handlers
    const handleFetch = () => {
        if (!targetClass || !targetSection) return;
        
        setLoading(true);
        setTimeout(() => {
            // Check for existing records
            const existingRecords: Record<string, 'Present' | 'Absent'> = {};
            let foundExisting = false;

            targetStudents.forEach(s => {
                const record = s.attendance.find(a => a.date === selectedDate);
                if (record) {
                    existingRecords[s.id] = record.status as 'Present' | 'Absent';
                    foundExisting = true;
                } else {
                    existingRecords[s.id] = 'Present'; // Default
                }
            });

            setAttendanceData(existingRecords);
            setIsEditMode(foundExisting);
            setStep(2);
            setLoading(false);
        }, 600);
    };

    const toggleStatus = (id: string) => {
        setAttendanceData(prev => ({
            ...prev,
            [id]: prev[id] === 'Present' ? 'Absent' : 'Present'
        }));
    };

    const markAllPresent = () => {
        const reset: Record<string, 'Present'> = {};
        targetStudents.forEach(s => reset[s.id] = 'Present');
        setAttendanceData(prev => ({...prev, ...reset}));
    };

    const simulateSMS = (absentees: Student[]) => {
        if (absentees.length === 0) return;
        console.log(`Sending SMS to ${absentees.length} parents...`);
        // In real app: call SMS API here
    };

    const handleSubmit = () => {
        if (window.confirm(`Submit attendance for ${Object.keys(attendanceData).length} students?`)) {
            const records = Object.entries(attendanceData).map(([id, status]) => ({
                studentId: id,
                status
            }));
            
            markAttendance(selectedDate, records);
            
            // Automation: Trigger SMS
            const absentees = targetStudents.filter(s => attendanceData[s.id] === 'Absent');
            simulateSMS(absentees);

            alert('Attendance Saved Successfully! SMS Alerts triggered for absentees.');
            setStep(1); // Reset
            setTargetClass('');
            setTargetSection('');
        }
    };

    // --- Render ---

    if (step === 1) {
        return (
            <div className="max-w-xl mx-auto animate-in fade-in">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl text-center">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-sm border border-indigo-100">
                        <Calendar size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Take Attendance</h2>
                    <p className="text-slate-500 mb-8">Select Class & Section to start marking.</p>

                    <div className="space-y-6 text-left">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                            <input 
                                type="date" 
                                value={selectedDate} 
                                onChange={e => setSelectedDate(e.target.value)}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Class</label>
                                <select 
                                    value={targetClass} 
                                    onChange={e => setTargetClass(e.target.value)}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-colors"
                                >
                                    <option value="">Select</option>
                                    {uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section</label>
                                <select 
                                    value={targetSection} 
                                    onChange={e => setTargetSection(e.target.value)}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-colors"
                                >
                                    <option value="">Select</option>
                                    {uniqueSections.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <Button 
                            onClick={handleFetch} 
                            disabled={!targetClass || !targetSection} 
                            className="w-full py-4 text-lg mt-6 shadow-xl shadow-indigo-200"
                        >
                            {loading ? 'Fetching...' : 'Load Student List'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Marking Interface
    const presentCount = Object.values(attendanceData).filter(s => s === 'Present').length;
    const absentCount = Object.values(attendanceData).filter(s => s === 'Absent').length;

    return (
        <div className="animate-in slide-in-from-right duration-300">
            {/* Header / Summary */}
            <div className="sticky top-0 z-30 bg-slate-100/90 backdrop-blur-xl pb-4 pt-2">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-slate-800 text-lg">Class {targetClass} - Section {targetSection}</h3>
                            {isEditMode && <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-200">EDIT MODE</span>}
                        </div>
                        <p className="text-xs text-slate-500 font-mono mt-1">{selectedDate}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 text-sm font-bold">
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-xl shadow-sm">P: {presentCount}</span>
                            <span className="text-rose-700 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-xl shadow-sm">A: {absentCount}</span>
                        </div>
                        <Button onClick={markAllPresent} variant="outline" size="sm">Reset All</Button>
                    </div>
                </div>
                
                {isEditMode && (
                    <div className="mt-2 bg-orange-50 border border-orange-200 text-orange-800 text-xs px-4 py-2 rounded-xl flex items-center justify-center">
                        <AlertTriangle size={14} className="mr-2" />
                        Warning: Attendance for this date is already recorded. You are editing existing records. All changes will be audited.
                    </div>
                )}
            </div>

            {/* Student List */}
            <div className="space-y-3 mt-6 mb-24">
                {targetStudents.map(student => {
                    const status = attendanceData[student.id];
                    return (
                        <div key={student.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-sm transition-colors duration-300 ${status === 'Present' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                                    {status === 'Present' ? 'P' : 'A'}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-base">{student.name}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Roll: {student.academic.roll} <span className="text-slate-300 mx-1">|</span> ID: {student.id}</p>
                                </div>
                            </div>

                            {/* Toggle Button */}
                            <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                                <button 
                                    onClick={() => setAttendanceData({...attendanceData, [student.id]: 'Present'})}
                                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${status === 'Present' ? 'bg-white text-emerald-600 shadow-sm scale-100 ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Present
                                </button>
                                <button 
                                    onClick={() => setAttendanceData({...attendanceData, [student.id]: 'Absent'})}
                                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${status === 'Absent' ? 'bg-white text-rose-600 shadow-sm scale-100 ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Absent
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Action */}
            <div className="fixed bottom-6 left-0 right-0 p-4 md:left-64 flex justify-center z-40 bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent pt-12">
                <div className="flex gap-4 max-w-md w-full bg-white p-2.5 rounded-2xl shadow-2xl border border-slate-200">
                    <Button onClick={() => setStep(1)} variant="ghost" className="flex-1 rounded-xl">Cancel</Button>
                    <Button onClick={handleSubmit} className="flex-[2] rounded-xl shadow-lg">
                        <Send size={18} className="mr-2" /> Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

const AccountsView: React.FC = () => {
    const { students, role } = useDashboard();
    
    // RBAC: Teachers cannot see accounts
    if (role === 'teacher') {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-red-100 shadow-sm">
                <ShieldAlert size={48} className="text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-red-700">Access Restricted</h3>
                <p className="text-slate-500 text-center">Financial data is only accessible to Admin users.</p>
            </div>
        );
    }

    const allTransactions = students.flatMap(s => s.financials.filter(f => f.status === 'Paid').map(f => ({...f, studentName: s.name, studentId: s.id}))).sort((a, b) => new Date(b.paymentDate || '').getTime() - new Date(a.paymentDate || '').getTime());
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-sm font-bold uppercase">Total Collected</p>
                    <h3 className="text-3xl font-bold text-emerald-600">৳{allTransactions.reduce((acc, curr) => acc + curr.amount, 0)}</h3>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left"><thead className="bg-slate-50 border-b border-slate-200"><tr><th className="p-4 text-xs font-bold text-slate-500 uppercase">Trx ID</th><th className="p-4 text-xs font-bold text-slate-500 uppercase">Student</th><th className="p-4 text-xs font-bold text-slate-500 uppercase">Amount</th><th className="p-4 text-xs font-bold text-slate-500 uppercase">Date</th></tr></thead><tbody className="divide-y divide-slate-100">{allTransactions.map((trx, idx) => (<tr key={idx} className="hover:bg-slate-50"><td className="p-4 text-xs font-mono text-slate-500">{trx.trxId}</td><td className="p-4 font-bold text-slate-800">{trx.studentName}</td><td className="p-4 font-bold text-emerald-600">৳{trx.amount}</td><td className="p-4 text-sm text-slate-500">{trx.paymentDate}</td></tr>))}</tbody></table>
                </div>
            </div>
        </div>
    );
};

const NoticesManager: React.FC = () => {
    const { notices, postNotice } = useDashboard();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState<'Academic' | 'Administrative' | 'Event'>('Academic');
    const [priority, setPriority] = useState<'Normal' | 'Urgent'>('Normal');
    const handlePost = () => { if(title && content) { postNotice({ title, content, type, priority }); setTitle(''); setContent(''); alert('Notice posted successfully!'); } };
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6"><div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><h3 className="font-bold text-lg text-slate-800 mb-4">Post New Notice</h3><div className="space-y-4"><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label><input value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded text-sm"/></div><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Content</label><textarea value={content} onChange={e => setContent(e.target.value)} className="w-full border p-2 rounded text-sm h-24"/></div><div className="flex gap-4"><div className="flex-1"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label><select value={type} onChange={e => setType(e.target.value as any)} className="w-full border p-2 rounded text-sm"><option>Academic</option><option>Administrative</option><option>Event</option></select></div><div className="flex-1"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Priority</label><select value={priority} onChange={e => setPriority(e.target.value as any)} className="w-full border p-2 rounded text-sm"><option>Normal</option><option>Urgent</option></select></div></div><Button onClick={handlePost} className="w-full">Post Notice</Button></div></div></div>
            <div className="space-y-4"><h3 className="font-bold text-lg text-slate-800">Active Notices</h3>{notices.map(notice => (<div key={notice.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden"><h4 className="font-bold text-slate-800">{notice.title}</h4><p className="text-sm text-slate-600 my-2">{notice.content}</p></div>))}</div>
        </div>
    );
};

const AuditLogViewer: React.FC = () => {
    const { auditLogs } = useDashboard();
    return (
        <div className="space-y-6"><div className="bg-white p-4 rounded-xl border border-red-100 bg-red-50 flex items-center gap-3"><ShieldAlert className="text-red-600" /><div><h3 className="font-bold text-red-800">Restricted Access: Audit Trail</h3></div></div><div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-4 text-xs font-bold uppercase">Timestamp</th><th className="p-4 text-xs font-bold uppercase">Actor</th><th className="p-4 text-xs font-bold uppercase">Action</th><th className="p-4 text-xs font-bold uppercase">Details</th></tr></thead><tbody className="divide-y divide-slate-100">{auditLogs.map(log => (<tr key={log.id} className="hover:bg-slate-50"><td className="p-4 text-xs font-mono">{log.timestamp.split('T')[1].split('.')[0]}</td><td className="p-4 font-bold">{log.actorName}</td><td className="p-4">{log.action}</td><td className="p-4 text-sm">{log.details.field}: {log.details.oldValue} → {log.details.newValue}</td></tr>))}</tbody></table></div></div></div>
    );
};

const ResultManagement: React.FC = () => {
    const { students, availableExams, updateExamMarks, publishResult, getExamStats } = useDashboard();
    const [selectedExamId, setSelectedExamId] = useState(availableExams.length > 0 ? availableExams[0].id : '');
    
    const selectedExam = availableExams.find(e => e.id === selectedExamId);
    
    // Derived stats
    const stats = selectedExamId ? getExamStats(selectedExamId) : { totalStudents: 0, marksEntered: 0, missingStudents: [] };
    const percentage = stats.totalStudents > 0 ? Math.round((stats.marksEntered / stats.totalStudents) * 100) : 0;

    return (
        <div className="space-y-6 animate-in fade-in">
             {/* Header Controls */}
             <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Result Processing</h3>
                    <p className="text-xs text-slate-500">Manage marks and publish results.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select 
                        value={selectedExamId} 
                        onChange={e => setSelectedExamId(e.target.value)} 
                        className="flex-1 md:flex-none border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:border-indigo-500 min-w-[220px] bg-white text-slate-700"
                    >
                        {availableExams.map(ex => <option key={ex.id} value={ex.id}>{ex.title} ({ex.class})</option>)}
                    </select>
                    <Button onClick={() => publishResult(selectedExamId)} size="sm">Publish</Button>
                </div>
             </div>

             {/* Pending Marks Status Widget */}
             {selectedExam && (
                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="font-bold text-slate-800 flex items-center">
                                <Activity className="mr-2 text-indigo-600" size={20} />
                                Pending Marks Status
                            </h4>
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                                {stats.marksEntered} / {stats.totalStudents} Entered
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                <div 
                                    className={`h-full transition-all duration-1000 ease-out flex items-center justify-end pr-2 text-[10px] font-bold text-white shadow-sm ${percentage === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                                    style={{ width: `${percentage}%` }}
                                >
                                    {percentage > 10 && `${percentage}%`}
                                </div>
                            </div>
                        </div>

                        {/* Missing Students List */}
                        {stats.missingStudents.length > 0 ? (
                            <div>
                                <p className="text-xs font-bold text-red-500 uppercase mb-3 flex items-center">
                                    <AlertTriangle size={12} className="mr-1" />
                                    Missing Marks ({stats.missingStudents.length})
                                </p>
                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                                    {stats.missingStudents.map(s => (
                                        <div key={s.id} className="flex items-center gap-2 bg-red-50 border border-red-100 pl-1 pr-3 py-1 rounded-lg group hover:border-red-200 transition-colors">
                                            <span className="w-5 h-5 rounded bg-white text-red-600 border border-red-100 flex items-center justify-center text-[10px] font-bold shadow-sm">
                                                {s.academic.roll}
                                            </span>
                                            <span className="text-xs font-medium text-slate-700 truncate max-w-[100px]">{s.name.split(' ')[0]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-4 text-emerald-600 bg-emerald-50/50 rounded-xl border border-emerald-100 border-dashed">
                                <CheckCircle size={32} className="mb-2" />
                                <p className="font-bold text-sm">All marks entered successfully!</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Info */}
                    <div className="bg-gradient-to-br from-indigo-800 to-indigo-950 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <FileText size={100} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">Exam Details</p>
                            <h3 className="text-2xl font-bold mb-6 leading-tight">{selectedExam.title}</h3>
                            
                            <div className="space-y-3 text-sm border-t border-indigo-700/50 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-indigo-300">Total Marks</span>
                                    <span className="font-bold font-mono">{selectedExam.totalMarks}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-indigo-300">Target Class</span>
                                    <span className="font-bold">{selectedExam.class}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-indigo-300">Subject Code</span>
                                    <span className="font-bold font-mono text-xs bg-indigo-800 px-2 py-0.5 rounded">{selectedExam.subjectCode || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
             )}

             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Student Marks Entry</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                            <tr>
                                <th className="p-4 w-24">Roll No</th>
                                <th className="p-4">Student Name</th>
                                <th className="p-4 text-right w-40">Obtained Marks</th>
                                <th className="p-4 text-center w-32">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {students
                                .filter(s => s.academic.class === selectedExam?.class && s.academic.accountStatus === 'Active')
                                .sort((a,b) => parseInt(a.academic.roll) - parseInt(b.academic.roll))
                                .map(s => {
                                    const res = s.results.find(r => r.examId === selectedExamId);
                                    const hasMark = res !== undefined && res.obtainedMarks !== undefined;
                                    
                                    return (
                                        <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-4 font-mono text-slate-500 font-bold">{s.academic.roll}</td>
                                            <td className="p-4 font-bold text-slate-800">
                                                {s.name}
                                                <p className="text-[10px] text-slate-400 font-normal">{s.id}</p>
                                            </td>
                                            <td className="p-4 text-right">
                                                <input 
                                                    type="number" 
                                                    className={`border w-24 p-2 text-right rounded-lg font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-700 ${!hasMark ? 'bg-red-50 border-red-200 focus:bg-white' : 'border-slate-200'}`}
                                                    value={res?.obtainedMarks ?? ''} 
                                                    onChange={e => {
                                                        const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                                        updateExamMarks(selectedExamId, s.id, val, selectedExam?.totalMarks || 100, selectedExam?.title || '', getLocalDateString())
                                                    }}
                                                    placeholder="-"
                                                    max={selectedExam?.totalMarks}
                                                />
                                            </td>
                                            <td className="p-4 text-center">
                                                {hasMark ? (
                                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold border border-emerald-200 flex items-center justify-center w-fit mx-auto gap-1">
                                                        <CheckCircle size={10} /> SAVED
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-1 rounded-full font-bold border border-slate-200">PENDING</span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {students.filter(s => s.academic.class === selectedExam?.class).length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-400 italic">No active students found in this class.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    );
};

// --- Main Admin Dashboard ---

export const AdminDashboard: React.FC = () => {
  const { role, logout, recentActivity, students, batches } = useDashboard();
  const [activeTab, setActiveTab] = useState<'students' | 'batches' | 'teachers' | 'attendance' | 'results' | 'accounts' | 'notices' | 'audit' | 'settings' | 'ids'>('students');

  // Strict RBAC
  if (role !== 'admin' && role !== 'teacher') {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 text-slate-800">
              <ShieldAlert size={64} className="text-red-500 mb-4" />
              <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
              <p className="text-slate-500 mb-8">You do not have permission to view this page.</p>
              <Button onClick={logout} variant="outline">Return to Home</Button>
          </div>
      );
  }

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center px-4 py-3.5 rounded-xl mb-1.5 transition-all duration-200 group ${activeTab === id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600 font-medium'}`}
      >
          <Icon size={20} className={`mr-3 transition-transform ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="text-sm">{label}</span>
      </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 pt-16 flex">
       {/* Sidebar */}
       <div className="w-72 bg-white border-r border-slate-200 fixed h-full hidden md:flex flex-col z-10 print:hidden shadow-sm">
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
              <div className="mb-8 px-2">
                 <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{role === 'admin' ? 'Super Admin' : 'Teacher Panel'}</h2>
                 <p className="text-xl font-black text-slate-800 tracking-tight">Console</p>
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
                      <div className="mt-6 pt-6 border-t border-slate-100">
                         <p className="px-4 text-xs font-bold text-slate-400 uppercase mb-3">System</p>
                         <SidebarItem id="audit" label="Audit Trail" icon={Shield} />
                         <SidebarItem id="settings" label="System Settings" icon={Settings} />
                      </div>
                  )}
              </nav>

              {/* Recent Updates Feed */}
              <div className="mt-auto">
                 <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center px-2">
                    <Activity size={14} className="mr-1" /> Recent Updates
                 </h2>
                 <div className="space-y-3 px-2">
                     {recentActivity.slice(0, 3).map(log => (
                         <div key={log.id} className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                             <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-100">{log.type}</span>
                                <span className="text-[10px] text-slate-400">{log.timestamp.split('T')[1].split('.')[0]}</span>
                             </div>
                             <p className="text-slate-500 leading-relaxed line-clamp-2">{log.description}</p>
                         </div>
                     ))}
                 </div>
              </div>
          </div>
          <div className="p-4 border-t border-slate-200">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-800">System Online</span>
                 </div>
                 <button onClick={logout} className="text-emerald-700 hover:text-emerald-900"><LogOut size={14}/></button>
              </div>
          </div>
       </div>

       {/* Main Content Area */}
       <div className="flex-1 md:ml-72 p-8 overflow-y-auto h-[calc(100vh-64px)] print:ml-0 print:p-0 bg-[#f8fafc]">
           <header className="flex justify-between items-center mb-10 print:hidden">
               <div>
                   <h1 className="text-3xl font-bold text-slate-800 capitalize tracking-tight flex items-center">
                     <LayoutDashboard className="mr-3 text-indigo-500" size={28} />
                     {activeTab.replace('-', ' ')}
                   </h1>
               </div>
               <div className="flex items-center gap-4">
                   <div className="text-right hidden sm:block">
                       <p className="text-sm font-bold text-slate-900">{role === 'admin' ? 'Super Admin' : 'Teacher'}</p>
                       <p className="text-xs text-slate-500 capitalize font-medium">{role}</p>
                   </div>
                   <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200 border-4 border-white">
                       {role === 'admin' ? 'A' : 'T'}
                   </div>
               </div>
           </header>

           <div className="max-w-7xl mx-auto pb-20 print:max-w-none print:pb-0">
               {activeTab !== 'settings' && activeTab !== 'ids' && (
                   <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8 print:hidden">
                       <div className="xl:col-span-3">
                            {/* Main Tab Content */}
                            {activeTab === 'students' && <StudentManagement />}
                            {activeTab === 'batches' && <BatchManager />}
                            {activeTab === 'teachers' && <TeacherManagement />}
                            {activeTab === 'attendance' && <AttendanceManager />}
                            {activeTab === 'results' && <ResultManagement />}
                            {activeTab === 'accounts' && <AccountsView />}
                            {activeTab === 'notices' && <NoticesManager />}
                            {activeTab === 'audit' && <AuditLogViewer />}
                       </div>
                       
                       {/* Right Column Widgets */}
                       <div className="space-y-6">
                           <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-2xl shadow-lg shadow-indigo-200 relative overflow-hidden">
                               <div className="relative z-10">
                                   <p className="text-indigo-200 text-xs font-bold uppercase tracking-wide mb-1">Total Students</p>
                                   <h3 className="text-4xl font-black">{students.length}</h3>
                                   <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
                                       <div>
                                           <p className="text-indigo-200 text-[10px] uppercase">Active</p>
                                           <p className="font-bold">{students.filter(s=>s.academic.classStatus==='Active').length}</p>
                                       </div>
                                       <div>
                                            <p className="text-indigo-200 text-[10px] uppercase">Batches</p>
                                           <p className="font-bold">{batches.length}</p>
                                       </div>
                                   </div>
                               </div>
                               <Users className="absolute -bottom-4 -right-4 text-white/10 w-32 h-32" />
                           </div>
                           
                           <RecentAdmissionsWidget />
                       </div>
                   </div>
               )}
               {/* Full Width Views */}
               {activeTab === 'settings' && <SettingsTab />}
               {activeTab === 'ids' && <IDCardGenerator />}
           </div>
       </div>
    </div>
  );
};