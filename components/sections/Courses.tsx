import React from 'react';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Course } from '../../types';

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'SSC একাডেমিক',
    description: 'নবম-দশম শ্রেণির সম্পূর্ণ সিলেবাস কভার করার কমপ্লিট সল্যুশন।',
    price: '৳১,৫০০',
    features: ['সব বিষয়ের লাইভ ক্লাস', 'চ্যাপ্টারওয়াইজ এক্সাম', 'প্রিন্টেড লেকচার শিট', 'ডাউট সলভ সেশন'],
    tags: ['বিজ্ঞান', 'মানবিক'],
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'c2',
    title: 'HSC ইঞ্জিনিয়ারিং',
    description: 'বুয়েট, রুয়েট, কুয়েট, চুয়েট ভর্তি প্রস্তুতির স্পেশাল প্রোগ্রাম।',
    price: '৳৪,৫০০',
    features: ['উদ্ভাস এর সেরা মেন্টর', 'উইকলি মডেল টেস্ট', 'প্রশ্নব্যাংক সলভ', 'পার্সোনাল মেন্টরশিপ'],
    tags: ['Engineering', 'Varsity A'],
    gradient: 'from-indigo-600 to-violet-600'
  },
  {
    id: 'c3',
    title: 'মেডিকেল এডমিশন',
    description: 'মেডিকেল ও ডেন্টাল ভর্তি প্রস্তুতির পূর্ণাঙ্গ গাইডলাইন ও ক্লাস।',
    price: '৳৩,৫০০',
    features: ['GK & English স্পেশাল', 'প্রতিদিন এক্সাম', 'মেডিকেল স্ট্যান্ডার্ড প্রশ্ন', 'ফাইনাল মডেল টেস্ট'],
    tags: ['Medical', 'Biology'],
    gradient: 'from-emerald-500 to-teal-500'
  }
];

interface CoursesProps {
  onDetailsClick: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onDetailsClick }) => {
  return (
    <section className="py-24 bg-slate-950 relative" id="courses">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
       
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">জনপ্রিয় কোর্সসমূহ</h2>
          <p className="text-slate-400 text-lg">তোমার লক্ষ্যের সাথে মিল রেখে বেছে নাও সেরা কোর্সটি</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl shadow-black/20 border border-white/5 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-300 flex flex-col h-full group">
              <div className={`h-40 bg-gradient-to-r ${course.gradient} p-8 flex flex-col justify-between relative overflow-hidden`}>
                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                 
                 <div className="relative z-10 flex justify-between items-start">
                    <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10 flex items-center gap-1">
                        <Star size={10} className="fill-white" /> {course.tags[0]}
                    </span>
                 </div>
                 <h3 className="text-3xl font-bold text-white relative z-10">{course.title}</h3>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <p className="text-slate-400 mb-6 leading-relaxed text-sm font-medium">{course.description}</p>
                
                <div className="space-y-4 mb-8 flex-grow">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-slate-300 text-sm group/item">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 group-hover/item:text-indigo-400 transition-colors" />
                      <span className="group-hover/item:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-0.5">কোর্স ফি</span>
                    <span className="text-2xl font-black text-white tracking-tight">{course.price}</span>
                  </div>
                  <Button onClick={() => onDetailsClick(course.id)} variant="outline" size="sm" className="rounded-xl border-slate-700 text-slate-300 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white transition-all">
                    বিস্তারিত <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};