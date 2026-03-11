# フロントエンド連携⑤：ローディング状態まとめ

## 1. 今日やったこと

- ログイン・登録画面にローディング状態を追加
- API通信中はボタンを無効化して「処理中...」を表示

---

## 2. Login.tsx（ローディング追加）

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  setError("");

  if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
    setError("有効なメールアドレスを入力してください");
    setIsLoading(false);
    return;
  }
  if (password.trim() === "" || password.length < 1) {
    setError("パスワードは1文字以上で入力してください");
    setIsLoading(false);
    return;
  }

  try {
    const data = await login(email, password);
    onLogin(data.token);
  } catch (e: any) {
    setError(e.response?.data?.message || "ログインに失敗しました");
  } finally {
    setIsLoading(false);
  }
};

// ボタン

{
  isLoading ? "ログイン中..." : "ログイン";
}
```

---

## 3. Register.tsx（ローディング追加）

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  setError("");

  if (name.trim() === "") {
    setError("名前を入力してください");
    setIsLoading(false);
    return;
  }
  if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
    setError("有効なメールアドレスを入力してください");
    setIsLoading(false);
    return;
  }
  if (password.trim() === "" || password.length < 6) {
    setError("パスワードは6文字以上で入力してください");
    setIsLoading(false);
    return;
  }

  try {
    await register(name, email, password);
    onRegister();
  } catch (e: any) {
    setError(e.response?.data?.message || "登録に失敗しました");
  } finally {
    setIsLoading(false);
  }
};

// ボタン

{
  isLoading ? "登録中..." : "登録";
}
```

---

## 4. ポイントまとめ

| 項目                                         | 内容                                                  |
| -------------------------------------------- | ----------------------------------------------------- |
| `isLoading`                                  | API通信中かどうかの状態管理                           |
| `setIsLoading(true)`                         | API呼び出し前に設定                                   |
| `finally`                                    | 成功・失敗どちらでも必ず `setIsLoading(false)` を実行 |
| `disabled={isLoading}`                       | 通信中はボタンを無効化して二重送信を防ぐ              |
| `{isLoading ? "処理中..." : "通常テキスト"}` | 状態に応じてボタンテキストを切り替え                  |

---

## 5. なぜ `finally` を使うのか

```typescript
// ❌ finallyなしの場合
try {
  await login(...);
  setIsLoading(false); // 成功時のみ解除
} catch {
  setError(...);
  // ❌ ここにsetIsLoading(false)を書き忘れるとローディングが解除されない
}

// ✅ finallyありの場合
try {
  await login(...);
} catch {
  setError(...);
} finally {
  setIsLoading(false); // 成功・失敗どちらでも必ず解除
}
```
