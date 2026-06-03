import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Vimal Gosar",
    rating: 5,
    text: "When you talk about Health Insurance, you need to have someone who can GUIDE you perfectly as per your needs with the minute details in every scheme. Jupiter Insurance Consultants are those \"Someone\" who will not only guide you but also help you in every bit of Insurance process. Cheers!",
    date: "July 2023",
  },
  {
    name: "Asif Khan",
    rating: 5,
    text: "Mr. Jignesh Ganatra, Owner of Jupiter, is like a MENTOR for every consumer. He always gives full detail about the policy, suggests good policies with reasonable prices, and ensures we get full benefits. Jupiter is now a single point of contact for my family.",
    date: "July 2023",
  },
  {
    name: "Vinod Unni",
    rating: 5,
    text: "I recently availed insurance claim for a medical treatment and thanks to Jupiter Insurance, the entire process was smooth and hassle free. Highly recommended!",
    date: "June 2023",
  },
  {
    name: "Milind Thakker",
    rating: 5,
    text: "Excellent service and professional guidance. Very satisfied with the support received from the Jupiter team.",
    date: "June 2023",
  },
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-14 md:py-24 relative overflow-hidden bg-navy-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-black opacity-90" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

      {/* Glowing accent */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            What Our Customers Say
          </p>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-white">
            Trusted by 1000+ Families
          </h2>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              variants={itemVariants}
              key={t.name}
              className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6 flex flex-col hover:bg-white/10 transition-all duration-300 group overflow-hidden ${i >= 2 ? "hidden md:flex" : ""}`}
            >
              {/* Top gold accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 gradient-gold opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/60 text-sm leading-relaxed flex-1 mb-5">
                "{t.text}"
              </p>

              {/* Footer: name + Google badge */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-white/40">{t.date}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wide uppercase text-white/40 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="none"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Aggregate Google Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-gold text-base">
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold text-white">4.9</span>
            <span className="text-xs text-white/50">rating on</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium text-white/70">Google</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
