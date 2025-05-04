
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityOverview = () => {
  // Sample data
  const data = [
    { name: 'Mon', steps: 7500, calories: 2100 },
    { name: 'Tue', steps: 9000, calories: 2000 },
    { name: 'Wed', steps: 5000, calories: 2200 },
    { name: 'Thu', steps: 8500, calories: 1900 },
    { name: 'Fri', steps: 10000, calories: 2300 },
    { name: 'Sat', steps: 6000, calories: 2500 },
    { name: 'Sun', steps: 4000, calories: 2400 },
  ];

  return (
    <Card className="stat-card w-full h-[300px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="steps" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#colorSteps)" 
              name="Steps"
            />
            <Area 
              type="monotone" 
              dataKey="calories" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorCalories)" 
              name="Calories"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityOverview;
