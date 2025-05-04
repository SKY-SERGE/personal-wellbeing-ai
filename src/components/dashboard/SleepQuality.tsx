
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SleepQuality = () => {
  // Sample data - hours of sleep per day
  const data = [
    { day: 'Mon', hours: 7.5, quality: 85 },
    { day: 'Tue', hours: 6.2, quality: 65 },
    { day: 'Wed', hours: 8.1, quality: 90 },
    { day: 'Thu', hours: 7.0, quality: 80 },
    { day: 'Fri', hours: 5.5, quality: 60 },
    { day: 'Sat', hours: 9.0, quality: 95 },
    { day: 'Sun', hours: 8.5, quality: 85 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow text-sm">
          <p className="font-medium">{`${payload[0].payload.day}`}</p>
          <p className="text-wellness-primary">{`Sleep: ${payload[0].value} hrs`}</p>
          <p className="text-wellness-secondary">{`Quality: ${payload[0].payload.quality}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="stat-card w-full h-[300px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Sleep Quality</CardTitle>
      </CardHeader>
      <CardContent className="h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              domain={[0, 10]} 
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="hours" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SleepQuality;
