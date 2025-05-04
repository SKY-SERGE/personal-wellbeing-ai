
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import DataEntry from "./pages/DataEntry";
import Activity from "./pages/Activity";
import History from "./pages/History";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/data-entry" element={<AppLayout><DataEntry /></AppLayout>} />
          <Route path="/activity" element={<AppLayout><Activity /></AppLayout>} />
          <Route path="/history" element={<AppLayout><History /></AppLayout>} />
          <Route path="/ai-assistant" element={<AppLayout><AIAssistant /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
