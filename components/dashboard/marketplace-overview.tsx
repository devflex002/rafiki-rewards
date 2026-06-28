'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { POPULAR_IN_KENYA, SUBSCRIPTION_SERVICES } from '@/lib/account-selling';
import Link from 'next/link';
import { TrendingUp, Zap, Play } from 'lucide-react';

export function MarketplaceOverview() {
  const topServices = POPULAR_IN_KENYA.slice(0, 6);
  const availableCount = POPULAR_IN_KENYA.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Digital Subscriptions Marketplace</CardTitle>
              <CardDescription>
                Buy and sell popular streaming, AI, and productivity accounts
              </CardDescription>
            </div>
            <Link href="/dashboard/marketplace">
              <Button size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topServices.map((service) => (
              <div
                key={service.id}
                className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-xl">{service.icon}</div>
                    <h3 className="font-medium">{service.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{service.category.replace('-', ' ')}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-xs">
                      Popular in Kenya
                    </Badge>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-semibold">${service.basePrice.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Base price</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Available Services</p>
                <p className="text-2xl font-bold mt-2">{Object.keys(SUBSCRIPTION_SERVICES).length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Popular in Kenya</p>
                <p className="text-2xl font-bold mt-2">{availableCount}</p>
              </div>
              <Zap className="h-8 w-8 text-amber-500/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Highest Demand</p>
                <p className="text-lg font-bold mt-2">ChatGPT Plus</p>
              </div>
              <Play className="h-8 w-8 text-emerald-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
