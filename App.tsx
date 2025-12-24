import React, { useState } from 'react';
import { Menu, X, CheckCircle, Video, User as UserIcon } from 'lucide-react';
import { ViewState } from './types';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Success } from './components/sections/Success';
import { ProgramDetails } from './components/sections/ProgramDetails';
import { Courses } from './components/sections/Courses';
import { Mentors } from './components/sections/Mentors';
import { ExamPortal } from './components/features/ExamPortal';
import { Dashboard } from './components/features/Dashboard';
import { Modal } from './components/ui/Modal';
import { AdmissionForm } from './components/features/AdmissionForm';
import { Button } from './components/ui/Button';

// -- Helper Components for App Structure --

const Navbar: React.FC<{ 
  currentView: ViewState; 
  setView: (v: ViewState) => void; 
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onAdmissionClick: () => void;
}> = ({ currentView, setView, isLoggedIn, onLoginClick, onAdmissionClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({ view, label }: { view: ViewState; label: string }) => (
    <button
      onClick={() => {
        setView(view);
        setMobileMenuOpen(false);
      }}
      className={`text-sm font-semibold transition-colors ${
        currentView === view ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="bg-indigo-900 text-white text-xs py-1 overflow-hidden">
           <div className="animate-marquee whitespace-nowrap">
             SSC'26 প্রিপারেশন ব্যাচে ভর্তি চলছে! | প্রথম বছরেই বাজিমাত - ৩০০০/- টাকা ছাড়ে ভর্তি! | ওরিয়েন্টেশন: ১৭ নভেম্বর
           </div>
        </div>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('home')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold">
              OA
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">Origin<span className="text-indigo-600">Academy</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink view="home" label="হোম" />
            <NavLink view="courses" label="কোর্সসমূহ" />
            <NavLink view="exam" label="অনলাইন এক্সাম" />
            <NavLink view="mentors" label="মেন্টর" />
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Button onClick={() => setView('dashboard')} variant="secondary" size="sm">
                <UserIcon size={16} className="mr-2" /> ড্যাশবোর্ড
              </Button>
            ) : (
              <Button onClick={onLoginClick} variant="secondary" size="sm">
                লগিন
              </Button>
            )}
            <Button onClick={onAdmissionClick} size="sm" className="shadow-lg shadow-indigo-500/20">
              ভর্তি হোন
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 animate-in slide-in-from-top duration-300 md:hidden flex flex-col gap-6">
          <NavLink view="home" label="হোম" />
          <NavLink view="courses" label="কোর্সসমূহ" />
          <NavLink view="exam" label="অনলাইন এক্সাম" />
          <NavLink view="mentors" label="মেন্টর" />
          <hr className="border-slate-100" />
          {isLoggedIn ? (
             <Button onClick={() => { setView('dashboard'); setMobileMenuOpen(false); }} className="w-full">
              ড্যাশবোর্ড
            </Button>
          ) : (
             <Button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} variant="secondary" className="w-full">
              লগিন
            </Button>
          )}
          <Button onClick={() => { onAdmissionClick(); setMobileMenuOpen(false); }} className="w-full">
            ভর্তি হোন
          </Button>
        </div>
      )}
    </>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-white py-12">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Origin Academy</h3>
        <p className="text-slate-400 text-sm">তোমার স্বপ্নের সারথী। আধুনিক প্রযুক্তিতে শিক্ষা হোক সহজ ও আনন্দময়।</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">কুইক লিংক</h4>
        <ul className="space-y-2 text-slate-400 text-sm">
          <li><a href="#" className="hover:text-white">রুটিন</a></li>
          <li><a href="#" className="hover:text-white">ফলাফল</a></li>
          <li><a href="#" className="hover:text-white">নোটিশ</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">যোগাযোগ</h4>
        <ul className="space-y-2 text-slate-400 text-sm">
          <li>Hotline: 01746-030069, 01521-746635</li>
          <li>Email: info@originacademy.online</li>
          <li>ঠিকানা: ১ আ.ফা.জি পাইলট বালিকা উচ্চ বিদ্যালয়ের বিপরীত পার্শ্বে, থানা রোড, গোদাগাড়ী, রাজশাহী।</li>
        </ul>
      </div>
       <div>
        <h4 className="font-bold mb-4">সোশ্যাল</h4>
         <div className="flex gap-4">
           {/* Mock Social Icons */}
           <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">f</div>
           <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition">y</div>
         </div>
      </div>
    </div>
    <div className="text-center mt-12 pt-8 border-t border-slate-800 text-slate-500 text-sm">
      © 2025 Origin Academy. All rights reserved.
    </div>
  </footer>
);

// -- Main App --

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Login Form State
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === 'student' && loginPass === '1234') {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setCurrentView('dashboard');
      setLoginError('');
      setLoginId('');
      setLoginPass('');
    } else {
      setLoginError('ভুল আইডি অথবা পাসওয়ার্ড');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  const handleAdmissionSubmit = () => {
    setShowAdmissionModal(false);
    setSuccessMessage('আপনার ভর্তির আবেদন সফলভাবে জমা হয়েছে! শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।');
    setShowSuccessModal(true);
  };

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
            <Courses onDetailsClick={() => setCurrentView('courses')} />
            <Mentors />
          </>
        );
      case 'courses':
        return <Courses onDetailsClick={(id) => console.log('Details', id)} />;
      case 'mentors':
        return <div className="pt-24"><Mentors /></div>;
      case 'exam':
        return <div className="pt-24"><ExamPortal /></div>;
      case 'dashboard':
        return isLoggedIn ? (
          <Dashboard 
            user={{ name: 'Demo Student', id: 'STD-202501' }} 
            onLogout={handleLogout} 
          />
        ) : (
          <div className="pt-32 pb-20 text-center">
            <h2 className="text-2xl font-bold mb-4">প্রবেশাধিকার নেই</h2>
            <p className="mb-6">ড্যাশবোর্ড দেখতে অনুগ্রহ করে লগইন করুন</p>
            <Button onClick={() => setShowLoginModal(true)}>লগিন করুন</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[Hind Siliguri]">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onAdmissionClick={() => setShowAdmissionModal(true)}
      />

      <main className="min-h-screen">
        {renderView()}
      </main>

      <Footer />

      {/* Modals */}
      
      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="স্টুডেন্ট লগিন">
        <form onSubmit={handleLogin} className="space-y-4">
          {loginError && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{loginError}</div>}
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input 
              type="text" 
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full border rounded-lg p-2" 
              placeholder="Ex: student" 
            />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Password</label>
             <input 
              type="password" 
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              className="w-full border rounded-lg p-2" 
              placeholder="Ex: 1234"
            />
          </div>
          <Button type="submit" className="w-full">লগিন</Button>
          <p className="text-xs text-center text-slate-400 mt-4">Demo Credentials: student / 1234</p>
        </form>
      </Modal>

      {/* Admission Modal */}
      <Modal isOpen={showAdmissionModal} onClose={() => setShowAdmissionModal(false)} title="ভর্তি ফর্ম">
        <AdmissionForm onSubmit={handleAdmissionSubmit} onCancel={() => setShowAdmissionModal(false)} />
      </Modal>

      {/* Demo Class Modal */}
      <Modal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} title="ফ্রি ডেমো ক্লাস">
        <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-white relative overflow-hidden group">
          <img src="https://picsum.photos/800/450" alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="z-10 flex flex-col items-center">
             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300 cursor-pointer border border-white/50">
               <Video size={32} className="text-white ml-1" />
             </div>
             <p className="font-bold text-lg">HSC Physics: Vector (Part-1)</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-slate-600 mb-4">আমাদের প্রিমিয়াম ক্লাসের মান যাচাই করতে ভিডিওটি দেখুন।</p>
          <Button onClick={() => setShowDemoModal(false)} variant="outline" className="w-full">বন্ধ করুন</Button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">সফল হয়েছে!</h3>
          <p className="text-slate-600 mb-6">{successMessage}</p>
          <Button onClick={() => setShowSuccessModal(false)} className="w-full">ঠিক আছে</Button>
        </div>
      </Modal>
    </div>
  );
}