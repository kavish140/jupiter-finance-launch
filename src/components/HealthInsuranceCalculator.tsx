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

const HealthInsuranceCalculator = () => {
  const [age, setAge] = useState(30);
  const [members, setMembers] = useState(2);
  const [isTier1, setIsTier1] = useState(true);

  const { recommendedCover, estimatedPremium } = useMemo(() => {
    // Basic logic for demonstration
    // Cover: 5 Lakhs base + 5 Lakhs per extra member. Max out around 25 Lakhs usually, but let's just scale.
    let cover = 500000 + (members - 1) * 300000;
    if (isTier1) cover += 200000; // Tier 1 needs higher cover
    
    // Round to nearest Lakh
    cover = Math.ceil(cover / 100000) * 100000;

    // Premium: Base 6000 + 3000 per extra member
    let basePremium = 6000 + (members - 1) * 3000;
    
    // Age multiplier: 18-30 (1x), 31-45 (1.4x), 46-60 (2.2x), 60+ (3.5x)
    let ageMultiplier = 1;
    if (age > 30 && age <= 45) ageMultiplier = 1.4;
    else if (age > 45 && age <= 60) ageMultiplier = 2.2;
    else if (age > 60) ageMultiplier = 3.5;

    let premium = basePremium * ageMultiplier;
    
    // Tier 1 medical inflation premium
    if (isTier1) premium *= 1.15;

    // Add GST 18%
    premium *= 1.18;

    return {
      recommendedCover: cover,
      estimatedPremium: Math.round(premium / 100) * 100, // Round to nearest 100
    };
  }, [age, members, isTier1]);

  return (
    <section id="health-calculator" className="py-10 md:py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Coverage Estimator</p>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-foreground">Health Insurance Calculator</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Estimate your ideal health insurance coverage and approximate yearly premium based on your family's needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <article className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 space-y-7 shadow-card">
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="age" className="font-semibold text-foreground">Age of Eldest Member</label>
                <span className="font-bold text-gold">{age} years</span>
              </div>
              <input
                id="age"
                type="range"
                min={18}
                max={75}
                step={1}
                value={age}
                onChange={(e) => setAge(clamp(Number(e.target.value), 18, 75))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="members" className="font-semibold text-foreground">Total Family Members</label>
                <span className="font-bold text-gold">{members}</span>
              </div>
              <input
                id="members"
                type="range"
                min={1}
                max={6}
                step={1}
                value={members}
                onChange={(e) => setMembers(clamp(Number(e.target.value), 1, 6))}
                className="w-full accent-[hsl(var(--gold))]"
              />
              <p className="text-xs text-muted-foreground mt-1">Include yourself, spouse, and dependent children.</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label className="font-semibold text-foreground">City Type</label>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tier"
                    checked={isTier1}
                    onChange={() => setIsTier1(true)}
                    className="accent-[hsl(var(--gold))]"
                  />
                  <span className="text-sm">Tier 1 (Mumbai, Delhi, etc.)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tier"
                    checked={!isTier1}
                    onChange={() => setIsTier1(false)}
                    className="accent-[hsl(var(--gold))]"
                  />
                  <span className="text-sm">Tier 2 / Tier 3</span>
                </label>
              </div>
            </div>
          </article>

          <article className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card space-y-6 flex flex-col justify-center">
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">Recommended Health Cover</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-gold mt-2">{formatCurrency(recommendedCover)}</p>
            </div>

            <div className="space-y-2 pb-4">
              <p className="text-sm text-muted-foreground">Estimated Yearly Premium (incl. GST)</p>
              <p className="text-2xl font-display font-semibold text-foreground">{formatCurrency(estimatedPremium)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                *This is a rough estimate. Actual premiums vary by insurer, exact health conditions, and plan features.
              </p>
            </div>
          </article>
        </div>

        {/* Conversion CTA */}
        <div className="mt-10 max-w-2xl mx-auto text-center rounded-2xl border border-gold/20 bg-card p-6 md:p-8 shadow-card">
          <p className="text-lg font-display font-bold text-foreground mb-2">
            Get an Exact Quote
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            We compare 15+ top health insurance providers like Star Health, HDFC Ergo, and Niva Bupa to find the best plan for your family.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919757190200"
              onClick={() => trackEvent("phone_click", { location: "health_calculator" })}
              className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              📞 Talk to an Advisor
            </a>
            <a
              href="https://wa.me/919757190200?text=Hi%2C%20I%20used%20the%20health%20insurance%20calculator%20and%20would%20like%20to%20get%20exact%20quotes."
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "health_calculator" })}
              className="border border-border bg-card text-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:bg-muted transition-colors inline-flex items-center gap-2"
            >
              <SiWhatsapp className="w-4 h-4 inline mr-2 text-[#25D366]" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthInsuranceCalculator;
