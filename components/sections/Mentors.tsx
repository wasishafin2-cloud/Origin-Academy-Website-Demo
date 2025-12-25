import React from 'react';
import { Mentor } from '../../types';
import { Facebook, Linkedin, Youtube, GraduationCap } from 'lucide-react';

const mentors: Mentor[] = [
  {
    id: 'm1',
    name: 'আশাদুজ্জামান শুভ',
    institution: 'রাজশাহী বিশ্ববিদ্যালয়',
    subject: 'পদার্থ ও উচ্চতর গণিত',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shuvo'
  },
  {
    id: 'm2',
    name: 'মাজহারুল ইসলাম',
    institution: 'রাজশাহী বিশ্ববিদ্যালয়',
    subject: 'সাধারণ গণিত ও ICT',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mazharul'
  },
  {
    id: 'm3',
    name: 'নঈম সিদ্দিকী',
    institution: 'RUET (রুয়েট)',
    subject: 'রসায়ন ও উচ্চতর গণিত',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naim'
  },
  {
    id: 'm4',
    name: 'খাইরুল বাসার',
    institution: 'রাজশাহী মেডিকেল',
    subject: 'জীববিজ্ঞান',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khairul'
  },
  {
    id: 'm5',
    name: 'মোস্তাক আহমেদ মিনহাজ',
    institution: 'শেরেবাংলা কৃষি',
    subject: 'ইংরেজি',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minhaj'
  }
];

export const Mentors: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B1121]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-indigo-400 font-bold tracking-wider text-sm uppercase mb-2 block">Top Tier Mentors</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">আমাদের কোর্স ইন্সট্রাক্টর</h2>
          <p className="text-slate-400 text-lg">দেশসেরা ভার্সিটির অভিজ্ঞ ভাইয়াদের গাইডলাইনে হবে তোমার একাডেমিক ও এডমিশন প্রস্তুতি</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="relative group">
              <div className="absolute inset-0 bg-indigo-600 rounded-3xl rotate-6 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              
              <div className="relative bg-slate-900 p-6 rounded-3xl border border-white/5 shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center group-hover:border-indigo-500/30">
                
                {/* Image Container */}
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="relative w-full h-full rounded-full border-4 border-slate-800 shadow-md object-cover z-10 bg-slate-800"
                  />
                  <div className="absolute bottom-0 right-0 z-20 bg-slate-800 p-1.5 rounded-full shadow-md border border-slate-700">
                    <GraduationCap size={16} className="text-indigo-400" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4 flex-grow">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{mentor.name}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold border border-indigo-500/20 mb-2">
                    {mentor.subject}
                  </div>
                  <p className="text-slate-400 text-sm font-medium">{mentor.institution}</p>
                </div>

                {/* Social Links (Hidden initially, show on hover) */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                    <Facebook size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-colors">
                    <Linkedin size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-colors">
                    <Youtube size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};