import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Load env vars from .env via node --env-file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Starting migration...");
  
  // 1. Migrate Posts
  const postsPath = path.resolve(__dirname, '../src/data/posts.json');
  if (fs.existsSync(postsPath)) {
    console.log("Reading posts...");
    const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
    
    for (const post of postsData) {
      const { error } = await supabase
        .from('posts')
        .upsert({
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category || 'General',
          publishedAt: post.publishedAt,
          body: post.body
        }, { onConflict: 'id' });
        
      if (error) {
        console.error(`Failed to insert post ${post.id}:`, error);
      } else {
        console.log(`Inserted post: ${post.title}`);
      }
    }
  }

  // 2. Migrate Videos
  const videosPath = path.resolve(__dirname, '../src/data/videos.json');
  if (fs.existsSync(videosPath)) {
    console.log("Reading videos...");
    const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));
    
    for (const video of videosData) {
      const { error } = await supabase
        .from('videos')
        .upsert({
          videoId: video.videoId,
          title: video.title,
          description: video.description,
          publishedAt: video.publishedAt,
          thumbnailUrl: video.thumbnailUrl,
          url: video.url
        }, { onConflict: 'videoId' });
        
      if (error) {
        console.error(`Failed to insert video ${video.videoId}:`, error);
      } else {
        console.log(`Inserted video: ${video.title}`);
      }
    }
  }

  console.log("Migration complete!");
}

migrate().catch(console.error);
