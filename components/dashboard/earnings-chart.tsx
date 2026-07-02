'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function EarningsChart() {
  const data = [
    { day: 'Mon', earnings: 1000 },
    { day: 'Tue', earnings: 2000 },
    { day: 'Wed', earnings: 1000 },
    { day: 'Thu', earnings: 3000 },
    { day: 'Fri', earnings: 2000 },
    { day: 'Sat', earnings: 3000 },
    { day: 'Sun', earnings: 4000 },
  ];

  const maxEarnings = Math.max(...data.map((d) => d.earnings));

  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
        <CardTitle className="text-xl sm:text-2xl">Earnings This Week</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Daily earnings breakdown</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = (item.earnings / maxEarnings) * 100;
            return (
              <div key={item.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium">{item.day}</span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-500">
                    KES {item.earnings.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
