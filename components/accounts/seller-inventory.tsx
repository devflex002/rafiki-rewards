'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SUBSCRIPTION_SERVICES } from '@/lib/account-selling';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface InventoryItem {
  id: string;
  service: string;
  totalAccounts: number;
  availableAccounts: number;
  soldThisMonth: number;
  totalRevenue: number;
  averagePrice: number;
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    service: 'chatgpt-plus',
    totalAccounts: 15,
    availableAccounts: 8,
    soldThisMonth: 7,
    totalRevenue: 140,
    averagePrice: 20,
  },
  {
    id: '2',
    service: 'canva-pro',
    totalAccounts: 12,
    availableAccounts: 5,
    soldThisMonth: 7,
    totalRevenue: 91,
    averagePrice: 13,
  },
  {
    id: '3',
    service: 'netflix',
    totalAccounts: 8,
    availableAccounts: 3,
    soldThisMonth: 5,
    totalRevenue: 79.95,
    averagePrice: 15.99,
  },
  {
    id: '4',
    service: 'spotify',
    totalAccounts: 10,
    availableAccounts: 4,
    soldThisMonth: 6,
    totalRevenue: 71.94,
    averagePrice: 11.99,
  },
];

export function SellerInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    service: 'chatgpt-plus',
    quantity: '5',
    price: '20',
  });

  const handleAddAccounts = () => {
    setIsAddOpen(false);
    setFormData({ service: 'chatgpt-plus', quantity: '5', price: '20' });
  };

  const totalAccounts = inventory.reduce((sum, item) => sum + item.totalAccounts, 0);
  const totalAvailable = inventory.reduce((sum, item) => sum + item.availableAccounts, 0);
  const totalSoldThisMonth = inventory.reduce((sum, item) => sum + item.soldThisMonth, 0);
  const totalRevenue = inventory.reduce((sum, item) => sum + item.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Inventory</h2>
          <p className="text-muted-foreground mt-1">Manage your accounts and track sales</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Accounts
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Accounts</DialogTitle>
              <DialogDescription>Add accounts to your inventory for selling</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Service</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md text-sm"
                >
                  {Object.entries(SUBSCRIPTION_SERVICES).map(([key, service]) => (
                    <option key={key} value={key}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  min="1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price per Account</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  step="0.01"
                />
              </div>
              <Button onClick={handleAddAccounts} className="w-full">
                Add Accounts
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground font-medium">Total Accounts</p>
            <p className="text-3xl font-bold mt-2">{totalAccounts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground font-medium">Available</p>
            <p className="text-3xl font-bold mt-2">{totalAvailable}</p>
            <p className="text-xs text-muted-foreground mt-1">Ready to sell</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground font-medium">Sold This Month</p>
            <p className="text-3xl font-bold mt-2">{totalSoldThisMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
            <p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Account Inventory</CardTitle>
          <CardDescription>Your active accounts by service</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">Sold This Month</TableHead>
                <TableHead className="text-right">Avg Price</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => {
                const service = SUBSCRIPTION_SERVICES[item.service as any];
                const usagePercent = ((item.totalAccounts - item.availableAccounts) / item.totalAccounts) * 100;
                
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{service.icon}</span>
                        <span className="font-medium">{service.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.totalAccounts}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={item.availableAccounts > 0 ? 'default' : 'secondary'}>
                        {item.availableAccounts}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{item.soldThisMonth}</TableCell>
                    <TableCell className="text-right">${item.averagePrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-bold">${item.totalRevenue.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
