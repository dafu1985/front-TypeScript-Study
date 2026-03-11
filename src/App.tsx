// src/App.tsx
import { useState } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserList } from "./components/UserList";

function App() {
  const [page, setPage] = useState<"login" | "register" | "home">(
    localStorage.getItem("token") ? "home" : "login",
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
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
    <div>
      {page === "home" && <UserList token={token} onLogout={handleLogout} />}
      {page === "login" && (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
          <Login onLogin={handleLogin} />
          <p className="mt-4 text-sm text-gray-500">
            アカウントをお持ちでない方は
            <button
              onClick={() => setPage("register")}
              className="text-blue-500 hover:underline ml-1"
            >
              新規登録
            </button>
          </p>
        </div>
      )}
      {page === "register" && (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <Register onRegister={handleRegister} />
          <p className="mt-4 text-sm text-gray-500">
            既にアカウントをお持ちの方は
            <button
              onClick={() => setPage("login")}
              className="text-blue-500 hover:underline ml-1"
            >
              ログイン
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
