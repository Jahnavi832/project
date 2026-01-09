
export interface User {
  name: string;
  age: number;
  phone: string;
  aadhar: string;
  address: string;
  dob: string;
  motherName: string;
  fatherName: string;
  altPhone: string;
  district: string;
  weight: number;
  height: number;
  username: string;
  email: string;
}

export enum AppointmentType {
  VIRTUAL = 'VIRTUAL',
  OFFLINE = 'OFFLINE'
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  position: string;
  education: string;
  services: string[];
  experience: string;
  imageUrl: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface LabReport {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
  type: string;
}

export interface Appointment {
  id: string;
  doctorId?: string;
  hospitalId?: string;
  type: AppointmentType;
  date: string;
  time: string;
  symptoms: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
  prescription?: string[];
}
