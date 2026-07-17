import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SeoMeta 
        title="Privacy Policy | Jupiter Finance" 
        description="Privacy Policy for Jupiter Finance."
        canonicalUrl="https://jupiterfastfinance.com/privacy-policy"
      />
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed bg-card p-8 md:p-10 rounded-3xl border border-border/50 shadow-sm">
            <p className="text-foreground font-medium">Effective Date: July 17, 2026</p>
            <p>At Jupiter Finance ("we", "our", "us"), accessible at https://jupiterfastfinance.com, we are committed to protecting your privacy.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <p>We may collect your name, mobile number, email address, city, loan requirements, business details, property details, documents voluntarily shared by you, IP address, browser and device information.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to respond to enquiries, assess requirements, connect you with suitable lenders, communicate updates, improve our services and comply with legal obligations.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Loan Facilitation</h2>
            <p>Jupiter Finance acts solely as a loan consultancy and facilitator. We are not a bank, NBFC or lending institution. Loan approvals, interest rates, processing fees, documentation, tenure and disbursement are determined exclusively by the respective lender.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Information Sharing</h2>
            <p>Your information may be shared with banks, NBFCs, lending partners, verification agencies and authorities where required by law. We do not sell your personal information.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Cookies</h2>
            <p>We may use cookies and analytics technologies to improve website performance and user experience.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Data Security</h2>
            <p>Reasonable technical and organizational safeguards are used to protect your information. However, no online transmission or storage method is completely secure.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Meta & WhatsApp Consent</h2>
            <p>By submitting any enquiry through our website, Meta Lead Forms, WhatsApp or other channels, you consent to being contacted by phone, SMS, WhatsApp or email regarding your enquiry.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Your Rights</h2>
            <p>You may request access, correction or deletion of your personal information where permitted by applicable law.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Policy Updates</h2>
            <p>This policy may be updated periodically.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact</h2>
            <ul className="space-y-2">
              <li><strong>Website:</strong> <a href="https://jupiterfastfinance.com" className="text-primary hover:underline">https://jupiterfastfinance.com</a></li>
              <li><strong>Email:</strong> <a href="mailto:info@jupiterfastfinance.com" className="text-primary hover:underline">info@jupiterfastfinance.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+919757190200" className="text-primary hover:underline">+91-9757190200</a></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
