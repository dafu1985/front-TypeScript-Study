// src/App.tsx
import { useState } from "react";
import { Login } from "./components/Login";
import { UserList } from "./components/UserList";

function App() {
  const [token, setToken] = useState("");

  const handleLogin = (token: string) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken("");
  };

  return (
    <div>
      <h1>管理システム</h1>
      {token ? (
        <UserList token={token} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
