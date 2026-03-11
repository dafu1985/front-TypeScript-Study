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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    // ① バリデーションを先に行う
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

    // ② 問題なければAPIを叩く
    try {
      await register(name, email, password);
      onRegister();
    } catch (e: any) {
      setError(e.response?.data?.message || "登録に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        登録
      </h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition"
      >
        {isLoading ? "登録中..." : "登録"}
      </button>
    </div>
  );
};
