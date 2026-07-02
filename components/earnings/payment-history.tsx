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
import { useAuth } from '@/contexts/auth-context';

export function PaymentHistory() {
  const { user } = useAuth();
  
  const paymentHistory = user?.transactions || [];

  return (
    <Card className="bg-zinc-900/40 border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your transaction history</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        {paymentHistory.length === 0 ? (
          <div className="text-center py-12 text-sm text-zinc-500 font-medium">
            No transactions found yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-zinc-850">
                <TableHead className="text-zinc-400">Date</TableHead>
                <TableHead className="text-zinc-400">Type</TableHead>
                <TableHead className="text-zinc-400">Amount</TableHead>
                <TableHead className="text-zinc-400">Method</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-right text-zinc-400">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id} className="border-zinc-850 hover:bg-zinc-900/20">
                  <TableCell className="font-medium text-zinc-200">{payment.date}</TableCell>
                  <TableCell className="text-zinc-300">{payment.type}</TableCell>
                  <TableCell className={`font-semibold ${payment.type === 'Withdrawal' ? 'text-red-400' : 'text-emerald-500'}`}>
                    {payment.type === 'Withdrawal' ? '-' : ''}{payment.amount}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{payment.method}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="default" 
                      className={
                        payment.status === 'Completed'
                          ? 'bg-green-600 hover:bg-green-700 text-white font-bold'
                          : 'bg-yellow-600 hover:bg-yellow-700 text-white font-bold'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
