import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SeoMeta 
        title="Disclaimer | Jupiter Finance" 
        description="Disclaimer for Jupiter Finance."
        canonicalUrl="https://jupiterfastfinance.com/disclaimer"
      />
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Disclaimer</h1>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed bg-card p-8 md:p-10 rounded-3xl border border-border/50 shadow-sm">
            <p className="text-foreground font-medium">Effective Date: July 17, 2026</p>
            <p>Jupiter Finance is an independent loan consultancy and facilitation service.</p>
            
            <ul className="space-y-3 list-disc pl-5 mt-4 mb-8">
              <li>We are not a bank or NBFC.</li>
              <li>Loan approval, sanction amount, tenure, interest rates, fees and disbursement are solely determined by the respective lender.</li>
              <li>Information on this website is for general information only and should not be treated as financial, legal or tax advice.</li>
              <li>We make reasonable efforts to keep website information accurate but provide no warranties regarding completeness or suitability.</li>
              <li>Nothing on this website constitutes an offer to lend money.</li>
              <li>Users should carefully review the lender's terms before accepting any loan product.</li>
              <li>By using this website, you acknowledge and accept this disclaimer.</li>
            </ul>
            
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

export default Disclaimer;
