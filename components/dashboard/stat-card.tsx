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
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-1">
            {trend.direction === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`text-xs font-medium ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.value}% {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
