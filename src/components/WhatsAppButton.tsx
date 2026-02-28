import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/919757190200?text=${encodeURIComponent("Hi, I'd like to know more about your financial services.")}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-success flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-primary-foreground" />
    </a>
  );
};

export default WhatsAppButton;
