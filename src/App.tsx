import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Content from "./pages/Content";
import Admin from "./pages/Admin";
import { InstallPWA } from "./components/InstallPWA";
import { CountdownTimer } from "./components/CountdownTimer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HashRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/content" element={<Content />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <InstallPWA />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;