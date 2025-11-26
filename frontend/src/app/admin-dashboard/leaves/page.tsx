
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
import { Check, Clock, Sparkles, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { mockAppointments } from '@/lib/data';
import { format, formatDistanceToNow } from 'date-fns';

export default function AppointmentManagementPage() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const pendingAppointments = mockAppointments.filter(req => req.status === 'Pending');

  const handleSummarize = async () => {
    // This functionality would require an AI model call.
    // For now, we'll just show a placeholder.
    setIsLoading(true);
    setSummary("AI summaries for appointments are coming soon!");
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
        <Button onClick={handleSummarize} disabled={isLoading || pendingAppointments.length === 0}>
          {isLoading ? (
            <Clock className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Summarize Requests
        </Button>
      </div>

      {summary && (
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{summary}</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Pending Appointments</CardTitle>
          <CardDescription>Review and confirm new appointment requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead className="hidden md:table-cell">Reason</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No pending appointment requests.
                  </TableCell>
                </TableRow>
              ) : (
                pendingAppointments.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="font-medium">{request.patientName}</div>
                    </TableCell>
                    <TableCell>{request.doctorName}</TableCell>
                    <TableCell>
                      {format(new Date(request.dateTime), 'PPp')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-sm truncate">{request.reason}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" /> Confirm
                        </Button>
                        <Button variant="destructive" size="sm">
                           <ThumbsDown className="h-4 w-4 mr-2" /> Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Appointment History</CardTitle>
          <CardDescription>Overview of all past and upcoming appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Decided</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAppointments.filter(r => r.status !== 'Pending').map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.patientName}</TableCell>
                  <TableCell>{request.doctorName}</TableCell>
                   <TableCell>
                      {format(new Date(request.dateTime), 'PPp')}
                    </TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'Confirmed' ? 'success' : 'destructive'}>
                      {request.status === 'Confirmed' ? <Check className="mr-1 h-3 w-3" /> : <X className="mr-1 h-3 w-3" />}
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDistanceToNow(new Date(), { addSuffix: true })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
