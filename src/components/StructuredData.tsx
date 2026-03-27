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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jupiter Fast Finance",
    url: siteUrl,
    telephone: "+91-9757190200",
    sameAs: ["https://www.youtube.com/@JuptierFinance8654"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jupiter Fast Finance",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can Jupiter Fast Finance help with home loan approval?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jupiter Fast Finance compares offers from multiple banks and NBFCs, supports documentation, and guides borrowers from application to disbursal for a smoother home loan process.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide mutual fund investment guidance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide practical mutual fund SIP guidance aligned to goals, risk profile, and investment horizon for long-term wealth building.",
        },
      },
      {
        "@type": "Question",
        name: "What health insurance support do you provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We help identify suitable health insurance plans based on coverage, premium, and hospital network so families can secure reliable financial protection.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGraph) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
};

export default StructuredData;
