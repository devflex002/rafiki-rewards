'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, CheckCircle, Clock, XCircle } from 'lucide-react';

const stats = [
  {
    label: 'Total Referrals',
    value: '24',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Active',
    value: '18',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600',
  },
  {
    label: 'Pending',
    value: '4',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    label: 'Inactive',
    value: '2',
    icon: XCircle,
    color: 'bg-red-100 text-red-600',
  },
];

export function ReferralStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
