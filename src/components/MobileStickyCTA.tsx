import { Phone } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const MobileStickyCTA = () => {
  const whatsappUrl = `https://wa.me/919757190200?text=${encodeURIComponent("Hi, I'd like to know more about your financial services.")}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <a
        href="tel:+919757190200"
        className="flex-1 flex items-center justify-center gap-2 py-4 gradient-gold text-accent-foreground font-bold text-sm"
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
