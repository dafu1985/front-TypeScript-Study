# フロントエンド連携④：フロントバリデーションまとめ

## 1. 今日やったこと

- 登録画面・ログイン画面にフロントバリデーションを追加
- APIを叩く前にバリデーションチェックを行う

---

## 2. なぜフロントでもバリデーションが必要か

|              | フロントのみ        | バックエンドのみ           | 両方 |
| ------------ | ------------------- | -------------------------- | ---- |
| UX           | ✅ 即座にエラー表示 | ❌ APIを叩くまでわからない | ✅   |
| セキュリティ | ❌ 迂回できる       | ✅ 確実                    | ✅   |

**フロントはUX向上、バックエンドはセキュリティ担保**という役割分担。

---

## 3. Register.tsx（バリデーション追加）

```typescript
const handleSubmit = async () => {
  // ① バリデーションを先に行う
  if (name.trim() === "") {
    setError("名前を入力してください");
    return;
  }
  if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
    setError("有効なメールアドレスを入力してください");
    return;
  }
  if (password.trim() === "" || password.length < 6) {
    setError("パスワードは6文字以上で入力してください");
    return;
  }

  // ② 問題なければAPIを叩く
  try {
    await register(name, email, password);
    onRegister();
  } catch (e: any) {
    setError(e.response?.data?.message || "登録に失敗しました");
  }
};
```

---

## 4. Login.tsx（バリデーション追加）

```typescript
const handleSubmit = async () => {
  if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
    setError("有効なメールアドレスを入力してください");
    return;
  }
  if (password.trim() === "" || password.length < 1) {
    setError("パスワードは1文字以上で入力してください");
    return;
  }
  try {
    const data = await login(email, password);
    onLogin(data.token);
  } catch (e: any) {
    setError(e.response?.data?.message || "ログインに失敗しました");
  }
};
```

---

## 5. バリデーション条件まとめ

| 画面     | 項目     | 条件                       |
| -------- | -------- | -------------------------- |
| 登録     | name     | 1文字以上                  |
| 登録     | email    | `@` を含む正規表現チェック |
| 登録     | password | 6文字以上                  |
| ログイン | email    | `@` を含む正規表現チェック |
| ログイン | password | 1文字以上                  |

---

## 6. ポイントまとめ

- バリデーションは `try` の**前**に行う
- エラーがあれば `return` でAPIを叩かずに終了
- 正規表現 `/\S+@\S+\.\S+/` でメール形式をチェック
