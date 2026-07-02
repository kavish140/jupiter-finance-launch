import { Link } from "react-router-dom";
import { ArrowRight, Briefcase } from "lucide-react";
import { trackEvent } from "@/hooks/useAnalytics";

const HiringBanner = () => {
  return (
    <div className="relative z-50 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium">
        <Briefcase className="w-4 h-4 hidden sm:block" />
        <span>
          <span className="font-bold">We are hiring!</span>
          <span className="hidden sm:inline"> Join our team and grow your career with Jupiter Finance.</span>
        </span>
        <span className="mx-1 hidden sm:inline">|</span>
        <Link
          to="/careers"
          onClick={() => trackEvent("hiring_banner_click", { location: "homepage" })}
          className="inline-flex items-center gap-1 underline underline-offset-2 font-bold hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          View Openings
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default HiringBanner;
