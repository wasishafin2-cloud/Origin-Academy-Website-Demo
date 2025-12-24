import React from 'react';

export const Success: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-500 text-black text-sm font-bold mb-4 animate-bounce">
                প্রথম বছরেই বাজিমাত 🚀
            </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">এসএসসি ২০২৫-এ <span className="text-yellow-400">৩৮ এ ২৬ GPA-5</span></h2>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">৪ ও ৩ জন ট্যালেন্টপুলে বৃত্তি, ১২৪০ মার্ক সহ উপজেলায় ২য়, ৩য়, ৪র্থ, ৫ম স্থান অর্জনকারী কৃতি অরিজিনিয়ান...</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'নুসরাত', marks: '১২৪০', rank: '২য় (উপজেলা)', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nusrat' },
            { name: 'শরিফা', marks: '১২৪০', rank: '২য় (উপজেলা)', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sharifa' },
            { name: 'আনিকা', marks: '১২২৪', rank: '৩য় (উপজেলা)', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anika' },
            { name: 'মুহতাসিম', marks: '১২২০', rank: '৫ম (উপজেলা)', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Muhtasim' },
          ].map((student, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-400 mb-3 bg-white overflow-hidden p-1">
                 <img src={student.img} alt={student.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-bold mb-1">{student.name}</h3>
              <p className="text-yellow-400 font-bold text-sm">প্রাপ্ত নম্বর: {student.marks}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-indigo-600/50 rounded-full text-xs border border-indigo-400/50">{student.rank}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};