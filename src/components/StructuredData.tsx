import { Helmet } from "react-helmet-async";
import videos from "@/data/videos.json";

interface VideoItem {
  videoId: string;
  title: string;
  description?: string;
  publishedAt?: string;
  thumbnailUrl?: string;
  url?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  location?: string;
  serviceType?: string;
  customFaqs?: FaqItem[];
  breadcrumbItems?: { name: string; url: string }[];
}

const StructuredData = ({ location, serviceType, customFaqs, breadcrumbItems }: StructuredDataProps) => {
  const siteUrl = "https://jupiterfastfinance.com";
  const latestVideos = (videos as VideoItem[]).slice(0, 4);
  const serviceAreas = ["Mulund", "Mumbai", "Thane", "Bhandup", "Ghatkopar", "Powai", "Navi Mumbai", "Central Mumbai"];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jupiter Finance",
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    telephone: "+91-9757190200",
    email: "info@jupiterfastfinance.com",
    foundingDate: "2000",
    areaServed: serviceAreas,
    sameAs: ["https://www.youtube.com/@JupiterFinance8654"],
  };

  const dynamicAreaServed = location ? [location] : serviceAreas;
  const dynamicServiceType = serviceType
    ? [serviceType]
    : [
        "Home Loans",
        "Loan Against Property",
        "Loan Against Mutual Funds",
        "Health Insurance",
        "Life Insurance",
        "Mutual Fund SIP",
      ];

  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: `Jupiter Finance${location ? ` in ${location}` : ""}`,
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    image: `${siteUrl}/og-jupiter-fast-finance.jpg`,
    telephone: "+91-9757190200",
    email: "info@jupiterfastfinance.com",
    foundingDate: "2000",
    description: `Trusted financial partner${
      location ? ` in ${location}` : " in Mulund & Mumbai"
    } offering home loans, loan against property, loan against mutual funds, health insurance, life insurance, and mutual fund SIP advisory. 25+ years of experience.`,
    priceRange: "Free Consultation",
    areaServed: dynamicAreaServed,
    availableLanguage: ["en", "hi"],
    serviceType: dynamicServiceType,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+91-9757190200",
      email: "info@jupiterfastfinance.com",
      areaServed: dynamicAreaServed,
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: location || "Mulund",
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
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "When you talk about Health Insurance, you need to have someone who can GUIDE you perfectly...",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Asif Khan" },
        datePublished: "2023-07",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Mr. Jignesh Ganatra, Owner of Jupiter, is like a MENTOR for every consumer...",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jupiter Finance",
    url: siteUrl,
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
      publisher: { "@type": "Organization", name: "Jupiter Finance" },
    })),
  };

  const defaultFaqs = [
    {
      question: "How can Jupiter Finance help with home loan approval?",
      answer: "We compare offers from multiple banks and NBFCs, support documentation, and guide borrowers from application to disbursal.",
    },
    {
      question: "Do you help customers in Mulund and nearby Mumbai suburbs?",
      answer: "Yes, we support borrowers across Mulund, Mumbai, Thane, Bhandup, Ghatkopar, Powai, and nearby suburbs.",
    },
    {
      question: "Can you help with loan against property options?",
      answer: "Yes, we compare lenders, explain eligibility, and guide customers through home loan and loan against property options to find the right fit.",
    },
  ];

  const faqsToUse = customFaqs && customFaqs.length > 0 ? customFaqs : defaultFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsToUse.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = breadcrumbItems ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } : null;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(financialServiceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(videoGraph)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
    </Helmet>
  );
};

export default StructuredData;
