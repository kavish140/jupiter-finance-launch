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
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { trackEvent } from "@/hooks/useAnalytics";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  service: z.literal("MSME Loan"),
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get an MSME Loan in Mulund, Mumbai",
  description:
    "Step-by-step guide to applying for and getting an MSME / business loan approved in Mulund and Mumbai.",
  step: [
    { "@type": "HowToStep", name: "Assess your business funding requirement", text: "Determine how much capital you need and for what purpose — working capital, equipment, expansion, or inventory." },
    { "@type": "HowToStep", name: "Check eligibility and documents", text: "We review your business vintage, turnover, ITR, and banking history to find the best lender match for your profile." },
    { "@type": "HowToStep", name: "Choose the right lender", text: "We compare offers from SBI, HDFC, ICICI, Kotak, and NBFCs to find the most competitive MSME loan rate." },
    { "@type": "HowToStep", name: "Submit documents", text: "Our team offers doorstep document collection and pre-checks your file before submission to avoid rejections." },
    { "@type": "HowToStep", name: "Receive sanction letter", text: "Review and accept the lender sanction letter — we guide you through terms and conditions." },
    { "@type": "HowToStep", name: "Loan disbursal", text: "Funds are disbursed directly to your business account, typically within 3-7 working days after sanction." },
  ],
};

const faqItems = [
  {
    question: "Who qualifies for an MSME loan in Mumbai?",
    answer: "Any business registered as a micro, small, or medium enterprise — including proprietorships, partnerships, LLPs, and private limited companies — can apply. Lenders typically require at least 2 years of business vintage and a minimum annual turnover of Rs 10 lakh.",
  },
  {
    question: "What is the interest rate on MSME loans?",
    answer: "Rates typically range from 10% to 18% per annum depending on the lender, business profile, CIBIL score, and collateral offered. Banks like SBI and HDFC offer lower rates for collateral-backed loans, while NBFCs provide faster approvals for unsecured loans.",
  },
  {
    question: "How much MSME loan can I get?",
    answer: "MSME loans range from Rs 1 lakh to Rs 5 crore depending on your business turnover, profitability, banking transactions, and lender policies. We help structure your application to maximise the sanctioned amount.",
  },
  {
    question: "Do you need collateral for an MSME loan?",
    answer: "Not always. Under the CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises) scheme, loans up to Rs 2 crore are available without collateral. We identify which government-backed schemes your business qualifies for.",
  },
  {
    question: "How long does MSME loan approval take?",
    answer: "With complete documentation, unsecured MSME loans from NBFCs can be approved in 3-7 days. Bank loans typically take 10-20 working days. Jupiter Finance pre-checks your file to minimise delays.",
  },
  {
    question: "Is your MSME loan advisory service free?",
    answer: "Yes, completely free. We are paid a referral fee by the lending institution — you pay nothing for consultation, lender comparison, or documentation support.",
  },
];

const whyUsPoints = [
  { icon: "🏦", title: "11+ Partner Banks & NBFCs", desc: "SBI, HDFC, ICICI, Kotak, Tata Capital, and more — we find your best MSME loan offer." },
  { icon: "🚗", title: "Doorstep Document Collection", desc: "We come to your business premises — no bank visits needed." },
  { icon: "⚡", title: "Fast Processing", desc: "NBFC loans in 3-7 days; bank loans in 10-20 working days with our pre-checked files." },
  { icon: "🏛️", title: "Govt. Scheme Guidance", desc: "We identify CGTMSE, Mudra, and other government-backed schemes you qualify for." },
  { icon: "📊", title: "Maximum Loan Eligibility", desc: "We structure your file to unlock the highest possible sanctioned amount." },
  { icon: "🆓", title: "Completely Free Service", desc: "Our advisory, lender comparison, and documentation support are free to you." },
];

const processSteps = [
  { step: "01", title: "Free Consultation", desc: "Call or fill the form. Our MSME loan advisor assesses your business profile and funding need within 24 hours." },
  { step: "02", title: "Lender Matching", desc: "We compare 11+ lenders and shortlist the ones most likely to approve your loan at the best rate." },
  { step: "03", title: "Document Collection", desc: "We collect your documents from your office or shop — no branch visits required." },
  { step: "04", title: "Submission & Follow-up", desc: "We pre-check and submit your file, then follow up with the lender on your behalf until disbursement." },
];

const MsmeLoan = () => {
  const [form, setForm] = useState({ name: "", phone: "", service: "MSME Loan" as const });
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
        email: "msmeloan@jupiterfastfinance.com",
        service: "MSME Loan",
        message: "MSME Loan enquiry from /msme-loan page.",
        page_url: window.location.href,
        submitted_at: new Date().toISOString(),
      }, { publicKey });
      trackEvent("form_submit", { form: "msme_loan_page", service: "MSME Loan" });
      toast.success("Thanks! Our advisor will call you shortly.");
      setForm({ name: "", phone: "", service: "MSME Loan" });
    } catch {
      toast.error("Could not send. Please call us directly at 9757190200.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="MSME Loans in Mulund & Mumbai | Best Business Loan Rates | Jupiter Finance"
        description="Get the best MSME loan rates in Mulund and Mumbai. Compare SBI, HDFC, ICICI, and 8+ lenders. Free consultation, doorstep document collection, CGTMSE & Mudra scheme guidance. Call 9757190200."
        keywords="msme loan mulund, business loan mumbai, msme loan consultant mulund, best msme loan rate mumbai 2025, small business loan mumbai, msme loan advisor mulund, jupiter finance msme loan, mudra loan mulund, cgtmse loan mumbai"
        canonicalUrl="https://jupiterfastfinance.com/msme-loan"
        ogType="article"
      />
      <StructuredData
        serviceType="MSME Loans"
        breadcrumbItems={[
          { name: "Home", url: "https://jupiterfastfinance.com/" },
          { name: "MSME Loan", url: "https://jupiterfastfinance.com/msme-loan" },
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
            <img src="/favicon.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" width={32} height={32} />
            <span>Jupiter<span className="text-gradient-gold"> Finance</span></span>
          </Link>
          <a
            href="tel:+919757190200"
            onClick={() => trackEvent("phone_click", { location: "msme_loan_header" })}
            className="gradient-gold text-accent-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call: 9757190200
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
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
                  MSME Loan Services — Mulund & Mumbai
                </p>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-5">
                  Best MSME & Business Loan Rates in{" "}
                  <span className="text-gradient-gold">Mulund & Mumbai</span>
                </h1>
                <p className="text-white/75 text-lg mb-6 max-w-lg">
                  We compare offers from SBI, HDFC, ICICI, Kotak, Tata Capital, and 8+ other lenders — and match your business with the best rate it qualifies for. Free service. No branch visits.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href="tel:+919757190200"
                    onClick={() => trackEvent("phone_click", { location: "msme_loan_hero" })}
                    className="flex items-center gap-2 gradient-gold text-accent-foreground font-bold px-7 py-4 rounded-xl text-base hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all"
                  >
                    <Phone className="w-5 h-5" /> Call for Free Consultation
                  </a>
                  <a
                    href="#msme-form"
                    className="flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold px-7 py-4 rounded-xl text-base hover:bg-white/10 transition-all"
                  >
                    Get a Callback &#8595;
                  </a>
                </div>

                <div className="flex flex-wrap gap-3">
                  {["25+ Years Experience", "11+ Partner Lenders", "Free Doorstep Collection", "CGTMSE & Mudra Scheme Guidance"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                      <CheckCircle2 className="w-3 h-3 text-gold shrink-0" /> {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right — Form */}
              <motion.div
                id="msme-form"
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
                    Our MSME loan advisor will call you within 2 hours with your best options.
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
                      Service: <strong className="text-gold">MSME Loan</strong>
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
                  <p className="text-xs text-muted-foreground text-center mt-3">100% confidential. No spam.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="py-10 bg-background border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
              Key Takeaways: MSME Loans in Mulund & Mumbai
            </h2>
            <ul className="text-left md:text-center text-muted-foreground list-disc md:list-none space-y-2 md:space-y-0 md:flex md:justify-center md:gap-6 flex-wrap">
              <li><strong>Zero Fees:</strong> Our consulting and documentation services are completely free.</li>
              <li><strong>11+ Lenders:</strong> Compare banks and NBFCs for the best MSME rate.</li>
              <li><strong>Govt. Schemes:</strong> CGTMSE, Mudra, and ECLGS guidance included.</li>
              <li><strong>Fast Disbursal:</strong> NBFC approvals in as little as 3-7 working days.</li>
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Our Advantage</p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">Why Mulund Businesses Trust Jupiter Finance</h2>
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

        {/* Process Steps */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Simple Process</p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">4 Steps to Your MSME Loan</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {processSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-card text-center relative"
                >
                  <div className="text-4xl font-display font-black text-gradient-gold mb-3">{s.step}</div>
                  <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gold/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Govt Schemes Banner */}
        <section className="py-10 bg-gradient-to-r from-navy-dark/80 to-navy/60 border-y border-gold/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-6">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-2">Government Schemes</p>
              <h2 className="text-xl md:text-2xl font-display font-bold text-white">We Help You Access MSME Government Loan Schemes</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Mudra Loan", desc: "Up to Rs 10 lakh under Shishu, Kishor & Tarun categories. No collateral required." },
                { name: "CGTMSE Scheme", desc: "Collateral-free loans up to Rs 2 crore for micro & small businesses." },
                { name: "ECLGS Scheme", desc: "Emergency credit for existing borrowers impacted by business disruptions." },
              ].map((scheme) => (
                <div key={scheme.name} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                  <h3 className="font-bold text-gold mb-2">{scheme.name}</h3>
                  <p className="text-sm text-white/70">{scheme.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Common Questions</p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">MSME Loan FAQs</h2>
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
                    <Star className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "text-gold rotate-45" : "text-muted-foreground"}`} />
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

        {/* Final CTA */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-navy-dark to-background">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-5xl block mb-4">💼</span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                Fuel your business growth today
              </h2>
              <p className="text-white/70 mb-8">
                One free call is all it takes. We handle the lender comparison, documentation, and follow-up — you focus on running your business.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+919757190200"
                  onClick={() => trackEvent("phone_click", { location: "msme_loan_bottom_cta" })}
                  className="flex items-center gap-2 gradient-gold text-accent-foreground font-bold px-8 py-4 rounded-xl text-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all"
                >
                  <Phone className="w-5 h-5" /> Call 9757190200
                </a>
                <a
                  href="https://wa.me/919757190200?text=Hi%2C%20I%27m%20interested%20in%20an%20MSME%20Loan.%20Please%20help%20me."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-white/20 bg-white/5 text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-all"
                >
                  <SiWhatsapp className="w-4 h-4 inline mr-2" /> WhatsApp Us
                </a>
              </div>
              <p className="text-white/40 text-sm mt-5">Available 10:00 AM - 7:00 PM IST, Monday - Saturday</p>
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

export default MsmeLoan;