
import React from "react";
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

const Profile = () => {
  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile information updated successfully!");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Preferences updated successfully!");
  };

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Goals updated successfully!");
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
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Alex Johnson</h2>
                <p className="text-sm text-muted-foreground">Member since May 2025</p>
              </div>
              <Separator />
              <div className="grid w-full gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Activity Streak</span>
                  <span className="font-medium">14 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Data Entries</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Wellness Score</span>
                  <span className="font-medium">78/100</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">Update Photo</Button>
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
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" defaultValue="Alex" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" defaultValue="Johnson" />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="alex@example.com" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="age">Age</Label>
                          <Input id="age" type="number" defaultValue="32" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select defaultValue="male">
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
                          <Input id="height" type="number" defaultValue="178" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input id="weight" type="number" defaultValue="75" />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end">
                  <Button type="submit" form="personal-form">Save Changes</Button>
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
                        <Select defaultValue="metric">
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
                        <Select defaultValue="all">
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
                        <Select defaultValue="system">
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
                  <Button type="submit" form="preferences-form">Save Preferences</Button>
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
                        <Label htmlFor="daily-steps">Daily Steps Goal</Label>
                        <Input id="daily-steps" type="number" defaultValue="10000" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="active-minutes">Active Minutes Goal (per day)</Label>
                        <Input id="active-minutes" type="number" defaultValue="60" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="sleep-goal">Sleep Goal (hours per night)</Label>
                        <Input id="sleep-goal" type="number" step="0.5" defaultValue="8" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="weight-goal">Weight Goal (kg)</Label>
                        <Input id="weight-goal" type="number" step="0.5" defaultValue="70" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="goal-notes">Notes on Your Goals</Label>
                        <Textarea 
                          id="goal-notes" 
                          placeholder="Add any additional details about your wellness goals..."
                          defaultValue="I want to improve my overall fitness and energy levels while maintaining a healthy weight."
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end">
                  <Button type="submit" form="goals-form">Save Goals</Button>
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
