import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Send, CheckCircle2, Star } from "lucide-react";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SeoMeta from "@/components/SeoMeta";
import StructuredData from "@/components/StructuredData";
import HomeLoanEligibilityCalculator from "@/components/HomeLoanEligibilityCalculator";
import BankEMIComparison from "@/components/BankEMIComparison";
import HomeLoanProcessSteps from "@/components/HomeLoanProcessSteps";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { trackEvent } from "@/hooks/useAnalytics";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  service: z.literal("Home Loan"),
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get a Home Loan in Mulund, Mumbai",
  description:
    "Step-by-step guide to applying for and getting a home loan approved in Mulund and Mumbai.",
  step: [
    { "@type": "HowToStep", name: "Check eligibility and CIBIL score", text: "Use our free eligibility calculator or call us to check how much you qualify for." },
    { "@type": "HowToStep", name: "Choose the right lender", text: "We compare offers from SBI, HDFC, ICICI, and 8+ more lenders to find your best rate." },
    { "@type": "HowToStep", name: "Gather and submit documents", text: "Our team offers doorstep document collection and pre-checks your file before submission." },
    { "@type": "HowToStep", name: "Technical and legal verification", text: "The lender sends a valuer and legal team — we coordinate on your behalf." },
    { "@type": "HowToStep", name: "Receive sanction letter", text: "Review and accept the bank's sanction letter with our guidance." },
    { "@type": "HowToStep", name: "Disbursal and registration", text: "Complete property registration. Loan disbursed directly to seller or builder." },
  ],
};

const faqItems = [
  {
    question: "What is the minimum CIBIL score needed for a home loan in Mumbai?",
    answer: "Most banks prefer a CIBIL score of 700+. A score of 750+ gives you the best interest rates. We also work with select lenders who consider applications with scores as low as 620.",
  },
  {
    question: "How much home loan can I get on a ₹60,000/month salary in Mumbai?",
    answer: "At ₹60,000/month take-home with no existing EMIs, you can typically borrow ₹26–31 lakh over 20 years. Adding a co-applicant or reducing existing EMIs can significantly increase this amount.",
  },
  {
    question: "How long does home loan processing take?",
    answer: "With complete documentation, most banks sanction a home loan in 10–25 working days. Jupiter Fast Finance pre-checks your file to avoid delays — our average is 12–15 working days.",
  },
  {
    question: "Do you offer home loan services in Mulund East and Mulund West?",
    answer: "Yes. We serve all of Mulund including Mulund East, Mulund West, and nearby areas like Bhandup, Ghatkopar, Thane, and Powai.",
  },
  {
    question: "Is there any fee for your home loan advisory service?",
    answer: "No. Our service to you is completely free. We are paid a referral fee by the lending bank or NBFC — you pay nothing for our consultation, documentation support, or lender comparison.",
  },
  {
    question: "Can you help self-employed people get a home loan?",
    answer: "Yes. We have extensive experience with self-employed applicants — including those with ITR-based income, business owners, and professionals. We know which lenders are more flexible for self-employed profiles.",
  },
];

const whyUsPoints = [
  { icon: "🏦", title: "11+ Partner Banks & NBFCs", desc: "SBI, HDFC, ICICI, Kotak, LIC Housing, Axis, and more — we find your best rate." },
  { icon: "🚗", title: "Doorstep Document Collection", desc: "We come to you — no bank visits needed for document submission." },
  { icon: "⚡", title: "Fast Processing", desc: "Average 12–15 working day turnaround from document submission to sanction." },
  { icon: "🎯", title: "Eligibility Maximisation", desc: "We structure your application to get the highest possible sanctioned amount." },
  { icon: "📊", title: "CIBIL Score Guidance", desc: "We advise on how to improve your score before applying for the best rate." },
  { icon: "🆓", title: "Completely Free Service", desc: "Our advisory, documentation, and lender comparison are free to you." },
];

const HomeLoan = () => {
  const [form, setForm] = useState({ name: "", phone: "", service: "Home Loan" as const });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      toast.error("Please call or WhatsApp us directly.");
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: form.name,
        phone: form.phone,
        email: "homeloan@jupiterfastfinance.com",
        service: "Home Loan",
        message: "Home Loan enquiry from /home-loan page.",
        page_url: window.location.href,
        submitted_at: new Date().toISOString(),
      }, { publicKey });
      trackEvent("form_submit", { form: "home_loan_page", service: "Home Loan" });
      toast.success("Thanks! Our advisor will call you shortly.");
      setForm({ name: "", phone: "", service: "Home Loan" });
    } catch {
      toast.error("Could not send. Please call us directly at 9757190200.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Home Loan in Mulund & Mumbai | Best Rates | Jupiter Fast Finance"
        description="Get the best home loan rates in Mulund and Mumbai. Compare SBI, HDFC, ICICI and 8+ lenders. Free eligibility check, doorstep document collection, and end-to-end support. Call 9757190200."
        keywords="home loan mulund, home loan mumbai, home loan consultant mulund, best home loan rate mumbai 2025, home loan eligibility calculator, home loan advisor mulund, jupiter fast finance home loan"
        canonicalUrl="https://jupiterfastfinance.com/home-loan"
        ogType="article"
      />
      <StructuredData
        serviceType="Home Loans"
        breadcrumbItems={[
          { name: "Home", url: "https://jupiterfastfinance.com/" },
          { name: "Home Loan", url: "https://jupiterfastfinance.com/home-loan" },
        ]}
        customFaqs={faqItems}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Header */}
      <header className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-primary flex items-center gap-2">
            <img src="/favicon.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" />
            <span>Jupiter<span className="text-gradient-gold"> Fast Finance</span></span>
          </Link>
          <a
            href="tel:+919757190200"
            onClick={() => trackEvent("phone_click", { location: "home_loan_header" })}
            className="gradient-gold text-accent-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call: 9757190200
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────── */}
        <section className="py-14 md:py-24 bg-gradient-to-br from-navy-dark via-navy to-background relative overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 -right-10 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-4">
                  Home Loan Services — Mulund & Mumbai
                </p>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-5">
                  Best Home Loan Rates in{" "}
                  <span className="text-gradient-gold">Mulund & Mumbai</span>
                </h1>
                <p className="text-white/75 text-lg mb-6 max-w-lg">
                  We compare offers from SBI, HDFC, ICICI, Kotak, LIC Housing, and 8+ other lenders — and get you the best rate your profile qualifies for. Free service. No bank visits.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href="tel:+919757190200"
                    onClick={() => trackEvent("phone_click", { location: "home_loan_hero" })}
                    className="flex items-center gap-2 gradient-gold text-accent-foreground font-bold px-7 py-4 rounded-xl text-base hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all"
                  >
                    <Phone className="w-5 h-5" /> Call for Free Check
                  </a>
                  <a
                    href="#eligibility-calculator"
                    className="flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold px-7 py-4 rounded-xl text-base hover:bg-white/10 transition-all"
                  >
                    Check Eligibility ↓
                  </a>
                </div>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-3">
                  {["25+ Years Experience", "11+ Partner Banks", "Free Doorstep Collection", "Serving Mulund & Mumbai"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                      <CheckCircle2 className="w-3 h-3 text-gold shrink-0" /> {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right — Quick Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="bg-card/40 backdrop-blur-2xl rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-xl font-display font-bold text-foreground mb-1">
                    Get a Free Callback
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    Our advisor will call you within 2 hours with your eligibility estimate.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/90 mb-1.5">Full Name *</label>
                      <input
                        value={form.name}
                        onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: "" })); }}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/90 mb-1.5">Phone Number *</label>
                      <input
                        value={form.phone}
                        onChange={(e) => { setForm((p) => ({ ...p, phone: e.target.value })); setErrors((p) => ({ ...p, phone: "" })); }}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                        placeholder="10-digit mobile number"
                        maxLength={15}
                      />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="bg-gold/10 border border-gold/20 rounded-xl px-4 py-3 text-sm text-foreground/80">
                      Service: <strong className="text-gold">Home Loan</strong>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-bold px-6 py-3.5 rounded-xl text-base hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "Sending..." : "Get Free Callback"}
                    </motion.button>
                  </form>
                  <p className="text-xs text-muted-foreground text-center mt-3">🔒 100% confidential. No spam.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ───────────────────────── */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Our Advantage</p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">Why Mulund Trusts Jupiter Fast Finance</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {whyUsPoints.map((pt, i) => (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-card border border-border rounded-2xl p-5 shadow-card hover:border-gold/40 transition-colors"
                >
                  <span className="text-3xl mb-3 block">{pt.icon}</span>
                  <h3 className="font-bold text-foreground mb-1">{pt.title}</h3>
                  <p className="text-sm text-muted-foreground">{pt.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Eligibility Calculator ──────────────── */}
        <HomeLoanEligibilityCalculator />

        {/* ── Bank Rate Comparison ─────────────────── */}
        <BankEMIComparison />

        {/* ── Process Steps ───────────────────────── */}
        <HomeLoanProcessSteps />

        {/* ── FAQ ─────────────────────────────────── */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Common Questions</p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
                Home Loan FAQs
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqItems.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-card border rounded-2xl overflow-hidden shadow-card transition-colors ${openFaq === i ? "border-gold/40" : "border-border"}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <span className="font-semibold text-foreground text-sm md:text-base">{faq.question}</span>
                    <Star
                      className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "text-gold rotate-45" : "text-muted-foreground"}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────── */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-navy-dark to-background">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-5xl block mb-4">🏠</span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                Your dream home is closer than you think
              </h2>
              <p className="text-white/70 mb-8">
                One free call is all it takes. We handle the lender comparison, documentation, and follow-up — you just pick your home.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+919757190200"
                  onClick={() => trackEvent("phone_click", { location: "home_loan_bottom_cta" })}
                  className="flex items-center gap-2 gradient-gold text-accent-foreground font-bold px-8 py-4 rounded-xl text-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all"
                >
                  <Phone className="w-5 h-5" /> Call 9757190200
                </a>
                <a
                  href="https://wa.me/919757190200?text=Hi%2C%20I%27m%20interested%20in%20a%20Home%20Loan.%20Please%20help%20me."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-white/20 bg-white/5 text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-all"
                >
                  💬 WhatsApp Us
                </a>
              </div>
              <p className="text-white/40 text-sm mt-5">Available 10:00 AM – 7:00 PM IST, Monday – Saturday</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
      <ExitIntentPopup />
    </div>
  );
};

export default HomeLoan;
