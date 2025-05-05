
import React, { useState, useCallback } from "react";
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

// Sample historical data
const nutritionHistory = [
  { id: 1, date: "2025-05-04", meal: "Petit-déjeuner", calories: 450, description: "Flocons d'avoine avec baies et noix" },
  { id: 2, date: "2025-05-04", meal: "Déjeuner", calories: 650, description: "Salade de quinoa avec poulet grillé" },
  { id: 3, date: "2025-05-04", meal: "Dîner", calories: 750, description: "Saumon cuit au four avec légumes" },
  { id: 4, date: "2025-05-03", meal: "Petit-déjeuner", calories: 400, description: "Œufs brouillés avec pain grillé" },
  { id: 5, date: "2025-05-03", meal: "Déjeuner", calories: 600, description: "Sandwich à la dinde avec salade" },
];

const exerciseHistory = [
  { id: 1, date: "2025-05-04", type: "Course", duration: 30, intensity: "Elevée", calories: 350 },
  { id: 2, date: "2025-05-03", type: "Musculation", duration: 45, intensity: "Modérée", calories: 300 },
  { id: 3, date: "2025-05-02", type: "Yoga", duration: 60, intensity: "Faible", calories: 200 },
  { id: 4, date: "2025-05-01", type: "Vélo", duration: 40, intensity: "Elevée", calories: 400 },
];

const sleepHistory = [
  { id: 1, date: "2025-05-04", hours: 7.5, quality: "Bonne", notes: "Réveillé une fois" },
  { id: 2, date: "2025-05-03", hours: 6.0, quality: "Moyenne", notes: "Difficulté à s'endormir" },
  { id: 3, date: "2025-05-02", hours: 8.0, quality: "Excellente", notes: "Sommeil ininterrompu" },
  { id: 4, date: "2025-05-01", hours: 5.5, quality: "Mauvaise", notes: "Sommeil agité" },
];

const History = () => {
  const [dataType, setDataType] = useState<string>("nutrition");
  const [period, setPeriod] = useState<string>("week");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const handleDataTypeChange = useCallback((value: string) => {
    setDataType(value);
  }, []);
  
  const handlePeriodChange = useCallback((value: string) => {
    setPeriod(value);
    // Ici, vous pourriez charger des données différentes en fonction de la période
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
    
    // En production, vous devriez convertir les données en CSV ici
    console.log(`Exporting ${dataType} data for ${period}:`, dataToExport);
    
    toast.success(`Données exportées avec succès: ${filename}`);
  }, [dataType, period]);

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

        <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2">
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
                  <TableHead>Durée (min)</TableHead>
                  <TableHead className="hidden md:table-cell">Intensité</TableHead>
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
                  <TableHead>Heures</TableHead>
                  <TableHead>Qualité</TableHead>
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
