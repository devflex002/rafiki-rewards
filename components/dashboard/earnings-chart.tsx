'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function EarningsChart() {
  const data = [
    { day: 'Mon', earnings: 120 },
    { day: 'Tue', earnings: 250 },
    { day: 'Wed', earnings: 180 },
    { day: 'Thu', earnings: 310 },
    { day: 'Fri', earnings: 220 },
    { day: 'Sat', earnings: 290 },
    { day: 'Sun', earnings: 340 },
  ];

  const maxEarnings = Math.max(...data.map((d) => d.earnings));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings This Week</CardTitle>
        <CardDescription>Daily earnings breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = (item.earnings / maxEarnings) * 100;
            return (
              <div key={item.day}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.day}</span>
                  <span className="text-sm font-semibold">${item.earnings}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
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
