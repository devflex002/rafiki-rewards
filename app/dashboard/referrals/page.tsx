'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReferralsTable } from '@/components/referrals/referrals-table';
import { StatsGrid } from '@/components/dashboard/stat-card';
import { Search, Download, Users, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function ReferralsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalReferrals = user?.referrals?.length ?? 0;
  const activeReferrals = user?.referrals?.filter((r) => r.status === 'Active')?.length ?? 0;
  const conversionRate = totalReferrals > 0 ? Math.round((activeReferrals / totalReferrals) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Referrals</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your referrals
          </p>
        </div>
        <Button variant="outline" size="lg" className="gap-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid
        cards={[
          {
            label: "Total Referrals",
            value: totalReferrals.toString(),
            icon: Users,
            trend: {
              value: totalReferrals > 0 ? 100 : 0,
              label: 'live tracking',
              direction: 'up',
            },
          },
          {
            label: "Active Referrals",
            value: activeReferrals.toString(),
            icon: UserCheck,
            description: `${conversionRate}% conversion rate`,
          },
        ]}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search referrals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-950 border-zinc-800 focus-visible:ring-purple-600 h-10 text-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-zinc-950 border-zinc-800 text-sm h-10">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-850 text-zinc-200">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Referrals Table */}
      <ReferralsTable searchTerm={searchTerm} statusFilter={statusFilter} />
    </div>
  );
}
