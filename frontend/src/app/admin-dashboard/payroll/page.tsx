
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileDown, PlusCircle } from 'lucide-react';
import { mockUsers, mockBilling } from '@/lib/data';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function BillingPage() {
  const patients = mockUsers.filter((user) => user.role === 'Patient');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Billing Management</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Create New Invoice</CardTitle>
              <CardDescription>Generate a new bill for a patient.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-select">Patient</Label>
                <Select>
                  <SelectTrigger id="patient-select">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(p => (
                        <SelectItem key={p.uid} value={p.uid}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input id="amount" type="number" placeholder="e.g., 250.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-date">Date of Service</Label>
                <Input id="service-date" type="date"/>
              </div>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Generate Invoice
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>History of all generated invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBilling.map((invoice) => {
                    const patient = mockUsers.find(u => u.uid === invoice.patientId);
                    return (
                        <TableRow key={invoice.id}>
                            <TableCell>{patient?.name}</TableCell>
                            <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                             <TableCell>
                                <Badge variant={invoice.status === 'Paid' ? 'success' : 'secondary'}>{invoice.status}</Badge>
                             </TableCell>
                            <TableCell className="hidden md:table-cell">
                            {format(new Date(invoice.date), 'PPP')}
                            </TableCell>
                            <TableCell>
                            <Button variant="outline" size="icon">
                                <FileDown className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                            </Button>
                            </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
