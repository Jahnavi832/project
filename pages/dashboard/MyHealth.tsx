
import React from 'react';
import { UserProfile } from '../../types';
import { User, Mail, Phone, MapPin, Calendar, Fingerprint, Weight, Ruler, Building, Info } from 'lucide-react';

interface MyHealthProps {
  user: UserProfile;
}

const MyHealth: React.FC<MyHealthProps> = ({ user }) => {
  const infoGroups = [
    {
      title: 'Basic Information',
      items: [
        { label: 'Full Name', value: user.name, icon: <User size={18} /> },
        { label: 'Date of Birth', value: user.dob, icon: <Calendar size={18} /> },
        { label: 'Age', value: `${user.age} Years`, icon: <Info size={18} /> },
        { label: 'Parents', value: user.parentsName, icon: <User size={18} /> },
      ]
    },
    {
      title: 'Contact Details',
      items: [
        { label: 'Email', value: user.email, icon: <Mail size={18} /> },
        { label: 'Phone', value: user.phone, icon: <Phone size={18} /> },
        { label: 'Alternative Phone', value: user.altPhone || 'N/A', icon: <Phone size={18} /> },
        { label: 'Address', value: user.address, icon: <MapPin size={18} /> },
        { label: 'District', value: user.district, icon: <Building size={18} /> },
      ]
    },
    {
      title: 'Health Vitals',
      items: [
        { label: 'Weight', value: `${user.weight} kg`, icon: <Weight size={18} /> },
        { label: 'Height', value: `${user.height} cm`, icon: <Ruler size={18} /> },
        { label: 'Aadhar', value: `xxxx-xxxx-${user.aadhar.slice(-4)}`, icon: <Fingerprint size={18} /> },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-3xl bg-teal-100 flex items-center justify-center text-teal-700 text-5xl font-bold uppercase shadow-inner">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl font-bold text-slate-800 mb-1">{user.name}</h3>
          <p className="text-teal-600 font-medium mb-4">{user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-bold border border-teal-100">
              Verified User
            </span>
            <span className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-full text-sm font-bold border border-slate-100">
              ID: {user.username}
            </span>
          </div>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-teal-100">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {infoGroups.map((group, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-6 pb-4 border-b border-slate-50 flex items-center justify-between">
              {group.title}
            </h4>
            <div className="space-y-6">
              {group.items.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                    <p className="text-sm text-slate-700 font-bold mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 flex items-start gap-4">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Info />
        </div>
        <div>
          <h4 className="font-bold text-orange-800 mb-1">Medical Disclaimer</h4>
          <p className="text-sm text-orange-700 leading-relaxed">
            HealthConnect+ is a platform to facilitate healthcare access. In case of serious medical emergencies, please visit the nearest hospital immediately or call emergency services (102/108).
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyHealth;
