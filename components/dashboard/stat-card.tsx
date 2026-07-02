'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down';
  };
  description?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  description,
}: StatCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">
              {label}
            </p>
          </div>
          <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">{value}</h2>
        </div>

        {(description || trend) && (
          <div className="flex items-center text-xs text-muted-foreground gap-1.5">
            {trend && (
              <span
                className={`inline-flex items-center font-semibold ${trend.direction === 'up'
                  ? 'text-emerald-600 dark:text-emerald-500'
                  : 'text-rose-600 dark:text-rose-500'
                  }`}
              >
                {trend.direction === 'up' ? (
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3 w-3" />
                )}
                {trend.value}%
              </span>
            )}
            {description && (
              <span className="truncate">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export interface StatCardConfig extends StatCardProps { }

export function StatsGrid({ cards }: { cards: StatCardConfig[] }) {
  const count = cards.length;
  let gridCols = "grid-cols-1";
  if (count === 2) {
    gridCols = "grid-cols-1 sm:grid-cols-2";
  } else if (count === 3) {
    gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  } else if (count >= 4) {
    gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  }

  return (
    <div className={`grid ${gridCols} gap-3 sm:gap-4 md:gap-6`}>
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
}