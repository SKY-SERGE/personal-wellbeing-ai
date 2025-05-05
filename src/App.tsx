
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import DataEntry from "./pages/DataEntry";
import Activity from "./pages/Activity";
import History from "./pages/History";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DoctorConsultation from "./pages/DoctorConsultation";
import AdminPanel from "./pages/AdminPanel";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import { Suspense } from "react";

// Création du client de requête avec configuration pour éviter les erreurs de réseau
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Routes principales */}
            <Route path="/" element={
              <PrivateRoute>
                <AppLayout><Dashboard /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/data-entry" element={
              <PrivateRoute>
                <AppLayout><DataEntry /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/activity" element={
              <PrivateRoute>
                <AppLayout><Activity /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/history" element={
              <PrivateRoute>
                <AppLayout><History /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/ai-assistant" element={
              <PrivateRoute>
                <AppLayout><AIAssistant /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/profile" element={
              <PrivateRoute>
                <AppLayout><Profile /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/settings" element={
              <PrivateRoute>
                <AppLayout><Settings /></AppLayout>
              </PrivateRoute>
            } />
            
            {/* Nouvelles routes */}
            <Route path="/doctor" element={
              <PrivateRoute>
                <AppLayout><DoctorConsultation /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/admin" element={
              <PrivateRoute>
                <AppLayout><AdminPanel /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="/faq" element={
              <PrivateRoute>
                <AppLayout><FAQ /></AppLayout>
              </PrivateRoute>
            } />
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
