// src/App.tsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserList } from "./components/UserList";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    navigate("/");
  };

  const handleRegister = () => {
    setMessage("登録が完了しました。ログインしてください。");
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <UserList onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {message && (
              <p className="text-green-600 text-sm mb-4">{message}</p>
            )}
            <Login onLogin={handleLogin} />
            <p className="mt-4 text-sm text-gray-500">
              アカウントをお持ちでない方は
              <button
                onClick={() => navigate("/register")}
                className="text-blue-500 hover:underline ml-1"
              >
                新規登録
              </button>
            </p>
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <Register onRegister={handleRegister} />
            <p className="mt-4 text-sm text-gray-500">
              既にアカウントをお持ちの方は
              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline ml-1"
              >
                ログイン
              </button>
            </p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
