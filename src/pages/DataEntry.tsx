
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'nutrition';
  const [activeTab, setActiveTab] = useState(initialTab);

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
  
  // Set the active tab based on URL parameter
  useEffect(() => {
    if (['nutrition', 'exercise', 'sleep'].includes(initialTab)) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  
  const handleNutritionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Données nutritionnelles enregistrées avec succès !");
    // Reset form
    setMealType("");
    setFoodItems("");
    setCaloriesEstimate("");
  };
  
  const handleExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Données d'exercice enregistrées avec succès !");
    // Reset form
    setActivityType("");
    setDuration("");
    setIntensity("");
  };
  
  const handleSleepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Données de sommeil enregistrées avec succès !");
    // Reset form
    setSleepDuration("");
    setSleepQuality("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Enregistrer vos données</h1>
        <p className="text-muted-foreground">
          Suivez votre nutrition, exercice et sommeil pour recevoir des conseils personnalisés.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Nutrition</span>
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Exercice</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Sommeil</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle>Suivi nutritionnel</CardTitle>
              <CardDescription>Enregistrez ce que vous avez mangé pour suivre votre nutrition.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="nutrition-form" onSubmit={handleNutritionSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="meal-type">Type de repas</Label>
                    <Select value={mealType} onValueChange={setMealType}>
                      <SelectTrigger id="meal-type">
                        <SelectValue placeholder="Sélectionner un type de repas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Petit-déjeuner</SelectItem>
                        <SelectItem value="lunch">Déjeuner</SelectItem>
                        <SelectItem value="dinner">Dîner</SelectItem>
                        <SelectItem value="snack">Collation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="food-items">Aliments</Label>
                    <Textarea 
                      id="food-items" 
                      placeholder="Entrez ce que vous avez mangé"
                      value={foodItems}
                      onChange={(e) => setFoodItems(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="calories">Calories (estimation)</Label>
                    <Input 
                      id="calories" 
                      type="number" 
                      placeholder="ex. 500"
                      value={caloriesEstimate}
                      onChange={(e) => setCaloriesEstimate(e.target.value)} 
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="nutrition-form">Enregistrer les données nutritionnelles</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="exercise">
          <Card>
            <CardHeader>
              <CardTitle>Suivi d'exercice</CardTitle>
              <CardDescription>Enregistrez vos activités physiques.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="exercise-form" onSubmit={handleExerciseSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="activity-type">Type d'activité</Label>
                    <Select value={activityType} onValueChange={setActivityType}>
                      <SelectTrigger id="activity-type">
                        <SelectValue placeholder="Sélectionner un type d'activité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="walking">Marche</SelectItem>
                        <SelectItem value="running">Course</SelectItem>
                        <SelectItem value="cycling">Vélo</SelectItem>
                        <SelectItem value="swimming">Natation</SelectItem>
                        <SelectItem value="strength-training">Musculation</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Durée (minutes)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      placeholder="ex. 30"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="intensity">Intensité</Label>
                    <Select value={intensity} onValueChange={setIntensity}>
                      <SelectTrigger id="intensity">
                        <SelectValue placeholder="Sélectionner le niveau d'intensité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="moderate">Modérée</SelectItem>
                        <SelectItem value="high">Élevée</SelectItem>
                        <SelectItem value="very-high">Très élevée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="exercise-form">Enregistrer les données d'exercice</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Suivi du sommeil</CardTitle>
              <CardDescription>Enregistrez la durée et la qualité de votre sommeil.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="sleep-form" onSubmit={handleSleepSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sleep-duration">Heures de sommeil</Label>
                    <Input 
                      id="sleep-duration" 
                      type="number" 
                      placeholder="ex. 8"
                      step="0.5"
                      value={sleepDuration}
                      onChange={(e) => setSleepDuration(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="sleep-quality">Qualité du sommeil</Label>
                    <Select value={sleepQuality} onValueChange={setSleepQuality}>
                      <SelectTrigger id="sleep-quality">
                        <SelectValue placeholder="Évaluez la qualité de votre sommeil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poor">Mauvaise</SelectItem>
                        <SelectItem value="fair">Moyenne</SelectItem>
                        <SelectItem value="good">Bonne</SelectItem>
                        <SelectItem value="excellent">Excellente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="sleep-notes">Notes (Optionnel)</Label>
                    <Textarea id="sleep-notes" placeholder="Notes supplémentaires sur votre sommeil" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="sleep-form">Enregistrer les données de sommeil</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataEntry;
