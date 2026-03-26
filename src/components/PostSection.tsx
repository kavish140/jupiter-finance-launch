import posts from "@/data/posts.json";

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

const PostSection = () => {
  const latestPosts = (posts as PostItem[]).slice(0, 6);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section id="posts" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">Jupiter Finance Posts</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Latest Financial Updates</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <p className="text-xs uppercase tracking-widest text-gold mb-3">
                {post.category || "General"} • {formatDate(post.publishedAt)}
              </p>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">{post.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt || post.content || ""}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostSection;
