import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const postsJsonPath = path.resolve(__dirname, '../src/data/posts.json');

// Base static routes in our React app
const baseRoutes = [
  '',
  'home-loan',
  'blog',
  'mulund-mumbai-loans',
  'loans-in-thane',
  'loans-in-bhandup',
  'loans-in-ghatkopar',
  'loans-in-powai',
  'loan-against-property',
  'loan-against-mutual-funds',
  'health-insurance',
  'life-insurance',
  'mutual-fund-sip',
  'home_loan' // Keep legacy route for safety
];

async function prerender() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('index.html not found in dist/. Run vite build first.');
    process.exit(1);
  }

  let allRoutes = [...baseRoutes];

  // Dynamically pull blog slugs
  if (fs.existsSync(postsJsonPath)) {
    try {
      const postsData = JSON.parse(fs.readFileSync(postsJsonPath, 'utf-8'));
      const blogRoutes = postsData.map(post => `blog/${post.slug}`);
      allRoutes = [...allRoutes, ...blogRoutes];
    } catch (error) {
      console.error('Error reading posts.json:', error);
    }
  }

  // 1. Start a local express server to serve the SPA
  const app = express();
  const PORT = 3000;
  
  app.use(express.static(distDir));
  // Catch-all to serve index.html for SPA routing
  app.use((req, res) => {
    res.sendFile(indexHtmlPath);
  });

  const server = app.listen(PORT, async () => {
    console.log(`Local server started on port ${PORT} for prerendering...`);
    
    // 2. Launch puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const route of allRoutes) {
      const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
      const url = `http://localhost:${PORT}/${cleanRoute}`;
      
      console.log(`Prerendering: /${cleanRoute}`);
      const page = await browser.newPage();
      
      try {
        // Wait for network idle to ensure React has fully rendered and data fetched
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Wait a small extra time to ensure helmet meta tags are injected
        await new Promise(r => setTimeout(r, 500));
        
        // Get full HTML
        let html = await page.content();
        
        // Clean up any injected scripts or unnecessary elements if needed.
        // We'll leave it largely untouched to avoid stripping React scripts.

        const targetDir = path.join(distDir, cleanRoute);
        const targetHtmlPath = path.join(targetDir, 'index.html');

        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.writeFileSync(targetHtmlPath, html);

        // Add to sitemap
        if (cleanRoute !== 'home_loan') {
          const priority = cleanRoute === '' ? '1.0' : '0.8';
          sitemapContent += `  <url>\n    <loc>https://jupiterfastfinance.com/${cleanRoute}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
        }
      } catch (err) {
        console.error(`Failed to prerender /${cleanRoute}`, err);
      } finally {
        await page.close();
      }
    }

    sitemapContent += `</urlset>`;
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
    console.log('Generated sitemap.xml');

    await browser.close();
    server.close();
    console.log(`Successfully generated ${allRoutes.length} prerendered routes.`);
    process.exit(0);
  });
}

prerender();
