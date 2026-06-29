import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, UploadCloud, Trash2, Newspaper, Briefcase, Video, CheckCircle, XCircle } from "lucide-react";
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
  status: "pending" | "hired" | "rejected";
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

  const [activeTab, setActiveTab] = useState<"videos" | "posts" | "jobs">("jobs");
  const [jobFilter, setJobFilter] = useState<"pending" | "hired" | "rejected">("pending");

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

  const handleUpdateJobStatus = async (appId: string, newStatus: "hired" | "rejected" | "pending") => {
    try {
      const { error } = await supabase.from("job_applications").update({ status: newStatus }).eq("id", appId);
      if (error) throw error;
      fetchJobApplications();
    } catch (err) {
      console.error("Error updating job status:", err);
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
      fetchContent(); 
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
      fetchContent(); 
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
      fetchContent(); 
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
      fetchContent(); 
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
          <div className="mb-8 text-center">
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

  const filteredJobs = jobApplications.filter(app => app.status === jobFilter);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <SeoMeta
        title="Admin | Jupiter Finance"
        description="Private admin panel for Jupiter Finance"
        keywords="admin"
        canonicalUrl="https://jupiterfastfinance.com/admin"
        robots="noindex,nofollow"
      />
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border md:min-h-screen p-6 flex flex-col gap-6 shrink-0">
        <div>
          <Link to="/" className="text-sm font-semibold text-gold hover:text-primary transition-colors block mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-display font-bold">Admin Panel</h1>
          <p className="text-xs text-muted-foreground mt-1">Manage site content & data</p>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'jobs' ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <Briefcase className="w-5 h-5" />
            Job Applications
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'posts' ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <Newspaper className="w-5 h-5" />
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === 'videos' ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <Video className="w-5 h-5" />
            Videos
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <button
            type="button"
            onClick={handleLock}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-sm text-foreground hover:bg-muted transition-colors"
          >
            <Lock className="w-4 h-4" />
            Lock Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl overflow-x-hidden">
        
        {status.message && (
          <div className={`mb-6 p-4 rounded-xl border ${
            status.type === "success"
              ? "border-success/30 bg-success/10 text-success"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}>
            {status.message}
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-gold" />
                Job Applications
              </h2>
              <div className="flex bg-muted p-1 rounded-xl w-full md:w-auto">
                {(['pending', 'hired', 'rejected'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setJobFilter(f)}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${jobFilter === f ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border text-sm text-muted-foreground">
                      <th className="py-4 px-6 font-semibold">Date</th>
                      <th className="py-4 px-6 font-semibold">Applicant</th>
                      <th className="py-4 px-6 font-semibold">Contact</th>
                      <th className="py-4 px-6 font-semibold">Details</th>
                      <th className="py-4 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {isLoadingJobs ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-muted-foreground">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                            Loading applications...
                          </div>
                        </td>
                      </tr>
                    ) : filteredJobs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-muted-foreground flex-col gap-2">
                          <Briefcase className="w-8 h-8 mx-auto opacity-20 mb-2" />
                          No {jobFilter} applications found.
                        </td>
                      </tr>
                    ) : (
                      filteredJobs.map((app) => (
                        <tr key={app.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-6 whitespace-nowrap text-muted-foreground align-top">
                            {new Date(app.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6 align-top">
                            <div className="font-semibold text-foreground text-base">{app.name}</div>
                            {app.dob && <div className="text-xs text-muted-foreground mt-1">DOB: {app.dob}</div>}
                          </td>
                          <td className="py-4 px-6 align-top">
                            <div className="text-foreground font-medium">{app.mobile}</div>
                            {app.email && <div className="text-muted-foreground text-xs mt-1">{app.email}</div>}
                            <div className="text-muted-foreground text-xs mt-1 line-clamp-1" title={app.address}>{app.address}</div>
                          </td>
                          <td className="py-4 px-6 align-top">
                            <div className="text-foreground font-medium">{app.qualification}</div>
                            {app.college && <div className="text-muted-foreground text-xs mt-1">{app.college}</div>}
                            {app.experience && (
                              <div className="mt-2 text-xs text-muted-foreground border-t border-border/50 pt-2">
                                <span className="font-semibold">Exp:</span> {app.experience}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 align-top text-right space-x-2 whitespace-nowrap">
                            {jobFilter !== 'hired' && (
                              <button
                                onClick={() => handleUpdateJobStatus(app.id, 'hired')}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-success/30 text-success hover:bg-success/10 transition-colors text-xs font-semibold"
                                title="Mark as Hired"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Hired
                              </button>
                            )}
                            {jobFilter !== 'rejected' && (
                              <button
                                onClick={() => handleUpdateJobStatus(app.id, 'rejected')}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors text-xs font-semibold"
                                title="Mark as Rejected"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Reject
                              </button>
                            )}
                            {jobFilter !== 'pending' && (
                              <button
                                onClick={() => handleUpdateJobStatus(app.id, 'pending')}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-xs font-semibold"
                                title="Move back to pending"
                              >
                                Pending
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* POSTS TAB */}
        {activeTab === 'posts' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-gold" />
              Blog Posts
            </h2>
            
            <form onSubmit={handleAddPost} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-semibold border-b border-border pb-3">Create New Post</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="post-title" className="text-sm font-semibold">Post Title</label>
                  <input
                    id="post-title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="How to improve home loan eligibility"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="post-category" className="text-sm font-semibold">Category</label>
                  <input
                    id="post-category"
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    placeholder="Home Loan"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="post-excerpt" className="text-sm font-semibold">Excerpt</label>
                <textarea
                  id="post-excerpt"
                  rows={2}
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  placeholder="Short summary for homepage cards"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold resize-none transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="post-content" className="text-sm font-semibold">Full Content (Markdown)</label>
                <textarea
                  id="post-content"
                  rows={6}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Detailed post content in markdown..."
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold resize-y transition-shadow font-mono text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 gradient-gold text-accent-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <UploadCloud className="w-5 h-5" />
                {loading ? "Publishing..." : "Publish Post"}
              </button>
            </form>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-semibold border-b border-border pb-3 mb-6">Manage Posts</h3>
              {isLoadingContent ? (
                <div className="py-8 text-center text-muted-foreground flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  Loading posts...
                </div>
              ) : currentPosts.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">No posts published yet.</div>
              ) : (
                <div className="space-y-3">
                  {currentPosts.map((post) => (
                    <div key={post.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background rounded-xl px-5 py-4 border border-border group hover:border-gold/50 transition-colors">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg leading-tight mb-1">{post.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="bg-muted px-2 py-0.5 rounded-md">{post.category || "General"}</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleRemovePost(post.id)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-destructive/40 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground disabled:opacity-60 shrink-0 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2">
              <Video className="w-6 h-6 text-gold" />
              Videos
            </h2>

            <form onSubmit={handleAddVideo} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-semibold border-b border-border pb-3">Add YouTube Video</h3>
              
              <div className="space-y-2">
                <label htmlFor="video-url" className="text-sm font-semibold">YouTube Video URL</label>
                <input
                  id="video-url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="video-title" className="text-sm font-semibold">Override Title (optional)</label>
                <input
                  id="video-title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Leave empty to use video ID as placeholder"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 gradient-gold text-accent-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <UploadCloud className="w-5 h-5" />
                {loading ? "Adding..." : "Add Video"}
              </button>
            </form>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-semibold border-b border-border pb-3 mb-6">Manage Videos</h3>
              {isLoadingContent ? (
                <div className="py-8 text-center text-muted-foreground flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  Loading videos...
                </div>
              ) : currentVideos.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">No videos added yet.</div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentVideos.map((video) => (
                    <div key={video.videoId} className="flex flex-col bg-background rounded-xl overflow-hidden border border-border group hover:border-gold/50 transition-colors">
                      <div className="relative aspect-video bg-muted">
                        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-semibold text-foreground leading-tight mb-2 line-clamp-2">{video.title}</h4>
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-mono">{video.videoId}</span>
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => handleRemoveVideo(video.videoId)}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/40 text-xs font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground disabled:opacity-60 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;
