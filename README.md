# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

# 管理画面（予約ブロック日の編集）

`/login` からログインし、`/admin` で予約のブロック日を追加・変更・解除できます。
変更は Supabase に保存され、**再デプロイなしで予約フォームに即反映されます**。

予約フォーム（`src/Reservation/Email.tsx`）は起動時に Supabase からブロック日を取得します。
取得できない場合は `src/Data/blockedDates.ts` の既定値にフォールバックするため、
Supabase が落ちてもフォームは動作します。

## セットアップ（初回のみ）

### 1. Supabase プロジェクトを作成

[supabase.com](https://supabase.com) で無料プロジェクトを作成します。

### 2. テーブルを作成

ダッシュボード → **SQL Editor** で、以下を順に実行します。

1. `supabase/schema.sql` … テーブルと権限設定
2. `supabase/seed.sql` … 既存のブロック日 42 件を投入

### 3. 管理者ユーザーを作成

ダッシュボード → **Authentication** → **Users** → **Add user** →
**Create new user** で作成します。

- **Email**: `admin@seta-tei.local`
  （`＜ログインしたいユーザー名＞@＜REACT_APP_ADMIN_EMAIL_DOMAIN の値＞`）
- **Password**: 従来の管理パスワード
- **Auto Confirm User**: ✅ オンにする

これで、ログイン画面のユーザー名に `admin` と入力できるようになります。
ユーザー名を変えたい場合は、Supabase 側のメールアドレスの `@` より前を変更してください。

> セキュリティ上、**メール招待や新規サインアップは有効にしないでください。**
> Authentication → Providers → Email の「Enable sign ups」はオフのままにします。

### 4. 環境変数を設定

`.env`（ローカル）と Vercel の Environment Variables に以下を設定します。
値はダッシュボード → **Project Settings** → **API** から取得します。

```
REACT_APP_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGci...
REACT_APP_ADMIN_EMAIL_DOMAIN=seta-tei.local
```

`anon key` は公開前提のキーです。書き込みはログイン済みユーザーのみに制限されているため、
ブラウザに含まれても問題ありません（`supabase/schema.sql` の RLS 設定）。

### 5. 再デプロイ

環境変数は**ビルド時に埋め込まれる**ため、設定後に一度デプロイし直してください。

## データの持ち方

`lunch` / `dinner` は **「営業する = true」** を表します（ブロックではありません）。

| lunch | dinner | 意味 | 管理画面の表示 |
| --- | --- | --- | --- |
| false | false | 終日ブロック | 終日休み（予約不可） |
| true | false | ランチのみ営業 | ディナーのみ休み |
| false | true | ディナーのみ営業 | ランチのみ休み |

水・木の定休日、年末年始、および `src/Data/blockedDates.ts` の `BLOCKED_RANGES`
はコード側のルールです。管理画面では扱いません（期間休業は「期間でまとめて追加」で個別日として登録できます）。
