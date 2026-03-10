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

  return (
    <div>
      <h2>登録</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>登録</button>
    </div>
  );
};
