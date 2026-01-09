
import { Doctor, Hospital, Medicine } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    position: 'Senior Consultant',
    education: 'MD, DM Cardiology - AIIMS',
    services: ['Heart checkups', 'ECG', 'BP Management'],
    experience: '15 years',
    imageUrl: 'https://picsum.photos/seed/doc1/200/200'
  },
  {
    id: 'd2',
    name: 'Dr. James Chen',
    specialization: 'Dermatology',
    position: 'Skin Specialist',
    education: 'MBBS, MD Dermatology',
    services: ['Acne Treatment', 'Laser Therapy', 'Skin Biopsy'],
    experience: '8 years',
    imageUrl: 'https://picsum.photos/seed/doc2/200/200'
  },
  {
    id: 'd3',
    name: 'Dr. Priya Sharma',
    specialization: 'Pediatrics',
    position: 'Chief Pediatrician',
    education: 'DCH, MD Pediatrics',
    services: ['Child Vaccination', 'Growth Monitoring', 'Neonatal Care'],
    experience: '12 years',
    imageUrl: 'https://picsum.photos/seed/doc3/200/200'
  },
  {
    id: 'd4',
    name: 'Dr. Michael Brown',
    specialization: 'General Physician',
    position: 'Lead Medical Officer',
    education: 'MBBS',
    services: ['Fever Treatment', 'General Consultation', 'Health Screening'],
    experience: '10 years',
    imageUrl: 'https://picsum.photos/seed/doc4/200/200'
  }
];

export const MOCK_HOSPITALS: Hospital[] = [
  { id: 'h1', name: 'City General Hospital', address: '123 Main St, Central District', distance: '1.2 km', rating: 4.5 },
  { id: 'h2', name: 'Grace Medical Center', address: '456 Oak Rd, West Side', distance: '3.5 km', rating: 4.2 },
  { id: 'h3', name: 'Lifeline Speciality Clinic', address: '789 Pine Ave, North Point', distance: '5.0 km', rating: 4.8 }
];

export const MOCK_MEDICINES: Medicine[] = [
  { id: 'm1', name: 'Paracetamol 500mg', description: 'Pain and fever relief', price: 20, category: 'Painkiller' },
  { id: 'm2', name: 'Amoxicillin 250mg', description: 'Antibiotic for infections', price: 150, category: 'Antibiotic' },
  { id: 'm3', name: 'Cetirizine 10mg', description: 'Anti-allergy medication', price: 45, category: 'Allergy' },
  { id: 'm4', name: 'Omeprazole 20mg', description: 'Acidity and heartburn relief', price: 60, category: 'Digestive' },
  { id: 'm5', name: 'Vitamin C 500mg', description: 'Immunity booster', price: 30, category: 'Supplement' }
];

export const HEALTH_CONCERNS = [
  'Fever', 'Headache', 'Skin Rash', 'Stomach Pain', 'Cough/Cold', 'Joint Pain', 'Dizziness', 'Allergies'
];
