import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, UploadCloud, Trash2, Newspaper, Briefcase } from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import { supabase } from "@/lib/supabase";

type Status = { type: "idle" | "success" | "error"; message: string };

const ADMIN_SESSION_KEY = "jff_admin_unlocked";
const ADMIN_PAGE_PASSWORD =
  import.meta.env.VITE_ADMIN_PAGE_PASSWORD?.trim() ??
  import.meta.env.VITE_ADMIN_CREDENTIALS?.trim() ??
  "";

interface VideoItem {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  url: string;
}

interface PostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  publishedAt: string;
  body: string;
}

interface JobApplication {
  id: string;
  name: string;
  dob: string;
  qualification: string;
  address: string;
  college: string;
  experience: string;
  mobile: string;
  email: string;
  created_at: string;
}

const Admin = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postExcerpt, setPostExcerpt] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("General");
  
  const [unlockPassword, setUnlockPassword] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  
  const [currentVideos, setCurrentVideos] = useState<VideoItem[]>([]);
  const [currentPosts, setCurrentPosts] = useState<PostItem[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isUnlocked) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      fetchJobApplications();
      fetchContent();
      return;
    }

    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }, [isUnlocked]);

  const fetchJobApplications = async () => {
    setIsLoadingJobs(true);
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setJobApplications(data || []);
    } catch (err) {
      console.error("Error fetching job applications:", err);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const fetchContent = async () => {
    setIsLoadingContent(true);
    try {
      const [videosRes, postsRes] = await Promise.all([
        supabase.from("videos").select("*").order("publishedAt", { ascending: false }),
        supabase.from("posts").select("*").order("publishedAt", { ascending: false })
      ]);
      
      if (videosRes.error) throw videosRes.error;
      if (postsRes.error) throw postsRes.error;
      
      setCurrentVideos(videosRes.data || []);
      setCurrentPosts(postsRes.data || []);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    const enteredPassword = unlockPassword.trim();
    if (!enteredPassword) {
      setUnlockError("Enter admin password.");
      return;
    }
    if (!ADMIN_PAGE_PASSWORD) {
      setUnlockError("");
      setIsUnlocked(true);
      setUnlockPassword("");
      return;
    }
    if (enteredPassword !== ADMIN_PAGE_PASSWORD) {
      setUnlockError("Incorrect admin password.");
      return;
    }
    setUnlockError("");
    setIsUnlocked(true);
    setUnlockPassword("");
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setUnlockPassword("");
    setStatus({ type: "idle", message: "" });
  };

  const handleAddVideo = async (e: FormEvent) => {
    e.preventDefault();

    if (!videoUrl.trim()) {
      setStatus({ type: "error", message: "YouTube URL is required." });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      // Extract video ID from URL
      let videoId = "";
      const urlObj = new URL(videoUrl.trim());
      if (videoUrl.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v") || "";
      } else if (videoUrl.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      }
      
      if (!videoId) {
        throw new Error("Could not extract YouTube video ID from URL.");
      }

      const { error } = await supabase.from("videos").insert([{
        videoId,
        title: videoTitle.trim() || `YouTube Video: ${videoId}`,
        description: "New Video",
        publishedAt: new Date().toISOString(),
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        url: videoUrl.trim()
      }]);

      if (error) throw error;

      setStatus({ type: "success", message: "Video successfully added." });
      setVideoUrl("");
      setVideoTitle("");
      fetchContent(); // refresh
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to add video.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (e: FormEvent) => {
    e.preventDefault();

    if (!postTitle.trim()) {
      setStatus({ type: "error", message: "Post title is required." });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const slug = postTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const { error } = await supabase.from("posts").insert([{
        id: slug,
        slug: slug,
        title: postTitle.trim(),
        excerpt: postExcerpt.trim(),
        body: postContent.trim(),
        category: postCategory.trim() || "General",
        publishedAt: new Date().toISOString(),
      }]);

      if (error) throw error;

      setStatus({ type: "success", message: "Post successfully added." });
      setPostTitle("");
      setPostExcerpt("");
      setPostContent("");
      setPostCategory("General");
      fetchContent(); // refresh
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to add post.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVideo = async (videoId: string) => {
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const { error } = await supabase.from("videos").delete().eq("videoId", videoId);
      if (error) throw error;
      
      setStatus({ type: "success", message: "Video removed." });
      fetchContent(); // refresh
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to remove video.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePost = async (postId: string) => {
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;
      
      setStatus({ type: "success", message: "Post removed." });
      fetchContent(); // refresh
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to remove post.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background text-foreground py-12 px-4">
        <SeoMeta
          title="Admin | Jupiter Finance"
          description="Private admin panel for Jupiter Finance"
          keywords="admin"
          canonicalUrl="https://jupiterfastfinance.com/admin"
          robots="noindex,nofollow"
        />
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="text-sm font-semibold text-gold hover:text-primary transition-colors">
              Back to Home
            </Link>
            <h1 className="mt-3 text-3xl md:text-5xl font-display font-bold">Owner Content Admin</h1>
            <p className="mt-3 text-muted-foreground">Enter the admin password to unlock this page.</p>
          </div>

          <form onSubmit={handleUnlock} className="rounded-2xl border border-border bg-card shadow-card p-6 md:p-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="unlock-password" className="text-sm font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-gold" />
                Admin Password
              </label>
              <input
                id="unlock-password"
                type="password"
                value={unlockPassword}
                onChange={(e) => {
                  setUnlockPassword(e.target.value);
                  if (unlockError) {
                    setUnlockError("");
                  }
                }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                autoComplete="current-password"
              />
            </div>

            {unlockError && (
              <p className="text-sm rounded-lg p-3 border border-destructive/40 bg-destructive/10 text-foreground">
                {unlockError}
              </p>
            )}

            <button
              type="submit"
              className="w-full gradient-gold text-accent-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Unlock Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <SeoMeta
        title="Admin | Jupiter Finance"
        description="Private admin panel for Jupiter Finance"
        keywords="admin"
        canonicalUrl="https://jupiterfastfinance.com/admin"
        robots="noindex,nofollow"
      />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div>
            <Link to="/" className="text-sm font-semibold text-gold hover:text-primary transition-colors">
              Back to Home
            </Link>
            <h1 className="mt-3 text-3xl md:text-5xl font-display font-bold">Owner Content Admin</h1>
            <p className="mt-3 text-muted-foreground">
              Manage videos, posts, and job applications with one panel. Powered by Supabase.
            </p>
            <button
              type="button"
              onClick={handleLock}
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm text-foreground hover:bg-muted"
            >
              <Lock className="w-4 h-4" />
              Lock Admin
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-card p-6 md:p-8 space-y-8">

          <form onSubmit={handleAddVideo} className="space-y-5 border border-border rounded-xl p-5">
            <h2 className="text-xl font-display font-bold">Add Video</h2>
            <div className="space-y-2">
              <label htmlFor="video-url" className="text-sm font-semibold">YouTube Video URL</label>
              <input
                id="video-url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="video-title" className="text-sm font-semibold">Override Title (optional)</label>
              <input
                id="video-title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Loan tips for first-time home buyers"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-gold text-accent-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <UploadCloud className="w-5 h-5" />
              {loading ? "Submitting..." : "Add Video"}
            </button>
          </form>

          <div className="space-y-4 border border-border rounded-xl p-5">
            <h2 className="text-xl font-display font-bold">Remove Video</h2>
            {isLoadingContent ? (
              <p className="text-sm text-muted-foreground">Loading videos...</p>
            ) : currentVideos.length === 0 ? (
              <p className="text-sm text-muted-foreground">No videos available to remove.</p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {currentVideos.map((video) => (
                  <div key={video.videoId} className="flex items-center justify-between gap-4 bg-background rounded-lg px-4 py-3 border border-border">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{video.title}</p>
                      <p className="text-xs text-muted-foreground">ID: {video.videoId}</p>
                    </div>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleRemoveVideo(video.videoId)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-destructive/40 text-sm text-foreground hover:bg-destructive/10 disabled:opacity-60 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleAddPost} className="space-y-5 border border-border rounded-xl p-5">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-gold" />
              Add Post
            </h2>
            <div className="space-y-2">
              <label htmlFor="post-title" className="text-sm font-semibold">Post Title</label>
              <input
                id="post-title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="How to improve home loan eligibility"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="post-category" className="text-sm font-semibold">Category</label>
              <input
                id="post-category"
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value)}
                placeholder="Home Loan"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="post-excerpt" className="text-sm font-semibold">Excerpt</label>
              <textarea
                id="post-excerpt"
                rows={2}
                value={postExcerpt}
                onChange={(e) => setPostExcerpt(e.target.value)}
                placeholder="Short summary for homepage cards"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="post-content" className="text-sm font-semibold">Full Content (Markdown)</label>
              <textarea
                id="post-content"
                rows={5}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Detailed post content"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-gold text-accent-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <UploadCloud className="w-5 h-5" />
              {loading ? "Submitting..." : "Add Post"}
            </button>
          </form>

          <div className="space-y-4 border border-border rounded-xl p-5">
            <h2 className="text-xl font-display font-bold">Remove Post</h2>
            {isLoadingContent ? (
              <p className="text-sm text-muted-foreground">Loading posts...</p>
            ) : currentPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts available to remove.</p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {currentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between gap-4 bg-background rounded-lg px-4 py-3 border border-border">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.category || "General"}</p>
                    </div>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleRemovePost(post.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-destructive/40 text-sm text-foreground hover:bg-destructive/10 disabled:opacity-60 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {status.message && (
            <p
              className={`text-sm rounded-lg p-3 border ${
                status.type === "success"
                  ? "border-success/30 bg-success/10 text-foreground"
                  : "border-destructive/40 bg-destructive/10 text-foreground"
              }`}
            >
              {status.message}
            </p>
          )}

          <div className="space-y-4 border border-border rounded-xl p-5 mt-8">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gold" />
              Job Applications
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-border text-sm text-muted-foreground">
                    <th className="pb-3 pr-4 font-semibold">Date</th>
                    <th className="pb-3 pr-4 font-semibold">Name</th>
                    <th className="pb-3 pr-4 font-semibold">Contact</th>
                    <th className="pb-3 pr-4 font-semibold">Qualification</th>
                    <th className="pb-3 font-semibold">Experience</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isLoadingJobs ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Loading applications...
                      </td>
                    </tr>
                  ) : jobApplications.length === 0 ? (
                     <tr>
                       <td colSpan={5} className="py-8 text-center text-muted-foreground">
                         No applications found.
                       </td>
                     </tr>
                  ) : (
                    jobApplications.map((app) => (
                      <tr key={app.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-4 pr-4 whitespace-nowrap text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 pr-4 font-medium text-foreground">
                          {app.name}
                        </td>
                        <td className="py-4 pr-4">
                          <div className="text-foreground">{app.mobile}</div>
                          <div className="text-muted-foreground text-xs">{app.email}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="text-foreground">{app.qualification}</div>
                          <div className="text-muted-foreground text-xs">{app.college}</div>
                        </td>
                        <td className="py-4 text-muted-foreground max-w-[250px] truncate">
                          {app.experience}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
