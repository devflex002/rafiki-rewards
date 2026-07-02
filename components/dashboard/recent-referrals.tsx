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
    <Card className="w-full overflow-x-auto">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
        <CardTitle className="text-xl sm:text-2xl">Recent Referrals</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Your latest referral signups</CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-0 sm:px-6">
        {recentReferrals.length === 0 ? (
          <div className="text-center py-8 text-xs text-muted-foreground font-medium">
            No referrals yet. Copy your link and start sharing!
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 sm:px-6">Name</TableHead>
                  <TableHead className="px-4 sm:px-6 hidden sm:table-cell">Email</TableHead>
                  <TableHead className="px-4 sm:px-6">Status</TableHead>
                  <TableHead className="px-4 sm:px-6 hidden md:table-cell">Earnings</TableHead>
                  <TableHead className="px-4 sm:px-6 text-right hidden lg:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReferrals.map((referral) => (
                  <TableRow key={referral.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={referral.avatar} alt={referral.name} />
                          <AvatarFallback className="text-xs">
                            {referral.name
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm truncate">{referral.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground hidden sm:table-cell">
                      <span className="text-xs sm:text-sm truncate">{referral.email}</span>
                    </TableCell>
                    <TableCell className="px-4 sm:px-6 py-3 sm:py-4">
                      <Badge
                        variant={
                          referral.status === 'Active'
                            ? 'default'
                            : referral.status === 'Pending'
                              ? 'secondary'
                              : 'outline'
                        }
                        className={`text-xs ${referral.status === 'Active' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                      >
                        {referral.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-emerald-500 hidden md:table-cell">
                      <span className="text-xs sm:text-sm">{referral.earnings}</span>
                    </TableCell>
                    <TableCell className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground text-right hidden lg:table-cell">
                      <span className="text-xs sm:text-sm">{referral.signupDate}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
