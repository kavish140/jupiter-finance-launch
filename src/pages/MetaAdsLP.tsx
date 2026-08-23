import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Phone,
  Send,
  CheckCircle2,
  Shield,
  Clock,
  Building2,
  FileCheck,
  Car,
  ChevronDown,
  Star,
} from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import SeoMeta from "@/components/SeoMeta";
import { trackEvent } from "@/hooks/useAnalytics";

/* ────────────────────────────────────────────── */
/*  Validation                                    */
/* ────────────────────────────────────────────── */
const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  loanAmount: z.string().min(1, "Select a loan amount"),
  employmentType: z.string().min(1, "Select employment type"),
});

type LeadForm = {
  name: string;
  phone: string;
  loanAmount: string;
  employmentType: string;
};

/* ────────────────────────────────────────────── */
/*  Data                                          */
/* ────────────────────────────────────────────── */
const loanAmounts = [
  "Under ₹20 Lakh",
  "₹20 – 50 Lakh",
  "₹50 Lakh – 1 Crore",
  "Above ₹1 Crore",
];

const employmentTypes = ["Salaried", "Self-Employed / Business"];

const benefits = [
  {
    icon: Building2,
    title: "11+ Partner Banks",
    desc: "SBI, HDFC, ICICI, Kotak, LIC Housing & more — we find you the lowest rate.",
  },
  {
    icon: Car,
    title: "Doorstep Service",
    desc: "We come to your home or office. Zero bank visits needed.",
  },
  {
    icon: Clock,
    title: "Sanction in 12 Days",
    desc: "Pre-checked files mean faster processing. Average: 12–15 working days.",
  },
  {
    icon: FileCheck,
    title: "100% Free Service",
    desc: "No fees, no hidden charges. We're paid by the bank, not you.",
  },
  {
    icon: Shield,
    title: "CIBIL Score Guidance",
    desc: "We'll help improve your score before applying for the best rate.",
  },
  {
    icon: CheckCircle2,
    title: "Max Loan Eligibility",
    desc: "We structure your file to get the highest possible sanction amount.",
  },
];

const steps = [
  {
    num: "01",
    title: "Submit Your Details",
    desc: "Fill the form above — takes 30 seconds.",
  },
  {
    num: "02",
    title: "Get a Free Callback",
    desc: "Our advisor calls you within 2 hours with your eligibility estimate.",
  },
  {
    num: "03",
    title: "Sit Back & Get Approved",
    desc: "We handle documentation, bank follow-ups, and get you the best rate.",
  },
];

const testimonials = [
  {
    name: "Rajesh Mehta",
    location: "Mulund West",
    text: "Jupiter Finance got me a rate 0.3% lower than what HDFC offered me directly. Saved me over ₹2 lakh on my home loan!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    location: "Thane",
    text: "I was worried about my CIBIL score, but their team guided me step by step. Got approved in just 12 days!",
    rating: 5,
  },
  {
    name: "Amit Desai",
    location: "Mulund East",
    text: "Completely free service with doorstep document pickup. I didn't have to visit the bank even once. Highly recommend!",
    rating: 5,
  },
];

const faqs = [
  {
    q: "Is your service really free?",
    a: "Yes, 100%. We are paid a referral commission by the lending bank/NBFC. You pay absolutely nothing for our consultation, documentation support, or lender comparison.",
  },
  {
    q: "What is the minimum CIBIL score needed?",
    a: "Most banks prefer 700+. A score of 750+ gets you the best rates. We also work with select lenders who consider applications with scores as low as 620.",
  },
  {
    q: "How much home loan can I get?",
    a: "It depends on your income, existing EMIs, and CIBIL score. On a ₹60,000/month salary with no EMIs, you can typically borrow ₹26–31 lakh over 20 years. Adding a co-applicant increases this significantly.",
  },
  {
    q: "Do you serve areas outside Mulund?",
    a: "Yes! While we're based in Mulund, we serve all of Mumbai, Thane, Bhandup, Ghatkopar, Powai, and surrounding areas.",
  },
];

/* ────────────────────────────────────────────── */
/*  Lead Form Component                           */
/* ────────────────────────────────────────────── */
const LeadCaptureForm = ({
  id,
  className = "",
  location,
}: {
  id?: string;
  className?: string;
  location: string;
}) => {
  const [form, setForm] = useState<LeadForm>({
    name: "",
    phone: "",
    loanAmount: "",
    employmentType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const update = (key: keyof LeadForm, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
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
      toast.error(
        "Contact form is not configured yet. Please call or WhatsApp us directly."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const safeEmail = "homeloan-ad@jupiterfastfinance.com";
      const templateCandidates = Array.from(
        new Set([
          templateId,
          templateId.charAt(0).toUpperCase() + templateId.slice(1),
          templateId.charAt(0).toLowerCase() + templateId.slice(1),
        ])
      );

      const templateParams = {
        from_name: form.name,
        phone: form.phone,
        email: safeEmail,
        service: "Home Loan",
        message: `[Meta Ad Lead] Loan Amount: ${form.loanAmount} | Employment: ${form.employmentType}`,
        page_url: window.location.href,
        submitted_at: new Date().toISOString(),
      };

      let sent = false;
      let lastError: unknown = null;

      for (const candidateId of templateCandidates) {
        try {
          await emailjs.send(serviceId, candidateId, templateParams, {
            publicKey,
          });
          sent = true;
          break;
        } catch (error: unknown) {
          lastError = error;
          const details =
            typeof error === "object" && error !== null && "text" in error
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

      trackEvent("form_submit", {
        form: "meta_ads_lp",
        service: "Home Loan",
        location,
      });
      toast.success("Thanks! Our advisor will call you within 2 hours.");
      setIsSubmitted(true);
    } catch (error: unknown) {
      const status =
        typeof error === "object" && error !== null && "status" in error
          ? String((error as { status: number | string }).status)
          : "unknown";
      const details =
        typeof error === "object" && error !== null && "text" in error
          ? String((error as { text: string }).text)
          : "Unknown error";
      console.error("EmailJS submit failed", { status, details, error });
      toast.error(`Could not send enquiry (${status}). Please call us at 9757190200.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        id={id}
        className={`bg-card/40 backdrop-blur-2xl rounded-2xl p-8 md:p-10 border border-gold/30 text-center ${className}`}
      >
        <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          You're All Set!
        </h3>
        <p className="text-muted-foreground mb-6">
          Our home loan advisor will call you within 2 hours with your
          personalised eligibility estimate.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+919757190200"
            className="flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" /> Call Now Instead
          </a>
          <a
            href="https://wa.me/919757190200?text=Hi%2C%20I%20just%20submitted%20a%20home%20loan%20enquiry%20from%20your%20ad.%20Please%20help%20me."
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 border border-white/20 bg-white/5 text-foreground font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
          >
            <SiWhatsapp className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`bg-card/40 backdrop-blur-2xl rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-xl font-display font-bold text-foreground mb-1">
          Get Your Free Home Loan Quote
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Our advisor calls you within 2 hours — no spam, guaranteed.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground/90 mb-1.5">
              Full Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-destructive text-xs mt-1">{errors.name}</p>
            )}
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground/90 mb-1.5">
              Phone Number *
            </label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
              placeholder="10-digit mobile number"
              maxLength={10}
              inputMode="numeric"
            />
            {errors.phone && (
              <p className="text-destructive text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-foreground/90 mb-1.5">
              Loan Amount Needed *
            </label>
            <div className="relative">
              <select
                value={form.loanAmount}
                onChange={(e) => update("loanAmount", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 backdrop-blur-md text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition appearance-none"
              >
                <option value="">Select amount range</option>
                {loanAmounts.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.loanAmount && (
              <p className="text-destructive text-xs mt-1">
                {errors.loanAmount}
              </p>
            )}
          </div>
          {/* Employment */}
          <div>
            <label className="block text-sm font-medium text-foreground/90 mb-1.5">
              Employment Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {employmentTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update("employmentType", t)}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    form.employmentType === t
                      ? "border-gold bg-gold/10 text-foreground ring-2 ring-gold/30"
                      : "border-white/10 bg-background/50 text-foreground/70 hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.employmentType && (
              <p className="text-destructive text-xs mt-1">
                {errors.employmentType}
              </p>
            )}
          </div>
          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-bold px-6 py-4 rounded-xl text-base hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
          >
            {!isSubmitting && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
            <Send className="w-4 h-4 relative z-10" />
            <span className="relative z-10">
              {isSubmitting ? "Sending..." : "Get Free Callback in 2 Hours"}
            </span>
          </motion.button>
        </form>
        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3 h-3 text-gold" /> 100% Confidential
          </span>
          <span className="text-muted-foreground/40 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 text-gold" /> No Spam, Ever
          </span>
          <span className="text-muted-foreground/40 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 text-gold" /> Free Service
          </span>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────── */
/*  Page                                          */
/* ────────────────────────────────────────────── */
const MetaAdsLP = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Best Home Loan Rates in Mulund & Mumbai | Free Service | Jupiter Finance"
        description="Compare 11+ banks. Get the lowest home loan rate in Mulund and Mumbai. Free doorstep service, fast approval in 12 days. Call 9757190200."
        keywords="home loan mulund, home loan mumbai, best home loan rate, home loan advisor mulund, jupiter finance, home loan ad, free home loan consultation"
        canonicalUrl="https://jupiterfastfinance.com/lp/home-loan-ad"
        ogType="website"
      />

      {/* ── Sticky Top Bar ────────────────────── */}
      <header className="sticky top-0 z-50 bg-navy-dark/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-display font-bold text-white flex items-center gap-2"
          >
            <img
              src="/favicon.png"
              alt="Jupiter Finance Logo"
              className="w-7 h-7 rounded-full"
              width={28}
              height={28}
            />
            <span>
              Jupiter<span className="text-gradient-gold"> Finance</span>
            </span>
          </Link>
          <a
            href="tel:+919757190200"
            onClick={() =>
              trackEvent("phone_click", { location: "meta_lp_header" })
            }
            className="gradient-gold text-accent-foreground font-bold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call: 9757190200
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────── */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-navy-dark via-navy to-background relative overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 -right-10 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              {/* Left — Copy */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-4">
                  Mulund & Mumbai's Trusted Home Loan Advisor
                </p>
                <h1 className="text-3xl md:text-[2.75rem] lg:text-5xl font-display font-bold text-white leading-tight mb-5">
                  Stop Paying More.{" "}
                  <span className="text-gradient-gold">
                    Get the Lowest Home Loan Rate
                  </span>{" "}
                  — Guaranteed.
                </h1>
                <p className="text-white/75 text-lg mb-8 max-w-lg">
                  We compare 11+ banks for you and get you a rate lower than
                  what you'd get walking into a branch. Free service. No bank
                  visits. 12-day approval.
                </p>

                {/* Stats bar */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: "25+", label: "Years Experience" },
                    { value: "11+", label: "Partner Banks" },
                    { value: "2,000+", label: "Happy Clients" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
                        {s.value}
                      </p>
                      <p className="text-xs text-white/50 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Free Doorstep Collection",
                    "SBI, HDFC, ICICI & More",
                    "Zero Hidden Fees",
                  ].map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
                    >
                      <CheckCircle2 className="w-3 h-3 text-gold shrink-0" />{" "}
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right — Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <LeadCaptureForm id="hero-form" location="hero" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Social Proof Bar ────────────────── */}
        <section className="py-6 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold" /> Trusted by
                2,000+ families
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Star className="w-4 h-4 text-gold fill-gold" /> 4.9/5 Google
                Rating
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Building2 className="w-4 h-4 text-gold" /> SBI · HDFC · ICICI
                · Kotak · LIC Housing
              </span>
            </div>
          </div>
        </section>

        {/* ── Benefits Grid ──────────────────── */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
                Why 2,000+ Families Choose Us
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
                Your Unfair Advantage in Home Loans
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-card hover:border-gold/40 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-shadow">
                    <b.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ───────────────────── */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
                Simple Process
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
                3 Steps to Your Dream Home
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="text-center relative"
                >
                  <div className="text-5xl font-display font-black text-gradient-gold mb-4">
                    {s.num}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                  {/* connector line (desktop only) */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gold/30" />
                  )}
                </motion.div>
              ))}
            </div>
            {/* CTA below steps */}
            <div className="text-center mt-10">
              <a
                href="#hero-form"
                className="inline-flex items-center gap-2 gradient-gold text-accent-foreground font-bold px-8 py-4 rounded-xl text-base hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all"
              >
                <Send className="w-4 h-4" /> Start Now — It's Free
              </a>
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────── */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
                Client Stories
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
                What Our Clients Say
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-card"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-gold fill-gold"
                      />
                    ))}
                  </div>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────── */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
                Common Questions
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-card border rounded-2xl overflow-hidden shadow-card transition-colors ${
                    openFaq === i ? "border-gold/40" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <span className="font-semibold text-foreground text-sm md:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        openFaq === i
                          ? "text-gold rotate-180"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────── */}
        <section className="py-14 md:py-20 bg-gradient-to-br from-navy-dark via-navy to-background relative overflow-hidden">
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <span className="text-5xl block mb-4">🏠</span>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                  Your dream home is closer than you think
                </h2>
                <p className="text-white/70 mb-6">
                  One free call is all it takes. We handle the lender
                  comparison, documentation, and follow-up — you just pick your
                  home.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <a
                    href="tel:+919757190200"
                    onClick={() =>
                      trackEvent("phone_click", {
                        location: "meta_lp_bottom_cta",
                      })
                    }
                    className="flex items-center gap-2 gradient-gold text-accent-foreground font-bold px-8 py-4 rounded-xl text-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all"
                  >
                    <Phone className="w-5 h-5" /> Call 9757190200
                  </a>
                  <a
                    href="https://wa.me/919757190200?text=Hi%2C%20I%20saw%20your%20home%20loan%20ad.%20Please%20help%20me%20with%20the%20best%20rate."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-white/20 bg-white/5 text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-all"
                  >
                    <SiWhatsapp className="w-4 h-4" /> WhatsApp Us
                  </a>
                </div>
                <p className="text-white/40 text-sm mt-5">
                  Available 10:00 AM – 7:00 PM IST, Monday – Saturday
                </p>
              </motion.div>

              {/* Repeat form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <LeadCaptureForm location="bottom_cta" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Minimal Footer ───────────────────── */}
      <footer className="py-6 bg-navy-dark border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Jupiter Finance. All rights reserved.{" "}
            <Link
              to="/privacy-policy"
              className="underline hover:text-white/60"
            >
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link
              to="/terms-and-conditions"
              className="underline hover:text-white/60"
            >
              Terms
            </Link>{" "}
            ·{" "}
            <Link to="/disclaimer" className="underline hover:text-white/60">
              Disclaimer
            </Link>
          </p>
          <p className="text-white/25 text-[10px] mt-2">
            Jupiter Finance is a loan distributor. We do not lend directly. All
            loans are subject to lender approval.
          </p>
        </div>
      </footer>

      {/* ── Mobile Sticky CTA ───────────────── */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex shadow-[0_8px_30px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border border-white/10 backdrop-blur-md">
        <a
          href="tel:+919757190200"
          onClick={() =>
            trackEvent("phone_click", { location: "meta_lp_mobile_sticky" })
          }
          className="flex-1 flex items-center justify-center gap-2 py-3.5 gradient-gold text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <a
          href="https://wa.me/919757190200?text=Hi%2C%20I%20saw%20your%20home%20loan%20ad.%20Please%20help%20me."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("whatsapp_click", { location: "meta_lp_mobile_sticky" })
          }
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-success text-white font-bold text-sm"
        >
          <SiWhatsapp className="w-5 h-5" />
          WhatsApp
        </a>
      </div>

      {/* Desktop WhatsApp floating button */}
      <a
        href="https://wa.me/919757190200?text=Hi%2C%20I%20saw%20your%20home%20loan%20ad.%20Please%20help%20me%20with%20the%20best%20rate."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("whatsapp_click", { location: "meta_lp_desktop_floating" })
        }
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-success items-center justify-center shadow-lg hover:scale-110 transition-transform animate-float"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp className="w-8 h-8 text-white" />
      </a>
    </div>
  );
};

export default MetaAdsLP;
