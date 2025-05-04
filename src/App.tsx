
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
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/auth/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            
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
                <AppLayout><Profile /></AppLayout>
              </PrivateRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
