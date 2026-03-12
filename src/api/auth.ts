// src/api/auth.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// リクエストインターセプター
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await axios.post("http://localhost:3000/auth/refresh", { refreshToken });
          localStorage.setItem("accessToken", res.data.accessToken);
          // 失敗したリクエストを再試行
          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return axios(error.config);
        } catch {
          // RefreshTokenも切れたらログアウト
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
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
  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};