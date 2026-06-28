'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WithdrawalDialog({ open, onOpenChange }: WithdrawalDialogProps) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');

  const availableBalance = 2845.5;
  const minWithdrawal = 50;

  const isValid = amount && parseFloat(amount) >= minWithdrawal && parseFloat(amount) <= availableBalance;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Request a withdrawal from your available balance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Balance Info */}
          <Card className="bg-muted p-4 border-0">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-2xl font-bold">${availableBalance.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Minimum withdrawal: ${minWithdrawal}
            </p>
          </Card>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount to Withdraw</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={minWithdrawal}
                max={availableBalance}
                step="0.01"
                className="pl-6"
              />
            </div>
            {amount && (
              <p className="text-xs text-muted-foreground">
                {parseFloat(amount) < minWithdrawal
                  ? `Minimum withdrawal is $${minWithdrawal}`
                  : parseFloat(amount) > availableBalance
                    ? 'Exceeds available balance'
                    : 'Amount looks good!'}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Method</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="stripe">Stripe Connect</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fee Info */}
          {amount && isValid && (
            <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900 p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-semibold">Processing fee:</span> 2% (~$
                {(parseFloat(amount) * 0.02).toFixed(2)}) will be deducted
              </p>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!isValid}>Request Withdrawal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
