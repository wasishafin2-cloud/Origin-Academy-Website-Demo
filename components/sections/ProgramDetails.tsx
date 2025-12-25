import React from 'react';
import { CheckCircle2, MonitorPlay, FileText, Atom, Calculator, Beaker, Dna, BookOpen, Hash, Code, Sparkles, Gift } from 'lucide-react';

export const ProgramDetails: React.FC = () => {
  const subjects = [
    { subject: 'পদার্থ বিজ্ঞান', count: '২৮', icon: Atom, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { subject: 'উচ্চতর গণিত', count: '২৬', icon: Calculator, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    { subject: 'সাধারণ গণিত', count: '২৪', icon: Hash, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { subject: 'রসায়ন', count: '১৬', icon: Beaker, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { subject: 'জীববিজ্ঞান', count: '১৬', icon: Dna, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { subject: 'ইংরেজি', count: '১২', icon: BookOpen, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { subject: 'বাংলা', count: '১০', icon: BookOpen, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { subject: 'আইসিটি', count: '০৫', icon: Code, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  ];

  const features = [
      { title: 'স্মার্ট বোর্ডে পাঠদান', desc: 'প্রতিটি ক্লাস মাল্টিমিডিয়া ও এনিমেশনের মাধ্যমে প্রাণবন্ত উপস্থাপনা।' },
      { title: 'স্ট্যান্ডার্ড প্রশ্ন', desc: 'এসএসসি বোর্ড পরীক্ষার স্ট্যান্ডার্ড প্রশ্নে পরীক্ষা (১ম পর্যায় & ২য় পর্যায়)।' },
      { title: 'স্পেশাল পরীক্ষা', desc: 'Text Book MCQ ও বিগত বছরের বোর্ড প্রশ্নের উপর বিশেষ পরীক্ষা।' },
      { title: 'বিপুল এক্সাম সংখ্যা', desc: 'ক্লাস টেস্ট (১০০+), চ্যাপ্টার ফাইনাল (১৩টি), সাবজেক্ট ফাইনাল (১৩টি)।' }
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden font-[Hind Siliguri]">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-20">
            
            {/* Left Column: Class Breakdown */}
            <div className="flex-1">
                <div className="flex items-start gap-5 mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)] shrink-0 border border-indigo-500/20">
                    <MonitorPlay size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-2">বিষয় ভিত্তিক ক্লাস</h2>
                    <p className="text-slate-400 font-medium text-lg">সর্বমোট ১৩০+ লাইভ ও রেকর্ডেড ক্লাস</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                    {subjects.map((item, idx) => (
                        <div key={idx} className={`bg-white/5 p-5 rounded-2xl shadow-sm border ${item.border} hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center backdrop-blur-sm`}>
                            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon size={22} />
                            </div>
                            <h4 className="text-slate-300 text-sm font-bold mb-1">{item.subject}</h4>
                            <span className="text-2xl font-black text-white">{item.count}<span className="text-xs text-slate-500 font-bold ml-1">টি</span></span>
                        </div>
                    ))}
                </div>

                {/* Orientation Card */}
                <div className="relative group overflow-hidden rounded-3xl shadow-xl shadow-indigo-900/20 border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl group-hover:bg-indigo-500/40 transition-colors"></div>
                    
                    <div className="relative p-1">
                        <div className="bg-white/5 backdrop-blur-sm rounded-[20px] p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="text-center sm:text-left">
                                <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1 flex items-center justify-center sm:justify-start gap-2">
                                   <Sparkles size={12} /> ওরিয়েন্টেশন ক্লাস
                                </p>
                                <p className="text-white font-black text-2xl tracking-tight">১৭ নভেম্বর, ২০২৫</p>
                            </div>
                            <div className="bg-slate-950 text-indigo-400 px-6 py-3 rounded-xl font-mono font-bold text-lg shadow-lg flex items-center gap-2 border border-indigo-500/30">
                                <span className="relative flex h-3 w-3 mr-1">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                                </span>
                                রাত ৮:০০ মি.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Exam Details */}
            <div className="flex-1">
                 <div className="flex items-start gap-5 mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)] shrink-0 border border-purple-500/20">
                    <FileText size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-2">এক্সাম ও স্পেশাল ফিচার</h2>
                    <p className="text-slate-400 font-medium text-lg">সর্বমোট ২০০+ পরীক্ষা ও মডেল টেস্ট</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-[2.5rem] shadow-xl shadow-black/20 border border-white/10 overflow-hidden backdrop-blur-sm">
                    <div className="p-8 md:p-10 space-y-8">
                        {features.map((item, idx) => (
                          <div key={idx} className="flex gap-5 group">
                             <div className="mt-1 shrink-0">
                               <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                   <CheckCircle2 size={18} />
                               </div>
                             </div>
                             <div>
                               <h4 className="font-bold text-white text-xl group-hover:text-indigo-400 transition-colors mb-2">{item.title}</h4>
                               <p className="text-slate-400 text-base leading-relaxed">{item.desc}</p>
                             </div>
                          </div>
                        ))}
                    </div>

                    {/* Bottom Promo Banner */}
                    <div className="bg-[#020617] p-8 md:p-10 text-center relative overflow-hidden border-t border-white/5">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600 rounded-full blur-[60px]"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600 rounded-full blur-[60px]"></div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/10 text-yellow-400 rotate-12">
                               <Gift size={24} />
                           </div>
                           <p className="text-indigo-200 text-sm font-bold mb-2 uppercase tracking-wide">প্রিপারেশন প্রোগ্রামে ভর্তি হলেই</p>
                           <h3 className="text-white font-bold text-lg md:text-2xl leading-tight">
                               এক্সক্লুসিভ এক্সাম ব্যাচ ও মডেল টেস্ট কোর্স 
                               <span className="block mt-2 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 drop-shadow-sm">
                                   সম্পূর্ণ ফ্রি! 🎁
                               </span>
                           </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};