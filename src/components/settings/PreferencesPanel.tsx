"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import type { AppPreferences } from "@/types";

const INITIAL_PREFS: AppPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  weeklyDigest: false,
  darkMode: false,
  compactView: false,
  autoSave: true,
};

export function PreferencesPanel() {
  const [prefs, setPrefs] = useState<AppPreferences>(INITIAL_PREFS);

  const handleChange = (key: keyof AppPreferences) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif" className="cursor-pointer">Email Notifications</Label>
            <Switch
              id="email-notif"
              checked={prefs.emailNotifications}
              onCheckedChange={() => handleChange("emailNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notif" className="cursor-pointer">Push Notifications</Label>
            <Switch
              id="push-notif"
              checked={prefs.pushNotifications}
              onCheckedChange={() => handleChange("pushNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="weekly-digest" className="cursor-pointer">Weekly Digest</Label>
            <Switch
              id="weekly-digest"
              checked={prefs.weeklyDigest}
              onCheckedChange={() => handleChange("weeklyDigest")}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Application</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="cursor-pointer">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={prefs.darkMode}
              onCheckedChange={() => handleChange("darkMode")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="compact-view" className="cursor-pointer">Compact View</Label>
            <Switch
              id="compact-view"
              checked={prefs.compactView}
              onCheckedChange={() => handleChange("compactView")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-save" className="cursor-pointer">Auto-save</Label>
            <Switch
              id="auto-save"
              checked={prefs.autoSave}
              onCheckedChange={() => handleChange("autoSave")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
