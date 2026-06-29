import { createClient } from '@supabase/supabase-js';

let rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Ensure URL has https:// prefix if user accidentally pasted just the domain
if (rawUrl && !rawUrl.startsWith('http')) {
  rawUrl = 'https://' + rawUrl;
}

const supabaseUrl = rawUrl;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials are not provided in environment variables.');
}

// Provide a dummy client or valid empty client to prevent fatal crash if missing
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : createClient('https://placeholder.supabase.co', 'placeholder');
