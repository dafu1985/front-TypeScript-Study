// src/App.tsx
import { useState } from "react";
import { Login } from "./components/Login";
import { UserList } from "./components/UserList";
import { Register } from "./components/Register";

function App() {
  const [page, setPage] = useState<"login" | "register" | "home">("login");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (token: string) => {
    setToken(token);
    setPage("home");
  };

  const handleRegister = () => {
    setMessage("登録が完了しました。ログインしてください。");
    setPage("login");
  };

  const handleLogout = () => {
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
