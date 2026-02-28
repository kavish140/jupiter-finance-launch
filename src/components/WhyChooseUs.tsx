import { CheckCircle2, Clock, Users, Award } from "lucide-react";

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

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 gradient-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Why Jupiter Fast Finance
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground">
            Your Trust, Our Commitment
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="text-center">
              <div className="w-16 h-16 rounded-full gradient-gold mx-auto flex items-center justify-center mb-5">
                <r.icon className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-display font-bold text-primary-foreground mb-2">
                {r.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
