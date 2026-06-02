import { Home, Building2, TrendingUp, HeartPulse, Shield, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Our Financial Services in Mulund & Mumbai
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
            Practical lending, insurance, and investment support for customers across Mulund,
            Mumbai, and nearby suburbs.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              variants={cardVariants}
              key={service.title}
              className="group relative bg-card/60 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 border border-border/60 hover:border-gold/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-gold/20">
                  <service.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
