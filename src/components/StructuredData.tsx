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
  const serviceAreas = ["Mulund", "Mumbai", "Thane", "Bhandup", "Ghatkopar", "Powai", "Navi Mumbai", "Central Mumbai"];
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jupiter Fast Finance",
    url: siteUrl,
    telephone: "+91-9757190200",
    email: "info@jupiterfastfinance.com",
    areaServed: serviceAreas,
    sameAs: ["https://www.youtube.com/@JuptierFinance8654"],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Jupiter Fast Finance",
    url: siteUrl,
    telephone: "+91-9757190200",
    email: "info@jupiterfastfinance.com",
    areaServed: serviceAreas,
    serviceType: [
      "Home Loans",
      "Loan Against Property",
      "Loan Against Mutual Funds",
      "Health Insurance",
      "Life Insurance",
      "Mutual Fund SIP",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+91-9757190200",
      email: "info@jupiterfastfinance.com",
      areaServed: serviceAreas,
      availableLanguage: ["en", "hi"],
    },
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
    email: "info@jupiterfastfinance.com",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
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
        name: "Do you help customers in Mulund and nearby Mumbai suburbs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we support borrowers across Mulund, Mumbai, Thane, Bhandup, Ghatkopar, Powai, and nearby suburbs with home loans, loan against property, and related financial services.",
        },
      },
      {
        "@type": "Question",
        name: "What financial products do you provide beyond loans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We also help with health insurance, life insurance, and mutual fund SIP planning so customers can manage protection, savings, and borrowing in one place.",
        },
      },
      {
        "@type": "Question",
        name: "Can you help with home loan and loan against property options?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we compare lenders, explain eligibility, and guide customers through home loan, balance transfer, top-up, and loan against property options to find the right fit.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
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
