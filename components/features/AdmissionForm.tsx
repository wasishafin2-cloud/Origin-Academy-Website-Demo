import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { CreditCard, Smartphone, Check, ShieldCheck } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'ssc',
    paymentMethod: 'bkash',
    trxId: ''
  });
  const [error, setError] = useState('');

  const selectedCourse = COURSES[formData.course as keyof typeof COURSES];
  const finalPrice = selectedCourse.price - selectedCourse.discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.trxId) {
      setError('অনুগ্রহ করে সব তথ্য পূরণ করুন');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      onSubmit();
    }, 500);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Form Section */}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">শিক্ষার্থীর নাম</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              placeholder="আপনার পূর্ণ নাম"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">মোবাইল নম্বর</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              placeholder="017XXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">কোর্স সিলেক্ট করুন</label>
            <div className="relative">
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none appearance-none"
              >
                <option value="ssc">SSC একাডেমিক</option>
                <option value="hsc_eng">HSC ইঞ্জিনিয়ারিং</option>
                <option value="medical">মেডিকেল এডমিশন</option>
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">▼</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">পেমেন্ট মেথড</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['bkash', 'nagad', 'rocket'].map((method) => (
                <div 
                  key={method}
                  onClick={() => setFormData({...formData, paymentMethod: method})}
                  className={`cursor-pointer border-2 rounded-xl p-2 text-center transition-all ${
                    formData.paymentMethod === method 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  <p className="capitalize font-bold text-sm">{method}</p>
                </div>
              ))}
            </div>
            
            <div className="relative">
               <input
                type="text"
                name="trxId"
                value={formData.trxId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                placeholder="Transaction ID (TrxID)"
              />
              <div className="absolute right-3 top-2.5 text-slate-400">
                <CreditCard size={20} />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-64 bg-slate-50 rounded-2xl p-5 border border-slate-200 h-fit">
        <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">অর্ডার সামারি</h4>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">কোর্স ফি</span>
            <span className="text-slate-700 font-medium">৳{selectedCourse.price}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>স্পেশাল ছাড়</span>
            <span className="font-medium">- ৳{selectedCourse.discount}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-200 pt-2">
            <span>মোট</span>
            <span>৳{finalPrice}</span>
          </div>
        </div>

        <div className="bg-indigo-100 p-3 rounded-lg flex items-start gap-2 mb-4">
          <ShieldCheck size={16} className="text-indigo-600 mt-0.5" />
          <p className="text-xs text-indigo-700 leading-tight">
            আপনার পেমেন্ট ১০০% সুরক্ষিত। পেমেন্ট সম্পন্ন করে TrxID দিন।
          </p>
        </div>

        <div className="flex gap-2 flex-col">
          <Button onClick={handleSubmit} className="w-full shadow-lg shadow-indigo-500/20">
            কনফার্ম করুন
          </Button>
          <button onClick={onCancel} className="text-sm text-slate-500 hover:text-slate-700 py-2">
            বাতিল করুন
          </button>
        </div>
      </div>
    </div>
  );
};