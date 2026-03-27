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
        title="Jupiter Fast Finance | Home Loan, Mutual Funds, Health Insurance Experts"
        description="Jupiter Fast Finance helps with home loan, mutual funds SIP planning, and health insurance advisory with practical end-to-end support."
        keywords="home loan, mutual funds, health insurance, jupiter fast finance, financial services india"
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
