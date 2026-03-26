import videos from "@/data/videos.json";

interface VideoItem {
  videoId: string;
  title: string;
  description?: string;
  publishedAt?: string;
  thumbnailUrl?: string;
  url?: string;
}

const StructuredData = () => {
  const siteUrl = "https://jupiterfastfinance.com";
  const latestVideos = (videos as VideoItem[]).slice(0, 4);

  const videoGraph = {
    "@context": "https://schema.org",
    "@graph": latestVideos.map((video) => ({
      "@type": "VideoObject",
      name: video.title,
      description: video.description || "Latest financial guidance from Jupiter Finance",
      uploadDate: video.publishedAt,
      thumbnailUrl: video.thumbnailUrl,
      embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
      contentUrl: video.url || `https://www.youtube.com/watch?v=${video.videoId}`,
      publisher: {
        "@type": "Organization",
        name: "Jupiter Fast Finance",
      },
    })),
  };

  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Jupiter Fast Finance",
    url: siteUrl,
    telephone: "+91-9757190200",
    areaServed: "IN",
    serviceType: [
      "Home Loans",
      "Loan Against Property",
      "Loan Against Mutual Funds",
      "Health Insurance",
      "Life Insurance",
      "Mutual Fund SIP",
    ],
    sameAs: ["https://www.youtube.com/@JuptierFinance8654"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGraph) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
      />
    </>
  );
};

export default StructuredData;
