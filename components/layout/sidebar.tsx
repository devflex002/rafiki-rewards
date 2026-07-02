'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Users,
  Link2,
  Wallet,
  Settings,
  Home,
  LogOut,
  Gift,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

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
    <div className="flex h-full w-64 flex-col border-r border-border bg-card">
      {/* Logo/Branding */}
      <div className="flex flex-col items-center gap-1 border-b border-border px-4 py-5">
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image src="/logo.png" alt="Rafiki Rewards Logo" fill className="object-contain" priority />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold tracking-tight text-white leading-tight">Rafiki Rewards</span>
          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Refer & Earn</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="border-t border-border px-3 py-4">
        <div className="flex items-center gap-3 rounded-md p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${user?.name?.replace(/\s+/g, '')}`} alt={user?.name || 'User'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-white leading-none mb-1">{user?.name || 'User'}</p>
            <p className="text-[10px] text-muted-foreground truncate font-mono">
              {user?.phone || 'No phone'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-3 flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors hover:bg-red-500/10 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
