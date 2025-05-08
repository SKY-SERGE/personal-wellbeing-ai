
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useProfileData } from "@/hooks/useProfileData";
import { supabase } from "@/integrations/supabase/client";

type ProfileForm = {
  first_name: string;
  last_name: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
};

type PreferencesForm = {
  units: string;
  notifications: string;
  theme: string;
};

type GoalsForm = {
  daily_steps: string;
  active_minutes: string;
  sleep_goal: string;
  weight_goal: string;
  goal_notes: string;
};

const Profile = () => {
  const { profile, updateProfile, updateProfileLoading } = useProfileData();
  const { user } = supabase.auth.getUser();
  
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: ""
  });
  
  const [preferencesForm, setPreferencesForm] = useState<PreferencesForm>({
    units: "metric",
    notifications: "all",
    theme: "system"
  });
  
  const [goalsForm, setGoalsForm] = useState<GoalsForm>({
    daily_steps: "10000",
    active_minutes: "60",
    sleep_goal: "8",
    weight_goal: "",
    goal_notes: ""
  });
  
  // Initialize form data from profile
  useEffect(() => {
    if (profile) {
      setProfileForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: user?.email || "",
        age: profile.age?.toString() || "",
        gender: profile.gender || "",
        height: profile.height?.toString() || "",
        weight: profile.weight?.toString() || ""
      });
      
      setPreferencesForm({
        units: profile.units || "metric",
        notifications: profile.notification_preference || "all",
        theme: profile.theme || "system"
      });
      
      setGoalsForm({
        daily_steps: profile.daily_steps?.toString() || "10000",
        active_minutes: profile.active_minutes?.toString() || "60",
        sleep_goal: profile.sleep_goal?.toString() || "8",
        weight_goal: profile.weight_goal?.toString() || "",
        goal_notes: profile.goal_notes || ""
      });
    }
  }, [profile, user]);

  const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferencesFormChange = (key: keyof PreferencesForm, value: string) => {
    setPreferencesForm(prev => ({ ...prev, [key]: value }));
  };

  const handleGoalsFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGoalsForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateProfile({
        first_name: profileForm.first_name,
        last_name: profileForm.last_name,
        age: profileForm.age ? parseInt(profileForm.age) : undefined,
        gender: profileForm.gender,
        height: profileForm.height ? parseFloat(profileForm.height) : undefined,
        weight: profileForm.weight ? parseFloat(profileForm.weight) : undefined
      });
      
      toast.success("Profile information updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile information");
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateProfile({
        units: preferencesForm.units,
        notification_preference: preferencesForm.notifications,
        theme: preferencesForm.theme
      });
      
      toast.success("Preferences updated successfully!");
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences");
    }
  };

  const handleSaveGoals = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateProfile({
        daily_steps: goalsForm.daily_steps ? parseInt(goalsForm.daily_steps) : undefined,
        active_minutes: goalsForm.active_minutes ? parseInt(goalsForm.active_minutes) : undefined,
        sleep_goal: goalsForm.sleep_goal ? parseFloat(goalsForm.sleep_goal) : undefined,
        weight_goal: goalsForm.weight_goal ? parseFloat(goalsForm.weight_goal) : undefined,
        goal_notes: goalsForm.goal_notes
      });
      
      toast.success("Goals updated successfully!");
    } catch (error) {
      console.error("Error updating goals:", error);
      toast.error("Failed to update goals");
    }
  };

  const handleUpdatePhoto = async () => {
    // Simulating file upload - in a real app, you would use file input and handle file upload
    toast.info("La fonctionnalité de mise à jour de photo sera bientôt disponible.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your account details and preferences.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || "https://github.com/shadcn.png"} alt={profile?.first_name || "User"} />
                <AvatarFallback>{profile?.first_name?.charAt(0) || "U"}{profile?.last_name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{profile?.first_name || "User"} {profile?.last_name}</h2>
                <p className="text-sm text-muted-foreground">Membre depuis {new Date(profile?.created_at || Date.now()).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</p>
              </div>
              <Separator />
              <div className="grid w-full gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Activity Streak</span>
                  <span className="font-medium">{profile?.activity_streak || 0} jours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Data Entries</span>
                  <span className="font-medium">{profile?.data_entries || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Wellness Score</span>
                  <span className="font-medium">{profile?.wellness_score || 0}/100</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleUpdatePhoto}>Update Photo</Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:w-2/3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="personal-form" onSubmit={handleSavePersonal}>
                    <div className="grid gap-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="first_name">First Name</Label>
                          <Input 
                            id="first_name" 
                            name="first_name" 
                            value={profileForm.first_name} 
                            onChange={handleProfileFormChange} 
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input 
                            id="last_name" 
                            name="last_name" 
                            value={profileForm.last_name} 
                            onChange={handleProfileFormChange} 
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={profileForm.email} 
                          onChange={handleProfileFormChange}
                          readOnly 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="age">Age</Label>
                          <Input 
                            id="age" 
                            name="age" 
                            type="number" 
                            value={profileForm.age} 
                            onChange={handleProfileFormChange} 
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select 
                            value={profileForm.gender} 
                            onValueChange={(value) => setProfileForm(prev => ({ ...prev, gender: value }))}
                          >
                            <SelectTrigger id="gender">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="non-binary">Non-binary</SelectItem>
                              <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input 
                            id="height" 
                            name="height" 
                            type="number" 
                            value={profileForm.height} 
                            onChange={handleProfileFormChange} 
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input 
                            id="weight" 
                            name="weight" 
                            type="number" 
                            value={profileForm.weight} 
                            onChange={handleProfileFormChange} 
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end">
                  <Button 
                    type="submit" 
                    form="personal-form" 
                    disabled={updateProfileLoading}
                  >
                    {updateProfileLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your app experience.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="preferences-form" onSubmit={handleSavePreferences}>
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="units">Measurement Units</Label>
                        <Select 
                          value={preferencesForm.units} 
                          onValueChange={(value) => handlePreferencesFormChange('units', value)}
                        >
                          <SelectTrigger id="units">
                            <SelectValue placeholder="Select units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                            <SelectItem value="imperial">Imperial (lb, ft/in)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="notifications">Notification Preferences</Label>
                        <Select 
                          value={preferencesForm.notifications} 
                          onValueChange={(value) => handlePreferencesFormChange('notifications', value)}
                        >
                          <SelectTrigger id="notifications">
                            <SelectValue placeholder="Select notification preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Notifications</SelectItem>
                            <SelectItem value="important">Important Only</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="theme">App Theme</Label>
                        <Select 
                          value={preferencesForm.theme} 
                          onValueChange={(value) => handlePreferencesFormChange('theme', value)}
                        >
                          <SelectTrigger id="theme">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end">
                  <Button 
                    type="submit" 
                    form="preferences-form" 
                    disabled={updateProfileLoading}
                  >
                    {updateProfileLoading ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="goals">
              <Card>
                <CardHeader>
                  <CardTitle>Wellness Goals</CardTitle>
                  <CardDescription>Set your health and wellness targets.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="goals-form" onSubmit={handleSaveGoals}>
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="daily_steps">Daily Steps Goal</Label>
                        <Input 
                          id="daily_steps" 
                          name="daily_steps" 
                          type="number" 
                          value={goalsForm.daily_steps} 
                          onChange={handleGoalsFormChange} 
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="active_minutes">Active Minutes Goal (per day)</Label>
                        <Input 
                          id="active_minutes" 
                          name="active_minutes" 
                          type="number" 
                          value={goalsForm.active_minutes} 
                          onChange={handleGoalsFormChange} 
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="sleep_goal">Sleep Goal (hours per night)</Label>
                        <Input 
                          id="sleep_goal" 
                          name="sleep_goal" 
                          type="number" 
                          step="0.5" 
                          value={goalsForm.sleep_goal} 
                          onChange={handleGoalsFormChange} 
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="weight_goal">Weight Goal (kg)</Label>
                        <Input 
                          id="weight_goal" 
                          name="weight_goal" 
                          type="number" 
                          step="0.5" 
                          value={goalsForm.weight_goal} 
                          onChange={handleGoalsFormChange} 
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="goal_notes">Notes on Your Goals</Label>
                        <Textarea 
                          id="goal_notes" 
                          name="goal_notes"
                          placeholder="Add any additional details about your wellness goals..."
                          value={goalsForm.goal_notes}
                          onChange={handleGoalsFormChange}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end">
                  <Button 
                    type="submit" 
                    form="goals-form" 
                    disabled={updateProfileLoading}
                  >
                    {updateProfileLoading ? "Saving..." : "Save Goals"}
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
