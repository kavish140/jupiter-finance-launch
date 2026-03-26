import "lite-youtube-embed/src/lite-yt-embed.css";
import "lite-youtube-embed/src/lite-yt-embed";

import videos from "@/data/videos.json";

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
  const latestVideos = (videos as VideoItem[]).slice(0, 4);

  return (
    <section id="videos" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-3">
            Learn With Jupiter Finance
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Latest YouTube Insights
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Fresh guidance on loans, credit profile, and personal finance strategies from our channel.
          </p>
        </div>

        {latestVideos.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center border border-dashed border-border rounded-2xl p-10 bg-card">
            <p className="text-foreground font-semibold">Video sync is in progress.</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Once the GitHub Action runs, your latest 4 uploads will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-7">
            {latestVideos.map((video) => (
              <article
                key={video.videoId}
                className="rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="[&>lite-youtube]:max-w-none [&>lite-youtube]:w-full [&>lite-youtube]:bg-muted">
                  <lite-youtube
                    videoid={video.videoId}
                    playlabel={`Play ${video.title}`}
                    params="modestbranding=2&rel=0"
                  />
                </div>

                <div className="p-5">
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
      </div>
    </section>
  );
};

export default VideoGallery;
