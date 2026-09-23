/**
 * 管理画面のログイン ID をユーザー名で扱うためのヘルパー。
 * Supabase Auth はメールアドレスでユーザーを管理するため、
 * 「admin」→「admin@<ドメイン>」に変換してログインする。
 *
 * ドメインは REACT_APP_ADMIN_EMAIL_DOMAIN で変更可能。
 * Supabase 側で作成するユーザーのメールアドレスと必ず一致させること。
 */
const ADMIN_EMAIL_DOMAIN =
  process.env.REACT_APP_ADMIN_EMAIL_DOMAIN || 'seta-tei.local';

export const usernameToEmail = (username: string): string =>
  username.includes('@') ? username : `${username}@${ADMIN_EMAIL_DOMAIN}`;
