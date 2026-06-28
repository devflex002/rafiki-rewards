'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReferralLinkForm } from '@/components/links/referral-link-form';
import { ReferralLinksTable } from '@/components/links/referral-links-table';
import { ShareModal } from '@/components/links/share-modal';
import { StatCard, StatsGrid } from '@/components/dashboard/stat-card';
import { Link as LinkIcon, MousePointerClick, TrendingUp, Plus } from 'lucide-react';

export default function LinksPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Referral Links</h1>
          <p className="text-muted-foreground mt-1">Create and manage your referral links</p>
        </div>
        <Button onClick={() => setShowForm(true)} size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Link
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid
        cards={[
          {
            label: "Total Links",
            value: "5",
            icon: LinkIcon,
            description: "Active referral links",
          },
          {
            label: "Total Clicks",
            value: "324",
            icon: MousePointerClick,
            trend: {
              value: 23,
              label: 'this month',
              direction: 'up',
            },
          },
          {
            label: "Avg Click-Through Rate",
            value: "45.2%",
            icon: TrendingUp,
            trend: {
              value: 8,
              label: 'vs last month',
              direction: 'up',
            },
          },
        ]}
      />

      {/* Links Table */}
      <ReferralLinksTable onShare={setSelectedLink} />

      {/* Create New Link Dialog */}
      <ReferralLinkForm open={showForm} onOpenChange={setShowForm} />

      {/* Share Modal */}
      {selectedLink && (
        <ShareModal link={selectedLink} onClose={() => setSelectedLink(null)} />
      )}
    </div>
  );
}
