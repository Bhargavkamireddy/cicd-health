
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  };
  
  if (loading || !user) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>

      <Card className="bg-white/10 border-white/20 text-white backdrop-blur-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.department} Department</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Personal Information</h3>
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input value={user.email} readOnly disabled/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="license">Medical License No.</Label>
                        <Input id="license" defaultValue="MD-12345678" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Employment Details</h3>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Input value={user.role} readOnly disabled/>
                    </div>
                    <div className="space-y-2">
                        <Label>Specialty</Label>
                        <Input value={user.department} readOnly disabled/>
                    </div>
                    <div className="space-y-2">
                        <Label>Joined Date</Label>
                        <Input value={user.joinedDate ? format(new Date(user.joinedDate), 'PPP') : ''} readOnly disabled/>
                    </div>
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
