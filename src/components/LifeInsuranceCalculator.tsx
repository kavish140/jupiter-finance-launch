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

const LifeInsuranceCalculator = () => {
  const [age, setAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [liabilities, setLiabilities] = useState(0);

  const { recommendedCover, yearsToProtect } = useMemo(() => {
    const years = Math.max(1, retirementAge - age);
    
    // Human Life Value approach: Income * min(20, years working) + existing liabilities
    const multiplier = Math.min(20, years);
    let cover = (annualIncome * multiplier) + liabilities;

    // Round to nearest Lakh
    cover = Math.ceil(cover / 100000) * 100000;

    return {
      recommendedCover: cover,
      yearsToProtect: years,
    };
  }, [age, retirementAge, annualIncome, liabilities]);

  return (
    <section id="life-calculator" className="py-10 md:py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Human Life Value</p>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-foreground">Term Insurance Calculator</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Find out exactly how much life cover your family needs to remain financially secure in your absence.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <article className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 space-y-7 shadow-card">
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="age" className="font-semibold text-foreground">Current Age</label>
                <span className="font-bold text-gold">{age} years</span>
              </div>
              <input
                id="age"
                type="range"
                min={18}
                max={60}
                step={1}
                value={age}
                onChange={(e) => {
                  const newAge = clamp(Number(e.target.value), 18, 60);
                  setAge(newAge);
                  if (newAge >= retirementAge) setRetirementAge(newAge + 5);
                }}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="retirementAge" className="font-semibold text-foreground">Planned Retirement Age</label>
                <span className="font-bold text-gold">{retirementAge} years</span>
              </div>
              <input
                id="retirementAge"
                type="range"
                min={40}
                max={75}
                step={1}
                value={retirementAge}
                onChange={(e) => setRetirementAge(clamp(Number(e.target.value), Math.max(40, age + 1), 75))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="income" className="font-semibold text-foreground">Annual Income</label>
                <span className="font-bold text-gold">{formatCurrency(annualIncome)}</span>
              </div>
              <input
                id="income"
                type="range"
                min={300000}
                max={10000000}
                step={100000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(clamp(Number(e.target.value), 300000, 10000000))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="liabilities" className="font-semibold text-foreground">Outstanding Loans/Liabilities</label>
                <span className="font-bold text-gold">{formatCurrency(liabilities)}</span>
              </div>
              <input
                id="liabilities"
                type="range"
                min={0}
                max={50000000}
                step={500000}
                value={liabilities}
                onChange={(e) => setLiabilities(clamp(Number(e.target.value), 0, 50000000))}
                className="w-full accent-[hsl(var(--gold))]"
              />
              <p className="text-xs text-muted-foreground mt-1">Include home loans, personal loans, etc.</p>
            </div>
          </article>

          <article className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card space-y-6 flex flex-col justify-center">
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">Recommended Term Cover</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-gold mt-2">{formatCurrency(recommendedCover)}</p>
            </div>

            <div className="space-y-3 pb-4">
              <p className="text-sm text-foreground font-medium">Why this amount?</p>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Replaces your income for ~{Math.min(20, yearsToProtect)} years.</li>
                {liabilities > 0 && <li>Clears off your {formatCurrency(liabilities)} debt burden.</li>}
                <li>Secures your family's standard of living until you would have retired.</li>
              </ul>
            </div>
          </article>
        </div>

        {/* Conversion CTA */}
        <div className="mt-10 max-w-2xl mx-auto text-center rounded-2xl border border-gold/20 bg-card p-6 md:p-8 shadow-card">
          <p className="text-lg font-display font-bold text-foreground mb-2">
            Protect Your Family Today
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Term insurance gets more expensive the older you get. Lock in a low premium now with plans from top insurers like HDFC Life, ICICI Pru, and Max Life.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919757190200"
              onClick={() => trackEvent("phone_click", { location: "life_calculator" })}
              className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              📞 Talk to an Advisor
            </a>
            <a
              href="https://wa.me/919757190200?text=Hi%2C%20I%20used%20the%20term%20insurance%20calculator%20and%20would%20like%20to%20get%20quotes."
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "life_calculator" })}
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

export default LifeInsuranceCalculator;
