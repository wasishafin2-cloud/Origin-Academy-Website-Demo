import React, { useState } from 'react';
import { Menu, X, CheckCircle, Video, User as UserIcon, LogOut, Loader2, ArrowRight } from 'lucide-react';
import { ViewState } from './types';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Success } from './components/sections/Success';
import { ProgramDetails } from './components/sections/ProgramDetails';
import { Courses, courses } from './components/sections/Courses';
import { Mentors } from './components/sections/Mentors';
import { ExamPortal } from './components/features/ExamPortal';
import { StudentDashboard } from './components/features/StudentDashboard';
import { AdminDashboard } from './components/features/AdminDashboard';
import { DashboardProvider, useDashboard } from './components/features/DashboardContext';
import { Modal } from './components/ui/Modal';
import { AdmissionForm } from './components/features/AdmissionForm';
import { Button } from './components/ui/Button';

// -- Helper Components --

const Navbar: React.FC<{ 
  currentView: ViewState; 
  setView: (v: ViewState) => void; 
  onAdmissionClick: () => void;
}> = ({ currentView, setView, onAdmissionClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { role, login, logout, resetPassword, systemSettings } = useDashboard();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Login State
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Forgot Password State
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetId, setResetId] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginId, loginPass)) {
      setShowLoginModal(false);
      setView('dashboard');
      setLoginError('');
      setLoginId('');
      setLoginPass('');
    } else {
      setLoginError('ভুল আইডি অথবা পাসওয়ার্ড');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsResetting(true);
      const success = await resetPassword(resetId);
      setIsResetting(false);
      if(success) {
          setResetSuccess('OTP sent to your registered mobile number.');
      } else {
          setLoginError('User not found.');
      }
  };

  const handleLogout = () => {
    logout();
    setView('home');
    setMobileMenuOpen(false);
  };

  const NavLink = ({ view, label }: { view: ViewState; label: string }) => (
    <button
      onClick={() => {
        setView(view);
        setMobileMenuOpen(false);
      }}
      className={`text-sm font-bold transition-all px-3 py-1 rounded-full ${
        currentView === view ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-indigo-400 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden">
         {/* Top Marquee */}
        <div className="bg-indigo-950/80 text-white text-[10px] sm:text-xs py-1.5 overflow-hidden shadow-md relative z-20 border-b border-white/5 backdrop-blur-sm">
           <div className="animate-marquee whitespace-nowrap font-medium tracking-wide">
             {systemSettings.schoolName} - {systemSettings.activeSession} সেশনের ভর্তি চলছে! | ৩০০০/- টাকা ছাড়ে ভর্তি! | ওরিয়েন্টেশন: ১৭ নভেম্বর
           </div>
        </div>
        
        {/* Main Nav Glass */}
        <div className="bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-sm relative z-10">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div 
                className="flex items-center cursor-pointer group" 
                onClick={() => setView('home')}
            >
                <span className="text-3xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{systemSettings.schoolName}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <NavLink view="home" label="হোম" />
                <NavLink view="courses" label="কোর্সসমূহ" />
                <NavLink view="exam" label="অনলাইন এক্সাম" />
                <NavLink view="mentors" label="মেন্টর" />
            </div>

            <div className="hidden md:flex items-center gap-4">
                {role !== 'guest' ? (
                <>
                    <Button onClick={() => setView('dashboard')} variant="glass" size="sm" className="shadow-none border-white/20 text-white hover:bg-white/10">
                    <UserIcon size={16} className="mr-2" /> {role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                    </Button>
                    <button 
                    onClick={handleLogout}
                    className="p-2.5 rounded-full text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/20"
                    title="লগ আউট"
                    >
                    <LogOut size={20} />
                    </button>
                </>
                ) : (
                <Button onClick={() => setShowLoginModal(true)} variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/5">
                    লগিন
                </Button>
                )}
                <Button onClick={onAdmissionClick} size="sm" className="shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-none">
                ভর্তি হোন
                </Button>
            </div>

            {/* Mobile Toggle */}
            <button 
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal 
        isOpen={showLoginModal} 
        onClose={() => { 
            setShowLoginModal(false); 
            setIsForgotPassword(false); 
            setLoginError(''); 
            setResetSuccess('');
        }} 
        title={isForgotPassword ? "Reset Password" : `${systemSettings.schoolName} Login`}
      >
        {!isForgotPassword ? (
            <form onSubmit={handleLogin} className="space-y-5">
                {loginError && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 flex items-center"><X className="w-4 h-4 mr-2"/>{loginError}</div>}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">User ID / Phone</label>
                    <input 
                    type="text" 
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" 
                    placeholder="Ex: STD-001 or admin" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Password</label>
                    <input 
                    type="password" 
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" 
                    placeholder="******"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={() => setIsForgotPassword(true)} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Forgot Password?</button>
                </div>
                <Button type="submit" className="w-full shadow-lg">Login to Dashboard</Button>
                <div className="text-xs text-center text-slate-500 mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-bold mb-2 uppercase text-slate-400">Demo Credentials</p>
                    <div className="grid grid-cols-2 gap-2 text-left">
                        <p><span className="font-bold">Admin:</span> admin / admin</p>
                        <p><span className="font-bold">Teacher:</span> teacher / 123</p>
                        <p className="col-span-2"><span className="font-bold">Student:</span> STD-001 / 123</p>
                    </div>
                </div>
            </form>
        ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
                {loginError && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{loginError}</div>}
                {resetSuccess ? (
                    <div className="text-center py-6">
                        <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                        <p className="text-green-600 font-bold">OTP Sent!</p>
                        <p className="text-sm text-slate-500 mb-4">{resetSuccess}</p>
                        <Button type="button" onClick={() => setIsForgotPassword(false)} variant="outline" className="w-full">Back to Login</Button>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-slate-500 mb-4">Enter your User ID or Registered Mobile Number. We will send an OTP to reset your password.</p>
                        <div>
                            <label className="block text-sm font-medium mb-1">User ID / Mobile</label>
                            <input 
                                type="text" 
                                value={resetId}
                                onChange={(e) => setResetId(e.target.value)}
                                className="w-full border rounded-lg p-2" 
                                placeholder="STD-001 or 017..." 
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            {isResetting ? <Loader2 className="animate-spin" /> : 'Send OTP'}
                        </Button>
                        <button type="button" onClick={() => setIsForgotPassword(false)} className="w-full text-center text-sm text-slate-500 hover:text-slate-800 mt-2">Back to Login</button>
                    </>
                )}
            </form>
        )}
      </Modal>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl pt-28 px-6 animate-in slide-in-from-top duration-300 md:hidden flex flex-col gap-4 text-white">
          <Button variant="ghost" className="justify-start text-lg hover:bg-white/10" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>হোম</Button>
          <Button variant="ghost" className="justify-start text-lg hover:bg-white/10" onClick={() => { setView('courses'); setMobileMenuOpen(false); }}>কোর্সসমূহ</Button>
          <Button variant="ghost" className="justify-start text-lg hover:bg-white/10" onClick={() => { setView('exam'); setMobileMenuOpen(false); }}>অনলাইন এক্সাম</Button>
          <Button variant="ghost" className="justify-start text-lg hover:bg-white/10" onClick={() => { setView('mentors'); setMobileMenuOpen(false); }}>মেন্টর</Button>
          <div className="h-px bg-white/10 my-2"></div>
          {role !== 'guest' ? (
             <>
               <Button onClick={() => { setView('dashboard'); setMobileMenuOpen(false); }} className="w-full shadow-lg">
                 {role === 'admin' ? 'Admin Panel' : 'Dashboard'}
              </Button>
              <Button onClick={handleLogout} variant="outline" className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10">
                <LogOut size={16} className="mr-2" /> লগ আউট
              </Button>
             </>
          ) : (
             <Button onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }} variant="secondary" className="w-full">
              লগিন
            </Button>
          )}
          <Button onClick={() => { onAdmissionClick(); setMobileMenuOpen(false); }} className="w-full shadow-lg shadow-indigo-900/50 bg-indigo-600 border-none text-white">
            ভর্তি হোন
          </Button>
        </div>
      )}
    </>
  );
};

const Footer: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
  <footer className="bg-[#020617] text-white py-16 print:hidden border-t border-white/5 font-[Hind Siliguri]">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
      <div>
        <div className="flex items-center gap-2 mb-6">
            <h3 className="text-3xl font-black tracking-tight">Origin Academy</h3>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">তোমার স্বপ্নের সারথী। আধুনিক প্রযুক্তিতে শিক্ষা হোক সহজ, আনন্দময় এবং সবার জন্য উন্মুক্ত।</p>
        <div className="flex gap-4">
           {/* Social Icons */}
           <div 
             className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors text-slate-400 hover:text-white border border-white/5 hover:border-blue-500"
             onClick={() => window.open('https://facebook.com', '_blank')}
           >f</div>
           <div 
             className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors text-slate-400 hover:text-white border border-white/5 hover:border-red-500"
             onClick={() => window.open('https://youtube.com', '_blank')}
           >y</div>
         </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">কুইক লিংক</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          <li><button onClick={() => setView('dashboard')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-2"><ArrowRight size={12}/> রুটিন</button></li>
          <li><button onClick={() => setView('dashboard')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-2"><ArrowRight size={12}/> ফলাফল</button></li>
          <li><button onClick={() => setView('dashboard')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-2"><ArrowRight size={12}/> নোটিশ</button></li>
          <li><button onClick={() => setView('courses')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-2"><ArrowRight size={12}/> কোর্সসমূহ</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">যোগাযোগ</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="flex items-start gap-3">
             <span className="font-bold text-slate-300">Hotline:</span>
             <span>01746-030069<br/>01521-746635</span>
          </li>
          <li className="flex items-start gap-3">
             <span className="font-bold text-slate-300">Email:</span>
             <span>info@originacademy.online</span>
          </li>
          <li className="flex items-start gap-3">
             <span className="font-bold text-slate-300">Address:</span>
             <span>১ আ.ফা.জি পাইলট বালিকা উচ্চ বিদ্যালয়ের বিপরীত পার্শ্বে, থানা রোড, গোদাগাড়ী, রাজশাহী।</span>
          </li>
        </ul>
      </div>
       <div>
        <h4 className="font-bold mb-6 text-lg">মানচিত্র</h4>
         <div className="w-full h-32 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 text-xs border border-white/10">
            [ Google Map Placeholder ]
         </div>
      </div>
    </div>
    <div className="text-center mt-16 pt-8 border-t border-white/5 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center container mx-auto px-4">
      <p>© 2025 Origin Academy. All rights reserved.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
         <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
         <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
      </div>
    </div>
  </footer>
);

// -- Main App Content --

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Course Details State
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  const { role, currentUser } = useDashboard();

  const handleAdmissionSubmit = () => {
    setShowAdmissionModal(false);
    setSuccessMessage('আপনার ভর্তির আবেদন সফলভাবে জমা হয়েছে! শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।');
    setShowSuccessModal(true);
  };

  const selectedCourseData = courses.find(c => c.id === selectedCourseId);

  // View Routing
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero 
              onAdmissionClick={() => setShowAdmissionModal(true)} 
              onFreeClassClick={() => setShowDemoModal(true)}
            />
            <Success />
            <ProgramDetails />
            <Features />
            <Courses onDetailsClick={(id) => setSelectedCourseId(id)} />
            <Mentors />
          </>
        );
      case 'courses':
        return <Courses onDetailsClick={(id) => setSelectedCourseId(id)} />;
      case 'mentors':
        return <div className="pt-24 bg-slate-950 min-h-screen"><Mentors /></div>;
      case 'exam':
        return <div className="pt-24 bg-slate-50 min-h-screen"><ExamPortal /></div>;
      case 'dashboard':
        if (role === 'admin' || role === 'teacher') return <AdminDashboard />;
        if (role === 'student') return <StudentDashboard />;
        
        return (
          <div className="pt-32 pb-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">প্রবেশাধিকার নেই</h2>
            <p className="mb-6">ড্যাশবোর্ড দেখতে অনুগ্রহ করে লগইন করুন</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-[Hind Siliguri]">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        onAdmissionClick={() => setShowAdmissionModal(true)}
      />

      <main className="min-h-screen">
        {renderView()}
      </main>

      <Footer setView={setCurrentView} />

      {/* Modals */}

      {/* Course Details Modal */}
      <Modal isOpen={!!selectedCourseId} onClose={() => setSelectedCourseId(null)} title={selectedCourseData?.title}>
        {selectedCourseData && (
            <div className="space-y-6">
                <div className={`h-40 rounded-2xl bg-gradient-to-r ${selectedCourseData.gradient} p-8 flex flex-col justify-end text-white mb-6 shadow-lg`}>
                    <h2 className="text-3xl font-bold mb-1">{selectedCourseData.title}</h2>
                    <p className="opacity-90 text-sm font-medium">{selectedCourseData.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">কোর্স ফি</p>
                        <p className="text-2xl font-black text-indigo-600">{selectedCourseData.price}</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">ক্যাটাগরি</p>
                        <div className="flex gap-2 flex-wrap">
                            {selectedCourseData.tags.map(t => <span key={t} className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 font-bold">{t}</span>)}
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">কোর্স ফিচারসমূহ:</h4>
                    <ul className="space-y-3">
                        {selectedCourseData.features.map((f, i) => (
                            <li key={i} className="flex items-center text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                                <CheckCircle size={18} className="text-emerald-500 mr-3 shrink-0" /> {f}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button onClick={() => { setSelectedCourseId(null); setShowAdmissionModal(true); }} className="w-full shadow-lg">
                        ভর্তি হোন <ArrowRight size={16} className="ml-2" />
                    </Button>
                    <Button variant="secondary" onClick={() => setSelectedCourseId(null)} className="px-8">বন্ধ করুন</Button>
                </div>
            </div>
        )}
      </Modal>

      {/* Admission Modal */}
      <Modal isOpen={showAdmissionModal} onClose={() => setShowAdmissionModal(false)} title="ভর্তি ফর্ম">
        <AdmissionForm onSubmit={handleAdmissionSubmit} onCancel={() => setShowAdmissionModal(false)} />
      </Modal>

      {/* Demo Class Modal */}
      <Modal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} title="ফ্রি ডেমো ক্লাস">
        <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center text-white relative overflow-hidden group shadow-2xl">
          <img src="https://picsum.photos/800/450" alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="z-10 flex flex-col items-center">
             <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 cursor-pointer border border-white/50 shadow-lg">
               <Video size={36} className="text-white ml-1 fill-white" />
             </div>
             <p className="font-bold text-xl drop-shadow-md">HSC Physics: Vector (Part-1)</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-slate-600 mb-6 font-medium">আমাদের প্রিমিয়াম ক্লাসের মান যাচাই করতে ভিডিওটি দেখুন।</p>
          <Button onClick={() => setShowDemoModal(false)} variant="outline" className="w-full border-slate-200 text-slate-600 hover:text-indigo-600">বন্ধ করুন</Button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-sm border border-emerald-100">
            <CheckCircle size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">সফল হয়েছে!</h3>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto">{successMessage}</p>
          <Button onClick={() => setShowSuccessModal(false)} className="w-full shadow-lg">ঠিক আছে</Button>
        </div>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}