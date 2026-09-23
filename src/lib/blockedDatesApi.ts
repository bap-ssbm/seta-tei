import { supabase } from './supabase';
import {
  BlockedDate,
  DEFAULT_BLOCKED_DATES,
  mergeBlockedDates,
  sortBlockedDates,
} from '../Data/blockedDates';

/** Supabase の blocked_dates テーブル 1 行分 */
export interface BlockedDateRow extends BlockedDate {
  id: string;
  note: string | null;
}

interface RawRow {
  id: string;
  year: number;
  month: number;
  day: number;
  lunch: boolean;
  dinner: boolean;
  note: string | null;
}

const toRow = (r: RawRow): BlockedDateRow => ({
  id: r.id,
  year: r.year,
  month: r.month,
  day: r.day,
  lunch: r.lunch,
  dinner: r.dinner,
  note: r.note,
});

export interface BlockedDatesResult {
  dates: BlockedDate[];
  /** true = Supabase から取得できず、コード内のフォールバックを使用 */
  usedFallback: boolean;
}

/** 予約フォーム用：公開読み取り。失敗時はコード内の既定値にフォールバックする。 */
export const fetchBlockedDates = async (): Promise<BlockedDatesResult> => {
  if (!supabase) {
    return { dates: DEFAULT_BLOCKED_DATES, usedFallback: true };
  }
  try {
    const { data, error } = await supabase
      .from('blocked_dates')
      .select('id, year, month, day, lunch, dinner, note');

    if (error || !data) {
      console.error('[blocked_dates] 取得に失敗しました', error);
      return { dates: DEFAULT_BLOCKED_DATES, usedFallback: true };
    }
    return {
      dates: sortBlockedDates(mergeBlockedDates((data as RawRow[]).map(toRow))),
      usedFallback: false,
    };
  } catch (e) {
    console.error('[blocked_dates] 取得に失敗しました', e);
    return { dates: DEFAULT_BLOCKED_DATES, usedFallback: true };
  }
};

/** 管理画面用：行データをそのまま取得（id 付き） */
export const fetchBlockedDateRows = async (): Promise<BlockedDateRow[]> => {
  if (!supabase) throw new Error('Supabase が設定されていません（環境変数を確認してください）');
  const { data, error } = await supabase
    .from('blocked_dates')
    .select('id, year, month, day, lunch, dinner, note')
    .order('year', { ascending: true })
    .order('month', { ascending: true })
    .order('day', { ascending: true });

  if (error) throw error;
  return (data as RawRow[]).map(toRow);
};

export interface BlockedDateInput {
  year: number;
  month: number;
  day: number;
  lunch: boolean;
  dinner: boolean;
  note?: string | null;
}

/** 追加（同じ日付が既にあれば上書き） */
export const upsertBlockedDates = async (
  inputs: BlockedDateInput[]
): Promise<BlockedDateRow[]> => {
  if (!supabase) throw new Error('Supabase が設定されていません（環境変数を確認してください）');
  const { data, error } = await supabase
    .from('blocked_dates')
    .upsert(
      inputs.map((i) => ({
        year: i.year,
        month: i.month,
        day: i.day,
        lunch: i.lunch,
        dinner: i.dinner,
        note: i.note ?? null,
      })),
      { onConflict: 'year,month,day' }
    )
    .select('id, year, month, day, lunch, dinner, note');

  if (error) throw error;
  return (data as RawRow[]).map(toRow);
};

/** 既存行の更新 */
export const updateBlockedDate = async (
  id: string,
  patch: Partial<BlockedDateInput>
): Promise<void> => {
  if (!supabase) throw new Error('Supabase が設定されていません（環境変数を確認してください）');
  const { error } = await supabase.from('blocked_dates').update(patch).eq('id', id);
  if (error) throw error;
};

/** 削除（＝その日のブロックを解除） */
export const deleteBlockedDate = async (id: string): Promise<void> => {
  if (!supabase) throw new Error('Supabase が設定されていません（環境変数を確認してください）');
  const { error } = await supabase.from('blocked_dates').delete().eq('id', id);
  if (error) throw error;
};
