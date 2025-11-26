
'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Check, Clock, PlusCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import { mockAppointments } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';

export default function DoctorAppointmentsPage() {
  const { user } = useAuth();
  
  const doctorAppointments = mockAppointments.filter(req => req.doctorName === user?.name);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule New
        </Button>
      </div>
      
      <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Upcoming & Past Appointments</CardTitle>
          <CardDescription>Your schedule of patient consultations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    You have no appointments scheduled.
                  </TableCell>
                </TableRow>
              ) : (
                doctorAppointments.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.patientName}</TableCell>
                    <TableCell>{format(new Date(request.dateTime), 'PPp')}</TableCell>
                    <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          request.status === 'Confirmed'
                            ? 'success'
                            : request.status === 'Cancelled'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                          {request.status === 'Confirmed' && <Check className="mr-1 h-3 w-3" />}
                          {request.status === 'Cancelled' && <X className="mr-1 h-3 w-3" />}
                          {request.status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
                          {request.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
