import { motion } from "framer-motion";

const partners = [
  "SBI",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Bank of Baroda",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "LIC Housing Finance",
  "Bajaj Finserv",
  "Tata Capital",
  "IDFC First Bank",
];

const marqueeStyle: React.CSSProperties = {
  animation: "marquee 30s linear infinite",
};

const PartnerBanks = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="py-8 relative overflow-hidden bg-white/[0.02] border-y border-white/5"
    >
      {/* Inline keyframes — injected once */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Label */}
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
        Trusted Partners
      </p>

      {/* Marquee container */}
      <div className="overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-navy-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-navy-dark to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex gap-4 w-max" style={marqueeStyle}>
          {/* First copy */}
          {partners.map((name) => (
            <span
              key={`a-${name}`}
              className="inline-flex items-center whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/50 hover:text-white/70 hover:border-white/20 transition-colors duration-300"
            >
              {name}
            </span>
          ))}

          {/* Duplicate for seamless loop */}
          {partners.map((name) => (
            <span
              key={`b-${name}`}
              className="inline-flex items-center whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/50 hover:text-white/70 hover:border-white/20 transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PartnerBanks;
