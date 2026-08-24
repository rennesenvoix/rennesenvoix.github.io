import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ContactPage from "./pages/ContactPage";
import ProgrammingPage from "./pages/ProgrammingPage";
import SupportPage from "./pages/SupportPage";
import MediaPage from "./pages/MediaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  // Fournit les services communs et déclare les pages accessibles par URL.
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/programmation" element={<ProgrammingPage />} />
          <Route path="/soutien" element={<SupportPage />} />
          <Route path="/medias" element={<MediaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
