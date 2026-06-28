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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentReferrals = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://avatar.vercel.sh/sarah',
    status: 'Active',
    earnings: '$124.50',
    date: '2 days ago',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: 'https://avatar.vercel.sh/mike',
    status: 'Pending',
    earnings: '$0.00',
    date: '1 day ago',
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://avatar.vercel.sh/emma',
    status: 'Active',
    earnings: '$89.25',
    date: '5 hours ago',
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    avatar: 'https://avatar.vercel.sh/alex',
    status: 'Active',
    earnings: '$156.75',
    date: '30 mins ago',
  },
];

export function RecentReferrals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Referrals</CardTitle>
        <CardDescription>Your latest referral signups</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReferrals.map((referral) => (
              <TableRow key={referral.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
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
                <TableCell className="text-muted-foreground">{referral.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={referral.status === 'Active' ? 'default' : 'secondary'}
                  >
                    {referral.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{referral.earnings}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {referral.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
