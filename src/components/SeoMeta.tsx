import { useEffect } from "react";

interface SeoMetaProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots?: string;
  ogType?: "website" | "article";
  ogImage?: string;
}

const setMetaTag = (selector: string, attrs: Record<string, string>, content: string) => {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const SeoMeta = ({
  title,
  description,
  keywords,
  canonicalUrl,
  robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  ogType = "website",
  ogImage = "/og-jupiter-fast-finance.jpg",
}: SeoMetaProps) => {
  useEffect(() => {
    const resolvedOgImage = new URL(ogImage, canonicalUrl).toString();

    document.title = title;

    setMetaTag('meta[name="description"]', { name: "description" }, description);
    setMetaTag('meta[name="keywords"]', { name: "keywords" }, keywords);
    setMetaTag('meta[name="robots"]', { name: "robots" }, robots);
    setMetaTag('meta[property="og:title"]', { property: "og:title" }, title);
    setMetaTag('meta[property="og:description"]', { property: "og:description" }, description);
    setMetaTag('meta[property="og:type"]', { property: "og:type" }, ogType);
    setMetaTag('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    setMetaTag('meta[property="og:image"]', { property: "og:image" }, resolvedOgImage);
    setMetaTag('meta[property="og:site_name"]', { property: "og:site_name" }, "Jupiter Fast Finance");
    setMetaTag('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    setMetaTag('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    setMetaTag('meta[name="twitter:image"]', { name: "twitter:image" }, resolvedOgImage);
    setMetaTag('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    setMetaTag('meta[name="twitter:site"]', { name: "twitter:site" }, "@JupiterFinance8654");

    let canonicalTag = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonicalUrl;
  }, [title, description, keywords, canonicalUrl, robots, ogType, ogImage]);

  return null;
};

export default SeoMeta;
