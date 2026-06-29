import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URI || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials are not provided in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
