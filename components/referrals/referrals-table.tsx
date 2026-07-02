'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAuth, Referral } from '@/contexts/auth-context';

interface ReferralsTableProps {
  searchTerm?: string;
  statusFilter?: string;
}

export function ReferralsTable({ searchTerm = '', statusFilter = 'all' }: ReferralsTableProps) {
  const { user, updateProfile } = useAuth();
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<'contact' | 'remove' | null>(null);

  const referrals = user?.referrals || [];

  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch =
      referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'all' || referral.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleAction = (referral: Referral, type: 'contact' | 'remove') => {
    setSelectedReferral(referral);
    setActionType(type);
    setOpenDialog(true);
  };

  const handleConfirmRemove = () => {
    if (!selectedReferral || !user) return;
    
    // Filter out the selected referral
    const updatedReferrals = user.referrals.filter((r) => r.id !== selectedReferral.id);
    
    // Calculate new balance / stats if removing an Active referral (deduct KES 1,000)
    let balanceDeduction = 0;
    let pendingDeduction = 0;
    if (selectedReferral.status === 'Active') {
      balanceDeduction = 1000;
    } else if (selectedReferral.status === 'Pending') {
      pendingDeduction = 1000;
    }

    updateProfile({
      referrals: updatedReferrals,
      balance: Math.max(0, user.balance - balanceDeduction),
      pendingEarnings: Math.max(0, user.pendingEarnings - pendingDeduction),
    });

    setOpenDialog(false);
    setSelectedReferral(null);
  };

  return (
    <>
      <Card className="bg-zinc-900/40 border-zinc-800">
        <CardHeader>
          <CardTitle>All Referrals</CardTitle>
          <CardDescription>
            Showing {filteredReferrals.length} of {referrals.length} referrals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReferrals.length === 0 ? (
            <div className="text-center py-12 text-sm text-zinc-500 font-medium">
              No referrals found matching the criteria.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-zinc-850">
                  <TableHead className="text-zinc-400">Name</TableHead>
                  <TableHead className="text-zinc-400">Email</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Signup Date</TableHead>
                  <TableHead className="text-zinc-400">Earnings</TableHead>
                  <TableHead className="text-right text-zinc-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferrals.map((referral) => (
                  <TableRow key={referral.id} className="border-zinc-850 hover:bg-zinc-900/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={referral.avatar} alt={referral.name} />
                          <AvatarFallback>
                            {referral.name
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-zinc-200">{referral.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-400 font-medium">
                      {referral.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          referral.status === 'Active'
                            ? 'default'
                            : referral.status === 'Pending'
                              ? 'secondary'
                              : 'outline'
                        }
                        className={
                          referral.status === 'Active' 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold' 
                            : 'font-bold'
                        }
                      >
                        {referral.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {referral.signupDate}
                    </TableCell>
                    <TableCell className="font-semibold text-emerald-500">{referral.earnings}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction(referral, 'contact')}
                          className="gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="hidden sm:inline">Contact</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => handleAction(referral, 'remove')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Action Dialogs */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-zinc-950 border-zinc-850 text-zinc-100">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'contact' ? 'Contact Referral' : 'Remove Referral'}
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              {actionType === 'contact'
                ? `Send a message to ${selectedReferral?.name}`
                : `Are you sure you want to remove ${selectedReferral?.name}? This will update your dashboard stats and balance.`}
            </DialogDescription>
          </DialogHeader>

          {actionType === 'contact' && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase">Subject</label>
                <input
                  type="text"
                  placeholder="Welcome to the program!"
                  className="w-full px-3 py-2 text-sm rounded-md border border-zinc-850 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase">Message</label>
                <textarea
                  placeholder="Hey, let me know if you need any help setting up your account!"
                  rows={4}
                  className="w-full px-3 py-2 text-sm rounded-md border border-zinc-850 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setOpenDialog(false)} className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white">
              Cancel
            </Button>
            {actionType === 'contact' ? (
              <Button onClick={() => setOpenDialog(false)} className="bg-purple-600 hover:bg-purple-500 text-white font-bold">
                Send Message
              </Button>
            ) : (
              <Button onClick={handleConfirmRemove} className="bg-red-600 hover:bg-red-500 text-white font-bold">
                Confirm Remove
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
