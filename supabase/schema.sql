-- ============================================================
-- seta-tei 予約ブロック日テーブル
-- Supabase ダッシュボード → SQL Editor にそのまま貼り付けて実行してください。
-- ============================================================

create table if not exists public.blocked_dates (
  id     uuid primary key default gen_random_uuid(),
  year   int  not null,
  month  int  not null check (month between 1 and 12),
  day    int  not null check (day between 1 and 31),
  -- ⚠️ lunch / dinner は「営業する = true」を表します（ブロックではありません）
  --   lunch=false, dinner=false → 終日ブロック
  --   lunch=true,  dinner=false → ランチのみ営業（ディナー休み）
  --   lunch=false, dinner=true  → ディナーのみ営業（ランチ休み）
  lunch   boolean not null default false,
  dinner  boolean not null default false,
  note    text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (year, month, day)
);

-- updated_at 自動更新
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blocked_dates_set_updated_at on public.blocked_dates;
create trigger blocked_dates_set_updated_at
  before update on public.blocked_dates
  for each row execute function public.set_updated_at();

-- ============================================================
-- 行レベルセキュリティ
--   読み取り : 誰でも可（予約フォームが匿名キーで読むため）
--   書き込み : ログイン済みユーザーのみ（管理画面）
-- ============================================================
alter table public.blocked_dates enable row level security;

drop policy if exists "blocked_dates_public_read" on public.blocked_dates;
create policy "blocked_dates_public_read"
  on public.blocked_dates for select
  to anon, authenticated
  using (true);

drop policy if exists "blocked_dates_admin_write" on public.blocked_dates;
create policy "blocked_dates_admin_write"
  on public.blocked_dates for all
  to authenticated
  using (true)
  with check (true);
