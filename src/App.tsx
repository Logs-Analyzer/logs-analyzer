import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThreatAnalysisProvider } from "./contexts/ThreatAnalysisContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ThreatAnalysis from "./pages/ThreatAnalysis";
import LogAnalysis from "./pages/LogAnalysis";
import IncidentResponse from "./pages/IncidentResponse";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThreatAnalysisProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/threat-analysis" element={<ThreatAnalysis />} />
              <Route path="/log-analysis" element={<LogAnalysis />} />
              <Route path="/incident-response" element={<IncidentResponse />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThreatAnalysisProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
