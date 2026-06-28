'use client';

import { Users, DollarSign, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard, StatsGrid } from '@/components/dashboard/stat-card';
import { RecentReferrals } from '@/components/dashboard/recent-referrals';
import { EarningsChart } from '@/components/dashboard/earnings-chart';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, John! Here's your referral overview.</p>
        </div>
        <Link href="/dashboard/links">
          <Button>Create New Referral Link</Button>
        </Link>
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
            label: "Total Earnings",
            value: "$2,845.50",
            icon: DollarSign,
            trend: {
              value: 8,
              label: 'vs last week',
              direction: 'up',
            },
          },
          {
            label: "Conversion Rate",
            value: "75%",
            icon: TrendingUp,
            description: "Signup to active conversion",
          },
        ]}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
      </div>

      {/* Recent Referrals */}
      <RecentReferrals />
    </div>
  );
}
