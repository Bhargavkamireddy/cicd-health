import Link from 'next/link';
import { Logo } from '@/components/icons';

export function Footer() {
  return (
    <footer className="border-t border-white/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">MediSys</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MediSys. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
