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
    <Card className="shadow-sm">
      <CardContent className=" flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="mt-1 flex items-baseline gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">{value}</h2>
        </div>

        {(description || trend) && (
          <div className="mt-1 flex items-center text-xs text-muted-foreground gap-1.5">
            {trend && (
              <span
                className={`inline-flex items-center font-medium ${
                  trend.direction === 'up'
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

export interface StatCardConfig extends StatCardProps {}

export function StatsGrid({ cards }: { cards: StatCardConfig[] }) {
  const count = cards.length;
  let gridCols = "grid-cols-1";
  if (count === 2) {
    gridCols = "grid-cols-1 md:grid-cols-2";
  } else if (count === 3) {
    gridCols = "grid-cols-1 md:grid-cols-3";
  } else if (count >= 4) {
    gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  }

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
}