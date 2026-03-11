完璧です 🎉🔥

docsに整理してからpushしましょう！
markdown# フロントエンド連携⑦：axiosインターセプターまとめ

## 1. 今日やったこと

- axiosインターセプターを設定
- 全リクエストに自動でトークンを付ける
- 401エラー時に自動でログアウト

---

## 2. インターセプターとは

リクエスト・レスポンスの前後に処理を挟む仕組み。

| 種類                       | タイミング       | 用途                |
| -------------------------- | ---------------- | ------------------- |
| リクエストインターセプター | リクエスト送信前 | トークンの自動付与  |
| レスポンスインターセプター | レスポンス受信後 | 401エラーの自動処理 |

---

## 3. src/api/auth.ts（インターセプター追加）

```typescript
// src/api/auth.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// リクエストインターセプター
// 全リクエストに自動でトークンを付ける
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// レスポンスインターセプター
// 401エラーの場合は自動でログアウト
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

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

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};
```

---

## 4. UserList.tsx（token引数を削除）

```typescript
// token引数が不要になった
type Props = {
  onLogout: () => void;
};

export const UserList = ({ onLogout }: Props) => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (e: any) {
        setError(e.response?.data?.message || "取得に失敗しました");
      }
    };
    fetchUsers();
  }, []);
```

---

## 5. App.tsx（token引数を削除）

```typescript
// ❌ 修正前

// ✅ 修正後
```

---

## 6. ポイントまとめ

- インターセプターで認証処理を1箇所に集約できる
- `getUsers` から `token` 引数が不要になりコードがシンプルになった
- `fetch` ではなく `axios` の `api` を使うことでインターセプターが効く
- 401エラー時は `localStorage` をクリアして自動ログアウト

## 7. App.tsxのtoken状態も不要になった

インターセプターがlocalStorageから直接トークンを取得するため、
App.tsxでtokenをstateで管理する必要がなくなった。

```typescript
// ❌ 不要になったコード
const [token, setToken] = useState(localStorage.getItem("token") || "");

// ✅ 修正後のhandleLogin
const handleLogin = (token: string) => {
  localStorage.setItem("token", token);
  setPage("home");
};

// ✅ 修正後のhandleLogout
const handleLogout = () => {
  localStorage.removeItem("token");
  setPage("login");
};
```
