export interface BankRate {
  bank: string;
  logo: string; // emoji or short abbrev for display
  salariedRateMin: number;
  salariedRateMax: number;
  selfEmployedRateMin: number;
  selfEmployedRateMax: number;
  processingFee: string;
  maxTenure: number; // years
  maxLoanCrore: number; // in crores
  specialNote: string;
}

// Rates as of June 2025. Indicative — actual offers subject to lender terms and applicant profile.
export const bankRates: BankRate[] = [
  {
    bank: "SBI",
    logo: "🏦",
    salariedRateMin: 8.50,
    salariedRateMax: 9.85,
    selfEmployedRateMin: 8.60,
    selfEmployedRateMax: 10.05,
    processingFee: "0.35% (min ₹2,000, max ₹10,000)",
    maxTenure: 30,
    maxLoanCrore: 10,
    specialNote: "Best rates for govt. employees & CIBIL 750+",
  },
  {
    bank: "Bank of Baroda",
    logo: "🏛️",
    salariedRateMin: 8.40,
    salariedRateMax: 10.60,
    selfEmployedRateMin: 8.50,
    selfEmployedRateMax: 10.90,
    processingFee: "0.25% (min ₹1,500, max ₹7,500)",
    maxTenure: 30,
    maxLoanCrore: 15,
    specialNote: "Lowest starting rate — ideal for excellent CIBIL",
  },
  {
    bank: "LIC Housing Finance",
    logo: "🏠",
    salariedRateMin: 8.50,
    salariedRateMax: 10.75,
    selfEmployedRateMin: 8.75,
    selfEmployedRateMax: 11.25,
    processingFee: "₹10,000 flat",
    maxTenure: 30,
    maxLoanCrore: 15,
    specialNote: "Trusted HFC — good for senior applicants",
  },
  {
    bank: "HDFC Bank",
    logo: "🔵",
    salariedRateMin: 8.75,
    salariedRateMax: 9.65,
    selfEmployedRateMin: 8.90,
    selfEmployedRateMax: 10.00,
    processingFee: "0.50% (min ₹3,000)",
    maxTenure: 30,
    maxLoanCrore: 10,
    specialNote: "Fast processing — strong digital onboarding",
  },
  {
    bank: "ICICI Bank",
    logo: "🔶",
    salariedRateMin: 8.75,
    salariedRateMax: 9.80,
    selfEmployedRateMin: 8.90,
    selfEmployedRateMax: 10.05,
    processingFee: "0.50% (min ₹3,000, max ₹10,000)",
    maxTenure: 30,
    maxLoanCrore: 10,
    specialNote: "Good balance of speed and rate",
  },
  {
    bank: "Kotak Mahindra",
    logo: "🟥",
    salariedRateMin: 8.75,
    salariedRateMax: 9.50,
    selfEmployedRateMin: 8.90,
    selfEmployedRateMax: 9.75,
    processingFee: "0.50% + GST",
    maxTenure: 20,
    maxLoanCrore: 5,
    specialNote: "Competitive for high-income salaried",
  },
  {
    bank: "Axis Bank",
    logo: "🟪",
    salariedRateMin: 8.75,
    salariedRateMax: 9.65,
    selfEmployedRateMin: 8.85,
    selfEmployedRateMax: 9.90,
    processingFee: "1% (min ₹10,000)",
    maxTenure: 30,
    maxLoanCrore: 5,
    specialNote: "Streamlined process — good for NRIs too",
  },
  {
    bank: "Bajaj Housing Finance",
    logo: "⬛",
    salariedRateMin: 8.50,
    salariedRateMax: 15.00,
    selfEmployedRateMin: 9.10,
    selfEmployedRateMax: 15.00,
    processingFee: "Up to 4% of loan",
    maxTenure: 40,
    maxLoanCrore: 5,
    specialNote: "Flexible for lower CIBIL / self-employed",
  },
];
