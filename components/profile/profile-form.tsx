'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Camera } from 'lucide-react';

export function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    bio: 'Digital marketer and content creator focused on affiliate marketing.',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload or change your profile picture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://avatar.vercel.sh/user" alt="Profile" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload New Picture
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, PNG or GIF (Max 5MB)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </div>
          <Button
            variant={isEditing ? 'default' : 'outline'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Germany</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div>
              <p className="font-medium text-sm">Password</p>
              <p className="text-xs text-muted-foreground">Change your password</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div>
              <p className="font-medium text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div>
              <p className="font-medium text-sm">Login Activity</p>
              <p className="text-xs text-muted-foreground">View recent login sessions</p>
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
