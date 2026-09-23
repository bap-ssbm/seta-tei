import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  BlockedDateInput,
  BlockedDateRow,
  deleteBlockedDate,
  fetchBlockedDateRows,
  updateBlockedDate,
  upsertBlockedDates,
} from '../lib/blockedDatesApi';

/** 休みの区分。lunch / dinner は「営業する = true」で保存する。 */
type BlockKind = 'full' | 'dinnerOff' | 'lunchOff';

const BLOCK_KINDS: { value: BlockKind; label: string; lunch: boolean; dinner: boolean }[] = [
  { value: 'full', label: '終日休み（予約不可）', lunch: false, dinner: false },
  { value: 'dinnerOff', label: 'ディナーのみ休み（ランチは予約可）', lunch: true, dinner: false },
  { value: 'lunchOff', label: 'ランチのみ休み（ディナーは予約可）', lunch: false, dinner: true },
];

const kindOf = (row: { lunch: boolean; dinner: boolean }): BlockKind => {
  if (!row.lunch && !row.dinner) return 'full';
  if (row.lunch && !row.dinner) return 'dinnerOff';
  return 'lunchOff';
};

const kindConfig = (kind: BlockKind) =>
  BLOCK_KINDS.find((k) => k.value === kind) ?? BLOCK_KINDS[0];

const labelOf = (row: { lunch: boolean; dinner: boolean }) => kindConfig(kindOf(row)).label;

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

const formatDate = (row: { year: number; month: number; day: number }) => {
  const d = new Date(row.year, row.month - 1, row.day);
  return `${row.year}/${row.month}/${row.day}（${WEEKDAYS[d.getDay()]}）`;
};

const parseDateInput = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return { year, month, day };
};

/** 開始日〜終了日を 1 日ずつ展開する（最大 366 日） */
const expandRange = (from: string, to: string) => {
  const start = new Date(from);
  const end = new Date(to);
  const out: { year: number; month: number; day: number }[] = [];
  const cursor = new Date(start);
  while (cursor <= end && out.length < 366) {
    out.push({
      year: cursor.getFullYear(),
      month: cursor.getMonth() + 1,
      day: cursor.getDate(),
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
};

const isPast = (row: { year: number; month: number; day: number }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(row.year, row.month - 1, row.day) < today;
};

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  const [rows, setRows] = useState<BlockedDateRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [busyId, setBusyId] = useState<string>('');
  const [showPast, setShowPast] = useState<boolean>(false);

  // 追加フォーム
  const [date, setDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [useRange, setUseRange] = useState<boolean>(false);
  const [kind, setKind] = useState<BlockKind>('full');
  const [note, setNote] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  // ログイン確認
  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      setLoading(false);
      setError('Supabase が設定されていません。環境変数を確認してください。');
      return;
    }
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        setAuthorized(true);
        setChecking(false);
      } else {
        navigate('/login', { replace: true });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setRows(await fetchBlockedDateRows());
    } catch (e) {
      setError('ブロック日の取得に失敗しました。時間をおいて再度お試しください。');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authorized) load();
  }, [authorized, load]);

  const visibleRows = useMemo(
    () => (showPast ? rows : rows.filter((r) => !isPast(r))),
    [rows, showPast]
  );

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!date) {
      setError('日付を入力してください');
      return;
    }
    if (useRange && !endDate) {
      setError('終了日を入力してください');
      return;
    }
    if (useRange && endDate < date) {
      setError('終了日は開始日以降にしてください');
      return;
    }

    const config = kindConfig(kind);
    const targets = useRange ? expandRange(date, endDate) : [parseDateInput(date)];
    const inputs: BlockedDateInput[] = targets.map((t) => ({
      ...t,
      lunch: config.lunch,
      dinner: config.dinner,
      note: note.trim() || null,
    }));

    setSaving(true);
    try {
      await upsertBlockedDates(inputs);
      setMessage(
        inputs.length > 1
          ? `${inputs.length} 日分を登録しました（${config.label}）`
          : `${formatDate(inputs[0])} を登録しました（${config.label}）`
      );
      setDate('');
      setEndDate('');
      setUseRange(false);
      setNote('');
      await load();
    } catch (err) {
      setError('登録に失敗しました。ログイン状態を確認してください。');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleKindChange = async (row: BlockedDateRow, next: BlockKind) => {
    setError('');
    setMessage('');
    const config = kindConfig(next);
    setBusyId(row.id);
    try {
      await updateBlockedDate(row.id, { lunch: config.lunch, dinner: config.dinner });
      setRows((prev) =>
        prev.map((r) =>
          r.id === row.id ? { ...r, lunch: config.lunch, dinner: config.dinner } : r
        )
      );
      setMessage(`${formatDate(row)} を「${config.label}」に変更しました`);
    } catch (err) {
      setError('変更に失敗しました。ログイン状態を確認してください。');
      console.error(err);
    } finally {
      setBusyId('');
    }
  };

  const handleDelete = async (row: BlockedDateRow) => {
    setError('');
    setMessage('');
    setBusyId(row.id);
    try {
      await deleteBlockedDate(row.id);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      setMessage(`${formatDate(row)} のブロックを解除しました`);
    } catch (err) {
      setError('解除に失敗しました。ログイン状態を確認してください。');
      console.error(err);
    } finally {
      setBusyId('');
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate('/login', { replace: true });
  };

  if (checking) {
    return <div className="py-16 text-center text-sm">読み込み中…</div>;
  }
  if (!authorized) {
    return (
      <div className="py-16 text-center text-sm text-pink-700">
        {error || 'ログインが必要です'}
      </div>
    );
  }

  return (
    <div className="py-16 px-[5%] w-full flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-[23px] italic tracking-[2px]">Reservation Admin</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:opacity-60 duration-300"
        >
          ログアウト
        </button>
      </div>

      {(error || message) && (
        <p className={`text-sm ${error ? 'text-pink-700' : 'text-blue-950'}`}>
          {error || message}
        </p>
      )}

      {/* 追加フォーム */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[16px] font-bold">予約ブロック日の追加</h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-4 max-w-[520px]">
          <div className="flex gap-4 flex-wrap items-end">
            <div>
              <label htmlFor="block-date" className="text-s block mb-2">
                {useRange ? '開始日' : '日付'}
              </label>
              <input
                id="block-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            {useRange && (
              <div>
                <label htmlFor="block-end-date" className="text-s block mb-2">
                  終了日
                </label>
                <input
                  id="block-end-date"
                  type="date"
                  value={endDate}
                  min={date}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useRange}
              onChange={(e) => setUseRange(e.target.checked)}
            />
            期間でまとめて追加する（夏季休業など）
          </label>

          <div>
            <label htmlFor="block-kind" className="text-s block mb-2">
              休みの区分
            </label>
            <select
              id="block-kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as BlockKind)}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              {BLOCK_KINDS.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="block-note" className="text-s block mb-2">
              メモ（任意・サイトには表示されません）
            </label>
            <input
              id="block-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="貸切、夏季休業 など"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-950 text-white rounded-md p-2 hover:opacity-60 duration-300 disabled:opacity-50"
          >
            {saving ? '登録中…' : '登録する'}
          </button>
          <p className="text-sm text-gray-600">
            同じ日付が既に登録されている場合は上書きされます。
          </p>
        </form>
      </section>

      {/* 一覧 */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-[16px] font-bold">
            登録済みのブロック日（{visibleRows.length} 件）
          </h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showPast}
              onChange={(e) => setShowPast(e.target.checked)}
            />
            過去の日付も表示する
          </label>
        </div>

        {loading ? (
          <p className="text-sm">読み込み中…</p>
        ) : visibleRows.length === 0 ? (
          <p className="text-sm text-gray-600">登録されているブロック日はありません。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 pr-4 whitespace-nowrap">日付</th>
                  <th className="py-2 pr-4 whitespace-nowrap">区分</th>
                  <th className="py-2 pr-4">メモ</th>
                  <th className="py-2 whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b ${isPast(row) ? 'text-gray-400' : ''}`}
                  >
                    <td className="py-2 pr-4 whitespace-nowrap">{formatDate(row)}</td>
                    <td className="py-2 pr-4">
                      <select
                        title={`${formatDate(row)} の区分（現在：${labelOf(row)}）`}
                        value={kindOf(row)}
                        disabled={busyId === row.id}
                        onChange={(e) =>
                          handleKindChange(row, e.target.value as BlockKind)
                        }
                        className="border border-gray-300 rounded-md p-1 disabled:opacity-50"
                      >
                        {BLOCK_KINDS.map((k) => (
                          <option key={k.value} value={k.value}>
                            {k.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 pr-4">{row.note || '—'}</td>
                    <td className="py-2 whitespace-nowrap">
                      <button
                        type="button"
                        disabled={busyId === row.id}
                        onClick={() => handleDelete(row)}
                        className="border border-gray-300 rounded-md px-3 py-1 hover:opacity-60 duration-300 disabled:opacity-50"
                      >
                        解除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
