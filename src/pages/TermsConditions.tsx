import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SeoMeta 
        title="Terms & Conditions | Jupiter Finance" 
        description="Terms and Conditions for Jupiter Finance."
        canonicalUrl="https://jupiterfastfinance.com/terms-and-conditions"
      />
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Terms & Conditions</h1>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed bg-card p-8 md:p-10 rounded-3xl border border-border/50 shadow-sm">
            <p className="text-foreground font-medium">Effective Date: July 17, 2026</p>
            <p>By using this website, you agree to these Terms & Conditions.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Services</h2>
            <p>Jupiter Finance provides loan consultancy and facilitation services for products offered by banks and financial institutions.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. No Guarantee</h2>
            <p>Submitting an enquiry does not guarantee loan approval or loan amount. Lending decisions rest solely with the respective bank or financial institution.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. User Responsibilities</h2>
            <p>You agree to provide accurate and complete information. False or misleading information may result in rejection of your enquiry.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Third-Party Lenders</h2>
            <p>Interest rates, fees, eligibility, documentation and other conditions are governed by the lender's policies.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Intellectual Property</h2>
            <p>All website content, branding, graphics and text belong to Jupiter Finance unless otherwise stated.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Limitation of Liability</h2>
            <p>We are not responsible for lending decisions, delays, rejection of applications or losses arising from reliance on third-party lender decisions.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Acceptable Use</h2>
            <p>You agree not to misuse the website, upload malicious content or attempt unauthorised access.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Changes</h2>
            <p>These Terms may be updated without prior notice.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Governing Law</h2>
            <p>These Terms are governed by the laws of India.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact</h2>
            <ul className="space-y-2">
              <li><strong>Website:</strong> <a href="https://jupiterfastfinance.com" className="text-primary hover:underline">https://jupiterfastfinance.com</a></li>
              <li><strong>Email:</strong> <a href="mailto:info@jupiterfastfinance.com" className="text-primary hover:underline">info@jupiterfastfinance.com</a></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
