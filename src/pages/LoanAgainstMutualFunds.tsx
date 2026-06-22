import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SeoMeta from "@/components/SeoMeta";
import StructuredData from "@/components/StructuredData";
import { Link } from "react-router-dom";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const lamfFaqs = [
  {
    question: "What is a Loan Against Mutual Funds?",
    answer: "It is a financing option where you pledge your mutual fund units as collateral to get a loan or overdraft facility, allowing you to access funds without selling your investments."
  },
  {
    question: "Do I continue to earn returns on my pledged mutual funds?",
    answer: "Yes, you continue to earn all dividends and capital appreciation on your pledged mutual fund units while enjoying the liquidity of the loan."
  },
  {
    question: "How long does it take to get a loan against mutual funds in Mumbai?",
    answer: "With Jupiter Finance, the process is quick and digital. Once your mutual funds are lien-marked, the loan amount is typically disbursed within a few days."
  }
];

const LoanAgainstMutualFunds = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Loan Against Mutual Funds in Mumbai | Jupiter Finance"
        description="Get instant liquidity by pledging your mutual fund holdings. No need to sell your investments. Expert guidance from Jupiter Finance in Mulund, Mumbai."
        keywords="loan against mutual funds, LAMF mumbai, pledge mutual funds for loan, mutual fund loan mulund, jupiter finance"
        canonicalUrl="https://jupiterfastfinance.com/loan-against-mutual-funds"
      />
      <StructuredData 
        serviceType="Loan Against Mutual Funds" 
        customFaqs={lamfFaqs}
        breadcrumbItems={[
          { name: "Home", url: "https://jupiterfastfinance.com/" },
          { name: "Loan Against Mutual Funds", url: "https://jupiterfastfinance.com/loan-against-mutual-funds" }
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
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Loan Against Mutual Funds</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">Borrow Against Your Mutual Funds Without Selling</h1>
          <p className="text-muted-foreground max-w-3xl">
            Need quick funds but don't want to liquidate your mutual fund portfolio? With a Loan Against Mutual Funds (LAMF), you can pledge your mutual fund units as collateral and get instant liquidity — all while your investments continue to grow. Jupiter Finance in Mulund, Mumbai helps you access the best LAMF options so you never have to choose between your financial goals and immediate cash needs.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="tel:+919757190200" className="gradient-gold text-accent-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">Talk to an Advisor</a>
            <a href="https://wa.me/919757190200" target="_blank" rel="noreferrer" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-card transition-colors"><SiWhatsapp className="w-4 h-4 inline mr-2 text-[#25D366]" /> WhatsApp Us</a>
          </div>
        </section>

        {/* Section 2: Two-column content */}
        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-display font-semibold">Benefits of Loan Against Mutual Funds</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>No need to redeem your investments — stay fully invested</li>
              <li>Instant liquidity with minimal processing time</li>
              <li>Lower interest rates compared to personal loans or credit cards</li>
              <li>Continue earning returns on your pledged mutual fund units</li>
              <li>Minimal documentation — fast and hassle-free process</li>
              <li>Overdraft facility available — pay interest only on the amount you use</li>
            </ul>
          </article>
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-display font-semibold">What You Get with Jupiter Finance</h2>
            <p className="text-muted-foreground">
              Our experts begin by evaluating your mutual fund portfolio — the type of funds (equity, debt, hybrid), their current NAV, and the lien-marking process — to determine the maximum loan amount you're eligible for. We work with leading banks and NBFCs to find you the lowest interest rate and the most flexible terms.
            </p>
            <p className="text-muted-foreground">
              Jupiter Finance handles everything from portfolio assessment and lien creation to lender coordination and disbursal. Whether you hold SIPs, lump-sum investments, or a mix of both, we ensure a smooth, transparent process so your money works for you in two ways — earning returns and providing liquidity when you need it most.
            </p>
          </article>
        </section>

        {/* Section 3: Hindi content */}
        <section className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-display font-semibold">म्यूचुअल फंड पर लोन</h2>
          <p className="text-muted-foreground">
            क्या आपको तुरंत पैसों की ज़रूरत है लेकिन अपने म्यूचुअल फंड नहीं बेचना चाहते? Loan Against Mutual Funds (LAMF) के ज़रिये आप अपने म्यूचुअल फंड यूनिट्स को गिरवी रखकर तुरंत लोन प्राप्त कर सकते हैं — और आपका निवेश बढ़ता भी रहेगा। Jupiter Finance मुलुंड, मुंबई में आपको सबसे बेहतर LAMF विकल्प दिलाने में मदद करता है।
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>निवेश रिडीम करने की ज़रूरत नहीं — पूरी तरह निवेशित रहें</li>
            <li>तुरंत लिक्विडिटी — न्यूनतम प्रोसेसिंग समय</li>
            <li>पर्सनल लोन या क्रेडिट कार्ड से कम ब्याज दरें</li>
            <li>गिरवी रखे गए म्यूचुअल फंड पर रिटर्न मिलता रहेगा</li>
            <li>कम से कम डॉक्यूमेंटेशन — तेज़ और आसान प्रक्रिया</li>
            <li>ओवरड्राफ्ट सुविधा उपलब्ध — सिर्फ़ इस्तेमाल की गई राशि पर ब्याज</li>
          </ul>
          <p className="text-muted-foreground">
            आज ही Jupiter Finance से संपर्क करें और अपने म्यूचुअल फंड की वैल्यू का स्मार्ट तरीके से फायदा उठाएं। कॉल करें: 9757190200
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
    </div>
  );
};

export default LoanAgainstMutualFunds;
