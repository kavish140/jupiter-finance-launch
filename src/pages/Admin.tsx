import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, UploadCloud } from "lucide-react";

type Status = { type: "idle" | "success" | "error"; message: string };

const REPO_OWNER = "kavish140";
const REPO_NAME = "jupiter-finance-launch";
const WORKFLOW_FILE = "youtube_sync.yml";

const Admin = () => {
  const [token, setToken] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token.trim()) {
      setStatus({ type: "error", message: "GitHub token is required." });
      return;
    }

    if (!videoUrl.trim()) {
      setStatus({ type: "error", message: "YouTube URL is required." });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
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
              manual_video_url: videoUrl.trim(),
              manual_video_title: videoTitle.trim(),
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

      setStatus({
        type: "success",
        message: "Video submitted. GitHub Action started, and site videos will refresh after workflow + deploy complete.",
      });
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

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-sm font-semibold text-gold hover:text-primary transition-colors">
            Back to Home
          </Link>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-bold">Owner Video Admin</h1>
          <p className="mt-3 text-muted-foreground">
            Submit a YouTube URL to update site videos globally by triggering the GitHub Action.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              {loading ? "Submitting..." : "Push Video To Site"}
            </button>

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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
