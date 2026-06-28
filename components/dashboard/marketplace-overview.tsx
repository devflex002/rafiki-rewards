'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Music,
  Play,
  Zap,
  Globe,
  Briefcase,
  BookOpen,
  Code,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

interface Subscription {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  price: number;
  demand: 'high' | 'medium' | 'low';
  commission: number;
  soldThisMonth: number;
}

const subscriptions: Subscription[] = [
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'AI Tools',
    icon: <Zap className="h-5 w-5" />,
    price: 20,
    demand: 'high',
    commission: 15,
    soldThisMonth: 8,
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    category: 'Productivity',
    icon: <Briefcase className="h-5 w-5" />,
    price: 13,
    demand: 'high',
    commission: 12,
    soldThisMonth: 5,
  },
  {
    id: 'netflix',
    name: 'Netflix Premium',
    category: 'Streaming',
    icon: <Play className="h-5 w-5" />,
    price: 15.99,
    demand: 'high',
    commission: 18,
    soldThisMonth: 4,
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    category: 'Streaming',
    icon: <Music className="h-5 w-5" />,
    price: 11.99,
    demand: 'high',
    commission: 15,
    soldThisMonth: 6,
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'Productivity',
    icon: <Briefcase className="h-5 w-5" />,
    price: 99,
    demand: 'high',
    commission: 20,
    soldThisMonth: 2,
  },
  {
    id: 'nordvpn',
    name: 'NordVPN',
    category: 'VPN',
    icon: <Globe className="h-5 w-5" />,
    price: 3.99,
    demand: 'medium',
    commission: 25,
    soldThisMonth: 3,
  },
];

export function MarketplaceOverview() {
  const topSellers = subscriptions
    .sort((a, b) => b.soldThisMonth - a.soldThisMonth)
    .slice(0, 3);

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Digital Subscriptions Marketplace</CardTitle>
              <CardDescription>Sell popular streaming, AI, and productivity accounts</CardDescription>
            </div>
            <Link href="/dashboard/marketplace">
              <Button size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSellers.map((sub) => (
              <div
                key={sub.id}
                className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-primary">{sub.icon}</div>
                    <h3 className="font-medium">{sub.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{sub.category}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge className={`text-xs ${getDemandColor(sub.demand)}`}>
                      {sub.demand.charAt(0).toUpperCase() + sub.demand.slice(1)} Demand
                    </Badge>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-semibold">${sub.commission}%</p>
                  <p className="text-xs text-muted-foreground">{sub.soldThisMonth} sold</p>
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
                <p className="text-sm text-muted-foreground font-medium">Available Products</p>
                <p className="text-2xl font-bold mt-2">{subscriptions.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">High Demand Items</p>
                <p className="text-2xl font-bold mt-2">
                  {subscriptions.filter((s) => s.demand === 'high').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-amber-500/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">This Month Sales</p>
                <p className="text-2xl font-bold mt-2">
                  {subscriptions.reduce((acc, s) => acc + s.soldThisMonth, 0)}
                </p>
              </div>
              <Play className="h-8 w-8 text-emerald-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
