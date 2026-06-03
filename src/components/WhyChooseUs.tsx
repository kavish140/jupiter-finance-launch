import { CheckCircle2, Clock, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Clock,
    title: "Quick Processing",
    description: "Fast-track approvals with minimal documentation.",
  },
  {
    icon: Users,
    title: "Expert Advisors",
    description: "Certified professionals guiding every financial decision.",
  },
  {
    icon: Award,
    title: "Best Rates",
    description: "We negotiate the best rates from top banks & NBFCs.",
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Support",
    description: "From application to disbursement, we handle it all.",
  },
];

const proofPoints = [
  { value: "25+", label: "Years of Experience" },
  { value: "1000+", label: "Happy Customers" },
  { value: "₹1000Cr+", label: "Loans Facilitated" },
  { value: "11+", label: "Partner Banks & NBFCs" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-navy-dark">
      {/* Background gradient map overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-black opacity-90" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      
      {/* Glowing accents */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Why Jupiter Fast Finance
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            Your Trust, Our Commitment
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((r) => (
            <motion.div variants={itemVariants} key={r.title} className="text-center group">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mx-auto flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden shadow-lg shadow-black/20">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <r.icon className="w-10 h-10 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                {r.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                {r.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid gap-6 grid-cols-2 md:grid-cols-4"
        >
          {proofPoints.map((point) => (
            <div key={point.label} className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center overflow-hidden hover:bg-white/10 transition-colors duration-300 group">
              <div className="absolute top-0 left-0 w-full h-1 gradient-gold opacity-50 group-hover:opacity-100 transition-opacity" />
              <p className="text-5xl font-display font-bold text-gradient-gold mb-2">{point.value}</p>
              <p className="text-sm font-medium tracking-wide text-white/80 uppercase">{point.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-sm text-white/40 max-w-2xl mx-auto"
        >
          25+ years of trusted financial guidance across Mulund, Mumbai, Thane, Bhandup, Ghatkopar, Powai, and nearby suburbs.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
