
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProfileData } from "@/hooks/useProfileData";
import { 
  Users, 
  User, 
  Shield, 
  Flag, 
  Database, 
  Settings as SettingsIcon, 
  FileText,
  CheckCircle,
  XCircle,
  Search 
} from "lucide-react";
import { toast } from "sonner";

// Données factices pour l'exemple
const usersList = [
  { id: 1, name: "Jean Dupont", email: "jean@example.com", role: "utilisateur", status: "actif", joinDate: "2025-01-15" },
  { id: 2, name: "Marie Martin", email: "marie@example.com", role: "médecin", status: "actif", joinDate: "2025-02-23" },
  { id: 3, name: "Pierre Dubois", email: "pierre@example.com", role: "admin", status: "actif", joinDate: "2024-11-05" },
  { id: 4, name: "Sophie Lefèvre", email: "sophie@example.com", role: "utilisateur", status: "inactif", joinDate: "2025-03-10" },
  { id: 5, name: "Lucas Bernard", email: "lucas@example.com", role: "utilisateur", status: "actif", joinDate: "2025-04-17" }
];

const reportsList = [
  { id: 1, type: "Bug", title: "Erreur lors de la saisie de données", status: "Ouvert", date: "2025-05-01", user: "Jean Dupont" },
  { id: 2, type: "Suggestion", title: "Ajouter plus de types d'exercices", status: "En cours", date: "2025-05-02", user: "Marie Martin" },
  { id: 3, type: "Assistance", title: "Comment modifier mon profil ?", status: "Fermé", date: "2025-04-28", user: "Lucas Bernard" },
  { id: 4, type: "Bug", title: "Application qui plante sur mobile", status: "Ouvert", date: "2025-05-03", user: "Sophie Lefèvre" },
  { id: 5, type: "Contenu", title: "Information nutritionnelle incorrecte", status: "Fermé", date: "2025-04-25", user: "Pierre Dubois" }
];

const AdminPanel = () => {
  const { isAdmin } = useProfileData();
  const [searchUsers, setSearchUsers] = useState("");
  const [searchReports, setSearchReports] = useState("");
  
  // Si n'est pas admin, rediriger ou montrer un message
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Shield className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Accès réservé</h2>
        <p className="text-muted-foreground">Cette section est réservée aux administrateurs.</p>
      </div>
    );
  }

  const handleUpdateUserRole = (userId: number, role: string) => {
    console.log(`Mise à jour du rôle de l'utilisateur ${userId} en ${role}`);
    toast.success("Rôle de l'utilisateur mis à jour");
  };
  
  const handleUpdateUserStatus = (userId: number, status: string) => {
    console.log(`Mise à jour du statut de l'utilisateur ${userId} en ${status}`);
    toast.success("Statut de l'utilisateur mis à jour");
  };
  
  const handleUpdateReportStatus = (reportId: number, status: string) => {
    console.log(`Mise à jour du statut du signalement ${reportId} en ${status}`);
    toast.success("Statut du signalement mis à jour");
  };

  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchUsers.toLowerCase()) || 
    user.email.toLowerCase().includes(searchUsers.toLowerCase()) ||
    user.role.toLowerCase().includes(searchUsers.toLowerCase())
  );
  
  // Filtrer les signalements en fonction de la recherche
  const filteredReports = reportsList.filter(report => 
    report.title.toLowerCase().includes(searchReports.toLowerCase()) || 
    report.type.toLowerCase().includes(searchReports.toLowerCase()) ||
    report.user.toLowerCase().includes(searchReports.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Panneau d'administration</h1>
        <p className="text-muted-foreground">
          Gérez les utilisateurs, les signalements et les paramètres du système.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Utilisateurs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{usersList.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              <span>Signalements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {reportsList.filter(r => r.status === "Ouvert").length}
              </div>
              <div className="text-sm text-muted-foreground">Ouverts</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Médecins</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {usersList.filter(u => u.role === "médecin").length}
              </div>
              <div className="text-sm text-muted-foreground">Actifs</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Utilisateurs</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>Signalements</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Contenu</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span>Paramètres</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>
                Voir et modifier les informations des utilisateurs, leurs rôles et leurs statuts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher des utilisateurs..." 
                  value={searchUsers}
                  onChange={(e) => setSearchUsers(e.target.value)}
                  className="flex-grow"
                />
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Inscription</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <select 
                            className="p-1 border rounded text-sm w-full"
                            defaultValue={user.role}
                            onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                          >
                            <option value="utilisateur">Utilisateur</option>
                            <option value="médecin">Médecin</option>
                            <option value="admin">Admin</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`rounded-full w-2 h-2 ${user.status === 'actif' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <select 
                              className="p-1 border rounded text-sm w-full"
                              defaultValue={user.status}
                              onChange={(e) => handleUpdateUserStatus(user.id, e.target.value)}
                            >
                              <option value="actif">Actif</option>
                              <option value="inactif">Inactif</option>
                            </select>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Voir le profil</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exporter les utilisateurs</Button>
              <Button>Ajouter un utilisateur</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des signalements</CardTitle>
              <CardDescription>
                Traiter les signalements, bugs et demandes des utilisateurs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher des signalements..." 
                  value={searchReports}
                  onChange={(e) => setSearchReports(e.target.value)}
                  className="flex-grow"
                />
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Titre</TableHead>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100">
                            {report.type}
                          </div>
                        </TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.user}</TableCell>
                        <TableCell>{new Date(report.date).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>
                          <select 
                            className={`p-1 border rounded text-sm w-full ${
                              report.status === 'Fermé' ? 'bg-green-50' : 
                              report.status === 'En cours' ? 'bg-blue-50' : 
                              'bg-yellow-50'
                            }`}
                            defaultValue={report.status}
                            onChange={(e) => handleUpdateReportStatus(report.id, e.target.value)}
                          >
                            <option value="Ouvert">Ouvert</option>
                            <option value="En cours">En cours</option>
                            <option value="Fermé">Fermé</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Voir les détails</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exporter les signalements</Button>
              <Button>Créer un signalement</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Gestion du contenu</CardTitle>
              <CardDescription>
                Gérer le contenu de l'application, y compris les articles, la FAQ et les données nutritionnelles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold mb-2">12</div>
                    <p className="text-sm text-muted-foreground">Articles publiés</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Gérer les articles</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">FAQ</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold mb-2">24</div>
                    <p className="text-sm text-muted-foreground">Questions-réponses</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Gérer la FAQ</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Base de données nutritionnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold mb-2">1,240</div>
                    <p className="text-sm text-muted-foreground">Aliments référencés</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Gérer les données</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Ajouter un nouvel article</h3>
                <div className="space-y-4">
                  <Input placeholder="Titre de l'article" />
                  <Input placeholder="Catégorie" />
                  <Textarea placeholder="Contenu de l'article..." className="min-h-[200px]" />
                  <div className="flex justify-end">
                    <Button>Publier l'article</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du système</CardTitle>
              <CardDescription>
                Configuration générale et paramètres techniques de l'application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Configuration générale</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mode maintenance</h4>
                        <p className="text-sm text-muted-foreground">
                          Activer le mode maintenance pour les mises à jour système
                        </p>
                      </div>
                      <div className="flex h-6 items-center">
                        <input type="checkbox" id="maintenance" className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Nom de l'application</h4>
                      <Input defaultValue="WellnessAI" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">URL du site</h4>
                      <Input defaultValue="https://wellnessai.com" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Email du support</h4>
                      <Input defaultValue="support@wellnessai.com" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Paramètres du système</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Version de l'application</h4>
                      <Input defaultValue="1.2.0" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Limite de téléchargement de fichiers (MB)</h4>
                      <Input defaultValue="10" type="number" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Clés API</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <span>OpenAI API</span>
                          <Button variant="outline" size="sm">Gérer</Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <span>Stripe API</span>
                          <Button variant="outline" size="sm">Gérer</Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <span>Nutritionix API</span>
                          <Button variant="outline" size="sm">Gérer</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Sauvegarde et restauration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Sauvegarder la base de données
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Restaurer depuis une sauvegarde
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Sauvegarder les paramètres</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
