
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const NutritionSummary = () => {
  // Sample data
  const data = [
    { name: 'Protein', value: 30, color: '#3B82F6' },
    { name: 'Carbs', value: 45, color: '#10B981' },
    { name: 'Fat', value: 25, color: '#F59E0B' },
  ];

  // Custom labels for the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="stat-card w-full h-[300px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Nutrition Balance</CardTitle>
      </CardHeader>
      <CardContent className="h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NutritionSummary;
