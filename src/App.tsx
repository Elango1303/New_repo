import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chocolate from "./pages/Chocolate";
import Nuts from "./pages/Nuts";
import Perfume from "./pages/Perfume";
import Toys from "./pages/Toys";
import Biscuits from "./pages/Biscuits";
import Dates from "./pages/Dates";
import NotFound from "./pages/NotFound";
import DryFruits from "./pages/DryFruits";
import Chips from "./pages/Chips";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chocolate" element={<Chocolate />} />
          <Route path="/nuts" element={<Nuts />} />
          <Route path="/perfumes" element={<Perfume />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/biscuits" element={<Biscuits />} />
          <Route path="/dates" element={<Dates />} />
          <Route path="/chips" element={<Chips />} />
          <Route path="/dry-fruits" element={<DryFruits />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
