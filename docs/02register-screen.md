# フロントエンド連携②：ユーザー登録画面まとめ

## 1. 今日やったこと

- ユーザー登録画面（Register.tsx）を実装
- 3画面の状態管理（login / register / home）
- 登録成功後のメッセージ表示

---

## 2. Register.tsx

```typescript
// src/components/Register.tsx
import { useState } from "react";
import { register } from "../api/auth";

type Props = {
  onRegister: () => void;
};

export const Register = ({ onRegister }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await register(name, email, password);
      onRegister();
    } catch (e: any) {
      setError(e.response?.data?.message || "登録に失敗しました");
    }
  };

  return (

      登録
      {error && {error}}
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      登録

  );
};
```

---

## 3. App.tsx（3画面対応）

```typescript
// src/App.tsx
import { useState } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserList } from "./components/UserList";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (token: string) => {
    setToken(token);
    setPage("home");
  };

  const handleRegister = () => {
    setMessage("登録が完了しました。ログインしてください。");
    setPage("login");
  };

  const handleLogout = () => {
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

## 4. ポイントまとめ

| 項目                   | 内容                                                      |
| ---------------------- | --------------------------------------------------------- |
| 画面管理               | `useState<"login" \| "register" \| "home">` で3画面を管理 |
| 登録後の遷移           | 登録成功 → ログイン画面へ遷移                             |
| メッセージ表示         | 登録成功後に緑文字でメッセージ表示                        |
| 自動ログインしない理由 | 登録と認証を分けることでセキュリティ的に安全              |

---

## 5. 画面フロー

```
ログイン画面
  ↓ 「新規登録はこちら」
登録画面
  ↓ 登録成功
ログイン画面（「登録が完了しました」メッセージ表示）
  ↓ ログイン成功
ユーザー一覧画面
  ↓ ログアウト
ログイン画面
```
