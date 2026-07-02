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
import { useAuth } from '@/contexts/auth-context';

export function RecentReferrals() {
  const { user } = useAuth();
  
  // Show top 4 recent referrals
  const recentReferrals = user?.referrals.slice(0, 4) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Referrals</CardTitle>
        <CardDescription>Your latest referral signups</CardDescription>
      </CardHeader>
      <CardContent>
        {recentReferrals.length === 0 ? (
          <div className="text-center py-8 text-xs text-muted-foreground font-medium">
            No referrals yet. Copy your link and start sharing!
          </div>
        ) : (
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
                            .slice(0, 2)
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{referral.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{referral.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        referral.status === 'Active' 
                          ? 'default' 
                          : referral.status === 'Pending' 
                            ? 'secondary' 
                            : 'outline'
                      }
                      className={referral.status === 'Active' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
                    >
                      {referral.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-emerald-500">{referral.earnings}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {referral.signupDate}
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
