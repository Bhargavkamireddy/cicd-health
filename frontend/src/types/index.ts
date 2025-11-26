export type UserRole = 'Admin' | 'Employee' | 'Patient';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  salary: number;
  joinedDate: string; // ISO 8601 format
  avatarUrl?: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  dateTime: string; // ISO 8601 format
  reason: string;
  status: AppointmentStatus;
}

export type BillingStatus = 'Pending' | 'Paid';

export interface Billing {
    id: string;
    patientId: string;
    amount: number;
    date: string; // ISO 8601
    status: BillingStatus;
}

export type PrescriptionStatus = 'Active' | 'Expired';

export interface Prescription {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    medication: string;
    dosage: string;
    instructions: string;
    dateIssued: string; // ISO 8601
    status: PrescriptionStatus;
}
