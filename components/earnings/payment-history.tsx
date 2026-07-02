'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

const paymentHistory = [
  {
    id: 1,
    date: 'Jun 28, 2026',
    type: 'Withdrawal',
    amount: 'KES 12,000',
    status: 'Completed',
    method: 'M-Pesa',
  },
  {
    id: 2,
    date: 'Jun 15, 2026',
    type: 'Referral Bonus',
    amount: 'KES 2,000',
    status: 'Completed',
    method: 'Platform',
  },
  {
    id: 3,
    date: 'Jun 14, 2026',
    type: 'Withdrawal',
    amount: 'KES 8,000',
    status: 'Completed',
    method: 'M-Pesa',
  },
  {
    id: 4,
    date: 'Jun 01, 2026',
    type: 'Withdrawal',
    amount: 'KES 5,000',
    status: 'Completed',
    method: 'M-Pesa',
  },
  {
    id: 5,
    date: 'May 25, 2026',
    type: 'Referral Bonus',
    amount: 'KES 1,000',
    status: 'Completed',
    method: 'Platform',
  },
];

export function PaymentHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your transaction history</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.date}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell className="font-semibold">{payment.amount}</TableCell>
                <TableCell className="text-muted-foreground">{payment.method}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
