import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const HomeLoan = lazy(() => import("./pages/HomeLoan"));
const MulundMumbaiLoans = lazy(() => import("./pages/MulundMumbaiLoans"));
const ThaneLoans = lazy(() => import("./pages/ThaneLoans"));
const BhandupLoans = lazy(() => import("./pages/BhandupLoans"));
const GhatkoparLoans = lazy(() => import("./pages/GhatkoparLoans"));
const PowaiLoans = lazy(() => import("./pages/PowaiLoans"));
const LoanAgainstProperty = lazy(() => import("./pages/LoanAgainstProperty"));
const LoanAgainstMutualFunds = lazy(() => import("./pages/LoanAgainstMutualFunds"));
const HealthInsurance = lazy(() => import("./pages/HealthInsurance"));
const LifeInsurance = lazy(() => import("./pages/LifeInsurance"));
const MutualFundSIP = lazy(() => import("./pages/MutualFundSIP"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home_loan" element={<HomeLoan />} />
            <Route path="/loan-against-property" element={<LoanAgainstProperty />} />
            <Route path="/loan-against-mutual-funds" element={<LoanAgainstMutualFunds />} />
            <Route path="/health-insurance" element={<HealthInsurance />} />
            <Route path="/life-insurance" element={<LifeInsurance />} />
            <Route path="/mutual-fund-sip" element={<MutualFundSIP />} />
            <Route path="/mulund-mumbai-loans" element={<MulundMumbaiLoans />} />
            <Route path="/loans-in-thane" element={<ThaneLoans />} />
            <Route path="/loans-in-bhandup" element={<BhandupLoans />} />
            <Route path="/loans-in-ghatkopar" element={<GhatkoparLoans />} />
            <Route path="/loans-in-powai" element={<PowaiLoans />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
