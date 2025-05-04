
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dumbbell, Heart, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const weeklyData = [
  { day: 'Mon', steps: 7500, calories: 2100, activeMinutes: 35 },
  { day: 'Tue', steps: 9000, calories: 2000, activeMinutes: 42 },
  { day: 'Wed', steps: 5000, calories: 2200, activeMinutes: 28 },
  { day: 'Thu', steps: 8500, calories: 1900, activeMinutes: 47 },
  { day: 'Fri', steps: 10000, calories: 2300, activeMinutes: 55 },
  { day: 'Sat', steps: 6000, calories: 2500, activeMinutes: 30 },
  { day: 'Sun', steps: 4000, calories: 2400, activeMinutes: 20 },
];

const weeklyComparison = [
  { name: 'Last Week', steps: 42000, calories: 15400, activeMinutes: 240 },
  { name: 'This Week', steps: 50000, calories: 16400, activeMinutes: 257 },
];

const heartRateData = [
  { time: '6am', rate: 62 },
  { time: '8am', rate: 78 },
  { time: '10am', rate: 72 },
  { time: '12pm', rate: 75 },
  { time: '2pm', rate: 82 },
  { time: '4pm', rate: 90 },
  { time: '6pm', rate: 85 },
  { time: '8pm', rate: 72 },
  { time: '10pm', rate: 65 },
];

const Activity = () => {
  const [timeRange, setTimeRange] = React.useState("week");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Activity Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your physical activity and fitness metrics.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="data-card">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="mr-2 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <TrendingUp className="h-4 w-4 text-wellness-primary" />
              </div>
              <CardTitle className="text-lg">Daily Steps</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,243</div>
            <p className="text-sm text-muted-foreground mt-1">Goal: 10,000 steps</p>
            <div className="h-2 bg-gray-100 rounded-full mt-2">
              <div className="h-2 bg-wellness-primary rounded-full" style={{ width: '82%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">82% of daily goal</div>
          </CardContent>
        </Card>
        
        <Card className="data-card">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="mr-2 p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <Dumbbell className="h-4 w-4 text-wellness-secondary" />
              </div>
              <CardTitle className="text-lg">Active Minutes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="text-sm text-muted-foreground mt-1">Goal: 60 minutes</p>
            <div className="h-2 bg-gray-100 rounded-full mt-2">
              <div className="h-2 bg-wellness-secondary rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">78% of daily goal</div>
          </CardContent>
        </Card>
        
        <Card className="data-card">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="mr-2 p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Heart className="h-4 w-4 text-wellness-accent" />
              </div>
              <CardTitle className="text-lg">Resting Heart Rate</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68 <span className="text-sm font-normal">bpm</span></div>
            <p className="text-sm text-muted-foreground mt-1">-3 bpm from yesterday</p>
            <div className="text-xs text-green-600 font-medium mt-2">Within healthy range</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="data-card">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="steps" name="Steps (×100)" fill="#3B82F6" barSize={20} />
                  <Bar dataKey="activeMinutes" name="Active Minutes" fill="#10B981" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="data-card">
          <CardHeader>
            <CardTitle>Heart Rate (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={heartRateData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    name="Heart Rate (bpm)"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="data-card">
        <CardHeader>
          <CardTitle>Weekly Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyComparison}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="steps" name="Steps (×1)" fill="#3B82F6" />
                <Bar dataKey="calories" name="Calories Burned" fill="#10B981" />
                <Bar dataKey="activeMinutes" name="Active Minutes" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
