
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { CreditCard, Smartphone, ShieldCheck, Users, Check } from 'lucide-react';
import { useDashboard } from './DashboardContext';

interface AdmissionFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const COURSES = {
  ssc: { title: 'SSC একাডেমিক প্রোগ্রাম', price: 4500, discount: 3000 },
  hsc_eng: { title: 'HSC ইঞ্জিনিয়ারিং', price: 6500, discount: 2000 },
  medical: { title: 'মেডিকেল এডমিশন', price: 5500, discount: 2000 },
};

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ onSubmit, onCancel }) => {
  const { batches, admitStudent } = useDashboard();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'ssc',
    batchId: '',
    paymentMethod: 'bkash',
    trxId: ''
  });
  const [error, setError] = useState('');

  const activeBatches = batches.filter(b => b.status === 'Active');
  const selectedCourse = COURSES[formData.course as keyof typeof COURSES];
  const finalPrice = selectedCourse.price - selectedCourse.discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.trxId || !formData.batchId) {
      setError('অনুগ্রহ করে সব তথ্য পূরণ করুন');
      return;
    }
    admitStudent(formData);
    onSubmit();
  };

  // Improved Input Classes for Visibility
  const inputClasses = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none text-white placeholder-slate-500 text-sm";
  const labelClasses = "block text-xs font-bold text-slate-400 uppercase mb-1.5";

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Form Section */}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-lg border border-red-500/20 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {error}
            </div>
          )}
          
          <div>
            <label className={labelClasses}>শিক্ষার্থীর নাম</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="আপনার পূর্ণ নাম"
            />
          </div>

          <div>
            <label className={labelClasses}>মোবাইল নম্বর</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="017XXXXXXXX"
            />
          </div>

          <div>
            <label className={labelClasses}>কোর্স সিলেক্ট করুন</label>
            <div className="relative">
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`${inputClasses} appearance-none`}
              >
                <option value="ssc" className="bg-slate-900 text-slate-300">SSC একাডেমিক</option>
                <option value="hsc_eng" className="bg-slate-900 text-slate-300">HSC ইঞ্জিনিয়ারিং</option>
                <option value="medical" className="bg-slate-900 text-slate-300">মেডিকেল এডমিশন</option>
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400 text-xs">▼</div>
            </div>
          </div>

          <div>
            <label className={labelClasses}>ব্যাচ সিলেক্ট করুন <span className="text-red-400">*</span></label>
            <div className="relative">
                <Users className="absolute left-3 top-3 text-slate-500" size={18} />
                <select
                    name="batchId"
                    value={formData.batchId}
                    onChange={handleChange}
                    className={`${inputClasses} pl-10`}
                >
                    <option value="" className="bg-slate-900 text-slate-500">-- ব্যাচ নির্বাচন করুন --</option>
                    {activeBatches.map(batch => (
                        <option key={batch.id} value={batch.id} className="bg-slate-900 text-slate-300">
                            {batch.name} ({batch.class})
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400 text-xs">▼</div>
            </div>
          </div>

          <div>
            <label className={labelClasses}>পেমেন্ট মেথড</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['bkash', 'nagad', 'rocket'].map((method) => (
                <div 
                  key={method}
                  onClick={() => setFormData({...formData, paymentMethod: method})}
                  className={`cursor-pointer border rounded-xl p-3 text-center transition-all relative overflow-hidden ${
                    formData.paymentMethod === method 
                    ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-400'
                  }`}
                >
                  <p className="capitalize font-bold text-sm relative z-10">{method}</p>
                  {formData.paymentMethod === method && <div className="absolute inset-0 bg-indigo-500/10"></div>}
                </div>
              ))}
            </div>
            
            <div className="relative">
               <input
                type="text"
                name="trxId"
                value={formData.trxId}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Transaction ID (TrxID)"
              />
              <div className="absolute right-3 top-3 text-slate-500">
                <CreditCard size={18} />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-72 bg-white/5 rounded-2xl p-6 border border-white/10 h-fit backdrop-blur-sm">
        <h4 className="font-bold text-white mb-4 border-b border-white/10 pb-3">অর্ডার সামারি</h4>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">কোর্স ফি</span>
            <span className="text-slate-200 font-medium">৳{selectedCourse.price}</span>
          </div>
          <div className="flex justify-between text-sm text-emerald-400">
            <span>স্পেশাল ছাড়</span>
            <span className="font-medium">- ৳{selectedCourse.discount}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-3">
            <span>মোট</span>
            <span>৳{finalPrice}</span>
          </div>
        </div>

        <div className="bg-indigo-500/10 p-3 rounded-lg flex items-start gap-2 mb-6 border border-indigo-500/20">
          <ShieldCheck size={16} className="text-indigo-400 mt-0.5" />
          <p className="text-xs text-indigo-300 leading-tight">
            আপনার পেমেন্ট ১০০% সুরক্ষিত। পেমেন্ট সম্পন্ন করে TrxID দিন।
          </p>
        </div>

        <div className="flex gap-3 flex-col">
          <Button onClick={handleSubmit} className="w-full shadow-lg shadow-indigo-500/20">
            কনফার্ম করুন
          </Button>
          <button onClick={onCancel} className="text-sm text-slate-500 hover:text-white py-2 transition-colors">
            বাতিল করুন
          </button>
        </div>
      </div>
    </div>
  );
};
