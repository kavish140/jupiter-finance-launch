import { useMemo, useState } from "react";

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

  if (r === 0) {
    return principal / n;
  }

  const growthFactor = Math.pow(1 + r, n);
  return principal * r * (growthFactor / (growthFactor - 1));
};

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(2500000);
  const [annualRate, setAnnualRate] = useState(9.25);
  const [tenureYears, setTenureYears] = useState(20);

  const { emi, totalPayment, totalInterest, principalShare } = useMemo(() => {
    const monthlyEmi = calculateEmi(principal, annualRate, tenureYears);
    const months = tenureYears * 12;
    const total = monthlyEmi * months;
    const interest = total - principal;

    return {
      emi: monthlyEmi,
      totalPayment: total,
      totalInterest: interest,
      principalShare: (principal / total) * 100,
    };
  }, [principal, annualRate, tenureYears]);

  return (
    <section id="emi-calculator" className="py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Plan Better</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Home Loan EMI Calculator</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Formula used: E = P * r * ((1 + r)^n / ((1 + r)^n - 1)), where P is principal, r is monthly interest rate,
            and n is total monthly installments.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <article className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 space-y-7 shadow-card">
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="principal" className="font-semibold text-foreground">Loan Amount</label>
                <span className="font-bold text-gold">{formatCurrency(principal)}</span>
              </div>
              <input
                id="principal"
                type="range"
                min={100000}
                max={30000000}
                step={50000}
                value={principal}
                onChange={(e) => setPrincipal(clamp(Number(e.target.value), 100000, 30000000))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="rate" className="font-semibold text-foreground">Interest Rate (p.a.)</label>
                <span className="font-bold text-gold">{annualRate.toFixed(2)}%</span>
              </div>
              <input
                id="rate"
                type="range"
                min={6}
                max={18}
                step={0.05}
                value={annualRate}
                onChange={(e) => setAnnualRate(clamp(Number(e.target.value), 6, 18))}
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
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(clamp(Number(e.target.value), 1, 30))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>
          </article>

          <article className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card space-y-6">
            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">Estimated Monthly EMI</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">{formatCurrency(emi)}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Principal Amount</span>
                <span className="font-semibold text-foreground">{formatCurrency(principal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-semibold text-foreground">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Payment</span>
                <span className="font-semibold text-foreground">{formatCurrency(totalPayment)}</span>
              </div>
            </div>

            <div>
              <div className="h-4 w-full rounded-full bg-secondary overflow-hidden flex">
                <div className="h-full bg-gold" style={{ width: `${principalShare}%` }} />
                <div className="h-full bg-primary" style={{ width: `${100 - principalShare}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>Principal</span>
                <span>Interest</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;
