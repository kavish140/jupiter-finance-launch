import { Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-navy py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="text-xl font-display font-bold text-primary-foreground mb-3">
              Jupiter<span className="text-gradient-gold"> Fast Finance</span>
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Your trusted partner for loans, insurance, and investments. Empowering your financial future.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              {["Home Loans", "Loan Against Property", "Health Insurance", "Mutual Fund SIPs"].map((s) => (
                <a key={s} href="#services" className="block text-primary-foreground/60 hover:text-gold transition-colors">{s}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-3">Contact</h4>
            <a href="tel:9757190200" className="flex items-center gap-2 text-gold font-bold text-lg mb-1">
              <Phone className="w-4 h-4" />
              9757190200
            </a>
            <p className="text-primary-foreground/60 text-sm">
              Call / Message: 10:00 AM – 7:00 PM IST
            </p>
            <p className="text-primary-foreground/60 text-sm mt-2">info@jupiterfastfinance.com</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} Jupiter Fast Finance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
