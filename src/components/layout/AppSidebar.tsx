
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  FileText,
  History,
  MessageSquare,
  User,
  Settings,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { 
    title: "Tableau de bord", 
    path: "/", 
    icon: LayoutDashboard 
  },
  { 
    title: "Saisie de données", 
    path: "/data-entry", 
    icon: FileText 
  },
  { 
    title: "Activité", 
    path: "/activity", 
    icon: Activity 
  },
  { 
    title: "Historique", 
    path: "/history", 
    icon: History 
  },
  { 
    title: "Assistant IA", 
    path: "/ai-assistant", 
    icon: MessageSquare 
  },
  { 
    title: "Profil", 
    path: "/profile", 
    icon: User 
  },
  { 
    title: "Paramètres", 
    path: "/settings", 
    icon: Settings 
  },
];

const AppSidebar = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-wellness-primary flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="font-semibold text-xl">WellnessAI</div>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "text-sidebar-primary font-medium" : ""
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3">
        <Button 
          onClick={handleSignOut} 
          variant="outline" 
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          WellnessAI v1.0 © 2025
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
