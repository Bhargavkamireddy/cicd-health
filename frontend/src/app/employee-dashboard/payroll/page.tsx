
'use client';

import { Button } from '@/components/ui/button';
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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, FilePlus } from 'lucide-react';
import { mockPrescriptions } from '@/lib/data';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function DoctorPrescriptionsPage() {
    const { user } = useAuth();
    const doctorPrescriptions = user ? mockPrescriptions.filter(p => p.doctorId === user.uid) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold tracking-tight">Patient Prescriptions</h1>
         <Button><FilePlus className="mr-2"/>New Prescription</Button>
      </div>


      <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Prescription History</CardTitle>
          <CardDescription>Manage and view all issued prescriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Date Issued</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.patientName}</TableCell>
                  <TableCell>{prescription.medication}</TableCell>
                   <TableCell>
                    {format(new Date(prescription.dateIssued), 'PPP')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={prescription.status === 'Active' ? 'success' : 'secondary'}>{prescription.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Prescription for {prescription.patientName}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <p><strong>Medication:</strong> {prescription.medication}</p>
                                <p><strong>Dosage:</strong> {prescription.dosage}</p>
                                <p><strong>Instructions:</strong> {prescription.instructions}</p>
                                <p><strong>Date Issued:</strong> {format(new Date(prescription.dateIssued), 'PPP')}</p>
                                <p><strong>Status:</strong> {prescription.status}</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
