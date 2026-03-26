import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import VideoGallery from "@/components/VideoGallery";
import EMICalculator from "@/components/EMICalculator";
import PostSection from "@/components/PostSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData />
      <Header />
      <HeroSection />
      <VideoGallery />
      <EMICalculator />
      <PostSection />
      <ServicesSection />
      <WhyChooseUs />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
