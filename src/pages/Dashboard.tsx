
import React from "react";
import { 
  Activity, 
  Brain, 
  Utensils, 
  Moon, 
  Heart 
} from "lucide-react";
import WellnessScore from "@/components/dashboard/WellnessScore";
import ActivityOverview from "@/components/dashboard/ActivityOverview";
import NutritionSummary from "@/components/dashboard/NutritionSummary";
import SleepQuality from "@/components/dashboard/SleepQuality";
import RecommendationCard from "@/components/dashboard/RecommendationCard";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Alex</h1>
        <p className="text-muted-foreground">
          Here's a summary of your wellness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WellnessScore />
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="data-card flex items-center">
            <Activity className="h-8 w-8 text-wellness-primary mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Daily Steps</p>
              <h3 className="text-2xl font-bold">8,243</h3>
            </div>
          </div>
          <div className="data-card flex items-center">
            <Utensils className="h-8 w-8 text-wellness-secondary mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Calories</p>
              <h3 className="text-2xl font-bold">1,840</h3>
            </div>
          </div>
          <div className="data-card flex items-center">
            <Moon className="h-8 w-8 text-wellness-accent mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Sleep</p>
              <h3 className="text-2xl font-bold">7.5 hrs</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityOverview />
        <SleepQuality />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionSummary />
        
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-xl font-semibold">Personalized Recommendations</h2>
          <RecommendationCard 
            title="Improve Sleep Quality"
            description="Try to maintain a consistent sleep schedule, even on weekends."
            icon={<Moon className="h-4 w-4" />}
          />
          <RecommendationCard 
            title="Nutritional Balance"
            description="Consider adding more protein to your breakfast to stay fuller longer."
            icon={<Utensils className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
