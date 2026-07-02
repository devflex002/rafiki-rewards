'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BarChart3,
  Users,
  Link2,
  Wallet,
  Settings,
  Home,
  LogOut,
  Gift,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
    : 'U';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Referrals', href: '/dashboard/referrals', icon: Users },
    { name: 'Earnings', href: '/dashboard/earnings', icon: Wallet },
    { name: 'Profile', href: '/dashboard/profile', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-40 flex h-full w-64 flex-col border-r border-border bg-card transition-transform duration-300 md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo/Branding */}
        <div className="flex flex-col items-center gap-2 border-b border-border px-4 py-6">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image src="/logo.png" alt="Rafiki Rewards Logo" fill className="object-contain" priority />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold tracking-tight text-white leading-tight">Rafiki Rewards</span>
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Refer & Earn</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'group flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                )}
              >
                <Icon className="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="border-t border-border px-4 py-5 space-y-3">
          <div className="flex items-center gap-3 rounded-lg p-3 bg-muted/40">
            <Avatar className="h-12 w-12 flex-shrink-0 ring-2 ring-primary/30">
              <AvatarImage src={`https://avatar.vercel.sh/${user?.name?.replace(/\s+/g, '')}`} alt={user?.name || 'User'} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-white leading-none mb-1">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate font-mono">
                {user?.phone || 'No phone'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-400 hover:text-red-300 transition-all duration-200 hover:bg-red-500/15 cursor-pointer group"
          >
            <LogOut className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
