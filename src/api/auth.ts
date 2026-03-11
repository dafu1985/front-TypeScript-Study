// src/api/auth.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// リクエストインターセプター
// 全リクエストに自動でトークンを付ける
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// レスポンスインターセプター
// 401エラーの場合は自動でログアウト
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const register = async (name: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};