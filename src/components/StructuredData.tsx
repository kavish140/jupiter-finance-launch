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
    logo: `${siteUrl}/favicon.png`,
    telephone: "+91-9757190200",
    email: "info@jupiterfastfinance.com",
    foundingDate: "2000",
    areaServed: serviceAreas,
    sameAs: ["https://www.youtube.com/@JupiterFinance8654"],
  };

  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Jupiter Fast Finance",
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    image: `${siteUrl}/og-jupiter-fast-finance.jpg`,
    telephone: "+91-9757190200",
    email: "info@jupiterfastfinance.com",
    foundingDate: "2000",
    description:
      "Trusted financial partner in Mulund & Mumbai offering home loans, loan against property, loan against mutual funds, health insurance, life insurance, and mutual fund SIP advisory. 25+ years of experience, 1000+ happy customers.",
    priceRange: "Free Consultation",
    areaServed: serviceAreas,
    availableLanguage: ["en", "hi"],
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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mulund",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "4",
      reviewCount: "4",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Vimal Gosar" },
        datePublished: "2023-07",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "When you talk about Health Insurance, you need to have someone who can GUIDE you perfectly as per your needs with the minute details in every scheme. Jupiter Insurance Consultants are those \"Someone\" who will not only guide you but also help you in every bit of Insurance process. Cheers!",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Asif Khan" },
        datePublished: "2023-07",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Mr. Jignesh Ganatra, Owner of Jupiter, is like a MENTOR for every consumer. He always gives full detail about the policy, suggests good policies with reasonable prices, and ensures we get full benefits. Jupiter is now a single point of contact for my family.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Vinod Unni" },
        datePublished: "2023-06",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "I recently availed insurance claim for a medical treatment and thanks to Jupiter Insurance, the entire process was smooth and hassle free. Highly recommended!",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Milind Thakker" },
        datePublished: "2023-06",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Excellent service and professional guidance. Very satisfied with the support received from the Jupiter team.",
      },
    ],
    sameAs: ["https://www.youtube.com/@JupiterFinance8654"],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGraph) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
};

export default StructuredData;
