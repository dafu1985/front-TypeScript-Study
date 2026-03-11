# フロントエンド連携⑥：Tailwind CSSまとめ

## 1. 今日やったこと

- Tailwind CSSを導入
- ログイン・登録・ユーザー一覧画面をスタイリング

---

## 2. インストール・設定

```bash
npm install tailwindcss @tailwindcss/vite
```

### vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### src/index.css

```css
@import "tailwindcss";
```

---

## 3. よく使ったTailwindクラス

| クラス                                                | 内容                       |
| ----------------------------------------------------- | -------------------------- |
| `min-h-screen`                                        | 画面の高さいっぱいに広げる |
| `bg-gray-100`                                         | 背景をグレーに             |
| `flex items-center justify-center`                    | 中央寄せ                   |
| `bg-white p-8 rounded shadow-md`                      | カードスタイル             |
| `w-full max-w-sm`                                     | 横幅を最大smに制限         |
| `text-2xl font-bold`                                  | 大きい太字テキスト         |
| `border border-gray-300 rounded px-3 py-2`            | インプットスタイル         |
| `focus:outline-none focus:ring-2 focus:ring-blue-400` | フォーカス時のリング       |
| `hover:bg-blue-600 disabled:opacity-50 transition`    | ホバー・無効化スタイル     |
| `text-red-500`                                        | エラーテキスト（赤）       |
| `text-green-600`                                      | 成功テキスト（緑）         |

---

## 4. App.tsx（画面切り替え + スタイリング）

```typescript
{page === "login" && (

    {message && (
      {message}
    )}


      アカウントをお持ちでない方は
      <button
        onClick={() => setPage("register")}
        className="text-blue-500 hover:underline ml-1"
      >
        新規登録



)}
```

---

## 5. ポイントまとめ

- `Login.tsx` / `Register.tsx` の外側の `div` は削除してカードだけ残す
- 画面全体のレイアウト（`min-h-screen` / `flex`）は `App.tsx` で管理
- `disabled:opacity-50` でローディング中のボタンを半透明に
