import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { trackEvent } from "@/hooks/useAnalytics";

const ExitIntentPopup = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("exit_intent_shown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return;
      // Trigger when cursor exits through top of viewport
      if (e.clientY <= 10) {
        triggered.current = true;
        sessionStorage.setItem("exit_intent_shown", "1");
        setTimeout(() => {
          setVisible(true);
          trackEvent("exit_intent_shown", {});
        }, 600);
      }
    };

    // Mobile fallback: show after 60 seconds if no interaction
    const mobileTimer = setTimeout(() => {
      if (triggered.current) return;
      if (window.innerWidth < 768) {
        triggered.current = true;
        sessionStorage.setItem("exit_intent_shown", "1");
        setVisible(true);
        trackEvent("exit_intent_shown", { trigger: "timer" });
      }
    }, 60000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    trackEvent("exit_intent_dismissed", {});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      toast.error("Please enter your name and a valid 10-digit phone number.");
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Please call us directly at 9757190200.");
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        phone,
        email: "exitintent@jupiterfastfinance.com",
        service: "Home Loan",
        message: "Exit Intent Popup — Free Eligibility Check Request.",
        page_url: window.location.href,
        submitted_at: new Date().toISOString(),
      }, { publicKey });

      trackEvent("exit_intent_submitted", { service: "Home Loan" });
      setSubmitted(true);
    } catch {
      toast.error("Could not submit. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto">
              {/* Gold accent top bar */}
              <div className="h-1 w-full gradient-gold" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8">
                {!submitted ? (
                  <>
                    <div className="mb-5">
                      <span className="text-3xl">🏠</span>
                      <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mt-3 mb-2">
                        Before you go — get a free eligibility check
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Find out how much home loan you qualify for in 30 seconds. No credit check. No spam. Just a free, confidential estimate.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name *"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone number *"
                          maxLength={15}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-bold px-6 py-3.5 rounded-xl text-base hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Sending..." : "Get Free Eligibility Check"}
                      </motion.button>
                    </form>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">🔒 100% confidential. No obligations.</p>
                      <button
                        onClick={handleClose}
                        className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                      >
                        No thanks
                      </button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">✅</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      We'll call you shortly!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Our advisor will reach out between 10 AM – 7 PM IST with your personalized eligibility estimate.
                    </p>
                    <button
                      onClick={handleClose}
                      className="text-sm font-semibold text-gold border border-gold/30 px-5 py-2.5 rounded-xl hover:bg-gold/10 transition-colors"
                    >
                      Continue Browsing
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
