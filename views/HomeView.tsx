
import React from 'react';
import { Calendar, Video, ShoppingBag, History, ArrowRight, User } from 'lucide-react';

interface HomeViewProps {
  userName: string;
  onNavigate: (tab: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ userName, onNavigate }) => {
  const quickActions = [
    { id: 'doctors', title: 'Offline Appointment', desc: 'Visit a doctor at nearby hospitals', icon: Calendar, color: 'bg-emerald-100 text-emerald-700', iconColor: 'text-emerald-500' },
    { id: 'doctors', title: 'Virtual Appointment', desc: 'Video call with specialists', icon: Video, color: 'bg-blue-100 text-blue-700', iconColor: 'text-blue-500' },
    { id: 'medicines', title: 'Order Medicines', desc: 'Prescription & health store', icon: ShoppingBag, color: 'bg-amber-100 text-amber-700', iconColor: 'text-amber-500' },
    { id: 'reports', title: 'Medical History', desc: 'View reports & prescriptions', icon: History, color: 'bg-purple-100 text-purple-700', iconColor: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
            <p className="text-blue-100 text-lg opacity-90">How can we help you stay healthy today?</p>
          </div>
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-all"
          >
            <User size={18} />
            View Profile
          </button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Quick Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigate(action.id)}
                className="group flex flex-col p-6 bg-white border border-slate-100 rounded-2xl text-left hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className={`p-3 rounded-xl ${action.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{action.title}</h3>
                <p className="text-sm text-slate-500 flex-1">{action.desc}</p>
                <div className="mt-4 flex items-center text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  GO TO SERVICE <ArrowRight size={14} className="ml-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Your Next Appointment</h2>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">Scheduled</span>
        </div>
        <div className="flex items-center gap-4 p-4 border border-blue-50 rounded-xl bg-blue-50/30">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            SW
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800">Dr. Sarah Wilson</h4>
            <p className="text-sm text-slate-500">Virtual Consultation • Cardiology</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-600">Tomorrow</p>
            <p className="text-sm text-slate-500">10:30 AM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
