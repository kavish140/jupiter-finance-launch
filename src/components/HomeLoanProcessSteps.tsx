import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type EmploymentType = "salaried" | "self-employed";

const steps = [
  {
    number: "01",
    title: "Check Eligibility & CIBIL Score",
    description:
      "Start by knowing how much loan you qualify for and where your CIBIL score stands. A score of 750+ unlocks the best rates. Our team gives you a free eligibility check in under 10 minutes — no paperwork needed at this stage.",
    icon: "🎯",
    salariedDocs: [],
    selfEmployedDocs: [],
    tip: "Check your CIBIL for free at CIBIL.com or through your bank's app. Don't let multiple lenders pull your credit — each inquiry drops your score slightly.",
  },
  {
    number: "02",
    title: "Choose the Right Lender & Loan Type",
    description:
      "Not all banks offer the same rate for your profile. We compare offers from SBI, HDFC, ICICI, Kotak, LIC Housing, and 8+ other partners — and recommend the one that offers the best combination of rate, processing speed, and flexibility for your situation.",
    icon: "🏦",
    salariedDocs: [],
    selfEmployedDocs: [],
    tip: "Look beyond just the interest rate. Processing fees, prepayment charges, and disbursal timelines all affect your total cost.",
  },
  {
    number: "03",
    title: "Gather & Submit Documents",
    description:
      "This is the step most people find overwhelming — but we simplify it with doorstep document collection. Below is the complete checklist for your employment type.",
    icon: "📋",
    salariedDocs: [
      "PAN Card & Aadhaar Card",
      "Last 3 months' salary slips",
      "Last 6 months' bank statements (salary account)",
      "Form 16 or ITR for last 2 years",
      "Employment letter / ID card",
      "Property sale agreement / allotment letter",
      "NOC from housing society (if applicable)",
      "Title deed & encumbrance certificate",
    ],
    selfEmployedDocs: [
      "PAN Card & Aadhaar Card",
      "Last 3 years' ITR with computation",
      "Last 6 months' current account bank statements",
      "Audited profit & loss and balance sheet (3 years)",
      "GST registration & last 6 months' GST returns",
      "Business registration / license",
      "Partnership deed / MOA (if applicable)",
      "Property documents (title deed, approved plan, sale agreement)",
    ],
    tip: "Organise everything in one folder. A single missing document is the #1 cause of loan delays.",
  },
  {
    number: "04",
    title: "Technical & Legal Verification",
    description:
      "The lender sends a valuer to assess the property's market value, and a legal team verifies the title is clear of disputes. This typically takes 5–7 working days. We coordinate with the bank on your behalf during this stage.",
    icon: "🔍",
    salariedDocs: [],
    selfEmployedDocs: [],
    tip: "Ensure the property has valid RERA registration (for under-construction projects) and clear title documents. Issues here are the most common reason for rejections.",
  },
  {
    number: "05",
    title: "Loan Sanction Letter",
    description:
      "Once verification is complete, the bank issues a formal sanction letter confirming the approved amount, interest rate, EMI, and terms. Review this carefully — you can negotiate terms before accepting. We help you understand every clause.",
    icon: "✅",
    salariedDocs: [],
    selfEmployedDocs: [],
    tip: "The sanction letter is valid for 3–6 months. Ensure your property transaction timeline aligns with this window.",
  },
  {
    number: "06",
    title: "Disbursal & Registration",
    description:
      "After you sign the loan agreement and pay stamp duty for property registration, the bank disburses the funds — either directly to the builder/seller or in stages for under-construction properties. Congratulations, you're now a homeowner!",
    icon: "🏠",
    salariedDocs: [],
    selfEmployedDocs: [],
    tip: "Keep your loan account details and repayment schedule handy. Set up auto-debit for your EMI to protect your CIBIL score.",
  },
];

const HomeLoanProcessSteps = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [docTab, setDocTab] = useState<EmploymentType>("salaried");

  return (
    <section id="home-loan-process" className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Step by Step
          </p>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
            How the Home Loan Process Works
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From eligibility check to disbursal — here's exactly what happens at each stage, and what documents you'll need.
          </p>
        </motion.div>

        {/* Doc Tab (for steps that have documents) */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 bg-card border border-border rounded-xl p-1">
            {(["salaried", "self-employed"] as EmploymentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setDocTab(type)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  docTab === type
                    ? "gradient-gold text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "salaried" ? "💼 Salaried" : "🏢 Self-Employed"}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-4">
            {steps.map((step, i) => {
              const isOpen = openStep === i;
              const docs = docTab === "salaried" ? step.salariedDocs : step.selfEmployedDocs;
              const hasDocs = docs.length > 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative"
                >
                  <button
                    onClick={() => setOpenStep(isOpen ? null : i)}
                    className={`w-full text-left flex items-start gap-4 md:gap-6 bg-card border rounded-2xl p-5 md:p-6 shadow-card transition-all hover:border-gold/40 ${
                      isOpen ? "border-gold/40 bg-gold/5" : "border-border"
                    }`}
                  >
                    {/* Number bubble */}
                    <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex flex-col items-center justify-center font-display font-bold transition-all ${
                      isOpen ? "gradient-gold text-accent-foreground shadow-lg" : "bg-muted text-foreground"
                    }`}>
                      <span className="text-xs opacity-70">Step</span>
                      <span className="text-base md:text-lg leading-none">{step.number}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{step.icon}</span>
                        <h3 className="font-display font-bold text-foreground text-base md:text-lg">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-none">
                        {step.description}
                      </p>
                    </div>

                    <ChevronDown
                      className={`shrink-0 w-5 h-5 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180 text-gold" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mx-4 mb-4 bg-card/60 border border-border/60 rounded-b-2xl px-5 md:px-8 py-5 space-y-4">
                          {step.tip && (
                            <div className="flex items-start gap-3 bg-gold/10 border border-gold/20 rounded-xl px-4 py-3">
                              <span className="text-gold text-sm font-bold shrink-0">💡 Tip:</span>
                              <p className="text-sm text-muted-foreground">{step.tip}</p>
                            </div>
                          )}
                          {hasDocs && (
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-3">
                                Documents Required ({docTab === "salaried" ? "Salaried" : "Self-Employed"}):
                              </p>
                              <ul className="space-y-2">
                                {docs.map((doc) => (
                                  <li key={doc} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="text-gold mt-0.5 shrink-0">✓</span>
                                    {doc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-2xl mx-auto text-center bg-card border border-gold/20 rounded-2xl p-6 md:p-8 shadow-card"
        >
          <p className="text-lg font-display font-bold text-foreground mb-2">
            We handle all 6 steps for you
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Doorstep document collection, lender comparison, and end-to-end guidance — at no cost to you.
          </p>
          <a
            href="tel:+919757190200"
            className="gradient-gold text-accent-foreground font-bold px-8 py-3.5 rounded-xl text-base hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
          >
            📞 Start the Process — Free Call
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeLoanProcessSteps;
