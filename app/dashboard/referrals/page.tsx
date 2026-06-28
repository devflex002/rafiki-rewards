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
import { ReferralStats } from '@/components/referrals/referral-stats';
import { StatCard, StatsGrid } from '@/components/dashboard/stat-card';
import { Search, Download, Users, TrendingUp, Target } from 'lucide-react';

export default function ReferralsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
        <Button variant="outline" size="lg" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid
        cards={[
          {
            label: "Total Referrals",
            value: "24",
            icon: Users,
            trend: {
              value: 12,
              label: 'this month',
              direction: 'up',
            },
          },
          {
            label: "Active Referrals",
            value: "18",
            icon: Target,
            description: "Members actively using platform",
          },
          {
            label: "Conversion Rate",
            value: "75%",
            icon: TrendingUp,
            trend: {
              value: 5,
              label: 'vs last month',
              direction: 'up',
            },
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
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Referrals Table */}
      <ReferralsTable />
    </div>
  );
}
