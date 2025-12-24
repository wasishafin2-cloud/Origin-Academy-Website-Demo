import React from 'react';
import { User, Book, Calendar, LogOut, Bell, LayoutDashboard, FileText, Activity } from 'lucide-react';
import { Button } from '../ui/Button';

interface DashboardProps {
  user: { name: string; id: string };
  onLogout: () => void;
}

const QuickAction: React.FC<{ icon: any; label: string; color: string }> = ({ icon: Icon, label, color }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
    <div className={`w-12 h-12 rounded-full ${color} bg-opacity-10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
    <span className="text-sm font-semibold text-slate-700">{label}</span>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-lg border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                     <User size={40} className="text-slate-400" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
             </div>
             <div>
                <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                <p className="text-slate-500 font-mono text-sm">ID: {user.id}</p>
                <div className="flex items-center gap-2 mt-2">
                   <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">Student</span>
                   <span className="px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 text-xs font-bold border border-yellow-100">Premium</span>
                </div>
             </div>
          </div>
          <Button onClick={onLogout} variant="outline" size="sm" className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
            <LogOut size={16} className="mr-2" /> লগ আউট
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Dashboard Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Enrolled Course Card */}
                <div className="rounded-3xl p-6 bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                         <Book className="text-white" size={24} />
                       </div>
                       <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium">Running</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">SSC একাডেমিক প্রোগ্রাম</h3>
                    <p className="text-blue-100 text-sm mb-4">ব্যাচ: ২০২৫ | সায়েন্স</p>
                    <div className="w-full bg-black/20 rounded-full h-1.5 mb-2">
                       <div className="bg-white h-1.5 rounded-full w-[65%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                    </div>
                    <p className="text-xs text-blue-100 text-right">৬৫% সম্পন্ন</p>
                  </div>
                </div>

                {/* Next Live Class Card */}
                <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-teal-500/20 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                   <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                         <Calendar className="text-white" size={24} />
                       </div>
                       <span className="bg-red-500 px-2 py-1 rounded text-xs font-bold animate-pulse">LIVE</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">পদার্থবিজ্ঞান ১ম পত্র</h3>
                    <p className="text-emerald-100 text-sm mb-6">ভেক্টর: পর্ব-৩ (Live Solve)</p>
                    <Button variant="glass" size="sm" className="w-full justify-center">
                       ক্লাসে জয়েন করুন
                    </Button>
                  </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-6 text-lg">কুইক অ্যাকশন</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <QuickAction icon={LayoutDashboard} label="রুটিন" color="bg-blue-500" />
                  <QuickAction icon={FileText} label="এক্সাম" color="bg-purple-500" />
                  <QuickAction icon={Activity} label="ফলাফল" color="bg-orange-500" />
                  <QuickAction icon={User} label="প্রোফাইল" color="bg-pink-500" />
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             {/* Notice Board */}
             <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                  <Bell className="mr-2 text-yellow-500" /> নোটিশ বোর্ড
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-indigo-500 hover:bg-slate-100 transition">
                    <span className="text-xs font-bold text-slate-400 block mb-1">১২ অক্টো, ২০২৪</span>
                    <p className="text-sm font-medium text-slate-800">আগামীকাল পদার্থবিজ্ঞান পরীক্ষা অনুষ্ঠিত হবে। প্রস্তুতি নিন।</p>
                  </div>
                   <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-yellow-500 hover:bg-slate-100 transition">
                    <span className="text-xs font-bold text-slate-400 block mb-1">১০ অক্টো, ২০২৪</span>
                    <p className="text-sm font-medium text-slate-800">কোর্স ফি পরিশোধের শেষ তারিখ ১৫ অক্টোবর।</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-green-500 hover:bg-slate-100 transition">
                    <span className="text-xs font-bold text-slate-400 block mb-1">০৮ অক্টো, ২০২৪</span>
                    <p className="text-sm font-medium text-slate-800">নতুন রুটিন প্রকাশ করা হয়েছে। ড্যাশবোর্ড দেখুন।</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-6">সব নোটিশ দেখুন</Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};