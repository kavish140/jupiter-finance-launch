import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Phone, MessageCircle } from "lucide-react";
import { trackEvent } from "@/hooks/useAnalytics";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatLakh = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)} L`;
  return formatCurrency(amount);
};

type EmploymentType = "salaried" | "self-employed";
type CibilRange = "750+" | "700-750" | "650-700" | "below-650";

const cibilMultiplier: Record<CibilRange, number> = {
  "750+": 1.0,
  "700-750": 0.90,
  "650-700": 0.75,
  "below-650": 0.55,
};

const cibilRateAdder: Record<CibilRange, number> = {
  "750+": 0,
  "700-750": 0.5,
  "650-700": 1.0,
  "below-650": 1.75,
};

const employmentRateAdder: Record<EmploymentType, number> = {
  "salaried": 0,
  "self-employed": 0.25,
};

const BASE_RATE = 8.50;
const FOIR = 0.55; // Fixed Obligation to Income Ratio

const calculateEligibleLoan = (
  monthlyIncome: number,
  existingEMI: number,
  tenureYears: number,
  ratePercent: number
) => {
  const availableEMI = Math.max(0, monthlyIncome * FOIR - existingEMI);
  const r = ratePercent / (12 * 100);
  const n = tenureYears * 12;
  if (r === 0 || n === 0 || availableEMI === 0) return 0;
  const loanAmount = availableEMI * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
  return Math.round(loanAmount);
};

type EligibilityStatus = "eligible" | "marginal" | "ineligible";

const HomeLoanEligibilityCalculator = () => {
  const [income, setIncome] = useState(60000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [tenure, setTenure] = useState(20);
  const [employment, setEmployment] = useState<EmploymentType>("salaried");
  const [cibil, setCibil] = useState<CibilRange>("750+");
  const [calculated, setCalculated] = useState(false);

  const { minLoan, maxLoan, estimatedRate, status, message } = useMemo(() => {
    const baseRate = BASE_RATE + cibilRateAdder[cibil] + employmentRateAdder[employment];
    const minRate = baseRate;
    const maxRate = baseRate + 1;
    const multiplier = cibilMultiplier[cibil];

    const max = Math.round(calculateEligibleLoan(income, existingEMI, tenure, minRate) * multiplier);
    const min = Math.round(calculateEligibleLoan(income, existingEMI, tenure, maxRate) * multiplier);

    let status: EligibilityStatus;
    let message: string;

    if (cibil === "below-650") {
      status = "marginal";
      message = "Your CIBIL score is low — most banks will decline, but select lenders may consider your case. Call us for a confidential assessment.";
    } else if (max < 500000) {
      status = "ineligible";
      message = "Your current income and EMI profile may not meet standard bank criteria. Call us — we have lender options for unique profiles.";
    } else if (cibil === "650-700" || max < 1500000) {
      status = "marginal";
      message = "You may qualify with select lenders. We recommend speaking to our advisor to maximise your approval chances.";
    } else {
      status = "eligible";
      message = "Great news! Your profile looks loan-ready. Get your exact eligibility confirmed — free, no credit check.";
    }

    return { minLoan: min, maxLoan: max, estimatedRate: baseRate.toFixed(2), status, message };
  }, [income, existingEMI, tenure, employment, cibil]);

  const handleCalculate = () => {
    setCalculated(true);
    trackEvent("eligibility_calc_used", {
      income_range: income >= 100000 ? "1L+" : income >= 50000 ? "50k-1L" : "below-50k",
      employment_type: employment,
      cibil_range: cibil,
    });
  };

  const waText = encodeURIComponent(
    `Hi, I used the eligibility calculator on your website. My estimated home loan eligibility is ${formatLakh(minLoan)} – ${formatLakh(maxLoan)}. I'd like to confirm my exact eligibility.`
  );

  return (
    <section id="eligibility-calculator" className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Instant Check
          </p>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
            Home Loan Eligibility Calculator
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Get an instant estimate of how much home loan you qualify for — based on your income, existing obligations, and credit profile.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-card"
          >
            {/* Employment Type */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Employment Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["salaried", "self-employed"] as EmploymentType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setEmployment(type)}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      employment === type
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border bg-background text-muted-foreground hover:border-gold/50"
                    }`}
                  >
                    {type === "salaried" ? "💼 Salaried" : "🏢 Self-Employed"}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Income */}
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label className="font-semibold text-foreground">Net Monthly Income</label>
                <span className="font-bold text-gold">{formatCurrency(income)}</span>
              </div>
              <input
                type="range"
                min={15000}
                max={500000}
                step={5000}
                value={income}
                onChange={(e) => { setIncome(Number(e.target.value)); setCalculated(false); }}
                className="w-full accent-[hsl(var(--gold))]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹15,000</span><span>₹5,00,000</span>
              </div>
            </div>

            {/* Existing EMI */}
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label className="font-semibold text-foreground">Existing Monthly EMIs</label>
                <span className="font-bold text-gold">{formatCurrency(existingEMI)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100000}
                step={1000}
                value={existingEMI}
                onChange={(e) => { setExistingEMI(Number(e.target.value)); setCalculated(false); }}
                className="w-full accent-[hsl(var(--gold))]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>None</span><span>₹1,00,000</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label className="font-semibold text-foreground">Desired Loan Tenure</label>
                <span className="font-bold text-gold">{tenure} years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenure}
                onChange={(e) => { setTenure(Number(e.target.value)); setCalculated(false); }}
                className="w-full accent-[hsl(var(--gold))]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5 yrs</span><span>30 yrs</span>
              </div>
            </div>

            {/* CIBIL Score */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                CIBIL Score Range
              </label>
              <select
                value={cibil}
                onChange={(e) => { setCibil(e.target.value as CibilRange); setCalculated(false); }}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
              >
                <option value="750+">750 and above (Excellent)</option>
                <option value="700-750">700 – 750 (Good)</option>
                <option value="650-700">650 – 700 (Average)</option>
                <option value="below-650">Below 650 (Needs Improvement)</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculate}
              className="w-full gradient-gold text-accent-foreground font-bold py-4 rounded-xl text-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
            >
              Check My Eligibility →
            </motion.button>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <AnimatePresence mode="wait">
              {!calculated ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-card border border-border rounded-2xl p-8 text-center shadow-card flex-1 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-3xl">🏠</div>
                  <p className="text-muted-foreground">
                    Fill in your details and click <strong className="text-foreground">Check My Eligibility</strong> to see your estimated home loan range.
                  </p>
                  <p className="text-xs text-muted-foreground">No credit check. No data shared. Instant estimate.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  {/* Eligibility Card */}
                  <div className={`rounded-2xl border p-6 shadow-card ${
                    status === "eligible" ? "border-green-500/30 bg-green-500/5" :
                    status === "marginal" ? "border-yellow-500/30 bg-yellow-500/5" :
                    "border-red-500/30 bg-red-500/5"
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      {status === "eligible" && <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />}
                      {status === "marginal" && <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />}
                      {status === "ineligible" && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
                      <p className="font-bold text-foreground text-lg">
                        {status === "eligible" ? "You're Likely Eligible!" :
                         status === "marginal" ? "Marginal — Let's Talk" :
                         "Needs Review"}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{message}</p>
                  </div>

                  {/* Amount Range */}
                  {maxLoan > 0 && (
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
                      <p className="text-sm text-muted-foreground">Estimated Loan Range</p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
                          {formatLakh(minLoan)}
                        </p>
                        <span className="text-muted-foreground mb-1">–</span>
                        <p className="text-3xl md:text-4xl font-display font-bold text-gold">
                          {formatLakh(maxLoan)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                        <span>Estimated Rate</span>
                        <span className="font-semibold text-foreground">{estimatedRate}%+ p.a.</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Tenure</span>
                        <span className="font-semibold text-foreground">{tenure} years</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        * Estimate only. Actual eligibility determined by lender after full assessment.
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="bg-card border border-gold/20 rounded-2xl p-6 shadow-card space-y-4">
                    <p className="font-bold text-foreground">Get Your Exact Eligibility Confirmed</p>
                    <p className="text-sm text-muted-foreground">
                      Free consultation. No credit impact. Our advisor will compare offers from 11+ banks to find your best deal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:+919757190200"
                        onClick={() => trackEvent("phone_click", { location: "eligibility_calc" })}
                        className="flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-semibold px-5 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                      <a
                        href={`https://wa.me/919757190200?text=${waText}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent("whatsapp_click", { location: "eligibility_calc" })}
                        className="flex items-center justify-center gap-2 border border-border bg-background text-foreground font-semibold px-5 py-3 rounded-xl text-sm hover:bg-muted transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeLoanEligibilityCalculator;
