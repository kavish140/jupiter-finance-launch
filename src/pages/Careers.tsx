import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import { Briefcase, IndianRupee, Heart, Landmark, Send, ChevronRight, User, Calendar, Phone, Mail, GraduationCap, MapPin, History, Sparkles, TrendingUp } from "lucide-react";
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
        {/* ── Ultra-Premium Hero Section ──────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0A1128] py-24 md:py-36">
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          {/* Dynamic Glowing Orbs */}
          <motion.div 
            animate={{ y: [0, -40, 0], opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -left-20 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div 
            animate={{ y: [0, 40, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Hero Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-gold mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Sparkles className="w-4 h-4" /> Limitless Potential
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
                  Build Your <br />
                  <span className="text-gradient-gold relative">
                    Financial Empire
                    <motion.div 
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent rounded-full"
                      initial={{ scaleX: 0, transformOrigin: "left" }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                  Break free from the traditional 9-to-5. Join our purely incentive-based ecosystem where your ambition is your only limit.
                </p>
              </motion.div>

              {/* Hero Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2, type: "spring" }}
                className="hidden lg:block relative"
              >
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-50" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                        <TrendingUp className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm font-medium">Monthly Potential</p>
                        <h3 className="text-3xl font-bold text-white tracking-tight">₹1,00,000+</h3>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: "Mutual Funds", val: "₹5,000 / 10 clients" },
                        { label: "Life Insurance", val: "10% of premium" },
                        { label: "Home Loans", val: "0.20% of disbursed" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <span className="text-white/80">{item.label}</span>
                          <span className="text-gold font-semibold">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Main Content Area ──────────────────────── */}
        <section className="py-20 md:py-32 bg-background relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
              
              {/* Left Column: Perks & Rewards */}
              <div className="lg:col-span-5 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="sticky top-24"
                >
                  <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                    Why Join <span className="text-primary">Jupiter?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                    We've engineered a compensation structure designed to maximize your payouts. No fixed salaries. No ceilings. Just pure reward for your hustle.
                  </p>

                  <div className="space-y-6">
                    {/* Perk 1 */}
                    <div className="group relative bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-gold/30 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 flex gap-5">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                            <IndianRupee className="w-6 h-6" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-xl mb-2">Mutual Funds</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Earn a flat <span className="text-foreground font-semibold bg-green-500/10 px-2 py-0.5 rounded-md">₹5,000 incentive</span> for every 10 new Mutual Fund customers onboarded.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Perk 2 */}
                    <div className="group relative bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-gold/30 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 flex gap-5">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                            <Heart className="w-6 h-6" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-xl mb-2">Life & Health Insurance</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Take home <span className="text-foreground font-semibold bg-red-500/10 px-2 py-0.5 rounded-md">10% of the premium</span> for every new Life and Health Insurance policy sold.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Perk 3 */}
                    <div className="group relative bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-gold/30 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 flex gap-5">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                            <Landmark className="w-6 h-6" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-xl mb-2">Home & Mortgage Loans</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Earn <span className="text-foreground font-semibold bg-blue-500/10 px-2 py-0.5 rounded-md">0.20% of the loan</span> amount disbursed for every successful Home or Mortgage loan.
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
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative group"
                >
                  {/* Glowing border effect behind the card */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold via-primary to-gold rounded-[2.5rem] blur-md opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  
                  <div className="bg-card/80 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/20 relative overflow-hidden z-10">
                    
                    <div className="mb-10 text-center">
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
                        Apply Now
                      </h3>
                      <p className="text-muted-foreground">
                        Ready to accelerate your career? Fill out the form below.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      <div className="space-y-1.5 relative group/input">
                        <label htmlFor="name" className="text-sm font-semibold text-foreground/90 pl-1">Full Name *</label>
                        <div className="relative">
                          <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.name ? 'text-destructive' : 'text-muted-foreground group-focus-within/input:text-gold'}`} />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-background/50 border ${errors.name ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-inner`}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="text-destructive text-xs mt-1 pl-1">{errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5 relative group/input">
                          <label htmlFor="dob" className="text-sm font-semibold text-foreground/90 pl-1">Date of Birth <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></label>
                          <div className="relative">
                            <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.dob ? 'text-destructive' : 'text-muted-foreground group-focus-within/input:text-gold'}`} />
                            <input
                              type="date"
                              id="dob"
                              name="dob"
                              value={form.dob}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-background/50 border ${errors.dob ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-inner appearance-none`}
                            />
                          </div>
                          {errors.dob && <p className="text-destructive text-xs mt-1 pl-1">{errors.dob}</p>}
                        </div>

                        <div className="space-y-1.5 relative group/input">
                          <label htmlFor="mobile" className="text-sm font-semibold text-foreground/90 pl-1">Mobile Number *</label>
                          <div className="relative">
                            <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.mobile ? 'text-destructive' : 'text-muted-foreground group-focus-within/input:text-gold'}`} />
                            <input
                              type="tel"
                              id="mobile"
                              name="mobile"
                              value={form.mobile}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-background/50 border ${errors.mobile ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-inner`}
                              placeholder="10-digit number"
                            />
                          </div>
                          {errors.mobile && <p className="text-destructive text-xs mt-1 pl-1">{errors.mobile}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5 relative group/input">
                        <label htmlFor="email" className="text-sm font-semibold text-foreground/90 pl-1">Email Address <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></label>
                        <div className="relative">
                          <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-destructive' : 'text-muted-foreground group-focus-within/input:text-gold'}`} />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-background/50 border ${errors.email ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-inner`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && <p className="text-destructive text-xs mt-1 pl-1">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5 relative group/input">
                          <label htmlFor="qualification" className="text-sm font-semibold text-foreground/90 pl-1">Highest Qualification *</label>
                          <div className="relative">
                            <GraduationCap className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.qualification ? 'text-destructive' : 'text-muted-foreground group-focus-within/input:text-gold'}`} />
                            <input
                              type="text"
                              id="qualification"
                              name="qualification"
                              value={form.qualification}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-background/50 border ${errors.qualification ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-inner`}
                              placeholder="E.g. B.Com, MBA"
                            />
                          </div>
                          {errors.qualification && <p className="text-destructive text-xs mt-1 pl-1">{errors.qualification}</p>}
                        </div>

                        <div className="space-y-1.5 relative group/input">
                          <label htmlFor="college" className="text-sm font-semibold text-foreground/90 pl-1">College Name <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></label>
                          <div className="relative">
                            <Landmark className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.college ? 'text-destructive' : 'text-muted-foreground group-focus-within/input:text-gold'}`} />
                            <input
                              type="text"
                              id="college"
                              name="college"
                              value={form.college}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-background/50 border ${errors.college ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-inner`}
                              placeholder="University Name"
                            />
                          </div>
                          {errors.college && <p className="text-destructive text-xs mt-1 pl-1">{errors.college}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5 relative group/input">
                        <label htmlFor="address" className="text-sm font-semibold text-foreground/90 pl-1">Residence Address *</label>
                        <div className="relative">
                          <MapPin className={`absolute left-4 top-5 w-5 h-5 transition-colors ${errors.address ? 'text-destructive' : 'text-muted-foreground group-focus-within/input:text-gold'}`} />
                          <textarea
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            rows={2}
                            className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-background/50 border ${errors.address ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none shadow-inner`}
                            placeholder="Full residential address"
                          />
                        </div>
                        {errors.address && <p className="text-destructive text-xs mt-1 pl-1">{errors.address}</p>}
                      </div>

                      <div className="space-y-1.5 relative group/input">
                        <label htmlFor="experience" className="text-sm font-semibold text-foreground/90 pl-1">Past Experience <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></label>
                        <div className="relative">
                          <History className={`absolute left-4 top-5 w-5 h-5 transition-colors ${errors.experience ? 'text-destructive' : 'text-muted-foreground group-focus-within/input:text-gold'}`} />
                          <textarea
                            id="experience"
                            name="experience"
                            value={form.experience}
                            onChange={handleChange}
                            rows={3}
                            className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-background/50 border ${errors.experience ? 'border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none shadow-inner`}
                            placeholder="Briefly describe your relevant past experience..."
                          />
                        </div>
                        {errors.experience && <p className="text-destructive text-xs mt-1 pl-1">{errors.experience}</p>}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative overflow-hidden group/btn flex items-center justify-center gap-2 px-8 py-5 gradient-gold text-accent-foreground font-bold rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed mt-8 transition-all text-lg shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] border border-white/20"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                        
                        {isSubmitting ? (
                          <div className="flex items-center gap-2 relative z-10">
                            <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                            Submitting...
                          </div>
                        ) : (
                          <span className="flex items-center gap-2 relative z-10">
                            Submit Application
                            <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </motion.button>
                      <p className="text-center text-xs text-muted-foreground mt-6 font-medium">
                        🔒 SSL Secured & Encrypted • Your data is strictly confidential
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
