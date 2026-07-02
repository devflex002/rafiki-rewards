'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EarningsOverview } from '@/components/earnings/earnings-overview';
import { PaymentHistory } from '@/components/earnings/payment-history';
import { WithdrawalDialog } from '@/components/earnings/withdrawal-dialog';
import { StatCard, StatsGrid } from '@/components/dashboard/stat-card';
import { Wallet, TrendingUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EarningsPage() {
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Earnings & Wallet</h1>
          <p className="text-muted-foreground mt-1">Track your earnings and manage withdrawals</p>
        </div>
        <Button onClick={() => setOpenWithdraw(true)} size="lg">
          Withdraw Funds
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid
        cards={[
          {
            label: "Available Balance",
            value: "KES 24,000",
            icon: Wallet,
            description: "Ready to withdraw",
          },
          {
            label: "Pending Earnings",
            value: "KES 3,000",
            icon: TrendingUp,
            trend: {
              value: 5,
              label: 'vs last week',
              direction: 'up',
            },
          },
        ]}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsOverview period={period} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Referrals</CardTitle>
            <CardDescription>By earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Alex Rodriguez', earnings: 'KES 4,000' },
                { name: 'James Murphy', earnings: 'KES 6,000' },
                { name: 'Sarah Johnson', earnings: 'KES 3,000' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm font-bold text-primary">{item.earnings}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <PaymentHistory />

      {/* Withdrawal Dialog */}
      <WithdrawalDialog open={openWithdraw} onOpenChange={setOpenWithdraw} />
    </div>
  );
}
