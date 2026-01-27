
import React, { useState, useEffect } from 'react';
import { Page, UserProfile, CartItem, Appointment } from '../types';
import { NAV_ITEMS, MOCK_MEDICINES } from '../constants';
import Home from './dashboard/Home';
import Doctors from './dashboard/Doctors';
import Medicines from './dashboard/Medicines';
import LabReports from './dashboard/LabReports';
import MyHealth from './dashboard/MyHealth';
import { LogOut, Menu, X, Bell } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Simulation for 30-min reminder
  const addAppointment = (app: Appointment) => {
    setAppointments(prev => [...prev, app]);
    
    // Simulate 30min reminder (immediately for demo purposes)
    setTimeout(() => {
      const msg = `REMINDER: Your appointment with ${app.doctorName} is in 30 minutes!`;
      setNotifications(prev => [msg, ...prev]);
      alert(msg);
    }, 5000);
  };

  const handlePrescription = (medIds: string[]) => {
    const prescribedItems = MOCK_MEDICINES
      .filter(m => medIds.includes(m.id))
      .map(m => ({ ...m, qty: 1, isPrescribed: true }));
    
    setCart(prev => {
      const newCart = [...prev];
      prescribedItems.forEach(pItem => {
        const existing = newCart.find(c => c.id === pItem.id);
        if (existing) {
          existing.qty += 1;
        } else {
          newCart.push(pItem);
        }
      });
      return newCart;
    });

    setNotifications(prev => ["Prescription received! Medicines added to your cart for 30-min delivery.", ...prev]);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home setActivePage={setActivePage} appointments={appointments} />;
      case 'doctors': return (
        <Doctors 
          onBook={addAppointment} 
          onPrescription={handlePrescription} 
          setActivePage={setActivePage}
        />
      );
      case 'medicines': return (
        <Medicines 
          cart={cart} 
          setCart={setCart} 
        />
      );
      case 'lab-reports': return <LabReports />;
      case 'my-health': return <MyHealth user={user} />;
      default: return <Home setActivePage={setActivePage} appointments={appointments} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-teal-600 text-white p-4 rounded-full shadow-lg"
      >
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-teal-700">HealthConnect+</h1>
            <p className="text-xs text-slate-400 mt-1">Personal Health Assistant</p>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id as Page);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${activePage === item.id 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-slate-600 hover:bg-slate-50'}
                `}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {activePage === 'home' && `Welcome, ${user.name}`}
              {activePage === 'doctors' && 'Consult Experts'}
              {activePage === 'medicines' && 'Medicine Shop'}
              {activePage === 'lab-reports' && 'Medical Records'}
              {activePage === 'my-health' && 'Your Profile'}
            </h2>
            <p className="text-slate-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {notifications.length > 0 && (
              <div className="relative group">
                <Bell className="text-slate-400 cursor-pointer hover:text-teal-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Notifications</h4>
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map((n, i) => (
                      <p key={i} className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">{n}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 bg-white p-2 px-4 rounded-2xl shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-slate-700">{user.name}</p>
                <p className="text-slate-400 text-xs">ID: #{user.aadhar.slice(-4)}</p>
              </div>
            </div>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
};

export default Dashboard;
