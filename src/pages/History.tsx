
import React, { useState, useCallback, useEffect } from "react";
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
import { Download } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { nutritionService } from "@/services/nutritionService";
import { exerciseService } from "@/services/exerciseService";
import { sleepService } from "@/services/sleepService";
import { formatDate as formatISODate } from 'date-fns';

// Type definitions for our data
type NutritionEntry = {
  id: string;
  date: string;
  meal_type: string;
  calories?: number;
  description?: string;
};

type ExerciseEntry = {
  id: string;
  date: string;
  activity_type: string;
  duration: number;
  intensity?: string;
  calories_burned?: number;
};

type SleepEntry = {
  id: string;
  date: string;
  hours?: number;
  quality: string;
  notes?: string;
};

const History = () => {
  const [dataType, setDataType] = useState<string>("nutrition");
  const [period, setPeriod] = useState<string>("week");
  const [nutritionHistory, setNutritionHistory] = useState<NutritionEntry[]>([]);
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseEntry[]>([]);
  const [sleepHistory, setSleepHistory] = useState<SleepEntry[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  
  // Calculer les dates de début et fin basées sur la période
  const getDateRanges = () => {
    const today = new Date();
    let startDate: Date;
    
    switch(period) {
      case 'week':
        startDate = new Date();
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date();
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate = new Date();
        startDate.setDate(today.getDate() - 7); // Par défaut une semaine
    }
    
    return {
      startDate: formatISODate(startDate, 'yyyy-MM-dd'),
      endDate: formatISODate(today, 'yyyy-MM-dd')
    };
  };
  
  // Charger les données selon le type et la période
  const loadData = useCallback(async () => {
    if (!user) return;
    
    const { startDate, endDate } = getDateRanges();
    setLoading(true);
    
    try {
      switch(dataType) {
        case 'nutrition':
          const nutritionEntries = await nutritionService.getNutritionEntries(user.id, startDate, endDate);
          setNutritionHistory(nutritionEntries.map(entry => ({
            id: entry.id,
            date: entry.date,
            meal_type: entry.meal_type,
            calories: 0, // Ces valeurs devraient être calculées à partir des items liés
            description: "Repas enregistré" // Description à enrichir
          })));
          break;
          
        case 'exercise':
          const exerciseEntries = await exerciseService.getExerciseEntries(user.id, startDate, endDate);
          setExerciseHistory(exerciseEntries.map(entry => ({
            id: entry.id,
            date: entry.date,
            activity_type: entry.activity_type,
            duration: entry.duration,
            intensity: entry.intensity,
            calories_burned: entry.calories_burned
          })));
          break;
          
        case 'sleep':
          const sleepEntries = await sleepService.getSleepEntries(user.id, startDate, endDate);
          setSleepHistory(sleepEntries.map(entry => ({
            id: entry.id,
            date: entry.date,
            hours: entry.hours,
            quality: entry.quality,
            notes: entry.notes
          })));
          break;
      }
    } catch (error) {
      console.error(`Error loading ${dataType} data:`, error);
      toast.error(`Erreur lors du chargement des données de ${dataType}`);
    } finally {
      setLoading(false);
    }
  }, [user, dataType, period]);
  
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, dataType, period, loadData]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const handleDataTypeChange = useCallback((value: string) => {
    setDataType(value);
  }, []);
  
  const handlePeriodChange = useCallback((value: string) => {
    setPeriod(value);
    console.log("Plage de temps sélectionnée:", value);
  }, []);

  const handleExportData = useCallback(() => {
    let dataToExport;
    let filename;
    
    switch (dataType) {
      case 'nutrition':
        dataToExport = nutritionHistory;
        filename = `nutrition_${period}_${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case 'exercise':
        dataToExport = exerciseHistory;
        console.log("Exporting exercise data for " + period + ":", dataToExport);
        filename = `exercice_${period}_${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case 'sleep':
        dataToExport = sleepHistory;
        filename = `sommeil_${period}_${new Date().toISOString().split('T')[0]}.csv`;
        break;
      default:
        dataToExport = [];
        filename = `donnees_${period}_${new Date().toISOString().split('T')[0]}.csv`;
    }
    
    // Convertir les données en format CSV
    const headers = Object.keys(dataToExport[0] || {}).join(',');
    const rows = dataToExport.map(item => Object.values(item).join(','));
    const csv = [headers, ...rows].join('\n');
    
    // Créer un blob et télécharger
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Données exportées avec succès: ${filename}`);
  }, [dataType, period, nutritionHistory, exerciseHistory, sleepHistory]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Votre historique</h1>
        <p className="text-muted-foreground">
          Consultez et analysez vos données de santé historiques.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={dataType} onValueChange={handleDataTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner un type de données" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nutrition">Nutrition</SelectItem>
              <SelectItem value="exercise">Exercice</SelectItem>
              <SelectItem value="sleep">Sommeil</SelectItem>
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="outline" 
          onClick={handleExportData} 
          className="flex items-center gap-2"
          disabled={loading || 
            (dataType === 'nutrition' && nutritionHistory.length === 0) || 
            (dataType === 'exercise' && exerciseHistory.length === 0) || 
            (dataType === 'sleep' && sleepHistory.length === 0)
          }
        >
          <Download className="h-4 w-4" />
          <span>Exporter les données</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {dataType === "nutrition" 
              ? "Historique de nutrition" 
              : dataType === "exercise" 
                ? "Historique d'exercice" 
                : "Historique de sommeil"
            }
          </CardTitle>
          <CardDescription>
            {dataType === "nutrition" 
              ? "Vos repas récents et informations nutritionnelles" 
              : dataType === "exercise" 
                ? "Vos activités physiques récentes" 
                : "Vos habitudes de sommeil récentes"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {dataType === "nutrition" && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Repas</TableHead>
                      <TableHead>Calories</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nutritionHistory.length > 0 ? (
                      nutritionHistory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>{item.meal_type}</TableCell>
                          <TableCell>{item.calories || 'N/A'}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.description || 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-10">
                          Aucune donnée nutritionnelle disponible pour cette période
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}

              {dataType === "exercise" && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Durée (min)</TableHead>
                      <TableHead className="hidden md:table-cell">Intensité</TableHead>
                      <TableHead>Calories</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exerciseHistory.length > 0 ? (
                      exerciseHistory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>{item.activity_type}</TableCell>
                          <TableCell>{item.duration}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.intensity || 'N/A'}</TableCell>
                          <TableCell>{item.calories_burned || 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                          Aucune donnée d'exercice disponible pour cette période
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}

              {dataType === "sleep" && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Heures</TableHead>
                      <TableHead>Qualité</TableHead>
                      <TableHead className="hidden md:table-cell">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sleepHistory.length > 0 ? (
                      sleepHistory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>{item.hours || 'N/A'}</TableCell>
                          <TableCell>{item.quality}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.notes || 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-10">
                          Aucune donnée de sommeil disponible pour cette période
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
