'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Kenya',
    bio: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      const parts = user.name ? user.name.split(' ') : ['', ''];
      const first = parts[0] || '';
      const last = parts.slice(1).join(' ') || '';
      
      setFormData({
        firstName: first,
        lastName: last,
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || 'Kenya',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditing) {
      updateProfile({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        bio: formData.bio,
      });
    }
    setIsEditing(!isEditing);
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
    : 'U';

  return (
    <>
      {/* Profile Picture */}
      <Card className="bg-zinc-900/40 border-zinc-800">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload or change your profile picture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://avatar.vercel.sh/${user?.name?.replace(/\s+/g, '')}`} alt="Profile" />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" className="gap-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white">
                <Upload className="h-4 w-4" />
                Upload New Picture
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF (Max 5MB)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="bg-zinc-900/40 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </div>
          <Button
            variant={isEditing ? 'default' : 'outline'}
            onClick={handleSave}
            className={isEditing ? 'bg-purple-600 hover:bg-purple-500 text-white font-bold' : 'border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white'}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase">First Name</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-zinc-950 border-zinc-800 disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase">Last Name</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-zinc-950 border-zinc-800 disabled:opacity-70"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase">Email Address</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-zinc-950 border-zinc-800 disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase">Phone Number</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-zinc-950 border-zinc-800 disabled:opacity-70 font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 text-sm rounded-md border border-zinc-800 bg-zinc-950 text-foreground disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-purple-500"
              >
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Rwanda">Rwanda</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 text-sm rounded-md border border-zinc-800 bg-zinc-950 text-zinc-100 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card className="bg-zinc-900/40 border-zinc-800">
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-zinc-850 last:border-0">
            <div>
              <p className="font-semibold text-sm text-zinc-200">Password</p>
              <p className="text-xs text-muted-foreground">Change your account password</p>
            </div>
            <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white">
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-zinc-850 last:border-0">
            <div>
              <p className="font-semibold text-sm text-zinc-200">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </div>
            <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-zinc-850 last:border-0">
            <div>
              <p className="font-semibold text-sm text-zinc-200">Login Activity</p>
              <p className="text-xs text-muted-foreground">View recent login sessions</p>
            </div>
            <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white">
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
