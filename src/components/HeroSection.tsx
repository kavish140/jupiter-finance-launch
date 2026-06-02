import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Phone, ArrowDown, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import heroBg from "@/assets/hero-bg.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
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
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <img
        src={heroBg}
        alt="Financial growth abstract"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 gradient-navy opacity-85" />

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-gold mb-4 animate-fade-in-up">
              Trusted Financial Partner in Mulund & Mumbai
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up [animation-delay:0.1s]">
              Home Loans and Financial Guidance for{" "}
              <span className="text-gradient-gold">Mulund & Mumbai</span>
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-primary-foreground/80 mb-10 animate-fade-in-up [animation-delay:0.2s]">
              From home loans to mutual funds, we provide end-to-end financial
              solutions tailored to customers in Mulund, Mumbai, Thane, Bhandup,
              Ghatkopar, Powai, and nearby suburbs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up [animation-delay:0.3s]">
              <a
                href="tel:+919757190200"
                className="flex items-center gap-3 gradient-gold text-accent-foreground font-bold px-8 py-4 rounded-lg text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call 9757190200
              </a>
              <a
                href="/mulund-mumbai-loans"
                className="flex items-center gap-3 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-foreground/10 transition-colors"
              >
                Explore Local Services
              </a>
            </div>

            <p className="mt-8 text-sm text-primary-foreground/60 animate-fade-in-up [animation-delay:0.4s]">
              📞 Call / Message us between 10:00 AM – 7:00 PM IST
            </p>
          </div>

          {/* Right Content - Quick Form */}
          <div className="bg-card/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-border/50 animate-fade-in-up [animation-delay:0.3s] max-w-md mx-auto w-full">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-display font-bold text-foreground">
                Request a Call Back
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Drop your details and our expert will call you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Your phone number"
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Interested In *</label>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <p className="text-destructive text-xs mt-1">{errors.service}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-bold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity text-lg mt-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Get Free Callback"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
