
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Utensils, Dumbbell, Moon } from "lucide-react";

const DataEntry = () => {
  // State for nutrition form
  const [mealType, setMealType] = useState<string>("");
  const [foodItems, setFoodItems] = useState<string>("");
  const [caloriesEstimate, setCaloriesEstimate] = useState<string>("");
  
  // State for exercise form
  const [activityType, setActivityType] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [intensity, setIntensity] = useState<string>("");
  
  // State for sleep form
  const [sleepDuration, setSleepDuration] = useState<string>("");
  const [sleepQuality, setSleepQuality] = useState<string>("");
  
  const handleNutritionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Nutrition data saved successfully!");
    // Reset form
    setMealType("");
    setFoodItems("");
    setCaloriesEstimate("");
  };
  
  const handleExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Exercise data saved successfully!");
    // Reset form
    setActivityType("");
    setDuration("");
    setIntensity("");
  };
  
  const handleSleepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Sleep data saved successfully!");
    // Reset form
    setSleepDuration("");
    setSleepQuality("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Record Your Data</h1>
        <p className="text-muted-foreground">
          Keep track of your nutrition, exercise, and sleep to receive personalized insights.
        </p>
      </div>
      
      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Nutrition</span>
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Exercise</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Sleep</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Tracker</CardTitle>
              <CardDescription>Record what you've eaten to track your nutrition.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="nutrition-form" onSubmit={handleNutritionSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="meal-type">Meal Type</Label>
                    <Select value={mealType} onValueChange={setMealType}>
                      <SelectTrigger id="meal-type">
                        <SelectValue placeholder="Select a meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="food-items">Food Items</Label>
                    <Textarea 
                      id="food-items" 
                      placeholder="Enter what you ate"
                      value={foodItems}
                      onChange={(e) => setFoodItems(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="calories">Calories (estimate)</Label>
                    <Input 
                      id="calories" 
                      type="number" 
                      placeholder="e.g., 500"
                      value={caloriesEstimate}
                      onChange={(e) => setCaloriesEstimate(e.target.value)} 
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="nutrition-form">Save Nutrition Data</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="exercise">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Tracker</CardTitle>
              <CardDescription>Record your physical activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="exercise-form" onSubmit={handleExerciseSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="activity-type">Activity Type</Label>
                    <Select value={activityType} onValueChange={setActivityType}>
                      <SelectTrigger id="activity-type">
                        <SelectValue placeholder="Select an activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="walking">Walking</SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="cycling">Cycling</SelectItem>
                        <SelectItem value="swimming">Swimming</SelectItem>
                        <SelectItem value="strength-training">Strength Training</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      placeholder="e.g., 30"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="intensity">Intensity</Label>
                    <Select value={intensity} onValueChange={setIntensity}>
                      <SelectTrigger id="intensity">
                        <SelectValue placeholder="Select intensity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very-high">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="exercise-form">Save Exercise Data</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Tracker</CardTitle>
              <CardDescription>Record your sleep duration and quality.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="sleep-form" onSubmit={handleSleepSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sleep-duration">Hours Slept</Label>
                    <Input 
                      id="sleep-duration" 
                      type="number" 
                      placeholder="e.g., 8"
                      step="0.5"
                      value={sleepDuration}
                      onChange={(e) => setSleepDuration(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="sleep-quality">Sleep Quality</Label>
                    <Select value={sleepQuality} onValueChange={setSleepQuality}>
                      <SelectTrigger id="sleep-quality">
                        <SelectValue placeholder="Rate your sleep quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="sleep-notes">Notes (Optional)</Label>
                    <Textarea id="sleep-notes" placeholder="Any additional notes about your sleep" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="sleep-form">Save Sleep Data</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataEntry;
