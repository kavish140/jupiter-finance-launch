import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SeoMeta from "@/components/SeoMeta";
import StructuredData from "@/components/StructuredData";
import { Link } from "react-router-dom";

const lifeFaqs = [
  {
    question: "What types of life insurance do you offer guidance on?",
    answer: "We offer expert guidance on Term Life Insurance, Endowment Plans, and Unit Linked Insurance Plans (ULIPs) from top insurers like LIC, HDFC Life, and ICICI Prudential."
  },
  {
    question: "Do you help customers in Mulund find the right term plan?",
    answer: "Yes, we analyze your income, liabilities, and family needs to recommend the best term insurance plan with adequate coverage at the lowest premium."
  },
  {
    question: "Can life insurance help save taxes?",
    answer: "Yes, life insurance premiums are generally tax-deductible under Section 80C, and maturity payouts can be tax-free under Section 10(10D) of the Income Tax Act."
  }
];

const LifeInsurance = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Life Insurance Advisor in Mulund & Mumbai | Jupiter Finance"
        description="Secure your family's financial future with the right life insurance plan. Term plans, endowment, ULIPs — expert guidance from Jupiter Finance in Mulund, Mumbai."
        keywords="life insurance mulund, term plan mumbai, life insurance advisor, ULIP mumbai, endowment plan mulund, jupiter finance"
        canonicalUrl="https://jupiterfastfinance.com/life-insurance"
      />
      <StructuredData 
        serviceType="Life Insurance" 
        customFaqs={lifeFaqs}
        breadcrumbItems={[
          { name: "Home", url: "https://jupiterfastfinance.com/" },
          { name: "Life Insurance", url: "https://jupiterfastfinance.com/life-insurance" }
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
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Life Insurance</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">Secure Your Family's Future Today</h1>
          <p className="text-muted-foreground max-w-3xl">
            Life insurance is one of the most important financial decisions you'll ever make. Whether you need pure protection through a term plan, a savings-cum-protection combination via an endowment policy, or market-linked growth with ULIPs, the right life cover ensures your loved ones are financially secure no matter what life brings. At Jupiter Finance, we help you understand every option so you choose a plan that fits your goals, budget, and life stage.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="tel:+919757190200" className="gradient-gold text-accent-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">Talk to an Advisor</a>
            <a href="https://wa.me/919757190200" target="_blank" rel="noreferrer" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-card transition-colors">WhatsApp Us</a>
          </div>
        </section>

        {/* Section 2: Two-column content */}
        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Why choose our life insurance guidance</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Compare term plans across top insurers like LIC, HDFC Life, ICICI Prudential, and Max Life to find the best coverage at the lowest premium.</li>
              <li>Endowment plans that combine disciplined savings with life protection, giving your family a guaranteed payout at maturity or in case of an unfortunate event.</li>
              <li>ULIP options for market-linked returns — ideal if you want insurance and equity growth in a single product with fund-switching flexibility.</li>
              <li>Maximize your tax benefits under Section 80C with premiums and under Section 10(10D) with tax-free maturity proceeds.</li>
              <li>Add essential riders for critical illness cover, accidental death benefit, and waiver of premium so your policy works harder for you.</li>
              <li>Plans tailored for every budget and life stage — whether you're a young professional, a new parent, or planning for retirement.</li>
            </ul>
          </article>
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">What you get</h2>
            <p className="text-muted-foreground">
              At Jupiter Finance, we don't just sell policies — we analyze your life stage, annual income, existing liabilities, and the number of dependents to recommend a plan that truly fits. Whether you need a high-cover term plan to protect a home loan or an endowment policy to fund your child's education, our advisors walk you through every detail so you make an informed choice.
            </p>
            <p className="text-muted-foreground">
              From the initial consultation to policy issuance and ongoing claim support, we stay by your side. We also conduct periodic reviews to ensure your coverage keeps pace with your growing responsibilities. With our network of leading insurers and deep understanding of the Mumbai market, you get access to competitive premiums and hassle-free processing — all from our Mulund office or right on WhatsApp.
            </p>
          </article>
        </section>

        {/* Section 3: Hindi content */}
        <section className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">जीवन बीमा — परिवार की सुरक्षा</h2>
          <p className="text-muted-foreground">
            जीवन बीमा आपके परिवार की आर्थिक सुरक्षा का सबसे मजबूत आधार है। चाहे आपको शुद्ध सुरक्षा के लिए टर्म प्लान चाहिए, बचत और सुरक्षा दोनों के लिए एंडोमेंट पॉलिसी, या बाज़ार से जुड़े रिटर्न के लिए ULIP — Jupiter Finance आपको सही योजना चुनने में मदद करता है।
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>LIC, HDFC Life, ICICI Prudential जैसी प्रमुख बीमा कंपनियों के टर्म प्लान की तुलना करें और सबसे कम प्रीमियम पर सर्वश्रेष्ठ कवरेज पाएं।</li>
            <li>एंडोमेंट प्लान के ज़रिए अनुशासित बचत के साथ जीवन सुरक्षा प्राप्त करें — मैच्योरिटी पर गारंटीड भुगतान।</li>
            <li>ULIP विकल्प जो बीमा और इक्विटी ग्रोथ को एक ही प्रोडक्ट में जोड़ते हैं, साथ में फंड स्विचिंग की सुविधा।</li>
            <li>Section 80C के तहत प्रीमियम पर और Section 10(10D) के तहत मैच्योरिटी राशि पर टैक्स बेनिफिट का पूरा फ़ायदा उठाएं।</li>
            <li>गंभीर बीमारी कवर, दुर्घटना मृत्यु लाभ, और प्रीमियम माफी जैसे ज़रूरी राइडर्स जोड़ें।</li>
            <li>हर बजट और जीवन के हर पड़ाव के लिए उपयुक्त योजनाएं — चाहे आप युवा प्रोफेशनल हों, नए माता-पिता हों, या रिटायरमेंट की तैयारी कर रहे हों।</li>
          </ul>
          <p className="text-muted-foreground">
            Jupiter Finance की मुलुंड शाखा से या WhatsApp पर संपर्क करें — हमारे विशेषज्ञ आपकी ज़रूरतों को समझकर सबसे सही जीवन बीमा योजना की सिफारिश करेंगे, और पॉलिसी जारी होने से लेकर क्लेम तक हर कदम पर आपके साथ रहेंगे।
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
    </div>
  );
};

export default LifeInsurance;
