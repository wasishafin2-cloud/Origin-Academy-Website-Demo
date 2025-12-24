import React from 'react';
import { ArrowRight, PlayCircle, Atom, Dna, Sparkles, Gift } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onAdmissionClick: () => void;
  onFreeClassClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAdmissionClick, onFreeClassClick }) => {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Deep Curved Gradient Background */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white pt-32 pb-48 lg:pt-48 lg:pb-64 rounded-b-[3rem] lg:rounded-b-[5rem] shadow-2xl">
        
        {/* Floating Scientific Elements */}
        <div className="absolute top-20 left-10 opacity-10 animate-spin-slow pointer-events-none">
          <Atom size={180} />
        </div>
        <div className="absolute bottom-32 right-10 opacity-10 animate-float-delayed pointer-events-none">
          <Dna size={150} />
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-pulse pointer-events-none">
          <Sparkles size={60} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Content Side */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 text-sm font-semibold mb-8 animate-fade-in-up">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
                ভর্তি চলছে... ৩০০০/- ছাড়ে!
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight font-[Hind Siliguri]">
                SSC'26 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                   প্রিপারেশন ব্যাচ
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-blue-100 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed opacity-90">
                প্রিপারেশন প্রোগ্রামে ভর্তি হলেই এক্সক্লুসিভ এক্সাম ব্যাচ ও মডেল টেস্ট কোর্স একদম <span className="text-yellow-400 font-bold">ফ্রি!</span>
              </p>
              
              <p className="text-md text-slate-300 mb-10 font-mono">
                 ওরিয়েন্টেশন: ১৭ নভেম্বর, ২০২৫
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button onClick={onAdmissionClick} size="lg" variant="accent" className="w-full sm:w-auto group">
                  এখনই ভর্তি হোন
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button onClick={onFreeClassClick} size="lg" variant="glass" className="w-full sm:w-auto">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  ফ্রি ক্লাস করুন
                </Button>
              </div>
            </div>

            {/* Image Side - Updated visual */}
            <div className="flex-1 relative hidden lg:block">
              <div className="relative z-10 animate-float">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-40"></div>
                {/* Replaced generic image with a more conceptual 'Preparation' visual or student */}
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl transform rotate-2">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white text-center">
                        <Gift className="mx-auto mb-4 text-yellow-400" size={48} />
                        <h3 className="text-2xl font-bold mb-2">স্পেশাল অফার</h3>
                        <p className="mb-4">কোর্স ফি-তে বিশাল ছাড়!</p>
                        <div className="text-4xl font-bold text-yellow-300 mb-2">৳৩০০০/-</div>
                        <p className="text-sm opacity-80">পর্যন্ত ছাড়</p>
                    </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold">বিগত বছরের সাফল্য</p>
                    <p className="text-lg font-bold text-slate-800">৩৮ এ ২৬ GPA-5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section Overlay */}
      <div className="container mx-auto px-4 -mt-20 lg:-mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-1">১৩০+</h3>
              <p className="text-slate-500 font-medium">বিষয় ভিত্তিক ক্লাস</p>
            </div>
            <div className="text-center pl-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-1">২০০+</h3>
              <p className="text-slate-500 font-medium">সর্বমোট পরীক্ষা</p>
            </div>
            <div className="text-center pl-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-1">স্মার্ট</h3>
              <p className="text-slate-500 font-medium">বোর্ডে পাঠদান</p>
            </div>
            <div className="text-center pl-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-1">৩৮/২৬</h3>
              <p className="text-slate-500 font-medium">গত বছরের GPA-5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};