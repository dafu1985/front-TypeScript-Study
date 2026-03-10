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
      <h1>管理システム</h1>
      {page === "home" && <UserList token={token} onLogout={handleLogout} />}
      {page === "login" && (
        <>
          {message && <p style={{ color: "green" }}>{message}</p>}
          <Login onLogin={handleLogin} />
          <button onClick={() => setPage("register")}>新規登録はこちら</button>
        </>
      )}
      {page === "register" && (
        <>
          <Register onRegister={handleRegister} />
          <button onClick={() => setPage("login")}>ログインはこちら</button>
        </>
      )}
    </div>
  );
}

export default App;
