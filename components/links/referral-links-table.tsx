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
import { Copy, Share2, Eye, Trash2 } from 'lucide-react';

const referralLinks = [
  {
    id: 1,
    name: 'Social Media Campaign',
    campaign: 'Social',
    link: 'https://rafiki-rewards.com/ref/social-campaign-abc123',
    clicks: 145,
    signups: 12,
    earnings: '$456.75',
    created: 'Jan 10, 2024',
    active: true,
  },
  {
    id: 2,
    name: 'Email Newsletter',
    campaign: 'Email',
    link: 'https://rafiki-rewards.com/ref/email-news-def456',
    clicks: 89,
    signups: 8,
    earnings: '$289.50',
    created: 'Jan 15, 2024',
    active: true,
  },
  {
    id: 3,
    name: 'YouTube Description',
    campaign: 'Content',
    link: 'https://rafiki-rewards.com/ref/youtube-ghi789',
    clicks: 234,
    signups: 18,
    earnings: '$687.25',
    created: 'Jan 05, 2024',
    active: true,
  },
  {
    id: 4,
    name: 'Blog Post',
    campaign: 'Content',
    link: 'https://rafiki-rewards.com/ref/blog-post-jkl012',
    clicks: 156,
    signups: 10,
    earnings: '$387.50',
    created: 'Dec 28, 2023',
    active: true,
  },
  {
    id: 5,
    name: 'Old Campaign',
    campaign: 'General',
    link: 'https://rafiki-rewards.com/ref/old-campaign-mno345',
    clicks: 45,
    signups: 2,
    earnings: '$76.25',
    created: 'Dec 01, 2023',
    active: false,
  },
];

interface ReferralLinksTableProps {
  onShare: (link: string) => void;
}

export function ReferralLinksTable({ onShare }: ReferralLinksTableProps) {
  const [copied, setCopied] = useState<number | null>(null);

  const copyToClipboard = (id: number, link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referral Links</CardTitle>
        <CardDescription>Manage and track your referral links</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Signups</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{link.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {link.link.split('/').pop()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{link.campaign}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{link.clicks}</TableCell>
                  <TableCell className="font-medium">{link.signups}</TableCell>
                  <TableCell className="font-medium text-primary">{link.earnings}</TableCell>
                  <TableCell>
                    <Badge
                      variant={link.active ? 'default' : 'outline'}
                      className={!link.active ? 'text-muted-foreground' : ''}
                    >
                      {link.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(link.id, link.link)}
                        title="Copy link"
                      >
                        {copied === link.id ? (
                          <span className="text-xs text-green-600">Copied!</span>
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onShare(link.link)}
                        title="Share"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="View analytics"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
