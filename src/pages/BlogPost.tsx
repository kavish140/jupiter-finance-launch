import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, ArrowLeft, Phone, MessageCircle } from "lucide-react";
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
  body?: string;
  category?: string;
  publishedAt?: string;
}

const formatDate = (isoDate?: string) => {
  if (!isoDate) return "Recent";
  return new Date(isoDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Simple markdown-to-HTML renderer (no external deps)
const renderBody = (body: string): string => {
  return body
    // H2
    .replace(/^## (.+)$/gm, '<h2 class="text-xl md:text-2xl font-display font-bold text-foreground mt-8 mb-3">$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-display font-bold text-foreground mt-6 mb-2">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    // Table header separator (skip)
    .replace(/^\|[-| :]+\|$/gm, "")
    // Table rows
    .replace(/^\|(.+)\|$/gm, (_, row) => {
      const cells = row.split("|").map((c: string) => c.trim()).filter(Boolean);
      return `<tr class="border-b border-border">${cells.map((c: string) =>
        `<td class="px-4 py-2.5 text-sm text-muted-foreground">${c}</td>`
      ).join("")}</tr>`;
    })
    // Wrap consecutive <tr> blocks in table
    .replace(/((?:<tr[^>]*>.*?<\/tr>\n?)+)/gs, (match) => {
      const rows = match.trim().split("\n");
      if (rows.length === 0) return match;
      const headerRow = rows[0].replace(/td/g, "th").replace(/text-muted-foreground/g, "font-semibold text-foreground");
      const bodyRows = rows.slice(1).join("\n");
      return `<div class="overflow-x-auto my-5 rounded-xl border border-border"><table class="w-full"><thead class="bg-muted/40">${headerRow}</thead><tbody>${bodyRows}</tbody></table></div>`;
    })
    // Numbered list items
    .replace(/^\d+\.\s+\*\*(.+?)\*\*\n(.+)/gm, '<li class="mb-4"><strong class="font-semibold text-foreground">$1</strong><br><span class="text-muted-foreground text-sm">$2</span></li>')
    // Bullet list items
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-muted-foreground mb-1.5"><span class="text-gold mt-1 shrink-0">•</span><span>$1</span></li>')
    // Wrap consecutive <li> in ul
    .replace(/((?:<li[^>]*>[\s\S]*?<\/li>\n?)+)/g, '<ul class="space-y-1 my-4 pl-1">$1</ul>')
    // Paragraphs (lines not already wrapped)
    .replace(/^(?!<[hut]|<\/|<div|<li)(.+)$/gm, '<p class="text-muted-foreground leading-relaxed my-3">$1</p>')
    // Clean extra blank lines
    .replace(/\n{3,}/g, "\n\n");
};

const CategoryBadge = ({ category }: { category?: string }) => {
  const colors: Record<string, string> = {
    "Home Loans": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Loans": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Financial Tips": "bg-green-500/10 text-green-400 border-green-500/20",
    "Insurance": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${colors[category || ""] || "bg-gold/10 text-gold border-gold/20"}`}>
      {category || "General"}
    </span>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostItem | null>(null);
  const [related, setRelated] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (postError || !postData) {
          setError(true);
          return;
        }

        setPost(postData);

        // Fetch related posts (same category, excluding current)
        if (postData.category) {
          const { data: relatedData } = await supabase
            .from("posts")
            .select("*")
            .eq("category", postData.category)
            .neq("slug", slug)
            .limit(3);
            
          setRelated(relatedData || []);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  const canonicalUrl = `https://jupiterfastfinance.com/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title={`${post.title} | Jupiter Finance`}
        description={post.excerpt || `Read about ${post.title} on the Jupiter Finance blog.`}
        keywords={`${post.title.toLowerCase()}, home loan mulund, loans mumbai, jupiter finance`}
        canonicalUrl={canonicalUrl}
        ogType="article"
      />

      {/* JSON-LD Article Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { "@type": "Organization", name: "Jupiter Finance" },
        publisher: {
          "@type": "Organization",
          name: "Jupiter Finance",
          logo: { "@type": "ImageObject", url: "https://jupiterfastfinance.com/favicon.png" },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      })}} />

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

      <main className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <CategoryBadge category={post.category} />
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed border-l-2 border-gold pl-4">
                {post.excerpt}
              </p>
            )}
          </motion.div>

          {/* CTA Banner (top) */}
          <div className="bg-card border border-gold/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4 shadow-card">
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">Need help with your home loan?</p>
              <p className="text-xs text-muted-foreground">Free consultation — no obligations. Serving Mulund, Mumbai, Thane & more.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <a href="tel:+919757190200" className="flex items-center gap-1.5 gradient-gold text-accent-foreground font-semibold px-4 py-2 rounded-xl text-xs hover:opacity-90 transition-opacity">
                <Phone className="w-3.5 h-3.5" /> Call Now
              </a>
              <a href="https://wa.me/919757190200" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 border border-border bg-background text-foreground font-semibold px-4 py-2 rounded-xl text-xs hover:bg-muted transition-colors">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Article Body */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-card prose-custom mb-10"
            dangerouslySetInnerHTML={{ __html: renderBody(post.body || post.excerpt || "") }}
          />

          {/* Bottom CTA */}
          <div className="bg-gradient-to-br from-navy-dark to-background border border-gold/20 rounded-2xl p-6 md:p-8 text-center shadow-card mb-12">
            <span className="text-3xl block mb-3">🏠</span>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              Ready to take the next step?
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Our advisors compare offers from 11+ banks to find you the best home loan rate. Free, no-obligation consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:+919757190200" className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                📞 Call 9757190200
              </a>
              <Link to="/home-loan" className="border border-border bg-card text-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:bg-muted transition-colors">
                Home Loan Services →
              </Link>
            </div>
          </div>

          {/* Back to blog */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-gold transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          {/* Related Articles */}
          {related.length > 0 && (
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-5">Related Articles</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/blog/${rp.slug}`}
                    className="group block bg-card border border-border rounded-2xl p-5 hover:border-gold/40 hover:-translate-y-0.5 transition-all shadow-card"
                  >
                    <CategoryBadge category={rp.category} />
                    <h3 className="font-bold text-foreground text-sm mt-3 mb-2 group-hover:text-gold/90 transition-colors leading-snug">
                      {rp.title}
                    </h3>
                    <span className="text-xs text-gold font-semibold">Read →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileStickyCTA />
    </div>
  );
};

export default BlogPost;
