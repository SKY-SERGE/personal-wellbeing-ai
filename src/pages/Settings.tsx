import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProfileData } from "@/hooks/useProfileData";
import { useTheme } from "@/contexts/ThemeContext";
import { Profile } from "@/types/models";
import { 
  Bell, 
  Settings as SettingsIcon, 
  Lock, 
  UserCog, 
  Smartphone 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { profile, updateProfile, updateProfileLoading } = useProfileData();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    reminders: true,
    updates: false,
  });
  
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [publicProfile, setPublicProfile] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  
  const handleNotificationChange = async (key: string, checked: boolean) => {
    const newNotifications = {
      ...notifications,
      [key]: checked
    };
    setNotifications(newNotifications);
    
    try {
      // Sauvegarder dans la BD les préférences de notification
      await updateProfile({
        notification_preferences: newNotifications
      } as Partial<Profile>);
      toast.success(`Paramètre de notification mis à jour`);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour des notifications");
      console.error(error);
    }
  };
  
  const handlePrivacyUpdate = async () => {
    try {
      await updateProfile({
        public_profile: publicProfile,
        data_sharing: dataSharing
      } as Partial<Profile>);
      toast.success("Paramètres de confidentialité mis à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour des paramètres de confidentialité");
      console.error(error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.new !== password.confirm) {
      toast.error("Les nouveaux mots de passe ne correspondent pas");
      return;
    }
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password.new
      });
      
      if (error) throw error;
      
      toast.success("Mot de passe mis à jour avec succès");
      setPassword({
        current: "",
        new: "",
        confirm: ""
      });
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la mise à jour du mot de passe");
      console.error(error);
    }
  };

  const handleDeviceDisconnect = (deviceName: string) => {
    // Simulation de déconnexion d'appareil
    toast.success(`Appareil ${deviceName} déconnecté`);
  };

  const handleAddDevice = () => {
    toast.info("Fonctionnalité d'ajout d'appareil à implémenter");
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const languageValue = formData.get('language') as string;
      const timezoneValue = formData.get('timezone') as string;
      const themeValue = formData.get('theme') as string;
      
      // Update theme in context and profile
      setTheme(themeValue as 'light' | 'dark' | 'system');
      
      await updateProfile({
        language: languageValue,
        timezone: timezoneValue,
        theme: themeValue
      } as Partial<Profile>);
      toast.success("Préférences mises à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour des préférences");
      console.error(error);
    }
  };

  // Charger les préférences de l'utilisateur depuis le profil
  useEffect(() => {
    if (profile) {
      // Paramètres de notification
      if (profile.notification_preferences) {
        // Ensure we have all required keys with defaults
        setNotifications({
          email: profile.notification_preferences.email ?? true,
          app: profile.notification_preferences.app ?? true,
          reminders: profile.notification_preferences.reminders ?? true,
          updates: profile.notification_preferences.updates ?? false,
        });
      }
      
      // Paramètres de confidentialité
      setPublicProfile(profile.public_profile || false);
      setDataSharing(profile.data_sharing !== false); // par défaut à true si non défini
      
      // Sync theme from profile if available
      if (profile.theme) {
        setTheme(profile.theme as 'light' | 'dark' | 'system');
      }
    }
  }, [profile, setTheme]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez vos préférences et paramètres de compte.
        </p>
      </div>
      
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Préférences</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Confidentialité</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span>Appareils</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>
                Configurez comment et quand vous voulez être notifié.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notifications par email</h4>
                  <p className="text-sm text-muted-foreground">Recevez des mises à jour par email</p>
                </div>
                <Switch 
                  checked={notifications.email} 
                  onCheckedChange={(checked) => handleNotificationChange('email', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notifications dans l'application</h4>
                  <p className="text-sm text-muted-foreground">Recevez des notifications dans l'application</p>
                </div>
                <Switch 
                  checked={notifications.app} 
                  onCheckedChange={(checked) => handleNotificationChange('app', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Rappels</h4>
                  <p className="text-sm text-muted-foreground">Recevez des rappels pour vos activités planifiées</p>
                </div>
                <Switch 
                  checked={notifications.reminders} 
                  onCheckedChange={(checked) => handleNotificationChange('reminders', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Mises à jour produit</h4>
                  <p className="text-sm text-muted-foreground">Soyez informé des nouvelles fonctionnalités</p>
                </div>
                <Switch 
                  checked={notifications.updates} 
                  onCheckedChange={(checked) => handleNotificationChange('updates', checked)} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Préférences utilisateur</CardTitle>
              <CardDescription>
                Personnalisez votre expérience dans l'application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSavePreferences}>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="language">Langue</Label>
                    <select 
                      name="language"
                      className="w-full mt-1 p-2 border rounded-md"
                      defaultValue={profile?.language || "fr"}
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <select 
                      name="timezone"
                      className="w-full mt-1 p-2 border rounded-md"
                      defaultValue={profile?.timezone || "Europe/Paris"}
                    >
                      <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                      <option value="America/New_York">Amérique/New York (GMT-5)</option>
                      <option value="Asia/Tokyo">Asie/Tokyo (GMT+9)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label>Thème</Label>
                    <div className="grid grid-cols-3 gap-4 mt-1">
                      <label className={`p-3 border rounded-md text-center cursor-pointer transition-colors ${
                        theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-white hover:bg-gray-50'
                      }`}>
                        <input 
                          type="radio" 
                          name="theme" 
                          value="light" 
                          className="sr-only" 
                          checked={theme === 'light'}
                          onChange={() => {}} // Handled by form submission
                        />
                        <span>Clair</span>
                      </label>
                      <label className={`p-3 border rounded-md text-center cursor-pointer transition-colors ${
                        theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                      }`}>
                        <input 
                          type="radio" 
                          name="theme" 
                          value="dark" 
                          className="sr-only" 
                          checked={theme === 'dark'}
                          onChange={() => {}} // Handled by form submission
                        />
                        <span>Sombre</span>
                      </label>
                      <label className={`p-3 border rounded-md text-center cursor-pointer transition-colors ${
                        theme === 'system' ? 'bg-primary text-primary-foreground' : 'bg-gradient-to-r from-white to-gray-800 hover:bg-gray-50'
                      }`}>
                        <input 
                          type="radio" 
                          name="theme" 
                          value="system" 
                          className="sr-only" 
                          checked={theme === 'system'}
                          onChange={() => {}} // Handled by form submission
                        />
                        <span>Auto</span>
                      </label>
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={updateProfileLoading}>
                    {updateProfileLoading ? "Sauvegarde..." : "Sauvegarder les préférences"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Confidentialité et sécurité</CardTitle>
              <CardDescription>
                Gérez vos paramètres de confidentialité et de sécurité.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Profil public</h4>
                  <p className="text-sm text-muted-foreground">Permettre aux autres utilisateurs de voir votre profil</p>
                </div>
                <Switch 
                  checked={publicProfile} 
                  onCheckedChange={setPublicProfile} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Partage de données</h4>
                  <p className="text-sm text-muted-foreground">Partager vos statistiques anonymisées pour amélioration</p>
                </div>
                <Switch 
                  checked={dataSharing} 
                  onCheckedChange={setDataSharing} 
                />
              </div>
              
              <form onSubmit={handlePasswordChange} className="mt-6">
                <h4 className="font-medium mb-2">Changement de mot de passe</h4>
                <div className="space-y-2">
                  <Input 
                    type="password" 
                    placeholder="Mot de passe actuel" 
                    value={password.current}
                    onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                  />
                  <Input 
                    type="password" 
                    placeholder="Nouveau mot de passe" 
                    value={password.new}
                    onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                  />
                  <Input 
                    type="password" 
                    placeholder="Confirmer nouveau mot de passe" 
                    value={password.confirm}
                    onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                  />
                </div>
                <Button type="submit" className="mt-2">Changer de mot de passe</Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePrivacyUpdate} disabled={updateProfileLoading}>
                {updateProfileLoading ? "Mise à jour..." : "Mettre à jour les paramètres"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Appareils connectés</CardTitle>
              <CardDescription>
                Gérez les appareils connectés à votre compte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">iPhone 15 Pro</h4>
                      <p className="text-sm text-muted-foreground">Paris, France • Dernière connexion aujourd'hui</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeviceDisconnect('iPhone 15 Pro')}
                    >
                      Déconnecter
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">MacBook Pro</h4>
                      <p className="text-sm text-muted-foreground">Paris, France • Dernière connexion hier</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeviceDisconnect('MacBook Pro')}
                    >
                      Déconnecter
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Apple Watch</h4>
                      <p className="text-sm text-muted-foreground">Appareil synchronisé • Connecté</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeviceDisconnect('Apple Watch')}
                    >
                      Déconnecter
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleAddDevice}>Ajouter un nouvel appareil</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
