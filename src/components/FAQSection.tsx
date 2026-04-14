const faqs = [
  {
    question: "How can Jupiter Fast Finance help with home loan approval?",
    answer:
      "We compare offers from multiple banks and NBFCs, help with documentation, and guide you through eligibility and disbursal so your home loan process is faster and clearer.",
  },
  {
    question: "Do you help customers in Mulund and Mumbai suburbs?",
    answer:
      "Yes, we support customers in Mulund, Mumbai, Thane, Bhandup, Ghatkopar, Powai, and nearby suburbs with home loans, loan against property, and related financial services.",
  },
  {
    question: "What other financial products do you provide?",
    answer:
      "We also help with health insurance, life insurance, and mutual fund SIP planning so customers can manage protection, savings, and borrowing in one place.",
  },
  {
    question: "Why choose Jupiter Fast Finance for financial services?",
    answer:
      "Clients choose us for transparent guidance, multiple lender and insurer options, practical advisory support, and end-to-end assistance across loans, insurance, and mutual funds in the Mumbai region.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Frequently Asked Questions</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Home Loan And Loan FAQs for Mulund & Mumbai
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item) => (
            <article key={item.question} className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
