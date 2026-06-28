'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReferralLinkForm } from '@/components/links/referral-link-form';
import { ReferralLinksTable } from '@/components/links/referral-links-table';
import { ShareModal } from '@/components/links/share-modal';
import { Plus } from 'lucide-react';

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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground font-medium">Total Links</p>
            <p className="text-3xl font-bold mt-2">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground font-medium">Total Clicks</p>
            <p className="text-3xl font-bold mt-2">324</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground font-medium">Avg Click-Through Rate</p>
            <p className="text-3xl font-bold mt-2">45.2%</p>
          </CardContent>
        </Card>
      </div>

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
