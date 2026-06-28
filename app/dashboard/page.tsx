'use client';

import { Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard, StatsGrid } from '@/components/dashboard/stat-card';
import { RecentReferrals } from '@/components/dashboard/recent-referrals';
import { EarningsChart } from '@/components/dashboard/earnings-chart';
import { MarketplaceOverview } from '@/components/dashboard/marketplace-overview';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, John! Here's your overview.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/marketplace">
            <Button variant="outline">Browse Marketplace</Button>
          </Link>
          <Link href="/dashboard/links">
            <Button>Create New Referral Link</Button>
          </Link>
        </div>
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
            label: "Total Earnings",
            value: "$2,845.50",
            icon: DollarSign,
            trend: {
              value: 8,
              label: 'vs last week',
              direction: 'up',
            },
          },
        ]}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
      </div>

      {/* Marketplace Overview */}
      <MarketplaceOverview />

      {/* Recent Referrals */}
      <RecentReferrals />
    </div>
  );
}
