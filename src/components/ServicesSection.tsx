import { Home, Building2, TrendingUp, HeartPulse, Shield, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Home Loans",
    description: "Competitive rates and flexible repayment options to make your dream home a reality.",
    href: "/home_loan",
  },
  {
    icon: Building2,
    title: "Loan Against Property",
    description: "Unlock the value of your property with quick approvals and attractive interest rates.",
    href: "/loan-against-property",
  },
  {
    icon: TrendingUp,
    title: "Loan Against Mutual Funds",
    description: "Get instant liquidity without selling your investments. Stay invested, stay funded.",
    href: "/loan-against-mutual-funds",
  },
  {
    icon: HeartPulse,
    title: "Health Insurance",
    description: "Comprehensive coverage for you and your family. Cashless treatment at 10,000+ hospitals.",
    href: "/health-insurance",
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Secure your family's future with plans that offer protection and wealth creation.",
    href: "/life-insurance",
  },
  {
    icon: BarChart3,
    title: "Mutual Fund SIPs",
    description: "Start small, grow big. Systematic investment plans designed for long-term wealth building.",
    href: "/mutual-fund-sip",
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
    <section id="services" className="py-14 md:py-24 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            What We Offer
          </p>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-foreground">
            Our Financial Services in Mulund &amp; Mumbai
          </h2>
          <p className="mt-3 text-muted-foreground max-w-3xl mx-auto text-sm md:text-lg">
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
              className="group relative bg-card/60 backdrop-blur-sm rounded-2xl p-5 md:p-8 transition-all duration-300 border border-border/60 hover:border-gold/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col flex-1">
                <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-gold/20">
                  <service.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>
                <Link
                  to={service.href}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold/80 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

