# フロントエンド連携③：localStorage永続化まとめ

## 1. 今日やったこと

- ログイン状態をlocalStorageで永続化
- リロードしてもログイン状態を維持
- ログアウト時にlocalStorageをクリア

---

## 2. App.tsx（localStorage対応）

```typescript
// src/App.tsx
import { useState } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserList } from "./components/UserList";

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "home" : "login"
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );
  const [message, setMessage] = useState("");

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setPage("home");
  };

  const handleRegister = () => {
    setMessage("登録が完了しました。ログインしてください。");
    setPage("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setPage("login");
  };

  return (

      管理システム
      {page === "home" && (

      )}
      {page === "login" && (
        <>
          {message && {message}}

          <button onClick={() => setPage("register")}>新規登録はこちら
        </>
      )}
      {page === "register" && (
        <>

          <button onClick={() => setPage("login")}>ログインはこちら
        </>
      )}

  );
}

export default App;
```

---

## 3. localStorageの操作

| 操作 | コード                                 |
| ---- | -------------------------------------- |
| 保存 | `localStorage.setItem("token", token)` |
| 取得 | `localStorage.getItem("token")`        |
| 削除 | `localStorage.removeItem("token")`     |

---

## 4. ポイントまとめ

| 項目         | 内容                                                        |
| ------------ | ----------------------------------------------------------- |
| 初期状態     | localStorageにトークンがあれば `"home"`、なければ `"login"` |
| ログイン時   | トークンをlocalStorageに保存                                |
| ログアウト時 | localStorageからトークンを削除                              |
| リロード時   | localStorageからトークンを復元してログイン状態を維持        |

---

## 5. 動作フロー

```
ログイン成功
  → localStorage.setItem("token", token)
  → ページリロードしてもトークンが残る

ログアウト
  → localStorage.removeItem("token")
  → リロードするとログイン画面に戻る
```
