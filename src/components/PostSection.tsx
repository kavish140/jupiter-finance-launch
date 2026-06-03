import posts from "@/data/posts.json";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  publishedAt?: string;
}

const formatDate = (isoDate?: string) => {
  if (!isoDate) {
    return "Recent";
  }

  return new Date(isoDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const PostSection = () => {
  const latestPosts = (posts as PostItem[]).slice(0, 6);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section id="posts" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Financial Insights
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Latest Financial Tips & Guides
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
            Expert insights on loans, insurance, and investment planning to help you make informed financial decisions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {latestPosts.map((post) => (
            <motion.article
              variants={cardVariants}
              key={post.id}
              className="group relative bg-card/60 backdrop-blur-sm rounded-2xl p-7 transition-all duration-300 border border-border/60 hover:border-gold/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)] hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 w-full h-1 gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-gold bg-gold/10 px-2.5 py-1 rounded-md">
                  {post.category || "General"}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="w-3 h-3" />
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-foreground mb-3 leading-snug group-hover:text-gold/90 transition-colors">
                {post.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5 line-clamp-4">
                {post.excerpt || post.content || ""}
              </p>

              <div className="mt-auto pt-4 border-t border-border/50">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:text-gold/80 transition-colors">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA below posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Have questions about loans or insurance? Our experts are here to help.
          </p>
          <a
            href="tel:+919757190200"
            className="gradient-gold text-accent-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            📞 Talk to an Expert — Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PostSection;
