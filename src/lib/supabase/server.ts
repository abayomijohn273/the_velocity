import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '@/lib/config/env';

let client: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service role key.
 * Bypasses RLS — only ever import this from server code (API routes, libs).
 */
export const getSupabaseAdmin = (): SupabaseClient => {
  if (!client) {
    client = createClient(env.supabase.url, env.supabase.serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return client;
};
