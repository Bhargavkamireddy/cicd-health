
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Users,
  Wallet,
  CalendarCheck,
  LogOut,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin-dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
  { href: '/admin-dashboard/employees', icon: <Users className="h-5 w-5" />, label: 'Staff' },
  { href: '/admin-dashboard/payroll', icon: <Wallet className="h-5 w-5" />, label: 'Billing' },
  { href: '/admin-dashboard/leaves', icon: <CalendarCheck className="h-5 w-5" />, label: 'Appointments' },
];

function TopNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="size-7 text-primary" />
                    <span className="text-lg font-semibold text-white">MediSys</span>
                </Link>
                <nav className="hidden items-center gap-2 md:flex">
                    {navItems.map((item) => (
                        <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        )}
                        >
                        {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-auto justify-start p-2">
                        <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                            <AvatarImage src={user?.avatarUrl} />
                            <AvatarFallback>{user ? getInitials(user.name) : 'A'}</AvatarFallback>
                        </Avatar>
                        <div className="hidden text-left text-white sm:block">
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.role}</p>
                        </div>
                        <ChevronDown className="hidden size-4 text-white sm:block" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" side="bottom" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                        <LogOut className="mr-2 size-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  );
}


export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'Admin')) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-transparent">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
     <div className="min-h-screen w-full bg-transparent text-white">
        <TopNav />
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
