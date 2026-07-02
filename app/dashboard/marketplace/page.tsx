'use client';

import { AccountBrowser } from '@/components/accounts/account-browser';

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Marketplace</h2>
        <p className="text-sm text-muted-foreground mt-1">Buy digital subscription accounts</p>
      </div>

      {/* Browse Accounts */}
      <AccountBrowser />
    </div>
  );
}
