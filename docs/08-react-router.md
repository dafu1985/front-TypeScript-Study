# フロントエンド連携⑧：React Routerまとめ

## 1. 今日やったこと

- React Routerを導入してURLでページ管理
- 未ログイン時に自動リダイレクト
- ブラウザの「戻る」ボタンが使えるように

---

## 2. インストール

```bash
npm install react-router-dom
```

---

## 3. main.tsx（BrowserRouter追加）

```typescript
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(




  ,
)
```

---

## 4. App.tsx（React Router対応）

```typescript
// src/App.tsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserList } from "./components/UserList";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    navigate("/");
  };

  const handleRegister = () => {
    setMessage("登録が完了しました。ログインしてください。");
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (

       : }
      />

            {message && {message}}


              アカウントをお持ちでない方は
              <button onClick={() => navigate("/register")} className="text-blue-500 hover:underline ml-1">
                新規登録



        }
      />



              既にアカウントをお持ちの方は
              <button onClick={() => navigate("/login")} className="text-blue-500 hover:underline ml-1">
                ログイン



        }
      />

  );
}

export default App;
```

---

## 5. ルート一覧

| URL         | 表示         | 条件             |
| ----------- | ------------ | ---------------- |
| `/`         | ユーザー一覧 | ログイン済みのみ |
| `/login`    | ログイン画面 | 誰でも           |
| `/register` | 登録画面     | 誰でも           |

---

## 6. ポイントまとめ

| 項目                              | 内容                          |
| --------------------------------- | ----------------------------- |
| `BrowserRouter`                   | `main.tsx` でアプリ全体を囲む |
| `Routes` / `Route`                | URLとコンポーネントを紐付ける |
| `useNavigate`                     | プログラムでページ遷移する    |
| `Navigate`                        | 条件によって自動リダイレクト  |
| `!!localStorage.getItem("token")` | ログイン状態の確認            |
