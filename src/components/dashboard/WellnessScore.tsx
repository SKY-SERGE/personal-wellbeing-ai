
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const WellnessScore = () => {
  // This would come from an API or state in a real application
  const score = 78;
  
  return (
    <Card className="stat-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Wellness Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <span className="text-4xl font-bold text-wellness-primary">{score}</span>
          <span className="text-muted-foreground text-sm">/ 100</span>
        </div>
        <Progress value={score} className="h-2 mt-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs improvement'}
        </p>
      </CardContent>
    </Card>
  );
};

export default WellnessScore;
