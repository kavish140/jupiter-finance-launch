import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

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
              Your trusted partner for loans, insurance, and investments in Mulund, Mumbai, and nearby suburbs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/mulund-mumbai-loans" className="block text-primary-foreground/60 hover:text-gold transition-colors">Loans in Mulund & Mumbai</Link>
              <a href="#services" className="block text-primary-foreground/60 hover:text-gold transition-colors">Home Loans</a>
              <a href="#services" className="block text-primary-foreground/60 hover:text-gold transition-colors">Loan Against Property</a>
              <a href="#services" className="block text-primary-foreground/60 hover:text-gold transition-colors">Health Insurance</a>
              <a href="#services" className="block text-primary-foreground/60 hover:text-gold transition-colors">Mutual Fund SIPs</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-3">Contact</h4>
            <a href="tel:+919757190200" className="flex items-center gap-2 text-gold font-bold text-lg mb-1">
              <Phone className="w-4 h-4" />
              9757190200
            </a>
            <p className="text-primary-foreground/60 text-sm">
              Call / Message: 10:00 AM – 7:00 PM IST
            </p>
            <p className="text-primary-foreground/60 text-sm mt-2">info@jupiterfastfinance.com</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <a
            href="https://sitenova.dev"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2 text-xs sm:text-sm text-primary-foreground/75 transition-colors hover:border-gold/40 hover:text-gold"
            aria-label="Visit SitNova, the website partner behind this site"
          >
            <span className="uppercase tracking-[0.24em] text-[10px] sm:text-xs text-primary-foreground/45">
              Website by
            </span>
            <span className="font-semibold tracking-wide">SitNova</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span className="text-primary-foreground/60">sitenova.dev</span>
          </a>
          <p className="max-w-2xl text-xs sm:text-sm text-primary-foreground/40">
            Built with a light promotional credit for the studio behind the site.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} Jupiter Fast Finance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
