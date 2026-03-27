import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SeoMeta from "@/components/SeoMeta";
import { Link } from "react-router-dom";

const HomeLoan = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Home Loan Services | Jupiter Fast Finance"
        description="Get expert home loan support from Jupiter Fast Finance. Compare lenders, improve eligibility, and complete disbursal with guidance at every step."
        keywords="home loan, home loan advisor, mortgage loan india, jupiter fast finance"
        canonicalUrl="https://jupiterfastfinance.com/home_loan"
        ogType="article"
      />
      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-primary">
            Jupiter<span className="text-gradient-gold"> Fast Finance</span>
          </Link>
          <a
            href="tel:9757190200"
            className="gradient-gold text-accent-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Call: 9757190200
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-10">
        <section className="space-y-4">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Home Loan</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            Get the Right Home Loan With Expert Guidance
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Looking for a smooth and stress-free home loan process? We help you compare offers from
            multiple banks and NBFCs, arrange doorstep document collection, and guide you from
            application to disbursal.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="tel:9757190200"
              className="gradient-gold text-accent-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Talk to an Advisor
            </a>
            <a
              href="https://wa.me/919757190200"
              target="_blank"
              rel="noreferrer"
              className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-card transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Why customers choose us</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Doorstep document collection to save your time and effort.</li>
              <li>Competitive home loan interest rates from trusted lenders.</li>
              <li>Compare options across leading banks and NBFCs in one place.</li>
              <li>Support for self-employed, salaried, and first-time home buyers.</li>
              <li>Cases considered for customers with low or poor CIBIL profile.</li>
              <li>End-to-end assistance until final loan disbursal.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">What you get</h2>
            <p className="text-muted-foreground">
              We understand that every customer has a different income profile and repayment
              capacity. Our team evaluates your eligibility, helps improve your application
              strength, and connects you with lender options that match your goals.
            </p>
            <p className="text-muted-foreground">
              Whether you are buying your first home, transferring an existing loan, or planning
              for better terms, we make the process transparent and easy to track.
            </p>
          </article>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">गृह ऋण के लिए हमसे क्यों जुड़ें</h2>
          <p className="text-muted-foreground">
            क्या आप आसान और भरोसेमंद होम लोन प्रक्रिया चाहते हैं? हमारी टीम आपके लिए अलग-अलग बैंक
            और NBFC के विकल्प तुलना करके सही लोन चुनने में मदद करती है।
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>डोरस्टेप डॉक्यूमेंट कलेक्शन - आपके घर से दस्तावेज़ लेने की सुविधा।</li>
            <li>होम लोन पर आकर्षक और प्रतिस्पर्धी ब्याज दरों के विकल्प।</li>
            <li>कई बैंकों और NBFCs में से अपनी जरूरत के अनुसार चयन।</li>
            <li>सैलरीड, सेल्फ-एम्प्लॉयड और फर्स्ट-टाइम खरीदारों के लिए मार्गदर्शन।</li>
            <li>कम या कमजोर CIBIL स्कोर वाले ग्राहकों के लिए भी सहायता।</li>
            <li>आवेदन से डिस्बर्सल तक पूरी प्रोसेस में एंड-टू-एंड सपोर्ट।</li>
          </ul>
          <p className="text-muted-foreground">
            हमारा उद्देश्य आपको तेज, पारदर्शी और भरोसेमंद सेवा देना है, ताकि आपका घर खरीदने का
            सपना जल्दी पूरा हो सके।
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomeLoan;

