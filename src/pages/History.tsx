
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample historical data
const nutritionHistory = [
  { id: 1, date: "2025-05-04", meal: "Breakfast", calories: 450, description: "Oatmeal with berries and nuts" },
  { id: 2, date: "2025-05-04", meal: "Lunch", calories: 650, description: "Quinoa salad with grilled chicken" },
  { id: 3, date: "2025-05-04", meal: "Dinner", calories: 750, description: "Baked salmon with vegetables" },
  { id: 4, date: "2025-05-03", meal: "Breakfast", calories: 400, description: "Scrambled eggs with toast" },
  { id: 5, date: "2025-05-03", meal: "Lunch", calories: 600, description: "Turkey sandwich with side salad" },
];

const exerciseHistory = [
  { id: 1, date: "2025-05-04", type: "Running", duration: 30, intensity: "High", calories: 350 },
  { id: 2, date: "2025-05-03", type: "Strength Training", duration: 45, intensity: "Moderate", calories: 300 },
  { id: 3, date: "2025-05-02", type: "Yoga", duration: 60, intensity: "Low", calories: 200 },
  { id: 4, date: "2025-05-01", type: "Cycling", duration: 40, intensity: "High", calories: 400 },
];

const sleepHistory = [
  { id: 1, date: "2025-05-04", hours: 7.5, quality: "Good", notes: "Woke up once" },
  { id: 2, date: "2025-05-03", hours: 6.0, quality: "Fair", notes: "Had trouble falling asleep" },
  { id: 3, date: "2025-05-02", hours: 8.0, quality: "Excellent", notes: "Slept through the night" },
  { id: 4, date: "2025-05-01", hours: 5.5, quality: "Poor", notes: "Restless sleep" },
];

const History = () => {
  const [dataType, setDataType] = React.useState("nutrition");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your History</h1>
        <p className="text-muted-foreground">
          View and analyze your historical health data.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Select value={dataType} onValueChange={setDataType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select data type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nutrition">Nutrition</SelectItem>
            <SelectItem value="exercise">Exercise</SelectItem>
            <SelectItem value="sleep">Sleep</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">Export Data</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {dataType === "nutrition" 
              ? "Nutrition History" 
              : dataType === "exercise" 
                ? "Exercise History" 
                : "Sleep History"
            }
          </CardTitle>
          <CardDescription>
            {dataType === "nutrition" 
              ? "Your recent meals and nutrition information" 
              : dataType === "exercise" 
                ? "Your recent physical activities" 
                : "Your recent sleep patterns"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dataType === "nutrition" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Meal</TableHead>
                  <TableHead>Calories</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nutritionHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{formatDate(item.date)}</TableCell>
                    <TableCell>{item.meal}</TableCell>
                    <TableCell>{item.calories}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {dataType === "exercise" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration (min)</TableHead>
                  <TableHead className="hidden md:table-cell">Intensity</TableHead>
                  <TableHead>Calories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exerciseHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{formatDate(item.date)}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.intensity}</TableCell>
                    <TableCell>{item.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {dataType === "sleep" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead className="hidden md:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sleepHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{formatDate(item.date)}</TableCell>
                    <TableCell>{item.hours}</TableCell>
                    <TableCell>{item.quality}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
