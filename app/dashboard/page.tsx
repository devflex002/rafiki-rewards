'use client';

import { useState } from 'react';
import { Users, DollarSign, Copy, Check, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { StatCard, StatsGrid } from '@/components/dashboard/stat-card';
import { RecentReferrals } from '@/components/dashboard/recent-referrals';
import { EarningsChart } from '@/components/dashboard/earnings-chart';

function ReferralLinkCard() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const referralLink = "https://rafikirewards.com/?ref=john-doe";

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
      // Fallback to copy if navigator.share is not supported
      handleCopy();
    }
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-base">Your Referral Link</CardTitle>
        <CardDescription>Share this unique link to track your signups and earn rewards.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Copy Section */}
        <div className="flex gap-2">
          <Input value={referralLink} readOnly className="font-mono text-xs h-9 bg-muted" />
          <Button size="sm" onClick={handleCopy} className="h-9 gap-1.5 px-3 min-w-[80px]">
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
          <Button onClick={handleShare} className="w-full h-9 gap-2 text-sm bg-purple-600 hover:bg-purple-500 text-white transition-colors">
            <Share2 className="h-4 w-4" />
            {shared ? 'Shared!' : 'Share Link'}
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="rounded-lg bg-muted/50 border p-3 mt-2 text-xs text-muted-foreground space-y-1.5">
          <div className="flex justify-between">
            <span>Link Status:</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-500">Active</span>
          </div>
          <div className="flex justify-between">
            <span>Commission Type:</span>
            <span className="font-medium text-foreground">Flat 10% per Signup</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, John! Here's your overview.</p>
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

      {/* Charts & Referral Link Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
        <div className="lg:col-span-1">
          <ReferralLinkCard />
        </div>
      </div>

      {/* Recent Referrals */}
      <RecentReferrals />
    </div>
  );
}
