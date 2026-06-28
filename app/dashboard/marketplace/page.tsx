'use client';

import { AccountBrowser } from '@/components/accounts/account-browser';

export default function MarketplacePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground mt-1">Buy digital subscription accounts at great prices</p>
      </div>

      {/* Browse Accounts */}
      <AccountBrowser />
    </div>
  );
}
