# フロント・バックエンド連携まとめ

## 1. 今日やったこと

- CORS設定でフロントからバックエンドへのリクエストを許可
- Vite + React + TypeScriptでフロントエンド環境構築
- axiosでAPI通信
- ログイン画面・ユーザー一覧画面を実装

---

## 2. CORS設定（バックエンド）

```bash
npm install cors
npm install --save-dev @types/cors
```

```typescript
// src/app.ts
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
```

### ポイント

- `origin`：フロントエンドのURLを指定
- `credentials: true`：JWTトークンなどの認証情報をリクエストに含めることを許可

---

## 3. フロントエンド環境構築

```bash
npm create vite@latest front-typescript-study -- --template react-ts
cd front-typescript-study
npm install
npm install axios
```

---

## 4. API通信（axios）

```typescript
// src/api/auth.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const getUsers = async (token: string) => {
  const res = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
```

### ポイント

- `axios.create({ baseURL: "..." })`：共通のベースURLを1箇所で管理
- `Authorization: Bearer ${token}`：JWTトークンをHeaderに付けて送信

---

## 5. ログイン画面

```typescript
// src/components/Login.tsx
import { useState } from "react";
import { login } from "../api/auth";

type Props = {
  onLogin: (token: string) => void;
};

export const Login = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const data = await login(email, password);
      onLogin(data.token);
    } catch (e: any) {
      setError(e.response?.data?.message || "ログインに失敗しました");
    }
  };

  return (

      ログイン
      {error && {error}}
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

      ログイン

  );
};
```

---

## 6. ユーザー一覧画面

```typescript
// src/components/UserList.tsx
import { useEffect, useState } from "react";
import { getUsers } from "../api/auth";

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  token: string;
  onLogout: () => void;
};

export const UserList = ({ token, onLogout }: Props) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (e: any) {
        setError(e.response?.data?.message || "取得に失敗しました");
      }
    };

    fetchUsers();
  }, [token]);

  return (

      ユーザー一覧
      {error && {error}}

        {users.map((user) => (

            {user.name}（{user.email}）

        ))}

      ログアウト

  );
};
```

---

## 7. App.tsx（画面切り替え）

```typescript
// src/App.tsx
import { useState } from "react";
import { Login } from "./components/Login";
import { UserList } from "./components/UserList";

function App() {
  const [token, setToken] = useState("");

  const handleLogin = (token: string) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken("");
  };

  return (

      管理システム
      {token ? (

      ) : (

      )}

  );
}

export default App;
```

### ポイント

- `token` が空 → ログイン画面表示
- `token` に値あり → ユーザー一覧画面表示

---

## 8. 起動方法

```bash
# バックエンド
cd Back-TypeScript-Study
npm run dev  # http://localhost:3000

# フロントエンド
cd front-typescript-study
npm run dev  # http://localhost:5173
```
