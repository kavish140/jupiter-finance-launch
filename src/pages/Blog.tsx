import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SeoMeta from "@/components/SeoMeta";
import { supabase } from "@/lib/supabase";

interface PostItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
}

const formatDate = (isoDate?: string) => {
  if (!isoDate) return "Recent";
  return new Date(isoDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const categoryColors: Record<string, string> = {
  "Home Loans": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Loans": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Financial Tips": "bg-green-500/10 text-green-400 border-green-500/20",
  "Insurance": "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const Blog = () => {
  const [allPosts, setAllPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("publishedAt", { ascending: false });
        if (error) throw error;
        setAllPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Home Loan Tips & Financial Guides | Jupiter Finance Blog"
        description="Expert articles on home loans in Mulund and Mumbai — eligibility tips, bank comparisons, CIBIL score improvement, and more. Free guides from Jupiter Finance."
        keywords="home loan tips mumbai, home loan blog mulund, cibil score improvement, sbi vs hdfc home loan, loan against property guide, jupiter finance blog"
        canonicalUrl="https://jupiterfastfinance.com/blog"
        ogType="website"
      />

      {/* Header */}
      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-primary flex items-center gap-2">
            <img src="/favicon.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" width={32} height={32} />
            <span>Jupiter<span className="text-gradient-gold"> Finance</span></span>
          </Link>
          <a
            href="tel:+919757190200"
            className="gradient-gold text-accent-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Call: 9757190200
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-navy-dark to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-gold/5 pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
                Financial Insights
              </p>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                Home Loan Tips & Guides
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Expert advice on home loans, eligibility, bank comparisons, and financial planning — written for borrowers in Mulund, Mumbai, and surrounding suburbs.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16">
          {loading ? (
            <div className="py-20 text-center text-muted-foreground flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4" />
              <p>Loading articles...</p>
            </div>
          ) : allPosts.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <p>No articles found.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-4">Featured Article</p>
              <Link
                to={`/blog/${featured.slug}`}
                className="group block bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:border-gold/40 hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)] transition-all duration-300"
              >
                <div className="md:grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-3 p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${categoryColors[featured.category || ""] || "bg-gold/10 text-gold border-gold/20"}`}>
                        {featured.category || "General"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="w-3 h-3" />
                        {formatDate(featured.publishedAt)}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 group-hover:text-gold/90 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all">
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="md:col-span-2 bg-gradient-to-br from-navy-dark to-background flex items-center justify-center p-10 min-h-[200px]">
                    <div className="text-center space-y-2">
                      <span className="text-6xl">🏠</span>
                      <p className="text-xs text-muted-foreground">Jupiter Finance</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block h-full bg-card border border-border rounded-2xl p-5 md:p-6 shadow-card hover:border-gold/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 gradient-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${categoryColors[post.category || ""] || "bg-gold/10 text-gold border-gold/20"}`}>
                      {post.category || "General"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base md:text-lg mb-2 leading-snug group-hover:text-gold/90 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:gap-2.5 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-card border border-gold/20 rounded-2xl p-8 md:p-10 shadow-card"
          >
            <p className="text-xl font-display font-bold text-foreground mb-2">
              Ready to apply for your home loan?
            </p>
            <p className="text-muted-foreground mb-6">
              Get a free eligibility check and lender comparison from our advisors — serving Mulund, Mumbai, Thane, and nearby suburbs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:+919757190200"
                className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                📞 Call: 9757190200
              </a>
              <Link
                to="/home-loan"
                className="border border-border bg-background text-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:bg-muted transition-colors"
              >
                Home Loan Services →
              </Link>
            </div>
          </motion.div>
          </>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
    </div>
  );
};

export default Blog;
