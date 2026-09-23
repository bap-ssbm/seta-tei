import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { usernameToEmail } from '../lib/adminAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  // 既にログイン済みなら管理画面へ
  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        navigate('/admin', { replace: true });
      } else {
        setChecking(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!supabase) {
      setError('Supabase が設定されていません。環境変数を確認してください。');
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username.trim()),
      password,
    });
    setLoading(false);

    if (authError) {
      setError('ユーザー名またはパスワードが違います');
      setPassword('');
      return;
    }
    navigate('/admin', { replace: true });
  };

  if (checking) {
    return <div className="flex items-center justify-center h-screen text-sm">読み込み中…</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-[320px] flex flex-col gap-4">
        <h1 className="text-[20px] tracking-[2px] text-center">管理画面ログイン</h1>

        <div>
          <label htmlFor="admin-username" className="text-s block mb-2">
            ユーザー名
          </label>
          <input
            id="admin-username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 w-full rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="text-s block mb-2">
            パスワード
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 w-full rounded-md p-2"
          />
        </div>

        {error && <p className="text-sm text-pink-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-950 text-white w-full rounded-md p-2 hover:opacity-60 duration-300 disabled:opacity-50"
        >
          {loading ? 'ログイン中…' : 'ログイン'}
        </button>
      </form>
    </div>
  );
};

export default Login;
