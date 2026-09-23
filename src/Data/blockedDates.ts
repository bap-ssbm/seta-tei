/**
 * 予約ブロック日のデータ定義
 *
 * ⚠️ lunch / dinner は「営業する = true」を表します（ブロックではありません）。
 *   { lunch: false, dinner: false } → 終日ブロック（予約不可）
 *   { lunch: true,  dinner: false } → ランチのみ予約可（ディナー休み）
 *   { lunch: false, dinner: true  } → ディナーのみ予約可（ランチ休み）
 *   { lunch: true,  dinner: true  } → 両方予約可
 */
export interface BlockedDate {
  year: number;
  month: number; // 1-12
  day: number;
  lunch: boolean;
  dinner: boolean;
}

/**
 * Supabase から取得できなかった場合のフォールバック。
 * Supabase の blocked_dates テーブルが正となるため、通常はこちらを編集しません。
 * （管理画面 /admin から追加・変更してください）
 */
export const DEFAULT_BLOCKED_DATES: BlockedDate[] = [
  { year: 2025, month: 4, day: 20, lunch: false, dinner: false },
  { year: 2025, month: 6, day: 14, lunch: false, dinner: false },
  { year: 2025, month: 7, day: 8, lunch: false, dinner: false },
  { year: 2025, month: 8, day: 15, lunch: false, dinner: false },
  { year: 2025, month: 8, day: 24, lunch: false, dinner: false },
  { year: 2025, month: 9, day: 12, lunch: true, dinner: false },
  { year: 2025, month: 9, day: 14, lunch: false, dinner: false },
  { year: 2025, month: 11, day: 11, lunch: false, dinner: false },
  { year: 2025, month: 11, day: 23, lunch: true, dinner: false },
  { year: 2025, month: 11, day: 24, lunch: false, dinner: false },
  { year: 2025, month: 11, day: 29, lunch: false, dinner: false },
  { year: 2025, month: 12, day: 6, lunch: true, dinner: false },
  { year: 2025, month: 12, day: 26, lunch: false, dinner: false },
  { year: 2026, month: 1, day: 6, lunch: false, dinner: false },
  { year: 2026, month: 2, day: 8, lunch: false, dinner: false },
  { year: 2026, month: 2, day: 17, lunch: false, dinner: false },
  { year: 2026, month: 2, day: 22, lunch: false, dinner: true },
  { year: 2026, month: 2, day: 27, lunch: false, dinner: true },
  { year: 2026, month: 3, day: 15, lunch: false, dinner: false },
  { year: 2026, month: 3, day: 16, lunch: false, dinner: false },
  { year: 2026, month: 3, day: 24, lunch: false, dinner: false },
  { year: 2026, month: 4, day: 19, lunch: false, dinner: false },
  { year: 2026, month: 5, day: 5, lunch: false, dinner: false },
  { year: 2026, month: 5, day: 16, lunch: false, dinner: false },
  { year: 2026, month: 5, day: 23, lunch: false, dinner: true },
  { year: 2026, month: 6, day: 5, lunch: true, dinner: false },
  { year: 2026, month: 6, day: 7, lunch: true, dinner: false },
  { year: 2026, month: 6, day: 13, lunch: true, dinner: false },
  { year: 2026, month: 7, day: 10, lunch: false, dinner: false },
  { year: 2026, month: 8, day: 1, lunch: false, dinner: true },
  { year: 2026, month: 8, day: 11, lunch: false, dinner: false },
  { year: 2026, month: 8, day: 18, lunch: false, dinner: false },
  { year: 2026, month: 8, day: 19, lunch: false, dinner: false },
  { year: 2026, month: 8, day: 20, lunch: false, dinner: false },
  { year: 2026, month: 8, day: 21, lunch: false, dinner: false },
  { year: 2026, month: 8, day: 22, lunch: false, dinner: false },
  { year: 2026, month: 8, day: 23, lunch: false, dinner: false },
  { year: 2026, month: 8, day: 24, lunch: false, dinner: false },
  { year: 2026, month: 9, day: 22, lunch: false, dinner: true },
  { year: 2026, month: 9, day: 23, lunch: false, dinner: true },
  { year: 2026, month: 10, day: 4, lunch: false, dinner: true },
  { year: 2026, month: 10, day: 16, lunch: true, dinner: false },
];

/** 期間でブロックする日程（コード管理。管理画面からは期間指定で個別日として追加できます） */
export const BLOCKED_RANGES: { start: Date; end: Date }[] = [
  {
    start: new Date(2025, 7, 27), // 2025/8/27
    end: new Date(2025, 8, 6), // 2025/9/6
  },
];

/** 同じ日付の重複を統合する（どちらか一方でも休みなら休み扱い） */
export const mergeBlockedDates = (dates: BlockedDate[]): BlockedDate[] => {
  const merged = new Map<string, BlockedDate>();
  dates.forEach((d) => {
    const key = `${d.year}-${d.month}-${d.day}`;
    const prev = merged.get(key);
    merged.set(
      key,
      prev
        ? { ...d, lunch: prev.lunch && d.lunch, dinner: prev.dinner && d.dinner }
        : { ...d }
    );
  });
  return Array.from(merged.values());
};

/** 日付順に並べ替え */
export const sortBlockedDates = (dates: BlockedDate[]): BlockedDate[] =>
  [...dates].sort(
    (a, b) =>
      a.year - b.year || a.month - b.month || a.day - b.day
  );

/** 表示用ラベル */
export const describeBlockedDate = (d: BlockedDate): string => {
  if (!d.lunch && !d.dinner) return '終日ブロック';
  if (d.lunch && !d.dinner) return 'ランチのみ営業（ディナー休み）';
  if (!d.lunch && d.dinner) return 'ディナーのみ営業（ランチ休み）';
  return '通常営業（ブロックなし）';
};

export const toDateInputValue = (d: BlockedDate): string =>
  `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;

export const blockedDateKey = (d: Pick<BlockedDate, 'year' | 'month' | 'day'>): string =>
  `${d.year}-${d.month}-${d.day}`;
