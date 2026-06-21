import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const postsJsonPath = path.resolve(__dirname, '../src/data/posts.json');

// Base static routes in our React app
const baseRoutes = [
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

function generate() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('index.html not found in dist/. Run vite build first.');
    process.exit(1);
  }

  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
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

  allRoutes.forEach(route => {
    // Remove leading slash if any
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    const targetDir = path.join(distDir, cleanRoute);
    const targetHtmlPath = path.join(targetDir, 'index.html');

    // Create nested directories if they don't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Write the index.html copy
    fs.writeFileSync(targetHtmlPath, indexHtmlContent);
    console.log(`Generated HTML for route: /${cleanRoute}`);
  });

  console.log(`Successfully generated ${allRoutes.length} physical SPA route files for GitHub Pages.`);
}

generate();
