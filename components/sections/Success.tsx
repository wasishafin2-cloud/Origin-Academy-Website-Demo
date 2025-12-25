
import React from 'react';
import { Trophy, Medal, Star, Crown, Sparkles, TrendingUp } from 'lucide-react';

const achievers = [
  { 
    name: 'নুসরাত জাহান', 
    marks: '১২৪০', 
    rank: '২য় (উপজেলা)', 
    school: 'গোদাগাড়ী স্কুল এন্ড কলেজ',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nusrat&backgroundColor=c0aede',
    medal: 'silver'
  },
  { 
    name: 'শরিফা খাতুন', 
    marks: '১২৪০', 
    rank: '২য় (উপজেলা)', 
    school: 'মহিশালবাড়ী মাধ্যমিক বালিকা বিদ্যালয়',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sharifa&backgroundColor=b6e3f4',
    medal: 'silver'
  },
  { 
    name: 'সাদিয়া আনিকা', 
    marks: '১২২৪', 
    rank: '৩য় (উপজেলা)', 
    school: 'গোদাগাড়ী সরকারি উচ্চ বিদ্যালয়',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anika&backgroundColor=ffdfbf',
    medal: 'bronze'
  },
  { 
    name: 'মুহতাসিম ফুয়াদ', 
    marks: '১২২০', 
    rank: '৫ম (উপজেলা)', 
    school: 'গোদাগাড়ী সরকারি উচ্চ বিদ্যালয়',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Muhtasim&backgroundColor=d1d4f9',
    medal: 'bronze'
  },
];

const StatCard = ({ icon: Icon, value, label, color }: any) => (
    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
        <div className={`p-3 rounded-full ${color} bg-opacity-20 mb-3`}>
            <Icon size={24} className={color.replace('bg-', 'text-').replace('/20', '')} />
        </div>
        <h4 className="text-3xl font-black text-white mb-1">{value}</h4>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
    </div>
);

export const Success: React.FC = () => {
  return (
    <section className="py-24 bg-[#0f172a] relative overflow-hidden font-[Hind Siliguri]">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0f172a] to-[#0f172a]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Floating Confetti (Static CSS representation) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-700"></div>
            <div className="absolute bottom-[20%] left-[30%] w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold mb-6 animate-in fade-in zoom-in duration-700">
                <Trophy size={16} />
                <span>অরিজিন মানেই নিশ্চিত সাফল্য</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
              এসএসসি ২০২৫-এ <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                রেকর্ড সংখ্যক সাফল্য
              </span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              সঠিক গাইডলাইন এবং কঠোর পরিশ্রমের মাধ্যমে আমাদের শিক্ষার্থীরা অর্জন করেছে ঈর্ষণীয় ফলাফল। অভিনন্দন সকল কৃতি শিক্ষার্থীদের।
            </p>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <StatCard icon={Crown} value="২৬ জন" label="GPA-5 প্রাপ্ত" color="text-yellow-400" />
                <StatCard icon={Star} value="৩৮ জন" label="A গ্রেড প্রাপ্ত" color="text-indigo-400" />
                <StatCard icon={Medal} value="০৭ জন" label="ট্যালেন্টপুল বৃত্তি" color="text-emerald-400" />
                <StatCard icon={TrendingUp} value="১০০%" label="পাসের হার" color="text-pink-400" />
            </div>
        </div>

        {/* Achievers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievers.map((student, idx) => (
            <div 
                key={idx} 
                className="group relative bg-white/[0.03] backdrop-blur-md rounded-[2rem] p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/0 group-hover:to-indigo-500/10 rounded-[2rem] transition-all duration-300"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar with Ring */}
                <div className="relative w-24 h-24 mb-4">
                   <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 animate-spin-slow opacity-70 blur-sm"></div>
                   <div className="absolute inset-0.5 bg-[#0f172a] rounded-full"></div>
                   <img 
                     src={student.img} 
                     alt={student.name} 
                     className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full border-2 border-white/10" 
                   />
                   <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full border-4 border-[#0f172a] shadow-lg">
                      <Medal size={16} />
                   </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{student.name}</h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-1">{student.school}</p>

                <div className="w-full bg-white/5 rounded-xl p-3 mb-4 border border-white/5">
                   <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">প্রাপ্ত নম্বর</p>
                   <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{student.marks}</p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
                    <Sparkles size={12} />
                    {student.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Note */}
        <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                <Star size={14} className="text-indigo-500" />
                আমাদের সকল কৃতি শিক্ষার্থীর পূর্ণাঙ্গ তালিকা দেখতে 
                <button className="text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-4">এখানে ক্লিক করুন</button>
            </p>
        </div>
      </div>
    </section>
  );
};
        