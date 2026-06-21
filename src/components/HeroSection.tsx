import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";
import { trackEvent } from "@/hooks/useAnalytics";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  service: z.string().min(1, "Select a service"),
});

const services = [
  "Home Loan",
  "Loan Against Property",
  "Loan Against Mutual Funds",
  "Health Insurance",
  "Life Insurance",
  "Mutual Fund SIP",
];

type QuickForm = {
  name: string;
  phone: string;
  service: string;
};

const HeroSection = () => {
  const [form, setForm] = useState<QuickForm>({ name: "", phone: "", service: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Contact form is not configured yet. Please call or WhatsApp us directly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const baseTemplateId = templateId;
      const templateCandidates = Array.from(
        new Set([
          baseTemplateId,
          baseTemplateId.charAt(0).toUpperCase() + baseTemplateId.slice(1),
          baseTemplateId.charAt(0).toLowerCase() + baseTemplateId.slice(1),
        ]),
      );

      const templateParams = {
        from_name: form.name,
        phone: form.phone,
        email: "quickform@jupiterfastfinance.com",
        service: form.service,
        message: "Quick Callback Request from Hero Section.",
        page_url: window.location.href,
        submitted_at: new Date().toISOString(),
      };

      let sent = false;
      let lastError: unknown = null;

      for (const candidateTemplateId of templateCandidates) {
        try {
          await emailjs.send(serviceId, candidateTemplateId, templateParams, { publicKey });
          sent = true;
          break;
        } catch (error: unknown) {
          lastError = error;
          const details = typeof error === "object" && error !== null && "text" in error
            ? String((error as { text: string }).text)
            : "";

          if (!details.toLowerCase().includes("template id not found")) {
            throw error;
          }
        }
      }

      if (!sent) {
        throw lastError;
      }

      trackEvent("form_submit", { form: "hero_callback", service: form.service });
      toast.success("Thanks! We will call you back shortly.");
      setForm({ name: "", phone: "", service: "" });
    } catch (error: unknown) {
      console.error("EmailJS submit failed", error);
      toast.error("Could not send request. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (key: keyof QuickForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <section
      id="home"
      className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <img
          src={heroBg}
          alt="Financial growth abstract"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-background opacity-95" />
      </div>

      {/* Floating Orbs for dynamic design */}
      <motion.div 
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-72 h-72 bg-gold/20 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/30 rounded-full blur-[120px]"
      />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm md:text-base font-semibold tracking-widest uppercase text-gold mb-4"
            >
              Trusted Financial Partner in Mulund & Mumbai
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
            >
              Home Loans and Financial Guidance for{" "}
              <span className="text-gradient-gold">Mulund & Mumbai</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-white/80 mb-10"
            >
              From home loans to mutual funds, we provide end-to-end financial
              solutions tailored to customers in Mulund, Mumbai, Thane, Bhandup,
              Ghatkopar, Powai, and nearby suburbs.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="tel:+919757190200"
                onClick={() => trackEvent("phone_click", { location: "hero" })}
                className="flex items-center gap-3 gradient-gold text-accent-foreground font-bold px-8 py-4 rounded-lg text-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call 9757190200
              </a>
              <a
                href="/mulund-mumbai-loans"
                className="flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                Explore Local Services
              </a>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-sm text-white/50"
            >
              📞 Call / Message us between 10:00 AM – 7:00 PM IST
            </motion.p>
          </motion.div>

          {/* Right Content - Quick Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-card/40 backdrop-blur-2xl rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 max-w-md mx-auto w-full relative overflow-hidden"
          >
            {/* Soft inner glow for glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="mb-6 text-center relative z-10">
              <h3 className="text-2xl font-display font-bold text-foreground">
                Request a Call Back
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Drop your details and our expert will call you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-1.5">Full Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all shadow-inner"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-1.5">Phone Number *</label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all shadow-inner"
                  placeholder="Your phone number"
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-1.5">Interested In *</label>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all shadow-inner"
                >
                  <option value="" className="bg-card text-foreground">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-card text-foreground">{s}</option>
                  ))}
                </select>
                {errors.service && <p className="text-destructive text-xs mt-1">{errors.service}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-bold px-8 py-3.5 rounded-lg hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all text-lg mt-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Get Free Callback"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
