
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DataEntry from "./pages/DataEntry";
import Activity from "./pages/Activity";
import History from "./pages/History";
import AIAssistant from "./pages/AIAssistant";
import AdminPanel from "./pages/AdminPanel";
import DoctorConsultation from "./pages/DoctorConsultation";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ThemeProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/app" element={
                  <PrivateRoute>
                    <AppLayout />
                  </PrivateRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="data-entry" element={<DataEntry />} />
                  <Route path="activity" element={<Activity />} />
                  <Route path="history" element={<History />} />
                  <Route path="ai-assistant" element={<AIAssistant />} />
                  <Route path="admin" element={<AdminPanel />} />
                  <Route path="doctor" element={<DoctorConsultation />} />
                  <Route path="faq" element={<FAQ />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
