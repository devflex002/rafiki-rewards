'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';

export function PaymentSettings() {
  return (
    <>
      {/* Payment Methods */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your withdrawal methods</CardDescription>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Method
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Bank Transfer */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Bank Transfer</h4>
                <Badge>Default</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Ending in ****1234
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* PayPal */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium">PayPal</h4>
              <p className="text-sm text-muted-foreground mt-1">
                john.doe@paypal.com
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Preferences</CardTitle>
          <CardDescription>Configure your withdrawal settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Minimum Balance for Auto-Withdrawal</label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">$</span>
              <Input type="number" placeholder="500" defaultValue="500" />
            </div>
            <p className="text-xs text-muted-foreground">
              Automatically withdraw when balance reaches this amount
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Withdrawal Frequency</label>
            <select className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm">
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
              <option>Manual Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <input type="checkbox" id="auto-withdraw" className="rounded" defaultChecked />
            <label htmlFor="auto-withdraw" className="text-sm font-medium cursor-pointer">
              Enable automatic withdrawals
            </label>
          </div>

          <Button>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Tax Information */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Information</CardTitle>
          <CardDescription>Provide tax details for reporting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tax ID / SSN</label>
            <Input type="password" placeholder="••••••••••" />
            <p className="text-xs text-muted-foreground">
              Your information is encrypted and secure
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input placeholder="123 Main Street" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input placeholder="City" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Input placeholder="State" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ZIP Code</label>
              <Input placeholder="ZIP" />
            </div>
          </div>

          <Button>Save Tax Info</Button>
        </CardContent>
      </Card>
    </>
  );
}
