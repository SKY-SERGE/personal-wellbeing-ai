
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfileData } from "@/hooks/useProfileData";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Award,
  PlusCircle, 
  Stethoscope, 
  Calendar
} from "lucide-react";
import { toast } from "sonner";

const DoctorConsultation = () => {
  const { isDoctor, patients, patientsLoading } = useProfileData();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  
  // Si n'est pas médecin, rediriger ou montrer un message
  if (!isDoctor) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Stethoscope className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Accès réservé</h2>
        <p className="text-muted-foreground">Cette section est réservée aux médecins.</p>
      </div>
    );
  }

  const handleSendRecommendation = () => {
    if (!selectedPatient || !recommendation.trim()) {
      toast.error("Veuillez sélectionner un patient et saisir une recommandation");
      return;
    }
    
    // Ici, appel à l'API pour sauvegarder la recommandation
    toast.success("Recommandation envoyée au patient");
    setRecommendation("");
  };

  const handleScheduleAppointment = () => {
    if (!selectedPatient) {
      toast.error("Veuillez sélectionner un patient");
      return;
    }
    
    toast.success("Rendez-vous planifié avec le patient");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Consultation médicale</h1>
        <p className="text-muted-foreground">
          Gérez vos patients et fournissez des recommandations personnalisées.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Liste des patients */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Mes patients</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {patientsLoading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-wellness-primary"></div>
              </div>
            ) : patients?.length ? (
              <ul className="space-y-2">
                {patients.map((patient) => (
                  <li key={patient.id}>
                    <Button 
                      variant={selectedPatient?.id === patient.id ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      {patient.first_name} {patient.last_name}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Aucun patient assigné
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un patient
            </Button>
          </CardFooter>
        </Card>

        {/* Détails du patient et actions */}
        <div className="lg:col-span-3">
          {selectedPatient ? (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="history">Historique médical</TabsTrigger>
                <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil du patient</CardTitle>
                    <CardDescription>
                      Informations sur {selectedPatient.first_name} {selectedPatient.last_name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Informations personnelles</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nom:</span>
                            <span>{selectedPatient.first_name} {selectedPatient.last_name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Âge:</span>
                            <span>{selectedPatient.age || 'Non renseigné'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Genre:</span>
                            <span>{selectedPatient.gender || 'Non renseigné'}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Métriques de santé</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Taille:</span>
                            <span>{selectedPatient.height ? `${selectedPatient.height} cm` : 'Non renseigné'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Poids:</span>
                            <span>{selectedPatient.weight ? `${selectedPatient.weight} kg` : 'Non renseigné'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Actions</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                          onClick={handleScheduleAppointment}
                        >
                          <Calendar className="h-4 w-4" />
                          Planifier un rendez-vous
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Voir les rapports
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Historique médical</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="nutrition">
                      <TabsList>
                        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                        <TabsTrigger value="exercise">Exercice</TabsTrigger>
                        <TabsTrigger value="sleep">Sommeil</TabsTrigger>
                      </TabsList>
                      <div className="mt-4">
                        <TabsContent value="nutrition">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Repas</TableHead>
                                <TableHead>Calories</TableHead>
                                <TableHead>Description</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>10 mai 2025</TableCell>
                                <TableCell>Déjeuner</TableCell>
                                <TableCell>650</TableCell>
                                <TableCell>Salade de quinoa avec poulet grillé</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>10 mai 2025</TableCell>
                                <TableCell>Petit-déjeuner</TableCell>
                                <TableCell>450</TableCell>
                                <TableCell>Flocons d'avoine avec baies</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TabsContent>
                        <TabsContent value="exercise">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Durée</TableHead>
                                <TableHead>Intensité</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>10 mai 2025</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>30 min</TableCell>
                                <TableCell>Élevée</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>9 mai 2025</TableCell>
                                <TableCell>Yoga</TableCell>
                                <TableCell>45 min</TableCell>
                                <TableCell>Faible</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TabsContent>
                        <TabsContent value="sleep">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Durée</TableHead>
                                <TableHead>Qualité</TableHead>
                                <TableHead>Notes</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>10 mai 2025</TableCell>
                                <TableCell>7.5 h</TableCell>
                                <TableCell>Bonne</TableCell>
                                <TableCell>Réveillé une fois</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>9 mai 2025</TableCell>
                                <TableCell>6 h</TableCell>
                                <TableCell>Moyenne</TableCell>
                                <TableCell>Difficulté à s'endormir</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommandations</CardTitle>
                    <CardDescription>
                      Fournissez des recommandations personnalisées à votre patient
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Recommandations précédentes</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Augmenter l'activité physique</p>
                                <p className="text-sm text-muted-foreground">
                                  Je recommande 30 minutes de marche quotidienne pour améliorer la circulation.
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">08 mai 2025</span>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Réduire la consommation de sodium</p>
                                <p className="text-sm text-muted-foreground">
                                  Limitez votre consommation de sel pour aider à réguler votre tension artérielle.
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">01 mai 2025</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Nouvelle recommandation</h3>
                        <div className="space-y-3">
                          <Textarea 
                            placeholder="Saisissez votre recommandation ici..." 
                            className="min-h-[100px]"
                            value={recommendation}
                            onChange={(e) => setRecommendation(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <select className="border rounded-md px-3 py-2 text-sm" defaultValue="nutrition">
                              <option value="nutrition">Nutrition</option>
                              <option value="exercise">Exercice</option>
                              <option value="sleep">Sommeil</option>
                              <option value="general">Général</option>
                            </select>
                            <select className="border rounded-md px-3 py-2 text-sm" defaultValue="medium">
                              <option value="low">Priorité basse</option>
                              <option value="medium">Priorité moyenne</option>
                              <option value="high">Priorité haute</option>
                            </select>
                          </div>
                          <Button 
                            className="w-full"
                            onClick={handleSendRecommendation}
                          >
                            Envoyer la recommandation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>
                      Communication avec {selectedPatient.first_name} {selectedPatient.last_name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex flex-col">
                    <div className="flex-grow overflow-y-auto border rounded-md p-4 mb-4">
                      <div className="flex flex-col space-y-4">
                        <div className="self-end bg-wellness-primary text-white rounded-lg p-3 max-w-[70%]">
                          <p>Bonjour, comment vous sentez-vous aujourd'hui ?</p>
                          <span className="text-xs opacity-70 mt-1 inline-block">10:32</span>
                        </div>
                        <div className="self-start bg-gray-100 rounded-lg p-3 max-w-[70%]">
                          <p>Bonjour Docteur, je me sens mieux. J'ai suivi vos recommandations sur la nutrition.</p>
                          <span className="text-xs opacity-70 mt-1 inline-block">10:35</span>
                        </div>
                        <div className="self-end bg-wellness-primary text-white rounded-lg p-3 max-w-[70%]">
                          <p>Excellente nouvelle ! Avez-vous remarqué des améliorations dans votre niveau d'énergie ?</p>
                          <span className="text-xs opacity-70 mt-1 inline-block">10:37</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Tapez votre message..." className="flex-grow" />
                      <Button>Envoyer</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] bg-gray-50 rounded-lg border border-dashed">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">Sélectionnez un patient</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Choisissez un patient dans la liste pour voir ses informations et lui fournir des recommandations personnalisées.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;
