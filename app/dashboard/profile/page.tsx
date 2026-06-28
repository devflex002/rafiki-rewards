'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileForm } from '@/components/profile/profile-form';
import { PaymentSettings } from '@/components/profile/payment-settings';
import { NotificationSettings } from '@/components/profile/notification-settings';
import { PrivacySettings } from '@/components/profile/privacy-settings';
import { User, CreditCard, Bell, Lock } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4 hidden sm:block" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4 hidden sm:block" />
            <span>Payment</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4 hidden sm:block" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Lock className="h-4 w-4 hidden sm:block" />
            <span>Privacy</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <ProfileForm />
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="space-y-6">
          <PaymentSettings />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <PrivacySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
