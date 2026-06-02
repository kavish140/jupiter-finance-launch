import { Phone } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const MobileStickyCTA = () => {
  const whatsappUrl = `https://wa.me/919757190200?text=${encodeURIComponent("Hi, I'd like to know more about your financial services.")}`;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex shadow-[0_8px_30px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border border-white/10 backdrop-blur-md">
      <a
        href="tel:+919757190200"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 gradient-gold text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity"
      >
        <Phone className="w-5 h-5" />
        Call Now
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-success text-primary-foreground font-bold text-sm"
      >
        <SiWhatsapp className="w-5 h-5" />
        WhatsApp
      </a>
    </div>
  );
};

export default MobileStickyCTA;
