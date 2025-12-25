import React from 'react';
import { ArrowRight, PlayCircle, Gift, Zap, Users, Trophy, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onAdmissionClick: () => void;
  onFreeClassClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAdmissionClick, onFreeClassClick }) => {
  return (
    <section className="relative bg-slate-950 overflow-hidden font-[Hind Siliguri]">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0">
          {/* Radial Gradient Center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950"></div>
          
          {/* Animated Grid Mask */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
          
          {/* Floating Orbs */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 lg:pt-48 lg:pb-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* --- Left Content --- */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
             
             {/* Alert Badge */}
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold mb-8 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-indigo-500/20 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                নতুন ব্যাচে ভর্তি চলছে - ২০২৫ সেশন
             </div>

             <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both delay-100 drop-shadow-xl">
               তোমার স্বপ্ন জয়ের <br className="hidden lg:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                 নির্ভরযোগ্য সারথী
               </span>
             </h1>

             <p className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both delay-200">
               Origin Academy-এর আধুনিক প্রযুক্তি ও দেশসেরা মেন্টরদের গাইডলাইনে ঘরে বসেই নাও সম্পূর্ণ একাডেমিক ও এডমিশন প্রস্তুতি।
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both delay-300">
                <Button onClick={onAdmissionClick} size="lg" className="w-full sm:w-auto h-14 text-lg shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.8)] transition-all duration-300 bg-gradient-to-r from-indigo-600 to-violet-600 border border-indigo-400/20">
                  কোর্সসমূহ দেখুন <ArrowRight className="ml-2" />
                </Button>
                <Button onClick={onFreeClassClick} variant="glass" size="lg" className="w-full sm:w-auto h-14 text-lg bg-white/5 hover:bg-white/10 border-white/10 text-white backdrop-blur-md">
                   <PlayCircle className="mr-2 text-indigo-400 fill-current/20" /> ফ্রি ডেমো ক্লাস
                </Button>
             </div>
             
             {/* Trust/Social Proof */}
             <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center lg:justify-start gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both delay-500">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden ring-2 ring-white/5 relative z-0 hover:z-10 hover:scale-110 transition-transform">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 15}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white/5">
                    2k+
                  </div>
                </div>
                <div className="text-left">
                   <div className="flex text-amber-400 text-xs gap-0.5 mb-1">
                      <Zap size={12} fill="currentColor" />
                      <Zap size={12} fill="currentColor" />
                      <Zap size={12} fill="currentColor" />
                      <Zap size={12} fill="currentColor" />
                      <Zap size={12} fill="currentColor" />
                   </div>
                   <p className="text-xs text-slate-400 font-bold tracking-wide">২০০০+ শিক্ষার্থী আমাদের সাথে আছে</p>
                </div>
             </div>
          </div>

          {/* --- Right Visual (3D Mockup) --- */}
          <div className="flex-1 relative w-full perspective-[2000px] hidden lg:block h-[500px]">
             {/* The container that floats */}
             <div className="relative w-full h-full animate-float">
                
                {/* Main Glass Panel (Mock Dashboard) */}
                <div 
                    className="absolute top-10 left-10 right-0 bottom-10 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 group transition-transform duration-700 ease-out hover:[transform:rotateY(-5deg)_rotateX(5deg)] [transform:rotateY(-12deg)_rotateX(6deg)]"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Inner Content of Mockup */}
                    <div className="flex flex-col h-full gap-6 select-none pointer-events-none">
                        {/* Mock Header */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="h-2 w-20 bg-white/10 rounded-full"></div>
                        </div>
                        
                        {/* Mock Body */}
                        <div className="flex gap-6 h-full">
                             {/* Sidebar Mock */}
                             <div className="w-16 flex flex-col gap-4 items-center pt-2">
                                 <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30"></div>
                                 <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                                 <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                                 <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                             </div>
                             
                             {/* Main Area Mock */}
                             <div className="flex-1 space-y-4">
                                 {/* Video Player Placeholder */}
                                 <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-indigo-900/50 to-slate-800/50 border border-white/5 relative overflow-hidden flex items-center justify-center">
                                      <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>
                                      <PlayCircle size={48} className="text-white/50" />
                                      {/* Live Badge */}
                                      <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> LIVE
                                      </div>
                                 </div>
                                 
                                 {/* Row of cards */}
                                 <div className="flex gap-4">
                                     <div className="h-20 flex-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20"></div>
                                     <div className="h-20 flex-1 rounded-xl bg-amber-500/10 border border-amber-500/20"></div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Reflection Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 rounded-3xl pointer-events-none"></div>
                </div>

                {/* Floating Element 1: Discount Badge */}
                <div 
                    className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-bounce-slow z-30 [transform:translateZ(40px)]"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 ring-4 ring-rose-50">
                         <Gift size={24} />
                      </div>
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Limited Time</p>
                         <p className="text-2xl font-black text-slate-900">৳৩০০০ <span className="text-sm font-bold text-slate-500 line-through">৳৫৫০০</span></p>
                         <p className="text-xs font-bold text-rose-600">ছাড়!</p>
                      </div>
                   </div>
                </div>

                 {/* Floating Element 2: Success Stat */}
                 <div className="absolute top-12 -right-4 bg-[#1e293b] p-4 rounded-xl border border-slate-700 shadow-2xl flex items-center gap-3 animate-float-delayed z-20 [transform:translateZ(20px)]">
                     <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                         <Trophy size={20} />
                     </div>
                     <div>
                        <p className="text-white text-sm font-bold">৩৮ এ ২৬ GPA-5</p>
                        <p className="text-[10px] text-slate-400">গত বছরের সাফল্য</p>
                     </div>
                 </div>

             </div>
          </div>
        </div>
      </div>
      
      {/* --- Stats Strip (Integrated) --- */}
      <div className="border-t border-white/5 bg-white/[0.02] backdrop-blur-sm relative z-20">
         <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               <StatItem icon={BookOpen} value="২০০+" label="সর্বমোট এক্সাম" color="text-indigo-400" />
               <StatItem icon={PlayCircle} value="১৩০+" label="রেকর্ডেড ক্লাস" color="text-pink-400" />
               <StatItem icon={Users} value="৫০০০+" label="শিক্ষার্থী" color="text-emerald-400" />
               <StatItem icon={Zap} value="২৪/৭" label="সাপোর্ট" color="text-amber-400" />
            </div>
         </div>
      </div>
    </section>
  );
};

const StatItem = ({ icon: Icon, value, label, color }: any) => (
    <div className="flex items-center justify-center gap-4 group cursor-default">
        <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300 ${color}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-3xl font-bold text-white leading-none mb-1">{value}</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest group-hover:text-white transition-colors">{label}</p>
        </div>
    </div>
);