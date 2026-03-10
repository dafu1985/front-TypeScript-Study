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
