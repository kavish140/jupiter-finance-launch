import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().max(500).optional(),
});

const services = [
  "Home Loan",
  "Loan Against Property",
  "Loan Against Mutual Funds",
  "Health Insurance",
  "Life Insurance",
  "Mutual Fund SIP",
];

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const ContactSection = () => {
  const [form, setForm] = useState<ContactForm>({ name: "", phone: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Contact form is not configured yet. Please call or WhatsApp us directly.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          phone: form.phone,
          email: form.email || "Not provided",
          service: form.service,
          message: form.message || "No message added.",
          page_url: window.location.href,
          submitted_at: new Date().toISOString(),
        },
        publicKey,
      );

      toast.success("Thanks. Your enquiry has been sent successfully.");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (error) {
      console.error("EmailJS submit failed", error);
      toast.error("We could not send your enquiry. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (key: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Start Your Financial Journey
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Call / WhatsApp</p>
                <a href="tel:+919757190200" className="text-lg font-bold text-primary hover:text-gold transition-colors">
                  9757190200
                </a>
                <p className="text-sm text-muted-foreground mt-1">
                  10:00 AM – 7:00 PM IST
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email Us</p>
                <p className="text-muted-foreground">info@jupiterfastfinance.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Visit Us</p>
                <p className="text-muted-foreground">Serving Mulund, Mumbai, Thane, and nearby suburbs</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card rounded-xl p-8 shadow-card border border-border space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone *</label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Your phone number"
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                  placeholder="Your email (optional)"
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Service *</label>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <p className="text-destructive text-xs mt-1">{errors.service}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us about your requirement..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 gradient-gold text-accent-foreground font-bold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity w-full justify-center text-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
