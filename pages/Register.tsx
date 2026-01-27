
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserProfile } from '../types';

interface RegisterProps {
  onRegister: (u: UserProfile) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<any>({
    name: '', age: '', phone: '', aadhar: '', address: '', dob: '',
    parentsName: '', altPhone: '', district: '', weight: '', height: '',
    username: '', password: '', email: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('healthConnect_registered_user', JSON.stringify(formData));
    onRegister({ ...formData, language: 'English' });
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-teal-700 mb-2">Create Your Health Profile</h1>
          <p className="text-slate-500">Fill in your details to get started with HealthConnect+</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 border-b pb-2">Personal Details</h3>
            <input name="name" placeholder="Full Name" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            <div className="flex gap-4">
              <input name="age" type="number" placeholder="Age" required onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-lg" />
              <input name="dob" type="date" placeholder="DOB" required onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-lg" />
            </div>
            <input name="parentsName" placeholder="Father/Mother Name" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            <input name="aadhar" placeholder="Aadhar Number" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            <div className="flex gap-4">
              <input name="weight" type="number" placeholder="Weight (kg)" required onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-lg" />
              <input name="height" type="number" placeholder="Height (cm)" required onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-lg" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 border-b pb-2">Contact & Location</h3>
            <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            <input name="phone" placeholder="Phone Number" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            <input name="altPhone" placeholder="Alternative Phone" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            <input name="district" placeholder="District" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            <input name="address" placeholder="Residential Address" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="md:col-span-2 space-y-4 mt-4 bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-800 border-b pb-2">Account Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="username" placeholder="Username" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg bg-white" />
              <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg bg-white" />
            </div>
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg mt-4 transition-all transform hover:scale-[1.01]">
              Complete Registration
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-slate-600">
          Already registered? <Link to="/login" className="text-teal-600 font-semibold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
