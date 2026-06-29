import "lite-youtube-embed/src/lite-yt-embed.css";
import "lite-youtube-embed/src/lite-yt-embed";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface VideoItem {
  videoId: string;
  title: string;
  description?: string;
  publishedAt?: string;
  thumbnailUrl?: string;
  url?: string;
}

const formatDate = (isoDate?: string) => {
  if (!isoDate) {
    return "Recently uploaded";
  }

  return new Date(isoDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const VideoGallery = () => {
  const [latestVideos, setLatestVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const youtubeChannelUrl = "https://www.youtube.com/@JupiterFinance8654";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("*")
          .order("publishedAt", { ascending: false })
          .limit(4);
        if (error) throw error;
        setLatestVideos(data || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section id="videos" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Learn With Jupiter Finance
          </p>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-foreground">
            Latest YouTube Insights
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Fresh guidance on loans, credit profile, and personal finance strategies.
          </p>
        </div>

        {loading ? (
          <div className="max-w-2xl mx-auto text-center border border-dashed border-border rounded-2xl p-10 bg-card flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4" />
            <p className="text-foreground font-semibold">Loading videos...</p>
          </div>
        ) : latestVideos.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center border border-dashed border-border rounded-2xl p-10 bg-card">
            <p className="text-foreground font-semibold">No videos found.</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Please check back later for new content.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5 md:gap-7">
            {latestVideos.map((video, i) => (
              <article
                key={video.videoId}
                className={`rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 ${i >= 2 ? "hidden md:block" : ""}`}
              >
                <div className="[&>lite-youtube]:max-w-none [&>lite-youtube]:w-full [&>lite-youtube]:bg-muted">
                  <lite-youtube
                    videoid={video.videoId}
                    playlabel={`Play ${video.title}`}
                    params="modestbranding=2&rel=0"
                  />
                </div>

                <div className="p-4 md:p-5">
                  <p className="text-xs uppercase tracking-widest text-gold mb-2">{formatDate(video.publishedAt)}</p>
                  <h3 className="text-lg font-semibold text-foreground leading-snug">{video.title}</h3>
                  <a
                    href={video.url || `https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex mt-4 text-sm font-semibold text-primary hover:text-gold transition-colors"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-6 md:mt-10 flex justify-center">
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-card transition-colors"
          >
            View all on YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
