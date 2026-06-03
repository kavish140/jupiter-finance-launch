import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { trackEvent } from "@/hooks/useAnalytics";

const BANNER_KEY = "offer_banner_dismissed";

const OfferBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if not dismissed this session
    if (!sessionStorage.getItem(BANNER_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(BANNER_KEY, "1");
  };

  if (!visible) return null;

  return (
    <div className="relative z-50 gradient-gold text-accent-foreground">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-medium">
        <span className="hidden sm:inline">✨</span>
        <span>
          <span className="font-bold">Free Expert Consultation</span>
          <span className="hidden sm:inline"> — No Fees, No Obligations</span>
          <span className="sm:hidden"> — No Fees</span>
        </span>
        <span className="mx-1 hidden sm:inline">|</span>
        <a
          href="tel:+919757190200"
          onClick={() => trackEvent("phone_click", { location: "offer_banner" })}
          className="underline underline-offset-2 font-bold hover:opacity-80 transition-opacity"
        >
          Call 9757190200
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss offer banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OfferBanner;
