import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import { Briefcase, IndianRupee, Heart, Landmark, Send } from "lucide-react";

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
      const payload: Record<string, string | null> = { ...form, status: "pending" };
      
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
        errorMessage = String((err as any).message);
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
    <div className="min-h-screen bg-background flex flex-col">
      <SeoMeta 
        title="Careers | Jupiter Finance" 
        description="Join our team at Jupiter Finance. Enjoy an incentive-based reward model with unlimited earning potential."
        keywords="careers, jobs, jupiter finance, financial advisor, mutual fund distributor, insurance agent"
        canonicalUrl="https://jupiterfastfinance.com/careers"
      />
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join <span className="text-primary">Jupiter Finance</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are looking for driven individuals to join our team. We offer a unique, purely incentive-based reward structure giving you <span className="font-semibold text-primary">unlimited potential to earn</span>.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Job Details Section */}
            <div className="space-y-8">
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-6 text-primary">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Reward Structure</h2>
                <p className="text-muted-foreground mb-6">
                  There is no fixed salary. Your earnings are directly tied to your performance, providing a limitless earning ceiling.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <IndianRupee className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Mutual Funds</h4>
                      <p className="text-muted-foreground text-sm">Rs. 5000 incentive for every 10 Mutual Fund customers onboarded.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Heart className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Life & Health Insurance</h4>
                      <p className="text-muted-foreground text-sm">10% of premium amount for every new Life and Health Insurance customer.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Landmark className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Home & Mortgage Loans</h4>
                      <p className="text-muted-foreground text-sm">0.20% of the loan amount for every Home and Mortgage loan disbursed.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Apply Now</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-input focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-foreground mb-1">Date of Birth <span className="text-muted-foreground font-normal text-xs">(Optional)</span></label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.dob ? 'border-red-500 focus:ring-red-500' : 'border-input focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                    />
                    {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.mobile ? 'border-red-500 focus:ring-red-500' : 'border-input focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                      placeholder="9876543210"
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address <span className="text-muted-foreground font-normal text-xs">(Optional)</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-input focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-foreground mb-1">Highest Qualification *</label>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={form.qualification}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.qualification ? 'border-red-500 focus:ring-red-500' : 'border-input focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                    placeholder="e.g. B.Com, MBA"
                  />
                  {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
                </div>

                <div>
                  <label htmlFor="college" className="block text-sm font-medium text-foreground mb-1">Name of College Attended <span className="text-muted-foreground font-normal text-xs">(Optional)</span></label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.college ? 'border-red-500 focus:ring-red-500' : 'border-input focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                    placeholder="University Name"
                  />
                  {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">Residence Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={2}
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-input focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors resize-none`}
                    placeholder="Full residential address"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-1">Past Experience <span className="text-muted-foreground font-normal text-xs">(Optional)</span></label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.experience ? 'border-red-500 focus:ring-red-500' : 'border-input focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors resize-none`}
                    placeholder="Briefly describe your relevant past experience..."
                  />
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
