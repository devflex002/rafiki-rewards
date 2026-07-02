'use client';

import { useState } from 'react';
import { Users, Wallet, Copy, Check, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { StatsGrid } from '@/components/dashboard/stat-card';
import { RecentReferrals } from '@/components/dashboard/recent-referrals';
import { EarningsChart } from '@/components/dashboard/earnings-chart';
import { useAuth } from '@/contexts/auth-context';

function ReferralLinkCard() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Generate unique link using phone number or default
  const cleanPhone = user?.phone ? encodeURIComponent(user.phone) : 'john-doe';
  const referralLink = `https://rafikirewards.com/?ref=${cleanPhone}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rafiki Rewards',
          text: 'Join me on Rafiki Rewards to start earning commissions!',
          url: referralLink,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
        <CardTitle className="text-base sm:text-lg">Your Referral Link</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Share this unique link to track your signups and earn rewards.</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-4">
        {/* Copy Section */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input value={referralLink} readOnly className="font-mono text-xs h-10 bg-muted flex-1 overflow-hidden" />
          <Button size="sm" onClick={handleCopy} className="h-10 gap-1.5 px-3 whitespace-nowrap w-full sm:w-auto">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                <span className="text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>

        {/* Share Button with native functionality */}
        <div className="pt-2">
          <Button onClick={handleShare} className="w-full h-10 gap-2 text-sm bg-purple-600 hover:bg-purple-500 text-white transition-colors">
            <Share2 className="h-4 w-4" />
            {shared ? 'Shared!' : 'Share Link'}
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="rounded-lg bg-muted/50 border p-3 mt-2 text-xs text-muted-foreground space-y-2">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span>Link Status:</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-500">Active</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span>Commission:</span>
            <span className="font-medium text-foreground">KES 1,000/Signup</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user, simulateReferral } = useAuth();

  const totalReferrals = user?.referrals?.length ?? 0;
  const balance = user?.balance ?? 0;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Welcome back, {user?.name || 'User'}! Here's your overview.
          </p>
        </div>
        <Button
          onClick={simulateReferral}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold h-10 gap-1.5 px-4 shadow-[0_0_15px_rgba(147,51,234,0.2)] active:scale-[0.98] w-full sm:w-auto transition-all"
        >
          <Sparkles className="h-4.5 w-4.5" />
          <span className="text-sm">Simulate New Referral</span>
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
            label: "Total Earnings",
            value: `KES ${balance.toLocaleString()}`,
            icon: Wallet,
            trend: {
              value: balance > 0 ? 100 : 0,
              label: 'payout ready',
              direction: 'up',
            },
          },
        ]}
      />

      {/* Charts & Referral Link Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
        <div className="lg:col-span-1">
          <ReferralLinkCard />
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="overflow-x-auto">
        <RecentReferrals />
      </div>
    </div>
  );
}
