'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SUBSCRIPTION_SERVICES,
  CATEGORIES,
  SubscriptionCategory,
} from '@/lib/account-selling';
import { ShoppingCart } from 'lucide-react';

interface FilterOptions {
  category: string;
  popularOnly: boolean;
}

export function AccountBrowser() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    popularOnly: false,
  });

  const filteredServices = Object.values(SUBSCRIPTION_SERVICES).filter((service) => {
    if (filters.category !== 'all' && service.category !== filters.category) {
      return false;
    }
    if (filters.popularOnly && !service.popularInKenya) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filters - Compact */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          value={filters.category}
          onValueChange={(value) => setFilters({ ...filters, category: value })}
        >
          <SelectTrigger className="w-full sm:w-48 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(CATEGORIES).map(([key, { name }]) => (
              <SelectItem key={key} value={key}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={filters.popularOnly ? 'default' : 'outline'}
          onClick={() => setFilters({ ...filters, popularOnly: !filters.popularOnly })}
          className="h-9 text-sm"
        >
          Popular in Kenya
        </Button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-4 space-y-3">
              {/* Icon & Title */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <div className="text-2xl">{service.icon}</div>
                  <h3 className="font-semibold text-sm">{service.name}</h3>
                </div>
                {service.popularInKenya && (
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-xs whitespace-nowrap">
                    Popular
                  </Badge>
                )}
              </div>

              <p className="text-xs text-muted-foreground">{service.description}</p>

              {/* Features - Compact */}
              <div className="space-y-1">
                {service.features.slice(0, 2).map((feature, i) => (
                  <p key={i} className="text-xs text-foreground/70">
                    ✓ {feature}
                  </p>
                ))}
                {service.features.length > 2 && (
                  <p className="text-xs text-muted-foreground">+ {service.features.length - 2} more</p>
                )}
              </div>

              {/* Price & Action */}
              <div className="pt-2 border-t space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-lg font-bold">${service.basePrice.toFixed(2)}</p>
                </div>
                <Button className="w-full h-8 text-sm gap-2">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Buy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">No services found matching your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
