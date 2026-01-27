
import React from 'react';
import { Home, User, Pill, FileText, Stethoscope, Video, MapPin, History } from 'lucide-react';
import { Doctor, Medicine } from './types';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'doctors', label: 'Doctors', icon: <Stethoscope size={20} /> },
  { id: 'medicines', label: 'Medicines', icon: <Pill size={20} /> },
  { id: 'lab-reports', label: 'Lab Reports', icon: <FileText size={20} /> },
  { id: 'my-health', label: 'My Health', icon: <User size={20} /> },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    specialty: 'Cardiologist',
    education: 'MBBS, MD (Cardiology) - AIIMS Delhi',
    experience: '12 years',
    rating: 4.9,
    image: 'https://picsum.photos/seed/doctor1/200/200',
    timings: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: '2',
    name: 'Dr. James Miller',
    specialty: 'Dermatologist',
    education: 'MBBS, MD - Stanford Medical',
    experience: '8 years',
    rating: 4.7,
    image: 'https://picsum.photos/seed/doctor2/200/200',
    timings: ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM']
  },
  {
    id: '3',
    name: 'Dr. Anita Desai',
    specialty: 'General Physician',
    education: 'MBBS, DNB - CMC Vellore',
    experience: '15 years',
    rating: 4.8,
    image: 'https://picsum.photos/seed/doctor3/200/200',
    timings: ['09:30 AM', '12:30 PM', '02:30 PM', '06:00 PM']
  }
];

export const MOCK_MEDICINES: Medicine[] = [
  {
    id: 'm1',
    name: 'Paracetamol 500mg',
    description: 'Relief from pain and fever',
    price: 45,
    image: 'https://picsum.photos/seed/med1/200/200',
    category: 'Tablets'
  },
  {
    id: 'm2',
    name: 'Amoxicillin 250mg',
    description: 'Antibiotic for bacterial infections',
    price: 120,
    image: 'https://picsum.photos/seed/med2/200/200',
    category: 'Tablets'
  },
  {
    id: 'm3',
    name: 'Vitamin D3 Drops',
    description: 'Essential for bone health',
    price: 350,
    image: 'https://picsum.photos/seed/med3/200/200',
    category: 'Supplements'
  },
  {
    id: 'm4',
    name: 'Cough Syrup',
    description: 'Soothes dry cough and throat irritation',
    price: 85,
    image: 'https://picsum.photos/seed/med4/200/200',
    category: 'Syrup'
  }
];
