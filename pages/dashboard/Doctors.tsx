
import React, { useState } from 'react';
import { MOCK_DOCTORS, MOCK_MEDICINES } from '../../constants';
import { suggestDoctor, findNearbyHospitals } from '../../services/geminiService';
import { Video, MapPin, CheckCircle, Search, Star, Loader2, Calendar, ClipboardList, Stethoscope, PlayCircle, FileText, X, Navigation } from 'lucide-react';
import { Doctor, Appointment, Page } from '../../types';

interface DoctorsProps {
  onBook: (app: Appointment) => void;
  onPrescription: (medIds: string[]) => void;
  setActivePage: (p: Page) => void;
}

const Doctors: React.FC<DoctorsProps> = ({ onBook, onPrescription, setActivePage }) => {
  const [bookingType, setBookingType] = useState<'virtual' | 'offline' | null>(null);
  const [problems, setProblems] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiSpecialist, setAiSpecialist] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState<any[]>([]);
  const [bookingStatus, setBookingStatus] = useState<'none' | 'processing' | 'success' | 'call_simulation'>('none');

  const availableProblems = [
    'General Consultation', 'Skin Issues', 'Heart Health', 'Bone/Joint Pain', 'Digestion', 'Mental Health', 'Dental Care'
  ];

  const availableSymptoms = [
    'Fever', 'Headache', 'Cough', 'Body Pain', 'Nausea', 'Skin Rash', 'Fatigue', 'Dizziness', 'Chest Pain', 'Stomach Ache'
  ];

  const handleProblemToggle = (p: string) => {
    setProblems(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleSymptomToggle = (s: string) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const startAnalysis = async () => {
    setIsAIProcessing(true);
    setStep(2); // Show analysis/loading step

    try {
      if (bookingType === 'virtual') {
        const specialist = await suggestDoctor(problems.join(', '), symptoms);
        setAiSpecialist(specialist);
        setStep(3);
      } else {
        // Offline Hospital Booking
        const getPosition = () => {
          return new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
          });
        };

        try {
          const pos = await getPosition();
          const hospitals = await findNearbyHospitals(pos.coords.latitude, pos.coords.longitude, problems.join(', '));
          setNearbyHospitals(hospitals);
        } catch (geoError) {
          console.warn("Geolocation failed or denied, using defaults", geoError);
          // Fallback static data if geolocation fails
          setNearbyHospitals([
            { name: "Apollo City Hospital", uri: "https://www.google.com/maps/search/Apollo+Hospital", location: "City Center", specialty: problems[0] || "General" },
            { name: "Global Health Clinic", uri: "https://www.google.com/maps/search/Global+Health+Clinic", location: "2.4 km away", specialty: "Multi-specialty" },
            { name: "MediCare Plus", uri: "https://www.google.com/maps/search/Medicare", location: "Nearby District", specialty: "Emergency Care" }
          ]);
        }
        setStep(3);
      }
    } catch (error) {
      console.error("Analysis failed", error);
      // Fallback to move forward even if AI/Maps fails
      setAiSpecialist("General Physician");
      setStep(3);
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleBook = (item: any, time: string) => {
    const newApp: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorName: item.name,
      specialty: item.specialty || aiSpecialist,
      type: bookingType!,
      time: time,
      date: new Date().toLocaleDateString(),
      status: 'upcoming'
    };
    onBook(newApp);
    setBookingStatus('processing');
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  const simulateVideoCall = () => {
    setBookingStatus('call_simulation');
  };

  const endCallAndPrescribe = () => {
    const medIds = [MOCK_MEDICINES[0].id, MOCK_MEDICINES[2].id];
    onPrescription(medIds);
    setBookingStatus('none');
    setBookingType(null);
    setStep(1);
    setActivePage('medicines');
  };

  if (bookingStatus === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="relative">
          <Loader2 className="animate-spin text-teal-600 mb-6" size={64} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar size={24} className="text-teal-400" />
          </div>
        </div>
        <p className="text-slate-800 text-xl font-bold">Securing your slot...</p>
        <p className="text-slate-400 mt-2">Checking real-time availability</p>
      </div>
    );
  }

  if (bookingStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300 max-w-lg mx-auto text-center px-4">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-inner ring-8 ring-green-50">
          <CheckCircle size={56} />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4">Appointment Confirmed!</h3>
        <p className="text-slate-500 mb-10 leading-relaxed text-lg">
          We've locked in your appointment. You'll receive a message <span className="font-bold text-teal-600">30 minutes</span> before the scheduled time.
        </p>
        
        {bookingType === 'virtual' ? (
          <div className="space-y-4 w-full">
            <button 
              onClick={simulateVideoCall}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-200"
            >
              <PlayCircle /> Start Virtual Session (Now for Demo)
            </button>
            <button 
              onClick={() => { setBookingStatus('none'); setBookingType(null); setStep(1); }}
              className="w-full bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <button 
            onClick={() => { setBookingStatus('none'); setBookingType(null); setStep(1); }}
            className="bg-teal-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
          >
            Return to Home
          </button>
        )}
      </div>
    );
  }

  if (bookingStatus === 'call_simulation') {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl aspect-video bg-slate-800 rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-slate-700">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50">
             <div className="text-center">
               <div className="w-32 h-32 rounded-full bg-teal-500/20 border-2 border-teal-500 flex items-center justify-center mb-6 mx-auto animate-pulse">
                 <Video className="text-teal-400" size={64} />
               </div>
               <h2 className="text-white text-3xl font-bold mb-2">Dr. Sarah Wilson</h2>
               <p className="text-teal-400 font-medium text-lg">Connected • High Definition</p>
             </div>
          </div>
          <div className="absolute top-8 right-8 w-48 aspect-video bg-slate-700 rounded-2xl border-2 border-white/20 shadow-lg flex items-center justify-center text-white/50 text-xs overflow-hidden">
             <span className="font-bold">You</span>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8">
             <button className="w-14 h-14 rounded-full bg-slate-700/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-600 transition-colors"><ClipboardList /></button>
             <button 
               onClick={endCallAndPrescribe}
               className="px-8 sm:px-12 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-900/40 border-4 border-red-500/20"
             >
               End Call & Get Prescription
             </button>
             <button className="w-14 h-14 rounded-full bg-slate-700/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-600 transition-colors"><Stethoscope /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      {!bookingType ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom duration-500">
          <button 
            onClick={() => setBookingType('virtual')}
            className="group flex flex-col items-center p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-blue-300 hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Video size={160} />
            </div>
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
              <Video size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Online Consultation</h3>
            <p className="text-center text-slate-500 text-base leading-relaxed">
              Video call with top medical experts from home. Fast, secure, and personal.
            </p>
          </button>
          
          <button 
            onClick={() => setBookingType('offline')}
            className="group flex flex-col items-center p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-emerald-300 hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <MapPin size={160} />
            </div>
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
              <MapPin size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Hospital Booking</h3>
            <p className="text-center text-slate-500 text-base leading-relaxed">
              Book physical visits at highly-rated hospitals near your current location.
            </p>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in duration-300">
          <div className="bg-teal-700 p-8 text-white flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-3">
                {bookingType === 'virtual' ? <Video size={28} /> : <MapPin size={28} />}
                {bookingType === 'virtual' ? 'Online Consultation' : 'Hospital Appointment'}
              </h3>
              <p className="text-teal-100 text-sm mt-1">Step {step} of 3 • Health Assessment</p>
            </div>
            <button 
              onClick={() => { setBookingType(null); setStep(1); }}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {step === 1 && (
              <div className="space-y-10 animate-in slide-in-from-right duration-300">
                <section>
                  <label className="block text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <ClipboardList className="text-teal-600" /> Choose your health concern:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableProblems.map(p => (
                      <button
                        key={p}
                        onClick={() => handleProblemToggle(p)}
                        className={`px-6 py-4 rounded-2xl text-sm font-bold border-2 transition-all ${
                          problems.includes(p) 
                            ? 'bg-teal-50 border-teal-600 text-teal-700 shadow-md scale-[1.02]' 
                            : 'bg-white border-slate-100 text-slate-600 hover:border-teal-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </section>
                
                <section>
                  <label className="block text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Stethoscope className="text-teal-600" /> Select current symptoms:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {availableSymptoms.map(s => (
                      <button
                        key={s}
                        onClick={() => handleSymptomToggle(s)}
                        className={`px-5 py-3 rounded-xl text-xs font-bold border transition-all ${
                          symptoms.includes(s) 
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </section>

                <button 
                  onClick={startAnalysis}
                  disabled={problems.length === 0 || symptoms.length === 0}
                  className="w-full py-5 bg-teal-600 text-white rounded-2xl font-bold disabled:opacity-50 hover:bg-teal-700 shadow-xl shadow-teal-100 transition-all transform active:scale-95 text-lg"
                >
                  Find Available Experts
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="text-center py-20 space-y-8 animate-in fade-in duration-300">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Loader2 className="animate-spin text-teal-600 mb-6" size={80} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {bookingType === 'virtual' ? <Stethoscope size={32} className="text-teal-400" /> : <Navigation size={32} className="text-teal-400" />}
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">Processing Your Profile</h4>
                  <p className="text-slate-500 max-w-sm mx-auto mt-2 font-medium">
                    {bookingType === 'virtual' ? 'Gemini AI is analyzing symptoms to find the perfect specialist for your needs.' : 'Searching for top-rated specialized hospitals near your current location.'}
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right duration-300">
                {bookingType === 'virtual' ? (
                  <>
                    <div className="flex items-center justify-between border-b pb-4">
                      <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Top {aiSpecialist}s for you
                        <span className="bg-teal-100 text-teal-700 text-[10px] px-2 py-1 rounded-full uppercase font-black">AI Match</span>
                      </h4>
                      <Search size={24} className="text-slate-300" />
                    </div>
                    <div className="space-y-6">
                      {MOCK_DOCTORS.map(doc => (
                        <div key={doc.id} className="p-6 sm:p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:border-teal-200 transition-all group">
                          <div className="relative shrink-0">
                            <img src={doc.image} alt={doc.name} className="w-32 h-32 rounded-[2rem] object-cover shadow-lg group-hover:rotate-2 transition-transform" />
                            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border">
                              <div className="flex items-center text-amber-500 text-sm font-bold">
                                <Star size={14} className="fill-current mr-1" /> {doc.rating}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <h5 className="text-2xl font-bold text-slate-800">{doc.name}</h5>
                              <p className="text-teal-600 font-bold text-base mt-1">{doc.specialty}</p>
                              <p className="text-sm text-slate-500 mt-2 font-medium flex items-center gap-2"><FileText size={16} /> {doc.education}</p>
                            </div>
                            
                            <div className="border-t border-slate-200 pt-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Today's Available Slots</p>
                              <div className="flex flex-wrap gap-2">
                                {doc.timings.map(t => (
                                  <button 
                                    key={t}
                                    onClick={() => handleBook(doc, t)}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all shadow-sm"
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between border-b pb-4">
                      <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Nearby Specialized Hospitals
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-1 rounded-full uppercase font-black">Live Locations</span>
                      </h4>
                    </div>
                    <div className="space-y-6">
                      {nearbyHospitals.map((hosp, i) => (
                        <div key={i} className="p-6 sm:p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all border-l-4 border-l-emerald-500">
                          <div className="flex items-center gap-6 flex-1">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center shadow-inner shrink-0">
                              <MapPin size={36} />
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-xl sm:text-2xl font-bold text-slate-800 truncate">{hosp.name}</h5>
                              <div className="flex items-center gap-2 text-slate-500 text-sm mt-1 font-medium">
                                <MapPin size={16} className="shrink-0" /> <span className="truncate">{hosp.location}</span>
                              </div>
                              <div className="mt-2 flex items-center gap-3">
                                <span className="bg-white text-emerald-700 text-[10px] px-2 py-1 rounded-md font-bold border shadow-sm uppercase">{hosp.specialty || 'General Care'}</span>
                                <a href={hosp.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1">View on Map <Navigation size={12} /></a>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Fast Track Slots</p>
                            <div className="grid grid-cols-3 md:flex gap-2">
                              {['10:00 AM', '02:30 PM', '04:00 PM'].map(t => (
                                <button 
                                  key={t}
                                  onClick={() => handleBook(hosp, t)}
                                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
