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
    <div>
      <h2>ログイン</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <button onClick={handleSubmit}>ログイン</button>
    </div>
  );
};
