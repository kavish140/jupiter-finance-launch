import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import StructuredData from "@/components/StructuredData";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";

const serviceAreas = [
  "Mulund East",
  "Mulund West",
  "Bhandup",
  "Ghatkopar",
  "Powai",
  "Thane",
  "Central Mumbai",
  "Navi Mumbai",
];

const loanTypes = [
  "Home loan guidance for first-time buyers and property purchases",
  "Loan against property for business and personal liquidity needs",
  "Loan against mutual funds for fast access to funds without redeeming investments",
  "Home loan balance transfer and top-up guidance",
  "Support for salaried and self-employed borrowers",
];

const localFaqs = [
  {
    question: "Do you help with loans in Mulund and nearby Mumbai suburbs?",
    answer:
      "Yes. We support customers across Mulund, Mumbai, Thane, and nearby suburbs with home loans, loan against property, and related financial services.",
  },
  {
    question: "Can you help compare lenders and improve eligibility?",
    answer:
      "Yes. We compare lenders, explain the documents required, and help you understand the eligibility profile so you can choose the most practical loan option.",
  },
  {
    question: "Do you support other financial products too?",
    answer:
      "We also help with mutual fund SIP planning, health insurance, and life insurance so customers can manage borrowing and financial protection in one place.",
  },
];

const MulundMumbaiLoans = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Loans in Mulund & Mumbai | Jupiter Fast Finance"
        description="Looking for home loan, loan against property, or loan against mutual funds in Mulund, Mumbai, and nearby suburbs? Jupiter Fast Finance helps you compare lenders and get guided support."
        keywords="loans in mulund, loans in mumbai, home loan mulund, loan against property mumbai, loan consultant mulund, loan against mutual funds mumbai, jupiter fast finance"
        canonicalUrl="https://jupiterfastfinance.com/mulund-mumbai-loans"
      />
      <StructuredData />

      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-primary">
            Jupiter<span className="text-gradient-gold"> Fast Finance</span>
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
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Local Loan Services</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight max-w-4xl">
            Home Loans and Loan Advice for Mulund, Mumbai, and Nearby Areas
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Jupiter Fast Finance helps borrowers across Mulund and the wider Mumbai region with
            home loans, loan against property, and loan against mutual funds. We keep the process
            simple, transparent, and focused on lender options that match your profile.
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
            <h2 className="text-2xl font-semibold">Areas we serve</h2>
            <p className="text-muted-foreground">
              We focus on customer searches and loan enquiries from the eastern and central Mumbai
              corridor, especially around Mulund.
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
            <h2 className="text-2xl font-semibold">What we help with</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {loanTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Why local searchers should find us</h2>
          <p className="text-muted-foreground max-w-4xl">
            This page is built for people searching for loan help in Mulund, Mumbai, and nearby
            suburbs. The combination of location-focused page copy, structured data, internal links,
            and a dedicated sitemap entry gives search engines a clear signal that Jupiter Fast
            Finance is relevant for local loan intent.
          </p>
          <p className="text-muted-foreground max-w-4xl">
            If you are comparing lenders, looking for a home loan consultant, or checking loan
            against property options in the Mumbai region, this is the fastest way to connect with
            our team.
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
    </div>
  );
};

export default MulundMumbaiLoans;