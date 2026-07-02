'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen bg-zinc-950 items-center justify-center font-sans">
        <div className="flex flex-col items-center space-y-4">
          {/* Custom premium spinner */}
          <div className="w-12 h-12 rounded-full border-2 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin" />
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
            Securing Connection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
