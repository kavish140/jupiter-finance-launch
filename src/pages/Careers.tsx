import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import { Briefcase, IndianRupee, Heart, Landmark, Send, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const careersSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  dob: z.string().optional().or(z.literal("")),
  qualification: z.string().trim().min(2, "Qualification is required"),
  address: z.string().trim().min(5, "Address must be at least 5 characters"),
  college: z.string().optional().or(z.literal("")),
  experience: z.string().optional().or(z.literal("")),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
});

type CareersForm = z.infer<typeof careersSchema>;

const Careers = () => {
  const [form, setForm] = useState<CareersForm>({
    name: "",
    dob: "",
    qualification: "",
    address: "",
    college: "",
    experience: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = careersSchema.safeParse(form);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const payload: Record<string, string | null> = { ...form };
      
      // Clean up empty optional fields so Postgres doesn't throw type errors (e.g., date casting)
      if (!payload.dob) payload.dob = null;
      if (!payload.college) payload.college = null;
      if (!payload.experience) payload.experience = null;
      if (!payload.email) payload.email = null;

      const { error } = await supabase
        .from("job_applications")
        .insert([payload]);

      if (error) throw error;

      toast.success("Application submitted successfully! We will contact you soon.");
      setForm({
        name: "",
        dob: "",
        qualification: "",
        address: "",
        college: "",
        experience: "",
        mobile: "",
        email: "",
      });
    } catch (err: unknown) {
      console.error("Error submitting application:", err);
      let errorMessage = "Failed to submit application. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = String((err as { message: unknown }).message);
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SeoMeta 
        title="Careers | Jupiter Finance" 
        description="Join our team at Jupiter Finance. Enjoy an incentive-based reward model with unlimited earning potential."
        keywords="careers, jobs, jupiter finance, financial advisor, mutual fund distributor, insurance agent"
        canonicalUrl="https://jupiterfastfinance.com/careers"
      />
      <Header />
      
      <main className="flex-grow pt-20">
        {/* ── Hero Section ──────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-background py-20 md:py-32">
          {/* Dynamic Background Elements */}
          <motion.div 
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div 
            animate={{ y: [0, 40, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"
          />

          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-gold mb-6 backdrop-blur-md">
                <Briefcase className="w-4 h-4" /> Now Hiring
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
                Launch Your Career with <br className="hidden md:block" />
                <span className="text-gradient-gold">Jupiter Finance</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                We are looking for driven individuals to join our growing team. Experience a unique, 100% incentive-based model that gives you <strong className="text-white">unlimited earning potential</strong>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Main Content Area ──────────────────────── */}
        <section className="py-16 md:py-24 bg-background relative z-20 -mt-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
              
              {/* Left Column: Perks & Rewards */}
              <div className="lg:col-span-5 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                    Why Join Us?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Break free from fixed salary ceilings. At Jupiter Finance, your hard work translates directly into massive earnings. 
                  </p>

                  <div className="space-y-4">
                    {/* Perk 1 */}
                    <div className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-card-hover hover:-translate-y-1 hover:border-gold/40 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-500/10 text-green-500 rounded-xl group-hover:scale-110 transition-transform">
                          <IndianRupee className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1 text-lg">Mutual Funds</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Earn a flat <strong className="text-foreground">₹5,000 incentive</strong> for every 10 new Mutual Fund customers you successfully onboard.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Perk 2 */}
                    <div className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-card-hover hover:-translate-y-1 hover:border-gold/40 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500/10 text-red-500 rounded-xl group-hover:scale-110 transition-transform">
                          <Heart className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1 text-lg">Life & Health Insurance</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Take home <strong className="text-foreground">10% of the premium amount</strong> for every new Life and Health Insurance policy sold.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Perk 3 */}
                    <div className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-card-hover hover:-translate-y-1 hover:border-gold/40 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                          <Landmark className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1 text-lg">Home & Mortgage Loans</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Earn <strong className="text-foreground">0.20% of the total loan amount</strong> disbursed for every successful Home or Mortgage loan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Application Form */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-card/40 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-border relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="mb-8">
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                        Submit Your Application
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Fill out the details below and our team will get in touch with you shortly.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-sm font-semibold text-foreground/90 pl-1">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className={`w-full px-5 py-3.5 rounded-xl bg-background/50 border ${errors.name ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                          placeholder="E.g. John Doe"
                        />
                        {errors.name && <p className="text-destructive text-xs mt-1 pl-1">{errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label htmlFor="dob" className="text-sm font-semibold text-foreground/90 pl-1">Date of Birth <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></label>
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            className={`w-full px-5 py-3.5 rounded-xl bg-background/50 border ${errors.dob ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                          />
                          {errors.dob && <p className="text-destructive text-xs mt-1 pl-1">{errors.dob}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="mobile" className="text-sm font-semibold text-foreground/90 pl-1">Mobile Number *</label>
                          <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            className={`w-full px-5 py-3.5 rounded-xl bg-background/50 border ${errors.mobile ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                            placeholder="10-digit number"
                          />
                          {errors.mobile && <p className="text-destructive text-xs mt-1 pl-1">{errors.mobile}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-sm font-semibold text-foreground/90 pl-1">Email Address <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={`w-full px-5 py-3.5 rounded-xl bg-background/50 border ${errors.email ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-destructive text-xs mt-1 pl-1">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label htmlFor="qualification" className="text-sm font-semibold text-foreground/90 pl-1">Highest Qualification *</label>
                          <input
                            type="text"
                            id="qualification"
                            name="qualification"
                            value={form.qualification}
                            onChange={handleChange}
                            className={`w-full px-5 py-3.5 rounded-xl bg-background/50 border ${errors.qualification ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                            placeholder="E.g. B.Com, MBA"
                          />
                          {errors.qualification && <p className="text-destructive text-xs mt-1 pl-1">{errors.qualification}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="college" className="text-sm font-semibold text-foreground/90 pl-1">College Name <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></label>
                          <input
                            type="text"
                            id="college"
                            name="college"
                            value={form.college}
                            onChange={handleChange}
                            className={`w-full px-5 py-3.5 rounded-xl bg-background/50 border ${errors.college ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                            placeholder="University Name"
                          />
                          {errors.college && <p className="text-destructive text-xs mt-1 pl-1">{errors.college}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="address" className="text-sm font-semibold text-foreground/90 pl-1">Residence Address *</label>
                        <textarea
                          id="address"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          rows={2}
                          className={`w-full px-5 py-3.5 rounded-xl bg-background/50 border ${errors.address ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none`}
                          placeholder="Full residential address"
                        />
                        {errors.address && <p className="text-destructive text-xs mt-1 pl-1">{errors.address}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="experience" className="text-sm font-semibold text-foreground/90 pl-1">Past Experience <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></label>
                        <textarea
                          id="experience"
                          name="experience"
                          value={form.experience}
                          onChange={handleChange}
                          rows={3}
                          className={`w-full px-5 py-3.5 rounded-xl bg-background/50 border ${errors.experience ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none`}
                          placeholder="Briefly describe your relevant past experience..."
                        />
                        {errors.experience && <p className="text-destructive text-xs mt-1 pl-1">{errors.experience}</p>}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 gradient-gold text-accent-foreground font-bold rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-70 disabled:cursor-not-allowed mt-4 transition-all text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                            Submitting...
                          </div>
                        ) : (
                          <>
                            Submit Application
                            <ChevronRight className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-xs text-muted-foreground mt-4">
                        🔒 Your information is secure and will only be used for hiring purposes.
                      </p>
                    </form>
                  </div>
                </motion.div>
              </div>
              
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
