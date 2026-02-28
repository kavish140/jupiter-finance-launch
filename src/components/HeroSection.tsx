import { Phone, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <img
        src={heroBg}
        alt="Financial growth abstract"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 gradient-navy opacity-80" />

      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-gold mb-4 animate-fade-in-up">
          Trusted Financial Partner
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up [animation-delay:0.1s]">
          Your Financial Goals,{" "}
          <span className="text-gradient-gold">Our Expertise</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-10 animate-fade-in-up [animation-delay:0.2s]">
          From home loans to mutual funds — we provide end-to-end financial
          solutions tailored to your needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:0.3s]">
          <a
            href="tel:9757190200"
            className="flex items-center gap-3 gradient-gold text-accent-foreground font-bold px-8 py-4 rounded-lg text-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Call 9757190200
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-foreground/10 transition-colors"
          >
            Explore Services
          </a>
        </div>

        <p className="mt-6 text-sm text-primary-foreground/60 animate-fade-in-up [animation-delay:0.4s]">
          📞 Call / Message us between 10:00 AM – 7:00 PM IST
        </p>

        <a
          href="#services"
          className="inline-block mt-12 animate-float text-primary-foreground/50 hover:text-primary-foreground transition-colors"
        >
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
