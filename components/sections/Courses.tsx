import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Course } from '../../types';

const courses: Course[] = [
  {
    id: 'c1',
    title: 'SSC একাডেমিক',
    description: 'নবম-দশম শ্রেণির সম্পূর্ণ সিলেবাস কভার করার কমপ্লিট সল্যুশন।',
    price: '৳১,৫০০',
    features: ['সব বিষয়ের ক্লাস', 'চ্যাপ্টারওয়াইজ এক্সাম', 'প্রিন্টেড লেকচার শিট'],
    tags: ['বিজ্ঞান', 'মানবিক'],
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'c2',
    title: 'HSC ইঞ্জিনিয়ারিং',
    description: 'বুয়েট, রুয়েট, কুয়েট, চুয়েট ভর্তি প্রস্তুতির স্পেশাল প্রোগ্রাম।',
    price: '৳৪,৫০০',
    features: ['উদ্ভাস এর সেরা মেন্টর', 'মডেল টেস্ট', 'প্রশ্নব্যাংক সলভ'],
    tags: ['Engineering', 'Varsity A'],
    gradient: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'c3',
    title: 'মেডিকেল এডমিশন',
    description: 'মেডিকেল ও ডেন্টাল ভর্তি প্রস্তুতির পূর্ণাঙ্গ গাইডলাইন ও ক্লাস।',
    price: '৳৩,৫০০',
    features: ['GK & English ক্লাস', 'প্রতিদিন এক্সাম', 'মেডিকেল স্ট্যান্ডার্ড প্রশ্ন'],
    tags: ['Medical', 'Biology'],
    gradient: 'from-emerald-500 to-teal-400'
  }
];

interface CoursesProps {
  onDetailsClick: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onDetailsClick }) => {
  return (
    <section className="py-20 bg-slate-50" id="courses">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">জনপ্রিয় কোর্সসমূহ</h2>
          <p className="text-slate-600">তোমার লক্ষ্যের সাথে মিল রেখে বেছে নাও সেরা কোর্সটি</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
              <div className={`h-32 bg-gradient-to-r ${course.gradient} p-6 flex flex-col justify-end relative`}>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold border border-white/30">
                  {course.tags[0]}
                </div>
                <h3 className="text-2xl font-bold text-white">{course.title}</h3>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-slate-600 mb-6">{course.description}</p>
                <div className="space-y-3 mb-8 flex-grow">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-slate-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block">কোর্স ফি</span>
                    <span className="text-xl font-bold text-slate-900">{course.price}</span>
                  </div>
                  <Button onClick={() => onDetailsClick(course.id)} variant="outline" size="sm">
                    বিস্তারিত <ArrowRight className="ml-1 w-4 h-4" />
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