import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

/**
 * 環境変数が未設定でもサイトが落ちないよう、client は null になり得ます。
 * その場合、予約フォームはコード内のフォールバック（DEFAULT_BLOCKED_DATES）で動作します。
 */
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          storageKey: 'seta-tei_auth',
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

export const isSupabaseConfigured = (): boolean => supabase !== null;
