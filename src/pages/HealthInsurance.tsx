import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SeoMeta from "@/components/SeoMeta";
import StructuredData from "@/components/StructuredData";
import { Link } from "react-router-dom";

const healthFaqs = [
  {
    question: "Do you offer family health insurance plans in Mulund?",
    answer: "Yes, we help families in Mulund and Mumbai choose the best family floater health insurance plans with comprehensive coverage and cashless network hospitals."
  },
  {
    question: "Which health insurance companies do you partner with?",
    answer: "We partner with leading insurers like Star Health, HDFC Ergo, ICICI Lombard, Niva Bupa, and Care Health to provide you with the best options."
  },
  {
    question: "Do you assist with health insurance claims?",
    answer: "Absolutely. We provide end-to-end support during medical emergencies, helping you with both cashless authorization and reimbursement claim filing."
  }
];

const HealthInsurance = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Health Insurance Consultant in Mulund & Mumbai | Jupiter Finance"
        description="Get comprehensive health insurance for your family in Mulund, Mumbai. Compare plans, cashless treatment at 10,000+ hospitals. Expert guidance from Jupiter Finance."
        keywords="health insurance mulund, mediclaim mumbai, health insurance consultant, family health insurance mumbai, jupiter finance, health insurance advisor mulund"
        canonicalUrl="https://jupiterfastfinance.com/health-insurance"
      />
      <StructuredData 
        serviceType="Health Insurance" 
        customFaqs={healthFaqs}
        breadcrumbItems={[
          { name: "Home", url: "https://jupiterfastfinance.com/" },
          { name: "Health Insurance", url: "https://jupiterfastfinance.com/health-insurance" }
        ]}
      />

      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-primary flex items-center gap-2">
            <img src="/favicon.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" width={32} height={32} />
            <span>Jupiter<span className="text-gradient-gold"> Finance</span></span>
          </Link>
          <a href="tel:+919757190200" className="gradient-gold text-accent-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">Call: 9757190200</a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-10">
        {/* Section 1: Hero */}
        <section className="space-y-4">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Health Insurance</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">Protect Your Family's Health, Secure Their Future</h1>
          <p className="text-muted-foreground max-w-3xl">
            Medical emergencies don't come with a warning — but the right health insurance plan ensures you're always prepared. From cashless treatment at 10,000+ network hospitals to comprehensive coverage for your entire family, Jupiter Finance in Mulund, Mumbai helps you find the perfect health insurance plan that fits your needs and budget. Don't leave your family's well-being to chance.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="tel:+919757190200" className="gradient-gold text-accent-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">Talk to an Advisor</a>
            <a href="https://wa.me/919757190200" target="_blank" rel="noreferrer" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-card transition-colors">WhatsApp Us</a>
          </div>
        </section>

        {/* Section 2: Two-column content */}
        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-display font-semibold">Benefits of Health Insurance</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Cashless treatment at 10,000+ network hospitals across India</li>
              <li>Individual and family floater plans to suit every household</li>
              <li>No-claim bonus benefits — your sum insured grows every claim-free year</li>
              <li>Coverage for pre-existing conditions after a waiting period</li>
              <li>Maternity and newborn baby coverage available</li>
              <li>Day-care procedures and modern treatments covered</li>
            </ul>
          </article>
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-display font-semibold">What You Get with Jupiter Finance</h2>
            <p className="text-muted-foreground">
              Choosing the right health insurance can be overwhelming with dozens of insurers and hundreds of plans available. Our experienced advisors compare plans across major insurers — including Star Health, HDFC Ergo, ICICI Lombard, Niva Bupa, and more — to recommend the plan that offers the best coverage, network hospitals, and premium for your family's specific needs.
            </p>
            <p className="text-muted-foreground">
              Beyond helping you buy the right policy, Jupiter Finance stands by you when it matters most — during claims. From cashless authorization at hospitals to reimbursement claim filing and follow-ups, we ensure you get the support you deserve without the paperwork stress. Your health is our priority.
            </p>
          </article>
        </section>

        {/* Section 3: Hindi content */}
        <section className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-display font-semibold">स्वास्थ्य बीमा — अपने परिवार की सुरक्षा</h2>
          <p className="text-muted-foreground">
            मेडिकल इमरजेंसी कभी भी आ सकती है — लेकिन सही हेल्थ इंश्योरेंस प्लान होने पर आप हमेशा तैयार रहते हैं। 10,000+ नेटवर्क हॉस्पिटल्स में कैशलेस ट्रीटमेंट से लेकर पूरे परिवार के लिए व्यापक कवरेज तक, Jupiter Finance मुलुंड, मुंबई में आपको सबसे बेहतर हेल्थ इंश्योरेंस प्लान खोजने में मदद करता है।
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>10,000+ नेटवर्क हॉस्पिटल्स में कैशलेस ट्रीटमेंट</li>
            <li>इंडिविजुअल और फैमिली फ्लोटर प्लान उपलब्ध</li>
            <li>नो-क्लेम बोनस — हर क्लेम-फ्री साल में सम इंश्योर्ड बढ़ता है</li>
            <li>वेटिंग पीरियड के बाद पहले से मौजूद बीमारियों का कवरेज</li>
            <li>मैटरनिटी और नवजात शिशु कवरेज उपलब्ध</li>
            <li>डे-केयर प्रोसीजर और आधुनिक उपचार कवर</li>
          </ul>
          <p className="text-muted-foreground">
            आज ही Jupiter Finance से संपर्क करें और अपने परिवार के स्वास्थ्य को सुरक्षित करें। कॉल करें: 9757190200
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
    </div>
  );
};

export default HealthInsurance;
