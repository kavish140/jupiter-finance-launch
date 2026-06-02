import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy-dark relative overflow-hidden pt-16 pb-8 border-t border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/favicon.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" />
              <h3 className="text-xl font-display font-bold text-white">
                Jupiter<span className="text-gradient-gold"> Fast Finance</span>
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Your trusted partner for loans, insurance, and investments in Mulund, Mumbai, and nearby suburbs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Areas We Serve</h4>
            <div className="space-y-2 text-sm">
              <Link to="/mulund-mumbai-loans" className="block text-white/60 hover:text-gold transition-colors">Mulund & Mumbai</Link>
              <Link to="/loans-in-thane" className="block text-white/60 hover:text-gold transition-colors">Thane</Link>
              <Link to="/loans-in-bhandup" className="block text-white/60 hover:text-gold transition-colors">Bhandup</Link>
              <Link to="/loans-in-ghatkopar" className="block text-white/60 hover:text-gold transition-colors">Ghatkopar</Link>
              <Link to="/loans-in-powai" className="block text-white/60 hover:text-gold transition-colors">Powai</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#services" className="block text-white/60 hover:text-gold transition-colors">Home Loans</a>
              <a href="#services" className="block text-white/60 hover:text-gold transition-colors">Loan Against Property</a>
              <a href="#services" className="block text-white/60 hover:text-gold transition-colors">Health Insurance</a>
              <a href="#services" className="block text-white/60 hover:text-gold transition-colors">Mutual Fund SIPs</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <a href="tel:+919757190200" className="flex items-center gap-2 text-gold font-bold text-lg mb-1">
              <Phone className="w-4 h-4" />
              9757190200
            </a>
            <p className="text-white/60 text-sm">
              Call / Message: 10:00 AM – 7:00 PM IST
            </p>
            <p className="text-white/60 text-sm mt-2">info@jupiterfastfinance.com</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <a
            href="https://sitenova.dev"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm text-white/75 transition-colors hover:border-gold/40 hover:text-gold"
            aria-label="Visit SitNova, the website partner behind this site"
          >
            <span className="uppercase tracking-[0.24em] text-[10px] sm:text-xs text-white/45">
              Website by
            </span>
            <span className="font-semibold tracking-wide">Sitenova</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span className="text-white/60">sitenova.dev</span>
          </a>
          <p className="max-w-2xl text-xs sm:text-sm text-white/40">
            Built with a light promotional credit for the studio behind the site.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} Jupiter Fast Finance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
