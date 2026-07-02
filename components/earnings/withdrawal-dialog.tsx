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
  const [method, setMethod] = useState('mpesa');

  const availableBalance = 24000;
  const minWithdrawal = 5000;

  const isValid = amount && parseFloat(amount) >= minWithdrawal && parseFloat(amount) <= availableBalance;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950 text-zinc-100 border-zinc-900">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Request a withdrawal from your available balance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Balance Info */}
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <p className="text-xs text-zinc-400 font-bold uppercase">Available Balance</p>
            <p className="text-2xl font-black text-white mt-1">KES {availableBalance.toLocaleString()}</p>
            <p className="text-xs text-zinc-500 mt-1.5">
              Minimum withdrawal: KES {minWithdrawal.toLocaleString()}
            </p>
          </Card>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase">Amount to Withdraw (KES)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                KES
              </span>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={minWithdrawal}
                max={availableBalance}
                step="100"
                className="pl-12 bg-zinc-900 border-zinc-800 text-zinc-100 focus:outline-none focus:border-purple-500 h-10 text-sm"
              />
            </div>
            {amount && (
              <p className="text-xs text-zinc-500">
                {parseFloat(amount) < minWithdrawal
                  ? `Minimum withdrawal is KES ${minWithdrawal.toLocaleString()}`
                  : parseFloat(amount) > availableBalance
                    ? 'Exceeds available balance'
                    : 'Amount looks good!'}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase">Payment Method</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100 text-sm h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <SelectItem value="mpesa">M-Pesa (Direct to Phone)</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fee Info */}
          {amount && isValid && (
            <Card className="bg-zinc-900 border-zinc-800 p-4">
              <p className="text-xs text-zinc-400">
                <span className="font-semibold text-white">Processing fee:</span> 2% (~KES {(parseFloat(amount) * 0.02).toLocaleString()}) will be deducted
              </p>
            </Card>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white">
            Cancel
          </Button>
          <Button disabled={!isValid} className="bg-purple-600 hover:bg-purple-500 text-white font-bold">
            Request Payout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
