
import React, { useCallback } from "react";
import { 
  Activity, 
  Brain, 
  Utensils, 
  Moon, 
  Heart,
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import WellnessScore from "@/components/dashboard/WellnessScore";
import ActivityOverview from "@/components/dashboard/ActivityOverview";
import NutritionSummary from "@/components/dashboard/NutritionSummary";
import SleepQuality from "@/components/dashboard/SleepQuality";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import { useProfileData } from "@/hooks/useProfileData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile } = useProfileData();
  
  const handleSleepRecommendationAction = useCallback(() => {
    navigate('/data-entry?tab=sleep');
  }, [navigate]);
  
  const handleNutritionRecommendationAction = useCallback(() => {
    navigate('/data-entry?tab=nutrition');
  }, [navigate]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Bienvenue {profile?.first_name || ""}
        </h1>
        <p className="text-muted-foreground">
          Voici un résumé de votre parcours santé.
        </p>
      </div>

      {/* Score et indicateurs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WellnessScore />
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="data-card flex items-center">
            <Activity className="h-8 w-8 text-wellness-primary mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Pas aujourd'hui</p>
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
              <p className="text-sm text-muted-foreground">Sommeil</p>
              <h3 className="text-2xl font-bold">7.5 hrs</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques d'activité et de sommeil */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityOverview />
        <SleepQuality />
      </div>

      {/* Nutrition et recommandations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionSummary />
        
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-xl font-semibold mb-2">Recommandations personnalisées</h2>
          <RecommendationCard 
            title="Améliorer la qualité du sommeil"
            description="Essayez de maintenir un horaire de sommeil régulier, même les week-ends."
            icon={<Moon className="h-4 w-4" />}
            actionLabel="Voir les détails"
            onAction={handleSleepRecommendationAction}
          />
          <RecommendationCard 
            title="Équilibre nutritionnel"
            description="Pensez à ajouter plus de protéines à votre petit-déjeuner pour rester rassasié plus longtemps."
            icon={<Utensils className="h-4 w-4" />}
            actionLabel="Voir les détails"
            onAction={handleNutritionRecommendationAction}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
