import { User, Appointment, Billing, Prescription } from "@/types";
import { PlaceHolderImages } from "./placeholder-images";

const avatar1 = PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl;
const avatar2 = PlaceHolderImages.find(img => img.id === 'avatar-2')?.imageUrl;
const avatar3 = PlaceHolderImages.find(img => img.id === 'avatar-3')?.imageUrl;
const avatar4 = PlaceHolderImages.find(img => img.id === 'avatar-4')?.imageUrl;
const avatar5 = PlaceHolderImages.find(img => img.id === 'avatar-5')?.imageUrl;


export const mockUsers: User[] = [
  {
    uid: 'admin001',
    name: 'Dr. Admin',
    email: 'admin@medisys.health',
    role: 'Admin',
    department: 'Administration',
    salary: 150000,
    joinedDate: '2020-01-15T00:00:00Z',
    avatarUrl: avatar5,
  },
  {
    uid: 'user001',
    name: 'Dr. John Doe',
    email: 'john.doe@medisys.health',
    role: 'Employee',
    department: 'Cardiology',
    salary: 280000,
    joinedDate: '2021-06-01T00:00:00Z',
    avatarUrl: avatar1,
  },
  {
    uid: 'user002',
    name: 'Dr. Jane Smith',
    email: 'jane.smith@medisys.health',
    role: 'Employee',
    department: 'Neurology',
    salary: 310000,
    joinedDate: '2022-03-10T00:00:00Z',
    avatarUrl: avatar2,
  },
  {
    uid: 'patient001',
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    role: 'Patient',
    department: 'N/A',
    salary: 0,
    joinedDate: '2024-05-20T00:00:00Z',
    avatarUrl: avatar3,
  },
  {
    uid: 'patient002',
    name: 'Mary Williams',
    email: 'mary.williams@example.com',
    role: 'Patient',
    department: 'N/A',
    salary: 0,
    joinedDate: '2024-06-11T00:00:00Z',
    avatarUrl: avatar4,
  },
];

export const mockAppointments: Appointment[] = [
    {
        id: 'appt001',
        patientId: 'patient001',
        patientName: 'Peter Jones',
        doctorName: 'Dr. John Doe',
        dateTime: '2024-08-10T10:00:00Z',
        reason: 'Follow-up consultation for chest pain.',
        status: 'Pending',
    },
    {
        id: 'appt002',
        patientId: 'patient002',
        patientName: 'Mary Williams',
        doctorName: 'Dr. Jane Smith',
        dateTime: '2024-07-25T14:30:00Z',
        reason: 'Initial consultation for recurring headaches.',
        status: 'Confirmed',
    },
    {
        id: 'appt003',
        patientId: 'patient001',
        patientName: 'Peter Jones',
        doctorName: 'Dr. John Doe',
        dateTime: '2024-08-01T09:00:00Z',
        reason: 'Pre-surgery check-up.',
        status: 'Confirmed',
    },
    {
        id: 'appt004',
        patientId: 'patient002',
        patientName: 'Mary Williams',
        doctorName: 'Dr. Jane Smith',
        dateTime: '2024-07-20T11:00:00Z',
        reason: 'Patient cancelled.',
        status: 'Cancelled',
    },
];

export const mockBilling: Billing[] = [
    {
        id: 'bill001',
        patientId: 'patient001',
        amount: 250.00,
        date: '2024-07-01T00:00:00Z',
        status: 'Paid',
    },
    {
        id: 'bill002',
        patientId: 'patient002',
        amount: 400.00,
        date: '2024-07-03T00:00:00Z',
        status: 'Pending',
    },
    {
        id: 'bill003',
        patientId: 'patient001',
        amount: 150.00,
        date: '2024-06-15T00:00:00Z',
        status: 'Paid',
    }
];


export const mockPrescriptions: Prescription[] = [
    {
        id: 'presc001',
        patientId: 'patient001',
        patientName: 'Peter Jones',
        doctorId: 'user001',
        medication: 'Lisinopril',
        dosage: '10mg',
        instructions: 'Take one tablet daily in the morning.',
        dateIssued: '2024-07-01T00:00:00Z',
        status: 'Active',
    },
     {
        id: 'presc002',
        patientId: 'patient002',
        patientName: 'Mary Williams',
        doctorId: 'user002',
        medication: 'Sumatriptan',
        dosage: '50mg',
        instructions: 'Take one tablet at the onset of a migraine.',
        dateIssued: '2024-07-03T00:00:00Z',
        status: 'Active',
    },
    {
        id: 'presc003',
        patientId: 'patient001',
        patientName: 'Peter Jones',
        doctorId: 'user001',
        medication: 'Aspirin',
        dosage: '81mg',
        instructions: 'Take one tablet daily.',
        dateIssued: '2024-06-01T00:00:00Z',
        status: 'Expired',
    }
];
