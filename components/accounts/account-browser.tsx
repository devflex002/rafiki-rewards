'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  SUBSCRIPTION_SERVICES,
  CATEGORIES,
  SubscriptionCategory,
  POPULAR_IN_KENYA,
} from '@/lib/account-selling';
import { Search, ShoppingCart } from 'lucide-react';

interface FilterOptions {
  category: string;
  search: string;
  popularOnly: boolean;
}

export function AccountBrowser() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    search: '',
    popularOnly: false,
  });

  const filteredServices = Object.values(SUBSCRIPTION_SERVICES).filter((service) => {
    if (filters.category !== 'all' && service.category !== filters.category) {
      return false;
    }
    if (filters.popularOnly && !service.popularInKenya) {
      return false;
    }
    if (filters.search && !service.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Browse Accounts</h2>
        <p className="text-muted-foreground mt-1">Buy and sell digital subscription accounts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Select
          value={filters.category}
          onValueChange={(value) => setFilters({ ...filters, category: value })}
        >
          <SelectTrigger className="w-full sm:w-40">
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
        >
          Popular in Kenya
        </Button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="text-3xl">{service.icon}</div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
                {service.popularInKenya && (
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    Popular
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Features */}
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">Features</p>
                <div className="space-y-1">
                  {service.features.map((feature, i) => (
                    <p key={i} className="text-sm text-foreground/80">
                      ✓ {feature}
                    </p>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="pt-4 border-t space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Base Price</p>
                  <p className="text-2xl font-bold">${service.basePrice.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">1 month</p>
                </div>

                <Button className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <p className="text-muted-foreground">No services found matching your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
