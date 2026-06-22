import { Helmet } from "react-helmet-async";

interface SeoMetaProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots?: string;
  ogType?: "website" | "article";
  ogImage?: string;
}

const SeoMeta = ({
  title,
  description,
  keywords,
  canonicalUrl,
  robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  ogType = "website",
  ogImage = "/og-jupiter-fast-finance.jpg",
}: SeoMetaProps) => {
  const resolvedOgImage = new URL(ogImage, canonicalUrl).toString();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Jupiter Finance" />
      <meta name="publisher" content="Jupiter Finance" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Jupiter Finance" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@JupiterFinance8654" />
      <meta name="twitter:creator" content="@JupiterFinance8654" />

      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SeoMeta;
