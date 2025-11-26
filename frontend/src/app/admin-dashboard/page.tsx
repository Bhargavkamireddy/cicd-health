
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, Calendar, Stethoscope, BarChart, BedDouble, Wallet } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, CartesianGrid, XAxis, YAxis, BarChart as RechartsBarChart } from 'recharts';
import { useEffect, useState } from 'react';
import { mockAppointments, mockUsers } from '@/lib/data';

const chartConfig = {
  total: {
    label: 'Appointments',
    color: 'hsl(var(--primary))',
  },
};

export default function AdminDashboardPage() {
  const [chartData, setChartData] = useState<Array<{ month: string; total: number }>>([]);

  useEffect(() => {
    // Generate chart data on the client side to avoid hydration errors
    const data = [
      { month: 'January', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'February', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'March', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'April', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'May', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'June', total: Math.floor(Math.random() * 50) + 10 },
    ];
    setChartData(data);
  }, []);

  const totalStaff = mockUsers.length;
  const pendingAppointments = mockAppointments.filter((req) => req.status === 'Pending').length;
  const availableBeds = 25; // Mock data

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
            <p className="text-xs text-muted-foreground">+5 since last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableBeds} / 50</div>
            <p className="text-xs text-muted-foreground">8 beds occupied today</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAppointments}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,430</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Monthly Appointments</CardTitle>
          <CardDescription>Number of patient appointments per month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <RechartsBarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="hsl(var(--foreground))"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                allowDecimals={false}
                stroke="hsl(var(--foreground))"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="total" fill="var(--color-total)" radius={4} />
            </RechartsBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
