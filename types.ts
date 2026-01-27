
export interface UserProfile {
  name: string;
  age: number;
  phone: string;
  aadhar: string;
  address: string;
  dob: string;
  parentsName: string;
  altPhone: string;
  district: string;
  weight: number;
  height: number;
  username: string;
  email: string;
  language: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  education: string;
  experience: string;
  rating: number;
  image: string;
  timings: string[];
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface LabReport {
  id: string;
  name: string;
  date: string;
  url: string;
}

export interface CartItem extends Medicine {
  qty: number;
  isPrescribed?: boolean;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  type: 'virtual' | 'offline';
  time: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  prescriptionGenerated?: boolean;
}

export type Page = 'home' | 'doctors' | 'medicines' | 'lab-reports' | 'my-health';
