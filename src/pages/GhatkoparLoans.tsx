import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import StructuredData from "@/components/StructuredData";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Link } from "react-router-dom";

const serviceAreas = [
  "Ghatkopar East",
  "Ghatkopar West",
  "Pant Nagar",
  "Garodia Nagar",
  "Vidyavihar",
  "Asalpha",
];

const loanTypes = [
  "Home loan guidance for first-time buyers in Ghatkopar",
  "Loan against property for business expansion or liquidity",
  "Loan against mutual funds without liquidating investments",
  "Balance transfer and top-up options for existing loans",
  "Tailored support for salaried and self-employed professionals",
];

const localFaqs = [
  {
    question: "Do you help with home loans in Ghatkopar?",
    answer:
      "Yes. We specialize in helping customers across Ghatkopar West, Ghatkopar East, and nearby areas secure the best home loan rates from top banks and NBFCs.",
  },
  {
    question: "What is the process for loan against property in Ghatkopar?",
    answer:
      "We compare lenders, assess the property valuation, and guide you through the documentation to ensure a fast and transparent loan against property disbursal.",
  },
  {
    question: "Do you offer doorstep document collection in Ghatkopar?",
    answer:
      "Yes, our team can arrange for doorstep document pickup to make your loan application process entirely stress-free in Ghatkopar.",
  },
];

const GhatkoparLoans = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Home Loans & Loan Against Property in Ghatkopar | Jupiter Fast Finance"
        description="Looking for a reliable loan consultant in Ghatkopar? Jupiter Fast Finance provides expert guidance for home loans, loan against property, and mutual funds across Ghatkopar."
        keywords="home loan ghatkopar, loan against property ghatkopar, loan consultant ghatkopar, financial services ghatkopar, loans in ghatkopar east, vidyavihar loans, jupiter fast finance ghatkopar"
        canonicalUrl="https://jupiterfastfinance.com/loans-in-ghatkopar"
      />
      <StructuredData
        location="Ghatkopar"
        serviceType="Home Loans, Loan Against Property"
        customFaqs={localFaqs}
        breadcrumbItems={[
          { name: "Home", url: "https://jupiterfastfinance.com/" },
          { name: "Loans in Ghatkopar", url: "https://jupiterfastfinance.com/loans-in-ghatkopar" }
        ]}
      />

      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-primary flex items-center gap-2">
            <img src="/favicon.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" />
            <span>Jupiter<span className="text-gradient-gold"> Fast Finance</span></span>
          </Link>
          <a
            href="tel:+919757190200"
            className="gradient-gold text-accent-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Call: 9757190200
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-10">
        <section className="space-y-5">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Local Loan Services in Ghatkopar</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight max-w-4xl">
            Expert Home Loans and Financial Guidance in Ghatkopar
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Whether you are buying a new home in Ghatkopar, seeking a loan against property for your business,
            or exploring loan against mutual funds, Jupiter Fast Finance is your trusted local partner.
            We simplify the complex loan process, ensuring transparency and competitive rates.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="tel:+919757190200"
              className="gradient-gold text-accent-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Talk to an Advisor
            </a>
            <Link
              to="/home_loan"
              className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-card transition-colors"
            >
              View Home Loan Page
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Ghatkopar Areas We Serve</h2>
            <p className="text-muted-foreground">
              We provide fast, reliable financial consulting to residents and businesses across the Ghatkopar region.
            </p>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Our Local Services</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {loanTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Why Ghatkopar Residents Trust Us</h2>
          <p className="text-muted-foreground max-w-4xl">
            Finding the right loan in a central suburb like Ghatkopar can be overwhelming. We partner with
            major banks and NBFCs to ensure our customers get the best terms possible. From the initial
            eligibility check to the final loan disbursal, we offer dedicated end-to-end support.
          </p>
          <p className="text-muted-foreground max-w-4xl">
            By choosing a local financial expert, you save time, reduce paperwork friction, and gain
            clarity on all hidden charges or complex loan terms.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {localFaqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
    </div>
  );
};

export default GhatkoparLoans;
