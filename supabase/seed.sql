-- ============================================================
-- 既存の予約ブロック日（Email.tsx に直書きされていたもの）を投入します。
-- schema.sql を実行したあとに、SQL Editor で実行してください。
-- 既に同じ日付がある場合は上書きされます。
-- ============================================================

insert into public.blocked_dates (year, month, day, lunch, dinner) values
  (2025, 4, 20, false, false),
  (2025, 6, 14, false, false),
  (2025, 7, 8, false, false),
  (2025, 8, 15, false, false),
  (2025, 8, 24, false, false),
  (2025, 9, 12, true, false),
  (2025, 9, 14, false, false),
  (2025, 11, 11, false, false),
  (2025, 11, 23, true, false),
  (2025, 11, 24, false, false),
  (2025, 11, 29, false, false),
  (2025, 12, 6, true, false),
  (2025, 12, 26, false, false),
  (2026, 1, 6, false, false),
  (2026, 2, 8, false, false),
  (2026, 2, 17, false, false),
  (2026, 2, 22, false, true),
  (2026, 2, 27, false, true),
  (2026, 3, 15, false, false),
  (2026, 3, 16, false, false),
  (2026, 3, 24, false, false),
  (2026, 4, 19, false, false),
  (2026, 5, 5, false, false),
  (2026, 5, 16, false, false),
  (2026, 5, 23, false, true),
  (2026, 6, 5, true, false),
  (2026, 6, 7, true, false),
  (2026, 6, 13, true, false),
  (2026, 7, 10, false, false),
  (2026, 8, 1, false, true),
  (2026, 8, 11, false, false),
  (2026, 8, 18, false, false),
  (2026, 8, 19, false, false),
  (2026, 8, 20, false, false),
  (2026, 8, 21, false, false),
  (2026, 8, 22, false, false),
  (2026, 8, 23, false, false),
  (2026, 8, 24, false, false),
  (2026, 9, 22, false, true),
  (2026, 9, 23, false, true),
  (2026, 10, 4, false, true),
  (2026, 10, 16, true, false)
on conflict (year, month, day) do update
  set lunch  = excluded.lunch,
      dinner = excluded.dinner;
