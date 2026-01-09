
import React from 'react';
import { Home, Stethoscope, Pill, FileText, User, LogOut, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout, userName }) => {
  const tabs = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'doctors', name: 'Doctors', icon: Stethoscope },
    { id: 'medicines', name: 'Medicines', icon: Pill },
    { id: 'reports', name: 'Lab Reports', icon: FileText },
    { id: 'profile', name: 'My Health', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar - Desktop */}
      <nav className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-2 text-blue-600">
          <Heart className="w-8 h-8 fill-blue-600" />
          <span className="font-bold text-xl tracking-tight">HealthGuard</span>
        </div>
        
        <div className="flex-1 px-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="px-4 py-3 bg-slate-50 rounded-lg mb-2">
            <p className="text-xs text-slate-500 font-medium">LOGGED IN AS</p>
            <p className="text-sm font-bold text-slate-700 truncate">{userName}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-0 overflow-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex md:hidden justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2 text-blue-600">
            <Heart className="w-6 h-6 fill-blue-600" />
            <span className="font-bold text-lg">HealthGuard</span>
          </div>
          <button onClick={onLogout} className="text-red-500 p-2">
            <LogOut size={20} />
          </button>
        </header>

        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-3 flex justify-around items-center z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{tab.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
