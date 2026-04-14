import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import VideoGallery from "@/components/VideoGallery";
import EMICalculator from "@/components/EMICalculator";
import PostSection from "@/components/PostSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";
import SeoMeta from "@/components/SeoMeta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Jupiter Fast Finance | Loans in Mulund, Mumbai & Nearby Areas"
        description="Jupiter Fast Finance helps customers in Mulund, Mumbai, Thane, and nearby suburbs with home loans, loan against property, loan against mutual funds, mutual fund SIP planning, and health insurance support."
        keywords="home loan mulund, home loan mumbai, loan against property mulund, loan consultant mumbai, loans in mulund, loans in mumbai, jupiter fast finance, financial services mulund"
        canonicalUrl="https://jupiterfastfinance.com/"
      />
      <StructuredData />
      <Header />
      <HeroSection />
      <VideoGallery />
      <EMICalculator />
      <PostSection />
      <ServicesSection />
      <WhyChooseUs />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
