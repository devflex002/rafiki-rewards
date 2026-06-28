'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Send,
  Copy,
  Mail,
} from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  link: string;
  onClose: () => void;
}

export function ShareModal({ link, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=Check%20out%20this%20amazing%20rewards%20program!`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
    email: `mailto:?subject=Join%20Rafiki%20Rewards&body=Check%20out%20this%20amazing%20program:%20${encodeURIComponent(link)}`,
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Referral Link</DialogTitle>
          <DialogDescription>
            Share your link on social media or via email
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Link Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Referral Link</label>
            <div className="flex gap-2">
              <Input
                value={link}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="px-2"
              >
                {copied ? (
                  <span className="text-xs text-green-600">Copied!</span>
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Share on Social Media</p>
            <div className="grid grid-cols-2 gap-3">
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2">
                  {/* <Twitter className="h-4 w-4" /> */}
                  <span className="hidden sm:inline">Twitter</span>
                </Button>
              </a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Facebook</span>
                </Button>
              </a>
              <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full gap-2">
                  {/* <Linkedin className="h-4 w-4" /> */}
                  <span className="hidden sm:inline">LinkedIn</span>
                </Button>
              </a>
              <a href={shareLinks.email}>
                <Button variant="outline" className="w-full gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline">Email</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Pre-written Messages */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Pre-written Messages</p>
            <div className="space-y-2">
              <Card className="bg-muted p-3">
                <p className="text-xs">
                  "Join me on Rafiki Rewards and earn money by referring friends! Use my link: {link}"
                </p>
              </Card>
              <Card className="bg-muted p-3">
                <p className="text-xs">
                  "I'm making passive income with Rafiki Rewards. Join using my referral link and get started: {link}"
                </p>
              </Card>
              <Card className="bg-muted p-3">
                <p className="text-xs">
                  "Check out this incredible opportunity to earn rewards: {link}"
                </p>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
