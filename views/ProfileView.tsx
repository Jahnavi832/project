
import React from 'react';
import { User as UserIcon, Mail, Phone, MapPin, Fingerprint, Calendar, Weight, Ruler, ShieldCheck, HeartPulse } from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  return (
    <div className="space-y-8 pb-12">
      <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 -z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="w-32 h-32 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-blue-200">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
            <p className="text-lg text-slate-500 font-medium">@{user.username}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <span className="flex items-center gap-1 text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full"><Mail size={14}/> {user.email}</span>
              <span className="flex items-center gap-1 text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full"><Phone size={14}/> {user.phone}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Weight, label: 'Weight', value: `${user.weight} kg`, color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: Ruler, label: 'Height', value: `${user.height} cm`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { icon: Calendar, label: 'Age', value: `${user.age} Years`, color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: HeartPulse, label: 'Blood Group', value: `O+`, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}><Icon size={24}/></div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</p>
                <p className="text-xl font-bold text-slate-800">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={20} />
            <h3 className="font-bold text-slate-700">Official Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-500 flex items-center gap-2"><Fingerprint size={16}/> Aadhar Number</span>
              <span className="font-bold">**** **** {user.aadhar.slice(-4)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-500 flex items-center gap-2"><Calendar size={16}/> Date of Birth</span>
              <span className="font-bold">{user.dob}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-500 flex items-center gap-2"><MapPin size={16}/> District</span>
              <span className="font-bold">{user.district}</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <UserIcon className="text-blue-600" size={20} />
            <h3 className="font-bold text-slate-700">Family Info</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-500">Father's Name</span>
              <span className="font-bold">{user.fatherName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-500">Mother's Name</span>
              <span className="font-bold">{user.motherName}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-500">Alt. Contact</span>
              <span className="font-bold">{user.altPhone}</span>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-blue-600" /> Current Address
        </h3>
        <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl italic">
          "{user.address}"
        </p>
      </div>
    </div>
  );
};

export default ProfileView;
