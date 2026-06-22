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

const calculateSIP = (monthlyInvestment: number, annualRate: number, years: number) => {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  
  // Future Value of SIP formula
  const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalInvested = monthlyInvestment * months;
  const wealthGained = futureValue - totalInvested;

  return {
    totalInvested,
    wealthGained,
    futureValue
  };
};

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const { totalInvested, wealthGained, futureValue } = useMemo(() => {
    return calculateSIP(monthlyInvestment, expectedReturn, timePeriod);
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const investedShare = (totalInvested / futureValue) * 100;

  return (
    <section id="sip-calculator" className="py-10 md:py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Wealth Builder</p>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-foreground">Mutual Fund SIP Calculator</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            See how small monthly investments can grow into massive wealth over time thanks to the power of compounding.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <article className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 space-y-7 shadow-card">
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="monthly" className="font-semibold text-foreground">Monthly Investment</label>
                <span className="font-bold text-gold">{formatCurrency(monthlyInvestment)}</span>
              </div>
              <input
                id="monthly"
                type="range"
                min={500}
                max={100000}
                step={500}
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(clamp(Number(e.target.value), 500, 100000))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="return" className="font-semibold text-foreground">Expected Return Rate (p.a.)</label>
                <span className="font-bold text-gold">{expectedReturn}%</span>
              </div>
              <input
                id="return"
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(clamp(Number(e.target.value), 1, 30))}
                className="w-full accent-[hsl(var(--gold))]"
              />
              <p className="text-xs text-muted-foreground mt-1">Historically, equity funds average 10-15% over the long term.</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="time" className="font-semibold text-foreground">Time Period</label>
                <span className="font-bold text-gold">{timePeriod} years</span>
              </div>
              <input
                id="time"
                type="range"
                min={1}
                max={40}
                step={1}
                value={timePeriod}
                onChange={(e) => setTimePeriod(clamp(Number(e.target.value), 1, 40))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>
          </article>

          <article className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card space-y-6 flex flex-col justify-center">
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-gold mt-2">{formatCurrency(futureValue)}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Invested Amount</span>
                <span className="font-semibold text-foreground">{formatCurrency(totalInvested)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Est. Returns</span>
                <span className="font-semibold text-success">+{formatCurrency(wealthGained)}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="h-4 w-full rounded-full bg-secondary overflow-hidden flex">
                <div className="h-full bg-primary" style={{ width: `${investedShare}%` }} />
                <div className="h-full bg-success" style={{ width: `${100 - investedShare}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Invested</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success inline-block"></span> Returns</span>
              </div>
            </div>
          </article>
        </div>

        {/* Conversion CTA */}
        <div className="mt-10 max-w-2xl mx-auto text-center rounded-2xl border border-gold/20 bg-card p-6 md:p-8 shadow-card">
          <p className="text-lg font-display font-bold text-foreground mb-2">
            Start Your SIP Today
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Let our AMFI-registered experts build a curated portfolio of top-performing mutual funds tailored to your financial goals.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919757190200"
              onClick={() => trackEvent("phone_click", { location: "sip_calculator" })}
              className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              📞 Talk to an Advisor
            </a>
            <a
              href="https://wa.me/919757190200?text=Hi%2C%20I%20used%20the%20SIP%20calculator%20and%20would%20like%20to%20start%20investing%20in%20mutual%20funds."
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "sip_calculator" })}
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

export default SIPCalculator;
