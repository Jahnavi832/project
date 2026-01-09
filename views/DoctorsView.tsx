
import React, { useState, useEffect } from 'react';
import { HEALTH_CONCERNS, MOCK_DOCTORS, MOCK_HOSPITALS } from '../constants';
import { suggestSpecialization } from '../services/geminiService';
import { Doctor, Hospital, AppointmentType } from '../types';
import { Check, Loader2, MapPin, Video, Calendar, ArrowLeft, Star, Phone, Clock } from 'lucide-react';

const DoctorsView: React.FC = () => {
  const [mode, setMode] = useState<'select-type' | 'symptoms' | 'booking'>('select-type');
  const [appointmentType, setAppointmentType] = useState<AppointmentType | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [recommendedDoctors, setRecommendedDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingStep, setBookingStep] = useState<'doctor-selection' | 'timing' | 'confirmation'>('doctor-selection');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleProcessSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsSuggesting(true);
    const spec = await suggestSpecialization(selectedSymptoms);
    
    // Filter doctors based on AI suggestion, or show all if no match
    const filtered = MOCK_DOCTORS.filter(d => d.specialization.toLowerCase().includes(spec.toLowerCase()));
    setRecommendedDoctors(filtered.length > 0 ? filtered : MOCK_DOCTORS);
    setIsSuggesting(false);
    setMode('booking');
  };

  const handleBookDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setBookingStep('timing');
  };

  const handleConfirmBooking = () => {
    setBookingStep('confirmation');
    setTimeout(() => {
      setNotification(`Reminder: Your appointment is in 30 minutes!`);
    }, 2000);
  };

  if (mode === 'select-type') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-2xl font-bold text-slate-800">Choose Appointment Type</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => { setAppointmentType(AppointmentType.VIRTUAL); setMode('symptoms'); }}
            className="p-8 bg-white border-2 border-slate-100 rounded-3xl hover:border-blue-500 hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Video size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Virtual Appointment</h3>
            <p className="text-slate-500">Connect with expert doctors via secure video call from your home.</p>
          </button>
          <button
            onClick={() => { setAppointmentType(AppointmentType.OFFLINE); setMode('symptoms'); }}
            className="p-8 bg-white border-2 border-slate-100 rounded-3xl hover:border-emerald-500 hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">In-Person Visit</h3>
            <p className="text-slate-500">Book a visit to nearby clinics and hospitals based on your location.</p>
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'symptoms') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <button onClick={() => setMode('select-type')} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">What are your symptoms?</h1>
          <p className="text-slate-500">Select all that apply for a better recommendation.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HEALTH_CONCERNS.map(symptom => (
            <button
              key={symptom}
              onClick={() => handleSymptomToggle(symptom)}
              className={`p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                selectedSymptoms.includes(symptom) 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
              }`}
            >
              {symptom}
              {selectedSymptoms.includes(symptom) && <Check size={16} />}
            </button>
          ))}
        </div>
        <button
          disabled={selectedSymptoms.length === 0 || isSuggesting}
          onClick={handleProcessSymptoms}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSuggesting ? <Loader2 className="animate-spin" /> : 'Suggest Best Doctors'}
        </button>
      </div>
    );
  }

  if (mode === 'booking') {
    if (bookingStep === 'doctor-selection') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">Suggested Specialists</h1>
            <button onClick={() => setMode('symptoms')} className="text-blue-600 text-sm font-bold">Edit Symptoms</button>
          </div>
          <div className="space-y-4">
            {recommendedDoctors.map(doc => (
              <div key={doc.id} className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                <img src={doc.imageUrl} alt={doc.name} className="w-24 h-24 rounded-2xl object-cover bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{doc.name}</h3>
                      <p className="text-blue-600 font-semibold">{doc.specialization} • {doc.position}</p>
                    </div>
                    <div className="flex items-center bg-amber-50 text-amber-600 px-2 py-1 rounded text-sm font-bold">
                      <Star size={14} className="mr-1 fill-amber-600" /> 4.9
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Education: <span className="text-slate-700">{doc.education}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {doc.services.map(s => (
                      <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <button 
                    onClick={() => handleBookDoctor(doc)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 whitespace-nowrap"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (bookingStep === 'timing') {
      const times = ['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '05:00 PM'];
      return (
        <div className="space-y-8 max-w-2xl mx-auto">
           <button onClick={() => setBookingStep('doctor-selection')} className="flex items-center text-sm font-medium text-slate-500">
            <ArrowLeft size={16} className="mr-1" /> Back
          </button>
          
          {appointmentType === AppointmentType.OFFLINE && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="text-blue-600" /> Select Nearby Hospital
              </h3>
              <div className="grid gap-3">
                {MOCK_HOSPITALS.map(h => (
                  <button 
                    key={h.id}
                    onClick={() => setSelectedHospital(h)}
                    className={`p-4 rounded-xl border text-left transition-all ${selectedHospital?.id === h.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200'}`}
                  >
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{h.name}</span>
                      <span className="text-xs text-blue-600">{h.distance}</span>
                    </div>
                    <p className="text-sm text-slate-500">{h.address}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-blue-600" /> Select Timing
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {times.map(t => (
                <button 
                  key={t}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 font-medium text-slate-700"
                  onClick={handleConfirmBooking}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (bookingStep === 'confirmation') {
      return (
        <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center space-y-6 shadow-xl shadow-slate-200/50">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Appointment Booked!</h1>
            <p className="text-slate-500 mt-2">Your {appointmentType?.toLowerCase()} session with {selectedDoctor?.name} is confirmed.</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl text-left max-w-sm mx-auto space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Date</span>
              <span className="font-bold">Tomorrow, Oct 12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Time</span>
              <span className="font-bold">10:30 AM</span>
            </div>
            {selectedHospital && (
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="font-bold">{selectedHospital.name}</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium flex items-start gap-3">
            <Phone size={20} className="shrink-0" />
            <p className="text-left">You will receive a notification reminder 30 minutes before your appointment starts.</p>
          </div>

          <button 
            onClick={() => { setMode('select-type'); setBookingStep('doctor-selection'); }}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Back to Dashboard
          </button>

          {notification && (
            <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
               <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
                  <div className="bg-white/20 p-2 rounded-lg"><Clock size={20}/></div>
                  <p className="font-bold">{notification}</p>
               </div>
            </div>
          )}
        </div>
      );
    }
  }

  return null;
};

export default DoctorsView;
