'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EarningsOverview } from '@/components/earnings/earnings-overview';
import { PaymentHistory } from '@/components/earnings/payment-history';
import { WithdrawalDialog } from '@/components/earnings/withdrawal-dialog';
import { Wallet, TrendingUp, Calendar } from 'lucide-react';
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

      {/* Wallet Balance Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Available Balance
              </p>
              <p className="text-3xl font-bold mt-2">$2,845.50</p>
              <p className="text-xs text-muted-foreground mt-1">Ready to withdraw</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Pending Earnings
              </p>
              <p className="text-3xl font-bold mt-2">$456.25</p>
              <p className="text-xs text-muted-foreground mt-1">Processing</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                This Month
              </p>
              <p className="text-3xl font-bold mt-2">$1,124.75</p>
              <p className="text-xs text-muted-foreground mt-1">27 days left</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
                { name: 'Alex Rodriguez', earnings: '$156.75' },
                { name: 'James Murphy', earnings: '$203.00' },
                { name: 'Sarah Johnson', earnings: '$124.50' },
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
