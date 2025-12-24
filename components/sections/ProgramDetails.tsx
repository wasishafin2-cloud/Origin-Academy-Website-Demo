import React from 'react';
import { CheckCircle2, MonitorPlay, FileText, Atom, Calculator, Beaker, Dna, BookOpen, Hash, Code } from 'lucide-react';

export const ProgramDetails: React.FC = () => {
  const subjects = [
    { subject: 'পদার্থ বিজ্ঞান', count: '২৮', icon: Atom, color: 'text-blue-500', bg: 'bg-blue-50' },
    { subject: 'উচ্চতর গণিত', count: '২৬', icon: Calculator, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { subject: 'সাধারণ গণিত', count: '২৪', icon: Hash, color: 'text-violet-500', bg: 'bg-violet-50' },
    { subject: 'রসায়ন', count: '১৬', icon: Beaker, color: 'text-teal-500', bg: 'bg-teal-50' },
    { subject: 'জীববিজ্ঞান', count: '১৬', icon: Dna, color: 'text-pink-500', bg: 'bg-pink-50' },
    { subject: 'ইংরেজি', count: '১২', icon: BookOpen, color: 'text-orange-500', bg: 'bg-orange-50' },
    { subject: 'বাংলা', count: '১০', icon: BookOpen, color: 'text-red-500', bg: 'bg-red-50' },
    { subject: 'আইসিটি', count: '০৫', icon: Code, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  ];

  return (
    <section className="py-24 bg-slate-50 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col xl:flex-row gap-16">
            
            {/* Class Breakdown */}
            <div className="flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <MonitorPlay size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">বিষয় ভিত্তিক ক্লাস</h2>
                    <p className="text-slate-500 font-medium">সর্বমোট ১৩০+ লাইভ ও রেকর্ডেড ক্লাস</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {subjects.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition-all group">
                            <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                <item.icon size={20} />
                            </div>
                            <h4 className="text-slate-600 text-sm font-semibold mb-1">{item.subject}</h4>
                            <span className="text-2xl font-bold text-slate-800">{item.count}<span className="text-xs text-slate-400 font-normal ml-1">টি</span></span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg">
                  <div className="bg-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">ওরিয়েন্টেশন ক্লাস</p>
                      <p className="text-slate-900 font-bold text-xl">১৭ নভেম্বর, ২০২৫</p>
                    </div>
                    <div className="px-6 py-2 bg-slate-900 text-white rounded-lg font-mono font-bold animate-pulse">
                      রাত ৮:০০ মি.
                    </div>
                  </div>
                </div>
            </div>

            {/* Exam Details */}
            <div className="flex-1">
                 <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">এক্সাম ও স্পেশাল ফিচার</h2>
                    <p className="text-slate-500 font-medium">সর্বমোট ২০০+ পরীক্ষা ও মডেল টেস্ট</p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
                    
                    <ul className="space-y-6 relative z-10">
                        {[
                          { title: 'স্মার্ট বোর্ডে পাঠদান', desc: 'প্রতিটি ক্লাস মাল্টিমিডিয়া ও এনিমেশনের মাধ্যমে প্রাণবন্ত উপস্থাপনা।' },
                          { title: 'স্ট্যান্ডার্ড প্রশ্ন', desc: 'এসএসসি বোর্ড পরীক্ষার স্ট্যান্ডার্ড প্রশ্নে পরীক্ষা (১ম পর্যায় & ২য় পর্যায়)।' },
                          { title: 'স্পেশাল পরীক্ষা', desc: 'Text Book MCQ ও বিগত বছরের বোর্ড প্রশ্নের উপর বিশেষ পরীক্ষা।' },
                          { title: 'বিপুল এক্সাম সংখ্যা', desc: 'ক্লাস টেস্ট (১০০+), চ্যাপ্টার ফাইনাল (১৩টি), সাবজেক্ট ফাইনাল (১৩টি)।' }
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-4 group">
                             <div className="mt-1">
                               <CheckCircle2 className="text-green-500 group-hover:scale-110 transition-transform" size={24} />
                             </div>
                             <div>
                               <h4 className="font-bold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">{item.title}</h4>
                               <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                             </div>
                          </li>
                        ))}
                    </ul>

                    <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-center relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative z-10">
                           <p className="text-slate-400 text-sm mb-1">প্রিপারেশন প্রোগ্রামে ভর্তি হলেই</p>
                           <p className="text-white font-bold text-lg md:text-xl">এক্সক্লুসিভ এক্সাম ব্যাচ ও মডেল টেস্ট কোর্স <span className="text-yellow-400 font-black text-2xl ml-1">ফ্রি!</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};