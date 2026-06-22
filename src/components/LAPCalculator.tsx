import { useMemo, useState } from "react";
import { trackEvent } from "@/hooks/useAnalytics";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const calculateEmi = (principal: number, annualRate: number, tenureYears: number) => {
  const n = tenureYears * 12;
  const r = annualRate / (12 * 100);

  if (r === 0) return principal / n;

  const growthFactor = Math.pow(1 + r, n);
  return principal * r * (growthFactor / (growthFactor - 1));
};

const LAPCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(10000000); // 1 Cr
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs
  const [tenureYears, setTenureYears] = useState(15);

  const { maxEligible, currentEmi, isEligible } = useMemo(() => {
    // Max LTV ratios (typical)
    const ltv = propertyType === "residential" ? 0.65 : 0.50;
    const maxAllowed = propertyValue * ltv;
    
    // LAP interest rates hover around 9.5% to 10.5%
    const rate = 9.75;
    
    const validLoan = Math.min(loanAmount, maxAllowed);
    const emi = calculateEmi(validLoan, rate, tenureYears);

    return {
      maxEligible: maxAllowed,
      currentEmi: emi,
      isEligible: loanAmount <= maxAllowed,
    };
  }, [propertyValue, propertyType, loanAmount, tenureYears]);

  return (
    <section id="lap-calculator" className="py-10 md:py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Unlock Value</p>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-foreground">LAP Eligibility & EMI Calculator</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Check your maximum loan eligibility against your property and estimate your monthly EMI instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <article className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 space-y-7 shadow-card">
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="propertyValue" className="font-semibold text-foreground">Current Property Value</label>
                <span className="font-bold text-gold">{formatCurrency(propertyValue)}</span>
              </div>
              <input
                id="propertyValue"
                type="range"
                min={2000000}
                max={100000000}
                step={500000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(clamp(Number(e.target.value), 2000000, 100000000))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label className="font-semibold text-foreground">Property Type</label>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="propType"
                    checked={propertyType === "residential"}
                    onChange={() => setPropertyType("residential")}
                    className="accent-[hsl(var(--gold))]"
                  />
                  <span className="text-sm">Residential</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="propType"
                    checked={propertyType === "commercial"}
                    onChange={() => setPropertyType("commercial")}
                    className="accent-[hsl(var(--gold))]"
                  />
                  <span className="text-sm">Commercial</span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Banks offer up to 65% LTV on residential, and 50% on commercial properties.</p>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-sm mb-3 mt-4">
                <label htmlFor="loanAmount" className="font-semibold text-foreground">Required Loan Amount</label>
                <span className="font-bold text-gold">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                id="loanAmount"
                type="range"
                min={1000000}
                max={50000000}
                step={500000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(clamp(Number(e.target.value), 1000000, 50000000))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="tenure" className="font-semibold text-foreground">Loan Tenure</label>
                <span className="font-bold text-gold">{tenureYears} years</span>
              </div>
              <input
                id="tenure"
                type="range"
                min={1}
                max={15}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(clamp(Number(e.target.value), 1, 15))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>
          </article>

          <article className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card space-y-6 flex flex-col justify-center">
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">Max Eligible Amount</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">{formatCurrency(maxEligible)}</p>
            </div>

            <div className="space-y-4">
              {!isEligible ? (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                  Your required loan amount exceeds the maximum allowed Loan-to-Value (LTV) limit for this property type. It has been capped at {formatCurrency(maxEligible)}.
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm font-medium">
                  Great! Your property value easily supports your requested loan amount.
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Estimated Monthly EMI</p>
                <p className="text-2xl font-display font-bold text-gold mt-1">{formatCurrency(currentEmi)}</p>
                <p className="text-xs text-muted-foreground mt-1">Calculated at ~9.75% interest per annum.</p>
              </div>
            </div>
          </article>
        </div>

        {/* Conversion CTA */}
        <div className="mt-10 max-w-2xl mx-auto text-center rounded-2xl border border-gold/20 bg-card p-6 md:p-8 shadow-card">
          <p className="text-lg font-display font-bold text-foreground mb-2">
            Ready to unlock funds?
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Get the best LAP interest rates from SBI, HDFC, ICICI and Bajaj Finserv. Quick processing and doorstep service.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919757190200"
              onClick={() => trackEvent("phone_click", { location: "lap_calculator" })}
              className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              📞 Talk to an Advisor
            </a>
            <a
              href="https://wa.me/919757190200?text=Hi%2C%20I%20used%20the%20LAP%20calculator%20and%20would%20like%20to%20discuss%20my%20loan%20eligibility."
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "lap_calculator" })}
              className="border border-border bg-card text-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:bg-muted transition-colors inline-flex items-center gap-2"
            >
              <SiWhatsapp className="w-4 h-4 inline mr-2 text-success" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LAPCalculator;
