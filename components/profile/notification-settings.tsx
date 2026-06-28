'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const notificationOptions: NotificationOption[] = [
  {
    id: 'new-referral',
    title: 'New Referral Signup',
    description: 'Get notified when someone signs up using your link',
    enabled: true,
  },
  {
    id: 'earnings',
    title: 'Earnings Updates',
    description: 'Receive daily earnings summary',
    enabled: true,
  },
  {
    id: 'milestone',
    title: 'Milestone Achievements',
    description: 'Celebrate when you reach earning milestones',
    enabled: true,
  },
  {
    id: 'withdrawal',
    title: 'Withdrawal Confirmation',
    description: 'Get notified about withdrawal requests and completions',
    enabled: true,
  },
  {
    id: 'account',
    title: 'Account Updates',
    description: 'Important account security and update notifications',
    enabled: true,
  },
  {
    id: 'promotional',
    title: 'Promotional Offers',
    description: 'New features, promotions, and special opportunities',
    enabled: false,
  },
];

export function NotificationSettings() {
  return (
    <>
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose which emails you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationOptions.map((option) => (
            <div key={option.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <input
                type="checkbox"
                id={option.id}
                className="rounded"
                defaultChecked={option.enabled}
              />
              <div className="flex-1">
                <label htmlFor={option.id} className="font-medium text-sm cursor-pointer">
                  {option.title}
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Frequency */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Frequency</CardTitle>
          <CardDescription>How often you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { label: 'Real-time', description: 'Get notified immediately' },
              { label: 'Daily Digest', description: 'Receive one email per day' },
              { label: 'Weekly Digest', description: 'Receive one email per week' },
            ].map((option, i) => (
              <label key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                <input
                  type="radio"
                  name="frequency"
                  defaultChecked={i === 0}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
          <CardDescription>Don't send notifications during these hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <input type="checkbox" id="quiet-hours" className="rounded" defaultChecked />
            <label htmlFor="quiet-hours" className="text-sm font-medium cursor-pointer">
              Enable quiet hours
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <input type="time" defaultValue="22:00" className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <input type="time" defaultValue="08:00" className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm" />
            </div>
          </div>

          <Button>Save Quiet Hours</Button>
        </CardContent>
      </Card>
    </>
  );
}
