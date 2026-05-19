"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UserProfile } from "@/types";

const INITIAL_PROFILE: UserProfile = {
  fullName: "Alice Johnson",
  email: "alice@example.com",
  bio: "Admin user managing the dashboard",
  role: "Admin",
};

export function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-slate-300 flex items-center justify-center text-2xl font-bold text-slate-700">
          AJ
        </div>
        <div>
          <p className="font-medium text-slate-900">{profile.fullName}</p>
          <p className="text-sm text-slate-500">{profile.role}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={profile.fullName}
            onChange={e => handleChange("fullName", e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={profile.email}
            onChange={e => handleChange("email", e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={profile.role}
            disabled
            className="mt-1 bg-slate-50"
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={e => handleChange("bio", e.target.value)}
            className="mt-1"
            rows={4}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleSave}>Save Changes</Button>
        {saved && <span className="text-sm text-green-600">✓ Saved!</span>}
      </div>
    </div>
  );
}
