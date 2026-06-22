import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, MessageCircle } from "lucide-react";
import { bankRates, type BankRate } from "@/data/bankRates";
import { trackEvent } from "@/hooks/useAnalytics";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

type EmploymentType = "salaried" | "self-employed";
type SortKey = "rateMin" | "maxTenure" | "maxLoan";

const BankEMIComparison = () => {
  const [employment, setEmployment] = useState<EmploymentType>("salaried");
  const [sortKey, setSortKey] = useState<SortKey>("rateMin");

  const sorted: BankRate[] = useMemo(() => {
    return [...bankRates].sort((a, b) => {
      if (sortKey === "rateMin") {
        const aRate = employment === "salaried" ? a.salariedRateMin : a.selfEmployedRateMin;
        const bRate = employment === "salaried" ? b.salariedRateMin : b.selfEmployedRateMin;
        return aRate - bRate;
      }
      if (sortKey === "maxTenure") return b.maxTenure - a.maxTenure;
      if (sortKey === "maxLoan") return b.maxLoanCrore - a.maxLoanCrore;
      return 0;
    });
  }, [employment, sortKey]);

  const handleWA = (bank: string) => {
    const text = encodeURIComponent(
      `Hi, I'm interested in a home loan from ${bank}. I saw the rate comparison on your website. Can you help me get the best deal?`
    );
    trackEvent("bank_comparison_wa_click", { bank });
    window.open(`https://wa.me/919757190200?text=${text}`, "_blank", "noreferrer");
  };

  const getRate = (bank: BankRate) =>
    employment === "salaried"
      ? `${bank.salariedRateMin.toFixed(2)}% – ${bank.salariedRateMax.toFixed(2)}%`
      : `${bank.selfEmployedRateMin.toFixed(2)}% – ${bank.selfEmployedRateMax.toFixed(2)}%`;

  const getMinRate = (bank: BankRate) =>
    employment === "salaried" ? bank.salariedRateMin : bank.selfEmployedRateMin;

  const lowestRate = Math.min(
    ...sorted.map((b) =>
      employment === "salaried" ? b.salariedRateMin : b.selfEmployedRateMin
    )
  );

  return (
    <section id="bank-comparison" className="py-12 md:py-20 bg-muted/40 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Compare & Save
          </p>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
            Home Loan Interest Rate Comparison
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Compare rates across top banks and NBFCs. We negotiate on your behalf to get you the lowest possible rate.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-6">
          <div className="flex gap-2 bg-card border border-border rounded-xl p-1">
            {(["salaried", "self-employed"] as EmploymentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setEmployment(type)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  employment === type
                    ? "gradient-gold text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "salaried" ? "💼 Salaried" : "🏢 Self-Employed"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort by:</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="border border-border bg-card text-foreground text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-gold outline-none"
            >
              <option value="rateMin">Lowest Rate</option>
              <option value="maxTenure">Longest Tenure</option>
              <option value="maxLoan">Highest Loan</option>
            </select>
          </div>
        </div>

        {/* Table — desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:block max-w-5xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Bank / NBFC</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Interest Rate (p.a.)</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Processing Fee</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Max Tenure</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Max Loan</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((bank, i) => {
                  const isLowest = getMinRate(bank) === lowestRate;
                  return (
                    <motion.tr
                      key={bank.bank}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                        isLowest ? "bg-gold/5" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{bank.logo}</span>
                          <div>
                            <p className="font-semibold text-foreground">{bank.bank}</p>
                            {isLowest && (
                              <span className="text-xs text-gold font-semibold">★ Best Rate</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold text-foreground">{getRate(bank)}</td>
                      <td className="px-5 py-4 text-muted-foreground">{bank.processingFee}</td>
                      <td className="px-5 py-4 text-muted-foreground">{bank.maxTenure} yrs</td>
                      <td className="px-5 py-4 text-muted-foreground">₹{bank.maxLoanCrore} Cr</td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleWA(bank.bank)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-foreground border border-border bg-background hover:border-gold/50 hover:text-gold px-3 py-2 rounded-lg transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Get This Rate
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-4 max-w-5xl mx-auto">
          {sorted.map((bank, i) => {
            const isLowest = getMinRate(bank) === lowestRate;
            return (
              <motion.div
                key={bank.bank}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`bg-card border rounded-2xl p-5 shadow-card ${
                  isLowest ? "border-gold/40 bg-gold/5" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{bank.logo}</span>
                    <div>
                      <p className="font-bold text-foreground">{bank.bank}</p>
                      {isLowest && <span className="text-xs text-gold font-semibold">★ Best Rate</span>}
                    </div>
                  </div>
                  <p className="font-bold text-foreground text-right text-sm">{getRate(bank)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                  <span>Processing: {bank.processingFee.split("(")[0].trim()}</span>
                  <span>Tenure: {bank.maxTenure} yrs</span>
                  <span>Max Loan: ₹{bank.maxLoanCrore} Cr</span>
                </div>
                <button
                  onClick={() => handleWA(bank.bank)}
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-foreground border border-border bg-background hover:border-gold/50 hover:text-gold px-4 py-2.5 rounded-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Get This Rate via WhatsApp
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Note + CTA */}
        <div className="mt-8 max-w-5xl mx-auto">
          <p className="text-xs text-center text-muted-foreground mb-6">
            📋 Rates as of June 2025. Indicative only — actual rates depend on loan amount, profile, and lender's current offer. Call us for confirmed quotes.
          </p>
          <div className="bg-card border border-gold/20 rounded-2xl p-6 md:p-8 text-center shadow-card">
            <p className="text-lg font-display font-bold text-foreground mb-2">
              Want us to negotiate the best rate for you?
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              We compare all lenders, handle paperwork, and get you the lowest rate your profile qualifies for. Free service — our fee is paid by the bank.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:+919757190200"
                onClick={() => trackEvent("phone_click", { location: "bank_comparison" })}
                className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                📞 Talk to an Advisor
              </a>
              <a
                href="https://wa.me/919757190200?text=Hi%2C%20I%20saw%20the%20bank%20rate%20comparison%20on%20your%20website%20and%20want%20to%20get%20the%20best%20home%20loan%20rate."
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "bank_comparison" })}
                className="border border-border bg-card text-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:bg-muted transition-colors inline-flex items-center gap-2"
              >
                <SiWhatsapp className="w-4 h-4 inline mr-2" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankEMIComparison;
