
import React from 'react';
import { Page, Appointment } from '../../types';
import { Video, MapPin, Pill, Clock } from 'lucide-react';

interface HomeProps {
  setActivePage: (p: Page) => void;
  appointments: Appointment[];
}

const Home: React.FC<HomeProps> = ({ setActivePage, appointments }) => {
  const actions = [
    {
      title: 'Virtual Appointment',
      desc: 'Connect with specialists via HD video call.',
      icon: <Video className="text-blue-600" size={32} />,
      color: 'bg-blue-50',
      action: () => setActivePage('doctors')
    },
    {
      title: 'Offline Appointment',
      desc: 'Find hospitals nearby and book physical visits.',
      icon: <MapPin className="text-emerald-600" size={32} />,
      color: 'bg-emerald-50',
      action: () => setActivePage('doctors')
    },
    {
      title: 'Medicine Booking',
      desc: 'Order medicines and get doorstep delivery.',
      icon: <Pill className="text-orange-600" size={32} />,
      color: 'bg-orange-50',
      action: () => setActivePage('medicines')
    },
    {
      title: 'Medical History',
      desc: 'View your previous reports and prescriptions.',
      icon: <Clock className="text-purple-600" size={32} />,
      color: 'bg-purple-50',
      action: () => setActivePage('lab-reports')
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-teal-600 p-8 md:p-12 text-white shadow-2xl shadow-teal-100">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-4xl font-extrabold mb-4 tracking-tight">Your Health, Our Priority.</h3>
          <p className="text-teal-50 text-lg mb-8 leading-relaxed">
            Access world-class healthcare from the comfort of your home. Consult with top doctors, order medicines with 30-min delivery, and manage your records seamlessly.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setActivePage('doctors')}
              className="bg-white text-teal-700 px-8 py-3.5 rounded-2xl font-bold hover:bg-teal-50 transition-all shadow-lg transform active:scale-95"
            >
              Book Consultation
            </button>
            <button 
              onClick={() => setActivePage('medicines')}
              className="bg-teal-500/30 backdrop-blur-md text-white border border-teal-400/30 px-8 py-3.5 rounded-2xl font-bold hover:bg-teal-500/50 transition-all shadow-lg transform active:scale-95"
            >
              Buy Medicines
            </button>
          </div>
        </div>
        <div className="absolute right-[-5%] top-[-10%] h-[120%] w-1/2 opacity-10 hidden lg:block">
           <Video size={400} className="rotate-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="flex flex-col text-left p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all group relative overflow-hidden"
          >
            <div className={`p-4 rounded-2xl w-fit mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                →
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
            Upcoming Appointments
            <button className="text-teal-600 text-sm font-semibold hover:underline" onClick={() => setActivePage('doctors')}>View Calendar</button>
          </h4>
          <div className="space-y-4">
            {appointments.length > 0 ? appointments.map((app) => (
              <div key={app.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 transition-colors">
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-xs ${app.type === 'virtual' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {app.type === 'virtual' ? <Video size={20} /> : <MapPin size={20} />}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-slate-800 text-sm">{app.doctorName}</h5>
                  <p className="text-xs text-slate-500 capitalize">{app.type} Consultation • {app.time}</p>
                </div>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">Confirmed</span>
              </div>
            )) : (
              <div className="text-center py-12 text-slate-400">
                <Clock className="mx-auto mb-2 opacity-20" size={40} />
                <p className="text-sm">No appointments scheduled for today.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
            <h4 className="font-bold mb-4 relative z-10 text-xl">Daily Health Tip</h4>
            <p className="text-indigo-100 text-sm mb-6 relative z-10 leading-relaxed italic">
              "Drinking a glass of water first thing in the morning helps kickstart your metabolism and flush out toxins. Stay hydrated!"
            </p>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative z-10 border border-white/20">
              Read More
            </button>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-400/30 transition-colors"></div>
          </div>
          
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-xs uppercase font-bold tracking-wider mb-1">Pulse Check</p>
              <h5 className="text-2xl font-bold">Normal</h5>
              <p className="text-emerald-100 text-sm mt-2">72 BPM</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
