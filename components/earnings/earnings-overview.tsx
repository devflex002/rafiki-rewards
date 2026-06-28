'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EarningsOverviewProps {
  period: string;
}

export function EarningsOverview({ period }: EarningsOverviewProps) {
  const monthlyData = [
    { month: 'Jan', earnings: 450 },
    { month: 'Feb', earnings: 320 },
    { month: 'Mar', earnings: 780 },
    { month: 'Apr', earnings: 620 },
    { month: 'May', earnings: 950 },
    { month: 'Jun', earnings: 1124 },
  ];

  const weeklyData = [
    { week: 'Week 1', earnings: 200 },
    { week: 'Week 2', earnings: 350 },
    { week: 'Week 3', earnings: 420 },
    { week: 'Week 4', earnings: 554 },
  ];

  const data = period === 'month' ? monthlyData : weeklyData;
  const maxValue = Math.max(...data.map((d) => d.earnings));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Overview</CardTitle>
        <CardDescription>Your earnings trend over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((item, idx) => {
            const label = 'month' in item ? item.month : item.week;
            const percentage = (item.earnings / maxValue) * 100;
            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-sm font-semibold text-primary">${item.earnings}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
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
