'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Download, Trash2 } from 'lucide-react';

export function PrivacySettings() {
  return (
    <>
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              {
                label: 'Private',
                description: 'Only you can see your profile and stats',
              },
              {
                label: 'Public',
                description: 'Everyone can see your public profile',
              },
              {
                label: 'Referrals Only',
                description: 'Only your referrals can see your profile',
              },
            ].map((option, i) => (
              <label key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                <input
                  type="radio"
                  name="visibility"
                  defaultChecked={i === 0}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>Manage your personal data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="font-medium text-sm">Download Your Data</p>
              <p className="text-xs text-muted-foreground mt-1">
                Get a copy of all your data in CSV format
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Third-party Access */}
      <Card>
        <CardHeader>
          <CardTitle>Third-party Access</CardTitle>
          <CardDescription>Manage applications connected to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              name: 'Analytics Tool',
              description: 'Can view your earnings and referral data',
              status: 'Connected',
            },
            {
              name: 'CRM Integration',
              description: 'Can access your referral list',
              status: 'Connected',
            },
          ].map((app, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-sm">{app.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{app.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{app.status}</Badge>
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle>Data Retention</CardTitle>
          <CardDescription>How long we keep your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-semibold">Inactive accounts:</span> Data retained for 24 months after last login
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            All transaction records are kept indefinitely for accounting and tax purposes as required by law.
          </p>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Delete Account</CardTitle>
          <CardDescription>Permanently delete your account and all associated data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            This action cannot be undone. All your referrals, earnings history, and account data will be permanently deleted.
          </p>
          <Button variant="destructive">Delete My Account</Button>
        </CardContent>
      </Card>
    </>
  );
}
