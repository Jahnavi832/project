
import React, { useState } from 'react';
import { User } from './types';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import DoctorsView from './views/DoctorsView';
import MedicineView from './views/MedicineView';
import ReportsView from './views/ReportsView';
import ProfileView from './views/ProfileView';
import { Heart, Languages, Loader2, Mail, Lock, User as UserIcon, MapPin, Fingerprint, Calendar, Phone, Weight, Ruler } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState('English');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      // Mock login - if no user registered, create a dummy
      if (!user) {
        setUser({
          name: 'John Doe',
          age: 30,
          phone: '+91 9876543210',
          aadhar: '1234-5678-9012',
          address: '123 Health Ave, Wellness District, Green City - 560001',
          dob: '1993-05-15',
          motherName: 'Mary Doe',
          fatherName: 'Robert Doe',
          altPhone: '+91 9876543211',
          district: 'Bangalore',
          weight: 75,
          height: 180,
          username: 'johndoe',
          email: 'john@example.com'
        });
      }
      setIsLoggedIn(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const newUser: any = {};
    formData.forEach((value, key) => {
      newUser[key] = isNaN(Number(value)) ? value : Number(value);
    });
    
    setTimeout(() => {
      setUser(newUser as User);
      setIsLoggedIn(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
          <div className="bg-blue-600 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
              <Heart size={32} fill="white" />
            </div>
            <h1 className="text-2xl font-bold text-white">HealthGuard Online</h1>
            <p className="text-blue-100 opacity-80 mt-1">Your wellness, our priority</p>
          </div>

          <div className="p-8">
            {!showRegister ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-slate-800">Login</h2>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Languages size={14} />
                    <select 
                      className="bg-transparent outline-none" 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <UserIcon className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="Username" 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      required
                      type="password" 
                      placeholder="Password" 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign In'}
                </button>

                <p className="text-center text-sm text-slate-500">
                  New to HealthGuard? {' '}
                  <button type="button" onClick={() => setShowRegister(true)} className="text-blue-600 font-bold hover:underline">
                    Create Account
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
                 <div className="flex justify-between items-center mb-2 sticky top-0 bg-white z-10 py-2">
                  <h2 className="text-xl font-bold text-slate-800">Registration</h2>
                  <button type="button" onClick={() => setShowRegister(false)} className="text-slate-400 text-sm font-bold">Back to Login</button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <input name="name" required placeholder="Full Name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                       <input name="age" type="number" required placeholder="Age" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <input name="phone" required placeholder="Phone Number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                       <input name="aadhar" required placeholder="Aadhar Number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                    </div>
                    <textarea name="address" required placeholder="Full Address" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none resize-none h-20" />
                    <div className="grid grid-cols-2 gap-4">
                       <input name="dob" type="date" required placeholder="DOB" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                       <input name="district" required placeholder="District" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <input name="fatherName" required placeholder="Father's Name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                       <input name="motherName" required placeholder="Mother's Name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <input name="weight" type="number" required placeholder="Weight (kg)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                       <input name="height" type="number" required placeholder="Height (cm)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                    </div>
                    <input name="email" type="email" required placeholder="Email Address" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                    <div className="grid grid-cols-2 gap-4">
                       <input name="username" required placeholder="Username" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                       <input name="password" type="password" required placeholder="Password" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Register & Start'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      userName={user?.name || ''} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={() => setIsLoggedIn(false)}
    >
      {activeTab === 'home' && <HomeView userName={user?.name || ''} onNavigate={setActiveTab} />}
      {activeTab === 'doctors' && <DoctorsView />}
      {activeTab === 'medicines' && <MedicineView />}
      {activeTab === 'reports' && <ReportsView />}
      {activeTab === 'profile' && user && <ProfileView user={user} />}
    </Layout>
  );
};

export default App;
