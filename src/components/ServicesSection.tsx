import { Home, Building2, TrendingUp, HeartPulse, Shield, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Home Loans",
    description: "Competitive rates and flexible repayment options to make your dream home a reality.",
  },
  {
    icon: Building2,
    title: "Loan Against Property",
    description: "Unlock the value of your property with quick approvals and attractive interest rates.",
  },
  {
    icon: TrendingUp,
    title: "Loan Against Mutual Funds",
    description: "Get instant liquidity without selling your investments. Stay invested, stay funded.",
  },
  {
    icon: HeartPulse,
    title: "Health Insurance",
    description: "Comprehensive coverage for you and your family. Cashless treatment at 10,000+ hospitals.",
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Secure your family's future with plans that offer protection and wealth creation.",
  },
  {
    icon: BarChart3,
    title: "Mutual Fund SIPs",
    description: "Start small, grow big. Systematic investment plans designed for long-term wealth building.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Our Financial Services
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-gold/30 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-lg gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
