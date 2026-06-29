import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeSql(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/'/g, "''");
}

function run() {
  let sql = "";
  
  // Posts
  const postsPath = path.resolve(__dirname, '../src/data/posts.json');
  if (fs.existsSync(postsPath)) {
    const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
    if (postsData.length > 0) {
      sql += "-- Insert Posts\n";
      for (const post of postsData) {
        const id = escapeSql(post.id);
        const slug = escapeSql(post.slug);
        const title = escapeSql(post.title);
        const excerpt = escapeSql(post.excerpt);
        const category = escapeSql(post.category || 'General');
        const publishedAt = escapeSql(post.publishedAt);
        const body = escapeSql(post.body);
        
        sql += `INSERT INTO public.posts (id, slug, title, excerpt, category, "publishedAt", body) VALUES ('${id}', '${slug}', '${title}', '${excerpt}', '${category}', '${publishedAt}', '${body}') ON CONFLICT (id) DO NOTHING;\n`;
      }
      sql += "\n";
    }
  }

  // Videos
  const videosPath = path.resolve(__dirname, '../src/data/videos.json');
  if (fs.existsSync(videosPath)) {
    const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));
    if (videosData.length > 0) {
      sql += "-- Insert Videos\n";
      for (const video of videosData) {
        const id = escapeSql(video.videoId);
        const title = escapeSql(video.title);
        const desc = escapeSql(video.description);
        const publishedAt = escapeSql(video.publishedAt);
        const thumbnailUrl = escapeSql(video.thumbnailUrl);
        const url = escapeSql(video.url);
        
        sql += `INSERT INTO public.videos ("videoId", title, description, "publishedAt", "thumbnailUrl", url) VALUES ('${id}', '${title}', '${desc}', '${publishedAt}', '${thumbnailUrl}', '${url}') ON CONFLICT ("videoId") DO NOTHING;\n`;
      }
    }
  }

  fs.writeFileSync(path.resolve(__dirname, 'migration.sql'), sql);
  console.log("migration.sql created.");
}

run();
