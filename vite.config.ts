import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

  let blogSlugs: string[] = [];
  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/posts?select=slug`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      if (res.ok) {
        const posts = await res.json();
        blogSlugs = posts.map((post: any) => `/blog/${post.slug}`);
      }
    } catch (e) {
      console.error("Failed to fetch blog slugs for sitemap", e);
    }
  }

  const dynamicRoutes = [
    "/home-loan", // Use the correct hyphenated one
    "/blog",
    ...blogSlugs,
    "/loan-against-property",
    "/loan-against-mutual-funds",
    "/health-insurance",
    "/life-insurance",
    "/mutual-fund-sip",
    "/mulund-mumbai-loans",
    "/loans-in-thane",
    "/loans-in-bhandup",
    "/loans-in-ghatkopar",
    "/loans-in-powai",
    "/careers",
    "/admin",
  ];

  return {
    base: "/",
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      Sitemap({
        hostname: "https://jupiterfastfinance.com",
        dynamicRoutes,
        generateRobotsTxt: true,
        robots: [{ userAgent: "*", allow: "/" }],
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "esnext",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode === "production",
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-ui": ["@radix-ui/react-accordion", "@radix-ui/react-dialog"],
            "vendor-router": ["react-router-dom"],
          },
        },
      },
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 500,
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
    },
  };
});
