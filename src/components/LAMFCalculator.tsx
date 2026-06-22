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

const LAMFCalculator = () => {
  const [equityValue, setEquityValue] = useState(2500000); // 25 Lakhs
  const [debtValue, setDebtValue] = useState(1000000); // 10 Lakhs

  const { totalPortfolio, maxOverdraft, equityLimit, debtLimit } = useMemo(() => {
    // Typical LTV limits: ~45-50% for Equity, ~80% for Debt
    const eqLimit = equityValue * 0.45;
    const dbLimit = debtValue * 0.80;
    
    return {
      totalPortfolio: equityValue + debtValue,
      maxOverdraft: eqLimit + dbLimit,
      equityLimit: eqLimit,
      debtLimit: dbLimit,
    };
  }, [equityValue, debtValue]);

  const equityShare = totalPortfolio > 0 ? (equityValue / totalPortfolio) * 100 : 0;

  return (
    <section id="lamf-calculator" className="py-10 md:py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Instant Liquidity</p>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-foreground">LAMF Overdraft Calculator</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Find out how much instant credit you can unlock against your existing mutual fund portfolio without selling it.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <article className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 space-y-7 shadow-card">
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="equityValue" className="font-semibold text-foreground">Equity Funds Value</label>
                <span className="font-bold text-gold">{formatCurrency(equityValue)}</span>
              </div>
              <input
                id="equityValue"
                type="range"
                min={0}
                max={50000000}
                step={100000}
                value={equityValue}
                onChange={(e) => setEquityValue(clamp(Number(e.target.value), 0, 50000000))}
                className="w-full accent-[hsl(var(--gold))]"
              />
              <p className="text-xs text-muted-foreground mt-1">Get up to ~45% limit against equity/hybrid funds.</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="debtValue" className="font-semibold text-foreground">Debt Funds Value</label>
                <span className="font-bold text-gold">{formatCurrency(debtValue)}</span>
              </div>
              <input
                id="debtValue"
                type="range"
                min={0}
                max={50000000}
                step={100000}
                value={debtValue}
                onChange={(e) => setDebtValue(clamp(Number(e.target.value), 0, 50000000))}
                className="w-full accent-[hsl(var(--gold))]"
              />
              <p className="text-xs text-muted-foreground mt-1">Get up to ~80% limit against liquid/debt funds.</p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm font-semibold mb-2">Portfolio Split</p>
              <div className="h-4 w-full rounded-full bg-secondary overflow-hidden flex">
                <div className="h-full bg-gold" style={{ width: `${equityShare}%` }} />
                <div className="h-full bg-primary" style={{ width: `${100 - equityShare}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold inline-block"></span> Equity</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Debt</span>
              </div>
            </div>
          </article>

          <article className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card space-y-6 flex flex-col justify-center">
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">Max Eligible Overdraft Limit</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-success mt-2">{formatCurrency(maxOverdraft)}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Limit against Equity</span>
                <span className="font-semibold text-foreground">{formatCurrency(equityLimit)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Limit against Debt</span>
                <span className="font-semibold text-foreground">{formatCurrency(debtLimit)}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 mt-2">
              <p className="text-sm font-medium text-foreground">Pay interest ONLY on what you use!</p>
              <p className="text-xs text-muted-foreground mt-1">If you get a 10L limit but only withdraw 2L for 10 days, you only pay interest on 2L for 10 days.</p>
            </div>
          </article>
        </div>

        {/* Conversion CTA */}
        <div className="mt-10 max-w-2xl mx-auto text-center rounded-2xl border border-gold/20 bg-card p-6 md:p-8 shadow-card">
          <p className="text-lg font-display font-bold text-foreground mb-2">
            Unlock your portfolio today
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Process takes just a few hours. 100% digital with zero physical paperwork.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919757190200"
              onClick={() => trackEvent("phone_click", { location: "lamf_calculator" })}
              className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              📞 Talk to an Advisor
            </a>
            <a
              href="https://wa.me/919757190200?text=Hi%2C%20I%20used%20the%20LAMF%20calculator%20and%20want%20to%20open%20an%20overdraft%20account."
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "lamf_calculator" })}
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

export default LAMFCalculator;
