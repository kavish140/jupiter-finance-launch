import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Sitemap from "vite-plugin-sitemap";

import posts from "./src/data/posts.json";

const dynamicRoutes = [
  "/home-loan", // Use the correct hyphenated one
  "/blog",
  ...posts.map((post) => `/blog/${post.slug}`),
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
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
}));
