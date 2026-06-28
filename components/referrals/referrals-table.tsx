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
import { MoreVertical, Mail, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const referralsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://avatar.vercel.sh/sarah',
    status: 'Active',
    joined: '2024-01-15',
    earnings: '$124.50',
    signupDate: 'Jan 15, 2024',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: 'https://avatar.vercel.sh/mike',
    status: 'Pending',
    joined: '2024-01-18',
    earnings: '$0.00',
    signupDate: 'Jan 18, 2024',
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://avatar.vercel.sh/emma',
    status: 'Active',
    joined: '2024-01-10',
    earnings: '$89.25',
    signupDate: 'Jan 10, 2024',
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    avatar: 'https://avatar.vercel.sh/alex',
    status: 'Active',
    joined: '2024-01-05',
    earnings: '$156.75',
    signupDate: 'Jan 5, 2024',
  },
  {
    id: 5,
    name: 'Lisa Wong',
    email: 'lisa@example.com',
    avatar: 'https://avatar.vercel.sh/lisa',
    status: 'Inactive',
    joined: '2023-12-20',
    earnings: '$67.50',
    signupDate: 'Dec 20, 2023',
  },
  {
    id: 6,
    name: 'James Murphy',
    email: 'james@example.com',
    avatar: 'https://avatar.vercel.sh/james',
    status: 'Active',
    joined: '2024-01-12',
    earnings: '$203.00',
    signupDate: 'Jan 12, 2024',
  },
];

export function ReferralsTable() {
  const [selectedReferral, setSelectedReferral] = useState<typeof referralsData[0] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<'contact' | 'remove' | null>(null);

  const handleAction = (referral: typeof referralsData[0], type: 'contact' | 'remove') => {
    setSelectedReferral(referral);
    setActionType(type);
    setOpenDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Referrals</CardTitle>
          <CardDescription>
            Total: {referralsData.length} referrals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Signup Date</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralsData.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={referral.avatar} alt={referral.name} />
                        <AvatarFallback>
                          {referral.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{referral.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
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
                    >
                      {referral.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {referral.signupDate}
                  </TableCell>
                  <TableCell className="font-medium">{referral.earnings}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction(referral, 'contact')}
                        className="gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="hidden sm:inline">Contact</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
        </CardContent>
      </Card>

      {/* Action Dialogs */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'contact' ? 'Contact Referral' : 'Remove Referral'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'contact'
                ? `Send a message to ${selectedReferral?.name}`
                : `Are you sure you want to remove ${selectedReferral?.name} from your referrals?`}
            </DialogDescription>
          </DialogHeader>

          {actionType === 'contact' && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <input
                  type="text"
                  placeholder="Message subject"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  placeholder="Write your message..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button>
              {actionType === 'contact' ? 'Send Message' : 'Remove'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
