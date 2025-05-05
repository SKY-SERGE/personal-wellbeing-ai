
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dumbbell, Heart, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const weeklyData = [
  { day: 'Lun', steps: 7500, calories: 2100, activeMinutes: 35 },
  { day: 'Mar', steps: 9000, calories: 2000, activeMinutes: 42 },
  { day: 'Mer', steps: 5000, calories: 2200, activeMinutes: 28 },
  { day: 'Jeu', steps: 8500, calories: 1900, activeMinutes: 47 },
  { day: 'Ven', steps: 10000, calories: 2300, activeMinutes: 55 },
  { day: 'Sam', steps: 6000, calories: 2500, activeMinutes: 30 },
  { day: 'Dim', steps: 4000, calories: 2400, activeMinutes: 20 },
];

const weeklyComparison = [
  { name: 'Semaine dernière', steps: 42000, calories: 15400, activeMinutes: 240 },
  { name: 'Cette semaine', steps: 50000, calories: 16400, activeMinutes: 257 },
];

const heartRateData = [
  { time: '6h', rate: 62 },
  { time: '8h', rate: 78 },
  { time: '10h', rate: 72 },
  { time: '12h', rate: 75 },
  { time: '14h', rate: 82 },
  { time: '16h', rate: 90 },
  { time: '18h', rate: 85 },
  { time: '20h', rate: 72 },
  { time: '22h', rate: 65 },
];

const Activity = () => {
  const [timeRange, setTimeRange] = useState<string>("week");

  const handleTimeRangeChange = useCallback((value: string) => {
    setTimeRange(value);
    // Ici, vous pourriez charger des données différentes en fonction de la plage de temps
    console.log("Plage de temps sélectionnée:", value);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Tableau d'activité</h1>
          <p className="text-muted-foreground">
            Suivez votre activité physique et vos mesures de fitness.
          </p>
        </div>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Aujourd'hui</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
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
              <CardTitle className="text-lg">Pas quotidiens</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,243</div>
            <p className="text-sm text-muted-foreground mt-1">Objectif: 10,000 pas</p>
            <div className="h-2 bg-gray-100 rounded-full mt-2">
              <div className="h-2 bg-wellness-primary rounded-full" style={{ width: '82%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">82% de l'objectif quotidien</div>
          </CardContent>
        </Card>
        
        <Card className="data-card">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="mr-2 p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <Dumbbell className="h-4 w-4 text-wellness-secondary" />
              </div>
              <CardTitle className="text-lg">Minutes actives</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="text-sm text-muted-foreground mt-1">Objectif: 60 minutes</p>
            <div className="h-2 bg-gray-100 rounded-full mt-2">
              <div className="h-2 bg-wellness-secondary rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">78% de l'objectif quotidien</div>
          </CardContent>
        </Card>
        
        <Card className="data-card">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="mr-2 p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Heart className="h-4 w-4 text-wellness-accent" />
              </div>
              <CardTitle className="text-lg">Fréquence cardiaque au repos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68 <span className="text-sm font-normal">bpm</span></div>
            <p className="text-sm text-muted-foreground mt-1">-3 bpm par rapport à hier</p>
            <div className="text-xs text-green-600 font-medium mt-2">Dans la plage saine</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="data-card">
          <CardHeader>
            <CardTitle>Activité hebdomadaire</CardTitle>
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
                  <Bar dataKey="steps" name="Pas (×100)" fill="#3B82F6" barSize={20} />
                  <Bar dataKey="activeMinutes" name="Minutes actives" fill="#10B981" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="data-card">
          <CardHeader>
            <CardTitle>Fréquence cardiaque (Aujourd'hui)</CardTitle>
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
                    name="Fréquence cardiaque (bpm)"
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
          <CardTitle>Comparaison hebdomadaire</CardTitle>
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
                <Bar dataKey="steps" name="Pas (×1)" fill="#3B82F6" />
                <Bar dataKey="calories" name="Calories brûlées" fill="#10B981" />
                <Bar dataKey="activeMinutes" name="Minutes actives" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
