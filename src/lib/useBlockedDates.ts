import { useEffect, useState } from 'react';
import { BlockedDate, DEFAULT_BLOCKED_DATES } from '../Data/blockedDates';
import { fetchBlockedDates } from './blockedDatesApi';

/**
 * 予約ブロック日を Supabase から取得する。
 * 取得中・取得失敗時はコード内の既定値を返すため、フォームは常に動作する。
 */
export const useBlockedDates = () => {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>(DEFAULT_BLOCKED_DATES);
  const [loading, setLoading] = useState<boolean>(true);
  const [usedFallback, setUsedFallback] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    fetchBlockedDates().then((result) => {
      if (cancelled) return;
      setBlockedDates(result.dates);
      setUsedFallback(result.usedFallback);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { blockedDates, loading, usedFallback };
};
