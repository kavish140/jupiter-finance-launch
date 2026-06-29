import { createClient } from '@supabase/supabase-js';

// Strip any accidental quotes or whitespace that might have been pasted into GitHub Secrets
let rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/['"]/g, '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').replace(/['"]/g, '').trim();

// Ensure URL has https:// prefix if user accidentally pasted just the domain
if (rawUrl && !rawUrl.startsWith('http')) {
  rawUrl = 'https://' + rawUrl;
}

const supabaseUrl = rawUrl;
const supabaseKey = rawKey;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials are not provided in environment variables.');
}

// Provide a dummy client or valid empty client to prevent fatal crash if missing
let client;
try {
  if (supabaseUrl && supabaseKey) {
    client = createClient(supabaseUrl, supabaseKey);
  } else {
    client = createClient('https://placeholder.supabase.co', 'placeholder');
  }
} catch (error) {
  console.error("Failed to initialize Supabase client. The URL provided was:", import.meta.env.VITE_SUPABASE_URL);
  console.error("Error details:", error);
  client = createClient('https://placeholder.supabase.co', 'placeholder');
}

export const supabase = client;
