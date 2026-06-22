import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SeoMeta from "@/components/SeoMeta";
import StructuredData from "@/components/StructuredData";
import SIPCalculator from "@/components/SIPCalculator";
import { Link } from "react-router-dom";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const sipFaqs = [
  {
    question: "What is the minimum amount required to start a Mutual Fund SIP?",
    answer: "You can start a Systematic Investment Plan (SIP) with an amount as low as ₹500 per month, making it accessible for everyone to build long-term wealth."
  },
  {
    question: "Can SIPs help save taxes?",
    answer: "Yes, investing in Equity Linked Savings Schemes (ELSS) through SIPs allows you to claim tax deductions up to ₹1.5 lakh under Section 80C of the Income Tax Act."
  },
  {
    question: "How do I choose the right mutual fund for SIP?",
    answer: "Our experts at Jupiter Finance assess your financial goals, risk appetite, and investment horizon to recommend the best-performing mutual funds tailored to your needs."
  }
];

const MutualFundSIP = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Mutual Fund SIP Advisor in Mulund & Mumbai | Jupiter Finance"
        description="Start your wealth-building journey with Mutual Fund SIPs. Expert guidance on fund selection, portfolio review, and long-term investment strategy from Jupiter Finance."
        keywords="mutual fund SIP mulund, SIP advisor mumbai, investment advisor mumbai, mutual fund consultant, jupiter finance, SIP planning mulund"
        canonicalUrl="https://jupiterfastfinance.com/mutual-fund-sip"
      />
      <StructuredData 
        serviceType="Mutual Fund SIP" 
        customFaqs={sipFaqs}
        breadcrumbItems={[
          { name: "Home", url: "https://jupiterfastfinance.com/" },
          { name: "Mutual Fund SIP", url: "https://jupiterfastfinance.com/mutual-fund-sip" }
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
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Mutual Fund SIP</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">Build Wealth Systematically With Expert Guidance</h1>
          <p className="text-muted-foreground max-w-3xl">
            Systematic Investment Plans (SIPs) are one of the smartest ways to build long-term wealth. By investing a fixed amount every month — starting with as little as ₹500 — you harness the power of rupee cost averaging and compounding returns. SIPs instill financial discipline, reduce market-timing risk, and make equity and debt markets accessible to every investor. At Jupiter Finance, we guide you through fund selection, risk profiling, and goal-based planning so your money works as hard as you do.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="tel:+919757190200" className="gradient-gold text-accent-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">Talk to an Advisor</a>
            <a href="https://wa.me/919757190200" target="_blank" rel="noreferrer" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-card transition-colors"><SiWhatsapp className="w-4 h-4 inline mr-2 text-[#25D366]" /> WhatsApp Us</a>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="bg-muted/30 p-6 rounded-xl border border-border">
          <h2 className="text-xl font-display font-semibold mb-3">Key Takeaways: Mutual Fund SIP Advisor in Mulund & Mumbai</h2>
          <ul className="text-muted-foreground list-disc list-inside space-y-2">
            <li><strong>Low Minimum Investment:</strong> Start building wealth with a Systematic Investment Plan (SIP) from just ₹500/month.</li>
            <li><strong>Tax Savings:</strong> Invest in ELSS funds to save up to ₹1.5 Lakh under Section 80C.</li>
            <li><strong>Custom Portfolios:</strong> Get data-backed recommendations across Large Cap, Mid Cap, and Multi-Asset funds.</li>
            <li><strong>Goal-Based Tracking:</strong> Dedicated advisory to align investments with retirement, child education, or home-buying goals.</li>
          </ul>
        </section>

        {/* SIP Calculator */}
        <SIPCalculator />

        {/* Section 2: Two-column content */}
        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Why invest through SIPs with us</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Start with as low as ₹500/month — making wealth creation accessible to salaried professionals, students, and homemakers alike.</li>
              <li>Leverage the power of compounding over time — even modest monthly contributions can grow into a substantial corpus over 10, 15, or 20 years.</li>
              <li>Diversified fund options across equity, debt, and hybrid categories so your portfolio matches your risk appetite and financial timeline.</li>
              <li>Regular portfolio review and rebalancing to keep your investments aligned with changing market conditions and personal milestones.</li>
              <li>Goal-based planning for retirement, children's education, home purchase, and long-term wealth accumulation — every SIP is mapped to a purpose.</li>
              <li>Tax-saving ELSS fund options that offer up to ₹1.5 lakh deduction under Section 80C with the shortest lock-in period among tax-saving instruments.</li>
            </ul>
          </article>
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">What you get</h2>
            <p className="text-muted-foreground">
              At Jupiter Finance, we begin with a thorough understanding of your risk profile, investment horizon, and financial goals. Whether you're a first-time investor looking for stable large-cap funds or a seasoned investor seeking high-growth mid- and small-cap exposure, our advisors recommend a curated basket of top-performing funds backed by solid research and track records.
            </p>
            <p className="text-muted-foreground">
              Beyond fund selection, we provide ongoing portfolio monitoring, performance reviews, and timely rebalancing suggestions. You also get clear, jargon-free explanations of NAV movements, exit loads, and tax implications. From starting your first SIP to scaling up as your income grows, we're with you at every step — visit us at our Mulund office or reach out on WhatsApp for instant support.
            </p>
          </article>
        </section>

        {/* Section 3: Hindi content */}
        <section className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">म्यूचुअल फंड SIP — व्यवस्थित निवेश</h2>
          <p className="text-muted-foreground">
            SIP (सिस्टमेटिक इन्वेस्टमेंट प्लान) लंबी अवधि में संपत्ति बनाने का सबसे अनुशासित और प्रभावी तरीका है। हर महीने एक निश्चित राशि निवेश करके — ₹500 से भी शुरुआत करके — आप रुपी कॉस्ट एवरेजिंग और कंपाउंडिंग का लाभ उठा सकते हैं। Jupiter Finance आपको सही फंड चुनने, रिस्क प्रोफाइलिंग, और लक्ष्य-आधारित प्लानिंग में मार्गदर्शन करता है।
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>₹500/महीने से शुरू करें — नौकरीपेशा, छात्र, और गृहिणियों सभी के लिए संपत्ति निर्माण को सुलभ बनाएं।</li>
            <li>समय के साथ कंपाउंडिंग की शक्ति का लाभ उठाएं — मामूली मासिक योगदान भी 10, 15, या 20 वर्षों में बड़ी राशि बन सकता है।</li>
            <li>इक्विटी, डेब्ट, और हाइब्रिड श्रेणियों में विविध फंड विकल्प — आपका पोर्टफोलियो आपकी जोखिम क्षमता और वित्तीय समयसीमा के अनुसार।</li>
            <li>नियमित पोर्टफोलियो समीक्षा और रीबैलेंसिंग ताकि आपके निवेश बदलती बाज़ार स्थितियों और व्यक्तिगत लक्ष्यों के अनुरूप बने रहें।</li>
            <li>रिटायरमेंट, बच्चों की शिक्षा, घर खरीदना, और दीर्घकालिक संपत्ति — हर SIP एक उद्देश्य से जुड़ा होता है।</li>
            <li>ELSS टैक्स-सेविंग फंड विकल्प — Section 80C के तहत ₹1.5 लाख तक की कटौती, सबसे कम लॉक-इन अवधि के साथ।</li>
          </ul>
          <p className="text-muted-foreground">
            Jupiter Finance की मुलुंड शाखा पर आएं या WhatsApp पर संपर्क करें — हमारे विशेषज्ञ आपकी ज़रूरतों को समझकर सबसे उपयुक्त म्यूचुअल फंड SIP की सिफारिश करेंगे, और शुरुआत से लेकर पोर्टफोलियो ग्रोथ तक हर कदम पर आपके साथ रहेंगे।
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
    </div>
  );
};

export default MutualFundSIP;
