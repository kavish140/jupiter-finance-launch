import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, UploadCloud, Trash2, Newspaper } from "lucide-react";
import videos from "@/data/videos.json";
import posts from "@/data/posts.json";
import SeoMeta from "@/components/SeoMeta";

type Status = { type: "idle" | "success" | "error"; message: string };

const REPO_OWNER = "kavish140";
const REPO_NAME = "jupiter-finance-launch";
const WORKFLOW_FILE = "youtube_sync.yml";
const ADMIN_SESSION_KEY = "jff_admin_unlocked";
const ADMIN_PAGE_PASSWORD =
  import.meta.env.VITE_ADMIN_PAGE_PASSWORD?.trim() ??
  import.meta.env.VITE_ADMIN_CREDENTIALS?.trim() ??
  "";

interface VideoItem {
  videoId: string;
  title: string;
}

interface PostItem {
  id: string;
  title: string;
  category?: string;
}

const Admin = () => {
  const [token, setToken] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postExcerpt, setPostExcerpt] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("General");
  const [adminCredentials, setAdminCredentials] = useState("");
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
  const currentVideos = videos as VideoItem[];
  const currentPosts = posts as PostItem[];

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isUnlocked) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      return;
    }

    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }, [isUnlocked]);

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
      setAdminCredentials(enteredPassword);
      setUnlockPassword("");
      return;
    }

    if (enteredPassword !== ADMIN_PAGE_PASSWORD) {
      setUnlockError("Incorrect admin password.");
      return;
    }

    setUnlockError("");
    setIsUnlocked(true);
    setAdminCredentials(enteredPassword);
    setUnlockPassword("");
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setAdminCredentials("");
    setUnlockPassword("");
    setStatus({ type: "idle", message: "" });
  };

  const dispatchWorkflow = async (inputs: Record<string, string>, successMessage: string) => {
    if (!token.trim()) {
      throw new Error("GitHub token is required.");
    }

    if (!adminCredentials.trim()) {
      throw new Error("Admin password is required.");
    }

    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token.trim()}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ref: "main",
          inputs: {
            admin_credentials: adminCredentials.trim(),
            ...inputs,
          },
        }),
      }
    );

    if (!response.ok) {
      const message = await response.text();
      if (response.status === 404) {
        throw new Error(
          "GitHub API returned 404. Check repository owner/name and verify your token has access to this repository."
        );
      }
      throw new Error(message || "Failed to dispatch workflow");
    }

    setStatus({ type: "success", message: successMessage });
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
      await dispatchWorkflow(
        {
          operation: "add_video",
          manual_video_url: videoUrl.trim(),
          manual_video_title: videoTitle.trim(),
        },
        "Video submitted. GitHub Action started, and site videos will refresh after workflow + deploy complete."
      );
      setVideoUrl("");
      setVideoTitle("");
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong while triggering workflow.",
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
      await dispatchWorkflow(
        {
          operation: "add_post",
          post_title: postTitle.trim(),
          post_excerpt: postExcerpt.trim(),
          post_content: postContent.trim(),
          post_category: postCategory.trim() || "General",
        },
        "Post submitted. GitHub Action started, and posts will refresh after workflow + deploy complete."
      );
      setPostTitle("");
      setPostExcerpt("");
      setPostContent("");
      setPostCategory("General");
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong while triggering workflow.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVideo = async (videoId: string) => {
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      await dispatchWorkflow(
        {
          operation: "remove_video",
          remove_video_id: videoId,
        },
        "Video removal requested. Refresh admin after deploy to verify the updated list."
      );
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
      await dispatchWorkflow(
        {
          operation: "remove_post",
          remove_post_id: postId,
        },
        "Post removal requested. Refresh admin after deploy to verify the updated list."
      );
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
          title="Admin | Jupiter Fast Finance"
          description="Private admin panel for Jupiter Fast Finance"
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
        title="Admin | Jupiter Fast Finance"
        description="Private admin panel for Jupiter Fast Finance"
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
              Manage videos and posts with one panel. Password validation now happens in GitHub Actions using your repository secret.
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
          <div className="space-y-2">
            <label htmlFor="token" className="text-sm font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4 text-gold" />
              GitHub Personal Access Token
            </label>
            <input
              id="token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_..."
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              Token needs Actions write permission and repository access.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="admin-credentials" className="text-sm font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              Admin Password (validated by GitHub Secret)
            </label>
            <input
              id="admin-credentials"
              type="password"
              value={adminCredentials}
              onChange={(e) => setAdminCredentials(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-gold"
              autoComplete="off"
            />
          </div>

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
            {currentVideos.length === 0 ? (
              <p className="text-sm text-muted-foreground">No videos available to remove.</p>
            ) : (
              <div className="space-y-3">
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
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-destructive/40 text-sm text-foreground hover:bg-destructive/10 disabled:opacity-60"
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
              <label htmlFor="post-content" className="text-sm font-semibold">Full Content</label>
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
            {currentPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts available to remove.</p>
            ) : (
              <div className="space-y-3">
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
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-destructive/40 text-sm text-foreground hover:bg-destructive/10 disabled:opacity-60"
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
        </div>
      </div>
    </div>
  );
};

export default Admin;
