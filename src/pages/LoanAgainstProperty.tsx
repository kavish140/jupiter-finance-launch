import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SeoMeta from "@/components/SeoMeta";
import StructuredData from "@/components/StructuredData";
import { Link } from "react-router-dom";

const LoanAgainstProperty = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Loan Against Property in Mulund & Mumbai | Jupiter Finance"
        description="Get a loan against your residential or commercial property in Mulund, Mumbai, and nearby areas. Quick approvals, competitive rates, and expert guidance from Jupiter Finance."
        keywords="loan against property mulund, LAP mumbai, property loan mumbai, mortgage loan mumbai, jupiter finance, LAP consultant mulund"
        canonicalUrl="https://jupiterfastfinance.com/loan-against-property"
      />
      <StructuredData
        serviceType="Loan Against Property"
        breadcrumbItems={[
          { name: "Home", url: "https://jupiterfastfinance.com/" },
          { name: "Loan Against Property", url: "https://jupiterfastfinance.com/loan-against-property" }
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
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Loan Against Property</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">Unlock the Value of Your Property</h1>
          <p className="text-muted-foreground max-w-3xl">
            Own a residential or commercial property? Put it to work for you. A Loan Against Property (LAP) lets you borrow a substantial amount by mortgaging your property — without selling it. Whether you need funds for business expansion, education, medical expenses, or debt consolidation, Jupiter Finance helps property owners across Mulund, Mumbai, Thane, and nearby areas secure the best LAP deals with quick approvals and competitive interest rates.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="tel:+919757190200" className="gradient-gold text-accent-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">Talk to an Advisor</a>
            <a href="https://wa.me/919757190200" target="_blank" rel="noreferrer" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-card transition-colors">WhatsApp Us</a>
          </div>
        </section>

        {/* Section 2: Two-column content */}
        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-display font-semibold">Benefits of Loan Against Property</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Loan available on both residential and commercial property</li>
              <li>Competitive interest rates lower than personal loans</li>
              <li>High loan-to-value ratio — borrow up to 70% of property value</li>
              <li>Quick processing and fast disbursal</li>
              <li>Flexible repayment tenure of up to 15–20 years</li>
              <li>Available for both self-employed professionals and salaried individuals</li>
            </ul>
          </article>
          <article className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-display font-semibold">What You Get with Jupiter Finance</h2>
            <p className="text-muted-foreground">
              Our team starts with a thorough evaluation of your property — its market value, legal standing, and location — to determine the maximum loan amount you can unlock. We then match your profile with the best offers from our network of partner banks and NBFCs to ensure you get the most favourable interest rate and terms.
            </p>
            <p className="text-muted-foreground">
              From documentation and application to valuation and disbursal, Jupiter Finance handles every step so you can focus on what matters. Whether it's a flat in Mulund, a shop in Thane, or an office in Mumbai, we make the process seamless, transparent, and fast.
            </p>
          </article>
        </section>

        {/* Section 3: Hindi content */}
        <section className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-display font-semibold">प्रॉपर्टी पर लोन के लिए हमसे जुड़ें</h2>
          <p className="text-muted-foreground">
            क्या आपके पास रेसिडेंशियल या कमर्शियल प्रॉपर्टी है? अब उसे बेचे बिना उसकी वैल्यू का फायदा उठाएं। Loan Against Property (LAP) के ज़रिये आप अपनी प्रॉपर्टी गिरवी रखकर बड़ी रकम प्राप्त कर सकते हैं — चाहे वो बिज़नेस के लिए हो, पढ़ाई के लिए, या किसी भी ज़रूरी खर्चे के लिए। Jupiter Finance मुलुंड, मुंबई, ठाणे और आसपास के इलाकों में सबसे बेहतर LAP डील दिलाने में आपकी मदद करता है।
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>रेसिडेंशियल और कमर्शियल दोनों प्रॉपर्टी पर लोन उपलब्ध</li>
            <li>प्रतिस्पर्धी ब्याज दरें — पर्सनल लोन से कम</li>
            <li>प्रॉपर्टी वैल्यू का 70% तक लोन</li>
            <li>तेज़ प्रोसेसिंग और जल्दी डिस्बर्सल</li>
            <li>15-20 साल तक की फ्लेक्सिबल रीपेमेंट अवधि</li>
            <li>सेल्फ-एम्प्लॉयड और सैलरीड दोनों के लिए उपलब्ध</li>
          </ul>
          <p className="text-muted-foreground">
            आज ही Jupiter Finance से संपर्क करें और अपनी प्रॉपर्टी की वैल्यू को अनलॉक करें। कॉल करें: 9757190200
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
    </div>
  );
};

export default LoanAgainstProperty;
