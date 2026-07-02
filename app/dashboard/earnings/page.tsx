'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EarningsOverview } from '@/components/earnings/earnings-overview';
import { PaymentHistory } from '@/components/earnings/payment-history';
import { WithdrawalDialog } from '@/components/earnings/withdrawal-dialog';
import { StatsGrid } from '@/components/dashboard/stat-card';
import { Wallet, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function EarningsPage() {
  const { user } = useAuth();
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [period, setPeriod] = useState('month');

  const balance = user?.balance ?? 0;
  const pending = user?.pendingEarnings ?? 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Earnings & Wallet</h1>
          <p className="text-muted-foreground mt-1">Track your earnings and manage withdrawals</p>
        </div>
        <Button onClick={() => setOpenWithdraw(true)} size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(147,51,234,0.15)]">
          Withdraw Funds
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid
        cards={[
          {
            label: "Available Balance",
            value: `KES ${balance.toLocaleString()}`,
            icon: Wallet,
            description: "Ready to withdraw",
          },
          {
            label: "Pending Earnings",
            value: `KES ${pending.toLocaleString()}`,
            icon: TrendingUp,
            trend: {
              value: pending > 0 ? 100 : 0,
              label: 'live tracking',
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
        <Card className="bg-zinc-900/40 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base">Top Referrals</CardTitle>
            <CardDescription>By earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(user?.referrals || [])
                .filter((r) => r.status === 'Active')
                .slice(0, 3)
                .map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-850 last:border-0">
                    <span className="text-sm font-medium text-zinc-300">{item.name}</span>
                    <span className="text-sm font-bold text-emerald-500">{item.earnings}</span>
                  </div>
                ))}
              {(!user?.referrals || user.referrals.filter((r) => r.status === 'Active').length === 0) && (
                <div className="text-center py-6 text-xs text-muted-foreground">
                  No active referrals yet.
                </div>
              )}
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
