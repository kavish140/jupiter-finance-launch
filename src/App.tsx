import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import BackToTop from "@/components/BackToTop";

const Index = lazy(() => import("./pages/Index"));
const HomeLoan = lazy(() => import("./pages/HomeLoan"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
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

import ScrollToTop from "@/components/ScrollToTop";

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BackToTop />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Home Loan — canonical URL uses hyphen (SEO best practice) */}
              <Route path="/home-loan" element={<HomeLoan />} />
              {/* Legacy underscore URL — redirect to hyphenated version */}
              <Route path="/home_loan" element={<Navigate to="/home-loan" replace />} />
              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
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
              <Route path="/services" element={<Navigate to="/" replace />} />
              <Route path="/about" element={<Navigate to="/#about" replace />} />
              <Route path="/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
