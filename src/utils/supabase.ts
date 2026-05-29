import { createClient } from '@supabase/supabase-js';

const supabaseurl = 'https://xobkurinfzcmxwskycaw.supabase.co/rest/v1/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvYmt1cmluZnpjbXh3c2t5Y2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODc0OTUsImV4cCI6MjA5NTU2MzQ5NX0.N2jXD_FNUiVM2c028ezsJqFWcM--jXwkPUZ_WVXCNL4';

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is missing from environment variables');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is missing from environment variables');
}

// Ensure URL doesn't have trailing slash
const cleanUrl = supabaseUrl.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl;

export const supabase = createClient(cleanUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    flowType: 'pkce',
  },
});
