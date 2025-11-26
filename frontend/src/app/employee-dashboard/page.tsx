
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Stethoscope, Activity, Clock, Loader2, UserPlus, FileText, Users } from 'lucide-react';
import { mockAppointments, mockUsers } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { format } from 'date-fns';

export default function DoctorDashboardPage() {
    const { user: doctor, loading } = useAuth();

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
          return `${names[0][0]}${names[1][0]}`;
        }
        return name.substring(0, 2);
    };

    if (loading) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    if (!doctor) {
        return <div className="text-center">Could not load doctor data. Please try again.</div>;
    }

    const upcomingAppointments = mockAppointments.filter(a => a.doctorName === doctor.name && new Date(a.dateTime) > new Date()).length;
    const totalPatients = 34; // mock

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Welcome, Dr. {doctor.name.split(' ').slice(1).join(' ')}!</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">in the next 7 days</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">under your care</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patient Requests</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>
         <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lab Results Pending</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Requires review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
            <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for {format(new Date(), 'PPP')}.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                         {mockAppointments.filter(a => a.doctorName === doctor.name).slice(0, 3).map(appt => (
                             <TableRow key={appt.id}>
                                <TableCell>
                                    <div className="font-medium">{appt.patientName}</div>
                                    <div className="text-sm text-muted-foreground">{appt.reason}</div>
                                </TableCell>
                                <TableCell className="text-right">{format(new Date(appt.dateTime), 'p')}</TableCell>
                            </TableRow>
                         ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
            <CardHeader>
                <CardTitle>My Patients</CardTitle>
                <CardDescription>A list of your recently seen patients.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 {mockUsers.filter(u => u.role === 'Patient').slice(0, 3).map(patient => (
                    <div className="flex items-center justify-between space-x-4" key={patient.uid}>
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={patient.avatarUrl} />
                                <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">{patient.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
