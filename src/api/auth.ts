// src/api/auth.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const register = async (name: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const getUsers = async (token: string) => {
  const res = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};