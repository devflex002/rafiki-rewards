'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b border-border bg-background px-4 py-3 sm:px-6 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="hover:bg-muted">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
