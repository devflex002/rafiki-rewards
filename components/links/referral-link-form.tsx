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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

interface ReferralLinkFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReferralLinkForm({ open, onOpenChange }: ReferralLinkFormProps) {
  const [name, setName] = useState('');
  const [campaign, setCampaign] = useState('general');
  const [customUrl, setCustomUrl] = useState('');

  const isValid = name.trim().length > 0;

  const generateLink = () => {
    const baseUrl = 'https://rafiki-rewards.com/ref/';
    return `${baseUrl}${customUrl || name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Referral Link</DialogTitle>
          <DialogDescription>
            Generate a custom referral link to share with your audience
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Link Name</label>
              <Input
                placeholder="e.g., Social Media Campaign"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Give your link a descriptive name for easy tracking
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Type</label>
              <select className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm">
                <option value="general">General</option>
                <option value="social">Social Media</option>
                <option value="email">Email</option>
                <option value="content">Content Marketing</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>

            {isValid && (
              <Card className="bg-muted p-4 border-0">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <p className="text-sm font-mono text-primary break-all">
                  {generateLink()}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Link Name</label>
              <Input
                placeholder="e.g., Social Media Campaign"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom URL Slug</label>
              <Input
                placeholder="custom-slug"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value.toLowerCase())}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to auto-generate from link name
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Type</label>
              <select className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm">
                <option value="general">General</option>
                <option value="social">Social Media</option>
                <option value="email">Email</option>
                <option value="content">Content Marketing</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" className="rounded" />
                Track advanced metrics
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Enable detailed analytics for this link
              </p>
            </div>

            {isValid && (
              <Card className="bg-muted p-4 border-0">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <p className="text-sm font-mono text-primary break-all">
                  {generateLink()}
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!isValid}>Create Link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
